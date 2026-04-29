import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle2, Target } from "lucide-react";
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
    question: "Comment est organisée votre équipe aujourd'hui ?",
    choices: [
      { label: "Je travaille seul(e) pour l'instant", score: 1 },
      { label: "J'ai des associés mais les rôles ne sont pas encore définis", score: 2 },
      { label: "L'équipe est en place avec des responsabilités claires", score: 3 },
      { label: "Équipe solide, expertises complémentaires et bonne cohésion", score: 4 },
    ],
  },
  {
    key: "marche",
    eyebrow: "Marché",
    question: "Avez-vous validé que vos clients ont réellement ce problème ?",
    choices: [
      { label: "Pas encore — c'est une conviction personnelle", score: 1 },
      { label: "J'ai eu quelques retours informels autour de moi", score: 2 },
      { label: "J'ai mené des entretiens clients et confirmé le besoin", score: 3 },
      { label: "Marché prouvé — j'ai des clients ou des pré-commandes", score: 4 },
    ],
  },
  {
    key: "offre",
    eyebrow: "Offre",
    question: "Comment vous positionnez-vous face à ce qui existe déjà ?",
    choices: [
      { label: "Je n'ai pas encore analysé la concurrence", score: 1 },
      { label: "Mon offre ressemble à ce qui existe, sans angle clair", score: 2 },
      { label: "J'ai un angle différenciant identifié et formulé", score: 3 },
      { label: "Ma différenciation est prouvée et reconnue par mes clients", score: 4 },
    ],
  },
  {
    key: "financier",
    eyebrow: "Finances",
    question: "Quelle est votre visibilité financière sur les 12 prochains mois ?",
    choices: [
      { label: "Aucune projection pour l'instant", score: 1 },
      { label: "J'ai une idée approximative des chiffres", score: 2 },
      { label: "J'ai un prévisionnel mais il manque de précision", score: 3 },
      { label: "Prévisionnel solide avec hypothèses testées et point d'équilibre connu", score: 4 },
    ],
  },
  {
    key: "bm",
    eyebrow: "Business model",
    question: "Comment générez-vous (ou allez-vous générer) vos revenus ?",
    choices: [
      { label: "Je n'ai pas encore défini comment je vais gagner de l'argent", score: 1 },
      { label: "J'ai une idée de modèle mais je ne l'ai pas encore testé", score: 2 },
      { label: "Modèle défini, premières ventes réalisées", score: 3 },
      { label: "Modèle validé avec revenus récurrents ou en forte croissance", score: 4 },
    ],
  },
  {
    key: "strategie",
    eyebrow: "Stratégie",
    question: "Avez-vous un plan d'action concret pour les 6 prochains mois ?",
    choices: [
      { label: "Non, j'avance au fil de l'eau", score: 1 },
      { label: "J'ai des idées en tête mais rien de formalisé", score: 2 },
      { label: "Plan écrit mais peu priorisé", score: 3 },
      { label: "Feuille de route claire avec jalons, priorités et ressources allouées", score: 4 },
    ],
  },
  {
    key: "esg",
    eyebrow: "Impact",
    question: "Votre projet crée-t-il de la valeur au-delà du profit ?",
    choices: [
      { label: "Ce n'est pas ma priorité pour l'instant", score: 1 },
      { label: "J'y pense mais rien n'est formalisé", score: 2 },
      { label: "Un impact positif est intégré à ma vision", score: 3 },
      { label: "Impact mesurable, au cœur de mon modèle et de mes décisions", score: 4 },
    ],
  },
  {
    key: "pitch",
    eyebrow: "Pitch",
    question: "Pouvez-vous convaincre un inconnu de l'intérêt de votre projet en 2 minutes ?",
    choices: [
      { label: "Je galère encore à l'expliquer clairement", score: 1 },
      { label: "Je peux l'expliquer mais ce n'est pas toujours convaincant", score: 2 },
      { label: "Mon pitch est rodé et les gens comprennent vite", score: 3 },
      { label: "Je convaincs systématiquement, avec un support professionnel", score: 4 },
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
        description="Testez la solidité de votre projet en 3 minutes. Recevez votre score et une recommandation d'accompagnement personnalisée."
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
                <h1 className="font-editorial italic text-4xl md:text-5xl font-semibold text-primary-foreground mb-4 leading-tight">
                  Où en est vraiment votre projet ?
                </h1>
                <p className="text-primary-foreground/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                  8 questions pour évaluer honnêtement vos forces et vos angles morts. Recevez un diagnostic personnalisé et une recommandation d'accompagnement.
                </p>
                <Button
                  onClick={() => setStep(0)}
                  size="lg"
                  variant="secondary"
                  className="font-bold text-base px-8 w-full sm:w-auto"
                >
                  Démarrer le diagnostic <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-primary-foreground/40 text-xs mt-4">Gratuit · Sans engagement · Résultats par email</p>
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
                    {step + 1} / {QUESTIONS.length}
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
                    <ArrowLeft className="h-3.5 w-3.5" /> Question précédente
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
                    Votre diagnostic est prêt.
                  </h2>
                  <p className="text-muted-foreground text-sm text-center mb-8 leading-relaxed">
                    Entrez vos informations pour recevoir votre score détaillé et votre recommandation d'accompagnement.
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
