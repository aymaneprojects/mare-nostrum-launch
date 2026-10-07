import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID = "appZ8ykNuUOv89ou0";
const TABLE_ID = "tblocqquF4OXgXveO";
const BROCHURE_URL = "https://www.marenostrum.tech/documents/mastermind-neo-entrepreneurs.pdf";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const validEmail = (value: unknown): value is string =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { email, website } = await req.json();

    // Honeypot: return success silently to avoid helping automated spam adapt.
    if (website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!validEmail(email)) {
      return new Response(JSON.stringify({ error: "Adresse e-mail invalide" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const recipient = email.trim().toLowerCase();
    if (!RESEND_API_KEY) throw new Error("Service e-mail indisponible");

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to: [recipient],
        subject: "Votre fiche détaillée — Mastermind néo-entrepreneurs",
        html: `
          <p>Bonjour,</p>
          <p>Merci pour votre intérêt pour le <strong>Mastermind néo-entrepreneurs</strong> de Mare Nostrum.</p>
          <p>Vous pouvez télécharger la fiche de présentation détaillée en cliquant sur le lien ci-dessous :</p>
          <p><a href="${BROCHURE_URL}">Télécharger la fiche détaillée (PDF)</a></p>
          <p>Pour toute question, vous pouvez nous écrire à <a href="mailto:education@marenostrum.tech">education@marenostrum.tech</a>.</p>
          <p>À bientôt,<br>L'équipe Mare Nostrum</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Erreur d'envoi e-mail : ${errorText}`);
    }

    // Lead tracking is intentionally non-blocking: a temporary Airtable issue must not prevent delivery.
    if (AIRTABLE_API_KEY) {
      try {
        const airtableResponse = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            typecast: true,
            fields: {
              "Prénom / Nom": "Demande de fiche Mastermind",
              "Mail": recipient,
              "Expérience": "Demande de fiche formation",
              "Input CTA Site web": "Mastermind néo-entrepreneurs",
              "Lead Type": "Lead Chaud",
            },
          }),
        });
        if (!airtableResponse.ok) console.error("Airtable tracking failed:", await airtableResponse.text());
      } catch (airtableError) {
        console.error("Airtable tracking error:", airtableError);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("send-mastermind-brochure error:", error);
    return new Response(JSON.stringify({ error: "L'envoi a échoué. Veuillez réessayer." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
