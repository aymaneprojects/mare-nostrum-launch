import { useParams } from "react-router-dom";
import { Loader2, MessagesSquare } from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import LiveShell from "@/components/live/LiveShell";
import LiveQrCode from "@/components/live/LiveQrCode";
import ActivityDisplay from "@/components/live/ActivityDisplay";
import FullscreenButton from "@/components/live/FullscreenButton";
import { useLiveEvent } from "@/hooks/useLiveEvent";
import { liveUrls } from "@/lib/live/types";

/**
 * Écran de salle (vidéoprojecteur). Affiche ce que la régie a choisi : une activité
 * en plein écran, ou deux côte à côte. Tant que le mur de questions est ouvert, son
 * QR code reste en coin d'écran.
 */
const LiveScreen = () => {
  const { code } = useParams();
  const { event, status, screenItems, activeWall, publicCode } = useLiveEvent(code);

  const urls = liveUrls(publicCode);
  const seo = <EnhancedSEOHead title="Écran live — Mare Nostrum" description="Écran de salle Mare Nostrum Live." noindex />;

  if (status === "loading") {
    return <LiveShell>{seo}<div className="flex flex-1 items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary-foreground/60" /></div></LiveShell>;
  }
  if (status !== "ready" || !event) {
    return <LiveShell>{seo}<div className="flex flex-1 items-center justify-center text-2xl text-primary-foreground/70">Événement introuvable.</div></LiveShell>;
  }

  // Rien n'a encore été lancé : grand écran d'accueil.
  if (!screenItems.length) {
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

  const wallOnScreen = screenItems.some((i) => i.kind === "wall");
  const wallInCorner = Boolean(activeWall) && !wallOnScreen;

  const corner = (
    <div className="flex items-center gap-4">
      <div className="hidden text-right lg:block">
        {wallInCorner ? (
          <p className="flex items-center justify-end gap-1.5 text-sm text-accent">
            <MessagesSquare className="h-4 w-4" aria-hidden />
            Mur de questions ouvert
          </p>
        ) : (
          <p className="text-sm text-primary-foreground/60">Participez sur</p>
        )}
        <p className="font-mono text-lg font-semibold text-primary-foreground">{urls.display}</p>
      </div>
      <LiveQrCode value={urls.public} size={wallInCorner ? 112 : 96} />
    </div>
  );

  const pair = screenItems.length === 2;

  return (
    <LiveShell title={event.title} aside={corner}>
      {seo}
      <div className={pair ? "w-full flex-1 px-6 pb-20 md:px-10" : "mx-auto w-full max-w-7xl flex-1 px-6 pb-20 md:px-10"}>
        {pair ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-primary-foreground/10">
            {screenItems.map((item, i) => (
              <section key={item.id} className={i === 0 ? "lg:pr-10" : "lg:pl-10"}>
                <ActivityDisplay item={item} variant="half" />
              </section>
            ))}
          </div>
        ) : (
          <ActivityDisplay key={screenItems[0].id} item={screenItems[0]} variant="full" />
        )}
      </div>
      <FullscreenButton className="fixed bottom-5 right-5" />
    </LiveShell>
  );
};

export default LiveScreen;
