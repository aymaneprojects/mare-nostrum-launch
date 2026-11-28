/**
 * Les edge functions Supabase échouent souvent avec un statut HTTP (402 quota,
 * 503, 500) que le client réduit à « non-2xx ». On relit le corps pour le journal,
 * et on distingue une indisponibilité du service d'une erreur que le visiteur
 * peut retenter tout de suite.
 */

export type DetailFonction = {
  status?: number;
  detail: string;
  indisponible: boolean;
};

const QUOTA = /restricted|exceed_[a-z_]*quota|spend cap/i;

const INDISPO = {
  tu: "Le service est momentanément indisponible. Réessaie plus tard, ou écris à contact@marenostrum.tech.",
  vous: "Le service est momentanément indisponible. Réessayez plus tard, ou écrivez à contact@marenostrum.tech.",
} as const;

function texteUtile(text: string): string {
  const brut = text.trim();
  if (!brut) return "";
  try {
    const json = JSON.parse(brut) as { message?: unknown; error?: unknown };
    const msg = json.message ?? json.error;
    if (typeof msg === "string" && msg.trim()) return msg.trim();
  } catch {
    /* corps texte */
  }
  return brut;
}

export async function detailErreurFonction(error: unknown, status?: number): Promise<DetailFonction> {
  let resolved = status;
  let detail = "";

  if (error && typeof error === "object") {
    const err = error as { message?: unknown; context?: unknown };
    if (err.context instanceof Response) {
      resolved = err.context.status;
      try {
        detail = texteUtile(await err.context.clone().text());
      } catch {
        detail = typeof err.message === "string" ? err.message : "";
      }
    } else if (typeof err.message === "string") {
      detail = err.message.trim();
    }
  } else if (typeof error === "string") {
    detail = error.trim();
  }

  // Le navigateur n'atteint pas le corps du 402 : la prérequête OPTIONS est elle
  // aussi refusée, donc elle échoue au contrôle CORS. Le client ne voit qu'un
  // échec d'envoi, identique à une coupure réseau.
  const echecEnvoi = estEchecEnvoi(error, detail);
  const indisponible = resolved === 402 || resolved === 503 || QUOTA.test(detail) || echecEnvoi;
  return { status: resolved, detail: detail.slice(0, 500), indisponible };
}

function estEchecEnvoi(error: unknown, detail: string): boolean {
  const nom = error && typeof error === "object" ? (error as { name?: string }).name : "";
  if (nom === "FunctionsFetchError") return true;
  return /Failed to send a request to the Edge Function|Failed to fetch|NetworkError|Load failed/i.test(detail);
}

export function messageVisiteur(
  info: { indisponible: boolean },
  fallback: string,
  voix: keyof typeof INDISPO = "tu",
): string {
  return info.indisponible ? INDISPO[voix] : fallback;
}
