import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, Printer, Timer, UserRound } from "lucide-react";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useLiveEvent } from "@/hooks/useLiveEvent";
import { liveAdmin, loadAdminCode } from "@/lib/live/admin";
import { KIND_LABEL, liveUrls, type LiveKind } from "@/lib/live/types";
import { KIND_ICON } from "@/components/live/kindIcons";

/**
 * Conducteur imprimable : le déroulé complet de l'événement avec les notes de
 * l'animateur. Accessible uniquement avec le code animateur de la session.
 */
const LiveConducteur = () => {
  const { code } = useParams();
  const { event, status, items, publicCode } = useLiveEvent(code, { realtime: false });
  const [notes, setNotes] = useState<Record<string, string> | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!publicCode) return;
    const adminCode = loadAdminCode(publicCode);
    if (!adminCode) {
      setDenied(true);
      return;
    }
    liveAdmin<{ notes: Record<string, string> }>("get_notes", { public_code: publicCode, admin_code: adminCode })
      .then((res) => setNotes(res.notes ?? {}))
      .catch(() => setDenied(true));
  }, [publicCode]);

  const urls = liveUrls(publicCode);
  const seo = <EnhancedSEOHead title="Conducteur live — Mare Nostrum" description="Conducteur de l'animateur." noindex />;

  if (denied) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-center">
        {seo}
        <h1 className="font-editorial text-3xl font-semibold italic text-foreground">Conducteur réservé à l'animateur</h1>
        <p className="mt-3 text-muted-foreground">Ouvrez d'abord la régie avec votre code animateur, puis revenez ici.</p>
        <Button asChild className="mt-6"><Link to={`/live/${publicCode}/regie`}>Ouvrir la régie</Link></Button>
      </div>
    );
  }

  if (status === "loading" || !notes || !event) {
    return <div className="flex min-h-screen items-center justify-center bg-background">{seo}<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="min-h-screen bg-background print:bg-card">
      {seo}
      <div className="mx-auto max-w-3xl px-5 py-8 md:py-12 print:max-w-none print:px-0 print:py-0">
        <header className="mb-10 flex items-start justify-between gap-6 border-b border-border pb-6">
          <div>
            <img src={logo} alt="Mare Nostrum" className="mb-5 h-8 w-auto" />
            <div className="mn-eyebrow-turquoise mb-2">Conducteur · {event.public_code}</div>
            <h1 className="font-editorial text-3xl font-semibold italic text-foreground md:text-4xl">{event.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Public : <span className="font-mono">{urls.display}</span> · {items.length} activité{items.length > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.print()} className="print:hidden">
            <Printer className="mr-1.5 h-4 w-4" />Imprimer
          </Button>
        </header>

        <ol className="space-y-8">
          {items.map((item, index) => {
            const kind = item.kind as LiveKind;
            const Icon = KIND_ICON[kind];
            const note = notes[item.id];
            return (
              <li key={item.id} className="break-inside-avoid">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">{index + 1}</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground"><Icon className="h-4 w-4" />{KIND_LABEL[kind]}</span>
                  {item.duration_seconds && <span className="inline-flex items-center gap-1"><Timer className="h-3.5 w-3.5" />{item.duration_seconds} s</span>}
                  {item.show_authors && <span className="inline-flex items-center gap-1"><UserRound className="h-3.5 w-3.5" />prénoms en régie</span>}
                  {kind === "wall" && <span>reste ouvert en parallèle</span>}
                </div>
                <h2 className="font-editorial text-xl font-semibold italic text-foreground md:text-2xl">{item.prompt}</h2>
                {kind === "poll" && item.options.length > 0 && (
                  <p className="mt-1 text-sm text-muted-foreground">Options : {item.options.join(" · ")}</p>
                )}
                {note && (
                  <div className="mt-3 border-l-2 border-ocre pl-4">
                    <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground">{note}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default LiveConducteur;
