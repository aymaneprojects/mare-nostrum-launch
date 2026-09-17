import AuthorChip from "@/components/live/AuthorChip";
import { authorOf, type LiveMessage } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface AnswerFeedProps {
  messages: LiveMessage[];
  /** "screen" : vidéoprojecteur, gros caractères ; "compact" : régie. */
  variant?: "screen" | "compact";
  emptyLabel?: string;
}

/** Réponses à une question ouverte, les plus récentes en premier, qui apparaissent en fondu. */
const AnswerFeed = ({ messages, variant = "screen", emptyLabel = "Les réponses apparaîtront ici." }: AnswerFeedProps) => {
  if (!messages.length) {
    return <p className={cn("text-center text-primary-foreground/50", variant === "screen" ? "py-16 text-xl" : "py-8 text-sm")}>{emptyLabel}</p>;
  }

  return (
    <ul
      className={cn(
        "grid gap-3 md:gap-4",
        variant === "screen" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
      )}
    >
      {messages.map((m) => (
        <li
          key={m.id}
          className={cn(
            "animate-in fade-in zoom-in-95 duration-500 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.07] backdrop-blur-sm",
            variant === "screen" ? "p-5 md:p-6" : "p-4",
          )}
        >
          <p className={cn("break-words leading-snug text-primary-foreground", variant === "screen" ? "text-lg md:text-2xl" : "text-base")}>
            {m.body}
          </p>
          <AuthorChip {...authorOf(m)} className="mt-3 text-primary-foreground/60" />
        </li>
      ))}
    </ul>
  );
};

export default AnswerFeed;
