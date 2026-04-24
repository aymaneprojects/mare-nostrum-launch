import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award, Zap, MessageSquare, Calendar, FileText, CheckCircle2, ArrowRight, Clock, Brain, Target, Flame, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import atelierRose from "@/assets/atelier-rose.png";
import neoEntrepreneurElite from "@/assets/neo-entrepreneur-elite.png";

type LocationType = "france" | "congo_brazzaville";

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
      <TooltipContent side="top" className="max-w-xs text-sm z-[100]">
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
      <TooltipContent side="top" className="max-w-xs text-sm z-[100]">
        {feature.tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Croissance = () => {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<LocationType>("france");
  const [showGroupeDialog, setShowGroupeDialog] = useState(false);

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

  const croissanceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Club Entrepreneur Mare Nostrum - Accompagnement Startup Toulouse & Afrique",
      "url": "https://marenostrum.tech/croissance",
      "description": "Club d'accompagnement pour entrepreneurs francophones à impact. Mentorat, réseau, IA, formation. 3 offres dès 30€/mois. 93% de satisfaction, 50% se rémunèrent en 2 ans.",
      "provider": {
        "@type": "Organization",
        "name": "Mare Nostrum",
        "url": "https://marenostrum.tech",
        "logo": "https://marenostrum.tech/favicon.png",
        "sameAs": [
          "https://marenostrum.tech",
          "https://www.linkedin.com/company/mare-nostrum-entrepreneuriat"
        ],
        "address": [
          { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressRegion": "Occitanie", "postalCode": "31000", "addressCountry": "FR" },
          { "@type": "PostalAddress", "addressLocality": "Paris", "addressCountry": "FR" },
          { "@type": "PostalAddress", "addressLocality": "Casablanca", "addressCountry": "MA" }
        ]
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
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "ratingCount": "24",
        "reviewCount": "24"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Offres Club Entrepreneur Mare Nostrum",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Communauté",
            "description": "Accès au club international d'entrepreneurs francophones, veille mutualisée, rencontres mensuelles en ligne, académie en ligne avec plus de 30h de formation.",
            "price": "30",
            "priceCurrency": "EUR",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "30.00", "priceCurrency": "EUR", "unitText": "MONTH" },
            "itemOffered": { "@type": "Service", "name": "Communauté", "category": "Offre d'entrée entrepreneur" }
          },
          {
            "@type": "Offer",
            "name": "Groupe",
            "description": "Tout de Communauté + intégration dans un Cercle d'entrepreneurs, sessions collectives de business développement, mises en relation partenaires, micro-mentorat mensuel.",
            "price": "90",
            "priceCurrency": "EUR",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "90.00", "priceCurrency": "EUR", "unitText": "MONTH" },
            "itemOffered": { "@type": "Service", "name": "Groupe", "category": "Offre recommandée entrepreneur" }
          },
          {
            "@type": "Offer",
            "name": "Individuel",
            "description": "Tout de Groupe + accompagnement individuel IA, 4 micro-mentorats par mois, ligne directe avec le fondateur Mare Nostrum pour réponse en moins de 2h.",
            "price": "190",
            "priceCurrency": "EUR",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "190.00", "priceCurrency": "EUR", "unitText": "MONTH" },
            "itemOffered": { "@type": "Service", "name": "Individuel", "category": "Offre premium entrepreneur" }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Club Entrepreneur Toulouse & Afrique - Mare Nostrum",
      "url": "https://marenostrum.tech/croissance",
      "description": "Club d'accompagnement entrepreneur à Toulouse et en Afrique francophone. Mentorat, réseau, IA dès 30€/mois.",
      "isPartOf": { "@type": "WebSite", "name": "Mare Nostrum", "url": "https://marenostrum.tech" },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", ".hero-description"]
      }
    }
  ];

  const croissanceFaqs = [
    {
      question: "Qui peut rejoindre Mare Nostrum Croissance ?",
      answer: "Tout entrepreneur francophone qui veut accélérer son activité et son impact. Peu importe ton stade : que tu sois en phase d'idéation, en croissance ou déjà structuré, nous t'accompagnons pour transformer ton énergie en progrès concret."
    },
    {
      question: "Peut-on essayer avant de s'engager ?",
      answer: "Oui. L'offre Communauté te permet de rejoindre le collectif sans engagement long terme. Dès ton inscription, tu reçois ton premier micro-mentorat de 20 minutes offert — pour avancer tout de suite, pas « plus tard »."
    },
    {
      question: "Je n'ai pas le temps de suivre un accompagnement intensif.",
      answer: "Justement, le Club Mare Nostrum est fait pour ça. Tu ne rajoutes pas du travail : tu remplaces du temps perdu par du temps utile. Les formats sont légers (rencontres mensuelles, micro-mentorat à la demande, veille mutualisée livrée chaque semaine). En moyenne, nos membres gagnent entre 8 et 12 heures par semaine dès le deuxième mois."
    },
    {
      question: "Je n'ai pas les moyens pour une dépense fixe chaque mois.",
      answer: "30 €, 90 € ou 190 € par mois — c'est le coût de 1 à 3 heures perdues à hésiter seul. Nos membres disent souvent : « Le jour où j'ai eu mon premier contrat grâce au Club, l'abonnement s'est remboursé dix fois. » Le retour sur investissement est concret : nouveaux clients, mises en relation, temps gagné, décisions plus rentables. C'est une dépense qui rapporte."
    },
    {
      question: "J'ai peur que ce soit trop général, pas adapté à mon projet.",
      answer: "Chaque membre bénéficie d'un accompagnement selon son niveau et ses besoins. Communauté pour rompre l'isolement et poser les bases solides. Groupe pour structurer la croissance et affiner l'offre. Individuel pour un accompagnement stratégique personnalisé sur l'IA, les financements ou le développement. Nos experts connaissent le quotidien des entrepreneurs — on parle concret, pas théorie."
    },
    {
      question: "Je suis déjà accompagné ailleurs.",
      answer: "Parfait. Le Club vient compléter ce que tu fais déjà. Il t'apporte le regard collectif et la mise en relation que peu de programmes offrent. Nos membres l'utilisent pour accélérer entre deux expertises, valider des décisions ou sortir d'un blocage opérationnel. Mare Nostrum devient ton filet de sécurité entre les grands rendez-vous stratégiques."
    },
    {
      question: "Je ne vois pas en quoi c'est différent d'un simple réseau.",
      answer: "Un réseau te connecte, le Club t'accompagne. Chez Mare Nostrum, chaque mise en relation est orientée résultat : création d'occasions d'affaires, entraide sur des freins concrets, accès aux bons outils. C'est un espace où tu trouves des solutions en une heure, là où tu passerais trois jours seul à chercher."
    },
    {
      question: "Et si je n'étais pas au bon niveau pour rejoindre le Club ?",
      answer: "L'offre est faite pour s'adapter à ton stade actuel. Phase idéation ou MVP : Communauté. Phase croissance (50K à 200K euros de chiffre d'affaires) : Groupe. Phase structuration et automatisation : Individuel. L'objectif est simple : te faire passer au niveau supérieur sans précipitation, mais avec méthode et soutien."
    },
    {
      question: "Comment savoir si ça marche vraiment ?",
      answer: "Plus de 80 % des membres déclarent gagner du temps utile dès les trois premiers mois. 50 % se rémunèrent correctement dans les deux ans. 90 % affirment avoir une vision claire de leurs priorités au bout de 90 jours. Et surtout, chaque avancée est partagée au sein du collectif — tu progresses avec et grâce aux autres."
    },
    {
      question: "30 euros pour une communauté en ligne, j'en ai déjà des gratuites.",
      answer: "Les communautés gratuites n'ont pas de filtre. Ici, chaque membre est sélectionné, chaque rencontre est animée, et vous avez plus de 30 heures de formation incluses. Testez 30 jours : remboursé si cela ne vous convient pas."
    },
    {
      question: "90 euros par mois, c'est cher. Je n'ai pas de budget.",
      answer: "Un seul contrat signé grâce au Cercle rembourse deux ans d'abonnement. Le pré-diagnostic offert à l'entrée vaut à lui seul 300 euros sur le marché. Essayez un trimestre à 80 euros par mois."
    },
    {
      question: "190 euros par mois, je peux trouver un freelance pour ce prix.",
      answer: "Un freelance répond à une mission ponctuelle. Nous, nous répondons en moins de deux heures à n'importe quel blocage, nous vous accompagnons sur l'IA et nous vous connectons à un réseau de décideurs. Aucun freelance ne fait tout cela pour 190 euros par mois."
    }
  ];

  useEffect(() => {
    if (location.hash === "#offres") {
      const element = document.getElementById("offres");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const groupeStripeLinks = {
    france: {
      financement: "https://buy.stripe.com/28E7sNakqcHvgqSdbc67S09",
      ia: "https://buy.stripe.com/28E7sNakqcHvgqSdbc67S09"
    },
    congo_brazzaville: {
      financement: "https://buy.stripe.com/28EbJ32RY4aZa2u6MO67S06",
      ia: "https://buy.stripe.com/28EbJ32RY4aZa2u6MO67S06"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Club Entrepreneur Toulouse & Afrique | Accompagnement Startup dès 30€/mois - Mare Nostrum"
        description="Rejoignez le Club Entrepreneur Mare Nostrum à Toulouse. 3 offres : Communauté 30€, Groupe 90€, Individuel 190€/mois. 93% de satisfaction, 50% se rémunèrent en 2 ans. Mentorat, réseau, IA. Toulouse, Paris, Casablanca, Afrique francophone."
        keywords="club entrepreneur toulouse, accompagnement entrepreneur toulouse, mentorat startup toulouse, accompagnement entrepreneur afrique, club entrepreneur francophone, incubateur toulouse, croissance entreprise toulouse, réseau entrepreneur toulouse, coaching entrepreneur, accompagnement startup francophonie, entrepreneuriat toulouse, entrepreneuriat afrique"
        structuredData={croissanceSchema}
        faqSchema={croissanceFaqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Offre Club", url: "https://marenostrum.tech/croissance" }
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
          <a href="https://niteo.marenostrum.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-xs md:text-sm h-7 md:h-8 px-3 md:px-4 rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Candidater
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-primary py-16 md:py-32" aria-label="Présentation du Club Entrepreneur Mare Nostrum">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Club Entrepreneur Mare Nostrum — Toulouse, Paris, Casablanca</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Accompagnement entrepreneur à Toulouse et en Afrique francophone
            </h1>
            <p className="hero-description text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12">
              Mentorat, réseau international et intelligence artificielle pour doubler votre activité et votre impact — dès 30€ par mois
            </p>
            <Button size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto" onClick={() => {
              document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Rejoindre le Club Entrepreneur
            </Button>
          </div>
        </div>
      </section>

      {/* Section 1 : Douleur Client */}
      <section className="py-12 md:py-24 bg-background" aria-label="Problèmes courants des entrepreneurs">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
              Ce qui freine 90% des entrepreneurs (et comment en sortir)
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
              <div className="bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu manques de temps</h3>
                <p className="text-sm text-muted-foreground">
                  Ton agenda ne reflète plus tes vrais objectifs ? Tu travailles 60 heures par semaine, mais ton chiffre d'affaires ne bouge pas ? Tu sens que ton énergie ne se transforme pas en résultats concrets ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu décides seul(e)</h3>
                <p className="text-sm text-muted-foreground">
                  Tu prends toutes les décisions stratégiques seul(e) ? Tu doutes, tu tournes en rond, tu n'as personne pour challenger ou clarifier tes choix stratégiques ? Tu es en stress permanent ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu ne sais plus par quoi commencer</h3>
                <p className="text-sm text-muted-foreground">
                  Ton offre manque de structure, ta prospection stagne ? Tu as du mal à prioriser tes actions ? Tu confonds urgence et importance ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Flame className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu t'épuises sans résultat</h3>
                <p className="text-sm text-muted-foreground">
                  Tu n'as pas le temps de faire de la veille ou du réseau ? Chaque journée se termine avec la sensation de n'avoir rien fait d'utile ?
                </p>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-sm p-6 md:p-8">
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
      <section id="offres" className="py-16 md:py-24 bg-secondary/30" aria-label="Tarifs et offres du Club Entrepreneur">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos offres d'accompagnement entrepreneur — Toulouse et Afrique
          </h2>
          <p className="text-center text-muted-foreground mb-4 max-w-3xl mx-auto">
            Choisis le niveau d'accompagnement qui te correspond
          </p>
          <p className="text-center text-xs text-muted-foreground/70 mb-8">
            Survole chaque avantage pour en savoir plus
          </p>

          {/* Location Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <Button variant={selectedLocation === "france" ? "default" : "outline"} onClick={() => setSelectedLocation("france")} size="lg">
              France
            </Button>
            <Button variant={selectedLocation === "congo_brazzaville" ? "default" : "outline"} onClick={() => setSelectedLocation("congo_brazzaville")} size="lg">
              Congo-Brazzaville
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Communauté */}
            <div className="bg-card border-2 border-border rounded-sm p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Communauté</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "france" ? "30€" : "24€"}
                  <span className="text-lg font-normal text-muted-foreground"> /mois</span>
                </div>
                <p className="text-xs text-accent font-medium">Pas de frais d'entrée — 1 micro mentorat offert</p>
              </div>

              <div className="bg-muted/50 rounded-sm p-3 mb-6">
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

              <Button asChild className="w-full mt-auto">
                <a href={selectedLocation === "france" ? "https://buy.stripe.com/00w3cx3W2bDr5Me6MO67S08" : "https://buy.stripe.com/dRmaEZ78e4aZ3E61su67S04"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Communauté
                </a>
              </Button>
            </div>

            {/* Groupe - Highlighted */}
            <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-2 border-accent rounded-sm p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 relative flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Groupe</h3>
                <div className="text-4xl font-bold mb-2">
                  {selectedLocation === "france" ? "90€" : "74€"}
                  <span className="text-lg font-normal opacity-80"> /mois</span>
                </div>
                <p className="text-xs font-medium opacity-90">Pas de frais d'entrée — 1 pré-diag offert</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-sm p-3 mb-6">
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

              <Button className="w-full bg-white text-primary hover:bg-white/90 mt-auto" onClick={() => setShowGroupeDialog(true)}>
                Rejoindre Groupe
              </Button>
            </div>

            {/* Individuel */}
            <div className="bg-card border-2 border-border rounded-sm p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Individuel</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "france" ? "190€" : "184€"}
                  <span className="text-lg font-normal text-muted-foreground"> /mois</span>
                </div>
                <p className="text-xs text-accent font-medium">Pas de frais d'entrée — 1 tutorat personnalisé offert</p>
              </div>

              <div className="bg-muted/50 rounded-sm p-3 mb-6">
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

              <Button asChild variant="default" className="w-full mt-auto">
                <a href={selectedLocation === "france" ? "https://buy.stripe.com/bJe5kF64a0YNgqS4EG67S0a" : "https://buy.stripe.com/6oUaEZ8cidLzeiK9Z067S07"} target="_blank" rel="noopener noreferrer">
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

      {/* Groupe Diagnostic Dialog */}
      <Dialog open={showGroupeDialog} onOpenChange={setShowGroupeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Choisissez votre pré-diagnostic offert</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              En rejoignant l'offre Groupe, vous bénéficiez d'un pré-diagnostic gratuit. Quel domaine souhaitez-vous explorer ?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <Button asChild size="lg" className="w-full h-auto py-4 flex flex-col gap-1">
              <a href={selectedLocation === "france" ? groupeStripeLinks.france.financement : groupeStripeLinks.congo_brazzaville.financement} target="_blank" rel="noopener noreferrer">
                <span className="font-bold text-base">Pré-diagnostic Financement</span>
                <span className="text-xs opacity-80 font-normal">Identifiez les leviers de financement adaptés à votre projet</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full h-auto py-4 flex flex-col gap-1">
              <a href={selectedLocation === "france" ? groupeStripeLinks.france.ia : groupeStripeLinks.congo_brazzaville.ia} target="_blank" rel="noopener noreferrer">
                <span className="font-bold text-base">Pré-diagnostic IA</span>
                <span className="text-xs opacity-80 font-normal">Découvrez comment l'IA peut accélérer votre activité</span>
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Section 3 : Résultats Concrets */}
      <section className="py-16 md:py-24 bg-background" aria-label="Résultats et statistiques d'accompagnement entrepreneur">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Résultats concrets de l'accompagnement entrepreneur Mare Nostrum
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">50%</div>
              <p className="text-sm text-muted-foreground">
                des entrepreneurs accompagnés se rémunèrent correctement dans les 2 ans après la création
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">3</div>
              <p className="text-sm text-muted-foreground">
                contacts qualifiés en moyenne dès le premier mois d'adhésion
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">93%</div>
              <p className="text-sm text-muted-foreground">
                des membres se disent "très satisfaits ou satisfaits" de leur expérience
              </p>
            </div>
            <div className="text-center bg-card border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">90%</div>
              <p className="text-sm text-muted-foreground">
                déclarent gagner du temps, de la clarté et de la sérénité après chaque session
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 : Témoignages */}
      <section className="py-16 md:py-24 bg-secondary/30" aria-label="Témoignages de membres du Club Entrepreneur">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Ce que disent nos membres entrepreneurs
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
      <section className="py-16 md:py-24 bg-background" aria-label="Photos des ateliers et sessions d'accompagnement">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos ateliers d'accompagnement entrepreneur en action
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Sessions de travail collaboratives avec les entrepreneurs à Toulouse et en Afrique francophone
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-sm shadow-lg hover:shadow-2xl transition-all">
              <img src={atelierRose} alt="Atelier d'accompagnement entrepreneur Mare Nostrum à Toulouse avec experts et participants" loading="lazy" width="600" height="400" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">Ateliers thématiques</h3>
                  <p className="text-sm">Workshops et masterclasses avec nos experts</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-sm shadow-lg hover:shadow-2xl transition-all">
              <img src={neoEntrepreneurElite} alt="Journée de business développement avec néo-entrepreneurs dans l'offre Individuel Mare Nostrum Toulouse" loading="lazy" width="600" height="400" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
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

      <FAQSection title="FAQ — Réponses à vos objections les plus courantes" faqs={croissanceFaqs} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent via-primary to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Prêt à accélérer votre entreprise avec un accompagnement sur mesure ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Clarifie ta vision, structure ta stratégie et accélère ta croissance avec le Club Entrepreneur Mare Nostrum à Toulouse
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
