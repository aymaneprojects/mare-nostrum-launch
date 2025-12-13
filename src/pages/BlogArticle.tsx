import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEOHead from "@/components/SEOHead";
import { useBlogArticle, useRelatedArticles } from "@/hooks/useBlogArticles";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: article, isLoading, error } = useBlogArticle(slug);
  const { data: relatedArticles = [] } = useRelatedArticles(article?.category, article?.id);

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead 
          title="Chargement... - Blog Mare Nostrum"
          description="Chargement de l'article"
          noindex={true}
        />
        <Header />
        <section className="flex-1 flex items-center justify-center py-16 md:py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Chargement de l'article...</span>
        </section>
        <Footer />
      </div>
    );
  }

  // Si l'article n'existe pas ou erreur
  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead 
          title="Article non trouvé - Blog Mare Nostrum"
          description="Cet article n'existe pas sur le blog Mare Nostrum"
          noindex={true}
        />
        <Header />
        <section className="flex-1 flex items-center justify-center py-16 md:py-24 bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article non trouvé</h1>
            <p className="text-muted-foreground mb-8">L'article que vous recherchez n'existe pas.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Retour au blog
              </Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Calculer le temps de lecture estimé
  const wordsPerMinute = 200;
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${article.title} - Blog Mare Nostrum`}
        description={article.excerpt}
        keywords={`${article.category.toLowerCase()}, entrepreneuriat, ${article.title.toLowerCase()}`}
      />
      <Header />

      {/* Hero avec image */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.published_at).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min de lecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" asChild>
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour au blog
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>

            {/* Extrait */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4">
              {article.excerpt}
            </p>

            {/* Contenu Markdown simplifié */}
            <article className="prose prose-lg max-w-none dark:prose-invert">
              {article.content.split('\n').map((line, index) => {
                // Fonction pour parser le texte avec gras inline
                const parseInlineBold = (text: string) => {
                  const parts = text.split(/\*\*(.*?)\*\*/g);
                  return parts.map((part, i) => {
                    if (i % 2 === 1) {
                      return <strong key={i} className="font-semibold text-foreground">{part}</strong>;
                    }
                    return part;
                  });
                };

                // Headers
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">{parseInlineBold(line.replace('## ', ''))}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-bold text-foreground mt-6 mb-3">{parseInlineBold(line.replace('### ', ''))}</h3>;
                }
                // List items
                if (line.startsWith('- ')) {
                  return <li key={index} className="text-muted-foreground ml-4 my-1">{parseInlineBold(line.replace('- ', ''))}</li>;
                }
                // Numbered list
                if (/^\d+\.\s/.test(line)) {
                  return <li key={index} className="text-muted-foreground ml-4 my-1 list-decimal">{parseInlineBold(line.replace(/^\d+\.\s/, ''))}</li>;
                }
                // Quote
                if (line.startsWith('> ')) {
                  return <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">{parseInlineBold(line.replace('> ', ''))}</blockquote>;
                }
                // Regular paragraph
                if (line.trim()) {
                  return <p key={index} className="text-muted-foreground my-4 leading-relaxed">{parseInlineBold(line)}</p>;
                }
                return null;
              })}
            </article>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-border">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Besoin d'accompagnement pour votre projet ?
              </h3>
              <p className="text-muted-foreground mb-4">
                Mare Nostrum accompagne les entrepreneurs et les écoles dans le développement de projets à impact.
              </p>
              <Button asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogArticle;
