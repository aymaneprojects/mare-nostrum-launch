import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

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
