/**
 * Mesure d'audience — point de passage unique.
 *
 * Aucun composant n'appelle `gtag` directement : tout passe par ici. Sans cette
 * règle, les noms d'évènements divergent et les rapports deviennent illisibles.
 *
 * Trois principes :
 * 1. Rien n'est mesuré tant que le visiteur n'a pas accepté. Le mode consentement
 *    de Google démarre en « refusé » (voir index.html) ; `setConsent` est le seul
 *    endroit qui le lève, appelé par la bannière cookies.
 * 2. Tout échoue en silence. Un bloqueur de publicité, un navigateur strict ou un
 *    rendu hors navigateur ne doivent jamais casser une page.
 * 3. Les noms d'évènements sont figés dans `EVT` : pas de chaîne libre dans les
 *    composants.
 */

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Noms d'évènements. Un seul endroit où ils existent. */
export const EVT = {
  /** Le visiteur ouvre la fenêtre d'adhésion depuis une carte d'offre. */
  clubModalOpen: "club_modal_open",
  /** Il a renseigné prénom et e-mail, et passe à l'étape suivante. */
  beginCheckout: "begin_checkout",
  /** Le formulaire de paiement Stripe s'affiche réellement. */
  checkoutShown: "checkout_shown",
  /** Paiement abouti. */
  purchase: "purchase",
  /** Un formulaire de contact, diagnostic, livre blanc ou newsletter est envoyé. */
  generateLead: "generate_lead",
} as const;

const gtag = (...args: unknown[]): void => {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag(...args);
    }
  } catch {
    /* mesure indisponible : jamais bloquant */
  }
};

/**
 * Applique le choix du visiteur. Appelé par la bannière cookies, et une fois au
 * démarrage pour un visiteur qui avait déjà accepté lors d'une visite précédente.
 */
export function setConsent(prefs: ConsentPreferences): void {
  gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}

/**
 * Page vue. Le site change de page sans recharger : sans cet appel, seule la
 * première page d'une visite serait comptée.
 */
export function trackPageView(path: string, title?: string): void {
  gtag("event", "page_view", {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: title,
  });
}

/** Évènement métier. Utiliser les noms de `EVT`. */
export function track(event: (typeof EVT)[keyof typeof EVT], params: GtagParams = {}): void {
  gtag("event", event, params);
}

/**
 * Envoie un évènement au plus une fois par clé, même après un rechargement de la
 * page. Indispensable pour un paiement : le retour de Stripe est consulté
 * plusieurs fois, et un achat compté deux fois fausse tout.
 */
export function trackOnce(
  key: string,
  event: (typeof EVT)[keyof typeof EVT],
  params: GtagParams = {},
): void {
  const marker = `mn-tracked:${key}`;
  try {
    if (sessionStorage.getItem(marker)) return;
    sessionStorage.setItem(marker, "1");
  } catch {
    /* stockage indisponible : on mesure quand même, quitte à doublonner */
  }
  track(event, params);
}
