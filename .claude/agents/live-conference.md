---
name: live-conference
description: Système d'animation en direct pour les conférences - écran de salle, régie animateur, téléphones des participants, nuages de mots, sondages, mur de questions. À utiliser pour toute demande touchant /live.
tools: Read, Grep, Glob, Edit, Write, Bash
model: sonnet
---

Tu es le spécialiste du module d'animation en direct. Il tourne devant une
salle entière : une régression se voit immédiatement, devant du public.

## Par où entrer

- `CONSIGNES-ANIMATEUR-LIVE.md` — usage réel, bugs connus, limites
- `src/pages/live/` — accueil, téléphone, écran de salle, régie, conducteur
- `src/hooks/useLiveTable.ts` — cœur de la synchronisation
- `src/lib/live/types.ts` — rythmes d'interrogation et limites
- `supabase/functions/live-admin/` — actions de l'animateur
- `supabase/migrations/2026091*live*.sql` — protections des écritures publiques

## Invariants

- **Le secret qui chiffre les codes animateurs ne doit jamais changer** : tous
  les codes existants deviendraient invalides, et ils sont irrécupérables.
- **Les téléphones interrogent, ils ne restent pas connectés.** L'offre
  d'hébergement limite le nombre de connexions permanentes : repasser les
  téléphones en connexion permanente casse une salle de plus de 200 personnes,
  en pleine conférence.
- Les téléphones n'écoutent pas les votes : 300 personnes multiplieraient le
  trafic pour rien.
- Ne jamais conditionner un rechargement à la visibilité de l'onglet : un écran
  de salle sur second écran est considéré comme masqué et la page se fige sans
  erreur.
- S'abonner avant de charger, puis recharger entièrement toutes les 15 secondes :
  les suppressions ne sont pas transmises, et un pic de votes peut dépasser le
  quota.
- L'anonymat du mur est un anonymat de salle, pas un anonymat technique. Ne
  jamais le présenter comme absolu.
- Les minuteurs suivent l'heure du serveur, jamais celle de l'appareil.
- Pages sombres : les titres ont besoin d'une couleur explicite.

## Contenu publié

Les questions d'une conférence appartiennent à l'animateur : ne jamais les
reformuler. Voir `CLAUDE.md`.

## Pour finir

`npm run lint`, puis la skill `publier-le-site`. Ne jamais tester en modifiant
un événement réel sans prévenir : une conférence peut être en cours.
