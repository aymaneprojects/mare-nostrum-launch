import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

// Composant qui gère le prefetch des données
const AppContent = () => {
  usePrefetchBlog();
  
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
        <Route path="/healthz" element={<Healthz />} />
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
