import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowRight, Copy, ExternalLink, KeyRound, Loader2, Monitor, Radio, Smartphone, TriangleAlert } from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LiveQrCode from "@/components/live/LiveQrCode";
import logo from "@/assets/logo.png";
import { liveAdmin, LiveAdminError, saveAdminCode } from "@/lib/live/admin";
import { liveUrls, type LiveEvent } from "@/lib/live/types";

/** Création d'un événement live (équipe Mare Nostrum) et accès à une régie existante. */
const LiveHome = () => {
  const navigate = useNavigate();
  const [createKey, setCreateKey] = useState("");
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<{ event: LiveEvent; adminCode: string } | null>(null);
  const [existingCode, setExistingCode] = useState("");

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createKey.trim() || !title.trim() || creating) return;
    setCreating(true);
    setError("");
    try {
      const res = await liveAdmin<{ event: LiveEvent; admin_code: string }>("create_event", {
        create_key: createKey.trim(),
        title: title.trim(),
      });
      saveAdminCode(res.event.public_code, res.admin_code);
      setCreated({ event: res.event, adminCode: res.admin_code });
    } catch (err) {
      setError(err instanceof LiveAdminError && err.status === 403 ? "Clé Mare Nostrum invalide." : err instanceof Error ? err.message : "Création impossible.");
    } finally {
      setCreating(false);
    }
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copié`);
    } catch {
      toast(text);
    }
  };

  const urls = created ? liveUrls(created.event.public_code) : null;

  return (
    <div className="min-h-screen bg-background">
      <EnhancedSEOHead title="Live conférence — Mare Nostrum" description="Créer un événement interactif Mare Nostrum." noindex />
      <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
        <img src={logo} alt="Mare Nostrum" className="mb-10 h-9 w-auto" />

        {!created ? (
          <>
            <div className="mb-8">
              <div className="mn-eyebrow-turquoise mb-2">Mare Nostrum Live</div>
              <h1 className="font-editorial text-4xl font-semibold italic text-foreground md:text-5xl" style={{ letterSpacing: "-0.02em" }}>
                Faites participer la salle
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Questions ouvertes, sondages et mur de questions en direct. Le public répond depuis son téléphone, les réponses s'affichent sur l'écran.
              </p>
            </div>

            <form onSubmit={create} className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-lg md:p-8">
              <h2 className="text-lg font-semibold text-foreground">Nouvel événement</h2>
              <div className="space-y-2">
                <Label htmlFor="live-title">Titre affiché au public</Label>
                <Input id="live-title" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 120))} placeholder="Conférence entrepreneuriat — Toulouse" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="live-key">Clé Mare Nostrum</Label>
                <Input id="live-key" type="password" value={createKey} onChange={(e) => setCreateKey(e.target.value)} autoComplete="off" placeholder="Réservée à l'équipe" />
              </div>
              {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={creating || !title.trim() || !createKey.trim()}>
                {creating ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Créer l'événement <ArrowRight className="ml-1 h-4 w-4" /></>}
              </Button>
            </form>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const c = existingCode.trim().toUpperCase();
                if (c) navigate(`/live/${c.startsWith("MN-") ? c : `MN-${c}`}/regie`);
              }}
              className="mt-6 flex flex-col gap-3 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-end"
            >
              <div className="flex-1 space-y-2">
                <Label htmlFor="existing-code">Retrouver la régie d'un événement</Label>
                <Input id="existing-code" value={existingCode} onChange={(e) => setExistingCode(e.target.value.toUpperCase())} placeholder="MN-XXXX" className="font-mono" />
              </div>
              <Button type="submit" variant="outline" disabled={!existingCode.trim()}>
                <KeyRound className="mr-1.5 h-4 w-4" />Ouvrir la régie
              </Button>
            </form>
          </>
        ) : (
          urls && (
            <div className="space-y-6">
              <div>
                <div className="mn-eyebrow-turquoise mb-2">Événement créé</div>
                <h1 className="font-editorial text-3xl font-semibold italic text-foreground md:text-4xl">{created.event.title}</h1>
              </div>

              <div className="flex gap-3 rounded-lg border border-ocre/40 bg-ocre/10 p-4">
                <TriangleAlert className="h-5 w-5 shrink-0 text-ocre" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground">Notez le code animateur maintenant.</p>
                  <p className="text-sm text-muted-foreground">Il ne sera plus jamais affiché. Sans lui, la régie de cet événement est inaccessible.</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <code className="rounded-md bg-card px-3 py-2 font-mono text-lg font-semibold tracking-wider text-foreground">{created.adminCode}</code>
                    <Button variant="outline" size="sm" onClick={() => copy(created.adminCode, "Code animateur")}><Copy className="mr-1.5 h-4 w-4" />Copier</Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 rounded-lg border border-border bg-card p-6 md:grid-cols-[1fr_auto]">
                <ul className="space-y-4">
                  {[
                    { Icon: Radio, label: "Régie (vous)", url: urls.regie, primary: true },
                    { Icon: Monitor, label: "Écran de salle (vidéoprojecteur)", url: urls.screen },
                    { Icon: Smartphone, label: `Public — code ${created.event.public_code}`, url: urls.public },
                  ].map(({ Icon, label, url, primary }) => (
                    <li key={url}>
                      <p className="mb-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Icon className="h-4 w-4" />{label}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="break-all font-mono text-sm text-foreground">{url.replace(/^https?:\/\//, "")}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copy(url, "Lien")} aria-label={`Copier le lien ${label}`}><Copy className="h-3.5 w-3.5" /></Button>
                        <Button asChild variant={primary ? "default" : "outline"} size="sm">
                          <a href={url} target={primary ? undefined : "_blank"} rel="noopener noreferrer">Ouvrir{!primary && <ExternalLink className="ml-1 h-3.5 w-3.5" />}</a>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <LiveQrCode value={urls.public} size={160} className="justify-self-center shadow-none" />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LiveHome;
