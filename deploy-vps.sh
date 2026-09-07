#!/usr/bin/env bash
# Déploiement du site sur le VPS CloudPanel (187.124.50.47).
#
# Le même build sert deux domaines : src/main.tsx charge un routeur différent
# selon le hostname (site principal vs application Niteo). Les deux racines
# doivent donc toujours recevoir le MÊME contenu.
#
# Usage : ./deploy-vps.sh
set -euo pipefail

SERVER="root@187.124.50.47"

# domaine:utilisateur système:racine
TARGETS=(
  "www.marenostrum.tech:marenostrum:/home/marenostrum/htdocs/www.marenostrum.tech/"
  "niteo.marenostrum.tech:niteo:/home/niteo/htdocs/niteo.marenostrum.tech/"
)

echo "==> Build de production"
npm run build

for target in "${TARGETS[@]}"; do
  IFS=':' read -r domain user dir <<< "$target"

  echo "==> $domain — envoi"
  rsync -az --delete dist/ "$SERVER:$dir"

  echo "==> $domain — permissions"
  ssh "$SERVER" "chown -R $user:$user $dir && \
    find $dir -type d -exec chmod 755 {} \; && \
    find $dir -type f -exec chmod 644 {} \;"

  echo "==> $domain — vérification"
  # --resolve est obligatoire : sans le bon SNI, nginx sert le vhost par
  # défaut et renvoie une erreur TLS trompeuse.
  code=$(ssh "$SERVER" "curl -sk --http1.1 --resolve $domain:443:127.0.0.1 \
    -o /dev/null -w '%{http_code}' https://$domain/")
  if [ "$code" != "200" ]; then
    echo "ÉCHEC : $domain a répondu $code au lieu de 200" >&2
    exit 1
  fi
  echo "    OK ($code)"
done

echo "==> Terminé"
