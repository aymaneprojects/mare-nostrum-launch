import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import AuthorChip from "@/components/live/AuthorChip";
import MessageComposer from "@/components/live/MessageComposer";
import { supabase } from "@/integrations/supabase/client";
import { remember, remembered, type LiveIdentity } from "@/lib/live/identity";
import { authorOf, PG_UNIQUE_VIOLATION, type LiveItem, type LiveMessage } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface WallFeedProps {
  item: LiveItem;
  identity: LiveIdentity;
  messages: LiveMessage[];
  /** Recharge la liste (le téléphone n'est pas en temps réel). */
  onChanged?: () => void;
}

/** Mur de questions sur téléphone : poster (signé ou anonyme), puis liker les questions des autres. */
const WallFeed = ({ item, identity, messages, onChanged }: WallFeedProps) => {
  const [liked, setLiked] = useState<Set<string>>(() => new Set());
  // Likes optimistes pas encore reflétés par le rechargement.
  const [pendingBump, setPendingBump] = useState<Record<string, number>>({});
  const [myMessages, setMyMessages] = useState<Set<string>>(() => new Set());

  useEffect(() => setLiked(remembered("liked", item.id)), [item.id]);

  // Dès que le compteur serveur a rattrapé le like optimiste, on retire le bonus local.
  useEffect(() => {
    setPendingBump((prev) => {
      if (!Object.keys(prev).length) return prev;
      const next = { ...prev };
      for (const id of Object.keys(next)) {
        const m = messages.find((x) => x.id === id);
        if (!m || m.like_count >= next[id]) delete next[id];
      }
      return next;
    });
    // Repère ses propres messages (y compris anonymes) pour les marquer « vous ».
    setMyMessages(new Set(messages.filter((m) => m.participant_id === identity.id).map((m) => m.id)));
  }, [messages, identity.id]);

  const like = async (message: LiveMessage) => {
    if (liked.has(message.id)) return;
    setLiked((prev) => new Set(prev).add(message.id));
    setPendingBump((prev) => ({ ...prev, [message.id]: message.like_count + 1 }));

    const { error } = await supabase
      .from("live_likes")
      .insert({ message_id: message.id, participant_id: identity.id });

    if (!error || error.code === PG_UNIQUE_VIOLATION) {
      remember("liked", item.id, message.id);
      onChanged?.();
      return;
    }
    // Échec réel : on annule l'optimisme.
    setLiked((prev) => {
      const next = new Set(prev);
      next.delete(message.id);
      return next;
    });
    setPendingBump((prev) => {
      const next = { ...prev };
      delete next[message.id];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <MessageComposer
        itemId={item.id}
        identity={identity}
        placeholder="Votre question, quand elle vous vient…"
        submitLabel="Publier"
        allowAnonymous
        onPosted={onChanged}
      />

      <div>
        <div className="mn-eyebrow-light mb-3">
          {messages.length ? `${messages.length} message${messages.length > 1 ? "s" : ""} · les plus aimés en premier` : "Aucune question pour l'instant"}
        </div>
        <ul className="space-y-3">
          {messages.map((m) => {
            const isLiked = liked.has(m.id);
            const count = Math.max(m.like_count, pendingBump[m.id] ?? 0);
            const author = authorOf(m);
            const mine = myMessages.has(m.id);
            return (
              <li key={m.id} className="animate-in fade-in duration-300 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/[0.07] p-4">
                <p className="break-words text-base leading-snug text-primary-foreground">{m.body}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <AuthorChip name={mine ? `${author.name} (vous)` : author.name} emoji={author.emoji} className="text-primary-foreground/60" />
                  <button
                    type="button"
                    onClick={() => like(m)}
                    disabled={isLiked}
                    aria-pressed={isLiked}
                    aria-label={isLiked ? `Vous aimez cette question, ${count} like${count > 1 ? "s" : ""}` : `Aimer cette question, ${count} like${count > 1 ? "s" : ""}`}
                    className={cn(
                      "inline-flex h-11 min-w-[4.5rem] items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold tabular-nums transition-all duration-150",
                      isLiked
                        ? "bg-accent/20 text-primary-foreground"
                        : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15 active:scale-95",
                    )}
                  >
                    <Heart className={cn("h-4 w-4", isLiked ? "fill-accent text-accent" : "text-primary-foreground/70")} />
                    {count}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WallFeed;
