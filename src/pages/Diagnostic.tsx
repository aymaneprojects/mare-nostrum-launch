import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// ─── design tokens ────────────────────────────────────────────
const MN = {
  nuit:      "#24335D",
  turquoise: "#3BD9DB",
  ivory:     "hsl(40,38%,94%)",
  muted:     "#6C7591",
  ink:       "#0F1733",
  line:      "rgba(36,51,93,0.14)",
};

// ─── axes ─────────────────────────────────────────────────────
const AXES = [
  { key: "equipe",        label: "Équipe",                      desc: "État d'esprit, couverture des fonctions clés, expertises techniques, leadership et qualités d'échange…" },
  { key: "marche",        label: "Potentiel du marché",         desc: "Problématique, intérêt des clients pour l'offre, taille du marché, time to market…" },
  { key: "offre",         label: "Caractéristiques de l'offre", desc: "Pertinence de la solution, potentiel de différenciation de l'offre, niveau d'innovation…" },
  { key: "financier",     label: "Éléments financiers",         desc: "Potentiel de croissance du chiffre d'affaires et de rentabilité à moyen terme…" },
  { key: "bm",            label: "Business model",              desc: "Hypothèses de modèle économique, qualité de la stratégie marketing, facilité d'accès aux clients…" },
  { key: "strategie",     label: "Stratégie du projet",         desc: "Vision globale, pertinence du plan d'action à 3–6 mois, partenariats existants ou potentiels…" },
  { key: "esg",           label: "Impact ESG",                  desc: "Utilité territoriale, sociale et environnementale, prise en compte des limites planétaires…" },
  { key: "presentation",  label: "Qualité de la présentation",  desc: "Originalité du discours, volume de la voix, langage adapté, tenue vestimentaire, support…" },
];

const SCORE_LABELS = ["", "Insuffisant", "Faible", "Moyen", "Bon", "Excellent"];
const NOTE_OPTIONS  = [0, 5, 10, 15, 20];
const TOTAL_STEPS   = 10; // 0=identity, 1–8=axes, 9=remarks

const clubReco = (score: number) => {
  if (score <= 20) return {
    tier: "Communauté", price: "30 €/mois", href: "/club#offres",
    desc: "Votre projet est en phase d'idéation. Le Club Communauté vous apporte le réseau, les ressources et les bases solides pour avancer.",
  };
  if (score <= 30) return {
    tier: "Groupe", price: "90 €/mois", href: "/club#offres",
    desc: "Votre projet est en phase de structuration. Le Club Groupe vous aide à affiner votre offre, structurer votre croissance et valider votre marché.",
  };
  return {
    tier: "Individuel", price: "190 €/mois", href: "/club#offres",
    desc: "Votre projet est prêt à accélérer. Le Club Individuel vous offre un accompagnement stratégique personnalisé sur l'IA, les financements et le développement.",
  };
};

// ─── wave progress ────────────────────────────────────────────
function WaveProgress({ step }: { step: number }) {
  const pct = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div style={{ height: 4, width: "100%", background: "rgba(36,51,93,0.1)", borderRadius: 999, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${pct}%`,
        background: `linear-gradient(90deg, ${MN.nuit} 0%, ${MN.turquoise} 100%)`,
        borderRadius: 999, transition: "width 0.4s cubic-bezier(.7,0,.2,1)",
      }} />
    </div>
  );
}

// ─── underline input ──────────────────────────────────────────
function UnderlineField({ label, value, onChange, placeholder, type = "text", autoFocus = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; autoFocus?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: 11, letterSpacing: 1.8, textTransform: "uppercase" as const, color: MN.muted, fontWeight: 600, marginBottom: 8 }}>
        {label}
      </div>
      <input
        type={type} value={value} autoFocus={autoFocus}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%", border: "none", outline: "none", padding: "8px 0 10px",
          borderBottom: `1.5px solid ${focus ? MN.turquoise : MN.line}`,
          fontSize: 18, color: MN.ink, background: "transparent",
          fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
          transition: "border-color 0.2s", boxSizing: "border-box" as const,
        }}
      />
    </label>
  );
}

// ─── main ─────────────────────────────────────────────────────
const Diagnostic = () => {
  const [step, setStep]           = useState(0);
  const [done, setDone]           = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errMsg, setErrMsg]       = useState("");

  const [nom, setNom]       = useState("");
  const [email, setEmail]   = useState("");
  const [projet, setProjet] = useState("");

  const [scores,   setScores]   = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [remarques,    setRemarques]    = useState("");
  const [noteGlobale,  setNoteGlobale]  = useState<number | null>(null);

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
  };

  const reco = clubReco(totalScore);
  const axis = step >= 1 && step <= 8 ? AXES[step - 1] : null;

  return (
    <div style={{
      minHeight: "100vh", background: MN.ivory,
      fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem 1rem",
    }}>
      <div style={{ width: "100%", maxWidth: 540 }}>

        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <img src="/logo.jpg" alt="Mare Nostrum" style={{ width: 36, height: 36, objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: MN.nuit }}>Mare Nostrum</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: MN.turquoise, marginTop: 2 }}>— Diagnostic Projet</div>
          </div>
        </div>

        {done ? (
          /* ── success ── */
          <div style={{ background: "#fff", boxShadow: "0 18px 40px -22px rgba(36,51,93,0.22)", padding: "40px 32px" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(59,217,219,0.12)", border: `1.5px solid ${MN.turquoise}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={MN.nuit} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 600, color: MN.ink, textAlign: "center", margin: "0 0 8px", letterSpacing: "-0.4px" }}>
              Diagnostic terminé.
            </h2>
            <p style={{ fontSize: 14, color: MN.muted, textAlign: "center", margin: "0 0 32px", lineHeight: 1.6 }}>
              Vos résultats ont été envoyés à votre adresse email.
            </p>

            {/* scores */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Score projet", value: totalScore, max: 40 },
                { label: "Note globale", value: noteGlobale ?? 0, max: 20 },
              ].map(({ label, value, max }) => (
                <div key={label} style={{ padding: "20px", background: MN.ivory, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 600, color: MN.nuit, lineHeight: 1 }}>
                    {value}<span style={{ fontSize: 16, color: MN.muted, fontWeight: 400 }}>/{max}</span>
                  </div>
                  <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: MN.muted, fontWeight: 600, marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* reco */}
            <div style={{ border: `1.5px solid ${MN.nuit}`, padding: "24px", marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: MN.turquoise, fontWeight: 700, marginBottom: 6 }}>Recommandation</div>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, fontWeight: 600, color: MN.nuit, marginBottom: 8 }}>
                Club {reco.tier} · {reco.price}
              </div>
              <p style={{ fontSize: 13, color: MN.muted, lineHeight: 1.6, margin: "0 0 16px" }}>{reco.desc}</p>
              <Link to={reco.href} style={{
                display: "block", textAlign: "center", padding: "14px",
                background: MN.nuit, color: "#fff",
                fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, textDecoration: "none",
              }}>
                Rejoindre le Club {reco.tier} →
              </Link>
            </div>

            <Link to="/" style={{ display: "block", textAlign: "center", padding: "13px", border: `1px solid ${MN.line}`, color: MN.muted, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600, textDecoration: "none" }}>
              Retour sur le site
            </Link>
          </div>

        ) : (
          /* ── form ── */
          <div style={{ background: "#fff", boxShadow: "0 18px 40px -22px rgba(36,51,93,0.22)" }}>

            {/* header bar */}
            <div style={{ padding: "24px 32px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: MN.muted, fontVariantNumeric: "tabular-nums" }}>
                  Étape {String(step + 1).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
                </div>
                {step >= 1 && step <= 8 && (
                  <div style={{ fontSize: 11, fontWeight: 600, color: MN.turquoise }}>
                    {totalScore} / {(step) * 5} pts
                  </div>
                )}
              </div>
              <WaveProgress step={step} />
            </div>

            {/* step content */}
            <div style={{ padding: "32px 32px 24px" }}>

              {/* step 0 — identity */}
              {step === 0 && (
                <>
                  <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: MN.turquoise, fontWeight: 700, marginBottom: 8 }}>Votre profil</div>
                  <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 600, color: MN.ink, margin: "0 0 8px", letterSpacing: "-0.5px", lineHeight: 1.15 }}>
                    Faisons connaissance.
                  </h2>
                  <p style={{ fontSize: 14, color: MN.muted, lineHeight: 1.65, margin: "0 0 28px" }}>
                    Ce diagnostic évalue 8 axes clés de votre projet en 10 minutes. Les résultats vous sont envoyés par email avec une recommandation d'accompagnement personnalisée.
                  </p>
                  <div style={{ display: "grid", gap: 24 }}>
                    <UnderlineField label="Prénom et nom" value={nom} onChange={setNom} placeholder="Marie Dupont" autoFocus />
                    <UnderlineField label="Adresse email" value={email} onChange={setEmail} placeholder="marie@startup.com" type="email" />
                    <UnderlineField label="Nom du projet" value={projet} onChange={setProjet} placeholder="Ma startup / Mon entreprise" />
                  </div>
                </>
              )}

              {/* steps 1–8 — axes */}
              {axis && (
                <>
                  <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: MN.turquoise, fontWeight: 700, marginBottom: 8 }}>
                    Axe {String(step).padStart(2, "0")} / 08
                  </div>
                  <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 600, color: MN.ink, margin: "0 0 8px", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                    {axis.label}
                  </h2>
                  <p style={{ fontSize: 13, color: MN.muted, lineHeight: 1.65, margin: "0 0 28px" }}>{axis.desc}</p>

                  {/* rating */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: MN.muted, fontWeight: 600, marginBottom: 12 }}>Note</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[1, 2, 3, 4, 5].map(v => {
                        const active = scores[axis.key] === v;
                        return (
                          <button key={v} onClick={() => setScore(axis.key, v)} style={{
                            flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                            padding: "12px 6px", gap: 5,
                            border: `1.5px solid ${active ? MN.nuit : MN.line}`,
                            background: active ? MN.nuit : "transparent",
                            color: active ? "#fff" : MN.ink,
                            cursor: "pointer", transition: "all 0.18s",
                          }}>
                            <span style={{ fontSize: 20, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, lineHeight: 1 }}>{v}</span>
                            <span style={{ fontSize: 9, letterSpacing: 0.3, textTransform: "uppercase", fontWeight: 600, color: active ? "rgba(255,255,255,0.7)" : MN.muted, textAlign: "center", lineHeight: 1.2 }}>
                              {SCORE_LABELS[v]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* comment */}
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: MN.muted, fontWeight: 600, marginBottom: 8 }}>Commentaire (optionnel)</div>
                    <textarea
                      value={comments[axis.key] ?? ""}
                      onChange={e => setComment(axis.key, e.target.value)}
                      placeholder="Précisez votre évaluation…"
                      rows={3}
                      style={{
                        width: "100%", border: "none", borderBottom: `1.5px solid ${MN.line}`,
                        outline: "none", resize: "none", padding: "8px 0",
                        fontSize: 14, color: MN.ink, background: "transparent",
                        fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
                        lineHeight: 1.6, boxSizing: "border-box",
                      }}
                      onFocus={e => { e.target.style.borderBottomColor = MN.turquoise; }}
                      onBlur={e => { e.target.style.borderBottomColor = MN.line; }}
                    />
                  </div>
                </>
              )}

              {/* step 9 — remarks */}
              {step === 9 && (
                <>
                  <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: MN.turquoise, fontWeight: 700, marginBottom: 8 }}>Synthèse</div>
                  <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 26, fontWeight: 600, color: MN.ink, margin: "0 0 8px", letterSpacing: "-0.5px" }}>
                    Remarques générales.
                  </h2>
                  <p style={{ fontSize: 13, color: MN.muted, lineHeight: 1.65, margin: "0 0 28px" }}>
                    Une appréciation globale et une note synthétique pour finaliser votre diagnostic.
                  </p>

                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: MN.muted, fontWeight: 600, marginBottom: 8 }}>Remarques libres</div>
                    <textarea
                      value={remarques}
                      onChange={e => setRemarques(e.target.value)}
                      placeholder="Points forts, axes d'amélioration, contexte particulier…"
                      rows={4}
                      style={{
                        width: "100%", border: "none", borderBottom: `1.5px solid ${MN.line}`,
                        outline: "none", resize: "none", padding: "8px 0",
                        fontSize: 14, color: MN.ink, background: "transparent",
                        fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
                        lineHeight: 1.6, boxSizing: "border-box",
                      }}
                      onFocus={e => { e.target.style.borderBottomColor = MN.turquoise; }}
                      onBlur={e => { e.target.style.borderBottomColor = MN.line; }}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: MN.muted, fontWeight: 600, marginBottom: 12 }}>Note globale / 20</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {NOTE_OPTIONS.map(v => {
                        const active = noteGlobale === v;
                        return (
                          <button key={v} onClick={() => setNoteGlobale(v)} style={{
                            flex: 1, padding: "14px 6px",
                            border: `1.5px solid ${active ? MN.nuit : MN.line}`,
                            background: active ? MN.nuit : "transparent",
                            color: active ? "#fff" : MN.ink,
                            fontSize: 18, fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600,
                            cursor: "pointer", transition: "all 0.18s",
                          }}>
                            {v}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {errMsg && (
              <div style={{ margin: "0 32px 16px", padding: "12px 14px", background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", fontSize: 14 }}>
                {errMsg}
              </div>
            )}

            {/* nav */}
            <div style={{ display: "flex", gap: 10, padding: "0 32px 32px" }}>
              {step > 0 && (
                <button onClick={() => go(-1)} style={{
                  flexShrink: 0, padding: "14px 20px", background: "transparent",
                  border: `1px solid ${MN.line}`, color: MN.ink,
                  fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600, cursor: "pointer",
                }}>←</button>
              )}
              <button
                onClick={() => go(1)}
                disabled={!canNext() || submitting}
                style={{
                  flex: 1, padding: "16px",
                  background: canNext() ? MN.nuit : "rgba(36,51,93,0.12)",
                  border: "none",
                  color: canNext() ? "#fff" : MN.muted,
                  fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700,
                  cursor: canNext() ? "pointer" : "not-allowed",
                  transition: "background 0.2s",
                }}
              >
                {submitting ? "Envoi en cours…" : step === 9 ? "Voir mes résultats →" : step === 0 ? "Commencer →" : "Suivant →"}
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: "rgba(108,117,145,0.55)" }}>
          Mare Nostrum · Diagnostic confidentiel ·{" "}
          <Link to="/" style={{ color: MN.muted, textDecoration: "underline" }}>Retour au site</Link>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;
