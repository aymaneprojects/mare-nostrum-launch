# ITER — newsletter reliée au site (n8n)

Mis en place le 7 octobre 2026.

## Chemin d'une inscription

1. La page `/iter` appelle l'edge function `newsletter-signup`.
2. La fonction cherche si l'adresse est déjà inscrite à ITER (champ `Input CTA Site web` = `ITER`).
   - Déjà inscrite et pas désinscrite : rien n'est recréé, la séquence ne repart pas (évite les 12 e-mails en double).
   - Désinscrite (`Lead Type` = `Unsubscribed`) : la fiche repasse en `Lead Froid` et la séquence repart.
3. Fiche Airtable créée (comportement d'origine, inchangé).
4. Si le consentement RGPD est coché, appel du webhook n8n `POST /webhook/iter-newsletter` avec `{ nom, email, projet }`. Un échec n8n n'empêche jamais l'inscription : il est journalisé, la réponse porte `sequence: "echec"`.

## Côté n8n

Workflow « ITER — Newsletter inscription site web (copie de A - RUN NURTURING- INITIAL) », identifiant `Vj0P56BdzFmAs30n`.

C'est une copie des 12 e-mails, des attentes et des contrôles de désinscription de `A - RUN NURTURING- INITIAL` (`kB27sCyMvcLfYILa`), qui n'a pas été modifié. Seul le début change :

- déclencheur Webhook (`iter-newsletter`) à la place du déclencheur « exécuté par un autre workflow » ;
- « Adresse valide ? » : adresse bien formée et nom d'au moins 2 caractères, sinon arrêt sans envoi ;
- l'agent IA qui extrayait le prénom est remplacé par un calcul direct (premier mot du nom, majuscule initiale) ;
- projet vide : « ton projet » est utilisé dans les e-mails.

Les « Vagues » de nurturing ne choisissent que les fiches dont le champ `Vague nurturing` est rempli : une inscription du site n'en a pas, donc aucun double envoi.

## Points d'attention

- Le webhook n8n est public, comme `web-contact` et `livre-blanc`. La validation de l'adresse limite les abus ; une limitation de débit reste à poser.
- L'API n8n ne liste pas les exécutions en attente : les chercher par identifiant (`GET /executions/<id>`).
