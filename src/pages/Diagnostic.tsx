import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { supabase } from "@/integrations/supabase/client";

// ─── axes (ton entrepreneur, pas jury externe) ─────────────────
const AXES = [
  {
    key: "equipe",
    label: "Votre équipe",
    question: "Êtes-vous bien entouré(e) ?",
    desc: "Votre équipe couvre-t-elle les fonctions clés — tech, commercial, opérations ? Avez-vous les expertises nécessaires pour exécuter ? Y a-t-il une dynamique de leadership et de confiance mutuelle ?",
  },
  {
    key: "marche",
    label: "Votre marché",
    question: "Avez-vous validé votre marché ?",
    desc: "Vos clients ont-ils réellement ce problème ? Le marché est-il suffisamment large pour soutenir votre croissance ? Votre fenêtre d'entrée est-elle opportune ?",
  },
  {
    key: "offre",
    label: "Votre offre",
    question: "Votre solution se démarque-t-elle ?",
    desc: "Votre solution répond-elle précisément au problème identifié ? Avez-vous un angle de différenciation clair par rapport à l'existant ? En quoi votre offre est-elle nouvelle ou supérieure ?",
  },
  {
    key: "financier",
    label: "Vos finances",
    question: "Avez-vous une visibilité financière ?",
    desc: "Avez-vous une projection de chiffre d'affaires réaliste ? Votre modèle peut-il atteindre la rentabilité ? Connaissez-vous votre point d'équilibre et votre besoin en financement ?",
  },
  {
    key: "bm",
    label: "Votre business model",
    question: "Comment vous allez gagner de l'argent ?",
    desc: "Votre modèle économique est-il clair et testé ? Savez-vous comment acquérir vos clients et à quel coût ? Votre stratégie commerciale est-elle adaptée à votre cible ?",
  },
  {
    key: "strategie",
    label: "Votre stratégie",
    question: "Avez-vous un plan d'action clair ?",
    desc: "Avez-vous une vision à 12–24 mois ? Votre plan des 3 à 6 prochains mois est-il concret et priorisé ? Avez-vous identifié les partenariats qui peuvent accélérer votre développement ?",
  },
  {
    key: "esg",
    label: "Votre impact",
    question: "Votre projet a-t-il un impact positif ?",
    desc: "Votre activité crée-t-elle de la valeur pour votre territoire, votre communauté ou l'environnement ? Avez-vous réfléchi aux externalités négatives de votre modèle ?",
  },
  {
    key: "presentation",
    label: "Votre pitch",
    question: "Savez-vous vendre votre projet ?",
    desc: "Pouvez-vous expliquer votre projet en 2 minutes de façon convaincante ? Votre discours est-il adapté à votre interlocuteur ? Avez-vous un support clair qui renforce votre message ?",
  },
];

const SCORE_LABELS = ["", "Pas démarré", "En réflexion", "En cours", "Solide", "Maîtrisé"];
const NOTE_OPTIONS  = [0, 5, 10, 15, 20];
const TOTAL_STEPS   = 10;

const clubReco = (score: number) => {
  if (score <= 20) return {
    tier: "Communauté", price: "30 €/mois", href: "/club#offres",
    desc: "Vous êtes en phase de construction. Le Club Communauté vous apporte les fondations : réseau, ressources, et premiers repères pour poser des bases solides.",
  };
  if (score <= 30) return {
    tier: "Groupe", price: "90 €/mois", href: "/club#offres",
    desc: "Votre projet prend forme mais a besoin de structuration. Le Club Groupe vous aide à affiner votre offre, tester votre marché et accélérer votre croissance.",
  };
  return {
    tier: "Individuel", price: "190 €/mois", href: "/club#offres",
    desc: "Votre projet est mature et prêt à passer à la vitesse supérieure. Le Club Individuel vous offre un accompagnement stratégique sur-mesure.",
  };
};

// ─── progress bar ──────────────────────────────────────────────
function StepProgress({ step }: { step: number }) {
  const pct = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
      <div
        className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── main ──────────────────────────────────────────────────────
const Diagnostic = () => {
  const [step, setStep]             = useState(0);
  const [done, setDone]             = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg]         = useState("");

  const [nom, setNom]       = useState("");
  const [email, setEmail]   = useState("");
  const [projet, setProjet] = useState("");

  const [scores,      setScores]      = useState<Record<string, number>>({});
  const [comments,    setComments]    = useState<Record<string, string>>({});
  const [remarques,   setRemarques]   = useState("");
  const [noteGlobale, setNoteGlobale] = useState<number | null>(null);

  const setScore   = (k: string, v: number) => setScores(s => ({ ...s, [k]: v }));
  const setComment = (k: string, v: string) => setComments(c => ({ ...c, [k]: v }));

  const totalScore = AXES.reduce((s, a) => s + (scores[a.key] ?? 0), 0);

  const canNext = (): boolean => {
    if (step === 0) return !!(nom.trim() && email.trim() && projet.trim());
    if (step >= 1 && step <= 8) return !!scores[AXES[step - 1].key];
    if (step === 9) return noteGlobale !== null;
    return false;
  };

  const submit = async () => {
    setSubmitting(true);
    setErrMsg("");
    try {
      const { error } = await supabase.functions.invoke("send-diagnostic", {
        body: { nom, email, projet, scores, comments, remarques, noteGlobale, totalScore },
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

  const go = (dir: 1 | -1) => {
    if (dir === 1 && step === 9) { submit(); return; }
    setStep(s => Math.max(0, Math.min(9, s + dir)));
    setErrMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reco = clubReco(totalScore);
  const axis = step >= 1 && step <= 8 ? AXES[step - 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <EnhancedSEOHead
        title="Diagnostic projet — Club Mare Nostrum"
        description="Évaluez votre projet entrepreneurial en 10 minutes sur 8 axes clés. Recevez un score personnalisé et une recommandation d'accompagnement."
      />
      <Header />

      <PageHero
        eyebrow="Club Mare Nostrum"
        title="Diagnostiquez votre projet."
        subtitle="10 minutes pour évaluer honnêtement votre projet sur 8 axes clés. Vous recevez vos résultats par email avec une recommandation d'accompagnement personnalisée."
        size="sm"
      />

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">

            {done ? (
              /* ── résultats ── */
              <div className="bg-card border border-border rounded-sm shadow-md p-8 md:p-10">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 border border-accent/30 mx-auto mb-6">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-editorial italic text-2xl md:text-3xl font-semibold text-center text-foreground mb-2">
                  Diagnostic terminé.
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Vos résultats ont été envoyés à <strong className="text-foreground">{email}</strong>.
                </p>

                {/* scores */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { label: "Score projet", value: totalScore, max: 40 },
                    { label: "Note globale",  value: noteGlobale ?? 0, max: 20 },
                  ].map(({ label, value, max }) => (
                    <div key={label} className="bg-secondary/40 rounded-sm p-5 text-center">
                      <div className="font-editorial italic text-4xl font-semibold text-primary">
                        {value}<span className="text-xl text-muted-foreground font-sans font-normal">/{max}</span>
                      </div>
                      <div className="mn-eyebrow-turquoise mt-2">{label}</div>
                    </div>
                  ))}
                </div>

                {/* récap axes */}
                <div className="border border-border rounded-sm overflow-hidden mb-8">
                  {AXES.map((a, i) => {
                    const s = scores[a.key] ?? 0;
                    return (
                      <div key={a.key} className={`flex items-center gap-4 px-5 py-3 ${i < AXES.length - 1 ? "border-b border-border" : ""}`}>
                        <span className="text-sm text-muted-foreground flex-1">{a.label}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full" style={{ width: `${(s / 5) * 100}%` }} />
                          </div>
                          <span className="text-sm font-semibold text-foreground tabular-nums w-7">{s}/5</span>
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
                  <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">{reco.desc}</p>
                  <Button asChild variant="secondary" className="w-full font-bold">
                    <Link to={reco.href}>Rejoindre le Club {reco.tier} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/">Retour sur le site</Link>
                </Button>
              </div>

            ) : (
              /* ── formulaire ── */
              <div className="bg-card border border-border rounded-sm shadow-md overflow-hidden">

                {/* barre de progression */}
                <div className="px-8 pt-6 pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground tabular-nums">
                      Étape {String(step + 1).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
                    </span>
                    {step >= 1 && step <= 8 && (
                      <span className="text-xs font-semibold text-accent">
                        {totalScore} / {step * 5} pts
                      </span>
                    )}
                  </div>
                  <StepProgress step={step} />
                </div>

                {/* contenu */}
                <div className="px-8 py-8">

                  {/* étape 0 — identité */}
                  {step === 0 && (
                    <div>
                      <div className="mn-eyebrow-turquoise mb-3">Votre profil</div>
                      <h2 className="font-editorial italic text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        Parlons de vous et de votre projet.
                      </h2>
                      <p className="text-muted-foreground mb-8 leading-relaxed">
                        Ce diagnostic évalue 8 axes de votre projet entrepreneurial. Soyez honnête avec vous-même — c'est la seule façon d'en tirer quelque chose d'utile.
                      </p>
                      <div className="space-y-5">
                        <div>
                          <Label htmlFor="nom" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Votre prénom et nom</Label>
                          <Input id="nom" value={nom} onChange={e => setNom(e.target.value)} placeholder="Marie Dupont" className="mt-1.5 rounded-sm" autoFocus />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Votre email</Label>
                          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="marie@startup.com" className="mt-1.5 rounded-sm" />
                        </div>
                        <div>
                          <Label htmlFor="projet" className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Nom de votre projet ou entreprise</Label>
                          <Input id="projet" value={projet} onChange={e => setProjet(e.target.value)} placeholder="Ma startup / Mon entreprise" className="mt-1.5 rounded-sm" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* étapes 1–8 — axes */}
                  {axis && (
                    <div>
                      <div className="mn-eyebrow-turquoise mb-3">Axe {String(step).padStart(2, "0")} / 08</div>
                      <h2 className="font-editorial italic text-2xl md:text-3xl font-semibold text-foreground mb-1">
                        {axis.question}
                      </h2>
                      <p className="text-sm font-semibold text-muted-foreground mb-2">{axis.label}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8">{axis.desc}</p>

                      {/* rating */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">Votre note</p>
                        <div className="grid grid-cols-5 gap-2">
                          {[1, 2, 3, 4, 5].map(v => {
                            const active = scores[axis.key] === v;
                            return (
                              <button
                                key={v}
                                onClick={() => setScore(axis.key, v)}
                                className={`flex flex-col items-center gap-1.5 py-3 px-1 border rounded-sm transition-all duration-150 cursor-pointer
                                  ${active
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-foreground hover:border-primary/50"
                                  }`}
                              >
                                <span className="font-editorial italic text-2xl font-semibold leading-none">{v}</span>
                                <span className={`text-[9px] font-semibold tracking-wide uppercase text-center leading-tight
                                  ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                  {SCORE_LABELS[v]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* commentaire */}
                      <div>
                        <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Votre commentaire <span className="normal-case font-normal">(optionnel)</span></p>
                        <Textarea
                          value={comments[axis.key] ?? ""}
                          onChange={e => setComment(axis.key, e.target.value)}
                          placeholder="Précisez votre situation, ce qui fonctionne, ce qui manque…"
                          rows={3}
                          className="rounded-sm resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* étape 9 — synthèse */}
                  {step === 9 && (
                    <div>
                      <div className="mn-eyebrow-turquoise mb-3">Synthèse finale</div>
                      <h2 className="font-editorial italic text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        Votre regard global.
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                        Prenez du recul sur votre projet dans son ensemble. Qu'est-ce qui vous semble le plus fragile ? Le plus prometteur ?
                      </p>

                      <div className="mb-6">
                        <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-2">Remarques libres</p>
                        <Textarea
                          value={remarques}
                          onChange={e => setRemarques(e.target.value)}
                          placeholder="Points forts, axes d'amélioration, contexte particulier, ce que vous n'avez pas pu exprimer…"
                          rows={4}
                          className="rounded-sm resize-none"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">Note globale / 20</p>
                        <div className="grid grid-cols-5 gap-2">
                          {NOTE_OPTIONS.map(v => {
                            const active = noteGlobale === v;
                            return (
                              <button
                                key={v}
                                onClick={() => setNoteGlobale(v)}
                                className={`py-3 border rounded-sm font-editorial italic text-2xl font-semibold transition-all duration-150 cursor-pointer
                                  ${active
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-background text-foreground hover:border-primary/50"
                                  }`}
                              >
                                {v}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {errMsg && (
                  <div className="mx-8 mb-4 px-4 py-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-sm">
                    {errMsg}
                  </div>
                )}

                {/* navigation */}
                <div className="flex gap-3 px-8 pb-8">
                  {step > 0 && (
                    <Button variant="outline" onClick={() => go(-1)} className="rounded-sm flex-shrink-0">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    onClick={() => go(1)}
                    disabled={!canNext() || submitting}
                    className="flex-1 rounded-sm font-bold"
                  >
                    {submitting ? "Envoi en cours…" : step === 9 ? "Voir mes résultats" : step === 0 ? "Commencer" : "Suivant"}
                    {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
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

export default Diagnostic;
