import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_API")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Offer = "communaute" | "groupe" | "individuel";
type Location = "france" | "congo_brazzaville";
type Billing = "monthly" | "annual";

// EUR in cents, XOF is zero-decimal (face value)
const PRICES: Record<Location, Record<Billing, Record<Offer, number>>> = {
  france: {
    monthly: { communaute: 3000,   groupe: 9000,   individuel: 19000  },
    annual:  { communaute: 28800,  groupe: 86400,  individuel: 172800 },
  },
  congo_brazzaville: {
    monthly: { communaute: 10000,  groupe: 30000,  individuel: 80000  },
    annual:  { communaute: 100000, groupe: 300000, individuel: 800000 },
  },
};

const OFFER_NAMES: Record<Offer, string> = {
  communaute: "Communauté",
  groupe: "Groupe",
  individuel: "Individuel",
};

const CURRENCIES: Record<Location, string> = {
  france: "eur",
  congo_brazzaville: "xof",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { offer, location, billing, prenom, email, entreprise, stade } = await req.json() as {
      offer: Offer;
      location: Location;
      billing: Billing;
      prenom: string;
      email: string;
      entreprise?: string;
      stade?: string;
    };

    if (!offer || !location || !billing || !prenom || !email) {
      throw new Error("Champs obligatoires manquants.");
    }

    const currency = CURRENCIES[location];
    const amount = PRICES[location][billing][offer];
    const interval = billing === "monthly" ? "month" : "year";
    const billingLabel = billing === "monthly" ? "mensuel" : "annuel";

    // Pré-créer un customer pour y attacher prénom + entreprise
    const customer = await stripe.customers.create({
      email,
      name: [prenom, entreprise].filter(Boolean).join(" — ") || prenom,
      metadata: {
        prenom,
        entreprise: entreprise ?? "",
        stade: stade ?? "",
        offer,
        location,
        billing,
      },
    });

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "subscription",
      customer: customer.id,
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name: `Club Mare Nostrum — ${OFFER_NAMES[offer]}`,
            description: `Abonnement ${billingLabel} — Club Entrepreneur Mare Nostrum`,
          },
          unit_amount: amount,
          recurring: { interval },
        },
        quantity: 1,
      }],
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      return_url: "https://marenostrum.tech/club?success=true",
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
