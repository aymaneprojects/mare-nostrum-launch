import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img src={logo} alt="Mare Nostrum" className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/80 max-w-md">
              Cabinet de conseil en entrepreneuriat innovant, inclusif et durable, entre Toulouse, Paris et Casablanca.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Offre Éducation
                </Link>
              </li>
              <li>
                <Link to="/croissance" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Offre Croissance
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-primary-foreground/80">Toulouse · Paris · Casablanca</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@marenostrum.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  contact@marenostrum.tech



                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" href="">
                  +212 6 94 99 57 85 
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Linkedin className="h-4 w-4" />
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Mare Nostrum. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="hover:text-primary-foreground/80 transition-colors">
                Mentions légales
              </Link>
              <Link to="/cgu" className="hover:text-primary-foreground/80 transition-colors">
                CGU
              </Link>
              <Link to="/confidentialite" className="hover:text-primary-foreground/80 transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;