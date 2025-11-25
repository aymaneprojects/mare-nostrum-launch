import { Leaf, Users, Recycle, Heart, TrendingUp, Shield, Award, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import impactScoreImage from "@/assets/impact-score-79.png";
import entreprisesEngagentImage from "@/assets/entreprises-engagent.png";

const EngagementRSE = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Engagement RSE - Mare Nostrum"
        description="Découvrez nos engagements RSE : environnement, social, gouvernance. Société à mission depuis 2025, nous contribuons au développement durable et solidaire."
        keywords="RSE, développement durable, société à mission, impact social, environnement, gouvernance"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-primary-foreground font-medium">Société à mission depuis septembre 2025</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Nos engagements RSE
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Un engagement porté par la gouvernance de l'entreprise
            </p>
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Award className="h-6 w-6 text-primary-foreground" />
              <span className="text-primary-foreground font-semibold">Impact Score 2025 : 79/100</span>
              <span className="text-primary-foreground/80">Top 5% en Occitanie</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Chez Mare Nostrum, l'engagement est au cœur de notre vision et de notre action. Nous sommes une petite 
              entreprise située à Toulouse, la ville rose du sud de la France. En tant que société à mission depuis 
              septembre 2025, notre stratégie RSE s'incarne dans un cadre structuré, transparent et dynamique, où la 
              gouvernance engagée pilote nos initiatives en cohérence avec notre raison d'être : contribuer au 
              développement durable et solidaire en renforçant les capacités des entreprises à devenir des acteurs plus 
              efficaces de la coopération territoriale, de la protection du vivant et de l'inclusion de publics vulnérables.
            </p>
          </div>
        </div>
      </section>

      {/* Objectifs Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos cinq objectifs sociaux et environnementaux
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <p className="text-foreground">
                Sensibiliser et former les néo-entrepreneurs à intégrer les transitions sociales, écologiques et 
                géopolitiques dans leurs pratiques
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <p className="text-foreground">
                Accompagner la transition des entreprises et organisations vers une meilleure prise en compte du 
                développement durable et solidaire
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-foreground">
                Fédérer et animer un réseau diversifié et influent d'alliés qui adhèrent à notre raison d'être
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <p className="text-foreground">
                Favoriser les échanges entre pairs et l'apprentissage collectif au sein de notre écosystème
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <p className="text-foreground">
                Limiter les externalités négatives et animer un environnement de travail inclusif et équitable pour 
                toutes les parties prenantes internes
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Pour suivre notre raison d'être, nous avons mis en place un tableau de bord stratégique qui guide nos 
              actions et assure une transparence totale dans notre gouvernance. Nous participons également à une coalition 
              d'entreprises engagées, partageant des pratiques innovantes pour favoriser la paix et le développement 
              durable à travers nos initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Environnement Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Leaf className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nos engagements environnementaux
            </h2>
          </div>

          {/* Carbone */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-4">Carbone</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Mare Nostrum met en place un environnement de travail "neutre en carbone", porté par un engagement fort 
                et statutaire. L'entreprise mesure chaque année ses émissions carbone, finance des projets de compensation 
                et favorise les pratiques bas-carbone, notamment grâce à la digitalisation et la mobilité durable.
              </p>
              <h4 className="font-semibold text-foreground mb-3">Actions réalisées :</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Estimation annuelle des émission carbone depuis 2023</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Compensation des émissions via la <a href="https://www.goodplanet.org/fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fondation Good Planet</a></span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Installation dans un espace de coworking engagé RSE (<a href="https://citedelarse.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cité de la RSE et de l'impact</a>)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Digitalisation des activités pédagogiques (<a href="https://moodle.com/fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Moodle</a>)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Préférence des salariés pour la mobilité durable (transports en commun, vélo…)</span>
                </li>
              </ul>
              <div className="bg-primary/5 border-l-4 border-primary p-4 mb-4">
                <p className="text-foreground font-semibold">Chiffre clé :</p>
                <p className="text-muted-foreground">
                  Nos émissions carbone sont estimées annuellement à 1,68 t CO2. 100% des émissions carbone compensées 
                  grâce aux actions de la Fondation Good Planet en 2024
                </p>
              </div>
              <div className="bg-accent/5 border-l-4 border-accent p-4">
                <p className="text-foreground font-semibold mb-2">Perspectives :</p>
                <p className="text-muted-foreground">
                  Nous conservons l'objectif de mesurer et de compenser l'intégralité de nos émissions carbone, tout en 
                  essayant de limiter la croissance de nos émissions. Pour cela nous prévoyons la réalisation d'un guide 
                  interne de pratiques écoresponsables (mesure et limitation des émissions carbone, tri, éco-gestes). 
                  Par ailleurs, nous envisageons de développer un module pédagogique sur l'intégration progressive de 
                  standards durables bas carbone à destination de nos clients.
                </p>
              </div>
            </div>
          </div>

          {/* Biodiversité */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-4">Biodiversité</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                La protection du vivant fait partie intégrante de la raison d'être de Mare Nostrum. La stratégie vise à 
                sensibiliser, mobiliser le réseau, et favoriser l'adoption de comportements favorables à la biodiversité.
              </p>
              <h4 className="font-semibold text-foreground mb-3">Actions réalisées :</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Accompagnement d'entrepreneurs sur des salons dédiés (comme Pollutec) et des lieux éco-responsables (Climate House par exemple)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Financement de projets écologiques via la <a href="https://www.goodplanet.org/fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fondation Good Planet</a></span>
                </li>
              </ul>
              <div className="bg-accent/5 border-l-4 border-accent p-4">
                <p className="text-foreground font-semibold mb-2">Perspectives :</p>
                <p className="text-muted-foreground">
                  Nous prévoyons la réalisation d'un guide interne sur la protection du vivant. Par ailleurs, nous 
                  envisageons de développer un module pédagogique sur l'intégration progressive de standards durables en 
                  matière de biodiversité à destination de nos clients. Nous recherchons activement de nouveaux partenaires 
                  et experts sur la biodiversité. Notre objectif est que tous nos clients puissent intégrer des pratiques 
                  exemplaires en matière de biodiversité.
                </p>
              </div>
            </div>
          </div>

          {/* Économie circulaire */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Recycle className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Économie circulaire</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Mare Nostrum favorise l'innovation collaborative et la création d'entreprises « by design », ayant intégré 
                la démarche d'économie circulaire dans sa mission, grâce à la démocratisation de méthodologies et d'outils 
                pour les entrepreneurs à impact.
              </p>
              <h4 className="font-semibold text-foreground mb-3">Actions réalisées :</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Tri sélectif en partenariat avec <a href="https://hectorlecollector.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hector Le Collector</a> via le coworking</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Démocratisation des méthodologies et outils via <a href="https://scenari.software/fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Scenari</a> pour renforcer les compétences transversales engagées des entrepreneurs</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Pratiques de limitation des impressions papier</span>
                </li>
              </ul>
              <div className="bg-primary/5 border-l-4 border-primary p-4 mb-4">
                <p className="text-foreground font-semibold">Chiffre clé :</p>
                <p className="text-muted-foreground">
                  Accompagnement de 3 clients de l'économie circulaire en France et en Tunisie
                </p>
              </div>
              <div className="bg-accent/5 border-l-4 border-accent p-4">
                <p className="text-foreground font-semibold mb-2">Perspectives :</p>
                <p className="text-muted-foreground">
                  Nous prévoyons la réalisation d'un guide interne sur l'économie circulaire. Par ailleurs, nous envisageons 
                  de développer un module pédagogique sur l'intégration progressive de standards durables en matière 
                  d'économie circulaire à destination de nos clients. Notre objectif est que tous nos clients puissent 
                  intégrer des pratiques exemplaires en matière d'économie circulaire et de gestion des ressources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Heart className="h-8 w-8 text-accent" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nos engagements sociaux
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                L'inclusion de publics vulnérables et le bien-être au travail nourrissent la démarche sociale de Mare Nostrum. 
                L'entreprise est intergénérationnelle et interculturelle. Nos valeurs liées au co-apprentissage et au respect 
                s'adressent autant à nos collaborateurs qu'à nos parties prenantes (clients, partenaires…).
              </p>
              <h4 className="font-semibold text-foreground mb-3">Actions réalisées :</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Évaluation continue des collaborateurs</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Formations professionnelles et avantages sociaux pour les salariés</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Limitation des écarts salariaux de 1 à 3</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Promotion du respect, de la diversité et de l'inclusion dans le guide d'accueil</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Mécénat depuis 2024 auprès de l'association locale <a href="https://www.toulouseway.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Toulouse Way</a> qui facilite l'accueil et l'intégration des professionnels internationaux</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Engagement bénévole en mentorat : accompagnement de jeunes entrepreneurs via Moovjee</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Rémunération équitable femmes/hommes</span>
                </li>
              </ul>
              <div className="bg-accent/5 border-l-4 border-accent p-4">
                <p className="text-foreground font-semibold mb-2">Perspectives :</p>
                <p className="text-muted-foreground">
                  Nous avons pour projet de développer et améliorer des outils pédagogiques et d'aide à la décision en 
                  matière de climat social. Nous luttons contre toute forme de harcèlement et de discriminations et 
                  prévoyons la mise en place de formations dédiées (CNV, VHSS…).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance & Finance Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Partage de la valeur et du pouvoir
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Gouvernance */}
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-4">Gouvernance</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Transparence, confiance et gestion collaborative fondent la gouvernance de Mare Nostrum. Elle se structure 
                autour d'un conseil d'administration, d'un tableau de bord stratégique, et d'une animation de coalition et de réseau.
              </p>
              <h4 className="font-semibold text-foreground mb-3">Actions réalisées :</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Collecte de feedback continu auprès de nos clients et bénéficiaires</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Conseil d'administration réuni régulièrement</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Animation du réseau d'alliés (Le Cercle Mare Nostrum)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Organisation semestrielle d'un séminaire stratégique intégrant les salariés dans la prise de décision</span>
                </li>
              </ul>
              <div className="bg-primary/5 border-l-4 border-primary p-4 mb-4">
                <p className="text-foreground font-semibold">Chiffre clé :</p>
                <p className="text-muted-foreground">
                  Plus de 130 experts fédérés au sein du réseau Mare Nostrum en 2024
                </p>
              </div>
              <div className="bg-accent/5 border-l-4 border-accent p-4">
                <p className="text-foreground font-semibold mb-2">Perspectives :</p>
                <p className="text-muted-foreground">
                  Mise en place d'un comité de mission, qui sera assorti de la publication d'un rapport de mission. 
                  Un salarié sera intégré dans la gouvernance.
                </p>
              </div>
            </div>

            {/* Finance */}
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-4">Finance et investissement</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Mare Nostrum accompagne la création de modèles économiques durables, favorisant l'indépendance financière 
                et l'investissement à impact positif, tout en prônant sa propre autonomie et résilience financière.
              </p>
              <h4 className="font-semibold text-foreground mb-3">Actions réalisées :</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Accompagnement à la structuration de modèles économiques inclusifs</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Collaboration avec une banque à mission (<a href="https://www.cic.fr/fr/entreprises.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">le CIC</a>)</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Sélection d'experts localisés sur les territoires d'opération</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Croissance organique et endettement limité, assurant résilience financière</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-accent mt-1">•</span>
                  <span>Sociétaire de la SCIC (coopérative) <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Les Imaginations Fertiles</a></span>
                </li>
              </ul>
              <div className="bg-primary/5 border-l-4 border-primary p-4 mb-4">
                <p className="text-foreground font-semibold">Chiffre clé :</p>
                <p className="text-muted-foreground">
                  5% des bénéfices de Mare Nostrum sont investis ou dédiés dans des projets ou réseaux directement liés 
                  à nos objectifs statutaires sociaux et environnementaux
                </p>
              </div>
              <div className="bg-accent/5 border-l-4 border-accent p-4">
                <p className="text-foreground font-semibold mb-2">Perspectives :</p>
                <p className="text-muted-foreground">
                  Développement de services de conseil et d'outils pédagogiques en finance responsable (en particulier 
                  les financements non dilutifs). Réflexion sur la gestion proactive de flux financiers responsables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Pour aller plus loin : comment notre stratégie RSE est-elle implémentée ?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm mb-8">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Fidèles à notre vocation, nous participons activement à des réseaux d'entreprises qui favorisent le partage 
                de bonnes pratiques : la coalition Haute-Garonne "Les entreprises s'engagent", Planet RSE, Communauté des 
                entreprises en mission en Occitanie. Ces réseaux nous permettent de rester à la pointe des standards RSE 
                sectoriels et d'amplifier notre impact.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Chaque année, nous réalisons notre <a href="https://www.impactscore.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Impact Score</a>, un indicateur solide qui mesure et suit notre performance 
                sociale et environnementale.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Parallèlement, nous utilisons le logiciel <a href="https://2050analytics.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">2050score</a> pour identifier les meilleures pratiques dans notre 
                écosystème et orienter nos décisions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En cohérence avec notre volonté d'excellence, nous avons aussi collaboré avec un groupe d'étudiants du 
                <a href="https://www.essec.edu/fr/pages/bachelor-act/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bachelor ACT de l'ESSEC</a>, qui nous a accompagnés dans un diagnostic pour une future labellisation B Corp, 
                témoignant de notre engagement à intégrer les standards internationaux les plus exigeants.
              </p>
            </div>
            <div className="bg-primary/5 border-l-4 border-primary p-6">
              <p className="text-foreground font-semibold mb-2">Pilotage de notre feuille de route RSE :</p>
              <p className="text-muted-foreground">
                Toutes ces actions s'inscrivent dans une feuille de route RSE qui est pilotée directement par les associés 
                de la SAS Mare Nostrum et le comité de mission, lorsqu'il sera installé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-8 items-center flex-wrap">
            <img 
              src={impactScoreImage} 
              alt="Impact Score 79/100 - Mare Nostrum" 
              className="max-w-xs h-auto"
            />
            <img 
              src={entreprisesEngagentImage} 
              alt="Les Entreprises s'Engagent" 
              className="max-w-xs h-auto"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EngagementRSE;
