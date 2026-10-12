import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, TrendingUp, Users, Target, Lightbulb, Globe, ShieldCheck, Star, Award, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TestimonialCard from "@/components/TestimonialCard";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import FAQSection from "@/components/FAQSection";

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
import centreFormationIcon from "@/assets/poles/centre-formation.png";
import poleExpertiseIcon from "@/assets/poles/pole-expertise.png";
import veluoIcon from "@/assets/poles/veluo.png";
import niteoIcon from "@/assets/poles/niteo.png";
import clubIcon from "@/assets/poles/club.png";
// Carte du héros : 119 Ko de données, chargée après le premier affichage.
const HeroMap = lazy(() => import("@/components/HeroMap"));
import PainPoints from "@/components/PainPoints";
import ImpactStats from "@/components/ImpactStats";
const DarkLayers =({ halo, vignette }: { halo: string; vignette: string }) => (
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

  const homePageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Conseil en Entrepreneuriat",
      "provider": { "@id": "https://www.marenostrum.tech/#organization" },
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
        title="Incubation et création d'entreprise Toulouse | Mare Nostrum" 
        description="Mare Nostrum accompagne entrepreneurs et étudiants à Toulouse : incubation, programme Niteo, club, mentorat. Création d'entreprise, Afrique francophone." 
        keywords="entrepreneuriat toulouse, entrepreneuriat etudiant, entrepreneuriat afrique, entrepreneuriat etudiant toulouse, Niteo, Niteo Toulouse, programme Niteo, mare nostrum, conseil entrepreneuriat toulouse, accompagnement entrepreneur toulouse, incubateur toulouse, startup toulouse, creation entreprise toulouse, entrepreneuriat afrique francophone, entrepreneuriat francophonie, startup afrique, club entrepreneur, education entrepreneuriale, entrepreneuriat jeune, entrepreneuriat universite, entrepreneuriat ecole, Casablanca, Senegal, Cote d'Ivoire, entreprise a mission"
        structuredData={homePageSchema}
        faqSchema={faqs}
        
      />
      <Header />
      <main id="contenu" className="flex-1">


      <section className="relative overflow-hidden flex flex-col justify-center min-h-[80svh] md:min-h-[80vh] py-14 md:py-28" style={{ background: 'linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)' }}>
        <DarkLayers halo="22% 18%" vignette="80% 88%" />
        {/* Halo turquoise très lent (transform uniquement) */}
        <div aria-hidden="true" className="mn-hero-halo absolute -top-[25%] -left-[20%] h-[75vmax] w-[75vmax] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--mn-turquoise) / 0.16) 0%, transparent 62%)' }}></div>
        {/* Grain fin en CSS pur */}
        <div aria-hidden="true" className="mn-grain absolute inset-0 pointer-events-none"></div>
        <Suspense fallback={null}><HeroMap /></Suspense>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mn-eyebrow-light mb-6 md:mb-8">Structure d'accompagnement à l'entrepreneuriat</div>
            <p className="mn-body font-medium text-primary-foreground/80 mb-4 md:mb-6 max-w-xl mx-auto" style={{ letterSpacing: '0.01em' }}>
              L'alliance des traversées entrepreneuriales francophones
            </p>
            <h1 className="font-editorial italic font-medium text-primary-foreground mb-5 md:mb-8 break-words" style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
              Entre l’idée et les premiers clients, il y a une traversée.
              <span className="block">Nous la menons avec vous.</span>
            </h1>
            <p className="mn-lead text-primary-foreground/75 mb-8 md:mb-12 max-w-2xl mx-auto">
              Mare Nostrum se construit pour celles et ceux qui agissent pour un monde meilleur
            </p>

            <div className="mn-cta-row mn-cta-row--center">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto" style={{ boxShadow: 'var(--shadow-cta)' }}>
                <Link to="/expertise">
                  <GraduationCap className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Je suis une institution
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                <Link to="/education">
                  <TrendingUp className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Je suis un entrepreneur
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      {/* Bande de preuves. Elle était en ivoire translucide et chevauchait le héros :
          entre deux sections sombres, cela donnait une barre grise à l'arête dure.
          Elle est désormais sombre, séparée par deux filets fins - la continuité
          du héros, pas une rupture. */}
      <section
        className="relative z-10 border-y border-primary-foreground/10 py-4 md:py-5"
        style={{ background: 'hsl(var(--mn-ink))' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-2.5">
            {[
              { icon: ShieldCheck, label: "Société à Mission" },
              { icon: Users, label: "100+ entrepreneurs accompagnés" },
              { icon: Star, label: "30+ écoles partenaires" },
              { icon: Users, label: "135+ experts actifs" },
              { icon: MapPin, label: "11 pays d'intervention" },
              { icon: Award, label: "Depuis 2023" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="mn-caption flex items-center gap-2 font-medium text-primary-foreground/75">
                <Icon className="h-4 w-4 flex-shrink-0 text-turquoise" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PainPoints />
      <ImpactStats />

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
                Mare Nostrum est une structure d'accompagnement à l'entrepreneuriat, fondée en 2023. Plusieurs services sont proposés pour accompagner celles et ceux qui veulent lancer une nouvelle activité, dans la francophonie.
              </p>
              <p className="mn-body text-primary-foreground/75 mb-5 md:mb-8">
                Notre raison d'être est de renforcer les capacités des entreprises à devenir des acteurs plus efficaces de la coopération territoriale, de la protection du vivant et de l’inclusion de publics vulnérables.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-10 md:mt-14 pt-8 md:pt-10 border-t border-primary-foreground/15">
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm md:text-base">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">Respect</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <span className="font-medium">Enthousiasme</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Fiabilité</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="font-medium">Impact</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">Co-apprentissage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={fadePoles as React.RefObject<HTMLElement>} className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mn-eyebrow-turquoise text-center mb-5">Nos services</div>
            <h2 className="font-editorial italic mb-8 md:mb-14 text-foreground">
              Nous vous accompagnons à passer de l'idée à l'action.
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-7">
              {[
                { title: "Incubation", description: "Niteo : programme d’accompagnement", icon: niteoIcon, href: "https://niteo.marenostrum.tech/" },
                { title: "Formation professionnelle", description: "Certifié Qualiopi", icon: centreFormationIcon, href: "/education" },
                { title: "Conseil", description: "Pôle d’expertise et d’ingénierie pour l’enseignement supérieur", icon: poleExpertiseIcon, href: "/expertise" },
                { title: "Logiciel IA", description: "Veluo : agent IA des chefs de projet et des entrepreneurs", icon: veluoIcon, href: "https://veluo.marenostrum.tech/" },
                { title: "Réseau", description: "Club Mare Nostrum : communauté d’entrepreneurs dans la francophonie", icon: clubIcon, href: "/club" },
              ].map((service) => {
                const cardContent = (
                  <>
                    <img src={service.icon} alt="" aria-hidden="true" width={64} height={64} loading="lazy" decoding="async" className="h-16 w-16 mb-6 object-contain" />
                    <h3 className="mb-3 text-foreground">{service.title}</h3>
                    <p className="mn-body text-muted-foreground">{service.description}</p>
                  </>
                );

                const carteClass = "mn-card block h-full p-6 text-left hover-lift md:p-7";
                const carteLabel = `Découvrir ${service.title}`;
                return service.href?.startsWith("/") ? (
                  <Link key={service.title} to={service.href} className={carteClass} aria-label={carteLabel}>
                    {cardContent}
                  </Link>
                ) : service.href ? (
                  <a key={service.title} href={service.href} className={carteClass} aria-label={carteLabel}>
                    {cardContent}
                  </a>
                ) : (
                  <article key={service.title} className="mn-card p-6 md:p-7 text-left hover-lift">
                    {cardContent}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={fadeTestimonials as React.RefObject<HTMLElement>} className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-5">Témoignages</div>
          <h2 className="font-editorial italic text-center mb-8 md:mb-12 text-foreground">
            Ils nous font confiance
          </h2>
          <div className="grid lg:grid-cols-2 lg:[&>:last-child]:col-span-2 gap-5 md:gap-8 max-w-6xl mx-auto">
            <TestimonialCard text="Quelque chose qui était présent à chaque instant (du Programme) c'est l'échange d'expérience et d'opinion. Ce qui permettait un retour permanent, constructif et pointilleux tout ça dans la bienveillance et la bonne humeur" author="Annabel" role="Etudiante et néo-entrepreneure accompagnée par Mare Nostrum" />
            <TestimonialCard text="Un acteur efficace, engagé et authentique, qui accompagne réellement les établissements dans leur transformation." author="Géraldine" role="Directrice d'établissement d'enseignement partenaire" />
            <TestimonialCard text="Être ici aux côtés de l'ensemble des porteurs de projet, pour moi, c'était important. Parce que ce sont des jeunes audacieux, persévérants, et parce qu'on a besoin d'un entrepreneuriat qui est en capacité de pouvoir changer le monde. Ils mettent leurs convictions au service de solutions. Ce sont des solutions concrètes et performantes. Faites leur confiance, aidez-les, accompagnez-les !" author="Nadia Pellefigue" role="Vice-présidente de la région Occitanie (France)" />
          </div>
        </div>
      </section>

      {/* Partners - bandeau continu */}
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
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={hufLogo} alt="HUF - Partenaire Mare Nostrum accompagnement entrepreneuriat Toulouse" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={bidayaLogo} alt="Bidaya - Partenaire Mare Nostrum entrepreneuriat Maroc Casablanca" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulouseWayLogo} alt="Toulouse Way - Partenaire écosystème entrepreneurial Toulouse Occitanie" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={airbusLogo} alt="Airbus Développement - Partenaire innovation entreprises Toulouse Aerospace" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={roseLabLogo} alt="Rose Lab - Partenaire incubateur startups entreprises à impact" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={cpme31Logo} alt="CPME 31 Haute-Garonne - Confédération PME entrepreneurs Toulouse" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={creditMutuelLogo} alt="Crédit Mutuel - Partenaire financement entrepreneurs PME" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <a href="https://www.touleco.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulecoLogo} alt="Touleco - Média économique Toulouse Occitanie partenaire Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={imaginationsFertilesLogo} alt="Imaginations Fertiles - Partenaire créativité innovation entrepreneuriale" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://emergingbusinessfactory.com/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={emergingBusinessLogo} alt="Emerging Business Factory - Accélérateur startups scale-ups Toulouse" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.moovjee.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg"><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={moovjeeLogo} alt="Moovjee - Mouvement jeunes entrepreneurs France accompagnement création" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                </div>
                <div className="flex shrink-0 gap-4 md:gap-6 pr-4 md:pr-6" aria-hidden="true">
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={hufLogo} alt="Hub France IA, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={bidayaLogo} alt="Bidaya, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulouseWayLogo} alt="Toulouse Way, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={airbusLogo} alt="Airbus Developpement, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={roseLabLogo} alt="Rose Lab, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={cpme31Logo} alt="CPME 31, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <div className="group flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={creditMutuelLogo} alt="Crédit Mutuel, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div>
                  <a href="https://www.touleco.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={toulecoLogo} alt="ToulÉco, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={imaginationsFertilesLogo} alt="Les Imaginations Fertiles, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://emergingbusinessfactory.com/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={emergingBusinessLogo} alt="Emerging Business Factory, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                  <a href="https://www.moovjee.fr/" target="_blank" rel="noopener noreferrer" className="group block shrink-0 rounded-lg" tabIndex={-1}><div className="flex h-24 w-44 md:w-52 shrink-0 items-center justify-center rounded-lg bg-card p-5"><img src={moovjeeLogo} alt="Moovjee, partenaire de Mare Nostrum" loading="lazy" decoding="async" className="max-h-14 max-w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0 group-focus-visible:grayscale-0" /></div></a>
                </div>
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

      </main>
      <Footer />
    </div>;
};
export default Index;