import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Envoie une page vue à chaque changement d'adresse.
 *
 * Le site est une application à page unique : le navigateur ne recharge rien
 * quand on navigue, donc sans cet appel seule la toute première page d'une
 * visite serait comptée — ce qui était le cas jusqu'ici.
 *
 * Exclus : /healthz (sonde technique) et /live (écrans projetés en salle, qui
 * resteraient ouverts des heures et fausseraient toutes les moyennes).
 */
const EXCLUS = [/^\/healthz$/, /^\/live(\/|$)/];

export function useAnalyticsPageView(): void {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (EXCLUS.some((motif) => motif.test(pathname))) return;
    // Laisse React poser le titre du document avant de l'envoyer.
    const t = window.setTimeout(() => trackPageView(pathname + search, document.title), 0);
    return () => window.clearTimeout(t);
  }, [pathname, search]);
}
