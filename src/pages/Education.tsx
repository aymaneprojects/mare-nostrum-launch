import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Lightbulb, Trophy, BookOpen, Network, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
const Education = () => {
  const educationSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mare Nostrum Éducation",
    "description": "Programmes d'éducation entrepreneuriale pour établissements : ateliers, fresques, cours, hackathons et programmes premium",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum"
    },
    "serviceType": "Éducation Entrepreneuriale",
    "areaServed": ["FR", "MA"],
    "offers": [{
      "@type": "Offer",
      "name": "La Fresque de l'esprit d'entreprendre",
      "description": "Atelier collaboratif de 3h pour découvrir l'entrepreneuriat"
    }, {
      "@type": "Offer",
      "name": "L'Atelier des Alliés",
      "description": "Session d'intelligence collective pour développer la créativité entrepreneuriale"
    }, {
      "@type": "Offer",
      "name": "Programme Premium Néo-Entrepreneurs",
      "description": "Accompagnement complet sur plusieurs mois"
    }]
  };
  const educationFaqs = [{
    question: "Quels types d'établissements accompagnez-vous ?",
    answer: "Nous accompagnons tous types d'établissements : écoles de commerce, universités, écoles d'ingénieurs, lycées, organismes de formation et centres d'apprentissage. Nos programmes s'adaptent à votre public et vos objectifs pédagogiques."
  }, {
    question: "Combien de temps dure un programme ?",
    answer: "La durée varie selon le format : de 3 heures pour la Fresque de l'esprit d'entreprendre à plusieurs mois pour le Programme Premium Néo-Entrepreneurs. Nous proposons aussi des formats sur-mesure adaptés à votre calendrier académique."
  }, {
    question: "Combien d'étudiants peuvent participer ?",
    answer: "Cela dépend du format : 30-50 participants pour la Fresque, 15-25 pour l'Atelier des Alliés, et des cohortes plus petites pour les programmes premium. Nous pouvons organiser plusieurs sessions pour toucher l'ensemble de vos promotions."
  }, {
    question: "Quels résultats obtenez-vous auprès des étudiants ?",
    answer: "Nous avons accompagné 17+ projets étudiants avec 358 heures de formation dispensées. 36% de néo-entrepreneurs accompagnés avec un engagement significativement accru dans les projets entrepreneuriaux. Plus de 80% de satisfaction étudiants."
  }, {
    question: "Comment se déroule la mise en place d'un programme ?",
    answer: "Nous commençons par un rendez-vous de découverte pour comprendre vos besoins, puis établissons un diagnostic personnalisé. Ensuite, nous vous proposons un programme sur-mesure que nous déployons avec votre équipe pédagogique."
  }];
  return <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Mare Nostrum Éducation - Programmes Entrepreneuriat Écoles | Toulouse Paris Casablanca" 
        description="Programmes entrepreneuriat clés en main pour écoles : Fresque de l'esprit d'entreprendre, ateliers, hackathons, cours. 53% création entreprise. +95% satisfaction. Toulouse, Paris, Casablanca." 
        keywords="éducation entrepreneuriale, formation entrepreneuriat, programmes écoles, ateliers, hackathons, enseignement supérieur, fresque entrepreneuriat, toulouse, paris" 
        structuredData={educationSchema}
        faqSchema={educationFaqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Éducation", url: "https://marenostrum.tech/education" }
        ]}
      />
      <Header />
      

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Mare Nostrum Éducation</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              L'esprit d'entreprendre au cœur de votre établissement
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12">
              Des dispositifs clés en main pour sensibiliser, former et accompagner vos étudiants vers l'entrepreneuriat
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base md:text-lg w-full sm:w-auto">
              <Link to="/contact">
                Parler de votre projet pédagogique
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
            Les enjeux des établissements
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
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
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">17+</div>
                <div className="text-muted-foreground">projets étudiants</div>
                <div className="text-sm text-muted-foreground">accompagnés</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent mb-2">358h</div>
                <div className="text-muted-foreground">de formation</div>
                <div className="text-sm text-muted-foreground">dispensées</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-primary mb-2">36%</div>
                <div className="text-muted-foreground">néo-entrepreneurs</div>
                <div className="text-sm text-muted-foreground">accompagnés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Ils nous font confiance
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard text="Quelque chose qui était présent à chaque instant (du Programme) c'est l'échange d'expérience et d'opinion. Ce qui permettait un retour permanent, constructif et pointilleux tout ça dans la bienveillance et la bonne humeur" author="Annabel" role="Étudiante et néo-entrepreneure accompagnée" organization="2024" />
            <TestimonialCard text="Un acteur efficace, engagé et authentique, qui accompagne réellement les établissements dans leur transformation." author="Géraldine Le Caer" role="Directrice d'établissement partenaire" />
            <TestimonialCard text="Être ici aux côtés de l'ensemble des porteurs de projet, pour moi, c'était important. Parce que ce sont des jeunes audacieux, persévérants, et parce qu'on a besoin d'un entrepreneuriat qui est en capacité de pouvoir changer le monde. Ils mettent leurs convictions au service de solutions. Ce sont des solutions concrètes et performantes. Faites leur confiance, aidez-les, accompagnez-les !" author="Nadia Pellefigue" role="Vice-présidente de la Région Occitanie" />
          </div>
        </div>
      </section>

      <FAQSection title="Questions fréquentes sur nos programmes" faqs={educationFaqs} />

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
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
    </div>;
};
export default Education;