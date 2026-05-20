import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY  = Deno.env.get("RESEND_API_KEY");
const AIRTABLE_KEY    = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID         = "appZ8ykNuUOv89ou0";
const TABLE_ID        = "tblocqquF4OXgXveO";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SEGMENT_MAP: Record<string, string> = {
  ecole:        "École / Université",
  entrepreneur: "Entrepreneur / Dirigeant",
  etudiant:     "Étudiant",
  partenaire:   "Partenaire",
  autre:        "Autre",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, type, message, country } = await req.json();

    // ── save to Airtable ──
    try {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typecast: true,
          fields: {
            "Prénom / Nom":        name,
            "Mail":                email,
            "Téléphone":           phone ?? "",
            "Segment":             SEGMENT_MAP[type] ?? type ?? "",
            "Lead Type":           "Lead Froid",
            "Expérience":          "Formulaire site web",
            "Commentaires libres": message ?? "",
            "confidentialité":     true,
            "Input CTA Site web":  "Contact",
          },
        }),
      });
    } catch (airtableErr) {
      console.error("Airtable error (non-blocking):", airtableErr);
    }

    // ── notify Mare Nostrum team ──
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to: ["contact@marenostrum.tech"],
        subject: `Nouveau message de ${name} — ${SEGMENT_MAP[type] ?? type}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
          <p><strong>Pays :</strong> ${country ?? "—"}</p>
          <p><strong>Profil :</strong> ${SEGMENT_MAP[type] ?? type}</p>
          <p><strong>Message :</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>Formulaire de contact — marenostrum.tech</small></p>
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
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
