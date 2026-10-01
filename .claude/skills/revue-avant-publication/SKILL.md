---
name: revue-avant-publication
description: Checklist de contrôle avant de mettre le site en ligne - qualité, contenu, mobile, accessibilité, poids, routes. À utiliser quand on demande de relire, de vérifier avant publication, ou après une modification visible.
---

# Relire avant de publier

Le projet n'a aucun test automatisé. Cette checklist en tient lieu. Elle se
parcourt entièrement : chaque point ignoré est un incident possible.

## 1. Le code tient debout

```bash
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
```

Le lint signale des erreurs anciennes dans quelques fichiers : ne pas en
ajouter. Les fichiers touchés doivent être propres.

## 2. Le contenu publié n'a pas bougé

```bash
python3 .claude/skills/verifier-contenu/scripts/verifier-contenu.py
```

Toute alerte se règle avant de publier, pas après.

## 3. L'apparence respecte la charte

- Aucune couleur brute introduite : `grep -nE "text-white|bg-(blue|gray|slate)-[0-9]|#[0-9a-fA-F]{6}"` sur les fichiers modifiés.
- Sur fond sombre, les titres portent une couleur explicite, sinon ils sont
  invisibles.
- La checklist de `DESIGN-SYSTEM.md` est passée.

## 4. Le mobile

Le site se consulte au téléphone, souvent après un QR code. Vérifier à **390 px**
de large, et à 360 px pour les petits Android :

- aucun défilement horizontal ;
- les zones cliquables font au moins 44 px ;
- le texte reste lisible sans zoom ;
- rien n'est masqué par la navigation du bas.

## 5. L'accessibilité

- Les images portent une description, ou sont marquées décoratives.
- Les boutons sans texte ont un libellé pour les lecteurs d'écran.
- Le contraste est suffisant : 4,5:1 pour le texte courant.
- La navigation au clavier reste possible et visible.

## 6. Le poids

Le fichier principal pèse déjà plus d'un mégaoctet. Une page lourde se charge à
la demande plutôt que d'alourdir tout le site. Comparer la taille affichée par
la construction avant et après.

## 7. Les routes

Toute nouvelle page : route déclarée avant la route attrape-tout, balises
présentes, ajoutée au sitemap si elle est publique, et liée depuis le site —
sauf archive assumée.

## 8. Après la mise en ligne

Ouvrir les pages touchées sur les deux domaines, et comparer la version en
ligne à celle du dernier commit. Détails dans la skill `publier-le-site`.
