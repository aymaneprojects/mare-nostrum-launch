import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID  = "appZ8ykNuUOv89ou0";
const TABLE_ID = "tblocqquF4OXgXveO";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Fetch all records matching the email (handles pagination)
async function findAllByEmail(email: string): Promise<string[]> {
  const ids: string[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
    url.searchParams.set("filterByFormula", `{Mail}="${email}"`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    if (!res.ok) throw new Error(`Airtable search error: ${res.status}`);

    const data = await res.json();
    for (const r of data.records ?? []) ids.push(r.id);
    offset = data.offset;
  } while (offset);

  return ids;
}

// Patch records in batches of 10 (Airtable limit)
async function updateAll(ids: string[]): Promise<void> {
  for (let i = 0; i < ids.length; i += 10) {
    const batch = ids.slice(i, i + 10).map(id => ({
      id,
      fields: { "Lead Type": "Unsubscribed" },
    }));

    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: batch }),
    });

    if (!res.ok) throw new Error(`Airtable update error: ${res.status}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "email requis" }), {
        status: 400, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const ids = await findAllByEmail(email);

    if (ids.length === 0) {
      return new Response(JSON.stringify({ error: "email introuvable" }), {
        status: 404, headers: { "Content-Type": "application/json", ...cors },
      });
    }

    await updateAll(ids);

    return new Response(JSON.stringify({ success: true, updated: ids.length }), {
      status: 200, headers: { "Content-Type": "application/json", ...cors },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { "Content-Type": "application/json", ...cors },
    });
  }
});
