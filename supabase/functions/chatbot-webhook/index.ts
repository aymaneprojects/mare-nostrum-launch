import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  // ── 1. Chatbot envoie un message (depuis le site) ──
  if (req.method === "POST" && !action) {
    try {
      const { message, sessionId } = await req.json();
      if (!message || !sessionId) {
        return new Response(JSON.stringify({ error: "message and sessionId required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await supabase.from("chatbot_messages").insert({
        session_id: sessionId,
        role: "user",
        content: message,
        processed: false,
      });

      return new Response(
        JSON.stringify({
          success: true,
          reply: "Merci pour ton message ! Inès va te répondre dès que possible. 💬",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("POST error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // ── 2. Inès récupère les messages non traités ──
  if (req.method === "GET" && action === "pending") {
    try {
      const { data, error } = await supabase
        .from("chatbot_messages")
        .select("*")
        .eq("processed", false)
        .order("created_at", { ascending: true })
        .limit(10);

      if (error) throw error;

      return new Response(
        JSON.stringify({ messages: data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("GET pending error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // ── 3. Inès poste une réponse ──
  if (req.method === "POST" && action === "reply") {
    try {
      const { sessionId, reply } = await req.json();
      if (!sessionId || !reply) {
        return new Response(JSON.stringify({ error: "sessionId and reply required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Insérer la réponse d'Inès
      await supabase.from("chatbot_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: reply,
        processed: true,
      });

      // Marquer les messages user comme traités
      await supabase
        .from("chatbot_messages")
        .update({ processed: true })
        .eq("session_id", sessionId)
        .eq("role", "user")
        .eq("processed", false);

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("POST reply error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // ── 4. Front récupère l'historique d'une session ──
  if (req.method === "GET" && action === "history") {
    try {
      const sessionId = url.searchParams.get("sessionId");
      if (!sessionId) {
        return new Response(JSON.stringify({ error: "sessionId required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data, error } = await supabase
        .from("chatbot_messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      return new Response(
        JSON.stringify({ messages: data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("GET history error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  return new Response(
    JSON.stringify({ error: "Invalid request" }),
    { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
