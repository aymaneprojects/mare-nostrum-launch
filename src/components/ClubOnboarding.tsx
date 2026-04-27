import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight, ArrowLeft, Loader2, CheckCircle2,
  User, Briefcase, CreditCard, Download, MessageSquare, Sparkles,
} from "lucide-react";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string | undefined;
const stripePromise = stripeKey?.startsWith("pk_") ? loadStripe(stripeKey) : null;

const KIT_URL  = "https://drive.google.com/file/d/1FVsdyMqBs7QG4FpGYzEO4o1yH5MkzUDj/view?usp=sharing";
const SLACK_URL = "https://join.slack.com/t/clubmarenostrum/shared_invite/zt-3k96xxhx1-UjfT8oy4ISyHKScmuqsleg";

export type Offer = "communaute" | "groupe" | "individuel";
export type LocationType = "france" | "congo_brazzaville";
export type Billing = "monthly" | "annual";

const OFFER_LABELS: Record<Offer, string> = {
  communaute: "Communauté",
  groupe:     "Groupe",
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

type Phase = "step1" | "step2" | "loading" | "payment" | "success";

interface Props {
  open: boolean;
  onClose: () => void;
  offer: Offer;
  location: LocationType;
  billing: Billing;
}

const STEPS = [
  { icon: User,       label: "Toi"        },
  { icon: Briefcase,  label: "Ton projet" },
  { icon: CreditCard, label: "Paiement"   },
];

export default function ClubOnboarding({ open, onClose, offer, location, billing }: Props) {
  const [phase, setPhase]               = useState<Phase>("step1");
  const [prenom, setPrenom]             = useState("");
  const [email, setEmail]               = useState("");
  const [entreprise, setEntreprise]     = useState("");
  const [stade, setStade]               = useState("");
  const [error, setError]               = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cgvAccepted, setCgvAccepted]   = useState(false);

  const price  = (billing === "monthly" ? MONTHLY_PRICES : ANNUAL_PRICES)[location][offer];
  const period = billing === "monthly" ? "/mois" : "/an";
  const stepIndex = phase === "step1" ? 0 : phase === "step2" ? 1 : 2;

  const handleClose = () => {
    // Don't allow closing mid-payment, but allow after success
    if (phase === "payment") return;
    setPhase("step1");
    setPrenom(""); setEmail(""); setEntreprise(""); setStade("");
    setError(""); setClientSecret(""); setCgvAccepted(false);
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

  const fetchClientSecret = useCallback(() => Promise.resolve(clientSecret), [clientSecret]);
  const handleComplete     = useCallback(() => setPhase("success"), []);

  const step1Valid = prenom.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isSuccess = phase === "success";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={`p-0 flex flex-col transition-all duration-300
          max-sm:left-0 max-sm:top-0 max-sm:translate-x-0 max-sm:translate-y-0
          max-sm:w-full max-sm:h-[100dvh] max-sm:max-w-none max-sm:max-h-none max-sm:rounded-none
          sm:mx-auto sm:max-h-[92dvh] overflow-hidden
          ${phase === "payment" ? "sm:max-w-2xl" : "sm:max-w-lg"}`}
      >
        {/* Header */}
        <div className={`px-6 py-5 shrink-0 transition-colors duration-500 ${isSuccess ? "bg-accent" : "bg-primary"}`}>
          <DialogTitle className="sr-only">
            {isSuccess ? `Bienvenue ${prenom} !` : `Rejoindre l'offre ${OFFER_LABELS[offer]} — Club Mare Nostrum`}
          </DialogTitle>
          <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
            {isSuccess ? "Paiement confirmé ✓" : "Club Mare Nostrum"}
          </p>
          <h2 className="font-editorial italic text-xl text-white" aria-hidden="true">
            {isSuccess
              ? `Bienvenue, ${prenom} !`
              : `Rejoindre l'offre ${OFFER_LABELS[offer]}`}
          </h2>
        </div>

        {/* Step indicator — masqué pendant le paiement et le succès */}
        {phase !== "payment" && phase !== "success" && (
          <div className="flex items-center justify-center gap-0 px-8 pt-5 pb-1 shrink-0">
            {STEPS.map((s, i) => {
              const Icon  = s.icon;
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
                      {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
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

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-3">

          {/* ── Étape 1 : Prénom + email ── */}
          {phase === "step1" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Comment te contacter après ton inscription ?</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input id="prenom" placeholder="Aymane" value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && step1Valid && setPhase("step2")}
                    autoFocus />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="toi@exemple.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && step1Valid && setPhase("step2")} />
                </div>
              </div>
              <Button className="w-full" disabled={!step1Valid} onClick={() => setPhase("step2")}>
                Suivant <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* ── Étape 2 : Projet + récap ── */}
          {phase === "step2" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Parle-nous de ton projet.</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="entreprise">
                    Entreprise / Projet
                    <span className="text-muted-foreground text-xs ml-1">(optionnel)</span>
                  </Label>
                  <Input id="entreprise" placeholder="Nom de ton projet ou entreprise"
                    value={entreprise} onChange={e => setEntreprise(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Ton stade *</Label>
                  <div className="grid gap-2">
                    {[
                      { val: "ideation",         label: "Idéation / Lancement", sub: "0–12 mois, pré-revenu" },
                      { val: "premiers-clients",  label: "Premiers clients",      sub: "1K–10K€ MRR"          },
                      { val: "croissance",        label: "Croissance",            sub: "10K€+ MRR"            },
                    ].map(opt => (
                      <button key={opt.val} type="button" onClick={() => setStade(opt.val)}
                        className={`text-left px-4 py-2.5 rounded-sm border text-sm transition-all cursor-pointer ${
                          stade === opt.val
                            ? "border-primary bg-primary/5 text-primary font-semibold"
                            : "border-border hover:border-primary/40"
                        }`}>
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

              <p className="text-xs text-muted-foreground">
                Abonnement reconductible tacitement. Un préavis de <strong>3 mois</strong> est requis pour résilier.
              </p>

              {/* CGV */}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={cgvAccepted}
                  onChange={e => setCgvAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-border accent-primary cursor-pointer" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  J'ai lu et j'accepte les{" "}
                  <a href="/cgv" target="_blank" rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                    onClick={e => e.stopPropagation()}>
                    conditions générales de vente
                  </a>{" "}de Mare Nostrum.
                </span>
              </label>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setPhase("step1")} className="flex-none">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button className="flex-1" disabled={!stade || !cgvAccepted} onClick={handleStartPayment}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Passer au paiement
                </Button>
              </div>
            </div>
          )}

          {/* ── Chargement ── */}
          {phase === "loading" && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Préparation du paiement sécurisé…</p>
            </div>
          )}

          {/* ── Stripe Embedded Checkout ── */}
          {phase === "payment" && clientSecret && stripePromise && (
            <div className="mt-2">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret, onComplete: handleComplete }}
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

          {/* ── Succès / Bienvenue ── */}
          {phase === "success" && (
            <div className="flex flex-col items-center text-center py-6 gap-6">

              {/* Icône */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-accent" strokeWidth={1.8} />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent animate-pulse" />
              </div>

              {/* Message personnalisé */}
              <div className="space-y-2 max-w-xs">
                <p className="font-editorial italic text-2xl text-primary leading-snug">
                  Tu fais partie du Club,<br />{prenom} !
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ton abonnement <strong>{OFFER_LABELS[offer]}</strong> est actif.
                  Voici tes prochaines étapes pour rejoindre la communauté.
                </p>
              </div>

              {/* CTAs */}
              <div className="w-full space-y-3 max-w-xs">
                {/* Slack — principal */}
                <a href={SLACK_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-primary text-primary-foreground rounded-sm px-4 py-3.5 hover:bg-primary/90 transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">Rejoindre l'espace digital</p>
                    <p className="text-xs text-white/60">Slack privé du Club Mare Nostrum</p>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Kit */}
                <a href={KIT_URL} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full border border-border rounded-sm px-4 py-3.5 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Download className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm text-foreground">Kit de bienvenue</p>
                    <p className="text-xs text-muted-foreground">Guide pratique du Club</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Fermer */}
                <Button variant="ghost" className="w-full text-muted-foreground" onClick={onClose}>
                  Fermer
                </Button>
              </div>

              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Un email de confirmation va t'être envoyé à <strong>{email}</strong>.
                N'hésite pas à nous contacter pour toute question.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
