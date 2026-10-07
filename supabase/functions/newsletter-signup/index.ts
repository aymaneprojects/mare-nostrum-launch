import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID  = "appZ8ykNuUOv89ou0";
const TABLE_ID = "tblocqquF4OXgXveO";
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_ID)}`;

// Automatisation n8n « ITER — Newsletter inscription site web » : envoie les 12
// e-mails ITER. Appelée APRÈS l'enregistrement Airtable ; si n8n est en panne,
// l'inscription reste valide et le prospect est quand même dans Airtable.
const N8N_ITER_WEBHOOK =
  Deno.env.get("N8N_ITER_WEBHOOK") ?? "https://n8n.srv1174483.hstgr.cloud/webhook/iter-newsletter";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { nom, email, projet, telephone, rgpd } = await req.json();

    if (!nom || !email) {
      return new Response(JSON.stringify({ error: "nom et email requis" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const mail = String(email).trim().toLowerCase();
    const auth = { Authorization: `Bearer ${AIRTABLE_API_KEY}`, "Content-Type": "application/json" };

    // Déjà inscrit à ITER : on ne recrée rien et on ne relance pas la séquence
    // (sinon la personne recevrait les 12 e-mails en double). Un ancien désinscrit
    // qui se réinscrit est remis en lead froid, et la séquence repart.
    const formule = encodeURIComponent(`AND(LOWER({Mail})="${mail.replace(/[\\"]/g, "")}",{Input CTA Site web}="ITER")`);
    const dejaRes = await fetch(`${AIRTABLE_URL}?maxRecords=1&filterByFormula=${formule}`, { headers: auth });
    const deja = dejaRes.ok ? (await dejaRes.json()).records?.[0] : undefined;

    if (deja && deja.fields?.["Lead Type"] !== "Unsubscribed") {
      return new Response(JSON.stringify({ success: true, deja: true }), {
        status: 200, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const res = deja
      ? await fetch(`${AIRTABLE_URL}/${deja.id}`, {
          method: "PATCH", headers: auth,
          body: JSON.stringify({ typecast: true, fields: { "Lead Type": "Lead Froid", "confidentialité": rgpd === true } }),
        })
      : await fetch(AIRTABLE_URL, {
          method: "POST", headers: auth,
          body: JSON.stringify({
            typecast: true,
            fields: {
              "Prénom / Nom":        nom,
              "Mail":                email,
              "Structure":           projet ? [projet] : [],
              "Téléphone":           telephone ?? "",
              "confidentialité":     rgpd === true,
              "Expérience":          "Inscription newsletter",
              "Input CTA Site web":  "ITER",
              "Lead Type":           "Lead Froid",
            },
          }),
        });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }

    // Lancement de la séquence ITER. Le consentement RGPD est obligatoire côté site.
    let sequence: "lancee" | "echec" | "non_demandee" = "non_demandee";
    if (rgpd === true) {
      sequence = "echec";
      try {
        const n8n = await fetch(N8N_ITER_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nom, email: mail, projet: projet ?? "" }),
          signal: AbortSignal.timeout(8000),
        });
        if (n8n.ok) sequence = "lancee";
        else console.error("n8n ITER :", n8n.status, await n8n.text());
      } catch (e) {
        console.error("n8n ITER injoignable (non bloquant) :", e);
      }
    }

    return new Response(JSON.stringify({ success: true, sequence }), {
      status: 200, headers: { "Content-Type": "application/json", ...cors },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { "Content-Type": "application/json", ...cors },
    });
  }
});
