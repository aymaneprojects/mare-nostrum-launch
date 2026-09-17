import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveQrCodeProps {
  value: string;
  /** Taille affichée en pixels. */
  size?: number;
  className?: string;
  alt?: string;
  /** Rend le QR cliquable : il s'ouvre en plein écran (retardataires en cours de séance). */
  expandable?: boolean;
  /** Adresse lisible affichée sous le QR agrandi. */
  caption?: string;
}

/**
 * QR code généré dans le navigateur. Sur fond clair avec une marge : les
 * lecteurs de QR échouent souvent sur un code posé directement sur un fond sombre.
 */
const LiveQrCode = ({ value, size = 200, className, alt = "QR code pour rejoindre", expandable, caption }: LiveQrCodeProps) => {
  const [src, setSrc] = useState<string>("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 1024, // rendu net même agrandi sur un vidéoprojecteur
      color: { dark: "#24335D", light: "#FFFFFF" }, // Nuit sur blanc : contraste maximal pour le scan
    })
      .then((url) => { if (!cancelled) setSrc(url); })
      .catch(() => { if (!cancelled) setSrc(""); });
    return () => { cancelled = true; };
  }, [value]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  const frame = (
    <div className={cn("inline-block rounded-lg bg-card p-2 shadow-lg", className)} style={{ width: size + 16, height: size + 16 }}>
      {src ? (
        <img src={src} alt={alt} width={size} height={size} className="block h-full w-full" />
      ) : (
        <div className="h-full w-full animate-pulse rounded bg-muted" aria-hidden />
      )}
    </div>
  );

  if (!expandable) return frame;

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label="Afficher le QR code en grand"
        className="rounded-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        {frame}
      </button>

      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="QR code pour rejoindre"
          onClick={() => setExpanded(false)}
          className="animate-in fade-in fixed inset-0 z-50 flex cursor-zoom-out flex-col items-center justify-center gap-8 bg-ink/95 p-8 backdrop-blur-sm duration-200"
        >
          {src && (
            <img
              src={src}
              alt={alt}
              className="animate-in zoom-in-95 rounded-2xl bg-card p-4 shadow-2xl duration-300"
              style={{ width: "min(70vh, 70vw)", height: "min(70vh, 70vw)" }}
            />
          )}
          {caption && <p className="font-mono text-3xl font-semibold text-accent md:text-5xl">{caption}</p>}
          <p className="text-sm text-primary-foreground/50">Cliquez n'importe où pour refermer</p>
          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Fermer"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default LiveQrCode;
