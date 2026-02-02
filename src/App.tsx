import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { usePrefetchBlog } from "@/hooks/usePrefetchBlog";
import ChatBot from "@/components/ChatBot";
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

const queryClient = new QueryClient();

// Composant qui gère le prefetch des données
const AppContent = () => {
  const location = useLocation();
  const isHealthz = location.pathname === "/healthz";
  
  usePrefetchBlog();
  
  // Pour /healthz, afficher uniquement le JSON sans UI globale
  if (isHealthz) {
    return (
      <Routes>
        <Route path="/healthz" element={<Healthz />} />
      </Routes>
    );
  }
  
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <ChatBot />
      <CookieBanner />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/education" element={<Education />} />
        <Route path="/croissance" element={<Croissance />} />
        <Route path="/offre-ia" element={<OffreIA />} />
        <Route path="/engagement-rse" element={<EngagementRSE />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/livre-entrepreneuriat" element={<LivreEntrepreneuriat />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgu" element={<CGU />} />
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
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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
