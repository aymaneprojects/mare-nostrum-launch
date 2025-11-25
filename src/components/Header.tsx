import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navLinks = [{
    to: "/",
    label: "Accueil"
  }, {
    to: "/education",
    label: "Offre Éducation"
  }, {
    to: "/croissance",
    label: "Offre Croissance"
  }, {
    to: "/engagement-rse",
    label: "Engagement RSE"
  }, {
    to: "/a-propos",
    label: "À propos"
  }, {
    to: "/contact",
    label: "Contact"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 md:h-16 items-center justify-between px-3 md:px-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Mare Nostrum" className="h-12 md:h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.to) ? "text-primary" : "text-foreground/80"}`}>
              {link.label}
            </Link>)}
          <button className="ml-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-9 px-4 bg-gradient-to-r from-[#6BB5C4] to-[#4A9BAC] text-white hover:from-[#7BC5D4] hover:to-[#5AABBC] transition-all duration-200 shadow-md hover:shadow-lg">
            <Link to="/croissance#offres" className="flex items-center gap-2">
              Rejoignez le Club
            </Link>
          </button>
          <Button asChild size="sm" className="ml-2">
            <Link to="/livre-entrepreneuriat">Livre Entrepreneuriat</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map(link => <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)} className={`block py-3 text-base font-medium transition-colors hover:text-primary ${isActive(link.to) ? "text-primary" : "text-foreground/80"}`}>
                {link.label}
              </Link>)}
            <button className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-9 px-4 bg-gradient-to-r from-[#6BB5C4] to-[#4A9BAC] text-white hover:from-[#7BC5D4] hover:to-[#5AABBC] transition-all duration-200 shadow-md hover:shadow-lg" onClick={() => setIsMenuOpen(false)}>
              <Link to="/croissance#offres" className="flex items-center gap-2 w-full justify-center">
                Rejoignez le Club
              </Link>
            </button>
            <Button asChild className="w-full mt-2" size="sm">
              <Link to="/livre-entrepreneuriat" onClick={() => setIsMenuOpen(false)}>
                Livre Entrepreneuriat
              </Link>
            </Button>
          </div>
        </div>}
    </header>;
};
export default Header;