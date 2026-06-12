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
    const { code } = await req.json();
    if (!code) throw new Error("Code manquant.");

    const formula = encodeURIComponent(`{CODE JURY NITEO } = "${code.trim().toUpperCase()}"`);
    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?filterByFormula=${formula}&fields[]=Pr%C3%A9nom%20%2F%20Nom&fields[]=Mail&maxRecords=1`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });
    const data = await res.json();

    if (!data.records?.length) {
      return new Response(JSON.stringify({ valid: false }), {
        status: 200,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const record = data.records[0];
    const nom = record.fields["Prénom / Nom"] ?? "";

    return new Response(JSON.stringify({ valid: true, nom: nom.trim() }), {
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
