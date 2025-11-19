import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award, Zap, MessageSquare, Calendar, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";

const Croissance = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-primary py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-primary-foreground font-medium">Mare Nostrum Croissance</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Sécurisez la trajectoire de votre entreprise à impact
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12">
              Club Entrepreneur International – Mare Nostrum
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <a href="https://buy.stripe.com/dRmaEZ78e4aZ3E61su" target="_blank" rel="noopener noreferrer">
                Rejoindre le Club <span className="ml-2 text-sm">(premier mois offert avec BIENVENUE)</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Tu te reconnais dans ça ?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Les défis courants des entrepreneurs à impact
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Manque de temps</h3>
              <p className="text-sm text-muted-foreground">Tu cours après le temps et as du mal à prioriser</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Multi-casquettes</h3>
              <p className="text-sm text-muted-foreground">Tu gères trop de fonctions en même temps</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Solitude</h3>
              <p className="text-sm text-muted-foreground">Tu es seul dans tes décisions stratégiques</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="bg-destructive/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Structuration</h3>
              <p className="text-sm text-muted-foreground">Tu as besoin de structurer ton offre et ta prospection</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-foreground font-medium">
              Mare Nostrum Croissance est là pour t'aider à passer ces caps 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos 3 offres pour entrepreneurs
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Choisis le niveau d'accompagnement qui te correspond
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tremplin */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Tremplin</h3>
                <div className="text-4xl font-bold text-primary mb-2">24€<span className="text-lg font-normal text-muted-foreground">/mois</span></div>
                <p className="text-sm text-muted-foreground">Frais d'inscription : 5€</p>
                <p className="text-sm text-accent font-medium">Premier mois offert avec BIENVENUE</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès au club international d'entrepreneurs francophones</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès aux opportunités : détection d'opportunités de business et de financement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Visio galère : 20 minutes pour résoudre un problème avec un membre de l'équipe</span>
                </li>
              </ul>

              <Button asChild className="w-full">
                <a href="https://buy.stripe.com/dRmaEZ78e4aZ3E61su67S04" target="_blank" rel="noopener noreferrer">
                  Rejoindre Tremplin
                </a>
              </Button>
            </div>

            {/* Ascension - Highlighted */}
            <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-2 border-accent rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Ascension</h3>
                <div className="text-4xl font-bold mb-2">84€<span className="text-lg font-normal opacity-80">/mois</span></div>
                <p className="text-sm opacity-90">Frais d'inscription : 50€</p>
                <p className="text-sm opacity-80">Tremplin inclus</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95"><strong>Tout de Tremplin</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Visibilité de votre projet via nos réseaux, partenaires et événements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Génération supervisée par IA d'un livrable</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Accès aux masterclass mensuelles</span>
                </li>
              </ul>

              <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
                <a href="https://buy.stripe.com/28EbJ32RY4aZa2u6MO67S06" target="_blank" rel="noopener noreferrer">
                  Rejoindre Ascension
                </a>
              </Button>
            </div>

            {/* ÉLITE */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">ÉLITE</h3>
                <div className="text-4xl font-bold text-primary mb-2">184€<span className="text-lg font-normal text-muted-foreground">/mois</span></div>
                <p className="text-sm text-muted-foreground">Frais d'inscription : 50€</p>
                <p className="text-sm text-accent font-medium">Frais d'inscription offerts avec BIENVENUE2</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground"><strong>Tout d'Ascension</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">6 journées business développement et 6 webinaires/masterclasses par an</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès à la plateforme de formation en ligne</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Priorité 1 sur toutes les demandes</span>
                </li>
              </ul>

              <Button asChild variant="default" className="w-full">
                <a href="https://buy.stripe.com/6oUaEZ8cidLzeiK9Z067S07" target="_blank" rel="noopener noreferrer">
                  Rejoindre ÉLITE
                </a>
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Pas sûr de quelle offre choisir ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Parler à Mare Nostrum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Témoignages d'entrepreneurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              text="Le Mastermind m'a permis de sortir de ma solitude d'entrepreneur et de prendre des décisions plus rapidement grâce aux retours du groupe."
              author="Karim Benali"
              role="Fondateur"
              organization="GreenTech Startup"
            />
            <TestimonialCard
              text="Avec l'offre Premium, j'ai structuré mon offre commerciale et multiplié mon CA par 3 en 6 mois. Un investissement qui vaut vraiment le coup !"
              author="Claire Moreau"
              role="CEO"
              organization="Impact Social"
            />
            <TestimonialCard
              text="Le Club Entrepreneur International Mare Nostrum m'a ouvert des portes incroyables. J'ai trouvé mes premiers clients et des partenaires stratégiques."
              author="Ahmed Ziani"
              role="Entrepreneur"
              organization="EdTech"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent via-primary to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Tu veux sortir la tête de l'eau et passer à l'action ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Clarifie ta vision, structure ta stratégie et accélère ta croissance avec Mare Nostrum
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                Réserver une session découverte
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">
                <MessageSquare className="mr-2 h-5 w-5" />
                Essayer 20 jours gratuits
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Croissance;
