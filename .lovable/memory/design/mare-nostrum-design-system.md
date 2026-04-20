---
name: Mare Nostrum Design System
description: Brand-wide skin refresh — DM Sans + Fraunces, Nuit/Turquoise/Ivory/Ocre palette, pills everywhere, 14px cards
type: design
---
Skin-only refresh applied site-wide (content/structure/URLs unchanged).

**Palette (HSL tokens in index.css)**
- `--mn-nuit` 222 44% 25%   (#24335D — primary dark)
- `--mn-turquoise` 181 67% 54% (#3BD9DB — accent)
- `--mn-ivory` 40 38% 94%   (#F6F2EA — global background)
- `--mn-ocre` 36 78% 45%    (#C88A1C — secondary accent / tutorat chips)
- `--mn-ink` 228 56% 13%    (#0F1733 — body text)
- `--mn-muted` 224 14% 50%  (#6C7591 — secondary text)

Mapped to shadcn semantic tokens: `--background` = ivory, `--foreground` = ink, `--primary` = nuit, `--accent` = turquoise.

**Typography**
- UI/headings: **DM Sans** (400/500/600/700/800) — `font-sans` & `font-display`
- Editorial accents (italics, blockquotes): **Fraunces** (600/700) — `font-editorial`
- Loaded via Google Fonts in `index.html`. Asap is removed (memory rule retired).

**Brand utilities (in index.css)**
- `.mn-eyebrow` / `.mn-eyebrow-muted` / `.mn-eyebrow-turquoise` — uppercase 10–12px micro-labels, letter-spacing 0.18–0.25em
- `.mn-chip` + `.mn-chip-nuit` / `.mn-chip-turquoise` / `.mn-chip-ocre` / `.mn-chip-outline` — date/category pills (rounded-full)
- `.mn-card` / `.mn-card-accent` — 14px rounded, 1.5px nuit border (turquoise variant for featured)
- `.mn-page-shell` — 6px rounded paper card with `0 30px 80px rgba(15,23,51,0.08)` shadow
- `.mn-section-label` — centered uppercase title with side hairlines
- `.mn-hairline` — `border-top: 1px solid hsl(var(--mn-nuit) / 0.14)`

**Components**
- `Button` (ui/button.tsx): all variants are pills (`rounded-full`), uppercase tracking-[0.12em]. Default = filled nuit, outline = ghost nuit border, secondary = turquoise filled, ghost = transparent.
- `Card` (ui/card.tsx): `rounded-[14px]` with 1.5px primary/15 border, hover lifts to primary/35.
- `StatCard` & `TestimonialCard`: refactored to use mn-card pattern + eyebrow micro-labels.
- `Header`: nav links use accent underline; CTAs are pills via Button outline/default.
- `Footer`: section titles use `.mn-eyebrow-turquoise`, contact icons are turquoise.

**Tailwind extensions**
- `colors.nuit/turquoise/ivory/ocre/ink` — direct brand color access
- `boxShadow.lift` — the signature soft elevation
- `font-editorial` — Fraunces stack
