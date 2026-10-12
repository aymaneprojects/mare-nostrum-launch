import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useAnalyticsPageView } from "@/hooks/useAnalyticsPageView";
// Éléments flottants : chargés à la demande, hors du script d'entrée (le client Supabase
// du chat n'est plus préchargé sur toutes les pages).
const ChatBot = lazy(() => import("@/components/ChatBot"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));
const BottomNav = lazy(() => import("@/components/BottomNav"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Healthz from "./pages/Healthz";

// Silo 1: Écoles

// Silo 2: Entrepreneurs

// Silo 3: Magazine
import { cn } from "@/lib/utils";

// Toutes les pages sauf l'accueil, la 404 et /healthz sont chargées à la demande : le script
// principal ne contient plus que l'accueil, le socle et le routeur.
const Education = lazy(() => import("./pages/Education"));
const Croissance = lazy(() => import("./pages/Croissance"));
const BienvenuClub = lazy(() => import("./pages/BienvenuClub"));
const OffreIA = lazy(() => import("./pages/OffreIA"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const LivreEntrepreneuriat = lazy(() => import("./pages/LivreEntrepreneuriat"));
const EngagementRSE = lazy(() => import("./pages/EngagementRSE"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const CGU = lazy(() => import("./pages/CGU"));
const CGV = lazy(() => import("./pages/CGV"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));
const TransformationEntrepreneuriale = lazy(() => import("./pages/ecoles/TransformationEntrepreneuriale"));
const DiagnosticGratuit = lazy(() => import("./pages/ecoles/DiagnosticGratuit"));
const AccompagnementFrancophonie = lazy(() => import("./pages/entrepreneurs/AccompagnementFrancophonie"));
const TestMaturiteProjet = lazy(() => import("./pages/entrepreneurs/TestMaturiteProjet"));
const MentoratIndividuel = lazy(() => import("./pages/entrepreneurs/MentoratIndividuel"));
const EntrepreneuriatSocialFrancophonie = lazy(() => import("./pages/mag/EntrepreneuriatSocialFrancophonie"));
const InnovationPedagogiqueEntrepreneuriat = lazy(() => import("./pages/mag/InnovationPedagogiqueEntrepreneuriat"));
const ImpactMesureStartup = lazy(() => import("./pages/mag/ImpactMesureStartup"));
const NiteoToulouse = lazy(() => import("./pages/NiteoToulouse"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const Unsubscribed = lazy(() => import("./pages/Unsubscribed"));
const Diagnostic = lazy(() => import("./pages/Diagnostic"));
const Partenaires = lazy(() => import("./pages/Partenaires"));
const Equipe = lazy(() => import("./pages/Equipe"));
const CarteContact = lazy(() => import("./pages/CarteContact"));

// Pôle d'expertise et fiches de formation : chargés à la demande pour ne pas
// peser sur le bundle des pages principales.
const Expertise = lazy(() => import("./pages/Expertise"));
const MastermindNeoEntrepreneurs = lazy(() => import("./pages/MastermindNeoEntrepreneurs"));
const MastermindDigital = lazy(() => import("./pages/MastermindDigital"));
const InitiationIA = lazy(() => import("./pages/InitiationIA"));
const AgentIAMarketing = lazy(() => import("./pages/AgentIAMarketing"));

// Live conférence : chargées à la demande (QR code + temps réel), hors du bundle du site vitrine.
const Roue = lazy(() => import("./pages/Roue"));
const LiveHome = lazy(() => import("./pages/live/LiveHome"));
const LivePublic = lazy(() => import("./pages/live/LivePublic"));
import ErrorBoundary from "@/components/ErrorBoundary";
const LiveScreen = lazy(() => import("./pages/live/LiveScreen"));
const LiveRegie = lazy(() => import("./pages/live/LiveRegie"));
const LiveConducteur = lazy(() => import("./pages/live/LiveConducteur"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false, retry: 1 } },
});

// Pages principales préchargées quand le navigateur est au repos : la 1re navigation
// ne montre plus de squelette.
const prechargerPages = () => {
  import("./pages/Education");
  import("./pages/Contact");
  import("./pages/Blog");
  import("./pages/Expertise");
};

// Vrai une fois le navigateur au repos (ou après 2,5 s) : le chat et le popup n'ont pas
// à concurrencer le premier affichage.
const useAuRepos = () => {
  const [pret, setPret] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback as undefined | ((cb: () => void, o?: { timeout: number }) => number);
    const go = () => { setPret(true); prechargerPages(); };
    if (ric) { const id = ric(go, { timeout: 2500 }); return () => window.cancelIdleCallback?.(id); }
    const t = window.setTimeout(go, 2500);
    return () => window.clearTimeout(t);
  }, []);
  return pret;
};

// Lien d'évitement : place le focus sur le contenu principal de la page courante.
const allerAuContenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const main = document.getElementById("contenu") ?? document.querySelector("main");
  if (!main) return;
  e.preventDefault();
  main.setAttribute("tabindex", "-1");
  (main as HTMLElement).focus();
  main.scrollIntoView();
};

// Squelette sans texte affiché pendant le chargement d'une page : barre de menu + bloc de contenu.
const SqueletteChargement = () => (
  <div className="min-h-dvh bg-background" aria-hidden="true">
    <div className="px-4 pt-4"><div className="mx-auto h-14 max-w-7xl rounded-2xl bg-muted/70 md:h-16" /></div>
    <div className="mx-auto mt-10 max-w-4xl space-y-4 px-4">
      <div className="h-10 w-2/3 animate-pulse rounded bg-muted motion-reduce:animate-none" />
      <div className="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-muted motion-reduce:animate-none" />
      <div className="h-48 w-full animate-pulse rounded-2xl bg-muted/70 motion-reduce:animate-none" />
    </div>
  </div>
);

// Composant racine : mesure d'audience et effets globaux
const AppContent = () => {
  const location = useLocation();
  const isHealthz = location.pathname === "/healthz";
  const isLive = location.pathname === "/live" || location.pathname.startsWith("/live/");

  useAnalyticsPageView();
  useSpotlight();
  const auRepos = useAuRepos();
  
  // Pour /healthz, afficher uniquement le JSON sans UI globale
  if (isHealthz) {
    return (
      <Routes>
        <Route path="/healthz" element={<Healthz />} />
      </Routes>
    );
  }
  
  // Fiche de visite (/equipe/<prénom>) : page nue. On la scanne en rendez-vous,
  // elle ne doit montrer que la carte - ni navigation, ni pied de page, ni bandeau.
  // Live conférence (/live…) : écrans plein cadre projetés ou tenus en main pendant
  // un événement. Aucun élément global ne doit s'y superposer.
  const isCard = /^\/equipe\/[^/]+$/.test(location.pathname);
  // Pages sans sollicitation : ni chatbot, ni popup promo.
  // Roue de l'événement (/roue) : écran de jeu, comme le live, sans rien par-dessus.
  const isRoue = location.pathname === "/roue";
  const quiet = isLive || isCard || isRoue || location.pathname === "/equipe";
  const bare = isLive || isCard || isRoue;

  return (
    <>
      {!bare && (
        <a
          href="#contenu"
          onClick={allerAuContenu}
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground focus:shadow-lift focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Aller au contenu
        </a>
      )}
      <ScrollToTop />
      {!bare && <ScrollToTopButton />}
      <Suspense fallback={null}>
        {!quiet && auRepos && <ErrorBoundary fallback={null}><ChatBot /></ErrorBoundary>}
        {!bare && <ErrorBoundary fallback={null}><BottomNav /></ErrorBoundary>}
        {!bare && <ErrorBoundary fallback={null}><CookieBanner /></ErrorBoundary>}
        {!quiet && auRepos && <ErrorBoundary fallback={null}><ExitIntentPopup /></ErrorBoundary>}
      </Suspense>

      {/* Compense la barre de navigation mobile fixe (BottomNav) en bas de page.
          La clé sur le chemin déclenche le fondu d'entrée à chaque changement de
          page (classe mn-page, opacité seule, 160 ms - voir src/index.css). */}
      <div
        key={location.pathname}
        className={cn("mn-page", bare ? undefined : "pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0")}
      >
      <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<SqueletteChargement />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/education" element={<Education />} />
        <Route path="/formation" element={<Navigate to="/education" replace />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/mastermind" element={<MastermindNeoEntrepreneurs />} />
        <Route path="/mastermind-digital" element={<MastermindDigital />} />
        <Route path="/initiation-ia" element={<InitiationIA />} />
        <Route path="/agent-ia-marketing" element={<AgentIAMarketing />} />
        <Route path="/roue" element={<Roue />} />
        <Route path="/club" element={<Croissance />} />
        <Route path="/bienvenue-club" element={<BienvenuClub />} />
        <Route path="/offre-ia" element={<OffreIA />} />
        <Route path="/engagement-rse" element={<EngagementRSE />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/livre-entrepreneuriat" element={<LivreEntrepreneuriat />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        
        {/* SILO 1: Écoles (B2B) */}
        <Route path="/ecoles/transformation-entrepreneuriale" element={<TransformationEntrepreneuriale />} />
        <Route path="/ecoles/diagnostic-gratuit" element={<DiagnosticGratuit />} />
        
        {/* SILO 2: Entrepreneurs (B2C) */}
        <Route path="/entrepreneurs/accompagnement-francophonie-afrique" element={<AccompagnementFrancophonie />} />
        <Route path="/entrepreneurs/test-maturite-projet" element={<TestMaturiteProjet />} />
        <Route path="/entrepreneurs/mentorat-individuel" element={<MentoratIndividuel />} />
        
        {/* SILO 3: Magazine (Thought Leadership) */}
        <Route path="/mag/entrepreneuriat-social-francophonie" element={<EntrepreneuriatSocialFrancophonie />} />
        <Route path="/mag/innovation-pedagogique-entrepreneuriat" element={<InnovationPedagogiqueEntrepreneuriat />} />
        <Route path="/mag/impact-mesure-startup" element={<ImpactMesureStartup />} />
        
        {/* Niteo */}
        <Route path="/niteo-toulouse" element={<NiteoToulouse />} />
        
        {/* ITER Newsletter */}
        <Route path="/iter" element={<Newsletter />} />
        <Route path="/unsubscribed" element={<Unsubscribed />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/a-propos/partenaire" element={<Partenaires />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/equipe/:slug" element={<CarteContact />} />

        {/* Live conférence */}
        <Route path="/live" element={<LiveHome />} />
        <Route path="/live/:code" element={<LivePublic />} />
        <Route path="/live/:code/ecran" element={<LiveScreen />} />
        <Route path="/live/:code/regie" element={<LiveRegie />} />
        <Route path="/live/:code/conducteur" element={<LiveConducteur />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </ErrorBoundary>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
