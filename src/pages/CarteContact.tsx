import { useParams, Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, Linkedin, MapPin, Download, Share2, Users, ArrowLeft, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import StructuredData from "@/components/StructuredData";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  getMember, getPortrait, fullName, initials, cardUrl, vcardPath, qrPath,
  formatPhone, telHref, whatsappHref, SITE_URL, TEAM_VCARD_PATH,
} from "@/data/team";

const BUREAU_ADDRESS: Record<string, string> = {
  Toulouse: "22 rue Maurice Fonvieille, 31000 Toulouse",
  Paris: "Paris, France",
  Casablanca: "Casablanca, Maroc",
};

const CarteContact = () => {
  const { slug = "" } = useParams();
  const member = getMember(slug);
  const { toast } = useToast();

  if (!member) return <NotFound />;

  const name = fullName(member);
  const url = cardUrl(member);
  const portrait = getPortrait(member.photo);

  const share = async () => {
    const payload = { title: `${name} — Mare Nostrum`, text: `${name}, ${member.titre} chez Mare Nostrum`, url };
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share(payload); } catch { /* annulé par l'utilisateur */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Lien copié", description: url });
    } catch {
      toast({ title: "Lien de la fiche", description: url });
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    givenName: member.prenom,
    familyName: member.nom,
    jobTitle: member.titre,
    url,
    ...(member.email ? { email: member.email } : {}),
    ...(member.telephone ? { telephone: member.telephone } : {}),
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
    ...(portrait ? { image: `${SITE_URL}${portrait}` } : {}),
    worksFor: { "@type": "Organization", name: "Mare Nostrum", url: SITE_URL },
    workLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: member.bureau } },
  };

  const quickActions = [
    member.telephone && { label: "Appeler", Icon: Phone, href: telHref(member.telephone) },
    member.whatsapp && { label: "WhatsApp", Icon: MessageCircle, href: whatsappHref(member.whatsapp), external: true },
    member.email && { label: "E-mail", Icon: Mail, href: `mailto:${member.email}` },
    member.linkedin && { label: "LinkedIn", Icon: Linkedin, href: member.linkedin, external: true },
  ].filter(Boolean) as { label: string; Icon: typeof Phone; href: string; external?: boolean }[];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedSEOHead
        title={`${name} — ${member.titre} | Mare Nostrum`}
        description={`Fiche contact de ${name}, ${member.titre} chez Mare Nostrum à ${member.bureau}. Ajoutez ses coordonnées à vos contacts en un geste, sur iPhone comme sur Android.`}
        keywords={`${name}, Mare Nostrum, ${member.titre}, contact, carte de visite`}
      />
      <StructuredData data={personSchema} />
      <Header />

      <main className="flex-1">
        {/* Bandeau sombre — pattern hero du design system */}
        <section
          className="relative overflow-hidden pt-10 pb-24 md:pt-14 md:pb-28"
          style={{ background: "linear-gradient(135deg, hsl(222 44% 25%) 0%, hsl(228 56% 13%) 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 22px, hsl(181 67% 54% / 0.055) 22px 23px)" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 22% 18%, hsl(181 67% 54% / 0.18) 0%, transparent 52%), radial-gradient(ellipse at 80% 85%, hsl(228 56% 8% / 0.65) 0%, transparent 55%)" }} />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <Link to="/equipe" className="inline-flex items-center gap-1.5 text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-6">
              <ArrowLeft className="h-3.5 w-3.5" />
              Toute l'équipe
            </Link>

            <Avatar className="w-28 h-28 md:w-36 md:h-36 mx-auto ring-4 ring-accent/70 shadow-lg">
              {portrait && <AvatarImage src={portrait} alt={name} className="object-cover" />}
              <AvatarFallback className="text-2xl md:text-3xl bg-primary text-primary-foreground">{initials(member)}</AvatarFallback>
            </Avatar>

            <div className="mn-eyebrow-light mt-6 mb-2">Mare Nostrum</div>
            <h1
              className="font-editorial italic text-3xl md:text-5xl font-semibold text-primary-foreground leading-[1.05]"
              style={{ letterSpacing: "-0.02em", textWrap: "balance" } as React.CSSProperties}
            >
              {name}
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/80 mt-3">{member.titre}</p>
            <p className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/60 mt-2">
              <MapPin className="h-3.5 w-3.5" />
              {member.bureau}
            </p>
          </div>
        </section>

        {/* Carte — chevauche le bandeau */}
        <section className="container mx-auto px-4 -mt-14 md:-mt-16 relative z-10 pb-16 md:pb-24">
          <div className="max-w-lg mx-auto bg-card border border-border rounded-lg shadow-lg p-5 md:p-7 space-y-6">
            <div>
              {/* Pas d'attribut download : iOS ouvre alors la fiche contact directement. */}
              <Button asChild size="lg" className="w-full h-12 text-base">
                <a href={vcardPath(member)}>
                  <Download className="mr-2 h-5 w-5" />
                  Ajouter à mes contacts
                </a>
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                iPhone, Android, Outlook — la fiche s'ouvre dans votre application Contacts.
              </p>
            </div>

            {quickActions.length > 0 && (
              <div className={`grid gap-2 ${quickActions.length >= 4 ? "grid-cols-4" : quickActions.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {quickActions.map(({ label, Icon, href, external }) => (
                  <Button key={label} asChild variant="outline" className="h-auto py-3 flex-col gap-1.5">
                    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={`${label} ${name}`}>
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{label}</span>
                    </a>
                  </Button>
                ))}
              </div>
            )}

            <dl className="divide-y divide-border text-sm">
              {member.telephone && (
                <div className="flex items-start gap-3 py-3">
                  <dt className="w-24 shrink-0 text-muted-foreground">Mobile</dt>
                  <dd><a href={telHref(member.telephone)} className="text-foreground hover:text-primary transition-colors">{formatPhone(member.telephone)}</a></dd>
                </div>
              )}
              {member.email && (
                <div className="flex items-start gap-3 py-3">
                  <dt className="w-24 shrink-0 text-muted-foreground">E-mail</dt>
                  <dd className="break-all"><a href={`mailto:${member.email}`} className="text-foreground hover:text-primary transition-colors">{member.email}</a></dd>
                </div>
              )}
              {member.linkedin && (
                <div className="flex items-start gap-3 py-3">
                  <dt className="w-24 shrink-0 text-muted-foreground">LinkedIn</dt>
                  <dd className="break-all"><a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">{member.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</a></dd>
                </div>
              )}
              <div className="flex items-start gap-3 py-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Bureau</dt>
                <dd className="text-foreground">{BUREAU_ADDRESS[member.bureau] ?? member.bureau}</dd>
              </div>
              <div className="flex items-start gap-3 py-3">
                <dt className="w-24 shrink-0 text-muted-foreground">Site</dt>
                <dd><a href={SITE_URL} className="inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"><Globe className="h-3.5 w-3.5" />marenostrum.tech</a></dd>
              </div>
            </dl>

            {member.bio && <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>}

            <Button variant="outline" className="w-full" onClick={share}>
              <Share2 className="mr-2 h-4 w-4" />
              Partager cette fiche
            </Button>
          </div>

          {/* QR — à montrer sur son propre écran ou à imprimer */}
          <div className="max-w-lg mx-auto mt-6 bg-card border border-border rounded-lg p-5 md:p-7 text-center">
            <div className="mn-eyebrow mb-4">Mon QR code</div>
            <img
              src={qrPath(member)}
              alt={`QR code vers la fiche contact de ${name}`}
              width={200}
              height={200}
              className="mx-auto rounded-sm"
            />
            <p className="text-sm text-muted-foreground mt-4">
              À scanner avec l'appareil photo du téléphone : la fiche s'ouvre, le contact s'enregistre.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
              <Button asChild variant="outline" size="sm">
                <a href={qrPath(member, "png")} download={`qr-${member.slug}.png`}>Télécharger en PNG</a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={qrPath(member, "svg")} download={`qr-${member.slug}.svg`}>SVG pour impression</a>
              </Button>
            </div>
          </div>

          <div className="max-w-lg mx-auto mt-6 text-center space-y-3">
            <Button asChild variant="ghost">
              <a href={TEAM_VCARD_PATH}>
                <Users className="mr-2 h-4 w-4" />
                Enregistrer toute l'équipe Mare Nostrum
              </a>
            </Button>
            <div>
              <Link to="/equipe" className="text-sm text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                Voir toute l'équipe
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarteContact;
