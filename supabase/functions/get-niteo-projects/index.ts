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
    // SEARCH tolère les espaces en fin de valeur
    const formula = encodeURIComponent(`SEARCH("Finaliste Niteo Toulouse 2026", {Raison d'élimination}) > 0`);
    const fields  = `fields[]=Structure+2`;
    const url     = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=${formula}&${fields}&maxRecords=100`;

    const res  = await fetch(url, { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } });
    const data = await res.json();

    if (data.error) throw new Error(data.error.message ?? "Erreur Airtable");

    const projets: string[] = data.records
      .map((r: any) => (r.fields["Structure 2"] ?? "").trim())
      .filter(Boolean)
      .sort();

    return new Response(JSON.stringify({ projets }), {
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
