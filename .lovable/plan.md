## Plan : Ameliorer le banner top et la landing page Niteo avec les mots-cles fournis

### Modifications

**1. Banner promotionnel (Index.tsx, Croissance.tsx, Education.tsx)**

Remplacement du texte actuel par un message plus percutant et cible :

- Accroche : "Etudiant(e), jeune diplome(e) ? Transforme ton idee en projet concret en 50h chrono -- 100% gratuit"
- CTA : "Candidater" vers niteo.marenostrum.tech

Le banner reste compact (une ligne sur desktop, wrap sur mobile) mais avec un message beaucoup plus engageant.

**2. Landing page Niteo (NiteoCandidature.tsx)**

Enrichissement du contenu avec les mots-cles fournis en respectant l'orthographe:

- **Hero** : Sous-titre enrichi mentionnant "etudiants et jeunes diplomes", "soft skills", "apprendre a transformer une idee en projet qui genere des revenus"
- **Section "Pourquoi Niteo"** ou intro : Ajout d'un paragraphe empathique reprenant les pain points ("Tu ne sais pas par ou commencer ? Ce n'est pas grave -- tant que l'entrepreneuriat t'interesse")
- **Benefices** : Integration des elements cles (coaching individuel sur mesure, plateforme e-learning dediee, pitch final devant 30 decideurs, test marche en conditions reelles)
- **Stats** : Ajout de "95 projets deja accompagnes" comme preuve sociale
- **FAQ** : Ajout question sur les soft skills et l'experience CV
- **Meta SEO** : Enrichissement des keywords avec #Entrepreneuriat #Etudiants #Innovation #Toulouse #Coaching #Pedagogie

### Fichiers modifies


| Fichier                          | Modification                                                            |
| -------------------------------- | ----------------------------------------------------------------------- |
| `src/pages/Index.tsx`            | Texte banner enrichi                                                    |
| `src/pages/Croissance.tsx`       | Texte banner enrichi                                                    |
| `src/pages/Education.tsx`        | Texte banner enrichi                                                    |
| `src/pages/NiteoCandidature.tsx` | Hero, intro, benefices, dotations, FAQ, SEO enrichis avec les mots-cles |
