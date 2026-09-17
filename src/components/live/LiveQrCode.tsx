import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";

interface LiveQrCodeProps {
  value: string;
  /** Taille affichée en pixels. */
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * QR code généré dans le navigateur. Sur fond clair avec une marge : les
 * lecteurs de QR échouent souvent sur un code posé directement sur un fond sombre.
 */
const LiveQrCode = ({ value, size = 200, className, alt = "QR code pour rejoindre" }: LiveQrCodeProps) => {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: Math.max(size * 2, 256), // rendu net sur écrans haute densité et vidéoprojecteurs
      color: { dark: "#24335D", light: "#FFFFFF" }, // Nuit sur blanc : contraste maximal pour le scan
    })
      .then((url) => { if (!cancelled) setSrc(url); })
      .catch(() => { if (!cancelled) setSrc(""); });
    return () => { cancelled = true; };
  }, [value, size]);

  return (
    <div className={cn("inline-block rounded-lg bg-card p-2 shadow-lg", className)} style={{ width: size + 16, height: size + 16 }}>
      {src ? (
        <img src={src} alt={alt} width={size} height={size} className="block" />
      ) : (
        <div className="h-full w-full animate-pulse rounded bg-muted" aria-hidden />
      )}
    </div>
  );
};

export default LiveQrCode;
