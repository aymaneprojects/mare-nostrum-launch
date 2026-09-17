import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Check, Columns2, Copy, Download, Eye, EyeOff, FileText, KeyRound, Loader2, LogOut,
  MessagesSquare, Monitor, MonitorPlay, Pencil, Play, Plus, RotateCcw, Square, Timer, Trash2, UserRound, Users, Eraser,
} from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ItemComposer, { type ItemDraft } from "@/components/live/ItemComposer";
import ParticipantsDialog from "@/components/live/ParticipantsDialog";
import ActivityDisplay from "@/components/live/ActivityDisplay";
import AuthorChip from "@/components/live/AuthorChip";
import LiveQrCode from "@/components/live/LiveQrCode";
import { KIND_ICON } from "@/components/live/kindIcons";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useLiveEvent } from "@/hooks/useLiveEvent";
import { useLiveMessages } from "@/hooks/useLiveMessages";
import { useParticipantCount } from "@/hooks/useParticipantCount";
import { forgetAdminCode, liveAdmin, LiveAdminError, loadAdminCode, saveAdminCode } from "@/lib/live/admin";
import { downloadXlsx, type Sheet } from "@/lib/live/xlsx";
import { groupWords } from "@/lib/live/words";
import { authorOf, KIND_LABEL, liveUrls, STATUS_LABEL, type LiveEvent, type LiveItem, type LiveKind } from "@/lib/live/types";
import { cn } from "@/lib/utils";

const LiveRegie = () => {
  const { code } = useParams();
  const live = useLiveEvent(code);
  const { event, status, publicCode } = live;

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
      adminCode={adminCode}
      event={event}
      items={live.items}
      activeItem={live.activeItem}
      activeWall={live.activeWall}
      screenItems={live.screenItems}
      onEventChanged={live.reloadEvent}
      onLogout={() => { forgetAdminCode(publicCode); setAuthorized(false); setAdminCode(""); }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────

interface RegieBoardProps {
  seo: React.ReactNode;
  adminCode: string;
  event: LiveEvent;
  items: LiveItem[];
  activeItem: LiveItem | null;
  activeWall: LiveItem | null;
  screenItems: LiveItem[];
  onEventChanged: () => void;
  onLogout: () => void;
}

const RegieBoard = ({ seo, adminCode, event, items, activeItem, activeWall, screenItems, onEventChanged, onLogout }: RegieBoardProps) => {
  const publicCode = event.public_code;
  const [composerOpen, setComposerOpen] = useState(false);
  const [editing, setEditing] = useState<LiveItem | null>(null);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const participants = useParticipantCount(event.id, 10_000);
  const [exporting, setExporting] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(event.title);

  const urls = liveUrls(publicCode);
  const creds = useMemo(() => ({ public_code: publicCode, admin_code: adminCode }), [publicCode, adminCode]);
  const pinned = event.screen_items ?? [];
  const onScreen = new Set(screenItems.map((i) => i.id));

  const loadNotes = useCallback(async () => {
    try {
      const res = await liveAdmin<{ notes: Record<string, string> }>("get_notes", creds);
      setNotes(res.notes ?? {});
    } catch { /* notes indisponibles : la régie reste utilisable */ }
  }, [creds]);

  useEffect(() => { void loadNotes(); }, [loadNotes]);

  // Suit l'activité en cours, sauf si l'animateur en consulte une autre.
  const selected = useMemo(
    () => items.find((i) => i.id === selectedId) ?? activeItem ?? activeWall ?? items[0] ?? null,
    [items, selectedId, activeItem, activeWall],
  );

  const run = async <T,>(key: string, action: Parameters<typeof liveAdmin>[0], body: Record<string, unknown>, success?: string): Promise<T | null> => {
    setBusy(key);
    try {
      const res = await liveAdmin<T>(action, { ...creds, ...body });
      if (success) toast.success(success);
      return res;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action impossible.");
      return null;
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

  const showAlone = (item: LiveItem) => run(`screen-${item.id}`, "set_screen", { item_ids: [item.id] }, "Affiché à l'écran");
  const showBeside = (item: LiveItem) => {
    const other = screenItems.find((i) => i.id !== item.id);
    if (!other) return showAlone(item);
    return run(`beside-${item.id}`, "set_screen", { item_ids: [other.id, item.id] }, "Affichés côte à côte");
  };

  /** Classeur Excel : une feuille de synthèse, puis le détail par nature de donnée. */
  const exportExcel = async () => {
    setExporting(true);
    try {
      const itemIds = items.map((i) => i.id);
      const [messagesRes, votesRes, peopleRes] = await Promise.all([
        itemIds.length ? supabase.from("live_messages").select("*").in("item_id", itemIds) : Promise.resolve({ data: [] }),
        itemIds.length ? supabase.from("live_votes").select("*").in("item_id", itemIds) : Promise.resolve({ data: [] }),
        supabase.from("live_participants").select("id, first_name, emoji, created_at").eq("event_id", event.id),
      ]);
      const messages = messagesRes.data ?? [];
      const votes = votesRes.data ?? [];
      const people = peopleRes.data ?? [];

      const byId = new Map(people.map((p) => [p.id, p]));
      const heure = (iso: string) => new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });

      // 1. Synthèse
      const synthese: Sheet = {
        name: "Synthèse",
        widths: [6, 18, 60, 12, 12, 10, 10],
        rows: [
          ["Événement", event.title],
          ["Code", publicCode],
          ["Participants", people.length],
          ["Export du", heure(new Date().toISOString())],
          [],
          ["N°", "Type", "Question", "Statut", "Réponses", "Votes", "J'aime"],
          ...items.map((i) => {
            const mine = messages.filter((m) => m.item_id === i.id);
            return [
              i.position,
              KIND_LABEL[i.kind as LiveKind],
              i.prompt,
              STATUS_LABEL[i.status],
              mine.length,
              votes.filter((v) => v.item_id === i.id).length,
              mine.reduce((sum, m) => sum + m.like_count, 0),
            ];
          }),
        ],
      };

      // 2. Réponses et messages
      const reponses: Sheet = {
        name: "Réponses",
        widths: [6, 18, 45, 18, 14, 8, 60, 10, 10],
        rows: [["N°", "Type", "Question", "Horodatage", "Prénom", "Emoji", "Réponse", "J'aime", "Masqué"]],
      };
      for (const m of [...messages].sort((a, b) => a.created_at.localeCompare(b.created_at))) {
        const it = items.find((i) => i.id === m.item_id);
        if (!it) continue;
        const author = authorOf(m);
        reponses.rows.push([
          it.position, KIND_LABEL[it.kind as LiveKind], it.prompt, heure(m.created_at),
          author.name, m.anonymous ? "" : author.emoji, m.body,
          it.kind === "wall" ? m.like_count : "", m.hidden ? "oui" : "non",
        ]);
      }

      // 3. Votes (sondages et satisfaction)
      const votesSheet: Sheet = {
        name: "Votes",
        widths: [6, 18, 45, 18, 14, 8, 25],
        rows: [["N°", "Type", "Question", "Horodatage", "Prénom", "Emoji", "Réponse choisie"]],
      };
      for (const v of [...votes].sort((a, b) => a.created_at.localeCompare(b.created_at))) {
        const it = items.find((i) => i.id === v.item_id);
        if (!it) continue;
        const p = byId.get(v.participant_id);
        votesSheet.rows.push([
          it.position, KIND_LABEL[it.kind as LiveKind], it.prompt, heure(v.created_at),
          p?.first_name ?? "", p?.emoji ?? "", it.options[v.option_index] ?? String(v.option_index + 1),
        ]);
      }

      // 4. Nuages : mots regroupés, du plus cité au moins cité
      const nuages: Sheet = {
        name: "Nuages de mots",
        widths: [6, 45, 30, 14],
        rows: [["N°", "Question", "Mot", "Occurrences"]],
      };
      for (const it of items.filter((i) => i.kind === "cloud")) {
        const visibles = messages.filter((m) => m.item_id === it.id && !m.hidden);
        for (const w of groupWords(visibles)) nuages.rows.push([it.position, it.prompt, w.label, w.count]);
      }

      // 5. Participants
      const participantsSheet: Sheet = {
        name: "Participants",
        widths: [14, 8, 18, 12, 10],
        rows: [["Prénom", "Emoji", "Arrivé à", "Réponses", "Votes"]],
      };
      for (const p of [...people].sort((a, b) => a.created_at.localeCompare(b.created_at))) {
        participantsSheet.rows.push([
          p.first_name, p.emoji, heure(p.created_at),
          messages.filter((m) => m.participant_id === p.id).length,
          votes.filter((v) => v.participant_id === p.id).length,
        ]);
      }

      const sheets = [synthese, reponses, votesSheet, nuages, participantsSheet].filter((s) => s.rows.length > 1 || s === synthese);
      downloadXlsx(`live-${publicCode}-${new Date().toISOString().slice(0, 10)}.xlsx`, sheets);
      toast.success(`Export Excel : ${messages.length} réponse(s), ${votes.length} vote(s), ${people.length} participant(s)`);
    } catch (err) {
      toast.error("Export impossible. Réessayez.");
      console.error("[live] export", err);
    } finally {
      setExporting(false);
    }
  };

  const submitItem = async (draft: ItemDraft) => {
    if (editing) {
      const res = await run<{ item: LiveItem }>("edit", "update_item", { item_id: editing.id, ...draft }, "Activité modifiée");
      if (!res) throw new Error("modification refusée");
      void loadNotes();
      return;
    }
    const res = await run<{ item: LiveItem }>("create", "create_item", { ...draft }, "Activité créée en brouillon");
    if (!res) throw new Error("création refusée");
    setSelectedId(res.item.id);
    if (draft.note) void loadNotes();
  };

  /** Ouvre la fenêtre pré-remplie avec l'activité à modifier. */
  const openEditor = (item: LiveItem) => {
    setEditing(item);
    setComposerOpen(true);
  };

  const screenLabel = pinned.length === 2 ? "Deux activités côte à côte" : pinned.length === 1 ? "Affichage choisi" : screenItems.length ? "Automatique" : "Accueil (QR code)";

  return (
    <div className="min-h-screen bg-background">
      {seo}
      {/* Barre de régie */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 md:px-6">
          <img src={logo} alt="Mare Nostrum" className="h-8 w-auto" />
          <div className="min-w-0 flex-1">
            {editingTitle ? (
              <form
                className="flex items-center gap-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (await run("title", "update_event", { title: titleDraft }, "Titre modifié")) { setEditingTitle(false); onEventChanged(); }
                }}
              >
                <Input value={titleDraft} onChange={(e) => setTitleDraft(e.target.value.slice(0, 120))} className="h-8" autoFocus aria-label="Titre de l'événement" />
                <Button type="submit" size="icon" className="h-8 w-8 shrink-0" aria-label="Enregistrer le titre"><Check className="h-4 w-4" /></Button>
              </form>
            ) : (
              <button type="button" onClick={() => { setTitleDraft(event.title); setEditingTitle(true); }} className="group flex max-w-full items-center gap-2 text-left" aria-label="Renommer l'événement">
                <span className="truncate font-semibold text-foreground">{event.title}</span>
                <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-40 transition-opacity group-hover:opacity-100" aria-hidden />
              </button>
            )}
            <p className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
              <span className="font-mono">{publicCode}</span>
              <button
                type="button"
                onClick={() => setPeopleOpen(true)}
                className="inline-flex items-center gap-1 underline-offset-2 hover:text-foreground hover:underline"
              >
                <Users className="h-3.5 w-3.5" aria-hidden />
                {participants ?? "…"} participant{(participants ?? 0) > 1 ? "s" : ""}
              </button>
              {activeWall && <span className="inline-flex items-center gap-1 text-foreground"><MessagesSquare className="h-3.5 w-3.5" />Mur ouvert</span>}
              {event.status === "closed" && <span className="rounded-full bg-muted px-2 py-0.5">Événement clôturé</span>}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={urls.screen} target="_blank" rel="noopener noreferrer"><Monitor className="mr-1.5 h-4 w-4" />Écran</a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={urls.conducteur} target="_blank" rel="noopener noreferrer"><FileText className="mr-1.5 h-4 w-4" />Conducteur</a>
            </Button>
            <Button variant="outline" size="sm" onClick={() => copy(urls.public, "Lien public")}>
              <Copy className="mr-1.5 h-4 w-4" />Lien public
            </Button>
            <Button variant="outline" size="sm" onClick={exportExcel} disabled={exporting}>
              {exporting ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Download className="mr-1.5 h-4 w-4" />}Exporter (Excel)
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Quitter la régie"><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Ce que montre l'écran de salle */}
        <div className="border-t border-border bg-secondary/40">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2 text-sm md:px-6">
            <MonitorPlay className="h-4 w-4 text-primary" aria-hidden />
            <span className="font-medium text-foreground">Écran de salle :</span>
            <span className="text-muted-foreground">{screenLabel}</span>
            {screenItems.map((i) => (
              <span key={i.id} className="max-w-[16rem] truncate rounded-full bg-card px-3 py-0.5 text-xs text-foreground ring-1 ring-border">
                {KIND_LABEL[i.kind as LiveKind]} · {i.prompt}
              </span>
            ))}
            {pinned.length > 0 && (
              <Button variant="ghost" size="sm" className="ml-auto h-7" disabled={busy !== null} onClick={() => run("screen-auto", "set_screen", { item_ids: [] }, "Écran en automatique")}>
                <RotateCcw className="mr-1 h-3.5 w-3.5" />Revenir en automatique
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[400px_1fr]">
        {/* Déroulé */}
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Déroulé</h2>
            <Button size="sm" onClick={() => { setEditing(null); setComposerOpen(true); }} disabled={event.status === "closed"}>
              <Plus className="mr-1 h-4 w-4" />Activité
            </Button>
          </div>

          {!items.length && (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Aucune activité. Créez un nuage de mots, une question, un sondage, une note de satisfaction ou un mur.
            </div>
          )}

          <ol className="space-y-2">
            {items.map((item, index) => {
              const kind = item.kind as LiveKind;
              const Icon = KIND_ICON[kind];
              const isSelected = selected?.id === item.id;
              const displayed = onScreen.has(item.id);
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
                        <span className="font-mono">{index + 1}.</span>
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                        {KIND_LABEL[kind]}
                        {item.duration_seconds && <span className="inline-flex items-center gap-0.5"><Timer className="h-3 w-3" aria-hidden />{item.duration_seconds} s</span>}
                        {item.show_authors && <span className="inline-flex items-center gap-0.5" title="Prénoms visibles en régie"><UserRound className="h-3 w-3" aria-label="Prénoms visibles en régie" /></span>}
                        {displayed && <span className="inline-flex items-center gap-0.5 text-primary" title="Affiché à l'écran"><Monitor className="h-3 w-3" aria-label="Affiché à l'écran" /></span>}
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

                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.status !== "active" ? (
                        <Button
                          size="sm"
                          className="h-8"
                          variant={item.status === "draft" ? "default" : "outline"}
                          disabled={busy !== null || event.status === "closed"}
                          onClick={async () => { if (await run(`activate-${item.id}`, "activate", { item_id: item.id })) setSelectedId(item.id); }}
                        >
                          {busy === `activate-${item.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Play className="mr-1 h-3.5 w-3.5" />{item.status === "closed" ? "Relancer" : kind === "wall" ? "Ouvrir" : "Lancer"}</>}
                        </Button>
                      ) : (
                        <Button size="sm" className="h-8" variant="outline" disabled={busy !== null} onClick={() => run(`close-${item.id}`, "close", { item_id: item.id })}>
                          {busy === `close-${item.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Square className="mr-1 h-3.5 w-3.5" />{kind === "wall" ? "Fermer" : "Terminer"}</>}
                        </Button>
                      )}

                      {item.status !== "draft" && !(displayed && screenItems.length === 1) && (
                        <Button size="sm" className="h-8" variant="ghost" disabled={busy !== null} onClick={() => showAlone(item)}>
                          <Monitor className="mr-1 h-3.5 w-3.5" />À l'écran
                        </Button>
                      )}
                      {item.status !== "draft" && !displayed && screenItems.length >= 1 && (
                        <Button size="sm" className="h-8" variant="ghost" disabled={busy !== null} onClick={() => showBeside(item)}>
                          <Columns2 className="mr-1 h-3.5 w-3.5" />Côte à côte
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="ml-auto h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        variant="ghost"
                        disabled={busy !== null}
                        aria-label={`Supprimer l'activité « ${item.prompt} »`}
                        onClick={async () => {
                          const warning = item.status === "draft"
                            ? `Supprimer ce brouillon ?\n\n« ${item.prompt} »`
                            : `Supprimer « ${item.prompt} » ET toutes les réponses déjà reçues ?\n\nCette suppression est définitive.`;
                          if (!window.confirm(warning)) return;
                          if (await run(`delete-${item.id}`, "delete_item", { item_id: item.id }, "Activité supprimée")) setSelectedId(null);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <LiveQrCode value={urls.public} size={84} className="shadow-none" expandable caption={urls.display} />
              <div className="min-w-0 text-sm">
                <p className="text-muted-foreground">Lien public</p>
                <p className="break-all font-mono text-foreground">{urls.display}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-destructive"
              disabled={busy !== null}
              onClick={async () => {
                if (!window.confirm(
                  "Tout remettre à zéro ?\n\nToutes les réponses, tous les votes, tous les « j'aime » et tous les participants seront effacés, et les activités repasseront en brouillon.\n\nVos questions, vos notes et vos codes sont conservés.",
                )) return;
                const res = await run<{ participants: number; answers: number; votes: number }>("reset", "reset_event", {});
                if (res) {
                  toast.success(`Remis à zéro : ${res.answers} réponse(s), ${res.votes} vote(s), ${res.participants} participant(s) effacés`);
                  setSelectedId(null);
                  onEventChanged();
                }
              }}
            >
              <Eraser className="mr-1.5 h-4 w-4" />Tout remettre à zéro
            </Button>
            {event.status !== "closed" && (
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
          {!selected ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              Sélectionnez ou créez une activité.
            </div>
          ) : (
            <ItemDetail
              key={selected.id}
              item={selected}
              note={notes[selected.id] ?? ""}
              busy={busy}
              onEdit={() => openEditor(selected)}
              onSaveNote={async (note) => {
                if (await run(`note-${selected.id}`, "update_item", { item_id: selected.id, note }, "Note enregistrée")) {
                  setNotes((prev) => ({ ...prev, [selected.id]: note }));
                  return true;
                }
                return false;
              }}
              onHide={(ids, hidden) =>
                ids.length === 1
                  ? run(`hide-${ids[0]}`, "hide_message", { message_id: ids[0], hidden })
                  : run(`hide-${ids[0]}`, "hide_messages", { item_id: selected.id, message_ids: ids, hidden })
              }
            />
          )}
        </section>
      </div>

      <ItemComposer
        open={composerOpen}
        onOpenChange={(o) => { setComposerOpen(o); if (!o) setEditing(null); }}
        initial={editing ? {
          kind: editing.kind as LiveKind,
          prompt: editing.prompt,
          options: editing.options,
          duration_seconds: editing.duration_seconds,
          show_authors: editing.show_authors,
          note: notes[editing.id] ?? "",
        } : null}
        onSubmit={submitItem}
      />

      <ParticipantsDialog
        open={peopleOpen}
        onOpenChange={setPeopleOpen}
        eventId={event.id}
        onDelete={async (p) => {
          if (!window.confirm(`Supprimer ${p.first_name} ${p.emoji} ?\n\nSes réponses, ses votes et ses « j'aime » seront effacés.`)) return false;
          const res = await run<{ answers: number }>(`del-participant-${p.id}`, "delete_participant", { participant_id: p.id });
          if (!res) return false;
          toast.success(res.answers ? `${p.first_name} supprimé, ${res.answers} message(s) effacé(s)` : `${p.first_name} supprimé`);
          return true;
        }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

interface ItemDetailProps {
  item: LiveItem;
  note: string;
  busy: string | null;
  onEdit: () => void;
  onSaveNote: (note: string) => Promise<boolean>;
  onHide: (messageIds: string[], hidden: boolean) => Promise<unknown>;
}

const ItemDetail = ({ item, note, busy, onEdit, onSaveNote, onHide }: ItemDetailProps) => {
  const kind = item.kind as LiveKind;
  const hasMessages = kind === "open" || kind === "wall" || kind === "cloud";
  const { all, visible } = useLiveMessages(hasMessages ? item.id : null, kind);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note);
  const words = useMemo(() => (kind === "cloud" ? groupWords(all) : []), [all, kind]);

  useEffect(() => { if (!editing) setDraft(note); }, [note, editing]);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mn-eyebrow-turquoise mb-1">
            {KIND_LABEL[kind]} · {STATUS_LABEL[item.status]}
            {item.duration_seconds ? ` · ${item.duration_seconds} s` : ""}
          </div>
          <h2 className="font-editorial text-2xl font-semibold italic text-foreground md:text-3xl">{item.prompt}</h2>
          {kind === "poll" && item.options.length > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">{item.options.join(" · ")}</p>
          )}
        </div>
        <Button variant="outline" size="sm" className="shrink-0" onClick={onEdit}>
          <Pencil className="mr-1.5 h-3.5 w-3.5" />Modifier
        </Button>
      </div>

      {/* Note privée de l'animateur */}
      <div className="rounded-lg border border-ocre/30 bg-ocre/5 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-ocre">Note animateur</span>
          {!editing && (
            <Button variant="ghost" size="sm" className="h-7" onClick={() => setEditing(true)}>
              <Pencil className="mr-1 h-3.5 w-3.5" />{note ? "Modifier" : "Ajouter"}
            </Button>
          )}
        </div>
        {editing ? (
          <div className="space-y-2">
            <Textarea value={draft} onChange={(e) => setDraft(e.target.value.slice(0, 4000))} rows={6} autoFocus aria-label="Note animateur" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => { setDraft(note); setEditing(false); }}>Annuler</Button>
              <Button size="sm" disabled={busy !== null} onClick={async () => { if (await onSaveNote(draft.trim())) setEditing(false); }}>Enregistrer</Button>
            </div>
          </div>
        ) : note ? (
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{note}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Aucune note.</p>
        )}
      </div>

      {/* Aperçu identique à l'écran de salle */}
      <div className="rounded-xl p-5 md:p-6" style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}>
        <div className="mn-eyebrow-light mb-4">Aperçu</div>
        {item.status === "draft" ? (
          <p className="py-6 text-center text-sm text-primary-foreground/60">Brouillon : rien à afficher avant le lancement.</p>
        ) : (
          <ActivityDisplay item={item} variant="compact" showHeader={false} />
        )}
      </div>

      {/* Nuage : mots, prénoms, masquage */}
      {kind === "cloud" && item.status !== "draft" && (
        <div>
          <h3 className="mb-3 flex items-baseline gap-2 font-semibold text-foreground">
            Mots proposés
            <span className="text-sm font-normal text-muted-foreground">{words.length} mot{words.length > 1 ? "s" : ""} · {all.length} proposition{all.length > 1 ? "s" : ""}</span>
          </h3>
          {item.show_authors && (
            <p className="mb-3 text-xs text-muted-foreground">Prénoms visibles ici uniquement. Repérez un mot, appelez la personne, passez-lui le micro.</p>
          )}
          <ul className="divide-y divide-border rounded-lg border border-border bg-card">
            {!words.length && <li className="p-4 text-sm text-muted-foreground">Rien pour l'instant.</li>}
            {words.map((w) => {
              const hidden = w.messages.every((m) => m.hidden);
              return (
                <li key={w.key} className={cn("flex items-start gap-3 p-3", hidden && "opacity-50")}>
                  <span className="w-8 shrink-0 text-right font-semibold tabular-nums text-foreground">{w.count}</span>
                  <div className="min-w-0 flex-1">
                    <p className={cn("font-medium text-foreground", hidden && "line-through")}>{w.label}</p>
                    {item.show_authors && (
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                        {w.messages.map((m) => <AuthorChip key={m.id} {...authorOf(m)} className="text-xs text-muted-foreground" />)}
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busy !== null}
                    onClick={() => onHide(w.messages.map((m) => m.id), !hidden)}
                    aria-label={hidden ? `Réafficher « ${w.label} »` : `Masquer « ${w.label} »`}
                  >
                    {hidden ? <><Eye className="mr-1 h-4 w-4" />Afficher</> : <><EyeOff className="mr-1 h-4 w-4" />Masquer</>}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Question ouverte et mur : modération message par message */}
      {(kind === "open" || kind === "wall") && item.status !== "draft" && (
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
                    <AuthorChip {...authorOf(m)} className="text-xs" />
                    {kind === "wall" && <span>♥ {m.like_count}</span>}
                    <span>{new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy !== null}
                  onClick={() => onHide([m.id], !m.hidden)}
                  aria-label={m.hidden ? "Réafficher le message" : "Masquer le message"}
                >
                  {m.hidden ? <><Eye className="mr-1 h-4 w-4" />Afficher</> : <><EyeOff className="mr-1 h-4 w-4" />Masquer</>}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background px-4">
    <div className="mx-auto max-w-7xl py-4"><img src={logo} alt="Mare Nostrum" className="h-8 w-auto" /></div>
    {children}
  </div>
);

export default LiveRegie;
