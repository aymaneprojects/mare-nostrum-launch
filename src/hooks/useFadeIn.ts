import { useEffect, useRef } from "react";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Avance de révélation : la section apparaît avant d'entrer à l'écran, sinon un
 *  défilement rapide laisse un blanc le temps du fondu. */
const AVANCE_PX = 900;
/** Filet de sécurité : au-delà, on révèle quoi qu'il arrive. Rien ne doit pouvoir
 *  rester invisible — c'est pire que pas d'animation du tout. */
const SECOURS_MS = 1200;

/**
 * Apparition au défilement : opacité et léger glissement, courbe d'entrée --ease-out-expo.
 *
 * Le style est posé **directement sur l'élément**, pas par une classe CSS : une
 * classe ajoutée en JavaScript est effacée au premier rendu de React, qui
 * réécrit l'attribut `class` depuis le JSX. L'effet ne jouait donc jamais.
 */
export function useFadeIn(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.5s var(--ease-out-expo), transform 0.6s var(--ease-out-expo)";

    let fait = false;
    const reveler = () => {
      if (fait) return;
      fait = true;
      window.setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "none";
      }, delay);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        // On révèle aussi une section déjà dépassée (bord supérieur au-dessus de
        // l'écran) : en sautant directement en bas de page — lien d'ancre, retour
        // arrière — elle n'entre jamais à l'écran et resterait invisible.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          reveler();
          obs.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: `${AVANCE_PX}px 0px` },
    );
    obs.observe(el);

    const secours = window.setTimeout(() => {
      reveler();
      obs.disconnect();
    }, SECOURS_MS);

    return () => {
      window.clearTimeout(secours);
      obs.disconnect();
    };
  }, [delay]);

  return ref;
}
