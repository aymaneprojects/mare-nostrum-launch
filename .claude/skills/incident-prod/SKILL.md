---
name: incident-prod
description: Diagnostic et réparation quand le site est cassé - page blanche, erreur 404, site hors ligne, certificat expiré, formulaire muet, déploiement raté. À utiliser dès qu'un problème touche le site en production.
---

# Le site est cassé

Procédure sous stress. On diagnostique avant d'agir, on ne déploie jamais « au
cas où ».

## Premier réflexe : où ça casse

```bash
curl -s -o /dev/null -w "site %{http_code} en %{time_total}s\n" https://www.marenostrum.tech/
curl -s -o /dev/null -w "niteo %{http_code}\n" https://niteo.marenostrum.tech/
curl -s https://www.marenostrum.tech/version.json
```

La version en ligne dit immédiatement **quel code** est servi. Une version plus
ancienne que le dernier commit explique à elle seule une fonctionnalité
« disparue ».

## Page blanche sur tout le site

Les pages se chargent, le serveur ne signale rien, mais l'écran reste blanc :
le site a été construit **sans ses clés d'accès**, presque toujours parce que
quelqu'un a lancé la construction sur le serveur.

```bash
ssh root@187.124.50.47 \
  'grep -c oivxznyzijtoylwfigyq /home/marenostrum/htdocs/www.marenostrum.tech/assets/index-*.js'
```

`0` = construction cassée. `1` = saine. Réparation : reconstruire depuis le
poste de développement et republier avec la skill `publier-le-site`.

## Toutes les pages sauf l'accueil renvoient 404

La règle de réécriture des adresses a sauté côté serveur. Le site est une
application à page unique : toute adresse doit servir le fichier d'accueil.
Voir la section serveur de `BRIEF-CHRISTOPHE.md`.

## Une fonctionnalité a disparu

Presque toujours une publication d'une copie périmée du code. C'est arrivé le
18 septembre 2026 : onze jours de travail effacés. Comparer la version en ligne
au dernier commit, puis republier depuis un dépôt à jour. **Ne jamais utiliser
`FORCE=1`** pour contourner le refus : c'est exactement ce refus qui protège.

## Les formulaires n'envoient plus rien

Vérifier dans l'ordre : la fonction serveur répond-elle ? le service d'e-mail
est-il en panne ? la base est-elle joignable ? L'anti-spam du formulaire de
contact répond volontairement « tout va bien » quand il rejette un envoi : un
succès apparent ne prouve pas la réception.

## Tout est lent, ou expire

Vérifier d'abord si la panne vient de l'hébergeur de la base plutôt que du
site : `https://status.supabase.com`. Une passerelle dégradée chez eux ralentit
tout, sans que rien ne soit cassé chez nous. Dans ce cas : prévenir, attendre,
réduire la charge si possible.

## Le certificat a expiré

Renouvellement côté panneau d'administration du serveur, un certificat par
site. Section serveur de `BRIEF-CHRISTOPHE.md`.

## Après l'incident

Noter ce qui s'est passé et ce qui a réparé, dans `BRIEF-CHRISTOPHE.md`. Les
deux incidents déjà documentés ont chacun donné un garde-fou durable.
