import { useEffect, useState } from "react";
import { Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { LiveIdentity } from "@/lib/live/identity";
import { PG_UNIQUE_VIOLATION, type LiveItem } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface RatingVoteProps {
  item: LiveItem;
  identity: LiveIdentity;
}

const choiceKey = (itemId: string) => `mn-live-choice:${itemId}`;

/** Note de 1 à 5 depuis le téléphone. Le résultat s'affiche sur l'écran de salle. */
const RatingVote = ({ item, identity }: RatingVoteProps) => {
  const [choice, setChoice] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(choiceKey(item.id));
      setChoice(stored === null ? null : Number(stored));
    } catch {
      setChoice(null);
    }
  }, [item.id]);

  const vote = async (index: number) => {
    if (choice !== null || pending !== null) return;
    setPending(index);
    setError("");
    const { error: insertError } = await supabase
      .from("live_votes")
      .insert({ item_id: item.id, participant_id: identity.id, option_index: index });
    setPending(null);
    if (insertError && insertError.code !== PG_UNIQUE_VIOLATION) {
      setError("Note impossible à enregistrer : l'activité est peut-être terminée.");
      return;
    }
    setChoice(index);
    try { localStorage.setItem(choiceKey(item.id), String(index)); } catch { /* ignore */ }
  };

  const shown = choice ?? hover;

  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Votre note de 1 à 5" className="flex justify-between gap-2">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = shown !== null && i <= shown;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={choice === i}
              aria-label={`${i + 1} sur 5`}
              disabled={choice !== null || pending !== null}
              onClick={() => vote(i)}
              onPointerEnter={() => choice === null && setHover(i)}
              onPointerLeave={() => setHover(null)}
              className={cn(
                "flex aspect-square flex-1 flex-col items-center justify-center gap-1 rounded-2xl border transition-all duration-150",
                filled ? "border-accent bg-accent/15" : "border-primary-foreground/15 bg-primary-foreground/[0.07]",
                choice === null && "active:scale-95",
              )}
            >
              {pending === i ? (
                <Loader2 className="h-7 w-7 animate-spin text-primary-foreground" />
              ) : (
                <Star className={cn("h-7 w-7 sm:h-9 sm:w-9", filled ? "fill-accent text-accent" : "text-primary-foreground/40")} />
              )}
              <span className="text-sm font-semibold tabular-nums text-primary-foreground">{i + 1}</span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-primary-foreground/50">
        <span>Pas du tout satisfait</span>
        <span>Très satisfait</span>
      </div>
      {choice !== null && (
        <p role="status" className="pt-2 text-center text-sm text-primary-foreground/80">
          Merci ! Votre note ({choice + 1}/5) est enregistrée.
        </p>
      )}
      {error && <p role="alert" className="text-center text-sm text-accent">{error}</p>}
    </div>
  );
};

export default RatingVote;
