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
  User, Briefcase, CreditCard, Download, MessageSquare, Sparkles, PartyPopper,
} from "lucide-react";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string | undefined;
const stripePromise = stripeKey?.startsWith("pk_") ? loadStripe(stripeKey) : null;

const KIT_URL   = "https://drive.google.com/file/d/1FVsdyMqBs7QG4FpGYzEO4o1yH5MkzUDj/view?usp=sharing";
const SLACK_URL = "https://join.slack.com/t/clubmarenostrum/shared_invite/zt-3k96xxhx1-UjfT8oy4ISyHKScmuqsleg";

export type Offer        = "communaute" | "groupe" | "individuel";
export type LocationType = "france" | "congo_brazzaville";
export type Billing      = "monthly" | "annual";

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

type Phase = "step1" | "step2" | "loading" | "payment" | "success" | "kit" | "slack";

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

const FORM_STEPS = [
  { icon: User,       label: "Toi"        },
  { icon: Briefcase,  label: "Ton projet" },
  { icon: CreditCard, label: "Paiement"   },
];

const POST_STEPS = [
  { label: "Bienvenue" },
  { label: "Kit"       },
  { label: "Slack"     },
];

const postStepIndex: Record<Phase, number> = {
  success: 0, kit: 1, slack: 2,
  step1: -1, step2: -1, loading: -1, payment: -1,
};

export default function ClubOnboarding({ open, onClose, offer, location, billing, initialPhase, initialPrenom, initialEmail }: Props) {
  const [phase, setPhase]               = useState<Phase>(initialPhase ?? "step1");
  const [prenom, setPrenom]             = useState(initialPrenom ?? "");
  const [email, setEmail]               = useState(initialEmail ?? "");
  const [entreprise, setEntreprise]     = useState("");
  const [stade, setStade]               = useState("");
  const [error, setError]               = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [cgvAccepted, setCgvAccepted]   = useState(false);
  const [kitClicked, setKitClicked]     = useState(false);

  const price  = (billing === "monthly" ? MONTHLY_PRICES : ANNUAL_PRICES)[location][offer];
  const period = billing === "monthly" ? "/mois" : "/an";
  const formStepIndex = phase === "step1" ? 0 : phase === "step2" ? 1 : 2;

  const isPostPayment = ["success", "kit", "slack"].includes(phase);

  const handleClose = () => {
    if (phase === "payment") return; // bloquer fermeture pendant paiement
    setPhase("step1");
    setPrenom(""); setEmail(""); setEntreprise(""); setStade("");
    setError(""); setClientSecret(""); setCgvAccepted(false); setKitClicked(false);
    onClose();
  };

  const handleStartPayment = async () => {
    setPhase("loading");
    setError("");
    // Persist state so post-redirect restoration works
    sessionStorage.setItem("mn_checkout", JSON.stringify({ offer, location, billing, prenom, email }));
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

  const handleComplete = useCallback(() => {
    sessionStorage.removeItem("mn_checkout"); // no redirect happened
    setPhase("success");
  }, []);

  const fetchClientSecret = useCallback(() => Promise.resolve(clientSecret), [clientSecret]);
  const step1Valid = prenom.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* ─── Header dynamique selon phase ─────────────────────── */
  const headerBg =
    phase === "slack"   ? "bg-accent" :
    isPostPayment       ? "bg-primary" :
                          "bg-primary";

  const headerSub =
    phase === "success" ? "Paiement confirmé ✓" :
    phase === "kit"     ? "Étape 1 sur 2" :
    phase === "slack"   ? "Étape 2 sur 2 — Dernière étape !" :
                          "Club Mare Nostrum";

  const headerTitle =
    phase === "success" ? `Félicitations, ${prenom} !` :
    phase === "kit"     ? "Télécharge ton kit de bienvenue" :
    phase === "slack"   ? "Rejoins la communauté" :
                          `Rejoindre l'offre ${OFFER_LABELS[offer]}`;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={`p-0 flex flex-col transition-all duration-300
          max-sm:left-0 max-sm:top-0 max-sm:translate-x-0 max-sm:translate-y-0
          max-sm:w-full max-sm:h-[100dvh] max-sm:max-w-none max-sm:max-h-none max-sm:rounded-none
          sm:mx-auto sm:max-h-[92dvh] overflow-hidden
          ${phase === "payment" ? "sm:max-w-2xl" : "sm:max-w-lg"}`}
      >
        {/* ── Header ────────────────────────────────────────── */}
        <div className={`${headerBg} px-6 py-5 shrink-0 transition-colors duration-500`}>
          <DialogTitle className="sr-only">{headerTitle}</DialogTitle>
          <p className="text-xs text-white/60 uppercase tracking-widest mb-1">{headerSub}</p>
          <h2 className="font-editorial italic text-xl text-white">{headerTitle}</h2>
        </div>

        {/* ── Indicateur étapes formulaire ──────────────────── */}
        {!isPostPayment && phase !== "payment" && (
          <div className="flex items-center justify-center gap-0 px-8 pt-5 pb-1 shrink-0">
            {FORM_STEPS.map((s, i) => {
              const Icon   = s.icon;
              const active = formStepIndex === i;
              const done   = formStepIndex > i;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      done ? "bg-accent text-white" : active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < FORM_STEPS.length - 1 && (
                    <div className={`w-14 h-0.5 mx-2 mb-4 rounded-full ${formStepIndex > i ? "bg-accent" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Indicateur étapes post-paiement ───────────────── */}
        {isPostPayment && (
          <div className="flex items-center justify-center gap-0 px-8 pt-5 pb-1 shrink-0">
            {POST_STEPS.map((s, i) => {
              const active = postStepIndex[phase] === i;
              const done   = postStepIndex[phase] > i;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      done ? "bg-accent text-white" : active ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      {done ? <CheckCircle2 className="h-4 w-4" /> : (
                        <span className="text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < POST_STEPS.length - 1 && (
                    <div className={`w-14 h-0.5 mx-2 mb-4 rounded-full ${postStepIndex[phase] > i ? "bg-accent" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Body scrollable ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4">

          {/* Étape 1 : Prénom + email */}
          {phase === "step1" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Comment te contacter après ton inscription ?</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input id="prenom" placeholder="Aymane" value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && step1Valid && setPhase("step2")} autoFocus />
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
                  <Input id="entreprise" placeholder="Nom de ton projet ou entreprise"
                    value={entreprise} onChange={e => setEntreprise(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Ton stade *</Label>
                  <div className="grid gap-2">
                    {[
                      { val: "ideation",        label: "Idéation / Lancement", sub: "0–12 mois, pré-revenu" },
                      { val: "premiers-clients", label: "Premiers clients",      sub: "1K–10K€ MRR"          },
                      { val: "croissance",       label: "Croissance",            sub: "10K€+ MRR"            },
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

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={cgvAccepted} onChange={e => setCgvAccepted(e.target.checked)}
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
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret, onComplete: handleComplete }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}
          {phase === "payment" && !stripePromise && (
            <p className="text-sm text-destructive py-4 text-center">
              Clé Stripe publique manquante — ajoute <code>VITE_STRIPE_PUBLIC_KEY</code> dans <code>.env</code>
            </p>
          )}

          {/* ── POST-PAIEMENT : Succès ────────────────────────── */}
          {phase === "success" && (
            <div className="flex flex-col items-center text-center gap-6 py-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center">
                  <PartyPopper className="h-10 w-10 text-accent" strokeWidth={1.5} />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-accent animate-pulse" />
              </div>

              <div className="space-y-2 max-w-xs">
                <p className="font-editorial italic text-2xl text-primary leading-snug">
                  Tu fais partie du Club,<br />{prenom} !
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ton abonnement <strong className="text-foreground">{OFFER_LABELS[offer]}</strong> est actif.
                  On va maintenant te guider pour intégrer la communauté en 2 étapes rapides.
                </p>
              </div>

              <div className="bg-muted/40 rounded-sm px-5 py-4 w-full max-w-xs text-left space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ce qui t'attend</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">1</span>
                  <span>Télécharger ton kit de bienvenue</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs shrink-0">2</span>
                  <span>Rejoindre l'espace digital du Club</span>
                </div>
              </div>

              <Button className="w-full max-w-xs" size="lg" onClick={() => setPhase("kit")}>
                C'est parti <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {/* ── POST-PAIEMENT : Kit ───────────────────────────── */}
          {phase === "kit" && (
            <div className="flex flex-col items-center text-center gap-6 py-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Download className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>

              <div className="space-y-2 max-w-xs">
                <p className="font-semibold text-lg text-foreground">Ton kit de bienvenue</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Il présente l'espace d'échanges entre pairs, la veille d'opportunités et la prise de rendez-vous « visio galère ».
                  Prends quelques minutes pour le parcourir — il te guide pas à pas dans tes premiers échanges avec la communauté.
                </p>
              </div>

              <a
                href={KIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setKitClicked(true)}
                className="flex items-center justify-center gap-2 w-full max-w-xs bg-primary text-primary-foreground rounded-sm px-5 py-3.5 font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Télécharger le kit
              </a>

              <Button
                className="w-full max-w-xs"
                variant={kitClicked ? "default" : "outline"}
                disabled={!kitClicked}
                onClick={() => setPhase("slack")}
              >
                {kitClicked ? (
                  <>Continuer <ArrowRight className="ml-2 h-4 w-4" /></>
                ) : (
                  "Télécharge le kit pour continuer"
                )}
              </Button>

              {!kitClicked && (
                <p className="text-xs text-muted-foreground -mt-2">
                  Clique sur "Télécharger le kit" pour activer ce bouton
                </p>
              )}
            </div>
          )}

          {/* ── POST-PAIEMENT : Slack ─────────────────────────── */}
          {phase === "slack" && (
            <div className="flex flex-col items-center text-center gap-6 py-4">
              <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-accent" strokeWidth={1.5} />
              </div>

              <div className="space-y-2 max-w-xs">
                <p className="font-semibold text-lg text-foreground">L'espace digital du Club</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Inscris-toi sur notre espace privé pour commencer à échanger avec la communauté,
                  accéder à la veille et participer aux sessions.
                </p>
              </div>

              <a
                href={SLACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full max-w-xs bg-accent text-white rounded-sm px-5 py-3.5 font-semibold text-sm hover:bg-accent/90 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Rejoindre la communauté
              </a>

              <div className="w-full max-w-xs space-y-2">
                <div className="border-t border-border pt-4 text-xs text-muted-foreground text-center leading-relaxed">
                  Un email de confirmation a été envoyé à <strong>{email}</strong>.<br />
                  N'hésite pas à nous contacter pour toute question.
                </div>
                <Button variant="ghost" className="w-full text-muted-foreground text-sm" onClick={onClose}>
                  Fermer
                </Button>
              </div>
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}
