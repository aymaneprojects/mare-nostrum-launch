import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, GraduationCap, Users, Lightbulb, Trophy, BookOpen, Calendar, Star, Briefcase, Target, Clock, Award, Mic } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

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

import partnerToulouseMetropole from "@/assets/partners/toulouse-metropole.png";
import partnerAuf from "@/assets/partners/auf-niteo.png";
import partnerAirbusDev from "@/assets/partners/airbus-dev.png";
import partnerBanqueInnovation from "@/assets/partners/banque-innovation.png";
import partnerCreditMutuel from "@/assets/partners/credit-mutuel-niteo.png";
import partnerReseauEntreprendre from "@/assets/partners/reseau-entreprendre.png";
import partnerCpme31 from "@/assets/partners/cpme31-niteo.png";
import partnerEntreprisesMission from "@/assets/partners/entreprises-mission.png";
import partnerEdc from "@/assets/partners/edc.png";

const NiteoToulouse = () => {
  const niteoSchema = [{
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Programme Niteo Toulouse 2026",
    "description": "Programme d'accélération entrepreneuriale de 50h pour étudiants en licence et master. E-learning, ateliers collectifs, coaching individuel et Demo Day devant 30 décideurs.",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum",
      "sameAs": "https://marenostrum.tech"
    },
    "educationalLevel": "Higher Education",
    "teaches": ["Entrepreneuriat", "Business model", "Pitch", "Leadership", "Gestion de projet"],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "name": "Niteo Toulouse Édition 2026",
      "startDate": "2026-04-11",
      "endDate": "2026-06-16",
      "courseMode": "Blended",
      "location": {
        "@type": "Place",
        "name": "Toulouse",
        "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressCountry": "FR" }
      }
    }
  }, {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Niteo Demo Day 2026",
    "startDate": "2026-06-16",
    "location": { "@type": "Place", "name": "Toulouse" },
    "organizer": { "@type": "Organization", "name": "Mare Nostrum" },
    "description": "Journée finale du programme Niteo : pitch devant 30 décideurs et +10 000 EUR de dotations"
  }];

  const niteoFaqs = [
    {
      question: "À qui s'adresse le programme Niteo ?",
      answer: "Niteo s'adresse aux étudiants entrepreneurs en cycle licence et master, inscrits dans un établissement d'enseignement supérieur partenaire à Toulouse. Aucun prérequis technique n'est requis, seule la motivation entrepreneuriale compte."
    },
    {
      question: "Combien de temps dure le programme ?",
      answer: "Le programme représente 50 heures au total, réparties sur environ 2 mois : 19h de e-learning flexible, 24h de sessions collectives le samedi, et 2h de coaching individuel. Il se termine par un Demo Day le 16 juin 2026."
    },
    {
      question: "Quel est le coût pour l'établissement partenaire ?",
      answer: "Trois options sont proposées : Soutien (à votre convenance), Engagement (500 EUR HT avec 1 place garantie) et Pionnier (à partir de 1 500 EUR HT avec 2+ places garanties et tarif préservé en 2027). Exonération de TVA (DREETS Occitanie)."
    },
    {
      question: "Les étudiants doivent-ils avoir un projet pour participer ?",
      answer: "Non, les étudiants peuvent rejoindre Niteo avec une simple idée ou envie d'entreprendre. Le programme les accompagne dans la structuration de leur projet, du concept initial au pitch final."
    },
    {
      question: "Quels sont les avantages concrets pour l'école partenaire ?",
      answer: "L'école bénéficie d'un programme clé en main conforme Qualiopi, d'une visibilité auprès de l'écosystème entrepreneurial toulousain (30 décideurs, partenaires), et d'un renforcement de son image en matière d'insertion professionnelle."
    }
  ];

  const teamEntrepreneurs = [
    { name: "Alexis Janicot", role: "Fondateur Mare Nostrum", photo: alexisJanicot },
    { name: "Aymane Abdennour", role: "Entrepreneur conseil", photo: aymaneAbdennour },
    { name: "Géraldine Le Caer", role: "Entrepreneure conseil", photo: geraldinLecaer },
    { name: "Frédérique Bertelet", role: "Entrepreneure conseil", photo: frederiqueBertelet },
    { name: "Benjamin Lebailly", role: "Entrepreneur conseil", photo: benjaminLebailly },
    { name: "Jean-Baptiste Prost", role: "Entrepreneur conseil", photo: jeanBaptisteProst },
    { name: "Ludovic De Gromard", role: "Entrepreneur conseil", photo: ludovicDeGromard },
  ];

  const teamCoachs = [
    { name: "Pascal David", role: "Coach", photo: pascalDavid },
    { name: "Abdallah Hassani", role: "Coach", photo: abdallahHassani },
  ];

  const teamExperts = [
    { name: "Jean Jodeau", role: "Expert" },
    { name: "Claire Virazels", role: "Experte" },
    { name: "Christian Turpaud", role: "Expert" },
    { name: "Anne-Sophie Alsif", role: "Experte" },
    { name: "Sébastien Boussois", role: "Expert" },
  ];

  const partners = [
    { src: partnerToulouseMetropole, alt: "Toulouse Métropole" },
    { src: partnerAuf, alt: "AUF - Agence Universitaire de la Francophonie" },
    { src: partnerAirbusDev, alt: "Airbus Développement" },
    { src: partnerBanqueInnovation, alt: "Banque de l'Innovation by CA31" },
    { src: partnerCreditMutuel, alt: "Crédit Mutuel" },
    { src: partnerReseauEntreprendre, alt: "Réseau Entreprendre Occitanie Garonne" },
    { src: partnerCpme31, alt: "CPME 31 Haute-Garonne" },
    { src: partnerEntreprisesMission, alt: "Communauté des Entreprises à Mission" },
    { src: partnerEdc, alt: "Entrepreneurs et Dirigeants Chrétiens" },
  ];

  const timeline = [
    { date: "Mars 2026", label: "Appel à candidatures", icon: <Mic className="h-5 w-5" /> },
    { date: "1-3 avril", label: "Sélection des participants", icon: <Target className="h-5 w-5" /> },
    { date: "11 avril", label: "Atelier collectif 1", icon: <Users className="h-5 w-5" /> },
    { date: "5 mai", label: "Atelier collectif 2", icon: <Users className="h-5 w-5" /> },
    { date: "30 mai", label: "Atelier collectif 3", icon: <Users className="h-5 w-5" /> },
    { date: "13 juin", label: "Atelier collectif 4", icon: <Users className="h-5 w-5" /> },
    { date: "16 juin", label: "Demo Day", icon: <Trophy className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Niteo Toulouse 2026 - Programme Entrepreneuriat Étudiant | Mare Nostrum"
        description="Programme Niteo Toulouse 2026 : 50h d'accélération entrepreneuriale pour étudiants. E-learning, ateliers, coaching, Demo Day devant 30 décideurs. +10 000 EUR de dotations."
        keywords="niteo toulouse, programme entrepreneuriat étudiant, accélération startup étudiant, mare nostrum toulouse, demo day toulouse 2026"
        structuredData={niteoSchema}
        faqSchema={niteoFaqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Niteo Toulouse", url: "https://marenostrum.tech/niteo-toulouse" },
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <img src={logoNiteo} alt="Logo Niteo 2026" className="h-24 md:h-36 mx-auto mb-6 md:mb-8" />
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Édition Toulouse 2026</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Niteo by Mare Nostrum
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12">
              Accélérez l'insertion professionnelle de vos étudiants entrepreneurs avec un programme de 50h pour cycles licence et master
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto">
              <Link to="/contact">
                Rejoindre Niteo 2026
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2: Enjeux pedagogiques */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
            Les enjeux pédagogiques
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              { icon: <GraduationCap className="h-8 w-8 text-primary" />, title: "Attirer plus d'étudiants", desc: "Proposer des formations alignées avec les attentes du marché et les aspirations des jeunes" },
              { icon: <Lightbulb className="h-8 w-8 text-accent" />, title: "Compétences transversales", desc: "Développer le learning by doing, la créativité et l'autonomie entrepreneuriale" },
              { icon: <Users className="h-8 w-8 text-primary" />, title: "Communauté alumni", desc: "Structurer une communauté d'anciens engagée et active dans l'écosystème" },
              { icon: <Trophy className="h-8 w-8 text-accent" />, title: "Image d'insertion", desc: "Renforcer votre positionnement en matière d'insertion professionnelle et d'employabilité" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Pourquoi Niteo */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Pourquoi Niteo ?
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Du latin "briller, prospérer" -- Niteo incarne la volonté de faire rayonner les talents entrepreneuriaux de Toulouse.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Star className="h-7 w-7 text-white" />, title: "Faire rayonner l'école", desc: "Positionnez votre établissement comme acteur clé de l'entrepreneuriat étudiant" },
                { icon: <Briefcase className="h-7 w-7 text-white" />, title: "Accompagner les jeunes", desc: "Offrez à vos étudiants un tremplin concret vers la création d'entreprise" },
                { icon: <Award className="h-7 w-7 text-white" />, title: "Valoriser l'enseignement", desc: "Renforcez l'image de l'enseignement supérieur toulousain à travers l'entrepreneuriat" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6 mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Parcours 50h */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Le parcours de 50 heures
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Un programme structuré et progressif, piloté par 6 collaborateurs dédiés
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <BookOpen className="h-7 w-7 text-white" />, hours: "19h", title: "E-learning", desc: "Formation en ligne flexible, accessible à tout moment" },
              { icon: <Users className="h-7 w-7 text-white" />, hours: "24h", title: "Sessions collectives", desc: "4 ateliers pratiques multi-écoles le samedi" },
              { icon: <Target className="h-7 w-7 text-white" />, hours: "2h", title: "Coaching individuel", desc: "Accompagnement personnalisé pour chaque porteur de projet" },
              { icon: <Trophy className="h-7 w-7 text-white" />, hours: "5h", title: "Demo Day", desc: "Pitch final devant un jury de professionnels et décideurs" },
            ].map((item, i) => (
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

      {/* Section 5: 3 resultats immediats */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            3 résultats immédiats
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-foreground">Pédagogie éprouvée</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Testée et validée</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Conforme Qualiopi</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Livrables concrets</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-foreground">Écosystème mobilisé</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> 30 décideurs au Demo Day</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> +10 000 EUR de dotations</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Réseau professionnel actif</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-foreground">Structure optimisée</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Programme clé en main</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Mutualisation inter-écoles</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" /> Plateforme numérique dédiée</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Parrain */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Parrain de l'édition 2026</h2>
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg inline-block">
              <img
                src={bertrandSerp}
                alt="Bertrand SERP, Vice-Président de Toulouse Métropole"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-6 border-4 border-primary/20"
              />
              <h3 className="text-2xl font-bold text-foreground mb-2">Bertrand SERP</h3>
              <p className="text-muted-foreground">Vice-Président de Toulouse Métropole</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Calendrier */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Calendrier 2026
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-primary/20" />
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <div className="pt-2 md:pt-4">
                      <div className="text-sm font-semibold text-primary">{item.date}</div>
                      <div className="text-lg font-bold text-foreground">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Options tarifaires */}
      <section className="py-16 md:py-24 bg-background" id="offres">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Les 3 options tarifaires
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Exonération de TVA (DREETS Occitanie)
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Soutien */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Soutien</h3>
              <div className="text-3xl font-bold text-primary mb-6">À votre convenance</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">Ouverture du programme aux étudiants</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">Accès sécurisé à la plateforme</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">Logo sur les supports de communication</span></li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>

            {/* Engagement */}
            <div className="bg-card border-2 border-primary rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                Recommandé
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Engagement</h3>
              <div className="text-3xl font-bold text-primary mb-1">500 EUR HT</div>
              <div className="text-sm text-muted-foreground mb-6">par établissement</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">Tout ce qui est inclus dans Soutien</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">1 place garantie pour un étudiant</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">1 accès Demo Day</span></li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/contact">Choisir cette offre</Link>
              </Button>
            </div>

            {/* Pionnier */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Pionnier</h3>
              <div className="text-3xl font-bold text-primary mb-1">À partir de 1 500 EUR HT</div>
              <div className="text-sm text-muted-foreground mb-6">tarif préservé en 2027</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">Tout ce qui est inclus dans Engagement</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">2+ places garanties pour vos étudiants</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">2+ accès Demo Day</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">Tarif préservé pour l'édition 2027</span></li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Devenir Pionnier</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Equipe Niteo */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            L'équipe Niteo
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Des entrepreneurs et coachs expérimentés au service de vos étudiants
          </p>

          {/* Entrepreneurs conseil */}
          <div className="max-w-6xl mx-auto mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-8 text-center">Entrepreneurs conseil</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              {teamEntrepreneurs.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-3 border-2 border-primary/20"
                  />
                  <div className="font-semibold text-sm text-foreground">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Coachs */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-8 text-center">Coachs</h3>
            <div className="flex justify-center gap-12">
              {teamCoachs.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-3 border-2 border-primary/20"
                  />
                  <div className="font-semibold text-sm text-foreground">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Experts (placeholder) */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-8 text-center">Experts</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {teamExperts.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 border-2 border-primary/20">
                    <span className="text-2xl font-bold text-muted-foreground">{member.name.charAt(0)}</span>
                  </div>
                  <div className="font-semibold text-sm text-foreground">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Partenaires */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Partenaires écosystème
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Un réseau de partenaires engagés pour accompagner les talents
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
            {partners.map((partner) => (
              <div key={partner.alt} className="flex items-center justify-center h-16 md:h-20 grayscale hover:grayscale-0 transition-all duration-300">
                <img src={partner.src} alt={partner.alt} className="max-h-full max-w-[140px] md:max-w-[160px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: FAQ */}
      <FAQSection title="Questions fréquentes sur Niteo" faqs={niteoFaqs} />

      {/* Section 12: CTA final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
              Rejoignez Niteo Toulouse 2026
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Faites de votre établissement un acteur clé de l'entrepreneuriat étudiant à Toulouse
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto">
              <Link to="/contact">
                Rejoindre Niteo 2026
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Link>
            </Button>
            <p className="mt-6 text-primary-foreground/70 text-sm">
              contact@marenostrum.tech | +33 6 17 35 81 67
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NiteoToulouse;
