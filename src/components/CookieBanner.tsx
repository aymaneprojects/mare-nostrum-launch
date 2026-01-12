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
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Afficher la bannière après un court délai
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Charger les préférences sauvegardées
      const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
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

  if (!showBanner) return null;

  return (
    <>
      {/* Bannière principale */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-300">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-xl">
          <div className="p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-12 h-12 bg-primary/10 rounded-full items-center justify-center flex-shrink-0">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  Gestion des cookies
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                  Les cookies nécessaires sont essentiels au fonctionnement du site. 
                  Vous pouvez personnaliser vos préférences ou accepter tous les cookies.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={acceptAll}
                    className="w-full sm:w-auto"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Tout accepter
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={rejectAll}
                    className="w-full sm:w-auto"
                  >
                    Refuser
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowSettings(true)}
                    className="w-full sm:w-auto"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Personnaliser
                  </Button>
                </div>
              </div>
              <button 
                onClick={rejectAll}
                className="hidden md:flex text-muted-foreground hover:text-foreground p-1"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Lien vers politique de confidentialité */}
          <div className="border-t border-border px-4 md:px-6 py-3 bg-secondary/30 rounded-b-xl">
            <p className="text-xs text-muted-foreground">
              En savoir plus sur notre{" "}
              <a href="/confidentialite" className="text-primary underline hover:text-primary/80">
                politique de confidentialité
              </a>{" "}
              et notre{" "}
              <a href="/cgu" className="text-primary underline hover:text-primary/80">
                politique d'utilisation des cookies
              </a>.
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
                <Label className="font-medium">Cookies nécessaires</Label>
                <p className="text-sm text-muted-foreground">
                  Essentiels au fonctionnement du site (session, sécurité)
                </p>
              </div>
              <Switch checked disabled className="data-[state=checked]:bg-primary" />
            </div>
            
            {/* Cookies analytiques */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-medium">Cookies analytiques</Label>
                <p className="text-sm text-muted-foreground">
                  Nous aident à comprendre comment vous utilisez le site
                </p>
              </div>
              <Switch 
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, analytics: checked }))
                }
              />
            </div>
            
            {/* Cookies marketing */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-medium">Cookies marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Permettent d'afficher des publicités personnalisées
                </p>
              </div>
              <Switch 
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
