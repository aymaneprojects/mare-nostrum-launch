import { useMemo } from "react";
import { useLiveTable } from "@/hooks/useLiveTable";

export interface PollResult {
  label: string;
  count: number;
  pct: number;
}

/**
 * Résultats d'un sondage en temps réel. À réserver à l'écran de salle et à la
 * régie : les téléphones n'écoutent pas les votes (trafic inutile).
 */
export function useLiveVotes(itemId: string | null | undefined, options: string[] = []) {
  const { rows, ready } = useLiveTable({ table: "live_votes", column: "item_id", value: itemId });

  return useMemo(() => {
    const counts = options.map(() => 0);
    for (const vote of rows.values()) {
      if (vote.option_index >= 0 && vote.option_index < counts.length) counts[vote.option_index]++;
    }
    const total = counts.reduce((sum, c) => sum + c, 0);
    const results: PollResult[] = options.map((label, i) => ({
      label,
      count: counts[i],
      pct: total ? Math.round((counts[i] / total) * 100) : 0,
    }));
    return { results, total, ready };
  }, [rows, options, ready]);
}
