import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, BarChart3, Bot, Lightbulb, GraduationCap, Cog, TrendingUp, Users } from "lucide-react";

const OffreIA = () => {
  const services = [
    {
      icon: GraduationCap,
      title: "Formation en IA",
      description: "Formez vos équipes aux fondamentaux de l'intelligence artificielle et du machine learning. Programmes adaptés à tous niveaux."
    },
    {
      icon: Users,
      title: "Ateliers IA",
      description: "Ateliers pratiques pour découvrir et expérimenter les outils d'IA appliqués à votre secteur d'activité."
    },
    {
      icon: Cog,
      title: "Automatisations",
      description: "Automatisez vos processus métiers grâce à l'IA : gain de temps, réduction des erreurs, efficacité accrue."
    },
    {
      icon: Bot,
      title: "Agents IA",
      description: "Développement d'agents intelligents sur mesure : chatbots, assistants virtuels, systèmes de recommandation."
    },
    {
      icon: BarChart3,
      title: "Études de marché IA",
      description: "Analyses prédictives et études de marché augmentées par l'IA et les statistiques avancées."
    },
    {
      icon: TrendingUp,
      title: "Machine Learning",
      description: "Modèles statistiques et algorithmes de machine learning pour optimiser vos décisions business."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <EnhancedSEOHead
        title="IA dans ton Projet | Intelligence Artificielle pour Entrepreneurs"
        description="Intégrez l'intelligence artificielle dans votre projet entrepreneurial. Formation IA, ateliers, automatisations, agents IA et études de marché. Expertise Mare Nostrum."
        keywords="intelligence artificielle entrepreneur, formation IA, machine learning business, automatisation IA, agents IA, étude de marché IA, statistiques ML"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Brain className="w-5 h-5" />
                <span className="text-sm font-medium">Expertise Intelligence Artificielle</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                L'IA au service de votre <span className="text-primary">projet entrepreneurial</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transformez votre entreprise grâce à l'intelligence artificielle. De la formation aux solutions sur mesure, 
                nous vous accompagnons dans l'intégration de l'IA à chaque étape de votre développement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/contact">Discuter de votre projet</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/livre-entrepreneuriat">Télécharger notre Livre Blanc</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Notre expertise IA & Data
              </h2>
              <p className="text-lg text-muted-foreground">
                Une équipe pluridisciplinaire combinant expertise entrepreneuriale, 
                statistiques avancées et technologies d'intelligence artificielle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why IA + Entrepreneurship */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Pourquoi intégrer l'IA dans votre projet ?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Lightbulb className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Avantage compétitif</h3>
                        <p className="text-muted-foreground">Différenciez-vous en exploitant les technologies les plus avancées pour résoudre les problèmes de vos clients.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Scalabilité</h3>
                        <p className="text-muted-foreground">L'IA vous permet d'automatiser et de scaler vos opérations sans multiplier les ressources humaines.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <BarChart3 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Décisions data-driven</h3>
                        <p className="text-muted-foreground">Prenez des décisions éclairées basées sur l'analyse de données et les prédictions de vos modèles.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Notre approche</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Audit de vos besoins et cas d'usage IA
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Formation personnalisée de vos équipes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Proof of Concept et prototypage rapide
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Déploiement et accompagnement continu
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      Dimension entrepreneuriale intégrée
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Prêt à intégrer l'IA dans votre projet ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discutons de vos besoins et définissons ensemble comment l'intelligence artificielle 
                peut accélérer votre développement entrepreneurial.
              </p>
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/contact">Prendre rendez-vous</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OffreIA;
