import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [nom, setNom]       = useState("");
  const [email, setEmail]   = useState("");
  const [projet, setProjet] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const { error } = await supabase.functions.invoke("newsletter-signup", {
        body: { nom: nom.trim(), email: email.trim(), projet: projet.trim() },
      });
      if (error) throw error;
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue. Réessaie dans quelques instants.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(40, 38%, 94%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "'DM Sans', Helvetica, Arial, sans-serif" }}>

      <div style={{ width: "100%", maxWidth: 520, borderRadius: 0, overflow: "hidden", boxShadow: "0 18px 40px -22px rgba(36,51,93,0.28)" }}>

        {/* ── Header ITER ── */}
        <div style={{ background: "linear-gradient(135deg, #24335D 0%, #0F1733 100%)", padding: "40px 40px 36px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, rgba(191,212,238,0.055) 22px 23px)" }} />

          {/* eyebrow */}
          <div style={{ position: "relative", fontSize: 10, fontWeight: 700, letterSpacing: "2.4px", textTransform: "uppercase", color: "#BFD4EE", marginBottom: 20 }}>
            ITER · La lettre Mare Nostrum
          </div>

          {/* logo lockup */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <img src="/logo.jpg" alt="Mare Nostrum" style={{ width: 44, height: 44, objectFit: "contain", background: "white", padding: 2 }} />
            <div>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, fontSize: 32, letterSpacing: "-0.4px", color: "#FFFFFF", lineHeight: 1 }}>ITER</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "2.2px", textTransform: "uppercase", color: "#BFD4EE", marginTop: 6 }}>par Mare Nostrum</div>
            </div>
          </div>

          <div style={{ position: "relative", borderTop: "1px solid rgba(191,212,238,0.22)", marginBottom: 28 }} />

          {/* quote */}
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.6px", textTransform: "uppercase", color: "#BFD4EE", marginBottom: 14 }}>
              Phrase d'inspiration
            </div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: "italic", fontSize: 22, lineHeight: 1.35, color: "#FFFFFF", letterSpacing: "-0.2px" }}>
              «&nbsp;Le meilleur moment pour planter un arbre était il y a vingt ans. Le deuxième meilleur moment, c'est maintenant.&nbsp;»
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#8FA6CC", marginTop: 14 }}>
              — Proverbe chinois
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ background: "#FFFFFF", padding: "36px 40px 40px" }}>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "1rem 0 0.5rem" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(191,212,238,0.2)", border: "1.5px solid #BFD4EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#24335D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, fontSize: 22, color: "#24335D", marginBottom: 10, letterSpacing: "-0.3px" }}>
                Bienvenue dans l'aventure !
              </div>
              <p style={{ fontSize: 15, color: "#6C7591", lineHeight: 1.65, margin: "0 0 24px" }}>
                Tu es bien inscrit(e) à <strong style={{ color: "#24335D" }}>ITER</strong>. La prochaine étape arrive dans ta boîte mail.
              </p>
              <Link to="/" style={{ display: "inline-block", padding: "14px 28px", background: "#24335D", color: "#FFFFFF", fontWeight: 700, fontSize: 14, letterSpacing: "0.3px", textDecoration: "none" }}>
                Découvrir Mare Nostrum →
              </Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: "inline-block", width: 24, height: 2, background: "#24335D", verticalAlign: "middle", marginRight: 10 }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.6px", textTransform: "uppercase", color: "#24335D" }}>Inscription</span>
              </div>

              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, fontSize: 24, color: "#24335D", letterSpacing: "-0.3px", margin: "14px 0 8px", lineHeight: 1.25 }}>
                12 étapes pour faire décoller ton projet.
              </div>
              <p style={{ fontSize: 15, color: "#6C7591", lineHeight: 1.65, margin: "0 0 28px" }}>
                ITER est une séquence email de 12 semaines — ressources, outils et défis concrets pour les entrepreneurs de la francophonie.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#24335D", marginBottom: 6, letterSpacing: "0.3px" }}>
                    Nom et prénom *
                  </label>
                  <input
                    type="text"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    placeholder="Marie Dupont"
                    required
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E3E8F1", borderRadius: 0, fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontSize: 15, color: "#0F1733", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => { e.target.style.borderColor = "#24335D"; e.target.style.boxShadow = "0 0 0 3px rgba(36,51,93,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#E3E8F1"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#24335D", marginBottom: 6, letterSpacing: "0.3px" }}>
                    Adresse email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="marie@example.com"
                    required
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E3E8F1", borderRadius: 0, fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontSize: 15, color: "#0F1733", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => { e.target.style.borderColor = "#24335D"; e.target.style.boxShadow = "0 0 0 3px rgba(36,51,93,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#E3E8F1"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#24335D", marginBottom: 6, letterSpacing: "0.3px" }}>
                    Nom de ton projet
                  </label>
                  <input
                    type="text"
                    value={projet}
                    onChange={e => setProjet(e.target.value)}
                    placeholder="Mon projet / Ma startup"
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E3E8F1", borderRadius: 0, fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontSize: 15, color: "#0F1733", outline: "none", boxSizing: "border-box" }}
                    onFocus={e => { e.target.style.borderColor = "#24335D"; e.target.style.boxShadow = "0 0 0 3px rgba(36,51,93,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#E3E8F1"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {errorMsg && (
                  <div style={{ padding: "12px 14px", background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", fontSize: 14, marginBottom: 16 }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{ width: "100%", padding: "16px", background: "#24335D", color: "#FFFFFF", fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.4px", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                >
                  {status === "loading" ? (
                    <>
                      <svg style={{ animation: "spin 0.6s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                      Inscription en cours…
                    </>
                  ) : "Rejoindre ITER · 12 étapes gratuites →"}
                </button>
              </form>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ background: "#24335D", padding: "24px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#8FA6CC", lineHeight: 1.7 }}>
            Mare Nostrum · Toulouse · Paris · Casablanca<br />
            <Link to="/confidentialite" style={{ color: "#6F84AA", fontSize: 10, letterSpacing: "0.4px", textDecoration: "underline" }}>
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: "#8B97AE", textAlign: "center" }}>
        © Mare Nostrum 2026 · ITER, la lettre hebdomadaire
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Newsletter;
