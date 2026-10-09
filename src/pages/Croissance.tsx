import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award, Zap, MessageSquare, Calendar, FileText, CheckCircle2, ArrowRight, Clock, Brain, Target, Flame, Info, Lock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DarkSection from "@/components/DarkSection";
import TestimonialCard from "@/components/TestimonialCard";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import ClubOnboarding, { type Offer, type PaidOffer } from "@/components/ClubOnboarding";
import { supabase } from "@/integrations/supabase/client";
import atelierRose from "@/assets/atelier-rose.jpg";

type LocationType = "france" | "congo_brazzaville";

function ClubCounter() {
  const [count, setCount]         = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    supabase.functions.invoke("get-club-count")
      .then(({ data }) => { if (data?.count != null) setCount(data.count); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (count === null) return;
    if (count === 0) { setDisplayed(0); return; }
    let start = 0;
    const step = Math.ceil(count / 40);
    const id = window.setInterval(() => {
      start += step;
      if (start >= count) { setDisplayed(count); clearInterval(id); }
      else setDisplayed(start);
    }, 30);
    return () => clearInterval(id);
  }, [count]);

  if (count === null) return null;

  return (
    <p className="mt-4 text-sm font-medium text-accent">
      Aujourd'hui, le Club compte <span className="text-lg font-bold tabular-nums">{displayed}</span> entrepreneur{displayed > 1 ? "s" : ""} actif{displayed > 1 ? "s" : ""}
    </p>
  );
}

interface OfferFeature {
  label: string;
  tooltip: string;
}

const FeatureWithTooltip = ({ feature }: { feature: OfferFeature }) => (
  <li className="flex items-start space-x-3">
    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
    <span className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
      {feature.label}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="relative inline-flex items-center justify-center w-4 h-4 rounded-full text-muted-foreground hover:text-primary active:scale-90 transition-all flex-shrink-0 after:absolute after:-inset-3.5 after:content-['']"
            aria-label={`En savoir plus : ${feature.label}`}
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" className="max-w-xs text-sm z-[100]">
          {feature.tooltip}
        </PopoverContent>
      </Popover>
    </span>
  </li>
);

const FeatureWithTooltipLight = ({ feature }: { feature: OfferFeature }) => (
  <li className="flex items-start space-x-3">
    <CheckCircle2 className="h-5 w-5 text-primary-foreground flex-shrink-0 mt-0.5" />
    <span className="text-sm opacity-95 flex items-center gap-1.5 flex-wrap">
      {feature.label}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="relative inline-flex items-center justify-center w-4 h-4 rounded-full opacity-80 hover:opacity-100 active:scale-90 transition-all flex-shrink-0 after:absolute after:-inset-3.5 after:content-['']"
            aria-label={`En savoir plus : ${feature.label}`}
          >
            <Info className="h-3.5 w-3.5 text-primary-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" className="max-w-xs text-sm z-[100]">
          {feature.tooltip}
        </PopoverContent>
      </Popover>
    </span>
  </li>
);

export const MONTHLY = {
  france:            { communaute: 30,    groupe: 90    },
  congo_brazzaville: { communaute: 10000, groupe: 30000 },
};
export const ANNUAL = {
  france:            { communaute: 288,    groupe: 864    },
  congo_brazzaville: { communaute: 100000, groupe: 300000 },
};

const Croissance = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<LocationType>("france");
  const [selectedBilling, setSelectedBilling] = useState<"monthly" | "annual">("monthly");
  const [onboardingOffer, setOnboardingOffer] = useState<Offer | null>(null);
  const [restoredCheckout, setRestoredCheckout] = useState<{ prenom: string; email: string } | null>(null);

  // Devise déduite du fuseau horaire du navigateur : aucune requête réseau, donc
  // aucun transfert de données avant consentement, et surtout pas de prix affiché
  // en euros qui bascule sous les yeux du visiteur une seconde plus tard.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("session_id")) return; // le retour de Stripe prend la main
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
      if (zone.startsWith("Africa/") || zone === "Indian/Antananarivo" || zone === "Indian/Comoro") {
        setSelectedLocation("congo_brazzaville");
      }
    } catch {
      /* fuseau indisponible : on reste sur la zone par défaut */
    }
  }, []);

  // Restore onboarding after Stripe redirect (3DS / redirect-based payment)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    window.history.replaceState({}, "", window.location.pathname);

    supabase.functions.invoke("get-checkout-session", { body: { sessionId } })
      .then(({ data, error }) => {
        if (error || !data?.paid) {
          toast({
            variant: "destructive",
            title: "Paiement non confirmé",
            description: "Nous n'avons pas pu confirmer votre paiement. Contactez l'équipe Mare Nostrum.",
          });
          return;
        }
        setSelectedLocation((data.location as LocationType) || "france");
        setSelectedBilling(data.billing as "monthly" | "annual" || "monthly");
        setOnboardingOffer((data.offer as Offer) || null);
        setRestoredCheckout({ prenom: data.prenom || "", email: data.email || "" });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Paiement non confirmé",
          description: "Nous n'avons pas pu confirmer votre paiement. Contactez l'équipe Mare Nostrum.",
        });
      });
  }, [toast]);

  const openOnboarding = (offer: Offer) => setOnboardingOffer(offer);

  const getPrice = (offer: PaidOffer) => {
    if (selectedLocation === "france") {
      const amount = selectedBilling === "monthly" ? MONTHLY.france[offer] : ANNUAL.france[offer];
      return `${amount}€`;
    }
    const amount = selectedBilling === "monthly"
      ? MONTHLY.congo_brazzaville[offer]
      : ANNUAL.congo_brazzaville[offer];
    return `${amount.toLocaleString("fr-FR")} XOF`;
  };

  const getPricePeriod = () => selectedBilling === "monthly" ? "/mois" : "/an";

  type PriceDetail = { equiv: string; badge: string; saving: string | null };
  const getPriceDetail = (offer: PaidOffer): PriceDetail | null => {
    if (selectedBilling === "monthly") return null;
    if (selectedLocation === "france") {
      const m = MONTHLY.france[offer];
      return {
        equiv: `soit ${Math.round(m * 0.8)}€/mois`,
        badge: "-20%",
        saving: `Économisez ${Math.round(m * 12 * 0.2)}€/an`,
      };
    }
    return {
      equiv: "10 mois facturés · 12 mois d'accès",
      badge: "2 mois offerts",
      saving: null,
    };
  };

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
      label: "Rencontre en ligne",
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

  const premiumFeatures: OfferFeature[] = [
    {
      label: "Tout le pack Freemium +",
      tooltip: "Retrouve tout ce qui est inclus dans l'offre Freemium : le Club international, la veille mutualisée et la rencontre en ligne"
    },
    {
      label: "Avantages négociés auprès de nos partenaires",
      tooltip: "Sois informé des tarifs préférentiels aux événements, des opportunités de nos partenaires et des possibilités de collaboration avec Mare Nostrum"
    },
    {
      label: "Accès à l'Académie en ligne de l'incubateur",
      tooltip: "Développe tes compétences et tes soft skills entrepreneuriales : plus de 30 heures de formation sur les fondamentaux du business"
    }
  ];

  const groupeFeatures: OfferFeature[] = [
    {
      label: "Tout le pack Premium +",
      tooltip: "Découvre tous les avantages dans l'offre Premium"
    },
    {
      label: "Intégration dans un Cercle",
      tooltip: "Rejoins un petit groupe soudé d'entrepreneurs aux profils complémentaires qui s'entraident"
    },
    {
      label: "Mises en relation partenaires & réseaux",
      tooltip: "Bénéficie de mises en relation directes avec des partenaires de Mare Nostrum à votre demande (plus de 100 partenaires clés dans l'écosystème)"
    },
    {
      label: "1 micro-mentorat (session de tutorat personnalisé)",
      tooltip: "Profite d'une visio individualisée, chaque mois, avec un accompagnateur pendant 20 minutes qui vous permets de débloquer une problématique clé"
    }
  ];

  // Offre freemium : accès au club, veille, rencontre en ligne (retranscription
  // « Priorités commerciales - Temps Forts »). Libellés et infobulles repris de
  // l'offre Premium, sans réécriture.
  const freemiumFeatures: OfferFeature[] = communauteFeatures.slice(0, 3);

  const croissanceSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Club Entrepreneur Mare Nostrum - Accompagnement Startup Toulouse & Afrique",
      "url": "https://marenostrum.tech/club",
      "description": "Club d'accompagnement pour entrepreneurs francophones à impact. Mentorat, réseau, IA, formation. Accès gratuit (freemium) et 2 offres payantes dès 30€/mois. 93% de satisfaction, 50% se rémunèrent en 2 ans.",
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
            "name": "Freemium",
            "description": "Accès gratuit au club international d'entrepreneurs francophones, veille mutualisée et rencontre en ligne. Sans paiement.",
            "price": "0",
            "priceCurrency": "EUR",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "0.00", "priceCurrency": "EUR" },
            "itemOffered": { "@type": "Service", "name": "Freemium", "category": "Offre gratuite entrepreneur" }
          },
          {
            "@type": "Offer",
            "name": "Premium",
            "description": "Accès au club international d'entrepreneurs francophones, veille mutualisée, rencontres en ligne, académie en ligne avec plus de 30h de formation.",
            "price": "30",
            "priceCurrency": "EUR",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "30.00", "priceCurrency": "EUR", "unitText": "MONTH" },
            "itemOffered": { "@type": "Service", "name": "Premium", "category": "Offre d'entrée entrepreneur" }
          },
          {
            "@type": "Offer",
            "name": "Individualisé",
            "description": "Tout de Premium + intégration dans un Cercle d'entrepreneurs, mises en relation partenaires, micro-mentorat mensuel.",
            "price": "90",
            "priceCurrency": "EUR",
            "priceSpecification": { "@type": "UnitPriceSpecification", "price": "90.00", "priceCurrency": "EUR", "unitText": "MONTH" },
            "itemOffered": { "@type": "Service", "name": "Individualisé", "category": "Offre recommandée entrepreneur" }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Club Entrepreneur Toulouse & Afrique - Mare Nostrum",
      "url": "https://marenostrum.tech/club",
      "description": "Club d'accompagnement entrepreneur à Toulouse et en Afrique francophone. Mentorat, réseau, IA : accès gratuit, offres payantes dès 30€/mois.",
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
      answer: "Oui. L'offre Freemium est gratuite : tu rejoins le Club sans rien payer. L'offre Premium te permet ensuite de rejoindre le collectif sans engagement long terme. Dès ton inscription, tu reçois ton premier micro-mentorat de 20 minutes offert — pour avancer tout de suite, pas « plus tard »."
    },
    {
      question: "Je n'ai pas le temps de suivre un accompagnement intensif.",
      answer: "Justement, le Club Mare Nostrum est fait pour ça. Tu ne rajoutes pas du travail : tu remplaces du temps perdu par du temps utile. Les formats sont légers (rencontres en ligne, micro-mentorat à la demande, veille mutualisée livrée chaque semaine). En moyenne, nos membres gagnent entre 8 et 12 heures par semaine dès le deuxième mois."
    },
    {
      question: "Je n'ai pas les moyens pour une dépense fixe chaque mois.",
      answer: "L'offre Freemium est gratuite pour découvrir le Club. Ensuite, 30 € ou 90 € par mois — c'est le coût de 1 à 3 heures perdues à hésiter seul. Nos membres disent souvent : « Le jour où j'ai eu mon premier contrat grâce au Club, l'abonnement s'est remboursé dix fois. » Le retour sur investissement est concret : nouveaux clients, mises en relation, temps gagné, décisions plus rentables. C'est une dépense qui rapporte."
    },
    {
      question: "J'ai peur que ce soit trop général, pas adapté à mon projet.",
      answer: "Chaque membre bénéficie d'un accompagnement selon son niveau et ses besoins. Premium pour rompre l'isolement et poser les bases solides. Individualisé pour structurer la croissance et affiner l'offre. Freemium pour découvrir le Club gratuitement avant de choisir. Nos experts connaissent le quotidien des entrepreneurs — on parle concret, pas théorie."
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
      answer: "L'offre a été construite pour répondre au mieux aux besoins des entrepreneurs. Si vous choisissez un niveau qui n'est pas adapté, vous pouvez changer à tout moment de forfait."
    },
    {
      question: "Comment savoir si ça marche vraiment ?",
      answer: "Plus de 80 % des membres déclarent gagner du temps utile dès les trois premiers mois. 50 % se rémunèrent correctement dans les deux ans. 90 % affirment avoir une vision claire de leurs priorités au bout de 90 jours. Et surtout, chaque avancée est partagée au sein du collectif — tu progresses avec et grâce aux autres."
    },
    {
      question: "30 euros pour une communauté en ligne, j'en ai déjà des gratuites.",
      answer: "Les communautés gratuites n'ont pas de filtre. Ici, chaque membre est sélectionné, chaque rencontre est animée, et vous avez plus de 30 heures de formation incluses. Testez 30 jours : remboursé si cela ne vous convient pas."
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("success") === "true") {
      toast({
        title: "Bienvenue dans le Club !",
        description: "Ton abonnement est actif. Tu vas recevoir un email de confirmation.",
      });
    }
  }, [location.search]);

  return (
    <div className="min-h-dvh flex flex-col">
      <EnhancedSEOHead
        title="Club Entrepreneur Toulouse & Afrique | Accès gratuit, offres dès 30€/mois - Mare Nostrum"
        description="Rejoignez le Club Entrepreneur Mare Nostrum à Toulouse. 3 offres : Freemium gratuit, Premium 30€, Individualisé 90€/mois. 93% de satisfaction, 50% se rémunèrent en 2 ans. Mentorat, réseau, IA. Toulouse, Paris, Casablanca, Afrique francophone."
        keywords="club entrepreneur toulouse, accompagnement entrepreneur toulouse, mentorat startup toulouse, accompagnement entrepreneur afrique, club entrepreneur francophone, incubateur toulouse, croissance entreprise toulouse, réseau entrepreneur toulouse, coaching entrepreneur, accompagnement startup francophonie, entrepreneuriat toulouse, entrepreneuriat afrique"
        structuredData={croissanceSchema}
        faqSchema={croissanceFaqs}
        
      />

      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="Le Quai des Entrepreneurs · depuis Toulouse, dans tout l'espace francophone"
        title="Plongez dans Mare Nostrum"
        subtitle="Vos premiers outils d'IA, vos partenaires & clients, dans un seul espace digital. 50% de nos membres se rémunèrent en moins de 2 ans. Accès gratuit, offres payantes dès 30€/mois."
        size="lg"
        ctas={
          <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => {
            document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Rejoindre l'équipage
          </Button>
        }
      />
      {/* Section 1 : Douleur Client */}
      <section className="py-12 md:py-24 bg-background" aria-label="Problèmes courants des entrepreneurs">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mn-eyebrow-turquoise text-center mb-3">Le diagnostic</div>
            <h2 className="font-editorial italic font-semibold text-center mb-8 md:mb-12 text-foreground">
              Ce qui freine 90% des entrepreneurs (et comment en sortir)
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu manques de temps</h3>
                <p className="text-sm text-muted-foreground">
                  Ton agenda ne reflète plus tes vrais objectifs ? Tu travailles 60 heures par semaine, mais ton chiffre d'affaires ne bouge pas ? Tu sens que ton énergie ne se transforme pas en résultats concrets ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu décides seul(e)</h3>
                <p className="text-sm text-muted-foreground">
                  Tu prends toutes les décisions stratégiques seul(e) ? Tu doutes, tu tournes en rond, tu n'as personne pour challenger ou clarifier tes choix stratégiques ? Tu es en stress permanent ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu ne sais plus par quoi commencer</h3>
                <p className="text-sm text-muted-foreground">
                  Ton offre manque de structure, ta prospection stagne ? Tu as du mal à prioriser tes actions ? Tu confonds urgence et importance ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Flame className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu t'épuises sans résultat</h3>
                <p className="text-sm text-muted-foreground">
                  Tu n'as pas le temps de faire de la veille ou du réseau ? Chaque journée se termine avec la sensation de n'avoir rien fait d'utile ?
                </p>
              </div>
            </div>

            <div className="text-center mn-card mn-card-left shadow-soft p-6 md:p-8">
              <p className="text-lg md:text-xl text-foreground font-semibold">
                Bonne nouvelle : tu n'es pas seul.
              </p>
              <p className="text-muted-foreground mt-2">
                Le Club Mare Nostrum est là pour t'aider à passer TES caps et à renforcer la performance de ton modèle économique.
              </p>
              <ClubCounter />
            </div>
          </div>
        </div>
      </section>
      {/* Section 3 : Résultats Concrets */}
      <DarkSection halo="left">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-light text-center mb-3">Impact mesuré</div>
          <h2 className="font-editorial italic font-semibold text-center mb-12 text-primary-foreground">
            Résultats concrets de l'accompagnement entrepreneur Mare Nostrum
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">50%</div>
              <p className="text-sm text-primary-foreground/75">
                des entrepreneurs accompagnés se rémunèrent correctement dans les 2 ans après la création
              </p>
            </div>
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">3</div>
              <p className="text-sm text-primary-foreground/75">
                contacts qualifiés en moyenne dès le premier mois d'adhésion
              </p>
            </div>
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">93%</div>
              <p className="text-sm text-primary-foreground/75">
                des membres se disent "très satisfaits ou satisfaits" de leur expérience
              </p>
            </div>
            <div className="text-center rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3">90%</div>
              <p className="text-sm text-primary-foreground/75">
                déclarent gagner du temps, de la clarté et de la sérénité après chaque session
              </p>
            </div>
          </div>
        </div>
      </DarkSection>
      {/* Section 2 : Offres */}
      <section id="offres" className="py-16 md:py-24 bg-secondary/30" aria-label="Tarifs et offres du Club Entrepreneur">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Choisissez votre niveau</div>
          <h2 className="font-editorial italic font-semibold text-center mb-4 text-foreground">
            Nos offres d'accompagnement entrepreneur, Toulouse et Afrique
          </h2>
          <p className="text-center text-muted-foreground mb-4 max-w-3xl mx-auto">
            Choisis le niveau d'accompagnement qui te correspond
          </p>
          <p className="text-center text-xs text-muted-foreground/70 mb-8">
            Survole chaque avantage pour en savoir plus
          </p>

          {/* Selector: billing only — location auto-detected */}
          <div className="flex flex-col items-center gap-5 mb-12">
            <div className="flex items-center gap-1 bg-background border border-border rounded-full p-1 shadow-sm">
              <button
                onClick={() => setSelectedBilling("monthly")}
                aria-pressed={selectedBilling === "monthly"}
                className={`min-h-11 px-5 py-2 rounded-full text-sm font-semibold transition-all ${selectedBilling === "monthly" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setSelectedBilling("annual")}
                aria-pressed={selectedBilling === "annual"}
                className={`min-h-11 px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${selectedBilling === "annual" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                Annuel
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full bg-accent/20 ${selectedBilling === "annual" ? "text-accent" : "text-primary"}`}>
                  {selectedLocation === "france" ? "-20%" : "2 mois offerts"}
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Freemium : inscription gratuite, sans paiement */}
            <div className="bg-card border-2 border-border rounded-sm p-6 md:p-8 shadow-[var(--shadow-medium)] hover-lift transition-all hover:-translate-y-1 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl mb-2 text-foreground">Freemium</h3>
                <div className="text-4xl font-bold text-primary mb-1">
                  Gratuit
                </div>
                <p className="text-xs text-muted-foreground mt-1">Sans paiement · Sans engagement</p>
              </div>

              <div className="bg-muted/50 rounded-sm p-3 mb-6">
                <p className="text-xs text-muted-foreground text-center">
                  Tu découvres le Club et son réseau
                </p>
              </div>

              <p className="text-sm font-medium text-foreground mb-4">Pour rejoindre le Club sans payer</p>

              <ul className="space-y-4 mb-6">
                {freemiumFeatures.map((feature, idx) => (
                  <FeatureWithTooltip key={idx} feature={feature} />
                ))}
              </ul>

              {/* Ce que Premium ajoute : lignes grisées, pour voir la différence d'un coup d'œil. */}
              <div className="mb-8 flex-grow">
                <p className="text-xs font-medium text-muted-foreground/70 mb-3">Avec Premium</p>
                <ul className="space-y-3">
                  {premiumFeatures.slice(1).map((feature) => (
                    <li key={feature.label} className="flex items-start space-x-3 text-sm text-muted-foreground/60">
                      <Lock aria-hidden="true" className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" className="w-full mt-auto" onClick={() => openOnboarding("freemium")}>
                Rejoindre gratuitement
              </Button>
            </div>

            {/* Premium */}
            <div className="bg-card border-2 border-border rounded-sm p-6 md:p-8 shadow-[var(--shadow-medium)] hover-lift transition-all hover:-translate-y-1 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="text-2xl mb-2 text-foreground">Premium</h3>
                <div className="text-4xl font-bold text-primary mb-1">
                  {getPrice("communaute")}
                  <span className="text-lg font-normal text-muted-foreground"> {getPricePeriod()}</span>
                </div>
                {getPriceDetail("communaute") && (
                  <div className="mb-2">
                    <span className="inline-block bg-accent/15 text-primary text-xs font-bold px-2 py-0.5 rounded-full mr-2">{getPriceDetail("communaute")!.badge}</span>
                    <span className="text-xs text-muted-foreground">{getPriceDetail("communaute")!.equiv}</span>
                    {getPriceDetail("communaute")!.saving && <p className="text-xs text-primary font-medium mt-0.5">{getPriceDetail("communaute")!.saving}</p>}
                  </div>
                )}
                <p className="text-xs text-accent font-semibold">1 micro-mentorat offert dès votre arrivée</p>
                <p className="text-xs text-muted-foreground mt-1">Pas de frais d'entrée · Sans engagement</p>
              </div>

              <div className="bg-muted/50 rounded-sm p-3 mb-6">
                <p className="text-xs text-muted-foreground text-center">
                  Tu lances ton activité et sors de l'isolement (0-12 mois, pré-revenu)
                </p>
              </div>

              <p className="text-sm font-medium text-foreground mb-4">L'essentiel pour ne plus entreprendre seul</p>

              <ul className="space-y-4 mb-8 flex-grow">
                {premiumFeatures.map((feature, idx) => (
                  <FeatureWithTooltip key={idx} feature={feature} />
                ))}
              </ul>

              {/* Contour : une seule offre porte le bouton plein (voir carte Individualisé). */}
              <Button variant="outline" className="w-full mt-auto" onClick={() => openOnboarding("communaute")}>
                Rejoindre l'équipage
              </Button>
            </div>

            {/* Individualisé - Highlighted */}
            <div className="text-primary-foreground border-2 border-accent rounded-sm p-6 md:p-8 shadow-[var(--shadow-elegant)] hover:shadow-2xl transition-all hover:-translate-y-2 relative flex flex-col h-full" style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl mb-2 text-primary-foreground">Individualisé</h3>
                <div className="text-4xl font-bold mb-1">
                  {getPrice("groupe")}
                  <span className="text-lg font-normal opacity-80"> {getPricePeriod()}</span>
                </div>
                {getPriceDetail("groupe") && (
                  <div className="mb-2">
                    <span className="inline-block bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full mr-2">{getPriceDetail("groupe")!.badge}</span>
                    <span className="text-xs opacity-80">{getPriceDetail("groupe")!.equiv}</span>
                    {getPriceDetail("groupe")!.saving && <p className="text-xs font-semibold opacity-90 mt-0.5">{getPriceDetail("groupe")!.saving}</p>}
                  </div>
                )}
                <p className="text-xs font-semibold opacity-95">Pré-diagnostic offert — valeur 300€</p>
                <p className="text-xs opacity-70 mt-1">Pas de frais d'entrée · Sans engagement</p>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-sm p-3 mb-6">
                <p className="text-xs text-center opacity-90">
                  Tu as tes premiers clients et veux accélérer (1K-10K€ MRR)
                </p>
              </div>

              <p className="text-sm font-medium mb-4 opacity-95">L'indispensable pour accélérer votre traction</p>

              <ul className="space-y-4 mb-8 flex-grow">
                {groupeFeatures.map((feature, idx) => (
                  <FeatureWithTooltipLight key={idx} feature={feature} />
                ))}
              </ul>

              {/* Offre recommandée : SEUL bouton plein turquoise de la page. */}
              <Button variant="secondary" className="w-full mt-auto" onClick={() => openOnboarding("groupe")}>
                Rejoindre l'équipage
              </Button>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto mt-16 overflow-x-auto">
            <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6" style={{ letterSpacing: '0.18em' }}>Comparaison détaillée</p>
            <table className="w-full text-xs md:text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-2 px-2 md:py-3 md:px-4 text-muted-foreground font-medium" style={{ width: '40%' }}></th>
                  <th className="py-2 px-2 md:py-3 md:px-4 text-center font-bold text-foreground">Freemium</th>
                  <th className="py-2 px-2 md:py-3 md:px-4 text-center font-bold text-foreground">Premium</th>
                  <th className="py-2 px-2 md:py-3 md:px-4 text-center font-bold text-primary-foreground rounded-t-sm" style={{ background: 'hsl(222 44% 25%)' }}>Individualisé</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Accès Club International", f: true, c: true, g: true },
                  { feature: "Veille mutualisée mensuelle", f: true, c: true, g: true },
                  { feature: "Rencontre en ligne", f: true, c: true, g: true },
                  { feature: "Académie en ligne de l'incubateur +30h", f: false, c: true, g: true },
                  { feature: "Avantages négociés auprès de nos partenaires", f: false, c: true, g: true },
                  { feature: "Intégration dans un Cercle", f: false, c: false, g: true },
                  { feature: "Mises en relation partenaires", f: false, c: false, g: true },
                  { feature: "Micro-mentorat mensuel", f: false, c: "1×", g: "1×" },
                ].map(({ feature, f, c, g }, idx) => {
                  const bg = idx % 2 === 0 ? 'hsl(40 38% 94% / 0.5)' : '#fff';
                  const Cell = ({ val }: { val: boolean | string }) => (
                    <td className="py-2 px-2 md:py-3 md:px-4 text-center" style={{ background: val !== false && val !== true ? 'hsl(222 44% 25% / 0.04)' : undefined }}>
                      {val === true ? <><CheckCircle2 aria-hidden="true" className="h-4 w-4 mx-auto" style={{ color: 'hsl(181 67% 40%)' }} /><span className="sr-only">Inclus</span></> :
                       val === false ? <><span aria-hidden="true" className="text-muted-foreground/30 font-bold text-lg leading-none">—</span><span className="sr-only">Non inclus</span></> :
                       <span className="font-semibold text-primary">{val}</span>}
                    </td>
                  );
                  return (
                    <tr key={feature} style={{ background: bg, borderTop: '1px solid hsl(222 44% 25% / 0.07)' }}>
                      <td className="py-2 px-2 md:py-3 md:px-4 text-foreground/80 font-medium">{feature}</td>
                      <Cell val={f} />
                      <Cell val={c} />
                      <td className="py-2 px-2 md:py-3 md:px-4 text-center" style={{ background: 'hsl(222 44% 25% / 0.04)' }}>
                        {g === true ? <><CheckCircle2 aria-hidden="true" className="h-4 w-4 mx-auto" style={{ color: 'hsl(181 67% 40%)' }} /><span className="sr-only">Inclus</span></> :
                         g === false ? <><span aria-hidden="true" className="text-muted-foreground/30 font-bold text-lg leading-none">—</span><span className="sr-only">Non inclus</span></> :
                         <span className="font-semibold text-primary">{g}</span>}
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: '2px solid hsl(222 44% 25% / 0.12)' }}>
                  <td className="py-3 px-2 md:py-4 md:px-4 font-bold text-foreground">
                    Prix mensuel · {selectedLocation === "france" ? "France" : "Rép. du Congo"}
                  </td>
                  <td className="py-3 px-2 md:py-4 md:px-4 text-center font-bold text-primary">
                    Gratuit
                  </td>
                  <td className="py-3 px-2 md:py-4 md:px-4 text-center font-bold text-primary">
                    {selectedLocation === "france" ? "30€" : "10 000 XOF"}
                  </td>
                  <td className="py-3 px-2 md:py-4 md:px-4 text-center font-bold text-primary-foreground rounded-b-sm" style={{ background: 'hsl(222 44% 25%)' }}>
                    {selectedLocation === "france" ? "90€" : "30 000 XOF"}
                  </td>
                </tr>
              </tbody>
            </table>
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

      {/* Onboarding + Stripe Embedded Checkout */}
      {onboardingOffer && (
        <ClubOnboarding
          open={onboardingOffer !== null}
          onClose={() => { setOnboardingOffer(null); setRestoredCheckout(null); }}
          offer={onboardingOffer}
          location={selectedLocation}
          billing={selectedBilling}
          initialPhase={restoredCheckout ? "success" : undefined}
          initialPrenom={restoredCheckout?.prenom}
          initialEmail={restoredCheckout?.email}
        />
      )}
      {/* Section 4 : Témoignages */}
      <section className="py-16 md:py-24 bg-secondary/30" aria-label="Témoignages de membres du Club Entrepreneur">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12 text-foreground">
            Ce que disent nos membres entrepreneurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              text="J'ai trouvé mon premier client grâce à une mise en relation au Club. 30€ pour un contrat à 2000€, le calcul est vite fait."
              author="Adam"
              role="Membre du Club Mare Nostrum"
            />
            <TestimonialCard
              text="Je ne perds plus 3 heures sur LinkedIn pour faire ma veille. Tout arrive trié dans ma messagerie du Club."
              author="Aristide"
              role="Membre du Club Mare Nostrum"
            />
            <TestimonialCard
              text="La session d'accompagnement m'a obligé à poser un plan d'action clair. En 2 mois, j'ai réussi à lancer ma campagne de tests et à trouver mes premiers beta-testeurs."
              author="Annabel"
              role="Membre du Club Mare Nostrum"
            />
          </div>
        </div>
      </section>
      {/* Photos Ateliers Section */}
      <section className="py-16 md:py-24 bg-background" aria-label="Photos des ateliers et sessions d'accompagnement">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4 text-foreground">
            Nos ateliers d'accompagnement entrepreneur en action
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Sessions de travail collaboratives avec les entrepreneurs à Toulouse et en Afrique francophone
          </p>

          <div className="grid gap-8 max-w-3xl mx-auto">
            <div className="group relative overflow-hidden rounded-sm shadow-[var(--shadow-medium)] hover:shadow-2xl transition-all">
              <img src={atelierRose} alt="Atelier d'accompagnement entrepreneur Mare Nostrum à Toulouse avec experts et participants" loading="lazy" width="600" height="400" className="w-full h-[220px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-xl mb-2">Ateliers thématiques</h3>
                  <p className="text-sm">Workshops et masterclasses avec nos experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="FAQ : Réponses à vos objections les plus courantes" faqs={croissanceFaqs} />

      {/* CTA Section */}
      <DarkSection halo="right">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-editorial italic mb-6 text-primary-foreground">
            Prêt à accélérer votre entreprise avec un accompagnement sur mesure ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Clarifie ta vision, structure ta stratégie et accélère ta croissance avec le Club Entrepreneur Mare Nostrum à Toulouse
          </p>
          {/* Le bouton d'adhésion ramène aux offres : c'est ici que l'objection vient
              de tomber (FAQ juste au-dessus), et c'était jusqu'ici une impasse —
              les deux boutons menaient au formulaire de contact. */}
          <div className="mn-cta-row mn-cta-row--center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => document.getElementById("offres")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Essayer 30 jours gratuits
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Réserver une session découverte
              </Link>
            </Button>
          </div>
        </div>
      </DarkSection>

      <Footer />
    </div>
  );
};

export default Croissance;
