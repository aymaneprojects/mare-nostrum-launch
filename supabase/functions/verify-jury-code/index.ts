import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY")!;
const BASE_ID          = "appZ8ykNuUOv89ou0";
const TABLE_ID         = "tblocqquF4OXgXveO"; // BASE DE PRODUCTION

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { code, nom, prenom, email, telephone } = await req.json();
    if (!code) throw new Error("Code manquant.");

    const codeClean = code.trim().toUpperCase();

    // Chercher le code dans la base
    const formula = encodeURIComponent(`{CODE JURY NITEO } = "${codeClean}"`);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=${formula}&fields[]=Pr%C3%A9nom%20%2F%20Nom&maxRecords=1`;

    const res  = await fetch(url, { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } });
    const data = await res.json();

    // ── Cas 1 : code trouvé → vote direct
    if (data.records?.length) {
      const nomJure = (data.records[0].fields["Prénom / Nom"] ?? "").trim();
      return new Response(JSON.stringify({ found: true, nomJure }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // ── Cas 2 : code inconnu, sans infos → demander email + téléphone
    if (!email && !telephone) {
      return new Response(JSON.stringify({ found: false, needsInfo: true }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    // ── Cas 3 : code inconnu + infos fournies → créer dans Airtable
    const nomComplet = `${(prenom ?? "").trim()} ${(nom ?? "").trim()}`.trim();
    const createRes = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Prénom / Nom":    nomComplet,
          "Mail":            email ?? "",
          "Téléphone":       telephone ?? "",
          "CODE JURY NITEO ": codeClean,
        },
      }),
    });
    const createData = await createRes.json();
    if (createData.error) throw new Error(createData.error.message ?? "Erreur création.");

    return new Response(JSON.stringify({ found: false, created: true, nomJure: nomComplet }), {
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
