import { ArrowRight, Brain, CalendarDays, FileText, Home, Mail, MessageCircle, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import DarkSection from "@/components/DarkSection";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";

const principes = [
  { icon: Home, title: "Il vit chez vous", text: "L'agent s'installe sur votre ordinateur. Vos dossiers, vos notes et sa mémoire restent sur votre machine, et vous choisissez le modèle d'IA qui le fait réfléchir." },
  { icon: Zap, title: "Il agit, il ne fait pas que répondre", text: "Il lit et range vos fichiers, prépare vos e-mails, consulte votre agenda, cherche sur le web et enchaîne plusieurs étapes jusqu'au résultat." },
  { icon: Brain, title: "Il se souvient de vous", text: "Vos projets, vos clients, vos habitudes de travail : l'agent garde le contexte d'une conversation à l'autre et n'oblige plus à tout réexpliquer." },
  { icon: Sparkles, title: "Il apprend vos façons de faire", text: "Une tâche réussie devient une compétence réutilisable. Plus vous l'utilisez, moins vous lui expliquez." },
];

const connexions = [
  { icon: MessageCircle, title: "Vos messageries", text: "Vous lui parlez là où vous êtes déjà : WhatsApp, Telegram, Slack, e-mail. Un seul agent, une seule mémoire, quel que soit le canal." },
  { icon: Mail, title: "Votre boîte mail", text: "Tri, brouillons de réponses, relances de prospects : l'agent prépare, vous validez." },
  { icon: CalendarDays, title: "Votre agenda", text: "Préparation des rendez-vous, rappels, créneaux proposés selon vos règles." },
  { icon: FileText, title: "Vos documents et vos outils", text: "Fichiers locaux, tableurs, base de clients, outils de gestion de projet : l'agent travaille dans l'environnement que vous avez déjà." },
];

const etapes = [
  { n: "01", title: "Vous lui parlez", text: "Un message sur votre messagerie habituelle, en langage naturel. Pas de prompt à écrire." },
  { n: "02", title: "Il planifie et agit", text: "L'agent découpe la demande, utilise vos outils et enchaîne les étapes nécessaires." },
  { n: "03", title: "Vous gardez la main", text: "Pour les actions sensibles (envoyer, supprimer, payer), il demande votre accord avant d'agir." },
  { n: "04", title: "Il retient", text: "Ce qu'il a appris sur votre manière de travailler est conservé pour la fois suivante." },
];

const missions = [
  "Le point du matin : agenda du jour, messages importants, relances à faire",
  "Tri de la boîte mail et préparation des réponses à valider",
  "Comptes rendus de rendez-vous et suivi des actions décidées",
  "Veille sur votre marché, vos concurrents, vos appels à projets",
  "Préparation de devis, de présentations et de documents pour vos partenaires",
  "Suivi de vos prospects et de vos clients, sans oubli",
];

const faqs = [
  { question: "Qu'est-ce qu'un agent IA installé sur mon ordinateur ?", answer: "C'est un assistant qui tourne sur votre propre machine, et non sur le site d'un éditeur. Il garde sa mémoire et ses réglages chez vous, se branche à vos outils et accomplit des tâches à votre place, sous votre contrôle. Seul le modèle d'IA que vous choisissez de lui connecter peut se trouver chez un fournisseur extérieur." },
  { question: "En quoi est-ce différent d'un chatbot comme ChatGPT ?", answer: "Un chatbot répond dans une fenêtre et oublie le contexte. Un agent se souvient de vous, agit dans vos outils (fichiers, e-mails, agenda) et mène une mission en plusieurs étapes. Vous lui parlez depuis votre messagerie habituelle." },
  { question: "Mes données sont-elles en sécurité ?", answer: "Les fichiers, notes et mémoires de l'agent restent sur votre ordinateur. Vous décidez des accès qu'il reçoit, des actions qui demandent votre accord, et vous pouvez consulter ce qu'il a fait. Nous vous aidons à définir ces règles au départ, dans le respect du RGPD." },
  { question: "Faut-il savoir programmer ?", answer: "Non. Vous lui parlez en langage naturel. L'installation et la connexion à votre environnement demandent un peu de technique : c'est là que nous vous accompagnons." },
  { question: "Pour qui est-ce adapté ?", answer: "Pour les entrepreneurs, dirigeants de petites structures et chefs de projet qui veulent déléguer le suivi, l'administratif et la veille pour se concentrer sur leurs clients." },
  { question: "Quel lien avec Veluo ?", answer: "Veluo est notre agent IA pour les chefs de projet : il tient leurs dossiers à jour et génère leurs livrables. Il est actuellement en test, et nous échangeons avec des utilisateurs pour construire la suite." },
];

const LogicielIA = () => {
  const contact = <Button asChild size="lg" variant="secondary"><Link to="/contact">Parlons de votre projet<ArrowRight className="ml-2 h-5 w-5" /></Link></Button>;
  const veluo = <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="https://veluo.marenostrum.tech/">Découvrir Veluo</a></Button>;

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <EnhancedSEOHead
        title="Agents IA pour entrepreneurs | Mare Nostrum"
        description="Des agents IA installés sur votre ordinateur et connectés à votre environnement de travail : messageries, e-mails, agenda, documents. Ils agissent, se souviennent et vous laissent la décision."
        keywords="agent IA entrepreneur, assistant IA local, agent IA installé sur ordinateur, automatisation entrepreneur, IA connectée outils, Veluo"
        faqSchema={faqs}
      />
      <Header />
      <PageHero
        title="Des agents IA qui travaillent sur votre ordinateur, avec vos outils"
        subtitle="Un assistant installé chez vous, connecté à votre messagerie, vos e-mails, votre agenda et vos documents. Il agit, il se souvient, et vous gardez la décision."
        ctas={<div className="mn-cta-row mn-cta-row--center">{contact}{veluo}</div>}
      />
      <Breadcrumbs items={[{ label: "Logiciel IA", href: "/logiciel-ia" }]} />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="mn-eyebrow-turquoise mb-3">Le principe</div>
              <h2 className="font-editorial italic text-foreground">Un agent, pas un chatbot</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 md:gap-7">
              {principes.map(({ icon: Icon, title, text }) => (
                <article key={title} className="mn-card p-6 md:p-7 hover-lift">
                  <Icon className="h-7 w-7 mb-4 text-[hsl(var(--mn-turquoise))]" aria-hidden="true" />
                  <h3 className="mb-2 text-foreground">{title}</h3>
                  <p className="mn-body text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="mn-eyebrow-turquoise mb-3">Votre écosystème</div>
              <h2 className="font-editorial italic text-foreground">Connecté à ce que vous utilisez déjà</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 md:gap-7">
              {connexions.map(({ icon: Icon, title, text }) => (
                <article key={title} className="mn-card p-6 md:p-7 hover-lift">
                  <Icon className="h-7 w-7 mb-4 text-[hsl(var(--mn-turquoise))]" aria-hidden="true" />
                  <h3 className="mb-2 text-foreground">{title}</h3>
                  <p className="mn-body text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <DarkSection halo="right">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
              <div className="mn-eyebrow-light mb-3">Au quotidien</div>
              <h2 className="font-editorial italic text-primary-foreground">Comment il travaille</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {etapes.map(({ n, title, text }) => (
                <div key={n}>
                  <div className="font-editorial italic text-3xl text-[hsl(var(--mn-turquoise))] mb-3">{n}</div>
                  <h3 className="text-primary-foreground mb-2">{title}</h3>
                  <p className="mn-body text-primary-foreground/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </DarkSection>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10 md:mb-12">
              <div className="mn-eyebrow-turquoise mb-3">Exemples</div>
              <h2 className="font-editorial italic text-foreground">Ce que vous pouvez lui confier</h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {missions.map((m) => (
                <li key={m} className="flex gap-3 mn-card p-5">
                  <Workflow className="h-5 w-5 mt-0.5 shrink-0 text-[hsl(var(--mn-turquoise))]" aria-hidden="true" />
                  <span className="mn-body text-foreground">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <ShieldCheck className="h-9 w-9 mx-auto mb-4 text-[hsl(var(--mn-turquoise))]" aria-hidden="true" />
            <h2 className="font-editorial italic text-foreground mb-4">Vous gardez le contrôle</h2>
            <p className="mn-body text-muted-foreground">
              Vos données restent sur votre ordinateur. Vous choisissez les accès accordés à l'agent, les actions qui demandent votre accord avant d'être exécutées, et le modèle d'IA qui le fait fonctionner. Nous vous aidons à poser ces règles dès le départ.
            </p>
          </div>
        </section>
      </main>

      <FAQSection faqs={faqs} />

      <DarkSection>
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-editorial italic text-primary-foreground mb-5">Quel agent pour votre activité ?</h2>
          <p className="mn-lead text-primary-foreground/75 mb-8">Décrivez-nous vos outils et les tâches qui vous coûtent le plus de temps. Nous échangeons avec vous.</p>
          <div className="mn-cta-row mn-cta-row--center">{contact}</div>
        </div>
      </DarkSection>
      <Footer />
    </div>
  );
};

export default LogicielIA;
