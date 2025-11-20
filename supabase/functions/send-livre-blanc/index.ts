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

    // Send email using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <onboarding@resend.dev>",
        to: [email],
        subject: "Votre Livre Blanc - Pédagogie Entrepreneuriale 2025",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Merci pour votre intérêt!</h1>
            
            <p>Bonjour ${firstName} ${lastName},</p>
            
            <p>Nous vous remercions d'avoir téléchargé notre Livre Blanc sur la Pédagogie Entrepreneuriale 2025.</p>
            
            <p>Vous trouverez en pièce jointe le document qui vous aidera à intégrer l'esprit entrepreneurial dans vos programmes éducatifs.</p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a365d; margin-top: 0;">Vos informations</h3>
              <p style="margin: 5px 0;"><strong>Organisation:</strong> ${organization}</p>
              <p style="margin: 5px 0;"><strong>Fonction:</strong> ${position}</p>
              <p style="margin: 5px 0;"><strong>Type:</strong> ${schoolType}</p>
            </div>
            
            <p>Notre équipe reste à votre disposition pour tout complément d'information ou pour échanger sur vos projets pédagogiques.</p>
            
            <p style="margin-top: 30px;">
              Cordialement,<br>
              <strong>L'équipe Mare Nostrum</strong>
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096;">
              <p>Mare Nostrum - Accélérateur de croissance entrepreneuriale</p>
              <p>Téléphone: ${phone}</p>
            </div>
          </div>
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
