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
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Livre Blanc - Mare Nostrum</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
              <tr>
                <td style="padding: 40px 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with gradient -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 40px 60px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; line-height: 1.2;">
                          Livre Blanc
                        </h1>
                        <p style="margin: 12px 0 0; color: #e0e7ff; font-size: 20px; font-weight: 600;">
                          Pédagogie Entrepreneuriale 2025
                        </p>
                      </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="margin: 0 0 24px; color: #1f2937; font-size: 18px; font-weight: 600;">
                          Bonjour ${firstName} ${lastName},
                        </p>
                        
                        <p style="margin: 0 0 16px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Nous vous remercions sincèrement d'avoir manifesté votre intérêt pour notre Livre Blanc sur la <strong>Pédagogie Entrepreneuriale 2025</strong>.
                        </p>
                        
                        <p style="margin: 0 0 32px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Ce document exclusif vous accompagnera dans l'intégration de l'esprit entrepreneurial au sein de vos programmes éducatifs.
                        </p>

                        <!-- Info box -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; margin-bottom: 32px;">
                          <tr>
                            <td style="padding: 24px;">
                              <h3 style="margin: 0 0 16px; color: #1e40af; font-size: 18px; font-weight: 700;">
                                📋 Vos informations
                              </h3>
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                  <td style="padding: 6px 0; color: #1f2937; font-size: 14px;">
                                    <strong>Organisation:</strong>
                                  </td>
                                  <td style="padding: 6px 0; color: #4b5563; font-size: 14px; text-align: right;">
                                    ${organization}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 6px 0; color: #1f2937; font-size: 14px;">
                                    <strong>Fonction:</strong>
                                  </td>
                                  <td style="padding: 6px 0; color: #4b5563; font-size: 14px; text-align: right;">
                                    ${position}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 6px 0; color: #1f2937; font-size: 14px;">
                                    <strong>Type d'établissement:</strong>
                                  </td>
                                  <td style="padding: 6px 0; color: #4b5563; font-size: 14px; text-align: right;">
                                    ${schoolType}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- CTA note -->
                        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 32px;">
                          <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                            <strong>📎 Le PDF vous sera envoyé dans un prochain email.</strong><br>
                            Si vous ne le recevez pas, vérifiez vos courriers indésirables.
                          </p>
                        </div>

                        <p style="margin: 0 0 16px; color: #4b5563; font-size: 16px; line-height: 1.6;">
                          Notre équipe reste à votre entière disposition pour tout complément d'information ou pour échanger sur vos projets pédagogiques.
                        </p>

                        <p style="margin: 32px 0 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                          Cordialement,<br>
                          <strong style="color: #1e40af;">L'équipe Mare Nostrum</strong>
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8fafc; padding: 32px 40px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 8px; color: #1e40af; font-size: 16px; font-weight: 700; text-align: center;">
                          Mare Nostrum
                        </p>
                        <p style="margin: 0 0 4px; color: #6b7280; font-size: 14px; text-align: center;">
                          Accélérateur de croissance entrepreneuriale
                        </p>
                        <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                          📞 ${phone}
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
