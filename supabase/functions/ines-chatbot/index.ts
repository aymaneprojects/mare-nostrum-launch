import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const MISTRAL_API_KEY = Deno.env.get("MISTRAL_API_KEY")!;
const AIRTABLE_KEY = Deno.env.get("AIRTABLE_API_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

const AIRTABLE_BASE = "appZ8ykNuUOv89ou0";
const AIRTABLE_TABLE = "tblocqquF4OXgXveO";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM PROMPT — INÈS
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es Inès, l'assistante virtuelle de Mare Nostrum, cabinet de conseil en entrepreneuriat basé entre Toulouse, Paris et Casablanca.

## TON IDENTITÉ
- Tu t'appelles Inès, tu es chaleureuse, professionnelle et experte.
- Tu tutoies les visiteurs (tutoiement bienvenu, naturel).
- Tu es concise : 2-3 phrases par réponse, sauf si une explication détaillée est nécessaire.
- Tu ne dis jamais "en tant qu'IA" ou "je suis un assistant virtuel". Tu es Inès, point.

## CE QUE MARE NOSTRUM PROPOSE

### Club (B2C — Entrepreneurs & Dirigeants)
3 offres d'abonnement mensuel :
- **Communauté** : 30€/mois (France) | 10 000 XOF/mois (Congo) — Accès communauté + événements
- **Groupe** : 90€/mois (France) | 30 000 XOF/mois (Congo) — Ateliers en groupe + mentorat collectif
- **Individuel** : 190€/mois (France) | 80 000 XOF/mois (Congo) — Mentorat 1-to-1 personnalisé

Tarifs annuels disponibles (-10%).

### Offre Écoles (B2B)
- Programmes d'entrepreneuriat en marque blanche pour écoles et universités
- Diagnostic gratuit disponible sur le site
- Contact : formulaire dédié ou contact@marenostrum.tech

### Niteo (Toulouse)
- Programme 50h chrono, 100% gratuit pour étudiants et jeunes diplômés
- Site dédié : niteo.marenostrum.tech

## TES RÈGLES

1. **Qualifie naturellement** : après 2-3 échanges, demande le prénom, puis l'email ou le téléphone pour "te rappeler" ou "t'envoyer plus d'infos". Ne force pas dès le premier message.
2. **Oriente vers la bonne offre** :
   - Un entrepreneur qui veut du réseau → Club Communauté
   - Qui veut progresser sérieusement → Club Groupe ou Individuel
   - Un responsable d'école → Offre Écoles
   - Un étudiant toulousain → Niteo
3. **Ne jamais inventer** : si tu ne sais pas, dis "Je vais transmettre ta demande à l'équipe qui pourra te répondre précisément."
4. **Ne jamais mentionner de prix non listés ci-dessus.**
5. **Pas de fausses promesses** : ne garantis pas de résultat, ne dis pas que le Club va "transformer son business".
6. **Si on te demande un rendez-vous** : propose de laisser email/téléphone pour que l'équipe le contacte.
7. **Si on te demande le livre blanc** : dirige vers /livre-entrepreneuriat
8. **Si on te demande un diagnostic gratuit** : dirige vers /ecoles/diagnostic-gratuit (pour les écoles) ou /diagnostic (pour les entrepreneurs)

## FORMAT DE RÉPONSE
- Texte brut, pas de markdown (pas de **, pas de ##)
- Pas de JSON, pas de code
- Phrases courtes, paragraphes aérés
- Tu peux utiliser des émojis avec parcimonie (1 max par réponse)`;

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface SessionRecord {
  session_id: string;
  messages: ChatMessage[];
  contact_email?: string;
  contact_phone?: string;
  contact_name?: string;
  lead_type?: string;
}

function extractContactInfo(
  message: string,
  _history: ChatMessage[],
): { name?: string; email?: string; phone?: string } {
  const result: { name?: string; email?: string; phone?: string } = {};

  // Email regex
  const emailMatch = message.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  );
  if (emailMatch) result.email = emailMatch[0].toLowerCase();

  // Phone regex (French format)
  const phoneMatch = message.match(
    /(\+?\d{1,3}[\s.-]?)?(\(?0?\d[\s.-]?)(\d{2}[\s.-]?){4}/,
  );
  if (phoneMatch) result.phone = phoneMatch[0].replace(/\s/g, "");

  // Name detection
  const namePatterns = [
    /je m'appelle\s+([A-ZÀ-Ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-Ÿ][a-zà-ÿ]+)?)/i,
    /mon nom est\s+([A-ZÀ-Ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-Ÿ][a-zà-ÿ]+)?)/i,
    /de la part de\s+([A-ZÀ-Ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-Ÿ][a-zà-ÿ]+)?)/i,
    /c'est\s+([A-ZÀ-Ÿ][a-zà-ÿ]+(?:\s+[A-ZÀ-Ÿ][a-zà-ÿ]+)?)/i,
  ];
  for (const pattern of namePatterns) {
    const match = message.match(pattern);
    if (match) {
      result.name = match[1].trim();
      break;
    }
  }

  return result;
}

async function callMistral(
  messages: { role: string; content: string }[],
): Promise<string> {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-large-2512",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Mistral error:", error);
    throw new Error(`Mistral API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function saveToAirtable(
  name: string | undefined,
  email: string | undefined,
  phone: string | undefined,
  segment: string,
  message: string,
): Promise<void> {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typecast: true,
          fields: {
            "Prénom / Nom": name ?? email ?? "Visiteur chatbot",
            "Mail": email ?? "",
            "Téléphone": phone ?? "",
            "Segment": segment,
            "Lead Type": "Lead Chaud",
            "Expérience": "Chatbot Inès",
            "Contact - contenue du message":
              `Message du chatbot: ${message.substring(0, 500)}`,
            "confidentialité": true,
            "Input CTA Site web": "Chatbot",
          },
        }),
      },
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Airtable error:", err);
    } else {
      console.log("Contact saved to Airtable:", email ?? name);
    }
  } catch (err) {
    console.error("Airtable save failed (non-blocking):", err);
  }
}

async function sendNotificationEmail(
  contact: { name?: string; email?: string; phone?: string },
  message: string,
): Promise<void> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to: ["contact@marenostrum.tech"],
        cc: ["alexis@marenostrum.tech"],
        subject:
          `🧵 Nouveau contact chatbot — ${contact.name ?? contact.email ?? "Anonyme"}`,
        html: `
        <h2>Nouveau contact via le chatbot Inès</h2>
        <p><strong>Nom :</strong> ${contact.name ?? "—"}</p>
        <p><strong>Email :</strong> ${contact.email ?? "—"}</p>
        <p><strong>Téléphone :</strong> ${contact.phone ?? "—"}</p>
        <p><strong>Dernier message :</strong></p>
        <blockquote>${message}</blockquote>
        <hr>
        <p><small>Chatbot Inès — marenostrum.tech</small></p>
      `,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Resend error:", err);
    } else {
      console.log("Notification email sent");
    }
  } catch (err) {
    console.error("Email notification failed (non-blocking):", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────────────────────────────────────

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const userMessage: string = body.message ?? "";
    const sessionId: string = body.sessionId ?? "";

    if (!userMessage.trim() || !sessionId) {
      return new Response(
        JSON.stringify({ error: "message and sessionId required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log(
      `[Inès] Session ${sessionId}: "${userMessage.substring(0, 80)}..."`,
    );

    // ── Load or create session ──
    let session: SessionRecord;
    const { data: existing } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("session_id", sessionId)
      .single();

    if (existing) {
      session = existing;
    } else {
      const { data: created } = await supabase
        .from("chat_sessions")
        .insert({ session_id: sessionId, messages: [] })
        .select()
        .single();
      session = created;
    }

    // ── Add user message to history ──
    const history: ChatMessage[] = session.messages ?? [];
    const userMsg: ChatMessage = {
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    history.push(userMsg);

    // ── Call Mistral ──
    const mistralMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const assistantContent = await callMistral(mistralMessages);
    console.log(`[Inès] Response: "${assistantContent.substring(0, 80)}..."`);

    // ── Add assistant message to history ──
    const assistantMsg: ChatMessage = {
      role: "assistant",
      content: assistantContent,
      timestamp: new Date().toISOString(),
    };
    history.push(assistantMsg);

    // ── Extract contact info ──
    const contactInfo = extractContactInfo(userMessage, history);
    const existingContact = {
      name: session.contact_name ?? contactInfo.name,
      email: session.contact_email ?? contactInfo.email,
      phone: session.contact_phone ?? contactInfo.phone,
    };

    // ── Update session ──
    await supabase
      .from("chat_sessions")
      .update({
        messages: history,
        contact_email: existingContact.email,
        contact_phone: existingContact.phone,
        contact_name: existingContact.name,
        updated_at: new Date().toISOString(),
      })
      .eq("session_id", sessionId);

    // ── If new contact detected, save to Airtable + notify ──
    const isNewContact = contactInfo.email || contactInfo.phone;
    const hadContactBefore = session.contact_email || session.contact_phone;

    if (isNewContact && !hadContactBefore) {
      console.log(
        `[Inès] New contact detected: ${existingContact.email ?? existingContact.phone}`,
      );

      // Save to chat_contacts
      await supabase.from("chat_contacts").insert({
        session_id: sessionId,
        name: existingContact.name,
        email: existingContact.email,
        phone: existingContact.phone,
        segment: "Chatbot",
        conversation: history,
      });

      // Save to Airtable (non-blocking)
      await saveToAirtable(
        existingContact.name,
        existingContact.email,
        existingContact.phone,
        "Chatbot Inès",
        userMessage,
      );

      // Send notification email (non-blocking)
      await sendNotificationEmail(existingContact, userMessage);
    }

    // ── Return response ──
    return new Response(
      JSON.stringify({
        response: assistantContent,
        sessionId: sessionId,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("[Inès] Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        error: message,
        response:
          "Désolé, une erreur s'est produite. Veuillez réessayer ou contacter l'équipe à contact@marenostrum.tech.",
      }),
      {
        status: 200, // 200 so the chatbot shows the error message
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
};

serve(handler);
