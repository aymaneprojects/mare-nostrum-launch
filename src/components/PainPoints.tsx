import { useEffect, useState } from "react";
import { Clock, Brain, Target, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function ClubCounter() {
  const [count, setCount]         = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    supabase.functions.invoke("get-club-count")
      .then(({ data }) => { if (data?.count != null) setCount(data.count); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (count === null) return;
    if (count === 0) { setDisplayed(0); return; }
    let start = 0;
    const step = Math.ceil(count / 40);
    const id = window.setInterval(() => {
      start += step;
      if (start >= count) { setDisplayed(count); clearInterval(id); }
      else setDisplayed(start);
    }, 30);
    return () => clearInterval(id);
  }, [count]);

  if (count === null) return null;

  return (
    <p className="mt-4 text-sm font-medium text-accent">
      Aujourd'hui, le Club compte <span className="text-lg font-bold tabular-nums">{displayed}</span> entrepreneur{displayed > 1 ? "s" : ""} actif{displayed > 1 ? "s" : ""}
    </p>
  );
}

/** Diagnostic (ce qui freine les entrepreneurs), partagé entre /club et l'accueil. Texte inchangé. */
const PainPoints = () => (
      <section className="py-12 md:py-24 bg-background" aria-label="Problèmes courants des entrepreneurs">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mn-eyebrow-turquoise text-center mb-3">Le diagnostic</div>
            <h2 className="font-editorial italic font-semibold text-center mb-8 md:mb-12 text-foreground">
              Ce qui freine 90% des entrepreneurs (et comment en sortir)
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10">
              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu manques de temps</h3>
                <p className="text-sm text-muted-foreground">
                  Ton agenda ne reflète plus tes vrais objectifs ? Tu travailles 60 heures par semaine, mais ton chiffre d'affaires ne bouge pas ? Tu sens que ton énergie ne se transforme pas en résultats concrets ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu décides seul(e)</h3>
                <p className="text-sm text-muted-foreground">
                  Tu prends toutes les décisions stratégiques seul(e) ? Tu doutes, tu tournes en rond, tu n'as personne pour challenger ou clarifier tes choix stratégiques ? Tu es en stress permanent ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu ne sais plus par quoi commencer</h3>
                <p className="text-sm text-muted-foreground">
                  Ton offre manque de structure, ta prospection stagne ? Tu as du mal à prioriser tes actions ? Tu confonds urgence et importance ?
                </p>
              </div>

              <div className="bg-card border border-border rounded-sm p-6 hover-lift hover:border-accent/40 transition-all duration-200">
                <div className="bg-destructive/10 w-12 h-12 shape-hex flex items-center justify-center mb-4">
                  <Flame className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-3 text-foreground">Tu t'épuises sans résultat</h3>
                <p className="text-sm text-muted-foreground">
                  Tu n'as pas le temps de faire de la veille ou du réseau ? Chaque journée se termine avec la sensation de n'avoir rien fait d'utile ?
                </p>
              </div>
            </div>

            <div className="text-center mn-card mn-card-left shadow-soft p-6 md:p-8">
              <p className="text-lg md:text-xl text-foreground font-semibold">
                Bonne nouvelle : tu n'es pas seul.
              </p>
              <p className="text-muted-foreground mt-2">
                Le Club Mare Nostrum est là pour t'aider à passer TES caps et à renforcer la performance de ton modèle économique.
              </p>
              <ClubCounter />
            </div>
          </div>
        </div>
      </section>
);

export default PainPoints;
