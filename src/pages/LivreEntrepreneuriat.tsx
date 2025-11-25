import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Download, GraduationCap, Target, Users, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import livreBlancCover from "@/assets/livre-blanc-cover.png";
const formSchema = z.object({
  firstName: z.string().trim().min(2, {
    message: "Le prénom doit contenir au moins 2 caractères"
  }).max(100),
  lastName: z.string().trim().min(2, {
    message: "Le nom doit contenir au moins 2 caractères"
  }).max(100),
  email: z.string().trim().email({
    message: "Email invalide"
  }).max(255),
  phone: z.string().trim().min(10, {
    message: "Téléphone invalide"
  }).max(20),
  country: z.string().min(1, {
    message: "Pays requis"
  }),
  organization: z.string().trim().min(2, {
    message: "Organisation requise"
  }).max(200),
  position: z.string().trim().min(2, {
    message: "Fonction requise"
  }).max(100),
  schoolType: z.string().min(1, {
    message: "Type d'établissement requis"
  })
});
type FormData = z.infer<typeof formSchema>;
const LivreEntrepreneuriat = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    toast
  } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      organization: "",
      position: "",
      schoolType: ""
    }
  });
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Save to database
      const {
        error: dbError
      } = await supabase.from('livre_blanc_submissions').insert([{
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        country: data.country,
        organization: data.organization,
        position: data.position,
        school_type: data.schoolType
      }]);
      if (dbError) throw dbError;

      // Send email with livre blanc
      const {
        error
      } = await supabase.functions.invoke('send-livre-blanc', {
        body: data
      });
      if (error) throw error;
      setIsSuccess(true);
      toast({
        title: "Livre Blanc envoyé!",
        description: "Consultez votre boîte mail pour télécharger le Livre Blanc."
      });
      form.reset();
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen flex flex-col">
      <SEOHead title="Livre Blanc - Pédagogie Entrepreneuriale 2025" description="Téléchargez notre Livre Blanc sur la Pédagogie Entrepreneuriale 2025. Découvrez les meilleures pratiques pour intégrer l'entrepreneuriat dans votre établissement." keywords="livre blanc, pédagogie entrepreneuriale, éducation, innovation pédagogique, formation entrepreneuriat" />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Form */}
        <section className="relative py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Column - Text Content */}
                <div className="flex flex-col justify-center">
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground lg:text-left text-center">
                    Livre Blanc
                    <span className="block text-primary mt-2">Pédagogie Entrepreneuriale 2025</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-12 lg:text-left text-center">
                    Découvrez les clés pour intégrer l'esprit entrepreneurial dans vos programmes éducatifs
                  </p>
                  <div className="lg:text-left text-center mb-8">
                    <div className="inline-block perspective-1000">
                      <img 
                        src={livreBlancCover} 
                        alt="Couverture du Livre Blanc - Former à l'entrepreneuriat responsable" 
                        className="rounded-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),_8px_0_20px_-5px_rgba(0,0,0,0.2)] w-full max-w-[18rem] transform transition-transform duration-300"
                        style={{
                          boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3), 8px 0 20px -5px rgba(0,0,0,0.2), -2px 0 10px -2px rgba(0,0,0,0.1)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="lg:mt-0">
                  {isSuccess ? <div className="text-center p-12 bg-card rounded-lg border border-border shadow-lg">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                        <Download className="w-10 h-10 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-foreground">Merci!</h2>
                      <p className="text-lg text-muted-foreground mb-2">
                        Le Livre Blanc a été envoyé à votre adresse email.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Consultez votre boîte de réception (et vos spams si besoin).
                      </p>
                    </div> : <div className="bg-card p-8 rounded-lg border border-border shadow-lg">
                      <h2 className="text-2xl font-bold mb-2 text-foreground text-center">
                        Recevez le Livre Blanc par Email
                      </h2>
                      <p className="text-muted-foreground text-center mb-6">
                        Remplissez le formulaire ci-dessous
                      </p>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="firstName" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Prénom *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Jean" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                            <FormField control={form.control} name="lastName" render={({
                          field
                        }) => <FormItem>
                                  <FormLabel>Nom *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Dupont" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>} />
                          </div>

                          <FormField control={form.control} name="email" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="jean.dupont@ecole.fr" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="phone" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Téléphone *</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="06 12 34 56 78" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="country" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Pays *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez votre pays" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="France">France</SelectItem>
                                    <SelectItem value="Maroc">Maroc</SelectItem>
                                    <SelectItem value="Tunisie">Tunisie</SelectItem>
                                    <SelectItem value="Autre">Autre</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="organization" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Établissement *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nom de votre école/université" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="position" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Fonction *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Directeur, Responsable pédagogique..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>} />

                          <FormField control={form.control} name="schoolType" render={({
                        field
                      }) => <FormItem>
                                <FormLabel>Type d'établissement *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="ecole-publique">École publique</SelectItem>
                                    <SelectItem value="ecole-privee">École privée</SelectItem>
                                    <SelectItem value="universite">Université</SelectItem>
                                    <SelectItem value="cfa">CFA</SelectItem>
                                    <SelectItem value="business-school">Business School</SelectItem>
                                    <SelectItem value="autre">Autre</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>} />

                          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Envoi en cours...
                              </> : <>
                                Recevoir le Livre Blanc par Email
                                <Download className="ml-2 h-5 w-5" />
                              </>}
                          </Button>
                        </form>
                      </Form>
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                Ce que vous allez découvrir
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Méthodes Innovantes</h3>
                  <p className="text-muted-foreground">
                    Les approches pédagogiques les plus efficaces pour développer l'esprit entrepreneurial
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Cas Pratiques</h3>
                  <p className="text-muted-foreground">
                    Des exemples concrets d'implémentation dans différents types d'établissements
                  </p>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Résultats Mesurables</h3>
                  <p className="text-muted-foreground">
                    L'impact de la pédagogie entrepreneuriale sur vos étudiants et votre établissement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>;
};
export default LivreEntrepreneuriat;