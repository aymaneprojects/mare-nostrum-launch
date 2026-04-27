import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, Mail, Users, Calendar, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const steps = [
  {
    icon: Mail,
    title: "Email de confirmation",
    desc: "Tu vas recevoir un email avec tous les détails de ton abonnement et les prochaines étapes.",
  },
  {
    icon: Users,
    title: "Accès à la communauté",
    desc: "Notre équipe va t'envoyer ton invitation à rejoindre l'espace privé Mare Nostrum dans les 24h.",
  },
  {
    icon: Calendar,
    title: "Première session",
    desc: "Tu recevras le lien pour la prochaine session collective. Prépare tes questions — c'est là que tout commence.",
  },
];

const BienvenuClub = () => {
  const [searchParams] = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SEOHead
        title="Bienvenue au Club — Mare Nostrum"
        description="Félicitations, tu fais partie du Club Mare Nostrum."
        noindex={true}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">

          {/* ── Hero félicitations ─────────────────────────── */}
          <div
            className={`text-center max-w-xl mx-auto transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Icône succès animée */}
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
              Tu rejoins une communauté d'entrepreneurs francophones ambitieux.
              C'est le début d'une belle aventure — on est heureux de t'avoir parmi nous.
            </p>

            {/* Quote marketing */}
            <div className="bg-primary/5 border border-primary/15 rounded-sm px-6 py-5 mb-10 text-left">
              <p className="font-editorial italic text-xl text-primary leading-snug">
                "L'entrepreneuriat est un sport d'équipe. Tu viens de choisir la bonne équipe."
              </p>
              <p className="text-xs text-muted-foreground mt-2">— L'équipe Mare Nostrum</p>
            </div>
          </div>

          {/* ── Prochaines étapes ──────────────────────────── */}
          <div
            className={`w-full max-w-2xl mx-auto transition-all duration-700 delay-200 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              Ce qui se passe maintenant
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-sm p-5 flex flex-col gap-3"
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
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

          {/* ── CTAs ──────────────────────────────────────── */}
          <div
            className={`mt-10 flex flex-col sm:flex-row gap-3 items-center transition-all duration-700 delay-500 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/blog">
                <BookOpen className="mr-2 h-4 w-4" />
                Explorer le blog
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/contact">
                Contacter l'équipe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Logo discret en bas */}
          <div className="mt-16 opacity-30">
            <img src={logo} alt="Mare Nostrum" className="h-8 mx-auto" />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BienvenuClub;
