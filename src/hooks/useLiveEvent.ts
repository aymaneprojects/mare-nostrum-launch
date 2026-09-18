import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLiveTable } from "@/hooks/useLiveTable";
import { PHONE_POLL_MS, type LiveEvent, type LiveItem } from "@/lib/live/types";
import { syncServerClock } from "@/lib/live/clock";

/** Délai avant de réessayer après une erreur réseau au chargement. */
const RETRY_MS = 3_000;

type LoadStatus = "loading" | "ready" | "notfound" | "error";

interface Options {
  /** false = téléphone : interrogation périodique, aucune connexion temps réel. */
  realtime?: boolean;
}

/**
 * Événement live par code public (MN-XXXX) et ses activités.
 * - activeItem : l'activité en cours hors mur (au plus une)
 * - activeWall : le mur, s'il est ouvert (peut l'être en parallèle)
 * - lastItem   : l'activité en cours, sinon la dernière terminée hors mur
 * - screenItems: ce que l'écran de salle doit afficher (1 ou 2 activités), ou vide pour l'accueil
 */
export function useLiveEvent(code: string | undefined, { realtime = true }: Options = {}) {
  const publicCode = (code ?? "").trim().toUpperCase();
  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");

  const loadEvent = useCallback(async () => {
    if (!publicCode) {
      setStatus("notfound");
      return;
    }
    const { data, error } = await supabase
      .from("live_events").select("*").eq("public_code", publicCode).maybeSingle();
    if (error) {
      // Erreur réseau ≠ code inconnu : on garde l'état « prêt » s'il l'était, sinon « error » (nouvel essai plus bas).
      setStatus((s) => (s === "ready" ? s : "error"));
      return;
    }
    // Même contenu = même objet : évite de relancer tous les effets qui dépendent de l'événement.
    setEvent((prev) => (prev && data && JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
    setStatus(data ? "ready" : "notfound");
  }, [publicCode]);

  useEffect(() => {
    setStatus("loading");
    void loadEvent();
    void syncServerClock();
    const onVisible = () => {
      if (document.visibilityState === "visible") void loadEvent();
    };
    document.addEventListener("visibilitychange", onVisible);
    // Téléphones : interrogation. Écran/régie : resynchronisation de secours du temps réel.
    const timer = window.setInterval(() => void loadEvent(), PHONE_POLL_MS.event);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(timer);
    };
  }, [loadEvent]);

  // Premier chargement en échec (réseau saturé pendant la ruée sur le QR) : on réessaie vite.
  useEffect(() => {
    if (status !== "error") return;
    const retry = window.setTimeout(() => void loadEvent(), RETRY_MS);
    return () => window.clearTimeout(retry);
  }, [status, loadEvent]);

  // Écran et régie : l'événement lui-même en temps réel (titre, affichage imposé).
  const eventId = event?.id;
  useEffect(() => {
    if (!realtime || !eventId) return;
    const channel = supabase
      .channel(`live_events:${eventId}:${Math.random().toString(36).slice(2, 8)}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "live_events", filter: `id=eq.${eventId}` },
        (payload) => setEvent(payload.new as LiveEvent))
      .subscribe((s) => { if (s === "SUBSCRIBED") void loadEvent(); });
    return () => { void supabase.removeChannel(channel); };
  }, [realtime, eventId, loadEvent]);

  const { rows, ready: itemsReady, refetch: refetchItems } = useLiveTable({
    table: "live_items",
    column: "event_id",
    value: eventId,
    pollMs: realtime ? undefined : PHONE_POLL_MS.items,
  });

  const items = useMemo<LiveItem[]>(
    () => [...rows.values()].sort((a, b) => a.position - b.position),
    [rows],
  );

  const activeItem = useMemo(() => items.find((i) => i.status === "active" && i.kind !== "wall") ?? null, [items]);
  const activeWall = useMemo(() => items.find((i) => i.status === "active" && i.kind === "wall") ?? null, [items]);

  const lastItem = useMemo(() => {
    if (activeItem) return activeItem;
    const closed = items
      .filter((i) => i.status === "closed" && i.kind !== "wall" && i.closed_at)
      .sort((a, b) => (b.closed_at ?? "").localeCompare(a.closed_at ?? ""));
    return closed[0] ?? null;
  }, [items, activeItem]);

  /**
   * Ce que montre l'écran de salle, par ordre de priorité :
   * 1. l'affichage imposé par la régie (« À l'écran » / « Côte à côte »),
   * 2. la question en cours,
   * 3. le mur, s'il est ouvert et qu'aucune question ne tourne,
   * 4. sinon rien : l'écran revient au QR code en grand.
   *
   * Le retour au QR dès qu'une question est terminée est voulu : il laisse les
   * retardataires rejoindre. Pour garder un résultat affiché après l'avoir
   * terminé, l'animateur le fige avec « À l'écran ».
   */
  const screenItems = useMemo<LiveItem[]>(() => {
    const pinned = (event?.screen_items ?? [])
      .map((id) => items.find((i) => i.id === id))
      .filter((i): i is LiveItem => Boolean(i));
    if (pinned.length) return pinned;
    if (activeItem) return [activeItem];
    if (activeWall) return [activeWall];
    return [];
  }, [event?.screen_items, items, activeItem, activeWall]);

  return {
    publicCode, event, status, items, itemsReady,
    activeItem, activeWall, lastItem, screenItems,
    reloadEvent: loadEvent, refetchItems,
  };
}
