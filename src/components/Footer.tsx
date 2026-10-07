import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img
              src={logo}
              alt="Mare Nostrum"
              className="h-12 md:h-14 w-auto mb-4 brightness-0 invert"
            />
            <p className="mn-body text-primary-foreground/75 max-w-sm">
              Cabinet de conseil en entrepreneuriat innovant, inclusif et durable, entre Toulouse, Paris et Casablanca.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mn-eyebrow-turquoise text-[hsl(var(--mn-turquoise))] mb-5">Navigation</h3>
            <ul className="space-y-1 text-[15px]">
              <li>
                <Link to="/" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/expertise" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors">
                  Pôle d'expertise
                </Link>
              </li>
              <li>
                <Link to="/education" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors">
                  Centre de formation
                </Link>
              </li>
              <li>
                <Link to="/club" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors">
                  Offre Club
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors">
                  Équipe
                </Link>
              </li>
              <li>
                <Link to="/contact" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mn-eyebrow-turquoise text-[hsl(var(--mn-turquoise))] mb-5">Contact</h3>
            <ul className="space-y-1 text-[15px]">
              <li className="flex items-center space-x-2.5">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                <span className="text-primary-foreground/75">Toulouse · Paris · Casablanca</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a
                  href="mailto:contact@marenostrum.tech"
                  className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  contact@marenostrum.tech
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a
                  href="tel:+33617358167"
                  className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  +33 6 17 35 81 67
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Linkedin className="h-4 w-4 text-accent shrink-0" />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors"
                  href="https://www.linkedin.com/company/mare-nostrum-education"
                >
                  LinkedIn Éducation
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Linkedin className="h-4 w-4 text-accent shrink-0" />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 text-primary-foreground/75 hover:text-accent transition-colors"
                  href="https://www.linkedin.com/company/marenostrumtech"
                >
                  LinkedIn Croissance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-primary-foreground/15">
          <div className="flex flex-col md:flex-row justify-between items-center text-[13px] xl:text-sm text-primary-foreground/70 gap-3 md:gap-0">
            <p>© 2023-2026 Mare Nostrum SAS. Tous droits réservés. Développé par l'équipe avec 💙.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <Link to="/mentions-legales" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 hover:text-accent transition-colors">
                Mentions légales
              </Link>
              <Link to="/cgu" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 hover:text-accent transition-colors">
                CGU
              </Link>
              <Link to="/confidentialite" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 hover:text-accent transition-colors">
                Politique de confidentialité
              </Link>
              <a href="/sitemap.xml" className="mn-link-u [--mn-u-bottom:0.4rem] inline-block py-2 hover:text-accent transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
