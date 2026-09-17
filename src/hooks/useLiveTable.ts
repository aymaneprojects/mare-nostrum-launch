/**
 * Synchronise en temps réel les lignes d'une table live filtrées sur une colonne.
 *
 * Ordre volontaire : on s'abonne d'abord, puis on charge l'état complet quand le
 * canal est SUBSCRIBED. Charger avant ferait perdre les lignes insérées entre
 * les deux. Le rechargement se refait à chaque ré-abonnement automatique (coupure
 * réseau) et quand l'onglet redevient visible (téléphone sorti de veille).
 *
 * Les évènements reçus pendant un chargement sont mis de côté puis réappliqués
 * par-dessus le résultat, pour qu'un like arrivé en cours de route ne soit pas
 * écrasé par un instantané plus ancien.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type LiveTableName = "live_items" | "live_messages" | "live_votes";

interface Options<T extends LiveTableName> {
  table: T;
  column: "event_id" | "item_id";
  /** Valeur du filtre. null/undefined = hook inactif. */
  value: string | null | undefined;
}

type WithId = { id: string };

export function useLiveTable<T extends LiveTableName>({ table, column, value }: Options<T>) {
  type Row = Tables<T>;
  const [rows, setRows] = useState<Map<string, Row>>(() => new Map());
  const [ready, setReady] = useState(false);

  const fetching = useRef(false);
  const buffer = useRef<Row[]>([]);
  const generation = useRef(0);

  const refetch = useCallback(async () => {
    if (!value) return;
    const mine = ++generation.current;
    fetching.current = true;
    buffer.current = [];

    const query = supabase.from(table).select("*") as unknown as {
      eq: (col: string, val: string) => PromiseLike<{ data: Row[] | null; error: { message: string } | null }>;
    };
    const { data, error } = await query.eq(column, value);

    // Un chargement plus récent a été lancé, ou le filtre a changé : on ignore.
    if (mine !== generation.current) return;
    fetching.current = false;

    if (error) {
      console.error(`[live] chargement ${table} impossible :`, error.message);
      return;
    }
    const next = new Map<string, Row>();
    for (const row of data ?? []) next.set((row as unknown as WithId).id, row);
    for (const row of buffer.current) next.set((row as unknown as WithId).id, row);
    buffer.current = [];
    setRows(next);
    setReady(true);
  }, [table, column, value]);

  useEffect(() => {
    setRows(new Map());
    setReady(false);
    if (!value) return;

    // Suffixe aléatoire : deux composants de la même page peuvent écouter la même table.
    const name = `${table}:${column}:${value}:${Math.random().toString(36).slice(2, 8)}`;
    const channel = supabase
      .channel(name)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `${column}=eq.${value}` },
        (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
          if (payload.eventType === "DELETE") return;
          const row = payload.new as unknown as Row;
          if (fetching.current) buffer.current.push(row);
          setRows((prev) => {
            const next = new Map(prev);
            next.set((row as unknown as WithId).id, row);
            return next;
          });
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") void refetch();
      });

    const onVisible = () => {
      if (document.visibilityState === "visible") void refetch();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      generation.current++;
      document.removeEventListener("visibilitychange", onVisible);
      void supabase.removeChannel(channel);
    };
  }, [table, column, value, refetch]);

  return { rows, ready, refetch };
}
