import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EnhancedSEOHead from "@/components/EnhancedSEOHead";
import { useBlogArticle, useRelatedArticles } from "@/hooks/useBlogArticles";
import { useToast } from "@/hooks/use-toast";

// Optimiser les URLs d'images Unsplash
const optimizeImageUrl = (url: string, width = 800): string => {
  if (!url) return url;
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&q=75&auto=format&fit=crop`;
  }
  return url;
};

// Nettoyer le contenu HTML généré par l'IA
const cleanMarkdown = (text: string): string => {
  let cleaned = text;
  // Supprimer les balises markdown code block
  cleaned = cleaned.replace(/^```html\s*/i, '');
  cleaned = cleaned.replace(/```\s*$/i, '');
  return cleaned.trim();
};

const cleanArticleContent = (content: string, title: string): string => {
  let cleaned = cleanMarkdown(content);
  
  // Supprimer le titre s'il est répété au début du contenu
  const titlePatterns = [
    new RegExp(`^<h1[^>]*>\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</h1>\\s*`, 'i'),
    new RegExp(`^<h2[^>]*>\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*</h2>\\s*`, 'i'),
    new RegExp(`^\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'),
  ];
  
  for (const pattern of titlePatterns) {
    cleaned = cleaned.replace(pattern, '');
  }
  
  return cleaned.trim();
};

const BlogArticle = () => {
  const { toast } = useToast();
  const { slug } = useParams<{ slug: string }>();
  
  const { data: article, isLoading, error } = useBlogArticle(slug);
  const { data: relatedArticles = [] } = useRelatedArticles(article?.category, article?.id);

  // OG article tags — doit être avant tout return conditionnel (Rules of Hooks)
  useEffect(() => {
    if (!article) return;
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("og:article:published_time", article.published_at);
    setMeta("og:article:modified_time", article.updated_at || article.published_at);
    setMeta("og:article:section", article.category);
    setMeta("og:article:author", article.author);
    setMeta("og:locale", "fr_FR");
  }, [article]);

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <EnhancedSEOHead
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
        <EnhancedSEOHead
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

  const articleUrl = `https://marenostrum.tech/blog/${article.slug}`;
  const cleanExcerpt = article.excerpt.replace(/<[^>]*>/g, "").substring(0, 155);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": articleUrl,
    "headline": article.title,
    "description": cleanExcerpt,
    "url": articleUrl,
    "image": {
      "@type": "ImageObject",
      "url": article.image,
      "width": 1200,
      "height": 630
    },
    "datePublished": article.published_at,
    "dateModified": article.updated_at || article.published_at,
    "inLanguage": "fr-FR",
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://marenostrum.tech/a-propos"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mare Nostrum",
      "@id": "https://marenostrum.tech/#organization",
      "logo": {
        "@type": "ImageObject",
        "url": "https://marenostrum.tech/logo.png",
        "width": 512,
        "height": 512
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "articleSection": article.category,
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "keywords": `${article.category}, entrepreneuriat francophone, ${article.title.split(" ").slice(0, 6).join(", ")}`,
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://marenostrum.tech/blog",
      "name": "Blog Mare Nostrum"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://marenostrum.tech" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://marenostrum.tech/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl }
    ]
  };

  // Mots-clés spécifiques à l'article
  const titleWords = article.title.toLowerCase().replace(/[^a-zA-ZÀ-ÿ\s]/g, "").split(/\s+/).filter(w => w.length > 4).slice(0, 6);
  const articleKeywords = [
    article.category.toLowerCase(),
    "entrepreneuriat", "créer son entreprise", "entrepreneur francophone",
    "mare nostrum toulouse", "accompagnement entrepreneurial",
    ...titleWords,
  ].join(", ");

  return (
    <div className="min-h-screen flex flex-col">
      <EnhancedSEOHead
        disableAutoEnhancement={true}
        title={`${article.title} | Blog Entrepreneuriat Mare Nostrum`}
        description={cleanExcerpt}
        keywords={articleKeywords}
        image={article.image}
        type="article"
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      <Header />

      {/* Hero avec image */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={optimizeImageUrl(article.image, 1200)}
          alt={article.title}
          decoding="async"
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
              <Button variant="outline" size="sm" onClick={async () => {
                const shareUrl = window.location.href;
                const shareTitle = article.title;
                
                // Utiliser l'API Web Share si disponible (mobile)
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: shareTitle,
                      text: article.excerpt,
                      url: shareUrl,
                    });
                  } catch (err) {
                    // L'utilisateur a annulé ou erreur
                    if ((err as Error).name !== 'AbortError') {
                      navigator.clipboard.writeText(shareUrl);
                      toast({
                        title: "Lien copié",
                        description: "Le lien de l'article a été copié dans le presse-papier.",
                      });
                    }
                  }
                } else {
                  // Fallback: copier dans le presse-papier
                  await navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Lien copié",
                    description: "Le lien de l'article a été copié dans le presse-papier.",
                  });
                }
              }}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>

            {/* Extrait */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4">
              {cleanMarkdown(article.excerpt)}
            </p>

            {/* Contenu HTML stylisé */}
            <article 
              className="blog-article-content"
              dangerouslySetInnerHTML={{ __html: cleanArticleContent(article.content, article.title) }}
            />

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-sm border border-border">
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
              Continuer à lire
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedArticles.map((related) => {
                const cleanRelatedExcerpt = related.excerpt?.replace(/<[^>]*>/g, "").substring(0, 90);
                return (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
                  >
                    <div className="h-44 overflow-hidden bg-secondary/50 shrink-0">
                      {related.image && (
                        <img
                          src={optimizeImageUrl(related.image, 400)}
                          alt={related.title}
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={176}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <Badge variant="outline" className="mb-2 w-fit text-xs">{related.category}</Badge>
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {related.title}
                      </h3>
                      {cleanRelatedExcerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-auto">{cleanRelatedExcerpt}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogArticle;
