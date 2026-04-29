import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID  = "appZ8ykNuUOv89ou0";
const TABLE_ID = "tblocqquF4OXgXveO";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "email requis" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    // Find record by email
    const searchUrl = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
    searchUrl.searchParams.set("filterByFormula", `{Mail}="${email}"`);
    searchUrl.searchParams.set("maxRecords", "1");

    const searchRes = await fetch(searchUrl.toString(), {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    if (!searchRes.ok) throw new Error(`Airtable search error: ${searchRes.status}`);

    const { records } = await searchRes.json();

    if (!records || records.length === 0) {
      return new Response(JSON.stringify({ error: "email introuvable" }), {
        status: 404, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const recordId = records[0].id;

    // Update Lead Type to Unsubscribed
    const updateRes = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/${recordId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { "Lead Type": "Unsubscribed" },
      }),
    });

    if (!updateRes.ok) throw new Error(`Airtable update error: ${updateRes.status}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json", ...cors },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { "Content-Type": "application/json", ...cors },
    });
  }
});
