import fs from "fs";
const OUT = "/Users/aymaneabdennour/Desktop/marenostrum-siteweb/design/roue/";
// Constantes reprises de src/pages/Roue.tsx
const LOTS = {
  session:  { roue: "Session",  fond: "ivory",     texte: "nuit" },
  club6:    { roue: "6 mois",   fond: "ocre",      texte: "ink" },
  club3:    { roue: "3 mois",   fond: "turquoise", texte: "ink" },
  freemium: { roue: "Freemium", fond: "nuit",      texte: "ivory" },
};
const { session: SESSION, club6: CLUB6, club3: CLUB3, freemium: FREEMIUM } = LOTS;
const PARTS = [
  FREEMIUM, CLUB3, FREEMIUM, CLUB6, FREEMIUM, CLUB3, FREEMIUM, SESSION,
  FREEMIUM, CLUB6, FREEMIUM, CLUB3, CLUB6, CLUB3, SESSION,
];
const ANGLE_PART = 360 / PARTS.length;
const TAILLE = 600, C = TAILLE / 2, R = 268;
const point = (angle, rayon) => { const a = angle * Math.PI / 180; return { x: C + rayon * Math.sin(a), y: C - rayon * Math.cos(a) }; };
const f = (n) => +n.toFixed(3);
const chemin = (i) => {
  const p0 = point(i * ANGLE_PART, R), p1 = point((i + 1) * ANGLE_PART, R);
  return `M ${C} ${C} L ${f(p0.x)} ${f(p0.y)} A ${R} ${R} 0 0 1 ${f(p1.x)} ${f(p1.y)} Z`;
};
let svg = `<svg class="roue" viewBox="0 0 ${TAILLE} ${TAILLE}" role="img" aria-label="Roue de la chance">\n`;
svg += `  <circle cx="${C}" cy="${C}" r="${R + 24}" class="f-ivory"/>\n`;
for (let i = 0; i < 30; i++) { const p = point(i * 12, R + 12); svg += `  <circle cx="${f(p.x)}" cy="${f(p.y)}" r="4.5" class="${i % 2 ? "f-turquoise" : "f-ocre"}"/>\n`; }
PARTS.forEach((lot, i) => {
  const milieu = i * ANGLE_PART + ANGLE_PART / 2;
  svg += `  <g><path d="${chemin(i)}" class="part f-${lot.fond}"/>\n    <g transform="rotate(${f(milieu - 90)} ${C} ${C})"><text x="${C + R - 22}" y="${C + 9}" text-anchor="end" class="lib f-${lot.texte}">${lot.roue}</text></g></g>\n`;
});
svg += `  <circle cx="${C}" cy="${C}" r="54" class="moyeu"/>\n  <circle cx="${C}" cy="${C}" r="16" class="f-turquoise"/>\n</svg>`;

const pointeur = `<svg class="pointeur" viewBox="0 0 60 70" aria-hidden="true"><path d="M30 68 L4 14 A30 30 0 0 1 56 14 Z" class="f-ivory"/><circle cx="30" cy="22" r="7" class="f-ocre"/></svg>`;

const page = (titre, classeTitre, h1) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${titre}</title>
<link rel="stylesheet" href="affiche-roue.css">
</head>
<body>
<main class="affiche">
  <div class="rayures" aria-hidden="true"></div>
  <div class="halo" aria-hidden="true"></div>
  <img class="logo" src="../../src/assets/logo.png" alt="Mare Nostrum">
  <h1 class="${classeTitre}">${h1}</h1>
  <div class="scene">
    ${pointeur}
    ${svg.replace(/\n/g, "\n    ")}
  </div>
  <p class="site">marenostrum.tech</p>
</main>
</body>
</html>
`;
fs.writeFileSync(OUT + "affiche-roue-venez-jouer.html", page("Affiche A3 : Venez jouer", "court", "Venez jouer"));
fs.writeFileSync(OUT + "affiche-roue-venez-jouer-et-gagner.html", page("Affiche A3 : Venez jouer et gagner", "long", "Venez jouer et gagner jusqu’à&nbsp;210&nbsp;€"));
