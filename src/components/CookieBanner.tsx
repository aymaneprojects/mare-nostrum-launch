import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { lireStockage, ecrireStockage, lireJson } from "@/lib/safe";
import { setConsent } from "@/lib/analytics";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Toujours activé
  analytics: false,
  marketing: false,
};

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_PREFERENCES_KEY = "cookie_preferences";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = lireStockage(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Afficher la bannière après un court délai
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Charger les préférences sauvegardées
      const savedPrefs = lireJson<CookiePreferences>(COOKIE_PREFERENCES_KEY);
      if (savedPrefs && typeof savedPrefs === "object") {
        setPreferences({ ...defaultPreferences, ...savedPrefs, necessary: true });
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    ecrireStockage(COOKIE_CONSENT_KEY, "true");
    ecrireStockage(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    // Seul endroit qui lève (ou maintient) le refus par défaut posé dans index.html.
    // Sans cet appel, la bannière n'aurait aucun effet réel sur la mesure.
    setConsent(prefs);
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  // Signale la bannière au CSS : le bouton de chat et le bouton « retour en haut » s'effacent
  // sur mobile tant qu'elle est ouverte (voir .mn-flottant dans index.css).
  useEffect(() => {
    if (!showBanner) return;
    document.documentElement.dataset.cookies = "ouvert";
    return () => { delete document.documentElement.dataset.cookies; };
  }, [showBanner]);

  if (!showBanner) return null;

  return (
    <>
      {/* Bannière principale */}
      <div role="region" aria-label="Gestion des cookies" className="fixed bottom-[calc(56px+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0 z-50 p-2 sm:p-4 md:p-6 animate-in slide-in-from-bottom duration-300 motion-reduce:animate-none">
        <div className="max-w-4xl mx-auto mn-card shadow-[var(--shadow-lift)]">
          <div className="p-3 sm:p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-12 h-12 bg-primary/10 rounded-full items-center justify-center flex-shrink-0">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-base sm:text-lg mb-2">
                  Gestion des cookies
                </h3>
                {/* Masqué sur mobile : la bannière y mangeait ~40 % de l'écran (retour d'audit).
                    Le lien vers la politique de confidentialité, dessous, reste visible. */}
                <p className="hidden sm:block text-sm text-muted-foreground mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                  Les cookies nécessaires sont essentiels au fonctionnement du site. 
                  Vous pouvez personnaliser vos préférences ou accepter tous les cookies.
                </p>
                
                <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:gap-3">
                  <Button 
                    onClick={acceptAll}
                    className="w-full sm:w-auto px-2 sm:px-6"
                  >
                    <Check className="hidden sm:inline mr-2 h-4 w-4" />
                    Tout accepter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={rejectAll}
                    className="w-full sm:w-auto px-2 sm:px-6"
                  >
                    Refuser
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowSettings(true)}
                    className="w-full sm:w-auto px-2 sm:px-6"
                  >
                    <Settings className="hidden sm:inline mr-2 h-4 w-4" />
                    Personnaliser
                  </Button>
                </div>
              </div>
              <button 
                onClick={rejectAll}
                className="hidden md:flex items-center justify-center w-11 h-11 -m-2 shrink-0 text-muted-foreground hover:text-foreground"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Lien vers politique de confidentialité */}
          <div className="border-t border-border px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-secondary/30 rounded-b-sm">
            <p className="text-sm text-muted-foreground">
              En savoir plus sur notre{" "}
              <Link to="/confidentialite" className="text-primary underline hover:text-primary/80">
                politique de confidentialité
              </Link>{" "}
              et notre{" "}
              <Link to="/cgu" className="text-primary underline hover:text-primary/80">
                politique d'utilisation des cookies
              </Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de personnalisation */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Préférences des cookies
            </DialogTitle>
            <DialogDescription>
              Personnalisez les cookies utilisés sur ce site. Les cookies nécessaires 
              ne peuvent pas être désactivés car ils sont essentiels au fonctionnement.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Cookies nécessaires */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cookie-necessary" className="font-medium">Cookies nécessaires</Label>
                <p className="text-sm text-muted-foreground">
                  Essentiels au fonctionnement du site (session, sécurité)
                </p>
              </div>
              <Switch id="cookie-necessary" checked disabled className="data-[state=checked]:bg-primary" />
            </div>
            
            {/* Cookies analytiques */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cookie-analytics" className="font-medium">Cookies analytiques</Label>
                <p className="text-sm text-muted-foreground">
                  Nous aident à comprendre comment vous utilisez le site
                </p>
              </div>
              <Switch 
                id="cookie-analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>
            
            {/* Cookies marketing */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cookie-marketing" className="font-medium">Cookies marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Permettent d'afficher des publicités personnalisées
                </p>
              </div>
              <Switch 
                id="cookie-marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t">
            <Button variant="outline" onClick={rejectAll} className="flex-1">
              Tout refuser
            </Button>
            <Button onClick={savePreferences} className="flex-1">
              Enregistrer mes préférences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
