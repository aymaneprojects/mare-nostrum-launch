/**
 * Écrit public/version.json : l'empreinte exacte du code qui est buildé.
 *
 * Servi en production à l'adresse /version.json, il permet de savoir quelle
 * version est en ligne, et à deploy-vps.sh de refuser de publier un code plus
 * ancien que celui déjà en ligne.
 *
 * Pourquoi : le 18/09/2026, un build fait depuis une copie du dépôt figée au
 * 7 septembre a été déployé et a effacé onze jours de travail en production.
 *
 * Lancé automatiquement avant chaque `npm run build` (hook prebuild).
 */
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const git = (cmd) => {
  try { return execSync(`git ${cmd}`, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); }
  catch { return ""; }
};

const version = {
  commit: git("rev-parse --short HEAD") || "inconnu",
  // Date du commit (et non du build) : c'est elle qui dit si le code est récent.
  commit_date: git("log -1 --format=%cI") || null,
  // Des fichiers modifiés non commités = build fait à partir d'un état qui n'existe nulle part ailleurs.
  dirty: git("status --porcelain --untracked-files=no -- src public index.html package.json") !== "",
  built_at: new Date().toISOString(),
};

writeFileSync(join(ROOT, "public/version.json"), JSON.stringify(version, null, 2) + "\n");
console.log(`version : ${version.commit} du ${version.commit_date}${version.dirty ? " (modifications non commitées)" : ""}`);
