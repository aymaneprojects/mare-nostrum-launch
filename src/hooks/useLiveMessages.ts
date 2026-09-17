import { useMemo } from "react";
import { useLiveTable } from "@/hooks/useLiveTable";
import type { LiveKind, LiveMessage } from "@/lib/live/types";

/**
 * Messages d'une activité (réponses ouvertes ou mur), en temps réel.
 * Tri : plus récents d'abord pour une question ouverte ; plus likés puis plus
 * récents pour un mur. `all` inclut les messages masqués (régie), `visible` non.
 */
export function useLiveMessages(itemId: string | null | undefined, kind: LiveKind | undefined) {
  const { rows, ready } = useLiveTable({ table: "live_messages", column: "item_id", value: itemId });

  const all = useMemo<LiveMessage[]>(() => {
    const list = [...rows.values()];
    return list.sort((a, b) => {
      if (kind === "wall" && b.like_count !== a.like_count) return b.like_count - a.like_count;
      return b.created_at.localeCompare(a.created_at);
    });
  }, [rows, kind]);

  const visible = useMemo(() => all.filter((m) => !m.hidden), [all]);

  return { all, visible, ready };
}
