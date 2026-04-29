import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Unsubscribed = () => {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "notfound">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const { error, data } = await supabase.functions.invoke("newsletter-unsubscribe", {
        body: { email: email.trim() },
      });

      if (error) throw error;
      if ((data as any)?.error === "email introuvable") {
        setStatus("notfound");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "hsl(40, 38%, 94%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "'DM Sans', Helvetica, Arial, sans-serif" }}>

      <div style={{ width: "100%", maxWidth: 520, boxShadow: "0 18px 40px -22px rgba(36,51,93,0.28)", overflow: "hidden" }}>

        {/* ── Header ── */}
        <div style={{ background: "linear-gradient(135deg, #24335D 0%, #0F1733 100%)", padding: "36px 40px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, rgba(191,212,238,0.055) 22px 23px)" }} />
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14 }}>
            <img src="/logo.jpg" alt="Mare Nostrum" style={{ width: 40, height: 40, objectFit: "contain", background: "white", padding: 2 }} />
            <div>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, fontSize: 28, letterSpacing: "-0.4px", color: "#FFFFFF", lineHeight: 1 }}>ITER</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "2.2px", textTransform: "uppercase", color: "#BFD4EE", marginTop: 5 }}>par Mare Nostrum</div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ background: "#FFFFFF", padding: "44px 40px 40px", textAlign: "center" }}>

          {/* icon */}
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#EAF2FB", border: "1.5px solid #BFD4EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#24335D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </div>

          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, fontSize: 26, color: "#24335D", letterSpacing: "-0.4px", lineHeight: 1.2, marginBottom: 16 }}>
            Se désabonner d'ITER
          </div>

          <p style={{ fontSize: 15, color: "#6C7591", lineHeight: 1.7, margin: "0 0 32px" }}>
            Saisis ton adresse email pour confirmer ton désabonnement.
          </p>

          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "8px 0 8px" }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, fontSize: 20, color: "#24335D", marginBottom: 10 }}>
                C'est noté.
              </div>
              <p style={{ fontSize: 15, color: "#6C7591", lineHeight: 1.7, margin: "0 0 28px" }}>
                Tu ne recevras plus nos emails. Si l'envie revient — la porte est toujours ouverte.
              </p>

              {/* proof strip */}
              <div style={{ background: "#EAF2FB", border: "1px solid #BFD4EE", padding: "20px 24px", marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.6px", textTransform: "uppercase", color: "#24335D", marginBottom: 12 }}>
                  Ce que tu rates
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", gap: 8 }}>
                  {[["12", "étapes actionnables"], ["70+", "entrepreneurs actifs"], ["100%", "gratuit"]].map(([num, label]) => (
                    <div key={label} style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600, fontSize: 22, color: "#24335D", lineHeight: 1 }}>{num}</div>
                      <div style={{ fontSize: 11, color: "#6C7591", marginTop: 4, lineHeight: 1.4 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/newsletter"
                style={{ display: "block", padding: "16px", background: "#24335D", color: "#FFFFFF", fontWeight: 700, fontSize: 14, letterSpacing: "0.4px", textDecoration: "none", marginBottom: 14 }}
              >
                Me réinscrire à ITER →
              </Link>

              <Link
                to="/"
                style={{ display: "block", padding: "14px", border: "1.5px solid #E3E8F1", color: "#6C7591", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
              >
                Retour sur le site
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ textAlign: "left" }}>
              <div style={{ marginBottom: 20 }}>
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

              {status === "notfound" && (
                <div style={{ padding: "12px 14px", background: "#FEF3CD", border: "1px solid #F0C040", color: "#7A5C00", fontSize: 14, marginBottom: 16 }}>
                  Aucun compte trouvé pour cette adresse email.
                </div>
              )}

              {status === "error" && (
                <div style={{ padding: "12px 14px", background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", fontSize: 14, marginBottom: 16 }}>
                  Une erreur est survenue. Réessaie dans quelques instants.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{ width: "100%", padding: "16px", background: "#24335D", color: "#FFFFFF", fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.4px", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}
              >
                {status === "loading" ? (
                  <>
                    <svg style={{ animation: "spin 0.6s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>
                    Traitement en cours…
                  </>
                ) : "Confirmer le désabonnement"}
              </button>

              <Link
                to="/"
                style={{ display: "block", padding: "14px", border: "1.5px solid #E3E8F1", color: "#6C7591", fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center" }}
              >
                Retour sur le site
              </Link>
            </form>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{ background: "#24335D", padding: "20px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#8FA6CC", lineHeight: 1.7 }}>
            Mare Nostrum · Toulouse · Paris · Casablanca
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 11, color: "#8B97AE" }}>
        © Mare Nostrum 2026 · ITER, la lettre hebdomadaire
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Unsubscribed;
