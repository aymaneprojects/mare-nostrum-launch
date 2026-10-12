# SEO : ce qui doit être fait côté nginx (non appliqué)

Le dépôt ne peut pas porter ces réglages : nginx (CloudPanel) ignore `public/_redirects`.
À appliquer par le propriétaire du serveur, puis à tester avec `curl -I`.

## 1. Hôte canonique et HTTPS
- `http://` vers `https://` en 301.
- `marenostrum.tech` (apex) vers `https://www.marenostrum.tech` en 301, chemin conservé.
- Slash final : `/club/` vers `/club` en 301 (le canonical du site est sans slash final).

## 2. Redirections d'anciennes URL (étaient dans `_redirects`, inopérantes)
```nginx
location = /croissance  { return 301 /club; }
location = /newsletter  { return 301 /iter; }
location = /formation   { return 301 /education; }   # déjà géré côté React, 301 serveur préférable
```

## 3. Sonde de santé
`/healthz` et `/api/healthz` pointaient vers le projet Supabase `fpdxpvkgzrddemldvemg`, qui n'est pas
celui du site (`oivxznyzijtoylwfigyq`, voir `supabase/config.toml`). À recréer vers le bon projet :
```nginx
location = /healthz { proxy_pass https://oivxznyzijtoylwfigyq.supabase.co/functions/v1/healthz; }
```

## 4. Vrais 404 (soft-404)
Le repli SPA répond 200 pour toute URL inconnue. Après le pré-rendu, chaque page publique existe
dans `dist/<route>/index.html` : remplacer `try_files $uri /index.html` par
`try_files $uri $uri/index.html =404`, en gardant le repli SPA seulement pour `/live/*`,
`/equipe/*`, `/blog/*`, `/bienvenue-club`, `/roue`, `/unsubscribed`.

## 5. Sous-domaine niteo.marenostrum.tech
Même build que le site principal : la racine sert le HTML prérendu de l'accueil, dont le canonical
est corrigé ensuite par JavaScript. Idéal : servir à la racine de ce sous-domaine un HTML
prérendu de la page de candidature (canonical `https://niteo.marenostrum.tech/`), ou rediriger
en 301 vers `https://www.marenostrum.tech/niteo-toulouse` si la candidature n'a plus besoin d'être indexée à part.

## 6. En-têtes utiles
`X-Robots-Tag: noindex` sur `/live/*`, `/bienvenue-club`, `/roue`, `/unsubscribed`
(plus fiable que le noindex posé par JavaScript).
