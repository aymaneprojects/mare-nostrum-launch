import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Roue de l'événement (marenostrum.tech/roue).
//
// Le parcours d'une personne, une action de cette fonction par étape, chacune écrite dans
// la fiche Airtable de la personne (la fiche est la seule source de vérité) :
//
//   inscrire  : nom, e-mail, téléphone, fonction, consentement → fiche créée, roue débloquée
//   tirer     : le lot est tiré ICI, côté serveur (le navigateur ne peut pas choisir son gain)
//   choisir   : si le lot est une session, la personne choisit Initiation à l'IA ou Mastermind
//   decider   : la personne accepte ou refuse son lot
//   stock     : lecture seule, combien de places restent par session
//
// Dans la fiche : « Rôle individuel » = la fonction ; « Action à réaliser » = ce que l'équipe
// doit faire (une ligne, filtrable) ; « Contact - contenue du message » = le détail complet.
// Il n'existe pas de colonnes dédiées au lot et à la décision, d'où ce message structuré :
//
//     Roue de l'événement.
//     Fonction : …
//     Lot : <id> | <titre> (<valeur>)
//     Session choisie : ia | mastermind
//     Décision : en attente | accepté | refusé
//
// LES CHANCES : un lot a autant de chances que de PARTS sur la roue. Garder `LOTS` identique à
// `PARTS` dans src/pages/Roue.tsx (15 parts : Freemium 6, 3 mois 4, 6 mois 3, session 2).
// LES PLACES : 15 par session. Une session refusée libère sa place ; une fois les 15 places prises,
// la session ne peut plus être choisie, et le lot « session » ne sort plus quand les deux sont complètes.

const AIRTABLE_API_KEY = Deno.env.get("AIRTABLE_API_KEY");
const BASE_ID = "appZ8ykNuUOv89ou0";
const TABLE_ID = "tblocqquF4OXgXveO";
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_ID)}`;

type IdLot = "freemium" | "club3" | "club6" | "session";
type IdSession = "ia" | "mastermind";

const LOTS: Record<IdLot, { parts: number; titre: string; valeur: string }> = {
  freemium: { parts: 6, titre: "Accès Freemium au Club", valeur: "gratuit" },
  club3:    { parts: 4, titre: "3 mois au Club",         valeur: "90 € TTC" },
  club6:    { parts: 3, titre: "6 mois au Club",         valeur: "180 € TTC" },
  session:  { parts: 2, titre: "Session de formation",   valeur: "210 € TTC" },
};
const SESSIONS: Record<IdSession, { places: number; titre: string }> = {
  ia:         { places: 15, titre: "Initiation à l'IA" },
  mastermind: { places: 15, titre: "Mastermind" },
};
const IDS_LOT = Object.keys(LOTS) as IdLot[];
const IDS_SESSION = Object.keys(SESSIONS) as IdSession[];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const refus = (code: string, status = 400) => json({ error: code }, status);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ID_FICHE = /^rec[A-Za-z0-9]{14}$/;
const guillemets = (v: string) => v.replace(/[\\"]/g, "");
const normaliserTel = (v: string) => {
  const t = v.trim();
  return (t.startsWith("+") ? "+" : "") + t.replace(/\D/g, "");
};

const auth = () => ({ Authorization: `Bearer ${AIRTABLE_API_KEY}`, "Content-Type": "application/json" });

// ── Lecture / écriture de la fiche ─────────────────────────────────────────────
type Etat = { lot: IdLot | null; session: IdSession | null; decision: "en attente" | "accepté" | "refusé" | null };

function lireEtat(message: unknown): Etat {
  const t = String(message ?? "");
  const lot = t.match(/Lot : (\w+)/)?.[1];
  const session = t.match(/Session choisie : (\w+)/)?.[1];
  const decision = t.match(/Décision : (en attente|accepté|refusé)/)?.[1];
  return {
    lot: lot && lot in LOTS ? (lot as IdLot) : null,
    session: session && session in SESSIONS ? (session as IdSession) : null,
    decision: (decision as Etat["decision"]) ?? null,
  };
}

function ecrireMessage(fonction: string, e: Etat): string {
  const l = e.lot ? LOTS[e.lot] : null;
  return [
    "Roue de l'événement.",
    `Fonction : ${fonction}`,
    l ? `Lot : ${e.lot} | ${l.titre} (${l.valeur})` : "Lot : pas encore tiré",
    ...(e.session ? [`Session choisie : ${e.session}`] : []),
    ...(e.decision ? [`Décision : ${e.decision}`] : []),
  ].join("\n");
}

/** Ce que l'équipe doit faire, en une ligne (colonne « Action à réaliser »). */
function actionAFaire(e: Etat): string {
  if (!e.lot) return "Roue : inscrit, n'a pas encore joué";
  const l = LOTS[e.lot];
  const detail = e.session ? `${l.titre} : ${SESSIONS[e.session].titre}` : l.titre;
  if (e.decision === "accepté") return `Roue : remettre le lot (${detail})`;
  if (e.decision === "refusé") return `Roue : lot refusé (${detail})`;
  return `Roue : lot tiré, décision en attente (${detail})`;
}

async function lireFiche(id: string) {
  const r = await fetch(`${AIRTABLE_URL}/${id}`, { headers: auth() });
  if (!r.ok) return null;
  const rec = await r.json();
  if (rec.fields?.["Input CTA Site web"] !== "Roue") return null; // jamais une autre fiche du CRM
  return rec as { id: string; fields: Record<string, unknown> };
}

async function ecrireFiche(id: string, fonction: string, e: Etat) {
  const r = await fetch(`${AIRTABLE_URL}/${id}`, {
    method: "PATCH",
    headers: auth(),
    body: JSON.stringify({
      typecast: true,
      fields: { "Contact - contenue du message": ecrireMessage(fonction, e), "Action à réaliser": actionAFaire(e) },
    }),
  });
  if (!r.ok) throw new Error("Airtable (mise à jour) : " + (await r.text()));
}

const fonctionDe = (rec: { fields: Record<string, unknown> }) => String(rec.fields["Rôle individuel"] ?? "");

// ── Places ──────────────────────────────────────────────────────────────────────
type Places = Record<IdSession, number>; // places prises

/** Places prises par session : lues dans Airtable (source de vérité). Une session refusée libère sa place. */
async function compterPlaces(): Promise<Places> {
  const prises = Object.fromEntries(IDS_SESSION.map((s) => [s, 0])) as Places;
  let offset: string | undefined;
  do {
    const url = new URL(AIRTABLE_URL);
    url.searchParams.set("filterByFormula", `{Input CTA Site web}="Roue"`);
    url.searchParams.append("fields[]", "Contact - contenue du message");
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);
    const r = await fetch(url, { headers: auth() });
    if (!r.ok) throw new Error("Airtable (comptage) : " + (await r.text()));
    const j = await r.json();
    for (const rec of j.records ?? []) {
      const e = lireEtat(rec.fields?.["Contact - contenue du message"]);
      if (e.session && e.decision !== "refusé") prises[e.session]++;
    }
    offset = j.offset;
  } while (offset);
  return prises;
}

const etatStock = (prises: Places) =>
  Object.fromEntries(
    IDS_SESSION.map((s) => [s, { restant: Math.max(0, SESSIONS[s].places - prises[s]), max: SESSIONS[s].places }]),
  );

/** Tirage pondéré par les parts ; le lot « session » ne sort que s'il reste une place dans l'une des deux. */
function tirerLot(prises: Places): IdLot {
  const sessionPossible = IDS_SESSION.some((s) => prises[s] < SESSIONS[s].places);
  const dispo = IDS_LOT.filter((id) => id !== "session" || sessionPossible);
  const total = dispo.reduce((s, id) => s + LOTS[id].parts, 0);
  let t = (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) * total;
  for (const id of dispo) {
    if (t < LOTS[id].parts) return id;
    t -= LOTS[id].parts;
  }
  return "freemium";
}

// ── Les actions ─────────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return refus("methode", 405);

  try {
    const corps = await req.json();
    const action = String(corps.action ?? "");

    if (action === "stock") return json({ stock: etatStock(await compterPlaces()) });

    // ═══ inscrire ═══
    if (action === "inscrire") {
      if (typeof corps.website === "string" && corps.website.trim() !== "") return json({ participant: "recXXXXXXXXXXXXXX" }); // robot
      const nom = String(corps.nom ?? "").trim().slice(0, 120);
      const fonction = String(corps.fonction ?? "").trim().slice(0, 120);
      const mail = String(corps.email ?? "").trim().toLowerCase().slice(0, 254);
      const tel = normaliserTel(String(corps.telephone ?? "").slice(0, 40));
      const chiffres = tel.replace(/\D/g, "");
      if (nom.length < 2) return refus("nom_invalide");
      if (!EMAIL_RE.test(mail)) return refus("email_invalide");
      if (chiffres.length < 8 || chiffres.length > 15) return refus("telephone_invalide");
      if (fonction.length < 2) return refus("fonction_invalide");
      if (corps.rgpd !== true) return refus("consentement_requis");

      // Déjà inscrit (même adresse ou même numéro) : on reprend là où la personne s'était arrêtée.
      const formule = encodeURIComponent(
        `AND({Input CTA Site web}="Roue", OR(LOWER({Mail})="${guillemets(mail)}", {Téléphone}="${guillemets(tel)}"))`,
      );
      const rd = await fetch(`${AIRTABLE_URL}?maxRecords=1&filterByFormula=${formule}`, { headers: auth() });
      if (!rd.ok) throw new Error("Airtable (recherche) : " + (await rd.text()));
      const deja = (await rd.json()).records?.[0];
      if (deja) {
        const e = lireEtat(deja.fields?.["Contact - contenue du message"]);
        if (!e.lot) return json({ participant: deja.id, nom: String(deja.fields["Prénom / Nom"] ?? nom) });
        if (e.decision === "en attente") return json({ participant: deja.id, reprise: e, nom: String(deja.fields["Prénom / Nom"] ?? nom) });
        return json({ deja: true, ...e });
      }

      const res = await fetch(AIRTABLE_URL, {
        method: "POST",
        headers: auth(),
        body: JSON.stringify({
          typecast: true,
          fields: {
            "Prénom / Nom": nom,
            "Mail": mail,
            "Téléphone": tel,
            "Rôle individuel": fonction,
            "Expérience": "Roue événement",
            "Input CTA Site web": "Roue",
            "Lead Type": "Lead Chaud",
            "confidentialité": true,
            "Contact - contenue du message": ecrireMessage(fonction, { lot: null, session: null, decision: null }),
            "Action à réaliser": actionAFaire({ lot: null, session: null, decision: null }),
          },
        }),
      });
      if (!res.ok) throw new Error("Airtable (création) : " + (await res.text()));
      return json({ participant: (await res.json()).id, nom });
    }

    // Les actions suivantes portent sur une fiche déjà créée par « inscrire ».
    const id = String(corps.participant ?? "");
    if (!ID_FICHE.test(id)) return refus("participant_inconnu");
    const fiche = await lireFiche(id);
    if (!fiche) return refus("participant_inconnu", 404);
    const fonction = fonctionDe(fiche);
    const etat = lireEtat(fiche.fields["Contact - contenue du message"]);

    // ═══ tirer ═══
    if (action === "tirer") {
      if (etat.lot) return json({ lot: etat.lot, session: etat.session, reprise: true, stock: etatStock(await compterPlaces()) });
      const prises = await compterPlaces();
      const lot = tirerLot(prises);
      await ecrireFiche(id, fonction, { lot, session: null, decision: "en attente" });
      return json({ lot, stock: etatStock(prises) });
    }

    // ═══ choisir ═══
    if (action === "choisir") {
      const session = String(corps.session ?? "") as IdSession;
      if (etat.lot !== "session") return refus("pas_de_session");
      if (!(session in SESSIONS)) return refus("session_inconnue");
      if (etat.decision !== "en attente") return refus("deja_decide");
      const prises = await compterPlaces();
      // Sa propre réservation ne compte pas contre elle quand elle reconfirme la même session.
      const autres = prises[session] - (etat.session === session ? 1 : 0);
      if (autres >= SESSIONS[session].places) return json({ error: "session_complete", stock: etatStock(prises) }, 409);
      await ecrireFiche(id, fonction, { ...etat, session });
      const apres = { ...prises };
      if (etat.session && etat.session !== session) apres[etat.session]--;
      if (etat.session !== session) apres[session]++;
      return json({ ok: true, stock: etatStock(apres) });
    }

    // ═══ decider ═══
    if (action === "decider") {
      const decision = corps.decision === "accepte" ? "accepté" : corps.decision === "refuse" ? "refusé" : null;
      if (!decision) return refus("decision_invalide");
      if (!etat.lot) return refus("pas_de_lot");
      if (etat.decision !== "en attente") return refus("deja_decide");
      if (etat.lot === "session" && !etat.session) return refus("session_a_choisir");
      await ecrireFiche(id, fonction, { ...etat, decision });
      return json({ ok: true, stock: etatStock(await compterPlaces()) });
    }

    return refus("action_inconnue");
  } catch (e) {
    console.error("roue-participation :", e);
    return refus("enregistrement_impossible", 500);
  }
});
