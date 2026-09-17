import { useState } from "react";
import { BarChart3, Loader2, MessageSquareText, MessagesSquare, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LiveKind } from "@/lib/live/types";
import { cn } from "@/lib/utils";

interface ItemComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (input: { kind: LiveKind; prompt: string; options: string[] }) => Promise<void>;
}

const KINDS: { kind: LiveKind; label: string; hint: string; Icon: typeof BarChart3 }[] = [
  { kind: "open", label: "Question ouverte", hint: "Réponses libres affichées à l'écran", Icon: MessageSquareText },
  { kind: "poll", label: "Sondage", hint: "Choix multiples, résultats en barres", Icon: BarChart3 },
  { kind: "wall", label: "Mur de questions", hint: "Questions du public, triées par likes", Icon: MessagesSquare },
];

const ItemComposer = ({ open, onOpenChange, onCreate }: ItemComposerProps) => {
  const [kind, setKind] = useState<LiveKind>("open");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [saving, setSaving] = useState(false);

  const filledOptions = options.map((o) => o.trim()).filter(Boolean);
  const valid = prompt.trim().length > 0 && (kind !== "poll" || (filledOptions.length >= 2 && filledOptions.length <= 10));

  const reset = () => {
    setKind("open");
    setPrompt("");
    setOptions(["", ""]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || saving) return;
    setSaving(true);
    try {
      await onCreate({ kind, prompt: prompt.trim(), options: kind === "poll" ? filledOptions : [] });
      reset();
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <form onSubmit={submit}>
          <DialogHeader>
            <DialogTitle>Nouvelle activité</DialogTitle>
            <DialogDescription>Elle est créée en brouillon : activez-la quand vous êtes prêt.</DialogDescription>
          </DialogHeader>

          <div className="my-5 space-y-5">
            <div role="radiogroup" aria-label="Type d'activité" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {KINDS.map(({ kind: k, label, hint, Icon }) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={kind === k}
                  onClick={() => setKind(k)}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-colors",
                    kind === k ? "border-accent bg-accent/10" : "border-border hover:border-primary/40",
                  )}
                >
                  <Icon className="mb-1.5 h-5 w-5 text-primary" />
                  <span className="block text-sm font-medium text-foreground">{label}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="live-prompt">{kind === "wall" ? "Consigne affichée" : "Question"}</Label>
              <Textarea
                id="live-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.slice(0, 300))}
                rows={3}
                maxLength={300}
                placeholder={kind === "wall" ? "Posez vos questions à nos intervenants" : "Qu'attendez-vous de cette conférence ?"}
              />
            </div>

            {kind === "poll" && (
              <div className="space-y-2">
                <Label>Options (2 à 10)</Label>
                {options.map((value, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={value}
                      onChange={(e) => setOptions((prev) => prev.map((o, j) => (j === i ? e.target.value.slice(0, 120) : o)))}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      aria-label={`Option ${String.fromCharCode(65 + i)}`}
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setOptions((prev) => prev.filter((_, j) => j !== i))}
                        aria-label={`Retirer l'option ${String.fromCharCode(65 + i)}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {options.length < 10 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setOptions((prev) => [...prev, ""])}>
                    <Plus className="mr-1 h-4 w-4" />
                    Ajouter une option
                  </Button>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit" disabled={!valid || saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Créer en brouillon"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ItemComposer;
