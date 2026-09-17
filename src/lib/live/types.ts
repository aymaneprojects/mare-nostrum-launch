import type { Tables } from "@/integrations/supabase/types";

export type LiveEvent = Tables<"live_events">;
export type LiveItem = Tables<"live_items">;
export type LiveMessage = Tables<"live_messages">;
export type LiveVote = Tables<"live_votes">;

export type LiveKind = "open" | "poll" | "wall";

export const KIND_LABEL: Record<LiveKind, string> = {
  open: "Question ouverte",
  poll: "Sondage",
  wall: "Mur de questions",
};

export const STATUS_LABEL: Record<string, string> = {
  draft: "Brouillon",
  active: "En direct",
  closed: "Terminé",
};

/** Codes d'erreur PostgreSQL renvoyés par PostgREST. */
export const PG_UNIQUE_VIOLATION = "23505";
export const PG_RLS_VIOLATION = "42501";

export const liveUrls = (publicCode: string) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://www.marenostrum.tech";
  return {
    public: `${origin}/live/${publicCode}`,
    screen: `${origin}/live/${publicCode}/ecran`,
    regie: `${origin}/live/${publicCode}/regie`,
    /** Version courte à afficher (sans protocole ni www). */
    display: `${origin.replace(/^https?:\/\/(www\.)?/, "")}/live/${publicCode}`,
  };
};
