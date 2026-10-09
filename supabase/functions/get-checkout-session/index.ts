import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_API")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const KIT_URL   = "https://drive.google.com/file/d/1FVsdyMqBs7QG4FpGYzEO4o1yH5MkzUDj/view";
const KIT_PDF   = "https://marenostrum.tech/kit-adherent-club.pdf";
const SLACK_URL = "https://join.slack.com/t/clubmarenostrum/shared_invite/zt-3k96xxhx1-UjfT8oy4ISyHKScmuqsleg";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const bouton = (href: string, label: string, fond: string, texte: string) =>
  `<p style="margin:0 0 24px"><a href="${href}" style="display:inline-block;background:${fond};color:${texte};text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px">${label}</a></p>`;

const MAIL_BIENVENUE = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a2238;max-width:560px">
  <p>Bonjour,</p>
  <p>Nous sommes ravis de vous compter parmi nos abonnés.</p>
  <p>Vous trouverez en pièce jointe votre kit de bienvenue, qui présente :</p>
  <ul>
    <li>l’espace d’échanges entre pairs,</li>
    <li>la veille d’opportunités ciblées,</li>
    <li>la prise de rendez-vous « visio galère ».</li>
  </ul>
  <p>Prenez quelques minutes pour parcourir le document joint : il vous guidera pas à pas dans vos premiers échanges avec la communauté et reprend toutes les informations pratiques, notamment sur le fonctionnement du Club et de l’espace digital.</p>
  ${bouton(KIT_URL, "Télécharger le kit de bienvenue", "#2c3a6b", "#ffffff")}
  <p>Pour rejoindre l’espace digital du Club Mare Nostrum et commencer à échanger avec la communauté, merci de vous inscrire en cliquant sur le lien ci-dessous :</p>
  ${bouton(SLACK_URL, "Rejoindre l’espace digital du Club Mare Nostrum", "#3fd0d4", "#101a3a")}
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
      attachments: [{ filename: "Kit de bienvenue - Club Mare Nostrum.pdf", path: KIT_PDF }],
    }),
  });
  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "sessionId required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid = session.payment_status === "paid";
    const meta = session.metadata ?? {};
    const email = session.customer_details?.email ?? "";

    // Mail de bienvenue : une seule fois par session payante du Club (Premium ou Groupe).
    // Le marqueur est posé AVANT l'envoi (même parade que Niteo contre les doublons du
    // sondage toutes les 3 s) ; si l'envoi échoue, il est retiré pour qu'un nouvel appel réessaie.
    // Le marqueur est posé sur l'abonnement (la bibliothèque Stripe 14.21 n'a pas
    // checkout.sessions.update).
    const aPaye = paid || session.payment_status === "no_payment_required";
    const subId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
    if (aPaye && session.status === "complete" && email && subId && ["communaute", "groupe"].includes(meta.offer ?? "")) {
      const sub = await stripe.subscriptions.retrieve(subId);
      if (sub.metadata?.bienvenue !== "envoye") {
        await stripe.subscriptions.update(subId, { metadata: { bienvenue: "envoye" } });
        try {
          await envoyerBienvenue(email);
        } catch (e) {
          console.error("Mail de bienvenue non envoyé:", (e as Error).message);
          await stripe.subscriptions.update(subId, { metadata: { bienvenue: "" } });
        }
      }
    }

    return new Response(JSON.stringify({
      paid,
      prenom:   meta.prenom   ?? "",
      email,
      offer:    meta.offer    ?? "",
      location: meta.location ?? "",
      billing:  meta.billing  ?? "",
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
