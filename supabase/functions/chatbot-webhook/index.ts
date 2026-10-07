import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

// ─────────────────────────────────────────────────────────────────────────────
// Pont entre le chat du site et Inès (agent Hermes).
//
//   Visiteur ──POST──▶ ce webhook ──▶ table chatbot_messages
//   Relais Hermes ──GET ?action=pending──▶ messages à traiter   (jeton exigé)
//   Relais Hermes ──POST ?action=reply───▶ réponse d'Inès       (jeton exigé)
//   Visiteur ──GET ?action=history────────▶ sa conversation
//
// Les deux routes du relais sont réservées à Hermes : sans le jeton
// HERMES_RELAY_TOKEN elles refusent tout. Avant ce correctif, n'importe qui
// pouvait lire les messages de tous les visiteurs ou écrire à la place d'Inès.
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RELAY_TOKEN = Deno.env.get("HERMES_RELAY_TOKEN") ?? "";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-relay-token",
};

const MAX_MESSAGE = 1000;          // caractères par message de visiteur
const MAX_REPLY = 4000;            // caractères par réponse d'Inès
const MAX_PER_MINUTE = 8;          // messages par visiteur et par minute
const MAX_PENDING = 100;           // file d'attente globale : au-delà, on refuse
const SESSION_RE = /^[A-Za-z0-9_-]{8,64}$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/** Comparaison à temps constant : ne révèle pas le jeton par le temps de réponse. */
function jetonValide(req: Request): boolean {
  const recu = req.headers.get("x-relay-token") ?? "";
  if (!RELAY_TOKEN || recu.length !== RELAY_TOKEN.length) return false;
  let ecart = 0;
  for (let i = 0; i < recu.length; i++) ecart |= recu.charCodeAt(i) ^ RELAY_TOKEN.charCodeAt(i);
  return ecart === 0;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  // ── 1. Le visiteur envoie un message (depuis le site) ──
  if (req.method === "POST" && !action) {
    try {
      const { message, sessionId } = await req.json();
      if (typeof message !== "string" || !message.trim() || !SESSION_RE.test(String(sessionId ?? ""))) {
        return json({ error: "message and sessionId required" }, 400);
      }
      if (message.length > MAX_MESSAGE) return json({ error: "message too long" }, 413);

      // Anti-flood : chaque message coûte un appel au modèle.
      const depuis = new Date(Date.now() - 60_000).toISOString();
      const { count: recents } = await supabase
        .from("chatbot_messages").select("id", { count: "exact", head: true })
        .eq("session_id", sessionId).eq("role", "user").gte("created_at", depuis);
      if ((recents ?? 0) >= MAX_PER_MINUTE) return json({ error: "too many messages" }, 429);

      const { count: enAttente } = await supabase
        .from("chatbot_messages").select("id", { count: "exact", head: true })
        .eq("role", "user").eq("processed", false);
      if ((enAttente ?? 0) >= MAX_PENDING) return json({ error: "busy" }, 503);

      const { error } = await supabase.from("chatbot_messages").insert({
        session_id: sessionId, role: "user", content: message.trim(), processed: false,
      });
      if (error) throw error;

      return json({ success: true, reply: "Merci pour ton message ! Inès va te répondre dès que possible. 💬" });
    } catch (error) {
      console.error("POST error:", error);
      return json({ error: "Internal server error" }, 500);
    }
  }

  // ── 2. Hermes récupère les messages non traités (réservé au relais) ──
  if (req.method === "GET" && action === "pending") {
    if (!jetonValide(req)) return json({ error: "forbidden" }, 403);
    try {
      const { data, error } = await supabase
        .from("chatbot_messages").select("*")
        .eq("processed", false).eq("role", "user")
        .order("created_at", { ascending: true }).limit(10);
      if (error) throw error;
      return json({ messages: data });
    } catch (error) {
      console.error("GET pending error:", error);
      return json({ error: "Internal server error" }, 500);
    }
  }

  // ── 3. Hermes poste la réponse d'Inès (réservé au relais) ──
  if (req.method === "POST" && action === "reply") {
    if (!jetonValide(req)) return json({ error: "forbidden" }, 403);
    try {
      const { sessionId, reply } = await req.json();
      if (!SESSION_RE.test(String(sessionId ?? "")) || typeof reply !== "string" || !reply.trim()) {
        return json({ error: "sessionId and reply required" }, 400);
      }

      const { error: errInsert } = await supabase.from("chatbot_messages").insert({
        session_id: sessionId, role: "assistant", content: reply.trim().slice(0, MAX_REPLY), processed: true,
      });
      if (errInsert) throw errInsert;

      await supabase.from("chatbot_messages").update({ processed: true })
        .eq("session_id", sessionId).eq("role", "user").eq("processed", false);

      return json({ success: true });
    } catch (error) {
      console.error("POST reply error:", error);
      return json({ error: "Internal server error" }, 500);
    }
  }

  // ── 4. Le visiteur relit sa conversation ──
  if (req.method === "GET" && action === "history") {
    try {
      const sessionId = url.searchParams.get("sessionId") ?? "";
      if (!SESSION_RE.test(sessionId)) return json({ error: "sessionId required" }, 400);

      const { data, error } = await supabase
        .from("chatbot_messages").select("role, content, created_at")
        .eq("session_id", sessionId).order("created_at", { ascending: true });
      if (error) throw error;
      return json({ messages: data });
    } catch (error) {
      console.error("GET history error:", error);
      return json({ error: "Internal server error" }, 500);
    }
  }

  return json({ error: "Invalid request" }, 400);
});
