import { useEffect, useRef, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { LiveIdentity } from "@/lib/live/identity";
import { LIMITS, PG_RLS_VIOLATION, type LiveItem } from "@/lib/live/types";

interface CloudInputProps {
  item: LiveItem;
  identity: LiveIdentity;
}

const wordsKey = (itemId: string) => `mn-live-words:${itemId}`;

/** Saisie de mots pour un nuage : quelques mots, 3 propositions maximum. */
const CloudInput = ({ item, identity }: CloudInputProps) => {
  const [value, setValue] = useState("");
  const [mine, setMine] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const lastSent = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setMine(JSON.parse(localStorage.getItem(wordsKey(item.id)) ?? "[]"));
    } catch {
      setMine([]);
    }
  }, [item.id]);

  const remaining = LIMITS.cloudWordsPerPerson - mine.length;
  const trimmed = value.trim();

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed || sending || remaining <= 0) return;

    const wait = LIMITS.cloudCooldownMs - (Date.now() - lastSent.current);
    if (wait > 0) {
      setError("Un instant avant le mot suivant…");
      return;
    }

    setSending(true);
    setError("");
    const { error: insertError } = await supabase.from("live_messages").insert({
      item_id: item.id,
      participant_id: identity.id,
      author_name: identity.firstName,
      author_emoji: identity.emoji,
      body: trimmed,
    });
    setSending(false);

    if (insertError) {
      setError(
        insertError.code === PG_RLS_VIOLATION
          ? "Mot refusé : la question est peut-être terminée, ou vous avez déjà proposé 3 mots."
          : "Envoi impossible pour le moment. Réessayez.",
      );
      return;
    }
    lastSent.current = Date.now();
    const next = [...mine, trimmed];
    setMine(next);
    try { localStorage.setItem(wordsKey(item.id), JSON.stringify(next)); } catch { /* ignore */ }
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-4">
      {remaining > 0 ? (
        <form onSubmit={send} className="flex gap-2">
          <Input
            ref={inputRef}
            value={value}
            onChange={(e) => { setValue(e.target.value.slice(0, LIMITS.cloudLength)); setError(""); }}
            maxLength={LIMITS.cloudLength}
            placeholder={mine.length ? "Un autre mot ?" : "Un mot, ou quelques mots"}
            aria-label="Votre mot"
            enterKeyHint="send"
            autoComplete="off"
            className="h-12 flex-1 text-base text-foreground"
          />
          <Button type="submit" variant="secondary" className="h-12 shrink-0 px-5" disabled={!trimmed || sending} aria-label="Envoyer le mot">
            {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
          </Button>
        </form>
      ) : (
        <p role="status" className="rounded-2xl bg-primary-foreground/[0.07] px-4 py-3 text-center text-sm text-primary-foreground/80">
          Merci ! Vos mots sont dans le nuage : regardez l'écran.
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-primary-foreground/50">
        <span>{remaining > 0 ? `${remaining} mot${remaining > 1 ? "s" : ""} restant${remaining > 1 ? "s" : ""}` : "3 mots proposés"}</span>
        <span>{LIMITS.cloudLength - value.length} caractères</span>
      </div>

      {mine.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Vos mots">
          {mine.map((w, i) => (
            <li key={`${w}-${i}`} className="animate-in fade-in zoom-in-95 rounded-full bg-accent/20 px-3 py-1.5 text-sm text-primary-foreground">
              {w}
            </li>
          ))}
        </ul>
      )}

      {item.show_authors && (
        <p className="text-xs text-primary-foreground/50">Votre prénom est visible par l'animateur, pas à l'écran.</p>
      )}
      {error && <p role="alert" className="text-sm text-accent">{error}</p>}
    </div>
  );
};

export default CloudInput;
