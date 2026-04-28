import { useEffect, useState } from "react";
import { X, Phone, Mail, User, MapPin, Loader2, CheckCircle2, Sparkles, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY   = "mn_exit_popup_dismissed";
const DELAY_MS      = 2 * 60 * 1000;
const COOLDOWN_DAYS = 7;

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return Date.now() - parseInt(raw, 10) < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  } catch { return false; }
}
function markDismissed() {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
}

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [prenom, setPrenom]   = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [zone, setZone]       = useState("");
  const [rgpd, setRgpd]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (isDismissed()) return;
    const id = window.setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  const handleClose = () => { setVisible(false); markDismissed(); };

  const valid = prenom.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && zone !== "" && rgpd;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError("");
    try {
      const { error: fnError } = await supabase.functions.invoke("send-promo-code", {
        body: { prenom, email, phone: phone || undefined, zone },
      });
      if (fnError) throw new Error(fnError.message);
      setSent(true);
      markDismissed();
    } catch {
      setError("Une erreur est survenue. Réessaie dans quelques secondes.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ep-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="relative bg-[hsl(var(--mn-nuit))] px-7 py-7 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[hsl(var(--mn-turquoise))]/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[hsl(var(--mn-ocre))]/15 blur-2xl pointer-events-none" />

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4 text-white" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-[hsl(var(--mn-turquoise))]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--mn-turquoise))]">
              Offre exclusive · places limitées
            </span>
          </div>

          <h2 id="ep-title" className="font-editorial italic text-3xl text-white leading-tight mb-2">
            Attendez !<br />
            <span className="text-[hsl(var(--mn-turquoise))]">–50%</span> le premier mois
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Remplis le formulaire — ton code promo personnalisé t'est envoyé par email instantanément.
          </p>
        </div>

        {/* ── Body ── */}
        <div className="px-7 py-6">
          {sent ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <CheckCircle2 className="h-12 w-12 text-[hsl(var(--mn-turquoise))]" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-xl text-foreground mb-1">Vérifie ta boîte mail !</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ton code promo –50% vient d'être envoyé à <strong className="text-foreground">{email}</strong>.
                </p>
              </div>
              <Button onClick={handleClose} className="mt-2">Fermer</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ep-prenom" className="text-xs text-muted-foreground">Prénom *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />
                    <Input
                      id="ep-prenom"
                      placeholder="Aymane"
                      value={prenom}
                      onChange={e => setPrenom(e.target.value)}
                      className="pl-8 h-9 text-sm"
                      autoComplete="given-name"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="ep-phone" className="text-xs text-muted-foreground">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />
                    <Input
                      id="ep-phone"
                      type="tel"
                      placeholder="+33 6…"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="pl-8 h-9 text-sm"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="ep-email" className="text-xs text-muted-foreground">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 pointer-events-none" />
                  <Input
                    id="ep-email"
                    type="email"
                    placeholder="toi@exemple.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-8 h-9 text-sm"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="ep-zone" className="text-xs text-muted-foreground">Zone *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 z-10 pointer-events-none" />
                  <Select onValueChange={setZone} value={zone}>
                    <SelectTrigger id="ep-zone" className="pl-8 h-9 text-sm">
                      <SelectValue placeholder="Où es-tu basé ?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="congo">République du Congo</SelectItem>
                      <SelectItem value="autre">Autre pays</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rgpd}
                  onChange={e => setRgpd(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-border accent-[hsl(var(--mn-turquoise))] cursor-pointer"
                  required
                />
                <span className="text-[11px] text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                  <Shield className="inline h-3 w-3 mr-1 text-[hsl(var(--mn-turquoise))]" />
                  J'accepte d'être contacté par Mare Nostrum pour activer mon offre. <span className="font-medium text-foreground">Requis *</span>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full h-11 text-sm font-semibold mt-1"
                disabled={!valid || loading}
              >
                {loading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Envoi en cours…</>
                  : "Recevoir mon code promo par email"
                }
              </Button>

              <p className="text-[10px] text-muted-foreground text-center">
                Pas de spam. Ton code arrive immédiatement dans ta boîte mail.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
