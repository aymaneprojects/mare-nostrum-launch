import AnswerFeed from "@/components/live/AnswerFeed";
import PollBars from "@/components/live/PollBars";
import WallBoard from "@/components/live/WallBoard";
import WordCloud from "@/components/live/WordCloud";
import RatingResult from "@/components/live/RatingResult";
import Countdown from "@/components/live/Countdown";
import { useLiveMessages } from "@/hooks/useLiveMessages";
import { useLiveVotes } from "@/hooks/useLiveVotes";
import { KIND_LABEL, type LiveItem, type LiveKind } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface ActivityDisplayProps {
  item: LiveItem;
  /** full : plein écran · half : côte à côte · compact : aperçu en régie */
  variant?: "full" | "half" | "compact";
  showHeader?: boolean;
}

/**
 * Rendu en direct d'une activité, pour l'écran de salle et l'aperçu de la régie.
 * Chaque instance ouvre ses propres abonnements temps réel : deux nuages côte à
 * côte se mettent à jour indépendamment.
 */
const ActivityDisplay = ({ item, variant = "full", showHeader = true }: ActivityDisplayProps) => {
  const kind = item.kind as LiveKind;
  const listensMessages = kind === "open" || kind === "wall" || kind === "cloud";
  const { visible } = useLiveMessages(listensMessages ? item.id : null, kind);
  const { results, total, average } = useLiveVotes(kind === "poll" || kind === "rating" ? item.id : null, item.options);

  const full = variant === "full";
  const compact = variant === "compact";
  const live = item.status === "active";

  return (
    <div className="animate-in fade-in duration-500">
      {showHeader && (
        <>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="mn-eyebrow-light">{KIND_LABEL[kind]}</span>
            {live ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs text-primary-foreground">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden />
                En direct
              </span>
            ) : (
              <span className="rounded-full bg-primary-foreground/10 px-3 py-1 text-xs text-primary-foreground/70">Terminé</span>
            )}
            <Countdown
              activatedAt={item.activated_at}
              durationSeconds={item.duration_seconds}
              active={live}
              size={full ? "large" : "small"}
              className="ml-auto"
            />
          </div>
          <h2
            className={cn(
              "font-editorial font-semibold italic text-primary-foreground",
              full ? "mb-8 text-4xl leading-[1.1] md:mb-10 md:text-6xl" : compact ? "mb-4 text-xl leading-tight" : "mb-6 text-3xl leading-[1.15] md:text-4xl",
            )}
            style={{ letterSpacing: "-0.02em", textWrap: "balance" } as React.CSSProperties}
          >
            {item.prompt}
          </h2>
        </>
      )}

      {kind === "cloud" && <WordCloud messages={visible} variant={full ? "screen" : compact ? "compact" : "half"} />}
      {kind === "open" && <AnswerFeed messages={visible.slice(0, full ? 60 : 12)} variant={full ? "screen" : "compact"} />}
      {kind === "wall" && (compact ? <AnswerFeed messages={visible.slice(0, 6)} variant="compact" emptyLabel="Pas encore de question." /> : <WallBoard messages={visible} limit={full ? 12 : 5} />)}
      {kind === "poll" && <div className={full ? "max-w-5xl" : ""}><PollBars results={results} total={total} variant={full ? "screen" : "compact"} /></div>}
      {kind === "rating" && <RatingResult results={results} total={total} average={average} variant={full ? "screen" : compact ? "compact" : "half"} />}
    </div>
  );
};

export default ActivityDisplay;
