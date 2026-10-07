import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, Trophy, Route, Handshake, SlidersHorizontal, ShieldCheck, Compass, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DarkSection from "@/components/DarkSection";
import PageHero from "@/components/PageHero";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import formationWorkshop from "@/assets/formation-workshop.jpg";
import schoolIpstCnam from "@/assets/schools/ipst-cnam.png";
import schoolIscom from "@/assets/schools/iscom.png";
import schoolIstef from "@/assets/schools/istef.png";
import schoolYnov from "@/assets/schools/ynov.png";
import schoolEcole3a from "@/assets/schools/ecole-3a.png";
import schoolAuf from "@/assets/schools/auf.png";
import schoolIct from "@/assets/schools/ict.png";
import schoolComue from "@/assets/schools/comue-toulouse.png";
import schoolIcam from "@/assets/schools/icam.png";
import schoolNeoma from "@/assets/schools/neoma.png";
import schoolIcd from "@/assets/schools/icd.png";
import schoolEsct from "@/assets/schools/esct.png";
import schoolEfap from "@/assets/schools/efap.png";
import schoolUsms from "@/assets/schools/logo_usms_v.fw__0.png";
import schoolFabLabMaroc from "@/assets/schools/FablabMaroc.png";
import schoolAccede from "@/assets/schools/accede-mePbbKl0kKFbr3K9.jpg";
import schoolIbnTofail from "@/assets/schools/universite-ibn-tofail-kenitra.png";
import schoolExpertiseFrance from "@/assets/schools/expertise-france-afd.png";
import schoolUtm from "@/assets/schools/universite-toulouse-mirail.png";
import schoolCadiAyyad from "@/assets/schools/universite-cadi-ayyad.png";
import schoolSenghor from "@/assets/schools/universite-senghor.png";
const Expertise = () => {
  const expertiseSchema = [{
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Programme Mare Nostrum Éducation",
    "description": "Formation entrepreneuriale complète pour écoles et universités : ateliers participatifs, fresques collaboratives, hackathons et accompagnement premium. Programme éprouvé avec 17+ projets étudiants accompagnés.",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum",
      "sameAs": "https://marenostrum.tech",
      "address": [{
        "@type": "PostalAddress",
        "addressLocality": "Toulouse",
        "addressCountry": "FR"
      }, {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      }, {
        "@type": "PostalAddress",
        "addressLocality": "Casablanca",
        "addressCountry": "MA"
      }]
    },
    "educationalLevel": "Higher Education",
    "teaches": ["Entrepreneuriat à impact", "Innovation sociale", "Business model canvas", "Pitch entrepreneurial", "Créativité et design thinking", "Gestion de projet entrepreneurial", "Intelligence collective"],
    "coursePrerequisites": "Aucun prérequis - tous niveaux",
    "numberOfCredits": "Variable selon programme",
    "hasCourseInstance": [{
      "@type": "CourseInstance",
      "name": "La Fresque de l'esprit d'entreprendre",
      "description": "Atelier collaboratif de 3h pour découvrir l'entrepreneuriat de manière ludique",
      "courseMode": "Blended",
      "duration": "PT3H"
    }, {
      "@type": "CourseInstance",
      "name": "L'Atelier des Alliés",
      "description": "Session d'intelligence collective pour développer la créativité entrepreneuriale",
      "courseMode": "Blended",
      "duration": "P1D"
    }, {
      "@type": "CourseInstance",
      "name": "Hackathons & Challenges",
      "description": "Événements intensifs sur 1 à 3 jours pour stimuler l'innovation",
      "courseMode": "On-site",
      "duration": "P3D"
    }, {
      "@type": "CourseInstance",
      "name": "Programme Premium Néo-Entrepreneurs",
      "description": "Accompagnement complet sur plusieurs mois",
      "courseMode": "Blended",
      "duration": "P6M"
    }],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Étudiants écoles de commerce, universités, écoles d'ingénieurs, entrepreneuriat étudiant"
    },
    "keywords": "entrepreneuriat etudiant, education entrepreneuriale, formation entrepreneur etudiant, programme entrepreneuriat ecole, entrepreneuriat universite toulouse"
  }, {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mare Nostrum Éducation",
    "description": "Programmes d'éducation entrepreneuriale pour établissements : ateliers, fresques, cours, hackathons et programmes premium",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum"
    },
    "serviceType": "Éducation Entrepreneuriale",
    "areaServed": [{
      "@type": "Country",
      "name": "France"
    }, {
      "@type": "Country",
      "name": "Maroc"
    }, {
      "@type": "City",
      "name": "Toulouse"
    }, {
      "@type": "City",
      "name": "Paris"
    }, {
      "@type": "City",
      "name": "Casablanca"
    }],
    "offers": [{
      "@type": "Offer",
      "name": "La Fresque de l'esprit d'entreprendre",
      "description": "Atelier collaboratif de 3h pour découvrir l'entrepreneuriat",
      "availability": "https://schema.org/InStock"
    }, {
      "@type": "Offer",
      "name": "L'Atelier des Alliés",
      "description": "Session d'intelligence collective pour développer la créativité entrepreneuriale",
      "availability": "https://schema.org/InStock"
    }, {
      "@type": "Offer",
      "name": "Programme Premium Néo-Entrepreneurs",
      "description": "Accompagnement complet sur plusieurs mois",
      "availability": "https://schema.org/InStock"
    }]
  }];
  const expertiseFaqs = [
    {
      question: "Qui intervient sur notre mission, et qu'ont-ils déjà fait ?",
      answer: "Des experts indépendants, sous convention avec Mare Nostrum, choisis parce qu'ils ont exercé le métier sur lequel porte votre besoin. Vous connaissez leur nom et leur parcours avant de signer. La directrice du Pôle d'expertise reste votre interlocutrice unique, du premier échange à la restitution."
    },
    {
      question: "Connaissez-vous notre contexte ?",
      answer: "C'est notre premier principe. Sur chaque mission internationale, un expert travaille en binôme avec un consultant qui connaît votre pays de l'intérieur : sa réglementation, ses institutions, ses usages. Nous partons de méthodes qui ont fait leurs preuves, puis nous les adaptons à vos ressources et à votre culture d'établissement."
    },
    {
      question: "Combien coûte une mission, et comment la financer ?",
      answer: "Chaque mission fait l'objet d'un devis établi après un premier échange gratuit. Elle peut être financée sur votre budget propre, comme ligne d'un projet soutenu par un bailleur ou dans le cadre d'un programme de coopération ; nous pouvons vous aider à identifier le bon guichet. Nos missions de conseil ne relèvent pas des financements de la formation professionnelle : seules les actions de notre centre de formation certifié Qualiopi y sont éligibles. Deux leviers permettent d'en réduire le coût : la mutualisation entre plusieurs établissements et la science ouverte (diffusion des livrable sous licence ouverte)."
    },
    {
      question: "Pouvez-vous garantir l'obtention d'une accréditation ?",
      answer: "Non, et personne ne peut honnêtement le faire : la décision appartient à l'agence ou à l'organisme compétent. Nous garantissons une préparation rigoureuse : un diagnostic d'écart sans complaisance, des preuves solides, des équipes prêtes."
    },
    {
      question: "Vous proposez aussi des formations, des programmes et des outils numériques : comment garantissez-vous votre indépendance ?",
      answer: "La question est légitime, et nous préférons y répondre franchement. Mare Nostrum est aussi organisme de formation et opérateur de programmes. Le diagnostic est livré et facturé pour lui-même : vous n'êtes jamais tenu de nous confier la suite. Lorsque l'une de nos offres figure parmi les options recommandées, nous le signalons et présentons des alternatives."
    }
  ];
  return <div className="min-h-dvh flex flex-col">
      <EnhancedSEOHead title="Conseil auprès des établissements d'enseignement supérieur francophone | Au service de la coopération internationale" description="Concevoir, auditer et déployer vos projets de transformation avec des experts francophones qui ont exercé ces métiers, en Europe et en Afrique. Echange découverte gratuit." keywords="conseil université, ingénierie de financement, accompagnement d'établissement d'enseignement supérieur, innovation pédagogique université, stratégie d'établissement, appel à projets enseignement supérieur francophone, entrepreneuriat étudiant, conseil universités, campus entrepreneurial, renforcement des capacités des universités, agence universitaire de la francophonie" structuredData={expertiseSchema} faqSchema={expertiseFaqs} disableAutoEnhancement />
      <Header />


      <PageHero
        eyebrow="Pôle d'expertise de Mare Nostrum"
        title="Concevoir, auditer et déployer les transformations de l'enseignement supérieur."
        subtitle={
          <>
            <span className="block">Nous accompagnons les universités et les écoles à chaque étape, du diagnostic à l'évaluation.</span>
            <span className="block mt-4">Monter un programme, le faire financer, structurer l'entrepreneuriat sur votre campus, préparer une accréditation.</span>
          </>
        }
        ctas={
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
            <Link to="/contact">
              Présenter mon projet à la directrice de Mare Nostrum
              <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
            </Link>
          </Button>
        }
      />

      {/* Trust Strip */}
      <section className="py-5 md:py-6 bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="font-editorial font-semibold text-sm md:text-base text-primary">
              Nous travaillons aussi avec les bailleurs internationaux, les agences de coopération et les collectivités territoriales qui financent ou portent des projets de transformation. Nos méthodes s’appliquent aussi à vos projets. Parlons-en.
            </span>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="pt-16 md:pt-24 pb-8 md:pb-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Trois expertises, un même collectif.</div>
          <h2 className="font-editorial italic text-center mb-4 text-foreground">
            Nos domaines d’intervention dans l’enseignement supérieur
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Nous n'intervenons que là où nos experts ont exercé.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Ingénierie de projets et de financement */}
            <div className="mn-card hover-lift p-8 mn-card-top">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Du projet au programme : ingénierie de projets et de financement</h3>
              <p className="text-muted-foreground mb-5">
                Comment structurer nos projets, fédérer nos partenaires et démontrer notre impact ?
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Vous avez</p>
                  <p className="text-sm text-muted-foreground">Une idée, une priorité ou un guichet de financement, mais pas encore le programme complet.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Ce que nous faisons</p>
                  <ul className="space-y-2">
                    {["Note d'opportunité", "Architecture du programme", "Consortium et parties prenantes", "Plan de financement et rédaction du dossier", "Feuille de route et suivi-évaluation"].map((item) => (
                      <li key={item} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Ce que vous obtenez :</span> un dossier solide, un consortium qui tient et un modèle économique pensé pour durer au-delà du premier financement.</p>
              </div>
            </div>

            {/* Campus entrepreneurial */}
            <div className="mn-card hover-lift p-8 mn-card-top">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Campus entrepreneurial : entrepreneuriat étudiant et écosystème d'innovation</h3>
              <p className="text-muted-foreground mb-5">
                Comment passer d'initiatives dispersées à une politique d'établissement cohérente ?
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Vous avez</p>
                  <p className="text-sm text-muted-foreground">Des initiatives, un FabLab ou un incubateur, mais pas encore de politique d'établissement.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Ce que nous faisons</p>
                  <ul className="space-y-2">
                    {["Diagnostic de maturité", "Parcours et dispositifs", "Formation des équipes", "Mesure d'impact", "Partenariats privés et écosystème"].map((item) => (
                      <li key={item} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Ce que vous obtenez :</span> un écosystème entrepreneurial durable, porté par vos équipes.</p>
              </div>
            </div>

            {/* Démarche qualité */}
            <div className="mn-card hover-lift p-8 mn-card-top">
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Démarche qualité : accréditation et reconnaissance des formations</h3>
              <p className="text-muted-foreground mb-5">
                Comment prouver la qualité de nos formations, et la maintenir dans la durée ?
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Vous avez</p>
                  <p className="text-sm text-muted-foreground">Des formations et des résultats, mais pas encore la reconnaissance officielle qui les rend visibles, comparables et finançables.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Ce que nous faisons</p>
                  <ul className="space-y-2">
                    {["Diagnostic d'écart au référentiel", "Plan d'action qualité", "Ingénierie des formations", "Audit blanc", "Préparation à l'évaluation"].map((item) => (
                      <li key={item} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Ce que vous obtenez :</span> une documentation qualité à jour, des preuves prêtes et des équipes qui abordent l'évaluation sereinement.</p>
              </div>
            </div>

          </div>

          <div className="max-w-3xl mx-auto mt-10 md:mt-12 p-6 md:p-8 mn-card mn-card-left shadow-soft text-center">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Votre besoin ne correspond à aucune de ces situations ? Nous construisons nos interventions sur mesure : écrivez-nous à <a href="mailto:expertise@marenostrum.tech" className="font-semibold underline underline-offset-4 text-foreground">expertise@marenostrum.tech</a>.
            </p>
          </div>

          {/* Encart contact */}
        </div>
      </section>

      {/* Image Formation */}
      <section className="pt-8 md:pt-10 pb-8 md:pb-10 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <img 
                src={formationWorkshop} 
                alt="Formation en salle avec formateur et participants" 
                className="w-full h-full object-cover rounded-sm shadow-lg"
              />
              <div className="bg-card border border-border rounded-sm p-8 shadow-lg">
                <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">Le pôle d'expertise</h3>
                <p className="text-muted-foreground mb-4">
                  Mon rôle est simple : faire en sorte que votre besoin rencontre la bonne personne. Je qualifie votre demande avec vous, je choisis l'expert adéquat, et je veille à la qualité de la mission jusqu'à son terme. Vous avez une seule interlocutrice, du premier échange à la restitution.
                </p>
                <p className="text-sm font-semibold text-primary">Yasmine AREZKI</p>
                <p className="text-sm text-muted-foreground">Directrice du Pôle d'expertise de Mare Nostrum</p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-8 p-6 md:p-8 mn-card mn-card-left shadow-soft">
            <p className="text-base text-foreground leading-relaxed">
              <span className="font-semibold">Qui intervient réellement ?</span> Chaque mission associe un expert international, un enseignant-chercheur et un consultant qui connaît votre contexte local. Selon la mission, nous mobilisons notre réseau d'intervenants, sélectionnés et coordonnés par Mare Nostrum. À titre d'exemple : un ancien président d'université, une ancienne dirigeante d'école numérique, un enseignant-chercheur en sciences ou un ancien dirigeant d'incubateur au sein d'une business school.
            </p>
          </div>

          {/* CTA Pré-inscription */}
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="h-auto max-w-full whitespace-normal text-center leading-snug bg-[hsl(var(--mn-turquoise))] hover:bg-[hsl(var(--mn-turquoise))]/90 text-white py-3">
              <Link to="/contact">
                Réserver mon échange : 30 minutes pour faire le point sur mon projet et repartir avec une première orientation.
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir Mare Nostrum */}
      <DarkSection halo="right">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-light text-center mb-3">Pourquoi choisir Mare Nostrum ?</div>
          <h2 className="font-editorial italic text-center mb-8 md:mb-12 text-primary-foreground">
            Une capacité d'intervention qui relie stratégie, ingénierie de projet et terrain.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass">
              <div className="bg-primary-foreground/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Route className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-foreground">Un interlocuteur unique, de l'idée à l'impact</h3>
              <p className="text-primary-foreground/75">
                Diagnostic, conception, financement, consortium, déploiement et suivi-évaluation : nous couvrons toute la chaîne. La stratégie validée au départ est celle qui est mise en œuvre.
              </p>
            </div>
            <div className="text-center p-6 rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass">
              <div className="bg-primary-foreground/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-foreground">Un binôme expert international / expert local</h3>
              <p className="text-primary-foreground/75">
                Chaque mission combine une expertise métier et une connaissance fine du contexte. Les coopérations Sud-Sud comptent autant que Nord-Sud.
              </p>
            </div>
            <div className="text-center p-6 rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass">
              <div className="bg-primary-foreground/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <SlidersHorizontal className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-foreground">Des méthodes éprouvées, adaptées</h3>
              <p className="text-primary-foreground/75">
                Nous ne plaquons pas de modèle : nos dispositifs sont ajustés à vos réglementations, vos ressources et vos priorités, et co-construits avec vos équipes.
              </p>
            </div>
            <div className="text-center p-6 rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass">
              <div className="bg-primary-foreground/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-foreground">Un résultat qui vous appartient</h3>
              <p className="text-primary-foreground/75">
                Outils documentés, équipes formées, appropriation vérifiée : l'objectif est votre autonomie, sans dépendance aux experts externes.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-10 md:mt-12 p-6 md:p-8 rounded-[var(--radius)] border border-primary-foreground/20 bg-primary-foreground/10 text-center">
            <p className="text-base md:text-lg text-primary-foreground leading-relaxed">
              Nous intervenons en France, en Belgique, en Andorre, en Égypte, en Tunisie, au Maroc, au Sénégal, au Congo-Brazzaville et au Burkina Faso, et ailleurs dans l'espace francophone selon les besoins.
            </p>
          </div>
        </div>
      </DarkSection>

      {/* Écoles Partenaires Section */}
      <section className="pt-8 md:pt-10 pb-8 md:pb-10 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Ecoles et établissements partenaires</div>
          <h2 className="font-editorial italic text-center mb-4 text-foreground">
            Ils nous font confiance
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Comme ces établissements, faites appel à Mare Nostrum
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { src: schoolIpstCnam, alt: "IPST CNAM" },
              { src: schoolIscom, alt: "ISCOM" },
              { src: schoolIstef, alt: "ISTEF" },
              { src: schoolYnov, alt: "Toulouse Ynov Campus" },
              { src: schoolEcole3a, alt: "Ecole 3A" },
              { src: schoolAuf, alt: "AUF" },
              { src: schoolIct, alt: "ICT - Institut Catholique de Toulouse" },
              { src: schoolComue, alt: "Communauté d'universités de Toulouse" },
              { src: schoolIcam, alt: "ICAM" },
              { src: schoolNeoma, alt: "NEOMA Business School" },
              { src: schoolIcd, alt: "ICD Business School" },
              { src: schoolEsct, alt: "ESCT" },
              { src: schoolEfap, alt: "EFAP" },
              { src: schoolUsms, alt: "USMS" },
              { src: schoolFabLabMaroc, alt: "FabLab Maroc" },
              { src: schoolAccede, alt: "Accede" },
              { src: schoolIbnTofail, alt: "Université Ibn Tofaïl de Kénitra" },
              { src: schoolExpertiseFrance, alt: "Expertise France – Groupe AFD" },
              { src: schoolUtm, alt: "Université Toulouse – Jean Jaurès" },
              { src: schoolCadiAyyad, alt: "Université Cadi Ayyad" },
              { src: schoolSenghor, alt: "Université Senghor" },
            ].map((school) => (
              <div key={school.alt} className="flex items-center justify-center h-16 md:h-20 grayscale hover:grayscale-0 transition-all duration-300">
                <img src={school.src} alt={school.alt} className="max-h-full max-w-[140px] md:max-w-[160px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="Questions fréquentes" faqs={expertiseFaqs} className="!py-8 md:!py-10 border-t border-border" />

      <Footer />
    </div>;
};
export default Expertise;