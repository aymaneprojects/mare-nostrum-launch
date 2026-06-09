import { useEffect, useState } from "react";

interface Props {
  value: string;   // ex: "24", "95%", "2000", "135+"
  inView: boolean;
  duration?: number;
  className?: string;
}

export default function CountUpNumber({ value, inView, duration = 1400, className }: Props) {
  const suffix = value.replace(/[0-9]/g, "");
  const target  = parseInt(value.replace(/\D/g, ""), 10);
  const [count, setCount] = useState(0);
  const [done, setDone]   = useState(false);

  useEffect(() => {
    if (!inView || done) return;
    setDone(true);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, done]);

  return <span className={className}>{count}{suffix}</span>;
}
