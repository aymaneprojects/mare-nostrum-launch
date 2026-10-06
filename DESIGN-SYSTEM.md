# Design System — Mare Nostrum

**Ce document est la référence unique.** Tout agent — humain ou IA — qui touche à l'interface doit s'y conformer. Il est dérivé directement de `src/index.css`, `tailwind.config.ts`, `src/components/ui/button.tsx` et `src/components/PageHero.tsx`. En cas de doute entre ce fichier et le code, **le code a raison et ce fichier doit être corrigé** — jamais l'inverse.

`CHARTE-GRAPHIQUE.md` est obsolète (ancienne palette) et ne doit plus servir de référence.

---

## 0. Les règles non négociables

1. **Aucune couleur brute.** Ni `text-white`, ni `bg-blue-500`, ni `#24335D`, ni `rgb()`. Uniquement les tokens de ce document.
2. **HSL partout.** Les tokens sont des triplets HSL sans `hsl()` ; on les consomme via `hsl(var(--token))` ou via la classe Tailwind correspondante.
3. **Les boutons sont des pilules.** `rounded-full`, casse normale, graisse 600. Jamais `uppercase`, jamais `tracking-[…]` sur un bouton. Hauteur 52 px pour une action principale.
4. **Sections sombres = le pattern hero** (dégradé + rayures + halo). Pas de fond uni nuit.
5. **Fraunces italique pour les titres d'impact, DM Sans pour tout le reste.** Fraunces ne s'utilise jamais en corps de texte.
6. **`src/components/ui/` est généré par shadcn — on ne l'édite pas.** Seule exception documentée : `button.tsx`.
7. **Icônes = `lucide-react` ou `MaritimeIcon`.** Jamais d'emoji en guise d'icône.
8. **Chaque page importe `Header`, `Footer` et `EnhancedSEOHead`.** Ils ne sont pas montés globalement.
9. **Toute animation respecte `prefers-reduced-motion`** — c'est géré globalement, à condition d'utiliser les utilitaires de ce document et non des animations maison.
10. **Ton de marque : expert, institutionnel, français.** Ne jamais mélanger avec le ton d'une autre marque.
11. **L'échelle typographique est globale.** Une classe `text-5xl` posée sur un titre casse l'échelle du site : on laisse les variables `--fs-*` faire leur travail (§2.2).
12. **Une seule courbe d'animation**, `--ease-mn`. Jamais `ease`, `ease-out` ni une courbe écrite en dur (§7).
13. **Le texte publié ne se réécrit jamais** sans demande explicite du propriétaire. Deux contrôles automatiques l'appliquent — voir `CLAUDE.md` et la skill `verifier-contenu`.

---

## 1. Couleurs

### 1.1 Palette de marque

Six couleurs. Définies dans `src/index.css` sous `:root`, exposées à Tailwind dans `tailwind.config.ts`.

| Nom | Token CSS | HSL | Hex (repère) | Classe Tailwind | Rôle |
|---|---|---|---|---|---|
| Nuit | `--mn-nuit` | `222 44% 25%` | `#24335D` | `bg-nuit` `text-nuit` `border-nuit` | Couleur principale, boutons, titres sur clair |
| Turquoise | `--mn-turquoise` | `181 67% 54%` | `#3BD9DB` | `bg-turquoise` `text-turquoise` | Accent, CTA secondaire, eyebrows sur sombre |
| Ivoire | `--mn-ivory` | `40 38% 94%` | `#F6F2EA` | `bg-ivory` `text-ivory` | Fond de page, texte sur nuit |
| Ocre | `--mn-ocre` | `36 78% 45%` | `#C88A1C` | `bg-ocre` `text-ocre` | Touche chaude, chips, rare |
| Encre | `--mn-ink` | `228 56% 13%` | `#0F1733` | `bg-ink` `text-ink` | Texte profond, fin des dégradés sombres |
| Muted | `--mn-muted` | `224 14% 50%` | `#6C7591` | *(pas de classe brand — voir `text-muted-foreground`)* | Texte secondaire |

Les hex sont donnés pour reconnaître une couleur dans une maquette. **Ils n'apparaissent jamais dans le code.**

**Convention réelle du code :** les classes brand (`bg-nuit`, `bg-ivory`, `bg-ocre`, `text-ink`…) existent mais sont presque inutilisées. La base de code s'exprime avec les **tokens sémantiques** du §1.2 (`bg-primary`, `text-foreground`, `text-muted-foreground`) et, quand il faut nommer explicitement une couleur de marque, avec la forme arbitraire `bg-[hsl(var(--mn-nuit))]`. Suivre cette convention plutôt que d'introduire `bg-nuit` — la cohérence avec l'existant prime sur la concision.

### 1.2 Tokens sémantiques shadcn

Ce sont eux qu'on utilise dans 90 % des cas. Ils pointent vers la palette de marque.

| Token | Valeur | Classe | Quand |
|---|---|---|---|
| `--background` | Ivoire | `bg-background` | Fond de page |
| `--foreground` | Encre | `text-foreground` | Texte courant |
| `--primary` | Nuit | `bg-primary` `text-primary` | Action principale, titres |
| `--primary-foreground` | Ivoire | `text-primary-foreground` | Texte **sur** nuit |
| `--secondary` | `40 30% 90%` sable | `bg-secondary` | Fonds de sections alternées, blocs code |
| `--secondary-foreground` | Nuit | `text-secondary-foreground` | Texte sur sable |
| `--accent` | Turquoise | `bg-accent` `text-accent` | Accent, focus ring |
| `--accent-foreground` | Nuit | `text-accent-foreground` | Texte **sur** turquoise |
| `--muted` | `40 25% 92%` | `bg-muted` | Fonds discrets, boutons fantômes |
| `--muted-foreground` | Muted | `text-muted-foreground` | Texte secondaire, légendes |
| `--card` | Blanc | `bg-card` | Cartes |
| `--border` | Nuit à 14 % | `border-border` (défaut sur `*`) | Toutes les bordures |
| `--input` | `222 30% 88%` | `border-input` | Champs de formulaire |
| `--ring` | Turquoise | `ring-ring` | Focus |
| `--destructive` | `0 84.2% 60.2%` | `bg-destructive` | Erreurs, suppression |

### 1.3 Contraste — les paires autorisées

| Fond | Texte principal | Texte secondaire | Eyebrow |
|---|---|---|---|
| Ivoire / blanc / sable | `text-foreground` | `text-muted-foreground` | `mn-eyebrow` ou `mn-eyebrow-turquoise` |
| Nuit / dégradé hero | `text-primary-foreground` | `text-primary-foreground/75` | `mn-eyebrow-light` |
| Turquoise | `text-accent-foreground` (nuit) | — | — |
| Ocre | `#fff` via `mn-chip-ocre` uniquement | — | — |

`text-muted-foreground` sur fond nuit est **interdit** — illisible.

### 1.4 Opacités

Toujours par suffixe Tailwind sur un token : `bg-primary/10`, `text-foreground/70`, `border-nuit/18`. Jamais `opacity-*` sur du texte (ça délave aussi les enfants).

Valeurs en usage : `/5` `/10` (fonds légers), `/14` `/18` (bordures), `/40` (bordure hover), `/55` `/70` `/75` `/80` (texte sur sombre).

### 1.5 Écriture correcte

```tsx
// ✅ token sémantique
<p className="text-muted-foreground">…</p>

// ✅ token de marque en classe
<span className="bg-turquoise text-nuit">…</span>

// ✅ token en valeur arbitraire (quand la classe n'existe pas)
<div className="bg-[hsl(var(--mn-nuit))]" />
<div className="text-[hsl(var(--mn-turquoise))]/80" />

// ✅ token en CSS-in-JS, uniquement pour les dégradés et les cas de cascade (voir §9)
<div style={{ background: "hsl(222 44% 25%)" }} />

// ❌ interdits
<p className="text-white">          // couleur brute
<p className="text-gray-500">       // palette Tailwind
<div className="bg-[#24335D]">      // hex
<div style={{ color: "#fff" }}>     // hex inline
<p className="text-slate-400">      // contraste insuffisant ET palette étrangère
```

---

## 2. Typographie

### 2.1 Familles

| Classe | Police | Fallback | Usage |
|---|---|---|---|
| `font-sans` *(défaut body)* | DM Sans | system-ui | Corps, UI, boutons, navigation |
| `font-display` *(défaut h1–h4)* | DM Sans | system-ui | Titres standard |
| `font-editorial` | Fraunces | Georgia | Titres d'impact, **en italique** |
| `font-mono` | JetBrains Mono | ui-monospace | Code, IBAN, identifiants |

`body` active `font-feature-settings: "ss01", "ss02"` — ne pas désactiver.

### 2.2 Échelle des titres (définie globalement)

L'échelle est calée sur une mesure réelle des sites concurrents français
(LiveMentor, Le Wagon, Bpifrance Création, Réseau Entreprendre, Station F, BGE).
Elle est définie par des variables dans `src/index.css` et s'applique
automatiquement à toutes les balises de titre.

| Variable | Mobile (≤ 480) | Grand écran (≥ 1280) | Interligne |
|---|---|---|---|
| `--fs-h1` | 34 px | **56 px** | 1,15 → 1,10 |
| `--fs-h2` | 26 px | **40 px** | 1,25 → 1,20 |
| `--fs-h3` | 20 px | 24 px | 1,30 |
| `--fs-lead` (chapô) | 20 px | 24 px | 1,40 |
| `--fs-body` | 17 px | **18 px** | 1,60 |
| `--fs-micro` | 13 px | 14 px | 1,40 |

Les tailles sont en `clamp()` : elles grandissent continûment avec la fenêtre,
sans palier brutal.

**Pourquoi ces valeurs.** Le rapport entre le titre principal et le corps de
texte doit rester entre **2,5 et 3,5** sur ce marché : 56 ⁄ 18 = 3,1. Le Wagon
est à 3,5, LiveMentor à 2,5. Au-delà de 4, on quitte le registre du conseil
pour celui du lieu événementiel (Station F : 6,9). Le site a été à 108 px de
titre, soit un rapport de 6 — c'était trop.

**La graisse compte plus que la taille.** Les titres sont en **600**, jamais en
700, et le titre d'accueil descend à **500**. Les concurrents les plus élégants
font de même : un 56 px en demi-gras avec un interligne de 1,1 paraît plus posé
qu'un 44 px en gras avec un interligne large. Fraunces n'est chargée qu'en
italique 500 : demander 600 produit un faux gras synthétisé, moins net.

**Réduction mobile : −35 à −40 %** sur le titre principal, pas davantage. Le
corps ne descend jamais sous 17 px, un libellé de bouton jamais sous 15 px.

On ne redéfinit pas ces tailles page par page. Une classe `text-5xl` posée sur
un titre passe avant la règle globale et casse l'échelle du site : c'est ce qui
rendait les pages incohérentes avant octobre 2026.

### 2.3 Le titre éditorial

Le motif signature du site. Utilisé pour les héros et les titres de section importants :

```tsx
<h2
  className="font-editorial italic text-3xl md:text-4xl font-semibold text-foreground"
  style={{ letterSpacing: "-0.015em" }}
>
  Prêt à construire l'avenir ensemble ?
</h2>
```

Sur fond sombre, remplacer `text-foreground` par `text-primary-foreground`. Ajouter `style={{ textWrap: "balance" }}` sur les titres de plus d'une ligne.

### 2.4 Corps de texte

Trois utilitaires portent l'échelle. On les préfère aux classes Tailwind de
taille, qui figent une valeur et échappent à l'échelle globale.

| Classe | Taille | Usage |
|---|---|---|
| `mn-lead` | 20 → 24 px | chapô, sous-titre de héros |
| `mn-body` | 17 → 18 px | paragraphe courant |
| `mn-caption` | 13 → 14 px | légende, mention légale |

| Contexte | Classes |
|---|---|
| Paragraphe standard | `mn-body text-muted-foreground` |
| Paragraphe d'intro | `mn-lead text-muted-foreground` |
| Texte long (CGV, articles) | `prose prose-lg max-w-none text-foreground/80` |
| Largeur de colonne | 65 caractères maximum (`mn-prose` ou `max-w-prose`) |

Une colonne de texte qui court sur toute la largeur fait « page web ». Une
colonne de 65 caractères fait « publication » : c'est ce que font tous les
sites de référence, qui occupent 43 à 51 % de la largeur de fenêtre.

### 2.5 Micro-labels (eyebrows)

Ce sont des utilitaires CSS, pas des classes Tailwind. Toujours en majuscules automatiques — **ne pas écrire le texte en capitales dans le JSX.**

| Classe | Taille | Espacement | Couleur | Fond cible |
|---|---|---|---|---|
| `mn-eyebrow` | 11 px | 0.18em | Nuit, 700 | Clair |
| `mn-eyebrow-muted` | 11 px | 0.18em | Muted, 600 | Clair, discret |
| `mn-eyebrow-turquoise` | 10 px | 0.25em | Turquoise, 700 | Clair ou blanc |
| `mn-eyebrow-light` | 10 px | 0.28em | Turquoise à 80 %, 600 | **Sombre uniquement** |
| `mn-section-label` | 11 px | 0.25em | Nuit, centré, filets latéraux | Séparateur de section |
| `mn-stat-label` | 10 px | 0.20em | Muted, 600 | Sous un chiffre clé |

```tsx
// ✅
<div className="mn-eyebrow-turquoise mb-3">Nos bureaux</div>

// ❌ capitales manuelles, tracking manuel
<div className="text-xs uppercase tracking-widest font-bold text-turquoise">NOS BUREAUX</div>
```

---

## 3. Espacement, rayons, élévation

### 3.1 Conteneur et sections

| Élément | Classes |
|---|---|
| Conteneur | `container mx-auto px-4` — centré, padding 2rem, max 1400 px au `2xl` |
| Section standard | `py-12 md:py-24` |
| Section compacte (bandeau) | `py-5 md:py-6` |
| Section CTA sombre | `py-16 md:py-20` |
| Largeur de lecture | `max-w-4xl mx-auto` |
| Grille de cartes | `max-w-6xl mx-auto` |
| Navigation | `max-w-7xl` |

### 3.2 Rayons

`--radius` vaut `0.875rem` (14 px).

| Classe | Valeur | Usage |
|---|---|---|
| `rounded-full` | pilule | **Boutons, chips, avatars, badges** — la forme de marque |
| `rounded-lg` | 14 px | Cartes, modales |
| `rounded-md` | 12 px | Champs |
| `rounded-sm` | 10 px | Blocs de code, encarts |
| `rounded-2xl` | 16 px | Popups plein écran |
| `rounded-xl` | 12 px | Items de menu mobile |

Pas de `rounded-none` sur un élément interactif.

### 3.3 Ombres et élévation

Deux systèmes cohabitent. Utiliser l'un ou l'autre, pas les deux sur le même élément.

**Tokens CSS** (pour `style={}` ou `shadow-[var(--…)]`) :

| Token | Usage |
|---|---|
| `--shadow-soft` | Boutons au repos |
| `--shadow-medium` | Cartes au repos |
| `--shadow-elegant` | Cartes mises en avant, teinte nuit |
| `--shadow-lift` | Page-shell, grandes surfaces flottantes |

**Classes utilitaires** :

| Classe | Niveau |
|---|---|
| `shadow-soft` / `shadow-lift` | Raccourcis Tailwind des tokens ci-dessus |
| `elevation-1` … `elevation-4` | Échelle à 4 niveaux, teinte encre |

### 3.4 Dégradés

| Token | Direction | Usage |
|---|---|---|
| `--gradient-hero` | 135°, nuit → encre | Héros, sections CTA sombres |
| `--gradient-subtle` | 180°, ivoire → sable | Transitions douces entre sections claires |
| `--gradient-turquoise` | 135°, turquoise → turquoise sombre | Accents, rarement |

---

## 4. Le pattern « section sombre »

Toute section à fond nuit **doit** empiler ces trois couches. C'est ce que fait `PageHero` ; on le reproduit tel quel ailleurs.

```tsx
<section
  className="relative overflow-hidden py-16 md:py-20"
  style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}
>
  {/* 1. rayures diagonales */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }}
  />
  {/* 2. halo turquoise + vignette encre */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)" }}
  />
  {/* 3. contenu, au-dessus */}
  <div className="container mx-auto px-4 relative z-10">
    <div className="mn-eyebrow-light mb-5">Travaillons ensemble</div>
    <h2 className="font-editorial italic text-3xl md:text-4xl font-semibold text-primary-foreground">…</h2>
    <p className="text-lg text-primary-foreground/75">…</p>
  </div>
</section>
```

Les positions du halo (`22% 18%` / `80% 85%`) peuvent varier d'une section à l'autre pour éviter la répétition — les couleurs et opacités, non.

---

## 5. Composants

### 5.1 `Button` — `src/components/ui/button.tsx`

Base : `rounded-full text-sm font-medium` + `gap-2`, transitions 200 ms, focus ring turquoise, icônes SVG à `size-4`.

| `variant` | Rendu | Quand |
|---|---|---|
| `default` | Nuit plein, texte ivoire, lève de 2 px au survol | Action principale |
| `secondary` | Turquoise plein, texte nuit, lève au survol | Action principale **sur fond sombre** |
| `outline` | Bordure nuit 1.5 px, se remplit au survol | Action secondaire |
| `ghost` | Transparent, fond nuit à 5 % au survol | Action tertiaire, icônes |
| `link` | Souligné au survol | Lien dans du texte |
| `destructive` | Rouge système | Suppression, annulation |

| `size` | Hauteur | Padding | Texte |
|---|---|---|---|
| `sm` | 44 px mobile, 40 px dès `md` | 20 px | 15 px |
| `default` | 44 px | 24 px | 15 px |
| `lg` | **52 px** | 28 px | 16 px |
| `icon` | 40 × 40 | — | — |

La hauteur de 52 px est la médiane mesurée chez les concurrents (50, 54, 49,
44). Le texte est en **600**, jamais sous 15 px. La forme pilule est une marque
de fabrique : on la garde, même si le marché utilise plutôt un rayon de 8 px.

Sur mobile, un bouton principal passe en pleine largeur et conserve sa hauteur.
**Deux appels à l'action au maximum** au-dessus de la ligne de flottaison : un
plein, un en contour. Les sites qui en empilent huit n'en font choisir aucun.

```tsx
// ✅ lien routeur
<Button asChild size="lg">
  <Link to="/contact">Contactez-nous</Link>
</Button>

// ✅ lien externe
<Button asChild variant="outline">
  <a href="https://meet.marenostrum.tech/rdv-equipe" target="_blank" rel="noopener noreferrer">
    <Calendar className="mr-2 h-4 w-4" />Prendre rendez-vous
  </a>
</Button>

// ✅ pleine largeur mobile, auto desktop
<Button className="w-full sm:w-auto">…</Button>

// ❌ ne pas re-styler ce que la variante gère déjà
<Button className="rounded-lg uppercase tracking-widest text-lg bg-nuit">…</Button>
```

Cible tactile minimale 44 px : sur mobile, préférer `size="lg"` ou `h-11` pour les CTA.

### 5.2 `PageHero` — `src/components/PageHero.tsx`

Le héros de **toutes** les pages internes. Applique automatiquement le pattern sombre (dégradé nuit → encre, rayures, halo turquoise), le titre Fraunces italique et l'eyebrow clair. **Une page ne fabrique jamais son propre héros** : c'est ce qui rendait le site disparate, chaque page ayant sa hauteur, son sous-titre et son dégradé.

```tsx
interface PageHeroProps {
  eyebrow?: string;       // rendu en mn-eyebrow-light
  title: ReactNode;       // h1 Fraunces italique, text-wrap: balance — un <span> coloré est permis
  subtitle?: ReactNode;   // mn-lead, text-primary-foreground/80, max-w-2xl
  ctas?: ReactNode;       // boutons, empilés mobile / en ligne desktop
  breadcrumbs?: ReactNode;// fil d'Ariane au-dessus du titre, recoloré pour le fond sombre
  meta?: ReactNode;       // ligne sous le titre : auteur · date · temps de lecture
  align?: "center" | "left";   // « left » pour les articles ; « center » par défaut
  size?: "sm" | "md" | "lg";   // py-10/20 · py-12/24 · py-16/32
}
```

```tsx
<PageHero
  eyebrow="Parlons de votre projet"
  title="Contactez-nous"
  subtitle="Construisons ensemble votre projet entrepreneurial"
  size="sm"
  ctas={
    <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
      <Link to="/contact">Nous contacter</Link>
    </Button>
  }
/>
```

Sur fond sombre, le CTA principal est `variant="secondary"` (turquoise), pas `default` (nuit sur nuit, invisible).

**Exceptions assumées** — pages dont le héros n'est pas un bandeau centré : l'accueil (héros unique), Niteo (marque distincte, sous-domaine propre), le parcours du diagnostic (l'écran de couverture fait partie d'un enchaînement d'étapes), la page du livre blanc (deux colonnes avec formulaire), la newsletter et les écrans du live. Les pages juridiques sont verrouillées en écriture.

### 5.3 `MaritimeIcon` — `src/components/MaritimeIcon.tsx`

Illustrations dessinées à la main, sprite `public/icons-maritime.png`. Pour les cartes de valeurs, les étapes, les offres — là où une icône Lucide serait trop froide.

```tsx
type IconName = "lighthouse" | "anchor" | "sailboat" | "wheel" | "telescope" | "map" | "handshake" | "buoy";

<MaritimeIcon name="lighthouse" size={60} className="mb-5" />
```

Tailles en usage : 52 (cartes de valeurs), 60 (cartes d'offre). Ne pas descendre sous 40 — le trait devient illisible.

### 5.4 Cartes

| Classe | Rendu |
|---|---|
| `mn-card` | Blanc, bordure nuit 18 %, 14 px, bordure 40 % au survol |
| `mn-card mn-card-accent` | Idem avec bordure turquoise |
| `card-interactive` | Curseur pointeur, bordure turquoise 50 % au survol — **pour les cartes cliquables** |
| `hover-lift` | Lève de 3 px + ombre au survol — **souris uniquement**, inerte au tactile |
| `mn-page-shell` | Feuille blanche, 6 px, ombre lift — conteneur de page |

```tsx
// ✅ carte cliquable
<Link to="/club" className="mn-card card-interactive hover-lift p-6 block">…</Link>

// ✅ carte statique
<div className="mn-card p-6">…</div>
```

### 5.5 Chips et badges

```tsx
<span className="mn-chip mn-chip-nuit">Nouveau</span>
<span className="mn-chip mn-chip-turquoise">Complet</span>
<span className="mn-chip mn-chip-ocre">Dernières places</span>
<span className="mn-chip mn-chip-outline">2026</span>
```

Toujours `mn-chip` + un modificateur. `mn-chip` seul n'a pas de couleur.

### 5.6 Composants partagés existants

Avant de créer un composant, vérifier qu'il n'existe pas déjà dans `src/components/` :

`Breadcrumbs` · `CountUpNumber` · `FAQSection` · `StatCard` · `StatsSection` · `TestimonialCard` · `NavLink` · `ScrollToTopButton` · `CookieBanner` · `ChatBot` · `ExitIntentPopup`

### 5.7 Formulaires

Primitives shadcn : `Input`, `Label`, `Textarea`, `Select`. Le `Label` porte toujours un `htmlFor` ; le champ un `id` identique.

```tsx
<div>
  <Label htmlFor="email">Email *</Label>
  <Input id="email" type="email" required className="mt-2" placeholder="votre@email.com" />
</div>
```

Icône dans un champ : `absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none` + `pl-8` sur l'input.

Bouton de soumission : désactivé pendant l'envoi, avec `Loader2 animate-spin`. État de succès rendu **à la place** du formulaire, pas au-dessus.

---

## 6. Iconographie

- **UI et navigation :** `lucide-react`, taille `h-4 w-4` dans les boutons et listes, `h-5 w-5` dans les titres de bloc, `h-6 w-6` isolée.
- **Illustration de marque :** `MaritimeIcon` (§5.3).
- **Logos partenaires :** images `<img>` avec `alt` nommant l'organisation.
- **Jamais** d'emoji comme icône, jamais d'icône sans `aria-label` si elle est seule dans un bouton.

```tsx
// ✅ bouton icône seule
<button aria-label="Fermer le menu" className="w-9 h-9 rounded-full …">
  <X className="h-4 w-4" />
</button>
```

---

## 7. Mouvement

Le respect de `prefers-reduced-motion` est global : toute transition et animation est neutralisée quand l'utilisateur le demande. **Ceci ne fonctionne que si on n'utilise pas `!important` ni d'animation JS manuelle.**

**Une seule courbe pour tout le site** : `--ease-mn` = `cubic-bezier(0.4, 0, 0.2, 1)`.
C'est ce qui donne l'impression d'unité — les sites les plus soignés n'en
utilisent qu'une. Ne jamais écrire `ease`, `ease-out` ou une autre courbe en dur.

| Besoin | Solution | Durée |
|---|---|---|
| Survol de bouton | `mn-btn` + `mn-btn-lift` (fond + `translateY(-1px)`) | 150 ms |
| Micro-interaction (bordure, ombre) | `card-interactive` | 200 ms |
| Survol d'une carte | `hover-lift` | 200 ms |
| Soulignement de lien | `mn-link` (`scaleX` sur `::after`) | 200 ms |
| Apparition au défilement | `fade-up` via `useFadeIn` | 400 ms |
| Ouverture de menu / modale | `animate-in zoom-in-95 fade-in` | 300 ms |

Règles :
- Durées entre **150 et 400 ms**. Au-delà, ça traîne ; en deçà, ça saccade.
- Amplitude d'une apparition : **16 px maximum**. Au-delà de 20 px, l'effet
  devient un gadget.
- N'animer que `transform` et `opacity`. Jamais `width`, `height`, `top`, `margin`.
- Les effets de survol vivent dans `@media (hover: hover) and (pointer: fine)` — sinon ils collent au doigt sur mobile.
- Le survol ne doit **jamais** décaler la mise en page.
- Révéler **900 px avant** l'entrée à l'écran (`rootMargin` de `useFadeIn`) :
  sans cette avance, un défilement rapide laisse un écran blanc.

**Retour à l'appui.** Un bouton réagit au **contact**, pas au relâchement : `.mn-btn:active` le réduit à 97 % en 100 ms, `.card-interactive:active` à 99 %. Sans cela, un bouton ne bouge qu'à la fin du geste et paraît mort au doigt. `touch-action: manipulation` est posé sur tous les éléments cliquables pour supprimer le délai de 300 ms de certains navigateurs mobiles : aucun élément du site n'utilise le double-tap.

**Réglages système.** Les surfaces translucides (en-tête, bande de preuves, bannière) deviennent opaques sous `prefers-reduced-transparency`, et gagnent une bordure franche sous `prefers-contrast: more`. Une matière translucide ne doit jamais coûter la lisibilité.

**Ce qu'on ne fait pas, et c'est délibéré.** Aucun des six concurrents analysés
n'utilise de parallaxe, de compteur animé en continu, ni de transition entre
les pages. Les sites les plus agités du marché sont aussi les plus confus. Deux
mouvements d'ambiance subsistent sur l'accueil — le halo du héros (26 s) et le
bandeau de logos (55 s) — et doivent rester les seuls.

---

## 8. Accessibilité

Ce qui est en place globalement — à ne pas casser :

- `:focus-visible` → anneau turquoise 2 px avec offset. Ne jamais mettre `outline-none` sans le remplacer par un `focus-visible:ring-*`.
- `* { border-color: hsl(var(--border)) }` — les bordures ont une couleur par défaut cohérente.
- Reduced motion respecté (§7).

Ce qu'il faut faire à chaque composant :

| Point | Règle |
|---|---|
| Contraste texte | 4,5:1 minimum. Les paires du §1.3 sont validées ; en dehors, vérifier. |
| Cibles tactiles | 44 × 44 px minimum sur mobile. `h-9` (36 px) n'est acceptable que sur desktop. |
| Images | `alt` descriptif, ou `alt=""` si purement décorative. |
| Formulaires | `Label htmlFor` + `id`. Erreur affichée près du champ, pas seulement en toast. |
| Modales | `role="dialog" aria-modal="true" aria-labelledby`. Fermeture par la touche Échap et par clic hors zone. |
| Navigation clavier | L'ordre de tabulation suit l'ordre visuel. Les liens cachés visuellement (honeypot) portent `tabIndex={-1} aria-hidden`. |
| Couleur seule | Une information n'est jamais portée que par la couleur — ajouter une icône ou un texte. |

---

## 9. Pièges connus

### La cascade Tailwind écrase certains fonds

Rencontré sur la barre de navigation : `bg-white/92` était neutralisé par le thème et le fond devenait transparent. Quand une couleur de fond refuse de s'appliquer sur un élément `sticky`/`fixed` avec `backdrop-filter`, passer par un `style={}` inline :

```tsx
// solution retenue dans Header.tsx
style={{
  backgroundColor: "rgba(255,255,255,0.93)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
}}
```

C'est l'**unique** cas où `rgba()` est toléré, parce qu'il s'agit de blanc pur et que le style inline est la seule spécificité qui gagne. Pour toute autre couleur, `hsl(var(--token))` en inline.

### `bg-white` sur les cartes

`mn-card` et `mn-page-shell` utilisent `#fff` **dans le CSS**, pas dans le JSX. Dans le JSX on écrit `bg-card` ou `bg-background`, jamais `bg-white`.

### Fraunces en corps de texte

Fraunces est chargée pour les titres. En corps, à petite taille, elle devient illisible et alourdit le rendu. `font-editorial` reste réservé aux `h1`/`h2` et aux accroches.

### Le mode sombre

Un jeu de tokens `.dark` existe dans `index.css` mais **n'est pas activé** sur le site. Ne pas compter dessus, ne pas l'étendre sans décision explicite.

### Les formes géométriques héritées

`shape-cut`, `shape-fold`, `shape-diagonal`, `shape-hex`, `shape-parallelogram`, `shape-arrow`, `shape-squircle`, `shape-slash-*`, `shape-notch` sont conservées pour les pages qui les utilisent encore. **Ne pas en introduire de nouvelles occurrences** — la forme de marque est la pilule (`shape-pill` / `rounded-full`). Seul `shape-hex` reste en usage actif pour les pastilles d'icône.

---

## 10. Checklist avant de livrer un composant ou une page

- [ ] Zéro couleur brute **ajoutée**. Commande de contrôle, à lancer avant et après :
  ```bash
  grep -rnE "text-white|bg-white|#[0-9a-fA-F]{6}\b|-(gray|slate|blue|zinc)-[0-9]" src --include="*.tsx" --exclude-dir=ui | wc -l
  ```
  **Baseline au 7 septembre 2026 : 146 occurrences**, dette héritée concentrée dans `Newsletter.tsx` (43) et `Unsubscribed.tsx` (27). Le chiffre ne doit pas augmenter. Le faire baisser est bienvenu mais c'est un chantier à part — ne pas le mélanger à une autre tâche.
- [ ] Zéro `uppercase` / `tracking-` sur un bouton
- [ ] Les titres d'impact sont en `font-editorial italic`, le corps en DM Sans
- [ ] Les sections sombres empilent dégradé + rayures + halo
- [ ] Le CTA principal sur fond sombre est `variant="secondary"`
- [ ] `Header`, `Footer`, `EnhancedSEOHead` présents sur toute nouvelle page
- [ ] Cartes cliquables : `card-interactive` + `cursor-pointer` implicite ; survol sans décalage
- [ ] Icônes Lucide ou `MaritimeIcon`, pas d'emoji ; `aria-label` sur les boutons icône
- [ ] Texte lu ≥ 16 px sur mobile ; cibles tactiles ≥ 44 px
- [ ] Testé à 375 px et 1440 px, aucun défilement horizontal
- [ ] Testé au clavier : focus visible, ordre logique, modale fermable par Échap
- [ ] Aucune modification dans `src/components/ui/` (hors `button.tsx` justifié)
- [ ] `npm run lint` passe

---

## 11. Maintenance de ce document

Dernière refonte : **octobre 2026** — échelle typographique recalée sur une mesure réelle des concurrents français, boutons ramenés à 52 px, courbe d'animation unifiée, cinq effets de mouvement normalisés.

Quand un token, une variante de bouton ou un utilitaire change dans le code, **ce fichier est mis à jour dans le même commit**. Un design system qui ne correspond plus au code est pire qu'aucun design system : il donne confiance dans des règles fausses — c'est exactement ce qui est arrivé à `CHARTE-GRAPHIQUE.md`.
