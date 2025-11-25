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
          <p>Bonjour ${firstName} ${lastName},</p>
          
          <p>Nous vous remercions sincèrement d'avoir manifesté votre intérêt pour notre Livre Blanc sur la Pédagogie Entrepreneuriale 2025.</p>
          
          <p>Ce document exclusif vous accompagnera dans l'intégration de l'esprit entrepreneurial au sein de vos programmes éducatifs.</p>
          
          <p><strong>Vos informations :</strong></p>
          <ul>
            <li>Organisation : ${organization}</li>
            <li>Fonction : ${position}</li>
            <li>Type d'établissement : ${schoolType}</li>
          </ul>
          
          <p><a href="https://drive.google.com/file/d/1yJqcf4v3Z63Mbr4EDJzj_keUcsvk9Ga4/view?usp=sharing">Télécharger le Livre Blanc</a></p>
          
          <p>Notre équipe reste à votre entière disposition pour tout complément d'information ou pour échanger sur vos projets pédagogiques.</p>
          
          <p>Cordialement,<br>L'équipe Mare Nostrum</p>
          
          <hr>
          
          <p>Mare Nostrum<br>
          Accélérateur de croissance entrepreneuriale<br>
          Téléphone : ${phone}</p>
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
