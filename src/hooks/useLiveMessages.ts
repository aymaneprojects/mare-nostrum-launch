import { useMemo } from "react";
import { useLiveTable } from "@/hooks/useLiveTable";
import type { LiveKind, LiveMessage } from "@/lib/live/types";

interface Options {
  /** Téléphone : interrogation périodique au lieu du temps réel. */
  pollMs?: number;
  /** Téléphone, mur : seulement les N messages les plus likés puis les plus récents. */
  limit?: number;
}

/**
 * Messages d'une activité (réponses ouvertes, mots de nuage ou mur).
 * Tri : plus likés puis plus récents pour un mur ; plus récents sinon.
 * `all` inclut les messages masqués (régie), `visible` non.
 */
export function useLiveMessages(itemId: string | null | undefined, kind: LiveKind | undefined, { pollMs, limit }: Options = {}) {
  const { rows, ready, refetch } = useLiveTable({
    table: "live_messages", column: "item_id", value: itemId, pollMs, limit,
    orderBy: limit ? [{ column: "like_count", ascending: false }, { column: "created_at", ascending: false }] : undefined,
  });

  const all = useMemo<LiveMessage[]>(() => {
    const list = [...rows.values()];
    return list.sort((a, b) => {
      if (kind === "wall" && b.like_count !== a.like_count) return b.like_count - a.like_count;
      return b.created_at.localeCompare(a.created_at);
    });
  }, [rows, kind]);

  const visible = useMemo(() => all.filter((m) => !m.hidden), [all]);

  return { all, visible, ready, refetch };
}
