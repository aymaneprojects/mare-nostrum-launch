import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, GraduationCap, Compass, Users, Leaf, BookOpen, Info, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

// Desktop : sans "Accueil" (le logo sert de lien home)
const desktopLinks = [
  { to: "/expertise",         label: "Conseil",          Icon: Compass        },
  { to: "/education",         label: "Formation professionnelle",        Icon: GraduationCap  },
  { to: "/club",              label: "Réseau",           Icon: Users         },
  { to: "https://niteo.marenostrum.tech/", label: "Niteo", Icon: Rocket, external: true },
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
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Wrapper sticky — transparent, laisse passer les clics sur les zones vides */}
      <header className={`sticky top-0 z-50 w-full h-[5.5rem] md:h-24 px-4 md:px-6 pb-2 pointer-events-none transition-[padding] duration-200 ${scrolled ? "pt-2" : "pt-4"}`}>
        <nav
          className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between px-3 md:px-5 rounded-full transition-all duration-200 ${scrolled ? "h-11 md:h-12" : "h-14 md:h-16"}`}
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid hsl(222 44% 25% / 0.12)",
            boxShadow: scrolled
              ? "0 4px 16px hsl(228 56% 13% / 0.08)"
              : "var(--shadow-soft)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={logo}
              alt="Mare Nostrum"
              className={`w-auto transition-all duration-200 group-hover:scale-105 ${scrolled ? "h-8 md:h-8" : "h-9 md:h-11"}`}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {desktopLinks.map((link) => {
              const active = !link.external && isActive(link.to);
              const className = `mn-link-u [--mn-u-inset:0.75rem] [--mn-u-bottom:0.3rem] px-3 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 ${
                active ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground"
              }`;

              return link.external ? (
                <a key={link.to} href={link.to} className={className}>{link.label}</a>
              ) : (
                <Link key={link.to} to={link.to} className={className}>{link.label}</Link>
              );
            })}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center shrink-0">
            {["/education", "/niteo-toulouse"].includes(location.pathname) ? (
              <Button asChild size="sm">
                <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
              </Button>
            ) : (
              <Button asChild size="sm" style={{ background: "hsl(222 44% 25%)", color: "hsl(40 38% 94%)" }}>
                <Link to="/club#offres">Rejoindre le Club</Link>
              </Button>
            )}
          </div>

          {/* Mobile — hamburger */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-muted/60 active:scale-90 transition-transform duration-150 text-primary"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* ── Mobile slide-over panel ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] md:hidden bg-[hsl(var(--mn-ink)/0.5)] backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="menu-mobile"
        className={`fixed top-0 right-0 bottom-0 z-[70] md:hidden w-[82vw] max-w-[340px]
          bg-background flex flex-col shadow-lift
          transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isMenuOpen ? "translate-x-0 visible" : "translate-x-full invisible pointer-events-none"}`}
        aria-modal="true"
        role="dialog"
        aria-label="Menu principal"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <img src={logo} alt="Mare Nostrum" className="h-9 w-auto" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-muted active:scale-90 transition-transform duration-150"
            aria-label="Fermer le menu"
          >
            <X className="h-4.5 w-4.5 text-foreground/70" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {navLinks.map(({ to, label, Icon, external }) => {
            const active = !external && isActive(to);
            const className = `flex items-center gap-3.5 px-4 py-3.5 rounded-xl mb-1 transition-all duration-200 active:scale-[0.98] ${
              active ? "bg-primary text-primary-foreground font-semibold" : "text-foreground/75 hover:bg-muted hover:text-foreground"
            }`;
            const content = <>
              <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-primary-foreground" : "text-primary/70"}`} />
              <span className="text-[15px]">{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />}
            </>;

            return external ? (
              <a key={to} href={to} className={className}>{content}</a>
            ) : (
              <Link key={to} to={to} className={className}>{content}</Link>
            );
          })}
        </nav>

        {/* CTAs */}
        <div className="px-4 pb-10 pt-3 space-y-2.5 border-t border-border shrink-0">
          {["/education", "/niteo-toulouse"].includes(location.pathname) ? (
            <Button asChild size="lg" className="w-full">
              <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="w-full" style={{ background: "hsl(222 44% 25%)", color: "hsl(40 38% 94%)" }}>
              <Link to="/club#offres">Rejoindre le Club</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
