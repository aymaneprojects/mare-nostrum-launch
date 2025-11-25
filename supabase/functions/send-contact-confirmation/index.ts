import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, type, message }: ContactFormData = await req.json();

    console.log("Sending confirmation email to:", email);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <onboarding@resend.dev>",
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
          
          <p>En attendant, n'hésitez pas à prendre rendez-vous directement avec notre équipe :</p>
          <p>
            <a href="https://calendly.com/aymane-marenostrum/30min">Prendre RDV avec Aymane</a><br>
            <a href="https://calendly.com/marenostrumtech/rdv-alexis">Prendre RDV avec Alexis</a>
          </p>
          
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

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending confirmation email:", error);
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
