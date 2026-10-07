// Prise de contact — remplace l'ancien couple « confirmation + notification ».
//
// Un contact arrive de trois façons : un visiteur du site, une rencontre lors
// d'un événement, ou une recommandation. Dans tous les cas, on enregistre la
// personne dans Airtable puis on envoie DEUX messages :
//
//   1. À LA PERSONNE : le mot de bienvenue. contact@ est en copie visible.
//   2. À L'ÉQUIPE : les responsables des pôles choisis en destinataires, contact@
//      en copie visible, les autres adresses de suivi en copie cachée. Il porte
//      TOUT le détail du formulaire ; « répondre » écrit directement à la personne.
//
// Deux messages et non un seul : la personne ne doit pas voir le détail interne
// ni les adresses de l'équipe, et l'équipe a besoin du détail complet.
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

/** Valeurs du champ « Vous êtes… » du formulaire, en clair. */
const PROFILS: Record<string, string> = {
  ecole: "Une école / université",
  entrepreneur: "Un entrepreneur / dirigeant",
  etudiant: "Un étudiant",
  partenaire: "Un partenaire potentiel",
  autre: "Autre",
};

const nl2br = (v: unknown) => esc(v).replace(/\r?\n/g, "<br>");

/** Détail complet du formulaire, pour l'équipe : aucun champ n'est omis. */
function detailFormulaire(c: {
  name: string; email: string; phone?: string; country?: string; type?: string;
  message?: string; poles: string[];
}) {
  // Le formulaire ajoute « [Pôles : …] » à la fin du message : déjà affiché à part.
  const message = String(c.message ?? "").replace(/\n*\[Pôles :[^\]]*\]\s*$/, "").trim();
  const quand = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full", timeStyle: "short", timeZone: "Europe/Paris",
  }).format(new Date());
  const ligne = (k: string, v: string) =>
    `<tr><td style="padding:8px 14px 8px 0;color:#8a8fa3;vertical-align:top;white-space:nowrap">${k}</td>` +
    `<td style="padding:8px 0;color:#1b2340">${v || "<em style=\"color:#8a8fa3\">non renseigné</em>"}</td></tr>`;
  return `
<table style="border-collapse:collapse;font-size:15px;line-height:1.5;margin:18px 0">
  ${ligne("Nom", esc(c.name))}
  ${ligne("E-mail", `<a href="mailto:${esc(c.email)}" style="color:#1b2340">${esc(c.email)}</a>`)}
  ${ligne("Téléphone", esc(c.phone))}
  ${ligne("Pays", esc(c.country))}
  ${ligne("Profil", esc(PROFILS[String(c.type ?? "")] ?? c.type))}
  ${ligne("Pôles concernés", esc(c.poles.join(", ")))}
  ${ligne("Reçu le", esc(quand))}
  ${ligne("Origine", "Formulaire de contact — marenostrum.tech/contact")}
</table>
<p style="margin:18px 0 6px;color:#8a8fa3;font-size:13px;text-transform:uppercase;letter-spacing:.08em">Message</p>
<div style="border-left:3px solid #3fd9d9;padding:6px 0 6px 14px;font-size:16px;line-height:1.6;color:#1b2340">${message ? nl2br(message) : "<em style=\"color:#8a8fa3\">aucun message</em>"}</div>`;
}

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
    // Équipe : responsables des pôles choisis en destinataires ; contact@ en copie
    // visible ; toutes les autres adresses de suivi en copie cachée. Une adresse
    // n'apparaît jamais deux fois.
    const personne = email.trim().toLowerCase();
    const destinataires = [...new Set(choisis.map((p) => POLES[p].responsable))];
    const copie = destinataires.includes(CONTACT) ? [] : [CONTACT];
    const copieCachee = [
      ...new Set(choisis.flatMap((p) => [...POLES[p].copie])),
    ].filter((a) => a !== CONTACT && !destinataires.includes(a));

    const envoyer = (corps: Record<string, unknown>) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({ from: "Mare Nostrum <no-reply@marenostrum.tech>", ...corps }),
      });

    // ── 1. Message à l'ÉQUIPE : tout le détail du formulaire ─────────────────
    const htmlEquipe = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#1b2340;max-width:600px">
  <p style="margin:0 0 4px"><strong>Nouvelle prise de contact</strong></p>
  <p style="margin:0;color:#8a8fa3;font-size:14px">« Répondre » écrit directement à ${esc(name)}.</p>
  ${detailFormulaire({ name, email: personne, phone, country, type, message, poles: libelles })}
</div>`;

    const resEquipe = await envoyer({
      to: destinataires,
      cc: copie,
      bcc: copieCachee,
      reply_to: personne,
      subject: `PRISE DE CONTACT — ${name}`,
      html: htmlEquipe,
    });
    if (!resEquipe.ok) {
      console.error("Resend (équipe) :", await resEquipe.text());
      return json({ error: "Envoi impossible." }, 502);
    }

    // ── 2. Mot de bienvenue à la PERSONNE (contact@ en copie visible) ────────
    // Texte validé par le propriétaire le 7 octobre 2026. On ne dit JAMAIS qu'on a
    // saisi ses coordonnées quelque part : on acte que le contact a eu lieu —
    // événement, rencontre ou site — et on annonce un retour.
    const gris = "#8a8fa3";
    const htmlPersonne = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.65;color:#1b2340;max-width:560px">
  <p>Bonjour ${esc(prenomDe(name))},</p>

  <p>L'équipe de Mare Nostrum est ravie de cette prise de contact — lors d'un événement, d'une rencontre ou depuis notre site.</p>

  <p>Notre équipe revient vers vous.</p>

  <p>Vous pouvez aussi vous inscrire à notre newsletter <a href="https://www.marenostrum.tech/iter" style="color:#1b2340;font-weight:600">Iter</a>.</p>

  <p>À très bientôt,<br>
  <strong>L'équipe Mare Nostrum</strong></p>

  <p style="margin:20px 0 0"><a href="https://www.marenostrum.tech"><img src="https://www.marenostrum.tech/logo.jpg" alt="Mare Nostrum" width="72" height="72" style="display:block;border:0"></a></p>

  <p style="font-size:12px;line-height:1.5;color:${gris};margin-top:28px">
    Vous recevez ce message suite à votre prise de contact avec Mare Nostrum. Vos données sont utilisées par Mare Nostrum pour donner suite à cet échange, conformément au Règlement général sur la protection des données (RGPD). Vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression en écrivant à <a href="mailto:contact@marenostrum.tech" style="color:${gris}">contact@marenostrum.tech</a>. Pour en savoir plus : <a href="https://www.marenostrum.tech/confidentialite" style="color:${gris}">politique de confidentialité</a>.
  </p>
</div>`;

    // Le message à la personne ne bloque jamais : l'équipe est déjà prévenue.
    try {
      const resPersonne = await envoyer({
        to: [personne],
        cc: [CONTACT],
        subject: "Bienvenue dans l'écosystème de Mare Nostrum !",
        html: htmlPersonne,
        reply_to: CONTACT,
      });
      if (!resPersonne.ok) console.error("Resend (personne) :", await resPersonne.text());
    } catch (e) {
      console.error("Resend (personne) injoignable :", e);
    }

    return json({ success: true, destinataires, poles: libelles });
  } catch (e) {
    console.error("prise-de-contact :", e);
    return json({ error: "Requête invalide." }, 400);
  }
});
