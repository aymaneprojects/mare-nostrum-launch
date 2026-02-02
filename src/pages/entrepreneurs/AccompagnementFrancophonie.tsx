import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Users, Rocket, CheckCircle2, ArrowRight, MapPin, Sparkles, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

const AccompagnementFrancophonie = () => {
  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Incubateur Impact Toulouse-Casablanca",
      "description": "Accompagnement personnalisé pour entrepreneurs à impact dans l'espace francophone. Programmes Tremplin, Ascension et Élite.",
      "provider": {
        "@type": "Organization",
        "name": "Mare Nostrum",
        "sameAs": "https://marenostrum.tech"
      },
      "areaServed": [
        { "@type": "Country", "name": "France" },
        { "@type": "Country", "name": "Maroc" },
        { "@type": "Country", "name": "Sénégal" },
        { "@type": "Country", "name": "Côte d'Ivoire" }
      ],
      "serviceType": "Incubateur Entrepreneuriat"
    }
  ];

  const faqs = [
    {
      question: "À qui s'adressent vos programmes d'accompagnement ?",
      answer: "Nos programmes s'adressent aux entrepreneurs et porteurs de projets à impact dans l'espace francophone : France, Maroc, Sénégal, Côte d'Ivoire et autres pays francophones. Que vous soyez en phase d'idéation ou en développement, nous avons un programme adapté."
    },
    {
      question: "Quelle est la différence entre Tremplin, Ascension et Élite ?",
      answer: "Tremplin est pour les porteurs d'idées qui veulent valider leur projet. Ascension accompagne les entrepreneurs avec un projet validé qui cherchent à structurer leur croissance. Élite est notre programme premium avec un accompagnement intensif et personnalisé."
    },
    {
      question: "Comment candidater à un programme ?",
      answer: "Commencez par notre test de maturité projet gratuit. Selon votre score, nous vous recommanderons le programme le plus adapté et vous pourrez ensuite prendre rendez-vous pour un entretien."
    },
    {
      question: "Les programmes sont-ils en présentiel ou à distance ?",
      answer: "Nous proposons un format hybride. Les sessions de groupe peuvent être suivies à distance, et des rencontres présentielles sont organisées régulièrement à Toulouse et Casablanca."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Incubateur Impact Toulouse-Casablanca | Accompagnement Entrepreneurs Francophonie - Mare Nostrum"
        description="Rejoignez notre incubateur d'entrepreneurs à impact. Programmes d'accompagnement personnalisés Toulouse-Casablanca pour la francophonie. Test de maturité projet gratuit."
        keywords="incubateur toulouse, accompagnement entrepreneur, startup impact, francophonie entrepreneuriat, incubateur casablanca, mentorat entrepreneur"
        structuredData={pageSchema}
        faqSchema={faqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Entrepreneurs", url: "https://marenostrum.tech/entrepreneurs/accompagnement-francophonie-afrique" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <MapPin className="h-4 w-4 text-primary-foreground" />
              <span className="text-primary-foreground font-medium text-sm md:text-base">Toulouse - Casablanca</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Incubateur pour Entrepreneurs à Impact
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 md:mb-12 max-w-3xl mx-auto">
              Un accompagnement personnalisé pour transformer votre vision en réalité. Rejoignez une communauté d'entrepreneurs engagés dans l'espace francophone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-base md:text-lg">
                <Link to="/entrepreneurs/test-maturite-projet">
                  Tester la maturité de mon projet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base md:text-lg border-white/30 text-primary-foreground hover:bg-white/10">
                <Link to="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Vision */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              Notre vision de l'accompagnement
            </h2>
            <p className="text-lg text-muted-foreground">
              Nous croyons que l'entrepreneuriat à impact est un levier de transformation pour l'espace francophone. 
              Notre approche combine expertise locale et vision internationale pour vous accompagner dans votre aventure entrepreneuriale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Réseau francophone</h3>
              <p className="text-muted-foreground">
                Accédez à un écosystème d'entrepreneurs, mentors et partenaires à travers la francophonie
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Accompagnement humain</h3>
              <p className="text-muted-foreground">
                Des mentors expérimentés qui comprennent vos défis et vous guident à chaque étape
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Impact mesurable</h3>
              <p className="text-muted-foreground">
                Des méthodologies éprouvées pour mesurer et maximiser l'impact de votre projet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 Offres */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos programmes d'accompagnement
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Trois niveaux d'accompagnement adaptés à votre stade de développement
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tremplin */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary/80 to-primary w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Tremplin</h3>
              <p className="text-accent font-medium mb-4">Pour les porteurs d'idées</p>
              <p className="text-muted-foreground mb-6">
                Validez votre idée et structurez les bases de votre projet entrepreneurial.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ateliers de validation d'idée</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Sessions de groupe</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Accès à la communauté</span>
                </li>
              </ul>
            </div>

            {/* Ascension */}
            <div className="bg-card border-2 border-primary rounded-xl p-8 hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                Populaire
              </div>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Rocket className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Ascension</h3>
              <p className="text-accent font-medium mb-4">Pour les projets validés</p>
              <p className="text-muted-foreground mb-6">
                Structurez votre croissance avec un accompagnement régulier et des outils professionnels.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Mentorat mensuel</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ateliers thématiques</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Accès au réseau partenaires</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Outils de pilotage</span>
                </li>
              </ul>
            </div>

            {/* Élite */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-accent to-accent/80 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">Élite</h3>
              <p className="text-accent font-medium mb-4">Accompagnement premium</p>
              <p className="text-muted-foreground mb-6">
                Un accompagnement intensif et personnalisé pour accélérer votre développement.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Mentorat hebdomadaire</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Accès VIP aux événements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Mise en relation investisseurs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Support prioritaire</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Outils du Silo */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Outils et ressources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link 
              to="/entrepreneurs/test-maturite-projet"
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary group"
            >
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Test de maturité projet
              </h3>
              <p className="text-muted-foreground mb-4">
                Évaluez où vous en êtes en 5 minutes et découvrez le programme adapté à votre situation.
              </p>
              <span className="text-primary font-medium inline-flex items-center">
                Faire le test
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link 
              to="/entrepreneurs/mentorat-individuel"
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all hover:border-primary group"
            >
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                Mentorat individuel
              </h3>
              <p className="text-muted-foreground mb-4">
                Des séances personnalisées avec nos mentors experts pour débloquer vos challenges.
              </p>
              <span className="text-primary font-medium inline-flex items-center">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
            Prêt à rejoindre la communauté ?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Commencez par évaluer la maturité de votre projet. En 5 minutes, découvrez le programme le plus adapté à votre situation.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/entrepreneurs/test-maturite-projet">
              Évaluer mon projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
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

export default AccompagnementFrancophonie;
