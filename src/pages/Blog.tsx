import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { useBlogArticles, BlogArticle } from "@/hooks/useBlogArticles";

const ARTICLES_PER_PAGE = 9;

// Fonction pour nettoyer l'excerpt des balises HTML/markdown
const cleanExcerpt = (excerpt: string): string => {
  return excerpt
    .replace(/```html\s*/gi, '') // Supprime ```html
    .replace(/```\s*/g, '')       // Supprime ```
    .replace(/<[^>]*>/g, '')      // Supprime les balises HTML
    .replace(/\s+/g, ' ')         // Normalise les espaces
    .trim();
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: articles = [], isLoading, error } = useBlogArticles();

  // Filtrer les articles selon la recherche et la catégorie
  const filteredArticles = useMemo(() => {
    return articles.filter((article: BlogArticle) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const categories = Array.from(new Set(articles.map((a: BlogArticle) => a.category)));

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Blog Entrepreneuriat - Mare Nostrum | Conseils et Ressources"
        description="Guides pratiques pour créer son entreprise et réussir son aventure entrepreneuriale. Statuts juridiques, financement, business plan, pitch... Ressources gratuites par Mare Nostrum."
        keywords="blog entrepreneuriat, créer entreprise, statut juridique entrepreneur, financement projet, business plan, conseils entrepreneur"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Blog Entrepreneuriat
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Guides pratiques et ressources pour réussir votre aventure entrepreneuriale
            </p>
            
            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
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
              onClick={() => handleCategoryChange(null)}
            >
              Tous les articles
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => handleCategoryChange(category)}
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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-muted rounded w-20" />
                      <div className="h-4 bg-muted rounded w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-lg text-destructive">
                Une erreur est survenue lors du chargement des articles.
              </p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {articles.length === 0 
                  ? "Aucun article disponible pour le moment."
                  : "Aucun article trouvé pour votre recherche."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article: BlogArticle) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4">
                        {article.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {cleanExcerpt(article.excerpt)}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <Link
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium group/link"
                      >
                        Lire l'article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Compteur d'articles */}
              <p className="text-center text-muted-foreground mt-6">
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} au total
              </p>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
