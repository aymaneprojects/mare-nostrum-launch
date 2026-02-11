

# Plan : Creation de la page Niteo Toulouse

## Resume

Creation d'une landing page `/niteo-toulouse` avec ajout dans la navbar sous "Offres" avec le label "Niteo Toulouse". La page reprend exactement la meme structure et le meme design que les pages Education et Croissance (Header, SEOHead, Breadcrumbs, sections alternees, Footer).

## Assets a copier

Les photos uploadees seront copiees dans `src/assets/niteo/` :

| Fichier source | Destination | Usage |
|---|---|---|
| Logo_NITEO26_Fonce_1.png | src/assets/niteo/logo-niteo.png | Logo hero + page |
| bertrand-serp.png | src/assets/niteo/bertrand-serp.png | Parrain section |
| aymane-abdennour.jpeg | src/assets/niteo/aymane-abdennour.jpeg | Equipe |
| geraldin-lecaer.jpeg | src/assets/niteo/geraldin-lecaer.jpeg | Equipe |
| frederique_bertelet.jpeg | src/assets/niteo/frederique-bertelet.jpeg | Equipe |
| benjamin_lebailly.jpeg | src/assets/niteo/benjamin-lebailly.jpeg | Equipe |
| jean-baptiste_prost.jpeg | src/assets/niteo/jean-baptiste-prost.jpeg | Equipe |
| ludovic.jpeg | src/assets/niteo/ludovic-de-gromard.jpeg | Equipe |
| pascal_david.jpeg | src/assets/niteo/pascal-david.jpeg | Equipe |
| abdallah.jpeg | src/assets/niteo/abdallah-hassani.jpeg | Equipe |

Photo d'Alexis Janicot : reutilisation de `src/assets/team/alexis-janicot.png` deja present dans le projet.

## Structure de la page (src/pages/NiteoToulouse.tsx)

### Section 1 -- Hero
- Logo Niteo 2026 centre en haut
- Titre : "Niteo by Mare Nostrum -- Edition Toulouse 2026"
- Sous-titre : "Accelerez l'insertion professionnelle de vos etudiants entrepreneurs"
- Description : Programme de 50h pour cycles licence et master
- CTA : "Rejoindre Niteo 2026" vers /contact
- Design : gradient from-primary to-accent comme les autres pages

### Section 2 -- Les enjeux pedagogiques
4 cartes (meme style que la section "enjeux des etablissements" de /education) :
- Attirer plus d'etudiants avec des formations alignees
- Developper les competences transversales (learning by doing)
- Structurer une communaute d'alumni engagee
- Renforcer l'image d'insertion professionnelle

### Section 3 -- Pourquoi Niteo
- Explication du nom ("briller, prosperer" en latin)
- 3 points cles avec icones

### Section 4 -- Le parcours de 50 heures
4 blocs visuels avec icones :
- 19h de e-learning
- 24h de sessions collectives
- 2h de coaching individuel
- Jury de professionnels (demo day)

### Section 5 -- 3 resultats immediats
3 colonnes (meme style que la section "Resultats" de /education) :
- Pedagogie eprouvee
- Ecosysteme mobilise (30 decideurs, +10 000 EUR dotations)
- Structure optimisee (cle en main, plateforme numerique)

### Section 6 -- Parrain
Photo de Bertrand SERP avec son titre "Vice-President de Toulouse Metropole"

### Section 7 -- Calendrier
Timeline visuelle avec les dates cles :
- Mars : Appel a candidatures
- Avril : Selection
- Avril-Juin : 4 ateliers collectifs (samedis)
- 16 juin : Demo Day

### Section 8 -- Les 3 options tarifaires
3 cartes comparatives (style similaire aux offres de /education) :
- SOUTIEN : a votre convenance
- ENGAGEMENT : 500 EUR HT
- PIONNIER : a partir de 1 500 EUR HT

### Section 9 -- L'equipe Niteo
Grille de photos avec noms et roles :
- Entrepreneurs conseil : Alexis Janicot, Aymane Abdennour, Geraldine Le Caer, Frederique Bertelet, Benjamin Lebailly, Jean-Baptiste Prost, Ludovic De Gromard
- Coachs : Pascal David, Abdallah Hassani
- Experts : placeholders texte (photos a venir)

### Section 10 -- Partenaires ecosysteme
Reutilisation des logos partenaires deja presents (Airbus, Credit Mutuel, CPME31, Moovjee, Touleco, etc.)

### Section 11 -- FAQ
Questions frequentes sur le programme

### Section 12 -- CTA final
"Rejoignez Niteo Toulouse 2026" avec bouton vers /contact

## Modifications des fichiers existants

### src/App.tsx
- Import de NiteoToulouse
- Ajout de la route `/niteo-toulouse`

### src/components/Header.tsx
- Ajout de "Niteo Toulouse" dans le tableau `offres` avec `to: "/niteo-toulouse"`

### public/sitemap.xml
- Ajout de l'URL /niteo-toulouse

## SEO
- SEOHead avec titre optimise pour "programme entrepreneuriat etudiant Toulouse 2026"
- Schema.org de type Course + Event
- Breadcrumbs : Accueil > Niteo Toulouse
- FAQ Schema integre

## Elements en attente
- Photos des experts (Jean Jodeau, Claire Virazels, etc.) : a fournir plus tard
- Photo de l'edition 2025 precedente : a fournir plus tard

