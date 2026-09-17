import type { ReactNode } from "react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface LiveShellProps {
  /** Titre de l'événement, affiché discrètement en haut. */
  title?: string;
  /** Élément aligné à droite de la barre (identité, QR réduit…). */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Habillage des pages live côté public et écran de salle : plein écran, pattern
 * « section sombre » du design system (dégradé nuit, rayures, halo turquoise),
 * sans navigation du site.
 */
const LiveShell = ({ title, aside, children, className }: LiveShellProps) => (
  <div
    className="relative min-h-screen overflow-hidden text-primary-foreground"
    style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}
  >
    <div
      className="pointer-events-none fixed inset-0"
      style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }}
    />
    <div
      className="pointer-events-none fixed inset-0"
      style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)" }}
    />

    <div className="relative z-10 flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-4 px-4 py-4 md:px-8 md:py-6">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <img src={logo} alt="Mare Nostrum" className="h-8 w-auto shrink-0 brightness-0 invert opacity-90 md:h-10" />
          {title && (
            <>
              <span className="hidden h-6 w-px bg-primary-foreground/20 sm:block" aria-hidden />
              <p className="hidden truncate text-sm text-primary-foreground/70 sm:block md:text-base">{title}</p>
            </>
          )}
        </div>
        {aside}
      </header>
      <main className={cn("flex flex-1 flex-col", className)}>{children}</main>
    </div>
  </div>
);

export default LiveShell;
