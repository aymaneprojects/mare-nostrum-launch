import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Calendar, MapPin, Clock, ArrowRight, Loader2, Trophy, Users } from "lucide-react";
import logoNiteo from "@/assets/niteo/logo-niteo-2026.png";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string | undefined;
const stripePromise = stripeKey?.startsWith("pk_") ? loadStripe(stripeKey) : null;

type Phase = "form" | "loading" | "payment" | "confirming" | "success" | "error";

const ROLES = [
  "Invité",
  "Membre du jury",
  "Décideur / Entrepreneur",
  "Investisseur",
  "Coach / Mentor",
  "Expert",
  "Partenaire institutionnel",
  "Partenaire privé",
  "Presse / Média",
  "Autre",
];

export default function NiteoReservation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [phase, setPhase]           = useState<Phase>(sessionId ? "confirming" : "form");
  const [prenom, setPrenom]         = useState("");
  const [nom, setNom]               = useState("");
  const [email, setEmail]           = useState("");
  const [organisation, setOrg]      = useState("");
  const [role, setRole]             = useState("");
  const [error, setError]           = useState("");
  const [clientSecret, setSecret]   = useState("");
  const [successName, setSuccess]   = useState("");

  useEffect(() => {
    if (!sessionId) return;
    supabase.functions.invoke("confirm-niteo-reservation", { body: { session_id: sessionId } })
      .then(({ data, error: fnErr }) => {
        if (fnErr || !data?.success) {
          setError(fnErr?.message ?? "Erreur lors de la confirmation du paiement.");
          setPhase("error");
        } else {
          setSuccess(data.name ?? "");
          setPhase("success");
        }
      });
  }, [sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPhase("loading");
    const { data, error: fnErr } = await supabase.functions.invoke("create-niteo-checkout", {
      body: { nom, prenom, email, organisation, role },
    });
    if (fnErr || !data?.clientSecret) {
      setError(fnErr?.message ?? "Erreur serveur. Réessayez.");
      setPhase("form");
      return;
    }
    setSecret(data.clientSecret);
    setPhase("payment");
  };

  const fetchClientSecret = useCallback(() => Promise.resolve(clientSecret), [clientSecret]);
  const checkoutOptions   = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)",
          backgroundImage: [
            "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)",
            "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)",
          ].join(", "),
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, hsl(181 67% 54% / 0.18) 0%, transparent 55%)" }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <img src={logoNiteo} alt="Niteo Toulouse 2026" className="h-20 mx-auto mb-6" />
          <div className="mn-eyebrow-light mb-4">Mardi 16 juin 2026</div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Demo Day Niteo Toulouse 2026
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Réservez votre présence à la journée de pitchs étudiants devant 30 décideurs toulousains.
            Cocktail, remise des prix et networking.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <Calendar className="h-5 w-5" />, text: "16 juin 2026" },
              { icon: <Clock className="h-5 w-5" />, text: "14h – 19h30" },
              { icon: <MapPin className="h-5 w-5" />, text: "Résidence Baragnon, Toulouse" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-sm px-4 py-2 text-white/90 text-sm font-medium">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme de la journée */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(var(--mn-ink))" }}>
              Programme de la journée
            </h2>
            <div className="space-y-3 mb-10">
              {[
                { time: "14h00", label: "Accueil café + keynote d'ouverture" },
                { time: "14h30", label: "Session de pitchs devant jury" },
                { time: "17h00", label: "Délibération du jury et pause networking" },
                { time: "17h30", label: "Annonce des lauréats et remise des prix" },
                { time: "18h00", label: "Photo finale puis cocktail" },
                { time: "19h30", label: "Fin de l'événement" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-sm border border-border bg-card">
                  <div className="text-sm font-bold tabular-nums w-14 flex-shrink-0" style={{ color: "hsl(var(--mn-turquoise))" }}>
                    {step.time}
                  </div>
                  <div className="text-sm text-foreground">{step.label}</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-sm border border-border/50 bg-secondary/30 text-sm text-muted-foreground text-center">
              Vous pouvez venir sur toute la durée (14h – 19h30) ou seulement de 17h30 à 19h30 pour la remise des prix et le cocktail.
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: <Users className="h-5 w-5" />, value: "30+", label: "décideurs présents" },
              { icon: <Trophy className="h-5 w-5" />, value: "+10 000 €", label: "de dotations" },
              { icon: <CheckCircle2 className="h-5 w-5" />, value: "95", label: "projets accompagnés" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: "hsl(var(--mn-turquoise) / 0.12)", color: "hsl(var(--mn-turquoise))" }}>
                  {s.icon}
                </div>
                <div>
                  <div className="font-bold text-lg" style={{ color: "hsl(var(--mn-nuit))" }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Réservation */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">

            {/* PHASE: SUCCESS */}
            {phase === "success" && (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "hsl(var(--mn-turquoise) / 0.12)" }}>
                  <CheckCircle2 className="h-10 w-10" style={{ color: "hsl(var(--mn-turquoise))" }} />
                </div>
                <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(var(--mn-ink))" }}>
                  Votre présence est confirmée !
                </h2>
                {successName && (
                  <p className="text-muted-foreground mb-2">Bienvenue, <strong>{successName}</strong> 🎉</p>
                )}
                <p className="text-muted-foreground mb-6">
                  Un email de confirmation avec tous les détails de la journée vient de vous être envoyé.
                  Rendez-vous le <strong>mardi 16 juin 2026</strong> à la Résidence Baragnon, Toulouse.
                </p>
                <Link to="/" className="text-sm underline" style={{ color: "hsl(var(--mn-turquoise))" }}>
                  ← Retour à la page Niteo
                </Link>
              </div>
            )}

            {/* PHASE: ERROR */}
            {phase === "error" && (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => { setError(""); setPhase("form"); }} variant="outline">
                  Réessayer
                </Button>
              </div>
            )}

            {/* PHASE: CONFIRMING */}
            {phase === "confirming" && (
              <div className="text-center py-16">
                <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" style={{ color: "hsl(var(--mn-turquoise))" }} />
                <p className="text-muted-foreground">Confirmation du paiement en cours…</p>
              </div>
            )}

            {/* PHASE: FORM */}
            {phase === "form" && (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(var(--mn-ink))" }}>
                  Réservez votre place
                </h2>
                <p className="text-center text-muted-foreground mb-8">
                  25 € · Paiement sécurisé · Invitation nominative
                </p>
                <form onSubmit={handleSubmit} className="space-y-5 bg-card border border-border rounded-sm p-8 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input id="prenom" value={prenom} onChange={e => setPrenom(e.target.value)} required placeholder="Jean" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input id="nom" value={nom} onChange={e => setNom(e.target.value)} required placeholder="Dupont" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jean.dupont@exemple.fr" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="organisation">Organisation / Entreprise</Label>
                    <Input id="organisation" value={organisation} onChange={e => setOrg(e.target.value)} placeholder="Nom de votre structure" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role">Votre rôle dans Niteo</Label>
                    <select
                      id="role"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Sélectionnez…</option>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full"
                    style={{ background: "hsl(var(--mn-turquoise))", color: "hsl(var(--mn-ink))" }}
                  >
                    Réserver ma place — 25 €
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Paiement sécurisé par Stripe · Invitation personnelle et nominative
                  </p>
                </form>
              </>
            )}

            {/* PHASE: LOADING */}
            {phase === "loading" && (
              <div className="text-center py-16">
                <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" style={{ color: "hsl(var(--mn-turquoise))" }} />
                <p className="text-muted-foreground">Initialisation du paiement…</p>
              </div>
            )}

            {/* PHASE: PAYMENT */}
            {phase === "payment" && stripePromise && (
              <div>
                <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "hsl(var(--mn-ink))" }}>
                  Paiement sécurisé
                </h2>
                <EmbeddedCheckoutProvider stripe={stripePromise} options={checkoutOptions}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
