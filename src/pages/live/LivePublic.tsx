import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, MessageSquareText, MessagesSquare } from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import LiveShell from "@/components/live/LiveShell";
import JoinForm from "@/components/live/JoinForm";
import MessageComposer from "@/components/live/MessageComposer";
import PollVote from "@/components/live/PollVote";
import RatingVote from "@/components/live/RatingVote";
import CloudInput from "@/components/live/CloudInput";
import WallFeed from "@/components/live/WallFeed";
import AuthorChip from "@/components/live/AuthorChip";
import Countdown from "@/components/live/Countdown";
import { supabase } from "@/integrations/supabase/client";
import { useLiveEvent } from "@/hooks/useLiveEvent";
import { useLiveMessages } from "@/hooks/useLiveMessages";
import { loadIdentity, saveIdentity, type LiveIdentity } from "@/lib/live/identity";
import { KIND_LABEL, PG_UNIQUE_VIOLATION, PHONE_POLL_MS, type LiveItem, type LiveKind } from "@/lib/live/types";
import { cn } from "@/lib/utils";

/**
 * Page ouverte par le QR code. Aucune connexion temps réel (voir PHONE_POLL_MS) :
 * la page interroge la base toutes les quelques secondes.
 * Si le mur est ouvert en même temps qu'une question, deux onglets permettent de
 * passer de l'un à l'autre.
 */
const LivePublic = () => {
  const { code } = useParams();
  const { event, status, activeItem, activeWall } = useLiveEvent(code, { realtime: false });
  const [identity, setIdentity] = useState<LiveIdentity | null>(null);
  const [identityChecked, setIdentityChecked] = useState(false);
  const [tab, setTab] = useState<"question" | "wall">("question");

  // Identité mémorisée pour cet événement, recréée côté serveur si elle a disparu.
  useEffect(() => {
    if (!event) return;
    const stored = loadIdentity(event.id);
    setIdentity(stored);
    setIdentityChecked(!stored);
    if (!stored) return;

    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("live_participants").select("id").eq("id", stored.id).maybeSingle();
      if (cancelled) return;
      if (!data) {
        const { error } = await supabase
          .from("live_participants")
          .insert({ id: stored.id, event_id: event.id, first_name: stored.firstName, emoji: stored.emoji });
        if (error && error.code !== PG_UNIQUE_VIOLATION && !cancelled) setIdentity(null);
      }
      if (!cancelled) setIdentityChecked(true);
    })();
    return () => { cancelled = true; };
  }, [event]);

  // Une nouvelle question qui démarre ramène sur l'onglet « question ».
  useEffect(() => {
    if (activeItem) setTab("question");
  }, [activeItem?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const showWall = Boolean(activeWall) && (tab === "wall" || !activeItem);
  const { visible: wallMessages, refetch: refetchWall } = useLiveMessages(
    showWall ? activeWall?.id : null,
    "wall",
    { pollMs: PHONE_POLL_MS.wall },
  );

  const forgetIdentity = useCallback(() => {
    if (!event) return;
    try { localStorage.removeItem(`mn-live-participant:${event.id}`); } catch { /* ignore */ }
    setIdentity(null);
  }, [event]);

  const seo = <EnhancedSEOHead title="Live — Mare Nostrum" description="Participez en direct à l'événement Mare Nostrum." noindex />;

  if (status === "loading") {
    return <LiveShell>{seo}<Centered><Loader2 className="h-8 w-8 animate-spin text-primary-foreground/60" aria-label="Chargement" /></Centered></LiveShell>;
  }

  if (status !== "ready" || !event) {
    return (
      <LiveShell>
        {seo}
        <Centered>
          <h1 className="font-editorial text-3xl font-semibold italic text-primary-foreground">Événement introuvable</h1>
          <p className="mt-3 max-w-sm text-primary-foreground/70">
            Vérifiez le code affiché à l'écran{code ? <> (vous avez saisi <span className="font-mono">{code.toUpperCase()}</span>)</> : null}.
          </p>
        </Centered>
      </LiveShell>
    );
  }

  const identityBadge = identity ? (
    <div className="flex items-center gap-2">
      <AuthorChip name={identity.firstName} emoji={identity.emoji} className="rounded-full bg-primary-foreground/10 px-3 py-1.5" />
      <button type="button" onClick={forgetIdentity} className="text-xs text-primary-foreground/50 underline-offset-2 hover:underline">
        Changer
      </button>
    </div>
  ) : null;

  const renderQuestion = (item: LiveItem) => {
    const kind = item.kind as LiveKind;
    return (
      <section key={item.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="mn-eyebrow-light">{KIND_LABEL[kind]}</span>
            <Countdown activatedAt={item.activated_at} durationSeconds={item.duration_seconds} active={item.status === "active"} className="ml-auto" />
          </div>
          <h1
            className="font-editorial text-2xl font-semibold italic leading-tight text-primary-foreground md:text-3xl"
            style={{ letterSpacing: "-0.01em", textWrap: "balance" } as React.CSSProperties}
          >
            {item.prompt}
          </h1>
        </div>
        {kind === "open" && identity && <MessageComposer itemId={item.id} identity={identity} placeholder="Votre réponse…" submitLabel="Envoyer" />}
        {kind === "cloud" && identity && <CloudInput item={item} identity={identity} />}
        {kind === "poll" && identity && <PollVote item={item} identity={identity} />}
        {kind === "rating" && identity && <RatingVote item={item} identity={identity} />}
      </section>
    );
  };

  const renderWall = (item: LiveItem) => (
    <section key={item.id} className="animate-in fade-in duration-300 space-y-6">
      <div>
        <div className="mn-eyebrow-light mb-2">Mur de questions</div>
        <h1
          className="font-editorial text-2xl font-semibold italic leading-tight text-primary-foreground md:text-3xl"
          style={{ letterSpacing: "-0.01em", textWrap: "balance" } as React.CSSProperties}
        >
          {item.prompt}
        </h1>
        {!activeItem && (
          <p className="mt-2 text-sm text-primary-foreground/60">La prochaine question apparaîtra ici automatiquement.</p>
        )}
      </div>
      {identity && <WallFeed item={item} identity={identity} messages={wallMessages} onChanged={() => void refetchWall()} />}
    </section>
  );

  return (
    <LiveShell title={event.title} aside={identityBadge}>
      {seo}
      <div className={cn("mx-auto w-full max-w-xl flex-1 px-4 pt-2", activeItem && activeWall ? "pb-28" : "pb-10")}>
        {!identity ? (
          event.status === "closed" ? (
            <Centered>
              <h1 className="font-editorial text-3xl font-semibold italic text-primary-foreground">{event.title}</h1>
              <p className="mt-3 text-primary-foreground/70">Cet événement est terminé. Merci pour votre participation !</p>
            </Centered>
          ) : (
            <div className="pt-4">
              <JoinForm eventId={event.id} eventTitle={event.title} onJoined={(id) => { saveIdentity(event.id, id); setIdentity(id); setIdentityChecked(true); }} />
            </div>
          )
        ) : !identityChecked ? (
          <Centered><Loader2 className="h-8 w-8 animate-spin text-primary-foreground/60" aria-label="Chargement" /></Centered>
        ) : activeItem && (!activeWall || tab === "question") ? (
          renderQuestion(activeItem)
        ) : activeWall ? (
          renderWall(activeWall)
        ) : (
          <Centered>
            <div className="mb-5 text-5xl" aria-hidden>{identity.emoji}</div>
            <h1 className="font-editorial text-3xl font-semibold italic text-primary-foreground">Bonjour {identity.firstName} !</h1>
            <p className="mt-3 max-w-xs text-primary-foreground/70">
              Vous êtes connecté. La prochaine question apparaîtra ici automatiquement, inutile de recharger la page.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-xs text-primary-foreground/50">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
              En attente de l'animateur
            </span>
          </Centered>
        )}
      </div>

      {/* Onglets : question en cours ↔ mur, quand les deux sont ouverts. */}
      {identity && identityChecked && activeItem && activeWall && (
        <nav
          aria-label="Activités en cours"
          className="fixed inset-x-0 bottom-0 z-20 border-t border-primary-foreground/10 bg-ink/90 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur"
        >
          <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
            {[
              { value: "question" as const, label: KIND_LABEL[activeItem.kind as LiveKind], Icon: MessageSquareText },
              { value: "wall" as const, label: "Mur de questions", Icon: MessagesSquare },
            ].map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                aria-current={tab === value ? "page" : undefined}
                className={cn(
                  "flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors",
                  tab === value ? "bg-accent text-accent-foreground" : "bg-primary-foreground/10 text-primary-foreground",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </LiveShell>
  );
};

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">{children}</div>
);

export default LivePublic;
