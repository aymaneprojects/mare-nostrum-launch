import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  BarChart3, Copy, Download, Eye, EyeOff, ExternalLink, KeyRound, Loader2, LogOut,
  MessageSquareText, MessagesSquare, Monitor, Play, Plus, Square, Users,
} from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ItemComposer from "@/components/live/ItemComposer";
import AnswerFeed from "@/components/live/AnswerFeed";
import PollBars from "@/components/live/PollBars";
import AuthorChip from "@/components/live/AuthorChip";
import LiveQrCode from "@/components/live/LiveQrCode";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useLiveEvent } from "@/hooks/useLiveEvent";
import { useLiveMessages } from "@/hooks/useLiveMessages";
import { useLiveVotes } from "@/hooks/useLiveVotes";
import { forgetAdminCode, liveAdmin, LiveAdminError, loadAdminCode, saveAdminCode } from "@/lib/live/admin";
import { downloadCsv, toCsv } from "@/lib/live/csv";
import { KIND_LABEL, liveUrls, STATUS_LABEL, type LiveItem, type LiveKind } from "@/lib/live/types";
import { cn } from "@/lib/utils";

const KIND_ICON: Record<LiveKind, typeof BarChart3> = { open: MessageSquareText, poll: BarChart3, wall: MessagesSquare };

const LiveRegie = () => {
  const { code } = useParams();
  const { event, status, items, activeItem, publicCode, reloadEvent } = useLiveEvent(code);

  const [adminCode, setAdminCode] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(false);
  const [authError, setAuthError] = useState("");

  const verify = useCallback(async (candidate: string, silent = false) => {
    if (!publicCode || !candidate.trim()) return;
    setChecking(true);
    setAuthError("");
    try {
      await liveAdmin("verify", { public_code: publicCode, admin_code: candidate.trim() });
      saveAdminCode(publicCode, candidate.trim());
      setAdminCode(candidate.trim());
      setAuthorized(true);
    } catch (err) {
      forgetAdminCode(publicCode);
      if (!silent) setAuthError(err instanceof LiveAdminError && err.status === 403 ? "Code animateur invalide." : "Vérification impossible, réessayez.");
    } finally {
      setChecking(false);
    }
  }, [publicCode]);

  // Code déjà saisi pendant cette session (ou transmis par la page de création).
  useEffect(() => {
    const stored = loadAdminCode(publicCode);
    if (stored) void verify(stored, true);
  }, [publicCode, verify]);

  const seo = <EnhancedSEOHead title="Régie live — Mare Nostrum" description="Régie de l'animateur Mare Nostrum Live." noindex />;

  if (status === "loading") {
    return <Page>{seo}<div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div></Page>;
  }
  if (status !== "ready" || !event) {
    return (
      <Page>
        {seo}
        <div className="py-24 text-center">
          <h1 className="font-editorial text-3xl font-semibold italic text-foreground">Événement introuvable</h1>
          <Button asChild variant="outline" className="mt-6"><Link to="/live">Créer ou retrouver un événement</Link></Button>
        </div>
      </Page>
    );
  }

  if (!authorized) {
    return (
      <Page>
        {seo}
        <form
          onSubmit={(e) => { e.preventDefault(); void verify(adminCode); }}
          className="mx-auto mt-16 max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg md:p-8"
        >
          <KeyRound className="mb-4 h-8 w-8 text-primary" />
          <div className="mn-eyebrow-turquoise mb-2">Régie · {event.public_code}</div>
          <h1 className="mb-6 font-editorial text-2xl font-semibold italic text-foreground">{event.title}</h1>
          <Label htmlFor="admin-code">Code animateur</Label>
          <Input
            id="admin-code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value.toUpperCase())}
            placeholder="XXXX-XXXX-XXXX"
            autoComplete="off"
            autoFocus
            className="mt-2 font-mono tracking-wider"
          />
          {authError && <p role="alert" className="mt-2 text-sm text-destructive">{authError}</p>}
          <Button type="submit" className="mt-5 w-full" disabled={checking || !adminCode.trim()}>
            {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accéder à la régie"}
          </Button>
        </form>
      </Page>
    );
  }

  return (
    <RegieBoard
      seo={seo}
      publicCode={publicCode}
      adminCode={adminCode}
      eventId={event.id}
      eventTitle={event.title}
      eventStatus={event.status}
      items={items}
      activeItem={activeItem}
      onEventChanged={reloadEvent}
      onLogout={() => { forgetAdminCode(publicCode); setAuthorized(false); setAdminCode(""); }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────

interface RegieBoardProps {
  seo: React.ReactNode;
  publicCode: string;
  adminCode: string;
  eventId: string;
  eventTitle: string;
  eventStatus: string;
  items: LiveItem[];
  activeItem: LiveItem | null;
  onEventChanged: () => void;
  onLogout: () => void;
}

const RegieBoard = ({ seo, publicCode, adminCode, eventId, eventTitle, eventStatus, items, activeItem, onEventChanged, onLogout }: RegieBoardProps) => {
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [participants, setParticipants] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);

  const urls = liveUrls(publicCode);
  const creds = { public_code: publicCode, admin_code: adminCode };

  // Suit l'activité en direct, sauf si l'animateur en consulte une autre.
  const selected = useMemo(
    () => items.find((i) => i.id === selectedId) ?? activeItem ?? items[items.length - 1] ?? null,
    [items, selectedId, activeItem],
  );
  const kind = selected?.kind as LiveKind | undefined;
  const { all, visible } = useLiveMessages(kind === "open" || kind === "wall" ? selected?.id : null, kind);
  const { results, total } = useLiveVotes(kind === "poll" ? selected?.id : null, selected?.options ?? []);

  // Nombre de participants (table non diffusée en temps réel : rafraîchi toutes les 10 s).
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { count } = await supabase.from("live_participants").select("id", { count: "exact", head: true }).eq("event_id", eventId);
      if (!cancelled && count !== null) setParticipants(count);
    };
    void load();
    const timer = window.setInterval(load, 10_000);
    return () => { cancelled = true; window.clearInterval(timer); };
  }, [eventId]);

  const run = async (key: string, action: Parameters<typeof liveAdmin>[0], body: Record<string, unknown>, success?: string) => {
    setBusy(key);
    try {
      await liveAdmin(action, { ...creds, ...body });
      if (success) toast.success(success);
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action impossible.");
      return false;
    } finally {
      setBusy(null);
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

  const exportCsv = async () => {
    setExporting(true);
    try {
      const itemIds = items.map((i) => i.id);
      if (!itemIds.length) {
        toast("Aucune activité à exporter.");
        return;
      }
      const [{ data: messages }, { data: votes }, { data: people }] = await Promise.all([
        supabase.from("live_messages").select("*").in("item_id", itemIds),
        supabase.from("live_votes").select("*").in("item_id", itemIds),
        supabase.from("live_participants").select("id, first_name, emoji").eq("event_id", eventId),
      ]);
      const byId = new Map((people ?? []).map((p) => [p.id, p]));
      const itemById = new Map(items.map((i) => [i.id, i]));

      const rows: unknown[][] = [];
      for (const m of messages ?? []) {
        const it = itemById.get(m.item_id);
        if (!it) continue;
        rows.push([it.position, KIND_LABEL[it.kind as LiveKind], it.prompt, m.created_at, m.author_name, m.author_emoji, m.body, it.kind === "wall" ? m.like_count : "", m.hidden ? "oui" : "non"]);
      }
      for (const v of votes ?? []) {
        const it = itemById.get(v.item_id);
        if (!it) continue;
        const p = byId.get(v.participant_id);
        rows.push([it.position, KIND_LABEL.poll, it.prompt, v.created_at, p?.first_name ?? "", p?.emoji ?? "", it.options[v.option_index] ?? "", "", "non"]);
      }
      rows.sort((a, b) => (Number(a[0]) - Number(b[0])) || String(a[3]).localeCompare(String(b[3])));

      const csv = toCsv(["activite_position", "type", "question", "horodatage", "prenom", "emoji", "valeur", "likes", "masque"], rows);
      downloadCsv(`live-${publicCode}-${new Date().toISOString().slice(0, 10)}.csv`, csv);
      toast.success(`${rows.length} ligne${rows.length > 1 ? "s" : ""} exportée${rows.length > 1 ? "s" : ""}`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {seo}
      {/* Barre de régie */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 md:px-6">
          <img src={logo} alt="Mare Nostrum" className="h-8 w-auto" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-foreground">{eventTitle}</p>
            <p className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
              <span className="font-mono">{publicCode}</span>
              <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{participants ?? "…"} participant{(participants ?? 0) > 1 ? "s" : ""}</span>
              {eventStatus === "closed" && <Badge variant="secondary">Événement clôturé</Badge>}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={urls.screen} target="_blank" rel="noopener noreferrer"><Monitor className="mr-1.5 h-4 w-4" />Ouvrir l'écran</a>
            </Button>
            <Button variant="outline" size="sm" onClick={() => copy(urls.public, "Lien public")}>
              <Copy className="mr-1.5 h-4 w-4" />Lien public
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} disabled={exporting}>
              {exporting ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Download className="mr-1.5 h-4 w-4" />}Exporter
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Quitter la régie"><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[380px_1fr]">
        {/* Activités */}
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Activités</h2>
            <Button size="sm" onClick={() => setComposerOpen(true)} disabled={eventStatus === "closed"}>
              <Plus className="mr-1 h-4 w-4" />Nouvelle
            </Button>
          </div>

          {!items.length && (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Aucune activité. Créez une question ouverte, un sondage ou un mur de questions.
            </div>
          )}

          <ol className="space-y-2">
            {items.map((item) => {
              const Icon = KIND_ICON[item.kind as LiveKind];
              const isSelected = selected?.id === item.id;
              return (
                <li key={item.id}>
                  <div
                    className={cn(
                      "rounded-lg border bg-card p-3 transition-colors",
                      item.status === "active" ? "border-accent ring-1 ring-accent" : isSelected ? "border-primary/40" : "border-border",
                    )}
                  >
                    <button type="button" onClick={() => setSelectedId(item.id)} className="block w-full text-left">
                      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" />
                        {KIND_LABEL[item.kind as LiveKind]}
                        <span
                          className={cn(
                            "ml-auto rounded-full px-2 py-0.5 text-[11px] font-medium",
                            item.status === "active" ? "bg-accent text-accent-foreground" : item.status === "closed" ? "bg-muted text-muted-foreground" : "bg-secondary text-secondary-foreground",
                          )}
                        >
                          {STATUS_LABEL[item.status]}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-foreground">{item.prompt}</p>
                    </button>
                    <div className="mt-2.5 flex gap-2">
                      {item.status !== "active" ? (
                        <Button
                          size="sm"
                          variant={item.status === "draft" ? "default" : "outline"}
                          disabled={busy !== null || eventStatus === "closed"}
                          onClick={async () => { if (await run(`activate-${item.id}`, "activate", { item_id: item.id })) setSelectedId(null); }}
                        >
                          {busy === `activate-${item.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Play className="mr-1 h-3.5 w-3.5" />{item.status === "closed" ? "Relancer" : "Lancer"}</>}
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled={busy !== null} onClick={() => run(`close-${item.id}`, "close", { item_id: item.id })}>
                          {busy === `close-${item.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Square className="mr-1 h-3.5 w-3.5" />Terminer</>}
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <LiveQrCode value={urls.public} size={84} className="shadow-none" />
              <div className="min-w-0 text-sm">
                <p className="text-muted-foreground">Lien public</p>
                <a href={urls.public} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 break-all font-mono text-foreground hover:text-primary">
                  {urls.display}<ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>
            </div>
            {eventStatus !== "closed" && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                disabled={busy !== null}
                onClick={async () => {
                  if (!window.confirm("Clôturer l'événement ? Plus personne ne pourra le rejoindre.")) return;
                  if (await run("close-event", "close_event", {}, "Événement clôturé")) onEventChanged();
                }}
              >
                Clôturer l'événement
              </Button>
            )}
          </div>
        </aside>

        {/* Détail de l'activité sélectionnée */}
        <section className="min-w-0 space-y-5">
          {!selected || !kind ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              Sélectionnez ou créez une activité.
            </div>
          ) : (
            <>
              <div>
                <div className="mn-eyebrow-turquoise mb-1">{KIND_LABEL[kind]} · {STATUS_LABEL[selected.status]}</div>
                <h2 className="font-editorial text-2xl font-semibold italic text-foreground md:text-3xl">{selected.prompt}</h2>
              </div>

              {/* Aperçu identique à l'écran de salle */}
              <div className="rounded-xl p-5 md:p-6" style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}>
                <div className="mn-eyebrow-light mb-4">Aperçu écran</div>
                {kind === "poll" && <PollBars results={results} total={total} variant="compact" />}
                {kind === "open" && <AnswerFeed messages={visible.slice(0, 12)} variant="compact" emptyLabel="Pas encore de réponse." />}
                {kind === "wall" && <AnswerFeed messages={visible.slice(0, 6)} variant="compact" emptyLabel="Pas encore de message." />}
              </div>

              {(kind === "open" || kind === "wall") && (
                <div>
                  <h3 className="mb-3 flex items-baseline gap-2 font-semibold text-foreground">
                    Modération
                    <span className="text-sm font-normal text-muted-foreground">
                      {all.length} message{all.length > 1 ? "s" : ""}{all.length - visible.length > 0 ? ` · ${all.length - visible.length} masqué${all.length - visible.length > 1 ? "s" : ""}` : ""}
                    </span>
                  </h3>
                  <ul className="divide-y divide-border rounded-lg border border-border bg-card">
                    {!all.length && <li className="p-4 text-sm text-muted-foreground">Rien pour l'instant.</li>}
                    {all.map((m) => (
                      <li key={m.id} className={cn("flex items-start gap-3 p-3", m.hidden && "opacity-50")}>
                        <div className="min-w-0 flex-1">
                          <p className={cn("break-words text-sm text-foreground", m.hidden && "line-through")}>{m.body}</p>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <AuthorChip name={m.author_name} emoji={m.author_emoji} className="text-xs" />
                            {kind === "wall" && <span>♥ {m.like_count}</span>}
                            <span>{new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={busy !== null}
                          onClick={() => run(`hide-${m.id}`, "hide_message", { message_id: m.id, hidden: !m.hidden })}
                          aria-label={m.hidden ? "Réafficher le message" : "Masquer le message"}
                        >
                          {busy === `hide-${m.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : m.hidden ? <><Eye className="mr-1 h-4 w-4" />Afficher</> : <><EyeOff className="mr-1 h-4 w-4" />Masquer</>}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <ItemComposer
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onCreate={async ({ kind: k, prompt, options }) => {
          const ok = await run("create", "create_item", { kind: k, prompt, options }, "Activité créée en brouillon");
          if (!ok) throw new Error("création refusée");
        }}
      />
    </div>
  );
};

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background px-4">
    <div className="mx-auto max-w-7xl py-4"><img src={logo} alt="Mare Nostrum" className="h-8 w-auto" /></div>
    {children}
  </div>
);

export default LiveRegie;
