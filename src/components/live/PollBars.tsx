import type { PollResult } from "@/hooks/useLiveVotes";
import { cn } from "@/lib/utils";

interface PollBarsProps {
  results: PollResult[];
  total: number;
  variant?: "screen" | "compact";
}

const LETTERS = "ABCDEFGHIJ";

/**
 * Résultats d'un sondage en barres. Barres CSS plutôt qu'un graphique :
 * la transition de largeur reste fluide à chaque vote reçu, sans que le
 * graphique se redessine entièrement.
 */
const PollBars = ({ results, total, variant = "screen" }: PollBarsProps) => {
  const max = Math.max(...results.map((r) => r.count), 0);
  const screen = variant === "screen";

  return (
    <div>
      <ol className={cn("space-y-3", screen && "md:space-y-5")}>
        {results.map((r, i) => {
          const leading = total > 0 && r.count === max;
          return (
            <li key={i}>
              <div className={cn("mb-1.5 flex items-baseline justify-between gap-4", screen ? "text-lg md:text-2xl" : "text-sm")}>
                <span className="min-w-0 break-words text-primary-foreground">
                  <span className="mr-2 font-mono text-primary-foreground/50">{LETTERS[i]}</span>
                  {r.label}
                </span>
                <span className="shrink-0 tabular-nums text-primary-foreground/80">
                  <span className="font-semibold text-primary-foreground">{r.pct}%</span>
                  <span className={cn("ml-2 text-primary-foreground/50", screen ? "text-base" : "text-xs")}>({r.count})</span>
                </span>
              </div>
              <div className={cn("overflow-hidden rounded-full bg-primary-foreground/10", screen ? "h-5 md:h-7" : "h-3")}>
                <div
                  className={cn("h-full rounded-full transition-[width] duration-700 ease-out", leading ? "bg-accent" : "bg-accent/55")}
                  style={{ width: `${r.pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>
      <p className={cn("mt-5 text-primary-foreground/60", screen ? "text-base md:text-lg" : "text-xs")}>
        {total} {total > 1 ? "votes" : "vote"}
      </p>
    </div>
  );
};

export default PollBars;
