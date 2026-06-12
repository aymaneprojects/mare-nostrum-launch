import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Star, UserPlus, ChevronRight } from "lucide-react";

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

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-2 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
          className="focus:outline-none cursor-pointer p-1 -m-1 touch-manipulation"
          aria-label={`${star} étoile${star > 1 ? "s" : ""}`}>
          <Star className="h-9 w-9 transition-colors duration-150"
            fill={(hover || value) >= star ? "hsl(181 67% 54%)" : "none"}
            stroke={(hover || value) >= star ? "hsl(181 67% 54%)" : "hsl(224 14% 50%)"}
            strokeWidth={1.5} />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-1 text-base font-bold" style={{ color: "hsl(181 67% 54%)" }}>
          {value}/5
        </span>
      )}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-1 items-center shrink-0">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="h-4 w-4"
          fill={value >= star ? "hsl(181 67% 54%)" : "none"}
          stroke={value >= star ? "hsl(181 67% 54%)" : "hsl(224 14% 50%)"}
          strokeWidth={1.5} />
      ))}
      <span className="ml-1 text-sm font-bold" style={{ color: "hsl(181 67% 54%)" }}>{value}/5</span>
    </div>
  );
}

type Phase = "code" | "liste" | "register" | "form" | "confirm" | "loading" | "next";
type Notes    = Record<string, number>;
type Comments = Record<string, { positif: string; amelio: string }>;
type Jure     = { id: string; nom: string; code: string };

export default function NiteoEvaluation() {
  const [phase, setPhase]           = useState<Phase>("code");
  const [juryCode, setJuryCode]     = useState("");
  const [jures, setJures]           = useState<Jure[]>([]);
  const [nomJure, setNomJure]       = useState("");
  const [codeJure, setCodeJure]     = useState("");
  const [nom, setNom]               = useState("");
  const [prenom, setPrenom]         = useState("");
  const [email, setEmail]           = useState("");
  const [telephone, setTel]         = useState("");
  const [projet, setProjet]         = useState("");
  const [lastProjet, setLastProjet] = useState("");
  const [notes, setNotes]           = useState<Notes>({});
  const [comments, setComments]     = useState<Comments>({});
  const [general, setGeneral]       = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [projets, setProjets]       = useState<string[]>([]);
  const [projetsEvalues, setProjetsEvalues] = useState<string[]>([]);

  useEffect(() => {
    supabase.functions.invoke("get-niteo-projects")
      .then(({ data }) => { if (data?.projets) setProjets(data.projets); });
  }, []);

  const projetsRestants = projets.filter((p) => !projetsEvalues.includes(p));
  const totalNote       = Object.values(notes).reduce((s, v) => s + v, 0);
  const allFilled       = AXES.every((a) => (notes[a.key] ?? 0) > 0) && projet;

  const fetchEvalues = async (nom: string) => {
    const { data } = await supabase.functions.invoke("submit-niteo-evaluation", {
      body: { action: "get-evaluated", nomJure: nom },
    });
    setProjetsEvalues(data?.projetsEvalues ?? []);
  };

  // ── Étape 1 : valider le code jury → afficher tous les jurés avec ce code
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: fnErr } = await supabase.functions.invoke("verify-jury-code", {
      body: { action: "validate", code: juryCode.trim().toUpperCase() },
    });
    setLoading(false);
    if (fnErr || data?.error) { setError("Code introuvable. Vérifiez votre code jury."); return; }
    if (!data.valid) { setError("Code introuvable. Vérifiez votre code jury."); return; }
    setJures(data.jures ?? []);
    setPhase("liste");
  };

  // ── Étape 2a : sélectionner son nom dans la liste
  const handleSelect = async (jure: Jure) => {
    setError("");
    setLoading(true);
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

  // ── Étape 2b : inscription (nom pas dans la liste) — même code attribué
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
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

  // ── Étape 3 : valider le formulaire → écran de confirmation
  const handleGoConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFilled) { setError("Veuillez noter tous les axes et choisir un projet."); return; }
    setError("");
    setPhase("confirm");
  };

  // ── Étape 4 : confirmer et envoyer
  const handleConfirmedSubmit = async () => {
    setPhase("loading");
    const { data, error: fnErr } = await supabase.functions.invoke("submit-niteo-evaluation", {
      body: { code: codeJure, projet, notes, commentaires: { ...comments, general } },
    });
    if (fnErr || data?.error) {
      setError(data?.error ?? fnErr?.message ?? "Erreur serveur.");
      setPhase("form");
      return;
    }
    setLastProjet(projet);
    setProjetsEvalues((prev) => [...prev, projet]);
    setProjet("");
    setNotes({});
    setComments({});
    setGeneral("");
    setPhase("next");
  };

  const startProject = (p: string) => {
    setProjet(p);
    setNotes({});
    setComments({});
    setGeneral("");
    setError("");
    setPhase("form");
  };

  const setNote    = (key: string, val: number) => setNotes((p) => ({ ...p, [key]: val }));
  const setComment = (key: string, field: "positif" | "amelio", val: string) =>
    setComments((p) => ({ ...p, [key]: { ...(p[key] ?? { positif: "", amelio: "" }), [field]: val } }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pt-6 pb-10 px-4">
        <div className="w-full max-w-lg mx-auto">

          {/* ── CODE */}
          {phase === "code" && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="mn-eyebrow-turquoise mb-3">Demo Day · 16 juin 2026</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--mn-ink))" }}>
                Grille d'évaluation jury
              </h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Saisissez le code jury qui vous a été attribué.
              </p>
              <form onSubmit={handleCodeSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="juryCode">Code jury</Label>
                  <Input id="juryCode" value={juryCode}
                    onChange={(e) => setJuryCode(e.target.value)}
                    autoCapitalize="characters"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    required className="text-center font-mono text-lg tracking-widest" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading || !juryCode}
                  style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Continuer
                </Button>
              </form>
            </div>
          )}

          {/* ── LISTE */}
          {phase === "liste" && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="mn-eyebrow-turquoise mb-3">Demo Day · 16 juin 2026</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--mn-ink))" }}>
                Qui êtes-vous ?
              </h1>
              <p className="text-muted-foreground mb-6 text-sm">
                Sélectionnez votre nom dans la liste.
              </p>
              <div className="space-y-4 mb-6">
                <select
                  defaultValue=""
                  onChange={(e) => {
                    const jure = jures.find((j) => j.id === e.target.value);
                    if (jure) handleSelect(jure);
                  }}
                  className="w-full h-12 rounded-xl border border-input bg-background px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="" disabled>Sélectionnez votre nom…</option>
                  {[...jures].sort((a, b) => a.nom.localeCompare(b.nom, "fr")).map((j) => (
                    <option key={j.id} value={j.id}>{j.nom}</option>
                  ))}
                </select>
              </div>
              {error && <p className="text-sm text-destructive mb-3">{error}</p>}
              {loading && (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-5 w-5 animate-spin" style={{ color: "hsl(var(--mn-turquoise))" }} />
                </div>
              )}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Votre nom n'est pas dans la liste ?</p>
                <Button variant="outline" className="w-full" onClick={() => setPhase("register")}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Je ne suis pas dans la liste
                </Button>
              </div>
            </div>
          )}

          {/* ── REGISTER */}
          {phase === "register" && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="mn-eyebrow-turquoise mb-3">Demo Day · 16 juin 2026</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--mn-ink))" }}>
                Vos informations
              </h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Renseignez vos coordonnées — le code <strong>{juryCode}</strong> vous sera attribué.
              </p>
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nom">Nom *</Label>
                    <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="votre@email.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tel">Téléphone *</Label>
                  <Input id="tel" type="tel" value={telephone} onChange={(e) => setTel(e.target.value)} required placeholder="+33 6 00 00 00 00" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading || !prenom || !nom || !email || !telephone}
                  style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Accéder à la grille
                </Button>
                <button type="button" onClick={() => setPhase("liste")}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ← Retour à la liste
                </button>
              </form>
            </div>
          )}

          {/* ── LOADING */}
          {phase === "loading" && (
            <div className="text-center py-24">
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" style={{ color: "hsl(var(--mn-turquoise))" }} />
              <p className="text-muted-foreground">Enregistrement en cours…</p>
            </div>
          )}

          {/* ── FORM */}
          {phase === "form" && (
            <form onSubmit={handleGoConfirm} className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="mn-eyebrow-turquoise mb-3">Demo Day · 16 juin 2026</div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: "hsl(var(--mn-ink))" }}>
                  Bonjour, {nomJure.split(" ")[0]} !
                </h1>
                {projetsEvalues.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {projetsEvalues.length} projet{projetsEvalues.length > 1 ? "s" : ""} évalué{projetsEvalues.length > 1 ? "s" : ""} · {projetsRestants.length} restant{projetsRestants.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Sélection projet */}
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <Label htmlFor="projet" className="text-base font-semibold">Projet à évaluer *</Label>
                <select id="projet" value={projet} onChange={(e) => setProjet(e.target.value)} required
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Sélectionnez le projet…</option>
                  {projetsRestants.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {projetsEvalues.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Déjà évalués : {projetsEvalues.join(", ")}
                  </p>
                )}
              </div>

              {/* Axes */}
              {AXES.map((axe) => (
                <div key={axe.key} className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: "hsl(var(--mn-ink))" }}>{axe.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{axe.desc}</p>
                  </div>
                  <StarRating value={notes[axe.key] ?? 0} onChange={(v) => setNote(axe.key, v)} />
                  <div className="space-y-2 pt-1">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-green-700">Points positifs</Label>
                      <Textarea rows={2} value={comments[axe.key]?.positif ?? ""}
                        onChange={(e) => setComment(axe.key, "positif", e.target.value)}
                        placeholder="Ce qui fonctionne bien…" className="text-sm resize-none" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-orange-700">Points à améliorer</Label>
                      <Textarea rows={2} value={comments[axe.key]?.amelio ?? ""}
                        onChange={(e) => setComment(axe.key, "amelio", e.target.value)}
                        placeholder="Ce qui peut être amélioré…" className="text-sm resize-none" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Remarques générales */}
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <Label className="text-base font-semibold">Remarques générales</Label>
                <Textarea rows={4} value={general} onChange={(e) => setGeneral(e.target.value)}
                  placeholder="Observations globales sur le projet…" className="text-sm resize-none" />
              </div>

              {/* Score + Soumettre */}
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Note totale ({Object.keys(notes).length}/{AXES.length} axes notés)
                  </span>
                  <span className="text-2xl font-bold font-editorial" style={{ color: "hsl(var(--mn-nuit))" }}>
                    {totalNote}<span className="text-base font-normal text-muted-foreground">/45</span>
                  </span>
                </div>
                {error && <p className="text-sm text-destructive mb-3">{error}</p>}
                <Button type="submit" className="w-full" disabled={!allFilled}
                  style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}>
                  Vérifier avant d'envoyer →
                </Button>
                {!allFilled && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Notez tous les axes et choisissez un projet pour continuer.
                  </p>
                )}
              </div>
            </form>
          )}

          {/* ── CONFIRM */}
          {phase === "confirm" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                <div className="mn-eyebrow-turquoise mb-2">Récapitulatif</div>
                <h2 className="text-xl font-bold mb-1" style={{ color: "hsl(var(--mn-ink))" }}>
                  Êtes-vous sûr(e) ?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Vérifiez vos notes — une fois envoyées, elles ne peuvent plus être modifiées.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Projet :</span>
                  <span className="font-semibold text-sm">{projet}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Note totale :</span>
                  <span className="font-bold" style={{ color: "hsl(var(--mn-turquoise))" }}>{totalNote}/45</span>
                </div>
              </div>

              {AXES.map((axe) => (
                <div key={axe.key} className="bg-card border border-border rounded-xl px-4 py-3">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <p className="font-semibold text-sm" style={{ color: "hsl(var(--mn-ink))" }}>{axe.label}</p>
                    <StarDisplay value={notes[axe.key] ?? 0} />
                  </div>
                  {comments[axe.key]?.positif && (
                    <p className="text-xs mt-1" style={{ color: "#15803d" }}>+ {comments[axe.key].positif}</p>
                  )}
                  {comments[axe.key]?.amelio && (
                    <p className="text-xs mt-0.5" style={{ color: "#c2410c" }}>△ {comments[axe.key].amelio}</p>
                  )}
                </div>
              ))}

              {general && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Remarques générales</p>
                  <p className="text-sm">{general}</p>
                </div>
              )}

              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <Button className="w-full" onClick={handleConfirmedSubmit}
                  style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}>
                  Confirmer et envoyer
                </Button>
                <button type="button" onClick={() => setPhase("form")}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  ← Modifier mon évaluation
                </button>
              </div>
            </div>
          )}

          {/* ── NEXT (après envoi) */}
          {phase === "next" && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "hsl(var(--mn-turquoise) / 0.12)" }}>
                  <CheckCircle2 className="h-8 w-8" style={{ color: "hsl(var(--mn-turquoise))" }} />
                </div>
                <h2 className="text-xl font-bold mb-1" style={{ color: "hsl(var(--mn-ink))" }}>
                  Évaluation enregistrée !
                </h2>
                <p className="text-muted-foreground text-sm">
                  Merci <strong>{nomJure.split(" ")[0]}</strong> — <strong>« {lastProjet} »</strong> a bien été transmis.
                </p>
              </div>

              {projetsRestants.length > 0 ? (
                <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold mb-1" style={{ color: "hsl(var(--mn-ink))" }}>
                    Projets restants à évaluer
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {projetsRestants.length} projet{projetsRestants.length > 1 ? "s" : ""} à noter
                  </p>
                  <div className="space-y-2">
                    {projetsRestants.map((p) => (
                      <button key={p} onClick={() => startProject(p)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-background hover:bg-accent transition-colors cursor-pointer touch-manipulation">
                        <span className="font-medium text-sm">{p}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
                  <div className="text-3xl mb-3">🎉</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "hsl(var(--mn-ink))" }}>
                    Tous les projets évalués !
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
