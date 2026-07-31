import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, GraduationCap, Users, Leaf, BookOpen, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

// Desktop : sans "Accueil" (le logo sert de lien home)
const desktopLinks = [
  { to: "/education",         label: "Éducation",        Icon: GraduationCap  },
  { to: "/club",              label: "Club",             Icon: Users          },
  { to: "/engagement-rse",    label: "RSE",              Icon: Leaf           },
  { to: "/blog",              label: "Blog",             Icon: BookOpen       },
  { to: "/a-propos",          label: "À propos",         Icon: Info           },
  { to: "/contact",           label: "Contact",          Icon: Mail           },
];

// Mobile : avec "Accueil"
const navLinks = [
  { to: "/",                  label: "Accueil",          Icon: Home           },
  ...desktopLinks,
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Wrapper sticky — transparent, laisse passer les clics sur les zones vides */}
      <header className="sticky top-0 z-50 w-full px-4 md:px-6 pt-4 pb-2 pointer-events-none">
        <nav
          className={`pointer-events-auto mx-auto flex h-12 md:h-14 max-w-7xl items-center justify-between px-3 md:px-5 rounded-full transition-all duration-300 border ${
            scrolled
              ? "bg-white/98 backdrop-blur-2xl shadow-xl border-gray-200/70"
              : "bg-white/92 backdrop-blur-xl shadow-lg border-gray-200/50"
          }`}
          style={{ WebkitBackdropFilter: "blur(20px)" }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={logo}
              alt="Mare Nostrum"
              className="h-9 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {desktopLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center shrink-0">
            {["/education", "/niteo-toulouse"].includes(location.pathname) ? (
              <Button asChild size="sm" className="rounded-full text-[13px] h-9 px-5">
                <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="rounded-full text-[13px] h-9 px-5" style={{ background: "hsl(222 44% 25%)", color: "#fff" }}>
                <Link to="/club#offres">Rejoindre le Club</Link>
              </Button>
            )}
          </div>

          {/* Mobile — hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-muted/60 active:scale-90 transition-transform duration-150 text-primary"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* ── Mobile slide-over panel ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] md:hidden bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] md:hidden w-[82vw] max-w-[340px]
          bg-background flex flex-col shadow-2xl
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-modal="true"
        role="dialog"
        aria-label="Menu principal"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <img src={logo} alt="Mare Nostrum" className="h-9 w-auto" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-muted active:scale-90 transition-transform duration-150"
            aria-label="Fermer le menu"
          >
            <X className="h-4.5 w-4.5 text-foreground/70" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {navLinks.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl mb-1 transition-all duration-200 active:scale-[0.98] ${
                isActive(to)
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-foreground/75 hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive(to) ? "text-primary-foreground" : "text-primary/70"}`} />
              <span className="text-[15px]">{label}</span>
              {isActive(to) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />
              )}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="px-4 pb-10 pt-3 space-y-2.5 border-t border-border shrink-0">
          {["/education", "/niteo-toulouse"].includes(location.pathname) ? (
            <Button asChild className="w-full h-11 rounded-full">
              <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
            </Button>
          ) : (
            <Button asChild className="w-full h-11 rounded-full" style={{ background: "hsl(222 44% 25%)", color: "#fff" }}>
              <Link to="/club#offres">Rejoindre le Club</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
