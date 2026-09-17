import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParticipantCountProps {
  count: number | null;
  /** hero : écran d'accueil, en grand · chip : pastille discrète en coin d'écran */
  variant?: "hero" | "chip";
  className?: string;
}

/** Compteur de participants connectés, avec un point qui bat pour marquer le direct. */
const ParticipantCount = ({ count, variant = "chip", className }: ParticipantCountProps) => {
  if (count === null) return null;
  const hero = variant === "hero";
  const label = count > 1 ? "personnes connectées" : "personne connectée";

  return (
    <div
      aria-live="polite"
      className={cn(
        "inline-flex items-center rounded-full bg-primary-foreground/10 backdrop-blur",
        hero ? "gap-3 px-6 py-3" : "gap-2 px-3 py-1.5",
        className,
      )}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      {hero ? (
        <p className="text-xl text-primary-foreground/80 md:text-2xl">
          <span className="font-semibold tabular-nums text-primary-foreground">{count}</span> {label}
        </p>
      ) : (
        <p className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
          <Users className="h-4 w-4" aria-hidden />
          <span className="font-semibold tabular-nums text-primary-foreground">{count}</span>
        </p>
      )}
    </div>
  );
};

export default ParticipantCount;
