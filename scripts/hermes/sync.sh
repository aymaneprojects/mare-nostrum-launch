#!/usr/bin/env bash
# Remet le clone du serveur sur la dernière version de GitHub (main), SANS jamais
# écraser de travail : si le clone contient des modifications ou des commits non
# envoyés, le script le dit et s'arrête.
#
# À lancer au début de CHAQUE tâche sur le site, et automatiquement toutes les
# 10 minutes (minuteur systemd). C'est un clone resté figé qui a effacé onze jours
# de travail le 18 septembre 2026, puis le travail du 5 octobre.
set -euo pipefail
cd "$(dirname "$0")/../.."

git fetch -q origin

if [ -n "$(git status --porcelain)" ]; then
  echo "Clone modifié : rien n'est écrasé. Envoyez d'abord le travail avec scripts/hermes/proposer.sh" >&2
  exit 2
fi

git checkout -q main
if ! git merge --ff-only -q origin/main 2>/dev/null; then
  echo "La branche main du clone a divergé de GitHub (commits locaux non envoyés) :" >&2
  git log --oneline origin/main..main >&2
  echo "À résoudre par une personne : aucun écrasement automatique." >&2
  exit 3
fi
# Des commits locaux déjà « contenus » dans origin/main passeraient le test ci-dessus
# sans être sur GitHub : on les cherche explicitement.
if [ -n "$(git log origin/main..main --oneline)" ]; then
  echo "Le clone contient des commits qui ne sont PAS sur GitHub :" >&2
  git log --oneline origin/main..main >&2
  echo "Les envoyer (scripts/hermes/proposer.sh) avant de continuer." >&2
  exit 3
fi
echo "Clone à jour : $(git log -1 --format='%h %s')"
