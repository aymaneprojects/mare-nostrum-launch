/**
 * live-admin — actions de l'animateur pour le module Live conférence.
 *
 * Toutes les écritures privilégiées passent ici (service role). Chaque action
 * autre que create_event vérifie le code animateur contre son empreinte
 * SHA-256 stockée dans live_event_secrets (jamais lisible par anon).
 *
 * Secrets :
 *   LIVE_CREATE_KEY    clé de l'équipe, obligatoire pour créer un événement
 *   LIVE_ADMIN_PEPPER  concaténé au code avant hachage — ne jamais le changer
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

const KINDS = ["open", "poll", "wall", "cloud", "rating"] as const;
type Kind = typeof KINDS[number];
const RATING_OPTIONS = ["1", "2", "3", "4", "5"];

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

const optionalNote = (v: unknown): string | null => {
  if (v === undefined || v === null) return null;
  if (typeof v !== "string") throw new HttpError("Note invalide.");
  const s = v.trim();
  if (s.length > 4000) throw new HttpError("Note trop longue (4000 caractères max).");
  return s;
};

const optionalDuration = (v: unknown): number | null => {
  if (v === undefined || v === null || v === "" || v === 0) return null;
  const n = Number(v);
  if (!Number.isInteger(n) || n < 10 || n > 3600) throw new HttpError("Durée invalide (10 s à 1 h).");
  return n;
};

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

const must = <T>(res: { data: T; error: { message: string } | null }, status = 500): T => {
  if (res.error) throw new HttpError(res.error.message, status);
  return res.data;
};

/** Retrouve l'événement et vérifie le code animateur. */
async function authorize(publicCode: unknown, adminCode: unknown) {
  const code = str(publicCode, "code événement", 16).toUpperCase();
  const admin = str(adminCode, "code animateur", 32);

  const event = must(await supabase.from("live_events").select("*").eq("public_code", code).maybeSingle());
  if (!event) throw new HttpError("Événement introuvable.", 404);

  const secret = must(await supabase.from("live_event_secrets").select("admin_code_hash").eq("event_id", event.id).maybeSingle());
  if (!secret || !safeEqual(secret.admin_code_hash, await hashAdminCode(admin))) {
    throw new HttpError("Code animateur invalide.", 403);
  }
  return event as { id: string; public_code: string; title: string; status: string; screen_items: string[] };
}

/** Vérifie qu'un item appartient bien à l'événement autorisé. */
async function ownItem(eventId: string, itemId: unknown) {
  const id = str(itemId, "item_id", 64);
  const item = must(await supabase.from("live_items").select("*").eq("id", id).eq("event_id", eventId).maybeSingle());
  if (!item) throw new HttpError("Activité introuvable.", 404);
  return item;
}

async function upsertNote(itemId: string, note: string | null) {
  if (note === null) return;
  if (!note) {
    must(await supabase.from("live_item_notes").delete().eq("item_id", itemId));
    return;
  }
  must(await supabase.from("live_item_notes").upsert({ item_id: itemId, note, updated_at: new Date().toISOString() }));
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

      case "update_event": {
        const event = await authorize(body.public_code, body.admin_code);
        const title = str(body.title, "titre", 120);
        const data = must(await supabase.from("live_events").update({ title }).eq("id", event.id).select("*").single());
        return json({ event: data });
      }

      case "create_item": {
        const event = await authorize(body.public_code, body.admin_code);
        const kind = body.kind as Kind;
        if (!KINDS.includes(kind)) throw new HttpError("Type d'activité invalide.");
        const prompt = str(body.prompt, "question", 300);

        let options: string[] = [];
        if (kind === "poll") {
          if (!Array.isArray(body.options)) throw new HttpError("Options manquantes.");
          options = body.options
            .filter((o: unknown) => typeof o === "string" && o.trim())
            .map((o: string) => o.trim().slice(0, 120));
          if (options.length < 2 || options.length > 10) throw new HttpError("Un sondage a entre 2 et 10 options.");
        }
        if (kind === "rating") options = RATING_OPTIONS;

        const last = must(await supabase
          .from("live_items").select("position").eq("event_id", event.id)
          .order("position", { ascending: false }).limit(1).maybeSingle());

        const item = must(await supabase
          .from("live_items")
          .insert({
            event_id: event.id,
            kind,
            prompt,
            options,
            position: (last?.position ?? 0) + 1,
            duration_seconds: optionalDuration(body.duration_seconds),
            show_authors: kind === "cloud" && body.show_authors === true,
          })
          .select("*").single());

        await upsertNote(item.id, optionalNote(body.note));
        return json({ item });
      }

      case "update_item": {
        const event = await authorize(body.public_code, body.admin_code);
        const target = await ownItem(event.id, body.item_id);
        const patch: Record<string, unknown> = {};
        if (body.prompt !== undefined) patch.prompt = str(body.prompt, "question", 300);
        if (body.duration_seconds !== undefined) patch.duration_seconds = optionalDuration(body.duration_seconds);
        if (body.show_authors !== undefined) patch.show_authors = target.kind === "cloud" && body.show_authors === true;
        // Les options ne se modifient que sur un sondage (celles d'une note sont figées à 1..5).
        if (body.options !== undefined && target.kind === "poll") {
          if (!Array.isArray(body.options)) throw new HttpError("Options invalides.");
          const options = body.options
            .filter((o: unknown) => typeof o === "string" && o.trim())
            .map((o: string) => o.trim().slice(0, 120));
          if (options.length < 2 || options.length > 10) throw new HttpError("Un sondage a entre 2 et 10 options.");
          // Retirer une option déjà votée fausserait les résultats affichés.
          const { count: votes } = await supabase
            .from("live_votes").select("id", { count: "exact", head: true })
            .eq("item_id", target.id).gte("option_index", options.length);
          if (votes) throw new HttpError("Des votes portent sur les options que vous retirez. Terminez et recréez le sondage.");
          patch.options = options;
        }
        let item = target;
        if (Object.keys(patch).length) {
          item = must(await supabase.from("live_items").update(patch).eq("id", target.id).select("*").single());
        }
        if (body.note !== undefined) await upsertNote(target.id, optionalNote(body.note) ?? "");
        return json({ item });
      }

      case "delete_item": {
        const event = await authorize(body.public_code, body.admin_code);
        const target = await ownItem(event.id, body.item_id);
        // Les réponses et les votes partent en cascade : la régie prévient avant.
        const { count: answers } = await supabase
          .from("live_messages").select("id", { count: "exact", head: true }).eq("item_id", target.id);
        const { count: votes } = await supabase
          .from("live_votes").select("id", { count: "exact", head: true }).eq("item_id", target.id);
        must(await supabase.from("live_items").delete().eq("id", target.id));
        // Si l'écran affichait cette activité, on le remet en automatique.
        if ((event.screen_items ?? []).includes(target.id)) {
          const rest = (event.screen_items ?? []).filter((id) => id !== target.id);
          must(await supabase.from("live_events").update({ screen_items: rest }).eq("id", event.id));
        }
        return json({ deleted: target.id, answers: answers ?? 0, votes: votes ?? 0 });
      }

      case "delete_participant": {
        const event = await authorize(body.public_code, body.admin_code);
        const participantId = str(body.participant_id, "participant_id", 64);
        const participant = must(await supabase
          .from("live_participants").select("id, first_name").eq("id", participantId).eq("event_id", event.id).maybeSingle());
        if (!participant) throw new HttpError("Participant introuvable.", 404);

        // Tout ce que la personne a envoyé part avec elle (cascade en base).
        const { count: answers } = await supabase
          .from("live_messages").select("id", { count: "exact", head: true }).eq("participant_id", participantId);
        must(await supabase.from("live_participants").delete().eq("id", participantId));
        return json({ deleted: participantId, first_name: participant.first_name, answers: answers ?? 0 });
      }

      case "get_notes": {
        const event = await authorize(body.public_code, body.admin_code);
        const items = must(await supabase.from("live_items").select("id").eq("event_id", event.id)) ?? [];
        const ids = items.map((i: { id: string }) => i.id);
        if (!ids.length) return json({ notes: {} });
        const rows = must(await supabase.from("live_item_notes").select("item_id, note").in("item_id", ids)) ?? [];
        return json({ notes: Object.fromEntries(rows.map((r: { item_id: string; note: string }) => [r.item_id, r.note])) });
      }

      case "activate": {
        const event = await authorize(body.public_code, body.admin_code);
        const target = await ownItem(event.id, body.item_id);
        if (target.status === "active") return json({ item: target });

        // Fermeture de l'activité en cours + lancement en une seule transaction,
        // verrouillée par événement (voir migration 20260919090000_live_fixes.sql).
        const item = must(await supabase.rpc("live_activate", { p_event_id: event.id, p_item_id: target.id }));
        return json({ item });
      }

      case "close": {
        const event = await authorize(body.public_code, body.admin_code);
        const target = await ownItem(event.id, body.item_id);
        const item = must(await supabase
          .from("live_items").update({ status: "closed", closed_at: new Date().toISOString() })
          .eq("id", target.id).select("*").single());
        return json({ item });
      }

      case "set_screen": {
        const event = await authorize(body.public_code, body.admin_code);
        const ids: unknown = body.item_ids;
        if (!Array.isArray(ids) || ids.length > 2) throw new HttpError("L'écran affiche au plus deux activités.");
        const unique = [...new Set(ids.map((id) => str(id, "item_id", 64)))];
        for (const id of unique) {
          const item = await ownItem(event.id, id);
          if (item.status === "draft") throw new HttpError("Une activité en brouillon ne peut pas être affichée.");
        }
        const data = must(await supabase.from("live_events").update({ screen_items: unique }).eq("id", event.id).select("*").single());
        return json({ event: data });
      }

      case "hide_message": {
        const event = await authorize(body.public_code, body.admin_code);
        const messageId = str(body.message_id, "message_id", 64);
        const message = must(await supabase.from("live_messages").select("id, item_id").eq("id", messageId).maybeSingle());
        if (!message) throw new HttpError("Message introuvable.", 404);
        await ownItem(event.id, message.item_id);
        const data = must(await supabase
          .from("live_messages").update({ hidden: body.hidden !== false }).eq("id", messageId).select("*").single());
        return json({ message: data });
      }

      case "hide_messages": {
        // Masquer un mot du nuage = masquer toutes les propositions correspondantes d'un coup.
        const event = await authorize(body.public_code, body.admin_code);
        const itemId = str(body.item_id, "item_id", 64);
        await ownItem(event.id, itemId);
        const ids: unknown = body.message_ids;
        if (!Array.isArray(ids) || !ids.length || ids.length > 500) throw new HttpError("Liste de messages invalide.");
        const data = must(await supabase
          .from("live_messages").update({ hidden: body.hidden !== false })
          .eq("item_id", itemId).in("id", ids.map((id) => str(id, "message_id", 64))).select("id"));
        return json({ updated: data?.length ?? 0 });
      }

      case "reset_event": {
        // Efface tout ce qui a été produit (répétition, test) en gardant la
        // séquence, les notes et les codes. Les activités repassent en brouillon.
        const event = await authorize(body.public_code, body.admin_code);

        const people = must(await supabase.from("live_participants").select("id").eq("event_id", event.id)) ?? [];
        const items = must(await supabase.from("live_items").select("id").eq("event_id", event.id)) ?? [];
        const itemIds = items.map((i: { id: string }) => i.id);

        let answers = 0;
        let votes = 0;
        if (itemIds.length) {
          const { count: a } = await supabase.from("live_messages").select("id", { count: "exact", head: true }).in("item_id", itemIds);
          const { count: v } = await supabase.from("live_votes").select("id", { count: "exact", head: true }).in("item_id", itemIds);
          answers = a ?? 0;
          votes = v ?? 0;
          // Les messages et votes des participants partent en cascade ; ceux
          // rattachés à un item sans participant (cas impossible aujourd'hui,
          // mais on ne veut pas de résidu) sont supprimés explicitement.
          must(await supabase.from("live_messages").delete().in("item_id", itemIds));
          must(await supabase.from("live_votes").delete().in("item_id", itemIds));
          must(await supabase.from("live_items")
            .update({ status: "draft", activated_at: null, closed_at: null })
            .eq("event_id", event.id));
        }
        must(await supabase.from("live_participants").delete().eq("event_id", event.id));
        must(await supabase.from("live_events").update({ status: "open", screen_items: [] }).eq("id", event.id));

        return json({ reset: true, participants: people.length, answers, votes, items: itemIds.length });
      }

      case "close_event": {
        const event = await authorize(body.public_code, body.admin_code);
        const data = must(await supabase.from("live_events").update({ status: "closed" }).eq("id", event.id).select("*").single());
        return json({ event: data });
      }

      default:
        throw new HttpError("Action inconnue.");
    }
  } catch (err) {
    const status = err instanceof HttpError ? err.status : 400;
    const raw = err instanceof Error ? err.message : "Erreur inconnue.";
    // Messages Postgres bruts (anglais) → message compréhensible par l'animateur.
    const message = /duplicate key|unique constraint/i.test(raw)
      ? "Action déjà en cours depuis une autre régie. Rechargez la page puis réessayez."
      : raw;
    return json({ error: message }, status);
  }
});
