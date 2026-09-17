import { useEffect, useState } from "react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  activatedAt: string | null;
  durationSeconds: number | null;
  /** Le minuteur ne s'affiche que pendant que l'activité est en direct. */
  active: boolean;
  size?: "large" | "small";
  className?: string;
}

/**
 * Compte à rebours indicatif. Il n'arrête pas l'activité : l'animateur garde la
 * main et termine quand il le juge bon.
 */
const Countdown = ({ activatedAt, durationSeconds, active, size = "small", className }: CountdownProps) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!active || !durationSeconds || !activatedAt) return;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [active, durationSeconds, activatedAt]);

  if (!active || !durationSeconds || !activatedAt) return null;

  const end = new Date(activatedAt).getTime() + durationSeconds * 1000;
  const remaining = Math.max(0, Math.ceil((end - now) / 1000));
  const done = remaining === 0;
  const label = remaining >= 60 ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}` : `${remaining} s`;

  return (
    <span
      role="timer"
      aria-live="off"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold tabular-nums",
        size === "large" ? "px-4 py-2 text-2xl md:text-3xl" : "px-3 py-1 text-sm",
        done ? "bg-primary-foreground/10 text-primary-foreground/60" : remaining <= 10 ? "bg-accent text-accent-foreground" : "bg-accent/20 text-primary-foreground",
        className,
      )}
    >
      <Timer className={size === "large" ? "h-6 w-6" : "h-4 w-4"} aria-hidden />
      {done ? "Temps écoulé" : label}
    </span>
  );
};

export default Countdown;
