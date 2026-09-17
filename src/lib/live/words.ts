/**
 * Regroupement des propositions d'un nuage de mots.
 *
 * « Liberté », « liberte » et « LIBERTÉ ! » comptent pour le même mot : on
 * compare sans accents, sans casse et sans ponctuation, et on affiche la
 * graphie la plus fréquente (avec ses accents).
 */
import type { LiveMessage } from "@/lib/live/types";

export interface CloudWord {
  key: string;
  label: string;
  count: number;
  messages: LiveMessage[];
}

export function normalizeWord(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}'’\- ]+/gu, " ")
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Graphie affichée : on nettoie les espaces et la ponctuation finale, mais on
 * garde la casse d'origine — sinon « l'IA » deviendrait « l'ia ».
 */
const displayForm = (input: string) =>
  input.trim().replace(/\s+/g, " ").replace(/[.!?;:,]+$/g, "");

export function groupWords(messages: LiveMessage[]): CloudWord[] {
  const groups = new Map<string, { messages: LiveMessage[]; forms: Map<string, number> }>();

  for (const m of messages) {
    const key = normalizeWord(m.body);
    if (!key) continue;
    const group = groups.get(key) ?? { messages: [], forms: new Map() };
    group.messages.push(m);
    const form = displayForm(m.body);
    group.forms.set(form, (group.forms.get(form) ?? 0) + 1);
    groups.set(key, group);
  }

  return [...groups.entries()]
    .map(([key, g]) => ({
      key,
      label: [...g.forms.entries()].sort((a, b) => b[1] - a[1])[0][0],
      count: g.messages.length,
      messages: g.messages,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fr"));
}

/**
 * Ordre d'affichage « du centre vers les bords » : le mot le plus fréquent au
 * milieu, les suivants alternés de part et d'autre. Rend un nuage centré avec
 * une simple mise en page en flex-wrap.
 */
export function centerOut<T>(sorted: T[]): T[] {
  const out: T[] = [];
  sorted.forEach((item, i) => {
    if (i % 2 === 0) out.push(item);
    else out.unshift(item);
  });
  return out;
}
