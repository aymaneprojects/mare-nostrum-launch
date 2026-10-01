import CountUpNumber from "@/components/CountUpNumber";
import { useInView } from "@/hooks/useInView";

const STATS = [
  { value: "80+",  label: "Entrepreneurs",       sub: "accompagnés",               color: "nuit"      },
  { value: "30+",  label: "Écoles partenaires",  sub: "réseau éducatif",           color: "turquoise" },
  { value: "135+", label: "Experts",             sub: "mobilisables",              color: "nuit"      },
  { value: "12",   label: "Pays",                sub: "d'intervention",            color: "turquoise" },
  { value: "95%",  label: "Satisfaction",        sub: "satisfaits/très satisfaits",color: "nuit"      },
  { value: "70%",  label: "Entreprises à impact",sub: "de nos accompagnés",        color: "turquoise" },
  { value: "210+", label: "Mises en relation",   sub: "professionnelles",          color: "nuit"      },
  { value: "358h", label: "Formation",           sub: "dispensées",                color: "turquoise" },
  { value: "2000", label: "Années d'expérience", sub: "cumulées experts",          color: "nuit"      },
  { value: "32",   label: "Projets collaboratifs",sub: "initiés",                  color: "turquoise" },
  { value: "93%",  label: "Prise de décision",   sub: "accélérée",                 color: "nuit"      },
  { value: "55%",  label: "Projet à temps plein",sub: "avec satisfaction",         color: "turquoise" },
];

export default function StatsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden py-12 md:py-24"
      style={{ background: "linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(var(--mn-turquoise) / 0.055) 22px 23px)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 12%, hsl(var(--mn-turquoise) / 0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 95%, hsl(var(--mn-ink) / 0.7) 0%, transparent 55%)" }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="mn-eyebrow-light text-center mb-5">L'équipage en chiffres</div>
        <h2 className="text-center mb-8 md:mb-14 text-primary-foreground">
          Pourquoi nous choisir
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {STATS.map((s, i) => {
            const big = i < 4;
            return (
              <div
                key={i}
                className="border-t border-primary-foreground/15 max-lg:even:border-l lg:border-l lg:[&:nth-child(4n+1)]:border-l-0 px-3 py-6 md:px-8 md:py-10 text-center min-w-0"
              >
                <div
                  className={`font-editorial font-semibold tabular-nums ${
                    big
                      ? "text-[2.5rem] sm:text-5xl md:text-6xl text-turquoise"
                      : "text-3xl sm:text-4xl md:text-5xl text-primary-foreground"
                  }`}
                  style={{ letterSpacing: "-0.03em", lineHeight: "1" }}
                >
                  <CountUpNumber value={s.value} inView={inView} duration={1800 + i * 80} />
                </div>
                <div className="mn-eyebrow-light mt-4 md:mt-5">{s.label}</div>
                <div className="mn-caption text-primary-foreground/70 mt-1">{s.sub}</div>
              </div>
            );
          })}
        </div>

        <p className="mn-caption text-center text-primary-foreground/60 mt-8 md:mt-12 border-t border-primary-foreground/15 pt-6 md:pt-8 max-w-3xl mx-auto leading-relaxed">
          France • Maroc • Tunisie • Algérie • Sénégal • Côte d'Ivoire • Bénin • Cameroun • Burkina Faso • RD Congo • Égypte • Canada
        </p>
      </div>
    </section>
  );
}
