---
name: supabase-ops
description: Intervenir sur le back-end Supabase - déployer une fonction serveur, appliquer une migration SQL, régénérer les types. À utiliser pour toute opération sur la base de données ou les edge functions du projet.
---

# Opérations Supabase

Les fonctions serveur et la base **ne partent pas avec le site** : ce sont des
publications séparées, manuelles, sans intégration continue.

## Règle sur les secrets

Un jeton ne s'écrit jamais en clair dans une commande : il se lit depuis `.env`
à l'intérieur de la commande elle-même. Jamais de secret dans un message, un
commit, ou un fichier versionné.

```bash
TOKEN=$(grep '^VITE_STRIPE_PERSON_KEY' .env | cut -d= -f2- | tr -d '"')
```

(Ce nom de variable contient le jeton d'accès Supabase, pour des raisons
historiques.)

## Déployer une fonction serveur

```bash
SUPABASE_ACCESS_TOKEN=$(grep '^VITE_STRIPE_PERSON_KEY' .env | cut -d= -f2- | tr -d '"') \
  npx -y supabase@2 functions deploy <nom> \
  --project-ref oivxznyzijtoylwfigyq --no-verify-jwt --use-api
```

`--use-api` évite d'avoir besoin de Docker. Retirer `--no-verify-jwt` pour une
fonction qui doit exiger une authentification.

Vérifier ensuite en appelant la fonction : elle doit répondre, et refuser une
requête invalide avec un message clair.

## Appliquer une migration

Écrire le fichier dans `supabase/migrations/<horodatage>_<sujet>.sql`, puis
l'appliquer par l'API de gestion :

```bash
TOKEN=$(grep '^VITE_STRIPE_PERSON_KEY' .env | cut -d= -f2- | tr -d '"')
python3 -c 'import json,sys;print(json.dumps({"query":open(sys.argv[1]).read()}))' \
  supabase/migrations/<fichier>.sql > /tmp/q.json
curl -s -X POST \
  https://api.supabase.com/v1/projects/oivxznyzijtoylwfigyq/database/query \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  --data @/tmp/q.json
rm -f /tmp/q.json
```

Une réponse `[]` signifie : exécuté sans résultat à afficher. Toujours
re-interroger la base ensuite pour confirmer l'effet réel.

## Régénérer les types

Après toute modification de schéma :

```bash
SUPABASE_ACCESS_TOKEN=$(grep '^VITE_STRIPE_PERSON_KEY' .env | cut -d= -f2- | tr -d '"') \
  npx -y supabase@2 gen types typescript --project-id oivxznyzijtoylwfigyq \
  > /tmp/types.ts
diff src/integrations/supabase/types.ts /tmp/types.ts | head -40
```

Lire le diff avant de remplacer : il doit ne contenir que les changements
attendus. Puis copier le fichier et lancer la vérification de types.

## Précautions

- Toute nouvelle table reçoit une protection d'accès dans la même migration.
  Une table publique sans politique est une fuite de données.
- Les migrations du dépôt ne décrivent pas toute la base : plusieurs tables ont
  été créées ailleurs. Interroger la base plutôt que supposer.
- Une fonction ouverte sans authentification est appelable par n'importe qui :
  ne jamais en ouvrir une nouvelle sans limite de débit ni validation.
- Ne jamais modifier le secret qui chiffre les codes animateurs du live.
- Tester une migration destructrice d'abord par une requête de lecture qui
  compte ce qu'elle toucherait.
