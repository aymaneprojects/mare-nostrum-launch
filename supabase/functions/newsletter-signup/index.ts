import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID  = "appZ8ykNuUOv89ou0";
const TABLE_ID = Deno.env.get("AIRTABLE_NEWSLETTER_TABLE") ?? "Newsletter";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { nom, email, projet } = await req.json();

    if (!nom || !email) {
      return new Response(JSON.stringify({ error: "nom et email requis" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_ID)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Nom": nom,
          "Email": email,
          "Projet": projet ?? "",
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { "Content-Type": "application/json", ...cors },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { "Content-Type": "application/json", ...cors },
    });
  }
});
