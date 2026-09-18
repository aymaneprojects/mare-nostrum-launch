# Consignes animateur — Live conférence Mare Nostrum

> Les codes (code public `MN-XXXX` et code animateur) ne figurent **jamais** dans ce fichier : il est versionné sur GitHub.
> Ils sont conservés hors du dépôt, par la personne qui a créé l'événement.
> Un code animateur perdu ne peut pas être relu : il est chiffré en base.

## Les trois pages

| Qui | Appareil | Adresse |
|---|---|---|
| Animateur | ordinateur ou tablette | `marenostrum.tech/live/<code>/regie` |
| Salle | ordinateur branché au vidéoprojecteur | `marenostrum.tech/live/<code>/ecran` |
| Participants | leur téléphone | QR code à l'écran, ou `marenostrum.tech/live/<code>` |
| Déroulé imprimable | — | bouton **Conducteur** de la régie |

## Déroulé prévu

| # | Type | Question | Minuteur |
|---|---|---|---|
| 1 | Question ouverte | Qu'attendez-vous de cette conférence ? | 1 min 30 |
| 2 | Nuage de mots | Qu'est-ce que vous voulez gagner dans les dix prochaines années ? | 1 min |
| 3 | Nuage de mots | Qu'est-ce que vous voulez apprendre dans les dix prochaines années ? | 1 min |
| 4 | Nuage de mots (prénoms visibles en régie) | Qu'est-ce que vous voulez qu'on dise de vous dans dix ans ? | — |
| 5 | Mur de questions (likes, signé ou anonyme) | Posez vos questions, quand elles vous viennent | ouvert jusqu'à la fin |
| 6 | Note de 1 à 5 | Qu'avez-vous pensé de cette conférence ? | 45 s |
| 7 | Nuage de mots | Qu'avez-vous retenu ? Un mot, une idée, un exemple. | — |

---

## 1. Avant la conférence (la veille ou 1 h avant)

1. **Régie** : ouvre `/live/<code>/regie` sur ton ordinateur et saisis le code animateur.
2. **Écran de salle** : ouvre `/live/<code>/ecran` sur l'ordinateur du vidéoprojecteur, puis clique sur **Plein écran**. Le QR géant et le compteur de participants s'affichent.
3. **Mise en veille** : désactive la mise en veille et l'économiseur d'écran de l'ordinateur du vidéoprojecteur. Branche-le sur secteur.
4. **Test** : scanne le QR avec ton téléphone, entre un prénom et un emoji, puis réponds à une question.
5. **Remise à zéro** : clique sur **Tout remettre à zéro**. Toutes les réponses et tous les participants de test sont effacés. Les questions, les notes et les codes sont conservés.
6. **Contrôle des questions** : vérifie chaque question avec **Modifier** (texte, minuteur, options, note animateur). Supprime les activités de test qui ne font pas partie du déroulé.
7. **Conducteur** : imprime-le.
8. **Wi-Fi** : vérifie la connexion de la salle. S'il y a un Wi-Fi invité, affiche son nom et son mot de passe à côté du QR.

## 2. Pendant la conférence

### À l'ouverture
- Laisse le QR à l'écran pendant que la salle s'installe. Le compteur de participants monte en direct.
- Clique sur le QR pour l'afficher en très grand.
- Annonce : « Scannez, entrez votre prénom, choisissez un emoji. »

### Lancer une question
- Clique sur **Lancer**. L'écran l'affiche aussitôt ; les téléphones la reçoivent en 4 secondes au plus.
- Lancer une question termine automatiquement la question précédente. Le mur, lui, reste ouvert.
- Clique sur **Terminer** quand la question est finie. L'écran revient au QR en plein écran, ce qui permet aux retardataires de rejoindre.
- **Relancer** rouvre une question terminée.

### Choisir ce que montre l'écran
- **Automatique** (recommandé) : l'écran montre la question en cours. S'il n'y en a pas, il montre le mur, et à défaut le QR.
- **À l'écran** : force l'affichage d'une activité précise.
- **Côte à côte** : affiche deux activités ensemble, par exemple les nuages 2 et 3.

### Modérer
- **Masquer** : retire un message du mur ou un mot du nuage. Tu peux le réafficher.
- **Participants** : recherche une personne et supprime-la en cas d'abus. Ses réponses sont effacées avec elle.
- **Supprimer** : retire une activité, même si elle est déjà lancée.
- Les prénoms de la question 4 ne sont visibles que dans la régie, jamais à l'écran.

### Si quelque chose bloque
- **Écran figé ou vide** : recharge la page (F5) puis clique à nouveau sur **Plein écran**. Rien n'est perdu, tout est enregistré au fur et à mesure.
- **Un participant ne voit pas la question** : il doit attendre 4 secondes ou recharger la page. Son prénom est conservé sur son téléphone.
- **Un participant a changé de navigateur ou de téléphone** : il rejoint comme une nouvelle personne. C'est normal.

## 3. Après la conférence

1. **Exporter (Excel)** télécharge 5 onglets : Synthèse, Réponses, Votes, Nuages de mots, Participants. **Fais-le en premier.**
2. **Clôturer l'événement** : plus personne ne peut rejoindre.
3. **Tout remettre à zéro** : seulement pour réutiliser l'événement avec un autre public. Cela efface toutes les réponses : **exporte avant**.

## Règles d'or

- Le **code animateur** ne se donne jamais et ne s'affiche jamais à l'écran. Seuls le code public et le QR se partagent.
- La **régie** reste sur ton ordinateur et l'**écran** sur le vidéoprojecteur : ce sont deux fenêtres séparées.
- **Capacité** : seuls l'écran et la régie sont connectés en temps réel. Les téléphones interrogent le serveur toutes les 4 à 20 secondes. Pour 220 personnes, le point à surveiller est la charge de ces interrogations, pas le nombre de connexions (voir le bug n° 10).

---

## Bugs possibles repérés (revue de code du 18/09/2026)

Légende : **confirmé** = vérifié dans le code ; **plausible** = à tester avant la conférence.
Chaque bug indique la parade côté animateur tant qu'il n'est pas corrigé.

### Bloquants

| # | Bug | Statut | Ce qu'on voit en salle | Parade en attendant | Correctif technique |
|---|---|---|---|---|---|
| 1 | La page téléphone revérifie l'identité toutes les 20 s et démonte la zone de saisie | confirmé (`LivePublic.tsx:35-55`) | Le texte en cours de frappe (question ouverte, mur) **disparaît**. Après une micro-coupure réseau, la personne est renvoyée au formulaire d'inscription. | Aucune fiable. Dire « tapez court et envoyez vite ». | L'effet doit dépendre de `event?.id` et non de `event`. Ne jamais remettre `identityChecked` à false. |
| 2 | L'export Excel est tronqué à 1000 lignes par table | confirmé (`LiveRegie.tsx:207-209`) | Il manque des réponses, votes ou mots dans l'export, sans avertissement. | Faire des captures de l'écran en fin de chaque question. | Paginer avec `.range()` jusqu'au dernier lot. |

### Gênants

| # | Bug | Statut | Ce qu'on voit en salle | Parade en attendant | Correctif technique |
|---|---|---|---|---|---|
| 3 | Les suppressions ne sont pas diffusées en temps réel | plausible (`useLiveTable.ts`) | L'activité supprimée reste affichée à l'écran. Les messages d'un participant supprimé restent visibles. | Après une suppression, recharger l'écran (F5). | Recharger les données après `delete_item`, `delete_participant` et `reset_event`. |
| 4 | Lancer une activité n'est pas atomique | confirmé (`live-admin/index.ts:281-290`) | Flash du QR à chaque lancement. Avec deux régies ouvertes en même temps : erreur « duplicate key… ». | **Une seule régie ouverte.** | Fonction SQL `live_activate` en une transaction ; traduire l'erreur. |
| 5 | Supprimer un participant ne l'exclut pas | confirmé (`LivePublic.tsx:44-51`) | Le téléphone recrée la personne dans les 20 s, et elle peut reposter. | Masquer ses messages un par un. | Marquer le participant comme banni au lieu de le supprimer. |
| 6 | Un échec réseau au premier chargement affiche « Événement introuvable » | confirmé (`useLiveEvent.ts`, `LivePublic.tsx:81`) | Écran ou régie bloqués sur ce message. Téléphones : « Vérifiez le code » pendant la ruée sur le QR. | Recharger la page. Dire à la salle « si ça ne marche pas, rechargez ». | Distinguer erreur réseau et code inconnu ; réessayer automatiquement. |
| 7 | Aucune resynchronisation si le temps réel décroche | plausible (`useLiveTable.ts:135-137`) | Barres de sondage ou nuage qui sous-comptent pendant un pic de votes. | Recharger l'écran avant de commenter les résultats. | Recharger les données toutes les 15 à 20 s et sur `CHANNEL_ERROR`. |
| 8 | Le minuteur est seulement visuel et dépend de l'horloge de l'appareil | confirmé / plausible (`Countdown.tsx`) | « Temps écoulé » alors qu'on peut encore répondre. Décompte faux si l'horloge du PC dérive. | Cliquer sur **Terminer** à la main. Régler l'heure automatique sur le PC du vidéoprojecteur. | Corriger le décalage avec l'heure du serveur ; fermeture automatique en option. |
| 9 | Pas de blocage de la veille de l'écran | plausible (`LiveScreen`) | Écran noir pendant une longue intervention. | Désactiver la veille et l'économiseur d'écran (voir « Avant la conférence »). | `navigator.wakeLock.request("screen")` sur l'écran de salle. |
| 10 | Charge des 220 téléphones | plausible, à mesurer | Environ 110 requêtes/s. Le mur est relu en entier à chaque fois, ce qui pèse sur le quota de trafic gratuit (5 Go/mois). Le blog est aussi préchargé sur chaque téléphone. | Fermer le mur quand il ne sert plus. | Sélectionner seulement les colonnes utiles, limiter le mur à 50 messages, désactiver le préchargement du blog sur `/live`. |

### Mineurs

| # | Bug | Statut | Conséquence |
|---|---|---|---|
| 11 | Le délai anti-envoi de 5 s est commun à toutes les activités | confirmé (migration v2) | Poster sur le mur puis répondre à la question dans les 5 s est refusé, avec un message ambigu. Les mots masqués comptent dans la limite de 3. |
| 12 | Après **Tout remettre à zéro**, les téléphones de test gardent leur état | confirmé | Ils affichent encore « Vote enregistré » ou « 3 mots proposés ». **Parade :** tester en navigation privée, ou vider les données du site sur ces téléphones. |
| 13 | Compteur de participants gonflé | confirmé | Il compte toutes les identités créées : changements de prénom, navigateurs intégrés aux lecteurs de QR, reconnexions du bug n° 1. Une nouvelle identité peut aussi revoter. |
| 14 | Identité perdue jamais détectée au vote | confirmé (`PollVote.tsx`, `RatingVote.tsx`) | Un participant supprimé voit « le sondage est peut-être terminé ». |
| 15 | Code animateur gardé seulement dans l'onglet | confirmé / plausible (`lib/live/admin.ts`) | Il faut ressaisir le code si l'onglet de régie est fermé. Le **Conducteur** ouvert dans un nouvel onglet peut afficher « accès refusé ». **Parade :** l'imprimer la veille. |

**Priorité de correction avant la conférence :** 1, 2 et 3 (correctifs courts), puis 4, 7 et 9.
