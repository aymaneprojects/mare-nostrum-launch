# Inscription Club Freemium (Airtable)

Le site est une page statique servie par Nginx (CloudPanel). Le navigateur envoie
le formulaire à `/api/club-freemium`. Nginx transmet cette adresse au petit
serveur `club-freemium.mjs`, qui seul détient le jeton Airtable.

Le site n'est pas publié sur Vercel. `public/vercel.json` ne fait que renvoyer
toutes les adresses vers `index.html` : une fonction Vercel n'est pas utilisée.

## Variables

| Nom | Où | Rôle |
|---|---|---|
| `AIRTABLE_API_KEY` | serveur uniquement | jeton Airtable |
| `AIRTABLE_BASE_ID` | serveur uniquement | identifiant de la base (`app…`) |
| `AIRTABLE_TABLE_NAME` | serveur uniquement | nom exact de la table, défaut `club_freemium` |
| `RESEND_API_KEY` | serveur uniquement | clé Resend du mail de bienvenue |
| `SLACK_INVITE_URL` | serveur uniquement, optionnel | lien du bouton Slack. Défaut : l'invitation déjà utilisée par l'ancienne fonction |
| `PORT` | serveur, défaut `8787` | port local |
| `VITE_CLUB_FREEMIUM_API_URL` | build du site, optionnel | si vide, le site appelle `/api/club-freemium` |

## Colonnes Airtable à créer

Table par défaut : `club_freemium`. Les quatre noms ci-dessous sont exacts.
Type : ligne de texte.

| Colonne | Contenu |
|---|---|
| `email` | e-mail en minuscules |
| `first_name` | prénom |
| `company` | nom du projet ou de l'entreprise, peut être vide |
| `location` | `france` ou `congo_brazzaville` |

Un e-mail déjà présent ne crée pas de seconde ligne et ne reçoit pas un second mail.

Chaque nouvelle ligne déclenche le même courrier que l'ancienne fonction
`club-freemium-signup` : expéditeur `Club Mare Nostrum <no-reply@marenostrum.tech>`,
réponse à `contact@marenostrum.tech`, sujet `Bienvenue au sein du Club Mare Nostrum !`,
bouton vers l'invitation Slack. Si Resend est en panne ou si `RESEND_API_KEY`
est absente, l'erreur est écrite dans le journal et l'inscription reste acceptée.

## Lancement sur le VPS

```bash
sudo mkdir -p /opt/club-freemium
sudo cp server/club-freemium.mjs /opt/club-freemium/club-freemium.mjs
sudo cp server/club-freemium.env.example /etc/club-freemium.env
sudo chmod 600 /etc/club-freemium.env
# renseigner Airtable et RESEND_API_KEY dans /etc/club-freemium.env
sudo cp server/club-freemium.service /etc/systemd/system/club-freemium.service
sudo systemctl daemon-reload
sudo systemctl enable --now club-freemium
curl -sS http://127.0.0.1:8787/healthz
```

`{"ok":true}` signifie que les variables Airtable sont présentes. Cela ne crée pas de ligne.

## Bloc Nginx

À ajouter dans le vhost `www.marenostrum.tech`, avant le `location /` qui
renvoie `index.html`. Sans ce bloc, Nginx sert la page du site au lieu
d'enregistrer l'inscription.

```nginx
location = /api/club-freemium {
  proxy_pass http://127.0.0.1:8787;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

Puis : `nginx -t` et `systemctl reload nginx`.

Le build du site n'a pas besoin de `VITE_CLUB_FREEMIUM_API_URL` tant que cette
adresse relative est en place. Reconstruire le site seulement si l'on veut
pointer ailleurs.
