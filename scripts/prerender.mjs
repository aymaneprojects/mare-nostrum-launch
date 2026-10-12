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

/** Routes qui ne sont pas des pages publiques à livrer en HTML (écrans, jeux, sondes, redirections). */
const EXCLUES = [/^\/live/, /^\/bienvenue-club$/, /^\/roue$/, /^\/unsubscribed$/, /^\/formation$/, /^\/healthz/];

/** Pages publiques à pré-rendre, tirées de src/App.tsx (une seule source de vérité). */
async function routesApp() {
  const app = await readFile(join(RACINE, "src/App.tsx"), "utf8");
  const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((r) => r !== "*" && !r.includes(":") && !EXCLUES.some((x) => x.test(r)));
  if (routes.length < 20) throw new Error(`seulement ${routes.length} routes lues dans App.tsx`);
  return routes;
}

/** Articles de blog publiés (Supabase). Échec non bloquant : le blog reste rendu côté navigateur. */
async function routesBlog() {
  try {
    const env = {};
    for (const f of [".env", ".env.production"]) {
      if (!existsSync(join(RACINE, f))) continue;
      for (const l of (await readFile(join(RACINE, f), "utf8")).split("\n")) {
        const m = l.match(/^(\w+)="?([^"]*)"?$/);
        if (m) env[m[1]] = m[2];
      }
    }
    const url = process.env.VITE_SUPABASE_URL ?? env.VITE_SUPABASE_URL;
    const cle = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const r = await fetch(`${url}/rest/v1/blog_articles?select=slug&is_published=eq.true`, {
      headers: { apikey: cle, Authorization: `Bearer ${cle}` },
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return (await r.json()).map((a) => `/blog/${a.slug}`);
  } catch (e) {
    console.warn(`pré-rendu : articles de blog ignorés (${e.message})`);
    return [];
  }
}

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

  const routes = [...(await routesApp()), ...(await routesEquipe()), ...(await routesBlog())];
  let ok = 0;
  const vides = [];
  const echecs = [];

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

      // Garde-fou : une page sans titre, description ou canonical www ne doit pas partir en ligne.
      const meta = await page.evaluate(() => ({
        titre: document.title.trim(),
        description: document.querySelector('meta[name="description"]')?.content?.trim() ?? "",
        canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
        robots: document.querySelector('meta[name="robots"]')?.content ?? "",
      }));
      const attendu = `https://www.marenostrum.tech${route === "/" ? "/" : route}`;
      const manques = [];
      if (!meta.titre) manques.push("titre");
      if (!meta.description) manques.push("meta description");
      if (meta.canonical !== attendu) manques.push(`canonical (${meta.canonical || "absent"} au lieu de ${attendu})`);
      if (route.startsWith("/blog/") && /noindex/.test(meta.robots)) manques.push("noindex sur un article");
      if (manques.length) {
        echecs.push(`${route} : ${manques.join(", ")}`);
        continue;
      }

      const html = await page.content();
      const mots = await page.evaluate(() => (document.body.innerText || "").trim().split(/\s+/).length);

      const dossier = route === "/" ? DIST : join(DIST, route);
      await mkdir(dossier, { recursive: true });
      await writeFile(join(dossier, "index.html"), html, "utf8");

      if (mots < 50) vides.push(`${route} (${mots} mots)`);
      ok += 1;
    } catch (e) {
      console.warn(`pré-rendu : ${route} a échoué — ${e.message}`);
      echecs.push(`${route} : ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await navigateur.close();
  serveur.close();

  console.log(`pré-rendu : ${ok}/${routes.length} pages écrites`);
  if (vides.length) console.warn(`pré-rendu : pages presque vides — ${vides.join(", ")}`);
  if (echecs.length) {
    // Échec bruyant : mieux vaut une construction qui s'arrête qu'un site publié sans titre ni canonical.
    console.error(`pré-rendu : ${echecs.length} page(s) refusée(s)\n  ${echecs.join("\n  ")}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("pré-rendu : abandonné —", e.message);
  process.exit(1);
});
