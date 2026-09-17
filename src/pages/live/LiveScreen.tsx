import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import LiveShell from "@/components/live/LiveShell";
import LiveQrCode from "@/components/live/LiveQrCode";
import AnswerFeed from "@/components/live/AnswerFeed";
import PollBars from "@/components/live/PollBars";
import WallBoard from "@/components/live/WallBoard";
import FullscreenButton from "@/components/live/FullscreenButton";
import { useLiveEvent } from "@/hooks/useLiveEvent";
import { useLiveMessages } from "@/hooks/useLiveMessages";
import { useLiveVotes } from "@/hooks/useLiveVotes";
import { KIND_LABEL, liveUrls, type LiveKind } from "@/lib/live/types";

/** Écran de salle (vidéoprojecteur) : QR pour rejoindre et rendu en direct de l'activité. */
const LiveScreen = () => {
  const { code } = useParams();
  const { event, status, lastItem, publicCode } = useLiveEvent(code);

  const kind = lastItem?.kind as LiveKind | undefined;
  const { visible } = useLiveMessages(kind === "open" || kind === "wall" ? lastItem?.id : null, kind);
  const { results, total } = useLiveVotes(kind === "poll" ? lastItem?.id : null, lastItem?.options ?? []);

  const urls = liveUrls(publicCode);
  const seo = <EnhancedSEOHead title="Écran live — Mare Nostrum" description="Écran de salle Mare Nostrum Live." noindex />;

  if (status === "loading") {
    return <LiveShell>{seo}<div className="flex flex-1 items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary-foreground/60" /></div></LiveShell>;
  }
  if (status !== "ready" || !event) {
    return <LiveShell>{seo}<div className="flex flex-1 items-center justify-center text-2xl text-primary-foreground/70">Événement introuvable.</div></LiveShell>;
  }

  const joinCorner = (
    <div className="flex items-center gap-4">
      <div className="hidden text-right lg:block">
        <p className="text-sm text-primary-foreground/60">Participez sur</p>
        <p className="font-mono text-lg font-semibold">{urls.display}</p>
      </div>
      <LiveQrCode value={urls.public} size={96} />
    </div>
  );

  // Rien n'a encore été lancé : grand écran d'accueil.
  if (!lastItem || !kind) {
    return (
      <LiveShell title={event.title}>
        {seo}
        <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-16 text-center lg:flex-row lg:gap-20">
          <div className="max-w-2xl lg:text-left">
            <div className="mn-eyebrow-light mb-4">Participez en direct</div>
            <h1
              className="font-editorial text-5xl font-semibold italic leading-[1.05] text-primary-foreground md:text-7xl"
              style={{ letterSpacing: "-0.02em", textWrap: "balance" } as React.CSSProperties}
            >
              {event.title}
            </h1>
            <p className="mt-8 text-xl text-primary-foreground/70 md:text-2xl">Scannez le QR code ou rendez-vous sur</p>
            <p className="mt-2 font-mono text-3xl font-semibold text-accent md:text-4xl">{urls.display}</p>
          </div>
          <LiveQrCode value={urls.public} size={320} className="shrink-0" />
        </div>
        <FullscreenButton className="fixed bottom-5 right-5" />
      </LiveShell>
    );
  }

  const finished = lastItem.status === "closed";

  return (
    <LiveShell title={event.title} aside={joinCorner}>
      {seo}
      <div className="mx-auto w-full max-w-7xl flex-1 px-6 pb-20 md:px-10">
        <div key={lastItem.id} className="animate-in fade-in duration-500">
          <div className="mb-3 flex items-center gap-3">
            <span className="mn-eyebrow-light">{KIND_LABEL[kind]}</span>
            {finished ? (
              <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs text-primary-foreground/70">Terminé</span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs text-primary-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
                En direct
              </span>
            )}
          </div>
          <h1
            className="mb-8 font-editorial text-4xl font-semibold italic leading-[1.1] text-primary-foreground md:mb-12 md:text-6xl"
            style={{ letterSpacing: "-0.02em", textWrap: "balance" } as React.CSSProperties}
          >
            {lastItem.prompt}
          </h1>

          {kind === "open" && <AnswerFeed messages={visible.slice(0, 60)} />}
          {kind === "poll" && <div className="max-w-5xl"><PollBars results={results} total={total} /></div>}
          {kind === "wall" && <WallBoard messages={visible} />}
        </div>
      </div>
      <FullscreenButton className="fixed bottom-5 right-5" />
    </LiveShell>
  );
};

export default LiveScreen;
