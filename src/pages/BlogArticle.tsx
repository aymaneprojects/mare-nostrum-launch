import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const BlogArticle = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Article à venir - Blog Mare Nostrum"
        description="Cet article sera bientôt disponible sur le blog Mare Nostrum"
        noindex={true}
      />
      <Header />

      <section className="flex-1 flex items-center justify-center py-16 md:py-24 bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Clock className="w-16 h-16 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-ping opacity-20"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Bientôt disponible
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Cet article est en cours de rédaction et sera publié très prochainement.
            </p>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <p className="text-muted-foreground mb-4">
                Notre équipe travaille actuellement sur du contenu de qualité pour vous offrir les meilleures ressources entrepreneuriales.
              </p>
              <p className="text-sm text-muted-foreground">
                Revenez bientôt ou consultez nos autres articles disponibles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Retour au blog
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogArticle;
