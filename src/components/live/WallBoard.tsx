import { Heart } from "lucide-react";
import AuthorChip from "@/components/live/AuthorChip";
import type { LiveMessage } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface WallBoardProps {
  messages: LiveMessage[];
  /** Nombre de messages affichés sur le grand écran. */
  limit?: number;
}

/** Mur de questions sur l'écran de salle : les plus likées en tête. */
const WallBoard = ({ messages, limit = 12 }: WallBoardProps) => {
  if (!messages.length) {
    return <p className="py-16 text-center text-xl text-primary-foreground/50">Posez vos questions depuis votre téléphone.</p>;
  }

  const [top, ...rest] = messages.slice(0, limit);

  return (
    <div className="space-y-4 md:space-y-5">
      <article className="animate-in fade-in duration-500 rounded-3xl border border-accent/40 bg-accent/[0.12] p-6 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <p className="break-words text-2xl leading-snug text-primary-foreground md:text-4xl">{top.body}</p>
          <LikeCount count={top.like_count} large />
        </div>
        <AuthorChip name={top.author_name} emoji={top.author_emoji} className="mt-4 text-primary-foreground/70 md:text-base" />
      </article>

      {rest.length > 0 && (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {rest.map((m) => (
            <li key={m.id} className="animate-in fade-in duration-500 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.07] p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="break-words text-lg leading-snug text-primary-foreground md:text-xl">{m.body}</p>
                <LikeCount count={m.like_count} />
              </div>
              <AuthorChip name={m.author_name} emoji={m.author_emoji} className="mt-3 text-primary-foreground/60" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const LikeCount = ({ count, large }: { count: number; large?: boolean }) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-foreground/10 font-semibold tabular-nums text-primary-foreground",
      large ? "px-4 py-2 text-xl md:text-2xl" : "px-3 py-1 text-base",
    )}
    aria-label={`${count} like${count > 1 ? "s" : ""}`}
  >
    <Heart className={cn("fill-accent text-accent", large ? "h-5 w-5 md:h-6 md:w-6" : "h-4 w-4")} />
    {count}
  </span>
);

export default WallBoard;
