import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Lightbulb, Trophy, BookOpen, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";

const Education = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-primary-foreground font-medium">Mare Nostrum Éducation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              L'esprit d'entreprendre au cœur de votre établissement
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12">
              Des dispositifs clés en main pour sensibiliser, former et accompagner vos étudiants vers l'entrepreneuriat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link to="/livre-blanc-education">
                  Télécharger le Livre Blanc : Pédagogie Entrepreneuriale 2025
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/contact">
                  Parler de votre projet pédagogique
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Les enjeux des établissements
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Transformation pédagogique</h3>
              <p className="text-muted-foreground">
                Innover dans vos méthodes d'enseignement et intégrer le digital pour former les entrepreneurs de demain
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Attractivité & engagement</h3>
              <p className="text-muted-foreground">
                Différencier votre offre de formation et engager vos étudiants dans des projets concrets et impactants
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Soutenabilité budgétaire</h3>
              <p className="text-muted-foreground">
                Optimiser vos ressources tout en respectant les contraintes réglementaires et budgétaires
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Ce que propose Mare Nostrum Éducation
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Des formats flexibles et modulables pour répondre à tous vos besoins pédagogiques
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Fresque */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">La Fresque de l'esprit d'entreprendre</h3>
              <p className="text-muted-foreground mb-6">
                Atelier collaboratif de 3h pour découvrir l'entrepreneuriat de manière ludique et engageante. Idéal pour sensibiliser un grand nombre d'étudiants.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Format participatif et ludique</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Adapté à tous niveaux</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">30-50 participants</span>
                </li>
              </ul>
            </div>

            {/* Atelier des Alliés */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">L'Atelier des Alliés</h3>
              <p className="text-muted-foreground mb-6">
                Session d'intelligence collective pour développer la créativité et l'esprit d'équipe autour de projets entrepreneuriaux concrets.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Co-création et collaboration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Méthodes d'innovation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">15-25 participants</span>
                </li>
              </ul>
            </div>

            {/* Hackathons */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Hackathons & Challenges</h3>
              <p className="text-muted-foreground mb-6">
                Événements sur-mesure pour stimuler l'innovation et développer des projets entrepreneuriaux en équipe sur 1 à 3 jours.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Format intensif</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Jury d'experts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Projets concrets</span>
                </li>
              </ul>
            </div>

            {/* Programme Premium */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Programme Premium Néo-Entrepreneurs</h3>
              <p className="text-muted-foreground mb-6">
                Accompagnement complet sur plusieurs mois pour structurer et accélérer les projets entrepreneuriaux de vos étudiants.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Suivi personnalisé</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Outils professionnels</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Réseau d'experts</span>
                </li>
              </ul>
            </div>

            {/* Cours */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Cours professionnalisants</h3>
              <p className="text-muted-foreground mb-6">
                Interventions pédagogiques personnalisées sur des thématiques entrepreneuriales spécifiques (pitch, modèle économique, stratégie...).
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Contenu sur-mesure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Intervenants experts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Format modulable</span>
                </li>
              </ul>
            </div>

            {/* Réseau */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Network className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Réseau territorial</h3>
              <p className="text-muted-foreground mb-6">
                Intégrez un réseau d'établissements et partagez les meilleures pratiques en pédagogie entrepreneuriale avec vos pairs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Événements collaboratifs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Partage d'expériences</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Veille pédagogique</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Résultats & preuve sociale
          </h2>
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">53%</div>
                <div className="text-muted-foreground">de création d'entreprise</div>
                <div className="text-sm text-muted-foreground">(vs 26% national)</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent mb-2">&gt;95%</div>
                <div className="text-muted-foreground">de satisfaction</div>
                <div className="text-sm text-muted-foreground">auprès des étudiants</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">20+</div>
                <div className="text-muted-foreground">établissements partenaires</div>
                <div className="text-sm text-muted-foreground">en France et au Maroc</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <TestimonialCard
              text="Mare Nostrum a transformé notre approche pédagogique. Les étudiants sont beaucoup plus engagés et concrets dans leurs projets."
              author="Dr. Marie Dupont"
              role="Responsable Entrepreneuriat"
              organization="Université de Toulouse"
            />
            <TestimonialCard
              text="Un partenariat enrichissant qui a permis à nos étudiants de développer une vraie culture entrepreneuriale avec des outils professionnels."
              author="Jean-Pierre Laurent"
              role="Directeur Pédagogique"
              organization="Business School Paris"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
              Prêt à développer l'esprit d'entreprendre dans votre établissement ?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Choisissez la formule qui vous correspond
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="text-xl font-bold text-primary-foreground mb-4">Télécharger le Livre Blanc</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Accédez à notre guide complet 2025
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/livre-blanc-education">
                    Télécharger le PDF
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="text-xl font-bold text-primary-foreground mb-4">Responsable pédagogique ?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Planifions un rendez-vous pour discuter de vos besoins
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/contact">
                    Planifier un rendez-vous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
                <h3 className="text-xl font-bold text-primary-foreground mb-4">Appel d'offres en cours ?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Envoyez-nous votre brief pour une réponse personnalisée
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/contact">
                    Nous envoyer un brief
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Education;
