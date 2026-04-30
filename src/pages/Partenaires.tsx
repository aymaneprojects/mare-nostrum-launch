import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";

// ── Partners ──────────────────────────────────────────────────
import partnerToulouseMetropole from "@/assets/partners/toulouse-metropole.png";
import partnerAuf              from "@/assets/partners/auf-niteo.png";
import partnerAirbus           from "@/assets/partners/airbus-dev.png";
import partnerBanqueInnovation from "@/assets/partners/banque-innovation.png";
import partnerBidaya           from "@/assets/partners/bidaya.png";
import partnerCpme31           from "@/assets/partners/cpme31.png";
import partnerCreditMutuel     from "@/assets/partners/credit-mutuel.png";
import partnerEdc              from "@/assets/partners/edc.png";
import partnerEmergingBusiness from "@/assets/partners/emerging-business.png";
import partnerEntreprisesMission from "@/assets/partners/entreprises-mission.png";
import partnerImaginationsFertiles from "@/assets/partners/imaginations-fertiles.png";
import partnerMoovjee          from "@/assets/partners/moovjee.png";
import partnerReseauEntreprendre from "@/assets/partners/reseau-entreprendre.png";
import partnerRoseLab          from "@/assets/partners/rose-lab.png";
import partnerTouleco          from "@/assets/partners/touleco.png";
import partnerToulouseWay      from "@/assets/partners/toulouse-way.png";

// ── Schools ───────────────────────────────────────────────────
import schoolAuf        from "@/assets/schools/auf.png";
import schoolComue      from "@/assets/schools/comue-toulouse.png";
import school3A         from "@/assets/schools/ecole-3a.png";
import schoolEfap       from "@/assets/schools/efap.png";
import schoolEsct       from "@/assets/schools/esct.png";
import schoolIcam       from "@/assets/schools/icam.png";
import schoolIcd        from "@/assets/schools/icd.png";
import schoolIct        from "@/assets/schools/ict.png";
import schoolInpN7      from "@/assets/schools/inp-n7.png";
import schoolIpstCnam   from "@/assets/schools/ipst-cnam.png";
import schoolIscom      from "@/assets/schools/iscom.png";
import schoolIstef      from "@/assets/schools/istef.png";
import schoolNeoma      from "@/assets/schools/neoma.png";
import schoolYnov       from "@/assets/schools/ynov.png";

const PARTNERS = [
  { src: partnerToulouseMetropole, alt: "Toulouse Métropole",                    href: "https://metropole.toulouse.fr/" },
  { src: partnerAuf,               alt: "AUF · Agence Universitaire de la Francophonie", href: "https://www.auf.org/" },
  { src: partnerAirbus,            alt: "Airbus Développement",                  href: "https://www.airbus.com/" },
  { src: partnerBanqueInnovation,  alt: "Banque de l'Innovation by CA31",        href: "https://www.ca-toulouse31.fr/" },
  { src: partnerBidaya,            alt: "Bidaya · Groupe SOS",                   href: "https://www.groupe-sos.org/" },
  { src: partnerCpme31,            alt: "CPME 31 Haute-Garonne",                 href: "https://www.cpme31.fr/" },
  { src: partnerCreditMutuel,      alt: "Crédit Mutuel",                         href: "https://www.creditmutuel.fr/" },
  { src: partnerEdc,               alt: "EDC · Entrepreneurs et Dirigeants Chrétiens", href: "https://www.lesedc.org/" },
  { src: partnerEmergingBusiness,  alt: "Emerging Business Factory",             href: "https://www.emergingbusinessfactory.com/" },
  { src: partnerEntreprisesMission,alt: "Communauté des Entreprises à Mission",  href: "https://entreprisesamission.org/" },
  { src: partnerImaginationsFertiles, alt: "Imaginations Fertiles",              href: "https://www.imaginationsfertiles.fr/" },
  { src: partnerMoovjee,           alt: "Moovjee",                               href: "https://www.moovjee.fr/" },
  { src: partnerReseauEntreprendre,alt: "Réseau Entreprendre",                   href: "https://www.reseau-entreprendre.org/" },
  { src: partnerRoseLab,           alt: "Rose Lab",                              href: "https://roselab.eu/" },
  { src: partnerTouleco,           alt: "Touléco",                               href: "https://www.touleco.fr/" },
  { src: partnerToulouseWay,       alt: "Toulouse Way",                          href: "https://www.toulouseway.org/" },
];

const SCHOOLS = [
  { src: schoolAuf,      alt: "AUF · Agence Universitaire de la Francophonie",   href: "https://www.auf.org/" },
  { src: schoolComue,    alt: "Université Fédérale Toulouse Midi-Pyrénées",       href: "https://www.univ-toulouse.fr/" },
  { src: school3A,       alt: "École 3A",                                         href: "https://www.ecole3a.edu/" },
  { src: schoolEfap,     alt: "EFAP Toulouse",                                    href: "https://www.efap.com/" },
  { src: schoolEsct,     alt: "ESCT Toulouse",                                    href: "https://esct.fr/centres-de-formation/toulouse/" },
  { src: schoolIcam,     alt: "ICAM Toulouse",                                    href: "https://www.icam.fr/" },
  { src: schoolIcd,      alt: "ICD Business School",                              href: "https://www.icd-bs.com/" },
  { src: schoolIct,      alt: "Institut Catholique de Toulouse",                  href: "https://www.ict-toulouse.fr/" },
  { src: schoolInpN7,    alt: "INP-ENSEEIHT Toulouse",                            href: "https://www.enseeiht.fr/" },
  { src: schoolIpstCnam, alt: "IPST-CNAM Toulouse",                               href: "https://ipst.cnam.fr/" },
  { src: schoolIscom,    alt: "ISCOM Toulouse",                                   href: "https://www.iscom.fr/" },
  { src: schoolIstef,    alt: "ISTEF Toulouse",                                   href: "https://www.istef.fr/" },
  { src: schoolNeoma,    alt: "NEOMA Business School",                            href: "https://neoma-bs.com/" },
  { src: schoolYnov,     alt: "Ynov Campus Toulouse",                             href: "https://www.ynov.com/campus/toulouse" },
];

function LogoGrid({ items }: { items: typeof PARTNERS }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      {items.map((p) => (
        <a
          key={p.alt}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          title={p.alt}
          className="flex items-center justify-center h-14 md:h-18 cursor-pointer grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
        >
          <img
            src={p.src}
            alt={p.alt}
            className="max-h-14 md:max-h-16 max-w-[130px] md:max-w-[160px] object-contain"
          />
        </a>
      ))}
    </div>
  );
}

const Partenaires = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <EnhancedSEOHead
      title="Nos Partenaires — Mare Nostrum"
      description="Découvrez l'écosystème de partenaires institutionnels, financiers et académiques qui accompagnent Mare Nostrum dans sa mission d'entrepreneuriat francophone."
      keywords="partenaires mare nostrum, toulouse métropole, AUF, airbus développement, écoles partenaires, entrepreneuriat toulouse"
    />
    <Header />

    {/* Hero */}
    <section
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)" }} />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mn-eyebrow-light mb-4">Écosystème Mare Nostrum</div>
        <h1
          className="font-editorial italic text-4xl md:text-6xl font-semibold text-primary-foreground leading-tight mb-5"
          style={{ letterSpacing: "-0.02em" }}
        >
          Nos partenaires
        </h1>
        <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto leading-relaxed">
          Des institutions, des entreprises et des établissements d'enseignement engagés à nos côtés pour faire grandir l'entrepreneuriat dans la francophonie.
        </p>
      </div>
    </section>

    {/* Section 1 — Partenaires institutionnels & économiques */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mn-eyebrow-turquoise text-center mb-3">Partenaires</div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
            Institutions & acteurs économiques
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Collectivités, réseaux d'entrepreneurs, médias et organismes financiers qui soutiennent notre démarche.
          </p>
          <LogoGrid items={PARTNERS} />
        </div>
      </div>
    </section>

    {/* Divider */}
    <div className="border-t border-border mx-auto w-full max-w-5xl px-4" />

    {/* Section 2 — Établissements d'enseignement */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mn-eyebrow-turquoise text-center mb-3">Établissements partenaires</div>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
            Écoles & universités
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Les établissements d'enseignement supérieur qui nous font confiance pour former la prochaine génération d'entrepreneurs.
          </p>
          <LogoGrid items={SCHOOLS} />
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mn-eyebrow-turquoise mb-3">Rejoindre l'écosystème</div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Vous souhaitez devenir partenaire ?
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Parlons de votre structure et de la façon dont nous pouvons construire ensemble un impact durable sur l'entrepreneuriat francophone.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors duration-200"
          >
            Nous contacter →
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Partenaires;
