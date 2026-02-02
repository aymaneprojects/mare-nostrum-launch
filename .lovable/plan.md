# Plan : Création des 3 Silos SEO

## Objectif
Créer une architecture de pages en silos SEO pour maximiser la pertinence thématique. Chaque silo est une "salle blanche" - les liens internes restent UNIQUEMENT au sein du même silo.

---

## Architecture des Silos

```text
SILO 1 : ÉCOLES (B2B) - 2 pages
================================
/ecoles/transformation-entrepreneuriale (Page Pilier)
    │
    └──> /ecoles/diagnostic-gratuit (Landing conversion)

SILO 2 : ENTREPRENEURS (B2C) - 3 pages
=======================================
/entrepreneurs/accompagnement-francophonie-afrique (Page Pilier)
    │
    ├──> /entrepreneurs/test-maturite-projet (Outil interactif)
    └──> /entrepreneurs/mentorat-individuel (Service)

SILO 3 : MAGAZINE THOUGHT LEADERSHIP - 3 pages
===============================================
/mag/entrepreneuriat-social-francophonie
/mag/innovation-pedagogique-entrepreneuriat
/mag/impact-mesure-startup
```

---

## Fichiers à Créer (8 pages total)

### SILO 1 : Écoles (2 pages)

| Fichier | Type | Description |
|---------|------|-------------|
| `src/pages/ecoles/TransformationEntrepreneuriale.tsx` | Page Pilier | Landing B2B pour directeurs d'écoles |
| `src/pages/ecoles/DiagnosticGratuit.tsx` | Landing Conversion | Formulaire de diagnostic pour écoles |

### SILO 2 : Entrepreneurs (3 pages)

| Fichier | Type | Description |
|---------|------|-------------|
| `src/pages/entrepreneurs/AccompagnementFrancophonie.tsx` | Page Pilier | Landing B2C incubateur Toulouse-Casablanca |
| `src/pages/entrepreneurs/TestMaturiteProjet.tsx` | Outil | Quiz interactif maturité projet |
| `src/pages/entrepreneurs/MentoratIndividuel.tsx` | Service | Page service mentorat |

### SILO 3 : Magazine (3 pages)

| Fichier | Type | Description |
|---------|------|-------------|
| `src/pages/mag/EntrepreneuriatSocialFrancophonie.tsx` | Article Expert | 2000-3000 mots |
| `src/pages/mag/InnovationPedagogiqueEntrepreneuriat.tsx` | Article Expert | 2000-3000 mots |
| `src/pages/mag/ImpactMesureStartup.tsx` | Article Expert | 2000-3000 mots |

---

## Règle des Liens Internes (Critique SEO)

**JAMAIS de lien entre silos différents :**
- ❌ Une page Écoles ne pointe JAMAIS vers Entrepreneurs ou Mag
- ❌ Une page Entrepreneurs ne pointe JAMAIS vers Écoles ou Mag
- ❌ Les pages Mag restent autonomes

**Liens autorisés :**
- ✅ Page support → Page pilier du même silo
- ✅ Page pilier → Pages support du même silo
- ✅ Toutes les pages peuvent pointer vers /contact (page transversale)

---

## Détails des Pages

### SILO 1 - Page Pilier : `/ecoles/transformation-entrepreneuriale`

**Titre SEO :** "Programmes d'Entrepreneuriat pour Écoles | Alternative Agile à Pépite"

**Sections :**
1. Hero avec proposition de valeur B2B
2. Problématiques des directeurs d'écoles
3. Notre approche vs approches traditionnelles (tableau comparatif)
4. CTA diagnostic gratuit

**Liens internes (silo only) :**
- Vers `/ecoles/diagnostic-gratuit`

---

### SILO 1 - Landing : `/ecoles/diagnostic-gratuit`

**Titre SEO :** "Diagnostic Entrepreneuriat École Gratuit | Évaluation 15 min"

**Sections :**
1. Hero avec bénéfices du diagnostic
2. Ce que le diagnostic couvre
3. Formulaire de demande
4. FAQ

**Liens internes :**
- Retour vers `/ecoles/transformation-entrepreneuriale`

---

### SILO 2 - Page Pilier : `/entrepreneurs/accompagnement-francophonie-afrique`

**Titre SEO :** "Incubateur Impact Toulouse-Casablanca | Accompagnement Personnalisé"

**Sections :**
1. Hero vision internationale
2. Notre approche unique
3. Les 3 offres (Tremplin, Ascension, Élite)
4. Liens vers outils du silo
5. CTA rejoindre le club

**Liens internes (silo only) :**
- Vers `/entrepreneurs/test-maturite-projet`
- Vers `/entrepreneurs/mentorat-individuel`

---

### SILO 2 - Outil : `/entrepreneurs/test-maturite-projet`

**Titre SEO :** "Test Maturité Projet Entrepreneurial | Évaluation Gratuite 5 min"

**Sections :**
1. Hero avec promesse
2. Quiz interactif (10 questions)
3. Résultat avec recommandation personnalisée
4. CTA vers accompagnement adapté

**Liens internes :**
- Vers `/entrepreneurs/accompagnement-francophonie-afrique`
- Vers `/entrepreneurs/mentorat-individuel`

---

### SILO 2 - Service : `/entrepreneurs/mentorat-individuel`

**Titre SEO :** "Mentorat Entrepreneur Individuel | Séances 1-to-1 Expert"

**Sections :**
1. Hero avec bénéfices
2. Comment ça fonctionne
3. Nos mentors (vrais profils de l'équipe)
4. FAQ

**Liens internes :**
- Vers `/entrepreneurs/accompagnement-francophonie-afrique`
- Vers `/entrepreneurs/test-maturite-projet`

---

### SILO 3 - Articles Magazine (Thought Leadership)

Articles longs (2000-3000 mots) pour établir l'expertise :

1. `/mag/entrepreneuriat-social-francophonie`
   - Vision de l'entrepreneuriat social en francophonie
   - Tendances, analyses, perspectives

2. `/mag/innovation-pedagogique-entrepreneuriat`
   - Nouvelles approches pédagogiques
   - Design thinking, learning by doing

3. `/mag/impact-mesure-startup`
   - Comment mesurer l'impact social
   - Frameworks, méthodologies

**Liens internes :** Ces articles restent autonomes.

---

## Routes à Ajouter (App.tsx)

```typescript
// SILO 1 : Écoles
/ecoles/transformation-entrepreneuriale
/ecoles/diagnostic-gratuit

// SILO 2 : Entrepreneurs
/entrepreneurs/accompagnement-francophonie-afrique
/entrepreneurs/test-maturite-projet
/entrepreneurs/mentorat-individuel

// SILO 3 : Magazine
/mag/entrepreneuriat-social-francophonie
/mag/innovation-pedagogique-entrepreneuriat
/mag/impact-mesure-startup
```

---

## Ordre d'Implémentation

1. **Phase 1** - Routes App.tsx + dossiers
2. **Phase 2** - Pages Piliers (2 pages)
3. **Phase 3** - Pages Support Silo 1 (1 page)
4. **Phase 4** - Pages Support Silo 2 (2 pages)
5. **Phase 5** - Magazine Silo 3 (3 articles longs)
6. **Phase 6** - Mise à jour sitemap

---

## Fichiers à Modifier

| Fichier | Modification |
|---------|-------------|
| `src/App.tsx` | Ajouter 8 nouvelles routes |
| `public/sitemap.xml` | Ajouter 8 nouvelles URLs |
| `supabase/functions/sitemap/index.ts` | Ajouter les pages statiques |

---

## Contraintes Importantes

- ⚠️ **Pas de faux témoignages** - Utiliser uniquement des données réelles
- ⚠️ **Pas de faux chiffres** - Ne pas inventer de statistiques
- ✅ Utiliser les vrais profils de l'équipe existante
- ✅ Respecter la charte graphique existante
