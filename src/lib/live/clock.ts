/**
 * Heure du serveur, pour les minuteurs.
 *
 * `activated_at` est posé par la base. Le comparer à l'horloge de l'appareil
 * donne un décompte faux dès que celle-ci dérive (PC de vidéoprojecteur sans
 * synchronisation, téléphone réglé à la main). On mesure donc une fois l'écart
 * avec la base, corrigé de la moitié du temps d'aller-retour.
 */
import { supabase } from "@/integrations/supabase/client";

let offsetMs = 0;
let pending: Promise<void> | null = null;

export function syncServerClock(): Promise<void> {
  if (pending) return pending;
  pending = (async () => {
    const t0 = Date.now();
    const { data, error } = await supabase.rpc("live_now");
    const t1 = Date.now();
    if (error || typeof data !== "string") {
      pending = null; // nouvel essai au prochain appel
      return;
    }
    offsetMs = new Date(data).getTime() - (t0 + t1) / 2;
  })();
  return pending;
}

/** Date.now() recalé sur l'horloge du serveur. */
export const serverNow = (): number => Date.now() + offsetMs;
