import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EVT, track, trackPageView } from "@/lib/analytics";

/**
 * Envoie une page vue à chaque changement d'adresse, plus deux mesures de
 * parcours demandées à l'audit d'octobre 2026 : quel bouton est cliqué, et
 * jusqu'à quelle section le visiteur descend.
 *
 * Le site est une application à page unique : le navigateur ne recharge rien
 * quand on navigue, donc sans cet appel seule la toute première page d'une
 * visite serait comptée - ce qui était le cas jusqu'ici.
 *
 * Exclus : /healthz (sonde technique) et /live (écrans projetés en salle, qui
 * resteraient ouverts des heures et fausseraient toutes les moyennes).
 *
 * Tout passe par gtag, donc rien ne part sans le consentement du visiteur.
 */
const EXCLUS = [/^\/healthz$/, /^\/live(\/|$)/];
const exclu = (path: string) => EXCLUS.some((motif) => motif.test(path));

// Laisse le temps aux pages chargées à la demande d'afficher leurs sections.
// ponytail: une section ajoutée plus tard (onglet, chargement lent) n'est pas
// observée ; passer à un MutationObserver si les rapports montrent des trous.
const DELAI_SECTIONS_MS = 1500;

export function useAnalyticsPageView(): void {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (exclu(pathname)) return;
    // Laisse React poser le titre du document avant de l'envoyer.
    const t = window.setTimeout(() => trackPageView(pathname + search, document.title), 0);
    return () => window.clearTimeout(t);
  }, [pathname, search]);

  // Clics : un seul écouteur pour tout le site, plutôt qu'un appel par bouton.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (exclu(window.location.pathname)) return;
      const el = (e.target as Element | null)?.closest?.("a, button");
      if (!el) return;
      const label = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
      if (!label) return;
      track(EVT.ctaClick, {
        cta_label: label,
        cta_href: el instanceof HTMLAnchorElement ? el.getAttribute("href") ?? undefined : undefined,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Sections vues : chacune comptée une fois par page vue.
  useEffect(() => {
    if (exclu(pathname) || typeof IntersectionObserver === "undefined") return;
    let observer: IntersectionObserver | undefined;
    const t = window.setTimeout(() => {
      const vues = new Set<Element>();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || vues.has(entry.target)) continue;
          vues.add(entry.target);
          observer?.unobserve(entry.target);
          track(EVT.sectionView, {
            section: entry.target.getAttribute("aria-label") || entry.target.id,
            page_path: pathname,
          });
        }
        // Comptée dès qu'elle atteint le milieu de l'écran : un seuil en pourcentage
        // ne se déclencherait jamais pour une section plus haute que deux écrans.
      }, { rootMargin: "0px 0px -50% 0px" });
      document.querySelectorAll("section[aria-label], section[id]").forEach((s) => observer?.observe(s));
    }, DELAI_SECTIONS_MS);
    return () => {
      window.clearTimeout(t);
      observer?.disconnect();
    };
  }, [pathname]);
}
