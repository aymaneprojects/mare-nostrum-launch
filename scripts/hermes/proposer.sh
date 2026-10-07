#!/usr/bin/env bash
# Envoie les modifications faites dans le clone sur GitHub, dans une BRANCHE de
# proposition, et UNIQUEMENT depuis la dernière version de main (sinon : refus, code 6).
# GitHub fusionne ensuite dans main après vérification de la construction. Rien n'est
# publié ici : la mise en ligne passe par ./deploy-vps.sh. Ainsi GitHub contient toujours
# tout ce qui est en ligne.
#
# Usage : scripts/hermes/proposer.sh "sujet court de la modification"
set -euo pipefail
cd "$(dirname "$0")/../.."

[ -n "${1:-}" ] || { echo "Usage : scripts/hermes/proposer.sh \"sujet court\"" >&2; exit 1; }
[ -n "$(git status --porcelain)" ] || { echo "Rien à proposer : aucune modification." >&2; exit 1; }

sujet=$(printf '%s' "$1" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null | tr 'A-Z' 'a-z' \
  | tr -c 'a-z0-9\n' '-' | sed 's/--*/-/g; s/^-//; s/-$//' | cut -c1-40)
branche="hermes/$(date +%F)-${sujet:-modification}"

git fetch -q origin
# Verrou : on ne propose QUE depuis la dernière version de GitHub. Un clone en retard
# produirait une proposition qui efface le travail des autres (18/09 et 05/10/2026).
if ! git merge-base --is-ancestor origin/main HEAD; then
  echo "REFUS : ta copie est en retard sur GitHub (main). Aucune proposition tant qu'elle n'est pas à jour." >&2
  echo "Fais : git stash && scripts/hermes/sync.sh && git stash pop   (puis relis tes modifications et relance)." >&2
  exit 6
fi
git checkout -q -b "$branche"
git add -A
# Jamais de secret ni de fichier temporaire dans une proposition.
if git diff --cached --name-only | grep -E '(^|/)(\.env[^/]*|.*\.hermes-tmp.*|.*\.(pem|key))$' >/dev/null; then
  echo "Un fichier sensible ou temporaire est dans les modifications : proposition annulée." >&2
  git diff --cached --name-only | grep -E '(^|/)(\.env[^/]*|.*\.hermes-tmp.*|.*\.(pem|key))$' >&2
  git reset -q; git checkout -q -; git branch -D "$branche" >/dev/null
  exit 4
fi
git -c user.name="Hermes (agent développeur)" -c user.email="hermes@marenostrum.tech" \
  commit -q -m "Hermes : $1"

if ! git rebase -q origin/main 2>/dev/null; then
  git rebase --abort || true
  echo "Conflit avec la version de GitHub : la branche $branche est créée mais pas envoyée." >&2
  echo "À résoudre par une personne." >&2
  exit 5
fi
git push -q -u origin "$branche"
git checkout -q main
git merge --ff-only -q origin/main 2>/dev/null || true

echo "Proposition envoyée : $branche"
echo "À relire : https://github.com/aymaneprojects/mare-nostrum-launch/compare/main...$branche"
