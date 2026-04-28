import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const stripe = new Stripe(Deno.env.get("STRIPE_API")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function generateCode(prenom: string): string {
  const base = prenom.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "CLUB";
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${base}-${rand}`;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: "Mare Nostrum <no-reply@marenostrum.tech>", to: [to], subject, html }),
  });
  if (!res.ok) throw new Error(`Resend error: ${JSON.stringify(await res.json())}`);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { prenom, email, phone, zone } = await req.json();

    const promoCode = generateCode(prenom);
    const zoneLabel = zone === "france" ? "France" : zone === "congo" ? "République du Congo" : "Autre pays";

    // ── Créer le code promo dans Stripe ───────────────────────────────────────
    const coupon = await stripe.coupons.create({
      percent_off: 50,
      duration: "once",
      max_redemptions: 1,
      name: `–50% premier mois — ${prenom}`,
    });

    await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: promoCode,
      max_redemptions: 1,
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 heures
    });

    // ── Email au visiteur ──────────────────────────────────────────────────────
    await sendEmail(
      email,
      `Ton code promo –50% — Club Mare Nostrum`,
      `
        <p>Bonjour ${prenom},</p>

        <p>Voici ton code promo personnalisé : <strong>${promoCode}</strong></p>

        <p>Il te donne <strong>–50% sur ton premier mois</strong> d'abonnement au Club Mare Nostrum. Entre-le au moment du paiement sur <a href="https://marenostrum.tech/club">marenostrum.tech/club</a>.</p>

        <p>⚠️ Ce code est valable <strong>24 heures</strong> et utilisable une seule fois.</p>

        <p>Cordialement,<br>L'équipe Mare Nostrum</p>

        <hr>

        <p>Mare Nostrum - Accompagnement entrepreneurial<br>
        Depuis Toulouse, dans tout l'espace francophone</p>
        <p><a href="mailto:contact@marenostrum.tech">contact@marenostrum.tech</a></p>
      `.trim()
    );

    // ── Notification interne ───────────────────────────────────────────────────
    await sendEmail(
      "contact@marenostrum.tech",
      `Nouveau lead popup — ${prenom} — Code : ${promoCode}`,
      `
<h2>Nouveau lead via popup exit-intent</h2>
<p><strong>Prénom :</strong> ${prenom}</p>
<p><strong>Email :</strong> ${email}</p>
${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
<p><strong>Zone :</strong> ${zoneLabel}</p>
<p><strong>Code promo généré :</strong> <code style="font-size:18px;font-weight:bold;">${promoCode}</code></p>
<hr/>
<p><small>Lead capturé via le popup –50% sur marenostrum.tech</small></p>
      `.trim()
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("send-promo-code error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
