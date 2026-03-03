import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award, Zap, MessageSquare, Calendar, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import atelierRose from "@/assets/atelier-rose.png";
import neoEntrepreneurElite from "@/assets/neo-entrepreneur-elite.png";
type LocationType = "toulouse" | "afrique";
const Croissance = () => {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<LocationType>("toulouse");
  const croissanceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mare Nostrum Croissance - Club Entrepreneur Francophone International",
    "description": "Club international d'accompagnement entrepreneurs à impact. 24 entreprises accompagnées, 93% accélération décisions, 135+ experts, 2000 ans expérience cumulée, 12 pays. Toulouse, Paris, Casablanca.",
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
    "areaServed": [{
      "@type": "Country",
      "name": "France"
    }, {
      "@type": "Country",
      "name": "Maroc"
    }, {
      "@type": "Country",
      "name": "Tunisie"
    }, {
      "@type": "Country",
      "name": "Algérie"
    }, {
      "@type": "Country",
      "name": "Sénégal"
    }, {
      "@type": "Country",
      "name": "Côte d'Ivoire"
    }, {
      "@type": "Country",
      "name": "Bénin"
    }, {
      "@type": "Country",
      "name": "Cameroun"
    }, {
      "@type": "Country",
      "name": "Burkina Faso"
    }, {
      "@type": "Country",
      "name": "République démocratique du Congo"
    }, {
      "@type": "Country",
      "name": "Égypte"
    }, {
      "@type": "Country",
      "name": "Canada"
    }, {
      "@type": "City",
      "name": "Toulouse"
    }, {
      "@type": "City",
      "name": "Paris"
    }, {
      "@type": "City",
      "name": "Casablanca"
    }],
    "audience": {
      "@type": "Audience",
      "audienceType": "Entrepreneurs à impact, Startups, Entreprises sociales, Porteurs de projets innovants"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Offres Mare Nostrum Croissance",
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Offre Tremplin",
          "description": "Accès au club international d'entrepreneurs francophones. Détection d'opportunités business et financement. Café galère pour résoudre vos problèmes.",
          "category": "Offre d'entrée"
        },
        "price": "30",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "30.00",
          "priceCurrency": "EUR",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      }, {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Offre Ascension",
          "description": "Tout de Tremplin + Visibilité projet + Génération IA de livrables + Masterclass mensuelles.",
          "category": "Offre recommandée"
        },
        "price": "100",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "100.00",
          "priceCurrency": "EUR",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      }, {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Offre ÉLITE",
          "description": "Tout d'Ascension + 6 journées business développement + Accès plateforme formation + Priorité 1 sur demandes.",
          "category": "Offre premium"
        },
        "price": "190",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "190.00",
          "priceCurrency": "EUR",
          "unitText": "MONTH"
        },
        "availability": "https://schema.org/InStock"
      }]
    }
  };
  const croissanceFaqs = [{
    question: "Qui peut rejoindre Mare Nostrum Croissance ?",
    answer: "Mare Nostrum Croissance s'adresse aux entrepreneurs et dirigeants d'entreprises à impact, porteurs de projets innovants, inclusifs et durables. Que vous soyez en phase d'amorçage ou de développement, nos offres s'adaptent à votre stade de maturité."
  }, {
    question: "Quelle est la différence entre les offres Tremplin, Ascension et ÉLITE ?",
    answer: "Tremplin est une session unique pour clarifier votre trajectoire. Ascension offre un accompagnement mensuel sur 6 mois avec accès au réseau et outils. ÉLITE propose un suivi premium intensif sur 12 mois avec des sessions individuelles bi-mensuelles et l'accès à tous nos experts."
  }, {
    question: "Peut-on essayer avant de s'engager ?",
    answer: "Oui ! Nous proposons une session découverte gratuite de 30 minutes pour comprendre vos besoins et vous présenter nos méthodes. Vous pouvez également commencer par l'offre Tremplin avant de vous engager sur un accompagnement plus long."
  }, {
    question: "Où se déroulent les sessions ?",
    answer: "Les sessions peuvent se dérouler en présentiel à Toulouse, Paris ou Casablanca, ou en distanciel selon vos préférences. Le Club organise également des événements réguliers dans nos 12 pays d'intervention en Afrique, au Maghreb et au Canada."
  }, {
    question: "Quels résultats puis-je attendre ?",
    answer: "Nous avons accompagné 24 entreprises dont 70% à impact (17 organisations). Plus de 80% de satisfaction clients, 210+ mises en relation professionnelles, 32 projets collaboratifs initiés. Notre réseau mobilise 135+ experts avec 2000 années d'expérience cumulées dans 12 pays."
  }];
  useEffect(() => {
    if (location.hash === "#offres") {
      const element = document.getElementById("offres");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [location]);
  return <div className="min-h-screen flex flex-col">
      <SEOHead title="Club Entrepreneur Toulouse & Afrique - Mare Nostrum Croissance | Accompagnement Startup" description="Rejoignez le Club Entrepreneur Mare Nostrum a Toulouse et en Afrique francophone. Accompagnement croissance startup a impact : Tremplin 30EUR, Ascension 100EUR, Elite 190EUR. 93% acceleration decisions. 135+ experts dans 12 pays." keywords="entrepreneuriat toulouse, entrepreneuriat afrique, club entrepreneur toulouse, accompagnement startup toulouse, croissance entreprise toulouse, startup toulouse, entrepreneur afrique francophone, mastermind entrepreneur, accompagnement entrepreneur afrique, incubateur toulouse, accelerateur toulouse, club entrepreneur francophone, mentorat toulouse, business development afrique" structuredData={croissanceSchema} faqSchema={croissanceFaqs} breadcrumbSchema={[{
      name: "Accueil",
      url: "https://marenostrum.tech/"
    }, {
      name: "Croissance",
      url: "https://marenostrum.tech/croissance"
    }]} />
      {/* Niteo Promotion Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-90">Nouveau programme entrepreneuriat <span className="inline-block mx-1.5 w-1 h-1 rounded-full bg-primary-foreground/40 align-middle"></span> Toulouse</span>
          <span className="hidden md:inline text-primary-foreground/40">|</span>
          <span className="text-xs md:text-sm opacity-80">Étudiant(e), jeune diplômé(e) ? Transforme ton idée en projet concret en 50h chrono <span className="inline-block mx-1 w-1 h-1 rounded-full bg-secondary align-middle"></span> 100% gratuit</span>
          <a href="https://niteo.marenostrum.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-xs md:text-sm h-7 md:h-8 px-3 md:px-4 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Candidater
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <Header />


      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-primary py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Mare Nostrum Croissance</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Sécurisez la trajectoire de votre entreprise à impact
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12">Nous accompagnons les entrepreneurs francophones qui veulent rapidement doubler leur activité et leur impact</p>
            <Button size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto" onClick={() => {
            document.getElementById('offres')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}>
              Rejoindre le Club 
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4 text-foreground">
            Tu te reconnais dans ça ?
          </h2>
          <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto text-sm md:text-base">
            Les défis courants des entrepreneurs à impact
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Manque de temps</h3>
              <p className="text-sm text-muted-foreground">Tu cours après le temps et as du mal à prioriser</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Multi-casquettes</h3>
              <p className="text-sm text-muted-foreground">Tu gères trop de fonctions en même temps</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Solitude</h3>
              <p className="text-sm text-muted-foreground">Tu es seul dans tes décisions stratégiques</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Structuration</h3>
              <p className="text-sm text-muted-foreground">Tu as besoin de structurer ton offre et ta prospection</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-foreground font-medium">
              Mare Nostrum Croissance est là pour t'aider à passer ces caps 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offres" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos 3 offres pour entrepreneurs
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Choisis le niveau d'accompagnement qui te correspond
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
            {/* Tremplin */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Tremplin</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "toulouse" && "30€"}
                  {selectedLocation === "afrique" && "24€"}
                  <span className="text-lg font-normal text-muted-foreground">/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès au club international d'entrepreneurs francophones</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès aux opportunités : détection d'opportunités de business et de financement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Café galère: 20 minutes pour résoudre un problème avec un membre de l'équipe</span>
                </li>
              </ul>

              <Button asChild className="w-full">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/00w3cx3W2bDr5Me6MO67S08" : "https://buy.stripe.com/dRmaEZ78e4aZ3E61su67S04"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Tremplin
                </a>
              </Button>
            </div>

            {/* Ascension - Highlighted */}
            <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-2 border-accent rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Ascension</h3>
                <div className="text-4xl font-bold mb-2">
                  {selectedLocation === "toulouse" && "100€"}
                  {selectedLocation === "afrique" && "84€"}
                  <span className="text-lg font-normal opacity-80">/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95"><strong>Tout de Tremplin</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Visibilité de votre projet via nos réseaux, partenaires et événements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Génération supervisée par IA d'un livrable</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Accès aux masterclass mensuelles</span>
                </li>
              </ul>

              <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/28E7sNakqcHvgqSdbc67S09" : "https://buy.stripe.com/28EbJ32RY4aZa2u6MO67S06"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Ascension
                </a>
              </Button>
            </div>

            {/* Élite */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Élite</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "toulouse" && "190€"}
                  {selectedLocation === "afrique" && "184€"}
                  <span className="text-lg font-normal text-muted-foreground">/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground"><strong>Tout d'Ascension</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">6 journées business développement et 5 webinaires/masterclasses par an</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès à la plateforme de formation en ligne</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Priorité 1 sur toutes les demandes</span>
                </li>
              </ul>

              <Button asChild variant="default" className="w-full">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/bJe5kF64a0YNgqS4EG67S0a" : "https://buy.stripe.com/6oUaEZ8cidLzeiK9Z067S07"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Élite
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

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Témoignages d'entrepreneurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard text="Quelque chose qui était présent à chaque instant (du Programme) c'est l'échange d'expérience et d'opinion. Ce qui permettait un retour permanent, constructif et pointilleux tout ça dans la bienveillance et la bonne humeur" author="Annabel" role="Étudiante et néo-entrepreneure accompagnée" organization="2024" />
            <TestimonialCard text="Un acteur efficace, engagé et authentique, qui accompagne réellement les établissements dans leur transformation." author="Géraldine" role="Directrice d'établissement partenaire" />
            <TestimonialCard text="Être ici aux côtés de l'ensemble des porteurs de projet, pour moi, c'était important. Parce que ce sont des jeunes audacieux, persévérants, et parce qu'on a besoin d'un entrepreneuriat qui est en capacité de pouvoir changer le monde. Ils mettent leurs convictions au service de solutions. Ce sont des solutions concrètes et performantes. Faites leur confiance, aidez-les, accompagnez-les !" author="Nadia" role="Vice-présidente de la Région Occitanie" />
          </div>
        </div>
      </section>

      {/* Photos Ateliers Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
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
              <img src={neoEntrepreneurElite} alt="Journée avec des néo-entrepreneurs dans l'offre élite Mare Nostrum" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">Offre Élite</h3>
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
    </div>;
};
export default Croissance;