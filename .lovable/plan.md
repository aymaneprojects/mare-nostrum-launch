

## Plan : Remplacer le logo Niteo et ameliorer la navbar

### Ce qui sera fait

1. **Copier le nouveau logo** (`Logo_NITEO26_Clair_1-2.png`) dans `src/assets/niteo/logo-niteo-2026.png`

2. **Modifier la navbar** (ligne 186-194 de `NiteoCandidature.tsx`) :
   - Remplacer l'ancien logo par le nouveau
   - Ajouter le texte "Toulouse" centre dans la navbar
   - Ameliorer le design de la navbar pour un rendu plus professionnel : ombre portee, espacement, typographie plus affirmee

3. **Remplacer le logo dans le Hero** (ligne 204) par le nouveau logo

4. **Ameliorer le UIX global** de la navbar :
   - Ajout d'un effet glassmorphism plus marque (backdrop-blur + transparence)
   - Ombre subtile pour detacher la barre du contenu
   - Le texte "Toulouse" sera affiche en tant que badge ou texte stylise entre le logo et le CTA, centre dans la barre

### Fichiers modifies

| Fichier | Modification |
|---|---|
| `src/assets/niteo/logo-niteo-2026.png` | Nouveau fichier (copie du logo uploade) |
| `src/pages/NiteoCandidature.tsx` | Import du nouveau logo, refonte navbar avec "Toulouse" centre, remplacement logo hero |

### Detail technique

La navbar passera d'une structure `logo | CTA` a `logo | Toulouse | CTA` avec le texte Toulouse en lettres capitales, tracking large, style professionnel.

