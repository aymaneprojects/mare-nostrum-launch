import { Link } from "react-router-dom";
import { X, Sparkles } from "lucide-react";
import { useState } from "react";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center gap-2 text-center text-sm md:text-base font-medium">
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
        <span className="hidden sm:inline">Offre Spéciale Nouveaux Adhérents :</span>
        <span className="sm:hidden">Offre Spéciale :</span>
        <span className="font-bold">-50%</span>
        <span className="hidden md:inline">sur les offres Tremplin & Ascension</span>
        <span className="md:hidden">Tremplin & Ascension</span>
        <span className="mx-1">|</span>
        <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">MN2026</span>
        <span className="hidden lg:inline ml-1">| Valable 2 mois</span>
        <Link 
          to="/croissance#offres" 
          className="ml-2 underline underline-offset-2 hover:no-underline font-semibold"
        >
          Profiter
        </Link>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Fermer la bannière"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
