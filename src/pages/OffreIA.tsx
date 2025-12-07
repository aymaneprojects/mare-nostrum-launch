import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, BarChart3, Bot, Lightbulb, GraduationCap, Cog, TrendingUp, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import FAQSection from "@/components/FAQSection";

const OffreIA = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Formation en IA",
      description: "Formez vos équipes aux fondamentaux de l'intelligence artificielle et du machine learning. Programmes adaptés à tous niveaux.",
      features: ["Cours pratiques", "Tous niveaux", "Certification"]
    },
    {
      icon: Users,
      title: "Ateliers IA",
      description: "Ateliers pratiques pour découvrir et expérimenter les outils d'IA appliqués à votre secteur d'activité.",
      features: ["Hands-on", "Cas concrets", "Interactif"]
    },
    {
      icon: Cog,
      title: "Automatisations",
      description: "Automatisez vos processus métiers grâce à l'IA : gain de temps, réduction des erreurs, efficacité accrue.",
      features: ["Workflows", "Intégrations", "ROI mesurable"]
    },
    {
      icon: Bot,
      title: "Agents IA",
      description: "Développement d'agents intelligents sur mesure : chatbots, assistants virtuels, systèmes de recommandation.",
      features: ["Sur mesure", "24/7", "Multi-canal"]
    },
    {
      icon: BarChart3,
      title: "Études de marché IA",
      description: "Analyses prédictives et études de marché augmentées par l'IA et les statistiques avancées.",
      features: ["Data-driven", "Prédictif", "Actionnable"]
    },
    {
      icon: TrendingUp,
      title: "Machine Learning",
      description: "Modèles statistiques et algorithmes de machine learning pour optimiser vos décisions business.",
      features: ["Modèles custom", "Optimisation", "Scalable"]
    }
  ];

  const iaFaqs = [
    {
      question: "Quels types de projets IA accompagnez-vous ?",
      answer: "Nous accompagnons tous types de projets : automatisation de processus, chatbots et agents conversationnels, analyses prédictives, études de marché augmentées, et intégration d'IA dans des produits existants. Nos solutions s'adaptent aux startups comme aux entreprises établies."
    },
    {
      question: "Faut-il des compétences techniques pour bénéficier de vos services ?",
      answer: "Non, nos services sont conçus pour être accessibles à tous. Nous adaptons notre accompagnement à votre niveau technique, depuis la sensibilisation jusqu'à l'implémentation technique avancée. Notre approche pédagogique permet à chacun de comprendre et exploiter l'IA."
    },
    {
      question: "Combien coûte une formation ou un atelier IA ?",
      answer: "Les tarifs varient selon le format et la durée. Nous proposons des ateliers découverte, des formations sur plusieurs jours et des accompagnements sur mesure. Contactez-nous pour un devis personnalisé adapté à vos besoins et votre budget."
    },
    {
      question: "Comment l'IA peut-elle aider mon projet entrepreneurial ?",
      answer: "L'IA peut vous aider à automatiser des tâches répétitives, analyser vos données pour prendre de meilleures décisions, améliorer l'expérience client, optimiser vos opérations et créer de nouveaux produits ou services innovants. Nous identifions ensemble les cas d'usage les plus pertinents pour votre activité."
    },
    {
      question: "Quelle est votre méthodologie d'accompagnement ?",
      answer: "Notre approche combine expertise entrepreneuriale et technique : audit de vos besoins, identification des cas d'usage prioritaires, proof of concept rapide, formation de vos équipes, et accompagnement au déploiement. La dimension entrepreneuriale est intégrée à chaque étape."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <EnhancedSEOHead
        title="IA dans ton Projet | Intelligence Artificielle pour Entrepreneurs - Mare Nostrum"
        description="Intégrez l'intelligence artificielle dans votre projet entrepreneurial. Formation IA, ateliers, automatisations, agents IA et études de marché. Expertise Mare Nostrum à Toulouse, Paris, Casablanca."
        keywords="intelligence artificielle entrepreneur, formation IA, machine learning business, automatisation IA, agents IA, étude de marché IA, statistiques ML, toulouse, paris, casablanca"
        faqSchema={iaFaqs}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Mare Nostrum IA</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              L'IA au service de votre projet entrepreneurial
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12">
              Transformez votre entreprise grâce à l'intelligence artificielle. De la formation aux solutions sur mesure, nous vous accompagnons.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto">
              <Link to="/contact">
                Discuter de votre projet
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">
            Pourquoi intégrer l'IA dans votre projet ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Avantage compétitif</h3>
              <p className="text-muted-foreground">
                Différenciez-vous en exploitant les technologies les plus avancées pour résoudre les problèmes de vos clients
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Scalabilité</h3>
              <p className="text-muted-foreground">
                L'IA vous permet d'automatiser et de scaler vos opérations sans multiplier les ressources humaines
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Décisions data-driven</h3>
              <p className="text-muted-foreground">
                Prenez des décisions éclairées basées sur l'analyse de données et les prédictions de vos modèles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos services IA & Data
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Une équipe pluridisciplinaire combinant expertise entrepreneuriale, statistiques avancées et technologies d'intelligence artificielle
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Notre approche
                </h2>
                <p className="text-muted-foreground mb-8">
                  Une méthodologie éprouvée qui combine expertise technique et vision entrepreneuriale pour maximiser l'impact de l'IA sur votre activité.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Audit de vos besoins</h3>
                      <p className="text-muted-foreground">Identification des cas d'usage IA les plus pertinents pour votre activité.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Formation personnalisée</h3>
                      <p className="text-muted-foreground">Montée en compétences de vos équipes sur les outils et concepts clés.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Proof of Concept</h3>
                      <p className="text-muted-foreground">Prototypage rapide pour valider la valeur avant investissement majeur.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Déploiement & suivi</h3>
                      <p className="text-muted-foreground">Accompagnement continu pour garantir le succès de vos projets IA.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border">
                <div className="bg-gradient-to-br from-primary to-accent w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Dimension entrepreneuriale intégrée</h3>
                <p className="text-muted-foreground mb-6">
                  Notre expertise unique combine la maîtrise des technologies IA avec une compréhension profonde des enjeux entrepreneuriaux. 
                  Chaque solution est pensée pour générer de la valeur business.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    ROI mesurable sur chaque projet
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Solutions adaptées à votre stade de développement
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    Accompagnement stratégique et opérationnel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        faqs={iaFaqs}
        title="Questions fréquentes sur nos services IA"
      />

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Prêt à intégrer l'IA dans votre projet ?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Discutons de vos besoins et définissons ensemble comment l'intelligence artificielle 
              peut accélérer votre développement entrepreneurial.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/contact">
                Prendre rendez-vous
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OffreIA;