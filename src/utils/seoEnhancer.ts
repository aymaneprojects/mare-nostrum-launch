/**
 * SEO Enhancer - Optimisation automatique pour "Mare Nostrum"
 * Enrichit automatiquement tous les meta tags pour maximiser la visibilité
 */

interface SEOEnhancerConfig {
  title: string;
  description: string;
  keywords?: string;
  path: string;
}

interface EnhancedSEO {
  title: string;
  description: string;
  keywords: string;
  structuredData: object[];
}

const BRAND_NAME = "Mare Nostrum";
const BRAND_KEYWORDS = "mare nostrum, Mare Nostrum entrepreneuriat, Mare Nostrum conseil, cabinet mare nostrum";
const DEFAULT_KEYWORDS = "entrepreneuriat à impact, conseil entrepreneurial, formation entrepreneurs, Toulouse, Paris, Casablanca";

/**
 * Enrichit automatiquement le titre pour SEO
 */
export const enhanceTitle = (title: string): string => {
  // Si le titre contient déjà "Mare Nostrum", le garder tel quel
  if (title.toLowerCase().includes('mare nostrum')) {
    return title;
  }
  
  // Sinon, ajouter "Mare Nostrum" de manière naturelle
  // Éviter les titres trop longs (max 60 caractères recommandés)
  const brandSuffix = ` - ${BRAND_NAME}`;
  
  if (title.length + brandSuffix.length <= 60) {
    return `${title}${brandSuffix}`;
  }
  
  // Si trop long, raccourcir intelligemment
  return `${BRAND_NAME} | ${title.substring(0, 50)}...`;
};

/**
 * Enrichit automatiquement la description pour SEO
 */
export const enhanceDescription = (description: string): string => {
  // Si la description contient déjà "Mare Nostrum" au début, la garder
  if (description.toLowerCase().startsWith('mare nostrum') || 
      description.toLowerCase().includes('mare nostrum')) {
    return description;
  }
  
  // Ajouter "Mare Nostrum" au début de manière naturelle
  // Max 160 caractères recommandés
  const prefix = `${BRAND_NAME} - `;
  
  if (description.length + prefix.length <= 160) {
    return `${prefix}${description}`;
  }
  
  // Si trop long, optimiser
  return `${BRAND_NAME}: ${description.substring(0, 140)}...`;
};

/**
 * Enrichit automatiquement les mots-clés pour SEO
 */
export const enhanceKeywords = (keywords?: string): string => {
  const keywordsArray: string[] = [];
  
  // Toujours inclure les mots-clés de marque en premier
  keywordsArray.push(BRAND_KEYWORDS);
  
  // Ajouter les mots-clés personnalisés s'ils existent
  if (keywords) {
    keywordsArray.push(keywords);
  } else {
    keywordsArray.push(DEFAULT_KEYWORDS);
  }
  
  // Retourner une liste unique (sans doublons)
  const allKeywords = keywordsArray.join(', ').split(',').map(k => k.trim());
  return [...new Set(allKeywords)].join(', ');
};

/**
 * Génère automatiquement les breadcrumbs structurés
 */
export const generateBreadcrumbs = (path: string): object => {
  const pathSegments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      name: "Accueil",
      url: "https://marenostrum.tech"
    }
  ];
  
  // Mapping des segments de chemin vers des noms lisibles
  const pathNames: Record<string, string> = {
    'education': 'Éducation',
    'croissance': 'Croissance',
    'blog': 'Blog',
    'a-propos': 'À Propos',
    'contact': 'Contact',
    'engagement-rse': 'Engagement RSE',
    'livre-entrepreneuriat': 'Livre Blanc',
    'mentions-legales': 'Mentions Légales',
    'cgu': 'CGU',
    'confidentialite': 'Confidentialité'
  };
  
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      name: pathNames[segment] || segment,
      url: `https://marenostrum.tech${currentPath}`
    });
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Génère le WebSite SearchAction Schema
 */
export const generateWebsiteSchema = (): object => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BRAND_NAME,
    "alternateName": "Cabinet Mare Nostrum",
    "url": "https://marenostrum.tech",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://marenostrum.tech/blog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * Fonction principale d'enrichissement SEO
 */
export const enhanceSEO = (config: SEOEnhancerConfig): EnhancedSEO => {
  const enhancedTitle = enhanceTitle(config.title);
  const enhancedDescription = enhanceDescription(config.description);
  const enhancedKeywords = enhanceKeywords(config.keywords);
  
  // Générer les structured data automatiques
  const structuredData: object[] = [];
  
  // Toujours inclure le WebSite Schema
  structuredData.push(generateWebsiteSchema());
  
  // Ajouter les breadcrumbs si on n'est pas sur la page d'accueil
  if (config.path !== '/' && config.path !== '') {
    structuredData.push(generateBreadcrumbs(config.path));
  }
  
  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: enhancedKeywords,
    structuredData
  };
};

/**
 * Hook personnalisé pour enrichissement automatique
 */
export const useEnhancedSEO = (config: SEOEnhancerConfig): EnhancedSEO => {
  return enhanceSEO(config);
};
