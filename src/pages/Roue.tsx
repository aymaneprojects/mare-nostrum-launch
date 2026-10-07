import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MONTHLY, ANNUAL } from "@/pages/Croissance";
import logo from "@/assets/logo.png";

/* ─────────────────────────────────────────────────────────────────────────────
   Roue de l'événement — marenostrum.tech/roue
   Page de jeu pour un événement : aucune navigation, aucun chatbot, aucune
   sollicitation (voir `quiet` et `bare` dans App.tsx), non indexée.

   LES LOTS ET LEURS CHANCES SE RÉGLENT ICI, et nulle part ailleurs :
   - Les lots sont listés du PREMIER PRIX au dernier ; le premier prix est aussi le plus rare.
   - `poids` est la chance relative de tomber sur le lot (10 / 30 / 60 = 10 %, 30 %, 60 %).
   - Chaque lot occupe deux parts de la roue : l'apparence ne dépend pas des chances.
   ───────────────────────────────────────────────────────────────────────────── */

/** Tarifs du Club : lus dans Croissance.tsx, jamais recopiés. Offre Communauté, France. */
const PRIX_MOIS = MONTHLY.france.communaute;
const PRIX_AN = ANNUAL.france.communaute;
/** Journée de formation offerte : « Initiation à l'IA », 7 h, 420 € HT (page /initiation-ia). */
const PRIX_JOURNEE_HT = 420;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

type Lot = {
  id: "club3" | "club12" | "formation";
  /** Texte court, écrit sur la roue (une ligne par élément). */
  roue: [string, string];
  titre: string;
  detail: string;
  valeur: number;
  suffixe?: string;
  poids: number;
  fond: string;
  texte: string;
};

const LOTS: Lot[] = [
  {
    id: "formation",
    roue: ["1 journée", "de formation"],
    titre: "1 journée de formation",
    detail: "Initiation à l'IA · 7 h",
    valeur: PRIX_JOURNEE_HT,
    suffixe: " HT",
    poids: 10,
    fond: "hsl(var(--mn-ivory))",
    texte: "hsl(var(--mn-nuit))",
  },
  {
    id: "club12",
    roue: ["12 mois", "au Club"],
    titre: "12 mois au Club",
    detail: "Offre Communauté",
    valeur: PRIX_AN,
    poids: 30,
    fond: "hsl(var(--mn-ocre))",
    texte: "hsl(var(--mn-ink))",
  },
  {
    id: "club3",
    roue: ["3 mois", "au Club"],
    titre: "3 mois au Club",
    detail: "Offre Communauté",
    valeur: 3 * PRIX_MOIS,
    poids: 60,
    fond: "hsl(var(--mn-turquoise))",
    texte: "hsl(var(--mn-ink))",
  },
];

/** Ordre autour de la roue : chaque lot apparaît deux fois, jamais deux fois de suite. */
const PARTS: Lot[] = [LOTS[0], LOTS[1], LOTS[2], LOTS[0], LOTS[1], LOTS[2]];
const ANGLE_PART = 360 / PARTS.length;

const TAILLE = 600;
const C = TAILLE / 2;
const R = 268;

const point = (angle: number, rayon: number) => {
  const a = (angle * Math.PI) / 180;
  return { x: C + rayon * Math.sin(a), y: C - rayon * Math.cos(a) };
};

const chemin = (i: number) => {
  const a0 = i * ANGLE_PART;
  const a1 = (i + 1) * ANGLE_PART;
  const p0 = point(a0, R);
  const p1 = point(a1, R);
  return `M ${C} ${C} L ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y} Z`;
};

/** Tirage non prévisible : crypto plutôt que Math.random. */
const alea = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;

function tirerLot(): Lot {
  const total = LOTS.reduce((s, l) => s + l.poids, 0);
  let t = alea() * total;
  for (const l of LOTS) {
    if (t < l.poids) return l;
    t -= l.poids;
  }
  return LOTS[0];
}

type Tirage = { id: Lot["id"]; heure: string };
const CLE = "mn_roue_tirages";

const lireTirages = (): Tirage[] => {
  try {
    const v = JSON.parse(localStorage.getItem(CLE) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

const mouvementReduit =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Roue = () => {
  const [rotation, setRotation] = useState(0);
  const [enCours, setEnCours] = useState(false);
  const [gagne, setGagne] = useState<Lot | null>(null);
  const [tirages, setTirages] = useState<Tirage[]>([]);
  const [presentation, setPresentation] = useState(false);
  const [inactif, setInactif] = useState(false);
  const rotationRef = useRef(0);
  const lotEnAttente = useRef<Lot | null>(null);
  const filet = useRef<number | undefined>(undefined);

  useEffect(() => setTirages(lireTirages()), []);

  const enregistrer = useCallback((lot: Lot) => {
    const nouveau: Tirage = {
      id: lot.id,
      heure: new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
    };
    setTirages((anciens) => {
      const suite = [nouveau, ...anciens].slice(0, 200);
      try {
        localStorage.setItem(CLE, JSON.stringify(suite));
      } catch {
        /* stockage indisponible : l'historique reste simplement en mémoire */
      }
      return suite;
    });
  }, []);

  const terminer = useCallback(() => {
    window.clearTimeout(filet.current);
    const lot = lotEnAttente.current;
    if (!lot) return;
    lotEnAttente.current = null;
    setEnCours(false);
    setGagne(lot);
    enregistrer(lot);
  }, [enregistrer]);

  const lancer = useCallback(() => {
    if (enCours) return;
    setGagne(null);

    // 1. Le lot est tiré d'abord, selon les chances ; 2. on choisit l'une de ses parts ;
    // 3. la roue est tournée de façon à s'arrêter dedans, pointeur en haut.
    const lot = tirerLot();
    const parts = PARTS.map((p, i) => (p.id === lot.id ? i : -1)).filter((i) => i >= 0);
    const part = parts[Math.floor(alea() * parts.length)];
    const centre = part * ANGLE_PART + ANGLE_PART / 2;
    const marge = ANGLE_PART / 2 - 7; // jamais pile sur une séparation
    const decalage = (alea() * 2 - 1) * marge;

    const tours = mouvementReduit ? 1 : 6 + Math.floor(alea() * 2);
    const actuel = rotationRef.current;
    const cible = actuel - (actuel % 360) + tours * 360 + (360 - centre) + decalage;

    rotationRef.current = cible;
    lotEnAttente.current = lot;
    setEnCours(true);
    setRotation(cible);

    // Filet de sécurité : si l'événement de fin de transition n'arrive pas, on conclut quand même.
    filet.current = window.setTimeout(terminer, (mouvementReduit ? 1.4 : 7.2) * 1000);
  }, [enCours, terminer]);

  useEffect(() => () => window.clearTimeout(filet.current), []);

  const effacer = () => {
    setTirages([]);
    try {
      localStorage.removeItem(CLE);
    } catch {
      /* rien à faire */
    }
  };

  /* Mode présentation : plein écran réel quand le navigateur le permet (ordinateur,
     tablette). Sur iPhone, qui ne l'offre pas, la page passe quand même en présentation
     (mise en page agrandie, commandes masquées) sans plein écran réel. */
  const basculerPresentation = useCallback(async () => {
    const racine = document.documentElement as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> };
    if (!presentation) {
      setPresentation(true);
      try {
        await (racine.requestFullscreen?.() ?? racine.webkitRequestFullscreen?.());
      } catch {
        /* plein écran refusé : la présentation reste active, en fenêtre */
      }
    } else {
      setPresentation(false);
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch {
          /* déjà sorti */
        }
      }
    }
  }, [presentation]);

  // Sortie du plein écran par la touche Échap du navigateur : on quitte aussi la présentation.
  useEffect(() => {
    const sortie = () => {
      if (!document.fullscreenElement) setPresentation(false);
    };
    document.addEventListener("fullscreenchange", sortie);
    return () => document.removeEventListener("fullscreenchange", sortie);
  }, []);

  // En présentation, curseur et commandes disparaissent après 3 s sans mouvement.
  useEffect(() => {
    if (!presentation) {
      setInactif(false);
      return;
    }
    let minuterie = window.setTimeout(() => setInactif(true), 3000);
    const activite = () => {
      setInactif(false);
      window.clearTimeout(minuterie);
      minuterie = window.setTimeout(() => setInactif(true), 3000);
    };
    const evenements = ["mousemove", "keydown", "touchstart"] as const;
    evenements.forEach((e) => window.addEventListener(e, activite));
    return () => {
      window.clearTimeout(minuterie);
      evenements.forEach((e) => window.removeEventListener(e, activite));
    };
  }, [presentation]);

  // Clavier, pour piloter depuis l'ordinateur branché sur l'écran : F = plein écran,
  // Espace ou Entrée = lancer la roue (ou passer au tour suivant), Échap = quitter.
  useEffect(() => {
    const touche = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const cible = e.target as HTMLElement | null;
      const surCommande = !!cible?.closest("button, a, input, textarea, select");
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        void basculerPresentation();
      } else if (e.key === "Escape" && presentation && !document.fullscreenElement) {
        setPresentation(false);
      } else if ((e.key === " " || e.key === "Enter") && !surCommande) {
        e.preventDefault();
        if (gagne) setGagne(null);
        else lancer();
      }
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [basculerPresentation, gagne, lancer, presentation]);

  const decompte = useMemo(
    () => LOTS.map((l) => ({ lot: l, n: tirages.filter((t) => t.id === l.id).length })),
    [tirages],
  );

  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden text-primary-foreground",
        presentation && "h-screen",
        presentation && inactif && "cursor-none",
      )}
      style={{ background: "linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)" }}
    >
      <SEOHead
        title="Roue Mare Nostrum"
        description="Jeu de l'événement Mare Nostrum."
        noindex={true}
      />
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
            "radial-gradient(ellipse at 28% 30%, hsl(var(--mn-turquoise) / 0.2) 0%, transparent 55%), radial-gradient(ellipse at 85% 90%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)",
        }}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => void basculerPresentation()}
        aria-pressed={presentation}
        className={cn(
          "absolute right-4 top-4 z-30 border-primary-foreground/40 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground hover:text-primary transition-opacity",
          presentation && inactif && "opacity-0 pointer-events-none",
        )}
      >
        {presentation ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
        {presentation ? "Quitter la présentation" : "Plein écran"}
      </Button>

      <div className={cn("relative z-10 container mx-auto px-4", presentation ? "py-5" : "py-8 md:py-12")}>
        <header className={cn("flex flex-col items-center text-center", presentation ? "mb-3" : "mb-6 md:mb-10")}>
          <img
            src={logo}
            alt="Mare Nostrum"
            width={176}
            height={69}
            className={cn("w-auto brightness-0 invert", presentation ? "h-9 mb-3" : "h-11 mb-5")}
          />
          <div className="mn-eyebrow-light mn-eyebrow-pill mb-4">Jeu de l'événement</div>
          <h1 className="font-editorial italic font-medium text-primary-foreground" style={{ textWrap: "balance" } as React.CSSProperties}>
            Faites tourner la roue
          </h1>
          {!presentation && (
            <p className="mn-lead text-primary-foreground/80 mt-3 max-w-xl">Trois lots à gagner avec Mare Nostrum.</p>
          )}
        </header>

        <div
          className={cn(
            "grid gap-10 lg:gap-14 items-center mx-auto",
            presentation
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] max-w-[110rem]"
              : "lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] max-w-6xl",
          )}
        >
          {/* ── La roue ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-center">
            <div
              className="relative"
              style={{ width: presentation ? "min(66vh, 88vw)" : "min(88vw, 34rem)", aspectRatio: "1" }}
            >
              {/* Pointeur */}
              <svg
                aria-hidden="true"
                viewBox="0 0 60 70"
                className="absolute left-1/2 -top-3 z-20 w-12 -translate-x-1/2 drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]"
              >
                <path d="M30 68 L4 14 A30 30 0 0 1 56 14 Z" style={{ fill: "hsl(var(--mn-ivory))" }} />
                <circle cx="30" cy="22" r="7" style={{ fill: "hsl(var(--mn-ocre))" }} />
              </svg>

              <svg
                viewBox={`0 0 ${TAILLE} ${TAILLE}`}
                role="img"
                aria-label="Roue de la chance : 3 mois au Club, 1 journée de formation, 12 mois au Club"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 30px 50px rgba(5,10,30,0.55))" }}
              >
                {/* Couronne extérieure (fixe) */}
                <circle cx={C} cy={C} r={R + 24} style={{ fill: "hsl(var(--mn-ivory))" }} />
                {Array.from({ length: 24 }).map((_, i) => {
                  const p = point((i * 360) / 24, R + 12);
                  return <circle key={i} cx={p.x} cy={p.y} r="4.5" style={{ fill: i % 2 ? "hsl(var(--mn-turquoise))" : "hsl(var(--mn-ocre))" }} />;
                })}

                {/* Parts (tournent) */}
                <g
                  onTransitionEnd={terminer}
                  style={{
                    transformOrigin: `${C}px ${C}px`,
                    transform: `rotate(${rotation}deg)`,
                    transition: enCours
                      ? `transform ${mouvementReduit ? 1.2 : 6.4}s cubic-bezier(0.14, 0.72, 0.1, 1)`
                      : "none",
                  }}
                >
                  {PARTS.map((lot, i) => {
                    const milieu = i * ANGLE_PART + ANGLE_PART / 2;
                    return (
                      <g key={i}>
                        <path d={chemin(i)} style={{ fill: lot.fond, stroke: "hsl(var(--mn-nuit))", strokeWidth: 3 }} />
                        <g transform={`rotate(${milieu - 90} ${C} ${C})`}>
                          <text
                            x={C + R - 26}
                            y={C - 9}
                            textAnchor="end"
                            style={{ fill: lot.texte, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 31 }}
                          >
                            {lot.roue[0]}
                          </text>
                          <text
                            x={C + R - 26}
                            y={C + 27}
                            textAnchor="end"
                            style={{ fill: lot.texte, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 25 }}
                          >
                            {lot.roue[1]}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>

                {/* Moyeu (fixe) */}
                <circle cx={C} cy={C} r="54" style={{ fill: "hsl(var(--mn-nuit))", stroke: "hsl(var(--mn-ivory))", strokeWidth: 8 }} />
                <circle cx={C} cy={C} r="16" style={{ fill: "hsl(var(--mn-turquoise))" }} />
              </svg>
            </div>

            <Button
              size="lg"
              variant="secondary"
              className={cn("min-w-64", presentation ? "mt-5" : "mt-8")}
              onClick={lancer}
              disabled={enCours}
            >
              {enCours ? "La roue tourne…" : "Lancer la roue"}
            </Button>
          </div>

          {/* ── Les lots ────────────────────────────────────────────── */}
          <aside aria-labelledby="titre-lots" className="space-y-4">
            <h2 id="titre-lots" className="mn-eyebrow-light text-center lg:text-left">
              Les lots à gagner
            </h2>
            <ul className="space-y-3">
              {LOTS.map((l) => (
                <li
                  key={l.id}
                  className={cn(
                    "flex items-center gap-4 rounded-[14px] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm",
                    presentation ? "p-6" : "p-4",
                  )}
                  style={{ boxShadow: "var(--shadow-glass)" }}
                >
                  <span aria-hidden="true" className="h-12 w-2 rounded-full shrink-0" style={{ background: l.fond }} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("font-semibold leading-tight", presentation ? "text-2xl" : "text-lg")}>{l.titre}</p>
                    <p className={cn("text-primary-foreground/70", presentation ? "text-base" : "text-sm")}>{l.detail}</p>
                  </div>
                  <p className={cn("font-editorial font-semibold shrink-0 tabular-nums", presentation ? "text-4xl" : "text-2xl")}>
                    {euros(l.valeur)}
                    {l.suffixe && <span className="text-sm font-sans font-medium text-primary-foreground/70">{l.suffixe}</span>}
                  </p>
                </li>
              ))}
            </ul>

            {/* Suivi de la session : utile à l'équipe, masqué en présentation devant le public. */}
            {!presentation && (
            <div className="rounded-[14px] border border-primary-foreground/15 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Tirages de la session : {tirages.length}</p>
                {tirages.length > 0 && (
                  <button
                    type="button"
                    onClick={effacer}
                    className="text-sm text-primary-foreground/70 underline underline-offset-4 hover:text-primary-foreground min-h-11 px-2"
                  >
                    Remettre à zéro
                  </button>
                )}
              </div>
              <ul className="mt-2 grid grid-cols-3 gap-2 text-center">
                {decompte.map(({ lot, n }) => (
                  <li key={lot.id} className="rounded-lg bg-primary-foreground/[0.06] px-2 py-2">
                    <p className="font-editorial text-2xl font-semibold tabular-nums">{n}</p>
                    <p className="text-xs text-primary-foreground/70 leading-tight">{lot.roue.join(" ")}</p>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── Résultat ───────────────────────────────────────────────── */}
      <div aria-live="polite" className="sr-only">
        {gagne ? `Gagné : ${gagne.titre}, valeur ${euros(gagne.valeur)}${gagne.suffixe ?? ""}.` : ""}
      </div>
      {gagne && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titre-gain"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "hsl(var(--mn-ink) / 0.78)" }}
        >
          {!mouvementReduit &&
            Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="mn-confetti"
                style={{
                  left: `${(i * 97) % 100}%`,
                  background: ["hsl(var(--mn-turquoise))", "hsl(var(--mn-ocre))", "hsl(var(--mn-ivory))"][i % 3],
                  animationDelay: `${(i % 9) * 0.12}s`,
                  animationDuration: `${2.6 + (i % 5) * 0.35}s`,
                }}
              />
            ))}
          <div
            className={cn(
              "relative w-full rounded-[18px] bg-card text-card-foreground text-center",
              presentation ? "max-w-2xl p-12" : "max-w-md p-8",
            )}
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            <p className="mn-eyebrow-turquoise mb-3">Félicitations</p>
            <h2 id="titre-gain" className="font-editorial italic mb-2" style={{ textWrap: "balance" } as React.CSSProperties}>
              {gagne.titre}
            </h2>
            <p className="text-muted-foreground">{gagne.detail}</p>
            <p className={cn("font-editorial font-semibold text-primary mt-5 tabular-nums", presentation ? "text-7xl" : "text-5xl")}>
              {euros(gagne.valeur)}
              {gagne.suffixe && <span className="text-xl font-sans font-medium text-muted-foreground">{gagne.suffixe}</span>}
            </p>
            <Button size="lg" className="mt-7 w-full" onClick={() => setGagne(null)} autoFocus>
              Tour suivant
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Roue;
