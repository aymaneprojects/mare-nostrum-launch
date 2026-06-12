import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import NiteoHeader from "@/components/NiteoHeader";


const AXES = [
  {
    key: "equipe",
    label: "Équipe",
    desc: "État d'esprit, couverture des fonctions clés, expertises techniques, leadership…",
  },
  {
    key: "marche",
    label: "Potentiel du marché",
    desc: "Problématique, intérêt des clients, taille du marché, time to market…",
  },
  {
    key: "offre",
    label: "Caractéristiques de l'offre",
    desc: "Pertinence de la solution, potentiel de différenciation, niveau d'innovation…",
  },
  {
    key: "financiers",
    label: "Éléments financiers",
    desc: "Potentiel de croissance du CA et de rentabilité à moyen terme…",
  },
  {
    key: "bm",
    label: "Business Model",
    desc: "Hypothèses économiques, stratégie marketing, facilité d'accès aux clients…",
  },
  {
    key: "strategie",
    label: "Stratégie du projet",
    desc: "Vision globale, pertinence du plan d'action à 3–6 mois, partenariats…",
  },
  {
    key: "esg",
    label: "Impact ESG",
    desc: "Utilité territoriale, sociale et environnementale, limites planétaires…",
  },
  {
    key: "presentation",
    label: "Qualité de la présentation",
    desc: "Originalité du discours, clarté, support, tenue vestimentaire…",
  },
];

// ── Composant étoiles
function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none cursor-pointer"
          aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
        >
          <Star
            className="h-8 w-8 transition-colors duration-150"
            fill={(hover || value) >= star ? "hsl(181 67% 54%)" : "none"}
            stroke={(hover || value) >= star ? "hsl(181 67% 54%)" : "hsl(224 14% 50%)"}
            strokeWidth={1.5}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm font-semibold self-center" style={{ color: "hsl(181 67% 54%)" }}>
          {value}/5
        </span>
      )}
    </div>
  );
}

type Phase = "code" | "register" | "form" | "loading" | "success";

type Notes = Record<string, number>;
type Comments = Record<string, { positif: string; amelio: string }>;

export default function NiteoEvaluation() {
  const [phase, setPhase]       = useState<Phase>("code");
  const [code, setCode]         = useState("");
  const [nom, setNom]           = useState("");
  const [prenom, setPrenom]     = useState("");
  const [email, setEmail]       = useState("");
  const [telephone, setTel]     = useState("");
  const [nomJure, setNomJure]   = useState("");
  const [projet, setProjet]     = useState("");
  const [notes, setNotes]       = useState<Notes>({});
  const [comments, setComments] = useState<Comments>({});
  const [general, setGeneral]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [projets, setProjets]   = useState<string[]>([]);

  useEffect(() => {
    supabase.functions.invoke("get-niteo-projects")
      .then(({ data }) => { if (data?.projets) setProjets(data.projets); });
  }, []);

  const totalNote = Object.values(notes).reduce((s, v) => s + v, 0);
  const allFilled = AXES.every((a) => (notes[a.key] ?? 0) > 0) && projet;

  // ── Étape 1 : vérification code + nom/prénom
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: fnErr } = await supabase.functions.invoke("verify-jury-code", {
      body: { code: code.trim().toUpperCase(), nom, prenom },
    });
    setLoading(false);
    if (fnErr || data?.error) {
      setError(data?.error ?? "Erreur serveur.");
      return;
    }
    if (data.found) {
      // Personne déjà dans la base → vote direct
      setNomJure(data.nomJure || `${prenom} ${nom}`.trim());
      setPhase("form");
    } else {
      // Code inconnu → demander email + téléphone
      setPhase("register");
    }
  };

  // ── Étape 2 : enregistrement (email + téléphone)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: fnErr } = await supabase.functions.invoke("verify-jury-code", {
      body: { code: code.trim().toUpperCase(), nom, prenom, email, telephone },
    });
    setLoading(false);
    if (fnErr || data?.error) {
      setError(data?.error ?? "Erreur lors de l'enregistrement.");
      return;
    }
    setNomJure(data.nomJure || `${prenom} ${nom}`.trim());
    setPhase("form");
  };

  // ── Étape 3 : soumission évaluation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFilled) { setError("Veuillez noter tous les axes et choisir un projet."); return; }
    setError("");
    setPhase("loading");
    const { error: fnErr } = await supabase.functions.invoke("submit-niteo-evaluation", {
      body: { code: code.trim().toUpperCase(), projet, notes, commentaires: { ...comments, general } },
    });
    if (fnErr) {
      setError(fnErr.message ?? "Erreur serveur.");
      setPhase("form");
      return;
    }
    setPhase("success");
  };

  const setNote = (key: string, val: number) =>
    setNotes((prev) => ({ ...prev, [key]: val }));

  const setComment = (key: string, field: "positif" | "amelio", val: string) =>
    setComments((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? { positif: "", amelio: "" }), [field]: val },
    }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NiteoHeader />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">

          {/* ── PHASE: CODE */}
          {phase === "code" && (
            <div className="bg-card border border-border rounded-sm p-8 shadow-sm">
              <div className="mn-eyebrow-turquoise mb-3">Demo Day · 16 juin 2026</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--mn-ink))" }}>
                Grille d'évaluation jury
              </h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Saisissez le code affiché durant l'événement.
              </p>
              <form onSubmit={handleCodeSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="code">Code événement</Label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                    className="text-center font-mono text-lg tracking-widest"
                  />
                </div>
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
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !code || !prenom || !nom}
                  style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Continuer
                </Button>
              </form>
            </div>
          )}

          {/* ── PHASE: REGISTER */}
          {phase === "register" && (
            <div className="bg-card border border-border rounded-sm p-8 shadow-sm">
              <div className="mn-eyebrow-turquoise mb-3">Demo Day · 16 juin 2026</div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--mn-ink))" }}>
                Quelques informations
              </h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Pour finaliser votre accès, renseignez votre email et votre numéro de téléphone.
              </p>
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tel">Téléphone *</Label>
                  <Input
                    id="tel"
                    type="tel"
                    value={telephone}
                    onChange={(e) => setTel(e.target.value)}
                    required
                    placeholder="+33 6 00 00 00 00"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !email || !telephone}
                  style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Accéder à la grille
                </Button>
              </form>
            </div>
          )}

          {/* ── PHASE: LOADING */}
          {phase === "loading" && (
            <div className="text-center py-24">
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" style={{ color: "hsl(var(--mn-turquoise))" }} />
              <p className="text-muted-foreground">Enregistrement en cours…</p>
            </div>
          )}

          {/* ── PHASE: SUCCESS */}
          {phase === "success" && (
            <div className="text-center py-16 bg-card border border-border rounded-sm p-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "hsl(var(--mn-turquoise) / 0.12)" }}
              >
                <CheckCircle2 className="h-10 w-10" style={{ color: "hsl(var(--mn-turquoise))" }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--mn-ink))" }}>
                Évaluation enregistrée !
              </h2>
              <p className="text-muted-foreground mb-6">
                Merci <strong>{nomJure}</strong>. Votre évaluation de <strong>« {projet} »</strong> a bien été transmise.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setProjet("");
                  setNotes({});
                  setComments({});
                  setGeneral("");
                  setError("");
                  setPhase("form");
                }}
              >
                Évaluer un autre projet
              </Button>
            </div>
          )}

          {/* ── PHASE: FORM */}
          {phase === "form" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* En-tête */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="mn-eyebrow-turquoise mb-1">Demo Day · 16 juin 2026</div>
                <h1 className="text-2xl font-bold mb-1" style={{ color: "hsl(var(--mn-ink))" }}>
                  Bonjour, {nomJure.split(" ")[0]} 👋
                </h1>
                <p className="text-sm text-muted-foreground">
                  Code : <span className="font-mono font-semibold">{code}</span>
                </p>
              </div>

              {/* Sélection projet */}
              <div className="bg-card border border-border rounded-sm p-6 space-y-3">
                <Label htmlFor="projet" className="text-base font-semibold">
                  Projet évalué *
                </Label>
                <select
                  id="projet"
                  value={projet}
                  onChange={(e) => setProjet(e.target.value)}
                  required
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Sélectionnez le projet…</option>
                  {projets.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Axes d'évaluation */}
              {AXES.map((axe) => (
                <div key={axe.key} className="bg-card border border-border rounded-sm p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-base" style={{ color: "hsl(var(--mn-ink))" }}>
                      {axe.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{axe.desc}</p>
                  </div>

                  <StarRating
                    value={notes[axe.key] ?? 0}
                    onChange={(v) => setNote(axe.key, v)}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-green-700">Points positifs</Label>
                      <Textarea
                        rows={3}
                        value={comments[axe.key]?.positif ?? ""}
                        onChange={(e) => setComment(axe.key, "positif", e.target.value)}
                        placeholder="Ce qui fonctionne bien…"
                        className="text-sm resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-orange-700">Points à améliorer</Label>
                      <Textarea
                        rows={3}
                        value={comments[axe.key]?.amelio ?? ""}
                        onChange={(e) => setComment(axe.key, "amelio", e.target.value)}
                        placeholder="Ce qui peut être amélioré…"
                        className="text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Remarques générales */}
              <div className="bg-card border border-border rounded-sm p-6 space-y-3">
                <Label className="text-base font-semibold">Remarques générales</Label>
                <Textarea
                  rows={4}
                  value={general}
                  onChange={(e) => setGeneral(e.target.value)}
                  placeholder="Observations globales sur le projet…"
                  className="text-sm resize-none"
                />
              </div>

              {/* Score total + Soumettre */}
              <div className="bg-card border border-border rounded-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Note totale ({Object.keys(notes).length}/{AXES.length} axes notés)
                  </span>
                  <span className="text-2xl font-bold font-editorial" style={{ color: "hsl(var(--mn-nuit))" }}>
                    {totalNote}<span className="text-base font-normal text-muted-foreground">/40</span>
                  </span>
                </div>
                {error && <p className="text-sm text-destructive mb-3">{error}</p>}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!allFilled}
                  style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}
                >
                  Soumettre mon évaluation
                </Button>
                {!allFilled && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Notez tous les axes et choisissez un projet pour soumettre.
                  </p>
                )}
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
}
