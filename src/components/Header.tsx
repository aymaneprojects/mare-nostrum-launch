import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Home, GraduationCap, Compass, Users, Leaf, BookOpen, Info, Mail, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { lienActif } from "@/lib/nav";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type NavItem = { to: string; label: string; Icon: typeof Home; external?: boolean };
type NavGroup = { label: string; children: NavItem[] };

// Desktop : 5 entrées maximum (retour d'audit, oct. 2026) - les offres sont
// regroupées sous « Services », la RSE sous « À propos ». Le logo sert de lien home.
const desktopNav: (NavItem | NavGroup)[] = [
  { label: "Services", children: [
    { to: "https://niteo.marenostrum.tech/", label: "Incubation", Icon: Rocket, external: true },
    { to: "/education",         label: "Formation professionnelle", Icon: GraduationCap },
    { to: "/expertise",         label: "Conseil",          Icon: Compass        },
  ] },
  { to: "/club",              label: "Réseau",           Icon: Users          },
  { to: "/blog",              label: "Blog",             Icon: BookOpen       },
  { label: "À propos", children: [
    { to: "/a-propos",          label: "À propos",         Icon: Info           },
    { to: "/engagement-rse",    label: "RSE",              Icon: Leaf           },
  ] },
  { to: "/contact",           label: "Contact",          Icon: Mail           },
];

// Mobile : liste à plat, avec "Accueil"
const navLinks: NavItem[] = [
  { to: "/",                  label: "Accueil",          Icon: Home           },
  ...desktopNav.flatMap((g) => ("children" in g ? g.children : [g])),
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [openGroup, setOpenGroup]   = useState<string | null>(null);
  const location = useLocation();
  const panneauRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isMenuOpen, panneauRef);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => { setIsMenuOpen(false); setOpenGroup(null); }, [location.pathname]);

  useEffect(() => {
    if (!openGroup) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenGroup(null); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openGroup]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const isActive = (path: string) => lienActif(location.pathname, path);

  return (
    <>
      {/* Wrapper sticky - transparent, laisse passer les clics sur les zones vides */}
      <header className={`sticky top-0 z-50 w-full h-[5.5rem] md:h-24 px-4 md:px-6 pb-2 pointer-events-none transition-[padding] duration-200 ${scrolled ? "pt-2" : "pt-4"}`}>
        <nav
          aria-label="Navigation principale"
          data-scrolled={scrolled}
          className={`mn-header-surface pointer-events-auto mx-auto flex max-w-7xl items-center justify-between px-3 md:px-5 rounded-2xl ${scrolled ? "h-11 md:h-12" : "h-14 md:h-16"}`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <img
              src={logo}
              alt="Mare Nostrum"
              width={400}
              height={156}
              decoding="async"
              className={`w-auto transition-transform duration-200 motion-reduce:transition-none group-hover:scale-105 ${scrolled ? "h-8 md:h-8" : "h-9 md:h-11"}`}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {desktopNav.map((item) => {
              const linkClass = (active: boolean) => `mn-link-u [--mn-u-inset:0.75rem] [--mn-u-bottom:0.3rem] px-3 py-1.5 text-[15px] font-normal rounded-lg transition-colors duration-200 ${
                active ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground"
              }`;

              if ("children" in item) {
                const open = openGroup === item.label;
                const active = item.children.some((c) => !c.external && isActive(c.to));
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenGroup(item.label)}
                    onMouseLeave={() => setOpenGroup(null)}
                  >
                    <button
                      type="button"
                      className={`${linkClass(active)} inline-flex items-center gap-1`}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenGroup(open ? null : item.label)}
                    >
                      {item.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    {/* pt-2 : pont invisible entre le bouton et le panneau, le survol ne se coupe pas */}
                    <div className={`absolute left-0 top-full pt-2 transition-opacity duration-150 ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
                      <ul className="min-w-[240px] mn-card shadow-[var(--shadow-medium)] p-2">
                        {item.children.map(({ to, label, Icon, external }) => {
                          const cls = `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                            !external && isActive(to) ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground"
                          }`;
                          const content = <><Icon className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />{label}</>;
                          return (
                            <li key={to}>
                              {external
                                ? <a href={to} className={cls} onClick={() => setOpenGroup(null)}>{content}</a>
                                : <Link to={to} className={cls} aria-current={isActive(to) ? "page" : undefined} onClick={() => setOpenGroup(null)}>{content}</Link>}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              }

              const active = !item.external && isActive(item.to);
              return item.external ? (
                <a key={item.to} href={item.to} className={linkClass(active)}>{item.label}</a>
              ) : (
                <Link key={item.to} to={item.to} className={linkClass(active)} aria-current={active ? "page" : undefined}>{item.label}</Link>
              );
            })}
          </div>

          {/* CTA desktop */}
          <div className="hidden md:flex items-center shrink-0">
            {["/education", "/niteo-toulouse"].includes(location.pathname) ? (
              <Button asChild size="sm" className="md:h-9 md:px-4">
                <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="md:h-9 md:px-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/club#offres">Rejoindre le Club</Link>
              </Button>
            )}
          </div>

          {/* Mobile - hamburger */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-[10px] bg-muted/60 active:scale-90 transition-transform duration-150 text-primary"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
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
        ref={panneauRef}
        tabIndex={-1}
        className={`fixed top-0 right-0 bottom-0 z-[70] md:hidden w-[82vw] max-w-[340px]
          bg-background flex flex-col shadow-lift
          transition-[transform,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none
          ${isMenuOpen ? "translate-x-0 visible" : "translate-x-full invisible pointer-events-none"}`}
        aria-modal="true"
        role="dialog"
        aria-label="Menu principal"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <img src={logo} alt="Mare Nostrum" width={400} height={156} className="h-9 w-auto" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-[10px] bg-muted active:scale-90 transition-transform duration-150"
            aria-label="Fermer le menu"
          >
            <X className="h-4.5 w-4.5 text-foreground/70" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Pages du site" className="flex-1 overflow-y-auto px-3 py-3">
          {navLinks.map(({ to, label, Icon, external }) => {
            const active = !external && isActive(to);
            const className = `flex items-center gap-3.5 px-4 py-3.5 rounded-xl mb-1 transition-colors duration-200 active:scale-[0.98] motion-reduce:active:scale-100 ${
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
              <Link key={to} to={to} className={className} aria-current={active ? "page" : undefined}>{content}</Link>
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
            <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/club#offres">Rejoindre le Club</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
