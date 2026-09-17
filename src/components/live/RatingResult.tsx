import { Star } from "lucide-react";
import type { PollResult } from "@/hooks/useLiveVotes";
import { cn } from "@/lib/utils";

interface RatingResultProps {
  results: PollResult[];
  total: number;
  average: number;
  variant?: "screen" | "half" | "compact";
}

/** Note de satisfaction : moyenne en grand, répartition de 5 à 1 étoiles. */
const RatingResult = ({ results, total, average, variant = "screen" }: RatingResultProps) => {
  const big = variant === "screen";
  const compact = variant === "compact";
  const rounded = Math.round(average * 10) / 10;

  return (
    <div className={cn("grid items-center gap-8", !compact && "md:grid-cols-[auto_1fr] md:gap-16")}>
      <div className="text-center">
        <p className={cn("font-editorial font-semibold italic leading-none text-primary-foreground", big ? "text-8xl md:text-9xl" : compact ? "text-5xl" : "text-7xl")}>
          {total ? rounded.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "—"}
          <span className={cn("ml-2 font-sans not-italic text-primary-foreground/50", big ? "text-4xl" : "text-2xl")}>/ 5</span>
        </p>
        <div className="mt-4 flex justify-center gap-1" aria-hidden>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              className={cn(big ? "h-8 w-8" : "h-5 w-5", n <= Math.round(average) ? "fill-accent text-accent" : "text-primary-foreground/25")}
            />
          ))}
        </div>
        <p className={cn("mt-3 text-primary-foreground/60", big ? "text-lg" : "text-sm")}>
          {total} {total > 1 ? "réponses" : "réponse"}
        </p>
      </div>

      <ol className={cn("space-y-2.5", big && "md:space-y-4")}>
        {[...results].reverse().map((r) => (
          <li key={r.label} className="flex items-center gap-3">
            <span className={cn("flex w-12 shrink-0 items-center justify-end gap-1 tabular-nums text-primary-foreground", big ? "text-2xl" : "text-sm")}>
              {r.label}
              <Star className={cn("fill-accent text-accent", big ? "h-5 w-5" : "h-3.5 w-3.5")} aria-hidden />
            </span>
            <div className={cn("flex-1 overflow-hidden rounded-full bg-primary-foreground/10", big ? "h-6" : "h-3")}>
              <div className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out" style={{ width: `${r.pct}%` }} />
            </div>
            <span className={cn("w-16 shrink-0 tabular-nums text-primary-foreground/70", big ? "text-xl" : "text-xs")}>
              {r.pct}% <span className="text-primary-foreground/40">({r.count})</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RatingResult;
