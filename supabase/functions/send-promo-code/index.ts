import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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
    const zoneLabel = zone === "france" ? "France" : "Afrique francophone";

    // ── Email au visiteur ──────────────────────────────────────────────────────
    await sendEmail(
      email,
      `${prenom}, voici ton code promo exclusif Mare Nostrum`,
      `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#2d3e6e 0%,#1a2440 100%);padding:36px 40px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#4dd9d5;">Offre exclusive</p>
            <h1 style="margin:0;font-size:28px;font-style:italic;color:#ffffff;line-height:1.2;">Ton code promo<br/>–10% le premier mois</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;font-size:16px;color:#334155;line-height:1.6;">Bonjour <strong>${prenom}</strong>,</p>
            <p style="margin:0 0 28px;font-size:15px;color:#64748b;line-height:1.65;">
              Comme promis, voici ton code promo personnalisé. Il te donne <strong>–10% sur ton premier mois</strong> d'abonnement au Club Mare Nostrum.
            </p>

            <!-- Promo code block -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf9;border:2px solid #4dd9d5;border-radius:12px;margin-bottom:28px;">
              <tr>
                <td style="padding:24px;text-align:center;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4dd9d5;">Ton code promo</p>
                  <p style="margin:0;font-size:32px;font-weight:700;letter-spacing:6px;color:#1a2440;font-family:'Courier New',monospace;">${promoCode}</p>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 16px;font-size:14px;color:#64748b;line-height:1.6;">
              Pour l'utiliser : rends-toi sur <a href="https://marenostrum.tech/croissance" style="color:#4dd9d5;text-decoration:none;font-weight:600;">marenostrum.tech/croissance</a>, choisis ton offre et entre ce code au moment du paiement.
            </p>
            <p style="margin:0 0 28px;font-size:14px;color:#94a3b8;">Notre équipe te contactera également sous 24h pour répondre à tes questions et valider ton code.</p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
              <tr>
                <td style="background:#4dd9d5;border-radius:8px;padding:14px 32px;text-align:center;">
                  <a href="https://marenostrum.tech/croissance" style="color:#1a2440;text-decoration:none;font-weight:700;font-size:15px;">Rejoindre le Club →</a>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.6;">
              Ce code est personnel et valable une seule fois.<br/>
              Des questions ? Réponds directement à cet email ou écris-nous à <a href="mailto:contact@marenostrum.tech" style="color:#4dd9d5;">contact@marenostrum.tech</a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">Mare Nostrum · Depuis Toulouse, dans tout l'espace francophone</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
<p><small>Lead capturé via le popup –10% sur marenostrum.tech</small></p>
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
