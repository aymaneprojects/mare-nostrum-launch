# Agent: Design System

## Scope
Tokens CSS, composants UI, typographie, couleurs, patterns visuels brand.

## Key files
- `src/index.css` — SEULE source de vérité pour les tokens
- `src/pages/Index.tsx` — référence des patterns visuels hero/dark sections
- `design/Club Mare Nostrum - Onboarding.html` — maquettes de référence
- `design/browser-frame.jsx` — utilitaires de présentation

## Brand tokens (NE PAS utiliser Tailwind colors directement)
| Token CSS           | Valeur HSL       | Usage               |
|---------------------|------------------|---------------------|
| `--mn-nuit`         | 222 44% 25%      | Navy principal      |
| `--mn-turquoise`    | 181 67% 54%      | Accent / CTA        |
| `--mn-ivory`        | 40 38% 94%       | Fond page           |
| `--mn-ocre`         | 36 78% 45%       | Highlight chaud     |
| `--mn-ink`          | 228 56% 13%      | Texte profond       |
| `--mn-muted`        | 224 14% 50%      | Texte secondaire    |

## Polices
- `font-sans` = DM Sans (corps, UI)
- `font-editorial` = Fraunces (titres éditoriaux, italic pour impact)

## Pattern dark sections (hero, CTA)
```css
background: linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)
/* overlay stripe */
backgroundImage: repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)
/* glow turquoise */
background: radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.20) 0%, transparent 52%)
```

## Utility classes (index.css)
`mn-eyebrow`, `mn-eyebrow-light`, `mn-eyebrow-turquoise`, `mn-eyebrow-muted`
`mn-chip`, `mn-chip-nuit`, `mn-chip-turquoise`, `mn-chip-ocre`
`mn-card`, `mn-section-label`, `mn-hairline`, `mn-stat-label`
`shape-pill`, `shape-cut`, `shape-hex`, `font-editorial`

## Rules
- Toujours HSL pour les couleurs (jamais hex ou rgb dans le code React)
- Sections sombres : utiliser le pattern gradient + stripe + glow (voir Index.tsx hero)
- Eyebrow labels : ALLCAPS, turquoise sur fond sombre / nuit sur fond clair
