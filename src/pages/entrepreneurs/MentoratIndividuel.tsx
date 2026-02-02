import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle2, ArrowRight, Calendar, MessageSquare, Target, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

// Import real team photos
import alexisJanicot from "@/assets/team/alexis-janicot.png";
import alainJanicot from "@/assets/team/alain-janicot.png";
import khalidEzzemani from "@/assets/team/khalid-ezzemani.png";

const mentors = [
  {
    name: "Alexis Janicot",
    role: "Co-fondateur & CEO",
    expertise: "Stratégie, développement commercial, levée de fonds",
    image: alexisJanicot
  },
  {
    name: "Alain Janicot",
    role: "Co-fondateur & Président",
    expertise: "Gouvernance, mentorat senior, développement international",
    image: alainJanicot
  },
  {
    name: "Khalid Ezzemani",
    role: "Directeur Maroc",
    expertise: "Développement Afrique, entrepreneuriat francophone, stratégie marché",
    image: khalidEzzemani
  }
];

const MentoratIndividuel = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mentorat Entrepreneur Individuel",
    "description": "Séances de mentorat individuelles avec des entrepreneurs expérimentés. Accompagnement personnalisé pour débloquer vos challenges.",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum"
    },
    "serviceType": "Mentorat Entrepreneurial"
  };

  const faqs = [
    {
      question: "Comment se déroule une séance de mentorat ?",
      answer: "Chaque séance dure 1 heure en visioconférence. Vous définissez l'ordre du jour selon vos priorités. Le mentor vous apporte conseils, retours d'expérience et vous aide à structurer votre réflexion et vos actions."
    },
    {
      question: "Comment choisir mon mentor ?",
      answer: "Après un premier échange avec notre équipe, nous vous proposons le mentor le plus adapté à votre projet, votre secteur et vos besoins spécifiques. Vous pouvez également exprimer vos préférences."
    },
    {
      question: "Quelle est la fréquence recommandée ?",
      answer: "Nous recommandons une séance toutes les 2 à 4 semaines pour maintenir une dynamique tout en vous laissant le temps d'implémenter les actions. La fréquence peut s'adapter selon vos besoins."
    },
    {
      question: "Puis-je annuler ou reporter une séance ?",
      answer: "Oui, vous pouvez reporter une séance jusqu'à 24h avant l'heure prévue. Nous comprenons que l'agenda d'un entrepreneur est parfois imprévisible."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Mentorat Entrepreneur Individuel | Séances 1-to-1 Expert - Mare Nostrum"
        description="Bénéficiez de séances de mentorat individuelles avec des entrepreneurs expérimentés. Accompagnement personnalisé pour débloquer vos challenges et accélérer votre projet."
        keywords="mentorat entrepreneur, coaching startup, accompagnement individuel, mentor business, conseil entrepreneur"
        structuredData={pageSchema}
        faqSchema={faqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Entrepreneurs", url: "https://marenostrum.tech/entrepreneurs/accompagnement-francophonie-afrique" },
          { name: "Mentorat individuel", url: "https://marenostrum.tech/entrepreneurs/mentorat-individuel" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { label: "Entrepreneurs", href: "/entrepreneurs/accompagnement-francophonie-afrique" },
                { label: "Mentorat individuel", href: "/entrepreneurs/mentorat-individuel" }
              ]}
            />
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 md:mb-6">
              Mentorat Entrepreneur Individuel
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Des séances personnalisées avec des entrepreneurs expérimentés pour débloquer vos challenges
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base md:text-lg">
              <Link to="/contact">
                Réserver ma première séance
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Comment ça fonctionne */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Comment ça fonctionne
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Premier contact</h3>
              <p className="text-sm text-muted-foreground">
                Échangez avec notre équipe pour définir vos besoins et objectifs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Matching mentor</h3>
              <p className="text-sm text-muted-foreground">
                Nous vous proposons le mentor le plus adapté à votre projet
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Séances régulières</h3>
              <p className="text-sm text-muted-foreground">
                Des rendez-vous de 1h en visio selon votre rythme
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Suivi continu</h3>
              <p className="text-sm text-muted-foreground">
                Accompagnement entre les séances et accès à nos ressources
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Ce que vous apporte le mentorat
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Clarté stratégique</h3>
              <p className="text-muted-foreground text-sm">
                Prenez du recul sur votre projet et clarifiez votre vision et vos priorités
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Retour d'expérience</h3>
              <p className="text-muted-foreground text-sm">
                Bénéficiez de l'expérience d'entrepreneurs qui sont passés par les mêmes étapes
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Réseau qualifié</h3>
              <p className="text-muted-foreground text-sm">
                Accédez à notre réseau de partenaires, investisseurs et experts
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Flexibilité totale</h3>
              <p className="text-muted-foreground text-sm">
                Des séances adaptées à votre emploi du temps, en présentiel ou à distance
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Gain de temps</h3>
              <p className="text-muted-foreground text-sm">
                Évitez les erreurs classiques et accélérez votre progression
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Responsabilisation</h3>
              <p className="text-muted-foreground text-sm">
                Un cadre régulier qui vous pousse à avancer et à tenir vos engagements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Mentors */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos mentors
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Des entrepreneurs expérimentés qui partagent leur expertise et leur réseau
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-foreground text-lg">{mentor.name}</h3>
                <p className="text-accent font-medium text-sm mb-3">{mentor.role}</p>
                <p className="text-muted-foreground text-sm">{mentor.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
            Prêt à être accompagné ?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Réservez un premier échange gratuit pour discuter de vos besoins et découvrir comment le mentorat peut vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/contact">
                Réserver un échange gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-white/30 text-primary-foreground hover:bg-white/10">
              <Link to="/entrepreneurs/test-maturite-projet">
                Faire le test de maturité
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lien retour silo */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 text-center">
          <Link 
            to="/entrepreneurs/accompagnement-francophonie-afrique"
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Découvrir tous nos programmes d'accompagnement
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Questions fréquentes"
        faqs={faqs}
      />

      <Footer />
    </div>
  );
};

export default MentoratIndividuel;
