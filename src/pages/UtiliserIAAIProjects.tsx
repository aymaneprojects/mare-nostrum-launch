import { Link } from "react-router-dom";
import { Download, Mail, Briefcase, Users, Clock, MapPin, Target } from "lucide-react";
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
        Accéder à la fiche détaillée
        <Download className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <EnhancedSEOHead
        title="Utiliser l'IA dans la conduite de projets | Mare Nostrum"
        description="Formation en situation de travail de 35 heures pour les chefs de projet. Intégrer l'IA dans vos projets réels : produire vos livrables, les vérifier et capitaliser vos usages, de façon fiable et responsable. Format AFEST sur 3 à 5 semaines."
        keywords="formation chef de projet IA, formation utilisié l IA dans les projets, formation AFEST, formation en situation de travail, IA pour chefs de projet, formation projets réels, utiliser l IA dans les projets, chef de projet IA, formation 35 heures AFEST"
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
                <InfoCard title="Publics">
                  <p>Chefs de projet, animateurs de projet, chefs de file, coordinatrices de projet, chefs de ressources. Public individuel, accessible à tous les niveaux d'expérience.</p>
                </InfoCard>
                <InfoCard title="Objectifs">
                  <p>À l'issue du parcours, le participant sera capable de :</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>identifier les opportunités d'IA pour la conduite de ses projets ;</li>
                    <li>générer et valider des livrables produits avec l'IA (notes de synthèse, plans, mises à jour, comptes-rendus, supports) ;</li>
                    <li>vérifier la fiabilité des productions générées (hallucinations, données, normes, RGPD) ;</li>
                    <li>capitaliser ses usages dans une démarche éthique et sécurisée ;</li>
                    <li>intégrer l'IA dans sa méthode de projet et ses outils professionnels.</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Prérequis">
                  <p>Aucun niveau technique requis. Possibilité de s'appuyer sur l'outil d'IA qui sera utilisé en formation.</p>
                </InfoCard>
                <InfoCard title="Formateur">
                  <p>Aymane ABDENNOUR, consultant-formateur spécialiste de la stratégie numérique et de l'IA en entreprise, accompagne des dirigeants et des équipes de direction dans l'intégration de l'IA à leur modèle d'affaires. Ingénieur en informatique, il met l'IA en regard des enjeux de création de valeur, d'organisation du travail, de gouvernance des données et de conformité réglementaire (AI Act, RGPD).</p>
                </InfoCard>
                <InfoCard title="Résultats">
                  <p>93 % de nos clients confirment qu'ils recommandent nos solutions. 95 % de réussite constatée trois ans après la formation et l'utilisation de nos méthodes.</p>
                </InfoCard>
              </div>
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Durée et format">
                  <p>35 heures, sur 3 à 5 semaines, en situation de travail (AFEST). Le participant travaille sur son propre projet réel, avec ses outils d'IA, et apporte les livrables produits en situation.</p>
                </InfoCard>
                <InfoCard title="Méthodes">
                  <p>Pédagogie en situation de travail : le consultant-formateur accompagne le participant dans la conduite de son projet réel, en utilisant des outils d'IA spécifiques à son activité. Chaque session est dédiée à la réalisation d'un livrable, à sa vérification et à sa validation.</p>
                  <p>Le participant conserve l'intégralité de ses productions et son protocole d'usage pour poursuivre l'utilisation de l'IA dans ses projets.</p>
                </InfoCard>
                <InfoCard title="Évaluation">
                  <p>Évaluation basée sur le projet réel : livrables produits, vérification de la fiabilité et de la conformité, rapport d'usages et recommandations, attestation de fin de formation.</p>
                </InfoCard>
                <InfoCard title="Accès et délai">
                  <p>Un délai minimum et incompressible de 30 jours est appliqué entre l'inscription et le lancement de la formation, permettant de s'assurer que le projet réel est stable et prêt pour l'intégration de l'IA.</p>
                </InfoCard>
                <InfoCard title="Tarif">
                  <p>2 800 € HT la formation par participant, prise en charge possible via la formation professionnelle ou un contrat de professionnalisation. Devis sur mesure selon le montant global et le nombre de participants.</p>
                </InfoCard>
                <InfoCard title="Handicap">
                  <p>La formation est accessible aux personnes en situation de handicap. Les aménagements sont étudiés avec le participant lors de l'inscription afin de favoriser son apprentissage.</p>
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
            <div>{brochureButton}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UtiliserIAAIProjects;
