# 🎨 Charte Graphique - Mare Nostrum

## 📋 Table des matières
1. [Introduction](#introduction)
2. [Identité visuelle](#identité-visuelle)
3. [Palette de couleurs](#palette-de-couleurs)
4. [Typographie](#typographie)
5. [Composants UI](#composants-ui)
6. [Espacement et layout](#espacement-et-layout)
7. [Animations et transitions](#animations-et-transitions)
8. [Bonnes pratiques](#bonnes-pratiques)

---

## Introduction

Ce document définit l'ensemble des règles et standards graphiques du projet **Mare Nostrum**. Il doit être consulté par tous les développeurs et designers travaillant sur le projet pour garantir une cohérence visuelle sur l'ensemble du site.

### Principes de base
- ✅ **Toujours utiliser les tokens sémantiques** du design system (définis dans `src/index.css`)
- ✅ **Toutes les couleurs doivent être en format HSL**
- ❌ **Ne jamais utiliser de couleurs directes** (ex: `text-white`, `bg-blue-500`)
- ✅ **Utiliser les composants Shadcn** et créer des variantes personnalisées si nécessaire
- ✅ **Prioriser la réutilisabilité** et la modularité des composants

---

## Identité visuelle

### Logo
- Fichier : `src/assets/logo.png`
- Utilisation : Header, Footer, pages principales

### Nom du projet
**Mare Nostrum** - Club Entrepreneur International

### Baseline
"Révélons ensemble votre potentiel entrepreneurial"

---

## Palette de couleurs

### 🎨 Couleurs principales

#### Mode clair (Light Mode)

| Token | HSL | Utilisation | Aperçu |
|-------|-----|-------------|---------|
| `--background` | `0 0% 100%` | Arrière-plan principal | ![#FFFFFF](https://via.placeholder.com/50x30/FFFFFF/FFFFFF) |
| `--foreground` | `213 47% 26%` | Texte principal | ![#234057](https://via.placeholder.com/50x30/234057/234057) |
| `--primary` | `213 47% 26%` | Couleur de marque principale (bleu marine) | ![#234057](https://via.placeholder.com/50x30/234057/234057) |
| `--primary-foreground` | `0 0% 100%` | Texte sur fond primary | ![#FFFFFF](https://via.placeholder.com/50x30/FFFFFF/FFFFFF) |
| `--accent` | `181 71% 54%` | Couleur d'accentuation (turquoise) | ![#3ECFCF](https://via.placeholder.com/50x30/3ECFCF/3ECFCF) |
| `--accent-foreground` | `0 0% 100%` | Texte sur fond accent | ![#FFFFFF](https://via.placeholder.com/50x30/FFFFFF/FFFFFF) |
| `--secondary` | `213 30% 95%` | Fonds secondaires | ![#F2F5F7](https://via.placeholder.com/50x30/F2F5F7/F2F5F7) |
| `--secondary-foreground` | `213 47% 26%` | Texte sur fond secondary | ![#234057](https://via.placeholder.com/50x30/234057/234057) |
| `--muted` | `210 40% 96.1%` | Éléments en sourdine | ![#F5F8FA](https://via.placeholder.com/50x30/F5F8FA/F5F8FA) |
| `--muted-foreground` | `213 20% 50%` | Texte secondaire/moins important | ![#667A8A](https://via.placeholder.com/50x30/667A8A/667A8A) |
| `--card` | `0 0% 100%` | Fond des cartes | ![#FFFFFF](https://via.placeholder.com/50x30/FFFFFF/FFFFFF) |
| `--card-foreground` | `213 47% 26%` | Texte dans les cartes | ![#234057](https://via.placeholder.com/50x30/234057/234057) |
| `--border` | `214.3 31.8% 91.4%` | Bordures | ![#E4E9ED](https://via.placeholder.com/50x30/E4E9ED/E4E9ED) |
| `--destructive` | `0 84.2% 60.2%` | Actions destructives/erreurs | ![#EF4444](https://via.placeholder.com/50x30/EF4444/EF4444) |

#### Mode sombre (Dark Mode)

| Token | HSL | Utilisation |
|-------|-----|-------------|
| `--background` | `213 47% 10%` | Arrière-plan principal |
| `--foreground` | `0 0% 98%` | Texte principal |
| `--primary` | `181 71% 54%` | Couleur de marque (inversée en dark) |
| `--accent` | `181 71% 54%` | Couleur d'accentuation |
| `--card` | `213 47% 15%` | Fond des cartes |
| `--border` | `213 30% 25%` | Bordures |

### 🌈 Dégradés personnalisés

```css
--gradient-hero: linear-gradient(135deg, hsl(213 47% 26%), hsl(181 71% 54%));
--gradient-subtle: linear-gradient(180deg, hsl(0 0% 100%), hsl(213 30% 98%));
```

**Utilisation :**
```tsx
<div className="bg-gradient-to-br from-accent via-primary to-primary">
  {/* Hero sections, CTA */}
</div>
```

---

## Typographie

### Famille de polices
Le projet utilise la police système par défaut de Tailwind CSS pour une performance optimale.

### Échelle typographique

| Classe Tailwind | Taille | Utilisation |
|----------------|--------|-------------|
| `text-xs` | 0.75rem (12px) | Labels, captions |
| `text-sm` | 0.875rem (14px) | Texte secondaire, descriptions |
| `text-base` | 1rem (16px) | Texte de base |
| `text-lg` | 1.125rem (18px) | Texte important, sous-titres |
| `text-xl` | 1.25rem (20px) | Sous-titres H3 |
| `text-2xl` | 1.5rem (24px) | Titres H2 |
| `text-3xl` | 1.875rem (30px) | Titres H2 de section |
| `text-4xl` | 2.25rem (36px) | Grands titres H1 |
| `text-5xl` | 3rem (48px) | Hero titles (desktop) |
| `text-6xl` | 3.75rem (60px) | Hero titles (large screens) |

### Hiérarchie des titres

```tsx
// H1 - Hero principal
<h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">

// H2 - Titres de section
<h2 className="text-3xl md:text-4xl font-bold text-foreground">

// H3 - Sous-sections
<h3 className="text-2xl font-bold text-foreground">

// Paragraphe standard
<p className="text-base text-muted-foreground">

// Texte important
<p className="text-lg font-medium text-foreground">
```

---

## Composants UI

### Boutons (Button)

Le projet utilise le composant Button de Shadcn avec des variantes personnalisées.

#### Variantes disponibles

```tsx
// Primary (défaut)
<Button>Action principale</Button>

// Secondary
<Button variant="secondary">Action secondaire</Button>

// Outline
<Button variant="outline">Action tertiaire</Button>

// Destructive
<Button variant="destructive">Supprimer</Button>

// Ghost
<Button variant="ghost">Action discrète</Button>

// Link
<Button variant="link">Lien</Button>
```

#### Tailles

```tsx
<Button size="sm">Petit</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grand</Button>
```

#### Exemples d'utilisation

```tsx
// CTA principal
<Button size="lg" className="text-lg">
  Rejoindre le Club
</Button>

// Lien externe avec icône
<Button asChild>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    <ExternalLink className="mr-2 h-4 w-4" />
    En savoir plus
  </a>
</Button>
```

### Cartes (Card)

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Contenu</p>
  </CardContent>
</Card>
```

### Badges

```tsx
<Badge variant="default">Nouveau</Badge>
<Badge variant="secondary">Info</Badge>
<Badge variant="destructive">Urgent</Badge>
<Badge variant="outline">Optionnel</Badge>
```

---

## Espacement et layout

### Container
Le container principal est centré avec un padding responsive :

```tsx
<div className="container mx-auto px-4">
  {/* Contenu */}
</div>
```

### Sections
Espacements standard pour les sections :

```tsx
// Section standard
<section className="py-16 md:py-24">

// Hero section
<section className="py-20 md:py-32">

// Petite section
<section className="py-12 md:py-16">
```

### Grid layouts

```tsx
// 2 colonnes sur desktop
<div className="grid md:grid-cols-2 gap-8">

// 3 colonnes
<div className="grid md:grid-cols-3 gap-6">

// 4 colonnes
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Largeurs maximales

```tsx
// Texte lisible
<div className="max-w-3xl mx-auto">

// Contenu standard
<div className="max-w-6xl mx-auto">

// Large
<div className="max-w-7xl mx-auto">
```

---

## Animations et transitions

### Transitions personnalisées

```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Classes Tailwind courantes

```tsx
// Hover sur cartes
<div className="hover:shadow-xl transition-all hover:-translate-y-1">

// Hover sur boutons
<div className="hover:shadow-md transition-shadow">

// Transition smooth
<div className="transition-smooth">
```

### Ombres personnalisées

```css
--shadow-soft: 0 4px 20px -2px hsl(213 47% 26% / 0.08);
--shadow-medium: 0 10px 40px -10px hsl(213 47% 26% / 0.15);
```

---

## Bonnes pratiques

### ✅ À FAIRE

1. **Utiliser les tokens sémantiques**
   ```tsx
   // ✅ BON
   <div className="bg-primary text-primary-foreground">
   
   // ❌ MAUVAIS
   <div className="bg-blue-900 text-white">
   ```

2. **Créer des composants réutilisables**
   ```tsx
   // Créer un composant StatCard, TestimonialCard, etc.
   // plutôt que de dupliquer le code
   ```

3. **Utiliser les variantes Shadcn**
   ```tsx
   // Ajouter des variantes dans button.tsx
   const buttonVariants = cva(
     "...",
     {
       variants: {
         variant: {
           default: "...",
           premium: "bg-gradient-to-r from-primary to-accent",
         }
       }
     }
   )
   ```

4. **Respecter la hiérarchie visuelle**
   - Un seul H1 par page
   - Utiliser les bons niveaux de titres (H2, H3...)
   - Contraste suffisant entre texte et fond

5. **Responsive design**
   ```tsx
   // Toujours penser mobile-first
   <h1 className="text-4xl md:text-6xl">
   <div className="grid md:grid-cols-2 lg:grid-cols-3">
   ```

### ❌ À ÉVITER

1. **Couleurs en dur**
   ```tsx
   // ❌ Ne jamais faire ça
   className="text-white bg-[#234057]"
   
   // ✅ Utiliser les tokens
   className="text-primary-foreground bg-primary"
   ```

2. **Styles inline**
   ```tsx
   // ❌ Éviter
   <div style={{ color: 'white', backgroundColor: '#234057' }}>
   
   // ✅ Préférer
   <div className="text-primary-foreground bg-primary">
   ```

3. **Duplication de code**
   - Créer des composants pour les patterns récurrents
   - Utiliser les composants UI de Shadcn

4. **Oublier le dark mode**
   - Toujours tester en mode sombre
   - Vérifier les contrastes

---

## Structure des fichiers

```
src/
├── components/
│   ├── ui/              # Composants Shadcn (ne pas modifier directement)
│   ├── Header.tsx       # Header global
│   ├── Footer.tsx       # Footer global
│   ├── StatCard.tsx     # Cartes de statistiques
│   └── TestimonialCard.tsx  # Cartes de témoignages
├── pages/
│   ├── Index.tsx        # Page d'accueil
│   ├── Croissance.tsx   # Page des offres
│   ├── Education.tsx    # Page éducation
│   ├── About.tsx        # À propos
│   └── Contact.tsx      # Contact
├── index.css            # 🎨 Design system (tokens CSS)
└── tailwind.config.ts   # Configuration Tailwind
```

---

## Ressources

- **Composants UI** : [Shadcn/ui](https://ui.shadcn.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Documentation Tailwind** : [tailwindcss.com](https://tailwindcss.com/)
- **Color Tool** : [HSL Color Picker](https://hslpicker.com/)

---

## Contact

Pour toute question concernant la charte graphique, contactez l'équipe Mare Nostrum.

**Dernière mise à jour** : Novembre 2025
