import { Link } from "react-router-dom";

const Unsubscribed = () => (
  <div style={{ minHeight: "100vh", background: "#EEF2F7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "'DM Sans', Helvetica, Arial, sans-serif" }}>

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
          Tu t'es désabonné(e) d'ITER.
        </div>

        <p style={{ fontSize: 15, color: "#6C7591", lineHeight: 1.7, margin: "0 0 10px" }}>
          C'est noté. Tu ne recevras plus nos emails.
        </p>

        <p style={{ fontSize: 15, color: "#6C7591", lineHeight: 1.7, margin: "0 0 36px" }}>
          Si c'était une erreur, ou si l'envie revient —<br />
          la porte est toujours ouverte.
        </p>

        {/* proof strip */}
        <div style={{ background: "#EAF2FB", border: "1px solid #BFD4EE", padding: "20px 24px", marginBottom: 32 }}>
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
  </div>
);

export default Unsubscribed;
