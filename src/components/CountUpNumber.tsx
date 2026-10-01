import { useEffect, useState } from "react";

interface Props {
  value: string;   // ex: "24", "95%", "2000", "135+"
  inView: boolean;
  duration?: number;
  className?: string;
}

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CountUpNumber({ value, inView, duration = 1400, className }: Props) {
  const suffix = value.replace(/[0-9]/g, "");
  const target  = parseInt(value.replace(/\D/g, ""), 10);
  const [count, setCount] = useState(prefersReducedMotion ? target : 0);
  const [done, setDone]   = useState(prefersReducedMotion);

  // Filet : si la section n'est toujours pas atteinte au bout d'une seconde et
  // demie, on affiche directement la valeur. Sans cela, un visiteur qui ne
  // défile pas jusque-là voit « 0+ » — ce qui dit exactement le contraire de ce
  // que le chiffre est censé prouver.
  useEffect(() => {
    if (inView || done || prefersReducedMotion) return;
    const t = window.setTimeout(() => {
      setCount(target);
      setDone(true);
    }, 1500);
    return () => window.clearTimeout(t);
  }, [inView, done, target]);

  useEffect(() => {
    if (!inView || done || prefersReducedMotion) return;
    setDone(true);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, done]);

  return <span className={className}>{count}{suffix}</span>;
}
