import { useEffect } from "react";
import { ChatGPTLogo, ClaudeLogo, PerplexityLogo, GoogleLogo } from "@/components/AiLogos";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, Loader2, RefreshCw, Linkedin, Facebook, Twitter, Mail, MessageCircle, Link2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
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

// Pas de tiret cadratin affiché : " — " devient " - " (au rendu seulement, la base n'est pas modifiée)
const noEmDash = (t: string): string => t.replace(/\s*\u2014\s*/g, " - ");

// Ajoute des ancres aux h2/h3 et renvoie le sommaire correspondant
const addAnchors = (html: string): { html: string; toc: { id: string; text: string; level: number }[] } => {
  const toc: { id: string; text: string; level: number }[] = [];
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, lvl, attrs, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const id = `section-${toc.length + 1}`;
    toc.push({ id, text, level: Number(lvl) });
    return `<h${lvl}${attrs.replace(/\sid="[^"]*"/i, "")} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
};

const AI_TARGETS = [
  { name: "ChatGPT", url: "https://chatgpt.com/?q=", Logo: ChatGPTLogo },
  { name: "Claude", url: "https://claude.ai/new?q=", Logo: ClaudeLogo },
  { name: "Perplexity", url: "https://www.perplexity.ai/search?q=", Logo: PerplexityLogo },
  { name: "Google AI", url: "https://www.google.com/search?udm=50&q=", Logo: GoogleLogo },
];

const plainText = (html: string): string =>
  html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const normalize = (t: string): string =>
  plainText(t).toLowerCase().replace(/[…]|\.{3}/g, "").replace(/[^a-z0-9à-ÿ]+/g, " ").trim();

const BlogArticle = () => {
  const { toast } = useToast();
  const { slug } = useParams<{ slug: string }>();
  
  const { data: article, isLoading, error } = useBlogArticle(slug);
  const { data: relatedArticles = [] } = useRelatedArticles(article?.category, article?.id);

  // OG article tags - doit être avant tout return conditionnel (Rules of Hooks)
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
      <div className="min-h-dvh flex flex-col">
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
      <div className="min-h-dvh flex flex-col">
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

  const { html: contentHtml, toc } = addAnchors(noEmDash(cleanArticleContent(article.content, article.title)));
  const reviewedBy = article.reviewed_by;
  const reviewedByTitle = article.reviewed_by_title;

  // Le chapô n'est affiché que s'il ne répète pas le début du contenu
  const excerptNorm = normalize(article.excerpt).slice(0, 80);
  const showExcerpt = excerptNorm.length > 0 && !normalize(contentHtml).startsWith(excerptNorm);

  // Découpe du corps : [jusqu'à l'encadré En bref] [suite jusqu'avant le 3e h2] [reste]
  const enBrefEnd = (() => {
    const m = /<aside[^>]*class="[^"]*en-bref[^"]*"[^>]*>[\s\S]*?<\/aside>/i.exec(contentHtml);
    return m ? m.index + m[0].length : 0;
  })();
  const h2Starts = [...contentHtml.matchAll(/<h2[\s>]/gi)].map((m) => m.index as number);
  const hasCta = h2Starts.length >= 2;
  const ctaAt = hasCta ? (h2Starts[2] ?? contentHtml.length) : contentHtml.length;
  const partA = contentHtml.slice(0, enBrefEnd);
  const partB = contentHtml.slice(enBrefEnd, Math.max(ctaAt, enBrefEnd));
  const partC = contentHtml.slice(Math.max(ctaAt, enBrefEnd));
  const articleClass = "blog-article-content [&_.en-bref]:mb-8 [&_.en-bref]:rounded-sm [&_.en-bref]:border [&_.en-bref]:border-border [&_.en-bref]:bg-secondary/30 [&_.en-bref]:p-4 [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_table]:block [&_table]:overflow-x-auto";

  const showUpdated = article.updated_at && article.updated_at.slice(0, 10) !== article.published_at.slice(0, 10);
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
  const aiPrompt = encodeURIComponent(`Résume cet article : https://www.marenostrum.tech/blog/${article.slug}`);

  const articleUrl = `https://www.marenostrum.tech/blog/${article.slug}`;
  const u = encodeURIComponent(articleUrl);
  const t = encodeURIComponent(article.title);
  const shareLinks = [
    { name: "LinkedIn", Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "WhatsApp", Icon: MessageCircle, href: `https://wa.me/?text=${t}%20${u}` },
    { name: "X", Icon: Twitter, href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: "Facebook", Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: "E-mail", Icon: Mail, href: `mailto:?subject=${t}&body=${u}` },
  ];
  const copyLink = async () => {
    await navigator.clipboard.writeText(articleUrl);
    toast({ title: "Lien copié", description: "Le lien de l'article a été copié dans le presse-papier." });
  };
  const aiRow = (
    <div className="my-8 flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Résumer cet article avec</span>
      {AI_TARGETS.map((a) => (
        <Button key={a.name} variant="outline" size="sm" asChild>
          <a href={a.url + aiPrompt} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
            <a.Logo className="h-4 w-4 shrink-0" />
            {a.name}
          </a>
        </Button>
      ))}
    </div>
  );
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
      "url": "https://www.marenostrum.tech/a-propos"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mare Nostrum",
      "@id": "https://www.marenostrum.tech/#organization",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.marenostrum.tech/logo.png",
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
      "@id": "https://www.marenostrum.tech/blog",
      "name": "Blog Mare Nostrum"
    }
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
    <div className="min-h-dvh flex flex-col">
      <EnhancedSEOHead
        disableAutoEnhancement={true}
        title={`${article.title} | Blog Entrepreneuriat Mare Nostrum`}
        description={cleanExcerpt}
        keywords={articleKeywords}
        image={article.image}
        type="article"
        structuredData={[articleSchema]}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: article.title, href: `/blog/${article.slug}` }]} />

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
              {noEmDash(article.title)}
            </h1>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-[13rem_minmax(0,48rem)_16rem] lg:gap-10 lg:justify-center">
            {/* Sommaire desktop */}
            {toc.length > 0 && (
              <nav aria-label="Sommaire" className="hidden lg:block sticky top-24 self-start max-h-[calc(100dvh-8rem)] overflow-y-auto text-sm">
                <p className="font-semibold text-foreground mb-3">Sommaire</p>
                <ol className="space-y-2">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "pl-3" : ""}>
                      <a href={`#${t.id}`} className="text-muted-foreground hover:text-primary transition-colors">{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          <div className="max-w-3xl mx-auto w-full lg:col-start-2 lg:row-start-1">
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

            {/* Auteur, relecture, date */}
            <div className="flex items-center gap-4 mb-4">
              <div aria-hidden="true" className="h-12 w-12 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {article.author.trim().charAt(0).toUpperCase()}
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="text-foreground font-semibold">Écrit par {article.author}</p>
                {reviewedBy && (
                  <p>Relu par {reviewedBy}{reviewedByTitle ? `, ${reviewedByTitle}` : ""}</p>
                )}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span>Publié le <time dateTime={article.published_at}>{fmtDate(article.published_at)}</time></span>
                  </span>
                  {showUpdated && (
                    <span className="flex items-center gap-1">
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      <span>Mis à jour le <time dateTime={article.updated_at}>{fmtDate(article.updated_at)}</time></span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{readingTime} min de lecture</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Partage par réseau */}
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {shareLinks.map(({ name, Icon, href }) => (
                <Button key={name} variant="outline" size="icon" asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Partager sur ${name}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              ))}
              <Button variant="outline" size="icon" onClick={copyLink} aria-label="Copier le lien">
                <Link2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            {/* Sommaire mobile */}
            {toc.length > 0 && (
              <details className="lg:hidden mb-6 rounded-sm border border-border p-4">
                <summary className="cursor-pointer font-semibold text-foreground">Sommaire</summary>
                <ol className="mt-3 space-y-2 text-sm">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? "pl-3" : ""}>
                      <a href={`#${t.id}`} className="text-muted-foreground hover:text-primary transition-colors">{t.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            {/* Extrait (seulement s'il n'est pas répété dans le contenu) */}
            {showExcerpt && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-4">
                {noEmDash(cleanMarkdown(article.excerpt))}
              </p>
            )}

            {/* Contenu HTML stylisé, découpé : En bref, résumé IA, corps, encart, suite */}
            {partA && <article className={articleClass} dangerouslySetInnerHTML={{ __html: partA }} />}
            {aiRow}
            <article className={articleClass} dangerouslySetInnerHTML={{ __html: partB }} />
            {hasCta && (
              <div className="my-10 p-6 bg-secondary/40 rounded-sm border border-border">
                <p className="text-lg font-semibold text-foreground mb-4">Où en est vraiment votre projet ?</p>
                <Button asChild>
                  <Link to="/diagnostic">Démarrer mon diagnostic</Link>
                </Button>
              </div>
            )}
            {partC && <article className={articleClass} dangerouslySetInnerHTML={{ __html: partC }} />}

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
            {/* CTA collant desktop */}
            <aside className="hidden lg:block sticky top-24 self-start lg:col-start-3 lg:row-start-1 rounded-sm border border-border p-4">
              <p className="font-semibold text-foreground mb-3">Besoin d'accompagnement pour votre projet ?</p>
              <Button asChild className="w-full px-4"><Link to="/diagnostic">Démarrer mon diagnostic</Link></Button>
            </aside>
          </div>
        </div>
      </section>

      {/* Articles similaires */}
      {relatedArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/30">
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
                    className="group mn-card card-interactive hover-lift overflow-hidden flex flex-col"
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
