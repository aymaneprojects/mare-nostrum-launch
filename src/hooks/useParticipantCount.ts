import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Nombre de participants connectés à un événement.
 *
 * Simple comptage périodique : `live_participants` n'est pas diffusée en temps
 * réel, et une requête `head` + `count` ne rapatrie aucune ligne. Rafraîchi
 * toutes les 5 secondes sur l'écran de salle, ce qui suffit à voir le compteur
 * grimper pendant que la salle scanne.
 */
export function useParticipantCount(eventId: string | null | undefined, pollMs = 5_000) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!eventId) {
      setCount(null);
      return;
    }
    let cancelled = false;
    const load = async () => {
      const { count: total } = await supabase
        .from("live_participants")
        .select("id", { count: "exact", head: true })
        .eq("event_id", eventId);
      if (!cancelled && typeof total === "number") setCount(total);
    };
    void load();
    const timer = window.setInterval(load, pollMs);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [eventId, pollMs]);

  return count;
}
