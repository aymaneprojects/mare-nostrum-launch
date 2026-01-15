import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, Award, Zap, MessageSquare, Calendar, FileText, CheckCircle2, ArrowRight, Lightbulb, Target, Rocket, UserPlus, Search, Handshake, Star, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { useToast } from "@/hooks/use-toast";
import atelierRose from "@/assets/atelier-rose.png";
import neoEntrepreneurElite from "@/assets/neo-entrepreneur-elite.png";

type LocationType = "toulouse" | "afrique";
type FormType = "cherche-cofondateur" | "rejoindre-projet" | null;

const Croissance = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<LocationType>("toulouse");
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    projectIdea: "",
    lookingFor: "",
    availability: "",
    message: ""
  });

  const croissanceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Co-Founders Lab by Mare Nostrum - Programme Étudiant Entrepreneur",
    "description": "Co-Founders Lab aide les étudiants porteurs de projet à rencontrer leurs co-fondateurs et à former des équipes solides. Programme de matching et d'accompagnement pour créer des startups à impact.",
    "provider": {
      "@type": "Organization",
      "name": "Mare Nostrum",
      "sameAs": "https://marenostrum.tech",
      "address": [{
        "@type": "PostalAddress",
        "addressLocality": "Toulouse",
        "addressRegion": "Occitanie",
        "addressCountry": "FR"
      }, {
        "@type": "PostalAddress",
        "addressLocality": "Paris",
        "addressCountry": "FR"
      }, {
        "@type": "PostalAddress",
        "addressLocality": "Casablanca",
        "addressCountry": "MA"
      }]
    },
    "serviceType": "Programme de Matching Co-Fondateurs Étudiants",
    "category": "Accompagnement Entrepreneurial Étudiant",
    "areaServed": [{
      "@type": "Country",
      "name": "France"
    }, {
      "@type": "Country",
      "name": "Maroc"
    }, {
      "@type": "Country",
      "name": "Tunisie"
    }, {
      "@type": "Country",
      "name": "Sénégal"
    }],
    "audience": {
      "@type": "Audience",
      "audienceType": "Étudiants porteurs de projet, Étudiants cherchant à rejoindre une startup, Jeunes entrepreneurs"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "ratingCount": "47"
    }
  };

  const croissanceFaqs = [{
    question: "Qui peut rejoindre le Co-Founders Lab ?",
    answer: "Le Co-Founders Lab s'adresse à tous les étudiants : ceux qui ont une idée de projet et cherchent des co-fondateurs, et ceux qui veulent rejoindre un projet existant avec leurs compétences (tech, business, design, marketing...)."
  }, {
    question: "Comment fonctionne le matching ?",
    answer: "Après votre inscription, nous analysons votre profil, vos compétences et vos attentes. Nous organisons ensuite des sessions de matching mensuelles où vous rencontrez des profils complémentaires. En moyenne, nos participants trouvent leur équipe en 4 à 6 semaines."
  }, {
    question: "Que se passe-t-il après avoir trouvé mon équipe ?",
    answer: "Une fois votre équipe constituée, vous bénéficiez d'un accompagnement structuré : définition du projet, répartition des rôles, création d'un pitch commun, et accès à notre réseau de mentors et d'investisseurs."
  }, {
    question: "Le programme est-il gratuit pour les étudiants ?",
    answer: "Oui, l'accès au Co-Founders Lab est gratuit pour les étudiants. Nous proposons ensuite des offres d'accompagnement premium (Tremplin, Ascension, Élite) pour ceux qui souhaitent aller plus loin."
  }, {
    question: "Où se déroulent les événements ?",
    answer: "Les sessions de matching se déroulent principalement à Toulouse, Paris et Casablanca, mais nous organisons aussi des événements en ligne pour les étudiants de toute la francophonie."
  }];

  // Success stories data
  const successStories = [
    {
      names: "Sarah & Mehdi",
      project: "EcoTech Solutions",
      story: "Sarah cherchait un développeur, Mehdi un projet à impact environnemental. Ils se sont rencontrés lors d'un atelier Co-Founders Lab et ont lancé EcoTech Solutions, une app de réduction d'empreinte carbone.",
      result: "Levée de 150K en 6 mois",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400"
    },
    {
      names: "Lucas & Amina & Jules",
      project: "MentorUp",
      story: "Trois profils complémentaires : business, tech et design. Réunis lors d'un 'Pitch ton idée', ils ont créé MentorUp, une plateforme de mentorat étudiant.",
      result: "500 utilisateurs en 3 mois",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400"
    },
    {
      names: "Emma & Youssef",
      project: "FoodLoop",
      story: "Emma avait l'idée, Youssef les compétences tech. Leur rencontre chez Mare Nostrum a donné naissance à FoodLoop, une solution anti-gaspillage alimentaire.",
      result: "Incubé chez Station F",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400"
    }
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: "Student Co-Founders Night",
      date: "Chaque 1er jeudi du mois",
      location: "Toulouse & Paris",
      description: "Rencontrez des étudiants entrepreneurs et trouvez vos futurs co-fondateurs"
    },
    {
      title: "Pitch ton idée, trouve ton équipe",
      date: "2 fois par mois",
      location: "En ligne",
      description: "Présentez votre projet en 2 minutes et attirez les talents"
    },
    {
      title: "1 idée = 1 équipe",
      date: "Sessions intensives",
      location: "Toulouse, Paris, Casablanca",
      description: "Workshop d'une journée pour constituer votre équipe projet"
    }
  ];

  useEffect(() => {
    if (location.hash === "#offres") {
      const element = document.getElementById("offres");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
    if (location.hash === "#matching") {
      const element = document.getElementById("matching");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  }, [location]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend
    toast({
      title: "Demande envoyée",
      description: "Nous avons bien reçu votre profil. Notre équipe vous contactera sous 48h pour organiser votre première session de matching.",
    });
    setActiveForm(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      skills: "",
      projectIdea: "",
      lookingFor: "",
      availability: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Co-Founders Lab - Trouve ton co-fondateur étudiant | Mare Nostrum" 
        description="Tu es étudiant et tu veux monter un projet ? Viens trouver ton équipe chez Mare Nostrum. Le Co-Founders Lab aide les étudiants à rencontrer leurs co-fondateurs et former des équipes solides." 
        keywords="co-fondateur étudiant, trouver associé startup, équipe projet étudiant, matching entrepreneur, startup étudiante, créer équipe, toulouse, paris, casablanca" 
        structuredData={croissanceSchema} 
        faqSchema={croissanceFaqs} 
        breadcrumbSchema={[{
          name: "Accueil",
          url: "https://marenostrum.tech/"
        }, {
          name: "Co-Founders Lab",
          url: "https://marenostrum.tech/croissance"
        }]} 
      />
      <Header />

      {/* Hero Section - Nouveau positionnement */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-primary to-primary py-16 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
              <span className="text-primary-foreground font-medium text-sm md:text-base">Co-Founders Lab by Mare Nostrum</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
              Tu es étudiant et tu veux monter un projet ?
            </h1>
            <p className="text-xl md:text-3xl text-primary-foreground/95 mb-4 font-semibold">
              Viens trouver ton équipe chez Mare Nostrum.
            </p>
            <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 md:mb-12 max-w-3xl mx-auto">
              Nous aidons les étudiants porteurs de projet à rencontrer leurs co-fondateurs et à former des équipes solides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-base md:text-lg"
                onClick={() => {
                  setActiveForm("cherche-cofondateur");
                  document.getElementById('matching')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Search className="mr-2 h-5 w-5" />
                Je cherche un co-fondateur
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => {
                  setActiveForm("rejoindre-projet");
                  document.getElementById('matching')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Je veux rejoindre un projet
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      </section>

      {/* Programme Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-3 md:mb-4 text-foreground">
            Le Co-Founders Lab, c'est quoi ?
          </h2>
          <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto text-sm md:text-base">
            Un programme structuré pour passer de l'idée à l'équipe en quelques semaines
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground text-lg">1. Ton profil</h3>
              <p className="text-sm text-muted-foreground">Inscris-toi et décris tes compétences, ton idée ou le type de projet que tu cherches</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Handshake className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground text-lg">2. Le matching</h3>
              <p className="text-sm text-muted-foreground">Participe à nos sessions mensuelles et rencontre des profils complémentaires</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground text-lg">3. Ton équipe</h3>
              <p className="text-sm text-muted-foreground">Forme ton équipe projet avec des co-fondateurs motivés et complémentaires</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Rocket className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground text-lg">4. Le lancement</h3>
              <p className="text-sm text-muted-foreground">Structure ton projet, crée ton pitch et accède à notre réseau de mentors</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full font-semibold">
              <Award className="h-5 w-5" />
              En moyenne, nos participants trouvent leur équipe en 4 à 6 semaines
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Ils se sont rencontrés chez Mare Nostrum
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Des rencontres qui ont donné naissance à des projets concrets
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <img src={story.image} alt={story.project} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-accent fill-accent" />
                    <span className="text-sm font-semibold text-accent">{story.result}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{story.names}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{story.project}</p>
                  <p className="text-sm text-muted-foreground">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Matching Section */}
      <section id="matching" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Prêt à trouver ton équipe ?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Choisis ton profil et inscris-toi pour la prochaine session de matching
          </p>

          {/* CTA Buttons */}
          {!activeForm && (
            <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto mb-12">
              <button
                onClick={() => setActiveForm("cherche-cofondateur")}
                className="flex-1 bg-gradient-to-br from-primary to-accent p-8 rounded-2xl text-white hover:shadow-2xl transition-all hover:-translate-y-1 text-left"
              >
                <Search className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Je cherche un co-fondateur</h3>
                <p className="opacity-90">J'ai une idée de projet et je cherche des associés pour la réaliser</p>
              </button>

              <button
                onClick={() => setActiveForm("rejoindre-projet")}
                className="flex-1 bg-gradient-to-br from-accent to-primary p-8 rounded-2xl text-white hover:shadow-2xl transition-all hover:-translate-y-1 text-left"
              >
                <UserPlus className="h-12 w-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Je veux rejoindre un projet</h3>
                <p className="opacity-90">J'ai des compétences à apporter et je cherche un projet à impact</p>
              </button>
            </div>
          )}

          {/* Form - Je cherche un co-fondateur */}
          {activeForm === "cherche-cofondateur" && (
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Je cherche un co-fondateur</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveForm(null)}>
                  Retour
                </Button>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Prénom et Nom</Label>
                    <Input 
                      id="name" 
                      placeholder="Ton nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ton@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone (optionnel)</Label>
                  <Input 
                    id="phone" 
                    placeholder="+33 6 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="projectIdea">Décris ton idée de projet</Label>
                  <Textarea 
                    id="projectIdea" 
                    placeholder="Quel problème veux-tu résoudre ? Quelle est ta vision ?"
                    value={formData.projectIdea}
                    onChange={(e) => setFormData({...formData, projectIdea: e.target.value})}
                    required
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="lookingFor">Quel profil recherches-tu ?</Label>
                  <Select onValueChange={(value) => setFormData({...formData, lookingFor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionne le profil recherché" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Développeur / Tech</SelectItem>
                      <SelectItem value="business">Business / Commercial</SelectItem>
                      <SelectItem value="design">Designer / UX-UI</SelectItem>
                      <SelectItem value="marketing">Marketing / Communication</SelectItem>
                      <SelectItem value="operations">Opérations / Logistique</SelectItem>
                      <SelectItem value="multiple">Plusieurs profils</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="availability">Disponibilité</Label>
                  <Select onValueChange={(value) => setFormData({...formData, availability: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ta disponibilité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Temps plein</SelectItem>
                      <SelectItem value="parttime">Temps partiel (10-20h/semaine)</SelectItem>
                      <SelectItem value="weekends">Week-ends uniquement</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Rocket className="mr-2 h-5 w-5" />
                  Rejoindre le Co-Founders Lab
                </Button>
              </form>
            </div>
          )}

          {/* Form - Je veux rejoindre un projet */}
          {activeForm === "rejoindre-projet" && (
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Je veux rejoindre un projet</h3>
                <Button variant="ghost" size="sm" onClick={() => setActiveForm(null)}>
                  Retour
                </Button>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name2">Prénom et Nom</Label>
                    <Input 
                      id="name2" 
                      placeholder="Ton nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email2">Email</Label>
                    <Input 
                      id="email2" 
                      type="email" 
                      placeholder="ton@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone2">Téléphone (optionnel)</Label>
                  <Input 
                    id="phone2" 
                    placeholder="+33 6 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Quelles sont tes compétences ?</Label>
                  <Select onValueChange={(value) => setFormData({...formData, skills: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ton domaine principal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dev-frontend">Développement Frontend</SelectItem>
                      <SelectItem value="dev-backend">Développement Backend</SelectItem>
                      <SelectItem value="dev-fullstack">Développement Fullstack</SelectItem>
                      <SelectItem value="dev-mobile">Développement Mobile</SelectItem>
                      <SelectItem value="data">Data Science / IA</SelectItem>
                      <SelectItem value="design-ui">Design UI/UX</SelectItem>
                      <SelectItem value="design-graphic">Design Graphique</SelectItem>
                      <SelectItem value="marketing-digital">Marketing Digital</SelectItem>
                      <SelectItem value="marketing-content">Content / Rédaction</SelectItem>
                      <SelectItem value="business-sales">Commercial / Ventes</SelectItem>
                      <SelectItem value="business-strategy">Stratégie / Business Dev</SelectItem>
                      <SelectItem value="finance">Finance / Compta</SelectItem>
                      <SelectItem value="operations">Opérations / Logistique</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interests">Quel type de projet t'intéresse ?</Label>
                  <Textarea 
                    id="interests" 
                    placeholder="Impact social, environnement, tech, santé, éducation..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="availability2">Disponibilité</Label>
                  <Select onValueChange={(value) => setFormData({...formData, availability: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ta disponibilité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Temps plein</SelectItem>
                      <SelectItem value="parttime">Temps partiel (10-20h/semaine)</SelectItem>
                      <SelectItem value="weekends">Week-ends uniquement</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Users className="mr-2 h-5 w-5" />
                  Trouver mon projet
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos événements de matching
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Des formats conçus pour te faire rencontrer tes futurs associés
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white">
                  <Calendar className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-accent mb-2">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Target className="h-4 w-4" />
                  {event.location}
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/contact">
                <Calendar className="mr-2 h-5 w-5" />
                S'inscrire au prochain événement
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Offers Section - Kept for existing customers */}
      <section id="offres" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Aller plus loin avec nos offres
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Une fois ton équipe constituée, accélère ton projet avec nos programmes d'accompagnement
          </p>

          {/* Location Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <Button variant={selectedLocation === "toulouse" ? "default" : "outline"} onClick={() => setSelectedLocation("toulouse")} size="lg">
              Toulouse
            </Button>
            <Button variant={selectedLocation === "afrique" ? "default" : "outline"} onClick={() => setSelectedLocation("afrique")} size="lg">
              Afrique
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tremplin */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Tremplin</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "toulouse" && "30€"}
                  {selectedLocation === "afrique" && "24€"}
                  <span className="text-lg font-normal text-muted-foreground">/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès au club international d'entrepreneurs francophones</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès aux opportunités : détection d'opportunités de business et de financement</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Café galère: 20 minutes pour résoudre un problème avec un membre de l'équipe</span>
                </li>
              </ul>

              <Button asChild className="w-full">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/00w3cx3W2bDr5Me6MO67S08" : "https://buy.stripe.com/dRmaEZ78e4aZ3E61su67S04"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Tremplin
                </a>
              </Button>
            </div>

            {/* Ascension - Highlighted */}
            <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground border-2 border-accent rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 relative flex flex-col">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Recommandé
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Ascension</h3>
                <div className="text-4xl font-bold mb-2">
                  {selectedLocation === "toulouse" && "100€"}
                  {selectedLocation === "afrique" && "84€"}
                  <span className="text-lg font-normal opacity-80">/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95"><strong>Tout de Tremplin</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Visibilité de votre projet via nos réseaux, partenaires et événements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Génération supervisée par IA d'un livrable</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm opacity-95">Accès aux masterclass mensuelles</span>
                </li>
              </ul>

              <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/28E7sNakqcHvgqSdbc67S09" : "https://buy.stripe.com/28EbJ32RY4aZa2u6MO67S06"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Ascension
                </a>
              </Button>
            </div>

            {/* Élite */}
            <div className="bg-card border-2 border-border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Élite</h3>
                <div className="text-4xl font-bold text-primary mb-2">
                  {selectedLocation === "toulouse" && "190€"}
                  {selectedLocation === "afrique" && "184€"}
                  <span className="text-lg font-normal text-muted-foreground">/mois</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground"><strong>Tout d'Ascension</strong></span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">6 journées business développement et 5 webinaires/masterclasses par an</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Accès à la plateforme de formation en ligne</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Priorité 1 sur toutes les demandes</span>
                </li>
              </ul>

              <Button asChild variant="default" className="w-full">
                <a href={selectedLocation === "toulouse" ? "https://buy.stripe.com/bJe5kF64a0YNgqS4EG67S0a" : "https://buy.stripe.com/6oUaEZ8cidLzeiK9Z067S07"} target="_blank" rel="noopener noreferrer">
                  Rejoindre Élite
                </a>
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Pas sûr de quelle offre choisir ?</p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                Parler à Mare Nostrum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Ce qu'ils disent du Co-Founders Lab
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard 
              text="Grâce au Co-Founders Lab, j'ai trouvé mon associé technique en seulement 3 semaines. On partage la même vision et on avance à fond sur notre projet." 
              author="Théo" 
              role="Porteur de projet EdTech" 
              organization="Étudiant INSA Toulouse" 
            />
            <TestimonialCard 
              text="Je cherchais un projet à impact qui me corresponde. Les sessions de matching m'ont permis de rencontrer une équipe géniale sur un projet environnemental." 
              author="Fatima" 
              role="Développeuse rejoignant un projet" 
              organization="Étudiante Epitech" 
            />
            <TestimonialCard 
              text="Le format 'Pitch ton idée' est super efficace. En 2 minutes, tu présentes ton projet et tu vois tout de suite qui est intéressé pour te rejoindre." 
              author="Antoine" 
              role="Co-fondateur HealthTech" 
              organization="Alumni HEC" 
            />
          </div>
        </div>
      </section>

      {/* Photos Ateliers Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            En images
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Nos sessions de matching et ateliers en action
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <img src={atelierRose} alt="Session de matching Co-Founders Lab" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">Sessions de matching</h3>
                  <p className="text-sm">Rencontres entre porteurs de projet et talents</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <img src={neoEntrepreneurElite} alt="Pitch ton idée événement Co-Founders Lab" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-2">Pitch ton idée</h3>
                  <p className="text-sm">Présente ton projet et attire tes futurs co-fondateurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection title="Questions fréquentes sur le Co-Founders Lab" faqs={croissanceFaqs} />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-accent via-primary to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Prêt à trouver ton équipe ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Rejoins le Co-Founders Lab et rencontre tes futurs associés
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg"
              onClick={() => {
                setActiveForm("cherche-cofondateur");
                document.getElementById('matching')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search className="mr-2 h-5 w-5" />
              Je cherche un co-fondateur
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg bg-white/10 border-white text-white hover:bg-white hover:text-primary"
              onClick={() => {
                setActiveForm("rejoindre-projet");
                document.getElementById('matching')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Je veux rejoindre un projet
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Croissance;
