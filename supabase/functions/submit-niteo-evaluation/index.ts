import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY")!;
const BASE_ID          = "appZ8ykNuUOv89ou0";
const EVAL_TABLE       = "tbl5DuUDcyNDtasvG"; // Evaluation Niteo
const JURY_TABLE       = "tblocqquF4OXgXveO"; // BASE DE PRODUCTION

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Colonnes exactes dans Airtable
const AXES = [
  { key: "marche",       noteCol: "Note Potentiel du marché",   plusCol: "Points+ Potentiel du marché",   amelioCol: "Amélio. Potentiel du marché"   },
  { key: "valeur",       noteCol: "Note Proposition de valeur", plusCol: "Points+ Proposition de valeur", amelioCol: "Amélio. Proposition de valeur" },
  { key: "bm",           noteCol: "Note Business Model",        plusCol: "Points+ BM",                    amelioCol: "Amélio. BM"                    },
  { key: "robustesse",   noteCol: "Note Robustesse",            plusCol: "Points+ Robustesse",            amelioCol: "Amélio. Robustesse"            },
  { key: "innovation",   noteCol: "Note Innovation",            plusCol: "Points+ Innovation",            amelioCol: "Amélio. Innovation"            },
  { key: "impact",       noteCol: "Note Impact territorial",    plusCol: "Points+ Impact territorial",    amelioCol: "Amélio. Impact territorial"    },
  { key: "leadership",   noteCol: "Note Leadership",            plusCol: "Points+ Leadership",            amelioCol: "Amélio. Leadership"            },
  { key: "presentation", noteCol: "Note Présentation",          plusCol: "Points+ Présentation",          amelioCol: "Amélio. Présentation"          },
  { key: "synthese",     noteCol: "Note Synthèse",              plusCol: "Points+ Synthèse",              amelioCol: "Amélio. Synthèse"              },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const body = await req.json();
    const { action } = body;

    // ── Action : récupérer les projets déjà évalués par un juré
    if (action === "get-evaluated") {
      const { nomJure } = body;
      if (!nomJure) throw new Error("nomJure obligatoire.");

      const formula = encodeURIComponent(`{Nom Juré} = "${nomJure.trim()}"`);
      const res = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${EVAL_TABLE}?filterByFormula=${formula}&fields[]=Projet&maxRecords=100`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
      );
      const data = await res.json();
      const projetsEvalues: string[] = (data.records ?? [])
        .map((r: any) => (r.fields["Projet"] ?? "").trim())
        .filter(Boolean);

      return new Response(JSON.stringify({ projetsEvalues }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // ── Action par défaut : soumettre une évaluation
    const { nomJure: nomJureBody, code, projet, notes, commentaires } = body;
    if (!projet) throw new Error("Projet obligatoire.");

    // Utiliser le nom passé directement (fiable même quand le code est partagé)
    let nomJure = (nomJureBody ?? "").trim();
    if (!nomJure) {
      if (!code) throw new Error("Nom ou code obligatoire.");
      const formula = encodeURIComponent(`{CODE JURY NITEO } = "${code.trim().toUpperCase()}"`);
      const juryRes = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${JURY_TABLE}?filterByFormula=${formula}&fields[]=Pr%C3%A9nom%20%2F%20Nom&maxRecords=1`,
        { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
      );
      const juryData = await juryRes.json();
      if (!juryData.records?.length) throw new Error("Code jury invalide.");
      nomJure = (juryData.records[0].fields["Prénom / Nom"] ?? "").trim();
    }

    // Anti-doublon
    const dupFormula = encodeURIComponent(`AND({Nom Juré} = "${nomJure}", {Projet} = "${projet}")`);
    const dupRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${EVAL_TABLE}?filterByFormula=${dupFormula}&maxRecords=1`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
    );
    const dupData = await dupRes.json();
    if (dupData.records?.length) throw new Error("Vous avez déjà évalué ce projet.");

    // Construire l'enregistrement avec les noms de colonnes exacts
    const fields: Record<string, unknown> = {
      "Code Juré":  (code ?? "").trim().toUpperCase(),
      "Nom Juré":   nomJure,
      "Projet":     projet,
      "Édition":    "2026",
      "Soumis le":  new Date().toISOString(),
    };

    AXES.forEach(({ key, noteCol, plusCol, amelioCol }) => {
      fields[noteCol]   = notes?.[key] ?? 0;
      fields[plusCol]   = commentaires?.[key]?.positif ?? "";
      fields[amelioCol] = commentaires?.[key]?.amelio ?? "";
    });

    const createRes = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${EVAL_TABLE}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });
    const createData = await createRes.json();
    if (createData.error) throw new Error(createData.error.message ?? "Erreur Airtable.");

    return new Response(JSON.stringify({ success: true, id: createData.id }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
