import { useEffect, type RefObject } from "react";

const FOCALISABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Piège le focus clavier dans `ref` tant que `actif` est vrai : le focus entre dans la
 * boîte à l'ouverture, Tab / Maj+Tab y restent, et il retourne à l'élément d'origine à la fermeture.
 */
export function useFocusTrap(actif: boolean, ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const boite = ref.current;
    if (!actif || !boite) return;
    const origine = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const liste = () => Array.from(boite.querySelectorAll<HTMLElement>(FOCALISABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement);

    (liste()[0] ?? boite).focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = liste();
      if (f.length === 0) { e.preventDefault(); return; }
      const premier = f[0], dernier = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === premier || !boite.contains(document.activeElement))) { e.preventDefault(); dernier.focus(); }
      else if (!e.shiftKey && (document.activeElement === dernier || !boite.contains(document.activeElement))) { e.preventDefault(); premier.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      origine?.focus({ preventScroll: true });
    };
  }, [actif, ref]);
}
