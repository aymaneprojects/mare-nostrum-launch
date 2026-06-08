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
        subject: `${fullName ? fullName + ", votre" : "Votre"} invitation au Demo Day Niteo Toulouse 2026`,
        html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4ef;font-family:'DM Sans',Arial,sans-serif;color:#1a2340;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#2d4a7a 0%,#0e1635 100%);padding:40px 48px;text-align:center;">
            <div style="display:inline-block;background:rgba(61,214,200,0.15);border:1px solid rgba(61,214,200,0.3);border-radius:6px;padding:6px 16px;margin-bottom:24px;">
              <span style="color:#3dd6c8;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Invitation confirmée ✓</span>
            </div>
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;line-height:1.2;">Demo Day Niteo</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:15px;">Toulouse 2026</p>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:40px 48px 24px;">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1a2340;">
              Bonjour ${fullName ? `<strong>${fullName}</strong>` : ""},
            </p>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4a5568;">
              Votre réservation est confirmée. Nous sommes ravis de vous accueillir pour cette journée exceptionnelle où les étudiants entrepreneurs de Toulouse présenteront leurs projets devant un jury de décideurs.
            </p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#4a5568;">
              Si vous ne pouvez être présent(e), vous pouvez nous indiquer la personne de votre organisation qui vous représentera en répondant à cet email.
            </p>
          </td>
        </tr>

        <!-- Infos clés -->
        <tr>
          <td style="padding:0 48px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f3;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;">
                  <table width="100%" cellpadding="0" cellspacing="12">
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #e8e4d9;">
                        <span style="color:#3dd6c8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Date</span><br>
                        <span style="color:#1a2340;font-size:15px;font-weight:600;">Mardi 16 juin 2026</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px solid #e8e4d9;">
                        <span style="color:#3dd6c8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Lieu</span><br>
                        <span style="color:#1a2340;font-size:15px;font-weight:600;">Résidence Baragnon, Toulouse</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="color:#3dd6c8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Horaires</span><br>
                        <span style="color:#1a2340;font-size:15px;font-weight:600;">14h00 – 19h30</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Programme -->
        <tr>
          <td style="padding:0 48px 32px;">
            <h2 style="margin:0 0 20px;font-size:16px;font-weight:700;color:#1a2340;text-transform:uppercase;letter-spacing:0.08em;">Programme</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                { time: "14h00", label: "Accueil café & keynote d'ouverture", bold: false },
                { time: "14h30", label: "Session de pitchs devant jury", bold: false },
                { time: "17h00", label: "Délibération du jury & pause", bold: false },
                { time: "17h30", label: "Annonce des lauréats & remise des prix", bold: true },
                { time: "18h00", label: "Photo de groupe & cocktail jusqu'à 19h30", bold: false },
              ].map(s => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0ece3;vertical-align:top;width:60px;">
                  <span style="color:#3dd6c8;font-size:13px;font-weight:700;font-family:monospace;">${s.time}</span>
                </td>
                <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0ece3;">
                  <span style="color:#1a2340;font-size:14px;${s.bold ? "font-weight:700;" : "font-weight:400;"}">${s.label}</span>
                </td>
              </tr>`).join("")}
            </table>
            <p style="margin:16px 0 0;font-size:13px;color:#8a8fa8;font-style:italic;">
              Vous pouvez assister à l'intégralité de l'événement (14h–19h30) ou uniquement à partir de 17h30 pour la remise des prix et le cocktail.
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 48px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#8a8fa8;">Cette invitation est personnelle et nominative.</p>
            <p style="margin:0;font-size:14px;color:#4a5568;line-height:1.6;">
              À très vite à Toulouse,<br>
              <strong style="color:#1a2340;">L'équipe Niteo · Mare Nostrum</strong>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0e1635;padding:20px 48px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;line-height:1.6;">
              Mare Nostrum · Accompagnement entrepreneurial<br>
              Toulouse · Paris · Casablanca
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
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
