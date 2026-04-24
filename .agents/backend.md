# Agent: Backend / Supabase

## Scope
Base de données, edge functions, emails, intégrations API tierces.

## Key files
- `src/integrations/supabase/client.ts` — import : `import { supabase } from "@/integrations/supabase/client"`
- `src/integrations/supabase/types.ts` — types auto-générés
- `supabase/functions/` — toutes les edge functions
- `supabase/migrations/` — historique schema DB

## Edge functions
| Fonction                       | JWT requis | Usage                              |
|-------------------------------|------------|------------------------------------|
| `send-contact-confirmation`   | oui        | Email confirmation au visiteur     |
| `send-contact-notification`   | oui        | Email notif interne contact form   |
| `send-livre-blanc`            | non        | Envoi livre blanc par email        |
| `send-livre-blanc-notification`| oui       | Notif interne livre blanc          |
| `generate-blog-article`       | oui        | Génération IA article blog         |
| `sitemap`                     | non        | Sitemap.xml dynamique              |
| `healthz`                     | non        | Health check (route /healthz)      |
| `webhook-proxy`               | oui        | Proxy webhooks externes            |

## DB table: blog_articles
id, title, slug, excerpt, content (HTML), author, category, image (URL), published_at, is_published (bool)

## Stripe (pending)
- User veut API Stripe pour créer produits/prix/payment links programmatiquement
- Attente : clé API Stripe (sk_test_ d'abord, puis sk_live_)
- Offres : Communauté, Groupe, Individuel × 2 pays = 6 prices minimum

## Rules
- Ne jamais exposer de clé secrète dans le code frontend
- JWT désactivé uniquement sur : healthz, sitemap, send-livre-blanc
- Toujours passer par le client Supabase (pas fetch direct)
