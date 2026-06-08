import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_API")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const RESEND_API_KEY   = Deno.env.get("RESEND_API_KEY");
const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID          = "appZ8ykNuUOv89ou0";
const TABLE_NAME       = "Réservations Demo Day";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { session_id } = await req.json();
    if (!session_id) throw new Error("session_id requis");

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") throw new Error("Paiement non confirmé");

    const { nom, prenom, organisation, role } = session.metadata ?? {};
    const email    = session.customer_details?.email ?? "";
    const fullName = `${prenom ?? ""} ${nom ?? ""}`.trim();

    // Email de confirmation à l'invité
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Niteo Toulouse <no-reply@marenostrum.tech>",
        to:   [email],
        bcc:  ["aymane@marenostrum.tech"],
        subject: "Votre présence au Demo Day Niteo 2026 est confirmée ✓",
        html: `
<p>Bonjour à toutes et tous,</p>
<p>Chers coachs, partenaires et entrepreneurs en résidence,</p>
<p>Ravi de vous annoncer le lancement officiel du programme NITEO Toulouse 2026 : 50 heures pour transformer les idées étudiantes en projets entrepreneuriaux concrets.</p>
<p>Merci pour votre confiance et pour avoir rejoint la dynamique toulousaine de NITEO en tant que coach, partenaire, parrain, expert ou entrepreneur en résidence.</p>
<p>Confirmez la date du <strong>mardi 16 juin 2026</strong> dans votre agenda, à la <strong>résidence Baragnon</strong> pour le demo day. Si vous ne pouvez être présent, vous pouvez nous indiquer la personne de votre organisation qui vous représentera.</p>
<p>Voici les horaires mis à jour :</p>
<ul>
  <li>14h : accueil café puis démarrage par une key note</li>
  <li>14h30 : session de pitchs devant jury</li>
  <li>17h : Délibération du jury et pause pour tous</li>
  <li>17h30 : Annonce des lauréats et remise des prix</li>
  <li>18h : Photo finale puis cocktail jusqu'à 19h30</li>
</ul>
<p>Vous avez la possibilité de venir sur toute la durée de l'événement (de 14h à 19h30), ou bien seulement de 17h30 à 19h30 pour la remise des prix et le cocktail.</p>
<p>Cette invitation est envoyée à titre individuelle et personnelle.</p>
<p>Un immense merci pour votre engagement – l'esprit d'entreprendre va briller grâce à vous à Toulouse !</p>
<p>À très vite,</p>
<p>Cordialement,<br>L'équipe Niteo / Mare Nostrum</p>
<hr>
<p style="color:#999;font-size:12px;">Mare Nostrum · Accompagnement entrepreneurial · Toulouse | Paris | Casablanca</p>
        `,
      }),
    });

    // Sauvegarde Airtable
    await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typecast: true,
        fields: {
          "Nom complet":      fullName,
          "Email":            email,
          "Organisation":     organisation ?? "",
          "Rôle":             role ?? "",
          "Statut":           "Payé",
          "Montant":          "25 EUR",
          "Session Stripe":   session_id,
        },
      }),
    });

    return new Response(JSON.stringify({ success: true, name: fullName }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("confirm-niteo-reservation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
