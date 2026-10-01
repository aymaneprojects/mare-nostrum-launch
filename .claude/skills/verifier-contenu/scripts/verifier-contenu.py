#!/usr/bin/env python3
"""Signale les textes publiés du site modifiés depuis le dernier commit.

Le texte du site est écrit en dur dans le JSX : il n'existe aucune frontière
propre entre « code » et « contenu ». Ce script applique donc une heuristique —
il repère dans le diff les lignes qui ressemblent à de la prose destinée à un
visiteur, et laisse l'humain trancher.

Deux usages :
  python3 verifier-contenu.py            → rapport lisible, sortie 1 si alerte
  python3 verifier-contenu.py --hook     → hook Stop : sortie 2 pour que la
                                            tâche ne se termine pas en silence

Règle appliquée (voir CLAUDE.md) : un texte visible par un visiteur ne se
modifie jamais sans demande explicite du propriétaire.
"""
import json
import re
import subprocess
import sys

# Fichiers qui portent du texte publié. Le reste de src/ est technique.
SURVEILLES = ("src/pages", "src/components", "src/data/team.json", "index.html")

# Lignes de code qui n'ont jamais à être traitées comme de la prose.
IGNORER = re.compile(
    r"^\s*(import|export|const|let|var|function|return|type|interface|//|/\*|\*|\}|\)|<\/)"
    r"|className=|aria-|data-|href=|src=|key=|^\s*[{}()\[\];,]*\s*$"
)

# Prose = texte d'au moins 40 caractères contenant plusieurs mots.
MOTS = re.compile(r"[A-Za-zÀ-ÿ]{2,}(?:[\s'’,.;:!?-]+[A-Za-zÀ-ÿ]{2,}){3,}")


def lignes_de_prose(diff: str) -> dict[str, list[tuple[str, str]]]:
    """{fichier: [(signe, extrait), …]} pour les lignes ajoutées ou retirées."""
    trouvailles: dict[str, list[tuple[str, str]]] = {}
    fichier = ""
    for ligne in diff.splitlines():
        if ligne.startswith("+++ b/"):
            fichier = ligne[6:]
            continue
        if ligne.startswith(("+++", "---", "@@", "diff ", "index ")):
            continue
        if not ligne or ligne[0] not in "+-":
            continue
        texte = ligne[1:]
        if IGNORER.search(texte):
            continue
        extrait = MOTS.search(texte)
        if not extrait or len(extrait.group()) < 40:
            continue
        trouvailles.setdefault(fichier, []).append((ligne[0], extrait.group()[:90]))
    return trouvailles


def main() -> int:
    mode_hook = "--hook" in sys.argv

    if mode_hook:
        try:
            # Évite de bloquer en boucle quand le hook a déjà interrompu une fois.
            if json.load(sys.stdin).get("stop_hook_active"):
                return 0
        except (json.JSONDecodeError, ValueError):
            pass

    try:
        diff = subprocess.run(
            ["git", "diff", "HEAD", "--unified=0", "--"] + list(SURVEILLES),
            capture_output=True, text=True, timeout=20, check=False,
        ).stdout
    except (OSError, subprocess.SubprocessError):
        return 0  # hors dépôt git ou git indisponible : on ne bloque rien

    trouvailles = lignes_de_prose(diff)
    if not trouvailles:
        if not mode_hook:
            print("Aucun texte publié modifié.")
        return 0

    total = sum(len(v) for v in trouvailles.values())
    rapport = [
        f"CONTENU PUBLIÉ MODIFIÉ : {total} ligne(s) de texte dans "
        f"{len(trouvailles)} fichier(s).",
        "",
    ]
    for fichier, lignes in trouvailles.items():
        rapport.append(f"  {fichier}")
        for signe, extrait in lignes[:6]:
            verbe = "ajouté " if signe == "+" else "retiré "
            rapport.append(f"    {verbe}« {extrait} »")
        if len(lignes) > 6:
            rapport.append(f"    … et {len(lignes) - 6} autre(s)")
    rapport += [
        "",
        "Le texte du site ne se réécrit pas sans l'accord du propriétaire.",
        "Montrer ces changements, attendre son accord, et ne rien pousser avant.",
        "S'il s'agit d'un déplacement de code sans réécriture, le dire et continuer.",
    ]
    message = "\n".join(rapport)

    if mode_hook:
        print(message, file=sys.stderr)
        return 2
    print(message)
    return 1


if __name__ == "__main__":
    sys.exit(main())
