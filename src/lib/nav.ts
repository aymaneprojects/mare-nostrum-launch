/** Page courante = lien, ou une sous-page de ce lien (/blog/mon-article reste dans « Blog »). */
export const estActif = (pathname: string, to: string) =>
  to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");

/** Pages qui n'ont pas de lien propre dans la navigation : elles activent leur lien parent. */
const PARENT: Record<string, string[]> = {
  "/education": ["/mastermind", "/mastermind-digital", "/initiation-ia", "/agent-ia-marketing", "/offre-ia", "/ecoles", "/entrepreneurs"],
  "/club": ["/bienvenue-club", "/diagnostic"],
  "/a-propos": ["/equipe"],
  "/blog": ["/mag"],
};

/** Barre mobile : seulement 5 onglets, donc le conseil et l'incubation se rangent sous « Éducation ». */
const PARENT_MOBILE: Record<string, string[]> = {
  "/education": ["/expertise", "/niteo-toulouse"],
};

export const lienActif = (pathname: string, to: string, mobile = false) =>
  estActif(pathname, to) ||
  [...(PARENT[to] ?? []), ...(mobile ? PARENT_MOBILE[to] ?? [] : [])].some((p) => estActif(pathname, p));
