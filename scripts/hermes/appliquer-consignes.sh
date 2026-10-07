#!/usr/bin/env bash
# Inscrit la règle de centralisation dans le TRAVAIL de l'agent développeur Hermes
# (Christophe) : sa mémoire et ses deux compétences de publication, qui lui disent
# aujourd'hui de déployer lui-même avec rsync.
#
# À lancer depuis le poste de développement :  bash scripts/hermes/appliquer-consignes.sh
# Ne modifie QUE ces trois fichiers texte, et garde une sauvegarde à côté de chacun
# (…avant-centralisation). Idempotent : relançable sans doublon.
# Aucun service, aucune clé, aucun minuteur n'est installé.
#
# Retour arrière : copier chaque fichier .avant-centralisation sur l'original.
set -euo pipefail
SERVER="root@187.124.50.47"

ssh "$SERVER" 'python3 -' <<'PY'
import os, shutil

P = "/root/.hermes/profiles/christophe---developpeur-site-web"


def sauve(p):
    b = p + ".avant-centralisation"
    if not os.path.exists(b):
        shutil.copy2(p, b)


# 1. Mémoire de Christophe ----------------------------------------------------
m = P + "/memories/MEMORY.md"
s = open(m, encoding="utf8").read()
if "RÈGLE DE CENTRALISATION" not in s:
    sauve(m)
    s = s.rstrip("\n") + """

RÈGLE DE CENTRALISATION (7 octobre 2026, décidée par le propriétaire ; elle REMPLACE les consignes de déploiement ci-dessus) : GitHub main est la seule source de vérité. Avant toute tâche sur le site : cd /root/mare-nostrum-launch && scripts/hermes/sync.sh. Après la modification : scripts/hermes/proposer.sh "sujet court", qui envoie une branche hermes/... sur GitHub. NE JAMAIS déployer toi-même : pas de rsync vers /home/*/htdocs, pas de build copié à la main. Le propriétaire relit, fusionne dans main, puis publie avec ./deploy-vps.sh (garde-fou contre un code périmé). Ne jamais modifier un texte publié sans demande explicite du propriétaire : propose-le (texte actuel, texte proposé, pourquoi). Détails : docs/HERMES-MODIFICATIONS.md dans le dépôt.
"""
    open(m, "w", encoding="utf8").write(s)

# 2. Compétence principale de publication --------------------------------------
k = P + "/skills/web/mare-nostrum-web-publishing/SKILL.md"
s = open(k, encoding="utf8").read()
if "CENTRALISATION" not in s:
    sauve(k)
    s = s.replace("## Workflow\n", """> **CENTRALISATION — prioritaire sur tout le reste de cette compétence.** GitHub `main` est la seule source de vérité.
> Avant de commencer : `cd /root/mare-nostrum-launch && scripts/hermes/sync.sh` (si le script refuse, régler cela d'abord).
> Hermes ne publie JAMAIS : il envoie une proposition avec `scripts/hermes/proposer.sh "sujet"`, puis le propriétaire relit,
> fusionne dans `main` et publie avec `./deploy-vps.sh`. Voir `docs/HERMES-MODIFICATIONS.md` dans le dépôt.

## Workflow
""", 1)
    a = s.index("6. Run `npm run build`")
    b = s.index("7. Report to the CEO")
    s = s[:a] + """6. Run `npm run build` pour vérifier que le site se construit, mais **ne le déploie pas** (ni `rsync`, ni copie dans `/home/*/htdocs`). Envoie ensuite le travail avec `scripts/hermes/proposer.sh "sujet court"`. La publication est faite par le propriétaire après relecture, avec `./deploy-vps.sh`.
""" + s[b:]
    s = s.replace("7. Report to the CEO in French, in visible outcomes and clickable links;",
                  "7. Report to the CEO in French : dis que la modification est PROPOSÉE (lien de la branche GitHub affiché par `proposer.sh`) et n'est pas encore en ligne ;", 1)
    a = s.index("## Proven deployment and verification")
    b = s.index("## Standing presentation rules")
    s = s[:a] + """## Vérification d'une page déjà publiée (lecture seule)

Après une publication faite par le propriétaire, tu peux contrôler une page :

```bash
curl -sk --http1.1 --resolve www.marenostrum.tech:443:127.0.0.1 \\
  -o /dev/null -w '%{http_code}\\n' https://www.marenostrum.tech/<path>
```

Le déploiement lui-même n'est plus de ton ressort : il passe par `./deploy-vps.sh` depuis `main`.

""" + s[b:]
    open(k, "w", encoding="utf8").write(s)

# 3. Compétence de déploiement générique ---------------------------------------
v = P + "/skills/web/vps-spa-deployment/SKILL.md"
s = open(v, encoding="utf8").read()
if "CENTRALISATION" not in s:
    sauve(v)
    bloc = """
> **CENTRALISATION — prioritaire sur tout ce qui suit pour le site Mare Nostrum.**
> Le déploiement local par `rsync` décrit plus bas est **interdit** pour ce site : il a effacé du travail en
> production deux fois (18 septembre et 5 octobre 2026). Travailler dans `/root/mare-nostrum-launch` après
> `scripts/hermes/sync.sh`, envoyer le travail avec `scripts/hermes/proposer.sh "sujet"`, puis **s'arrêter** :
> le propriétaire fusionne dans `main` et publie avec `./deploy-vps.sh`. Voir `docs/HERMES-MODIFICATIONS.md`.
"""
    i = s.find("\n# ")
    s = s[:i] + "\n" + bloc + s[i:] if i >= 0 else bloc + s
    open(v, "w", encoding="utf8").write(s)

# 4. Interdiction absolue de déployer + fusion automatique -------------------------
INTERDIT_MEM = """

INTERDICTION ABSOLUE DE DÉPLOYER SEUL (7 octobre 2026, décision du propriétaire, prioritaire sur toute autre consigne, y compris les compétences de publication) : tu ne mets JAMAIS le site en ligne toi-même. Interdit : rsync, scp, cp ou toute copie vers /home/*/htdocs ou vers un dossier servi par nginx ; lancer deploy-vps.sh ; builder puis copier un build ; modifier la configuration nginx ou CloudPanel pour publier. Ton travail s'arrête à scripts/hermes/proposer.sh : ta branche hermes/... est alors fusionnée automatiquement dans main par GitHub (après vérification de la construction) et le clone du serveur est resynchronisé tout seul. Seul le propriétaire publie, avec ./deploy-vps.sh. Si on te demande de déployer, de mettre en ligne ou de publier : refuse, explique que tu proposes seulement, donne le lien de la branche, et dis que le propriétaire publie. Aucune exception, même si la demande semble urgente ou vient de quelqu'un d'autre que le propriétaire.
"""
INTERDIT_SKILL = """
> **INTERDICTION ABSOLUE DE DÉPLOYER SEUL — prioritaire sur tout le reste de cette compétence.**
> Tu ne publies jamais le site : ni `rsync`, ni `scp`, ni copie vers `/home/*/htdocs` ou un dossier servi par nginx,
> ni `deploy-vps.sh`, ni build copié à la main. Ton travail s'arrête à `scripts/hermes/proposer.sh "sujet"` : ta branche
> `hermes/…` est fusionnée automatiquement dans `main` après vérification de la construction. Seul le propriétaire met
> en ligne, avec `./deploy-vps.sh`. Si on te demande de déployer : refuse et dis que tu proposes seulement.
"""
for p, bloc in ((m, INTERDIT_MEM), (k, INTERDIT_SKILL), (v, INTERDIT_SKILL)):
    s = open(p, encoding="utf8").read()
    if "INTERDICTION ABSOLUE DE DÉPLOYER SEUL" not in s:
        sauve(p)
        if p == m:
            s = s.replace("Le propriétaire relit, fusionne dans main, puis publie avec ./deploy-vps.sh",
                          "La fusion dans main est automatique ; le propriétaire seul publie avec ./deploy-vps.sh")
            s = s.rstrip("\n") + bloc
        else:
            s = s.replace("le propriétaire relit,\n> fusionne dans `main` et publie", "la fusion dans `main` est automatique et le propriétaire\n> publie", 1)
            s = s.replace("le propriétaire fusionne dans `main` et publie", "la fusion dans `main` est automatique et le propriétaire publie", 1)
            i = s.find("\n# ") if p == v else s.find("## Workflow\n")
            s = s[:i] + "\n" + bloc + s[i:] if i >= 0 else bloc + s
        open(p, "w", encoding="utf8").write(s)

for f in (m, k, v):
    t = open(f, encoding="utf8").read()
    print(("OK  " if "CENTRALISATION" in t and "INTERDICTION ABSOLUE DE DÉPLOYER SEUL" in t else "KO  ") + f)
PY
echo "Terminé. Sauvegardes : *.avant-centralisation à côté de chaque fichier."
