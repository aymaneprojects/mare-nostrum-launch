# Les deux domaines

Un **seul build** sert deux sites. `src/main.tsx` regarde le nom de domaine du
navigateur et charge un arbre de routes complètement différent quand l'hôte est
le sous-domaine Niteo : aucun en-tête, aucun pied de page, d'autres pages.

| Domaine | Ce qu'il sert |
|---|---|
| `www.marenostrum.tech` | le site complet |
| `niteo.marenostrum.tech` | candidature, réservation et évaluation Niteo |

Conséquence : les deux racines du serveur doivent **toujours** recevoir le même
contenu. En oublier une fait tomber tout Niteo, réservations payantes comprises.
`deploy-vps.sh` s'en charge pour les deux — ne jamais copier à la main.

## Vérification manuelle

Le serveur héberge plusieurs sites. Sans préciser le nom de domaine, on obtient
le site par défaut et une erreur de certificat trompeuse :

```bash
ssh root@187.124.50.47 \
  'curl -sk --http1.1 --resolve www.marenostrum.tech:443:127.0.0.1 \
   -o /dev/null -w "%{http_code}\n" https://www.marenostrum.tech/cgv'
```

Réponse attendue : `200`. Un `404` signale que la règle de réécriture des
adresses a sauté côté serveur.

## Ne jamais construire sur le serveur

Les clés d'accès à la base viennent d'un fichier local non versionné. Une
construction faite sur le serveur produit un site sans clés : page blanche
partout, sans la moindre erreur côté serveur. Diagnostic en une commande,
documenté dans `BRIEF-CHRISTOPHE.md`.
