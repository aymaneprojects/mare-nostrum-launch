---
name: verifier-contenu
description: Vérifie qu'aucun texte publié du site n'a été modifié, et dit quoi faire quand il l'a été. À utiliser avant de commiter ou de publier, quand on demande de vérifier le contenu, les textes, les mentions légales ou les tarifs affichés, et chaque fois qu'un contrôle automatique signale une ligne éditoriale.
---

# Vérifier le contenu publié

Le texte du site est écrit en dur dans le JSX : il n'existe aucune frontière
propre entre code et contenu. Cette skill est la source unique du verrou —
la liste des fichiers protégés, le script de détection, et la conduite à tenir.

## La règle

Un texte visible par un visiteur — titre, paragraphe, question de FAQ, tarif
affiché, témoignage, mention légale, libellé de bouton — **ne se modifie jamais
sans demande explicite du propriétaire du site**.

Autorisé sans demander : déplacer du texte sans le réécrire, corriger le code
autour, changer une balise technique, réparer un bug, améliorer l'accessibilité.

Interdit sans accord : réécrire une phrase, « améliorer » un titre, corriger une
tournure, harmoniser un ton, raccourcir un paragraphe, modifier un prix affiché.

Quand une amélioration de texte semble justifiée : **la proposer** — texte actuel,
texte proposé, raison — puis attendre. Ne jamais l'appliquer dans la foulée.

## Les deux contrôles automatiques

Ils sont déclarés dans `.claude/settings.json` et s'appliquent aussi aux agents.

| Contrôle | Moment | Effet |
|---|---|---|
| `fichiers-proteges.py` | avant chaque écriture | refuse les pages à valeur contractuelle (CGV, CGU, mentions légales, confidentialité, engagement RSE) |
| `verifier-contenu.py --hook` | avant de rendre la main | liste les lignes de prose ajoutées ou retirées dans `src/pages`, `src/components`, `src/data/team.json`, `index.html` |

## Vérifier à la main

```bash
python3 .claude/skills/verifier-contenu/scripts/verifier-contenu.py
```

Sortie `0` : rien à signaler. Sortie `1` : des textes ont bougé, le rapport cite
les phrases concernées.

## Quand une alerte tombe

1. **Lire les extraits cités.** Le rapport montre la phrase retirée et la phrase
   ajoutée : la différence saute aux yeux.
2. **Déplacement ou réécriture ?** Un texte identique à un autre endroit du
   fichier est un déplacement : le dire et continuer.
3. **Si c'est une réécriture non demandée : annuler.**
   `git checkout -- <fichier>` ou l'édition inverse.
4. **Si le propriétaire l'a demandée** plus tôt dans la conversation : le
   rappeler explicitement, puis continuer.
5. **Ne rien pousser** tant que ce n'est pas tranché. La règle d'auto-push de
   `CLAUDE.md` s'arrête ici.

## Débloquer une page protégée

Le refus sur les pages juridiques est volontairement sec. Pour une modification
réellement demandée par le propriétaire : la lui faire appliquer, ou retirer
temporairement le fichier de la liste dans
`scripts/fichiers-proteges.py`, puis l'y remettre. Jamais de contournement
silencieux.

## Où est le texte publié

- **Pages marketing** : `src/pages/*.tsx`, `src/pages/ecoles/`,
  `src/pages/entrepreneurs/`, `src/pages/mag/`, pages Niteo.
- **Juridique** (protégé) : CGV, CGU, mentions légales, confidentialité, RSE.
- **Composants porteurs de texte** : `Header`, `Footer`, `BottomNav`,
  `FAQSection`, `CookieBanner`, `ExitIntentPopup`, `ChatBot`.
- **Données publiées** : `src/data/team.json` (titres de poste, coordonnées).
- **Hors du dépôt** : la table `blog_articles` — les articles sont écrits par un
  robot, voir l'agent `mag-blog`.
- **Dans les edge functions** : corps des e-mails, prompt du chatbot. Même règle.

Le reste de `src/` — hooks, `lib/`, `components/ui/`, `components/live/`,
`integrations/` — est technique : pas de contenu publié.
