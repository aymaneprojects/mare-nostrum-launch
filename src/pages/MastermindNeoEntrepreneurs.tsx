import { Download, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";

interface InfoCardProps { title: string; children: React.ReactNode; }
const InfoCard = ({ title, children }: InfoCardProps) => (
  <article className="border-b border-border pb-7 last:border-b-0 last:pb-0">
    <h2 className="font-editorial italic text-foreground mb-3">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </article>
);

const MastermindNeoEntrepreneurs = () => {
  const brochureButton = (
    <Button asChild size="lg" variant="secondary">
      <a href="/contact">Demander de recevoir la fiche formation détaillée<Download className="ml-2 h-5 w-5" /></a>
    </Button>
  );

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <EnhancedSEOHead
        title="Mastermind néo-entrepreneurs à Toulouse | Mare Nostrum"
        description="Formation de 56 h sur 12 mois à Toulouse pour créateurs d'entreprise : codéveloppement, mentorat individuel et entrepreneur invité à chaque session."
        keywords="mastermind entrepreneur Toulouse, codéveloppement dirigeant, mentorat entrepreneur, formation créateur entreprise, repreneur entreprise"
        structuredData={{ "@context": "https://schema.org", "@type": "Course", name: "Mastermind néo-entrepreneurs", description: "Parcours de 12 mois en petit groupe destiné aux porteurs de projet et créateurs d'entreprise, combinant codéveloppement et mentorat individuel.", provider: { "@type": "Organization", name: "Mare Nostrum", url: "https://www.marenostrum.tech" }, educationalLevel: "Porteurs de projet et créateurs d'entreprise", timeRequired: "PT56H", locationCreated: { "@type": "Place", name: "Toulouse" } }}
      />
      <Header />
      <PageHero eyebrow="Présentiel · Toulouse" title="Mastermind néo-entrepreneurs" subtitle="Parcours de 12 mois en petit groupe pour résoudre ses problématiques de jeune dirigeant par le codéveloppement, avec un entrepreneur invité à chaque session." ctas={brochureButton} />
      <Breadcrumbs items={[{ label: "Centre de formation", href: "/education" }, { label: "Mastermind néo-entrepreneurs", href: "/mastermind" }]} />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="mn-eyebrow-turquoise mb-3">Le programme en un coup d'œil</div>
              <h2 className="font-editorial italic text-foreground">Mastermind néo-entrepreneurs</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Les publics"><p>Porteurs de projet et créateurs d'entreprise. Groupe de 10 participants maximum, aux maturités variées : idéation, lancement et croissance.</p></InfoCard>
                <InfoCard title="Objectifs"><p>À l'issue du parcours, le participant sera capable de :</p><ul className="list-disc pl-5 space-y-1.5"><li>structurer et piloter l'avancement de son projet ;</li><li>mobiliser le codéveloppement pour résoudre ses problématiques et celles de ses pairs ;</li><li>consolider ses compétences de jeune dirigeant ;</li><li>mobiliser les ressources de l'écosystème entrepreneurial.</li></ul></InfoCard>
                <InfoCard title="Prérequis"><p>Aucun diplôme requis. Être engagé dans une création ou une reprise d'entreprise.</p></InfoCard>
                <InfoCard title="Résultats"><p>Taux de satisfaction : 93 % des participants recommandent nos formations.</p></InfoCard>
              </div>
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Durée et format"><p>56 h sur 12 mois, en présentiel à Toulouse : 48 h en collectif (11 demi-journées de 4 h, une session d'interconnaissance et un bilan à mi-parcours de 2 h chacun) et 8 h en individuel (diagnostic, micro-mentorat mensuel, bilan final).</p></InfoCard>
                <InfoCard title="Méthodes"><p>Codéveloppement professionnel, entrepreneur invité à chaque session, micro-mentorat individuel mensuel et groupe d'échanges en ligne.</p></InfoCard>
                <InfoCard title="Évaluation"><p>Diagnostic initial, objectifs à 6 et 12 mois, suivi des engagements, bilan de fin de parcours, évaluations de satisfaction et attestation de fin de formation.</p></InfoCard>
                <InfoCard title="Accès et délai"><p>Sur candidature, après entretien et diagnostic individuel. Délai minimum de 14 jours entre l'inscription et l'entrée en formation.</p></InfoCard>
                <InfoCard title="Tarif"><p>2 400 € HT par participant. Exonération de TVA (art. 261-4-4° a du CGI). Prise en charge au titre de la formation professionnelle : devis à la demande.</p></InfoCard>
                <InfoCard title="Handicap"><p>Formation accessible aux personnes en situation de handicap ; les aménagements sont étudiés au cas par cas.</p><a href="mailto:handicap@marenostrum.tech" className="inline-flex text-[hsl(var(--mn-turquoise))] underline font-semibold hover:opacity-80">Référent handicap : handicap@marenostrum.tech</a></InfoCard>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="mn-eyebrow-turquoise mb-3">Contact</div>
            <h2 className="font-editorial italic text-foreground mb-4">Demander la fiche formation détaillée</h2>
            <p className="text-muted-foreground text-lg mb-2">Julienne MUKABUCYANA, directrice du centre de formation</p>
            <a href="mailto:education@marenostrum.tech" className="inline-flex items-center gap-2 text-[hsl(var(--mn-turquoise))] underline font-semibold mb-7 hover:opacity-80"><Mail className="h-5 w-5" />education@marenostrum.tech · réponse sous 48 h</a>
            <div>{brochureButton}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MastermindNeoEntrepreneurs;
