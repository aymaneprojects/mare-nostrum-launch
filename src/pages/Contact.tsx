import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Calendar, Send, Loader2, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    type: "",
    message: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        supabase
      } = await import("@/integrations/supabase/client");

      // Save to database
      const {
        error: dbError
      } = await supabase.from('contact_submissions').insert([formData]);
      if (dbError) {
        console.error("Error saving to database:", dbError);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.",
          variant: "destructive"
        });
        return;
      }

      // Send confirmation email
      const {
        error
      } = await supabase.functions.invoke('send-contact-confirmation', {
        body: formData
      });
      if (error) {
        console.error("Error sending confirmation:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
          variant: "destructive"
        });
        return;
      }

      // Send notification to Mare Nostrum team
      await supabase.functions.invoke('send-contact-notification', {
        body: formData
      });

      // Send data to n8n webhook
      try {
        await fetch('https://n8n.srv1174483.hstgr.cloud/webhook/web-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
      }
      
      setIsSuccess(true);
      toast({
        title: "Message envoyé !",
        description: "Un email de confirmation vous a été envoyé. Nous vous répondrons sous 48h maximum."
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        type: "",
        message: ""
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Contact Mare Nostrum - Cabinet Conseil Entrepreneuriat | Toulouse Paris Casablanca" 
        description="Contactez Mare Nostrum pour votre projet entrepreneurial. Bureaux Toulouse +33 6 17 35 81 67, Paris, Casablanca +212 694 995 785. Rendez-vous gratuit. Réponse sous 48h maximum." 
        keywords="contact mare nostrum, rendez-vous conseil, toulouse, paris, casablanca, accompagnement entrepreneuriat, conseil gratuit"
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Contact", url: "https://marenostrum.tech/contact" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Contactez-nous
            </h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90">
              Construisons ensemble votre projet entrepreneurial
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-foreground">Nous contacter</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
                Que vous soyez une école, une université, un entrepreneur ou un dirigeant d'entreprise à impact, 
                nous sommes là pour vous accompagner.
              </p>

              <div className="space-y-6 md:space-y-8 mb-6 md:mb-8">
                {/* Bureau de Toulouse */}
                <div className="border-l-4 border-primary pl-4 md:pl-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm md:text-base">
                    <MapPin className="h-5 w-5 text-primary" />
                    Bureau de Toulouse (France)
                  </h3>
                  <div className="space-y-2">
                    <a href="mailto:contact@marenostrum.tech" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="break-all">contact@marenostrum.tech</span>
                    </a>
                    <a href="tel:+33617358167" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm md:text-base">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      +33 6 17 35 81 67
                    </a>
                  </div>
                </div>

                {/* Bureau de Casablanca */}
                <div className="border-l-4 border-accent pl-4 md:pl-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm md:text-base">
                    <MapPin className="h-5 w-5 text-accent" />
                    Bureau de Casablanca (Maroc)
                  </h3>
                  <div className="space-y-2">
                    <a href="mailto:maroc@marenostrum.tech" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm md:text-base">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="break-all">maroc@marenostrum.tech</span>
                    </a>
                    <a href="tel:+212694995785" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm md:text-base">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      +212 694 995 785
                    </a>
                  </div>
                </div>

                {/* Bureau de Tunis */}
                

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="bg-accent/10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">Prendre rendez-vous</h3>
                    <p className="text-muted-foreground mb-3 text-xs md:text-sm">Réservez un créneau directement avec notre équipe</p>
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="outline" size="sm" className="w-full text-xs md:text-sm">
                        <a href="https://calendly.com/aymane-marenostrum/30min" target="_blank" rel="noopener noreferrer">
                          <Calendar className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                          RDV avec Aymane
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="w-full text-xs md:text-sm">
                        <a href="https://calendly.com/marenostrumtech/rdv-alexis" target="_blank" rel="noopener noreferrer">
                          <Calendar className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                          RDV avec Alexis
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 border border-border rounded-lg p-4 md:p-6">
                <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">On vous répond sous 48h</h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Nous nous engageons à répondre à toutes vos demandes dans un délai maximum de 48 heures ouvrées.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Merci !</h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Votre message a bien été envoyé.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Nous vous répondrons sous 48h maximum. Un email de confirmation vous a été envoyé.
                  </p>
                  <Button onClick={() => setIsSuccess(false)}>
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input id="name" type="text" required value={formData.name} onChange={e => handleChange("name", e.target.value)} placeholder="Votre nom" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required value={formData.email} onChange={e => handleChange("email", e.target.value)} placeholder="votre@email.com" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="+33 X XX XX XX XX" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="country">Pays *</Label>
                  <Select required value={formData.country} onValueChange={value => handleChange("country", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Sélectionnez votre pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Maroc">Maroc</SelectItem>
                      <SelectItem value="Tunisie">Tunisie</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Vous êtes... *</Label>
                  <Select required value={formData.type} onValueChange={value => handleChange("type", value)}>
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
                  <Textarea id="message" required value={formData.message} onChange={e => handleChange("message", e.target.value)} placeholder="Parlez-nous de votre projet, vos besoins, vos objectifs..." rows={6} className="mt-2" />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer le message
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez que Mare Nostrum traite vos données 
                  pour répondre à votre demande.
                </p>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Contact;