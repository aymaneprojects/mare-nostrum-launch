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

const AgentIAMarketing = () => {
  const brochureButton = <Button asChild size="lg" variant="secondary"><a href="/contact">Demander de recevoir la fiche formation détaillée<Download className="ml-2 h-5 w-5" /></a></Button>;

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <EnhancedSEOHead
        title="Concevoir son agent IA marketing | Mare Nostrum"
        description="Formation de 44 heures à distance pour concevoir, construire et déployer un agent IA marketing appliqué à son propre cas."
        keywords="formation agent IA marketing, IA générative, automatisation marketing, n8n, prompt engineering, formation IA à distance"
        structuredData={{ "@context": "https://schema.org", "@type": "Course", name: "Concevoir son agent IA marketing", description: "Formation pour concevoir, construire et déployer son propre agent IA marketing.", provider: { "@type": "Organization", name: "Mare Nostrum", url: "https://www.marenostrum.tech" }, timeRequired: "PT44H", courseMode: "online" }}
      />
      <Header />
      <PageHero eyebrow="100 % à distance · 44 heures" title="Concevoir son agent IA marketing" subtitle="De l'IA générative à l'automatisation de ses campagnes : repartez avec un agent fonctionnel, appliqué à votre cas." ctas={brochureButton} />
      <Breadcrumbs items={[{ label: "Centre de formation", href: "/education" }, { label: "Concevoir son agent IA marketing", href: "/agent-ia-marketing" }]} />

      <main className="flex-1">
        <section className="py-16 md:py-24"><div className="container mx-auto px-4 max-w-6xl"><div className="text-center max-w-3xl mx-auto mb-10 md:mb-14"><div className="mn-eyebrow-turquoise mb-3">Le programme en un coup d'œil</div><h2 className="font-editorial italic text-foreground">Concevoir son agent IA marketing</h2></div><div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
            <InfoCard title="Les publics"><p>Professionnels du marketing et de la communication, chefs de projet, dirigeants de TPE-PME qui pilotent eux-mêmes leur marketing. Groupe de 10 participants maximum, pour un accompagnement individualisé.</p></InfoCard>
            <InfoCard title="Objectifs"><p>À l'issue de la formation, le participant sera capable de :</p><ul className="list-disc pl-5 space-y-1.5"><li>identifier les tâches marketing à confier à l'IA ou à un agent, et en évaluer l'intérêt, le coût et les risques ;</li><li>maîtriser le prompt engineering avancé appliqué au marketing ;</li><li>construire un assistant marketing personnalisé à partir de sa charte, son ton, ses personas et ses offres ;</li><li>concevoir des workflows marketing automatisés, connectés à ses outils ;</li><li>développer un agent IA capable de mener une mission de bout en bout, sous validation humaine ;</li><li>tester, sécuriser et piloter son agent dans le respect du RGPD, de l'AI Act et de la propriété intellectuelle.</li></ul></InfoCard>
            <InfoCard title="Prérequis"><p>Connaître les notions de base du marketing et utiliser régulièrement un assistant d'IA générative, ou avoir suivi la formation « Initiation à l'IA ». Aucune compétence en programmation n'est requise.</p><p>Disposer d'un ordinateur, d'un abonnement Claude Pro, ChatGPT Plus ou équivalent, d'une connexion stable, d'une webcam et d'un micro. Les prérequis sont vérifiés par le test de positionnement.</p></InfoCard>
            <InfoCard title="Formateur"><p>Aymane ABDENNOUR — chargé de développement de l'IA, diplômé d'Économie appliquée à Toulouse School of Economics, certifié IBM Data Science Professional et ambassadeur officiel n8n pour Toulouse.</p></InfoCard>
            <InfoCard title="Résultats"><p>93 % de nos clients confirment qu'ils recommandent nos solutions. 95 % de réussite constatée trois ans après la formation et l'utilisation de nos méthodes.</p></InfoCard>
          </div>
          <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
            <InfoCard title="Durée et format"><p>44 heures en distanciel synchrone, réparties en deux modules de trois jours : module 1 de 21 h, module 2 de 21 h, mentorat individuel en intersession d'1 h et bilan individuel de fin de parcours d'1 h.</p></InfoCard>
            <InfoCard title="Méthodes"><p>Une pédagogie « learn by building » : chaque participant construit son agent IA marketing sur un cas réel, du cahier des charges à la mise en service.</p><p>Apports courts, démonstrations, ateliers individuels et en sous-groupes, projet fil rouge, livrables intermédiaires et accompagnement personnalisé. Une bibliothèque de prompts marketing, des modèles de workflows n8n, un gabarit de cahier des charges et une grille d'évaluation qualité sont remis aux participants.</p><p>La formation se déroule en classe virtuelle synchrone. Supports partagés après chaque module, guide d'ouverture des comptes et accompagnement technique et pédagogique par e-mail.</p></InfoCard>
            <InfoCard title="Évaluation"><p>Test de positionnement en amont, évaluation continue à travers les ateliers et livrables de chaque module, puis mise en situation professionnelle finale : démonstration de l'agent IA marketing réalisé, évaluée avec une grille issue des objectifs.</p><p>Évaluations de satisfaction à la fin de chaque module et à froid, trois mois après la formation. Une attestation de fin de formation est remise.</p></InfoCard>
            <InfoCard title="Accès et délai"><p>Un questionnaire analyse l'adéquation du besoin et un test de positionnement permet d'adapter la formation. Un délai minimum et incompressible de 14 jours est appliqué entre l'inscription et l'accès à la formation.</p></InfoCard>
            <InfoCard title="Tarif"><p>2 400 € HT par participant. Exonération de TVA (art. 261-4-4° a du CGI). En cas de prise en charge ou pour une session intra-entreprise : devis à la demande.</p></InfoCard>
            <InfoCard title="Handicap"><p>La formation est accessible aux personnes en situation de handicap. Les aménagements sont étudiés avec le candidat lors de l'inscription afin de favoriser son apprentissage.</p><a href="mailto:handicap@marenostrum.tech" className="inline-flex text-[hsl(var(--mn-turquoise))] underline font-semibold hover:opacity-80">Référent handicap : handicap@marenostrum.tech</a></InfoCard>
          </div>
        </div></div></section>
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border"><div className="container mx-auto px-4 max-w-4xl text-center"><div className="mn-eyebrow-turquoise mb-3">Contact</div><h2 className="font-editorial italic text-foreground mb-4">Demander la fiche formation détaillée</h2><p className="text-muted-foreground text-lg mb-2">Julienne MUKABUCYANA, directrice du centre de formation</p><a href="mailto:education@marenostrum.tech" className="inline-flex items-center gap-2 text-[hsl(var(--mn-turquoise))] underline font-semibold mb-7 hover:opacity-80"><Mail className="h-5 w-5" />education@marenostrum.tech · réponse sous 48 h</a><div>{brochureButton}</div></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default AgentIAMarketing;
