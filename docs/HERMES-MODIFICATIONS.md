# Modifications du site par Hermes — circuit centralisé

Décidé le 7 octobre 2026. Objectif : **GitHub (`main`) est la seule source de vérité**. Tout ce qui est en ligne existe sur GitHub ; rien n'est publié depuis une copie locale ou un clone du serveur.

## Pourquoi

Deux fois, du travail en ligne a disparu : le 18 septembre 2026 (onze jours) et le 5 octobre 2026. Chaque fois, un build a été fait depuis `/root/mare-nostrum-launch`, un clone du serveur qui n'était plus à jour, puis copié à la main dans les dossiers web. L'agent développeur de Hermes (profil `christophe---developpeur-site-web`) travaillait dans ce clone et déployait lui-même avec `rsync`, sans passer par GitHub ni par le garde-fou de `deploy-vps.sh`. Ses consignes actuelles (mémoire et compétence `vps-spa-deployment`) lui disent de faire exactement cela.

## Le circuit

```
 demande du propriétaire
        │
        ▼
 Hermes (Christophe)  ── 1. scripts/hermes/sync.sh        remet le clone sur GitHub main
        │              2. modifie le code
        │              3. scripts/hermes/proposer.sh "…"  envoie une BRANCHE hermes/AAAA-MM-JJ-sujet
        ▼
 GitHub : branche hermes/…   ── 4. le propriétaire (ou Claude) relit, fusionne dans main
        │
        ▼
 ./deploy-vps.sh              ── 5. publication gardée (refuse un code plus ancien que celui en ligne)
```

Hermes **ne publie jamais**. Il propose ; une personne valide et publie.

## Règles pour Hermes

1. **Avant toute tâche** : `cd /root/mare-nostrum-launch && scripts/hermes/sync.sh`. Si le script refuse (clone modifié ou commits non envoyés), régler cela d'abord : ne jamais travailler sur une copie périmée.
2. **Après la modification** : `scripts/hermes/proposer.sh "sujet court"`. Le script envoie une branche et remet le clone sur `main`, propre.
3. **Ne jamais déployer** : pas de `rsync` vers `/home/*/htdocs`, pas de build copié à la main. La publication passe par `./deploy-vps.sh` après fusion dans `main`.
4. **Ne jamais modifier un texte publié** sans demande explicite du propriétaire (règle de `CLAUDE.md`). Un changement de texte se propose : texte actuel → texte proposé → pourquoi.
5. **Aucun secret dans une proposition** : `proposer.sh` refuse `.env`, les clés et les fichiers temporaires.

## Les deux scripts

- `scripts/hermes/sync.sh` : récupère GitHub et avance `main` du clone. **N'écrase jamais rien** : s'arrête (code 2) si le clone contient des modifications, ou (code 3) s'il contient des commits qui ne sont pas sur GitHub.
- `scripts/hermes/proposer.sh "sujet"` : crée la branche `hermes/AAAA-MM-JJ-sujet`, y commite les modifications (auteur « Hermes (agent développeur) »), la rebase sur `main`, l'envoie sur GitHub, et remet le clone sur `main` propre. Refuse tout fichier `.env`, clé ou temporaire.

Ils sont testés sur un dépôt factice : clone propre, retard rattrapé, modification non envoyée protégée, commit non envoyé signalé, fichier sensible refusé.

## Ce qu'il reste à mettre en place sur le serveur (par une personne)

Ces étapes touchent la configuration du serveur et de l'agent : elles ne sont pas automatisées.

1. **Envoi vers GitHub.** Le clone n'a aujourd'hui aucun moyen de pousser (ni identifiant, ni clé). Créer une clé dédiée sur le serveur (`ssh-keygen -t ed25519 -f /root/.ssh/id_ed25519_mn_site`), la déclarer dans `/root/.ssh/config`, passer l'envoi du clone en SSH (`git remote set-url --push origin git@…:aymaneprojects/mare-nostrum-launch.git`), puis ajouter la clé publique sur GitHub : *Settings → Deploy keys → Add deploy key*, avec « Allow write access ».
2. **Consignes de l'agent** (scripté) : `bash scripts/hermes/appliquer-consignes.sh`, lancé depuis le poste de développement. Il inscrit la règle dans la mémoire de Christophe et dans ses deux compétences de publication (`mare-nostrum-web-publishing`, étape 6 remplacée : *construire pour vérifier, ne pas déployer, proposer* ; `vps-spa-deployment`, bloc `rsync` interdit). Il ne modifie que ces trois fichiers texte, garde une sauvegarde `…avant-centralisation` à côté de chacun, est idempotent, et n'installe aucun service. Testé sur des copies locales.
3. **Synchronisation automatique** (optionnelle) : un minuteur qui exécute `scripts/hermes/sync.sh` toutes les 10 minutes, pour que le clone ne puisse plus rester figé.
4. **GitHub — protéger `main`** : *Settings → Branches → Branch protection rule* → exiger une *pull request* avant fusion. Cela empêche techniquement toute poussée directe dans `main`, y compris depuis le serveur.

## Limites à connaître

- Tant que les consignes de l'agent ne sont pas changées (étape 2), **rien n'empêche Christophe de déployer comme avant** : ces scripts rendent le bon chemin facile, ils ne bloquent pas l'ancien. Seule la protection de `main` côté GitHub et le retrait de ses droits sur les dossiers web le feraient vraiment.
- Hermes tourne en `root` sur le serveur : il peut techniquement écrire dans les dossiers web. La règle repose donc sur ses consignes.
