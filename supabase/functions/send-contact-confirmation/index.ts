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
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
                padding: 30px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .header h1 {
                color: white;
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              }
              .message-box {
                background: #f9fafb;
                border-left: 4px solid #3b82f6;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                background: #f9fafb;
                padding: 20px 30px;
                text-align: center;
                border-radius: 0 0 8px 8px;
                border: 1px solid #e5e7eb;
                border-top: none;
                font-size: 14px;
                color: #6b7280;
              }
              .button {
                display: inline-block;
                background: #3b82f6;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Mare Nostrum</h1>
            </div>
            <div class="content">
              <h2>Bonjour ${name},</h2>
              <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
              
              <div class="message-box">
                <strong>Résumé de votre demande :</strong><br><br>
                <strong>Profil :</strong> ${type}<br>
                ${phone ? `<strong>Téléphone :</strong> ${phone}<br>` : ''}
                <strong>Message :</strong><br>
                ${message}
              </div>
              
              <p>Notre équipe vous répondra dans un délai maximum de <strong>48 heures ouvrées</strong>.</p>
              
              <p>En attendant, n'hésitez pas à prendre rendez-vous directement avec notre équipe :</p>
              
              <a href="https://calendly.com/aymane-marenostrum/30min" class="button">Prendre RDV avec Aymane</a>
              <a href="https://calendly.com/marenostrumtech/rdv-alexis" class="button">Prendre RDV avec Alexis</a>
              
              <p>Cordialement,<br><strong>L'équipe Mare Nostrum</strong></p>
            </div>
            <div class="footer">
              <p>Mare Nostrum - Accompagnement entrepreneurial<br>
              Toulouse | Casablanca | Tunis</p>
              <p>
                <a href="mailto:contact@marenostrum.tech" style="color: #3b82f6; text-decoration: none;">contact@marenostrum.tech</a>
              </p>
            </div>
          </body>
        </html>
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
