import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Calendar, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons sous 48h maximum.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "",
      message: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              Construisons ensemble votre projet entrepreneurial
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-foreground">Parlons de votre projet</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Que vous soyez une école, une université, un entrepreneur ou un dirigeant d'entreprise à impact, 
                nous sommes là pour vous accompagner.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Nos bureaux</h3>
                    <p className="text-muted-foreground">Toulouse · Paris · Casablanca</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:contact@marenostrum.com" className="text-muted-foreground hover:text-primary transition-colors">
                      contact@marenostrum.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Téléphone</h3>
                    <a href="tel:+33000000000" className="text-muted-foreground hover:text-primary transition-colors">
                      +33 (0)X XX XX XX XX
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Prendre rendez-vous</h3>
                    <p className="text-muted-foreground mb-3">Réservez un créneau directement avec notre équipe</p>
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="outline" size="sm">
                        <a href="https://calendly.com/aymane-marenostrum/30min" target="_blank" rel="noopener noreferrer">
                          <Calendar className="mr-2 h-4 w-4" />
                          RDV avec Aymane
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="https://calendly.com/marenostrumtech/rdv-alexis" target="_blank" rel="noopener noreferrer">
                          <Calendar className="mr-2 h-4 w-4" />
                          RDV avec Alexis
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">💬 On vous répond sous 48h</h3>
                <p className="text-sm text-muted-foreground">
                  Nous nous engageons à répondre à toutes vos demandes dans un délai maximum de 48 heures ouvrées.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Votre nom"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="votre@email.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+33 X XX XX XX XX"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Vous êtes... *</Label>
                  <Select required value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Sélectionnez votre profil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecole">Une école / université</SelectItem>
                      <SelectItem value="entrepreneur">Un entrepreneur / dirigeant</SelectItem>
                      <SelectItem value="etudiant">Un étudiant</SelectItem>
                      <SelectItem value="partenaire">Un partenaire potentiel</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Votre message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Parlez-nous de votre projet, vos besoins, vos objectifs..."
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer le message
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez que Mare Nostrum traite vos données 
                  pour répondre à votre demande.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
