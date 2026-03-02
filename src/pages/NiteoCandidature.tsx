import { ArrowRight, CheckCircle2, GraduationCap, Users, Lightbulb, Trophy, BookOpen, Calendar, Target, Clock, Award, Mic, Rocket, Globe, Briefcase, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import StructuredData from "@/components/StructuredData";

import logoNiteo from "@/assets/niteo/logo-niteo.png";
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

const NiteoCandidature = () => {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Niteo Toulouse 2026 - Programme Entrepreneuriat Etudiant Gratuit",
      "description": "Programme d'acceleration entrepreneuriale gratuit de 50h pour etudiants a Toulouse. E-learning, ateliers collectifs, coaching individuel, Demo Day devant 30 decideurs. +10 000 EUR de dotations.",
      "provider": {
        "@type": "Organization",
        "name": "Mare Nostrum",
        "sameAs": "https://marenostrum.tech"
      },
      "isAccessibleForFree": true,
      "educationalLevel": "Higher Education",
      "teaches": ["Entrepreneuriat", "Business model", "Pitch", "Leadership", "Startup"],
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
      "location": { "@type": "Place", "name": "Toulouse", "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressCountry": "FR" } },
      "organizer": { "@type": "Organization", "name": "Mare Nostrum", "url": "https://marenostrum.tech" },
      "description": "Pitch devant 30 decideurs et +10 000 EUR de dotations pour les meilleurs projets etudiants."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Le programme Niteo est-il vraiment gratuit ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, Niteo est 100% gratuit pour les etudiants. Aucun frais d'inscription ni de participation. Le programme est finance par nos partenaires institutionnels et prives." } },
        { "@type": "Question", "name": "Dois-je deja avoir un projet pour candidater ?", "acceptedAnswer": { "@type": "Answer", "text": "Non. Tu peux rejoindre Niteo avec une simple idee ou meme juste l'envie d'entreprendre. Le programme t'accompagne de l'idee au pitch." } },
        { "@type": "Question", "name": "Quels sont les criteres de selection ?", "acceptedAnswer": { "@type": "Answer", "text": "Motivation, engagement, capacite a travailler en equipe. Pas besoin de competences techniques specifiques. Tout dossier incomplet sera elimine." } },
        { "@type": "Question", "name": "Puis-je continuer mes etudes en parallele ?", "acceptedAnswer": { "@type": "Answer", "text": "Absolument. Le programme est concu pour s'articuler avec ton emploi du temps etudiant : e-learning flexible en semaine, ateliers le samedi." } },
        { "@type": "Question", "name": "Qu'est-ce que le Demo Day ?", "acceptedAnswer": { "@type": "Answer", "text": "Le Demo Day est la journee finale ou tu pitches ton projet devant 30 decideurs toulousains (entrepreneurs, investisseurs, institutionnels). Les meilleurs projets se partagent +10 000 EUR de dotations." } },
      ]
    }
  ];

  const scrollToCTA = () => {
    window.open(CTA_URL, "_blank", "noopener,noreferrer");
  };

  const profiles = [
    { icon: <GraduationCap className="h-7 w-7" />, label: "Licence", desc: "Tu es en cycle licence et tu veux entreprendre" },
    { icon: <BookOpen className="h-7 w-7" />, label: "Master", desc: "Tu es en master et tu veux lancer ton projet" },
    { icon: <Award className="h-7 w-7" />, label: "Jeune diplome", desc: "Diplome depuis moins de 2 ans, tu veux te lancer" },
    { icon: <Lightbulb className="h-7 w-7" />, label: "Porteur d'idee", desc: "Tu as une idee mais tu ne sais pas par ou commencer" },
    { icon: <Rocket className="h-7 w-7" />, label: "Motive", desc: "Tu n'as pas encore d'idee mais l'entrepreneuriat t'attire" },
  ];

  const parcours = [
    { icon: <BookOpen className="h-7 w-7 text-primary-foreground" />, hours: "19h", title: "E-learning", desc: "Formation en ligne flexible, a ton rythme, ou tu veux" },
    { icon: <Users className="h-7 w-7 text-primary-foreground" />, hours: "24h", title: "Ateliers collectifs", desc: "4 samedis en presentiel avec d'autres etudiants entrepreneurs" },
    { icon: <Target className="h-7 w-7 text-primary-foreground" />, hours: "2h", title: "Coaching individuel", desc: "Accompagnement personnalise sur mesure avec un coach dedie" },
    { icon: <Trophy className="h-7 w-7 text-primary-foreground" />, hours: "1 jour", title: "Demo Day", desc: "Pitche ton projet devant 30 decideurs toulousains" },
  ];

  const benefices = [
    "Business model structure et valide",
    "Etude de marche en conditions reelles",
    "Proposition de valeur affinee",
    "Strategie de lancement concrete",
    "Prototype ou MVP fonctionnel",
    "Pitch deck professionnel",
    "Feedback d'un jury de pros",
    "Accompagnement post-programme 6 mois",
  ];

  const timeline = [
    { date: "Jusqu'au 2 avril", label: "Candidatures ouvertes", icon: <Mic className="h-5 w-5" />, active: true },
    { date: "1-3 avril", label: "Selection des participants", icon: <Target className="h-5 w-5" /> },
    { date: "11 avril", label: "Atelier collectif 1", icon: <Users className="h-5 w-5" /> },
    { date: "2 mai", label: "Atelier collectif 2", icon: <Users className="h-5 w-5" /> },
    { date: "30 mai", label: "Atelier collectif 3", icon: <Users className="h-5 w-5" /> },
    { date: "13 juin", label: "Atelier collectif 4", icon: <Users className="h-5 w-5" /> },
    { date: "16 juin", label: "Demo Day", icon: <Trophy className="h-5 w-5" /> },
  ];

  const teamMareNostrum = [
    { name: "Alexis Janicot", role: "President de Mare Nostrum", photo: alexisJanicot },
    { name: "Aymane Abdennour", role: "Chef de projet Niteo", photo: aymaneAbdennour },
    { name: "Geraldine Le Caer", role: "Membre du Comite de mission", photo: geraldinLecaer },
    { name: "Frederique Bertelet", role: "Ingenieure pedagogique", photo: frederiqueBertelet },
  ];

  const coachs = [
    { name: "Pascal David", role: "Coach strategie d'entreprise", photo: pascalDavid },
    { name: "Abdallah Hassani", role: "Coach prise de parole", photo: abdallahHassani },
    { name: "Jean Jodeau", role: "Avocat, juriste d'entreprise", photo: jeanJodeau },
    { name: "Claire Virazels", role: "Coach commercialisation", photo: claireVirazels },
    { name: "Christian Turpaud", role: "Coach business model ESS", photo: christianTurpaud },
  ];

  const experts = [
    { name: "Benjamin Lebailly", role: "DG Le Hibou (Next 40)", photo: benjaminLebailly },
    { name: "Jean-Baptiste Prost", role: "Entrepreneur, ambassadeur EDC", photo: jeanBaptisteProst },
    { name: "Ludovic De Gromard", role: "Entrepreneur social, Chance", photo: ludovicDeGromard },
    { name: "Anne-Sophie Alsif", role: "Economiste", photo: anneSophie },
    { name: "Sebastien Boussois", role: "Expert sciences politiques", photo: sebastien },
  ];

  const partners = [
    { src: partnerToulouseMetropole, alt: "Toulouse Metropole" },
    { src: partnerAuf, alt: "AUF" },
    { src: partnerAirbusDev, alt: "Airbus Developpement" },
    { src: partnerBanqueInnovation, alt: "Banque de l'Innovation" },
    { src: partnerCreditMutuel, alt: "Credit Mutuel" },
    { src: partnerReseauEntreprendre, alt: "Reseau Entreprendre" },
    { src: partnerCpme31, alt: "CPME 31" },
    { src: partnerEntreprisesMission, alt: "Entreprises a Mission" },
    { src: partnerEdc, alt: "EDC" },
    { src: partnerBdd, alt: "Bras Droit des Dirigeants" },
    { src: partnerMoovjee, alt: "Moovjee" },
    { src: partnerVenture, alt: "Ventury Avocats" },
    { src: partnerTouleco, alt: "Touleco" },
    { src: partnerRoselab, alt: "Rose Lab" },
    { src: partnerToulouseWay, alt: "Toulouse Way" },
  ];

  const faqs = [
    { q: "Le programme est-il vraiment gratuit ?", a: "Oui, Niteo est 100% gratuit pour les etudiants. Aucun frais d'inscription ni de participation. Le programme est finance par nos partenaires institutionnels et prives." },
    { q: "Dois-je deja avoir un projet pour candidater ?", a: "Non. Tu peux rejoindre Niteo avec une simple idee ou meme juste l'envie d'entreprendre. Le programme t'accompagne de zero jusqu'au pitch devant des decideurs." },
    { q: "Quels sont les criteres de selection ?", a: "Motivation, engagement et capacite a travailler en equipe. Pas besoin de competences techniques specifiques. Attention : tout dossier incomplet sera elimine." },
    { q: "Puis-je continuer mes etudes en parallele ?", a: "Absolument. Le programme est concu pour s'articuler avec ton emploi du temps : e-learning flexible en semaine, ateliers le samedi. Presence obligatoire en presentiel a Toulouse." },
    { q: "Qu'est-ce que le Demo Day ?", a: "C'est la journee finale ou tu pitches ton projet devant 30 decideurs toulousains (entrepreneurs, investisseurs, institutionnels). Les meilleurs projets se partagent +10 000 EUR de dotations et integrent le Club Mare Nostrum." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO */}
      <StructuredData data={structuredData} />
      
      {/* Sticky CTA bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <img src={logoNiteo} alt="Niteo" className="h-8" />
          <Button onClick={scrollToCTA} size="sm" variant="secondary" className="font-bold">
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
              <span className="text-primary-foreground font-semibold text-sm">Gratuit -- Places limitees</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Transforme ton idee en entreprise qui genere des revenus et de l'impact
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto">
              50h chrono pour structurer ton business, tester ton marche et pitcher devant 30 decideurs toulousains.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
              {[
                { value: "50h", label: "de programme" },
                { value: "Gratuit", label: "100% finance" },
                { value: "+10 000 EUR", label: "de dotations" },
                { value: "30", label: "decideurs au jury" },
              ].map((s, i) => (
                <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl md:text-3xl font-bold text-primary-foreground">{s.value}</div>
                  <div className="text-sm text-primary-foreground/70">{s.label}</div>
                </div>
              ))}
            </div>

            <Button onClick={scrollToCTA} size="lg" variant="secondary" className="text-lg font-bold px-10 py-6 shadow-lg hover:shadow-xl transition-shadow">
              Je candidate a Niteo 2026
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
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Niteo s'adresse aux etudiants et jeunes diplomes qui veulent entreprendre a Toulouse
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
            Ton defi en 50h chrono
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Un programme intensif et structure pour passer de l'idee au pitch
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
            Ce que tu vas vivre concretement
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: <Users className="h-6 w-6 text-accent" />, title: "Ateliers collectifs", desc: "Travaille avec d'autres etudiants entrepreneurs motives. Echanges, entraide et dynamique de groupe pour avancer plus vite." },
              { icon: <Target className="h-6 w-6 text-accent" />, title: "Coaching individuel sur mesure", desc: "Un coach dedie t'accompagne sur les defis specifiques de ton projet. 2h de face-a-face pour debloquer les points cles." },
              { icon: <BookOpen className="h-6 w-6 text-accent" />, title: "Plateforme e-learning", desc: "19h de contenu pedagogique accessible a ton rythme. Business model, marketing, finance, pitch : tout ce qu'il faut pour entreprendre." },
              { icon: <Mic className="h-6 w-6 text-accent" />, title: "Pitcher devant des decideurs", desc: "Le Demo Day : ta chance de presenter ton projet devant 30 entrepreneurs, investisseurs et institutionnels toulousains." },
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
            A la cle
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
                <p className="text-primary-foreground/80">Integration dans le reseau des entrepreneurs francophones a impact</p>
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
            Du 11 avril au 16 juin 2026 -- Toulouse
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
                Presence obligatoire en presentiel a Toulouse pour tous les ateliers collectifs et le Demo Day.
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
            Des professionnels engages pour t'accompagner dans ton aventure entrepreneuriale
          </p>

          {/* Parrain */}
          <div className="max-w-md mx-auto mb-12 text-center">
            <img src={bertrandSerp} alt="Bertrand Serp, parrain Niteo 2026" className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-accent" />
            <h3 className="text-xl font-bold text-foreground">Bertrand Serp</h3>
            <p className="text-accent font-semibold mb-1">Parrain Niteo 2026</p>
            <p className="text-sm text-muted-foreground">Vice-President Toulouse Metropole en charge du numerique</p>
          </div>

          {/* Equipe Mare Nostrum */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-8 text-foreground">Equipe Mare Nostrum</h3>
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
            Questions frequentes
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
            Pret(e) a vivre l'aventure ?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-4 max-w-xl mx-auto">
            Les candidatures sont ouvertes jusqu'au 2 avril 2026. Places limitees.
          </p>
          <p className="text-sm text-primary-foreground/60 mb-8">
            Tout dossier incomplet sera elimine.
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
            {" "}-- Cabinet de conseil en entrepreneuriat a impact
          </p>
          <p className="text-primary-foreground/40 text-xs mt-2">
            Toulouse -- Paris -- Casablanca
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NiteoCandidature;
