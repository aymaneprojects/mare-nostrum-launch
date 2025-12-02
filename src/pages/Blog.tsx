import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";

// Interface pour les articles
export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  slug: string;
  image: string;
}

// Articles sur l'entrepreneuriat étudiant
export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    title: "Comment créer son entreprise quand on est étudiant ?",
    excerpt: "Guide complet pour lancer votre première entreprise tout en poursuivant vos études. Découvrez les étapes clés, les aides disponibles et les erreurs à éviter.",
    content: `
## Introduction

Créer une entreprise en tant qu'étudiant est une aventure passionnante qui peut transformer votre parcours professionnel. De plus en plus de jeunes se lancent dans l'entrepreneuriat pendant leurs études, profitant d'un environnement propice à l'innovation et à la prise de risques.

## Les avantages de créer en étant étudiant

**1. Le statut étudiant-entrepreneur**
Depuis 2014, le statut national étudiant-entrepreneur (SNEE) permet aux étudiants de bénéficier d'un accompagnement spécifique et de concilier études et création d'entreprise.

**2. L'accès aux incubateurs universitaires**
Les écoles et universités proposent souvent des programmes d'accompagnement, des espaces de coworking et un réseau de mentors.

**3. Les aides financières dédiées**
- Bourse French Tech
- Prêts d'honneur
- Concours étudiants
- Subventions régionales

## Les étapes clés

### Étape 1 : Valider son idée
Avant de vous lancer, testez votre concept auprès de potentiels clients. Réalisez une étude de marché et identifiez votre proposition de valeur unique.

### Étape 2 : Choisir son statut juridique
Pour commencer simplement, la micro-entreprise est souvent recommandée. Elle offre une gestion simplifiée et s'adapte parfaitement à une activité parallèle aux études.

### Étape 3 : S'entourer
Rejoignez une communauté d'entrepreneurs étudiants. Le réseau est essentiel pour progresser et éviter les erreurs classiques.

### Étape 4 : Gérer son temps
Établissez un planning réaliste entre vos cours et votre projet. Priorisez les tâches à forte valeur ajoutée.

## Les erreurs à éviter

- Négliger ses études au profit du projet
- Sous-estimer le temps nécessaire
- Ne pas valider son marché avant de se lancer
- Travailler seul sans demander de l'aide

## Conclusion

L'entrepreneuriat étudiant est une formidable école de la vie. N'attendez pas d'avoir le projet parfait pour vous lancer : commencez petit, apprenez vite, et itérez constamment.
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-20",
    category: "Création",
    slug: "creer-entreprise-etudiant-guide",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  },
  {
    id: "2",
    title: "Quel statut juridique choisir pour son projet étudiant ?",
    excerpt: "Micro-entreprise, SASU, SAS... Comprendre les différents statuts juridiques pour faire le bon choix selon votre projet et votre situation.",
    content: `
## Le choix du statut : une décision stratégique

Le choix du statut juridique est l'une des premières décisions importantes pour tout entrepreneur. En tant qu'étudiant, ce choix doit prendre en compte votre situation particulière.

## La micro-entreprise : le choix de la simplicité

**Avantages :**
- Création rapide et gratuite
- Comptabilité simplifiée
- Charges sociales proportionnelles au chiffre d'affaires
- Compatible avec le statut étudiant

**Inconvénients :**
- Plafond de chiffre d'affaires (77 700€ pour les services)
- Pas de déduction des charges
- Responsabilité illimitée

**Idéal pour :** Les projets de services, freelance, petite activité e-commerce

## La SASU : pour voir grand

**Avantages :**
- Responsabilité limitée aux apports
- Image professionnelle
- Flexibilité de gestion
- Possibilité de lever des fonds

**Inconvénients :**
- Formalités de création plus complexes
- Coûts de gestion plus élevés
- Obligations comptables strictes

**Idéal pour :** Les projets ambitieux avec potentiel de croissance

## L'association : pour les projets à impact

Si votre projet a une vocation sociale ou environnementale sans but lucratif, l'association peut être pertinente.

**Avantages :**
- Création simple et gratuite
- Accès à des subventions spécifiques
- Image engagée

## Comment choisir ?

### Posez-vous les bonnes questions :

1. **Quel est mon chiffre d'affaires prévisionnel ?**
Si moins de 70 000€, la micro-entreprise suffit généralement.

2. **Ai-je des charges importantes ?**
Si oui, un statut permettant la déduction des charges sera plus avantageux.

3. **Ai-je besoin de lever des fonds ?**
Les investisseurs préfèrent généralement les sociétés (SAS, SASU).

4. **Quel est mon niveau de risque ?**
Pour une activité à risque, protégez votre patrimoine personnel avec une société.

## Notre conseil

Commencez simple avec une micro-entreprise pour tester votre marché. Vous pourrez toujours évoluer vers un statut plus adapté quand votre activité se développera.
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-18",
    category: "Juridique",
    slug: "statut-juridique-projet-etudiant",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
  },
  {
    id: "3",
    title: "Les 10 erreurs fatales de l'entrepreneur étudiant",
    excerpt: "Évitez les pièges classiques qui font échouer de nombreux projets étudiants. Retours d'expérience et conseils pratiques pour réussir.",
    content: `
## Apprendre des erreurs des autres

L'entrepreneuriat est un parcours d'apprentissage. Voici les 10 erreurs les plus courantes chez les entrepreneurs étudiants et comment les éviter.

## Erreur 1 : Ne pas valider son idée

**Le problème :** Passer des mois à développer un produit sans jamais demander l'avis de potentiels clients.

**La solution :** Parlez à 50 personnes de votre cible avant d'écrire une ligne de code ou de créer votre produit. Leurs retours valent de l'or.

## Erreur 2 : Vouloir tout faire seul

**Le problème :** Penser qu'on peut tout gérer : développement, commercial, marketing, comptabilité...

**La solution :** Entourez-vous. Trouvez des associés complémentaires ou déléguez les tâches où vous n'êtes pas expert.

## Erreur 3 : Négliger ses études

**Le problème :** Se laisser absorber par le projet au point d'échouer ses examens.

**La solution :** Établissez un planning strict. Vos études restent votre filet de sécurité.

## Erreur 4 : Se lancer sans plan financier

**Le problème :** Ne pas savoir combien coûte le projet ni comment le financer.

**La solution :** Faites un business plan simple avec vos besoins de financement sur 12 mois.

## Erreur 5 : Ignorer la concurrence

**Le problème :** Croire que son idée est unique et qu'il n'existe pas de concurrents.

**La solution :** Analysez vos concurrents directs et indirects. Comprenez ce qui vous différencie.

## Erreur 6 : Sous-estimer le temps nécessaire

**Le problème :** Penser pouvoir lancer en 3 mois ce qui en prendra 12.

**La solution :** Multipliez vos estimations par 3. Prévoyez des marges dans votre planning.

## Erreur 7 : Perfectionniser au lieu de lancer

**Le problème :** Attendre que tout soit parfait pour se lancer.

**La solution :** Adoptez la méthode MVP (Minimum Viable Product). Lancez vite, apprenez, itérez.

## Erreur 8 : Ne pas se former

**Le problème :** Foncer tête baissée sans acquérir les compétences entrepreneuriales de base.

**La solution :** Suivez des formations, lisez des livres, rejoignez un programme d'accompagnement.

## Erreur 9 : Mauvaise gestion de trésorerie

**Le problème :** Ne pas anticiper ses entrées et sorties d'argent.

**La solution :** Tenez un tableau de trésorerie simple et anticipez toujours 3 mois à l'avance.

## Erreur 10 : Abandonner trop tôt

**Le problème :** Se décourager aux premiers obstacles.

**La solution :** L'entrepreneuriat est un marathon. Chaque échec est une leçon. Persévérez intelligemment.

## Conclusion

Ces erreurs sont normales et font partie du parcours. L'important est d'en prendre conscience pour les éviter ou les corriger rapidement.
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-15",
    category: "Conseils",
    slug: "erreurs-entrepreneur-etudiant",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
  },
  {
    id: "4",
    title: "Financer son projet étudiant : toutes les aides disponibles",
    excerpt: "De la bourse French Tech aux concours en passant par les prêts d'honneur, découvrez toutes les sources de financement pour votre projet.",
    content: `
## Le financement : nerf de la guerre entrepreneuriale

Bonne nouvelle : de nombreuses aides existent spécifiquement pour les entrepreneurs étudiants. Voici un panorama complet.

## Les aides nationales

### Le statut national étudiant-entrepreneur (SNEE)

Ce statut donne accès à :
- Un accompagnement dans un PEPITE
- La possibilité de remplacer un stage par votre projet
- Un réseau de mentors et d'experts

### La bourse French Tech

- Jusqu'à 30 000€ pour les projets innovants
- Versée en deux fois (création puis développement)
- Conditions : moins de 25 ans, projet innovant

### Les prêts d'honneur

- Prêts à taux zéro de 2 000€ à 50 000€
- Sans garantie personnelle
- Délivrés par Initiative France, Réseau Entreprendre...

## Les aides régionales

Chaque région propose ses propres dispositifs :
- Aides à la création d'entreprise
- Chèques innovation
- Bourses régionales pour entrepreneurs

Renseignez-vous auprès de votre conseil régional ou de la CCI locale.

## Les concours et prix

### Concours nationaux
- Prix PEPITE Tremplin (20 000€)
- Concours i-Lab (jusqu'à 600 000€)
- Challenge Entrepreneuriat Étudiant

### Concours d'écoles
De nombreuses écoles organisent leurs propres concours avec des dotations significatives.

## Le crowdfunding

Le financement participatif est idéal pour :
- Valider l'intérêt du marché
- Constituer une première communauté
- Financer un premier prototype

Plateformes recommandées : Ulule, KissKissBankBank, Kickstarter

## Les business angels

Pour les projets à fort potentiel :
- Investissement de 10 000€ à 500 000€
- Apport d'expertise et de réseau
- En échange de parts dans l'entreprise

## Notre stratégie recommandée

1. **Phase 1 - Démarrage :** Prêt d'honneur + aides régionales
2. **Phase 2 - Validation :** Crowdfunding + concours
3. **Phase 3 - Croissance :** Business angels + bourse French Tech

## Conseils pour maximiser vos chances

- Préparez un dossier solide avec un business plan clair
- Entraînez-vous à pitcher votre projet
- Ne comptez jamais sur une seule source de financement
- Commencez les démarches 6 mois avant le besoin

## Conclusion

L'argent existe pour les bons projets. La clé est de bien se préparer et de persévérer dans ses recherches de financement.
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-12",
    category: "Financement",
    slug: "financer-projet-etudiant-aides",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
  },
  {
    id: "5",
    title: "Business plan étudiant : modèle et conseils",
    excerpt: "Comment rédiger un business plan convaincant quand on débute ? Structure, conseils et modèle téléchargeable pour votre projet étudiant.",
    content: `
## Pourquoi faire un business plan ?

Le business plan n'est pas qu'une formalité administrative. C'est un outil de réflexion qui vous aide à structurer votre projet et à convaincre vos partenaires.

## La structure d'un business plan efficace

### 1. Executive Summary (1 page)

Résumez votre projet en une page :
- Votre concept en 3 lignes
- Le problème que vous résolvez
- Votre solution
- Votre marché cible
- Votre modèle économique
- Vos besoins de financement

### 2. Présentation du projet

- Genèse de l'idée
- Vision et mission
- Valeurs de l'entreprise

### 3. Étude de marché

- Taille du marché
- Tendances et évolutions
- Analyse de la concurrence
- Positionnement

### 4. Offre et proposition de valeur

- Description détaillée de votre produit/service
- Ce qui vous différencie
- Avantages pour le client

### 5. Stratégie commerciale

- Cible client (persona)
- Canaux d'acquisition
- Politique de prix
- Plan de communication

### 6. Organisation et équipe

- Présentation des fondateurs
- Compétences clés
- Besoins en recrutement

### 7. Prévisions financières

- Compte de résultat prévisionnel (3 ans)
- Plan de trésorerie
- Seuil de rentabilité
- Besoins de financement

## Conseils pour un business plan convaincant

### Soyez concis
- 15-20 pages maximum
- Allez droit au but
- Utilisez des visuels

### Soyez réaliste
- Hypothèses prudentes
- Scénarios alternatifs
- Risques identifiés

### Soyez cohérent
- Chiffres alignés
- Stratégie claire
- Storytelling fluide

## Les erreurs à éviter

- Prévisions financières trop optimistes
- Sous-estimer la concurrence
- Oublier les charges fixes
- Ne pas expliquer son modèle économique

## Adapter son business plan à l'interlocuteur

- **Pour un banquier :** Insistez sur la sécurité et la capacité de remboursement
- **Pour un investisseur :** Mettez en avant le potentiel de croissance
- **Pour un concours :** Soulignez l'innovation et l'impact

## Conclusion

Votre business plan est vivant. Mettez-le à jour régulièrement et utilisez-le comme boussole pour votre projet.
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-10",
    category: "Création",
    slug: "business-plan-etudiant-modele",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
  },
  {
    id: "6",
    title: "Concilier études et entrepreneuriat : conseils pratiques",
    excerpt: "Comment gérer son temps entre cours, examens et projet entrepreneurial ? Méthodes et outils pour réussir sur les deux fronts.",
    content: `
## Le défi du double engagement

Être étudiant-entrepreneur, c'est mener deux vies en parallèle. Voici comment réussir cet équilibre délicat.

## Organiser son temps efficacement

### La méthode des blocs de temps

Divisez votre semaine en blocs dédiés :
- **Blocs études :** Cours, révisions, travaux de groupe
- **Blocs projet :** Développement, commercial, administratif
- **Blocs perso :** Sport, amis, repos (essentiels !)

### La règle des 2 heures

Consacrez au minimum 2 heures par jour à votre projet, même pendant les périodes d'examens. Cette régularité maintient la dynamique.

### Le batch processing

Regroupez les tâches similaires :
- Une demi-journée pour les emails et administratif
- Une demi-journée pour le développement produit
- Une demi-journée pour le commercial

## Les outils indispensables

### Gestion de projet
- Notion : organisation complète
- Trello : suivi des tâches
- Asana : collaboration en équipe

### Productivité
- Calendrier partagé (Google Calendar)
- Pomodoro Timer
- Forest (pour éviter les distractions)

### Communication
- Slack pour l'équipe
- WhatsApp pour les urgences
- Email pour le formel

## Optimiser ses études

### Négocier avec votre école

Le statut étudiant-entrepreneur permet :
- Aménagement d'emploi du temps
- Substitution de stage par le projet
- Reconnaissance du projet dans le cursus

Parlez-en à votre responsable pédagogique !

### Maximiser l'apprentissage

- Choisissez des projets de cours liés à votre entreprise
- Utilisez vos travaux académiques pour avancer sur votre projet
- Créez des synergies entre théorie et pratique

## Préserver son équilibre

### Les signaux d'alerte
- Fatigue chronique
- Notes en chute
- Projet qui stagne
- Vie sociale inexistante

### Les solutions
- Déléguer davantage
- Revoir ses priorités
- Prendre des pauses
- Demander de l'aide

## Le rôle de l'entourage

- Expliquez votre projet à vos proches
- Acceptez leur soutien
- Définissez des moments dédiés
- Communiquez sur vos contraintes

## Témoignages d'étudiants-entrepreneurs

> "J'ai appris à dire non. On ne peut pas tout faire, il faut choisir ses batailles." - Sophie, 23 ans

> "Mon école m'a beaucoup soutenu. N'hésitez pas à demander des aménagements." - Thomas, 24 ans

## Conclusion

La clé, c'est l'organisation et la communication. N'essayez pas d'être parfait partout : visez l'excellence là où ça compte vraiment.
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-08",
    category: "Conseils",
    slug: "concilier-etudes-entrepreneuriat",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
  },
  {
    id: "7",
    title: "Pitcher son projet : les techniques qui font la différence",
    excerpt: "Apprenez à présenter votre projet de façon percutante en 1, 3 ou 10 minutes. Structure, storytelling et erreurs à éviter.",
    content: `
## L'art du pitch

Savoir pitcher son projet est une compétence essentielle pour tout entrepreneur. Que ce soit face à un investisseur, un jury de concours ou un potentiel client, vous devez convaincre en un temps limité.

## Les différents formats de pitch

### L'elevator pitch (30 secondes - 1 minute)

Structure recommandée :
1. Le problème (10 sec)
2. Votre solution (10 sec)
3. Votre différenciation (10 sec)
4. Call to action (10 sec)

**Exemple :**
"Saviez-vous que 70% des étudiants entrepreneurs abandonnent faute d'accompagnement adapté ? Chez [Projet], nous proposons un programme de mentorat entre pairs qui triple les chances de succès. Contrairement aux incubateurs classiques, notre approche est 100% gratuite et accessible 24/7. Rejoignez nos 500 membres actifs."

### Le pitch 3 minutes

Ajoutez à l'elevator pitch :
- Présentation de l'équipe
- Taille du marché
- Modèle économique
- Traction actuelle

### Le pitch 10 minutes

Version complète avec :
- Démonstration produit
- Prévisions financières détaillées
- Plan de développement
- Questions / réponses

## Les techniques de storytelling

### La structure "Avant / Après"
Montrez le monde sans votre solution, puis avec. Le contraste crée l'impact.

### La technique du héros
Votre client est le héros. Vous êtes le guide qui l'aide à surmonter un obstacle.

### L'anecdote fondatrice
Racontez pourquoi vous avez créé ce projet. L'authenticité touche.

## Les erreurs fatales

### À éviter absolument
- Commencer par "Bonjour, je m'appelle..."
- Utiliser du jargon technique
- Lire ses notes
- Dépasser le temps imparti
- Ne pas regarder son audience

### Les signaux faibles
- Voix monotone
- Mains dans les poches
- Slides surchargés
- Manque d'enthousiasme

## Préparer son pitch

### Répétez, répétez, répétez
- Devant un miroir
- En vous filmant
- Devant des amis
- Devant des inconnus

### Anticipez les questions
Préparez des réponses aux questions classiques :
- "Et si Google fait la même chose ?"
- "Comment allez-vous monétiser ?"
- "Pourquoi vous ?"

## Les slides qui marchent

### Règles d'or
- Une idée par slide
- Peu de texte, beaucoup de visuels
- Chiffres clés mis en valeur
- Police lisible (minimum 24pt)

### Structure type (10 slides)
1. Accroche
2. Problème
3. Solution
4. Démo
5. Marché
6. Business model
7. Concurrence
8. Équipe
9. Traction
10. Ask

## Conclusion

Un bon pitch ne s'improvise pas. Plus vous pratiquez, plus vous serez à l'aise. Et n'oubliez pas : votre passion est contagieuse !
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-05",
    category: "Communication",
    slug: "pitcher-projet-techniques",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
  },
  {
    id: "8",
    title: "Trouver son premier client quand on est étudiant",
    excerpt: "Les stratégies efficaces pour décrocher vos premiers clients sans budget marketing. Réseau, partenariats et techniques de prospection.",
    content: `
## Le premier client : une étape cruciale

Votre premier client valide votre concept et lance la machine. Voici comment le trouver.

## Commencer par son réseau

### Le cercle 1 : famille et amis
Ne négligez pas votre entourage. Ils peuvent :
- Être vos premiers clients
- Vous recommander
- Vous mettre en contact avec des prospects

### Le cercle 2 : votre école
- Camarades de promotion
- Anciens élèves (alumni)
- Professeurs et administration
- Entreprises partenaires

### Le cercle 3 : communautés entrepreneuriales
- Incubateurs et pépites
- Meetups et événements
- Groupes LinkedIn et Facebook

## Les techniques de prospection

### Le cold emailing
- Personnalisez chaque message
- Soyez bref et allez à l'essentiel
- Proposez de la valeur, pas un pitch
- Relancez (poliment) après 3-5 jours

**Template efficace :**
"Bonjour [Prénom],

J'ai vu que [élément personnalisé]. Chez [entreprise], nous aidons [cible] à [bénéfice].

Seriez-vous disponible 15 min cette semaine pour en discuter ?

[Votre prénom]"

### LinkedIn
- Optimisez votre profil
- Publiez du contenu de valeur
- Commentez les posts de votre cible
- Envoyez des messages personnalisés

### Les événements
- Salons professionnels
- Conférences et meetups
- Afterworks entrepreneurs
- Journées portes ouvertes

## Offrir avant de vendre

### La stratégie du "give first"
- Offrez une ressource gratuite (guide, template)
- Proposez un diagnostic gratuit
- Partagez des conseils sans attendre de retour

Cette approche crée de la confiance et génère des opportunités naturellement.

## Les partenariats stratégiques

### Identifier les partenaires potentiels
Qui touche votre cible sans être concurrent ?
- Prestataires complémentaires
- Associations professionnelles
- Influenceurs de votre secteur

### Proposer un partenariat gagnant-gagnant
- Co-création de contenu
- Recommandation mutuelle
- Offre packagée

## Transformer l'essai

### La première rencontre
- Écoutez plus que vous ne parlez
- Posez des questions ouvertes
- Comprenez le vrai besoin
- Ne vendez pas, conseillez

### La proposition commerciale
- Reformulez le besoin du client
- Présentez votre solution adaptée
- Soyez transparent sur le prix
- Proposez un engagement léger

## Fidéliser dès le départ

### Un premier client satisfait vaut 10 prospects
- Surpassez les attentes
- Demandez des retours
- Sollicitez une recommandation
- Restez en contact

## Conclusion

Votre premier client est là, quelque part dans votre réseau. Osez demander, osez proposer. Le pire qu'on puisse vous dire, c'est non.
    `,
    author: "Mare Nostrum",
    publishedAt: "2025-01-03",
    category: "Commercial",
    slug: "trouver-premier-client-etudiant",
    image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&q=80"
  },
  {
    id: "9",
    title: "L'impact entrepreneurial : entreprendre autrement",
    excerpt: "Comment créer une entreprise qui génère un impact positif sur la société et l'environnement tout en étant rentable ?",
    content: `
## L'entrepreneuriat à impact : une nouvelle vision

De plus en plus d'entrepreneurs choisissent de créer des entreprises qui allient performance économique et impact positif. Une tendance particulièrement forte chez les jeunes générations.

## Qu'est-ce que l'entrepreneuriat à impact ?

### Définition
Une entreprise à impact cherche à résoudre un problème social ou environnemental tout en développant un modèle économique viable.

### Les différentes formes
- **Entreprise sociale :** La mission sociale est au cœur du modèle
- **Entreprise à mission :** Statut juridique formalisant les engagements
- **B-Corp :** Certification internationale d'impact
- **ESS :** Économie sociale et solidaire (coopératives, associations)

## Les 17 ODD comme boussole

Les Objectifs de Développement Durable des Nations Unies offrent un cadre pour identifier les enjeux à adresser :
- Fin de la pauvreté
- Éducation de qualité
- Égalité des sexes
- Énergie propre
- Travail décent
- Consommation responsable
- Action climatique
- etc.

## Mesurer son impact

### Les indicateurs clés
- Impact social : bénéficiaires, changements de comportement
- Impact environnemental : émissions évitées, déchets réduits
- Impact économique : emplois créés, revenus générés

### Les outils de mesure
- Théorie du changement
- Social Return on Investment (SROI)
- Impact Score
- Bilan carbone

## Les modèles économiques de l'impact

### 1. Le modèle "One for One"
Pour chaque produit vendu, un produit ou service est offert à quelqu'un dans le besoin.

### 2. Le modèle emploi insertion
Créer des emplois pour des publics éloignés du marché du travail.

### 3. Le modèle économie circulaire
Réutiliser, recycler, réduire les déchets à chaque étape.

### 4. Le modèle impact direct
Le produit/service lui-même résout le problème social ou environnemental.

## Financer l'impact

### Les financeurs spécialisés
- France Active
- FAIR (ex-Finansol)
- Impact investing funds
- Fondations

### Les labels et certifications
- Agrément ESUS
- Certification B-Corp
- Label Lucie
- Entreprise à mission

## Les défis de l'entrepreneur à impact

### Trouver l'équilibre
Comment maximiser l'impact sans sacrifier la viabilité économique ?

### Éviter le greenwashing
Être authentique et transparent dans sa communication impact.

### Mesurer le réel impact
Aller au-delà des intentions pour prouver les résultats.

## Conclusion

L'entrepreneuriat à impact n'est pas une mode mais une transformation profonde de l'économie. En tant qu'étudiant, vous avez l'opportunité de construire dès le départ une entreprise qui a du sens.
    `,
    author: "Mare Nostrum",
    publishedAt: "2024-12-28",
    category: "Impact",
    slug: "impact-entrepreneurial-entreprendre-autrement",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
  },
  {
    id: "10",
    title: "Les meilleures ressources pour entrepreneurs étudiants",
    excerpt: "Livres, podcasts, formations, communautés... Notre sélection des ressources indispensables pour progresser dans votre aventure entrepreneuriale.",
    content: `
## Se former en continu

L'entrepreneuriat s'apprend. Voici notre sélection des meilleures ressources pour progresser.

## Les livres incontournables

### Pour débuter
- **"Lean Startup"** d'Eric Ries : La méthode pour tester rapidement ses idées
- **"Zero to One"** de Peter Thiel : Comment créer l'innovation
- **"The Mom Test"** de Rob Fitzpatrick : Comment parler à ses clients

### Pour approfondir
- **"Influence et manipulation"** de Robert Cialdini : Comprendre la psychologie de la vente
- **"Deep Work"** de Cal Newport : Maximiser sa productivité
- **"Thinking, Fast and Slow"** de Daniel Kahneman : Comprendre les décisions

### En français
- **"La semaine de 4 heures"** de Tim Ferriss
- **"Réinventer son business model"** de Michel Santi
- **"L'art de se lancer"** de Guy Kawasaki

## Les podcasts à suivre

### En français
- **Génération Do It Yourself** : Interviews d'entrepreneurs inspirants
- **Le Gratin** : Parcours d'entrepreneurs
- **Growth Makers** : Marketing et croissance
- **Impact Positif** : Entrepreneuriat à impact

### En anglais
- **How I Built This** (NPR) : Histoires de création d'entreprises
- **The Tim Ferriss Show** : Interviews de top performers
- **Masters of Scale** : Conseils de Reid Hoffman (LinkedIn)

## Les formations en ligne

### Gratuites
- **OpenClassrooms** : Parcours entrepreneur
- **Coursera** : Cours de grandes universités
- **YouTube** : Chaînes spécialisées

### Payantes (à valeur ajoutée)
- **LiveMentor** : Formations avec mentorat
- **Schoolab** : Programmes d'innovation
- **The Family** : Accompagnement startup

## Les communautés à rejoindre

### Nationales
- **French Tech** : L'écosystème startup français
- **PEPITE France** : Réseau des étudiants-entrepreneurs
- **Moovjee** : Mouvement pour les jeunes entrepreneurs

### Locales
- **Incubateurs universitaires**
- **BPI France** : Ressources et événements
- **CCI locales** : Accompagnement territoire

### En ligne
- **Groupes LinkedIn** spécialisés
- **Discord** entrepreneurs
- **Reddit** r/Entrepreneur

## Les outils du quotidien

### Productivité
- Notion : Organisation complète
- Calendly : Prise de RDV
- Loom : Vidéos rapides

### Design
- Canva : Visuels faciles
- Figma : Maquettes
- Unsplash : Photos libres

### Marketing
- Mailchimp : Emailing
- Buffer : Réseaux sociaux
- Google Analytics : Suivi site web

### Finance
- Wave : Facturation gratuite
- Qonto : Compte pro
- Pennylane : Comptabilité

## Les événements à ne pas manquer

### Annuels
- **Salon des Entrepreneurs** (février)
- **VivaTech** (juin)
- **BIG** (octobre)

### Locaux
- Meetups entrepreneurs
- Startup weekends
- Hackathons

## Conclusion

Ces ressources sont un point de départ. Le plus important reste de passer à l'action et d'apprendre en faisant. Bonne lecture, bon visionnage, et surtout... bonne création !
    `,
    author: "Mare Nostrum",
    publishedAt: "2024-12-20",
    category: "Ressources",
    slug: "ressources-entrepreneurs-etudiants",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
  }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrer les articles selon la recherche et la catégorie
  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(blogArticles.map(a => a.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Blog Entrepreneuriat Étudiant - Mare Nostrum | Conseils et Ressources"
        description="Guides pratiques pour créer son entreprise en étant étudiant. Statuts juridiques, financement, business plan, pitch... Ressources gratuites par Mare Nostrum."
        keywords="blog entrepreneuriat étudiant, créer entreprise étudiant, statut juridique étudiant, financement projet étudiant, business plan étudiant"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Blog Entrepreneuriat Étudiant
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Guides pratiques et ressources pour lancer votre projet
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/95 backdrop-blur"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filtres par catégorie */}
      <section className="py-8 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedCategory(null)}
            >
              Tous les articles
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Aucun article trouvé pour votre recherche.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  {article.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{article.category}</Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Lire l'article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;