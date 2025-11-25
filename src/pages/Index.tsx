import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, TrendingUp, Users, Target, Lightbulb, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import FAQSection from "@/components/FAQSection";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import hufLogo from "@/assets/partners/huf.png";
import bidayaLogo from "@/assets/partners/bidaya.png";
import toulouseWayLogo from "@/assets/partners/toulouse-way.png";
import airbusLogo from "@/assets/partners/airbus.png";
import roseLabLogo from "@/assets/partners/rose-lab.png";
import cpme31Logo from "@/assets/partners/cpme31.png";
import creditMutuelLogo from "@/assets/partners/credit-mutuel.png";
import toulecoLogo from "@/assets/partners/touleco.png";
import imaginationsFertilesLogo from "@/assets/partners/imaginations-fertiles.png";
import emergingBusinessLogo from "@/assets/partners/emerging-business.png";
import moovjeeLogo from "@/assets/partners/moovjee.png";
const Index = () => {
  const homePageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Mare Nostrum",
      "alternateName": "Mare Nostrum - Conseil en Entrepreneuriat à Impact",
      "url": "https://marenostrum.tech",
      "logo": "https://marenostrum.tech/logo.png",
      "description": "Cabinet de conseil en entrepreneuriat à impact accompagnant les écoles et entrepreneurs à Toulouse, Paris et Casablanca",
      "foundingDate": "2023",
      "founders": [
        {
          "@type": "Person",
          "name": "Aymane"
        },
        {
          "@type": "Person",
          "name": "Alexis"
        }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Toulouse",
          "addressRegion": "Occitanie",
          "postalCode": "31000",
          "addressCountry": "FR",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "43.604652",
            "longitude": "1.444209"
          }
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressRegion": "Île-de-France",
          "addressCountry": "FR"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Casablanca",
          "addressCountry": "MA"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+33-contact",
          "contactType": "Customer Service",
          "email": "contact@marenostrum.tech",
          "areaServed": ["FR", "MA", "TN"],
          "availableLanguage": ["French", "Arabic"]
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/marenostrum"
      ],
      "slogan": "Sécurisons la trajectoire et l'impact des néo-entrepreneurs",
      "knowsAbout": [
        "Entrepreneuriat à impact",
        "Éducation entrepreneuriale",
        "Conseil en croissance",
        "Innovation sociale",
        "Entreprise à mission"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Conseil en Entrepreneuriat",
      "provider": {
        "@type": "Organization",
        "name": "Mare Nostrum"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Toulouse"
        },
        {
          "@type": "City",
          "name": "Paris"
        },
        {
          "@type": "City",
          "name": "Casablanca"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services Mare Nostrum",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mare Nostrum Éducation",
              "description": "Programmes d'éducation entrepreneuriale pour établissements"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mare Nostrum Croissance",
              "description": "Accompagnement des entrepreneurs à impact"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Mare Nostrum",
      "url": "https://marenostrum.tech",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://marenostrum.tech/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ];

  const faqs = [
    {
      question: "Qu'est-ce que Mare Nostrum ?",
      answer: "Mare Nostrum est un cabinet de conseil en entrepreneuriat à impact, fondé en 2023 à Toulouse. Nous accompagnons les écoles et les entrepreneurs à travers deux pôles : Mare Nostrum Éducation pour les établissements et Mare Nostrum Croissance pour les entrepreneurs."
    },
    {
      question: "Dans quelles villes êtes-vous présents ?",
      answer: "Mare Nostrum est implanté à Toulouse, Paris et Casablanca, avec une expertise particulière dans la francophonie. Nous intervenons également dans toute la France et au Maghreb selon les besoins."
    },
    {
      question: "Quels sont vos domaines d'expertise ?",
      answer: "Nous sommes spécialisés dans l'entrepreneuriat à impact, l'éducation entrepreneuriale, l'accompagnement à la croissance, l'innovation sociale et les entreprises à mission. Nos valeurs sont le respect, l'enthousiasme, la fiabilité, l'impact et le co-apprentissage."
    },
    {
      question: "Comment puis-je travailler avec Mare Nostrum ?",
      answer: "Commencez par planifier un rendez-vous de découverte gratuit. Nous analyserons vos besoins (école ou entreprise), vous proposerons une solution sur mesure, puis lancerons l'accompagnement avec notre équipe d'experts."
    },
    {
      question: "Quels résultats obtenez-vous avec vos clients ?",
      answer: "Nos programmes affichent 53% de création d'entreprise (vs 26% national), plus de 95% de satisfaction clients, et 93% de nos clients accélèrent leur prise de décision. Nous mobilisons un réseau de plus de 135 experts."
    }
  ];

  return <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Mare Nostrum - Conseil en Entrepreneuriat à Impact | Toulouse, Paris, Casablanca"
        description="Mare Nostrum accompagne les écoles et entrepreneurs à impact. De l'idée à la croissance. Éducation entrepreneuriale et conseil en croissance à Toulouse, Paris et Casablanca."
        keywords="entrepreneuriat à impact, conseil entrepreneurial, éducation entrepreneuriale, Toulouse, Paris, Casablanca, francophonie, entreprise à mission"
        structuredData={homePageSchema}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-16 md:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 animate-fade-in leading-tight">Sécurisons la trajectoire et l'impact des néo-entrepreneurs.</h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12">
              Mare Nostrum accompagne les écoles et les entrepreneurs à impact.
De l'idée à la croissance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4">
              <Button asChild size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto">
                <Link to="/education">
                  <GraduationCap className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Je suis une école
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base md:text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
                <Link to="/croissance">
                  <TrendingUp className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Je suis entrepreneur
                </Link>
              </Button>
            </div>

            <p className="text-xs md:text-sm text-primary-foreground/70">
              Implanté à Toulouse, Paris et Casablanca – francophonie, innovation et impact
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-foreground">
              Qui sommes-nous ?
            </h2>
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Mare Nostrum est une entreprise de services aux entrepreneurs et aux établissements, fondée en 2023 à Toulouse, avec des bureaux à Paris et Casablanca.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Société à mission, familiale et interculturelle, notre raison d'être est de 
                <strong className="text-foreground"> sécuriser la trajectoire des entreprises à impact</strong> et 
                renforcer leurs capacités à coopérer, protéger le vivant, et inclure les publics vulnérables.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-6 md:mt-8">
                <div className="flex items-center space-x-2 bg-secondary px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">Respect</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <span className="font-medium">Enthousiasme</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Fiabilité</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="font-medium">Impact</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">Co-apprentissage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Poles */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 md:mb-16 text-foreground">
              Nos deux pôles d'expertise
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Link 
                to="/education" 
                className="bg-primary border-2 border-primary rounded-2xl p-8 md:p-10 transition-all duration-150 active:bg-primary/40 cursor-pointer"
              >
                <div>
                  <GraduationCap className="h-12 w-12 md:h-14 md:w-14 text-primary-foreground mx-auto mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-3">
                    Éducation
                  </h3>
                  <p className="text-sm md:text-base text-primary-foreground/90">
                    L'esprit d'entreprendre de demain au cœur de votre établissement aujourd'hui
                  </p>
                </div>
              </Link>

              <Link 
                to="/croissance" 
                className="bg-accent border-2 border-accent rounded-2xl p-8 md:p-10 transition-all duration-150 active:bg-accent/40 cursor-pointer"
              >
                <div>
                  <TrendingUp className="h-12 w-12 md:h-14 md:w-14 text-primary-foreground mx-auto mb-4" />
                  <h3 className="text-xl md:text-2xl font-bold text-primary-foreground mb-3">
                    Croissance
                  </h3>
                  <p className="text-sm md:text-base text-primary-foreground/90">
                    Sécurisez votre passage à l'échelle avec un accompagnement rigoureux et humain
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            <StatCard value="53%" label="Création d'entreprise" description="vs 26% national" />
            <StatCard value=">95%" label="Satisfaction" description="Clients satisfaits" />
            <StatCard value="93%" label="Prise de décision" description="Clients accélérés" />
            <StatCard value="135+" label="Experts" description="Dans notre réseau" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
            Ils nous font confiance
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-12">
            <TestimonialCard text="Quelque chose qui était présent à chaque instant (du Programme) c'est l'échange d'expérience et d'opinion. Ce qui permettait un retour permanent, constructif et pointilleux tout ça dans la bienveillance et la bonne humeur" author="Annabel" role="Étudiante et néo-entrepreneure accompagnée" organization="2024" />
            <TestimonialCard text="Un acteur efficace, engagé et authentique, qui accompagne réellement les établissements dans leur transformation." author="Géraldine Le Caer" role="Directrice d'établissement partenaire" />
            <TestimonialCard text="Être ici aux côtés de l'ensemble des porteurs de projet, pour moi, c'était important. Parce que ce sont des jeunes audacieux, persévérants, et parce qu'on a besoin d'un entrepreneuriat qui est en capacité de pouvoir changer le monde. Ils mettent leurs convictions au service de solutions. Ce sont des solutions concrètes et performantes. Faites leur confiance, aidez-les, accompagnez-les !" author="Nadia Pellefigue" role="Vice-présidente de la Région Occitanie" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Nos Partenaires et Référents
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ils nous font confiance et contribuent à notre mission
            </p>
            
            <Carousel opts={{
            align: "start",
            loop: true
          }} plugins={[Autoplay({
            delay: 2000
          })]} className="w-full">
              <CarouselContent>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={hufLogo} alt="HUF" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={bidayaLogo} alt="Bidaya" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={toulouseWayLogo} alt="Toulouse Way" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={airbusLogo} alt="Airbus Développement" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={roseLabLogo} alt="Rose Lab" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={cpme31Logo} alt="CPME 31 Haute-Garonne" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={creditMutuelLogo} alt="Crédit Mutuel" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.touleco.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <img src={toulecoLogo} alt="Touleco" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <img src={imaginationsFertilesLogo} alt="Imaginations Fertiles" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://emergingbusinessfactory.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <img src={emergingBusinessLogo} alt="Emerging Business Factory" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.moovjee.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <img src={moovjeeLogo} alt="Moovjee" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* How to Work With Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Comment travailler avec nous ?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[{
              step: "1",
              title: "Rendez-vous de découverte",
              description: "Échangeons sur vos besoins et vos objectifs"
            }, {
              step: "2",
              title: "Diagnostic personnalisé",
              description: "École ou entreprise, nous analysons votre situation"
            }, {
              step: "3",
              title: "Proposition sur mesure",
              description: "Programme ou offre adaptée à vos enjeux"
            }, {
              step: "4",
              title: "Lancement & accompagnement",
              description: "Mise en œuvre avec notre équipe d'experts"
            }, {
              step: "5",
              title: "Évaluation d'impact",
              description: "Mesure des résultats et ajustements continus"
            }].map(item => <div key={item.step} className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>)}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/contact">
                  Planifier un appel découverte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Prêt à construire l'avenir ensemble ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez les écoles et entrepreneurs qui transforment leurs ambitions en réalité
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/contact">
              Contactez-nous maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;