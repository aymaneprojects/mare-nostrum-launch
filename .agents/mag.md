# Agent: Magazine / Blog

## Scope
Contenu éditorial, articles de blog, thought leadership francophonie.

## Key files
- `src/pages/Blog.tsx` — liste des articles
- `src/pages/BlogArticle.tsx` — article individuel (slug-based)
- `src/hooks/useBlogArticles.ts` — TanStack Query → Supabase `blog_articles`
- `src/hooks/useBlogArticle.ts` — article unique par slug
- `src/hooks/useRelatedArticles.ts` — articles liés
- `src/hooks/usePrefetchBlog.ts` — prefetch au mount
- `src/pages/mag/EntrepreneuriatSocialFrancophonie.tsx`
- `src/pages/mag/InnovationPedagogiqueEntrepreneuriat.tsx`
- `src/pages/mag/ImpactMesureStartup.tsx`

## Supabase table: blog_articles
Colonnes : id, title, slug, excerpt, content, author, category, image, published_at, is_published

## Edge function
`supabase/functions/generate-blog-article` — génération IA d'articles

## Routes
- `/blog` — liste
- `/blog/:slug` — article
- `/mag/entrepreneuriat-social-francophonie`
- `/mag/innovation-pedagogique-entrepreneuriat`
- `/mag/impact-mesure-startup`

## Rules
- Contenu en français, ton éditorial Fraunces pour titres
- SEO : chaque article doit avoir slug unique, meta description, structured data
- `blog-article-content` CSS class pour le rendu Markdown/HTML des articles
- Les 3 pages /mag sont du contenu statique (pas Supabase)
