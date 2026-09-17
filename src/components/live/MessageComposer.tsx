import { useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { LiveIdentity } from "@/lib/live/identity";
import { PG_RLS_VIOLATION } from "@/lib/live/types";

const MAX = 280;
const COOLDOWN_MS = 5_000;

interface MessageComposerProps {
  itemId: string;
  identity: LiveIdentity;
  placeholder: string;
  submitLabel: string;
  /** Appelé quand le serveur refuse l'identité (participant disparu) : on repropose l'inscription. */
  onIdentityLost?: () => void;
}

/** Saisie d'une réponse ou d'un message du mur, avec compteur et anti-envoi répété. */
const MessageComposer = ({ itemId, identity, placeholder, submitLabel, onIdentityLost }: MessageComposerProps) => {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const lastSent = useRef(0);

  const trimmed = body.trim();
  const remaining = MAX - body.length;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed || sending) return;

    const wait = COOLDOWN_MS - (Date.now() - lastSent.current);
    if (wait > 0) {
      setFeedback({ tone: "error", text: `Patientez ${Math.ceil(wait / 1000)} s avant un nouvel envoi.` });
      return;
    }

    setSending(true);
    setFeedback(null);
    const { error } = await supabase.from("live_messages").insert({
      item_id: itemId,
      participant_id: identity.id,
      author_name: identity.firstName,
      author_emoji: identity.emoji,
      body: trimmed,
    });
    setSending(false);

    if (error) {
      if (error.code === "23503") {
        onIdentityLost?.();
        return;
      }
      setFeedback({
        tone: "error",
        text: error.code === PG_RLS_VIOLATION
          ? "Envoi refusé : l'activité est peut-être terminée, ou vous envoyez trop vite."
          : "Envoi impossible pour le moment. Réessayez.",
      });
      return;
    }
    lastSent.current = Date.now();
    setBody("");
    setFeedback({ tone: "ok", text: "Envoyé ✓" });
  };

  return (
    <form onSubmit={send} className="space-y-3">
      <Textarea
        value={body}
        onChange={(e) => { setBody(e.target.value.slice(0, MAX)); setFeedback(null); }}
        placeholder={placeholder}
        rows={3}
        maxLength={MAX}
        aria-label={placeholder}
        className="resize-none text-base text-foreground"
      />
      <div className="flex items-center justify-between gap-3">
        <span
          role={feedback ? "status" : undefined}
          className={
            feedback?.tone === "error" ? "text-sm text-accent"
              : feedback ? "text-sm text-primary-foreground/80"
                : `text-xs ${remaining < 20 ? "text-accent" : "text-primary-foreground/50"}`
          }
        >
          {feedback ? feedback.text : `${remaining} caractères restants`}
        </span>
        <Button type="submit" variant="secondary" className="h-11 shrink-0 px-6" disabled={!trimmed || sending}>
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-1.5 h-4 w-4" />{submitLabel}</>}
        </Button>
      </div>
    </form>
  );
};

export default MessageComposer;
