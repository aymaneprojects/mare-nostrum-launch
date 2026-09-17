import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLiveTable } from "@/hooks/useLiveTable";
import type { LiveEvent, LiveItem } from "@/lib/live/types";

type LoadStatus = "loading" | "ready" | "notfound" | "error";

/**
 * Événement live par code public (MN-XXXX) et ses activités, en temps réel.
 * - activeItem : l'activité en direct (au plus une)
 * - lastItem   : l'activité en direct, sinon la dernière clôturée (l'écran garde le rendu final)
 */
export function useLiveEvent(code: string | undefined) {
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
      setStatus("error");
      return;
    }
    setEvent(data);
    setStatus(data ? "ready" : "notfound");
  }, [publicCode]);

  useEffect(() => {
    setStatus("loading");
    void loadEvent();
    const onVisible = () => {
      if (document.visibilityState === "visible") void loadEvent();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [loadEvent]);

  const { rows, ready: itemsReady, refetch: refetchItems } = useLiveTable({
    table: "live_items",
    column: "event_id",
    value: event?.id,
  });

  const items = useMemo<LiveItem[]>(
    () => [...rows.values()].sort((a, b) => a.position - b.position),
    [rows],
  );

  const activeItem = useMemo(() => items.find((i) => i.status === "active") ?? null, [items]);

  const lastItem = useMemo(() => {
    if (activeItem) return activeItem;
    const closed = items
      .filter((i) => i.status === "closed" && i.closed_at)
      .sort((a, b) => (b.closed_at ?? "").localeCompare(a.closed_at ?? ""));
    return closed[0] ?? null;
  }, [items, activeItem]);

  return { publicCode, event, status, items, itemsReady, activeItem, lastItem, reloadEvent: loadEvent, refetchItems };
}
