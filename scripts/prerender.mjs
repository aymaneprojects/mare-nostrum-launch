/**
 * Pré-rendu des pages publiques.
 *
 * Le site est une application à page unique : le HTML livré est vide, tout est
 * construit par JavaScript dans le navigateur. Or les robots d'indexation et
 * surtout les moteurs de réponse (ChatGPT, Perplexity, Gemini) n'exécutent pas
 * JavaScript. Mesuré le 6 octobre 2026 : 11 mots dans le HTML brut de l'accueil,
 * et un audit GEO à 58/100 dont le premier reproche était celui-là.
 *
 * Ce script ouvre chaque page dans Chrome après la construction, attend que
 * React ait fini, et écrit le HTML obtenu dans dist/<route>/index.html. nginx
 * sert alors ce fichier, et React reprend la main côté visiteur.
 *
 * Exclus volontairement : /live (écrans de conférence) et /healthz (sonde).
 *
 * Lancé par `npm run build`. Désactivable avec SKIP_PRERENDER=1.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(RACINE, "dist");
const PORT = 4199;

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".pdf": "application/pdf",
  ".vcf": "text/vcard", ".txt": "text/plain", ".xml": "text/xml",
};

/** Pages publiques à pré-rendre. Une entrée = un fichier HTML livré. */
const ROUTES = [
  "/", "/education", "/expertise", "/mastermind", "/mastermind-digital", "/initiation-ia",
  "/agent-ia-marketing", "/logiciel-ia", "/club", "/offre-ia", "/engagement-rse", "/a-propos",
  "/a-propos/partenaire", "/contact", "/equipe", "/blog", "/livre-entrepreneuriat",
  "/diagnostic", "/niteo-toulouse", "/iter",
  "/ecoles/transformation-entrepreneuriale", "/ecoles/diagnostic-gratuit",
  "/entrepreneurs/accompagnement-francophonie-afrique",
  "/entrepreneurs/test-maturite-projet", "/entrepreneurs/mentorat-individuel",
  "/mag/entrepreneuriat-social-francophonie",
  "/mag/innovation-pedagogique-entrepreneuriat",
  "/mag/impact-mesure-startup",
  "/mentions-legales", "/cgu", "/cgv", "/confidentialite",
];

/** Les fiches de visite, une par membre de l'équipe. */
async function routesEquipe() {
  try {
    const equipe = JSON.parse(await readFile(join(RACINE, "src/data/team.json"), "utf8"));
    return equipe.map((m) => `/equipe/${m.slug}`);
  } catch {
    return [];
  }
}

/** Serveur statique minimal, avec le repli de l'application à page unique. */
function servir() {
  return createServer(async (req, res) => {
    const chemin = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let fichier = join(DIST, chemin);
    if (!extname(fichier) || !existsSync(fichier)) fichier = join(DIST, "index.html");
    try {
      const contenu = await readFile(fichier);
      res.writeHead(200, { "Content-Type": TYPES[extname(fichier)] ?? "application/octet-stream" });
      res.end(contenu);
    } catch {
      res.writeHead(404).end();
    }
  }).listen(PORT);
}

async function main() {
  if (process.env.SKIP_PRERENDER === "1") {
    console.log("pré-rendu : ignoré (SKIP_PRERENDER=1)");
    return;
  }
  if (!existsSync(CHROME)) {
    console.warn(`pré-rendu : Chrome introuvable (${CHROME}) — étape ignorée.`);
    return;
  }

  const serveur = servir();
  const navigateur = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const routes = [...ROUTES, ...(await routesEquipe())];
  let ok = 0;
  let vides = [];

  for (const route of routes) {
    const page = await navigateur.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`http://127.0.0.1:${PORT}${route}`, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });
      // Les sections apparaissent au défilement : on force leur révélation pour
      // que le HTML livré contienne tout le texte, pas seulement le haut de page.
      await page.evaluate(() => {
        document.querySelectorAll("[style*='opacity']").forEach((el) => {
          if (el.style.opacity === "0") {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        });
      });

      const html = await page.content();
      const mots = await page.evaluate(() => (document.body.innerText || "").trim().split(/\s+/).length);

      const dossier = route === "/" ? DIST : join(DIST, route);
      await mkdir(dossier, { recursive: true });
      await writeFile(join(dossier, "index.html"), html, "utf8");

      if (mots < 50) vides.push(`${route} (${mots} mots)`);
      ok += 1;
    } catch (e) {
      console.warn(`pré-rendu : ${route} a échoué — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await navigateur.close();
  serveur.close();

  console.log(`pré-rendu : ${ok}/${routes.length} pages écrites`);
  if (vides.length) console.warn(`pré-rendu : pages presque vides — ${vides.join(", ")}`);
}

main().catch((e) => {
  // Le pré-rendu ne doit jamais faire échouer une mise en ligne : sans lui, le
  // site fonctionne comme avant, il est seulement moins lisible par les robots.
  console.error("pré-rendu : abandonné —", e.message);
  process.exit(0);
});
