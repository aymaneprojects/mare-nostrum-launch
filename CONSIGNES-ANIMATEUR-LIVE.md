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

## Bugs repérés et corrigés (revue de code du 18/09/2026)

| # | Bug | Correction |
|---|---|---|
| 1 | Toutes les 20 s, la page téléphone effaçait le texte en cours de frappe | L'identité n'est lue qu'une fois par événement ; une erreur réseau ne la fait plus perdre. |
| 2 | Export Excel tronqué à 1000 lignes par table | Export paginé ; une erreur de chargement fait échouer l'export au lieu de le tronquer sans rien dire. |
| 3 | Les suppressions n'étaient pas diffusées à l'écran ni à la régie | L'écran et la régie se resynchronisent toutes les 15 s ; la régie recharge aussi après chaque action. |
| 4 | Lancer une activité n'était pas atomique (erreur avec deux régies) | Fonction SQL `live_activate`, en une transaction verrouillée par événement ; message d'erreur en français. |
| 5 | Un participant supprimé était recréé automatiquement | Il est renvoyé au formulaire. Il peut rejoindre sous un autre prénom (sans comptes, on ne peut pas bannir). |
| 6 | Une erreur réseau affichait « Événement introuvable » | Affiche « Connexion en cours… » et réessaie toutes les 3 s. |
| 7 | Pas de resynchronisation si le temps réel décrochait | Resynchronisation toutes les 15 s, et rechargement en cas d'erreur de canal. |
| 8 | Minuteur faux si l'horloge de l'appareil dérive | Le minuteur suit l'heure du serveur. Il reste **indicatif** : c'est toi qui cliques sur **Terminer**. |
| 9 | L'écran de salle pouvait passer en veille | Verrou anti-veille sur l'écran de salle (Chrome, Edge, Safari récents). Désactive quand même la veille du système. |
| 10 | Charge des 220 téléphones | Le mur ne charge que 60 messages par téléphone, et le blog n'est plus préchargé sur `/live`. |
| 11 | Délai anti-envoi commun à toutes les activités | Le délai est compté activité par activité ; les mots masqués ne comptent plus dans la limite de 3. |
| 12 | Après une remise à zéro, les téléphones gardaient « Vote enregistré » | La mémoire locale des votes, likes et mots est effacée quand l'identité disparaît. |
| 15 | Code animateur redemandé à chaque onglet | Mémorisé sur l'ordinateur jusqu'au clic sur « Quitter la régie ». |

### Limites connues (non corrigées)

- **13. Compteur de participants gonflé.** Il compte chaque inscription, y compris un changement de prénom ou un autre navigateur. Considère-le comme un ordre de grandeur.
- **14. Message trompeur après une suppression.** Un participant supprimé peut voir « activité terminée » pendant au plus 20 s, avant d'être renvoyé au formulaire.
- **Revote.** Une personne peut revoter en rejoignant sous un autre prénom. C'est le prix d'une participation sans compte.
