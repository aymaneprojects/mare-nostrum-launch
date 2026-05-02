import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { supabase } from "@/integrations/supabase/client";

// ─── questions ────────────────────────────────────────────────
// Chaque choix = score interne 1–4 (A=1, B=2, C=3, D=4)
const QUESTIONS = [
  {
    key: "equipe",
    eyebrow: "Équipe",
    question: "Vous portez ce projet seul·e ou avec d'autres personnes ?",
    choices: [
      { label: "Tout·e seul·e — pour l'instant, c'est moi qui fais tout", score: 1 },
      { label: "À plusieurs, mais on n'a pas vraiment réparti qui fait quoi", score: 2 },
      { label: "Une équipe en place, chacun·e sait ce qu'il a à faire", score: 3 },
      { label: "Une équipe complète, on couvre tous les sujets et ça tourne bien", score: 4 },
    ],
  },
  {
    key: "marche",
    eyebrow: "Vos clients",
    question: "Vous savez vraiment qui sont vos clients et combien ils sont ?",
    choices: [
      { label: "Pas encore — c'est surtout une intuition", score: 1 },
      { label: "J'en ai parlé autour de moi mais rien de plus poussé", score: 2 },
      { label: "J'ai une bonne idée des clients possibles et de leurs besoins", score: 3 },
      { label: "J'ai chiffré combien ils sont et identifié leurs profils précis", score: 4 },
    ],
  },
  {
    key: "offre",
    eyebrow: "Votre différence",
    question: "Si quelqu'un voulait copier votre projet demain, ce serait facile ?",
    choices: [
      { label: "Honnêtement, je n'ai pas trop regardé ce que font les autres", score: 1 },
      { label: "Mon offre ressemble à ce qui existe déjà", score: 2 },
      { label: "J'ai un petit truc en plus que mes clients ont remarqué", score: 3 },
      { label: "Très difficile : ce que je fais est unique et reconnu", score: 4 },
    ],
  },
  {
    key: "financier",
    eyebrow: "Vos chiffres",
    question: "Vous savez combien votre projet va coûter et rapporter cette année ?",
    choices: [
      { label: "Pas du tout, j'avance sans chiffres", score: 1 },
      { label: "Une idée approximative, mais rien d'écrit", score: 2 },
      { label: "J'ai posé un budget avec mes hypothèses", score: 3 },
      { label: "Je sais quand je serai rentable et combien de temps ma trésorerie tient", score: 4 },
    ],
  },
  {
    key: "bm",
    eyebrow: "Vos revenus",
    question: "Vous savez comment vous allez gagner de l'argent — et ça marche déjà ?",
    choices: [
      { label: "Je n'ai pas encore vraiment réfléchi à comment je gagnerai ma vie", score: 1 },
      { label: "J'ai une idée, mais je n'ai pas encore vendu", score: 2 },
      { label: "J'ai déjà fait mes premières ventes et j'ajuste au fur et à mesure", score: 3 },
      { label: "Je vends régulièrement, et ça progresse bien", score: 4 },
    ],
  },
  {
    key: "strategie",
    eyebrow: "Vos priorités",
    question: "Vous savez quoi faire en priorité dans les 6 prochains mois ?",
    choices: [
      { label: "Non, j'avance au feeling", score: 1 },
      { label: "J'ai des idées en tête, mais rien d'écrit", score: 2 },
      { label: "J'ai un plan — sauf que tout me semble urgent en même temps", score: 3 },
      { label: "J'ai 2 ou 3 priorités claires et je sais comment les atteindre", score: 4 },
    ],
  },
  {
    key: "esg",
    eyebrow: "Votre impact",
    question: "Votre projet a-t-il un impact positif sur la société ou l'environnement ?",
    choices: [
      { label: "Pour l'instant, ce n'est pas mon sujet", score: 1 },
      { label: "J'y pense, mais ce n'est pas concret", score: 2 },
      { label: "Oui, c'est un vrai sujet pour moi et ça se voit dans mon projet", score: 3 },
      { label: "Mon impact est mesuré et c'est au cœur de ce que je fais", score: 4 },
    ],
  },
  {
    key: "pitch",
    eyebrow: "Votre pitch",
    question: "Vous arrivez à expliquer votre projet simplement, en 2 minutes ?",
    choices: [
      { label: "J'ai encore du mal à être clair·e quand on me demande", score: 1 },
      { label: "Je l'explique, mais on ne comprend pas toujours du premier coup", score: 2 },
      { label: "Mon pitch est rodé, les gens accrochent vite", score: 3 },
      { label: "Je convaincs presque à chaque fois, et j'ai un support qui suit", score: 4 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 4; // 32

const clubReco = (score: number) => {
  const pct = score / MAX_SCORE;
  if (pct < 0.45) return {
    tier: "Communauté", price: "30 €/mois", href: "/club#offres",
    label: "Votre projet est en construction.",
    desc: "Le Club Communauté vous apporte le réseau, les ressources et les fondations pour avancer avec les bons repères dès le départ.",
    color: "from-primary to-primary/80",
  };
  if (pct < 0.72) return {
    tier: "Groupe", price: "90 €/mois", href: "/club#offres",
    label: "Votre projet prend forme.",
    desc: "Le Club Groupe vous aide à structurer votre croissance, affiner votre offre et accélérer votre développement avec un collectif sélectionné.",
    color: "from-primary to-accent/80",
  };
  return {
    tier: "Individuel", price: "190 €/mois", href: "/club#offres",
    label: "Votre projet est prêt à accélérer.",
    desc: "Le Club Individuel vous offre un accompagnement stratégique sur-mesure : IA, financements, développement commercial et réseau de décideurs.",
    color: "from-accent/90 to-primary",
  };
};

// ─── progress bar ──────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
      <div
        className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  );
}

// ─── main ──────────────────────────────────────────────────────
const Diagnostic = () => {
  // step: -1=cover, 0–7=questions, 8=email capture, 9=results
  const [step, setStep]     = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [nom, setNom]       = useState("");
  const [email, setEmail]   = useState("");
  const [projet, setProjet] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]     = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const totalScore = Object.values(answers).reduce((s, v) => s + v, 0);
  const reco = clubReco(totalScore);

  const selectAnswer = (key: string, score: number) => {
    setAnswers(a => ({ ...a, [key]: score }));
    // auto-advance après 400ms
    setTimeout(() => {
      setStep(s => Math.min(s + 1, 8));
    }, 350);
  };

  const submit = async () => {
    if (!nom.trim() || !email.trim()) return;
    setSubmitting(true);
    setErrMsg("");
    try {
      const scores: Record<string, number> = {};
      const comments: Record<string, string> = {};
      QUESTIONS.forEach(q => { scores[q.key] = answers[q.key] ?? 0; });

      const { error } = await supabase.functions.invoke("send-diagnostic", {
        body: { nom, email, projet, scores, comments, remarques: "", noteGlobale: 0, totalScore },
      });
      if (error) throw error;
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrMsg("Une erreur est survenue. Réessaie dans quelques instants.");
    } finally {
      setSubmitting(false);
    }
  };

  const q = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;

  return (
    <div className="min-h-screen bg-background">
      <EnhancedSEOHead
        title="Diagnostic projet gratuit — Club Mare Nostrum"
        description="8 étapes simples pour faire le point sur votre projet en 3 minutes. À la fin, votre rapport personnalisé et l'offre Club faite pour vous."
      />
      <Header />

      <div className="min-h-[calc(100vh-80px)] flex flex-col">

        {/* ── cover ─────────────────────────────────────────── */}
        {step === -1 && (
          <section className="relative flex-1 flex items-center py-16 md:py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.20) 0%, transparent 52%), radial-gradient(ellipse at 80% 88%, hsl(228 56% 8% / 0.75) 0%, transparent 58%)" }} />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-2xl mx-auto text-center">
                <div className="mn-eyebrow-light mb-6">Diagnostic projet · Club Mare Nostrum</div>
                <h1 className="font-editorial italic text-4xl md:text-5xl font-semibold text-primary-foreground mb-4 leading-tight">
                  Où en est vraiment votre projet ?
                </h1>
                <p className="text-primary-foreground/75 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                  8 étapes simples pour faire le point sur votre projet : votre équipe, vos clients, vos chiffres, vos priorités. À la fin, on vous envoie votre rapport personnalisé et on vous indique l'offre Club faite pour vous.
                </p>
                <Button
                  onClick={() => setStep(0)}
                  size="lg"
                  variant="secondary"
                  className="font-bold text-base px-8 w-full sm:w-auto"
                >
                  Démarrer mon diagnostic <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-primary-foreground/55 text-xs mt-4">3 minutes · 100% gratuit · Diagnostic détaillé envoyé par email</p>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-10 pt-8 border-t border-primary-foreground/10 max-w-md mx-auto">
                  <div className="flex items-center gap-1.5 text-primary-foreground/60 text-xs">
                    <span className="font-editorial italic font-bold text-accent text-base">135+</span>
                    <span>experts</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary-foreground/60 text-xs">
                    <span className="font-editorial italic font-bold text-accent text-base">12</span>
                    <span>pays</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary-foreground/60 text-xs">
                    <span className="font-editorial italic font-bold text-accent text-base">95%</span>
                    <span>satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── questions ─────────────────────────────────────── */}
        {q && (
          <section className="flex-1 flex items-center py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto">

                {/* header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Étape {step + 1} / {QUESTIONS.length}
                  </span>
                  <span className="text-xs font-semibold text-accent tracking-wider uppercase">{q.eyebrow}</span>
                </div>
                <ProgressBar current={step + 1} total={QUESTIONS.length} />

                {/* question */}
                <h2 className="font-editorial italic text-2xl md:text-3xl font-semibold text-foreground mt-8 mb-8 leading-snug">
                  {q.question}
                </h2>

                {/* choices */}
                <div className="space-y-3">
                  {q.choices.map((c, i) => {
                    const selected = answers[q.key] === c.score;
                    const letter = ["A", "B", "C", "D"][i];
                    return (
                      <button
                        key={i}
                        onClick={() => selectAnswer(q.key, c.score)}
                        className={`w-full text-left flex items-center gap-3 px-4 sm:px-5 py-4 border rounded-sm transition-all duration-150 cursor-pointer group
                          ${selected
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                          }`}
                      >
                        <span className={`flex-shrink-0 w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold transition-colors
                          ${selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
                          {letter}
                        </span>
                        <span className={`text-sm leading-snug ${selected ? "text-foreground font-medium" : "text-foreground"}`}>
                          {c.label}
                        </span>
                        {selected && <CheckCircle2 className="h-4 w-4 text-primary ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* back */}
                {step > 0 && (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-6 cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Étape précédente
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── email capture ──────────────────────────────────── */}
        {step === QUESTIONS.length && !done && (
          <section className="flex-1 flex items-center py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <div className="bg-card border border-border rounded-sm shadow-md p-6 md:p-8">

                  {/* score teaser */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mx-auto mb-6">
                    <span className="font-editorial italic text-2xl font-bold text-primary">{totalScore}</span>
                  </div>
                  <h2 className="font-editorial italic text-2xl font-semibold text-foreground text-center mb-2">
                    Bravo, c'est terminé !
                  </h2>
                  <p className="text-muted-foreground text-sm text-center mb-8 leading-relaxed">
                    Plus qu'à laisser vos coordonnées et on vous envoie tout de suite votre rapport complet : votre score sur chaque sujet, ce qui est solide, ce qu'il faut renforcer, et l'offre Club faite pour vous.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nom" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Prénom et nom *</Label>
                      <Input id="nom" value={nom} onChange={e => setNom(e.target.value)} placeholder="Votre nom complet" className="mt-1.5 rounded-sm" autoFocus />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Email *</Label>
                      <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" className="mt-1.5 rounded-sm" />
                    </div>
                    <div>
                      <Label htmlFor="projet" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Votre projet <span className="normal-case font-normal">(optionnel)</span></Label>
                      <Input id="projet" value={projet} onChange={e => setProjet(e.target.value)} placeholder="Nom de votre entreprise / projet" className="mt-1.5 rounded-sm" />
                    </div>
                  </div>

                  {errMsg && (
                    <div className="mt-4 px-4 py-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-sm">
                      {errMsg}
                    </div>
                  )}

                  <Button
                    onClick={submit}
                    disabled={!nom.trim() || !email.trim() || submitting}
                    className="w-full mt-6 rounded-sm font-bold"
                    size="lg"
                  >
                    {submitting ? "Envoi en cours…" : "Voir mes résultats →"}
                  </Button>
                  <p className="text-xs text-muted-foreground/60 text-center mt-3">
                    Vos données restent confidentielles. Aucun spam.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── résultats ──────────────────────────────────────── */}
        {done && (
          <section className="flex-1 py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-lg mx-auto">

                {/* score header */}
                <div className={`bg-gradient-to-br ${reco.color} rounded-sm p-6 md:p-8 text-center text-primary-foreground mb-6`}>
                  <div className="text-primary-foreground/70 text-xs font-semibold tracking-widest uppercase mb-3">Votre score</div>
                  <div className="font-editorial italic text-6xl font-semibold mb-1">
                    {totalScore}<span className="text-3xl font-normal text-primary-foreground/60">/{MAX_SCORE}</span>
                  </div>
                  <div className="text-primary-foreground/85 text-sm mt-2">{reco.label}</div>
                </div>

                {/* récap par axe */}
                <div className="bg-card border border-border rounded-sm overflow-hidden mb-6">
                  {QUESTIONS.map((q, i) => {
                    const s = answers[q.key] ?? 0;
                    const choice = q.choices.find(c => c.score === s);
                    return (
                      <div key={q.key} className={`flex items-center gap-4 px-5 py-3.5 ${i < QUESTIONS.length - 1 ? "border-b border-border" : ""}`}>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-0.5">{q.eyebrow}</div>
                          <div className="text-sm text-foreground line-clamp-2">{choice?.label ?? "—"}</div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          {[1,2,3,4].map(v => (
                            <div key={v} className={`w-2 h-2 rounded-full ${v <= s ? "bg-accent" : "bg-border"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* recommandation */}
                <div className="bg-primary text-primary-foreground rounded-sm p-6 mb-4">
                  <div className="mn-eyebrow-light mb-2">Recommandation</div>
                  <div className="font-editorial italic text-xl font-semibold mb-2">
                    Club {reco.tier} · {reco.price}
                  </div>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed mb-5">{reco.desc}</p>
                  <Button asChild variant="secondary" className="w-full font-bold">
                    <Link to={reco.href}>
                      Rejoindre le Club {reco.tier} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Un récap complet a été envoyé à {email} ·{" "}
                  <Link to="/" className="underline hover:text-foreground transition-colors">Retour au site</Link>
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Diagnostic;
