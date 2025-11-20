import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Mentions légales - Mare Nostrum"
        description="Mentions légales de Mare Nostrum - SAS au capital de 10 000 € - RCS Toulouse B 948 134 002"
        noindex={true}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-8">
          <Link 
            to="/" 
            className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Mentions légales</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Mare Nostrum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>SAS au capital de 10 000 €</p>
              <p>RCS Toulouse B 948 134 002</p>
              <p>Code APE 7022Z</p>
              <p>N° TVA : FR14948134002</p>
              <p>Siège social : 22 rue Maurice Fonvieille, 31000 Toulouse, France</p>
              <p>Directeur de la publication : Alain Janicot, <a href="mailto:alain@marenostrum.tech" className="text-primary hover:underline">alain@marenostrum.tech</a></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Hébergement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>Ce site est hébergé par OVH SAS</p>
              <p>2 rue Kellermann – 59100 Roubaix – France</p>
              <p>Conditions d'utilisation du site Internet <a href="https://www.ovhcloud.com/fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ovhcloud.com/fr/</a></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Le site et chacun des éléments, y compris mais sans limitation les marques, les logos, icônes, infographies, photographies, qui le composent sont protégés au titre de la législation internationale de la propriété intellectuelle. Les contenus figurant sur le site sont la propriété de Mare Nostrum ou d'autres entreprises. Toute utilisation, reproduction ou représentation, par quelque procédé que ce soit, et sur quelque support que ce soit, de tout ou partie du site et/ou des éléments qui le composent n'est pas autorisée sans le consentement expresse de Mare Nostrum ; elle constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
              <p>La marque Mare Nostrum est une marque enregistrée, dont le titulaire est la société SAS Mare Nostrum. Toutes les autres marques qui figurent sur le présent site internet sont la propriété de leurs titulaires respectifs.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Données personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>D'une façon générale, vous pouvez visiter notre site sur Internet sans avoir à décliner votre identité et à fournir des informations personnelles vous concernant. Cependant, nous pouvons parfois vous demander des informations. Par exemple, pour établir une correspondance, traiter une commande, fournir un service ou soumettre une candidature à un poste. Nous pouvons compléter ces informations pour conclure une transaction ou offrir un meilleur service.</p>
              <p>Des données personnelles sont collectées lorsque vous utilisez le site internet. Ces données sont utilisées pour vous proposer des contenus adaptés à vos centres d'intérêt et pour améliorer votre expérience utilisateur. La société Mare Nostrum s'engage à protéger les données personnelles de ses utilisateurs.</p>
              <p>Selon la politique de protection des données personnelles de la société, vous pouvez exercer votre droit d'accès, de rectification et d'opposition aux données personnelles en contactant le directeur de publication du site.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Le présent site utilise des cookies. Les cookies sont des fichiers textes qui sont déposés sur votre ordinateur ou votre appareil mobile lorsque vous visitez le site internet. Ils permettent à Mare Nostrum de collecter des informations sur votre navigation et de vous proposer des contenus adaptés à vos centres d'intérêt. Pour en savoir plus, veuillez consulter la politique de cookies disponible par mail auprès du directeur de la publication.</p>
              <p>Vous pouvez paramétrer votre navigateur pour accepter ou refuser les cookies.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Liens hypertextes</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Le présent site peut contenir des liens hypertextes vers d'autres sites. La société Mare Nostrum n'exerce aucun contrôle sur les sites en question et ne saurait être tenue responsable de leur contenu.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Droit applicable</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Les présentes mentions légales sont régies par la loi française.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Litiges</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>Tout litige relatif au présent site sera soumis à la compétence des tribunaux français.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Mise à jour</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>La société Mare Nostrum se réserve le droit de modifier les présentes mentions légales à tout moment.</p>
            </CardContent>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
