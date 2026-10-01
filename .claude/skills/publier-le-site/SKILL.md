---
name: publier-le-site
description: Met le site en ligne sur le serveur. Couvre la vérification du contenu, le lint, la construction, le déploiement sur les deux domaines et le contrôle après mise en ligne. À utiliser quand on demande de publier, déployer, mettre en ligne ou pousser en production.
---

# Publier le site

Le site n'a **aucun déploiement automatique**. Un envoi sur GitHub ne met rien
en ligne. Tout passe par `./deploy-vps.sh`, lancé depuis le poste de
développement.

## Avant de commencer — conditions d'arrêt

S'arrêter et demander si l'une de ces conditions est vraie :

- La vérification du contenu signale une prose modifiée (voir la skill
  `verifier-contenu`).
- Des modifications ne sont pas enregistrées sur GitHub : elles partiraient en
  ligne sans exister nulle part ailleurs.
- `npm run lint` ou `npm run build` échoue.
- Une conférence est en cours sur `/live` : prévenir avant de publier.

## Étapes

```bash
# 1. Contenu publié intact ?
python3 .claude/skills/verifier-contenu/scripts/verifier-contenu.py

# 2. Qualité du code — seul contrôle automatisé du projet
npm run lint

# 3. Tout est enregistré et envoyé sur GitHub
git status --short && git push origin main

# 4. Publication sur les deux domaines
./deploy-vps.sh
```

`deploy-vps.sh` enchaîne lui-même : lecture de la version en ligne, refus si le
code local est plus ancien, construction, envoi, permissions, et contrôle que
chaque domaine répond. Il affiche `Terminé — en ligne : <version>`.

La construction régénère au passage les fiches de contact et les QR codes de
l'équipe, à partir de `src/data/team.json`.

## Vérifier après coup

```bash
curl -s https://www.marenostrum.tech/version.json
curl -s https://niteo.marenostrum.tech/version.json
```

Les deux doivent afficher la **même** version, celle du dernier commit. Puis
ouvrir les pages touchées par la modification et regarder le résultat réel.

## Si ça échoue

| Message | Cause | Conduite |
|---|---|---|
| `votre code est PLUS ANCIEN que celui en ligne` | copie périmée du dépôt | récupérer la dernière version, **jamais** forcer |
| `modifications non commitées` | travail non enregistré | enregistrer et envoyer d'abord |
| `pas d'accès SSH` | clé absente ou verrouillée | demander à l'utilisateur de lancer `ssh-add` |
| un domaine ne répond pas 200 | configuration du serveur | passer à la skill `incident-prod` |

`FORCE=1` contourne les garde-fous. Il existe pour un retour en arrière
volontaire, jamais pour faire taire une alerte, et **jamais sans accord
explicite** : c'est ce garde-fou qui a été ajouté après la perte de onze jours
de travail en production.

## Les fonctions serveur ne partent pas avec le site

Elles se publient séparément : voir la skill `supabase-ops`.

## Détails

`references/domaines.md` — les deux domaines, les racines sur le serveur, et
pourquoi un seul build les sert tous les deux.
