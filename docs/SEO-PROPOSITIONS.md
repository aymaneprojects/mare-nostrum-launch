# Propositions de contenu SEO (à valider par le propriétaire)

Rien ici n'est appliqué. Chaque proposition suit le format : texte actuel, texte proposé, pourquoi.
Les titres et meta descriptions déjà ajustés dans le code (invisibles pour le visiteur) ne figurent pas ici.

## 1. Titre (H1) de l'accueil
- Actuel : voir `src/pages/Index.tsx` (le H1 ne contient ni « Toulouse » ni mot-clé cible).
- Proposé : intégrer « incubation » et « Toulouse » dans le H1 ou son sous-titre, par exemple
  « Incubation et accompagnement des entrepreneurs, à Toulouse et en francophonie ».
- Pourquoi : le `<title>` annonce désormais « Incubation et création d'entreprise Toulouse » ; un H1 qui ne
  le confirme pas affaiblit le signal.

## 2. Page pilier « Incubation Toulouse »
- Actuel : « incubation toulouse » est partagée entre `/niteo-toulouse` (étudiants) et
  `/entrepreneurs/accompagnement-francophonie-afrique` (entrepreneurs, Afrique).
- Proposé : une page `/incubation-toulouse` qui présente le parcours global (Niteo pour les étudiants,
  Club et mentorat pour les créateurs), avec liens vers les deux pages existantes ; chacune garde son angle.
- Pourquoi : éviter la cannibalisation et donner une cible claire à la requête n°1.

## 3. Page « Création d'entreprise à Toulouse »
- Actuel : aucune page ne cible « création d'entreprise », « devenir entrepreneur », « porteur de projet ».
- Proposé : page guide (étapes, statuts, accompagnement possible chez Mare Nostrum), reliée au test de maturité
  `/entrepreneurs/test-maturite-projet` et au Club.
- Pourquoi : forte demande, intention proche de l'offre.

## 4. Section « Financer sa création d'entreprise »
- Actuel : absente de `/club` et de la page Francophonie.
- Proposé : section courte (dispositifs publics, prêts d'honneur, dotations Niteo), uniquement avec des faits
  que le propriétaire peut confirmer ; sinon article de blog.
- Pourquoi : requête à forte intention ; le blog en parle déjà, un lien depuis les pages de service manque.

## 5. Témoignages et études de cas
- Actuel : témoignages en 4e section de l'accueil, pas de page dédiée.
- Proposé : page `/temoignages` (cas signés, chiffres vérifiables) ; remonter la preuve sociale sur l'accueil.
- Pourquoi : confiance (E-E-A-T), rétention. La note 4,8/5 sur 24 avis a été retirée des données
  structurées de `/club` car non vérifiable : à rétablir seulement avec des avis réels consultables.

## 6. Écosystème toulousain (« startup Toulouse »)
- Actuel : les partenaires locaux existent (`/a-propos/partenaire`, Niteo) sans contenu éditorial dédié.
- Proposé : page « L'écosystème entrepreneurial toulousain » citant les partenaires réels.
- Pourquoi : ancrage local, maillage interne.

## 7. Niteo : contenu daté
- Actuel : `/niteo-toulouse` présente l'édition 2026 (avril à juin 2026), entièrement passée au 12 octobre 2026.
  Les offres des données structurées (Event) ont été retirées ; le Course et l'Event restent, datés.
- Proposé : texte « édition 2027 : dates à venir » ou liste d'attente, et mise à jour des FAQ (« Demo Day le 16 juin 2026 »).
- Pourquoi : un contenu visiblement périmé pénalise le clic et la confiance.

## 8. Maillage interne et navigation
- Actuel : `/niteo-toulouse`, `/entrepreneurs/*`, `/ecoles/*` et `/mag/*` n'ont aucun lien depuis le menu,
  le pied de page ou l'accueil ; « Incubation » est absente de la navigation mobile.
- Proposé : libellé « Incubation » vers `/niteo-toulouse` (ou la future page pilier) dans Header, BottomNav, Footer ;
  bloc « Pour aller plus loin » en fin de chaque article `/mag/*` et du blog vers Niteo, Club, mentorat.
- Pourquoi : pages importantes aujourd'hui orphelines. Hors de mon lot (Header, Footer, BottomNav).

## 9. Page 404
- Actuel : « Oops! Page not found » / « Return to Home » (anglais) dans `src/pages/NotFound.tsx`.
- Proposé : « Page introuvable » / « Retour à l'accueil », lien `<Link>` plutôt que `<a href>`.
- Pourquoi : site en français.

## 10. FAQ et balisage manquants
- Actuel : Expertise, Mastermind, Contact, À propos sans FAQ.
- Proposé : 3 à 5 questions par page, rédigées par le propriétaire, puis balisage FAQPage.
- Pourquoi : résultats enrichis et réponses des moteurs IA.

## 11. Texte légal de l'accueil et ancres de liens
- Actuel : certains liens de `Index.tsx` pointent vers un `www` absolu (rechargement complet) avec des ancres génériques.
- Proposé : liens internes (`<Link>`) et ancres descriptives (« découvrir l'incubation Niteo »).
- Pourquoi : maillage et navigation sans rechargement. Les textes visibles n'ont pas été modifiés.
