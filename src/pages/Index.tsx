import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, TrendingUp, Users, Target, Lightbulb, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import hufLogo from "@/assets/partners/huf.png";
import bidayaLogo from "@/assets/partners/bidaya.png";
import toulouseWayLogo from "@/assets/partners/toulouse-way.png";
import airbusLogo from "@/assets/partners/airbus.png";
import roseLabLogo from "@/assets/partners/rose-lab.png";
import cpme31Logo from "@/assets/partners/cpme31.png";
import creditMutuelLogo from "@/assets/partners/credit-mutuel.png";
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">Sécurisons la trajectoire et l'impact des néo-entrepreneurs.</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12">
              Mare Nostrum accompagne les écoles et les entrepreneurs à impact.
De l'idée à la croissance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link to="/education">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Je suis une école
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/croissance">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Je suis entrepreneur
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/70">
              Implanté à Toulouse, Paris et Casablanca – francophonie, innovation et impact
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground">
              Qui sommes-nous ?
            </h2>
            <div className="prose prose-lg mx-auto text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Mare Nostrum est une entreprise de services aux entrepreneurs et aux établissements, fondée en 2023 à Toulouse, avec des bureaux à Paris et Casablanca.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Société à mission, familiale et interculturelle, notre raison d'être est de 
                <strong className="text-foreground"> sécuriser la trajectoire des entreprises à impact</strong> et 
                renforcer leurs capacités à coopérer, protéger le vivant, et inclure les publics vulnérables.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">Respect</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <span className="font-medium">Enthousiasme</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Fiabilité</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="font-medium">Impact</span>
                </div>
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-medium">Co-apprentissage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Poles */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Nos deux pôles d'expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Education Card */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Mare Nostrum Éducation</h3>
              <p className="text-lg text-accent font-medium mb-4">
                L'esprit d'entreprendre de demain au cœur de votre établissement aujourd'hui
              </p>
              <p className="text-muted-foreground mb-6">
                <strong>Public :</strong> Écoles, universités, organismes de formation
              </p>
              <p className="text-muted-foreground mb-6">
                <strong>Formats :</strong> Ateliers, fresques, cours, programmes premium, hackathons
              </p>
              <Button asChild variant="default" className="w-full">
                <Link to="/education">
                  Découvrir l'offre Éducation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Growth Card */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Mare Nostrum Croissance</h3>
              <p className="text-lg text-accent font-medium mb-4">
                Sécurisez votre passage à l'échelle avec un accompagnement rigoureux et humain
              </p>
              <p className="text-muted-foreground mb-6">
                <strong>Public :</strong> Entrepreneurs, dirigeants à impact
              </p>
              <p className="text-muted-foreground mb-6">
                <strong>Offres :</strong> Tremplin, Ascension, ÉLITE
              </p>
              <Button asChild variant="default" className="w-full">
                <Link to="/croissance">
                  Découvrir l'offre Croissance
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <StatCard value="53%" label="Création d'entreprise" description="vs 26% national" />
            <StatCard value=">95%" label="Satisfaction" description="Clients satisfaits" />
            <StatCard value="93%" label="Prise de décision" description="Clients accélérés" />
            <StatCard value="135+" label="Experts" description="Dans notre réseau" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Ils nous font confiance
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <TestimonialCard text="Mare Nostrum nous a permis de structurer notre programme d'entrepreneuriat avec des outils concrets et une vraie expertise pédagogique." author="Sophie Martin" role="Directrice Innovation" organization="École de Commerce" />
            <TestimonialCard text="Grâce au Mastermind, j'ai pu clarifier ma stratégie et passer des caps que je repoussais depuis des mois. Un vrai catalyseur pour mon entreprise." author="Thomas Dubois" role="Fondateur" organization="Startup Impact" />
            <TestimonialCard text="L'accompagnement Premium nous a fait gagner un temps précieux. L'équipe Mare Nostrum comprend vraiment les enjeux des entreprises à mission." author="Leila Benali" role="CEO" organization="Social Business" />
          </div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Nos Partenaires et Référents
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ils nous font confiance et contribuent à notre mission
            </p>
            
            <Carousel opts={{
            align: "start",
            loop: true
          }} plugins={[Autoplay({
            delay: 2000
          })]} className="w-full">
              <CarouselContent>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={hufLogo} alt="HUF" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={bidayaLogo} alt="Bidaya" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={toulouseWayLogo} alt="Toulouse Way" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={airbusLogo} alt="Airbus Développement" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={roseLabLogo} alt="Rose Lab" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={cpme31Logo} alt="CPME 31 Haute-Garonne" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <img src={creditMutuelLogo} alt="Crédit Mutuel" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* How to Work With Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Comment travailler avec nous ?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[{
              step: "1",
              title: "Rendez-vous de découverte",
              description: "Échangeons sur vos besoins et vos objectifs"
            }, {
              step: "2",
              title: "Diagnostic personnalisé",
              description: "École ou entreprise, nous analysons votre situation"
            }, {
              step: "3",
              title: "Proposition sur mesure",
              description: "Programme ou offre adaptée à vos enjeux"
            }, {
              step: "4",
              title: "Lancement & accompagnement",
              description: "Mise en œuvre avec notre équipe d'experts"
            }, {
              step: "5",
              title: "Évaluation d'impact",
              description: "Mesure des résultats et ajustements continus"
            }].map(item => <div key={item.step} className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>)}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/contact">
                  Planifier un appel découverte
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Prêt à construire l'avenir ensemble ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoignez les écoles et entrepreneurs qui transforment leurs ambitions en réalité
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/contact">
              Contactez-nous maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;