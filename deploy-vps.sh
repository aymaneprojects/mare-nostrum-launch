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
# Second garde-fou : seul un code DÉJÀ dans main sur GitHub peut partir en ligne,
# et il doit contenir la version en ligne (voir l'incident du 10/10/2026 plus bas).
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
#
# Le transfert passe par une ARCHIVE envoyée en un seul flux, puis par un rsync
# exécuté SUR le serveur. rsync à travers SSH depuis un Mac s'est bloqué
# indéfiniment le 2 octobre 2026 — sans message, sans fin — en laissant le site
# à moitié publié, donc en écran blanc. Un flux unique n'a pas ce défaut, et le
# rsync local au serveur reste instantané.
DEPOT_TEMP="/tmp/mn-dist"

if [ -d /home/marenostrum/htdocs ]; then
  run() { bash -c "$1"; }
  envoyer() { rm -rf "$DEPOT_TEMP" && mkdir -p "$DEPOT_TEMP" && cp -a dist/. "$DEPOT_TEMP/"; }
else
  run() { ssh -o ConnectTimeout=15 "$SERVER" "$1"; }
  envoyer() {
    # --no-xattrs : sans lui, macOS ajoute des attributs que tar côté Linux
    # ignore bruyamment, une ligne par fichier.
    COPYFILE_DISABLE=1 tar --no-xattrs -czf - -C dist . | ssh -o ConnectTimeout=15 "$SERVER" \
      "rm -rf $DEPOT_TEMP && mkdir -p $DEPOT_TEMP && tar xzf - -C $DEPOT_TEMP"
  }
fi
copy() { run "rsync -a --delete $DEPOT_TEMP/ \"$1\""; }

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

# ── Garde-fou : main est la seule source de ce qui est en ligne ──────────────
# Le 10/10/2026, une version publiée depuis une branche non fusionnée a été
# effacée par la publication automatique de Hermes, qui reconstruit depuis main
# (paiement du Club cassé). La date ne protège pas : un commit Hermes est plus
# récent même quand son contenu est plus vieux. On compare donc les HISTORIQUES.
if [ "${FORCE:-0}" != "1" ]; then
  if ! git fetch -q origin main; then
    echo "ABANDON : impossible de lire main sur GitHub (réseau ?)." >&2
    exit 1
  fi
  # 1. Ce qu'on publie doit déjà être dans main, sinon Hermes l'effacera.
  if ! git merge-base --is-ancestor HEAD origin/main; then
    echo "" >&2
    echo "ABANDON : ce code ($local_commit) n'est pas dans main sur GitHub." >&2
    echo "La prochaine publication de Hermes, faite depuis main, l'effacerait." >&2
    echo "Fusionnez d'abord votre branche dans main (pull request), puis publiez depuis main." >&2
    exit 1
  fi
  # 2. Ce qui est en ligne doit être contenu dans ce qu'on publie, sinon on l'efface.
  if [ -n "$live_commit" ] && ! git merge-base --is-ancestor "$live_commit" HEAD 2>/dev/null; then
    echo "" >&2
    echo "ABANDON : la version en ligne ($live_commit) contient des changements absents de votre code." >&2
    echo "Publier effacerait ces changements. Faites un git pull de main, puis relancez." >&2
    exit 1
  fi
fi

if ! run true 2>/dev/null; then
  echo "ABANDON : pas d'accès SSH à $SERVER (clé non autorisée ?)." >&2
  echo "Installez votre clé une fois pour toutes : ssh-copy-id $SERVER" >&2
  exit 1
fi

echo "==> Build de production"
npm run build
scripts/verifier-build.sh   # refuse un build vide AVANT d'envoyer quoi que ce soit

echo "==> Envoi de l'archive ($(du -sh dist | cut -f1))"
envoyer
livres_source=$(run "ls $DEPOT_TEMP/assets | wc -l" | tr -d ' ')
attendus=$(ls dist/assets | wc -l | tr -d ' ')
if [ "$livres_source" != "$attendus" ]; then
  echo "ÉCHEC : archive incomplète ($livres_source fichiers sur $attendus)." >&2
  exit 1
fi
echo "    reçue : $livres_source fichiers"

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

  # La page d'accueil répond 200 même quand le site est vide : nginx sert
  # index.html quoi qu'il arrive. Il faut donc vérifier le FICHIER JAVASCRIPT
  # qu'elle réclame. Le 2 octobre 2026, un transfert interrompu a laissé le site
  # en écran blanc pendant une heure, avec un contrôle au vert.
  bundle=$(run "curl -sk --http1.1 --resolve $domain:443:127.0.0.1 https://$domain/ \
    | grep -o 'assets/index-[^\"]*\.js' | head -1")
  if [ -z "$bundle" ]; then
    echo "ÉCHEC : aucun script trouvé dans la page de $domain" >&2
    exit 1
  fi
  jscode=$(run "curl -sk --http1.1 --resolve $domain:443:127.0.0.1 \
    -o /dev/null -w '%{http_code}' https://$domain/$bundle")
  if [ "$jscode" != "200" ]; then
    echo "ÉCHEC : $domain sert une page vide — $bundle répond $jscode." >&2
    echo "Le transfert est incomplet. Relancez le déploiement." >&2
    exit 1
  fi

  # Nombre de fichiers livrés, comparé au build local : un transfert interrompu
  # se voit immédiatement.
  livres=$(run "ls $dir/assets | wc -l" | tr -d ' ')
  if [ "$livres" != "$attendus" ]; then
    echo "ÉCHEC : $livres fichiers livrés sur $attendus attendus ($domain)." >&2
    exit 1
  fi
  echo "    OK ($code, $livres fichiers, $bundle)"
done

echo "==> Terminé — en ligne : $local_commit"
