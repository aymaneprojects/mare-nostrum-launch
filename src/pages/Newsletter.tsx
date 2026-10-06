import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { EVT, track } from "@/lib/analytics";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Newsletter = () => {
  const [nom, setNom]             = useState("");
  const [email, setEmail]         = useState("");
  const [projet, setProjet]       = useState("");
  const [telephone, setTelephone] = useState("");
  const [rgpd, setRgpd]           = useState(false);
  const [status, setStatus]       = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !email.trim() || !rgpd) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const { error } = await supabase.functions.invoke("newsletter-signup", {
        body: { nom: nom.trim(), email: email.trim(), projet: projet.trim(), telephone: telephone.trim(), rgpd },
      });
      if (error) throw error;
      track(EVT.generateLead, { form: "newsletter" });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Une erreur est survenue. Réessaie dans quelques instants.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">

      <div className="mn-card w-full max-w-[520px] overflow-hidden shadow-[var(--shadow-medium)]">

        {/* ── Header ITER ── */}
        <div
          className="relative overflow-hidden px-6 pt-10 pb-9 sm:px-10"
          style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)" }} />

          {/* eyebrow */}
          <div className="mn-eyebrow-light relative mb-5">
            ITER · La lettre Mare Nostrum
          </div>

          {/* logo lockup */}
          <div className="relative mb-7 flex items-center gap-3.5">
            <img src="/logo.jpg" alt="Mare Nostrum" className="h-11 w-11 object-contain bg-card p-0.5" />
            <div>
              <div className="font-editorial text-[32px] font-semibold leading-none text-primary-foreground">ITER</div>
              <div className="mn-eyebrow-light mt-1.5">par Mare Nostrum</div>
            </div>
          </div>

          <div className="relative mb-7 border-t border-primary-foreground/20" />

          {/* quote */}
          <div className="relative">
            <div className="mn-eyebrow-light mb-3.5">
              Phrase d'inspiration
            </div>
            <div className="font-editorial italic text-[22px] leading-[1.35] text-primary-foreground">
              «&nbsp;Le meilleur moment pour planter un arbre était il y a vingt ans. Le deuxième meilleur moment, c'est maintenant.&nbsp;»
            </div>
            <div className="mt-3.5 text-[13px] font-medium text-primary-foreground/75">
              — Proverbe chinois
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="bg-card px-6 pt-9 pb-10 sm:px-10">

          {status === "success" ? (
            <div className="text-center pt-4 pb-2">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-accent/15">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="mb-2.5 font-editorial text-[22px] font-semibold text-primary">
                Bienvenue dans l'aventure !
              </div>
              <p className="mb-6 text-[15px] leading-[1.65] text-muted-foreground">
                Tu es bien inscrit(e) à <strong className="text-primary">ITER</strong>. La prochaine étape arrive dans ta boîte mail.
              </p>
              <Button asChild size="lg">
                <Link to="/">
                  Découvrir Mare Nostrum →
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-2">
                <div className="mr-2.5 inline-block h-0.5 w-6 align-middle bg-primary" />
                <span className="mn-eyebrow">Inscription</span>
              </div>

              <div className="mt-3.5 mb-2 font-editorial text-2xl font-semibold leading-tight text-primary">
                Transforme ton idée utile en entreprise solide.
              </div>
              <p className="mb-7 text-[15px] leading-[1.65] text-muted-foreground">
                ITER, c'est la lettre hebdomadaire de Mare Nostrum. Reçois gratuitement des méthodes, des ressources et des outils pratiques pour avancer concrètement.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-5">
                  <Label htmlFor="nom" className="mb-1.5 block text-xs font-bold text-primary">
                    Nom et prénom *
                  </Label>
                  <Input
                    id="nom"
                    type="text"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    placeholder="Marie Dupont" required
                  />
                </div>

                <div className="mb-5">
                  <Label htmlFor="email" className="mb-1.5 block text-xs font-bold text-primary">
                    Adresse email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="marie@example.com" required
                  />
                </div>

                <div className="mb-5">
                  <Label htmlFor="projet" className="mb-1.5 block text-xs font-bold text-primary">
                    Nom de ton projet
                  </Label>
                  <Input
                    id="projet"
                    type="text"
                    value={projet}
                    onChange={e => setProjet(e.target.value)}
                    placeholder="Mon projet / Ma startup"
                  />
                </div>

                <div className="mb-5">
                  <Label htmlFor="telephone" className="mb-1.5 block text-xs font-bold text-primary">
                    Numéro de téléphone
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                    placeholder="Numéro de téléphone"
                  />
                </div>

                <div className="mb-6 flex items-start gap-2.5">
                  <Checkbox
                    id="rgpd"
                    checked={rgpd}
                    onCheckedChange={checked => setRgpd(checked === true)}
                    required
                    className="mt-0.5"
                  />
                  <Label htmlFor="rgpd" className="cursor-pointer text-[13px] font-normal leading-[1.55] text-muted-foreground">
                    J'accepte que mes données soient utilisées par Mare Nostrum pour m'envoyer la newsletter ITER et des informations liées à l'entrepreneuriat. Conformément au RGPD, je peux exercer mes droits à tout moment en écrivant à <span className="font-semibold text-primary">contact@marenostrum.tech</span>. *
                  </Label>
                </div>

                {errorMsg && (
                  <div className="mb-4 rounded-sm border border-destructive/20 bg-destructive/10 px-3.5 py-3 text-sm text-destructive">
                    {errorMsg}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" />
                      Inscription en cours…
                    </>
                  ) : "Rejoindre ITER gratuitement →"}
                </Button>
              </form>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="bg-primary px-6 py-6 text-center sm:px-10">
          <div className="mn-caption leading-[1.7] text-primary-foreground/75">
            Mare Nostrum · Toulouse · Paris · Casablanca<br />
            <Link to="/confidentialite" className="text-primary-foreground/70 underline">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>

      <div className="mn-caption mt-4 text-center text-muted-foreground">
        © Mare Nostrum 2026 · ITER, la lettre hebdomadaire
      </div>
    </div>
  );
};

export default Newsletter;
