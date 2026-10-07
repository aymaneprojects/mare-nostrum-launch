import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Après une mise en ligne, un onglet resté ouvert réclame encore les anciens fichiers
// (supprimés, 404) et la page « bug ». On recharge alors UNE seule fois pour récupérer
// la nouvelle version ; le marqueur évite toute boucle si le problème est ailleurs.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  try {
    const cle = "mn-rechargement-version";
    const dernier = Number(sessionStorage.getItem(cle) || 0);
    if (Date.now() - dernier < 30_000) return;
    sessionStorage.setItem(cle, String(Date.now()));
  } catch {
    // stockage indisponible : un seul rechargement par chargement de page
    if ((window as unknown as { __mnReload?: boolean }).__mnReload) return;
    (window as unknown as { __mnReload?: boolean }).__mnReload = true;
  }
  window.location.reload();
});

const isNiteoSubdomain = window.location.hostname === "niteo.marenostrum.tech";

if (isNiteoSubdomain) {
  const NiteoCandidature = lazy(() => import("./pages/NiteoCandidature.tsx"));
  const NiteoReservation = lazy(() => import("./pages/NiteoReservation.tsx"));
  const NiteoEvaluation  = lazy(() => import("./pages/NiteoEvaluation.tsx"));
  const queryClient = new QueryClient();

  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes>
            <Route path="/" element={<NiteoCandidature />} />
            <Route path="/reservation" element={<NiteoReservation />} />
            <Route path="/evaluation" element={<NiteoEvaluation />} />
            <Route path="*" element={<NiteoCandidature />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
