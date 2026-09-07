# Brief de reprise — Site web Mare Nostrum

**Destinataire :** Christophe, développeur web en charge du site
**Client :** le CEO de Mare Nostrum — **non technique**. Ne connaît ni le code, ni Git, ni les serveurs.
**Dernière mise à jour :** 7 septembre 2026

---

## 0. À lire en premier — les 5 choses qui cassent le site

Si tu ne retiens que cinq points de ce document, retiens ceux-là.

1. **Le sous-domaine `niteo.marenostrum.tech` est servi par le MÊME build que le site principal.** Le fichier `src/main.tsx` regarde le nom de domaine du navigateur et charge un routeur complètement différent si l'hôte est `niteo.marenostrum.tech`. Les deux racines sur le serveur doivent donc toujours recevoir le même contenu — `deploy-vps.sh` s'en charge. Si l'une des deux est oubliée, toute la partie Niteo tombe, **y compris les réservations payantes par Stripe**.
2. **Ne jamais utiliser les couleurs Tailwind brutes** (`text-white`, `bg-blue-500`…). Le design system passe par des variables CSS HSL définies dans `src/index.css`. Détails en section 6.
3. **Il n'y a aucun test automatisé.** `npm run lint` est le seul garde-fou. Toute vérification est manuelle — voir la checklist en section 8.
4. **Les secrets ne vont jamais dans Git.** Ni dans ce fichier, ni dans le code, ni dans un commit. Ils vivent dans le `.env` local (non versionné) et dans les variables d'environnement Supabase.
5. **Le site est en production et prend de l'argent** (abonnements Club + réservations Niteo via Stripe). Un déploiement raté a un coût réel. Section 9 pour la procédure de rollback.

---

## 1. Ce qu'est Mare Nostrum

Cabinet de conseil en entrepreneuriat, basé entre **Toulouse, Paris et Casablanca**. Le site est en français et sert trois publics :

| Public | Silo | Ce qu'on leur vend |
|---|---|---|
| Écoles et universités | `/ecoles/*`, `/education` | Programmes d'entrepreneuriat en marque blanche (B2B) |
| Entrepreneurs et dirigeants | `/entrepreneurs/*`, `/club` | Abonnement au Club, mentorat (B2C) |
| Audience large (SEO) | `/mag/*`, `/blog` | Contenu de fond, acquisition organique |

Le ton de la marque est expert et institutionnel. **Ne jamais mélanger le ton de Mare Nostrum avec celui d'autres marques** que le client pourrait gérer par ailleurs.

---

## 2. La stack en une page

| Couche | Technologie | Où |
|---|---|---|
| Front | React 18 + TypeScript, SPA | `src/` |
| Build | Vite | `vite.config.ts` |
| Style | Tailwind CSS + shadcn/ui | `src/index.css`, `src/components/ui/` |
| Routage | react-router-dom | `src/App.tsx` + `src/main.tsx` |
| Données serveur | TanStack Query | `src/hooks/` |
| Base de données | Supabase (PostgreSQL) | projet `oivxznyzijtoylwfigyq` |
| Logique serveur | Supabase Edge Functions (Deno) | `supabase/functions/` |
| CRM | Airtable | base `appZ8ykNuUOv89ou0` |
| Paiements | Stripe Checkout (mode intégré) | via edge functions |
| E-mails | Resend | via edge functions |
| Hébergement | VPS CloudPanel + nginx | `187.124.50.47` |
| DNS | OVH | `dns101.ovh.net` |

**Commandes de base :**

```bash
npm install        # une fois au départ
npm run dev        # serveur de dev sur http://localhost:8080
npm run build      # build de production dans dist/
npm run lint       # ESLint — le seul contrôle automatisé
npm run preview    # prévisualise le build de production
```

Le chemin `@/` pointe vers `./src/`.

---

## 3. Accès et identifiants

**Aucun identifiant n'est écrit dans ce document, et aucun ne doit y être ajouté.** Demande-les au client, qui doit te les transmettre via un gestionnaire de mots de passe (Bitwarden, 1Password…), jamais par e-mail ni par message.

Liste de ce dont tu as besoin :

| Accès | À quoi ça sert | Où le récupérer |
|---|---|---|
| SSH root du VPS | Déployer, configurer nginx | Client |
| CloudPanel (`https://187.124.50.47:8443`) | Gérer les sites, les certificats SSL | Client |
| Compte Supabase | Base de données, edge functions, logs | Client |
| Compte Airtable | Voir les leads entrants | Client |
| Compte Stripe | Paiements, codes promo | Client |
| Compte Resend | Délivrabilité des e-mails | Client |
| OVH (zone DNS) | Pointer les domaines | Client |
| GitHub `aymaneprojects/mare-nostrum-launch` | Le code | Client |

**Première chose à faire :** installe ta clé SSH pour ne plus taper le mot de passe root.

```bash
ssh-copy-id root@187.124.50.47
```

---

## 4. Le serveur

VPS Ubuntu 24.04 géré par **CloudPanel** (panel web sur le port `8443`). 96 Go de disque (18 % utilisés), 7,8 Go de RAM. Le firewall `ufw` est actif et laisse passer 22, 80, 443.

**Important :** ce serveur n'héberge pas que le site Mare Nostrum. Il fait aussi tourner `academie.marenostrum.tech` (un Moodle) et `hermes.batisseuria.fr` (une application tierce sur le port 9119). **Ne touche pas à leurs configurations.**

Sites nginx présents dans `/etc/nginx/sites-enabled/` :

| Fichier | Domaine | Ne pas toucher ? |
|---|---|---|
| `www.marenostrum.tech.conf` | Le site principal — **c'est le tien** | Non, c'est ton périmètre |
| `niteo.marenostrum.tech.conf` | L'application Niteo — **c'est le tien** | Non, c'est ton périmètre |
| `srv1542332.hstgr.cloud.conf` | `academie.marenostrum.tech` (Moodle) | ⚠️ Ne pas toucher |
| `hermes.conf` | `hermes.batisseuria.fr` | ⚠️ Ne pas toucher |
| `default.conf` | Rejette les domaines inconnus | ⚠️ Ne pas toucher |

Racines des deux sites, qui reçoivent un contenu **identique** :

- `/home/marenostrum/htdocs/www.marenostrum.tech` (utilisateur `marenostrum`)
- `/home/niteo/htdocs/niteo.marenostrum.tech` (utilisateur `niteo`)

Les mots de passe des utilisateurs système générés à la création des sites sont dans `/root/.site-credentials` sur le serveur.

Nginx n'inclut que les fichiers `*.conf`. Un fichier `.bak` posé là ne sera pas chargé, mais range quand même tes sauvegardes dans `/root/nginx-backups/` plutôt que dans `sites-enabled/`.

### Le point le plus délicat de la config nginx

Comme le site est une SPA, **toutes** les URL doivent renvoyer `index.html` et laisser React Router faire le reste. Sans ça, `/cgv` ou `/club` renvoient 404 dès qu'on rafraîchit la page. Le bloc responsable est celui-ci — s'il disparaît, tout le site sauf l'accueil tombe en 404 :

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Après toute modification de nginx, dans cet ordre :

```bash
nginx -t              # vérifie la syntaxe — ne jamais sauter cette étape
systemctl reload nginx
```

Des avertissements `ssl_stapling ignored` apparaissent : ils sont normaux et sans conséquence.

---

## 5. Déployer

Le site **n'a pas de déploiement automatique**. Il était auparavant sur Render où chaque `git push` redéployait tout seul ; ce n'est plus le cas. Un `git push` ne met plus le site en ligne — il faut lancer le déploiement à la main.

```bash
./deploy-vps.sh
```

### ⚠️ Toujours builder depuis ta machine, jamais sur le serveur

Cet incident a déjà eu lieu le 7 septembre 2026 et a mis le site **entièrement en écran blanc**.

Le build Vite intègre les variables `VITE_*` du fichier `.env` **au moment du build**. Ce fichier n'est pas dans Git. Si tu clones le dépôt sur le serveur et que tu lances `npm run build` là-bas, ces variables sont vides : le client Supabase reçoit `undefined` comme URL, plante au chargement du module, et React ne monte jamais. Résultat : page blanche sur tout le site, sans aucune erreur nginx — les fichiers sont servis correctement, c'est le JavaScript qui s'effondre dans le navigateur.

Le diagnostic en une commande, à lancer sur le serveur :

```bash
grep -c oivxznyzijtoylwfigyq /home/marenostrum/htdocs/www.marenostrum.tech/assets/index-*.js
```

`0` = build cassé, sans les clés. `1` = build sain.

Un `.env` de secours contenant **uniquement** les variables publiques `VITE_SUPABASE_*` a été déposé dans `/root/mare-nostrum-launch/.env` pour amortir une récidive. Ne t'y fie pas : le flux normal reste **modifier en local → tester → commiter → pousser → `./deploy-vps.sh` depuis ta machine**. Le clone `/root/mare-nostrum-launch/` sur le serveur n'a pas non plus d'identifiants GitHub : un commit fait là-bas reste prisonnier de la machine.

Pour **chacun** des deux domaines, le script enchaîne : `npm run build`, un `rsync` de `dist/`, la correction des permissions (dossiers 755, fichiers 644), puis une vérification HTTP qui interrompt tout si la réponse n'est pas `200`.

Si tu vérifies à la main, le SNI impose de passer par `--resolve` — sinon nginx sert le vhost par défaut et tu obtiens une erreur TLS trompeuse qui n'a rien à voir avec ton déploiement :

```bash
ssh root@187.124.50.47 \
  'curl -sk --http1.1 --resolve www.marenostrum.tech:443:127.0.0.1 \
   -o /dev/null -w "%{http_code}\n" https://www.marenostrum.tech/cgv'
```

Tu dois obtenir `200`. Un `404` signifie que le bloc `try_files` a sauté.

---

## 6. Les règles de code à respecter

### Couleurs et design

**Le document de référence est `DESIGN-SYSTEM.md` à la racine du dépôt.** Il couvre les tokens, la typographie, les composants (`Button`, `PageHero`, `MaritimeIcon`, cartes, chips), le pattern des sections sombres, le mouvement, l'accessibilité, les pièges connus et une checklist de livraison. Lis-le en entier avant de toucher à une page. Ce qui suit n'en est que le résumé.

`CHARTE-GRAPHIQUE.md` est un document plus ancien qui décrit une palette qui n'est plus celle du code — ne t'en sers pas.

Toutes les couleurs sont des variables CSS HSL dans `src/index.css`. Les tokens de marque priment sur les tokens shadcn dès qu'il s'agit d'exprimer l'identité :

| Token | Valeur | Usage |
|---|---|---|
| `--mn-nuit` / `nuit` | `222 44% 25%` | Bleu nuit principal |
| `--mn-turquoise` / `turquoise` | `181 67% 54%` | Accent, boutons d'action |
| `--mn-ivory` / `ivory` | `40 38% 94%` | Fond de page |
| `--mn-ocre` / `ocre` | `36 78% 45%` | Touche chaude |
| `--mn-ink` | `228 56% 13%` | Texte profond |
| `--mn-muted` | `224 14% 50%` | Texte secondaire |

Polices : `font-sans` = DM Sans (corps), `font-editorial` = Fraunces (titres).
Dégradés : `--gradient-hero`, `--gradient-subtle`, `--gradient-turquoise`.
Ombres : `--shadow-soft`, `--shadow-medium`, `--shadow-elegant`, `--shadow-lift`.

> **Piège déjà rencontré :** sur la navbar, la classe Tailwind `bg-white/92` était écrasée par la cascade du thème et le fond devenait transparent. La solution retenue a été un `style={{}}` inline en `rgba()`. Si une couleur refuse de s'appliquer, c'est probablement ça — inutile de chercher longtemps.

### SEO

Chaque page utilise `<EnhancedSEOHead>` (**pas** `<SEOHead>` seul). Ce composant ajoute automatiquement les mots-clés de marque, un schéma `BreadcrumbList` et un `WebSite` SearchAction. La prop `disableAutoEnhancement` désactive l'enrichissement si la page a besoin d'un contrôle total.

### Composants

`src/components/ui/` contient les primitives shadcn/ui **générées automatiquement — ne pas les éditer à la main**. La seule exception documentée est `button.tsx`, dont les variantes de taille ont été ajustées volontairement.

`Header` et `Footer` ne sont **pas** montés globalement : chaque page les importe elle-même. Si tu crées une page, n'oublie pas de les ajouter.

### Briefs par domaine

Avant de travailler sur une fonctionnalité, lis le brief correspondant dans `.agents/` — et **seulement** celui-là :

| Le sujet touche à… | Lire |
|---|---|
| Club, tarifs, Stripe | `.agents/club.md` |
| Écoles, Niteo, B2B | `.agents/education.md` |
| Blog, articles, mag | `.agents/mag.md` |
| SEO, métadonnées, schémas | `.agents/seo.md` |
| Design, CSS, tokens | `.agents/design.md` |
| Supabase, edge functions | `.agents/backend.md` |

---

## 7. Le back-office : où atterrissent les données

### Edge functions Supabase

23 fonctions dans `supabase/functions/`. Déploiement d'une fonction :

```bash
SUPABASE_ACCESS_TOKEN=<token> npx supabase@1.207.9 functions deploy <nom> \
  --project-ref oivxznyzijtoylwfigyq --no-verify-jwt
```

Le flag `--no-verify-jwt` est nécessaire : les visiteurs ne sont pas authentifiés.

Correspondance page → fonction :

| Page | Fonctions appelées |
|---|---|
| `/contact` | `send-contact-confirmation`, `send-contact-notification`, `webhook-proxy` |
| `/livre-entrepreneuriat` | `send-livre-blanc`, `webhook-proxy` |
| `/iter` (newsletter) | `newsletter-signup` |
| `/unsubscribed` | `newsletter-unsubscribe` |
| `/diagnostic` | `send-diagnostic` |
| `/club` | `get-club-count`, `create-checkout-session`, `get-checkout-session` |
| Popup promo (global) | `send-promo-code` |
| Niteo — candidature | `newsletter-signup` |
| Niteo — réservation | `create-niteo-checkout`, `confirm-niteo-reservation` |
| Niteo — évaluation | `get-niteo-projects`, `verify-jury-code`, `submit-niteo-evaluation` |

Exception à connaître : `/ecoles/diagnostic-gratuit` n'appelle aucune edge function et écrit directement dans la table Supabase `contact_submissions`.

### Airtable

Base unique : `appZ8ykNuUOv89ou0`.

| Table | ID | Contenu |
|---|---|---|
| Base Production | `tblocqquF4OXgXveO` | Tous les leads (contacts, newsletter, promos, Niteo) |
| Évaluations Niteo | `tbl5DuUDcyNDtasvG` | Notes du jury |

Les leads sont qualifiés par les colonnes `Lead Type`, `Expérience` et `Input CTA Site web`. Exemple : la popup de code promo écrit `Lead Chaud` / `Code promo site web` / `Popup promo -50%`.

**Piège Airtable :** l'API renvoie `UNKNOWN_FIELD_NAME` si une colonne n'existe pas, et l'écriture entière échoue. Les fonctions récentes gèrent ça en réessayant sans le champ fautif. **Renommer une colonne dans Airtable casse silencieusement l'écriture** — préviens le client de ne jamais renommer une colonne sans te le dire. Renommer une *vue*, en revanche, est sans effet.

Les écritures Airtable sont volontairement non bloquantes : si Airtable tombe, l'e-mail part quand même.

### Anti-spam

Le formulaire de contact a subi une vague de spam (2 envois toutes les 3 h). Trois défenses sont en place dans `send-contact-notification` :

1. Un **honeypot** — un champ caché `website` que seuls les bots remplissent
2. Un **score de contenu** — rejette les messages vides, trop courts, bourrés d'URL ou de mots-clés de spam
3. Un **rate-limit en mémoire** par e-mail et par IP sur une fenêtre de 3 h

Les rejets renvoient toujours `200 OK` silencieusement, pour que les bots ne s'adaptent pas. **Ne "corrige" pas ça en pensant à un bug** : c'est intentionnel.

### Stripe

Checkout en mode intégré. Les codes promo de la popup sont générés à la volée : coupon `-50 %`, usage unique, expiration 24 h.

**Piège déjà rencontré :** les e-mails de confirmation de réservation partaient en double parce qu'un `useEffect` se relançait au rechargement de la page. La parade est un marqueur d'idempotence dans les métadonnées de la session Stripe (`confirmed: "true"`), vérifié avant tout envoi. Ne le retire pas.

---

## 8. Checklist avant chaque mise en production

Il n'y a pas de tests : cette liste est ton filet.

- [ ] `npm run lint` passe
- [ ] `npm run build` réussit
- [ ] Testé en local avec `npm run dev`
- [ ] Navigation directe vers une URL profonde (`/cgv`) après déploiement → 200, pas 404
- [ ] Rendu vérifié en mobile (375 px) et desktop
- [ ] Si une page a été ajoutée : `Header` et `Footer` importés, `EnhancedSEOHead` présent
- [ ] Si une edge function a changé : redéployée **et** testée en conditions réelles
- [ ] Si un formulaire a changé : un envoi test arrive bien dans Airtable **et** par e-mail
- [ ] Aucun secret ajouté dans un fichier versionné

---

## 9. Quand ça casse

### Le site entier est hors ligne

```bash
ssh root@187.124.50.47
systemctl status nginx
nginx -t                 # cherche l'erreur de syntaxe
systemctl reload nginx
```

### Toutes les pages sauf l'accueil renvoient 404

Le bloc `try_files` a disparu du vhost. Remets-le (section 4), `nginx -t`, puis recharge.

### Écran blanc sur tout le site, nginx ne signale rien

Le build a été fait sans le `.env` — presque toujours parce que quelqu'un a lancé `npm run build` sur le serveur. Vérifie avec le `grep` de la section 5 : si le résultat est `0`, rebuilde depuis ta machine et relance `./deploy-vps.sh`. Ne cherche pas du côté de nginx, les fichiers sont servis correctement ; c'est le JavaScript qui plante dans le navigateur.

### Un déploiement a cassé le site

Le `rsync` utilise `--delete` : il n'y a pas de version précédente sur le serveur. Le rollback se fait depuis Git :

```bash
git log --oneline -10          # repère le dernier commit sain
git checkout <hash>
./deploy-vps.sh
```

Puis reviens sur `main` et corrige proprement. **Avant tout `git checkout`, vérifie `git status`** et mets de côté ce qui traîne (`git stash -u`).

### Un formulaire n'envoie plus rien

Regarde les logs de la fonction concernée dans le tableau de bord Supabase. Causes fréquentes, par ordre de probabilité : une colonne Airtable renommée, une clé API expirée, un quota Resend atteint.

### Le certificat SSL est expiré

`certbot.timer` est actif, le renouvellement est automatique. En cas d'échec, CloudPanel réémet :

```bash
clpctl lets-encrypt:install:certificate --domainName=www.marenostrum.tech \
  --subjectAlternativeName=marenostrum.tech
```

---

## 10. Travaux en attente

### A. Basculer le DNS de Render vers le VPS

Le serveur est **prêt pour les deux domaines** : le site principal et Niteo sont déployés, testés et répondent en 200. Il ne reste que le DNS, qui pointe **encore sur Render**.

À changer chez OVH, les trois enregistrements ensemble :

| Enregistrement | Actuel | Cible |
|---|---|---|
| `marenostrum.tech` (A) | `216.24.57.1` | `187.124.50.47` |
| `www` | CNAME → `mare-nostrum-launch-3.onrender.com` | Supprimer, créer un A → `187.124.50.47` |
| `niteo` | CNAME → `mare-nostrum-launch-3.onrender.com` | Supprimer, créer un A → `187.124.50.47` |

Ne pas toucher à `academie` (déjà sur ce VPS) ni à `meet` (serveur tiers, `72.62.17.167`).

IPv6 optionnel (AAAA) : `2a02:4780:7:cd2f::1`

Une fois propagé (1 à 4 h), émets les certificats — **un par site** :

```bash
clpctl lets-encrypt:install:certificate --domainName=www.marenostrum.tech \
  --subjectAlternativeName=marenostrum.tech
clpctl lets-encrypt:install:certificate --domainName=niteo.marenostrum.tech
```

Tant que ce n'est pas fait, les certificats sont auto-signés et le navigateur affiche un avertissement. **Ne fais pas cette bascule un vendredi soir.**

### B. Dette technique, à traiter quand tu auras le temps

- **146 couleurs brutes** (`text-white`, hex, `gray-*`…) subsistent dans `src/`, en contradiction avec le design system — 70 d'entre elles dans `Newsletter.tsx` et `Unsubscribed.tsx`. À migrer vers les tokens (`DESIGN-SYSTEM.md` §1), page par page, sans mélanger avec une autre tâche.
- Le bundle principal fait **1,2 Mo** (326 Ko compressés). Vite le signale à chaque build. Découpage par `import()` dynamique à prévoir.
- `src/pages/BienvenuClub.tsx` n'est référencée nulle part — code mort probable, à confirmer avant suppression.
- Plusieurs images dépassent 1 Mo (jusqu'à 2,7 Mo). Conversion en WebP à envisager.
- L'auteur des commits Git n'est pas configuré (`git config --global user.name` / `user.email`).

---

## 11. Travailler avec le client

Le CEO ne code pas. Cette section compte autant que le reste.

**Ce qui fonctionne :**

- Parler en résultats visibles, pas en implémentation. « Les gens qui demandent un code promo apparaissent maintenant dans Airtable » plutôt que « j'ai ajouté un POST vers l'API Airtable dans l'edge function ».
- Donner un lien à cliquer et dire quoi regarder. Il valide par l'œil, pas par la lecture d'un diff.
- Annoncer les conséquences avant d'agir : « si on fait ça, le site sera indisponible ~5 minutes » ou « après cette bascule, une mise en ligne demandera une action manuelle de ma part ».
- Le prévenir que **renommer une colonne Airtable casse le site** — c'est le geste le plus risqué qu'il puisse faire sans s'en rendre compte.

**Ce qui ne fonctionne pas :**

- Lui demander de trancher un choix technique. Recommande une option et explique le compromis en une phrase.
- Lui envoyer des logs bruts ou des messages d'erreur.
- Supposer qu'il fera une manipulation technique. S'il faut toucher au DNS chez OVH, ou bien tu obtiens l'accès, ou bien tu lui écris la procédure clic par clic.

**Deux réflexes à garder :**

1. Toute action irréversible ou visible publiquement — bascule DNS, changement de tarif, envoi d'e-mail en masse, suppression de données — se confirme **avant**, même si une action similaire a déjà été validée par le passé.
2. Rends compte fidèlement. Si un déploiement a échoué, dis-le avec le message d'erreur. Si une étape a été sautée, dis-le. La confiance d'un client non technique repose entièrement sur le fait que tu ne lui caches rien.

---

## 12. Où trouver le reste

| Document | Contenu |
|---|---|
| `CLAUDE.md` | Instructions du dépôt, architecture détaillée |
| `README.md` | Démarrage rapide |
| `CHARTE-GRAPHIQUE.md` | Charte graphique complète |
| `.agents/*.md` | Briefs par domaine fonctionnel |
| `ACTION-PLAN-MARE-NOSTRUM-SEO.md` | Feuille de route SEO |
| `CHECKLIST-SEO-GEO-AI.md` | Checklist SEO / référencement IA |
| `render.yaml` | Ancienne configuration Render — historique, plus utilisée après la bascule |

Bienvenue, et bon courage.
