import { MAP_BUREAUX, MAP_FOND, MAP_PAYS, MAP_VIEWBOX } from "@/data/mapPays";

// Sens du libellé de chaque bureau : écarté du centre du hero, où se lit le titre.
const COTE: Record<string, "l" | "r"> = { Paris: "r", Toulouse: "l", Rabat: "r", Dakar: "r", Brazzaville: "r" };

// Carte du livret en fond de hero : décorative pour l'œil, décrite pour les lecteurs d'écran.
const HeroMap = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      role="img"
      aria-label={`Carte : ${MAP_PAYS.length} pays d'intervention et ${MAP_BUREAUX.length} bureaux (${MAP_BUREAUX.map((b) => b.nom).join(", ")})`}
      viewBox={MAP_VIEWBOX}
      className="absolute left-1/2 lg:left-[85%] top-1/2 h-[88%] w-auto -translate-x-1/2 -translate-y-1/2 max-w-none opacity-70 lg:opacity-100"
      style={{ maskImage: "radial-gradient(ellipse 62% 60% at 50% 50%, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 62% 60% at 50% 50%, #000 55%, transparent 100%)" }}
    >
      <path d={MAP_FOND} fill="hsl(var(--mn-turquoise) / 0.05)" stroke="hsl(var(--mn-turquoise) / 0.14)" strokeWidth="0.5" strokeLinejoin="round" />
      {MAP_PAYS.map((p) => (
        <path key={p.id} d={p.d} fill="hsl(var(--mn-turquoise) / 0.26)" stroke="hsl(var(--mn-turquoise) / 0.7)" strokeWidth="0.7" strokeLinejoin="round" />
      ))}
      {MAP_BUREAUX.map((b) => {
        const gauche = COTE[b.nom] === "l";
        return (
          <g key={b.nom}>
            <circle cx={b.x} cy={b.y} r="11" fill="hsl(var(--mn-turquoise) / 0.22)" />
            <circle cx={b.x} cy={b.y} r="4.6" fill="hsl(var(--mn-turquoise))" stroke="hsl(var(--mn-ink))" strokeWidth="1.5" />
            <text
              x={b.x + (gauche ? -15 : 15)}
              y={b.y + 5}
              textAnchor={gauche ? "end" : "start"}
              fontSize="15"
              fontWeight="600"
              fill="hsl(var(--primary-foreground) / 0.9)"
              style={{ paintOrder: "stroke", stroke: "hsl(var(--mn-ink) / 0.85)", strokeWidth: 3.5 }}
            >
              {b.nom}
            </text>
          </g>
        );
      })}
    </svg>
    {/* Voile sombre derrière le texte : la carte reste lisible sur les bords, le titre au centre */}
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 34% 44% at 50% 50%, hsl(var(--mn-ink) / 0.6) 0%, hsl(var(--mn-ink) / 0.3) 60%, transparent 100%)" }} />
  </div>
);

export default HeroMap;
