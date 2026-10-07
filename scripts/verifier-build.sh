#!/usr/bin/env bash
# Contrôle du dossier dist/ AVANT toute publication. Refuse un build vide ou cassé.
# Né de l'écran blanc du 7 octobre 2026 : GitHub avait construit le site sans les
# variables Supabase (« supabaseUrl is required ») et le pré-rendu avait enregistré une
# page d'accueil vide, que le contrôle HTTP 200 de deploy-vps.sh laissait passer.
set -euo pipefail
cd "$(dirname "$0")/.."
js=$(ls dist/assets/index-*.js 2>/dev/null | head -1 || true)
[ -n "$js" ] || { echo "BUILD REFUSÉ : aucun script principal dans dist/assets." >&2; exit 1; }
grep -q "\.supabase\.co" "$js" || {
  echo "BUILD REFUSÉ : l'adresse Supabase est absente du script (variables VITE_SUPABASE_* manquantes) : le site serait en écran blanc." >&2
  exit 1; }
if [ "${SKIP_PRERENDER:-0}" != "1" ]; then
  grep -q "<h1" dist/index.html || {
    echo "BUILD REFUSÉ : la page d'accueil pré-rendue est vide (aucun titre h1)." >&2
    exit 1; }
fi
echo "    build contrôlé : Supabase présent, accueil pré-rendu non vide"
