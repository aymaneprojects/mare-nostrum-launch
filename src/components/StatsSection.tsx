import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
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
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="mn-eyebrow-turquoise text-center mb-5">L'équipage en chiffres</div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-10 md:mb-16 text-foreground">
          Pourquoi nous choisir
        </h2>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {STATS.map((s, i) => (
              <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div
                  className={`bg-card border border-border rounded-lg p-6 md:p-7 h-full hover-lift cursor-default`}
                >
                  <div
                    className={`font-editorial font-semibold text-5xl mb-0 ${
                      s.color === "turquoise" ? "text-turquoise" : "text-nuit"
                    }`}
                    style={{ letterSpacing: "-0.025em", lineHeight: "1" }}
                  >
                    <CountUpNumber value={s.value} inView={inView} duration={1400 + i * 50} />
                  </div>
                  <div className="mn-stat-label">{s.label}</div>
                  <div className="text-sm text-muted-foreground">{s.sub}</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <p className="text-center text-sm text-muted-foreground mt-10 md:mt-14 mn-hairline pt-6 md:pt-8 max-w-3xl mx-auto leading-relaxed">
          France • Maroc • Tunisie • Algérie • Sénégal • Côte d'Ivoire • Bénin • Cameroun • Burkina Faso • RD Congo • Égypte • Canada
        </p>
      </div>
    </section>
  );
}
