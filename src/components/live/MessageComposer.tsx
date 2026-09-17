import { useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import type { LiveIdentity } from "@/lib/live/identity";
import { LIMITS, PG_RLS_VIOLATION } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface MessageComposerProps {
  itemId: string;
  identity: LiveIdentity;
  placeholder: string;
  submitLabel: string;
  /** Mur de questions : proposer de publier anonymement. */
  allowAnonymous?: boolean;
  /** Appelé après un envoi réussi (pour recharger la liste sans attendre). */
  onPosted?: () => void;
}

/** Saisie d'une réponse ou d'un message du mur, avec compteur et anti-envoi répété. */
const MessageComposer = ({ itemId, identity, placeholder, submitLabel, allowAnonymous, onPosted }: MessageComposerProps) => {
  const [body, setBody] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const lastSent = useRef(0);

  const trimmed = body.trim();
  const remaining = LIMITS.messageLength - body.length;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed || sending) return;

    const wait = LIMITS.messageCooldownMs - (Date.now() - lastSent.current);
    if (wait > 0) {
      setFeedback({ tone: "error", text: `Patientez ${Math.ceil(wait / 1000)} s avant un nouvel envoi.` });
      return;
    }

    const anon = Boolean(allowAnonymous && anonymous);
    setSending(true);
    setFeedback(null);
    const { error } = await supabase.from("live_messages").insert({
      item_id: itemId,
      participant_id: identity.id,
      author_name: anon ? "" : identity.firstName,
      author_emoji: anon ? "" : identity.emoji,
      body: trimmed,
      anonymous: anon,
    });
    setSending(false);

    if (error) {
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
    setFeedback({ tone: "ok", text: anon ? "Envoyé anonymement ✓" : "Envoyé ✓" });
    onPosted?.();
  };

  return (
    <form onSubmit={send} className="space-y-3">
      <Textarea
        value={body}
        onChange={(e) => { setBody(e.target.value.slice(0, LIMITS.messageLength)); setFeedback(null); }}
        placeholder={placeholder}
        rows={3}
        maxLength={LIMITS.messageLength}
        aria-label={placeholder}
        className="resize-none text-base text-foreground"
      />

      {allowAnonymous && (
        <div role="radiogroup" aria-label="Signature" className="grid grid-cols-2 gap-2 rounded-full bg-primary-foreground/[0.07] p-1">
          {[
            { value: false, label: `${identity.emoji} ${identity.firstName}` },
            { value: true, label: "🕶️ Anonyme" },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              role="radio"
              aria-checked={anonymous === opt.value}
              onClick={() => setAnonymous(opt.value)}
              className={cn(
                "h-10 truncate rounded-full px-3 text-sm transition-colors",
                anonymous === opt.value ? "bg-primary-foreground text-foreground" : "text-primary-foreground/70",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

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
