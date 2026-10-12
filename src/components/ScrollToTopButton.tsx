import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // setState seulement au franchissement du seuil (React ignore une valeur identique).
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className="mn-flottant max-md:hidden fixed bottom-6 right-24 z-40 rounded-[10px] shadow-[var(--shadow-medium)] hover:scale-110 transition-transform motion-reduce:transition-none"
      aria-label="Retour en haut"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
