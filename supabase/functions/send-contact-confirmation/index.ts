import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    const emailResponse = await resend.emails.send({
      from: "Mare Nostrum <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation de votre message - Mare Nostrum",
      html: `
        <h1>Mare Nostrum</h1>
        
        <h2>Bonjour ${name},</h2>
        <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
        
        <p><strong>Résumé de votre demande :</strong></p>
        <p><strong>Profil :</strong> ${type}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
        <p><strong>Message :</strong><br>${message}</p>
        
        <p>Notre équipe vous répondra dans un délai maximum de <strong>48 heures ouvrées</strong>.</p>
        
        <p>En attendant, n'hésitez pas à prendre rendez-vous directement avec notre équipe :</p>
        
        <p><a href="https://calendly.com/aymane-marenostrum/30min">Prendre RDV avec Aymane</a></p>
        <p><a href="https://calendly.com/marenostrumtech/rdv-alexis">Prendre RDV avec Alexis</a></p>
        
        <p>Cordialement,<br><strong>L'équipe Mare Nostrum</strong></p>
        
        <hr>
        
        <p>Mare Nostrum - Accompagnement entrepreneurial<br>
        Toulouse | Casablanca | Tunis</p>
        <p><a href="mailto:contact@marenostrum.tech">contact@marenostrum.tech</a></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
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
