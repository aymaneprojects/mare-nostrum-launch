import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Inscription gratuite au Club (offre freemium) : aucun paiement, aucun appel
// Stripe. Enregistre le membre dans club_freemium (service role uniquement).

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SLACK_URL = "https://join.slack.com/t/clubmarenostrum/shared_invite/zt-3k96xxhx1-UjfT8oy4ISyHKScmuqsleg";

// Mail de bienvenue freemium : celui des abonnés payants, sans le kit.
const MAIL_BIENVENUE = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a2238;max-width:560px">
  <p>Bonjour,</p>
  <p>Nous sommes ravis de vous compter parmi les membres du Club Mare Nostrum.</p>
  <p>Pour rejoindre l’espace digital du Club et commencer à échanger avec la communauté, merci de vous inscrire en cliquant sur le lien ci-dessous :</p>
  <p style="margin:0 0 24px"><a href="${SLACK_URL}" style="display:inline-block;background:#3fd0d4;color:#101a3a;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px">Rejoindre l’espace digital du Club Mare Nostrum</a></p>
  <p>N’hésitez pas à nous solliciter via la messagerie interne pour toute question.</p>
  <p>Au plaisir de vous retrouver très bientôt,</p>
  <p>L’équipe Mare Nostrum</p>
</div>`.trim();

async function envoyerBienvenue(to: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: "Club Mare Nostrum <no-reply@marenostrum.tech>",
      reply_to: "contact@marenostrum.tech",
      to: [to],
      subject: "Bienvenue au sein du Club Mare Nostrum !",
      html: MAIL_BIENVENUE,
    }),
  });
  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

const LOCATIONS = ["france", "congo_brazzaville"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);

  try {
    const body = await req.json();
    const prenom     = String(body?.prenom ?? "").trim().slice(0, 100);
    const email      = String(body?.email ?? "").trim().toLowerCase().slice(0, 254);
    const entreprise = String(body?.entreprise ?? "").trim().slice(0, 200);
    const location   = LOCATIONS.includes(body?.location) ? body.location : "france";

    if (!prenom || !EMAIL_RE.test(email)) return json({ error: "Champs invalides." }, 400);

    // Déjà inscrit : on ne touche à rien et on répond comme pour une nouvelle inscription.
    // .select() ne renvoie que la ligne réellement insérée : vide pour un e-mail déjà connu.
    const { data, error } = await supabase.from("club_freemium").upsert(
      { email, first_name: prenom, company: entreprise || null, location },
      { onConflict: "email", ignoreDuplicates: true },
    ).select("email");
    if (error) {
      console.error("Inscription freemium impossible:", error.message);
      return json({ error: "Erreur temporaire." }, 500);
    }
    // Mail de bienvenue seulement pour une nouvelle inscription ; une panne d'envoi
    // ne fait jamais échouer l'inscription.
    if (data && data.length > 0) {
      try {
        await envoyerBienvenue(email);
      } catch (e) {
        console.error("Mail de bienvenue freemium non envoyé:", (e as Error).message);
      }
    }
    return json({ ok: true });
  } catch (error: any) {
    console.error("club-freemium-signup:", error.message);
    return json({ error: "Requête invalide." }, 400);
  }
});
