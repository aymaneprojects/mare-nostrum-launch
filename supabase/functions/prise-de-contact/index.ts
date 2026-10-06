// Prise de contact — remplace l'ancien couple « confirmation + notification ».
//
// Un contact arrive de trois façons : un visiteur du site, une rencontre lors
// d'un événement, ou une recommandation. Dans tous les cas, on enregistre la
// personne dans Airtable et on envoie UN SEUL message : le responsable du pôle
// concerné en destinataire, la personne et les adresses de suivi en copie
// cachée. Elle reçoit ainsi une vraie prise de contact, pas un accusé de
// réception automatique.
//
// Le routage est la seule règle métier de cette fonction, et il est volontairement
// écrit en toutes lettres plus bas : c'est ce qui change le plus souvent.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const AIRTABLE_KEY   = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID        = "appZ8ykNuUOv89ou0";
const TABLE_ID       = "tblocqquF4OXgXveO";

const CONTACT = "contact@marenostrum.tech";
const AYMANE  = "aymane@marenostrum.tech";
const ALEXIS  = "alexis@marenostrum.tech";
const JULIENNE = "julienne@marenostrum.tech";
const YASMINE  = "yasmine@marenostrum.tech";

/** Les cinq pôles : libellé affiché, responsable, adresses en copie cachée. */
const POLES = {
  expertise: {
    libelle: "Expertise",
    phrase: "l'accompagnement sur mesure des organisations et de leurs projets",
    responsable: YASMINE,
    copie: [CONTACT, ALEXIS],
  },
  agent_ia: {
    libelle: "Agent IA",
    phrase: "le déploiement d'agents d'intelligence artificielle au service de votre activité",
    responsable: AYMANE,
    copie: [CONTACT],
  },
  club: {
    libelle: "Club",
    phrase: "le Club Mare Nostrum, la communauté d'entrepreneurs accompagnés toute l'année",
    responsable: ALEXIS,
    copie: [CONTACT, AYMANE],
  },
  formation: {
    libelle: "Centre de formation",
    phrase: "nos formations, dispensées par un organisme certifié Qualiopi",
    responsable: JULIENNE,
    copie: [CONTACT, AYMANE, ALEXIS],
  },
  niteo: {
    libelle: "Niteo",
    phrase: "l'incubateur Niteo, qui accompagne les porteurs de projet",
    responsable: ALEXIS,
    copie: [CONTACT, AYMANE],
  },
} as const;

type ClePole = keyof typeof POLES;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (corps: unknown, status = 200) =>
  new Response(JSON.stringify(corps), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/** Échappe le HTML : le contenu vient d'un formulaire public. */
const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const prenomDe = (nom: string) => nom.trim().split(/\s+/)[0] || "";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const corps = await req.json();
    const { name, email, phone, country, type, message, website } = corps;
    const poles: string[] = Array.isArray(corps.poles) ? corps.poles : [];

    // Piège anti-robot : rempli = on répond comme si tout allait bien, sans rien faire.
    if (typeof website === "string" && website.trim() !== "") return json({ success: true });

    const emailValide = typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email.trim());
    const nomValide = typeof name === "string" && name.trim().length > 1 && name.trim().length <= 120;
    const choisis = poles.filter((p): p is ClePole => p in POLES);

    if (!nomValide || !emailValide || choisis.length === 0) {
      return json({ error: "Requête invalide." }, 400);
    }

    const libelles = choisis.map((p) => POLES[p].libelle);

    // ── Airtable : la fiche du contact ────────────────────────────────────────
    // Volontairement non bloquant : si Airtable tombe, le message doit partir
    // quand même. C'est la règle déjà appliquée par les autres fonctions.
    if (AIRTABLE_KEY) {
      try {
        await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${AIRTABLE_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            typecast: true,
            fields: {
              "Prénom / Nom": name,
              "Mail": email,
              "Téléphone": phone ?? "",
              "Pays de résidence": country ?? "",
              "Segment": type ?? "",
              "Pôles concernés": libelles,
              "Lead Type": "Lead Chaud",
              "Expérience": "Prise de contact",
              "Contact - contenue du message": message ?? "",
              "confidentialité": true,
              "Input CTA Site web": "Prise de contact",
            },
          }),
        });
      } catch (e) {
        console.error("Airtable (non bloquant) :", e);
      }
    }

    // ── Destinataires ─────────────────────────────────────────────────────────
    // Un seul message : les responsables des pôles choisis en destinataires, la
    // personne et les adresses de suivi en copie cachée. Une adresse déjà
    // destinataire n'est pas remise en copie.
    const destinataires = [...new Set(choisis.map((p) => POLES[p].responsable))];
    const copieCachee = [
      ...new Set([
        email.trim(),
        ...choisis.flatMap((p) => [...POLES[p].copie]),
      ]),
    ].filter((a) => !destinataires.includes(a));

    const sujet = `PRISE DE CONTACT — ${name} — ${libelles.join(" · ")}`;

    // Message volontairement court. On ne dit JAMAIS à la personne qu'on a saisi
    // ses coordonnées quelque part : on acte simplement que le contact a eu lieu
    // — événement, rencontre ou site — et on annonce qui la recontacte.
    const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#1b2340;max-width:560px">
  <p>Bonjour ${esc(prenomDe(name))},</p>

  <p>Ravis d'avoir été en contact avec vous — lors d'un événement, d'une rencontre
  ou depuis notre site.</p>

  <p>À très bientôt,<br>
  <strong>L'équipe Mare Nostrum</strong></p>

  <p style="font-size:13px;color:#8a8fa3;margin-top:28px">
    Toulouse · Paris · Casablanca — <a href="https://www.marenostrum.tech" style="color:#8a8fa3">marenostrum.tech</a>
  </p>
</div>`;

    const envoi = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Mare Nostrum <no-reply@marenostrum.tech>",
        to: destinataires,
        bcc: copieCachee,
        reply_to: email.trim(),
        subject: sujet,
        html,
      }),
    });

    if (!envoi.ok) {
      const detail = await envoi.text();
      console.error("Resend :", detail);
      return json({ error: "Envoi impossible." }, 502);
    }

    return json({ success: true, destinataires, poles: libelles });
  } catch (e) {
    console.error("prise-de-contact :", e);
    return json({ error: "Requête invalide." }, 400);
  }
});
