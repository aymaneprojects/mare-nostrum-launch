import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, CheckCircle2, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const LivreBlancEducation = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    etablissement: "",
    fonction: "",
    email: "",
    telephone: "",
    newsletter: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Livre blanc form submitted:", formData);
    
    toast({
      title: "Livre blanc en cours de téléchargement",
      description: "Consultez vos emails pour accéder au document.",
    });

    setFormData({
      prenom: "",
      nom: "",
      etablissement: "",
      fonction: "",
      email: "",
      telephone: "",
      newsletter: false,
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-primary-foreground font-medium">Ressource exclusive</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Téléchargez le Livre Blanc : Pédagogie Entrepreneuriale 2025
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              Découvrez les clés pour intégrer efficacement l'esprit d'entreprendre dans votre établissement, avec des outils, tendances, cas pratiques et benchmarks exclusifs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Left Column - Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Remplissez vos coordonnées pour accéder immédiatement au PDF
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      type="text"
                      required
                      value={formData.prenom}
                      onChange={(e) => handleChange("prenom", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      type="text"
                      required
                      value={formData.nom}
                      onChange={(e) => handleChange("nom", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="etablissement">Établissement / Structure *</Label>
                  <Input
                    id="etablissement"
                    type="text"
                    required
                    value={formData.etablissement}
                    onChange={(e) => handleChange("etablissement", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="fonction">Fonction / Rôle *</Label>
                  <Select value={formData.fonction} onValueChange={(value) => handleChange("fonction", value)} required>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionnez votre fonction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="directeur">Directeur pédagogique</SelectItem>
                      <SelectItem value="enseignant">Enseignant</SelectItem>
                      <SelectItem value="responsable-innovation">Responsable innovation</SelectItem>
                      <SelectItem value="charge-entrepreneuriat">Chargé d'entrepreneuriat</SelectItem>
                      <SelectItem value="direction">Direction générale</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email">Email professionnel *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleChange("telephone", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleChange("newsletter", checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
                    Je souhaite recevoir d'autres ressources liées à l'entrepreneuriat
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Je télécharge mon livre blanc
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Mare Nostrum s'engage à protéger vos données. Vos coordonnées ne seront jamais transmises à des tiers.
                </p>
              </form>
            </div>

            {/* Right Column - Benefits */}
            <div>
              <div className="bg-secondary/30 rounded-lg p-8 mb-8">
                <div className="bg-primary/10 w-20 h-20 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
                  Ce livre blanc vous aidera à :
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Comprendre les enjeux de l'innovation pédagogique en 2025
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Découvrir les outils et méthodes les plus efficaces (fresques, hackathons, parcours hybrides...)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Benchmarker les pratiques des meilleurs acteurs (exemples d'écoles en France et à l'international)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Trouver des partenaires et événements clés dans l'écosystème
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Projeter votre établissement dans une dynamique d'impact et d'entrepreneuriat
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Et pour aller plus loin...
                </h4>
                <p className="text-muted-foreground text-sm">
                  Après le téléchargement, vous recevrez également un message d'introduction personnalisé 
                  avec des liens vers nos ateliers gratuits et des ressources complémentaires pour transformer 
                  votre projet pédagogique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LivreBlancEducation;
