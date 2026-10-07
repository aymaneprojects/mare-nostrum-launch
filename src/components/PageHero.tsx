import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  /** ReactNode et non string : certains titres portent un mot en couleur ou un retour à la ligne. */
  title: ReactNode;
  subtitle?: ReactNode;
  ctas?: ReactNode;
  /** Fil d'Ariane, affiché au-dessus du titre. */
  breadcrumbs?: ReactNode;
  /** Ligne sous le titre : auteur, date, temps de lecture d'un article. */
  meta?: ReactNode;
  /** « left » pour les articles ; « center » (défaut) pour les pages. */
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
}

const PageHero = ({ eyebrow, title, subtitle, ctas, breadcrumbs, meta, align = "center", size = "md" }: PageHeroProps) => {
  const gauche = align === "left";
  const py = size === "sm" ? "py-10 md:py-20" : size === "lg" ? "py-16 md:py-32" : "py-12 md:py-24";

  return (
    <section
      className={`relative overflow-hidden ${py}`}
      style={{ background: "linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)" }}
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(var(--mn-turquoise) / 0.055) 22px 23px)" }}
      />
      {/* Turquoise glow + ink vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(var(--mn-turquoise) / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(var(--mn-ink) / 0.65) 0%, transparent 55%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto ${gauche ? "text-left" : "text-center"}`}>
          {breadcrumbs && (
            /* Le fil d'Ariane est écrit pour un fond clair (texte gris) : sur le
               dégradé sombre il disparaissait. On le recolore ici, une fois pour
               toutes, et on neutralise son conteneur centré et ses marges. */
            <div
              className={`mb-5 md:mb-6 [&_nav]:p-0 [&_nav]:mx-0 [&_nav]:max-w-none [&_ol]:flex-wrap [&_ol]:text-primary-foreground/70 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground ${
                gauche ? "[&_ol]:justify-start" : "[&_ol]:justify-center"
              }`}
            >
              {breadcrumbs}
            </div>
          )}
          {eyebrow && <div className="mn-eyebrow-light mn-eyebrow-pill mb-5 md:mb-6">{eyebrow}</div>}
          <h1
            className="font-editorial italic font-medium text-primary-foreground mb-4 md:mb-6 break-words"
            style={{ letterSpacing: "-0.02em", textWrap: "balance" } as React.CSSProperties}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={`mn-lead text-primary-foreground/80 max-w-2xl ${gauche ? "" : "mx-auto"}`}
            >
              {subtitle}
            </p>
          )}
          {meta && <div className="mt-6 text-primary-foreground/80">{meta}</div>}
          {ctas && (
            <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-10 ${gauche ? "justify-start" : "justify-center"}`}>
              {ctas}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
