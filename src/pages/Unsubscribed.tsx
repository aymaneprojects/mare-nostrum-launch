import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Unsubscribed = () => {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "notfound">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const { error, data } = await supabase.functions.invoke("newsletter-unsubscribe", {
        body: { email: email.trim() },
      });

      if (error) throw error;
      if ((data as any)?.error === "email introuvable") {
        setStatus("notfound");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">

      <div className="mn-card w-full max-w-[520px] overflow-hidden shadow-[var(--shadow-medium)]">

        {/* ── Header ── */}
        <div
          className="relative overflow-hidden px-6 pt-9 pb-8 sm:px-10"
          style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)" }} />
          <div className="relative flex items-center gap-3.5">
            <img src="/logo.jpg" alt="Mare Nostrum" className="h-10 w-10 object-contain bg-card p-0.5" />
            <div>
              <div className="font-editorial text-[28px] font-semibold leading-none text-primary-foreground">ITER</div>
              <div className="mn-eyebrow-light mt-1.5">par Mare Nostrum</div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="bg-card px-6 pt-11 pb-10 text-center sm:px-10">

          {/* icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent bg-accent/15">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </div>

          <div className="mb-4 font-editorial text-[26px] font-semibold leading-tight text-primary">
            Se désabonner d'ITER
          </div>

          <p className="mb-8 text-[15px] leading-[1.7] text-muted-foreground">
            Saisis ton adresse email pour confirmer ton désabonnement.
          </p>

          {status === "success" ? (
            <div className="text-center py-2">
              <div className="mb-2.5 font-editorial text-xl font-semibold text-primary">
                C'est noté.
              </div>
              <p className="mb-7 text-[15px] leading-[1.7] text-muted-foreground">
                Tu ne recevras plus nos emails. Si l'envie revient — la porte est toujours ouverte.
              </p>

              {/* proof strip */}
              <div className="mn-card mb-6 px-6 py-5">
                <div className="mn-eyebrow mb-3">
                  Ce que tu rates
                </div>
                <div className="flex justify-around gap-2">
                  {[["12", "étapes actionnables"], ["70+", "entrepreneurs actifs"], ["100%", "gratuit"]].map(([num, label]) => (
                    <div key={label} className="flex-1">
                      <div className="font-editorial text-[22px] font-semibold leading-none text-primary">{num}</div>
                      <div className="mn-caption mt-1 leading-[1.4] text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild size="lg" className="mb-3.5 w-full">
                <Link to="/iter">
                  Me réinscrire à ITER →
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/">
                  Retour sur le site
                </Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="text-left">
              <div className="mb-5">
                <Label htmlFor="email" className="mb-1.5 block text-xs font-bold text-primary">
                  Adresse email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="marie@example.com"
                  required
                />
              </div>

              {status === "notfound" && (
                <div className="mb-4 rounded-sm border border-ocre/30 bg-ocre/10 px-3.5 py-3 text-sm text-foreground">
                  Aucun compte trouvé pour cette adresse email.
                </div>
              )}

              {status === "error" && (
                <div className="mb-4 rounded-sm border border-destructive/20 bg-destructive/10 px-3.5 py-3 text-sm text-destructive">
                  Une erreur est survenue. Réessaie dans quelques instants.
                </div>
              )}

              <Button type="submit" size="lg" className="mb-3.5 w-full" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Traitement en cours…
                  </>
                ) : "Confirmer le désabonnement"}
              </Button>

              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/">
                  Retour sur le site
                </Link>
              </Button>
            </form>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="bg-primary px-6 py-5 text-center sm:px-10">
          <div className="mn-caption leading-[1.7] text-primary-foreground/75">
            Mare Nostrum · Toulouse · Paris · Casablanca
          </div>
        </div>
      </div>

      <div className="mn-caption mt-4 text-muted-foreground">
        © Mare Nostrum 2026 · ITER, la lettre hebdomadaire
      </div>
    </div>
  );
};

export default Unsubscribed;
