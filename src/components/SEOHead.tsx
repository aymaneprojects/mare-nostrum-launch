import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StructuredData from './StructuredData';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  structuredData?: object | object[];
  faqSchema?: Array<{ question: string; answer: string }>;
  breadcrumbSchema?: Array<{ name: string; url: string }>;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = "entrepreneuriat, conseil, formation, impact, Toulouse, Paris, Casablanca",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  type = "website",
  noindex = false,
  structuredData,
  faqSchema,
  breadcrumbSchema
}: SEOHeadProps) => {
  const location = useLocation();
  const currentUrl = `https://marenostrum.tech${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large');
    }

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:type', type, true);

    // Twitter
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:card', 'summary_large_image');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
  }, [title, description, keywords, image, type, currentUrl, noindex]);

  // Build all structured data
  const allStructuredData = [];
  
  if (structuredData) {
    allStructuredData.push(...(Array.isArray(structuredData) ? structuredData : [structuredData]));
  }
  
  if (faqSchema && faqSchema.length > 0) {
    allStructuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqSchema.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }
  
  if (breadcrumbSchema && breadcrumbSchema.length > 0) {
    allStructuredData.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbSchema.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    });
  }
  
  return allStructuredData.length > 0 ? <StructuredData data={allStructuredData} /> : null;
};

export default SEOHead;
