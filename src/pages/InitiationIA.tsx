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

const InitiationIA = () => {
  const brochureButton = <Button asChild size="lg" variant="secondary"><a href="/contact">Demander de recevoir la fiche formation détaillée<Download className="ml-2 h-5 w-5" /></a></Button>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedSEOHead
        title="Initiation à l'intelligence artificielle | Mare Nostrum"
        description="Formation de 7 heures à distance pour comprendre, utiliser et apprivoiser l'intelligence artificielle générative de façon utile et responsable."
        keywords="formation initiation IA, intelligence artificielle générative, ChatGPT, usage responsable IA, formation IA à distance"
        structuredData={{ "@context": "https://schema.org", "@type": "Course", name: "Initiation à l'intelligence artificielle", description: "Une journée d'initiation à l'intelligence artificielle générative, à distance.", provider: { "@type": "Organization", name: "Mare Nostrum", url: "https://www.marenostrum.tech" }, timeRequired: "PT7H", courseMode: "online" }}
      />
      <Header />
      <PageHero eyebrow="100 % à distance · 7 heures" title="Initiation à l'intelligence artificielle" subtitle="Comprendre et apprivoiser l'intelligence artificielle : une journée d'initiation pour démarrer sereinement." ctas={brochureButton} />
      <Breadcrumbs items={[{ label: "Centre de formation", href: "/education" }, { label: "Initiation à l'intelligence artificielle", href: "/initiation-ia" }]} />

      <main className="flex-1">
        <section className="py-16 md:py-24"><div className="container mx-auto px-4 max-w-6xl"><div className="text-center max-w-3xl mx-auto mb-10 md:mb-14"><div className="mn-eyebrow-turquoise mb-3">Le programme en un coup d'œil</div><h2 className="font-editorial italic text-foreground">Initiation à l'intelligence artificielle</h2></div><div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
            <InfoCard title="Les publics"><p>Salariés, dirigeants, entrepreneurs, agents publics, demandeurs d'emploi et toute personne souhaitant comprendre l'IA avant de l'utiliser. Formation particulièrement adaptée aux personnes qui ont peu ou pas utilisé d'outil d'IA. Groupe de 12 participants maximum.</p></InfoCard>
            <InfoCard title="Objectifs"><p>À l'issue du parcours, le participant sera capable de :</p><ul className="list-disc pl-5 space-y-1.5"><li>expliquer ce qu'est l'intelligence artificielle et le fonctionnement d'un modèle de langage ;</li><li>identifier les bénéfices, limites et risques de l'IA ;</li><li>utiliser un assistant conversationnel pour des tâches professionnelles simples ;</li><li>rédiger et améliorer une consigne claire et structurée ;</li><li>appliquer les règles de vérification, confidentialité, RGPD et AI Act ;</li><li>repérer des cas d'usage pertinents dans son activité.</li></ul></InfoCard>
            <InfoCard title="Prérequis"><p>Aucun diplôme ni compétence technique requis. Savoir utiliser un ordinateur et naviguer sur internet. Disposer d'un ordinateur avec webcam, micro et connexion stable.</p></InfoCard>
            <InfoCard title="Formateur"><p>Aymane ABDENNOUR — chargé de développement de l'IA, diplômé d'Économie appliquée à Toulouse School of Economics, certifié IBM Data Science Professional et ambassadeur officiel n8n pour Toulouse.</p></InfoCard>
            <InfoCard title="Résultats"><p>93 % de nos clients confirment qu'ils recommandent nos solutions. 95 % de réussite constatée trois ans après la formation et l'utilisation de nos méthodes.</p></InfoCard>
          </div>
          <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
            <InfoCard title="Durée et format"><p>7 heures en une journée, à distance en classe virtuelle synchrone : le matin, comprendre l'IA et découvrir les outils ; l'après-midi, bien utiliser l'IA de façon responsable et construire son plan de premiers pas. Formation disponible en intra ou inter-entreprises.</p></InfoCard>
            <InfoCard title="Méthodes"><p>Pédagogie active et rassurante : apports courts sans jargon, démonstrations en direct, exercices pratiques, échanges en sous-groupes et remise d'un guide pratique avec prompts, règles d'usage responsable et sélection d'outils gratuits.</p><p>Supports et ressources numériques sont disponibles après la formation. Test de connexion proposé avant la session ; assistance technique et pédagogique par e-mail.</p></InfoCard>
            <InfoCard title="Évaluation"><p>Questionnaire de positionnement, exercices pratiques pendant la journée, quiz d'évaluation des acquis, plan de premiers pas formalisé, évaluation de satisfaction à chaud et à froid, puis attestation de fin de formation.</p><p>Un questionnaire d'analyse du besoin et un test de positionnement en ligne permettent d'adapter la formation.</p></InfoCard>
            <InfoCard title="Accès et délai"><p>Un délai minimum et incompressible de 14 jours est appliqué entre l'inscription et l'accès à la formation.</p></InfoCard>
            <InfoCard title="Tarif"><p>420 € HT par participant. Exonération de TVA (art. 261-4-4° a du CGI). En cas de prise en charge au titre de la formation professionnelle ou pour une session intra-entreprise : devis à la demande.</p></InfoCard>
            <InfoCard title="Handicap"><p>La formation est accessible aux personnes en situation de handicap. Les aménagements sont étudiés avec le candidat lors de l'inscription afin de favoriser son apprentissage.</p><a href="mailto:handicap@marenostrum.tech" className="inline-flex text-[hsl(var(--mn-turquoise))] underline font-semibold hover:opacity-80">Référent handicap : handicap@marenostrum.tech</a></InfoCard>
          </div>
        </div></div></section>
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border"><div className="container mx-auto px-4 max-w-4xl text-center"><div className="mn-eyebrow-turquoise mb-3">Contact</div><h2 className="font-editorial italic text-foreground mb-4">Demander la fiche formation détaillée</h2><p className="text-muted-foreground text-lg mb-2">Julienne MUKABUCYANA, directrice du centre de formation</p><a href="mailto:education@marenostrum.tech" className="inline-flex items-center gap-2 text-[hsl(var(--mn-turquoise))] underline font-semibold mb-7 hover:opacity-80"><Mail className="h-5 w-5" />education@marenostrum.tech · réponse sous 48 h</a><div>{brochureButton}</div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default InitiationIA;
