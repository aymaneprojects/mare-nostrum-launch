import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Users, TrendingUp, Coffee, Network, MessageCircle, Calendar } from "lucide-react";

const RejoindreGroupe = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    entreprise: "",
    secteur: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire Rejoindre Groupe soumis:", formData);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons dans les 48h pour finaliser votre inscription et vous offrir vos 20 jours d'essai.",
    });

    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      entreprise: "",
      secteur: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-mare-turquoise to-mare-turquoise/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🚀 Rejoindre un groupe d'entrepreneurs <br />
              <span className="text-3xl md:text-4xl">(20 jours offerts)</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Arrêtez d'avancer seul. Intégrez une communauté d'entrepreneurs à impact 
              pour partager, apprendre et grandir ensemble.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                Ce que vous obtenez en rejoignant la communauté
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <MessageCircle className="h-12 w-12 text-mare-turquoise mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Canal d'échange privilégié
                  </h3>
                  <p className="text-muted-foreground">
                    Accédez à un groupe WhatsApp/Discord d'entrepreneurs engagés pour échanger au quotidien sur vos défis et opportunités.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <TrendingUp className="h-12 w-12 text-mare-turquoise mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Veille hebdomadaire
                  </h3>
                  <p className="text-muted-foreground">
                    Recevez chaque semaine une sélection d'opportunités business, d'appels à projets, de tendances et d'événements pertinents.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Coffee className="h-12 w-12 text-mare-turquoise mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Café Galère
                  </h3>
                  <p className="text-muted-foreground">
                    30 minutes pour résoudre un blocage concret avec l'aide d'un expert ou d'un pair. Un moment pour débloquer une situation rapidement.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Network className="h-12 w-12 text-mare-turquoise mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Porte d'entrée vers le Mastermind
                  </h3>
                  <p className="text-muted-foreground">
                    Une fois dans la communauté, accédez au programme Mastermind MUT pour un accompagnement structuré en intelligence collective.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Calendar className="h-12 w-12 text-mare-turquoise mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Invitations aux événements
                  </h3>
                  <p className="text-muted-foreground">
                    Participez à nos rencontres, ateliers et événements networking réservés aux membres de la communauté.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Users className="h-12 w-12 text-mare-turquoise mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Réseau de 212 experts
                  </h3>
                  <p className="text-muted-foreground">
                    Bénéficiez de l'accès à notre réseau d'experts mobilisables en France, au Maroc et dans toute la francophonie.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                  Demander à rejoindre la communauté
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Profitez de 20 jours d'essai gratuits pour découvrir la communauté
                </p>
                
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre.email@exemple.fr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone *</Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      placeholder="+33 6 XX XX XX XX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entreprise">Entreprise / Projet *</Label>
                    <Input
                      id="entreprise"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleChange}
                      required
                      placeholder="Nom de votre entreprise ou projet"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secteur">Secteur d'activité *</Label>
                    <Input
                      id="secteur"
                      name="secteur"
                      value={formData.secteur}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Impact social, Tech for good, ESS..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Parlez-nous de votre projet (optionnel)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Dites-nous en quelques mots où vous en êtes et ce que vous recherchez..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    🚀 Envoyer ma demande (20 jours offerts)
                  </Button>

                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Après votre demande, nous vous contacterons sous 48h pour finaliser votre inscription 
                    et vous donner accès à la communauté.
                  </p>
                </form>
              </div>

              {/* Pricing reminder */}
              <div className="mt-8 text-center bg-mare-turquoise/10 border border-mare-turquoise/30 rounded-lg p-6">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Tarif : 24€/mois après la période d'essai
                </p>
                <p className="text-sm text-muted-foreground">
                  Sans engagement • Résiliable à tout moment
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RejoindreGroupe;
