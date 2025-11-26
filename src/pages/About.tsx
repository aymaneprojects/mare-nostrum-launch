import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Users, Target, Lightbulb, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import hufLogo from "@/assets/partners/huf.png";
import bidayaLogo from "@/assets/partners/bidaya.png";
import toulouseWayLogo from "@/assets/partners/toulouse-way.png";
import airbusLogo from "@/assets/partners/airbus.png";
import roseLabLogo from "@/assets/partners/rose-lab.png";
import cpme31Logo from "@/assets/partners/cpme31.png";
import creditMutuelLogo from "@/assets/partners/credit-mutuel.png";
import toulecoLogo from "@/assets/partners/touleco.png";
import imaginationsFertilesLogo from "@/assets/partners/imaginations-fertiles.png";
import emergingBusinessLogo from "@/assets/partners/emerging-business.png";
import moovjeeLogo from "@/assets/partners/moovjee.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="À propos Mare Nostrum - Cabinet Conseil Entrepreneuriat | Toulouse Paris Casablanca"
        description="Société à mission fondée en 2023 accompagnant entrepreneurs et établissements. Nos valeurs : respect, enthousiasme, fiabilité, impact, co-apprentissage. Réseau de 135+ experts à Toulouse, Paris, Casablanca."
        keywords="mare nostrum, à propos, équipe, valeurs, société à mission, toulouse, paris, casablanca, cabinet conseil, entrepreneuriat impact"
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "À propos", url: "https://marenostrum.tech/a-propos" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              À propos de Mare Nostrum
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90">
              Construire l'avenir avec les entrepreneurs d'aujourd'hui
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-foreground">Notre histoire</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Mare Nostrum est née en 2023 à Toulouse d'une conviction forte : <strong className="text-foreground">l'entrepreneuriat 
                à impact est le levier de transformation de nos sociétés</strong>.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Fondée par des entrepreneurs et des pédagogues passionnés, notre entreprise s'est donnée pour mission 
                d'accompagner celles et ceux qui veulent construire un monde plus juste, plus durable et plus inclusif.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Implantés à <strong className="text-foreground">Toulouse, Paris et Casablanca</strong>, nous agissons au cœur de la francophonie 
                entrepreneuriale pour créer des ponts entre les territoires et accélérer l'impact des projets qui comptent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">Notre raison d'être</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Société à mission, familiale et interculturelle, nous existons pour :
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Sécuriser les trajectoires</h3>
              <p className="text-muted-foreground">
                Accompagner les entreprises à impact dans leur croissance et leur passage à l'échelle
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Renforcer la coopération</h3>
              <p className="text-muted-foreground">
                Créer des espaces de collaboration et d'intelligence collective entre entrepreneurs
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Protéger le vivant</h3>
              <p className="text-muted-foreground">
                Encourager les projets qui incluent les publics vulnérables et protègent l'environnement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-foreground">Nos valeurs</h2>
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-card border border-border rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">Respect</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Nous plaçons l'humain au centre de nos actions et respectons la diversité des parcours et des cultures.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Enthousiasme</h3>
                <p className="text-muted-foreground">
                  Nous croyons en la force de l'énergie positive et de la passion pour transformer les projets en réalités.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Fiabilité</h3>
                <p className="text-muted-foreground">
                  Nos clients peuvent compter sur nous. Nous tenons nos engagements avec rigueur et professionnalisme.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Impact</h3>
                <p className="text-muted-foreground">
                  Chacune de nos actions vise un impact concret et mesurable sur les entrepreneurs et les écoles que nous accompagnons.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Co-apprentissage</h3>
                <p className="text-muted-foreground">
                  Nous grandissons ensemble avec nos clients et notre réseau. L'intelligence collective est au cœur de notre approche.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-primary to-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Globe className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Un réseau d'experts au service de votre réussite
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              <strong className="text-foreground">135+ experts</strong> mobilisables en France, au Maroc et dans toute la francophonie
            </p>
            <p className="text-lg text-muted-foreground mb-12">
              Consultants, formateurs, entrepreneurs expérimentés, investisseurs... Notre réseau pluridisciplinaire 
              et multiculturel est notre force pour vous accompagner avec excellence sur tous les sujets.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">🇫🇷</div>
                <h3 className="font-semibold text-foreground mb-2">Toulouse · Paris</h3>
                <p className="text-sm text-muted-foreground">Cœur de l'écosystème entrepreneurial français</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl font-bold text-accent mb-2">🇲🇦</div>
                <h3 className="font-semibold text-foreground mb-2">Casablanca</h3>
                <p className="text-sm text-muted-foreground">Pont vers l'Afrique et le monde arabe</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">🌍</div>
                <h3 className="font-semibold text-foreground mb-2">Francophonie</h3>
                <p className="text-sm text-muted-foreground">Réseau international d'experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
              Nos Partenaires et Référents
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ils nous font confiance et contribuent à notre mission
            </p>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                    <img src={hufLogo} alt="HUF - Partenaire Mare Nostrum accompagnement entrepreneuriat Toulouse" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                    <img src={bidayaLogo} alt="Bidaya - Partenaire Mare Nostrum entrepreneuriat Maroc Casablanca" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                    <img src={toulouseWayLogo} alt="Toulouse Way - Partenaire écosystème entrepreneurial Toulouse Occitanie" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                    <img src={airbusLogo} alt="Airbus Développement - Partenaire innovation entreprises Toulouse Aerospace" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                    <img src={roseLabLogo} alt="Rose Lab - Partenaire incubateur startups entreprises à impact" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                    <img src={cpme31Logo} alt="CPME 31 Haute-Garonne - Confédération PME entrepreneurs Toulouse" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                    <img src={creditMutuelLogo} alt="Crédit Mutuel - Partenaire financement entrepreneurs PME" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.touleco.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                      <img src={toulecoLogo} alt="Touleco - Média économique Toulouse Occitanie partenaire Mare Nostrum" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                      <img src={imaginationsFertilesLogo} alt="Imaginations Fertiles - Partenaire créativité innovation entrepreneuriale" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://emergingbusinessfactory.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                      <img src={emergingBusinessLogo} alt="Emerging Business Factory - Accélérateur startups scale-ups Toulouse" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.moovjee.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300">
                      <img src={moovjeeLogo} alt="Moovjee - Mouvement jeunes entrepreneurs France accompagnement création" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Envie de rejoindre l'aventure ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Que vous soyez une école ou un entrepreneur, commençons à construire ensemble
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/contact">
              Prendre contact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
