import { useMemo } from "react";
import { centerOut, groupWords } from "@/lib/live/words";
import type { LiveMessage } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface WordCloudProps {
  messages: LiveMessage[];
  /** screen : plein écran · half : moitié d'écran (côte à côte) · compact : régie */
  variant?: "screen" | "half" | "compact";
  limit?: number;
}

const SIZES = {
  screen: { min: 1.35, max: 6 },
  half: { min: 1.1, max: 3.8 },
  compact: { min: 0.85, max: 2.1 },
};

/**
 * Nuage de mots : taille proportionnelle à la racine de la fréquence (un mot
 * cité 16 fois n'écrase pas tout le reste), mot le plus cité au centre, trois
 * premiers en turquoise.
 */
const WordCloud = ({ messages, variant = "screen", limit = 60 }: WordCloudProps) => {
  const words = useMemo(() => groupWords(messages).slice(0, limit), [messages, limit]);

  if (!words.length) {
    return (
      <p className={cn("text-center text-primary-foreground/50", variant === "compact" ? "py-8 text-sm" : "py-20 text-xl")}>
        Les mots apparaîtront ici.
      </p>
    );
  }

  const top = words[0].count;
  const { min, max } = SIZES[variant];
  const ranked = new Map(words.map((w, i) => [w.key, i]));

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center text-center leading-none",
        variant === "screen" ? "gap-x-8 gap-y-4 py-6" : variant === "half" ? "gap-x-5 gap-y-3 py-4" : "gap-x-3 gap-y-2 py-2",
      )}
      role="list"
      aria-label="Nuage de mots"
    >
      {centerOut(words).map((w) => {
        const weight = Math.sqrt(w.count / top);
        const rank = ranked.get(w.key) ?? 99;
        return (
          <span
            key={w.key}
            role="listitem"
            aria-label={`${w.label}, ${w.count} fois`}
            title={`${w.count} fois`}
            className={cn(
              "animate-in fade-in zoom-in-90 duration-500 font-semibold tracking-tight transition-all",
              rank < 3 ? "text-accent" : "text-primary-foreground",
            )}
            style={{
              fontSize: `${(min + (max - min) * weight).toFixed(2)}rem`,
              opacity: rank < 3 ? 1 : 0.55 + 0.45 * weight,
            }}
          >
            {w.label}
          </span>
        );
      })}
    </div>
  );
};

export default WordCloud;
