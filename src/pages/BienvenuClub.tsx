import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Mail, Users, Calendar, BookOpen, Sparkles, Download, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const KIT_URL = "https://drive.google.com/file/d/1FVsdyMqBs7QG4FpGYzEO4o1yH5MkzUDj/view?usp=sharing";
const SLACK_URL = "https://join.slack.com/t/clubmarenostrum/shared_invite/zt-3k96xxhx1-UjfT8oy4ISyHKScmuqsleg";

const steps = [
  {
    icon: Download,
    title: "Kit de bienvenue",
    desc: "Télécharge le kit joint : il présente l'espace d'échanges, la veille d'opportunités et la prise de rendez-vous « visio galère ».",
  },
  {
    icon: Users,
    title: "Rejoindre l'espace digital",
    desc: "Inscris-toi sur notre Slack privé pour commencer à échanger avec la communauté dès maintenant.",
  },
  {
    icon: Calendar,
    title: "Première session collective",
    desc: "Tu recevras le lien pour la prochaine session. Prépare tes questions — c'est là que tout commence.",
  },
];

const BienvenuClub = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SEOHead
        title="Bienvenue au Club | Mare Nostrum"
        description="Félicitations, tu fais partie du Club Mare Nostrum."
        noindex={true}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex flex-col items-center px-4 py-16 md:py-24">

          {/* ── Hero ─────────────────────────────────────────── */}
          <div
            className={`text-center max-w-xl mx-auto transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-accent" strokeWidth={1.8} />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-accent animate-pulse" />
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Paiement confirmé
            </p>

            <h1 className="font-editorial italic text-4xl md:text-5xl text-primary mb-4 leading-tight">
              Bienvenue au Club<br />Mare Nostrum
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              Nous sommes ravis de vous compter parmi nos abonnés.
              Voici vos prochaines étapes pour intégrer la communauté.
            </p>

            <div className="bg-primary/5 border border-primary/15 rounded-sm px-6 py-5 mb-10 text-left">
              <p className="font-editorial italic text-xl text-primary leading-snug">
                "L'entrepreneuriat est un sport d'équipe. Tu viens de choisir la bonne équipe."
              </p>
              <p className="text-xs text-muted-foreground mt-2">— L'équipe Mare Nostrum</p>
            </div>
          </div>

          {/* ── Étapes ───────────────────────────────────────── */}
          <div
            className={`w-full max-w-2xl mx-auto transition-all duration-700 delay-200 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              Par où commencer
            </h2>

            <div className="grid gap-4 md:grid-cols-3 mb-10">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-sm p-5 flex flex-col gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">
                      <span className="text-muted-foreground mr-1.5">0{i + 1}.</span>
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTAs principaux ───────────────────────────────── */}
          <div
            className={`w-full max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Slack — CTA principal */}
            <a
              href={SLACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full bg-primary text-primary-foreground rounded-sm px-6 py-5 mb-4 hover:bg-primary/90 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-base">Rejoindre l'espace digital du Club</p>
                <p className="text-xs text-primary-foreground/70 mt-0.5">Commence à échanger avec la communauté sur Slack</p>
              </div>
              <ArrowRight className="h-5 w-5 opacity-70 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Kit de bienvenue */}
            <a
              href={KIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 w-full bg-card border border-border rounded-sm px-6 py-5 mb-8 hover:border-primary/40 hover:bg-primary/5 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-base text-foreground">Télécharger le kit de bienvenue</p>
                <p className="text-xs text-muted-foreground mt-0.5">Guide pratique : fonctionnement du Club, espace digital, rendez-vous</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground opacity-70 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondaires */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Button asChild variant="outline" size="default" className="w-full sm:w-auto">
                <Link to="/blog">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explorer le blog
                </Link>
              </Button>
              <Button asChild variant="ghost" size="default" className="w-full sm:w-auto text-muted-foreground">
                <Link to="/contact">
                  Une question ? Contactez-nous
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Note équipe */}
          <div
            className={`mt-12 max-w-md mx-auto text-center transition-all duration-700 delay-500 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              N'hésitez pas à nous solliciter via la messagerie interne pour toute question.<br />
              Au plaisir de vous retrouver très bientôt — <strong>L'équipe Mare Nostrum</strong>
            </p>
          </div>

          <div className="mt-12 opacity-30">
            <img src={logo} alt="Mare Nostrum" className="h-8 mx-auto" />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BienvenuClub;
