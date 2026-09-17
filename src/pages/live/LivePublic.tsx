import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import LiveShell from "@/components/live/LiveShell";
import JoinForm from "@/components/live/JoinForm";
import MessageComposer from "@/components/live/MessageComposer";
import PollVote from "@/components/live/PollVote";
import WallFeed from "@/components/live/WallFeed";
import AuthorChip from "@/components/live/AuthorChip";
import { supabase } from "@/integrations/supabase/client";
import { useLiveEvent } from "@/hooks/useLiveEvent";
import { useLiveMessages } from "@/hooks/useLiveMessages";
import { loadIdentity, saveIdentity, type LiveIdentity } from "@/lib/live/identity";
import { KIND_LABEL, PG_UNIQUE_VIOLATION, type LiveKind } from "@/lib/live/types";

/** Page ouverte par le QR code : rejoindre, puis participer à l'activité en direct. */
const LivePublic = () => {
  const { code } = useParams();
  const { event, status, activeItem } = useLiveEvent(code);
  const [identity, setIdentity] = useState<LiveIdentity | null>(null);
  const [identityChecked, setIdentityChecked] = useState(false);

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

  const kind = activeItem?.kind as LiveKind | undefined;
  const listensMessages = kind === "wall"; // pour une question ouverte, le téléphone n'a pas besoin du flux
  const { visible } = useLiveMessages(listensMessages ? activeItem?.id : null, kind);

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

  return (
    <LiveShell title={event.title} aside={identityBadge}>
      {seo}
      <div className="mx-auto w-full max-w-xl flex-1 px-4 pb-10 pt-2">
        {!identity ? (
          event.status === "closed" ? (
            <Centered>
              <h1 className="font-editorial text-3xl font-semibold italic text-primary-foreground">{event.title}</h1>
              <p className="mt-3 text-primary-foreground/70">Cet événement est terminé. Merci pour votre participation !</p>
            </Centered>
          ) : (
            <div className="pt-4"><JoinForm eventId={event.id} eventTitle={event.title} onJoined={(id) => { saveIdentity(event.id, id); setIdentity(id); setIdentityChecked(true); }} /></div>
          )
        ) : !identityChecked ? (
          <Centered><Loader2 className="h-8 w-8 animate-spin text-primary-foreground/60" aria-label="Chargement" /></Centered>
        ) : !activeItem || !kind ? (
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
        ) : (
          <section key={activeItem.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
            <div>
              <div className="mn-eyebrow-light mb-2">{KIND_LABEL[kind]}</div>
              <h1
                className="font-editorial text-2xl font-semibold italic leading-tight text-primary-foreground md:text-3xl"
                style={{ letterSpacing: "-0.01em", textWrap: "balance" } as React.CSSProperties}
              >
                {activeItem.prompt}
              </h1>
            </div>

            {kind === "open" && (
              <MessageComposer
                itemId={activeItem.id}
                identity={identity}
                placeholder="Votre réponse…"
                submitLabel="Envoyer"
                onIdentityLost={forgetIdentity}
              />
            )}
            {kind === "poll" && <PollVote item={activeItem} identity={identity} onIdentityLost={forgetIdentity} />}
            {kind === "wall" && <WallFeed item={activeItem} identity={identity} messages={visible} onIdentityLost={forgetIdentity} />}
          </section>
        )}
      </div>
    </LiveShell>
  );
};

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">{children}</div>
);

export default LivePublic;
