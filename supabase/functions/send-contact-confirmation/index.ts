import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SPAM_KEYWORDS = [
  "casino", "viagra", "bitcoin", "crypto porn", "xxx", "loan offer",
  "forex", "investment opportunity", "make money fast", "click here now",
  "free money", "earn $", "work from home", "weight loss pill",
];

function isSpam(data: { name: string; email: string; message: string; website?: string }): boolean {
  if (data.website && data.website.trim().length > 0) return true;

  const name  = (data.name    ?? "").trim();
  const email = (data.email   ?? "").trim();
  const msg   = (data.message ?? "").trim();

  let score = 0;
  if (!name || name.length < 2)                                               score += 50;
  if (!email || !email.includes("@") || email.split("@")[1]?.indexOf(".") < 1) score += 80;
  if (!msg || msg.length < 15)                                                score += 60;
  if ((msg.match(/https?:\/\//gi) ?? []).length >= 3)                         score += 55;
  if (/(.)\1{6,}/.test(msg))                                                  score += 40;
  if (SPAM_KEYWORDS.some(kw => msg.toLowerCase().includes(kw)))               score += 70;

  return score >= 50;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, email, phone, type, message, website } = await req.json();

    // Pas de confirmation envoyée aux spammeurs
    if (isSpam({ name, email, message, website })) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to: [email],
        subject: "Confirmation de votre message - Mare Nostrum",
        html: `
        <p>Bonjour ${name},</p>

        <p>Nous avons bien reçu votre message et nous vous en remercions.</p>

        <p><strong>Résumé de votre demande :</strong></p>
        <p>Profil : ${type}</p>
        ${phone ? `<p>Téléphone : ${phone}</p>` : ''}
        <p>Message :<br>${message}</p>

        <p>Notre équipe vous répondra dans un délai maximum de 48 heures ouvrées.</p>

        <p>Cordialement,<br>L'équipe Mare Nostrum</p>

        <hr>

        <p>Mare Nostrum - Accompagnement entrepreneurial<br>
        Toulouse | Casablanca | Tunis</p>
        <p><a href="mailto:contact@marenostrum.tech">contact@marenostrum.tech</a></p>
      `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
