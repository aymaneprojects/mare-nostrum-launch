import { useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";
import { cn } from "@/lib/utils";

/** Bascule le plein écran. Discret, et presque invisible une fois en plein écran. */
const FullscreenButton = ({ className }: { className?: string }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onChange = () => setActive(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (typeof document !== "undefined" && !document.fullscreenEnabled) return null;

  const toggle = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={active ? "Quitter le plein écran" : "Passer en plein écran"}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full bg-primary-foreground/10 px-4 text-sm text-primary-foreground backdrop-blur transition-opacity hover:bg-primary-foreground/20",
        active ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : "opacity-80 hover:opacity-100",
        className,
      )}
    >
      {active ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
      <span className="hidden sm:inline">{active ? "Quitter" : "Plein écran"}</span>
    </button>
  );
};

export default FullscreenButton;
