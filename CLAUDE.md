# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sector agents (token-efficient specialisation)

Before working on any feature, read the relevant brief from `.agents/`:

| Task involves…         | Read first            |
|------------------------|-----------------------|
| Club, pricing, Stripe  | `.agents/club.md`     |
| Écoles, Niteo, B2B     | `.agents/education.md`|
| Blog, articles, mag    | `.agents/mag.md`      |
| SEO, meta, schema      | `.agents/seo.md`      |
| Design, CSS, tokens    | `.agents/design.md`   |
| Supabase, functions    | `.agents/backend.md`  |

Only read the brief(s) relevant to the task — not all of them. This keeps context tight and saves tokens.

## Auto-push after every task

After completing any task, always commit the changes and push to the `main` branch on `origin` (GitHub: `aymaneprojects/mare-nostrum-launch`).

## Project overview

Mare Nostrum is a French-language entrepreneurship consulting website (Toulouse / Paris / Casablanca). It is a static SPA built with Vite + React + TypeScript, deployed on Render as a static site. Supabase provides the database and edge functions backend.

## Commands

```bash
npm run dev        # start dev server on port 8080
npm run build      # production build → dist/
npm run lint       # ESLint
npm run preview    # preview the production build locally
```

No test suite is configured. Lint is the only automated check.

## Architecture

### Frontend (SPA)
- **`src/App.tsx`** — root router. All routes are defined here with `react-router-dom`. The app wraps everything in `QueryClientProvider` + `TooltipProvider` + dual toasters (shadcn + Sonner). The `/healthz` route short-circuits and renders a bare JSON response with no global UI.
- **`src/pages/`** — one file per route. Sub-folders `ecoles/`, `entrepreneurs/`, `mag/` group the three SEO content silos (B2B schools, B2C entrepreneurs, thought-leadership magazine).
- **`src/components/`** — shared UI: `Header`, `Footer`, `ChatBot` (Brandy assistant), `EnhancedSEOHead`, `StructuredData`, `CookieBanner`, `ScrollToTop*`.
- **`src/components/ui/`** — shadcn/ui primitives (auto-generated, do not hand-edit).
- **`src/hooks/`** — `useBlogArticles`, `useBlogArticle`, `useRelatedArticles` (TanStack Query wrappers over Supabase), `usePrefetchBlog` (prefetches blog list on app mount).
- **`src/integrations/supabase/`** — auto-generated client and types. Import via `import { supabase } from "@/integrations/supabase/client"`.
- **`src/utils/seoEnhancer.ts`** — auto-enriches page titles/descriptions/keywords with the "Mare Nostrum" brand before passing to `<SEOHead>`.

### SEO system
Every page uses `<EnhancedSEOHead>` (not the bare `<SEOHead>`). It automatically appends brand keywords, injects a `BreadcrumbList` schema, and adds a `WebSite` SearchAction schema. `<StructuredData>` renders arbitrary JSON-LD `<script>` tags. The `disableAutoEnhancement` prop bypasses enrichment when a page needs full manual control.

### Supabase backend
- **Database table:** `blog_articles` (id, title, slug, excerpt, content, author, category, image, published_at, is_published).
- **Edge functions** (`supabase/functions/`): `send-contact-confirmation`, `send-contact-notification`, `send-livre-blanc`, `send-livre-blanc-notification`, `generate-blog-article`, `sitemap`, `healthz`, `webhook-proxy`. JWT verification is disabled on `healthz`, `sitemap`, and `send-livre-blanc`.
- Migrations live in `supabase/migrations/`.

### Design system
All colors are HSL CSS custom properties defined in `src/index.css`. Never use Tailwind color utilities directly (e.g. `text-white`, `bg-blue-500`).

Mare Nostrum brand tokens (always prefer these over shadcn semantic tokens when expressing brand identity):

| Token | Value | Usage |
|---|---|---|
| `--mn-nuit` / `nuit` | `222 44% 25%` | primary dark navy |
| `--mn-turquoise` / `turquoise` | `181 67% 54%` | accent / CTA |
| `--mn-ivory` / `ivory` | `40 38% 94%` | page background |
| `--mn-ocre` / `ocre` | `36 78% 45%` | warm highlight |
| `--mn-ink` | `228 56% 13%` | deep text |
| `--mn-muted` | `224 14% 50%` | secondary text |

Custom gradients: `--gradient-hero`, `--gradient-subtle`, `--gradient-turquoise`.  
Custom shadows: `--shadow-soft`, `--shadow-medium`, `--shadow-elegant`, `--shadow-lift`.  
Fonts: `font-sans` = DM Sans (body), `font-editorial` = Fraunces (display headings).

### Deployment
- Render static site: `npm install && npm run build`, publishes `./dist`, all routes rewrite to `/index.html` (see `render.yaml`).
- GitHub remote: `origin` → `https://github.com/aymaneprojects/mare-nostrum-launch`.
- The Lovable platform also syncs to this repo; commits pushed here are reflected in Lovable.

### Path alias
`@/` resolves to `./src/` (configured in `vite.config.ts` and `tsconfig.app.json`).
