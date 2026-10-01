import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Filet de sécurité serveur des adhésions au Club : Stripe appelle cette
// fonction, qui enregistre l'adhésion même si le client ferme son onglet.
// Aucune donnée de carte n'est lue ni stockée.

const stripe = new Stripe(Deno.env.get("STRIPE_API")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const idOf = (v: unknown): string | null =>
  typeof v === "string" ? v : (v as { id?: string } | null)?.id ?? null;

// Met à jour le statut d'une adhésion à partir de son abonnement.
async function setStatus(subscriptionId: string | null, status: string) {
  if (!subscriptionId) return;
  const { error } = await supabase
    .from("club_adhesions")
    .update({ status })
    .eq("stripe_subscription_id", subscriptionId);
  if (error) console.error("Mise à jour du statut impossible:", error.message);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);

  // Corps brut obligatoire : la signature porte sur les octets exacts reçus.
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const secret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !secret) {
    console.error("Signature ou secret absent.");
    return json({ error: "Signature invalide." }, 400);
  }

  let event: Stripe.Event;
  try {
    // Variante asynchrone obligatoire sous Deno.
    event = await stripe.webhooks.constructEventAsync(
      body, signature, secret, undefined, Stripe.createSubtleCryptoProvider(),
    );
  } catch (error: any) {
    console.error("Signature Stripe invalide:", error.message);
    return json({ error: "Signature invalide." }, 400);
  }

  const handled = [
    "checkout.session.completed",
    "invoice.paid",
    "invoice.payment_failed",
    "customer.subscription.deleted",
  ];
  if (!handled.includes(event.type)) return json({ received: true, ignored: true });

  // Idempotence : un évènement déjà enregistré est un rejeu, on ne fait rien.
  const { error: dupError } = await supabase
    .from("stripe_webhook_events")
    .insert({ id: event.id, type: event.type });
  if (dupError) {
    if (dupError.code === "23505") return json({ received: true, duplicate: true });
    // Registre indisponible : on laisse Stripe réessayer plutôt que de risquer un doublon.
    console.error("Registre des évènements indisponible:", dupError.message);
    return json({ error: "Erreur temporaire." }, 500);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const m = s.metadata ?? {};
        const { error } = await supabase.from("club_adhesions").upsert({
          stripe_session_id: s.id,
          stripe_customer_id: idOf(s.customer),
          stripe_subscription_id: idOf(s.subscription),
          email: s.customer_details?.email ?? s.customer_email ?? null,
          first_name: m.prenom || null,
          company: m.entreprise || null,
          offer: m.offer || null,
          location: m.location || null,
          billing: m.billing || null,
          amount_total: s.amount_total,
          currency: s.currency,
          status: s.payment_status === "unpaid" ? "pending" : "active",
        }, { onConflict: "stripe_session_id", ignoreDuplicates: true });
        if (error) {
          // Écriture principale : on libère l'évènement pour que le rejeu de Stripe puisse aboutir.
          console.error("Enregistrement de l'adhésion impossible:", error.message);
          await supabase.from("stripe_webhook_events").delete().eq("id", event.id);
          return json({ error: "Erreur temporaire." }, 500);
        }
        break;
      }
      case "invoice.paid":
        await setStatus(idOf((event.data.object as Stripe.Invoice).subscription), "active");
        break;
      case "invoice.payment_failed":
        await setStatus(idOf((event.data.object as Stripe.Invoice).subscription), "payment_failed");
        break;
      case "customer.subscription.deleted":
        await setStatus((event.data.object as Stripe.Subscription).id, "canceled");
        break;
    }
  } catch (error: any) {
    // Écriture secondaire : jamais de refus à Stripe pour si peu.
    console.error("Traitement partiel de l'évènement", event.id, error.message);
  }

  return json({ received: true });
});
