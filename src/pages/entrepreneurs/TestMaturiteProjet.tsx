import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Rocket, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";

const questions = [
  {
    id: 1,
    question: "Où en êtes-vous avec votre idée de projet ?",
    options: [
      { text: "J'ai une idée mais elle n'est pas encore claire", score: 1 },
      { text: "Mon idée est définie mais pas validée auprès de clients potentiels", score: 2 },
      { text: "J'ai validé mon idée avec des premiers retours clients", score: 3 },
      { text: "J'ai déjà des clients ou utilisateurs", score: 4 }
    ]
  },
  {
    id: 2,
    question: "Avez-vous un modèle économique défini ?",
    options: [
      { text: "Je n'y ai pas encore réfléchi", score: 1 },
      { text: "J'ai quelques idées mais rien de formalisé", score: 2 },
      { text: "Mon modèle est défini mais pas encore testé", score: 3 },
      { text: "Mon modèle génère déjà des revenus", score: 4 }
    ]
  },
  {
    id: 3,
    question: "Quel temps pouvez-vous consacrer à votre projet ?",
    options: [
      { text: "Quelques heures par semaine", score: 1 },
      { text: "Un jour par semaine", score: 2 },
      { text: "Plusieurs jours par semaine", score: 3 },
      { text: "Temps plein ou presque", score: 4 }
    ]
  },
  {
    id: 4,
    question: "Avez-vous une équipe ?",
    options: [
      { text: "Je suis seul(e) pour l'instant", score: 1 },
      { text: "J'ai identifié des personnes potentielles", score: 2 },
      { text: "J'ai des co-fondateurs ou collaborateurs réguliers", score: 3 },
      { text: "J'ai une équipe structurée avec des rôles définis", score: 4 }
    ]
  },
  {
    id: 5,
    question: "Quel est votre niveau de connaissance de votre marché ?",
    options: [
      { text: "Je connais peu mon marché", score: 1 },
      { text: "J'ai fait quelques recherches", score: 2 },
      { text: "Je connais bien mon marché et mes concurrents", score: 3 },
      { text: "J'ai une expertise approfondie de mon secteur", score: 4 }
    ]
  },
  {
    id: 6,
    question: "Avez-vous déjà entrepris avant ?",
    options: [
      { text: "C'est ma première expérience entrepreneuriale", score: 1 },
      { text: "J'ai travaillé dans une startup ou PME", score: 2 },
      { text: "J'ai déjà lancé un projet (même non abouti)", score: 3 },
      { text: "J'ai déjà créé et géré une entreprise", score: 4 }
    ]
  },
  {
    id: 7,
    question: "Quel est l'impact social ou environnemental visé par votre projet ?",
    options: [
      { text: "Je n'y ai pas encore réfléchi spécifiquement", score: 1 },
      { text: "J'ai une intention d'impact mais pas formalisée", score: 2 },
      { text: "L'impact est au cœur de mon projet avec des objectifs définis", score: 3 },
      { text: "Je mesure déjà mon impact avec des indicateurs", score: 4 }
    ]
  },
  {
    id: 8,
    question: "Avez-vous des besoins de financement identifiés ?",
    options: [
      { text: "Je ne sais pas encore", score: 1 },
      { text: "J'ai une idée approximative de mes besoins", score: 2 },
      { text: "J'ai un budget prévisionnel détaillé", score: 3 },
      { text: "J'ai déjà obtenu des financements", score: 4 }
    ]
  }
];

const TestMaturiteProjet = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getResult = () => {
    if (percentage < 40) {
      return {
        level: "Tremplin",
        icon: Sparkles,
        color: "text-primary",
        bgColor: "bg-primary/10",
        description: "Vous êtes au début de votre aventure entrepreneuriale. Le programme Tremplin est idéal pour valider votre idée et poser les bases solides de votre projet.",
        recommendation: "Nous vous recommandons de rejoindre notre programme Tremplin pour structurer votre idée et la valider auprès de vos futurs clients."
      };
    } else if (percentage < 70) {
      return {
        level: "Ascension",
        icon: Rocket,
        color: "text-accent",
        bgColor: "bg-accent/10",
        description: "Votre projet a des fondations solides. Le programme Ascension vous aidera à structurer votre croissance et à passer au niveau supérieur.",
        recommendation: "Le programme Ascension est fait pour vous ! Avec un accompagnement régulier, vous pourrez accélérer votre développement."
      };
    } else {
      return {
        level: "Élite",
        icon: Users,
        color: "text-primary",
        bgColor: "bg-gradient-to-br from-primary/10 to-accent/10",
        description: "Votre projet est mature et structuré. Le programme Élite vous offrira un accompagnement premium pour maximiser votre impact et votre croissance.",
        recommendation: "Félicitations ! Votre projet est prêt pour un accompagnement Élite avec un mentorat intensif et un accès privilégié à notre réseau."
      };
    }
  };

  const result = getResult();
  const ResultIcon = result.icon;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Test de Maturité Projet Entrepreneurial",
    "description": "Évaluez la maturité de votre projet entrepreneurial en 5 minutes et découvrez le programme d'accompagnement adapté.",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Test Maturité Projet Entrepreneurial | Évaluation Gratuite 5 min - Mare Nostrum"
        description="Évaluez la maturité de votre projet entrepreneurial en 5 minutes. Test gratuit pour découvrir le programme d'accompagnement adapté à votre situation."
        keywords="test projet entrepreneurial, évaluation startup, maturité projet, diagnostic entrepreneur, quiz entrepreneuriat"
        structuredData={pageSchema}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Entrepreneurs", url: "https://marenostrum.tech/entrepreneurs/accompagnement-francophonie-afrique" },
          { name: "Test maturité", url: "https://marenostrum.tech/entrepreneurs/test-maturite-projet" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-12 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { label: "Entrepreneurs", href: "/entrepreneurs/accompagnement-francophonie-afrique" },
                { label: "Test maturité", href: "/entrepreneurs/test-maturite-projet" }
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Test de Maturité Projet
            </h1>
            <p className="text-lg text-primary-foreground/90">
              Évaluez votre projet en 5 minutes et découvrez le programme adapté
            </p>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-12 md:py-20 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!showResults ? (
              <div className="bg-card border border-border rounded-xl p-8">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestion + 1} / {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8">
                  {questions[currentQuestion].question}
                </h2>

                {/* Options */}
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <span className="text-foreground">{option.text}</span>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                {currentQuestion > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 text-muted-foreground hover:text-foreground inline-flex items-center"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Question précédente
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                {/* Result Icon */}
                <div className={`${result.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <ResultIcon className={`h-10 w-10 ${result.color}`} />
                </div>

                {/* Score */}
                <div className="mb-6">
                  <p className="text-muted-foreground mb-2">Votre score</p>
                  <p className="text-4xl font-bold text-foreground">{percentage}%</p>
                </div>

                {/* Result Level */}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Programme recommandé : {result.level}
                </h2>

                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  {result.description}
                </p>

                <div className="bg-secondary/50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-semibold text-foreground mb-2">Notre recommandation</h3>
                  <p className="text-muted-foreground">{result.recommendation}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/entrepreneurs/accompagnement-francophonie-afrique">
                      Découvrir le programme {result.level}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleRestart}>
                    Refaire le test
                  </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Vous souhaitez un accompagnement personnalisé ?
                  </p>
                  <Link 
                    to="/entrepreneurs/mentorat-individuel"
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    Découvrir notre mentorat individuel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestMaturiteProjet;
