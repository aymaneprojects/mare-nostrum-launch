import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";

// Interface pour les articles (structure prête pour Strapi)
interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  slug: string;
  image?: string;
}

// Articles sur l'entrepreneuriat étudiant
const placeholderArticles: BlogArticle[] = [
  {
    id: "1",
    title: "Comment créer son entreprise en étant étudiant",
    excerpt: "Guide complet pour lancer votre projet entrepreneurial pendant vos études : démarches, aides financières et gestion du temps.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-20",
    category: "Entrepreneuriat Étudiant",
    slug: "creer-entreprise-etudiant",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  },
  {
    id: "2",
    title: "Les statuts juridiques adaptés aux étudiants entrepreneurs",
    excerpt: "Micro-entreprise, SASU, association : quel statut choisir quand on est étudiant ? Comparatif et conseils pratiques.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-18",
    category: "Entrepreneuriat Étudiant",
    slug: "statuts-juridiques-etudiants",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
  },
  {
    id: "3",
    title: "Financer son projet étudiant : aides et concours",
    excerpt: "Découvrez les dispositifs de financement pour étudiants entrepreneurs : PÉPITE, concours, bourses et subventions disponibles.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-15",
    category: "Financement",
    slug: "financer-projet-etudiant",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
  },
  {
    id: "4",
    title: "Concilier études et entrepreneuriat : nos meilleurs conseils",
    excerpt: "Comment gérer son temps efficacement entre cours, examens et développement de son entreprise. Témoignages et stratégies.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-12",
    category: "Entrepreneuriat Étudiant",
    slug: "concilier-etudes-entrepreneuriat",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
  },
  {
    id: "5",
    title: "Le statut national étudiant-entrepreneur expliqué",
    excerpt: "Tout savoir sur le SNEE : avantages, démarches d'inscription, accompagnement et témoignages d'étudiants bénéficiaires.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-10",
    category: "Entrepreneuriat Étudiant",
    slug: "statut-etudiant-entrepreneur",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
  },
  {
    id: "6",
    title: "Réussir son pitch devant des investisseurs étudiants",
    excerpt: "Les clés pour convaincre en 3 minutes : structurer son discours, éviter les pièges et captiver son audience lors de concours.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-08",
    category: "Communication",
    slug: "reussir-pitch-investisseurs",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
  },
  {
    id: "7",
    title: "Trouver ses premiers clients quand on est étudiant",
    excerpt: "Stratégies marketing low-cost et efficaces pour acquérir vos premiers clients : réseaux sociaux, campus et réseau alumni.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-05",
    category: "Marketing",
    slug: "premiers-clients-etudiant",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
  },
  {
    id: "8",
    title: "L'entrepreneuriat à impact : créer une entreprise qui a du sens",
    excerpt: "Comment construire un projet entrepreneurial aligné avec vos valeurs et créer un impact social ou environnemental positif.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2025-01-02",
    category: "Impact",
    slug: "entrepreneuriat-impact-etudiants",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
  },
  {
    id: "9",
    title: "S'entourer des bonnes personnes pour réussir",
    excerpt: "L'importance du réseau entrepreneurial étudiant : mentors, co-fondateurs, communautés et associations à rejoindre.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2024-12-28",
    category: "Réseau",
    slug: "s-entourer-reseau-entrepreneurial",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
  },
  {
    id: "10",
    title: "Transformer son projet de fin d'études en entreprise",
    excerpt: "Du mémoire à la startup : comment valoriser votre travail académique et le transformer en projet entrepreneurial viable.",
    content: "",
    author: "Mare Nostrum",
    publishedAt: "2024-12-25",
    category: "Entrepreneuriat Étudiant",
    slug: "projet-etudes-en-entreprise",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
  }
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrer les articles selon la recherche et la catégorie
  const filteredArticles = placeholderArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(placeholderArticles.map(a => a.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Blog - Mare Nostrum | Actualités et Ressources Entrepreneuriales"
        description="Découvrez nos articles sur l'entrepreneuriat, la croissance d'entreprise, l'éducation et l'engagement RSE. Ressources et conseils pour entrepreneurs à impact."
        keywords="blog entrepreneuriat, ressources entrepreneuriales, croissance entreprise, éducation entrepreneuriale, RSE"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Blog Mare Nostrum
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Actualités, conseils et ressources pour entrepreneurs à impact
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/95 backdrop-blur"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filtres par catégorie */}
      <section className="py-8 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedCategory(null)}
            >
              Tous les articles
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Aucun article trouvé pour votre recherche.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  {article.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{article.category}</Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Lire l'article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
