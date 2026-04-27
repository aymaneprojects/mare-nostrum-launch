import { useEffect, useState } from "react";
import { X, Gift, Phone, Mail, User, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "mn_exit_popup_dismissed";
const DELAY_MS    = 2 * 60 * 1000; // 2 minutes
const COOLDOWN_DAYS = 7;

function isDismissed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    return Date.now() - ts < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
}

export default function ExitIntentPopup() {
  const [visible, setVisible]   = useState(false);
  const [prenom, setPrenom]     = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [zone, setZone]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (isDismissed()) return;
    const id = window.setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  const handleClose = () => {
    setVisible(false);
    markDismissed();
  };

  const valid = prenom.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && zone !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError("");
    try {
      const { error: fnError } = await supabase.functions.invoke("send-contact-notification", {
        body: {
          name: prenom,
          email,
          phone: phone || undefined,
          type: "Club — Offre spéciale 10% popup",
          message: "Demande de rendez-vous via popup -10% premier mois",
          country: zone === "france" ? "France" : "Afrique francophone",
        },
      });
      if (fnError) throw new Error(fnError.message);
      setSent(true);
      markDismissed();
    } catch (err: any) {
      setError("Une erreur est survenue. Réessaie dans quelques secondes.");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-title"
        className="fixed z-50 inset-x-4 bottom-4 sm:inset-auto sm:bottom-8 sm:right-8 sm:left-auto sm:w-[420px] bg-background rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-border overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
      >
        {/* Header accent strip */}
        <div className="bg-[hsl(var(--mn-nuit))] px-6 py-4 relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Fermer"
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Gift className="h-4 w-4 text-[hsl(var(--mn-turquoise))]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--mn-turquoise))]">Offre limitée</span>
          </div>
          <h2 id="exit-popup-title" className="font-editorial italic text-xl text-white leading-tight">
            Attendez ! 10% de réduction<br />le premier mois
          </h2>
          <p className="text-sm text-white/60 mt-1">Réserve ton appel découverte — on te rappelle sous 24h.</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {sent ? (
            <div className="flex flex-col items-center text-center gap-3 py-4">
              <CheckCircle2 className="h-10 w-10 text-[hsl(var(--mn-turquoise))]" strokeWidth={1.5} />
              <p className="font-semibold text-foreground">C'est noté !</p>
              <p className="text-sm text-muted-foreground">On te contacte dans les 24h avec ton code de réduction.</p>
              <Button size="sm" className="mt-2" onClick={handleClose}>Fermer</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="ep-prenom" className="text-xs text-muted-foreground">Prénom *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                    <Input
                      id="ep-prenom"
                      placeholder="Aymane"
                      value={prenom}
                      onChange={e => setPrenom(e.target.value)}
                      className="pl-8 h-9 text-sm"
                      autoComplete="given-name"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="ep-email" className="text-xs text-muted-foreground">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
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
                  <Label htmlFor="ep-phone" className="text-xs text-muted-foreground">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                    <Input
                      id="ep-phone"
                      type="tel"
                      placeholder="+33 6 00 00 00 00"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="pl-8 h-9 text-sm"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="ep-zone" className="text-xs text-muted-foreground">Zone *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 z-10 pointer-events-none" />
                    <Select onValueChange={setZone} value={zone}>
                      <SelectTrigger id="ep-zone" className="pl-8 h-9 text-sm">
                        <SelectValue placeholder="Où es-tu basé ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="afrique">Afrique francophone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <Button
                type="submit"
                className="w-full mt-1"
                disabled={!valid || loading}
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Envoi en cours…</>
                ) : (
                  "Réserver mon appel découverte"
                )}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                Pas de spam. On te rappelle une seule fois pour valider ton offre.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
