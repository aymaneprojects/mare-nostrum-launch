import { useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmojiPicker from "@/components/live/EmojiPicker";
import { supabase } from "@/integrations/supabase/client";
import { newIdentity, randomEmoji, saveIdentity, type LiveIdentity } from "@/lib/live/identity";
import { PG_RLS_VIOLATION } from "@/lib/live/types";

interface JoinFormProps {
  eventId: string;
  eventTitle: string;
  onJoined: (identity: LiveIdentity) => void;
}

const JoinForm = ({ eventId, eventTitle, onJoined }: JoinFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [emoji, setEmoji] = useState(randomEmoji);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const trimmed = firstName.trim();
  const valid = trimmed.length >= 1 && trimmed.length <= 30;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");

    const identity = newIdentity(trimmed, emoji);
    const { error: insertError } = await supabase
      .from("live_participants")
      .insert({ id: identity.id, event_id: eventId, first_name: identity.firstName, emoji: identity.emoji });

    setSubmitting(false);
    if (insertError) {
      setError(
        insertError.code === PG_RLS_VIOLATION
          ? "Cet événement est terminé, il n'accepte plus de participants."
          : "Connexion impossible pour le moment. Réessayez dans un instant.",
      );
      return;
    }
    saveIdentity(eventId, identity);
    onJoined(identity);
  };

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-md space-y-7">
      <div className="text-center">
        <div className="mn-eyebrow-light mb-3">Bienvenue</div>
        <h1
          className="font-editorial text-3xl font-semibold italic leading-tight text-primary-foreground"
          style={{ letterSpacing: "-0.015em", textWrap: "balance" } as React.CSSProperties}
        >
          {eventTitle}
        </h1>
        <p className="mt-3 text-sm text-primary-foreground/70">
          Choisissez un prénom et un emoji : ils s'afficheront à côté de vos réponses.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="live-firstname" className="text-primary-foreground/80">Votre prénom</Label>
        <Input
          id="live-firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          maxLength={30}
          autoComplete="given-name"
          autoFocus
          placeholder="Prénom"
          className="h-12 text-base text-foreground"
        />
      </div>

      <div className="space-y-3">
        <span className="text-sm font-medium text-primary-foreground/80">Votre emoji</span>
        <EmojiPicker value={emoji} onChange={setEmoji} />
      </div>

      {error && <p role="alert" className="text-sm text-destructive-foreground bg-destructive/80 rounded-lg px-3 py-2">{error}</p>}

      <Button type="submit" size="lg" variant="secondary" className="h-12 w-full text-base" disabled={!valid || submitting}>
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Rejoindre en tant que {emoji} {trimmed || "…"} <ArrowRight className="ml-1 h-4 w-4" /></>}
      </Button>
    </form>
  );
};

export default JoinForm;
