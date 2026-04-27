import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ArrowLeft, Loader2, CheckCircle2, User, Briefcase, CreditCard } from "lucide-react";

const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

export type Offer = "communaute" | "groupe" | "individuel";
export type LocationType = "france" | "congo_brazzaville";
export type Billing = "monthly" | "annual";

const OFFER_LABELS: Record<Offer, string> = {
  communaute: "Communauté",
  groupe: "Groupe",
  individuel: "Individuel",
};

const MONTHLY_PRICES: Record<LocationType, Record<Offer, number>> = {
  france:            { communaute: 30,    groupe: 90,    individuel: 190   },
  congo_brazzaville: { communaute: 10000, groupe: 30000, individuel: 80000 },
};

const ANNUAL_PRICES: Record<LocationType, Record<Offer, number>> = {
  france:            { communaute: 288,    groupe: 864,    individuel: 1728   },
  congo_brazzaville: { communaute: 100000, groupe: 300000, individuel: 800000 },
};

function formatPrice(amount: number, location: LocationType): string {
  if (location === "france") return `${amount} €`;
  return `${amount.toLocaleString("fr-FR")} XOF`;
}

type Phase = "step1" | "step2" | "loading" | "payment";

interface Props {
  open: boolean;
  onClose: () => void;
  offer: Offer;
  location: LocationType;
  billing: Billing;
}

const STEPS = [
  { icon: User,       label: "Toi"         },
  { icon: Briefcase,  label: "Ton projet"  },
  { icon: CreditCard, label: "Paiement"    },
];

export default function ClubOnboarding({ open, onClose, offer, location, billing }: Props) {
  const [phase, setPhase] = useState<Phase>("step1");
  const [prenom, setPrenom]         = useState("");
  const [email, setEmail]           = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [stade, setStade]           = useState("");
  const [error, setError]           = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const price = (billing === "monthly" ? MONTHLY_PRICES : ANNUAL_PRICES)[location][offer];
  const period = billing === "monthly" ? "/mois" : "/an";
  const stepIndex = phase === "step1" ? 0 : phase === "step2" ? 1 : 2;

  const handleClose = () => {
    setPhase("step1");
    setPrenom(""); setEmail(""); setEntreprise(""); setStade("");
    setError(""); setClientSecret("");
    onClose();
  };

  const handleStartPayment = async () => {
    setPhase("loading");
    setError("");
    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-checkout-session", {
        body: { offer, location, billing, prenom, email, entreprise, stade },
      });
      if (fnError) throw new Error(fnError.message);
      if (!data?.clientSecret) throw new Error("Réponse invalide du serveur.");
      setClientSecret(data.clientSecret);
      setPhase("payment");
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue. Réessaie.");
      setPhase("step2");
    }
  };

  const fetchClientSecret = useCallback(
    () => Promise.resolve(clientSecret),
    [clientSecret]
  );

  const step1Valid = prenom.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={`p-0 overflow-hidden transition-all duration-300 mx-3 sm:mx-auto ${
          phase === "payment" ? "sm:max-w-2xl" : "sm:max-w-lg"
        }`}
      >
        {/* Header */}
        <div className="bg-primary px-6 py-5">
          <p className="text-xs text-primary-foreground/60 uppercase tracking-widest mb-1">
            Club Mare Nostrum
          </p>
          <h2 className="font-editorial italic text-xl text-primary-foreground">
            Rejoindre l'offre {OFFER_LABELS[offer]}
          </h2>
        </div>

        {/* Step indicator — masqué pendant le paiement */}
        {phase !== "payment" && (
          <div className="flex items-center justify-center gap-0 px-8 pt-5 pb-1">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const active = stepIndex === i;
              const done   = stepIndex > i;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      done   ? "bg-accent text-white" :
                      active ? "bg-primary text-white" :
                               "bg-muted text-muted-foreground"
                    }`}>
                      {done
                        ? <CheckCircle2 className="h-4 w-4" />
                        : <Icon className="h-4 w-4" />
                      }
                    </div>
                    <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-14 h-0.5 mx-2 mb-4 rounded-full ${stepIndex > i ? "bg-accent" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Body */}
        <div className="px-6 pb-6 pt-3">

          {/* Étape 1 : Prénom + email */}
          {phase === "step1" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Comment te contacter après ton inscription ?</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    placeholder="Aymane"
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && step1Valid && setPhase("step2")}
                    autoFocus
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="toi@exemple.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && step1Valid && setPhase("step2")}
                  />
                </div>
              </div>
              <Button className="w-full" disabled={!step1Valid} onClick={() => setPhase("step2")}>
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
                  <Label htmlFor="entreprise">
                    Entreprise / Projet
                    <span className="text-muted-foreground text-xs ml-1">(optionnel)</span>
                  </Label>
                  <Input
                    id="entreprise"
                    placeholder="Nom de ton projet ou entreprise"
                    value={entreprise}
                    onChange={e => setEntreprise(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ton stade *</Label>
                  <div className="grid gap-2">
                    {[
                      { val: "ideation",        label: "Idéation / Lancement", sub: "0–12 mois, pré-revenu"   },
                      { val: "premiers-clients", label: "Premiers clients",      sub: "1K–10K€ MRR"            },
                      { val: "croissance",       label: "Croissance",            sub: "10K€+ MRR"              },
                    ].map(opt => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setStade(opt.val)}
                        className={`text-left px-4 py-2.5 rounded-sm border text-sm transition-all cursor-pointer ${
                          stade === opt.val
                            ? "border-primary bg-primary/5 text-primary font-semibold"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <span className="font-medium">{opt.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Récap prix */}
              <div className="bg-muted/40 border border-border rounded-sm p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {OFFER_LABELS[offer]} · {location === "france" ? "France" : "Rép. du Congo"} · {billing === "monthly" ? "Mensuel" : "Annuel"}
                  </p>
                  {billing === "annual" && (
                    <p className="text-xs text-accent font-semibold mt-0.5">
                      {location === "france" ? "-20% vs mensuel" : "2 mois offerts"}
                    </p>
                  )}
                </div>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(price, location)}<span className="text-xs font-normal text-muted-foreground">{period}</span>
                </span>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setPhase("step1")} className="flex-none">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  className="flex-1"
                  disabled={!stade}
                  onClick={handleStartPayment}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Passer au paiement
                </Button>
              </div>
            </div>
          )}

          {/* Chargement */}
          {phase === "loading" && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Préparation du paiement sécurisé…</p>
            </div>
          )}

          {/* Stripe Embedded Checkout */}
          {phase === "payment" && clientSecret && stripePromise && (
            <div className="mt-2">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}

          {phase === "payment" && !stripePromise && (
            <p className="text-sm text-destructive py-4 text-center">
              Clé Stripe publique manquante — ajoute <code>VITE_STRIPE_PUBLIC_KEY</code> dans <code>.env</code>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
