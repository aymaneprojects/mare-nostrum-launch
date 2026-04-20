# Memory: index.md
Updated: now

# Project Memory

## Core
Strict 3-silo SEO architecture: Écoles, Entrepreneurs, Magazine. No cross-silo linking except /contact.
No fake data: star ratings, testimonials, and contact info must be authentic.
All lead forms must have a mandatory GDPR consent checkbox linked to privacy policy.
Use middots (·) for separators in UI, never hyphens (--).
Navigation: Direct links, no dropdowns. `Link` components must not wrap `Button`s.
SEO: Dynamic Canonical URLs via `SEOHead`. No hardcoded tags in `index.html`.
Blog authors must be 'Mare Nostrum Team'. No placeholders.
Forms proxy via Supabase Edge Function to n8n webhooks to bypass CORS.
Design system: DM Sans (UI) + Fraunces (editorial). Nuit #24335D / Turquoise #3BD9DB / Ivory #F6F2EA bg / Ocre #C88A1C. All buttons are pills, cards 14px rounded with 1.5px borders.

## Memories
- [Mare Nostrum Design System](mem://design/mare-nostrum-design-system) — Full brand palette, fonts, mn-* utilities, pill buttons, 14px cards
- [SEO Silo Architecture](mem://seo/silo-architecture-constraints) — Strict 3-silo structure, cross-linking prohibited except /contact
- [Webhook Proxy](mem://technical/webhook-proxy-architecture) — Supabase Edge Function bypasses CORS for n8n forms
- [Niteo Program Nav](mem://features/niteo-program-navigation) — Exclude B2B from main nav, access via Education CTA
- [Data Authenticity](mem://content/data-authenticity-policy) — No fake or placeholder data allowed, ever
- [Chatbot Persistence](mem://features/chatbot-persistence-behavior) — History in localStorage, manual reset button required
- [Niteo Team Layout](mem://design/niteo-team-layout) — Strict 12-column grid organization for specific roles
- [Header Links](mem://design/navigation-header-links) — Direct links for Offres, dropdowns explicitly removed
- [Education Actions](mem://design/education-action-visibility) — Permanent text overlays on images, no hover hiding
- [Blog Author Standard](mem://content/blog-author-standard) — Always use 'Mare Nostrum Team', old placeholders obsolete
- [Target Markets](mem://seo/target-markets-priority) — Keywords: entrepreneuriat toulouse/afrique/étudiant, Nitéo
- [Dynamic Routing](mem://technical/dynamic-routing-strategy-render) — Sitemap and healthz routing logic for Render and SEO
- [Niteo Student Landing](mem://features/niteo-student-landing-page) — Conversion page state and Airtable redirect
- [Niteo Subdomain Logic](mem://technical/niteo-subdomain-rendering-logic) — Client-side hostname detection bypasses global router
- [GDPR Consent](mem://compliance/gdpr-form-consent-requirement) — Mandatory checkbox linked to privacy policy for all forms
- [Niteo Global Promo](mem://features/niteo-global-promotion) — Banner over nav on Accueil, Croissance, Éducation
- [Niteo Student Branding](mem://design/niteo-student-branding) — Fort et pro glassmorphism, no global Header/Footer
- [Niteo Communication](mem://brand/niteo-communication-etudiants) — Benevolent tone, focus on soft skills/revenue/impact
- [n8n Webhook Endpoints](mem://technical/webhook-endpoints-n8n) — Production URLs for contact and livre blanc forms
- [UI Separators](mem://design/ui-separator-preference) — Always use middots (·), no hyphens for professional look
- [Contact Form International](mem://features/contact-form-internationalization) — Targeted Francophone countries for expansion silo
- [SEO Semantic Standards](mem://technical/seo-semantic-standards) — Rules for semantic HTML and routing to ensure SEO compliance
- [Moodle Theme Customization](mem://brand/moodle-theme-customization) — Mare Nostrum brand colors and glassmorphism for e-learning
- [Croissance Membership](mem://features/croissance-membership-tiers) — 3 tiers, interactive pre-diagnosis modale, objection FAQ
