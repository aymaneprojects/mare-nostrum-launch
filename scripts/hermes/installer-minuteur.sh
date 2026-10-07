#!/usr/bin/env bash
# Installe sur le serveur un minuteur qui remet le clone du site sur le dernier commit de `main`
# toutes les 10 minutes (scripts/hermes/sync.sh : avance rapide, n'écrase jamais rien).
# À lancer depuis le poste de développement :  bash scripts/hermes/installer-minuteur.sh
# Retour arrière : ssh root@187.124.50.47 'systemctl disable --now hermes-sync.timer'
set -euo pipefail
ssh root@187.124.50.47 'bash -s' <<'REMOTE'
set -euo pipefail
CLONE=/root/mare-nostrum-launch
cat > /etc/systemd/system/hermes-sync.service <<UNIT
[Unit]
Description=Remet le clone du site sur le dernier commit de main (sans rien écraser)

[Service]
Type=oneshot
ExecStart=$CLONE/scripts/hermes/sync.sh
# Codes 2 et 3 : le clone contient du travail en cours. Ce n'est pas une panne.
SuccessExitStatus=2 3
UNIT
cat > /etc/systemd/system/hermes-sync.timer <<UNIT
[Unit]
Description=Synchronisation du clone du site toutes les 10 minutes

[Timer]
OnBootSec=2min
OnUnitActiveSec=10min

[Install]
WantedBy=timers.target
UNIT
systemctl daemon-reload
systemctl enable --now hermes-sync.timer
systemctl list-timers hermes-sync.timer --no-pager | head -3
REMOTE
