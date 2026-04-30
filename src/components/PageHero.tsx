import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctas?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const PageHero = ({ eyebrow, title, subtitle, ctas, size = "md" }: PageHeroProps) => {
  const py = size === "sm" ? "py-12 md:py-20" : size === "lg" ? "py-20 md:py-36" : "py-16 md:py-28";

  return (
    <section
      className={`relative overflow-hidden ${py}`}
      style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }}
      />
      {/* Turquoise glow + ink vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {eyebrow && <div className="mn-eyebrow-light mb-4">{eyebrow}</div>}
          <h1
            className="font-editorial italic text-3xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground mb-4 md:mb-6 leading-[1.05]"
            style={{ letterSpacing: "-0.02em", textWrap: "balance" } as React.CSSProperties}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-base md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
              style={{ lineHeight: "1.65" }}
            >
              {subtitle}
            </p>
          )}
          {ctas && (
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8 md:mt-10">
              {ctas}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
