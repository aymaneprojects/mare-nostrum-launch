import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Star, UserPlus, ChevronRight } from "lucide-react";
import logoNiteo from "@/assets/niteo/logo-niteo-2026.png";

const AXES = [
  { key: "marche",       label: "Potentiel du marché",        desc: "Problématique identifiée, intérêt et traction des premiers clients, taille du marché, time to market, opportunité de marché, mode d'accès aux clients…" },
  { key: "valeur",       label: "Proposition de valeur",      desc: "Pertinence de la solution, caractéristiques de l'offre, potentiel de différenciation, stratégie marketing…" },
  { key: "bm",           label: "Business Model",             desc: "Hypothèses économiques, stratégie marketing, facilité d'accès aux clients…" },
  { key: "robustesse",   label: "Robustesse",                 desc: "Potentiel de croissance du CA et de rentabilité à moyen terme, plan d'investissement initial, roadmap de financement, maîtrise du pilotage financier, cohérence des hypothèses économiques…" },
  { key: "innovation",   label: "Innovation",                 desc: "Niveau d'innovation, intensité des barrières à l'entrée, capacité à créer un actif valorisable et protégeable…" },
  { key: "impact",       label: "Impact territorial",         desc: "Utilité territoriale, sociale et environnementale, prise en compte des limites planétaires, engagement local et intérêt pour le territoire…" },
  { key: "leadership",   label: "Leadership",                 desc: "Posture entrepreneuriale du porteur de projet, qualité de la dynamique managériale, état d'esprit entrepreneurial, couverture des compétences clés…" },
  { key: "presentation", label: "Qualité de la présentation", desc: "Originalité du discours, clarté, préparation et fluidité du pitch, qualité des supports, tenue vestimentaire…" },
  { key: "synthese",     label: "Synthèse",                   desc: "Cohérence de la vision globale, pertinence du plan d'action à 3–6 mois, call to action final…" },
];

const TURQUOISE = "hsl(181 67% 54%)";
const INK       = "hsl(var(--mn-ink))";
const NUIT      = "hsl(var(--mn-nuit))";

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star} type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none touch-manipulation active:scale-90 transition-transform"
          style={{ padding: "6px", margin: "-6px 2px" }}
          aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
        >
          <Star
            className="h-10 w-10 transition-colors duration-100"
            fill={(hover || value) >= star ? TURQUOISE : "none"}
            stroke={(hover || value) >= star ? TURQUOISE : "hsl(224 14% 75%)"}
            strokeWidth={1.5}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-base font-bold tabular-nums" style={{ color: TURQUOISE }}>
          {value}/5
        </span>
      )}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 items-center shrink-0">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="h-3.5 w-3.5"
          fill={value >= star ? TURQUOISE : "none"}
          stroke={value >= star ? TURQUOISE : "hsl(224 14% 70%)"}
          strokeWidth={1.5} />
      ))}
      <span className="ml-1 text-xs font-bold tabular-nums" style={{ color: TURQUOISE }}>{value}/5</span>
    </div>
  );
}

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex justify-center gap-2 mb-5">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="rounded-full transition-all duration-300"
          style={{
            width: s === current ? 20 : 8, height: 8,
            background: s === current ? TURQUOISE : "hsl(224 14% 80%)",
          }} />
      ))}
    </div>
  );
}

type Phase = "code" | "liste" | "register" | "form" | "confirm" | "loading" | "next";
type Notes    = Record<string, number>;
type Comments = Record<string, { positif: string; amelio: string }>;
type Jure     = { id: string; nom: string; code: string };

const PHASE_STEP: Record<Phase, number> = {
  code: 1, liste: 2, register: 2, form: 3, confirm: 4, loading: 4, next: 4,
};

export default function NiteoEvaluation() {
  const [phase, setPhase]               = useState<Phase>("code");
  const [juryCode, setJuryCode]         = useState("");
  const [jures, setJures]               = useState<Jure[]>([]);
  const [selectedJure, setSelectedJure] = useState<Jure | null>(null);
  const [nomJure, setNomJure]           = useState("");
  const [codeJure, setCodeJure]         = useState("");
  const [nom, setNom]                   = useState("");
  const [prenom, setPrenom]             = useState("");
  const [email, setEmail]               = useState("");
  const [telephone, setTel]             = useState("");
  const [projet, setProjet]             = useState("");
  const [lastProjet, setLastProjet]     = useState("");
  const [notes, setNotes]               = useState<Notes>({});
  const [comments, setComments]         = useState<Comments>({});
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [projets, setProjets]           = useState<string[]>([]);
  const [projetsEvalues, setProjetsEvalues] = useState<string[]>([]);

  useEffect(() => {
    supabase.functions.invoke("get-niteo-projects")
      .then(({ data }) => { if (data?.projets) setProjets(data.projets); });
  }, []);

  const projetsRestants = projets.filter((p) => !projetsEvalues.includes(p));
  const totalNote       = Object.values(notes).reduce((s, v) => s + v, 0);
  const axesNotes       = Object.keys(notes).length;
  const allFilled       = AXES.every((a) => (notes[a.key] ?? 0) > 0) && projet;

  const fetchEvalues = async (nom: string) => {
    const { data } = await supabase.functions.invoke("submit-niteo-evaluation", {
      body: { action: "get-evaluated", nomJure: nom },
    });
    setProjetsEvalues(data?.projetsEvalues ?? []);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const { data, error: fnErr } = await supabase.functions.invoke("verify-jury-code", {
      body: { action: "validate", code: juryCode.trim().toUpperCase() },
    });
    setLoading(false);
    if (fnErr || data?.error || !data?.valid) { setError("Code introuvable. Vérifiez votre code jury."); return; }
    setJures(data.jures ?? []);
    setPhase("liste");
  };

  const handleSelect = async (jure: Jure) => {
    setError(""); setLoading(true);
    const { data, error: fnErr } = await supabase.functions.invoke("verify-jury-code", {
      body: { action: "select", recordId: jure.id },
    });
    if (fnErr || data?.error) { setError("Erreur de sélection."); setLoading(false); return; }
    await fetchEvalues(data.nomJure);
    setNomJure(data.nomJure);
    setCodeJure(data.codeJure);
    setLoading(false);
    setPhase("form");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const { data, error: fnErr } = await supabase.functions.invoke("verify-jury-code", {
      body: { action: "register", nom, prenom, email, telephone, code: juryCode.trim().toUpperCase() },
    });
    if (fnErr || data?.error) { setError(data?.error ?? "Erreur lors de l'inscription."); setLoading(false); return; }
    await fetchEvalues(data.nomJure);
    setNomJure(data.nomJure);
    setCodeJure(data.codeJure);
    setLoading(false);
    setPhase("form");
  };

  const handleGoConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFilled) { setError("Notez tous les axes et choisissez un projet."); return; }
    setError(""); setPhase("confirm");
  };

  const handleConfirmedSubmit = async () => {
    setPhase("loading");
    const { data, error: fnErr } = await supabase.functions.invoke("submit-niteo-evaluation", {
      body: { nomJure, code: codeJure, projet, notes, commentaires: { ...comments } },
    });
    if (fnErr || data?.error) {
      setError(data?.error ?? fnErr?.message ?? "Erreur serveur.");
      setPhase("form"); return;
    }
    setLastProjet(projet);
    setProjetsEvalues((prev) => [...prev, projet]);
    setProjet(""); setNotes({}); setComments({});
    setPhase("next");
  };

  const startProject = (p: string) => {
    setProjet(p); setNotes({}); setComments({}); setError("");
    setPhase("form");
  };

  const setNote    = (key: string, val: number) => setNotes((p) => ({ ...p, [key]: val }));
  const setComment = (key: string, field: "positif" | "amelio", val: string) =>
    setComments((p) => ({ ...p, [key]: { ...(p[key] ?? { positif: "", amelio: "" }), [field]: val } }));

  return (
    <div className="min-h-screen bg-background" style={{ paddingBottom: "env(safe-area-inset-bottom, 16px)" }}>

      {/* ── Navbar style NiteoHeader */}
      <div className="sticky top-0 z-50 bg-primary/90 backdrop-blur-xl border-b border-primary-foreground/5 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.3)]">
        <div className="h-16 px-4 flex items-center justify-between relative">
          {/* Logo */}
          <img src={logoNiteo} alt="Niteo" className="h-12" />

          {/* Centre */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-primary-foreground/90 text-xs font-semibold tracking-[0.25em] uppercase">
              Jury
            </span>
            <span className="text-primary-foreground/40 text-xs">|</span>
            <span className="text-primary-foreground/60 text-xs font-medium hidden sm:inline">
              16 juin 2026
            </span>
          </div>

          {/* Droite : nom + progression */}
          {nomJure ? (
            <div className="text-right">
              <p className="text-xs font-semibold text-primary-foreground/90 truncate max-w-[110px]">
                {nomJure.split(" ")[0]}
              </p>
              <p className="text-[11px] text-primary-foreground/50">
                {projetsEvalues.length}/{projets.length || "?"} projet{projets.length !== 1 ? "s" : ""}
              </p>
            </div>
          ) : (
            <div className="w-[70px]" />
          )}
        </div>
      </div>

      <main className="px-4 pt-5 pb-10">
        <div className="w-full max-w-lg mx-auto">

          {phase !== "form" && phase !== "loading" && (
            <StepDots current={PHASE_STEP[phase]} />
          )}

          {/* ── CODE */}
          {phase === "code" && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-1" style={{ color: INK }}>
                Grille d'évaluation
              </h1>
              <p className="text-muted-foreground mb-7 text-sm leading-relaxed">
                Saisissez le code jury qui vous a été attribué.
              </p>
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="juryCode" className="text-sm font-medium">Code jury</Label>
                  <Input
                    id="juryCode" value={juryCode}
                    onChange={(e) => setJuryCode(e.target.value)}
                    autoCapitalize="characters" autoComplete="off" autoCorrect="off" spellCheck={false}
                    required
                    className="text-center font-mono text-xl tracking-[0.3em] h-14 rounded-xl"
                    style={{ fontSize: 20 }}
                    placeholder="NITEO-XX"
                  />
                </div>
                {error && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3">
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </div>
                )}
                <Button type="submit" className="w-full h-13 rounded-xl text-base font-semibold touch-manipulation"
                  disabled={loading || !juryCode}
                  style={{ background: TURQUOISE, color: INK, height: 52 }}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  Continuer
                </Button>
              </form>
            </div>
          )}

          {/* ── LISTE */}
          {phase === "liste" && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-1" style={{ color: INK }}>Qui êtes-vous ?</h1>
              <p className="text-muted-foreground mb-6 text-sm">
                Sélectionnez votre nom dans la liste.
              </p>
              <div className="space-y-3 mb-5">
                <select
                  defaultValue=""
                  onChange={(e) => {
                    const jure = jures.find((j) => j.id === e.target.value);
                    setSelectedJure(jure ?? null);
                  }}
                  className="w-full rounded-xl border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-ring touch-manipulation"
                  style={{ height: 52, fontSize: 16 }}
                >
                  <option value="" disabled>Sélectionnez votre nom…</option>
                  {[...jures].sort((a, b) => a.nom.localeCompare(b.nom, "fr")).map((j) => (
                    <option key={j.id} value={j.id}>{j.nom}</option>
                  ))}
                </select>
                <Button
                  className="w-full rounded-xl text-base font-semibold touch-manipulation"
                  disabled={!selectedJure || loading}
                  onClick={() => selectedJure && handleSelect(selectedJure)}
                  style={{ background: TURQUOISE, color: INK, height: 52 }}
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  Continuer
                </Button>
              </div>
              {error && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 mb-4">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Votre nom n'est pas dans la liste ?</p>
                <Button variant="outline" className="w-full rounded-xl touch-manipulation" style={{ height: 48 }}
                  onClick={() => setPhase("register")}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Je ne suis pas dans la liste
                </Button>
              </div>
            </div>
          )}

          {/* ── REGISTER */}
          {phase === "register" && (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold mb-1" style={{ color: INK }}>Vos informations</h1>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Renseignez vos coordonnées — le code <strong className="font-mono">{juryCode}</strong> vous sera attribué.
              </p>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="prenom" className="text-sm">Prénom *</Label>
                    <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)}
                      required className="rounded-xl" style={{ height: 48, fontSize: 16 }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nom" className="text-sm">Nom *</Label>
                    <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)}
                      required className="rounded-xl" style={{ height: 48, fontSize: 16 }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm">Email *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    required placeholder="votre@email.com"
                    className="rounded-xl" style={{ height: 48, fontSize: 16 }} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tel" className="text-sm">Téléphone *</Label>
                  <Input id="tel" type="tel" value={telephone} onChange={(e) => setTel(e.target.value)}
                    required placeholder="+33 6 00 00 00 00"
                    className="rounded-xl" style={{ height: 48, fontSize: 16 }} />
                </div>
                {error && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3">
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </div>
                )}
                <Button type="submit" className="w-full rounded-xl text-base font-semibold touch-manipulation"
                  disabled={loading || !prenom || !nom || !email || !telephone}
                  style={{ background: TURQUOISE, color: INK, height: 52 }}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                  Accéder à la grille
                </Button>
                <button type="button" onClick={() => setPhase("liste")}
                  className="w-full text-sm text-muted-foreground py-3 touch-manipulation active:opacity-60 transition-opacity">
                  ← Retour à la liste
                </button>
              </form>
            </div>
          )}

          {/* ── LOADING */}
          {phase === "loading" && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="h-12 w-12 animate-spin" style={{ color: TURQUOISE }} />
              <p className="text-muted-foreground font-medium">Enregistrement en cours…</p>
            </div>
          )}

          {/* ── FORM */}
          {phase === "form" && (
            <form onSubmit={handleGoConfirm} className="space-y-4">

              {/* Header juré + progression */}
              <div className="bg-card border border-border rounded-2xl px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-bold" style={{ color: INK }}>
                      Bonjour, {nomJure.split(" ")[0]} !
                    </h1>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {projetsEvalues.length > 0
                        ? `${projetsEvalues.length} évalué${projetsEvalues.length > 1 ? "s" : ""} · ${projetsRestants.length} restant${projetsRestants.length !== 1 ? "s" : ""}`
                        : "Choisissez un projet pour commencer"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {projets.length > 0 && (
                      <div className="flex gap-1">
                        {projets.map((p) => (
                          <div key={p} className="h-2 w-2 rounded-full"
                            style={{ background: projetsEvalues.includes(p) ? TURQUOISE : "hsl(224 14% 82%)" }} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sélection projet */}
              <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
                <Label htmlFor="projet" className="text-sm font-semibold" style={{ color: INK }}>
                  Projet à évaluer *
                </Label>
                <select id="projet" value={projet} onChange={(e) => setProjet(e.target.value)} required
                  className="w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring touch-manipulation"
                  style={{ height: 48, fontSize: 16 }}>
                  <option value="">Sélectionnez le projet…</option>
                  {projetsRestants.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {projetsEvalues.length > 0 && (
                  <p className="text-xs text-muted-foreground pt-1">
                    Déjà évalués : {projetsEvalues.join(", ")}
                  </p>
                )}
              </div>

              {/* Axes */}
              {AXES.map((axe, i) => (
                <div key={axe.key} className="bg-card border border-border rounded-2xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold rounded-full px-1.5 py-0.5 tabular-nums"
                          style={{ background: "hsl(181 67% 54% / 0.15)", color: TURQUOISE }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-semibold text-sm" style={{ color: INK }}>{axe.label}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug">{axe.desc}</p>
                    </div>
                    {(notes[axe.key] ?? 0) > 0 && (
                      <div className="shrink-0">
                        <span className="text-base font-bold tabular-nums" style={{ color: TURQUOISE }}>
                          {notes[axe.key]}/5
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="py-1">
                    <StarRating value={notes[axe.key] ?? 0} onChange={(v) => setNote(axe.key, v)} />
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold" style={{ color: "#15803d" }}>
                        Points positifs
                      </Label>
                      <Textarea rows={2} value={comments[axe.key]?.positif ?? ""}
                        onChange={(e) => setComment(axe.key, "positif", e.target.value)}
                        placeholder="Ce qui fonctionne bien…"
                        className="text-sm resize-none rounded-xl" style={{ fontSize: 16 }} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold" style={{ color: "#c2410c" }}>
                        Points à améliorer
                      </Label>
                      <Textarea rows={2} value={comments[axe.key]?.amelio ?? ""}
                        onChange={(e) => setComment(axe.key, "amelio", e.target.value)}
                        placeholder="Ce qui peut être amélioré…"
                        className="text-sm resize-none rounded-xl" style={{ fontSize: 16 }} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Score + CTA sticky */}
              <div className="sticky bottom-4 z-10">
                <div className="bg-card border border-border rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{axesNotes}/{AXES.length} axes notés</p>
                      <p className="text-2xl font-bold tabular-nums" style={{ color: NUIT }}>
                        {totalNote}<span className="text-sm font-normal text-muted-foreground">/45</span>
                      </p>
                    </div>
                    {/* Barre de progression */}
                    <div className="flex gap-1 flex-wrap justify-end max-w-[120px]">
                      {AXES.map((a) => (
                        <div key={a.key} className="h-1.5 w-1.5 rounded-full transition-colors duration-200"
                          style={{ background: (notes[a.key] ?? 0) > 0 ? TURQUOISE : "hsl(224 14% 82%)" }} />
                      ))}
                    </div>
                  </div>
                  {error && (
                    <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-3 py-2 mb-3">
                      <p className="text-xs text-destructive font-medium">{error}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full rounded-xl text-base font-semibold touch-manipulation"
                    disabled={!allFilled}
                    style={{ background: allFilled ? TURQUOISE : undefined, color: allFilled ? INK : undefined, height: 52 }}>
                    Vérifier avant d'envoyer →
                  </Button>
                  {!allFilled && (
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Notez les {AXES.length - axesNotes} axe{AXES.length - axesNotes > 1 ? "s" : ""} restant{AXES.length - axesNotes > 1 ? "s" : ""} et choisissez un projet.
                    </p>
                  )}
                </div>
              </div>
            </form>
          )}

          {/* ── CONFIRM */}
          {phase === "confirm" && (
            <div className="space-y-3">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mn-eyebrow-turquoise mb-2 text-xs">Récapitulatif</div>
                <h2 className="text-xl font-bold mb-1" style={{ color: INK }}>Êtes-vous sûr(e) ?</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Une fois envoyées, les notes ne peuvent plus être modifiées.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Projet</p>
                    <p className="font-semibold text-sm" style={{ color: INK }}>{projet}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Note totale</p>
                    <p className="font-bold text-lg tabular-nums" style={{ color: TURQUOISE }}>{totalNote}/45</p>
                  </div>
                </div>
              </div>

              {AXES.map((axe) => (
                <div key={axe.key} className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm truncate flex-1" style={{ color: INK }}>{axe.label}</p>
                    <StarDisplay value={notes[axe.key] ?? 0} />
                  </div>
                  {comments[axe.key]?.positif && (
                    <p className="text-xs mt-1 leading-snug" style={{ color: "#15803d" }}>
                      + {comments[axe.key].positif}
                    </p>
                  )}
                  {comments[axe.key]?.amelio && (
                    <p className="text-xs mt-0.5 leading-snug" style={{ color: "#c2410c" }}>
                      △ {comments[axe.key].amelio}
                    </p>
                  )}
                </div>
              ))}

              <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                <Button className="w-full rounded-xl text-base font-semibold touch-manipulation"
                  onClick={handleConfirmedSubmit}
                  style={{ background: TURQUOISE, color: INK, height: 52 }}>
                  Confirmer et envoyer
                </Button>
                <button type="button" onClick={() => setPhase("form")}
                  className="w-full text-sm text-muted-foreground py-3 touch-manipulation active:opacity-60 transition-opacity">
                  ← Modifier mon évaluation
                </button>
              </div>
            </div>
          )}

          {/* ── NEXT */}
          {phase === "next" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "hsl(181 67% 54% / 0.12)" }}>
                  <CheckCircle2 className="h-8 w-8" style={{ color: TURQUOISE }} />
                </div>
                <h2 className="text-xl font-bold mb-1" style={{ color: INK }}>Évaluation envoyée !</h2>
                <p className="text-muted-foreground text-sm">
                  <strong>« {lastProjet} »</strong> bien transmis. Merci {nomJure.split(" ")[0]} !
                </p>
              </div>

              {projetsRestants.length > 0 ? (
                <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                  <h3 className="font-semibold mb-1" style={{ color: INK }}>
                    Projets restants à évaluer
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {projetsRestants.length} projet{projetsRestants.length > 1 ? "s" : ""} à noter
                  </p>
                  <div className="space-y-2">
                    {projetsRestants.map((p) => (
                      <button key={p} onClick={() => startProject(p)}
                        className="w-full flex items-center justify-between px-4 rounded-xl border border-border bg-background active:bg-accent transition-colors cursor-pointer touch-manipulation"
                        style={{ height: 52 }}>
                        <span className="font-medium text-sm">{p}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: INK }}>
                    Tous les projets évalués !
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Vous avez évalué l'ensemble des finalistes. Merci pour votre contribution, {nomJure.split(" ")[0]} !
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
