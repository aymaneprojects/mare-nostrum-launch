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

const MastermindDigital = () => {
  const brochureButton = <Button asChild size="lg" variant="secondary"><a href="/contact">Demander de recevoir la fiche formation détaillée<Download className="ml-2 h-5 w-5" /></a></Button>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedSEOHead
        title="Mastermind digital | Jeunes entrepreneurs francophones | Mare Nostrum"
        description="Formation 100 % à distance de 39 h pour jeunes créateurs d'entreprise francophones : codéveloppement, mentorat et réseau international de pairs."
        keywords="mastermind digital entrepreneur, codéveloppement à distance, jeunes entrepreneurs francophones, mentorat entrepreneur en ligne"
        structuredData={{ "@context": "https://schema.org", "@type": "Course", name: "Mastermind digital", description: "Formation 100 % à distance pour jeunes créateurs d'entreprise de l'espace francophone.", provider: { "@type": "Organization", name: "Mare Nostrum", url: "https://www.marenostrum.tech" }, timeRequired: "PT39H", courseMode: "online" }}
      />
      <Header />
      <PageHero eyebrow="100 % à distance · Espace francophone" title="Mastermind digital" subtitle="Codévelopper entre jeunes dirigeants francophones : résoudre ses problématiques de jeune dirigeant par l'intelligence collective." ctas={brochureButton} />
      <Breadcrumbs items={[{ label: "Centre de formation", href: "/education" }, { label: "Mastermind digital", href: "/mastermind-digital" }]} />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14"><div className="mn-eyebrow-turquoise mb-3">Le programme en un coup d'œil</div><h2 className="font-editorial italic text-foreground">Mastermind digital</h2></div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Les publics"><p>Jeunes créateurs d'entreprise ayant lancé leur activité : étudiants et jeunes diplômés. Groupe limité à 10 participants, constitué par fuseau horaire ; pays, secteurs et maturités sont volontairement variés.</p></InfoCard>
                <InfoCard title="Objectifs"><p>À l'issue du parcours, le participant sera capable de :</p><ul className="list-disc pl-5 space-y-1.5"><li>structurer et piloter l'avancement de son projet entrepreneurial ;</li><li>mobiliser le codéveloppement professionnel pour résoudre ses problématiques et celles de ses pairs ;</li><li>construire un réseau de jeunes entrepreneurs dans la francophonie.</li></ul></InfoCard>
                <InfoCard title="Prérequis"><p>Être étudiant ou jeune diplômé, avoir lancé son activité (structure immatriculée), maîtriser le français et disposer d'un ordinateur avec caméra, micro et connexion internet stable. Admission sur entretien et diagnostic individuel.</p></InfoCard>
                <InfoCard title="Formateurs"><p>Alexis JANICOT, 15 ans d'expérience dans l'écosystème entrepreneurial et ancien directeur French Tech ; Aymane ABDENNOUR, chargé de développement des usages de l'IA.</p></InfoCard>
                <InfoCard title="Résultats"><p>93 % de nos clients confirment qu'ils recommandent nos solutions. 95 % de réussite constatée trois ans après la formation et l'utilisation de nos méthodes.</p></InfoCard>
              </div>
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Durée et format"><p>39 h au total, 100 % à distance : 31 h en collectif (11 sessions de 2 h 30, une session d'interconnaissance de 1 h 30 et un bilan collectif à mi-parcours de 2 h) et 8 h en individuel (diagnostic, micro-mentorat mensuel et bilan final).</p></InfoCard>
                <InfoCard title="Méthodes"><p>Classes virtuelles synchrones et codéveloppement professionnel : deux temps de codéveloppement par session, animation par un formateur, micro-mentorat mensuel et espace d'échange en ligne dédié.</p><p>Supports, comptes rendus et suivi des engagements partagés après chaque rencontre ; test de connexion avant la première séance et accompagnement technique et pédagogique par e-mail.</p></InfoCard>
                <InfoCard title="Évaluation"><p>Diagnostic individuel initial, formalisation d'objectifs à 6 et 12 mois, suivi continu des engagements, évaluations de satisfaction après chaque session et à froid, bilan de fin de parcours et attestation de fin de formation.</p><p>Un questionnaire d'analyse du besoin et un test de positionnement en ligne permettent d'adapter la formation.</p></InfoCard>
                <InfoCard title="Accès et délai"><p>Admission sur entretien et diagnostic individuel. Un délai minimum et incompressible de 14 jours est appliqué entre l'inscription et l'accès à la formation.</p></InfoCard>
                <InfoCard title="Tarif"><p>Tarif individuel selon le pays de résidence : 1 690 € pour les pays à revenu élevé, 990 € pour les pays à revenu intermédiaire et 590 € pour les pays à faible revenu. Niveau déterminé selon la classification de la Banque mondiale en vigueur à l'inscription. Devis à la demande en cas de prise en charge.</p></InfoCard>
                <InfoCard title="Handicap"><p>La formation est accessible aux personnes en situation de handicap. Les aménagements sont étudiés avec le candidat au moment de l'inscription afin de favoriser son apprentissage.</p><a href="mailto:handicap@marenostrum.tech" className="inline-flex text-[hsl(var(--mn-turquoise))] underline font-semibold hover:opacity-80">Référent handicap : handicap@marenostrum.tech</a></InfoCard>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border"><div className="container mx-auto px-4 max-w-4xl text-center"><div className="mn-eyebrow-turquoise mb-3">Contact</div><h2 className="font-editorial italic text-foreground mb-4">Demander la fiche formation détaillée</h2><p className="text-muted-foreground text-lg mb-2">Julienne MUKABUCYANA, directrice du centre de formation</p><a href="mailto:education@marenostrum.tech" className="inline-flex items-center gap-2 text-[hsl(var(--mn-turquoise))] underline font-semibold mb-7 hover:opacity-80"><Mail className="h-5 w-5" />education@marenostrum.tech · réponse sous 48 h</a><div>{brochureButton}</div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default MastermindDigital;
