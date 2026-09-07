#!/usr/bin/env bash
# Déploiement du site sur le VPS CloudPanel (187.124.50.47).
# Usage : ./deploy-vps.sh
set -euo pipefail

SERVER="root@187.124.50.47"
REMOTE_DIR="/home/marenostrum/htdocs/www.marenostrum.tech/"

echo "==> Build de production"
npm run build

echo "==> Envoi vers $SERVER"
rsync -az --delete dist/ "$SERVER:$REMOTE_DIR"

echo "==> Permissions"
ssh "$SERVER" "chown -R marenostrum:marenostrum $REMOTE_DIR && \
  find $REMOTE_DIR -type d -exec chmod 755 {} \; && \
  find $REMOTE_DIR -type f -exec chmod 644 {} \;"

echo "==> Terminé — https://www.marenostrum.tech"
