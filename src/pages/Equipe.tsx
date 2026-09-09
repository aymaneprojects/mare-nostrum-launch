import { Link } from "react-router-dom";
import { ArrowRight, Download, MapPin, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  team, getPortrait, fullName, initials, canonicalUrl, vcardPath,
  SITE_URL, TEAM_VCARD_PATH, TEAM_QR_PATH,
} from "@/data/team";

const Equipe = () => {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Équipe Mare Nostrum",
    itemListElement: team.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: fullName(m),
        jobTitle: m.titre,
        url: canonicalUrl(m),
        worksFor: { "@type": "Organization", name: "Mare Nostrum", url: SITE_URL },
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <EnhancedSEOHead
        title="L'équipe Mare Nostrum — Contacts et fiches"
        description="Les visages de Mare Nostrum à Toulouse, Paris et Casablanca. Ouvrez une fiche, ajoutez le contact à votre téléphone en un geste."
        keywords="équipe Mare Nostrum, contacts, Alexis Janicot, Aymane Abdennour, carte de visite digitale"
      />
      <StructuredData data={listSchema} />
      <Header />

      <main className="flex-1">
        <PageHero
          eyebrow="Les visages de Mare Nostrum"
          title="Notre équipe"
          subtitle="Une fiche par personne, un contact enregistré en un geste — sur iPhone comme sur Android."
          size="sm"
          ctas={
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <a href={TEAM_VCARD_PATH}>
                <Users className="mr-2 h-5 w-5" />
                Enregistrer toute l'équipe
              </a>
            </Button>
          }
        />

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
              {team.map((m) => {
                const name = fullName(m);
                const portrait = getPortrait(m.photo);
                return (
                  <article key={m.slug} className="mn-card card-interactive hover-lift p-5 md:p-6 flex flex-col">
                    <Link to={`/equipe/${m.slug}`} className="flex flex-col items-center text-center flex-1">
                      <Avatar className="w-24 h-24 md:w-28 md:h-28 mb-4 ring-2 ring-border">
                        {portrait && <AvatarImage src={portrait} alt={name} className="object-cover" />}
                        <AvatarFallback className="text-xl bg-primary text-primary-foreground">{initials(m)}</AvatarFallback>
                      </Avatar>
                      <h2 className="text-lg md:text-xl font-bold text-foreground">{name}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{m.titre}</p>
                      <p className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <MapPin className="h-3 w-3" />
                        {m.bureau}
                      </p>
                    </Link>
                    <div className="grid grid-cols-2 gap-2 mt-5">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/equipe/${m.slug}`}>
                          Voir la fiche
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <a href={vcardPath(m)} aria-label={`Ajouter ${name} à mes contacts`}>
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Ajouter
                        </a>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto bg-card border border-border rounded-lg p-6 md:p-8 text-center">
              <div className="mn-eyebrow mb-4">QR code de l'équipe</div>
              <img src={TEAM_QR_PATH} alt="QR code vers la page équipe de Mare Nostrum" width={180} height={180} className="mx-auto rounded-sm" />
              <p className="text-sm text-muted-foreground mt-4">
                À afficher sur un stand ou un support : un scan ouvre cette page, et chaque contact s'ajoute en un geste.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <a href="/qr/equipe.svg" download="qr-equipe-marenostrum.svg">SVG pour impression</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Equipe;
