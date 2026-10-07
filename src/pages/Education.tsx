import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Lightbulb, Trophy, BookOpen, Network, Monitor, BrainCircuit, Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import TestimonialCard from "@/components/TestimonialCard";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import ylookProgramme from "@/assets/ylook-programme.jpg";
import formationWorkshop from "@/assets/formation-workshop.jpg";
import qualiopiLogo from "@/assets/qualiopi-logo.png";
import qualiopiOfficialLogo from "@/assets/qualiopi-logo-officiel.jpg";
import fresque1Img from "@/assets/fresque-1.png";
import iscomChallenge from "@/assets/iscom-startup-challenge.jpeg";
import fresqueDoctorant from "@/assets/fresque-doctorant.png";
import schoolIpstCnam from "@/assets/schools/ipst-cnam.png";
import schoolIscom from "@/assets/schools/iscom.png";
import schoolIstef from "@/assets/schools/istef.png";
import schoolYnov from "@/assets/schools/ynov.png";
import schoolEcole3a from "@/assets/schools/ecole-3a.png";
import schoolAuf from "@/assets/schools/auf.png";
import schoolIct from "@/assets/schools/ict.png";
import schoolComue from "@/assets/schools/comue-toulouse.png";
import schoolInpN7 from "@/assets/schools/inp-n7.png";
import schoolIcam from "@/assets/schools/icam.png";
import schoolNeoma from "@/assets/schools/neoma.png";
import schoolIcd from "@/assets/schools/icd.png";
import schoolEsct from "@/assets/schools/esct.png";
import schoolEfap from "@/assets/schools/efap.png";
import DarkSection from "@/components/DarkSection";
const Education = () => {
  const educationSchema = [{
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
  const educationFaqs = [{
    question: "Faut-il un diplôme ou une expérience préalable ?",
    answer: "Aucun diplôme n'est exigé pour l'ensemble de nos formations. Les prérequis sont propres à chaque formation et figurent dans le programme détaillé : certaines s'adressent à des porteurs de projet ayant une idée à valider, d'autres à des dirigeants déjà en activité. En cas de doute, un entretien préalable permet de vérifier avec vous que la formation correspond à votre situation."
  }, {
    question: "Combien de temps dure une formation ?",
    answer: "Les formations de notre catalogue durent de 20 à 55 heures selon le programme, réparties sur plusieurs semaines pour rester compatibles avec une activité professionnelle. Nos interventions auprès des établissements et des entreprises vont, elles, de l'atelier de 3 heures au dispositif de plusieurs mois. La durée exacte est indiquée dans chaque programme détaillé."
  }, {
    question: "Où se déroulent les formations, et existe-t-il des formats à distance ?",
    answer: "Nos formations se déroulent principalement en présentiel à Toulouse, et nous intervenons également à Paris, à Casablanca et dans l'espace francophone. Certains programmes sont proposés en format hybride, associant séances en présentiel et modules à distance. La modalité de chaque formation (présentiel, distanciel ou hybride) est précisée dans son programme détaillé."
  }, {
    question: "Quels sont les délais pour s'inscrire ?",
    answer: "Le délai d'accès est de 15 jours ouvrés entre la validation de votre inscription et l'entrée en formation. Ce délai peut être allongé lorsqu'un financement externe doit être instruit, notamment auprès d'un OPCO. Nous vous indiquons le calendrier applicable dès le premier échange."
  }, {
    question: "Combien coûte une formation et comment la financer ?",
    answer: "Le tarif est indiqué dans le programme détaillé de chaque formation et repris dans la proposition qui vous est adressée. Nos formations sont exonérées de TVA en application de l'article 261-4-4° a du Code général des impôts. Mare Nostrum étant un organisme de formation certifié Qualiopi, des financements de la formation professionnelle sont mobilisables selon votre statut : nous consulter pour identifier le circuit adapté et monter le dossier."
  }, {
    question: "Je suis en situation de handicap : comment se passe l'adaptation ?",
    answer: "Toutes les formations dispensées par Mare Nostrum sont accessibles aux personnes en situation de handicap. Un référent handicap est à votre disposition pour étudier avec vous les aménagements nécessaires, en amont de votre inscription, et vous orienter le cas échéant vers les acteurs spécialisés. Vous pouvez le contacter à handicap@marenostrum.tech."
  }, {
    question: "Comment se déroule une formation, et que reçoit-on à la fin ?",
    answer: "Nos formations reposent sur des méthodes actives : apports structurés, travail sur votre propre projet, mises en situation et échanges entre pairs, animés par des praticiens. Vos acquis sont évalués tout au long du parcours et en fin de formation, au regard des objectifs annoncés dans le programme. À l'issue, vous recevez une attestation de fin de formation mentionnant les objectifs visés et les résultats de l'évaluation."
  }, {
    question: "Quels résultats obtenez-vous auprès de vos participants ?",
    answer: "Nous avons accompagné plus de 95 projets entrepreneuriaux et dispensé 544 heures de formation ; 55 % des néo-entrepreneurs accompagnés se rémunèrent dans les deux ans. Notre centre de formation ayant été certifié Qualiopi le 1er septembre 2026, les indicateurs de résultats propres aux formations de notre catalogue (taux de satisfaction, d'assiduité et d'atteinte des objectifs) seront publiés sur cette page au plus tard le 30 juin 2027."
  }, {
    question: "Que signifie la certification Qualiopi ?",
    answer: "Qualiopi est la marque de certification nationale attestant de la qualité du processus mis en œuvre par les organismes de formation. Elle est délivrée après audit par un organisme accrédité et conditionne l'accès aux financements publics et mutualisés de la formation professionnelle. La mention réglementaire est la suivante : « La certification qualité a été délivrée au titre de la catégorie d'action suivante : ACTIONS DE FORMATION. »"
  }, {
    question: "Vous accompagnez aussi les établissements et les entreprises : comment fonctionnez-vous ?",
    answer: "Tout commence par un échange de cadrage : vos objectifs, vos publics, votre calendrier et votre budget. Nous vous adressons ensuite une proposition sur mesure, de l'atelier de 3 heures au dispositif de plusieurs mois, en présentiel ou à distance, en France comme dans l'espace francophone. La mise en œuvre est formalisée par une convention de formation et pilotée par un interlocuteur unique."
  }, {
    question: "Le centre de formation Mare Nostrum est-il déclaré en France ?",
    answer: "Oui, Mare Nostrum est un organisme de formation déclaré en France et enregistré sous le numéro 76311216831 : cet enregistrement ne vaut pas agrément de l'Etat."
  }];
  return <div className="min-h-dvh flex flex-col">
      <EnhancedSEOHead title="Du projet à l'entreprise : le groupe de services pour les parcours entrepreneuriaux" description="Organisme de formation certifié Qualiopi à Toulouse. Formations à l'entrepreneuriat, au pilotage d'entreprise et à l'IA. Financements formation mobilisables." keywords="education entrepreneuriale toulouse, entrepreneuriat etudiant, entrepreneuriat etudiant toulouse, formation entrepreneuriat etudiant, programmes ecoles entrepreneuriat, ateliers entrepreneuriat toulouse, hackathon entrepreneuriat etudiant, enseignement superieur toulouse, Niteo, programme Niteo, fresque entrepreneuriat, entrepreneuriat afrique, formation entrepreneur etudiant, entrepreneuriat universite, entrepreneuriat ecole de commerce" structuredData={educationSchema} faqSchema={educationFaqs}  />
      <Header />


      <PageHero
        eyebrow="Centre de formation de Mare Nostrum"
        title="Se former pour créer, diriger et faire grandir son entreprise."
        subtitle="Organisme de formation certifié Qualiopi, basé à Toulouse et actif dans l'espace francophone. Nous formons celles et ceux qui entreprennent, et les organisations qui les accompagnent."
        ctas={
          <div className="flex flex-col items-center gap-4">
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link to="/contact">
                Exprimer mon besoin de formation
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Link>
            </Button>
            <img
              src={qualiopiOfficialLogo}
              alt="Qualiopi – processus certifié"
              width={634}
              height={339}
              className="h-20 md:h-24 w-auto"
            />
          </div>
        }
      />

      {/* Trust Strip */}
      <section className="py-5 md:py-6 bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-full mx-auto text-center">
            <div className="font-editorial font-semibold text-base md:text-lg text-primary">
              <span className="block">Organisme de formation enregistré sous le numéro 76311216831 : cet enregistrement ne vaut pas agrément de l'État.</span>
              <span className="block mt-1">La certification qualité Qualiopi a été délivrée au titre de la catégorie d'action suivante : actions de formation.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">À qui s'adressent nos formations ?</div>
          <h2 className="font-editorial italic text-center mb-8 md:mb-12 text-foreground">
            Trois portes d'entrée, une même exigence : des formateurs praticiens et un accompagnement individualisé.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="mn-card mn-card-top hover-lift text-center p-8">
              <div className="bg-primary/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Je veux me former</h3>
              <p className="text-muted-foreground">
                Demandeurs d'emploi, salariés, personnes en reconversion : Vous voulez acquérir une compétence qui compte sur le marché du travail, ou préparer un changement de trajectoire. Nos formations courtes vous donnent des acquis immédiatement mobilisables.
              </p>
            </div>
            <div className="mn-card mn-card-top hover-lift text-center p-8">
              <div className="bg-accent/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Je crée ou je dirige mon entreprise</h3>
              <p className="text-muted-foreground">
                Porteurs de projet, créateurs, dirigeants de TPE : Vous portez un projet ou vous dirigez une entreprise, souvent seul·e face aux décisions. Nos formats vous apportent une méthode, un cadre et un collectif de pairs.
              </p>
            </div>
            <div className="mn-card mn-card-top hover-lift text-center p-8">
              <div className="bg-primary/10 w-16 h-16 shape-hex flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Je forme mes équipes ou des publics divers</h3>
              <p className="text-muted-foreground">
                Entreprises, collectivités, universités, écoles, associations : Vous voulez développer les compétences entrepreneuriales ou managériales de vos collaborateurs, vos publics ou vos adhérents. Nous concevons et animons des dispositifs sur mesure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Formation */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              <img 
                src={formationWorkshop} 
                width={628} height={363} loading="lazy"
                alt="Formation en salle avec formateur et participants" 
                className="w-full h-full object-cover rounded-sm shadow-[var(--shadow-medium)]"
              />
              <div className="bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)]">
                <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl mb-4 text-foreground">L'équipe pédagogique</h3>
                <p className="text-muted-foreground mb-4">
                  Derrière chaque formation, des praticiens. Nos formateurs dirigent, accompagnent et enseignent : ils transmettent ce qu'ils font. Ils ont été soigneusement sélectionnés par notre entreprise-école.
                </p>
                <p className="text-sm font-semibold text-primary">Julienne MUKABUCYANA</p>
                <p className="text-sm text-muted-foreground">Directrice du Centre de formation de Mare Nostrum</p>
              </div>
            </div>
          </div>

          {/* CTA Pré-inscription */}
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-[hsl(var(--mn-turquoise))] hover:bg-[hsl(var(--mn-turquoise))]/90 text-accent-foreground">
              <Link to="/contact">
                Se pré-inscrire à une formation
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Les formations certifiées en conformité avec Qualiopi</div>
          <h2 className="font-editorial italic text-center mb-4 text-foreground">
            Ce que propose le centre de formation de Mare Nostrum
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Mare Nostrum forme celles et ceux qui entreprennent, que ce soit pour créer leur entreprise ou pour innover au sein de leur organisation. Nos formations couvrent l'entrepreneuriat, l'intrapreneuriat, le numérique et l'intelligence artificielle, toujours avec un même cap : transformer les idées en projets concrets.
          </p>

          <div className="bg-accent/10 border border-accent/30 rounded-sm p-6 max-w-3xl mx-auto mb-12">
            <p className="text-center text-foreground font-medium">
              D'autres formations seront annoncées sur cette page. Pour être informé·e de l'ouverture des sessions, <Link to="/contact" className="text-[hsl(var(--mn-turquoise))] underline font-semibold">cliquez ici</Link>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Initiation à l'intelligence artificielle */}
            <div className="relative order-[1] bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold tracking-wide text-primary">
                NUMÉRIQUE / IA
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <BrainCircuit className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Initiation à l'intelligence artificielle</h3>
              <p className="text-muted-foreground mb-6">Une journée d'initiation pour comprendre l'IA, démêler le vrai du faux et apprendre à l'utiliser utilement, prudemment et sans jargon technique.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">Tout public · 12 participants maximum</span></li>
                <li className="flex items-start space-x-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">7 h · classe virtuelle synchrone</span></li>
                <li className="flex items-start space-x-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">Pratique, usage responsable et premiers cas d'usage</span></li>
              </ul>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/initiation-ia">
                  Accéder à la fiche détaillée
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Agent IA pour le marketing */}
            <div className="relative order-[2] bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold tracking-wide text-primary">
                NUMÉRIQUE / IA
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Concevoir son agent IA marketing</h3>
              <p className="text-muted-foreground mb-6">En deux modules, concevez, construisez et mettez en service un agent IA pour votre marketing, appliqué à votre propre cas.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">Marketing, communication et dirigeants de TPE-PME</span></li>
                <li className="flex items-start space-x-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">44 h · 100 % à distance</span></li>
                <li className="flex items-start space-x-2"><CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm text-muted-foreground">Un agent fonctionnel, avec validation humaine</span></li>
              </ul>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/agent-ia-marketing">
                  Accéder à la fiche détaillée
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative order-4 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-[hsl(var(--mn-turquoise))]/20 px-3 py-1 text-xs font-bold tracking-wide text-primary">
                ENTREPRENEURIAT
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Mastermind néo-entrepreneurs</h3>
              <p className="text-muted-foreground mb-6">
                Parcours de 12 mois en petit groupe pour résoudre ses problématiques de jeune dirigeant par le codéveloppement, avec un entrepreneur invité à chaque session.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Créateurs et repreneurs d'entreprise</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">56 h · 10 participants max · Toulouse</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Codéveloppement et mentorat individuel</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/mastermind">
                  Accéder à la fiche détaillée
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Mastermind digital néo-entrepreneurs */}
            <div className="relative order-5 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-[hsl(var(--mn-turquoise))]/20 px-3 py-1 text-xs font-bold tracking-wide text-primary">
                ENTREPRENEURIAT
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Monitor className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Mastermind digital</h3>
              <p className="text-muted-foreground mb-6">
                La version 100 % en ligne du Mastermind pour les jeunes créateurs de l'espace francophone, avec des groupes constitués par fuseau horaire.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Étudiants et jeunes diplômés ayant créé leur entreprise</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">39 h · 100 % à distance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Tarif adapté au pays de résidence</span>
                </li>
              </ul>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/mastermind-digital">
                  Accéder à la fiche détaillée
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>


            {/* Fresque */}
            <div className="relative order-7 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-[hsl(var(--mn-ivory))] px-3 py-1 text-xs font-bold tracking-wide text-primary ring-1 ring-primary/15">
                PÉDAGOGIE
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Lightbulb className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">La Fresque de l'esprit d'entreprendre</h3>
              <p className="text-muted-foreground mb-6">
                Atelier collaboratif de 3h pour découvrir l'entrepreneuriat de manière ludique et engageante. Idéal pour sensibiliser un grand nombre d'étudiants.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Tous niveaux (licence, master, doctorat)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">10 à 80 participants</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Réseaux de formateurs agrées</span>
                </li>
              </ul>
            </div>

            {/* Atelier des Alliés */}
            <div className="relative order-6 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-[hsl(var(--mn-ocre))]/20 px-3 py-1 text-xs font-bold tracking-wide text-[hsl(var(--mn-ocre))]">
                GESTION DE PROJET
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">L'Atelier des Alliés</h3>
              <p className="text-muted-foreground mb-6">
                Session d'intelligence collective pour développer la créativité et l'esprit d'équipe autour de projets entrepreneuriaux concrets.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Co-création et collaboration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Méthodes d'innovation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">15-25 participants</span>
                </li>
              </ul>
            </div>

            {/* Hackathons */}
            <div className="relative order-9 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold tracking-wide text-primary">
                INNOVATION
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Trophy className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Hackathons & Challenges</h3>
              <p className="text-muted-foreground mb-6">Événements sur-mesure pour stimuler l'innovation et développer des projets entrepreneuriaux en équipe sur 1 à 5 jours.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Format intensif et structuré</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Mobilisation d'intervenants et de jury</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Projets concrets (fictifs ou réels)</span>
                </li>
              </ul>
            </div>

            {/* Programme Premium */}
            <div className="relative order-6 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-[hsl(var(--mn-turquoise))]/20 px-3 py-1 text-xs font-bold tracking-wide text-primary">
                ENTREPRENEURIAT
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Programme Niteo</h3>
              <p className="text-muted-foreground mb-6">Accompagnement complet sur 2 mois pour faciliter l'insertion de vos étudiants dans l'écosystème entrepreneuriat.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Programme clé en main</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Pédagogie éprouvée</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Écosystème de partenaires mobilisées</span>
                </li>
              </ul>
            </div>

            {/* Cours */}
            <div className="relative order-10 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-[hsl(var(--mn-muted))]/15 px-3 py-1 text-xs font-bold tracking-wide text-[hsl(var(--mn-muted))]">
                TOUTES DISCIPLINES
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Cours professionnalisants</h3>
              <p className="text-muted-foreground mb-6">Interventions pédagogiques personnalisées sur des thématiques entrepreneuriales spécifiques (stratégie d'entreprise, business plan...).</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Contenu adapté à votre syllabus</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Portage d'intervenants professionnels</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Organisme de formation déclaré</span>
                </li>
              </ul>
            </div>

            {/* Réseau */}
            <div className="relative order-8 bg-card border border-border rounded-sm p-8 shadow-[var(--shadow-medium)] hover-lift hover:border-accent/40 transition-all duration-200 cursor-pointer">
              <span className="absolute top-6 right-6 rounded-full bg-[hsl(var(--mn-ivory))] px-3 py-1 text-xs font-bold tracking-wide text-primary ring-1 ring-primary/15">
                PEDAGOGIE
              </span>
              <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-sm flex items-center justify-center mb-6">
                <Network className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl mb-4 text-foreground">Matinale de la pédagogie entrepreneuriale</h3>
              <p className="text-muted-foreground mb-6">
                Intégrez un réseau d'établissements et partagez les meilleures pratiques en pédagogie entrepreneuriale avec vos pairs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Veille nationale et francophone</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Partage d'expériences entre pairs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Sur invitation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bouton Niteo */}
        </div>
      </section>

      {/* Financement Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Financement</div>
          <h2 className="font-editorial italic text-center mb-12 text-foreground">
            Financer votre formation
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <img src={qualiopiLogo} alt="Logo Qualiopi" width={317} height={170} loading="lazy" className="h-20 md:h-32 w-auto flex-shrink-0" />
              <p className="text-center text-muted-foreground leading-relaxed">
                Mare Nostrum est un organisme de formation déclaré auprès de la DREETS Occitanie. La certification qualité Qualiopi a été délivrée au titre de la catégorie d'action suivante : actions de formation. À ce titre, des financements de la formation professionnelle sont mobilisables : prise en charge par votre OPCO, financement par votre employeur, dispositifs publics et cofinancements. Chaque situation est différente. Nous vous aidons à identifier le circuit adapté à votre statut et à monter le dossier. Contacter la directrice du centre de formation.
              </p>
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="bg-[hsl(var(--mn-turquoise))] hover:bg-[hsl(var(--mn-turquoise))]/90 text-accent-foreground">
                <Link to="/contact">
                  Nous consulter sur le financement
                  <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Les dispositifs pour les établissements</div>
          <h2 className="font-editorial italic text-center mb-4 text-foreground">
            Les interventions dans l'enseignement supérieur
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Un réseau d'intervenants mobilisables pour vos modules, de 3 heures à 100 heures, en France et dans l'espace francophone, en présentiel et en distanciel
          </p>

          <div className="mb-12">
            <h3 className="font-editorial italic text-2xl md:text-3xl font-semibold text-center mb-8 text-foreground">
              Vos enjeux
            </h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground"><strong className="text-foreground">Transformation pédagogique :</strong> innover dans vos méthodes et intégrer le numérique pour former celles et ceux qui entreprendront demain.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground"><strong className="text-foreground">Attractivité et engagement :</strong> différencier votre offre et engager vos publics dans des projets concrets.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground"><strong className="text-foreground">Soutenabilité budgétaire :</strong> optimiser vos ressources dans le respect de vos contraintes réglementaires.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <DarkSection halo="right">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-light text-center mb-3">Ils nous font confiance</div>
          <h2 className="font-editorial italic text-center mb-12 text-primary-foreground">
            Résultats & preuve sociale
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6 md:p-8">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">95+</div>
                <div className="text-primary-foreground/85">projets étudiants</div>
                <div className="text-sm text-primary-foreground/65">accompagnés</div>
              </div>
              <div className="rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6 md:p-8">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">544h</div>
                <div className="text-primary-foreground/85">de formation</div>
                <div className="text-sm text-primary-foreground/65">dispensées</div>
              </div>
              <div className="rounded-[var(--radius)] border border-primary-foreground/15 bg-primary-foreground/[0.06] backdrop-blur-sm shadow-glass p-6 md:p-8">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">55%</div>
                <div className="text-primary-foreground/85">des néo-entrepreneurs</div>
                <div className="text-sm text-primary-foreground/65">se rémunèrent dans les 2 ans</div>
              </div>
            </div>
          </div>
        </div>
      </DarkSection>

      {/* Exemples de nos actions Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Retours d'expérience</div>
          <h2 className="font-editorial italic text-center mb-4 text-foreground">
            Exemples de nos actions
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Nos programmes en action dans les établissements partenaires
          </p>
          
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-scroll motion-reduce:animate-none">
              <div className="relative overflow-hidden rounded-sm shadow-[var(--shadow-medium)] flex-shrink-0 w-[85vw] md:w-[400px] h-[300px]">
                <img src={ylookProgramme} width={1920} height={1279} loading="lazy" alt="Programme Ylook - Ynov Campus Toulouse" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex items-end">
                  <div className="p-6 text-primary-foreground">
                    <h3 className="text-xl mb-2 text-primary-foreground">Programme Ylook - Ynov Campus Toulouse</h3>
                    <p className="text-sm">Accompagnement étudiant au sein de l'école Ynov Campus Toulouse dans le cadre du programme Ylook</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-sm shadow-[var(--shadow-medium)] flex-shrink-0 w-[85vw] md:w-[400px] h-[300px]">
                <img src={fresque1Img} width={996} height={812} loading="lazy" alt="Fresque organisée pour 80 personnes dans un établissement" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex items-end">
                  <div className="p-6 text-primary-foreground">
                    <h3 className="text-xl mb-2 text-primary-foreground">Fresque collaborative</h3>
                    <p className="text-sm">Fresque organisée pour 80 personnes dans un établissement</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-sm shadow-[var(--shadow-medium)] flex-shrink-0 w-[85vw] md:w-[400px] h-[300px]">
                <img src={iscomChallenge} width={1920} height={1440} loading="lazy" alt="ISCOM Startup Challenge - Réfléchir vite pour répondre à la problématique donnée" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex items-end">
                  <div className="p-6 text-primary-foreground">
                    <h3 className="text-xl mb-2 text-primary-foreground">ISCOM Startup Challenge</h3>
                    <p className="text-sm">Réfléchir vite pour répondre à la problématique donnée</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-sm shadow-[var(--shadow-medium)] flex-shrink-0 w-[85vw] md:w-[400px] h-[300px]">
                <img src={fresqueDoctorant} width={1672} height={1000} loading="lazy" alt="Fresque de l'esprit d'entreprendre adaptée aux doctorants" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex items-end">
                  <div className="p-6 text-primary-foreground">
                    <h3 className="text-xl mb-2 text-primary-foreground">Fresque de l'esprit d'entreprendre</h3>
                    <p className="text-sm">Fresque de l'esprit d'entreprendre adaptée aux doctorants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Écoles Partenaires Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Ecoles et établissements partenaires</div>
          <h2 className="font-editorial italic text-center mb-4 text-foreground">
            Ils nous font confiance
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Comme ces organisations, faites appel au réseau d'intervenants et formateurs de Mare Nostrum
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
              { src: schoolInpN7, alt: "Toulouse INP N7" },
              { src: schoolIcam, alt: "ICAM" },
              { src: schoolNeoma, alt: "NEOMA Business School" },
              { src: schoolIcd, alt: "ICD Business School" },
              { src: schoolEsct, alt: "ESCT" },
              { src: schoolEfap, alt: "EFAP" },
            ].map((school) => (
              <div key={school.alt} className="flex items-center justify-center h-16 md:h-20 grayscale hover:grayscale-0 transition-all duration-300">
                <img src={school.src} alt={school.alt} width={160} height={80} loading="lazy" className="max-h-full max-w-[140px] md:max-w-[160px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="mn-eyebrow-turquoise text-center mb-3">Témoignages</div>
          <h2 className="font-editorial italic text-center mb-12 text-foreground">
            Que disent nos clients de notre centre de formation ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard text="Quelque chose qui était présent à chaque instant (du Programme) c'est l'échange d'expérience et d'opinion. Ce qui permettait un retour permanent, constructif et pointilleux tout ça dans la bienveillance et la bonne humeur" author="Annabel" role="Étudiante et néo-entrepreneure accompagnée" organization="2024" />
            <TestimonialCard text="Un acteur efficace, engagé et authentique, qui accompagne réellement les établissements dans leur transformation." author="Géraldine Le Caer" role="Directrice d'établissement partenaire" />
            <TestimonialCard text="Être ici aux côtés de l'ensemble des porteurs de projet, pour moi, c'était important. Parce que ce sont des jeunes audacieux, persévérants, et parce qu'on a besoin d'un entrepreneuriat qui est en capacité de pouvoir changer le monde. Ils mettent leurs convictions au service de solutions. Ce sont des solutions concrètes et performantes. Faites leur confiance, aidez-les, accompagnez-les !" author="Nadia Pellefigue" role="Vice-présidente de la Région Occitanie" />
          </div>
        </div>
      </section>

      <FAQSection title="Questions fréquentes" faqs={educationFaqs} />

      {/* CTA Section */}
      <DarkSection>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-editorial italic mb-6 text-primary-foreground">
              Se former pour entreprendre, ou former ceux qui entreprennent
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Choisissez l'entrée qui vous convient
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-sm p-8">
                <h3 className="text-xl text-primary-foreground mb-4">Responsable pédagogique ?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Planifions un rendez-vous pour discuter de vos besoins
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <a href="https://meet.marenostrum.tech/rdv-equipe" target="_blank" rel="noopener noreferrer">
                    Planifier un rendez-vous
                  </a>
                </Button>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-sm p-8">
                <h3 className="text-xl text-primary-foreground mb-4">Appel d'offres en cours ?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Envoyez-nous votre brief pour une réponse personnalisée
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/contact">
                    Nous envoyer un brief
                  </Link>
                </Button>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-sm p-8">
                <h3 className="text-xl text-primary-foreground mb-4">Vous voulez vous former ?</h3>
                <p className="text-primary-foreground/80 mb-6">
                  Découvrez le catalogue et pré-inscrivez-vous
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/contact">
                    S'informer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DarkSection>

      <Footer />
    </div>;
};
export default Education;