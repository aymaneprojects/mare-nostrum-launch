import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Inscription gratuite au Club (offre freemium) : aucun paiement, aucun appel
// Stripe. Enregistre le membre dans club_freemium (service role uniquement).

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const LOCATIONS = ["france", "congo_brazzaville"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405);

  try {
    const body = await req.json();
    const prenom     = String(body?.prenom ?? "").trim().slice(0, 100);
    const email      = String(body?.email ?? "").trim().toLowerCase().slice(0, 254);
    const entreprise = String(body?.entreprise ?? "").trim().slice(0, 200);
    const location   = LOCATIONS.includes(body?.location) ? body.location : "france";

    if (!prenom || !EMAIL_RE.test(email)) return json({ error: "Champs invalides." }, 400);

    // Déjà inscrit : on ne touche à rien et on répond comme pour une nouvelle inscription.
    const { error } = await supabase.from("club_freemium").upsert(
      { email, first_name: prenom, company: entreprise || null, location },
      { onConflict: "email", ignoreDuplicates: true },
    );
    if (error) {
      console.error("Inscription freemium impossible:", error.message);
      return json({ error: "Erreur temporaire." }, 500);
    }
    return json({ ok: true });
  } catch (error: any) {
    console.error("club-freemium-signup:", error.message);
    return json({ error: "Requête invalide." }, 400);
  }
});
