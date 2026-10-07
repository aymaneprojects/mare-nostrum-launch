import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { usePrefetchBlog } from "@/hooks/usePrefetchBlog";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useAnalyticsPageView } from "@/hooks/useAnalyticsPageView";
import ChatBot from "@/components/ChatBot";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import BottomNav from "@/components/BottomNav";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import Education from "./pages/Education";
import Croissance from "./pages/Croissance";
import OffreIA from "./pages/OffreIA";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import LivreEntrepreneuriat from "./pages/LivreEntrepreneuriat";
import EngagementRSE from "./pages/EngagementRSE";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import CGU from "./pages/CGU";
import CGV from "./pages/CGV";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";
import Healthz from "./pages/Healthz";

// Silo 1: Écoles
import TransformationEntrepreneuriale from "./pages/ecoles/TransformationEntrepreneuriale";
import DiagnosticGratuit from "./pages/ecoles/DiagnosticGratuit";

// Silo 2: Entrepreneurs
import AccompagnementFrancophonie from "./pages/entrepreneurs/AccompagnementFrancophonie";
import TestMaturiteProjet from "./pages/entrepreneurs/TestMaturiteProjet";
import MentoratIndividuel from "./pages/entrepreneurs/MentoratIndividuel";

// Silo 3: Magazine
import EntrepreneuriatSocialFrancophonie from "./pages/mag/EntrepreneuriatSocialFrancophonie";
import InnovationPedagogiqueEntrepreneuriat from "./pages/mag/InnovationPedagogiqueEntrepreneuriat";
import ImpactMesureStartup from "./pages/mag/ImpactMesureStartup";
import NiteoToulouse from "./pages/NiteoToulouse";
import Newsletter from "./pages/Newsletter";
import Unsubscribed from "./pages/Unsubscribed";
import Diagnostic from "./pages/Diagnostic";
import Partenaires from "./pages/Partenaires";
import Equipe from "./pages/Equipe";
import CarteContact from "./pages/CarteContact";
import { cn } from "@/lib/utils";

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
const LiveScreen = lazy(() => import("./pages/live/LiveScreen"));
const LiveRegie = lazy(() => import("./pages/live/LiveRegie"));
const LiveConducteur = lazy(() => import("./pages/live/LiveConducteur"));

const queryClient = new QueryClient();

// Composant qui gère le prefetch des données
const AppContent = () => {
  const location = useLocation();
  const isHealthz = location.pathname === "/healthz";
  const isLive = location.pathname === "/live" || location.pathname.startsWith("/live/");

  usePrefetchBlog(!isLive);
  useAnalyticsPageView();
  useSpotlight();
  
  // Pour /healthz, afficher uniquement le JSON sans UI globale
  if (isHealthz) {
    return (
      <Routes>
        <Route path="/healthz" element={<Healthz />} />
      </Routes>
    );
  }
  
  // Fiche de visite (/equipe/<prénom>) : page nue. On la scanne en rendez-vous,
  // elle ne doit montrer que la carte — ni navigation, ni pied de page, ni bandeau.
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
      <ScrollToTop />
      {!bare && <ScrollToTopButton />}
      {!quiet && <ChatBot />}
      {!bare && <BottomNav />}
      {!bare && <CookieBanner />}
      {!quiet && <ExitIntentPopup />}

      {/* Compense la barre de navigation mobile fixe (BottomNav) en bas de page.
          La clé sur le chemin déclenche le fondu d'entrée à chaque changement de
          page (classe mn-page, opacité seule, 160 ms — voir src/index.css). */}
      <div
        key={location.pathname}
        className={cn("mn-page", bare ? undefined : "pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0")}
      >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/education" element={<Education />} />
        <Route path="/formation" element={<Navigate to="/education" replace />} />
        <Route path="/expertise" element={<Suspense fallback={null}><Expertise /></Suspense>} />
        <Route path="/mastermind" element={<Suspense fallback={null}><MastermindNeoEntrepreneurs /></Suspense>} />
        <Route path="/mastermind-digital" element={<Suspense fallback={null}><MastermindDigital /></Suspense>} />
        <Route path="/initiation-ia" element={<Suspense fallback={null}><InitiationIA /></Suspense>} />
        <Route path="/agent-ia-marketing" element={<Suspense fallback={null}><AgentIAMarketing /></Suspense>} />
        <Route path="/roue" element={<Suspense fallback={null}><Roue /></Suspense>} />
        <Route path="/club" element={<Croissance />} />
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
        <Route path="/live" element={<Suspense fallback={null}><LiveHome /></Suspense>} />
        <Route path="/live/:code" element={<Suspense fallback={null}><LivePublic /></Suspense>} />
        <Route path="/live/:code/ecran" element={<Suspense fallback={null}><LiveScreen /></Suspense>} />
        <Route path="/live/:code/regie" element={<Suspense fallback={null}><LiveRegie /></Suspense>} />
        <Route path="/live/:code/conducteur" element={<Suspense fallback={null}><LiveConducteur /></Suspense>} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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
