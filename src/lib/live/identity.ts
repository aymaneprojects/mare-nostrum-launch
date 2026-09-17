/**
 * Identité d'un participant à un événement live : prénom + emoji, conservée
 * dans le navigateur (une par événement). L'identifiant est généré ici et
 * inséré tel quel dans live_participants.
 */

export interface LiveIdentity {
  id: string;
  firstName: string;
  emoji: string;
}

export const EMOJIS = [
  "🦊", "🐼", "🦁", "🐸", "🐙", "🦉", "🐬", "🦋",
  "🌵", "🌊", "⚡", "🔥", "🌙", "⭐", "🍀", "🌈",
  "🎯", "🎸", "🚀", "🧭", "🪁", "🎈", "🧩", "🏄",
] as const;

export const randomEmoji = (): string => EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

const key = (eventId: string) => `mn-live-participant:${eventId}`;

export function loadIdentity(eventId: string): LiveIdentity | null {
  try {
    const raw = localStorage.getItem(key(eventId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LiveIdentity>;
    if (!parsed.id || !parsed.firstName || !parsed.emoji) return null;
    return { id: parsed.id, firstName: parsed.firstName, emoji: parsed.emoji };
  } catch {
    return null;
  }
}

export function saveIdentity(eventId: string, identity: LiveIdentity): void {
  try {
    localStorage.setItem(key(eventId), JSON.stringify(identity));
  } catch {
    /* stockage indisponible (navigation privée stricte) : l'identité vit en mémoire */
  }
}

export function newIdentity(firstName: string, emoji: string): LiveIdentity {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
  return { id, firstName: firstName.trim(), emoji };
}

/** Mémoire locale des actions déjà faites (vote / like), pour verrouiller l'UI sans aller-retour. */
export function remember(kind: "voted" | "liked", scope: string, id: string): void {
  try {
    const k = `mn-live-${kind}:${scope}`;
    const set = new Set<string>(JSON.parse(localStorage.getItem(k) ?? "[]"));
    set.add(id);
    localStorage.setItem(k, JSON.stringify([...set]));
  } catch { /* ignore */ }
}

export function remembered(kind: "voted" | "liked", scope: string): Set<string> {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(`mn-live-${kind}:${scope}`) ?? "[]"));
  } catch {
    return new Set();
  }
}
