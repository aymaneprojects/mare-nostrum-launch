#!/usr/bin/env python3
"""Refuse l'écriture sur les pages du site à valeur contractuelle.

Appelé en hook PreToolUse (Edit / Write / MultiEdit / NotebookEdit).
Lit l'appel d'outil en JSON sur l'entrée standard, et renvoie un refus motivé
quand le fichier visé fait partie de la liste ci-dessous.

Ces pages engagent juridiquement Mare Nostrum : les modifier demande une
décision du propriétaire, pas une initiative. Le refus est volontairement sec —
il revient au modèle, qui doit alors proposer la modification et attendre.

Pour débloquer ponctuellement : ajouter --autoriser-juridique en argument
(c'est-à-dire éditer temporairement .claude/settings.json), ou appliquer le
changement à la main.
"""
import json
import sys

# Pages publiées dont le texte a valeur contractuelle ou légale.
PROTEGES = (
    "src/pages/CGV.tsx",
    "src/pages/CGU.tsx",
    "src/pages/MentionsLegales.tsx",
    "src/pages/Confidentialite.tsx",
    "src/pages/EngagementRSE.tsx",
)

MOTIF = (
    "Écriture refusée sur {fichier} : cette page a une valeur contractuelle ou "
    "légale. Son texte ne se modifie jamais sans demande explicite du "
    "propriétaire du site.\n"
    "À faire : montrer la modification proposée (texte actuel → texte proposé) "
    "et attendre son accord. Voir la skill verifier-contenu."
)


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0  # entrée illisible : on ne bloque pas le travail

    chemin = (payload.get("tool_input") or {}).get("file_path") or ""
    if not any(chemin.endswith(p) for p in PROTEGES):
        return 0

    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": MOTIF.format(fichier=chemin.split("/")[-1]),
        }
    }))
    return 0


if __name__ == "__main__":
    sys.exit(main())
