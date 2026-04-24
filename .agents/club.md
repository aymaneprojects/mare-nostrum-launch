# Agent: Club / Croissance

## Scope
Tout ce qui concerne le Club Mare Nostrum — offres, pricing, Stripe, parcours membre.

## Key files
- `src/pages/Croissance.tsx` — page principale, toggle France/Congo-Brazzaville, 3 offres
- `src/pages/entrepreneurs/MentoratIndividuel.tsx` — mentorat 1-to-1
- `src/pages/entrepreneurs/TestMaturiteProjet.tsx` — funnel d'entrée
- `src/components/TestimonialCard.tsx` — témoignages réutilisables

## Pricing (current)
| Offre       | France | Congo-Brazzaville |
|-------------|--------|-------------------|
| Communauté  | 30€    | 24€               |
| Groupe      | 90€    | 74€               |
| Individuel  | 190€   | 184€              |

## Stripe links (hardcoded)
- Communauté France : `https://buy.stripe.com/00w3cx3W2bDr5Me6MO67S08`
- Communauté Congo  : `https://buy.stripe.com/dRmaEZ78e4aZ3E61su67S04`
- Individuel France : `https://buy.stripe.com/bJe5kF64a0YNgqS4EG67S0a`
- Individuel Congo  : `https://buy.stripe.com/6oUaEZ8cidLzeiK9Z067S07`
- Groupe dialog uses `groupeStripeLinks.france` / `groupeStripeLinks.congo_brazzaville`

## Active tasks
- Stripe API: user wants programmatic price/product creation (pending API key)

## Rules
- LocationType = "france" | "congo_brazzaville" (never revert to toulouse/afrique)
- Ne jamais supprimer les références Casablanca/Maroc dans schema ou SEO
- Toujours tester le dialog Groupe (2 choix: financement / IA)
