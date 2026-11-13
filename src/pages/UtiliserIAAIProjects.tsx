import { Link } from "react-router-dom";
import { Download, Mail, Clock, MapPin, Target, BrainCircuit } from "lucide-react";
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

const UtiliserIAAIProjects = () => {
  const brochureButton = (
    <Button asChild size="lg" variant="secondary">
      <Link to="/contact">
        Demander la fiche formation détaillée
        <Download className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <EnhancedSEOHead
        title="Utiliser l'IA dans la conduite de projets | Mare Nostrum"
        description="Formation en situation de travail de 35 heures pour les chefs de projet. Intégrer l'IA dans vos projets réels : produire vos livrables, les vérifier et capitaliser vos usages, de façon fiable et responsable."
        keywords="formation chef de projet IA, formation utilsié l IA dans les projets, formation AFEST, formation en situation de travail, IA pour chefs de projet, formation projets réels, utiliser l IA dans les projets, chef de projet IA, formation 35 heures AFEST, formation individuelle projet"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Utiliser l'IA dans la conduite de projets",
          description: "Formation en situation de travail de 35 heures pour les chefs de projet. Intégrer l'IA dans vos projets réels de façon fiable et responsable.",
          provider: { "@type": "Organization", name: "Mare Nostrum", url: "https://www.marenostrum.tech" },
          timeRequired: "PT35H",
          courseMode: "blended",
          audience: { "@type": "EducationalAudience", educationalRole: "employee", audienceType: "Chefs de projet" }
        }}
      />
      <Header />
      <PageHero
        eyebrow="NUMÉRIQUE / IA · Chefs de projet · Formation individuelle"
        title="Utiliser l'IA dans la conduite de projets"
        subtitle="Une formation en situation de travail pour intégrer l'IA dans vos projets réels : produire vos livrables, les vérifier et capitaliser vos usages, de façon fiable et responsable."
        ctas={brochureButton}
      />
      <Breadcrumbs
        items={[
          { label: "Centre de formation", href: "/education" },
          { label: "Utiliser l'IA dans la conduite de projets", href: "/utiliser-ia-conduite-projets" },
        ]}
      />
      <main id="contenu" className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="mn-eyebrow-turquoise mb-3">Le programme en un coup d'œil</div>
              <h2 className="font-editorial italic text-foreground">Utiliser l'IA dans la conduite de projets</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Les publics">
                  <p>Chefs de projet, chargés de mission, coordinateurs et toute personne qui pilote des projets dans une entreprise, une association ou une structure publique. La formation s'adresse aux personnes qui utilisent déjà un outil d'IA, même ponctuellement, et qui veulent l'intégrer de façon fiable dans leur travail quotidien. C'est une formation individuelle : un apprenant, accompagné par un formateur.</p>
                </InfoCard>
                <InfoCard title="Objectifs">
                  <p>À l'issue du parcours, le participant sera capable de :</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>repérer et qualifier les cas d'usage de l'IA dans son projet, avec le gain attendu et le niveau de risque de chacun ;</li>
                    <li>rédiger, tester et améliorer des prompts pour produire ses livrables de projet (compte rendu, note de cadrage, planning, suivi des risques) ;</li>
                    <li>vérifier, corriger et sourcer toute production de l'IA avant diffusion, à l'aide d'une check-list ;</li>
                    <li>protéger les données de son organisation en appliquant les règles de confidentialité, du RGPD et de l'AI Act ;</li>
                    <li>choisir et utiliser la solution d'IA la plus adaptée parmi celles déjà disponibles dans sa structure (IA générative, automatisation ou agent IA) ;</li>
                    <li>capitaliser ses usages dans une bibliothèque de prompts et les partager avec son équipe.</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Prérequis">
                  <p>Conduire un projet réel pendant toute la durée de la formation. Avoir accès à au moins un outil d'IA autorisé par son organisation. Avoir l'accord de sa hiérarchie pour consacrer à la formation des temps de mise en situation sur son poste de travail. Aucune compétence technique requise. Pour les personnes qui n'ont jamais utilisé l'IA, nous recommandons de suivre d'abord l'Initiation à l'intelligence artificielle.</p>
                </InfoCard>
                <InfoCard title="Formateur">
                  <p>Aymane ABDENNOUR – chargé de développement de l'IA, diplômé d'Économie appliquée à Toulouse School of Economics, certifié IBM Data Science Professional et ambassadeur officiel n8n pour Toulouse.</p>
                </InfoCard>
                <InfoCard title="Résultats">
                  <p>93 % de nos clients confirment qu'ils recommandent nos solutions. 95 % de réussite constatée trois ans après la formation et l'utilisation de nos méthodes.</p>
                </InfoCard>
              </div>
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Durée et format">
                  <p>35 heures réparties sur 3 à 5 semaines, en action de formation en situation de travail (AFEST), sur le poste et le projet réel du participant. Les mises en situation, réalisées en autonomie, alternent avec des débriefs individuels avec le formateur à distance. Le parcours comprend six étapes :</p>
                  <ul className="list-disc pl-5 space-y-1.5 mt-2">
                    <li>positionnement et état des lieux de ses usages de l'IA (2 h) ;</li>
                    <li>repérage des tâches de son projet à confier à l'IA (3 h) ;</li>
                    <li>production de trois livrables réels avec l'IA (7 h) ;</li>
                    <li>vérification des résultats et usage responsable (4 h) ;</li>
                    <li>mise en œuvre d'une solution d'IA sur d'autres cas d'usage (14 h) ;</li>
                    <li>capitalisation, présentation à l'équipe et bilan réflexif final (5 h).</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Méthodes">
                  <p>Une formation qui part du travail réel, sans cours magistral : chaque étape commence par une consigne du formateur, se poursuit par une mise en situation sur un vrai livrable du projet, puis se termine par un débrief réflexif (méthode FAST) pour analyser ce qui a été fait et l'ajuster. Le participant a le droit à l'erreur : les premiers essais portent sur des documents non sensibles ou anonymisés, et toute production de l'IA est relue avant diffusion. Aucun outil n'est imposé : le participant apprend avec les solutions déjà disponibles dans sa structure.</p>
                  <p>À l'issue de la formation, le participant conserve ses productions : bibliothèque de prompts, check-list de vérification, fiche d'utilisation de la solution retenue et retour d'expérience.</p>
                </InfoCard>
                <InfoCard title="Évaluation">
                  <p>Analyse préalable des missions du participant et de ses situations de travail, puis grille de positionnement initial. Les indicateurs de chaque étape sont vérifiés à chaque débrief et notés dans une grille de suivi. La formation se termine par un entretien réflexif et une évaluation des acquis à partir des productions réalisées. Évaluation de satisfaction à chaud et à froid, puis certificat de réalisation.</p>
                </InfoCard>
                <InfoCard title="Accès et délai">
                  <p>Un délai minimum et incompressible de 14 jours est appliqué entre l'inscription et l'accès à la formation. Le démarrage suppose qu'un entretien préalable ait eu lieu pour identifier le projet support et les outils disponibles.</p>
                </InfoCard>
                <InfoCard title="Tarif">
                  <p>1400 €. Exonération de TVA (art. 261-4-4° a du CGI). L'AFEST est une modalité de formation reconnue par le Code du travail. Elle peut être prise en charge par votre OPCO, selon les règles de votre branche et la taille de votre entreprise.</p>
                </InfoCard>
                <InfoCard title="Handicap">
                  <p>La formation est accessible aux personnes en situation de handicap. Les aménagements sont étudiés avec le candidat lors de l'inscription afin de favoriser son apprentissage.</p>
                  <a href="mailto:handicap@marenostrum.tech" className="inline-flex text-turquoise-texte underline underline-offset-4 font-semibold hover:opacity-80">
                    Référent handicap : handicap@marenostrum.tech
                  </a>
                </InfoCard>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="mn-eyebrow-turquoise mb-3">Contact</div>
            <h2 className="font-editorial italic text-foreground mb-4">Demander la fiche formation détaillée</h2>
            <p className="text-muted-foreground text-lg mb-2">Julienne MUKABUCYANA, directrice du centre de formation</p>
            <a href="mailto:education@marenostrum.tech" className="inline-flex items-center gap-2 text-turquoise-texte underline underline-offset-4 font-semibold mb-7 hover:opacity-80">
              <Mail className="h-5 w-5" />education@marenostrum.tech · réponse sous 48 h
            </a>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link to="/contact">
                  Demander la fiche formation détaillée
                  <Download className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UtiliserIAAIProjects;
