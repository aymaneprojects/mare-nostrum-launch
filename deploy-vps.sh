#!/usr/bin/env bash
# Déploiement du site sur le VPS CloudPanel (187.124.50.47).
#
# Le même build sert deux domaines : src/main.tsx charge un routeur différent
# selon le hostname (site principal vs application Niteo). Les deux racines
# doivent donc toujours recevoir le MÊME contenu.
#
# Garde-fou : le script REFUSE de publier un code plus ancien que celui déjà en
# ligne (comparaison des dates de commit via /version.json). Le 18/09/2026, un
# build fait depuis une copie du dépôt figée au 7 septembre a effacé onze jours
# de travail en production.
#
# Usage : ./deploy-vps.sh
#         FORCE=1 ./deploy-vps.sh   (contourner le garde-fou — à éviter)
#
# Fonctionne aussi bien depuis un poste de dev que depuis le serveur lui-même.
set -euo pipefail

SERVER="root@187.124.50.47"

# domaine:utilisateur système:racine
TARGETS=(
  "www.marenostrum.tech:marenostrum:/home/marenostrum/htdocs/www.marenostrum.tech/"
  "niteo.marenostrum.tech:niteo:/home/niteo/htdocs/niteo.marenostrum.tech/"
)

# Sur le serveur, les commandes s'exécutent en local ; ailleurs, via SSH.
if [ -d /home/marenostrum/htdocs ]; then
  run() { bash -c "$1"; }
  copy() { rsync -a --delete dist/ "$1"; }
else
  run() { ssh "$SERVER" "$1"; }
  copy() { rsync -az --delete dist/ "$SERVER:$1"; }
fi

# ── Garde-fou : ne jamais remplacer une version plus récente ─────────────────
echo "==> Vérification de la version en ligne"
# Lecture publique en HTTPS : ne dépend pas de SSH, donc un échec d'accès au
# serveur ne peut pas faire sauter le contrôle en silence.
http=$(curl -s -o /tmp/mn-live-version.json -w '%{http_code}' https://www.marenostrum.tech/version.json || echo "000")
if [ "$http" = "200" ]; then
  live=$(cat /tmp/mn-live-version.json)
elif [ "$http" = "404" ]; then
  live=""   # premier déploiement avec empreinte : rien à comparer
else
  echo "ABANDON : impossible de lire la version en ligne (HTTP $http)." >&2
  [ "${FORCE:-0}" = "1" ] || exit 1
  live=""
fi
rm -f /tmp/mn-live-version.json
live_date=$(printf '%s' "$live" | sed -n 's/.*"commit_date": *"\([^"]*\)".*/\1/p')
live_commit=$(printf '%s' "$live" | sed -n 's/.*"commit": *"\([^"]*\)".*/\1/p')
local_date=$(git log -1 --format=%cI)
local_commit=$(git rev-parse --short HEAD)

echo "    en ligne : ${live_commit:-inconnu} ${live_date:-(pas de version.json)}"
echo "    à publier : $local_commit $local_date"

if [ -n "$(git status --porcelain --untracked-files=no -- src public index.html package.json)" ]; then
  echo "    ATTENTION : modifications non commitées dans src/, elles partiraient en ligne sans exister sur GitHub." >&2
  if [ "${FORCE:-0}" != "1" ]; then
    echo "ABANDON : commitez (et poussez) avant de déployer, ou relancez avec FORCE=1." >&2
    exit 1
  fi
fi

live_ts=$(printf '%s' "$live" | sed -n 's/.*"commit_ts": *\([0-9]*\).*/\1/p')
local_ts=$(git log -1 --format=%ct)
if [ -n "$live_ts" ] && [ "$local_ts" -lt "$live_ts" ] && [ "${FORCE:-0}" != "1" ]; then
  echo "" >&2
  echo "ABANDON : votre code ($local_commit) est PLUS ANCIEN que celui en ligne ($live_commit)." >&2
  echo "Le déployer effacerait des fonctionnalités en production." >&2
  echo "Récupérez d'abord la dernière version (git pull), puis relancez." >&2
  exit 1
fi

if ! run true 2>/dev/null; then
  echo "ABANDON : pas d'accès SSH à $SERVER (clé non autorisée ?)." >&2
  echo "Installez votre clé une fois pour toutes : ssh-copy-id $SERVER" >&2
  exit 1
fi

echo "==> Build de production"
npm run build

for target in "${TARGETS[@]}"; do
  IFS=':' read -r domain user dir <<< "$target"

  echo "==> $domain — envoi"
  copy "$dir"

  echo "==> $domain — permissions"
  run "chown -R $user:$user $dir && \
    find $dir -type d -exec chmod 755 {} \; && \
    find $dir -type f -exec chmod 644 {} \;"

  echo "==> $domain — vérification"
  # --resolve est obligatoire : sans le bon SNI, nginx sert le vhost par
  # défaut et renvoie une erreur TLS trompeuse.
  code=$(run "curl -sk --http1.1 --resolve $domain:443:127.0.0.1 \
    -o /dev/null -w '%{http_code}' https://$domain/")
  if [ "$code" != "200" ]; then
    echo "ÉCHEC : $domain a répondu $code au lieu de 200" >&2
    exit 1
  fi
  echo "    OK ($code)"
done

echo "==> Terminé — en ligne : $local_commit"
