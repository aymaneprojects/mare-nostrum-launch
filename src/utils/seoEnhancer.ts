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
const BRAND_KEYWORDS = "mare nostrum, Mare Nostrum entrepreneuriat, Mare Nostrum toulouse, mare nostrum afrique, Niteo, Niteo Toulouse, programme Niteo, cabinet mare nostrum, entrepreneuriat etudiant, entrepreneuriat etudiant toulouse";
const DEFAULT_KEYWORDS = "entrepreneuriat toulouse, entrepreneuriat etudiant, entrepreneuriat afrique, entrepreneuriat a impact, conseil entrepreneurial, formation entrepreneurs, incubateur toulouse, startup toulouse, accompagnement entrepreneur afrique, entrepreneuriat universite, entrepreneuriat ecole, Toulouse, Paris, Casablanca";

/**
 * Enrichit automatiquement le titre pour SEO
 */
const enhanceTitle = (title: string): string => {
  if (title.toLowerCase().includes('mare nostrum')) return title;
  const withBrand = `${title} | ${BRAND_NAME}`;
  // Jamais de troncature : un titre coupé par "..." est pire qu'un titre sans marque.
  return withBrand.length <= 60 ? withBrand : title;
};

/**
 * Enrichit la description : préfixe de marque seulement si elle reste sous 155 caractères.
 */
const enhanceDescription = (description: string): string => {
  if (description.toLowerCase().includes('mare nostrum')) return description;
  const withBrand = `${BRAND_NAME} - ${description}`;
  return withBrand.length <= 155 ? withBrand : description;
};

/**
 * Enrichit automatiquement les mots-clés pour SEO
 */
const enhanceKeywords = (keywords?: string): string => {
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
const generateBreadcrumbs = (path: string): object => {
  const pathSegments = path.split('/').filter(Boolean);
  const breadcrumbs = [
    {
      name: "Accueil",
      url: "https://www.marenostrum.tech"
    }
  ];
  
  // Mapping des segments de chemin vers des noms lisibles
  const pathNames: Record<string, string> = {
    'education': 'Éducation',
    'club': 'Club',
    'expertise': 'Expertise',
    'mastermind': 'Mastermind néo-entrepreneurs',
    'mastermind-digital': 'Mastermind digital',
    'initiation-ia': 'Initiation à l\'IA',
    'agent-ia-marketing': 'Agent IA marketing',
    'offre-ia': 'Offre IA',
    'niteo-toulouse': 'Niteo Toulouse',
    'iter': 'Newsletter ITER',
    'diagnostic': 'Diagnostic',
    'equipe': 'Équipe',
    'partenaire': 'Partenaires',
    'blog': 'Blog',
    'a-propos': 'À propos',
    'contact': 'Contact',
    'engagement-rse': 'Engagement RSE',
    'livre-entrepreneuriat': 'Livre blanc',
    'mentions-legales': 'Mentions légales',
    'cgu': 'CGU',
    'cgv': 'CGV',
    'confidentialite': 'Confidentialité',
    'transformation-entrepreneuriale': 'Transformation entrepreneuriale',
    'diagnostic-gratuit': 'Diagnostic gratuit',
    'accompagnement-francophonie-afrique': 'Accompagnement Francophonie et Afrique',
    'test-maturite-projet': 'Test de maturité du projet',
    'mentorat-individuel': 'Mentorat individuel',
    'entrepreneuriat-social-francophonie': 'Entrepreneuriat social en francophonie',
    'innovation-pedagogique-entrepreneuriat': 'Innovation pédagogique et entrepreneuriat',
    'impact-mesure-startup': 'Mesurer l\'impact de sa startup'
  };
  // Segments sans page propre : pas d'élément de fil d'Ariane vers une URL qui n'existe pas.
  const sansPage = new Set(['ecoles', 'entrepreneurs', 'mag']);
  const humaniser = (seg: string) => {
    const t = decodeURIComponent(seg).replace(/-/g, ' ');
    return t.charAt(0).toUpperCase() + t.slice(1);
  };
  
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    if (sansPage.has(segment)) return;
    breadcrumbs.push({
      name: pathNames[segment] || humaniser(segment),
      url: `https://www.marenostrum.tech${currentPath}`
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
 * Fonction principale d'enrichissement SEO
 */
export const enhanceSEO = (config: SEOEnhancerConfig): EnhancedSEO => {
  const enhancedTitle = enhanceTitle(config.title);
  const enhancedDescription = enhanceDescription(config.description);
  const enhancedKeywords = enhanceKeywords(config.keywords);
  
  // Générer les structured data automatiques
  const structuredData: object[] = [];
  
  // Le WebSite et l'Organization globaux vivent dans index.html (une seule fois).
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
