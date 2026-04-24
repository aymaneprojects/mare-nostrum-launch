# Agent: SEO

## Scope
Métadonnées, structured data, sitemap, performance SEO, mots-clés.

## Key files
- `src/components/EnhancedSEOHead.tsx` — composant SEO principal (toujours utiliser celui-ci)
- `src/components/SEOHead.tsx` — version de base (éviter sauf si EnhancedSEOHead utilisé)
- `src/components/StructuredData.tsx` — inject JSON-LD <script>
- `src/utils/seoEnhancer.ts` — enrichit automatiquement titres/descriptions avec brand "Mare Nostrum"
- `src/components/Breadcrumbs.tsx`
- `supabase/functions/sitemap/` — sitemap.xml dynamique

## Règles SEO site
- Toujours `<EnhancedSEOHead>` (pas le bare `<SEOHead>`) sur chaque page
- `disableAutoEnhancement` prop pour contrôle manuel complet
- Chaque page : title unique, description 150-160 chars, keywords FR
- Schema types utilisés : Service, WebPage, BreadcrumbList, FAQPage, Organization, AggregateRating

## Géographies prioritaires (pour keywords)
France (Toulouse, Paris), Maroc (Casablanca), République du Congo (Brazzaville)
Espace francophone = Sénégal, Côte d'Ivoire, Tunisie (secondaires)

## Objectif
Top 1 "entrepreneuriat espace francophone" — cibler longue traîne francophone.

## Mots-clés piliers
entrepreneuriat francophone, accompagnement entrepreneur toulouse, club entrepreneur france,
incubateur startup francophone, mentorat entrepreneur, entrepreneuriat afrique francophone,
entrepreneuriat congo brazzaville
