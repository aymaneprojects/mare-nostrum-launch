import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Lightbulb, Award, Users, Rocket } from "lucide-react";

const LivreBlancEducation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    etablissement: "",
    fonction: "",
    email: "",
    telephone: "",
    newsletter: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire Livre Blanc soumis:", formData);
    
    toast({
      title: "Merci !",
      description: "Votre livre blanc vous sera envoyé par email dans quelques instants.",
    });

    // Réinitialiser le formulaire
    setFormData({
      nom: "",
      prenom: "",
      etablissement: "",
      fonction: "",
      email: "",
      telephone: "",
      newsletter: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-mare-blue to-mare-blue/90 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              📘 Téléchargez le Livre Blanc : <br />« Pédagogie Entrepreneuriale 2025 »
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Découvrez les clés pour intégrer efficacement l'esprit d'entreprendre dans votre établissement, 
              avec des outils, tendances, cas pratiques et benchmarks exclusifs.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Formulaire */}
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Remplissez vos coordonnées pour accéder immédiatement au PDF
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        placeholder="Votre prénom"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="etablissement">Établissement / Structure *</Label>
                    <Input
                      id="etablissement"
                      name="etablissement"
                      value={formData.etablissement}
                      onChange={handleChange}
                      required
                      placeholder="Nom de votre établissement"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fonction">Fonction / Rôle *</Label>
                    <Input
                      id="fonction"
                      name="fonction"
                      value={formData.fonction}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Directeur pédagogique, Enseignant..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre.email@etablissement.fr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone (optionnel)</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+33 6 XX XX XX XX"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, newsletter: checked as boolean }))
                      }
                    />
                    <Label htmlFor="newsletter" className="text-sm cursor-pointer leading-tight">
                      Je souhaite recevoir d'autres ressources liées à l'entrepreneuriat
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    🟦 Je télécharge mon livre blanc
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Mare Nostrum s'engage à protéger vos données. Vos coordonnées ne seront jamais transmises à des tiers.
                  </p>
                </form>
              </div>

              {/* Contenu à droite */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-mare-blue/10 to-mare-turquoise/10 border border-mare-turquoise/30 rounded-lg p-8">
                  <div className="bg-white border-2 border-border rounded-lg p-6 mb-6 text-center shadow-md">
                    <BookOpen className="h-24 w-24 mx-auto text-mare-blue mb-4" />
                    <h3 className="text-xl font-bold text-mare-blue">
                      Pédagogie Entrepreneuriale 2025
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Guide complet • 10-15 pages • PDF
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Ce livre blanc vous aidera à :
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-6 w-6 text-mare-turquoise flex-shrink-0 mt-1" />
                      <p className="text-foreground">
                        Comprendre les <strong>enjeux de l'innovation pédagogique en 2025</strong>
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Award className="h-6 w-6 text-mare-turquoise flex-shrink-0 mt-1" />
                      <p className="text-foreground">
                        Découvrir les <strong>outils et méthodes les plus efficaces</strong> (fresques, hackathons, parcours hybrides…)
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-mare-turquoise flex-shrink-0 mt-1" />
                      <p className="text-foreground">
                        <strong>Benchmarker les pratiques des meilleurs acteurs</strong> (exemples d'écoles en France et à l'international)
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-mare-turquoise flex-shrink-0 mt-1" />
                      <p className="text-foreground">
                        Trouver des <strong>partenaires et événements clés</strong> dans l'écosystème
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <Rocket className="h-6 w-6 text-mare-turquoise flex-shrink-0 mt-1" />
                      <p className="text-foreground">
                        Projeter votre établissement dans une <strong>dynamique d'impact et d'entrepreneuriat</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LivreBlancEducation;
