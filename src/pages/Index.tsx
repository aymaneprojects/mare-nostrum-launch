import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, TrendingUp, Users, Target, Lightbulb, Globe, ShieldCheck, Star, Award, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TestimonialCard from "@/components/TestimonialCard";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import FAQSection from "@/components/FAQSection";
import StatsSection from "@/components/StatsSection";
import { useFadeIn } from "@/hooks/useFadeIn";
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
const DarkLayers = ({ halo, vignette }: { halo: string; vignette: string }) => (
  <>
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 22px, hsl(var(--mn-turquoise) / 0.055) 22px 23px)' }}></div>
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at ${halo}, hsl(var(--mn-turquoise) / 0.18) 0%, transparent 52%), radial-gradient(ellipse at ${vignette}, hsl(var(--mn-ink) / 0.7) 0%, transparent 58%)` }}></div>
  </>
);

const Index = () => {
  const fadeHero        = useFadeIn(0);
  const fadeServices    = useFadeIn(0);
  const fadeTestimonials= useFadeIn(100);
  const fadeCTA         = useFadeIn(0);
  const fadePoles       = useFadeIn(0);
  const fadeHow         = useFadeIn(0);
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
          "addressCountry": "FR",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "48.856614",
            "longitude": "2.3522219"
          }
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Casablanca",
          "addressCountry": "MA",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "33.5731104",
            "longitude": "-7.5898434"
          }
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "priceRange": "€€",
      "image": "https://marenostrum.tech/logo.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+33-contact",
          "contactType": "Customer Service",
          "email": "contact@marenostrum.tech",
          "areaServed": ["FR", "MA", "TN", "DZ", "SN", "CI", "BJ", "CM", "BF", "CD", "EG", "CA"],
          "availableLanguage": ["French", "Arabic", "English"]
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
        "Entreprise à mission",
        "Accompagnement francophonie",
        "Développement Afrique",
        "Formation entrepreneurs"
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
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://marenostrum.tech/blog?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ];

  const faqs = [
    {
      question: "Qu'est-ce que Mare Nostrum ?",
      answer: "Mare Nostrum est un cabinet de conseil en entrepreneuriat à impact, fondé en 2023 à Toulouse. Nous accompagnons les écoles et les entrepreneurs à travers deux pôles : Mare Nostrum Éducation pour les programmes d'entrepreneuriat étudiant dans les écoles et universités, et Mare Nostrum Croissance pour les entrepreneurs à impact."
    },
    {
      question: "Quels programmes proposez-vous pour les étudiants entrepreneurs ?",
      answer: "Nous proposons le programme Niteo Toulouse, un parcours d'accélération entrepreneuriale de 50h pour étudiants en licence et master. Il comprend du e-learning, des ateliers collectifs, du coaching individuel et un Demo Day devant 30 décideurs. Nous proposons aussi des fresques de l'esprit d'entreprendre, des hackathons et des programmes premium pour les écoles."
    },
    {
      question: "Dans quelles villes êtes-vous présents ?",
      answer: "Mare Nostrum est implanté à Toulouse, Paris et Casablanca, avec un réseau de 135+ experts dans 12 pays : France, Maroc, Tunisie, Algérie, Sénégal, Côte d'Ivoire, Bénin, Cameroun, Burkina Faso, RD Congo, Égypte et Canada. Nous intervenons dans toute la francophonie."
    },
    {
      question: "Comment puis-je travailler avec Mare Nostrum ?",
      answer: "Commencez par planifier un rendez-vous de découverte gratuit. Nous analyserons vos besoins (école ou entreprise), vous proposerons une solution sur mesure, puis lancerons l'accompagnement avec notre équipe d'experts."
    },
    {
      question: "Quels résultats obtenez-vous avec vos clients ?",
      answer: "Nous avons accompagné 80+ entrepreneurs et 30+ écoles partenaires (70% de projets à impact). Plus de 95% de satisfaction clients, 210+ mises en relation professionnelles, 32 projets collaboratifs initiés. Notre réseau mobilise 135+ experts avec 2000 années d'expérience cumulées dans 12 pays."
    }
  ];

  return <div className="min-h-dvh flex flex-col">
      <EnhancedSEOHead 
        title="Mare Nostrum | Entrepreneuriat Toulouse, Afrique & Etudiant | Niteo" 
        description="Mare Nostrum, cabinet expert en entrepreneuriat a Toulouse et en Afrique francophone. Programme Niteo pour etudiants, accompagnement startups a impact, education entrepreneuriale. 135+ experts, 12 pays, +95% satisfaction." 
        keywords="entrepreneuriat toulouse, entrepreneuriat etudiant, entrepreneuriat afrique, entrepreneuriat etudiant toulouse, Niteo, Niteo Toulouse, programme Niteo, mare nostrum, conseil entrepreneuriat toulouse, accompagnement entrepreneur toulouse, incubateur toulouse, startup toulouse, creation entreprise toulouse, entrepreneuriat afrique francophone, entrepreneuriat francophonie, startup afrique, club entrepreneur, education entrepreneuriale, entrepreneuriat jeune, entrepreneuriat universite, entrepreneuriat ecole, Casablanca, Senegal, Cote d'Ivoire, entreprise a mission"
        structuredData={homePageSchema}
        faqSchema={faqs}
        
      />
      <Header />


      <section className="relative overflow-hidden flex flex-col justify-center min-h-[80svh] md:min-h-[80vh] py-14 md:py-28" style={{ background: 'linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)' }}>
        <DarkLayers halo="22% 18%" vignette="80% 88%" />
        {/* Halo turquoise très lent (transform uniquement) */}
        <div aria-hidden="true" className="mn-hero-halo absolute -top-[25%] -left-[20%] h-[75vmax] w-[75vmax] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--mn-turquoise) / 0.16) 0%, transparent 62%)' }}></div>
        {/* Grain fin en CSS pur */}
        <div aria-hidden="true" className="mn-grain absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mn-eyebrow-light mb-6 md:mb-8">depuis Toulouse, dans tout l'espace francophone</div>
            <p className="mn-body font-medium text-primary-foreground/80 mb-4 md:mb-6 max-w-xl mx-auto" style={{ letterSpacing: '0.01em' }}>
              Vous bâtissez un service ou un produit utile pour demain&nbsp;?
            </p>
            <h1 className="font-editorial italic font-medium text-primary-foreground mb-5 md:mb-8 break-words" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>Nous traçons la voie de votre <span className="text-turquoise">projet</span> vers ses <span className="text-turquoise">sources de revenus</span>.</h1>
            <p className="mn-lead text-primary-foreground/75 mb-8 md:mb-12 max-w-2xl mx-auto">
              Mare Nostrum accompagne les écoles et les entrepreneurs francophones.
            </p>

            <div className="mn-cta-row mn-cta-row--center">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto" style={{ boxShadow: 'var(--shadow-cta)' }}>
                <Link to="/education">
                  <GraduationCap className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Je suis une école
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                <Link to="/club">
                  <TrendingUp className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Rejoindre l'équipage
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      {/* Bande de preuves. Elle était en ivoire translucide et chevauchait le héros :
          entre deux sections sombres, cela donnait une barre grise à l'arête dure.
          Elle est désormais sombre, séparée par deux filets fins — la continuité
          du héros, pas une rupture. */}
      <section
        className="relative z-10 border-y border-primary-foreground/10 py-4 md:py-5"
        style={{ background: 'hsl(var(--mn-ink))' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-2.5">
            {[
              { icon: ShieldCheck, label: "Société à Mission" },
              { icon: Users, label: "80+ entrepreneurs" },
              { icon: Star, label: "30+ écoles partenaires" },
              { icon: Users, label: "135+ experts actifs" },
              { icon: MapPin, label: "12 pays d'intervention" },
              { icon: Award, label: "Soutenu par la Région Occitanie" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="mn-caption flex items-center gap-2 font-medium text-primary-foreground/75">
                <Icon className="h-4 w-4 flex-shrink-0 text-turquoise" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section ref={fadeServices as React.RefObject<HTMLElement>} className="relative overflow-hidden py-12 md:py-24" style={{ background: 'linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)' }}>
        <DarkLayers halo="78% 20%" vignette="15% 90%" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mn-eyebrow-light text-center mb-5">À propos</div>
            <h2 className="font-editorial italic text-center mb-6 md:mb-10 text-primary-foreground">
              Qui sommes-nous ?
            </h2>
            <div className="prose prose-lg mx-auto text-center max-w-[65ch]">
              <p className="mn-body text-primary-foreground/75 mb-5 md:mb-8">
                Mare Nostrum est une entreprise de services aux entrepreneurs et aux établissements, fondée en 2023 à Toulouse, avec des bureaux à Paris et Casablanca.
              </p>
              <p className="mn-body text-primary-foreground/75 mb-5 md:mb-8">
                Société à mission, familiale et interculturelle, notre raison d'être est de 
                <strong className="text-primary-foreground"> sécuriser la trajectoire des entreprises à impact</strong> et 
                renforcer leurs capacités à coopérer, protéger le vivant, et inclure les publics vulnérables.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-10 md:mt-14 pt-8 md:pt-10 border-t border-primary-foreground/15">
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-3 py-2 md:px-4 md:py-2 rounded-full text-sm md:text-base">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">Respect</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <span className="font-medium">Enthousiasme</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Fiabilité</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="font-medium">Impact</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">Co-apprentissage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Poles */}
      <section ref={fadePoles as React.RefObject<HTMLElement>} className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mn-eyebrow-turquoise text-center mb-5">Nos offres</div>
            <h2 className="font-editorial italic mb-8 md:mb-14 text-foreground">
              Nos deux pôles d'expertise
            </h2>

            <div className="grid md:grid-cols-2 gap-5 md:gap-8 max-w-6xl mx-auto">
              <Link
                to="/education"
                className="mn-pole group relative flex flex-col justify-between overflow-hidden rounded-lg p-6 md:p-10 min-h-[22rem] md:min-h-[30rem] shadow-lift card-interactive text-left"
              >
                <div aria-hidden="true" className="mn-pole-bg absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 15%, hsl(var(--mn-turquoise) / 0.22) 0%, transparent 60%), repeating-linear-gradient(135deg, transparent 0 22px, hsl(var(--mn-turquoise) / 0.07) 22px 23px), linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)' }}></div>
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, hsl(var(--mn-ink) / 0.92) 0%, hsl(var(--mn-ink) / 0.55) 42%, transparent 75%)' }}></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="mn-eyebrow-light mb-4">Mare Nostrum Éducation</div>
                  </div>
                  <span aria-hidden="true" className="mn-pole-arrow flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="relative z-10 mt-16">
                  <h3 className="font-editorial italic font-medium text-[length:var(--fs-h2)] leading-[1.2] text-primary-foreground mb-3 md:mb-4" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                    Le cap de l'esprit d'entreprendre
                  </h3>
                  <p className="mn-body text-primary-foreground/80">
                    De la sensibilisation à la professionnalisation, y compris la pré-incubation.
                  </p>
                </div>
              </Link>

              <Link
                to="/club"
                className="mn-pole group relative flex flex-col justify-between overflow-hidden rounded-lg p-6 md:p-10 min-h-[22rem] md:min-h-[30rem] shadow-lift card-interactive text-left"
              >
                <div aria-hidden="true" className="mn-pole-bg absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 15%, hsl(var(--mn-ivory) / 0.14) 0%, transparent 55%), repeating-linear-gradient(135deg, transparent 0 22px, hsl(var(--mn-ivory) / 0.06) 22px 23px), linear-gradient(135deg, hsl(181 67% 38%) 0%, hsl(181 67% 24%) 100%)' }}></div>
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, hsl(var(--mn-ink) / 0.92) 0%, hsl(var(--mn-ink) / 0.55) 42%, transparent 75%)' }}></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="mn-eyebrow-light mb-4">Mare Nostrum Croissance</div>
                  </div>
                  <span aria-hidden="true" className="mn-pole-arrow flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/40 text-primary-foreground">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="relative z-10 mt-16">
                  <h3 className="font-editorial italic font-medium text-[length:var(--fs-h2)] leading-[1.2] text-primary-foreground mb-3 md:mb-4" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
                    Le Quai des Entrepreneurs
                  </h3>
                  <p className="mn-body text-primary-foreground/80">
                    Vos premiers outils d'IA, vos partenaires &amp; clients, dans un seul espace digital.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <section ref={fadeTestimonials as React.RefObject<HTMLElement>} className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-5">Témoignages</div>
          <h2 className="font-editorial italic text-center mb-8 md:mb-12 text-foreground">
            Ils nous font confiance
          </h2>
          <div className="grid lg:grid-cols-2 lg:[&>:last-child]:col-span-2 gap-5 md:gap-8 max-w-6xl mx-auto">
            <TestimonialCard text="Quelque chose qui était présent à chaque instant (du Programme) c'est l'échange d'expérience et d'opinion. Ce qui permettait un retour permanent, constructif et pointilleux tout ça dans la bienveillance et la bonne humeur" author="Annabel" role="Étudiante et néo-entrepreneure accompagnée" organization="2024" />
            <TestimonialCard text="Un acteur efficace, engagé et authentique, qui accompagne réellement les établissements dans leur transformation." author="Géraldine Le Caer" role="Directrice d'établissement partenaire" />
            <TestimonialCard text="Être ici aux côtés de l'ensemble des porteurs de projet, pour moi, c'était important. Parce que ce sont des jeunes audacieux, persévérants, et parce qu'on a besoin d'un entrepreneuriat qui est en capacité de pouvoir changer le monde. Ils mettent leurs convictions au service de solutions. Ce sont des solutions concrètes et performantes. Faites leur confiance, aidez-les, accompagnez-les !" author="Nadia Pellefigue" role="Vice-présidente de la Région Occitanie" />
          </div>
        </div>
      </section>

      {/* Partners — bandeau continu */}
      <section className="relative overflow-hidden py-12 md:py-24" style={{ background: 'linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)' }}>
        <DarkLayers halo="50% 0%" vignette="50% 100%" />
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="font-editorial italic text-center mb-4 md:mb-6 text-primary-foreground">
              Nos Partenaires et Référents
            </h2>
            <p className="mn-body text-center text-primary-foreground/75 mb-8 md:mb-12 max-w-xl mx-auto">
              Ils nous font confiance et contribuent à notre mission
            </p>
          </div>
          <div className="mn-marquee mn-marquee-mask overflow-hidden motion-reduce:overflow-x-auto">
            <div className="mn-marquee-track flex w-max animate-scroll motion-reduce:animate-none">
                <div className="flex shrink-0 gap-4 md:gap-6 pr-4 md:pr-6">
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={hufLogo} alt="HUF - Partenaire Mare Nostrum accompagnement entrepreneuriat Toulouse" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={bidayaLogo} alt="Bidaya - Partenaire Mare Nostrum entrepreneuriat Maroc Casablanca" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulouseWayLogo} alt="Toulouse Way - Partenaire écosystème entrepreneurial Toulouse Occitanie" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={airbusLogo} alt="Airbus Développement - Partenaire innovation entreprises Toulouse Aerospace" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={roseLabLogo} alt="Rose Lab - Partenaire incubateur startups entreprises à impact" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={cpme31Logo} alt="CPME 31 Haute-Garonne - Confédération PME entrepreneurs Toulouse" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={creditMutuelLogo} alt="Crédit Mutuel - Partenaire financement entrepreneurs PME" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <a href="https://www.touleco.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulecoLogo} alt="Touleco - Média économique Toulouse Occitanie partenaire Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={imaginationsFertilesLogo} alt="Imaginations Fertiles - Partenaire créativité innovation entrepreneuriale" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://emergingbusinessfactory.com/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={emergingBusinessLogo} alt="Emerging Business Factory - Accélérateur startups scale-ups Toulouse" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.moovjee.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={moovjeeLogo} alt="Moovjee - Mouvement jeunes entrepreneurs France accompagnement création" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                </div>
                <div className="flex shrink-0 gap-4 md:gap-6 pr-4 md:pr-6" aria-hidden="true">
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={hufLogo} alt="Hub France IA, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={bidayaLogo} alt="Bidaya, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulouseWayLogo} alt="Toulouse Way, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={airbusLogo} alt="Airbus Developpement, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={roseLabLogo} alt="Rose Lab, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={cpme31Logo} alt="CPME 31, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={creditMutuelLogo} alt="Crédit Mutuel, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <a href="https://www.touleco.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulecoLogo} alt="ToulÉco, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={imaginationsFertilesLogo} alt="Les Imaginations Fertiles, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://emergingbusinessfactory.com/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={emergingBusinessLogo} alt="Emerging Business Factory, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.moovjee.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={moovjeeLogo} alt="Moovjee, partenaire de Mare Nostrum" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Work With Us */}
      <section ref={fadeHow as React.RefObject<HTMLElement>} className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-5">Notre approche</div>
          <h2 className="font-editorial italic text-center mb-8 md:mb-12 text-foreground">
            Comment travailler avec nous ?
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="border-b border-border">
              {([
                { title: "Rendez-vous de découverte",  description: "Échangeons sur vos besoins et vos objectifs" },
                { title: "Diagnostic personnalisé",    description: "École ou entreprise, nous analysons votre situation" },
                { title: "Proposition sur mesure",     description: "Programme ou offre adaptée à vos enjeux" },
                { title: "Lancement & accompagnement", description: "Mise en œuvre avec notre équipe d'experts" },
                { title: "Évaluation d'impact",        description: "Mesure des résultats et ajustements continus" },
              ]).map(item => (
                <div key={item.title} className="flex items-start gap-5 md:gap-8 py-6 md:py-8 mn-hairline">
                  <div>
                    <h3 className="mb-2 text-foreground">{item.title}</h3>
                    <p className="mn-body text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 md:mt-16">
              <Button asChild size="lg" className="w-full sm:w-auto" style={{ boxShadow: 'var(--shadow-cta)' }}>
                <a href="https://meet.marenostrum.tech/rdv-equipe" target="_blank" rel="noopener noreferrer">
                  Planifier un appel découverte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      {/* CTA Section */}
      <section ref={fadeCTA as React.RefObject<HTMLElement>} className="relative overflow-hidden py-16 md:py-28" style={{ background: 'linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)' }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 30%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 15% 80%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)' }}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mn-eyebrow-light mb-6">Travaillons ensemble</div>
          <h2 className="font-editorial italic mb-5 md:mb-8 text-primary-foreground break-words" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Prêt à construire l'avenir ensemble ?
          </h2>
          <p className="mn-lead text-primary-foreground/75 mb-8 md:mb-10 max-w-2xl mx-auto">
            Rejoignez les écoles et entrepreneurs qui transforment leurs ambitions en réalité
          </p>
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto" style={{ boxShadow: 'var(--shadow-cta)' }}>
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