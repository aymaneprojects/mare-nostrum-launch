import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID  = "appZ8ykNuUOv89ou0";
const TABLE_ID = "tblocqquF4OXgXveO";
const VIEW_ID  = "viwYafT7f3LtMLU5z";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function countRecords(): Promise<number> {
  let count = 0;
  let offset: string | undefined;

  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
    url.searchParams.set("view", VIEW_ID);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    });

    if (!res.ok) throw new Error(`Airtable error: ${res.status}`);

    const data = await res.json();
    count += (data.records ?? []).length;
    offset = data.offset;
  } while (offset);

  return count;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const count = await countRecords();
    return new Response(JSON.stringify({ count }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
