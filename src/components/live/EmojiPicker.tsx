import { Shuffle } from "lucide-react";
import { EMOJIS, randomEmoji } from "@/lib/live/identity";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  value: string;
  onChange: (emoji: string) => void;
}

const EmojiPicker = ({ value, onChange }: EmojiPickerProps) => (
  <div>
    <div role="radiogroup" aria-label="Choisissez votre emoji" className="grid grid-cols-6 gap-2 sm:grid-cols-8">
      {EMOJIS.map((emoji) => {
        const selected = emoji === value;
        return (
          <button
            key={emoji}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`Emoji ${emoji}`}
            onClick={() => onChange(emoji)}
            className={cn(
              "flex h-11 w-full items-center justify-center rounded-xl text-2xl transition-all duration-150 active:scale-95",
              selected
                ? "bg-accent/25 ring-2 ring-accent"
                : "bg-primary-foreground/5 hover:bg-primary-foreground/10",
            )}
          >
            {emoji}
          </button>
        );
      })}
    </div>
    <button
      type="button"
      onClick={() => onChange(randomEmoji())}
      className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary-foreground/60 transition-colors hover:text-primary-foreground"
    >
      <Shuffle className="h-3.5 w-3.5" />
      Au hasard
    </button>
  </div>
);

export default EmojiPicker;
