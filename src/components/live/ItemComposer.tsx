import { useEffect, useState } from "react";
import { BarChart3, Cloud, Loader2, MessageSquareText, MessagesSquare, Plus, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LiveKind } from "@/lib/live/types";
import { cn } from "@/lib/utils";

export interface ItemDraft {
  kind: LiveKind;
  prompt: string;
  options: string[];
  duration_seconds: number | null;
  show_authors: boolean;
  note: string;
}

interface ItemComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Valeurs de départ = mode modification. Le type d'activité n'est alors plus modifiable. */
  initial?: ItemDraft | null;
  onSubmit: (draft: ItemDraft) => Promise<void>;
}

const KINDS: { kind: LiveKind; label: string; hint: string; Icon: typeof BarChart3 }[] = [
  { kind: "cloud", label: "Nuage de mots", hint: "Quelques mots, lisible à 200 personnes", Icon: Cloud },
  { kind: "open", label: "Question ouverte", hint: "Réponses libres affichées à l'écran", Icon: MessageSquareText },
  { kind: "poll", label: "Sondage", hint: "Choix multiples, résultats en barres", Icon: BarChart3 },
  { kind: "rating", label: "Satisfaction", hint: "Note de 1 à 5, moyenne à l'écran", Icon: Star },
  { kind: "wall", label: "Mur de questions", hint: "Reste ouvert en parallèle, triées par likes", Icon: MessagesSquare },
];

const DURATIONS = [
  { value: null, label: "Sans minuteur" },
  { value: 30, label: "30 s" },
  { value: 60, label: "60 s" },
  { value: 90, label: "90 s" },
  { value: 120, label: "2 min" },
  { value: 300, label: "5 min" },
];

const EMPTY: ItemDraft = { kind: "cloud", prompt: "", options: ["", ""], duration_seconds: null, show_authors: false, note: "" };

/** Création et modification d'une activité. */
const ItemComposer = ({ open, onOpenChange, initial, onSubmit }: ItemComposerProps) => {
  const editing = Boolean(initial);
  const [draft, setDraft] = useState<ItemDraft>(EMPTY);
  const [saving, setSaving] = useState(false);

  // Recharge les valeurs à chaque ouverture (création : formulaire vierge).
  useEffect(() => {
    if (!open) return;
    setDraft(initial ? { ...initial, options: initial.options.length ? initial.options : ["", ""] } : EMPTY);
  }, [open, initial]);

  const set = <K extends keyof ItemDraft>(key: K, value: ItemDraft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const filledOptions = draft.options.map((o) => o.trim()).filter(Boolean);
  const valid = draft.prompt.trim().length > 0 && (draft.kind !== "poll" || (filledOptions.length >= 2 && filledOptions.length <= 10));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || saving) return;
    setSaving(true);
    try {
      await onSubmit({
        ...draft,
        prompt: draft.prompt.trim(),
        options: draft.kind === "poll" ? filledOptions : [],
        duration_seconds: draft.kind === "wall" ? null : draft.duration_seconds,
        show_authors: draft.kind === "cloud" && draft.show_authors,
        note: draft.note.trim(),
      });
      onOpenChange(false);
    } catch {
      /* l'erreur est déjà affichée par l'appelant */
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier l'activité" : "Nouvelle activité"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Les changements s'appliquent immédiatement, y compris si l'activité est en cours."
                : "Elle est créée en brouillon : lancez-la quand vous êtes prêt."}
            </DialogDescription>
          </DialogHeader>

          <div className="my-5 space-y-5">
            <div role="radiogroup" aria-label="Type d'activité" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {KINDS.map(({ kind: k, label, hint, Icon }) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={draft.kind === k}
                  disabled={editing}
                  onClick={() => set("kind", k)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-colors",
                    draft.kind === k ? "border-accent bg-accent/10" : "border-border hover:border-primary/40",
                    editing && draft.kind !== k && "opacity-40",
                    editing && "cursor-not-allowed",
                  )}
                >
                  <Icon className="mb-1.5 h-5 w-5 text-primary" />
                  <span className="block text-sm font-medium text-foreground">{label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>
                </button>
              ))}
            </div>
            {editing && <p className="-mt-3 text-xs text-muted-foreground">Le type ne se change pas : créez une autre activité si besoin.</p>}

            <div className="space-y-2">
              <Label htmlFor="live-prompt">{draft.kind === "wall" ? "Consigne affichée" : "Question"}</Label>
              <Textarea
                id="live-prompt"
                value={draft.prompt}
                onChange={(e) => set("prompt", e.target.value.slice(0, 300))}
                rows={2}
                maxLength={300}
                placeholder={draft.kind === "wall" ? "Posez vos questions, quand elles vous viennent" : "Qu'attendez-vous de cette conférence ?"}
              />
            </div>

            {draft.kind === "poll" && (
              <div className="space-y-2">
                <Label>Options (2 à 10)</Label>
                {draft.options.map((value, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={value}
                      onChange={(e) => set("options", draft.options.map((o, j) => (j === i ? e.target.value.slice(0, 120) : o)))}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      aria-label={`Option ${String.fromCharCode(65 + i)}`}
                    />
                    {draft.options.length > 2 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => set("options", draft.options.filter((_, j) => j !== i))} aria-label={`Retirer l'option ${String.fromCharCode(65 + i)}`}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {draft.options.length < 10 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => set("options", [...draft.options, ""])}>
                    <Plus className="mr-1 h-4 w-4" />Ajouter une option
                  </Button>
                )}
              </div>
            )}

            {draft.kind !== "wall" && (
              <div className="space-y-2">
                <Label>Minuteur affiché</Label>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={String(d.value)}
                      type="button"
                      onClick={() => set("duration_seconds", d.value)}
                      aria-pressed={draft.duration_seconds === d.value}
                      className={cn(
                        "h-9 rounded-full border px-4 text-sm transition-colors",
                        draft.duration_seconds === d.value ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40",
                      )}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Indicatif : l'activité ne se ferme pas toute seule.{editing ? " Le décompte repart du lancement de l'activité." : ""}
                </p>
              </div>
            )}

            {draft.kind === "cloud" && (
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3">
                <input
                  type="checkbox"
                  checked={draft.show_authors}
                  onChange={(e) => set("show_authors", e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span>
                  <span className="block text-sm font-medium text-foreground">Voir les prénoms en régie</span>
                  <span className="block text-xs text-muted-foreground">
                    Pour appeler quelqu'un par son prénom et lui passer le micro. Les prénoms ne s'affichent jamais à l'écran de salle.
                  </span>
                </span>
              </label>
            )}

            <div className="space-y-2">
              <Label htmlFor="live-note">Note pour l'animateur</Label>
              <Textarea
                id="live-note"
                value={draft.note}
                onChange={(e) => set("note", e.target.value.slice(0, 4000))}
                rows={3}
                placeholder="Consignes, relances, ce qu'il faut dire… Visible uniquement en régie et dans le conducteur."
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={!valid || saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? "Enregistrer" : "Créer en brouillon"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemComposer;
