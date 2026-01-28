import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const WEBHOOK_URLS: Record<string, string> = {
  'contact': 'https://n8n.srv1174483.hstgr.cloud/webhook/web-contact',
  'livre-blanc': 'https://n8n.srv1174483.hstgr.cloud/webhook/livre-blanc',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    console.log(`Webhook proxy called for type: ${type}`);

    if (!type || !WEBHOOK_URLS[type]) {
      console.error(`Invalid webhook type: ${type}`);
      return new Response(
        JSON.stringify({ error: 'Invalid webhook type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!data) {
      console.error('No data provided');
      return new Response(
        JSON.stringify({ error: 'No data provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const webhookUrl = WEBHOOK_URLS[type];
    console.log(`Forwarding to webhook: ${webhookUrl}`);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    console.log(`Webhook response status: ${response.status}`);
    console.log(`Webhook response: ${responseText}`);

    return new Response(
      JSON.stringify({ success: true, status: response.status }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Webhook proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
