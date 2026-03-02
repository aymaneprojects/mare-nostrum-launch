

## Plan : Landing Page Niteo (sous-domaine uniquement)

### Approche

La page Niteo candidature etudiants ne sera PAS une route `/niteo` dans l'application principale. Elle sera accessible uniquement via le sous-domaine `niteo.marenostrum.tech`.

### Architecture technique

**Detection du sous-domaine dans `src/main.tsx`** : Si `window.location.hostname === "niteo.marenostrum.tech"`, on rend un composant `NiteoCandidature` autonome au lieu de l'application principale `App`.

**Nouveau fichier : `src/pages/NiteoCandidature.tsx`** : Page standalone complete (pas de Header/Footer du site principal), design conversion-first oriente etudiant.

### Aucune modification dans App.tsx ni dans le routeur

Pas de nouvelle route. Pas de lien dans la navbar. Le sous-domaine charge directement la page Niteo.

### Contenu de NiteoCandidature.tsx

1. **Hero** -- Logo Niteo + "Transforme ton idee en entreprise qui genere des revenus et de l'impact" + badge "Gratuit -- Places limitees" + chiffres (50h, Gratuit, +10 000 EUR, 30 decideurs) + CTA externe "Je candidate" (placeholder `https://forms.gle/PLACEHOLDER`)
2. **Pour qui** -- 5 profils : Licence, Master, Jeunes diplomes, Porteurs d'idee, Motives
3. **Ton defi en 50h** -- 4 blocs : e-learning 19h, ateliers 24h, coaching 2h, Demo Day
4. **Ce que tu vas vivre** -- Ateliers collectifs, coaching, plateforme e-learning, pitcher devant decideurs
5. **A la cle** -- Grille benefices + dotations 10 000 EUR + Club Mare Nostrum
6. **Calendrier** -- Candidatures jusqu'au 2 avril, programme 11 avril - 16 juin, dates ateliers, mention presence obligatoire
7. **Coachs et mentors** -- Photos existantes (`src/assets/niteo/` + `src/assets/team/`)
8. **Partenaires** -- Logos existants (`src/assets/partners/`)
9. **FAQ etudiants** -- Gratuit ?, besoin d'un projet ?, criteres, travail parallele, Demo Day
10. **CTA final** -- "Candidate MAINTENANT" + "Tout dossier incomplet sera elimine"

### Fichiers modifies

| Fichier | Modification |
|---|---|
| `src/main.tsx` | Detection hostname `niteo.marenostrum.tech` pour rendre `NiteoCandidature` au lieu de `App` |
| `src/pages/NiteoCandidature.tsx` | Nouveau fichier -- page complete autonome |

### Configuration sous-domaine (apres implementation)

1. Lovable > Settings > Domains > ajouter `niteo.marenostrum.tech`
2. Chez le registraire DNS de `marenostrum.tech` : ajouter un enregistrement A pour `niteo` pointant vers `185.158.133.1`
3. Attendre propagation DNS + certificat SSL automatique

### SEO

- Title : "Niteo Toulouse 2026 -- Programme Entrepreneuriat Etudiant Gratuit | Candidature"
- Schema.org Course + Event
- FAQ Schema integre

