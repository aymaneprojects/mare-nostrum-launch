/**
 * live-admin — actions de l'animateur pour le module Live conférence.
 *
 * Toutes les écritures privilégiées passent ici (service role). Chaque action
 * autre que create_event vérifie le code animateur contre son empreinte
 * SHA-256 stockée dans live_event_secrets (jamais lisible par anon).
 *
 * Secrets :
 *   LIVE_CREATE_KEY    clé de l'équipe, obligatoire pour créer un événement
 *   LIVE_ADMIN_PEPPER  optionnel, concaténé au code avant hachage
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

class HttpError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

// Alphabet sans caractères ambigus (0/O, 1/I/L) : les codes se dictent et se recopient.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomCode(length: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

const hashAdminCode = (code: string) =>
  sha256(code.trim().toUpperCase() + (Deno.env.get("LIVE_ADMIN_PEPPER") ?? ""));

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const str = (v: unknown, field: string, max: number): string => {
  if (typeof v !== "string" || !v.trim()) throw new HttpError(`Champ « ${field} » manquant.`);
  const s = v.trim();
  if (s.length > max) throw new HttpError(`Champ « ${field} » trop long (${max} caractères max).`);
  return s;
};

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

/** Retrouve l'événement et vérifie le code animateur. */
async function authorize(publicCode: unknown, adminCode: unknown) {
  const code = str(publicCode, "code événement", 16).toUpperCase();
  const admin = str(adminCode, "code animateur", 32);

  const { data: event, error } = await supabase
    .from("live_events").select("*").eq("public_code", code).maybeSingle();
  if (error) throw new HttpError(error.message, 500);
  if (!event) throw new HttpError("Événement introuvable.", 404);

  const { data: secret, error: secretError } = await supabase
    .from("live_event_secrets").select("admin_code_hash").eq("event_id", event.id).maybeSingle();
  if (secretError) throw new HttpError(secretError.message, 500);
  if (!secret || !safeEqual(secret.admin_code_hash, await hashAdminCode(admin))) {
    throw new HttpError("Code animateur invalide.", 403);
  }
  return event as { id: string; public_code: string; title: string; status: string };
}

/** Vérifie qu'un item appartient bien à l'événement autorisé. */
async function ownItem(eventId: string, itemId: unknown) {
  const id = str(itemId, "item_id", 64);
  const { data, error } = await supabase.from("live_items").select("*").eq("id", id).eq("event_id", eventId).maybeSingle();
  if (error) throw new HttpError(error.message, 500);
  if (!data) throw new HttpError("Activité introuvable.", 404);
  return data;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const body = await req.json().catch(() => ({}));
    const { action } = body;

    switch (action) {
      case "create_event": {
        const expected = Deno.env.get("LIVE_CREATE_KEY");
        // Échec fermé : sans clé configurée, personne ne crée d'événement.
        if (!expected) throw new HttpError("Création d'événement non configurée.", 503);
        if (typeof body.create_key !== "string" || !safeEqual(body.create_key.trim(), expected)) {
          throw new HttpError("Clé Mare Nostrum invalide.", 403);
        }
        const title = str(body.title, "titre", 120);
        const adminCode = `${randomCode(4)}-${randomCode(4)}-${randomCode(4)}`;

        for (let attempt = 0; attempt < 6; attempt++) {
          const publicCode = `MN-${randomCode(4)}`;
          const { data: event, error } = await supabase
            .from("live_events").insert({ public_code: publicCode, title }).select("*").single();
          if (error) {
            if (error.code === "23505") continue; // collision de code public : on retente
            throw new HttpError(error.message, 500);
          }
          const { error: secretError } = await supabase
            .from("live_event_secrets").insert({ event_id: event.id, admin_code_hash: await hashAdminCode(adminCode) });
          if (secretError) {
            await supabase.from("live_events").delete().eq("id", event.id);
            throw new HttpError(secretError.message, 500);
          }
          // Seule réponse où le code animateur circule en clair.
          return json({ event, admin_code: adminCode });
        }
        throw new HttpError("Impossible de générer un code unique, réessayez.", 500);
      }

      case "verify": {
        const event = await authorize(body.public_code, body.admin_code);
        return json({ event });
      }

      case "create_item": {
        const event = await authorize(body.public_code, body.admin_code);
        const kind = body.kind;
        if (!["open", "poll", "wall"].includes(kind)) throw new HttpError("Type d'activité invalide.");
        const prompt = str(body.prompt, "question", 300);

        let options: string[] = [];
        if (kind === "poll") {
          if (!Array.isArray(body.options)) throw new HttpError("Options manquantes.");
          options = body.options
            .filter((o: unknown) => typeof o === "string" && o.trim())
            .map((o: string) => o.trim().slice(0, 120));
          if (options.length < 2 || options.length > 10) throw new HttpError("Un sondage a entre 2 et 10 options.");
        }

        const { data: last } = await supabase
          .from("live_items").select("position").eq("event_id", event.id)
          .order("position", { ascending: false }).limit(1).maybeSingle();

        const { data: item, error } = await supabase
          .from("live_items")
          .insert({ event_id: event.id, kind, prompt, options, position: (last?.position ?? 0) + 1 })
          .select("*").single();
        if (error) throw new HttpError(error.message, 500);
        return json({ item });
      }

      case "activate": {
        const event = await authorize(body.public_code, body.admin_code);
        const target = await ownItem(event.id, body.item_id);
        if (target.status === "active") return json({ item: target });

        // Une seule activité active par événement (index unique partiel) :
        // on clôture l'actuelle avant d'activer la cible.
        const now = new Date().toISOString();
        const { error: closeError } = await supabase
          .from("live_items").update({ status: "closed", closed_at: now })
          .eq("event_id", event.id).eq("status", "active");
        if (closeError) throw new HttpError(closeError.message, 500);

        const { data: item, error } = await supabase
          .from("live_items").update({ status: "active", activated_at: now, closed_at: null })
          .eq("id", target.id).select("*").single();
        if (error) throw new HttpError(error.message, 500);
        return json({ item });
      }

      case "close": {
        const event = await authorize(body.public_code, body.admin_code);
        const target = await ownItem(event.id, body.item_id);
        const { data: item, error } = await supabase
          .from("live_items").update({ status: "closed", closed_at: new Date().toISOString() })
          .eq("id", target.id).select("*").single();
        if (error) throw new HttpError(error.message, 500);
        return json({ item });
      }

      case "hide_message": {
        const event = await authorize(body.public_code, body.admin_code);
        const messageId = str(body.message_id, "message_id", 64);
        const { data: message, error: readError } = await supabase
          .from("live_messages").select("id, item_id").eq("id", messageId).maybeSingle();
        if (readError) throw new HttpError(readError.message, 500);
        if (!message) throw new HttpError("Message introuvable.", 404);
        await ownItem(event.id, message.item_id);

        const { data, error } = await supabase
          .from("live_messages").update({ hidden: body.hidden !== false })
          .eq("id", messageId).select("*").single();
        if (error) throw new HttpError(error.message, 500);
        return json({ message: data });
      }

      case "close_event": {
        const event = await authorize(body.public_code, body.admin_code);
        const { data, error } = await supabase
          .from("live_events").update({ status: "closed" }).eq("id", event.id).select("*").single();
        if (error) throw new HttpError(error.message, 500);
        return json({ event: data });
      }

      default:
        throw new HttpError("Action inconnue.");
    }
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 400;
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    return json({ error: message }, status);
  }
});
