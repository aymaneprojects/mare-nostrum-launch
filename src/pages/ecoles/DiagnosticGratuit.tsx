import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, ArrowRight, Clock, Target, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const DiagnosticGratuit = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    schoolType: "",
    studentCount: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        country: "France",
        type: "diagnostic-ecole",
        message: `Diagnostic École - ${formData.organization} (${formData.schoolType}) - ${formData.studentCount} étudiants - Poste: ${formData.position} - Message: ${formData.message}`
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée",
        description: "Nous vous recontacterons sous 48h pour planifier votre diagnostic.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        position: "",
        schoolType: "",
        studentCount: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "Combien de temps dure le diagnostic ?",
      answer: "Le diagnostic dure environ 30 minutes. C'est un échange structuré pour comprendre vos besoins, vos contraintes et vos objectifs en matière d'entrepreneuriat étudiant."
    },
    {
      question: "Que contient le diagnostic ?",
      answer: "Nous analysons votre situation actuelle, identifions les opportunités, et vous proposons des recommandations concrètes adaptées à votre établissement et votre budget."
    },
    {
      question: "Y a-t-il un engagement après le diagnostic ?",
      answer: "Aucun engagement. Le diagnostic est gratuit et sans obligation. Vous recevrez un compte-rendu avec nos recommandations que vous êtes libre de suivre ou non."
    }
  ];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diagnostic Entrepreneuriat École Gratuit",
    "description": "Évaluation gratuite de 30 minutes pour identifier les meilleures opportunités d'intégration de l'entrepreneuriat dans votre établissement.",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Diagnostic Entrepreneuriat École Gratuit | Évaluation 30 min - Mare Nostrum"
        description="Demandez votre diagnostic gratuit de 30 minutes. Identifiez les meilleures opportunités pour intégrer l'entrepreneuriat dans votre établissement. Sans engagement."
        keywords="diagnostic entrepreneuriat école, évaluation programme entrepreneurial, audit pédagogique gratuit, conseil formation entrepreneuriale"
        structuredData={pageSchema}
        faqSchema={faqs}
        breadcrumbSchema={[
          { name: "Accueil", url: "https://marenostrum.tech/" },
          { name: "Écoles", url: "https://marenostrum.tech/ecoles/transformation-entrepreneuriale" },
          { name: "Diagnostic gratuit", url: "https://marenostrum.tech/ecoles/diagnostic-gratuit" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Breadcrumbs
              items={[
                { label: "Écoles", href: "/ecoles/transformation-entrepreneuriale" },
                { label: "Diagnostic gratuit", href: "/ecoles/diagnostic-gratuit" }
              ]}
            />
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 md:mb-6">
              Diagnostic Entrepreneuriat Gratuit
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              30 minutes pour identifier les meilleures opportunités pour votre établissement
            </p>
          </div>
        </div>
      </section>

      {/* Benefits + Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Benefits */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Ce que vous obtiendrez
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Analyse de votre situation</h3>
                    <p className="text-muted-foreground">
                      Nous évaluons vos dispositifs actuels, vos objectifs et vos contraintes pour comprendre votre contexte.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Recommandations personnalisées</h3>
                    <p className="text-muted-foreground">
                      Des propositions concrètes adaptées à votre établissement, votre budget et votre calendrier.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Plan d'action clair</h3>
                    <p className="text-muted-foreground">
                      Un compte-rendu avec les prochaines étapes pour lancer ou renforcer votre programme entrepreneurial.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-secondary/50 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">Durée</p>
                <p className="text-xl font-bold text-foreground mb-4">30 minutes</p>
                <p className="text-sm text-muted-foreground mb-2">Format</p>
                <p className="text-foreground">Visioconférence ou téléphone</p>
              </div>

              <div className="mt-6">
                <Link 
                  to="/ecoles/transformation-entrepreneuriale" 
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Retour aux programmes écoles
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Demander mon diagnostic gratuit
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom complet *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email professionnel *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean.dupont@ecole.fr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Établissement *
                    </label>
                    <Input
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Nom de votre école"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Votre fonction *
                    </label>
                    <Input
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      placeholder="Directeur pédagogique"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type d'établissement *
                    </label>
                    <Select
                      value={formData.schoolType}
                      onValueChange={(value) => setFormData({ ...formData, schoolType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecole-commerce">École de commerce</SelectItem>
                        <SelectItem value="universite">Université</SelectItem>
                        <SelectItem value="ecole-ingenieur">École d'ingénieurs</SelectItem>
                        <SelectItem value="iut">IUT</SelectItem>
                        <SelectItem value="lycee">Lycée</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre d'étudiants concernés
                  </label>
                  <Select
                    value={formData.studentCount}
                    onValueChange={(value) => setFormData({ ...formData, studentCount: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moins-50">Moins de 50</SelectItem>
                      <SelectItem value="50-100">50 - 100</SelectItem>
                      <SelectItem value="100-300">100 - 300</SelectItem>
                      <SelectItem value="300-500">300 - 500</SelectItem>
                      <SelectItem value="plus-500">Plus de 500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Vos objectifs / questions
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez brièvement vos attentes..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : "Demander mon diagnostic gratuit"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez d'être recontacté par Mare Nostrum.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Questions fréquentes"
        faqs={faqs}
      />

      <Footer />
    </div>
  );
};

export default DiagnosticGratuit;
