import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Heart, Users, Target, Lightbulb, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import alexisJanicotImg from "@/assets/team/alexis-janicot.png";
import aymaneAbdennourImg from "@/assets/team/aymane-abdennour.png";
import julienneMukabucyanaImg from "@/assets/team/julienne-mukabucyana.jpg";
import yasmineArezkiImg from "@/assets/team/yasmine-arezki.jpg";
import muhannadAlfgiImg from "@/assets/team/muhannad-alfgi.jpg";
import marieCarolleMarcelinImg from "@/assets/team/marie-carolle-marcelin.jpg";
import lamineNdiayeImg from "@/assets/team/lamine-ndiaye.jpg";
import aristideEliezerGnangueBongomaImg from "@/assets/team/aristide-eliezer-gnangue-bongoma.jpg";
import claireGoursauImg from "@/assets/team/claire-goursau.jpg";
import bouchaibMernariImg from "@/assets/team/bouchaib-mernari.jpeg";
import geraldineLeCaerImg from "@/assets/team/geraldine-le-caer.jpg";
import khalidEzzemaniImg from "@/assets/team/khalid-ezzemani.png";

import alainJanicotImg from "@/assets/team/alain-janicot.png";
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
import neoEntrepreneurEliteImg from "@/assets/neo-entrepreneur-elite.png";
import francophonieScientiqueImg from "@/assets/francophonie-scientifique.png";
import DarkSection from "@/components/DarkSection";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <EnhancedSEOHead 
        title="A propos Mare Nostrum - Expert Entrepreneuriat Toulouse & Afrique | Niteo" 
        description="Mare Nostrum, societe a mission fondee en 2023 a Toulouse. Createurs du programme Niteo. 24 entreprises, 17+ projets etudiants accompagnes. 135+ experts, 2000 ans experience. Entrepreneuriat Toulouse, Afrique, francophonie." 
        keywords="mare nostrum, a propos, equipe, entrepreneuriat toulouse, niteo toulouse, programme niteo, entrepreneuriat afrique, societe a mission, toulouse, cabinet conseil, entrepreneuriat impact, francophonie, afrique, maghreb, incubateur toulouse" 
        
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Mare Nostrum",
          "foundingDate": "2023",
          "description": "Société à mission, cabinet conseil entrepreneuriat à impact. 24 entreprises accompagnées, 135+ experts dans 12 pays francophonie.",
          "url": "https://marenostrum.tech",
          "logo": "https://marenostrum.tech/logo.png",
          "address": [
            {
              "@type": "PostalAddress",
              "addressLocality": "Toulouse",
              "addressRegion": "Occitanie",
              "addressCountry": "FR"
            },
            {
              "@type": "PostalAddress",
              "addressLocality": "Paris",
              "addressCountry": "FR"
            },
            {
              "@type": "PostalAddress",
              "addressLocality": "Casablanca",
              "addressCountry": "MA"
            }
          ],
          "founders": [
            {
              "@type": "Person",
              "name": "Alexis Janicot",
              "jobTitle": "Fondateur et Dirigeant"
            },
            {
              "@type": "Person",
              "name": "Aymane Abdennour",
              "jobTitle": "Fondateur de Veluo by Mare Nostrum"
            }
          ],
          "employee": [

            {
              "@type": "Person",
              "name": "Khalid Ezzemani",
              "jobTitle": "Ambassadeur Mare Nostrum",
              "workLocation": "Casablanca, Maroc"
            },
            {
              "@type": "Person",
              "name": "Alain Janicot",
              "jobTitle": "Co-Fondateur",
              "workLocation": "Paris"
            },
            {
              "@type": "Person",
              "name": "Julienne Mukabucyana",
              "jobTitle": "Directrice du centre de formation",
              "workLocation": "Toulouse, France"
            },
            {
              "@type": "Person",
              "name": "Yasmine Arezki",
              "jobTitle": "Directrice du pôle d'expertise",
              "workLocation": "Toulouse, France"
            },
            {
              "@type": "Person",
              "name": "Muhannad Alfgi",
              "jobTitle": "Chargé de financements de projets",
              "workLocation": "Toulouse, France"
            },
            {
              "@type": "Person",
              "name": "Marie-Carolle Marcelin",
              "jobTitle": "Ambassadrice Mare Nostrum",
              "workLocation": "Toulouse, France"
            },
            {
              "@type": "Person",
              "name": "Lamine Ndiaye",
              "jobTitle": "Ambassadeur Mare Nostrum",
              "workLocation": "Dakar, Sénégal"
            },
            {
              "@type": "Person",
              "name": "Aristide-Eliezer Gnangue-Bongoma",
              "jobTitle": "Ambassadeur Mare Nostrum",
              "workLocation": "Brazzaville, République du Congo"
            },
            {
              "@type": "Person",
              "name": "Claire Goursau",
              "jobTitle": "Membre du comité de mission"
            },
            {
              "@type": "Person",
              "name": "Bouchaib Mernari",
              "jobTitle": "Membre du comité scientifique"
            },
            {
              "@type": "Person",
              "name": "Géraldine Le Caër",
              "jobTitle": "Membre du comité de mission"
            }
          ],
          "knowsAbout": [
            "Entrepreneuriat à impact",
            "Innovation sociale",
            "Éducation entrepreneuriale",
            "Accompagnement croissance startup",
            "Entreprise à mission",
            "Développement Afrique francophone"
          ],
          "slogan": "Sécurisons la trajectoire et l'impact des néo-entrepreneurs",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "7"
          }
        }}
      />
      <Header />

      {/* Hero Section */}
      <PageHero
        eyebrow="Notre histoire · 2023"
        title="À propos de Mare Nostrum"
        subtitle="Construire l'avenir avec les entrepreneurs d'aujourd'hui"
      />

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mn-eyebrow-turquoise mb-3">Nos origines</div>
            <h2 className="font-editorial italic mb-6 md:mb-8 text-foreground">Notre histoire</h2>
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
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <div className="mn-eyebrow-turquoise mb-3">Société à mission</div>
            <h2 className="font-editorial italic mb-4 md:mb-6 text-foreground">Notre raison d'être</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Société à mission, familiale et interculturelle, nous existons pour :
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="mn-card p-6 md:p-8 text-center hover-lift transition-all duration-200">
              <div className="bg-primary/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Sécuriser les trajectoires</h3>
              <p className="text-muted-foreground">
                Accompagner les entreprises à impact dans leur croissance et leur passage à l'échelle
              </p>
            </div>

            <div className="mn-card p-8 text-center hover-lift transition-all duration-200">
              <div className="bg-accent/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Renforcer la coopération</h3>
              <p className="text-muted-foreground">
                Créer des espaces de collaboration et d'intelligence collective entre entrepreneurs
              </p>
            </div>

            <div className="mn-card p-8 text-center hover-lift transition-all duration-200">
              <div className="bg-primary/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Protéger le vivant</h3>
              <p className="text-muted-foreground">
                Encourager les projets qui incluent les publics vulnérables et protègent l'environnement
              </p>
            </div>
          </div>
          
          {/* Image illustration mission */}
          <div className="mt-12 max-w-4xl mx-auto rounded-sm overflow-hidden shadow-[var(--shadow-medium)]">
            
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Ce qui nous guide</div>
          <h2 className="font-editorial italic text-center mb-8 md:mb-12 text-foreground">Nos valeurs</h2>
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {([
              { title: "Respect",          text: "Nous plaçons l'humain au centre de nos actions et respectons la diversité des parcours et des cultures." },
              { title: "Enthousiasme",     text: "Nous croyons en la force de l'énergie positive et de la passion pour transformer les projets en réalités." },
              { title: "Fiabilité",        text: "Nos clients peuvent compter sur nous. Nous tenons nos engagements avec rigueur et professionnalisme." },
              { title: "Impact",           text: "Chacune de nos actions vise un impact concret et mesurable sur les entrepreneurs et les écoles que nous accompagnons." },
              { title: "Co-apprentissage", text: "Nous grandissons ensemble avec nos clients et notre réseau. L'intelligence collective est au cœur de notre approche." },
            ]).map(v => (
              <div key={v.title} className="flex items-start gap-4 md:gap-5 p-4 md:p-6 mn-card">
                <div>
                  <h3 className="text-lg md:text-xl mb-2 text-foreground">{v.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Les visages de Mare Nostrum</div>
          <h2 className="font-editorial italic text-center mb-8 md:mb-12 text-foreground">Notre équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-20 gap-5 md:gap-7 max-w-6xl mx-auto">
            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 1 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={alexisJanicotImg} alt="Alexis Janicot" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Alexis Janicot</h3>
              <p className="text-sm md:text-base text-muted-foreground">Fondateur et dirigeant · Toulouse (France)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 2 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={aymaneAbdennourImg} alt="Aymane Abdennour" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Aymane Abdennour</h3>
              <p className="text-sm md:text-base text-muted-foreground">Chargé de développement de l'IA · Toulouse (France)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 4 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={julienneMukabucyanaImg} alt="Julienne Mukabucyana" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Julienne Mukabucyana</h3>
              <p className="text-sm md:text-base text-muted-foreground">Directrice du centre de formation · Toulouse (France)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 3 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={yasmineArezkiImg} alt="Yasmine Arezki" />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Yasmine Arezki</h3>
              <p className="text-sm md:text-base text-muted-foreground">Directrice du pôle d'expertise · Toulouse (France)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-4" style={{ order: 13 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={marieCarolleMarcelinImg} alt="Marie-Carolle Marcelin" />
                <AvatarFallback>MM</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Marie-Carolle Marcelin</h3>
              <p className="text-sm md:text-base text-muted-foreground">Ambassadrice Mare Nostrum à Toulouse (France)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-4" style={{ order: 12 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={lamineNdiayeImg} alt="Lamine Ndiaye" />
                <AvatarFallback>LN</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Lamine Ndiaye</h3>
              <p className="text-sm md:text-base text-muted-foreground">Ambassadeur Mare Nostrum à Dakar (Sénégal)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-4" style={{ order: 11 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={aristideEliezerGnangueBongomaImg} alt="Aristide-Eliezer Gnangue-Bongoma" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Aristide-Eliezer Gnangue-Bongoma</h3>
              <p className="text-sm md:text-base text-muted-foreground">Ambassadeur Mare Nostrum à Brazzaville (République du Congo)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 8 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={claireGoursauImg} alt="Claire Goursau" />
                <AvatarFallback>CG</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Claire Goursau</h3>
              <p className="text-sm md:text-base text-muted-foreground">Membre du comité de mission</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 6 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={bouchaibMernariImg} alt="Bouchaib Mernari" />
                <AvatarFallback>BM</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Bouchaib Mernari</h3>
              <p className="text-sm md:text-base text-muted-foreground">Membre du comité scientifique</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 7 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={geraldineLeCaerImg} alt="Géraldine Le Caër" />
                <AvatarFallback>GL</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Géraldine Le Caër</h3>
              <p className="text-sm md:text-base text-muted-foreground">Membre du comité de mission</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-5" style={{ order: 5 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={muhannadAlfgiImg} alt="Muhannad Alfgi" />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Muhannad Alfgi</h3>
              <p className="text-sm md:text-base text-muted-foreground">Chargé de financements de projets · Toulouse (France)</p>
            </div>


            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-4" style={{ order: 10 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={khalidEzzemaniImg} alt="Khalid Ezzemani" />
                <AvatarFallback>KE</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Khalid Ezzemani</h3>
              <p className="text-sm md:text-base text-muted-foreground">Ambassadeur Mare Nostrum à Casablanca (Maroc)</p>
            </div>

            <div className="mn-card p-5 text-center hover-lift transition-all duration-200 lg:col-span-4" style={{ order: 9 }}>
              <Avatar className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-3">
                <AvatarImage src={alainJanicotImg} alt="Alain Janicot" />
                <AvatarFallback className="text-2xl">AJ</AvatarFallback>
              </Avatar>
              <h3 className="text-lg md:text-xl mb-2 text-foreground">Alain Janicot</h3>
              <p className="text-sm md:text-base text-muted-foreground">Responsable administratif · Paris (France)</p>
            </div>



          </div>
        </div>
      </section>

      {/* Rayonnement Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-editorial italic text-center mb-6 text-foreground">Notre rayonnement</h2>
            <p className="text-center text-muted-foreground mb-8">
              Présents sur la scène internationale pour porter notre vision de l'entrepreneuriat à impact
            </p>
            <div className="rounded-sm overflow-hidden shadow-[var(--shadow-medium)] max-w-[50%] mx-auto">
              <img src={francophonieScientiqueImg} alt="Alexis Janicot présent à la 5e Semaine mondiale de la Francophonie scientifique organisée par l'AUF" className="w-full h-auto object-cover" />
              <div className="bg-card p-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  5e Semaine mondiale de la Francophonie scientifique organisée par l'AUF
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Impact mesuré</div>
          <h2 className="font-editorial italic text-center mb-4 text-foreground">
            Nos chiffres clés
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Depuis 2023, Mare Nostrum accompagne entrepreneurs et établissements avec impact et excellence
          </p>
          
          <Carousel opts={{
          align: "start",
          loop: true
        }} plugins={[Autoplay({
          delay: 3000
        })]} className="w-full max-w-6xl mx-auto mb-12">
            <CarouselContent className="-ml-4">
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">24</div>
                  <div className="font-medium mb-1">Entreprises</div>
                  <div className="text-sm opacity-90">accompagnées</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">17+</div>
                  <div className="font-medium mb-1">Projets étudiants</div>
                  <div className="text-sm opacity-90">accompagnés</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">70%</div>
                  <div className="font-medium mb-1">Entreprises à impact</div>
                  <div className="text-sm opacity-90">17 organisations</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">93%</div>
                  <div className="font-medium mb-1">Prise de décision</div>
                  <div className="text-sm opacity-90">accélérée</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                  <div className="font-medium mb-1">Satisfaction</div>
                  <div className="text-sm opacity-90">satisfaits/très satisfaits</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">55%</div>
                  <div className="font-medium mb-1">Projet à temps plein</div>
                  <div className="text-sm opacity-90">avec satisfaction</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">210+</div>
                  <div className="font-medium mb-1">Mises en relation</div>
                  <div className="text-sm opacity-90">professionnelles</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">32</div>
                  <div className="font-medium mb-1">Projets collaboratifs</div>
                  <div className="text-sm opacity-90">initiés</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">135+</div>
                  <div className="font-medium mb-1">Experts</div>
                  <div className="text-sm opacity-90">mobilisables</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">2000</div>
                  <div className="font-medium mb-1">Années d'expérience</div>
                  <div className="text-sm opacity-90">cumulées experts</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">358h</div>
                  <div className="font-medium mb-1">Formation</div>
                  <div className="text-sm opacity-90">dispensées</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">36%</div>
                  <div className="font-medium mb-1">Néo-entrepreneurs</div>
                  <div className="text-sm opacity-90">accompagnés</div>
                </div>
              </CarouselItem>
              
              <CarouselItem className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-sm p-8 h-full hover-lift transition-all duration-200 hover:brightness-110">
                  <div className="text-4xl md:text-5xl font-bold mb-2">12</div>
                  <div className="font-medium mb-1">Pays</div>
                  <div className="text-sm opacity-90">d'intervention</div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2 font-medium">Nos pays d'intervention</p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇫🇷 France</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇲🇦 Maroc</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇹🇳 Tunisie</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇩🇿 Algérie</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇸🇳 Sénégal</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇨🇮 Côte d'Ivoire</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇧🇯 Bénin</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇨🇲 Cameroun</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇧🇫 Burkina Faso</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇨🇩 RD Congo</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇪🇬 Égypte</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">🇨🇦 Canada</span>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Globe className="h-10 w-10 text-accent-foreground" />
            </div>
            <h2 className="font-editorial italic mb-6 text-foreground">
              Un réseau d'experts au service de votre réussite
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              <strong className="text-foreground">135+ experts</strong> avec <strong className="text-foreground">2000 années d'expérience cumulées</strong> mobilisables en France, au Maghreb, en Afrique subsaharienne et au Canada
            </p>
            <p className="text-lg text-muted-foreground mb-12">
              Consultants, formateurs, entrepreneurs expérimentés, investisseurs... Notre réseau pluridisciplinaire 
              et multiculturel dans 12 pays est notre force pour vous accompagner avec excellence sur tous les sujets.
            </p>

            <Carousel opts={{
            align: "start",
            loop: true
          }} plugins={[Autoplay({
            delay: 2500
          })]} className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇫🇷</div>
                    <h3 className="font-semibold text-foreground mb-1">France</h3>
                    <p className="text-sm text-muted-foreground">Toulouse · Paris</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇲🇦</div>
                    <h3 className="font-semibold text-foreground mb-1">Maroc</h3>
                    <p className="text-sm text-muted-foreground">Casablanca</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇹🇳</div>
                    <h3 className="font-semibold text-foreground mb-1">Tunisie</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇩🇿</div>
                    <h3 className="font-semibold text-foreground mb-1">Algérie</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇸🇳</div>
                    <h3 className="font-semibold text-foreground mb-1">Sénégal</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇨🇮</div>
                    <h3 className="font-semibold text-foreground mb-1">Côte d'Ivoire</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇧🇯</div>
                    <h3 className="font-semibold text-foreground mb-1">Bénin</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇨🇲</div>
                    <h3 className="font-semibold text-foreground mb-1">Cameroun</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇧🇫</div>
                    <h3 className="font-semibold text-foreground mb-1">Burkina Faso</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇨🇩</div>
                    <h3 className="font-semibold text-foreground mb-1">RD Congo</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇪🇬</div>
                    <h3 className="font-semibold text-foreground mb-1">Égypte</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="mn-card p-6 hover-lift transition-all">
                    <div className="text-4xl font-bold mb-2">🇨🇦</div>
                    <h3 className="font-semibold text-foreground mb-1">Canada</h3>
                    <p className="text-sm text-muted-foreground">Réseau experts</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-editorial italic text-center mb-4 text-foreground">
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
              <CarouselContent className="-ml-4">
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                    <img src={hufLogo} alt="HUF - Partenaire Mare Nostrum accompagnement entrepreneuriat Toulouse" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                    <img src={bidayaLogo} alt="Bidaya - Partenaire Mare Nostrum entrepreneuriat Maroc Casablanca" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                    <img src={toulouseWayLogo} alt="Toulouse Way - Partenaire écosystème entrepreneurial Toulouse Occitanie" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                    <img src={airbusLogo} alt="Airbus Développement - Partenaire innovation entreprises Toulouse Aerospace" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                    <img src={roseLabLogo} alt="Rose Lab - Partenaire incubateur startups entreprises à impact" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                    <img src={cpme31Logo} alt="CPME 31 Haute-Garonne - Confédération PME entrepreneurs Toulouse" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                    <img src={creditMutuelLogo} alt="Crédit Mutuel - Partenaire financement entrepreneurs PME" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.touleco.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                      <img src={toulecoLogo} alt="Touleco - Média économique Toulouse Occitanie partenaire Mare Nostrum" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.imaginationsfertiles.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                      <img src={imaginationsFertilesLogo} alt="Imaginations Fertiles - Partenaire créativité innovation entrepreneuriale" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://emergingbusinessfactory.com/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
                      <img src={emergingBusinessLogo} alt="Emerging Business Factory - Accélérateur startups scale-ups Toulouse" className="max-w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                </CarouselItem>
                <CarouselItem className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a href="https://www.moovjee.fr/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-center justify-center p-6 mn-card hover-lift transition-all duration-300">
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
      <DarkSection>
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-editorial italic mb-6 text-primary-foreground">
            Envie de rejoindre l'aventure ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Que vous soyez une école ou un entrepreneur, commençons à construire ensemble
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">
              Prendre contact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </DarkSection>

      <Footer />
    </div>;
};
export default About;