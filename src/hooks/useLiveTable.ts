/**
 * Synchronise les lignes d'une table live filtrées sur une colonne.
 *
 * Deux modes :
 * - temps réel (écran, régie) : abonnement postgres_changes, puis chargement
 *   complet quand le canal est SUBSCRIBED. Charger avant ferait perdre les lignes
 *   insérées entre les deux. Le rechargement se refait à chaque ré-abonnement
 *   automatique (coupure réseau). Les évènements reçus pendant un chargement sont
 *   réappliqués par-dessus le résultat, pour qu'un like arrivé en cours de route
 *   ne soit pas écrasé par un instantané plus ancien.
 * - interrogation périodique (téléphones) : aucune connexion temps réel ouverte,
 *   rechargement toutes les `pollMs` millisecondes tant que l'onglet est visible.
 *
 * Dans les deux cas, on recharge quand l'onglet redevient visible.
 *
 * En temps réel, un rechargement complet a aussi lieu toutes les RESYNC_MS :
 * les suppressions (DELETE) ne passent pas le filtre postgres_changes, et un
 * pic de votes peut dépasser le quota de messages temps réel. Le rechargement
 * rattrape ces deux cas sans intervention.
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
  /** Si défini : pas de temps réel, rechargement à cet intervalle. */
  pollMs?: number;
  /** Filtre supplémentaire appliqué au chargement (mode interrogation uniquement). */
  extraEq?: [string, string];
  /** Ne charger que les N premières lignes selon `orderBy` (téléphones : allège le trafic). */
  limit?: number;
  orderBy?: { column: string; ascending: boolean }[];
}

type WithId = { id: string };

const RESYNC_MS = 15_000;
const PAGE = 1000; // plafond PostgREST par requête

export function useLiveTable<T extends LiveTableName>({ table, column, value, pollMs, extraEq, limit, orderBy }: Options<T>) {
  type Row = Tables<T>;
  const [rows, setRows] = useState<Map<string, Row>>(() => new Map());
  const [ready, setReady] = useState(false);

  const fetching = useRef(false);
  const buffer = useRef<Row[]>([]);
  const generation = useRef(0);
  const extraCol = extraEq?.[0];
  const extraVal = extraEq?.[1];
  const orderKey = JSON.stringify(orderBy ?? []);

  const refetch = useCallback(async () => {
    if (!value) return;
    const mine = ++generation.current;
    fetching.current = true;
    buffer.current = [];

    type Result = { data: Row[] | null; error: { message: string } | null };
    type Query = {
      eq: (col: string, val: string) => Query;
      order: (col: string, opts: { ascending: boolean }) => Query;
      range: (from: number, to: number) => PromiseLike<Result>;
    } & PromiseLike<Result>;
    const build = () => {
      let query = (supabase.from(table).select("*") as unknown as Query).eq(column, value);
      if (extraCol && extraVal) query = query.eq(extraCol, extraVal);
      const order = JSON.parse(orderKey) as { column: string; ascending: boolean }[];
      for (const o of order) query = query.order(o.column, { ascending: o.ascending });
      // Ordre stable indispensable pour paginer sans doublon ni trou.
      if (!limit) query = query.order("id", { ascending: true });
      return query;
    };

    // Limite demandée : une seule requête. Sinon, pagination par lots de 1000.
    let data: Row[] = [];
    let error: Result["error"] = null;
    if (limit) {
      const res = await build().range(0, limit - 1);
      data = res.data ?? [];
      error = res.error;
    } else {
      for (let from = 0; ; from += PAGE) {
        const res = await build().range(from, from + PAGE - 1);
        if (res.error) { error = res.error; break; }
        data = data.concat(res.data ?? []);
        if ((res.data?.length ?? 0) < PAGE) break;
        if (mine !== generation.current) return;
      }
    }

    // Un chargement plus récent a été lancé, ou le filtre a changé : on ignore.
    if (mine !== generation.current) return;
    fetching.current = false;

    if (error) {
      console.error(`[live] chargement ${table} impossible :`, error.message);
      return;
    }
    const next = new Map<string, Row>();
    for (const row of data) next.set((row as unknown as WithId).id, row);
    for (const row of buffer.current) next.set((row as unknown as WithId).id, row);
    buffer.current = [];
    setRows(next);
    setReady(true);
  }, [table, column, value, extraCol, extraVal, orderKey, limit]);

  useEffect(() => {
    setRows(new Map());
    setReady(false);
    if (!value) return;

    const onVisible = () => {
      if (document.visibilityState === "visible") void refetch();
    };
    document.addEventListener("visibilitychange", onVisible);

    // Mode interrogation périodique.
    if (pollMs) {
      void refetch();
      // Léger décalage aléatoire : 200 téléphones ne frappent pas la base à la même milliseconde.
      const jitter = Math.floor(Math.random() * Math.min(1000, pollMs / 4));
      let timer: number | undefined;
      const start = window.setTimeout(() => {
        // Pas de filtre sur la visibilité : le navigateur ralentit déjà les minuteurs
        // des onglets en arrière-plan, et un onglet peut être « masqué » tout en étant
        // affiché (fenêtre non focalisée, écran de salle en second moniteur…).
        timer = window.setInterval(() => void refetch(), pollMs);
      }, jitter);
      return () => {
        generation.current++;
        window.clearTimeout(start);
        if (timer) window.clearInterval(timer);
        document.removeEventListener("visibilitychange", onVisible);
      };
    }

    // Mode temps réel. Suffixe aléatoire : deux composants peuvent écouter la même table.
    const name = `${table}:${column}:${value}:${Math.random().toString(36).slice(2, 8)}`;
    const channel = supabase
      .channel(name)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `${column}=eq.${value}` },
        (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
          if (payload.eventType === "DELETE") {
            const oldId = (payload.old as Partial<WithId>)?.id;
            if (oldId) {
              setRows((prev) => {
                if (!prev.has(oldId)) return prev;
                const next = new Map(prev);
                next.delete(oldId);
                return next;
              });
            }
            return;
          }
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
        // SUBSCRIBED : premier abonnement ou ré-abonnement après coupure.
        // CHANNEL_ERROR / TIMED_OUT : le client réessaie seul ; on recharge en attendant.
        if (status === "SUBSCRIBED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT") void refetch();
      });
    const resync = window.setInterval(() => void refetch(), RESYNC_MS);

    return () => {
      generation.current++;
      window.clearInterval(resync);
      document.removeEventListener("visibilitychange", onVisible);
      void supabase.removeChannel(channel);
    };
  }, [table, column, value, pollMs, refetch]);

  return { rows, ready, refetch };
}
