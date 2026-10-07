#!/usr/bin/env bash
# Installe, UNE FOIS, la publication automatique : GitHub met le site en ligne après la fusion
# d'une proposition de Hermes (job « publier » de .github/workflows/hermes-fusion-auto.yml).
#
# À lancer depuis le poste de développement :  bash scripts/installer-publication-auto.sh
# Il fait trois choses, toutes visibles et réversibles :
#   1. crée une clé SSH dédiée (~/.ssh/mn_github_deploy), sans mot de passe ;
#   2. l'autorise sur le serveur (une ligne dans /root/.ssh/authorized_keys, repérée par « github-mn-deploy ») ;
#   3. la range dans les secrets GitHub du dépôt (VPS_SSH_KEY) avec l'empreinte du serveur (VPS_KNOWN_HOSTS).
#
# Retour arrière :
#   ssh root@187.124.50.47 "sed -i '/github-mn-deploy/d' /root/.ssh/authorized_keys"
#   gh secret delete VPS_SSH_KEY --repo aymaneprojects/mare-nostrum-launch
#   gh secret delete VPS_KNOWN_HOSTS --repo aymaneprojects/mare-nostrum-launch
set -euo pipefail
SERVER="root@187.124.50.47"
HOST="187.124.50.47"
REPO="aymaneprojects/mare-nostrum-launch"
KEY="$HOME/.ssh/mn_github_deploy"

[ -f "$KEY" ] || ssh-keygen -t ed25519 -N "" -C "github-mn-deploy" -f "$KEY" -q
PUB="$(cat "$KEY.pub")"

ssh -o ConnectTimeout=15 "$SERVER" "grep -qF '$PUB' /root/.ssh/authorized_keys || echo '$PUB' >> /root/.ssh/authorized_keys"
ssh -i "$KEY" -o IdentitiesOnly=yes -o ConnectTimeout=15 "$SERVER" true && echo "Clé autorisée sur le serveur : OK"

# Empreinte du serveur telle que ton poste la connaît déjà (pas de confiance à la première connexion).
KNOWN="$(ssh-keygen -F "$HOST" 2>/dev/null | grep -v '^#' | head -3 || true)"
[ -n "$KNOWN" ] || KNOWN="$(ssh-keyscan -t ed25519 "$HOST" 2>/dev/null)"
gh secret set VPS_SSH_KEY --repo "$REPO" < "$KEY"
printf '%s\n' "$KNOWN" | gh secret set VPS_KNOWN_HOSTS --repo "$REPO"
echo "Secrets GitHub installés. La prochaine proposition de Hermes sera publiée automatiquement."
