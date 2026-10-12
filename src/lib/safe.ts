/** Garde-fous partagés : stockage local, e-mail, assainissement du HTML. */

export const lireStockage = (cle: string): string | null => {
  try { return localStorage.getItem(cle); } catch { return null; }
};

export const ecrireStockage = (cle: string, valeur: string): void => {
  try { localStorage.setItem(cle, valeur); } catch { /* stockage indisponible : non bloquant */ }
};

export const lireJson = <T,>(cle: string): T | null => {
  try {
    const brut = lireStockage(cle);
    return brut ? (JSON.parse(brut) as T) : null;
  } catch { return null; }
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const emailValide = (v: string): boolean => EMAIL_RE.test(v.trim());

const BALISES = new Set([
  "A", "B", "STRONG", "I", "EM", "U", "S", "BR", "P", "SPAN", "DIV", "UL", "OL", "LI", "H1", "H2", "H3", "H4", "H5", "H6",
  "BLOCKQUOTE", "CODE", "PRE", "HR", "IMG", "FIGURE", "FIGCAPTION", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "SUB", "SUP", "SMALL", "MARK",
  "DETAILS", "SUMMARY", "ASIDE", "SECTION", "ARTICLE", "DL", "DT", "DD", "CAPTION", "TFOOT", "COLGROUP", "COL", "ABBR", "DEL", "INS", "Q", "CITE", "TIME", "PICTURE", "SOURCE",
]);
const ATTRS: Record<string, string[]> = {
  A: ["href", "title", "target", "rel"],
  IMG: ["src", "srcset", "sizes", "alt", "title", "width", "height", "loading"],
  SOURCE: ["srcset", "sizes", "media", "type"],
  TD: ["colspan", "rowspan"], TH: ["colspan", "rowspan", "scope"],
  DETAILS: ["open"], TIME: ["datetime"],
  "*": ["class", "id", "lang", "style"],
};
const URL_OK = /^(https?:|mailto:|tel:|\/|#|\.\/|\.\.\/)/i;

/** Un lien n'est gardé que s'il est http(s), mailto, tel ou relatif. */
export const urlSure = (u: string): boolean => {
  // eslint-disable-next-line no-control-regex
  const s = u.trim().replace(/[\u0000- ]/g, "");
  return s === "" || URL_OK.test(s) || !/^[a-z][a-z0-9+.-]*:/i.test(s);
};

/** Filtre à liste blanche (balises, attributs, schémas d'URL). Sans navigateur : texte échappé. */
export function assainirHtml(html: string): string {
  if (typeof DOMParser === "undefined") return html.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const nettoyer = (noeud: Element) => {
    for (const enfant of Array.from(noeud.children)) {
      if (!BALISES.has(enfant.tagName)) { enfant.remove(); continue; }
      const permis = [...(ATTRS[enfant.tagName] ?? []), ...ATTRS["*"]];
      for (const a of Array.from(enfant.attributes)) {
        const n = a.name.toLowerCase();
        const ok = (permis.includes(n) || n.startsWith("data-") || n.startsWith("aria-")) && (n !== "href" && n !== "src" || urlSure(a.value));
        if (!ok) enfant.removeAttribute(a.name);
      }
      if (enfant.tagName === "A" && enfant.getAttribute("target") === "_blank") {
        enfant.setAttribute("rel", "noopener noreferrer");
      }
      nettoyer(enfant);
    }
  };
  nettoyer(doc.body);
  return doc.body.innerHTML;
}
