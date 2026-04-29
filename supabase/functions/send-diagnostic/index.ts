import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY  = Deno.env.get("RESEND_API_KEY");
const AIRTABLE_KEY    = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID         = "appZ8ykNuUOv89ou0";
const TABLE_ID        = "tblocqquF4OXgXveO";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AXES = [
  { key: "equipe",       label: "Équipe" },
  { key: "marche",       label: "Potentiel du marché" },
  { key: "offre",        label: "Caractéristiques de l'offre" },
  { key: "financier",    label: "Éléments financiers" },
  { key: "bm",           label: "Business model" },
  { key: "strategie",    label: "Stratégie du projet" },
  { key: "esg",          label: "Impact ESG" },
  { key: "presentation", label: "Qualité de la présentation" },
];

const SCORE_LABELS = ["", "Insuffisant", "Faible", "Moyen", "Bon", "Excellent"];

function clubReco(score: number) {
  if (score <= 20) return { tier: "Communauté", price: "30 €/mois", desc: "Votre projet est en phase d'idéation. Le Club Communauté vous apporte le réseau, les ressources et les bases solides pour avancer." };
  if (score <= 30) return { tier: "Groupe",     price: "90 €/mois", desc: "Votre projet est en phase de structuration. Le Club Groupe vous aide à affiner votre offre et valider votre marché." };
  return             { tier: "Individuel",  price: "190 €/mois", desc: "Votre projet est prêt à accélérer. Le Club Individuel vous offre un accompagnement stratégique personnalisé." };
}

function buildResume(scores: Record<string, number>, comments: Record<string, string>, totalScore: number, noteGlobale: number): string {
  const lines = AXES.map(a => {
    const s = scores[a.key] ?? 0;
    const c = comments[a.key] ? ` — ${comments[a.key]}` : "";
    return `${a.label} : ${s}/5 (${SCORE_LABELS[s] || "—"})${c}`;
  });
  lines.push(`\nScore total : ${totalScore}/40`);
  lines.push(`Note globale : ${noteGlobale}/20`);
  return lines.join("\n");
}

function buildEmailHtml(nom: string, projet: string, scores: Record<string, number>, comments: Record<string, string>, totalScore: number, noteGlobale: number, remarques: string): string {
  const reco = clubReco(totalScore);

  const rows = AXES.map(a => {
    const s = scores[a.key] ?? 0;
    const barWidth = (s / 5) * 100;
    return `
      <tr>
        <td style="padding:12px 16px; border-bottom:1px solid #EEF0F4; font-size:13px; color:#24335D; font-weight:600; width:60%">${a.label}</td>
        <td style="padding:12px 16px; border-bottom:1px solid #EEF0F4; width:40%">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="flex:1;height:6px;background:#EEF0F4;border-radius:999px;overflow:hidden">
              <div style="height:100%;width:${barWidth}%;background:#3BD9DB;border-radius:999px"></div>
            </div>
            <span style="font-size:13px;font-weight:700;color:#24335D;min-width:28px">${s}/5</span>
          </div>
        </td>
      </tr>`;
  }).join("");

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#EEF2F7;font-family:'DM Sans',Helvetica,Arial,sans-serif;color:#0F1733">
  <div style="max-width:620px;margin:40px auto;background:#fff;box-shadow:0 4px 24px rgba(36,51,93,0.1)">

    <!-- header -->
    <div style="background:linear-gradient(135deg,#24335D 0%,#0F1733 100%);padding:36px 40px 32px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background-image:repeating-linear-gradient(135deg,transparent 0 22px,rgba(191,212,238,0.05) 22px 23px)"></div>
      <div style="position:relative;font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:#BFD4EE;margin-bottom:12px">
        Mare Nostrum · Diagnostic Projet
      </div>
      <div style="position:relative;font-size:26px;font-weight:600;color:#fff;letter-spacing:-0.4px;line-height:1.2">
        Votre diagnostic, ${nom}.
      </div>
      <div style="position:relative;font-size:14px;color:rgba(191,212,238,0.8);margin-top:8px">
        Projet : <strong style="color:#fff">${projet}</strong>
      </div>
    </div>

    <!-- scores -->
    <div style="padding:32px 40px 0">
      <div style="display:flex;gap:16px;margin-bottom:32px">
        <div style="flex:1;background:#F8F9FB;padding:20px;text-align:center">
          <div style="font-size:36px;font-weight:700;color:#24335D;line-height:1">${totalScore}<span style="font-size:16px;color:#6C7591;font-weight:400">/40</span></div>
          <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#6C7591;font-weight:600;margin-top:6px">Score projet</div>
        </div>
        <div style="flex:1;background:#F8F9FB;padding:20px;text-align:center">
          <div style="font-size:36px;font-weight:700;color:#24335D;line-height:1">${noteGlobale}<span style="font-size:16px;color:#6C7591;font-weight:400">/20</span></div>
          <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#6C7591;font-weight:600;margin-top:6px">Note globale</div>
        </div>
      </div>

      <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#24335D;font-weight:700;margin-bottom:16px">Détail par axe</div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #EEF0F4;margin-bottom:28px">
        <thead>
          <tr style="background:#F8F9FB">
            <th style="padding:10px 16px;text-align:left;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#6C7591;font-weight:700">Axe</th>
            <th style="padding:10px 16px;text-align:left;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#6C7591;font-weight:700">Note</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>


      <!-- recommendation -->
      <div style="border:1.5px solid #24335D;padding:24px;margin-bottom:32px">
        <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#3BD9DB;font-weight:700;margin-bottom:6px">Recommandation Mare Nostrum</div>
        <div style="font-size:20px;font-weight:700;color:#24335D;margin-bottom:8px">Club ${reco.tier} · ${reco.price}</div>
        <p style="font-size:13px;color:#6C7591;line-height:1.6;margin:0 0 16px">${reco.desc}</p>
        <a href="https://marenostrum.tech/club#offres" style="display:block;text-align:center;padding:14px;background:#24335D;color:#fff;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;text-decoration:none">
          Rejoindre le Club ${reco.tier} →
        </a>
      </div>
    </div>

    <!-- footer -->
    <div style="background:#24335D;padding:24px 40px;text-align:center">
      <div style="font-size:11px;color:rgba(191,212,238,0.7);line-height:1.7">
        Mare Nostrum · Toulouse · Paris · Casablanca<br>
        <a href="mailto:contact@marenostrum.tech" style="color:rgba(191,212,238,0.55);font-size:10px;letter-spacing:0.4px">contact@marenostrum.tech</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { nom, email, projet, scores, comments, remarques, noteGlobale, totalScore } = await req.json();

    if (!nom || !email) {
      return new Response(JSON.stringify({ error: "nom et email requis" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const reco   = clubReco(totalScore);
    const resume = buildResume(scores, comments, totalScore, noteGlobale);

    // ── save to Airtable ──
    await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${AIRTABLE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          "Prénom / Nom":     nom,
          "Mail":             email,
          "Structure 2":      projet,
          "Score":            totalScore,
          "Résumé":           resume,
          "Commentaires libres": remarques || "",
          "Input CTA Site web": "Diagnostic",
          "Lead Type":        "Lead Chaud",
          "Je souhaite être recontacté(e) pour échanger sur mon projet": true,
        },
      }),
    });

    // ── send email to user ──
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to: [email],
        subject: `Votre diagnostic projet — Club ${reco.tier} recommandé`,
        html: buildEmailHtml(nom, projet, scores, comments, totalScore, noteGlobale, remarques),
      }),
    });

    // ── notify aymane ──
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to: ["aymane@marenostrum.tech"],
        subject: `Nouveau diagnostic : ${nom} — ${projet} (${totalScore}/40)`,
        html: buildEmailHtml(nom, projet, scores, comments, totalScore, noteGlobale, remarques),
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json", ...cors },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { "Content-Type": "application/json", ...cors },
    });
  }
});
