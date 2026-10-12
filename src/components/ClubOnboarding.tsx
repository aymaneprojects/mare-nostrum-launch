import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, Loader2, CheckCircle2, X,
  User, Briefcase, CreditCard,
} from "lucide-react";
import { EVT, track, trackOnce } from "@/lib/analytics";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string | undefined;
// Chargé à la première ouverture du paiement seulement. Au niveau du module, le
// script de Stripe était téléchargé sur CHAQUE page du site, y compris l'accueil.
let stripePromiseCache: ReturnType<typeof loadStripe> | null = null;
const getStripePromise = () => {
  if (!stripeKey?.startsWith("pk_")) return null;
  if (!stripePromiseCache) stripePromiseCache = loadStripe(stripeKey);
  return stripePromiseCache;
};

export type PaidOffer    = "communaute" | "groupe";
export type Offer        = "freemium" | PaidOffer;
export type LocationType = "france" | "congo_brazzaville";
export type Billing      = "monthly" | "annual";

const OFFER_LABELS: Record<Offer, string> = {
  freemium:   "Freemium",
  communaute: "Premium",
  groupe:     "Individualisé",
};

const MONTHLY_PRICES: Record<LocationType, Record<PaidOffer, number>> = {
  france:            { communaute: 30,    groupe: 90    },
  congo_brazzaville: { communaute: 10000, groupe: 30000 },
};

const ANNUAL_PRICES: Record<LocationType, Record<PaidOffer, number>> = {
  france:            { communaute: 288,    groupe: 864    },
  congo_brazzaville: { communaute: 100000, groupe: 300000 },
};

function formatPrice(amount: number, location: LocationType): string {
  if (location === "france") return `${amount} €`;
  return `${amount.toLocaleString("fr-FR")} XOF`;
}

// "success" est transitoire : le membre est envoyé sur la page Bienvenue (kit + Slack).
type Phase = "step1" | "step2" | "loading" | "payment" | "success";

interface Props {
  open: boolean;
  onClose: () => void;
  offer: Offer;
  location: LocationType;
  billing: Billing;
  initialPhase?: Phase;
  initialPrenom?: string;
  initialEmail?: string;
}

const ALL_STEPS = [
  { icon: User,       label: "Toi"      },
  { icon: Briefcase,  label: "Projet"   },
  { icon: CreditCard, label: "Paiement" },
];

const phaseToStep: Record<Phase, number> = {
  step1: 0, step2: 1, loading: 2, payment: 2, success: 2,
};

// Parcours gratuit : pas de paiement.
const FREE_STEPS = [
  { icon: User,      label: "Toi"    },
  { icon: Briefcase, label: "Projet" },
];

const freePhaseToStep: Record<Phase, number> = {
  step1: 0, step2: 1, loading: 1, payment: 1, success: 1,
};

export default function ClubOnboarding({ open, onClose, offer, location, billing, initialPhase, initialPrenom, initialEmail }: Props) {
  const [phase, setPhase]               = useState<Phase>(initialPhase ?? "step1");
  const [prenom, setPrenom]             = useState(initialPrenom ?? "");
  const [email, setEmail]               = useState(initialEmail ?? "");
  const [entreprise, setEntreprise]     = useState("");
  const [error, setError]               = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cgvAccepted, setCgvAccepted]   = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const isFree      = offer === "freemium";
  const price       = isFree ? 0 : (billing === "monthly" ? MONTHLY_PRICES : ANNUAL_PRICES)[location][offer];
  const steps       = isFree ? FREE_STEPS : ALL_STEPS;

  // Mesure du tunnel d'adhésion. Quatre points, tous dans ce fichier : ouverture,
  // étape 1 validée, paiement affiché, paiement abouti ; plus chaque étape atteinte.
  // Voir src/lib/analytics.ts.
  useEffect(() => {
    if (open) track(EVT.clubModalOpen, { offer, location, billing });
  }, [open, offer, location, billing]);

  // Chaque étape atteinte : l'étape où le compte chute est celle à simplifier.
  // offer et location sont lus sans être des dépendances, pour ne compter que
  // les changements d'étape.
  useEffect(() => {
    if (open && phase !== "loading") track(EVT.clubOnboardingStep, { phase, offer, location });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase]);
  const period      = billing === "monthly" ? "/mois" : "/an";
  const currentStep = (isFree ? freePhaseToStep : phaseToStep)[phase];
  const navigate    = useNavigate();

  const handleClose = () => {
    setPhase("step1");
    setPrenom(""); setEmail(""); setEntreprise("");
    setError(""); setClientSecret(""); setCgvAccepted(false);
    setEmailTouched(false);
    onClose();
  };

  // Échap / clic extérieur : ignorés pendant le paiement pour ne pas perdre la saisie.
  // La croix (handleClose directe) reste fonctionnelle.
  const handleOpenChange = (next: boolean) => {
    if (!next && (phase === "payment" || phase === "loading")) return;
    handleClose();
  };

  const handleBackFromPayment = () => {
    setClientSecret("");
    setError("");
    setPhase("step2");
  };

  /** Étape 1 validée : prénom et e-mail saisis. C'est le vrai point de fuite. */
  const goToStep2 = () => {
    track(EVT.beginCheckout, { offer, location, billing, value: price, currency: location === "france" ? "EUR" : "XOF" });
    setPhase("step2");
  };

  const handleStartPayment = async () => {
    setPhase("loading");
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-checkout-session", {
        body: { offer, location, billing, prenom, email, entreprise },
      });
      if (fnError) throw new Error(fnError.message);
      if (!data?.clientSecret) throw new Error("Réponse invalide du serveur.");
      setClientSecret(data.clientSecret);
      track(EVT.checkoutShown, { offer, location, billing });
      setPhase("payment");
    } catch (e: any) {
      console.error("create-checkout-session failed:", e);
      setError("Une erreur est survenue. Réessaie.");
      setPhase("step2");
    }
  };

  /** Offre freemium : enregistrement du membre, sans paiement. */
  const handleFreeSignup = async () => {
    setPhase("loading");
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("club-freemium-signup", {
        body: { prenom, email, entreprise, location },
      });
      if (fnError || !data?.ok) throw new Error(fnError?.message ?? "Réponse invalide du serveur.");
      trackOnce(`freemium:${email}`, EVT.clubFreemiumSignup, { method: "club_freemium", offer, location });
      navigate("/bienvenue-club?offre=freemium");
    } catch (e: any) {
      console.error("club-freemium-signup failed:", e);
      setError("Une erreur est survenue. Réessaie.");
      setPhase("step2");
    }
  };

  const handleComplete = useCallback(() => {
    // trackOnce : le retour de Stripe est consulté plusieurs fois (rappel + sondage),
    // un achat compté deux fois fausserait tout le rapport.
    trackOnce(clientSecret.split("_secret_")[0] || "club", EVT.purchase, {
      offer, location, billing, value: price, currency: location === "france" ? "EUR" : "XOF",
      items: [{ item_id: offer, item_name: `Club ${offer}`, price }],
    });
    setPhase("success");
  }, [clientSecret, offer, location, billing, price]);

  const fetchClientSecret = useCallback(() => Promise.resolve(clientSecret), [clientSecret]);

  // Memoize options so EmbeddedCheckoutProvider never remounts due to a new object reference
  const checkoutOptions = useMemo(() => ({
    fetchClientSecret,
    onComplete: handleComplete,
  }), [fetchClientSecret, handleComplete]);

  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bodyRef.current?.scrollTo({ top: 0, behavior: "instant" }); }, [phase]);

  // Fallback: poll session status in case onComplete doesn't fire (some banks / mobile)
  useEffect(() => {
    if (phase !== "payment" || !clientSecret) return;
    const sessionId = clientSecret.split("_secret_")[0];
    const id = window.setInterval(async () => {
      const { data } = await supabase.functions.invoke("get-checkout-session", { body: { sessionId } });
      if (data?.paid) {
        clearInterval(id);
        setPhase("success");
      }
    }, 3000);
    return () => clearInterval(id);
  }, [phase, clientSecret]);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const step1Valid = prenom.trim() !== "" && emailValid;
  const showEmailError = emailTouched && email.trim() !== "" && !emailValid;

  useEffect(() => {
    if (phase === "payment" && !getStripePromise()) {
      console.error("Missing Stripe public key: set VITE_STRIPE_PUBLIC_KEY in .env");
    }
  }, [phase]);

  /* ─── Header ─────────────────────────────────────────── */
  const headerSub = "Club Mare Nostrum";
  const headerTitle = `Rejoindre l'offre ${OFFER_LABELS[offer]}`;

  // Paiement abouti (rappel Stripe, sondage ou retour de session) : page Bienvenue.
  useEffect(() => {
    if (phase === "success") navigate("/bienvenue-club");
  }, [phase, navigate]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={`p-0 flex flex-col transition-all duration-300
          max-sm:left-0 max-sm:top-0 max-sm:translate-x-0 max-sm:translate-y-0
          max-sm:w-full max-sm:h-[100dvh] max-sm:max-w-none max-sm:max-h-none max-sm:rounded-none
          sm:mx-auto sm:max-h-[92dvh] overflow-hidden
          [&>button:last-child]:hidden
          sm:max-w-2xl`}
      >
        {/* ── Header ────────────────────────────────────────── */}
        <div className="bg-primary px-6 sm:px-10 py-5 shrink-0 transition-colors duration-500 relative">
          <DialogTitle className="sr-only">{headerTitle}</DialogTitle>
          <p className="text-sm text-primary-foreground/80 mb-1">{headerSub}</p>
          <h2 className="font-editorial italic text-xl text-primary-foreground pr-10">{headerTitle}</h2>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 active:bg-primary-foreground/30 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4 text-primary-foreground" />
          </button>
        </div>

        {/* ── Stepper ───────────────────────────────────────── */}
        {phase !== "loading" && (
          <div className="px-4 pt-4 pb-1 shrink-0">
            <p className="text-center text-base font-semibold text-primary mb-3">
              Étape {currentStep + 1} sur {steps.length}
            </p>
            <ol className="flex items-center justify-center">
              {steps.map((s, i) => {
                const Icon   = s.icon;
                const active = currentStep === i;
                const done   = currentStep > i;
                return (
                  <li key={i} className="flex items-center" aria-current={active ? "step" : undefined}>
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                        done   ? "bg-accent text-accent-foreground" :
                        active ? "bg-primary text-primary-foreground" :
                                 "bg-muted text-foreground"
                      }`}>
                        {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <span className={`text-sm font-medium leading-tight ${active ? "text-primary" : "text-foreground"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-8 sm:w-14 h-0.5 mx-2 mb-6 rounded-full transition-all duration-300 ${
                        currentStep > i ? "bg-accent" : "bg-border"
                      }`} />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {/* ── Body scrollable ───────────────────────────────── */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto px-6 sm:px-10 pb-8 pt-4">

          {/* Étape 1 : Prénom + email */}
          {phase === "step1" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Comment te contacter après ton inscription ?</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input id="prenom" placeholder="Prénom" value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && step1Valid && goToStep2()} autoFocus />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="toi@exemple.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    aria-invalid={showEmailError}
                    aria-describedby={showEmailError ? "email-error" : undefined}
                    onKeyDown={e => e.key === "Enter" && step1Valid && goToStep2()} />
                  {showEmailError && (
                    <p id="email-error" role="alert" className="text-sm text-destructive">
                      Adresse e-mail invalide
                    </p>
                  )}
                </div>
              </div>
              <Button className="w-full" disabled={!step1Valid} onClick={goToStep2}>
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Étape 2 : Projet + récap */}
          {phase === "step2" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Parle-nous de ton projet.</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="entreprise">{isFree ? "Entreprise / Projet" : "Entreprise / Projet *"}</Label>
                  <Input id="entreprise" placeholder="Nom de ton projet ou entreprise"
                    value={entreprise} onChange={e => setEntreprise(e.target.value)} autoFocus />
                </div>
              </div>

              {isFree ? (
                <div className="bg-muted/40 border border-border rounded-sm p-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{OFFER_LABELS[offer]}</p>
                  <span className="text-xl font-bold text-primary">Gratuit</span>
                </div>
              ) : (
                <div className="bg-muted/40 border border-border rounded-sm p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {OFFER_LABELS[offer]} · {location === "france" ? "France" : "Rép. du Congo"} · {billing === "monthly" ? "Mensuel" : "Annuel"}
                    </p>
                    {billing === "annual" && (
                      <p className="text-sm text-accent font-semibold mt-0.5">
                        {location === "france" ? "-20% vs mensuel" : "2 mois offerts"}
                      </p>
                    )}
                  </div>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(price, location)}<span className="text-sm font-normal text-muted-foreground">{period}</span>
                  </span>
                </div>
              )}

              {isFree ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aucun paiement, aucune carte bancaire. Tes coordonnées servent à t'ouvrir l'accès au Club et à te tenir informé(e) de ses activités, conformément à notre{" "}
                  <a href="/confidentialite" target="_blank" rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80">
                    politique de confidentialité
                  </a>.
                </p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    Abonnement reconductible tacitement. Un préavis de <strong>3 mois</strong> est requis pour résilier.
                  </p>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={cgvAccepted} onChange={e => setCgvAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-border accent-primary cursor-pointer" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  J'ai lu et j'accepte les{" "}
                  <a href="/cgv" target="_blank" rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                    onClick={e => e.stopPropagation()}>
                    conditions générales de vente
                  </a>{" "}de Mare Nostrum.
                </span>
              </label>
                </>
              )}

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setPhase("step1")} className="flex-none">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                {isFree ? (
                  <Button className="flex-1" onClick={handleFreeSignup}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Rejoindre gratuitement
                  </Button>
                ) : (
                  <Button className="flex-1" disabled={!entreprise.trim() || !cgvAccepted} onClick={handleStartPayment}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Passer au paiement
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Chargement */}
          {phase === "loading" && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{isFree ? "Enregistrement de ton inscription…" : "Préparation du paiement sécurisé…"}</p>
            </div>
          )}

          {/* Stripe Embedded Checkout */}
          {phase === "payment" && clientSecret && getStripePromise() && (
            <div className="mt-2">
              <Button variant="ghost" size="sm" onClick={handleBackFromPayment} className="mb-2 -ml-2 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Retour</span>
              </Button>
              <EmbeddedCheckoutProvider stripe={getStripePromise()} options={checkoutOptions}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}
          {phase === "payment" && !getStripePromise() && (
            <p className="text-sm text-destructive py-4 text-center">
              Une erreur est survenue. Réessaie.
            </p>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
