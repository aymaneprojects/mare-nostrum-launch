# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Published content is never rewritten

**Rule, above everything else in this file.** Any text a visitor can read —
heading, paragraph, FAQ question, displayed price, testimonial, legal notice,
button label — is **never** modified without an explicit request from the site
owner.

Allowed without asking: moving text without rewriting it, fixing the code
around it, technical SEO, bug fixes, accessibility.

Not allowed without agreement: rewriting a sentence, "improving" a heading,
fixing a turn of phrase, shortening a paragraph, changing a displayed price.
When a text change seems warranted: **propose it** (current text → proposed
text → why) and wait.

Two automatic checks enforce this, declared in `.claude/settings.json`:
contract pages (CGV, CGU, legal notice, privacy, RSE) are refused on write, and
any prose changed in `src/pages`, `src/components`, `src/data/team.json` or
`index.html` is reported before a task can end. The mechanism and what to do
when it fires live in the `verifier-contenu` skill.

## Specialised agents and skills

Agents live in `.claude/agents/` — one per sector (club-stripe,
education-niteo, mag-blog, seo-technique, design-system, backend-supabase,
live-conference, revue-invariants). They are selected automatically from the
request; no table to consult. An agent is a **scope**: entry files and
non-obvious invariants. It never copies facts that live in the code.

Skills live in `.claude/skills/` — one per repeatable procedure:
`publier-le-site`, `supabase-ops`, `revue-avant-publication`,
`verifier-contenu`, `incident-prod`. A skill is a **procedure**: ordered steps,
expected result at each step.

Authoritative reference documents stay at the root and are never summarised
elsewhere: `DESIGN-SYSTEM.md` (UI), `BRIEF-CHRISTOPHE.md` (server, incidents),
`CONSIGNES-ANIMATEUR-LIVE.md` (live conference).

**Never copy a fact that the code already holds** — prices, function lists,
routes, tokens. Point at the file instead. The previous `.agents/` briefs rotted
exactly that way: one listed 8 edge functions when there were 26, another called
Stripe "pending" while it was taking payments.

## Auto-push after every task

After completing any task, always commit the changes and push to the `main` branch on `origin` (GitHub: `aymaneprojects/mare-nostrum-launch`).

**Exception:** do not push when the content check reports modified prose. Show
the change to the owner first.

## Project overview

Mare Nostrum is a French-language entrepreneurship consulting website (Toulouse / Paris / Casablanca). It is a static SPA built with Vite + React + TypeScript, deployed on a CloudPanel VPS via `./deploy-vps.sh` (the `render.yaml` file is the previous host, kept for history). Supabase provides the database and edge functions backend.

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
- **Edge functions** (`supabase/functions/`): 26 functions, one per folder — read the folder, not a list here. `supabase/config.toml` says which ones skip JWT verification; several payment and Airtable functions are open, see the `backend-supabase` agent.
- Migrations live in `supabase/migrations/`.

### Design system
**Read `DESIGN-SYSTEM.md` before any UI work.** It is the single authoritative reference (tokens, typography, components, dark-section pattern, motion, a11y, known pitfalls, delivery checklist) and is derived from the code. `CHARTE-GRAPHIQUE.md` is obsolete and must not be used.

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
- VPS CloudPanel + nginx: `./deploy-vps.sh` builds locally and publishes `dist/` to **both** domain roots (`www.marenostrum.tech` and `niteo.marenostrum.tech` — one build serves both, see `src/main.tsx`). The script refuses to publish code older than what is live. Never build on the server. See the `publier-le-site` skill.
- GitHub remote: `origin` → `https://github.com/aymaneprojects/mare-nostrum-launch`.


### Path alias
`@/` resolves to `./src/` (configured in `vite.config.ts` and `tsconfig.app.json`).
