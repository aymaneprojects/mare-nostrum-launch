import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_API")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { nom, prenom, email, organisation, role } = await req.json();

    if (!nom || !prenom || !email) throw new Error("Champs obligatoires manquants.");

    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer = existing.data.length > 0
      ? existing.data[0]
      : await stripe.customers.create({ email, name: `${prenom} ${nom}` });

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      customer: customer.id,
      metadata: { nom, prenom, organisation: organisation ?? "", role: role ?? "" },
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: {
            name: "Invitation Demo Day Niteo Toulouse 2026",
            description: "Réservation présence Demo Day – 16 juin 2026, 14h-19h, Résidence Baragnon, Toulouse",
          },
          unit_amount: 2500,
        },
        quantity: 1,
      }],
      return_url: "https://niteo.marenostrum.tech/reservation?session_id={CHECKOUT_SESSION_ID}",
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("create-niteo-checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
