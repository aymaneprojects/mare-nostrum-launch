import { useEffect, useRef } from "react";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useFadeIn(delay = 0) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    el.classList.add("fade-up");

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("is-visible"), delay);
          obs.disconnect();
        }
      },
      // rootMargin : on révèle 900 px AVANT que la section n'entre à l'écran.
      // Sans cette avance, un défilement rapide laisse un écran blanc le temps
      // du fondu — le visiteur croit que la page est vide.
      { threshold: 0.01, rootMargin: "900px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return ref;
}
