import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award, Zap, MessageSquare, Calendar, FileText, CheckCircle2, ArrowRight, Clock, Brain, Target, Flame, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import atelierRose from "@/assets/atelier-rose.png";
import neoEntrepreneurElite from "@/assets/neo-entrepreneur-elite.png";

type LocationType = "toulouse" | "afrique";

interface OfferFeature {
  label: string;
  tooltip: string;
}

const FeatureWithTooltip = ({ feature }: { feature: OfferFeature }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <li className="flex items-start space-x-3 cursor-help group/item">
          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors flex items-center gap-1.5">
            {feature.label}
            <Info className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0" />
          </span>
        </li>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs text-sm">
        {feature.tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const FeatureWithTooltipLight = ({ feature }: { feature: OfferFeature }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <li className="flex items-start space-x-3 cursor-help group/item">
          <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
          <span className="text-sm opacity-95 group-hover/item:opacity-100 transition-opacity flex items-center gap-1.5">
            {feature.label}
            <Info className="h-3.5 w-3.5 opacity-50 flex-shrink-0" />
          </span>
        </li>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs text-sm">
        {feature.tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Croissance = () => {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<LocationType>("toulouse");

  const communauteFeatures: OfferFeature[] = [
    {
      label: "Accès au Club International",
      tooltip: "Rencontre des nouveaux partenaires dans notre communauté d'entrepreneurs francophones de valeur, et des nouvelles opportunités"
    },
    {
      label: "Veille mutualisée entrepreneuriat",
      tooltip: "Reçois chaque mois une sélection à jour des meilleures opportunités sur l'entrepreneuriat et l'innovation, parmi des milliers de sources de données spécialisées"
    },
    {
      label: "1 rencontre mensuelle en ligne",
      tooltip: "Participe à une session de networking animée pour élargir ton réseau avec humour et bienveillance"
    },
    {
      label: "Opportunités privilégiées",
      tooltip: "Sois informé des tarifs préférentiels aux événements, des opportunités de nos partenaires et des possibilités de collaboration avec Mare Nostrum"
    },
    {
      label: "Accès à l'Académie en ligne",
      tooltip: "Développe tes compétences et tes soft skills entrepreneuriales : plus de 30 heures de formation sur les fondamentaux du business"
    }
  ];

  const groupeFeatures: OfferFeature[] = [
    {
      label: "Tout le pack Communauté +",
      tooltip: "Découvre tous les avantages dans l'offre Communauté"
    },
    {
      label: "Intégration dans un Cercle",
      tooltip: "Rejoins un petit groupe soudé d'entrepreneurs aux profils complémentaires qui s'entraident"
    },
    {
      label: "1 session mensuelle collective de business développement",
      tooltip: "Repars avec un plan d'action concret co-construit par le groupe dans chaque journée et économise chaque mois plusieurs jours de réflexion en solitaire"
    },
    {
      label: "Mises en relation partenaires & réseaux",
      tooltip: "Bénéficie de mises en relation directes avec des partenaires de Mare Nostrum à votre demande (plus de 100 partenaires clés dans l'écosystème)"
    },
    {
      label: "1 micro-mentorat (visio-galère)",
      tooltip: "Profite d'une visio individualisée, chaque mois, avec un accompagnateur pendant 20 minutes qui vous permets de débloquer une problématique clé"
    }
  ];

  const individuelFeatures: OfferFeature[] = [
    {
      label: "Tout le pack Communauté + Groupe +",
      tooltip: "Découvre tous les avantages dans l'offre Communauté et dans l'offre Groupe"
    },
    {
      label: "Accompagnement 1-to-1 IA",
      tooltip: "Implémente concrètement l'IA dans votre projet grâce à une session individuelle d'1 heure chaque mois"
    },
    {
      label: "4 micro-mentorat",
      tooltip: "Profite de quatre visio individualisées, chaque mois, avec un accompagnateur pendant 20 minutes qui vous permets de débloquer une problématique clé"
    },
    {
      label: "Ligne directe avec le fondateur de Mare Nostrum",
      tooltip: "Accède à une ligne directe pour obtenir le soutien du dirigeant de Mare Nostrum en moins de 2h : un blocage technique ? une décision stratégique urgente ? Ne reste plus jamais seul face à un imprévu !"
    }
  ];

  const croissanceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mare Nostrum Croissance - Club Entrepreneur Francophone International",
    "description": "Club international d'accompagnement entrepreneurs à impact. 24 entreprises accompagnées, 93% satisfaction, 135+ experts, 2000 ans expérience cumulée, 12 pays. Toulouse, Paris, Casablanca.",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum",
      "sameAs": "https://marenostrum.tech",
      "address": [{
        "@type": "PostalAddress",
        "addressLocality": "Toulouse",
        "addressRegion": "Occitanie",
        "addressCountry": "FR"
      }, {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      }, {
        "@type": "PostalAddress",
        "addressLocality": "Casablanca",
        "addressCountry": "MA"
      }]
    },
    "serviceType": "Accompagnement Entrepreneurial",
    "category": "Conseil en Entrepreneuriat à Impact",
    "areaServed": [
      { "@type": "Country", "name": "France" },
      { "@type": "Country", "name": "Maroc" },
      { "@type": "Country", "name": "Tunisie" },
      { "@type": "Country", "name": "Sénégal" },
      { "@type": "Country", "name": "Côte d'Ivoire" },
      { "@type": "City", "name": "Toulouse" },
      { "@type": "City", "name": "Paris" },
      { "@type": "City", "name": "Casablanca" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Offres Mare Nostrum Croissance",
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Communauté",
          "description": "Accès au club international, veille mutualisée, rencontres mensuelles, académie en ligne.",
          "category": "Offre d'entrée"
        },
        "price": "30",
        "priceCurrency": "EUR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "30.00", "priceCurrency": "EUR", "unitText": "MONTH" }
      }, {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Groupe",
          "description": "Tout de Communauté + Cercle d'entrepreneurs, sessions collectives, mises en relation partenaires.",
          "category": "Offre recommandée"
        },
        "price": "90",
        "priceCurrency": "EUR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "90.00", "priceCurrency": "EUR", "unitText": "MONTH" }
      }, {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Individuel",
          "description": "Tout de Groupe + Accompagnement 1-to-1 IA, 4 micro-mentorats, ligne directe fondateur.",
          "category": "Offre premium"
        },
        "price": "190",
        "priceCurrency": "EUR",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "190.00", "priceCurrency": "EUR", "unitText": "MONTH" }
      }]
    }
  };

  const croissanceFaqs = [{
    question: "Qui peut rejoindre Mare Nostrum Croissance ?",
    answer: "Mare Nostrum Croissance s'adresse aux entrepreneurs et dirigeants d'entreprises à impact, porteurs de projets innovants, inclusifs et durables. Que vous soyez en phase d'amorçage ou de développement, nos offres s'adaptent à votre stade de maturité."
  }, {
    question: "Quelle est la différence entre les offres Communauté, Groupe et Individuel ?",
    answer: "Communauté est l'offre d'entrée pour sortir de l'isolement avec accès au club, veille et académie. Groupe ajoute l'intégration dans un cercle d'entrepreneurs et des sessions collectives. Individuel offre un accompagnement premium avec sessions 1-to-1 IA, 4 micro-mentorats et une ligne directe avec le fondateur."
  }, {
    question: "Peut-on essayer avant de s'engager ?",
    answer: "Oui ! Pas de frais d'entrée sur toutes nos offres. Communauté inclut 1 micro mentorat offert, Groupe inclut 1 pré-diag offert, et Individuel inclut 1 tutorat personnalisé offert."
  }, {
    question: "Où se déroulent les sessions ?",
    answer: "Les sessions peuvent se dérouler en présentiel à Toulouse, Paris ou Casablanca, ou en distanciel selon vos préférences. Le Club organise également des événements réguliers dans nos pays d'intervention."
  }, {
    question: "Quels résultats puis-je attendre ?",
    answer: "50% des entrepreneurs accompagnés se rémunèrent correctement dans les 2 ans. 3 contacts qualifiés en moyenne dès le premier mois. 93% des membres se disent très satisfaits. 90% déclarent gagner du temps, de la clarté et de la sérénité."
  }];

  useEffect(() => {
    if (location.hash === "#offres") {
      const element = document.getElementById("offres");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Club Entrepreneur Toulouse & Afrique - Mare Nostrum Croissance | Accompagnement Startup"
        description="Rejoignez le Club Entrepreneur Mare Nostrum. Communauté 30EUR, Groupe 90EUR, Individuel 190EUR. 93% satisfaction. 50% se rémunèrent dans les 2 ans. Toulouse, Paris, Casablanca."
        keywords="entrepreneuriat toulouse, club entrepreneur toulouse, accompagnement startup, croissance entreprise, entrepreneur afrique francophone, mentorat entrepreneur, club entrepreneur francophone"
        structuredData={croissanceSchema}
        faqSchema={croissanceFaqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Croissance", url: "https://marenostrum.tech/croissance" }
        ]}
      />

      {/* Niteo Promotion Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-90">
            Nouveau programme entrepreneuriat <span className="inline-block mx-1.5 w-1 h-1 rounded-full bg-primary-foreground/40 align-middle"></span> Toulouse
          </span>
          <span className="hidden md:inline text-primary-foreground/40">|</span>
          <span className="text-xs md:text-sm opacity-80">
            Étudiant(e), jeune diplômé(e) ? Transforme ton idée en projet concret en 50h chrono <span className="inline-block mx-1 w-1 h-1 rounded-full bg-secondary align-middle"></span> 100% gratuit
          </span>
          <a href="https://niteo.marenostrum.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-xs md:text-sm h-7 md:h-8 px-3 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Candidater
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-primary py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Mare Nostrum Croissance</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Sécurisez la trajectoire de votre entreprise à impact
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12">
              Nous accompagnons les entrepreneurs francophones qui veulent rapidement doubler leur activité et leur impact
            </p>
            <Button size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto" onClick={() => {
              document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Rejoindre le Club
            </Button>
          </div>
        </div>
      </section>

      {/* Section 1 : Douleur Client */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
              Tu te reconnais dans ça ?
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu manques de temps</h3>
                <p className="text-sm text-muted-foreground">
                  Ton agenda ne reflète plus tes vrais objectifs ? Tu travailles 60 heures par semaine, mais ton chiffre d'affaires ne bouge pas ? Tu sens que ton énergie ne se transforme pas en résultats concrets ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu décides seul(e)</h3>
                <p className="text-sm text-muted-foreground">
                  Tu prends toutes les décisions stratégiques seul(e) ? Tu doutes, tu tournes en rond, tu n'as personne pour challenger ou clarifier tes choix stratégiques ? Tu es en stress permanent ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu ne sais plus par quoi commencer</h3>
                <p className="text-sm text-muted-foreground">
                  Ton offre manque de structure, ta prospection stagne ? Tu as du mal à prioriser tes actions ? Tu confonds urgence et importance ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Flame className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu t'épuises sans résultat</h3>
                <p className="text-sm text-muted-foreground">
                  Tu n'as pas le temps de faire de la veille ou du réseau ? Chaque journée se termine avec la sensation de n'avoir rien fait d'utile ?
                </p>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-xl p-6 md:p-8">
              <p className="text-lg md:text-xl text-foreground font-semibold">
                Bonne nouvelle : tu n'es pas seul.
              </p>
              <p className="text-muted-foreground mt-2">
                Le Club Mare Nostrum est là pour t'aider à passer TES caps et à renforcer la performance de ton modèle économique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 : Offres */}
      <section id="offres" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos 3 offres pour entrepreneurs
          </h2>
          <p className="text-center text-muted-foreground mb-4 max-w-3xl mx-auto">
            Choisis le niveau d'accompagnement qui te correspond
          </p>
          <p className="text-center text-xs text-muted-foreground/70 mb-8">
            Survole chaque avantage pour en savoir plus
          </p>

          {/* Location Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <Button variant={selectedLocation === "toulouse" ? "default" : "outline"} onClick={() => setSelectedLocation("toulouse")} size="lg">
              Toulouse
            </Button>
            <Button variant={selectedLocation === "afrique" ? "default" : "outline"} onClick={() => setSelectedLocation("afrique")} size="lg">
              Afrique
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Communauté */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Communauté</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "toulouse" ? "30€" : "24€"}
                  <span className="text-lg font-normal text-muted-foreground"> /mois</span>
                </div>
                <p className="text-xs text-accent font-medium">Pas de frais d'entrée — 1 micro mentorat offert</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mb-6">
                <p className="text-xs text-muted-foreground text-center">
                  Vous lancez votre activité et sortez de l'isolement (0-12 mois, pré-revenu)
                </p>
              </div>

              <p className="text-sm font-medium text-foreground mb-4">L'essentiel pour ne plus entreprendre seul</p>

              <ul className="space-y-4 mb-8 flex-grow">
                {communauteFeatures.map((feature, idx) => (
                  <FeatureWithTooltip key={idx} feature={feature} />
                ))}
              </ul>

              <Button asChild className="w-full">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/00w3cx3W2bDr5Me6MO67S08" : "https://buy.stripe.com/dRmaEZ78e4aZ3E61su67S04"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Communauté
                </a>
              </Button>
            </div>

            {/* Groupe - Highlighted */}
            <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-2 border-accent rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Groupe</h3>
                <div className="text-4xl font-bold mb-2">
                  {selectedLocation === "toulouse" ? "90€" : "74€"}
                  <span className="text-lg font-normal opacity-80"> /mois</span>
                </div>
                <p className="text-xs font-medium opacity-90">Pas de frais d'entrée — 1 pré-diag offert</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-6">
                <p className="text-xs text-center opacity-90">
                  Vous avez vos premiers clients et voulez accélérer (1K-10K€ MRR)
                </p>
              </div>

              <p className="text-sm font-medium mb-4 opacity-95">L'indispensable pour accélérer votre traction</p>

              <ul className="space-y-4 mb-8 flex-grow">
                {groupeFeatures.map((feature, idx) => (
                  <FeatureWithTooltipLight key={idx} feature={feature} />
                ))}
              </ul>

              <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/28E7sNakqcHvgqSdbc67S09" : "https://buy.stripe.com/28EbJ32RY4aZa2u6MO67S06"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Groupe
                </a>
              </Button>
            </div>

            {/* Individuel */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Individuel</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "toulouse" ? "190€" : "184€"}
                  <span className="text-lg font-normal text-muted-foreground"> /mois</span>
                </div>
                <p className="text-xs text-accent font-medium">Pas de frais d'entrée — 1 tutorat personnalisé offert</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mb-6">
                <p className="text-xs text-muted-foreground text-center">
                  Vous structurez votre croissance, chaque décision compte (10K€+ MRR)
                </p>
              </div>

              <p className="text-sm font-medium text-foreground mb-4">Le bras droit pour réussir vos choix structurants</p>

              <ul className="space-y-4 mb-8 flex-grow">
                {individuelFeatures.map((feature, idx) => (
                  <FeatureWithTooltip key={idx} feature={feature} />
                ))}
              </ul>

              <Button asChild variant="default" className="w-full">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/bJe5kF64a0YNgqS4EG67S0a" : "https://buy.stripe.com/6oUaEZ8cidLzeiK9Z067S07"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Individuel
                </a>
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Pas sûr de quelle offre choisir ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Parler à Mare Nostrum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 3 : Résultats Concrets */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Des résultats concrets
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">50%</div>
              <p className="text-sm text-muted-foreground">
                des entrepreneurs accompagnés se rémunèrent correctement dans les 2 ans après la création
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">3</div>
              <p className="text-sm text-muted-foreground">
                contacts qualifiés en moyenne dès le premier mois d'adhésion
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">93%</div>
              <p className="text-sm text-muted-foreground">
                des membres se disent "très satisfaits ou satisfaits" de leur expérience
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">90%</div>
              <p className="text-sm text-muted-foreground">
                déclarent gagner du temps, de la clarté et de la sérénité après chaque session
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 : Témoignages */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Témoignages
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              text="J'ai trouvé mon premier client grâce à une mise en relation au Club. 30€ pour un contrat à 2000€, le calcul est vite fait."
              author="Lucas"
              role="Membre du Club Mare Nostrum"
            />
            <TestimonialCard
              text="Je ne perds plus 3 heures sur LinkedIn pour faire ma veille. Tout arrive trié dans ma messagerie du Club."
              author="Aristide"
              role="Membre du Club Mare Nostrum"
            />
            <TestimonialCard
              text="La session d'accompagnement m'a obligé à poser un plan d'action clair. En 2 mois, j'ai réussi à lancer ma campagne de tests et à trouver mes premiers beta-testeurs."
              author="Lucas"
              role="Membre du Club Mare Nostrum"
            />
          </div>
        </div>
      </section>

      {/* Photos Ateliers Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Exemples de nos actions
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Découvrez nos sessions de travail collaboratives avec les entrepreneurs
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <img src={atelierRose} alt="Atelier Mare Nostrum avec entrepreneurs et experts" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">Ateliers thématiques</h3>
                  <p className="text-sm">Workshops et masterclasses avec nos experts</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <img src={neoEntrepreneurElite} alt="Journée avec des néo-entrepreneurs dans l'offre Individuel Mare Nostrum" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">Offre Individuel</h3>
                  <p className="text-sm">Accompagnement premium avec nos néo-entrepreneurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="Questions fréquentes sur nos offres" faqs={croissanceFaqs} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent via-primary to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Tu veux sortir la tête de l'eau et passer à l'action ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Clarifie ta vision, structure ta stratégie et accélère ta croissance avec Mare Nostrum
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Réserver une session découverte
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-5 w-5" />
                Essayer 30 jours gratuits
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Croissance;
