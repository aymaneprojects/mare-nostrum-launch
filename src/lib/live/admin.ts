/**
 * Appels à l'edge function live-admin (actions de l'animateur).
 * Le code animateur est conservé pour la session du navigateur uniquement.
 */
import { supabase } from "@/integrations/supabase/client";

export type AdminAction =
  | "create_event" | "verify" | "update_event" | "close_event"
  | "create_item" | "update_item" | "delete_item" | "get_notes" | "delete_participant"
  | "activate" | "close" | "set_screen"
  | "hide_message" | "hide_messages";

const key = (publicCode: string) => `mn-live-admin:${publicCode.toUpperCase()}`;

export function loadAdminCode(publicCode: string): string | null {
  try { return sessionStorage.getItem(key(publicCode)); } catch { return null; }
}
export function saveAdminCode(publicCode: string, adminCode: string): void {
  try { sessionStorage.setItem(key(publicCode), adminCode); } catch { /* ignore */ }
}
export function forgetAdminCode(publicCode: string): void {
  try { sessionStorage.removeItem(key(publicCode)); } catch { /* ignore */ }
}

export class LiveAdminError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Invoque live-admin. Lève LiveAdminError avec le message renvoyé par la
 * fonction ({ error }) et le statut HTTP quand il est connu.
 */
export async function liveAdmin<T = unknown>(action: AdminAction, body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("live-admin", { body: { action, ...body } });

  if (error) {
    // FunctionsHttpError expose la réponse ; on préfère le message métier de la fonction.
    const ctx = (error as { context?: Response }).context;
    let message = error.message;
    let status = 500;
    if (ctx && typeof ctx.json === "function") {
      status = ctx.status;
      try {
        const payload = await ctx.json();
        if (payload?.error) message = payload.error;
      } catch { /* corps non JSON */ }
    }
    throw new LiveAdminError(message, status);
  }
  if (data && typeof data === "object" && "error" in data && (data as { error?: string }).error) {
    throw new LiveAdminError((data as { error: string }).error, 400);
  }
  return data as T;
}
