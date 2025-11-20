import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const startTime = Date.now();

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = Date.now();
    const uptimeSeconds = (now - startTime) / 1000;

    const healthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: uptimeSeconds,
      environment: Deno.env.get('ENVIRONMENT') || "production"
    };

    console.log('Health check requested:', healthResponse);

    return new Response(JSON.stringify(healthResponse), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error in healthz function:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    const errorResponse = {
      status: "error",
      timestamp: new Date().toISOString(),
      error: errorMessage
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  }
});
