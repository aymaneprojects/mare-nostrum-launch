import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { LiveIdentity } from "@/lib/live/identity";
import { PG_UNIQUE_VIOLATION, type LiveItem } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface PollVoteProps {
  item: LiveItem;
  identity: LiveIdentity;
  onIdentityLost?: () => void;
}

const LETTERS = "ABCDEFGHIJ";
const choiceKey = (itemId: string) => `mn-live-choice:${itemId}`;

/** Vote depuis le téléphone. Les résultats ne sont pas écoutés ici : ils s'affichent à l'écran. */
const PollVote = ({ item, identity, onIdentityLost }: PollVoteProps) => {
  const [choice, setChoice] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
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

    if (insertError && insertError.code === "23503") {
      onIdentityLost?.();
      return;
    }
    if (insertError && insertError.code !== PG_UNIQUE_VIOLATION) {
      setError("Vote impossible : le sondage est peut-être terminé.");
      return;
    }
    // Succès, ou vote déjà enregistré pour ce participant : on verrouille dans les deux cas.
    setChoice(index);
    try { localStorage.setItem(choiceKey(item.id), String(index)); } catch { /* ignore */ }
  };

  const locked = choice !== null;

  return (
    <div className="space-y-3">
      <ul className="space-y-3" role="list">
        {item.options.map((label, i) => {
          const chosen = choice === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => vote(i)}
                disabled={locked || pending !== null}
                aria-pressed={chosen}
                className={cn(
                  "flex min-h-14 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-base transition-all duration-150",
                  chosen
                    ? "border-accent bg-accent/20 text-primary-foreground"
                    : locked
                      ? "border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/40"
                      : "border-primary-foreground/15 bg-primary-foreground/[0.07] text-primary-foreground hover:bg-primary-foreground/[0.12] active:scale-[0.98]",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm",
                    chosen ? "bg-accent text-accent-foreground" : "bg-primary-foreground/10",
                  )}
                >
                  {pending === i ? <Loader2 className="h-4 w-4 animate-spin" /> : chosen ? <Check className="h-4 w-4" /> : LETTERS[i]}
                </span>
                <span className="min-w-0 break-words">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {locked && (
        <p role="status" className="pt-2 text-center text-sm text-primary-foreground/70">
          Vote enregistré ✓ — les résultats s'affichent sur l'écran.
        </p>
      )}
      {error && <p role="alert" className="text-center text-sm text-accent">{error}</p>}
    </div>
  );
};

export default PollVote;
