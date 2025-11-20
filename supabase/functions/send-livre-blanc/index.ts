import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LivreBlancRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  schoolType: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      position,
      schoolType,
    }: LivreBlancRequest = await req.json();

    console.log("Sending Livre Blanc to:", email);

    // Send email using Resend API with professional design
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <onboarding@resend.dev>",
        to: [email],
        subject: "Votre Livre Blanc - Pédagogie Entrepreneuriale 2025 🎓",
        html: `
          <h1>Mare Nostrum - Livre Blanc</h1>
          
          <h2>Pédagogie Entrepreneuriale 2025</h2>
          
          <p>Bonjour ${firstName} ${lastName},</p>
          
          <p>Nous vous remercions sincèrement d'avoir manifesté votre intérêt pour notre Livre Blanc sur la <strong>Pédagogie Entrepreneuriale 2025</strong>.</p>
          
          <p>Ce document exclusif vous accompagnera dans l'intégration de l'esprit entrepreneurial au sein de vos programmes éducatifs.</p>
          
          <p><strong>Vos informations :</strong></p>
          <ul>
            <li><strong>Organisation :</strong> ${organization}</li>
            <li><strong>Poste :</strong> ${position}</li>
            <li><strong>Type d'établissement :</strong> ${schoolType}</li>
            <li><strong>Téléphone :</strong> ${phone}</li>
          </ul>
          
          <p><strong>📥 Téléchargez votre Livre Blanc</strong></p>
          <p><a href="https://marenostrum.tech/livre-blanc">Accéder au Livre Blanc</a></p>
          
          <hr>
          
          <p><strong>Prochaines étapes</strong></p>
          <ol>
            <li>Explorez le document à votre rythme</li>
            <li>Identifiez les opportunités pour votre institution</li>
            <li>Contactez notre équipe pour un accompagnement personnalisé</li>
          </ol>
          
          <p><strong>Besoin d'échanger ?</strong></p>
          <p>Prenez rendez-vous avec nos experts :</p>
          <p><a href="https://calendly.com/aymane-marenostrum/30min">RDV avec Aymane</a></p>
          <p><a href="https://calendly.com/marenostrumtech/rdv-alexis">RDV avec Alexis</a></p>
          
          <p>Cordialement,<br>
          <strong>L'équipe Mare Nostrum</strong></p>
          
          <hr>
          
          <p>Mare Nostrum - Accélérateur d'entrepreneuriat éducatif<br>
          Toulouse | Casablanca | Tunis<br>
          <a href="mailto:contact@marenostrum.tech">contact@marenostrum.tech</a> | <a href="https://marenostrum.tech">marenostrum.tech</a></p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    // Log lead in console for tracking
    console.log("New lead collected:", {
      firstName,
      lastName,
      email,
      organization,
      position,
      schoolType,
      timestamp: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-livre-blanc function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
