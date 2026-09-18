import type { Tables } from "@/integrations/supabase/types";

export type LiveEvent = Tables<"live_events">;
export type LiveItem = Tables<"live_items">;
export type LiveMessage = Tables<"live_messages">;
export type LiveVote = Tables<"live_votes">;

export type LiveKind = "open" | "poll" | "wall" | "cloud" | "rating";

export const KIND_LABEL: Record<LiveKind, string> = {
  open: "Question ouverte",
  poll: "Sondage",
  wall: "Mur de questions",
  cloud: "Nuage de mots",
  rating: "Satisfaction",
};

export const STATUS_LABEL: Record<string, string> = {
  draft: "Brouillon",
  active: "En direct",
  closed: "Terminé",
};

/** Codes d'erreur PostgreSQL renvoyés par PostgREST. */
export const PG_UNIQUE_VIOLATION = "23505";
export const PG_RLS_VIOLATION = "42501";

/** Limites appliquées côté base, reprises ici pour guider la saisie. */
export const LIMITS = {
  messageLength: 280,
  cloudLength: 40,
  cloudWordsPerPerson: 3,
  messageCooldownMs: 5_000,
  cloudCooldownMs: 2_000,
  /** Messages du mur chargés par un téléphone (les plus likés, puis les plus récents). */
  phoneWallMessages: 60,
};

/**
 * Les téléphones n'ouvrent pas de connexion temps réel : l'offre Supabase gratuite
 * plafonne à 200 connexions simultanées, et une salle peut dépasser ce nombre.
 * Ils interrogent la base à intervalle régulier. L'écran et la régie restent en
 * temps réel instantané.
 */
export const PHONE_POLL_MS = {
  items: 4_000,
  wall: 7_000,
  event: 20_000,
};

export const liveUrls = (publicCode: string) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.marenostrum.tech";
  return {
    public: `${origin}/live/${publicCode}`,
    screen: `${origin}/live/${publicCode}/ecran`,
    regie: `${origin}/live/${publicCode}/regie`,
    conducteur: `${origin}/live/${publicCode}/conducteur`,
    /** Version courte à afficher (sans protocole ni www). */
    display: `${origin.replace(/^https?:\/\/(www\.)?/, "")}/live/${publicCode}`,
  };
};

/** Nom affiché d'un message, en tenant compte de l'anonymat. */
export const authorOf = (m: Pick<LiveMessage, "anonymous" | "author_name" | "author_emoji">) =>
  m.anonymous || !m.author_name ? { name: "Anonyme", emoji: "🕶️" } : { name: m.author_name, emoji: m.author_emoji };
