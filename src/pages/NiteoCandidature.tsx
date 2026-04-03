import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, GraduationCap, Users, Lightbulb, Trophy, BookOpen, Calendar, Target, Clock, Award, Mic, Rocket, Globe, Briefcase, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import StructuredData from "@/components/StructuredData";

import logoNiteo from "@/assets/niteo/logo-niteo-2026.png";
import bertrandSerp from "@/assets/niteo/bertrand-serp.png";
import alexisJanicot from "@/assets/team/alexis-janicot.png";
import aymaneAbdennour from "@/assets/niteo/aymane-abdennour.jpeg";
import geraldinLecaer from "@/assets/niteo/geraldin-lecaer.jpeg";
import frederiqueBertelet from "@/assets/niteo/frederique-bertelet.jpeg";
import benjaminLebailly from "@/assets/niteo/benjamin-lebailly.jpeg";
import jeanBaptisteProst from "@/assets/niteo/jean-baptiste-prost.jpeg";
import ludovicDeGromard from "@/assets/niteo/ludovic-de-gromard.jpeg";
import pascalDavid from "@/assets/niteo/pascal-david.jpeg";
import abdallahHassani from "@/assets/niteo/abdallah-hassani.jpeg";
import jeanJodeau from "@/assets/niteo/jean-jodeau.jpeg";
import claireVirazels from "@/assets/niteo/claire-virazels.jpeg";
import christianTurpaud from "@/assets/niteo/christian-turpaud.jpeg";
import anneSophie from "@/assets/niteo/anne-sophie.jpeg";
import sebastien from "@/assets/niteo/sebastien.jpg";

import partnerToulouseMetropole from "@/assets/partners/toulouse-metropole.png";
import partnerAuf from "@/assets/partners/auf-niteo.png";
import partnerAirbusDev from "@/assets/partners/airbus-dev.png";
import partnerBanqueInnovation from "@/assets/partners/banque-innovation.png";
import partnerCreditMutuel from "@/assets/partners/credit-mutuel-niteo.png";
import partnerReseauEntreprendre from "@/assets/partners/reseau-entreprendre.png";
import partnerCpme31 from "@/assets/partners/cpme31-niteo.png";
import partnerEntreprisesMission from "@/assets/partners/entreprises-mission.png";
import partnerEdc from "@/assets/partners/edc.png";
import partnerBdd from "@/assets/niteo/bdd-logo.png";
import partnerMoovjee from "@/assets/niteo/moovjee-logo.png";
import partnerVenture from "@/assets/niteo/venture.png";
import partnerTouleco from "@/assets/niteo/touleco.png";
import partnerRoselab from "@/assets/niteo/roselab.png";
import partnerToulouseWay from "@/assets/niteo/toulouse-way.png";

const CTA_URL = "https://airtable.com/appZ8ykNuUOv89ou0/shrxZTmKppjTEHTjE";

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs font-mono">
      <Clock className="h-3.5 w-3.5" />
      <span className="text-primary-foreground/60">Il reste</span>
      <span className="tabular-nums">{timeLeft.days}j {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.mins).padStart(2, "0")}:{String(timeLeft.secs).padStart(2, "0")}</span>
    </div>
  );
};

const NiteoCandidature = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Niteo Toulouse 2026 - Programme Entrepreneuriat Étudiant Gratuit",
      "description": "Programme d'accélération entrepreneuriale gratuit de 50h pour étudiants et jeunes diplômés à Toulouse. Développe tes soft skills, coaching individuel sur mesure, plateforme e-learning dédiée, Demo Day devant 30 décideurs. +10 000 EUR de dotations. 95 projets déjà accompagnés.",
      "provider": {
        "@type": "Organization",
        "name": "Mare Nostrum",
        "sameAs": "https://marenostrum.tech"
      },
      "isAccessibleForFree": true,
      "educationalLevel": "Higher Education",
      "teaches": ["Entrepreneuriat", "Business model", "Pitch", "Leadership", "Startup", "Soft skills", "Innovation", "Coaching"],
      "inLanguage": "fr",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "startDate": "2026-04-11",
        "endDate": "2026-06-16",
        "courseMode": "Blended",
        "location": {
          "@type": "Place",
          "name": "Toulouse",
          "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressCountry": "FR" }
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Niteo Demo Day 2026",
      "startDate": "2026-06-16",
      "endDate": "2026-06-16",
      "eventStatus": "https://schema.org/EventScheduled",
      "image": "https://marenostrum.tech/favicon.png",
      "performer": { "@type": "Organization", "name": "Mare Nostrum", "url": "https://marenostrum.tech" },
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR", "url": "https://niteo.marenostrum.tech", "availability": "https://schema.org/InStock", "validFrom": "2026-01-01" },
      "location": { "@type": "Place", "name": "Toulouse", "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressCountry": "FR" } },
      "organizer": { "@type": "Organization", "name": "Mare Nostrum", "url": "https://marenostrum.tech" },
      "description": "Pitch devant 30 décideurs et +10 000 EUR de dotations pour les meilleurs projets étudiants."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Le programme Niteo est-il vraiment gratuit ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, Niteo est 100% gratuit pour les étudiants. Aucun frais d'inscription ni de participation. Le programme est financé par nos partenaires institutionnels et privés." } },
        { "@type": "Question", "name": "Dois-je déjà avoir un projet pour candidater ?", "acceptedAnswer": { "@type": "Answer", "text": "Non. Tu peux rejoindre Niteo avec une simple idée ou même juste l'envie d'entreprendre. Le programme t'accompagne de l'idée au pitch." } },
        { "@type": "Question", "name": "Quels sont les critères de sélection ?", "acceptedAnswer": { "@type": "Answer", "text": "Motivation, engagement, capacité à travailler en équipe. Pas besoin de compétences techniques spécifiques. Tout dossier incomplet sera éliminé." } },
        { "@type": "Question", "name": "Puis-je continuer mes études en parallèle ?", "acceptedAnswer": { "@type": "Answer", "text": "Absolument. Le programme est conçu pour s'articuler avec ton emploi du temps étudiant : e-learning flexible en semaine, ateliers le samedi." } },
        { "@type": "Question", "name": "Qu'est-ce que le Demo Day ?", "acceptedAnswer": { "@type": "Answer", "text": "Le Demo Day est la journée finale où tu pitches ton projet devant 30 décideurs toulousains (entrepreneurs, investisseurs, institutionnels). Les meilleurs projets se partagent +10 000 EUR de dotations." } },
        { "@type": "Question", "name": "Niteo développe-t-il vraiment mes soft skills ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui. Au-delà du business, Niteo développe tes compétences en leadership, prise de parole, gestion de projet et travail en équipe. C'est une expérience concrète qui compte sur ton CV." } },
        { "@type": "Question", "name": "Combien de projets ont déjà été accompagnés ?", "acceptedAnswer": { "@type": "Answer", "text": "Niteo a déjà accompagné 95 projets étudiants. Rejoins la communauté des entrepreneurs francophones à impact portée par Mare Nostrum." } },
      ]
    }
  ];

  const scrollToCTA = () => {
    window.open(CTA_URL, "_blank", "noopener,noreferrer");
  };

  const profiles = [
    { icon: <GraduationCap className="h-7 w-7" />, label: "Licence", desc: "Tu es en cycle licence et tu veux entreprendre" },
    { icon: <BookOpen className="h-7 w-7" />, label: "Master", desc: "Tu es en master et tu veux lancer ton projet" },
    { icon: <Award className="h-7 w-7" />, label: "Jeune diplômé", desc: "Diplômé depuis moins de 2 ans, tu veux te lancer" },
    { icon: <Lightbulb className="h-7 w-7" />, label: "Porteur d'idée", desc: "Tu as une idée mais tu ne sais pas par où commencer" },
    { icon: <Rocket className="h-7 w-7" />, label: "Motivé", desc: "Tu n'as pas encore d'idée mais l'entrepreneuriat t'attire" },
  ];

  const parcours = [
    { icon: <BookOpen className="h-7 w-7 text-primary-foreground" />, hours: "19h", title: "E-learning", desc: "Plateforme e-learning dédiée, accessible à ton rythme, où tu veux" },
    { icon: <Users className="h-7 w-7 text-primary-foreground" />, hours: "24h", title: "Ateliers collectifs", desc: "4 samedis en présentiel avec d'autres étudiants entrepreneurs" },
    { icon: <Target className="h-7 w-7 text-primary-foreground" />, hours: "2h", title: "Coaching individuel sur mesure", desc: "Accompagnement personnalisé avec un coach dédié à ton projet" },
    { icon: <Trophy className="h-7 w-7 text-primary-foreground" />, hours: "1 jour", title: "Demo Day", desc: "Pitch final devant 30 décideurs toulousains · test marché en conditions réelles" },
  ];

  const benefices = [
    "Business model structuré et validé",
    "Test marché en conditions réelles",
    "Proposition de valeur affinée",
    "Stratégie de lancement concrète",
    "Prototype ou MVP fonctionnel",
    "Pitch deck professionnel",
    "Soft skills entrepreneuriales renforcées",
    "Une expérience concrète qui compte sur ton CV",
    "Feedback d'un jury de pros",
    "Accompagnement post-programme 6 mois",
  ];

  const timeline = [
    { date: "Hors délai", label: "Liste d'attente ouverte", icon: <Mic className="h-5 w-5" />, active: true },
    { date: "1-3 avril", label: "Sélection des participants", icon: <Target className="h-5 w-5" /> },
    { date: "11 avril", label: "Atelier collectif 1", icon: <Users className="h-5 w-5" /> },
    { date: "2 mai", label: "Atelier collectif 2", icon: <Users className="h-5 w-5" /> },
    { date: "30 mai", label: "Atelier collectif 3", icon: <Users className="h-5 w-5" /> },
    { date: "13 juin", label: "Atelier collectif 4", icon: <Users className="h-5 w-5" /> },
    { date: "16 juin", label: "Demo Day", icon: <Trophy className="h-5 w-5" /> },
  ];

  const teamMareNostrum = [
    { name: "Alexis Janicot", role: "Président de Mare Nostrum", photo: alexisJanicot },
    { name: "Aymane Abdennour", role: "Chef de projet Niteo", photo: aymaneAbdennour },
    { name: "Géraldine Le Caër", role: "Membre du Comité de mission", photo: geraldinLecaer },
    { name: "Frédérique Bertelet", role: "Ingénieure pédagogique", photo: frederiqueBertelet },
  ];

  const coachs = [
    { name: "Pascal David", role: "Coach stratégie d'entreprise", photo: pascalDavid },
    { name: "Abdallah Hassani", role: "Coach prise de parole", photo: abdallahHassani },
    { name: "Jean Jodeau", role: "Avocat, juriste d'entreprise", photo: jeanJodeau },
    { name: "Claire Virazels", role: "Coach commercialisation", photo: claireVirazels },
    { name: "Christian Turpaud", role: "Coach business model ESS", photo: christianTurpaud },
  ];

  const experts = [
    { name: "Benjamin Lebailly", role: "DG Le Hibou (Next 40)", photo: benjaminLebailly },
    { name: "Jean-Baptiste Prost", role: "Entrepreneur, ambassadeur EDC", photo: jeanBaptisteProst },
    { name: "Ludovic De Gromard", role: "Entrepreneur social, Chance", photo: ludovicDeGromard },
    { name: "Anne-Sophie Alsif", role: "Économiste", photo: anneSophie },
    { name: "Sébastien Boussois", role: "Expert sciences politiques", photo: sebastien },
  ];

  const partners = [
    { src: partnerToulouseMetropole, alt: "Toulouse Métropole" },
    { src: partnerAuf, alt: "AUF" },
    { src: partnerAirbusDev, alt: "Airbus Développement" },
    { src: partnerBanqueInnovation, alt: "Banque de l'Innovation" },
    { src: partnerCreditMutuel, alt: "Crédit Mutuel" },
    { src: partnerReseauEntreprendre, alt: "Réseau Entreprendre" },
    { src: partnerCpme31, alt: "CPME 31" },
    { src: partnerEntreprisesMission, alt: "Entreprises à Mission" },
    { src: partnerEdc, alt: "EDC" },
    { src: partnerBdd, alt: "Bras Droit des Dirigeants" },
    { src: partnerMoovjee, alt: "Moovjee" },
    { src: partnerVenture, alt: "Ventury Avocats" },
    { src: partnerTouleco, alt: "Touleco" },
    { src: partnerRoselab, alt: "Rose Lab" },
    { src: partnerToulouseWay, alt: "Toulouse Way" },
  ];

  const faqs = [
    { q: "Le programme est-il vraiment gratuit ?", a: "Oui, Niteo est 100% gratuit pour les étudiants. Aucun frais d'inscription ni de participation. Le programme est financé par nos partenaires institutionnels et privés." },
    { q: "Dois-je déjà avoir un projet pour candidater ?", a: "Non. Tu peux rejoindre Niteo avec une simple idée ou même juste l'envie d'entreprendre. Le programme t'accompagne de zéro jusqu'au pitch devant des décideurs." },
    { q: "Quels sont les critères de sélection ?", a: "Motivation, engagement et capacité à travailler en équipe. Pas besoin de compétences techniques spécifiques. Attention : tout dossier incomplet sera éliminé." },
    { q: "Puis-je continuer mes études en parallèle ?", a: "Absolument. Le programme est conçu pour s'articuler avec ton emploi du temps : e-learning flexible en semaine, ateliers le samedi. Présence obligatoire en présentiel à Toulouse." },
    { q: "Qu'est-ce que le Demo Day ?", a: "C'est la journée finale où tu pitches ton projet devant 30 décideurs toulousains (entrepreneurs, investisseurs, institutionnels). Les meilleurs projets se partagent +10 000 EUR de dotations et intègrent le Club Mare Nostrum." },
    { q: "Niteo développe-t-il vraiment mes soft skills ?", a: "Oui. Au-delà du business, Niteo développe tes compétences en leadership, prise de parole, gestion de projet et travail en équipe. C'est une expérience concrète qui fait la différence sur ton CV et te prépare au monde professionnel." },
    { q: "Combien de projets ont déjà été accompagnés ?", a: "Niteo a déjà accompagné 95 projets étudiants. Rejoins la communauté des entrepreneurs francophones à impact portée par Mare Nostrum." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO */}
      <StructuredData data={structuredData} />
      
      {/* Sticky CTA bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-xl border-b border-primary-foreground/5 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <img src={logoNiteo} alt="Niteo" className="h-14" />
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <span className="text-primary-foreground/90 text-sm font-semibold tracking-[0.3em] uppercase">Toulouse</span>
            <span className="text-primary-foreground/40">|</span>
            <span className="text-accent text-xs font-semibold">Candidature hors délai — Accepté en liste d'attente</span>
          </div>
          <Button onClick={scrollToCTA} size="sm" variant="secondary" className="font-bold shadow-md hover:shadow-lg transition-shadow">
            Je candidate
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <img src={logoNiteo} alt="Logo Niteo Toulouse 2026" className="h-20 md:h-32 mx-auto mb-6" />
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-primary-foreground font-semibold text-sm">Gratuit · Places limitées</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Apprends à transformer ton idée en projet qui génère des revenus
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-4 max-w-2xl mx-auto">
              Étudiants et jeunes diplômés : développe tes soft skills, structure ton business et teste ton marché en 50h chrono.
            </p>
            <p className="text-base text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
              Tu ne sais pas par où commencer ? Ce n'est pas grave, tant que l'entrepreneuriat t'intéresse, c'est le plus important. Niteo t'accompagne de l'idée au pitch devant 30 décideurs toulousains.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 max-w-4xl mx-auto">
              {[
                { value: "50h", label: "de programme" },
                { value: "Gratuit", label: "100% financé" },
                { value: "+10 000 EUR", label: "de dotations" },
                { value: "30", label: "décideurs au jury" },
                { value: "95", label: "projets accompagnés" },
              ].map((s, i) => (
                <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{s.value}</div>
                  <div className="text-sm text-primary-foreground/70">{s.label}</div>
                </div>
              ))}
            </div>

            <Button onClick={scrollToCTA} size="lg" variant="secondary" className="text-lg font-bold px-10 py-6 shadow-lg hover:shadow-xl transition-shadow">
              Je candidate à Niteo 2026
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-primary-foreground/60 text-sm mt-4">Candidatures ouvertes jusqu'au 2 avril 2026</p>
          </div>
        </div>
      </section>

      {/* ===== POUR QUI ===== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Pour qui ?
          </h2>
          <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
            Niteo s'adresse aux étudiants et jeunes diplômés qui veulent entreprendre à Toulouse
          </p>
          <p className="text-center text-muted-foreground/80 mb-12 max-w-2xl mx-auto text-sm">
            Tu cherches à développer tes soft skills d'une façon différente ? Tu as envie d'entreprendre mais tu ne sais pas par où commencer ? Tant que l'entrepreneuriat t'intéresse, c'est le plus important.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {profiles.map((p, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {p.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">{p.label}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TON DEFI EN 50H ===== */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Ton défi en 50h chrono
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Un programme intensif et structuré pour passer de l'idée au pitch
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {parcours.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{item.hours}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CE QUE TU VAS VIVRE ===== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Ce que tu vas vivre concrètement
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: <Users className="h-6 w-6 text-accent" />, title: "Ateliers collectifs", desc: "Travaille avec d'autres étudiants entrepreneurs motivés. Échanges, entraide et dynamique de groupe pour avancer plus vite." },
              { icon: <Target className="h-6 w-6 text-accent" />, title: "Coaching individuel sur mesure", desc: "Un coach dédié t'accompagne sur les défis spécifiques de ton projet. 2h de face-à-face pour débloquer les points clés." },
              { icon: <BookOpen className="h-6 w-6 text-accent" />, title: "Plateforme e-learning", desc: "19h de contenu pédagogique accessible à ton rythme. Business model, marketing, finance, pitch : tout ce qu'il faut pour entreprendre." },
              { icon: <Mic className="h-6 w-6 text-accent" />, title: "Pitcher devant des décideurs", desc: "Le Demo Day : ta chance de présenter ton projet devant 30 entrepreneurs, investisseurs et institutionnels toulousains." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex-shrink-0 bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== A LA CLE ===== */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            À la clé
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {benefices.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{b}</span>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-8 text-primary-foreground text-center">
                <Trophy className="h-10 w-10 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">+10 000 EUR</div>
                <p className="text-primary-foreground/80">de dotations pour les meilleurs projets</p>
              </div>
              <div className="bg-gradient-to-br from-accent to-primary rounded-xl p-8 text-primary-foreground text-center">
                <Globe className="h-10 w-10 mx-auto mb-4" />
                <div className="text-xl font-bold mb-2">Club Mare Nostrum</div>
                <p className="text-primary-foreground/80">Intégration dans le réseau des entrepreneurs francophones à impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALENDRIER ===== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Calendrier
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Du 11 avril au 16 juin 2026 · Toulouse
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${t.active ? 'bg-accent/10 border-accent' : 'bg-card border-border'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${t.active ? 'bg-accent text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    {t.icon}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-foreground">{t.date}</span>
                    <span className="text-muted-foreground ml-2">{t.label}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
              <p className="text-sm text-foreground font-medium">
                Présence obligatoire en présentiel à Toulouse pour tous les ateliers collectifs et le Demo Day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COACHS ET MENTORS ===== */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Tes coachs et mentors
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Des professionnels engagés pour t'accompagner dans ton aventure entrepreneuriale
          </p>

          {/* Parrain */}
          <div className="max-w-md mx-auto mb-12 text-center">
            <img src={bertrandSerp} alt="Bertrand Serp, parrain Niteo 2026" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-accent" />
            <h3 className="text-xl font-bold text-foreground">Bertrand Serp</h3>
            <p className="text-accent font-semibold mb-1">Parrain Niteo 2026</p>
            <p className="text-sm text-muted-foreground">Vice-Président Toulouse Métropole en charge du numérique</p>
          </div>

          {/* Equipe Mare Nostrum */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-8 text-foreground">Équipe Mare Nostrum</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {teamMareNostrum.map((m, i) => (
                <div key={i} className="text-center">
                  <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border" />
                  <h4 className="font-bold text-sm text-foreground">{m.name}</h4>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coachs */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-8 text-foreground">Coachs</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {coachs.map((m, i) => (
                <div key={i} className="text-center">
                  <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border" />
                  <h4 className="font-bold text-sm text-foreground">{m.name}</h4>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experts & Entrepreneurs */}
          <div>
            <h3 className="text-xl font-bold text-center mb-8 text-foreground">Experts et entrepreneurs conseil</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {experts.map((m, i) => (
                <div key={i} className="text-center">
                  <img src={m.photo} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-border" />
                  <h4 className="font-bold text-sm text-foreground">{m.name}</h4>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTENAIRES ===== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos partenaires
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8 max-w-5xl mx-auto items-center">
            {partners.map((p, i) => (
              <div key={i} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src={p.src} alt={p.alt} className="max-h-16 w-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Questions fréquentes
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Prêt(e) à vivre l'aventure ?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-2 max-w-xl mx-auto">
            Rejoins les 95 projets déjà accompagnés.
          </p>
          <p className="text-base text-primary-foreground/70 mb-4 max-w-xl mx-auto">
            Candidatures ouvertes jusqu'au 2 avril 2026. Places limitées.
          </p>
          <p className="text-sm text-primary-foreground/60 mb-8">
            Tout dossier incomplet sera éliminé.
          </p>
          <Button onClick={scrollToCTA} size="lg" variant="secondary" className="text-lg font-bold px-12 py-6 shadow-xl hover:shadow-2xl transition-shadow">
            Candidate MAINTENANT
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="bg-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/60 text-sm">
            Niteo est un programme de{" "}
            <a href="https://marenostrum.tech" className="text-primary-foreground/80 underline hover:text-primary-foreground">Mare Nostrum</a>
            {" · "}Cabinet de conseil en entrepreneuriat à impact
          </p>
          <p className="text-primary-foreground/40 text-xs mt-2">
            Toulouse · Paris · Casablanca
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NiteoCandidature;
