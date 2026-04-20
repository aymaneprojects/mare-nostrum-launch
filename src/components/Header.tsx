import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { to: "/education", label: "Offre Éducation" },
    { to: "/croissance", label: "Offre Club" },
    { to: "/engagement-rse", label: "Engagement RSE" },
    { to: "/blog", label: "Blog" },
    { to: "/a-propos", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-primary/10 shadow-soft"
          : "bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-transparent"
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
        <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-[13px] font-medium transition-colors duration-200 hover:text-primary group ${
                isActive(link.to) ? "text-primary" : "text-foreground/75"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-300 ${
                  isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}

          <Button asChild variant="outline" size="sm" className="ml-3">
            <Link to="/croissance#offres">Rejoindre le Club</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden transition-transform duration-300 hover:scale-110 active:scale-95 text-primary"
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
        <div className="md:hidden border-t border-primary/10 bg-background/98 backdrop-blur-xl animate-slide-in-right">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 text-base font-medium transition-all duration-300 hover:text-primary hover:translate-x-1 animate-fade-in ${
                  isActive(link.to) ? "text-primary" : "text-foreground/80"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/croissance#offres" onClick={() => setIsMenuOpen(false)}>
                  Rejoindre le Club
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link to="/livre-entrepreneuriat" onClick={() => setIsMenuOpen(false)}>
                  Livre Entrepreneuriat
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
