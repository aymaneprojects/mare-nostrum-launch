import { Link } from "react-router-dom";
import { BrainCircuit, Users, Clock, Users2, Shield, Award, Mail, Download } from "lucide-react";
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

const EnjeuxIA = () => {
  const brochureButton = (
    <Button asChild size="lg" variant="secondary">
      <Link to="/contact">
        Demander de recevoir la fiche formation détaillée
        <Download className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <EnhancedSEOHead
        title="Les enjeux de l'intelligence artificielle pour les dirigeants | Mare Nostrum"
        description="Formation de 10 heures pour les dirigeants, COMEX et CODIR : comprendre ce que l'IA change pour votre organisation, peser les opportunités et les risques, et poser les bases d'une charte IA responsable."
        keywords="enjeux intelligence artificielle dirigeants, formation IA dirigeants, charte IA responsable, gouvernance IA, IA pour entreprise, formation dirigeants COMEX, CODIR IA, intelligence artificielle organisation"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "Les enjeux de l'intelligence artificielle pour les dirigeants",
          description: "Formation de 10 heures pour les dirigeants, COMEX et CODIR sur les enjeux de l'intelligence artificielle pour l'organisation.",
          provider: { "@type": "Organization", name: "Mare Nostrum", url: "https://www.marenostrum.tech" },
          educationalLevel: "Professional",
          timeRequired: "PT10H",
          courseMode: "blended",
          audience: { "@type": "EducationalAudience", educationalRole: "employee", audienceType: "Dirigeants, COMEX, CODIR" }
        }}
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Centre de formation", href: "/education" },
          { label: "Les enjeux de l'intelligence artificielle pour les dirigeants", href: "/enjeux-ia" },
        ]}
      />
      <main id="contenu" className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="mn-eyebrow-turquoise mb-3">NUMÉRIQUE / IA · Dirigeants</div>
              <h2 className="font-editorial italic text-foreground">Les enjeux de l'intelligence artificielle pour les dirigeants</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Pour qui">
                  <p>Dirigeants, conseils d'administration et comités d'entreprise : toute personne responsable de la stratégie ou de l'innovation de son organisation. Groupe limité à 12 participants maximum afin de garder un temps de débat collectif et des cas d'usage réels.</p>
                </InfoCard>
                <InfoCard title="Enjeux">
                  <p>L'intelligence artificielle modifie profondément la manière de concevoir, piloter et sécuriser une entreprise. Cette formation aide à identifier, avant de payer, les risques réels (données, gouvernance, responsabilité, vie privée) et les opportunités concrètes (productivité, nouvelle expérience client, modèles économiques).</p>
                </InfoCard>
                <InfoCard title="Objectifs">
                  <p>À l'issue du parcours, les participants seront capables de :</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>positionner l'IA par rapport aux enjeux stratégiques et réglementaires de leur secteur ;</li>
                    <li>identifier les risques (biais, confidentialité, cybersécurité, transparence) et les maîtriser ;</li>
                    <li>constuire les premiers éléments d'une charte IA responsable pour leur organisation ;</li>
                    <li>avoir un premier état des lieux et un plan d'action opérationnel.</li>
                  </ul>
                </InfoCard>
                <InfoCard title="Publics concernés">
                  <p>Dirigeants (président, directeur général, directeur), membres du CODIR, membres du comité d'entreprise, responsables de projets innovants, délégués à la conformité et à la protection des données.</p>
                </InfoCard>
                <InfoCard title="Formateur">
                  <p>Consultant-formateur spécialiste de la stratégie numérique et de l'IA en entreprise, il accompagne des dirigeants et des équipes de direction dans l'intégration de l'IA à leur modèle d'affaires. Ingénieur en informatique, il met l'IA en regard des enjeux de création de valeur, d'organisation du travail, de gouvernance des données et de conformité réglementaire (AI Act, RGPD).</p>
                </InfoCard>
              </div>
              <div className="bg-card border border-border rounded-sm p-7 md:p-9 space-y-7">
                <InfoCard title="Durée et format">
                  <p>10 heures réparties en 1 journée de 7 h et 1 demi-journée, avec une intersession de travail entre les deux sessions. En présentiel à Toulouse ou en classe virtuelle synchrone.</p>
                </InfoCard>
                <InfoCard title="Méthodes">
                  <p>Alternance de cas étudiés, de travaux pratiques guidés sur des cas métier réels et de cadrage réglementaire. Chaque participant construit, pendant le parcours, sa propre charte IA responsable, qui lui est remise à la fin. Un retour individuel est prévu à la demi-journée.</p>
                </InfoCard>
                <InfoCard title="Évaluation">
                  <p>Questionnaire de positionnement en début de formation, quiz à chaud et à froid, validation de la charte IA par l'équipe pédagogique et attestation de fin de formation.</p>
                </InfoCard>
                <InfoCard title="Accès et délai">
                  <p>Un délai minimum et incompressible de 14 jours est appliqué entre l'inscription et l'accès à la formation.</p>
                </InfoCard>
                <InfoCard title="Tarif">
                  <p>Tarif dégressif selon le chiffre d'affaires de l'entreprise. Devis à la demande pour toute prise en charge à titre professionnel (formation, FAF, R&D). Exonération de TVA en application de l'article 261-4-4° a du CGI.</p>
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

export default EnjeuxIA;
