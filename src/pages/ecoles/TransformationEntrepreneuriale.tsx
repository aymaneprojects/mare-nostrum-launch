import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Lightbulb, CheckCircle2, ArrowRight, Clock, Target, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";

const TransformationEntrepreneuriale = () => {
  const pageSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Programmes d'Entrepreneuriat pour Écoles",
      "description": "Alternative agile aux dispositifs traditionnels comme Pépite. Programmes sur-mesure pour intégrer l'entrepreneuriat dans votre établissement.",
      "provider": {
        "@type": "Organization",
        "name": "Mare Nostrum",
        "sameAs": "https://marenostrum.tech"
      },
      "serviceType": "Formation Entrepreneuriale Établissements",
      "areaServed": ["France", "Maroc"],
      "audience": {
        "@type": "Audience",
        "audienceType": "Directeurs d'écoles, responsables pédagogiques, universités"
      }
    }
  ];

  const faqs = [
    {
      question: "En quoi Mare Nostrum diffère-t-il des dispositifs Pépite ?",
      answer: "Contrairement aux dispositifs institutionnels, nous proposons une approche agile et personnalisée. Nos programmes s'adaptent à votre calendrier académique, vos objectifs pédagogiques et votre budget. Nous intervenons rapidement et offrons un suivi continu."
    },
    {
      question: "Quels types d'établissements accompagnez-vous ?",
      answer: "Nous accompagnons écoles de commerce, universités, écoles d'ingénieurs, IUT, lycées et centres de formation. Nos programmes s'adaptent à tous les niveaux et toutes les filières."
    },
    {
      question: "Comment se déroule la mise en place d'un programme ?",
      answer: "Tout commence par un diagnostic gratuit de 30 minutes pour comprendre vos besoins. Ensuite, nous concevons un programme sur-mesure et le déployons avec votre équipe pédagogique."
    },
    {
      question: "Quel est le délai de mise en place ?",
      answer: "Selon le format choisi, nous pouvons intervenir sous 2 à 4 semaines. Les ateliers ponctuels sont plus rapides à déployer que les programmes semestriels."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Programmes d'Entrepreneuriat pour Écoles | Alternative Agile à Pépite - Mare Nostrum"
        description="Intégrez l'entrepreneuriat dans votre établissement avec des programmes sur-mesure. Alternative agile aux dispositifs traditionnels. Diagnostic gratuit en 30 min."
        keywords="programme entrepreneuriat école, formation entrepreneuriale université, alternative pépite, accompagnement étudiant entrepreneur, sensibilisation entrepreneuriat"
        structuredData={pageSchema}
        faqSchema={faqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Écoles", url: "https://marenostrum.tech/ecoles/transformation-entrepreneuriale" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Mare Nostrum pour les Écoles</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Programmes d'Entrepreneuriat pour Écoles
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 md:mb-12 max-w-3xl mx-auto">
              Une alternative agile aux dispositifs traditionnels. Intégrez l'esprit d'entreprendre dans votre établissement avec des programmes sur-mesure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-base md:text-lg">
                <Link to="/ecoles/diagnostic-gratuit">
                  Demander un diagnostic gratuit
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

      {/* Problématiques Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Les défis des établissements aujourd'hui
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Vous souhaitez développer la culture entrepreneuriale mais faites face à des contraintes réelles
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Manque de temps</h3>
              <p className="text-muted-foreground">
                Les programmes existants sont souvent lourds à mettre en place et difficiles à intégrer dans le calendrier académique
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Ressources limitées</h3>
              <p className="text-muted-foreground">
                Les contraintes budgétaires et le manque d'expertise interne freinent le développement de programmes ambitieux
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Besoin de flexibilité</h3>
              <p className="text-muted-foreground">
                Les dispositifs institutionnels ne s'adaptent pas toujours aux spécificités de votre établissement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Approche vs Traditionnelle */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Notre approche vs. les dispositifs traditionnels
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Une alternative agile qui s'adapte à vos besoins réels
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid md:grid-cols-3 bg-primary text-primary-foreground">
                <div className="p-4 font-semibold">Critère</div>
                <div className="p-4 font-semibold text-center">Dispositifs traditionnels</div>
                <div className="p-4 font-semibold text-center bg-accent text-accent-foreground">Mare Nostrum</div>
              </div>
              {[
                { critere: "Délai de mise en place", trad: "3-6 mois", mn: "2-4 semaines" },
                { critere: "Personnalisation", trad: "Cadre fixe", mn: "Sur-mesure" },
                { critere: "Formats proposés", trad: "Standardisés", mn: "Modulables" },
                { critere: "Suivi", trad: "Limité", mn: "Continu" },
                { critere: "Interlocuteur", trad: "Multiple", mn: "Unique et dédié" },
              ].map((row, index) => (
                <div key={index} className={`grid md:grid-cols-3 ${index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}`}>
                  <div className="p-4 font-medium text-foreground">{row.critere}</div>
                  <div className="p-4 text-center text-muted-foreground">{row.trad}</div>
                  <div className="p-4 text-center text-primary font-medium">{row.mn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Formats */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Des formats adaptés à vos besoins
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            De la sensibilisation à l'accompagnement complet, choisissez le format qui vous convient
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">La Fresque de l'esprit d'entreprendre</h3>
              <p className="text-muted-foreground mb-4">
                Atelier collaboratif de 3h pour sensibiliser un grand nombre d'étudiants de manière ludique.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                  30-50 participants
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                  Format participatif
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Ateliers & Hackathons</h3>
              <p className="text-muted-foreground mb-4">
                Sessions intensives sur 1 à 3 jours pour développer des projets concrets en équipe.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                  Projets concrets
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                  Jury d'experts
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Programme Premium</h3>
              <p className="text-muted-foreground mb-4">
                Accompagnement complet sur plusieurs mois pour structurer les projets entrepreneuriaux.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                  Suivi personnalisé
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                  Réseau d'experts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Diagnostic */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-6">
            Prêt à transformer votre établissement ?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Demandez un diagnostic gratuit de 30 minutes pour identifier les meilleures opportunités pour votre établissement.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link to="/ecoles/diagnostic-gratuit">
              Demander mon diagnostic gratuit
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

export default TransformationEntrepreneuriale;
