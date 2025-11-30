import { useLocation } from 'react-router-dom';
import SEOHead from './SEOHead';
import { enhanceSEO } from '@/utils/seoEnhancer';

interface EnhancedSEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  faqSchema?: Array<{ question: string; answer: string }>;
  disableAutoEnhancement?: boolean;
}

/**
 * EnhancedSEOHead - Version enrichie automatiquement pour maximiser le SEO
 * 
 * Utilise ce composant au lieu de SEOHead pour bénéficier de :
 * - Enrichissement automatique du titre avec "Mare Nostrum"
 * - Description optimisée pour la marque
 * - Mots-clés enrichis automatiquement
 * - Breadcrumbs automatiques
 * - WebSite SearchAction Schema
 */
const EnhancedSEOHead = ({ 
  title, 
  description, 
  keywords,
  image,
  type,
  noindex = false,
  structuredData,
  faqSchema,
  disableAutoEnhancement = false
}: EnhancedSEOHeadProps) => {
  const location = useLocation();
  
  // Si l'auto-enrichissement est désactivé, utiliser SEOHead classique
  if (disableAutoEnhancement) {
    return (
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        type={type}
        noindex={noindex}
        structuredData={structuredData}
        faqSchema={faqSchema}
      />
    );
  }
  
  // Enrichir automatiquement le SEO
  const enhanced = enhanceSEO({
    title,
    description,
    keywords,
    path: location.pathname
  });
  
  // Combiner les structured data
  const allStructuredData = [
    ...(Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : []),
    ...enhanced.structuredData
  ];
  
  return (
    <SEOHead
      title={enhanced.title}
      description={enhanced.description}
      keywords={enhanced.keywords}
      image={image}
      type={type}
      noindex={noindex}
      structuredData={allStructuredData}
      faqSchema={faqSchema}
    />
  );
};

export default EnhancedSEOHead;
