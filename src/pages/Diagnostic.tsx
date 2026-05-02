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
    eyebrow: "Équipe & expertises",
    question: "Votre équipe a-t-elle les compétences pour exécuter votre stratégie ?",
    choices: [
      { label: "Je porte le projet seul·e — toutes les compétences clés reposent sur moi", score: 1 },
      { label: "J'ai des associé·e·s mais nos rôles et expertises se chevauchent encore", score: 2 },
      { label: "Équipe en place, rôles clairs et expertises complémentaires", score: 3 },
      { label: "Équipe complète, expertises rares maîtrisées en interne, dynamique solide", score: 4 },
    ],
  },
  {
    key: "marche",
    eyebrow: "Marché",
    question: "Connaissez-vous précisément le marché sur lequel vous jouez ?",
    choices: [
      { label: "Pas vraiment — c'est une intuition basée sur mon expérience", score: 1 },
      { label: "Quelques retours informels mais ni taille, ni segmentation chiffrée", score: 2 },
      { label: "Marché segmenté, taille estimée, dynamiques de croissance comprises", score: 3 },
      { label: "Marché cartographié : taille, segments, croissance et référence marché identifiées", score: 4 },
    ],
  },
  {
    key: "offre",
    eyebrow: "Différenciation",
    question: "Votre offre est-elle vraiment difficile à copier ?",
    choices: [
      { label: "Je n'ai pas encore analysé sérieusement la concurrence", score: 1 },
      { label: "Mon offre ressemble à ce qui existe, sans angle clair", score: 2 },
      { label: "Différenciation formulée et reconnue par mes premiers clients", score: 3 },
      { label: "Avantage concurrentiel structurel, prouvé et difficile à reproduire", score: 4 },
    ],
  },
  {
    key: "financier",
    eyebrow: "Pilotage financier",
    question: "Maîtrisez-vous les chiffres qui pilotent votre projet ?",
    choices: [
      { label: "Pas de prévisionnel — j'avance sans visibilité chiffrée", score: 1 },
      { label: "Idée approximative des revenus et des coûts", score: 2 },
      { label: "Prévisionnel construit avec hypothèses identifiées", score: 3 },
      { label: "Scénarios testés, point d'équilibre connu, runway clair sur 12 mois", score: 4 },
    ],
  },
  {
    key: "bm",
    eyebrow: "Modèle économique",
    question: "Votre modèle économique est-il validé par le marché ?",
    choices: [
      { label: "Modèle pas encore défini ou jamais confronté au réel", score: 1 },
      { label: "Modèle théorique, sans validation client", score: 2 },
      { label: "Premières ventes réalisées, modèle en cours d'optimisation", score: 3 },
      { label: "Modèle prouvé : revenus récurrents ou en forte croissance", score: 4 },
    ],
  },
  {
    key: "strategie",
    eyebrow: "Stratégie",
    question: "Savez-vous ce qui fera la différence sur votre marché ?",
    choices: [
      { label: "Je ne sais pas encore ce qui fait gagner dans mon secteur", score: 1 },
      { label: "J'ai des intuitions mais aucune stratégie formalisée", score: 2 },
      { label: "Facteurs clés identifiés, plan d'action priorisé sur 6 mois", score: 3 },
      { label: "Stratégie claire, ressources allouées, capacités déployées", score: 4 },
    ],
  },
  {
    key: "esg",
    eyebrow: "Impact",
    question: "Votre projet crée-t-il de la valeur au-delà du profit ?",
    choices: [
      { label: "Ce n'est pas un sujet pour moi aujourd'hui", score: 1 },
      { label: "J'y pense, sans démarche structurée", score: 2 },
      { label: "Impact intégré à ma vision et à ma communication", score: 3 },
      { label: "Impact mesurable, structurant pour le modèle et les décisions", score: 4 },
    ],
  },
  {
    key: "pitch",
    eyebrow: "Formulation",
    question: "Savez-vous formuler votre stratégie de façon claire et convaincante ?",
    choices: [
      { label: "J'ai du mal à expliquer simplement ce que je fais", score: 1 },
      { label: "Je l'explique mais je ne convaincs pas toujours", score: 2 },
      { label: "Pitch rodé, support propre, retours positifs réguliers", score: 3 },
      { label: "Je convaincs systématiquement, avec preuves et alignement marché", score: 4 },
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
        description="Un parcours en 8 étapes pour explorer la maturité de votre projet en 3 minutes. Révélez vos forces, vos angles morts et l'offre Club adaptée à votre stade."
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold tracking-[0.18em] uppercase mb-6">
                  <Target className="h-3 w-3" /> Diagnostic projet · Club Mare Nostrum
                </div>
                <h1 className="font-editorial italic text-4xl md:text-5xl font-semibold text-primary-foreground mb-4 leading-tight">
                  Où en est vraiment votre projet ?
                </h1>
                <p className="text-primary-foreground/75 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                  Un parcours en 8 étapes pour explorer honnêtement la maturité de votre projet : marché, modèle, stratégie, équipe. À l'arrivée, votre diagnostic personnalisé et l'offre Club adaptée à votre stade.
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
