import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DarkSectionProps {
  children: ReactNode;
  className?: string;
  /** Position du halo turquoise : varie d'une section à l'autre pour éviter la répétition. */
  halo?: "left" | "right";
}

/**
 * Section à fond nuit : les trois couches du DESIGN-SYSTEM.md §4 (rayures, halo
 * et vignette, contenu au-dessus). C'est le même fond que `PageHero` : toute
 * section sombre d'une page (clôture, bandeau d'appel) passe par ici, jamais par
 * un dégradé écrit à la main.
 */
const DarkSection = ({ children, className, halo = "left" }: DarkSectionProps) => (
  <section
    className={cn("relative overflow-hidden py-16 md:py-24", className)}
    style={{
      background:
        "linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)",
    }}
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 22px, hsl(var(--mn-turquoise) / 0.055) 22px 23px)",
      }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          halo === "left"
            ? "radial-gradient(ellipse at 22% 18%, hsl(var(--mn-turquoise) / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)"
            : "radial-gradient(ellipse at 78% 18%, hsl(var(--mn-turquoise) / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 20% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </section>
);

export default DarkSection;
