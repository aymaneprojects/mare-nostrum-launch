import { useEffect } from "react";

/**
 * Empêche la mise en veille de l'écran tant que la page est affichée
 * (écran de salle projeté pendant toute une conférence).
 * Le verrou tombe quand l'onglet est masqué : on le reprend au retour.
 * Navigateurs sans Wake Lock API : sans effet, il faut régler la veille du système.
 */
export function useWakeLock(): void {
  useEffect(() => {
    type Sentinel = { release: () => Promise<void> };
    const nav = navigator as Navigator & { wakeLock?: { request: (type: "screen") => Promise<Sentinel> } };
    if (!nav.wakeLock) return;

    let sentinel: Sentinel | null = null;
    let disposed = false;
    const acquire = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const s = await nav.wakeLock!.request("screen");
        if (disposed) void s.release();
        else sentinel = s;
      } catch { /* refusé (batterie faible, politique du navigateur) */ }
    };
    const onVisible = () => { if (document.visibilityState === "visible") void acquire(); };

    void acquire();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", onVisible);
      void sentinel?.release();
    };
  }, []);
}
