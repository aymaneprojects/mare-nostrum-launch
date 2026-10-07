import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Lock, Maximize2, Minimize2, Unlock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MONTHLY } from "@/pages/Croissance";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

/* ─────────────────────────────────────────────────────────────────────────────
   Roue de l'événement — marenostrum.tech/roue
   Page de jeu pour un événement : aucune navigation, aucun chatbot, aucune
   sollicitation (voir `quiet` et `bare` dans App.tsx), non indexée.

   LE PARCOURS (chaque étape est enregistrée dans Airtable par la fonction serveur
   `roue-participation`, qui tire aussi le lot : le navigateur ne choisit jamais son gain) :
     1. la roue est toujours affichée, mais verrouillée ;
     2. la personne valide nom, e-mail, téléphone et fonction : la roue se débloque ;
     3. elle lance la roue, qui tourne jusqu'au lot tiré ;
     4. « Félicitations » : lot OFFERT, prix barré ; si c'est une session, elle choisit
        Initiation à l'IA ou Mastermind (15 places chacune) ;
     5. elle accepte ou refuse son lot : la décision est écrite dans sa fiche.

   LES LOTS ET LES PARTS SE RÈGLENT ICI, et dans la fonction serveur (même tableau) :
   - `LOTS` : les lots, du PREMIER PRIX au dernier (ordre de la liste affichée).
   - `PARTS` : les parts de la roue ; la chance d'un lot est son nombre de parts sur le total.
   Quand `PARTS` change, changer aussi `LOTS.parts` dans
   supabase/functions/roue-participation/index.ts, puis redéployer la fonction.
   ───────────────────────────────────────────────────────────────────────────── */

/** Tarif mensuel du Club (offre Communauté, France) : lu dans Croissance.tsx, jamais recopié. */
const PRIX_MOIS = MONTHLY.france.communaute;
/** Une session de formation = une demi-journée, valorisée 210 € (Initiation à l'IA : 420 € la journée de 7 h).
 *  Les 6 mois de Club (180 €) valent volontairement moins qu'une session. */
const PRIX_SESSION = 210;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

type IdSession = "ia" | "mastermind";
const SESSIONS: { id: IdSession; titre: string }[] = [
  { id: "ia", titre: "Initiation à l'IA" },
  { id: "mastermind", titre: "Mastermind" },
];

type Lot = {
  id: "club3" | "club6" | "session" | "freemium";
  /** Texte court, écrit sur la roue. */
  roue: string;
  titre: string;
  detail: string;
  /** Valeur en euros TTC ; 0 = gratuit. */
  valeur: number;
  fond: string;
  texte: string;
};

const LOTS: Lot[] = [
  {
    id: "session",
    roue: "Session",
    titre: "1 session de formation",
    detail: "Demi-journée · Initiation à l'IA ou Mastermind, au choix",
    valeur: PRIX_SESSION,
    fond: "hsl(var(--mn-ivory))",
    texte: "hsl(var(--mn-nuit))",
  },
  {
    id: "club6",
    roue: "6 mois",
    titre: "6 mois au Club",
    detail: "Abonnement Communauté",
    valeur: 6 * PRIX_MOIS,
    fond: "hsl(var(--mn-ocre))",
    texte: "hsl(var(--mn-ink))",
  },
  {
    id: "club3",
    roue: "3 mois",
    titre: "3 mois au Club",
    detail: "Abonnement Communauté",
    valeur: 3 * PRIX_MOIS,
    fond: "hsl(var(--mn-turquoise))",
    texte: "hsl(var(--mn-ink))",
  },
  {
    id: "freemium",
    roue: "Freemium",
    titre: "Accès Freemium au Club",
    detail: "Accès gratuit",
    valeur: 0,
    fond: "hsl(var(--mn-nuit))",
    texte: "hsl(var(--mn-ivory))",
  },
];

const lotParId = (id: string | null | undefined) => LOTS.find((l) => l.id === id) ?? null;

const [SESSION, CLUB6, CLUB3, FREEMIUM] = LOTS;

/** Les 15 parts de la roue : 6 Freemium, 4 « 3 mois », 3 « 6 mois », 2 sessions.
 *  Toutes les parts ont la même chance (1 sur 15) : le Freemium sort 6 fois sur 15 (2 sur 5),
 *  le 3 mois 4 fois, le 6 mois 3 fois, la session 2 fois. Jamais deux parts identiques côte à côte. */
const PARTS: Lot[] = [
  FREEMIUM, CLUB3, FREEMIUM, CLUB6, FREEMIUM, CLUB3, FREEMIUM, SESSION,
  FREEMIUM, CLUB6, FREEMIUM, CLUB3, CLUB6, CLUB3, SESSION,
];
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

/** Hasard pour l'animation seulement (quelle part du lot, où s'arrêter dedans) : le lot, lui, vient du serveur. */
const alea = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;

type Stock = Record<IdSession, { restant: number; max: number }>;
type Decision = "accepté" | "refusé";
type Resultat = {
  lot: Lot | null;
  session: IdSession | null;
  decision: Decision | null;
  /** La personne avait déjà terminé son parcours : on lui montre son résultat sans rien recommencer. */
  deja: boolean;
};

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Message affiché pour chaque refus de la fonction ou de la saisie. */
const MESSAGES: Record<string, string> = {
  nom_invalide: "Merci d'indiquer votre nom.",
  email_invalide: "Cette adresse e-mail ne semble pas valide.",
  telephone_invalide: "Ce numéro de téléphone ne semble pas valide.",
  fonction_invalide: "Merci d'indiquer votre fonction.",
  consentement_requis: "Merci de cocher la case pour pouvoir jouer.",
  session_complete: "Cette session est complète. Choisissez l'autre.",
  enregistrement_impossible: "Impossible d'enregistrer pour le moment. Réessayez dans un instant.",
};

/** Appelle la fonction serveur ; renvoie les données, ou le code d'erreur lu dans sa réponse. */
async function appeler(action: string, corps: Record<string, unknown> = {}) {
  const { data, error } = await supabase.functions.invoke("roue-participation", { body: { action, ...corps } });
  if (!error) return { data, code: null as string | null };
  let code = "enregistrement_impossible";
  let donnees: Record<string, unknown> | null = null;
  try {
    donnees = await (error as { context?: Response }).context?.json();
    if (donnees?.error) code = String(donnees.error);
  } catch {
    /* corps illisible : message générique */
  }
  return { data: donnees, code };
}

/** Prix d'un lot : valeur barrée puis « Offert ». Le Freemium, gratuit, n'a pas de prix à barrer. */
const Offert = ({ lot, grand }: { lot: Lot; grand?: boolean }) => (
  <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3">
    {lot.valeur > 0 && (
      <span className={cn("line-through decoration-2 text-muted-foreground tabular-nums", grand ? "text-3xl" : "text-xl")}>
        {euros(lot.valeur)} TTC
      </span>
    )}
    <span className={cn("font-editorial font-semibold text-primary uppercase tracking-wide", grand ? "text-6xl" : "text-4xl")}>
      Offert
    </span>
  </span>
);

const Montant = ({ lot }: { lot: Lot }) =>
  lot.valeur === 0 ? (
    <>Gratuit</>
  ) : (
    <>
      {euros(lot.valeur)}
      <span className="text-sm font-sans font-medium opacity-70"> TTC</span>
    </>
  );

const Roue = () => {
  const [rotation, setRotation] = useState(0);
  const [enCours, setEnCours] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [participant, setParticipant] = useState<{ id: string; nom: string } | null>(null);
  const [resultat, setResultat] = useState<Resultat | null>(null);
  const [tirages, setTirages] = useState<Tirage[]>([]);
  const [stock, setStock] = useState<Partial<Stock>>({});
  const [presentation, setPresentation] = useState(false);
  const [inactif, setInactif] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [fonction, setFonction] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [piege, setPiege] = useState("");
  const [erreur, setErreur] = useState("");
  const rotationRef = useRef(0);
  const lotEnAttente = useRef<Lot | null>(null);
  const filet = useRef<number | undefined>(undefined);

  useEffect(() => setTirages(lireTirages()), []);

  // Places restantes : demandées au serveur au chargement (lecture seule, aucune donnée personnelle).
  useEffect(() => {
    appeler("stock")
      .then(({ data }) => data?.stock && setStock(data.stock as Stock))
      .catch(() => undefined);
  }, []);

  /** Le lot « session » est épuisé quand les deux sessions sont complètes. */
  const epuise = (id: Lot["id"]) =>
    id === "session" && SESSIONS.every((s) => stock[s.id] !== undefined && stock[s.id]!.restant <= 0);

  const enregistrerTirage = useCallback((lot: Lot) => {
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
    setResultat({ lot, session: null, decision: null, deja: false });
    enregistrerTirage(lot);
  }, [enregistrerTirage]);

  /** Fait tourner la roue jusqu'à une part du lot reçu du serveur, pointeur en haut. */
  const faireTourner = useCallback(
    (lot: Lot) => {
      const parts = PARTS.map((p, i) => (p.id === lot.id ? i : -1)).filter((i) => i >= 0);
      const part = parts[Math.floor(alea() * parts.length)];
      const centre = part * ANGLE_PART + ANGLE_PART / 2;
      const marge = ANGLE_PART / 2 - 5; // jamais pile sur une séparation
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
    },
    [terminer],
  );

  useEffect(() => () => window.clearTimeout(filet.current), []);

  const messageDe = (code: string | null) => MESSAGES[code ?? ""] ?? MESSAGES.enregistrement_impossible;

  /** Étape 1 : valider les coordonnées, ce qui débloque la roue. */
  const valider = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (envoi) return;
      setErreur("");

      const chiffres = telephone.replace(/\D/g, "");
      if (nom.trim().length < 2) return setErreur(MESSAGES.nom_invalide);
      if (!EMAIL_RE.test(email.trim())) return setErreur(MESSAGES.email_invalide);
      if (chiffres.length < 8 || chiffres.length > 15) return setErreur(MESSAGES.telephone_invalide);
      if (fonction.trim().length < 2) return setErreur(MESSAGES.fonction_invalide);
      if (!consentement) return setErreur(MESSAGES.consentement_requis);

      setEnvoi(true);
      try {
        const { data, code } = await appeler("inscrire", {
          nom: nom.trim(),
          email: email.trim(),
          telephone: telephone.trim(),
          fonction: fonction.trim(),
          rgpd: consentement,
          website: piege,
        });
        if (code || !data) return setErreur(messageDe(code));

        // Déjà passée par la roue : on montre son résultat, on ne recommence rien.
        if (data.deja) {
          setResultat({ lot: lotParId(data.lot), session: data.session ?? null, decision: data.decision ?? null, deja: true });
          return;
        }
        setParticipant({ id: data.participant, nom: data.nom ?? nom.trim() });
        // Elle avait tiré son lot sans conclure (page fermée) : on la ramène à son choix, sans retirer.
        if (data.reprise?.lot) {
          setResultat({ lot: lotParId(data.reprise.lot), session: data.reprise.session ?? null, decision: null, deja: false });
        }
      } catch {
        setErreur(MESSAGES.enregistrement_impossible);
      } finally {
        setEnvoi(false);
      }
    },
    [consentement, email, envoi, fonction, nom, piege, telephone],
  );

  /** Étape 2 : lancer la roue. Le lot vient du serveur ; la roue s'arrête dessus. */
  const lancer = useCallback(async () => {
    if (!participant || enCours || envoi || resultat) return;
    setErreur("");
    setEnvoi(true);
    try {
      const { data, code } = await appeler("tirer", { participant: participant.id });
      if (code || !data) return setErreur(messageDe(code));
      if (data.stock) setStock(data.stock as Stock);
      const lot = lotParId(data.lot);
      if (!lot) return setErreur(MESSAGES.enregistrement_impossible);
      if (data.reprise) {
        setResultat({ lot, session: data.session ?? null, decision: null, deja: false });
      } else {
        faireTourner(lot);
      }
    } catch {
      setErreur(MESSAGES.enregistrement_impossible);
    } finally {
      setEnvoi(false);
    }
  }, [enCours, envoi, faireTourner, participant, resultat]);

  /** Étape 3a : si le lot est une session, choisir Initiation à l'IA ou Mastermind. */
  const choisirSession = useCallback(
    async (session: IdSession) => {
      if (!participant || !resultat || envoi) return;
      setErreur("");
      setEnvoi(true);
      try {
        const { data, code } = await appeler("choisir", { participant: participant.id, session });
        if (data?.stock) setStock(data.stock as Stock);
        if (code) return setErreur(messageDe(code));
        setResultat({ ...resultat, session });
      } catch {
        setErreur(MESSAGES.enregistrement_impossible);
      } finally {
        setEnvoi(false);
      }
    },
    [envoi, participant, resultat],
  );

  /** Étape 3b : accepter ou refuser. La décision est écrite dans la fiche Airtable. */
  const decider = useCallback(
    async (decision: "accepte" | "refuse") => {
      if (!participant || !resultat || envoi) return;
      setErreur("");
      setEnvoi(true);
      try {
        const { data, code } = await appeler("decider", { participant: participant.id, decision });
        if (data?.stock) setStock(data.stock as Stock);
        if (code) return setErreur(messageDe(code));
        setResultat({ ...resultat, decision: decision === "accepte" ? "accepté" : "refusé" });
      } catch {
        setErreur(MESSAGES.enregistrement_impossible);
      } finally {
        setEnvoi(false);
      }
    },
    [envoi, participant, resultat],
  );

  const tourSuivant = useCallback(() => {
    setResultat(null);
    setParticipant(null);
    setNom("");
    setEmail("");
    setTelephone("");
    setFonction("");
    setConsentement(false);
    setErreur("");
  }, []);

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

  // En présentation, toute la page grandit avec la HAUTEUR de l'écran : les tailles de la page sont
  // en rem, donc elles suivent la taille de caractère racine. 1,85 vh : environ 110 % sur un portable,
  // 140 % sur un grand écran. Remise à zéro en quittant.
  useEffect(() => {
    if (!presentation) return;
    const racine = document.documentElement;
    racine.style.fontSize = "clamp(15px, 1.85vh, 30px)";
    return () => {
      racine.style.fontSize = "";
    };
  }, [presentation]);

  // Clavier : F = plein écran, Échap = quitter la présentation.
  useEffect(() => {
    const touche = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const surChamp = !!(e.target as HTMLElement | null)?.closest("input, textarea, select");
      if ((e.key === "f" || e.key === "F") && !surChamp) {
        e.preventDefault();
        void basculerPresentation();
      } else if (e.key === "Escape" && presentation && !document.fullscreenElement) {
        setPresentation(false);
      }
    };
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [basculerPresentation, presentation]);

  const decompte = useMemo(
    () => LOTS.map((l) => ({ lot: l, n: tirages.filter((t) => t.id === l.id).length })),
    [tirages],
  );

  const occupe = enCours || envoi;
  const champ =
    "bg-primary-foreground/10 border-primary-foreground/25 text-primary-foreground placeholder:text-primary-foreground/50";
  const deverrouillee = !!participant;
  const sessionAChoisir = resultat?.lot?.id === "session" && !resultat.session && !resultat.decision;

  return (
    <main
      className={cn(
        "relative min-h-dvh overflow-hidden text-primary-foreground",
        presentation && "h-screen flex flex-col",
        presentation && inactif && "cursor-none",
      )}
      style={{ background: "linear-gradient(135deg, hsl(var(--mn-nuit)) 0%, hsl(var(--mn-ink)) 100%)" }}
    >
      <SEOHead title="Roue Mare Nostrum" description="Jeu de l'événement Mare Nostrum." noindex={true} />
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

      <div
        className={cn(
          "relative z-10",
          presentation ? "flex-1 min-h-0 flex flex-col w-full px-8 py-4" : "container mx-auto px-4 py-8 md:py-12",
        )}
      >
        <header className={cn("flex flex-col items-center text-center", presentation ? "mb-2 shrink-0" : "mb-6 md:mb-10")}>
          <img
            src={logo}
            alt="Mare Nostrum"
            width={176}
            height={69}
            className={cn("w-auto brightness-0 invert", presentation ? "h-8 mb-2" : "h-11 mb-5")}
          />
          <div className={cn("mn-eyebrow-light mn-eyebrow-pill", presentation ? "mb-2" : "mb-4")}>Jeu de l'événement</div>
          <h1
            className={cn(
              "font-editorial italic font-medium text-primary-foreground",
              presentation && "text-[clamp(1.6rem,4.2vh,3.4rem)] leading-tight",
            )}
            style={{ textWrap: "balance" } as React.CSSProperties}>
            Faites tourner la roue
          </h1>
          {!presentation && (
            <p className="mn-lead text-primary-foreground/80 mt-3 max-w-xl">Quatre lots à gagner avec Mare Nostrum.</p>
          )}
        </header>

        <div
          style={presentation ? { maxWidth: "calc(100vh - 14.5rem + 32rem + 3rem)" } : undefined}
          className={cn(
            "grid mx-auto",
            presentation
              ? "flex-1 min-h-0 w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)]"
              : "gap-10 lg:gap-14 items-start lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] max-w-6xl",
          )}
        >
          {/* ── La roue : toujours affichée ─────────────────────────── */}
          <div className={cn("flex flex-col items-center", presentation && "min-h-0 justify-center")}>
            <div
              className="relative"
              style={{ width: presentation ? "min(100%, calc(100vh - 14.5rem))" : "min(88vw, 34rem)", aspectRatio: "1" }}
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
                aria-label="Roue de la chance : accès Freemium au Club, 3 mois ou 6 mois au Club, 1 session de formation"
                className={cn("w-full h-full transition-[filter] duration-500", !deverrouillee && "saturate-[0.55]")}
                style={{ filter: "drop-shadow(0 30px 50px rgba(5,10,30,0.55))" }}
              >
                {/* Couronne extérieure (fixe) */}
                <circle cx={C} cy={C} r={R + 24} style={{ fill: "hsl(var(--mn-ivory))" }} />
                {Array.from({ length: 30 }).map((_, i) => {
                  const p = point((i * 360) / 30, R + 12);
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
                    const vide = epuise(lot.id);
                    return (
                      <g key={i}>
                        <path d={chemin(i)} style={{ fill: lot.fond, stroke: "hsl(var(--mn-ivory))", strokeWidth: 2.5, opacity: vide ? 0.28 : 1 }} />
                        <g transform={`rotate(${milieu - 90} ${C} ${C})`} style={{ opacity: vide ? 0.5 : 1 }}>
                          <text
                            x={C + R - 22}
                            y={C + 9}
                            textAnchor="end"
                            style={{ fill: lot.texte, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 28 }}
                          >
                            {vide ? "Épuisé" : lot.roue}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>

                {/* Moyeu (fixe) : un cadenas fermé tant que la roue est verrouillée */}
                <circle cx={C} cy={C} r="54" style={{ fill: "hsl(var(--mn-nuit))", stroke: "hsl(var(--mn-ivory))", strokeWidth: 8 }} />
                <circle cx={C} cy={C} r="16" style={{ fill: deverrouillee ? "hsl(var(--mn-turquoise))" : "hsl(var(--mn-ocre))" }} />
              </svg>
            </div>

            <Button
              type="button"
              size="lg"
              variant="secondary"
              className={cn("w-full max-w-md", presentation ? "mt-5" : "mt-8")}
              onClick={() => void lancer()}
              disabled={!deverrouillee || occupe || !!resultat}
            >
              {deverrouillee ? <Unlock aria-hidden="true" /> : <Lock aria-hidden="true" />}
              {enCours ? "La roue tourne…" : "Lancer la roue"}
            </Button>
            <p className="mt-3 text-sm text-primary-foreground/80 text-center min-h-5" aria-live="polite">
              {deverrouillee
                ? `${participant!.nom}, la roue est débloquée : lancez-la.`
                : "Validez vos coordonnées pour débloquer la roue."}
            </p>
            {erreur && deverrouillee && (
              <p role="alert" className="mt-2 rounded-lg border border-[hsl(var(--mn-ocre))] bg-[hsl(var(--mn-ocre)/0.15)] px-3 py-2 text-sm">
                {erreur}
              </p>
            )}
          </div>

          {/* ── Coordonnées, puis les lots ──────────────────────────── */}
          <aside className={cn(presentation ? "space-y-3 min-h-0 max-h-full overflow-y-auto" : "space-y-6")}>
            {/* Étape 1 : coordonnées. Une fois validées, le formulaire laisse place à un récapitulatif. */}
            <section aria-labelledby="titre-coordonnees">
              <h2 id="titre-coordonnees" className="mn-eyebrow-light text-center lg:text-left mb-3">
                {deverrouillee ? "Participant" : "Vos coordonnées"}
              </h2>
              {deverrouillee ? (
                <div
                  className="flex items-center gap-3 rounded-[14px] border border-primary-foreground/15 bg-primary-foreground/[0.06] p-4"
                  style={{ boxShadow: "var(--shadow-glass)" }}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Check aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className="font-semibold leading-tight">{participant!.nom}</p>
                </div>
              ) : (
                <form onSubmit={valider} noValidate className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="roue-nom" className="block text-sm font-medium mb-1.5 text-primary-foreground/80">Nom</label>
                      <Input id="roue-nom" name="nom" autoComplete="name" required value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Marie Dupont" className={champ} disabled={occupe} />
                    </div>
                    <div>
                      <label htmlFor="roue-fonction" className="block text-sm font-medium mb-1.5 text-primary-foreground/80">Fonction</label>
                      <Input id="roue-fonction" name="fonction" autoComplete="organization-title" required value={fonction} onChange={(e) => setFonction(e.target.value)} placeholder="Directrice, étudiant…" className={champ} disabled={occupe} />
                    </div>
                    <div>
                      <label htmlFor="roue-email" className="block text-sm font-medium mb-1.5 text-primary-foreground/80">E-mail</label>
                      <Input id="roue-email" name="email" type="email" inputMode="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr" className={champ} disabled={occupe} />
                    </div>
                    <div>
                      <label htmlFor="roue-tel" className="block text-sm font-medium mb-1.5 text-primary-foreground/80">Téléphone</label>
                      <Input id="roue-tel" name="telephone" type="tel" inputMode="tel" autoComplete="tel" required value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="06 12 34 56 78" className={champ} disabled={occupe} />
                    </div>
                  </div>

                  {/* Piège anti-robot : invisible, jamais rempli par une personne. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={piege} onChange={(e) => setPiege(e.target.value)} />
                  </div>

                  <label className="flex items-start gap-3 text-sm text-primary-foreground/80 leading-snug cursor-pointer min-h-11">
                    <input
                      type="checkbox"
                      checked={consentement}
                      onChange={(e) => setConsentement(e.target.checked)}
                      disabled={occupe}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[hsl(var(--mn-turquoise))]"
                    />
                    <span>
                      J'accepte que Mare Nostrum utilise ces coordonnées pour me remettre mon lot et me recontacter. Mes
                      droits : <a href="mailto:rgpd@marenostrum.tech" className="underline underline-offset-4">rgpd@marenostrum.tech</a>.
                    </span>
                  </label>

                  {erreur && (
                    <p role="alert" className="rounded-lg border border-[hsl(var(--mn-ocre))] bg-[hsl(var(--mn-ocre)/0.15)] px-3 py-2 text-sm">
                      {erreur}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={occupe}>
                    {envoi ? "Enregistrement…" : "Valider et débloquer la roue"}
                  </Button>
                </form>
              )}
            </section>

            <section aria-labelledby="titre-lots" className={cn(presentation ? "space-y-2" : "space-y-3")}>
              <h2 id="titre-lots" className="mn-eyebrow-light text-center lg:text-left">Les lots à gagner</h2>
              <ul className={cn(presentation ? "space-y-2" : "space-y-3")}>
                {LOTS.map((l) => (
                  <li
                    key={l.id}
                    className={cn(
                      "flex items-center gap-4 rounded-[14px] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm",
                      presentation ? "p-4" : "p-4",
                    )}
                    style={{ boxShadow: "var(--shadow-glass)" }}
                  >
                    <span aria-hidden="true" className="h-12 w-2 rounded-full shrink-0 ring-1 ring-primary-foreground/30" style={{ background: l.fond }} />
                    <div className="min-w-0 flex-1">
                      <p className={cn("font-semibold leading-tight", presentation ? "text-xl" : "text-lg", epuise(l.id) && "line-through opacity-60")}>
                        {l.titre}
                        {epuise(l.id) && <span className="ml-2 align-middle text-xs font-bold uppercase tracking-wide">Épuisé</span>}
                      </p>
                      <p className="text-sm text-primary-foreground/70">{l.detail}</p>
                    </div>
                    <p className={cn("font-editorial font-semibold shrink-0 tabular-nums", presentation ? "text-3xl" : "text-2xl")}>
                      <Montant lot={l} />
                    </p>
                  </li>
                ))}
              </ul>
            </section>

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
                <ul className="mt-2 grid grid-cols-4 gap-2 text-center">
                  {decompte.map(({ lot, n }) => (
                    <li key={lot.id} className="rounded-lg bg-primary-foreground/[0.06] px-2 py-2">
                      <p className="font-editorial text-2xl font-semibold tabular-nums">{n}</p>
                      <p className="text-xs text-primary-foreground/70 leading-tight">{lot.roue}</p>
                    </li>
                  ))}
                </ul>
                {Object.keys(stock).length > 0 && (
                  <p className="mt-3 text-sm text-primary-foreground/80">
                    Places restantes :{" "}
                    {SESSIONS.filter((s) => stock[s.id]).map((s, i) => (
                      <span key={s.id}>
                        {i > 0 && " · "}
                        {s.titre} {stock[s.id]!.restant}/{stock[s.id]!.max}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ── Résultat : félicitations, choix de la session, acceptation ou refus ─────── */}
      <div aria-live="polite" className="sr-only">
        {resultat?.lot && !resultat.decision && !resultat.deja ? `Félicitations ! Vous gagnez : ${resultat.lot.titre}, offert.` : ""}
      </div>
      {resultat && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titre-gain"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
          style={{ background: "hsl(var(--mn-ink) / 0.78)" }}
        >
          {!mouvementReduit &&
            !resultat.deja &&
            !resultat.decision &&
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
              "relative w-full rounded-[18px] bg-card text-card-foreground text-center my-auto",
              presentation ? "max-w-2xl p-12" : "max-w-md p-8",
            )}
            style={{ boxShadow: "var(--shadow-lift)" }}
          >
            {resultat.decision || resultat.deja ? (
              /* ── Fin de parcours (ou parcours déjà terminé) ── */
              <>
                <p className="mn-eyebrow-turquoise mb-3">{resultat.deja ? "Déjà joué" : "Merci"}</p>
                <h2 id="titre-gain" className="font-editorial italic mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
                  {resultat.decision === "refusé"
                    ? "C'est noté, merci d'avoir joué !"
                    : resultat.decision === "accepté"
                      ? "Votre lot est enregistré !"
                      : "Cette adresse ou ce numéro a déjà participé."}
                </h2>
                {resultat.lot && (
                  <p className="text-muted-foreground">
                    {resultat.lot.titre}
                    {resultat.session && ` : ${SESSIONS.find((s) => s.id === resultat.session)?.titre}`}
                    {resultat.decision && ` · ${resultat.decision}`}
                  </p>
                )}
                {resultat.decision === "accepté" && (
                  <p className="text-sm text-muted-foreground mt-4">L'équipe Mare Nostrum vous remet votre lot.</p>
                )}
                <Button size="lg" className="mt-7 w-full" onClick={tourSuivant} autoFocus>
                  {resultat.deja ? "Fermer" : "Tour suivant"}
                </Button>
              </>
            ) : (
              /* ── Félicitations : lot offert, prix barré ── */
              resultat.lot && (
                <>
                  <p className="mn-eyebrow-turquoise mb-3">Félicitations</p>
                  <h2 id="titre-gain" className="font-editorial italic mb-2" style={{ textWrap: "balance" } as React.CSSProperties}>
                    {resultat.lot.titre}
                  </h2>
                  <p className="text-muted-foreground">{resultat.lot.detail}</p>
                  <p className="mt-5">
                    <Offert lot={resultat.lot} grand={presentation} />
                  </p>

                  {resultat.lot.id === "session" && (
                    <fieldset className="mt-6 text-left">
                      <legend className="text-sm font-semibold mb-2 text-center w-full">Choisissez votre session</legend>
                      <div className="grid grid-cols-2 gap-3">
                        {SESSIONS.map((s) => {
                          const restant = stock[s.id]?.restant;
                          const complete = restant !== undefined && restant <= 0 && resultat.session !== s.id;
                          const choisie = resultat.session === s.id;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => void choisirSession(s.id)}
                              disabled={complete || envoi}
                              aria-pressed={choisie}
                              className={cn(
                                "mn-btn min-h-[4.5rem] rounded-[14px] border-2 px-3 py-3 text-center font-semibold transition-colors disabled:opacity-45 disabled:cursor-not-allowed",
                                choisie
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background hover:border-primary",
                              )}
                            >
                              {s.titre}
                              <span className="mt-1 block text-xs font-normal opacity-80">
                                {complete ? "Complet" : choisie ? "Choisie" : "Demi-journée"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {erreur && (
                    <p role="alert" className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {erreur}
                    </p>
                  )}

                  <div className="mt-6 grid gap-3">
                    <Button
                      size="lg"
                      onClick={() => void decider("accepte")}
                      disabled={envoi || sessionAChoisir}
                      autoFocus
                    >
                      {sessionAChoisir ? "Choisissez d'abord une session" : "J'accepte mon lot"}
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => void decider("refuse")} disabled={envoi}>
                      Je refuse
                    </Button>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Roue;
