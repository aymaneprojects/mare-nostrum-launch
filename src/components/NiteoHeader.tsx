import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logoNiteo from "@/assets/niteo/logo-niteo-2026.png";

const CTA_URL = "https://airtable.com/appZ8ykNuUOv89ou0/shrxZTmKppjTEHTjE";

export default function NiteoHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-xl border-b border-primary-foreground/5 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <img src={logoNiteo} alt="Niteo" className="h-14" />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="text-primary-foreground/90 text-sm font-semibold tracking-[0.3em] uppercase">Toulouse</span>
          <span className="text-primary-foreground/40">|</span>
          <span className="text-accent text-xs font-semibold hidden sm:inline">Candidature hors délai · Accepté en liste d'attente</span>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="shadow-md hover:shadow-lg transition-shadow"
          onClick={() => window.open(CTA_URL, "_blank", "noopener,noreferrer")}
        >
          Je candidate
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
