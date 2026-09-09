/**
 * Cartes de visite digitales — génération des fichiers statiques.
 *
 * Lit `src/data/team.json` et produit, pour chaque membre :
 *   public/vcards/<slug>.vcf   — contact standard (vCard 3.0), ouvert nativement
 *                                par iPhone, Android, Outlook, Gmail…
 *   public/qr/<slug>.png       — QR code 1024 px vers la fiche, pour écran et badge
 *   public/qr/<slug>.svg       — même QR en vectoriel, pour l'impression
 * Et pour l'équipe entière :
 *   public/vcards/equipe.vcf   — tous les contacts en un seul fichier
 *   public/qr/equipe.png|svg   — QR vers la page /equipe
 *
 * Lancé automatiquement avant chaque `npm run build` (hook `prebuild`).
 * Lancement manuel : `npm run cards`.
 *
 * Pour ajouter un collègue : une entrée dans team.json, un portrait dans
 * src/assets/team/<photo>.png, puis `npm run cards`. Rien d'autre.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import QRCode from "qrcode";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.marenostrum.tech";
const ORG = "Mare Nostrum";

// Adresses par bureau. Seul le siège toulousain a une adresse postale publique.
const ADDRESSES = {
  Toulouse:   { street: "22 rue Maurice Fonvieille", city: "Toulouse",   zip: "31000", country: "France" },
  Paris:      { street: "",                          city: "Paris",      zip: "",      country: "France" },
  Casablanca: { street: "",                          city: "Casablanca", zip: "",      country: "Maroc"  },
};

const QR_OPTIONS = {
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#24335D", light: "#FFFFFF" }, // Nuit sur blanc — contraste suffisant pour le scan
};

// ── vCard ──────────────────────────────────────────────────────────────────

/** Échappe les caractères réservés d'une valeur vCard (RFC 2426). */
const esc = (value) =>
  String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

/** Replie une ligne à 75 octets max, suite sur la ligne suivante précédée d'un espace. */
function fold(line) {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out = [];
  let start = 0;
  let limit = 75;
  while (start < bytes.length) {
    let end = Math.min(start + limit, bytes.length);
    // ne pas couper au milieu d'un caractère UTF-8 multi-octets
    while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    out.push(bytes.subarray(start, end).toString("utf8"));
    start = end;
    limit = 74; // les lignes de continuation commencent par un espace
  }
  return out.join("\r\n ");
}

const digits = (tel) => String(tel ?? "").replace(/[^\d+]/g, "");

function vcard(m) {
  const fullName = `${m.prenom} ${m.nom}`;
  const addr = ADDRESSES[m.bureau] ?? { street: "", city: m.bureau ?? "", zip: "", country: "" };
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(m.nom)};${esc(m.prenom)};;;`,
    `FN:${esc(fullName)}`,
    `ORG:${esc(ORG)}`,
  ];
  if (m.titre) lines.push(`TITLE:${esc(m.titre)}`);
  if (m.telephone) lines.push(`TEL;TYPE=CELL,VOICE:${digits(m.telephone)}`);
  if (m.whatsapp && digits(m.whatsapp) !== digits(m.telephone)) {
    lines.push(`TEL;TYPE=CELL:${digits(m.whatsapp)}`);
  }
  if (m.email) lines.push(`EMAIL;TYPE=INTERNET,WORK:${m.email}`);
  lines.push(`ADR;TYPE=WORK:;;${esc(addr.street)};${esc(addr.city)};;${esc(addr.zip)};${esc(addr.country)}`);
  lines.push(`URL;TYPE=WORK:${SITE}`);
  if (m.linkedin) {
    lines.push(`URL;TYPE=LinkedIn:${m.linkedin}`);
    lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${m.linkedin}`); // reconnu par iOS / macOS
  }
  lines.push(`NOTE:${esc(`Fiche contact : ${SITE}/equipe/${m.slug}`)}`);
  lines.push("END:VCARD");
  return lines.map(fold).join("\r\n") + "\r\n";
}

// ── Génération ─────────────────────────────────────────────────────────────

async function main() {
  const team = JSON.parse(readFileSync(join(ROOT, "src/data/team.json"), "utf8"));
  const vcardDir = join(ROOT, "public/vcards");
  const qrDir = join(ROOT, "public/qr");
  mkdirSync(vcardDir, { recursive: true });
  mkdirSync(qrDir, { recursive: true });

  const seen = new Set();
  for (const m of team) {
    for (const field of ["slug", "prenom", "nom"]) {
      if (!m[field]) throw new Error(`team.json : champ "${field}" manquant pour ${JSON.stringify(m)}`);
    }
    if (!/^[a-z0-9-]+$/.test(m.slug)) throw new Error(`team.json : slug invalide "${m.slug}" (minuscules, chiffres, tirets)`);
    if (seen.has(m.slug)) throw new Error(`team.json : slug en double "${m.slug}"`);
    seen.add(m.slug);

    const url = `${SITE}/equipe/${m.slug}`;
    writeFileSync(join(vcardDir, `${m.slug}.vcf`), vcard(m), "utf8");
    await QRCode.toFile(join(qrDir, `${m.slug}.png`), url, { ...QR_OPTIONS, width: 1024 });
    writeFileSync(join(qrDir, `${m.slug}.svg`), await QRCode.toString(url, { ...QR_OPTIONS, type: "svg" }), "utf8");
  }

  // Toute l'équipe en un fichier
  writeFileSync(join(vcardDir, "equipe.vcf"), team.map(vcard).join(""), "utf8");
  const teamUrl = `${SITE}/equipe`;
  await QRCode.toFile(join(qrDir, "equipe.png"), teamUrl, { ...QR_OPTIONS, width: 1024 });
  writeFileSync(join(qrDir, "equipe.svg"), await QRCode.toString(teamUrl, { ...QR_OPTIONS, type: "svg" }), "utf8");

  console.log(`cartes : ${team.length} membre(s) → ${team.length + 1} vCard, ${(team.length + 1) * 2} QR codes`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
