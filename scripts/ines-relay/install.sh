#!/usr/bin/env bash
# Installe le relais Inès (chat du site -> agent Hermes) sur le serveur.
# À lancer depuis le poste de développement :  bash scripts/ines-relay/install.sh
#
# Lit le jeton dans ~/.ines-relay-token (hors dépôt) et la clé publique Supabase dans
# .env ; le jeton n'est jamais affiché. Écrit sur le serveur :
#   /opt/ines-relay/            script + persona d'Inès
#   /etc/ines-relay.env         configuration et jeton (chmod 600)
#   ines-relay.service          service systemd, démarré et activé au boot
set -euo pipefail
cd "$(dirname "$0")/../.."

SERVER="root@187.124.50.47"
[ -s "$HOME/.ines-relay-token" ] || { echo "Jeton absent : $HOME/.ines-relay-token" >&2; exit 1; }
TOKEN=$(tr -d '\n' < "$HOME/.ines-relay-token")
APIKEY=$(grep -E '^VITE_SUPABASE_PUBLISHABLE_KEY=' .env | cut -d= -f2- | tr -d '"')

echo "==> Envoi du relais"
tar czf - -C scripts ines-relay | ssh "$SERVER" '
  set -e; umask 022
  mkdir -p /opt/ines-relay /tmp/ines-relay-in
  tar xzf - -C /tmp/ines-relay-in
  cp /tmp/ines-relay-in/ines-relay/ines_relay.py /tmp/ines-relay-in/ines-relay/ines-commerciale.md /opt/ines-relay/
  cp /tmp/ines-relay-in/ines-relay/ines-relay.service /etc/systemd/system/ines-relay.service
  rm -rf /tmp/ines-relay-in'

echo "==> Configuration (jeton non affiché)"
printf 'RELAY_URL=https://oivxznyzijtoylwfigyq.supabase.co/functions/v1/chatbot-webhook\nRELAY_TOKEN=%s\nRELAY_APIKEY=%s\nHERMES_HOME=/root/.hermes/profiles/ines\nHERMES_TOOLSETS=web,memory\nPERSONA_FILE=/opt/ines-relay/ines-commerciale.md\n' \
  "$TOKEN" "$APIKEY" | ssh "$SERVER" 'umask 077; cat > /etc/ines-relay.env; chmod 600 /etc/ines-relay.env'

echo "==> Démarrage"
ssh "$SERVER" 'systemctl daemon-reload && systemctl enable --now ines-relay && sleep 3 && systemctl is-active ines-relay && journalctl -u ines-relay -n 5 --no-pager | cut -c1-160'
echo "Terminé. Retour arrière : ssh $SERVER 'systemctl disable --now ines-relay'"
