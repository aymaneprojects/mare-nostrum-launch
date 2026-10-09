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

// L'offre « individuel » (Personnalisé) est retirée : voir la retranscription
// « Priorités commerciales - Temps Forts ». Les abonnements déjà souscrits restent
// gérés dans Stripe. Le freemium ne passe jamais par ici (club-freemium-signup).
type Offer    = "communaute" | "groupe";
type Location = "france" | "congo_brazzaville";
type Billing  = "monthly" | "annual";

// EUR en centimes, XOF est zero-decimal
const PRICES: Record<Location, Record<Billing, Record<Offer, number>>> = {
  france: {
    monthly: { communaute: 3000,   groupe: 9000   },
    annual:  { communaute: 28800,  groupe: 86400  },
  },
  congo_brazzaville: {
    monthly: { communaute: 10000,  groupe: 30000  },
    annual:  { communaute: 100000, groupe: 300000 },
  },
};

const OFFER_NAMES: Record<Offer, string> = {
  communaute: "Premium",
  groupe:     "Individualisé",
};

const CURRENCIES: Record<Location, string> = {
  france:            "eur",
  congo_brazzaville: "xof",
};

// Taux TVA — affichés sur facture et checkout
const TAX_RATE_FR_FORMATION = "txr_1TZv2WRtzJviITg0a9uhLZHZ"; // 0%  — Exonération formation art. 261-4-4a CGI
const TAX_RATE_FR_20        = "txr_1TZv7YRtzJviITg0BxVVs14X"; // 20% — TVA services digitaux France
const TAX_RATE_EXPORT       = "txr_1TZv2WRtzJviITg0Dd3ZXPaZ"; // 0%  — TVA à l'export art. 262 I CGI

// Modèles de facture (Invoice Rendering Templates)
const INVOICE_TPL_FR: Record<Offer, string> = {
  communaute: "inrtem_1TZv63RtzJviITg0y2KK0DoH",
  groupe:     "inrtem_1TZukIRtzJviITg0ZPPC9xLv",
};
const INVOICE_TPL_EXPORT = "inrtem_1TZunVRtzJviITg0YK8HfB4s";

function getTaxRate(offer: Offer, isFrance: boolean): string {
  if (!isFrance) return TAX_RATE_EXPORT;
  return offer === "communaute" ? TAX_RATE_FR_20 : TAX_RATE_FR_FORMATION;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { offer, location, billing, prenom, email, entreprise, stade } = await req.json() as {
      offer: Offer; location: Location; billing: Billing;
      prenom: string; email: string; entreprise?: string; stade?: string;
    };

    if (!offer || !location || !billing || !prenom || !email) {
      throw new Error("Champs obligatoires manquants.");
    }
    if (!(offer in OFFER_NAMES) || !(location in PRICES) || !(billing in PRICES[location])) {
      throw new Error("Offre indisponible.");
    }

    const isFrance     = location === "france";
    const currency     = CURRENCIES[location];
    const amount       = PRICES[location][billing][offer];
    const interval     = billing === "monthly" ? "month" : "year";
    const billingLabel = billing === "monthly" ? "mensuel" : "annuel";
    const taxRate      = getTaxRate(offer, isFrance);
    const invoiceTpl   = isFrance ? INVOICE_TPL_FR[offer] : INVOICE_TPL_EXPORT;

    // Trouver ou créer le customer avec le bon modèle de facture
    const existing = await stripe.customers.list({ email, limit: 1 });
    const customer = existing.data.length > 0
      ? await stripe.customers.update(existing.data[0].id, {
          invoice_settings: { rendering_options: { template: invoiceTpl } },
        })
      : await stripe.customers.create({
          email,
          name: prenom,
          invoice_settings: { rendering_options: { template: invoiceTpl } },
        });

    const session = await stripe.checkout.sessions.create({
      ui_mode:  "embedded",
      mode:     "subscription",
      customer: customer.id,
      metadata: {
        prenom,
        entreprise: entreprise ?? "",
        stade:      stade ?? "",
        offer,
        location,
        billing,
      },
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name:        `Club Mare Nostrum — ${OFFER_NAMES[offer]}`,
            description: `Abonnement ${billingLabel} — Club Entrepreneur Mare Nostrum`,
          },
          unit_amount:  amount,
          tax_behavior: "exclusive",
          recurring:    { interval },
        },
        tax_rates: [taxRate],
        quantity:  1,
      }],
      // Recopiées sur l'abonnement : les évènements d'abonnement ultérieurs
      // (renouvellement, résiliation) ne portent pas les métadonnées de la session.
      subscription_data: {
        metadata: { offer, location, billing },
      },
      phone_number_collection: { enabled: true },
      allow_promotion_codes:   true,
      return_url: "https://marenostrum.tech/club?session_id={CHECKOUT_SESSION_ID}",
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
