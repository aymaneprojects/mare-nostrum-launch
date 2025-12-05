import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [offresOpen, setOffresOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/engagement-rse", label: "Engagement RSE" },
    { to: "/blog", label: "Blog" },
    { to: "/a-propos", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  const offres = [
    { to: "/education", label: "Offre Éducation", external: false },
    { to: "/croissance", label: "Offre Croissance", external: false },
    { to: "/offre-ia", label: "IA dans ton projet", external: false },
    { to: "https://mastermind-mut.fr/", label: "Mastermind Néo-entrepreneur", external: true },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isOffreActive = offres.some(o => !o.external && location.pathname === o.to);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-border/60 bg-background/98 backdrop-blur-xl shadow-lg"
          : "border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }`}
    >
      <nav className="container mx-auto flex h-14 md:h-16 items-center justify-between px-3 md:px-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src={logo}
            alt="Mare Nostrum"
            className="h-11 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group ${
                isActive(link.to) ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}

          {/* Offres Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group flex items-center gap-1 ${
                  isOffreActive ? "text-primary" : "text-foreground/80"
                }`}
              >
                Offres
                <ChevronDown className="w-4 h-4" />
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isOffreActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {offres.map((offre) =>
                offre.external ? (
                  <DropdownMenuItem key={offre.to} asChild>
                    <a
                      href={offre.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full"
                    >
                      {offre.label}
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem key={offre.to} asChild>
                    <Link to={offre.to}>{offre.label}</Link>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group ${
                isActive(link.to) ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}

          <button className="ml-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-9 px-4 bg-gradient-to-r from-[#6BB5C4] to-[#4A9BAC] text-white hover:from-[#7BC5D4] hover:to-[#5AABBC] transition-all duration-300 shadow-md hover:shadow-xl">
            <Link to="/croissance#offres" className="flex items-center gap-2">
              Rejoignez le Club
            </Link>
          </button>
          <Button asChild size="sm" className="ml-2">
            <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden transition-transform duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/98 backdrop-blur-xl animate-slide-in-right">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block py-3 text-base font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 animate-fade-in ${
                isActive("/") ? "text-primary" : "text-foreground/80"
              }`}
            >
              Accueil
            </Link>

            {/* Mobile Offres Section */}
            <div className="py-2">
              <button
                onClick={() => setOffresOpen(!offresOpen)}
                className={`flex items-center justify-between w-full py-3 text-base font-medium transition-all duration-300 ${
                  isOffreActive ? "text-primary" : "text-foreground/80"
                }`}
              >
                Offres
                <ChevronDown className={`w-5 h-5 transition-transform ${offresOpen ? "rotate-180" : ""}`} />
              </button>
              {offresOpen && (
                <div className="pl-4 space-y-2 border-l-2 border-primary/20 ml-2">
                  {offres.map((offre) =>
                    offre.external ? (
                      <a
                        key={offre.to}
                        href={offre.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between py-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                      >
                        {offre.label}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        key={offre.to}
                        to={offre.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-2 text-sm transition-colors ${
                          isActive(offre.to) ? "text-primary" : "text-foreground/70 hover:text-primary"
                        }`}
                      >
                        {offre.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 text-base font-medium transition-all duration-300 hover:text-primary hover:translate-x-2 animate-fade-in ${
                  isActive(link.to) ? "text-primary" : "text-foreground/80"
                }`}
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}

            <button
              className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-9 px-4 bg-gradient-to-r from-[#6BB5C4] to-[#4A9BAC] text-white hover:from-[#7BC5D4] hover:to-[#5AABBC] transition-all duration-300 shadow-md hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${navLinks.length * 50 + 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/croissance#offres" className="flex items-center gap-2 w-full justify-center">
                Rejoignez le Club
              </Link>
            </button>
            <Button
              asChild
              className="w-full mt-2 animate-fade-in"
              size="sm"
              style={{ animationDelay: `${navLinks.length * 50 + 150}ms` }}
            >
              <Link to="/livre-entrepreneuriat" onClick={() => setIsMenuOpen(false)}>
                Livre Entrepreneuriat
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
