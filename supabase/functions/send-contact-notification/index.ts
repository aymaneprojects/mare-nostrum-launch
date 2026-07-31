import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY  = Deno.env.get("RESEND_API_KEY");
const AIRTABLE_KEY    = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID         = "appZ8ykNuUOv89ou0";
const TABLE_ID        = "tblocqquF4OXgXveO";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SEGMENT_MAP: Record<string, string> = {
  ecole:        "École / Université",
  entrepreneur: "Entrepreneur / Dirigeant",
  etudiant:     "Étudiant",
  partenaire:   "Partenaire",
  autre:        "Autre",
};

const SPAM_KEYWORDS = [
  "casino", "viagra", "bitcoin", "crypto porn", "xxx", "loan offer",
  "forex", "investment opportunity", "make money fast", "click here now",
  "free money", "earn $", "work from home", "weight loss pill",
];

// Rate-limit en mémoire (persiste le temps de la warm instance)
const recentByEmail = new Map<string, number>();
const recentByIp    = new Map<string, number>();
const RATE_WINDOW_MS = 3 * 60 * 60 * 1000; // 3h

function spamScore(data: { name: string; email: string; message: string; website?: string }): { score: number; reason: string } {
  // Honeypot : un bot remplit ce champ caché, un humain ne le voit pas
  if (data.website && data.website.trim().length > 0) {
    return { score: 999, reason: "honeypot" };
  }

  let score = 0;
  const reasons: string[] = [];
  const name  = (data.name    ?? "").trim();
  const email = (data.email   ?? "").trim();
  const msg   = (data.message ?? "").trim();

  if (!name || name.length < 2)                                               { score += 50; reasons.push("nom trop court"); }
  if (!email || !email.includes("@") || email.split("@")[1]?.indexOf(".") < 1) { score += 80; reasons.push("email invalide"); }
  if (!msg || msg.length < 15)                                                { score += 60; reasons.push("message trop court"); }

  const urlCount = (msg.match(/https?:\/\//gi) ?? []).length;
  if (urlCount >= 3)      { score += 55; reasons.push("3+ URLs"); }
  else if (urlCount >= 2) { score += 25; reasons.push("2 URLs"); }

  if (/(.)\1{6,}/.test(msg))                                                  { score += 40; reasons.push("répétition chars"); }
  if (msg.length > 20 && msg === msg.toUpperCase())                            { score += 25; reasons.push("tout en majuscules"); }
  if (SPAM_KEYWORDS.some(kw => msg.toLowerCase().includes(kw)))               { score += 70; reasons.push("mot-clé spam"); }
  if (name.length > 25 && !/\s/.test(name))                                   { score += 30; reasons.push("nom suspect"); }

  return { score, reason: reasons.join(", ") || "ok" };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, email, phone, type, message, country, website } = await req.json();

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const emailKey = (email ?? "").toLowerCase().trim();

    // ── anti-spam : scoring contenu ──
    const { score, reason } = spamScore({ name, email, message, website });
    if (score >= 50) {
      console.warn(`[SPAM] score=${score} raison="${reason}" email=${email} ip=${clientIp}`);
      // Retour 200 silencieux : le bot croit avoir réussi
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // ── anti-spam : rate-limit par email et IP ──
    const now = Date.now();
    const checks: Array<[Map<string, number>, string, string]> = [
      [recentByEmail, emailKey, "email"],
      [recentByIp,    clientIp, "ip"],
    ];
    for (const [map, key, label] of checks) {
      const last = map.get(key);
      if (last && now - last < RATE_WINDOW_MS) {
        console.warn(`[RATE LIMIT] ${label}=${key} — soumission trop rapprochée`);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }
    recentByEmail.set(emailKey, now);
    recentByIp.set(clientIp, now);

    // ── save to Airtable ──
    try {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typecast: true,
          fields: {
            "Prénom / Nom":        name,
            "Mail":                email,
            "Téléphone":           phone ?? "",
            "Pays de résidence":   country ?? "",
            "Segment":             SEGMENT_MAP[type] ?? type ?? "",
            "Lead Type":           "Lead Froid",
            "Expérience":          "Formulaire de contact ",
            "Contact - contenue du message": message ?? "",
            "confidentialité":     true,
            "Input CTA Site web":  "Contact",
          },
        }),
      });
    } catch (airtableErr) {
      console.error("Airtable error (non-blocking):", airtableErr);
    }

    // ── notify Mare Nostrum ──
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to:   ["contact@marenostrum.tech"],
        cc:   ["alexis@marenostrum.tech"],
        subject: `Nouveau message de ${name} — ${SEGMENT_MAP[type] ?? type}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
          <p><strong>Pays :</strong> ${country ?? "—"}</p>
          <p><strong>Profil :</strong> ${SEGMENT_MAP[type] ?? type}</p>
          <p><strong>Message :</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>Formulaire de contact — marenostrum.tech</small></p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      throw new Error(`Resend API error: ${JSON.stringify(errorData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
