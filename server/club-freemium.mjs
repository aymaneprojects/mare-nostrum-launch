#!/usr/bin/env node
/**
 * Inscription Club Freemium : le navigateur n'appelle jamais Airtable.
 * Cet endpoint valide le formulaire, puis crée la ligne avec l'API REST
 * officielle (POST https://api.airtable.com/v0/{base}/{table}).
 *
 * Variables (fichier /etc/club-freemium.env sur le VPS, chmod 600) :
 *   AIRTABLE_API_KEY      jeton personnel Airtable (secret, jamais dans le front)
 *   AIRTABLE_BASE_ID      identifiant de la base, ex. appXXXXXXXXXXXXXX
 *   AIRTABLE_TABLE_NAME   nom exact de la table, défaut club_freemium
 *   RESEND_API_KEY        clé Resend (si absente, l'inscription reste valide)
 *   SLACK_INVITE_URL      lien du bouton Slack dans le mail (défaut : invitation du Club)
 *   PORT                  défaut 8787, écoute seulement en local
 *   AIRTABLE_API_URL      défaut https://api.airtable.com/v0 (réservé aux essais)
 *   RESEND_API_URL        défaut https://api.resend.com/emails (réservé aux essais)
 *
 * Colonnes Airtable, noms exacts, type « ligne de texte » :
 *   email, first_name, company, location
 * location vaut « france » ou « congo_brazzaville ».
 * Un e-mail déjà présent ne crée pas de seconde ligne et ne renvoie pas le mail.
 *
 * Lancement :
 *   node server/club-freemium.mjs
 * Nginx : voir server/README.md
 */

import { createServer } from "node:http";

const PORT = Number(process.env.PORT || 8787);
const CLE = process.env.AIRTABLE_API_KEY || "";
const BASE = process.env.AIRTABLE_BASE_ID || "";
const TABLE = process.env.AIRTABLE_TABLE_NAME || "club_freemium";
const API = (process.env.AIRTABLE_API_URL || "https://api.airtable.com/v0").replace(/\/$/, "");
const RESEND_KEY = process.env.RESEND_API_KEY || "";
const RESEND_URL = process.env.RESEND_API_URL || "https://api.resend.com/emails";
const SLACK_URL = process.env.SLACK_INVITE_URL
  || "https://join.slack.com/t/clubmarenostrum/shared_invite/zt-3k96xxhx1-UjfT8oy4ISyHKScmuqsleg";

// Même courrier que supabase/functions/club-freemium-signup (sans le kit).
const MAIL_BIENVENUE = `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a2238;max-width:560px">
  <p>Bonjour,</p>
  <p>Nous sommes ravis de vous compter parmi les membres du Club Mare Nostrum.</p>
  <p>Pour rejoindre l’espace digital du Club et commencer à échanger avec la communauté, merci de vous inscrire en cliquant sur le lien ci-dessous :</p>
  <p style="margin:0 0 24px"><a href="${SLACK_URL}" style="display:inline-block;background:#3fd0d4;color:#101a3a;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:999px">Rejoindre l’espace digital du Club Mare Nostrum</a></p>
  <p>N’hésitez pas à nous solliciter via la messagerie interne pour toute question.</p>
  <p>Au plaisir de vous retrouver très bientôt,</p>
  <p>L’équipe Mare Nostrum</p>
</div>`.trim();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIEUX = new Set(["france", "congo_brazzaville"]);
const ORIGINES = new Set([
  "https://www.marenostrum.tech",
  "https://marenostrum.tech",
  "https://niteo.marenostrum.tech",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
]);

const fenetre = new Map();

function json(res, status, body, origine) {
  const headers = { "Content-Type": "application/json; charset=utf-8" };
  if (origine && ORIGINES.has(origine)) {
    headers["Access-Control-Allow-Origin"] = origine;
    headers["Vary"] = "Origin";
    headers["Access-Control-Allow-Headers"] = "content-type";
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
  }
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

function lireCorps(req) {
  return new Promise((resolve, reject) => {
    const morceaux = [];
    let taille = 0;
    req.on("data", (b) => {
      taille += b.length;
      if (taille > 4096) {
        reject(Object.assign(new Error("trop gros"), { status: 413 }));
        req.destroy();
        return;
      }
      morceaux.push(b);
    });
    req.on("end", () => resolve(Buffer.concat(morceaux).toString("utf8")));
    req.on("error", reject);
  });
}

function tropSouvent(ip) {
  const maintenant = Date.now();
  const hits = (fenetre.get(ip) || []).filter((t) => maintenant - t < 10 * 60_000);
  if (hits.length >= 8) {
    fenetre.set(ip, hits);
    return true;
  }
  hits.push(maintenant);
  fenetre.set(ip, hits);
  return false;
}

function urlTable() {
  return `${API}/${encodeURIComponent(BASE)}/${encodeURIComponent(TABLE)}`;
}

async function airtable(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${CLE}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(12_000),
  });
  const texte = await res.text();
  let data = null;
  try { data = texte ? JSON.parse(texte) : null; } catch { data = { brut: texte.slice(0, 300) }; }
  return { ok: res.ok, status: res.status, data };
}

async function envoyerBienvenue(to) {
  if (!RESEND_KEY) {
    console.error("Mail de bienvenue freemium non envoyé: RESEND_API_KEY absente");
    return;
  }
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_KEY}` },
    body: JSON.stringify({
      from: "Club Mare Nostrum <no-reply@marenostrum.tech>",
      reply_to: "contact@marenostrum.tech",
      to: [to],
      subject: "Bienvenue au sein du Club Mare Nostrum !",
      html: MAIL_BIENVENUE,
    }),
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) throw new Error(`Resend: ${res.status} ${await res.text()}`);
}

async function dejaInscrit(email) {
  const formule = `LOWER({email})='${email.replace(/'/g, "''")}'`;
  const url = `${urlTable()}?maxRecords=1&filterByFormula=${encodeURIComponent(formule)}`;
  const res = await airtable("GET", url);
  if (!res.ok) {
    const err = new Error(`Airtable lecture ${res.status}`);
    err.detail = res.data;
    throw err;
  }
  return Array.isArray(res.data?.records) && res.data.records.length > 0;
}

async function creer(champs) {
  const res = await airtable("POST", urlTable(), {
    records: [{ fields: champs }],
    typecast: true,
  });
  if (!res.ok) {
    const err = new Error(`Airtable écriture ${res.status}`);
    err.detail = res.data;
    throw err;
  }
  return res.data?.records?.[0]?.id || null;
}

const server = createServer(async (req, res) => {
  const origine = req.headers.origin || "";
  const url = new URL(req.url || "/", "http://127.0.0.1");

  if (req.method === "OPTIONS") {
    json(res, 204, {}, origine);
    return;
  }

  if (req.method === "GET" && (url.pathname === "/healthz" || url.pathname === "/api/club-freemium/healthz")) {
    const pret = Boolean(CLE && BASE && TABLE);
    json(res, pret ? 200 : 503, { ok: pret }, origine);
    return;
  }

  const estInscription = req.method === "POST" && (url.pathname === "/api/club-freemium" || url.pathname === "/");
  if (!estInscription) {
    json(res, 404, { error: "Introuvable." }, origine);
    return;
  }

  if (!CLE || !BASE || !TABLE) {
    console.error("club-freemium: AIRTABLE_API_KEY, AIRTABLE_BASE_ID ou AIRTABLE_TABLE_NAME manquant");
    json(res, 503, { error: "Service indisponible." }, origine);
    return;
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  if (tropSouvent(ip)) {
    json(res, 429, { error: "Trop d'essais. Réessaie dans quelques minutes." }, origine);
    return;
  }

  try {
    const brut = await lireCorps(req);
    const body = brut ? JSON.parse(brut) : {};
    const prenom = String(body?.prenom ?? "").trim().slice(0, 100);
    const email = String(body?.email ?? "").trim().toLowerCase().slice(0, 254);
    const projet = String(body?.entreprise ?? "").trim().slice(0, 200);
    const lieu = LIEUX.has(body?.location) ? body.location : "";

    if (!prenom || !EMAIL_RE.test(email) || !lieu) {
      json(res, 400, { error: "Champs invalides." }, origine);
      return;
    }

    if (await dejaInscrit(email)) {
      json(res, 200, { ok: true }, origine);
      return;
    }

    const id = await creer({
      email,
      first_name: prenom,
      company: projet,
      location: lieu,
    });
    console.log("club-freemium: ligne créée", id || "(sans id)");
    try {
      await envoyerBienvenue(email);
    } catch (e) {
      console.error("Mail de bienvenue freemium non envoyé:", e?.message || e);
    }
    json(res, 200, { ok: true }, origine);
  } catch (e) {
    if (e?.status === 413) {
      json(res, 413, { error: "Requête trop volumineuse." }, origine);
      return;
    }
    if (e instanceof SyntaxError) {
      json(res, 400, { error: "Requête invalide." }, origine);
      return;
    }
    console.error("club-freemium:", e?.message || e, e?.detail ? JSON.stringify(e.detail).slice(0, 400) : "");
    json(res, 502, { error: "Erreur temporaire." }, origine);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`club-freemium écoute sur 127.0.0.1:${PORT}`);
});
