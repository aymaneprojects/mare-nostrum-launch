import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const isNiteoSubdomain = window.location.hostname === "niteo.marenostrum.tech";

if (isNiteoSubdomain) {
  import("./pages/NiteoCandidature.tsx").then(({ default: NiteoCandidature }) => {
    // Set page title for SEO
    document.title = "Niteo Toulouse 2026 -- Programme Entrepreneuriat Etudiant Gratuit | Candidature";
    createRoot(document.getElementById("root")!).render(<NiteoCandidature />);
  });
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
