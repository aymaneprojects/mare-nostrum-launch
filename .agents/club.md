# Agent: Club / Croissance

## Scope
Tout ce qui concerne le Club Mare Nostrum — offres, pricing, Stripe, parcours membre.

## Key files
- `src/pages/Croissance.tsx` — page principale, toggle France/Congo-Brazzaville, 3 offres
- `src/pages/entrepreneurs/MentoratIndividuel.tsx` — mentorat 1-to-1
- `src/pages/entrepreneurs/TestMaturiteProjet.tsx` — funnel d'entrée
- `src/components/TestimonialCard.tsx` — témoignages réutilisables

## Pricing (current)
| Offre       | France mensuel | France annuel | Congo mensuel | Congo annuel |
|-------------|----------------|---------------|---------------|--------------|
| Communauté  | 30€            | 288€          | 10 000 XOF    | 100 000 XOF  |
| Groupe      | 90€            | 864€          | 30 000 XOF    | 300 000 XOF  |
| Individuel  | 190€           | 1 728€        | 80 000 XOF    | 800 000 XOF  |

## Stripe integration (Embedded Checkout)
- Aucun lien `buy.stripe.com` — paiement 100% intégré dans le site
- Edge function : `supabase/functions/create-checkout-session/index.ts`
  - Reçoit : offer / location / billing / prenom / email / entreprise / stade
  - Retourne : `clientSecret` (session Stripe embedded)
- Composant : `src/components/ClubOnboarding.tsx`
  - 2 étapes info + formulaire Stripe via `EmbeddedCheckoutProvider`
- Clé publique Stripe : `VITE_STRIPE_PUBLIC_KEY` dans `.env`
- Clé secrète Stripe : `STRIPE_API` dans `.env` (utilisée uniquement côté edge function)
- Retour après paiement : `/club?success=true` → toast confirmation

## Rules
- LocationType = "france" | "congo_brazzaville" (never revert to toulouse/afrique)
- Ne jamais supprimer les références Casablanca/Maroc dans schema ou SEO
- Toujours tester le dialog Groupe (2 choix: financement / IA)
