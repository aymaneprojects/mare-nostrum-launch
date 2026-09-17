import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Search, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Participant = Pick<Tables<"live_participants">, "id" | "first_name" | "emoji" | "created_at">;

interface ParticipantsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  /** Supprime la personne et tout ce qu'elle a envoyé. Renvoie true si c'est fait. */
  onDelete: (participant: Participant) => Promise<boolean>;
}

/** Liste des participants, avec recherche et suppression. */
const ParticipantsDialog = ({ open, onOpenChange, eventId, onDelete }: ParticipantsDialogProps) => {
  const [people, setPeople] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("live_participants")
      .select("id, first_name, emoji, created_at")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });
    setPeople(data ?? []);
    setLoading(false);
  }, [eventId]);

  useEffect(() => { if (open) void load(); }, [open, load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? people.filter((p) => p.first_name.toLowerCase().includes(q)) : people;
  }, [people, query]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Participants</DialogTitle>
          <DialogDescription>
            Supprimer une personne efface aussi ses réponses, ses votes et ses « j'aime ». Elle peut rejoindre à nouveau avec son téléphone.
          </DialogDescription>
        </DialogHeader>

        <div className="relative my-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Chercher un prénom" className="pl-9" aria-label="Chercher un participant" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-border">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : !filtered.length ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              {people.length ? "Aucun prénom ne correspond." : "Personne n'a encore rejoint."}
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((p) => (
                <li key={p.id} className="flex items-center gap-3 p-3">
                  <span className="text-xl" aria-hidden>{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{p.first_name}</p>
                    <p className="text-xs text-muted-foreground">
                      arrivé à {new Date(p.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={busyId !== null}
                    aria-label={`Supprimer ${p.first_name}`}
                    onClick={async () => {
                      setBusyId(p.id);
                      const done = await onDelete(p);
                      setBusyId(null);
                      if (done) setPeople((prev) => prev.filter((x) => x.id !== p.id));
                    }}
                  >
                    {busyId === p.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="flex items-center gap-1.5 pt-3 text-xs text-muted-foreground">
          <UserRound className="h-3.5 w-3.5" aria-hidden />
          {people.length} participant{people.length > 1 ? "s" : ""}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantsDialog;
