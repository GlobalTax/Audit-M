import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BASE_DOMAIN } from "@/lib/seoUtils";

interface MetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  slugs?: {
    es?: string;
    ca?: string;
    en?: string;
  };
}

export const Meta = ({
  title,
  description,
  keywords,
  ogImage = `${BASE_DOMAIN}/og-image.png`,
  canonicalUrl,
  slugs,
}: MetaProps) => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Update html lang attribute based on current language
    document.documentElement.lang = language;
    
    // Get locale code for og:locale
    const getOgLocale = () => {
      switch (language) {
        case 'ca': return 'ca_ES';
        case 'en': return 'en_US';
        default: return 'es_ES';
      }
    };
    
    // Update title
    document.title = `${title} | NRRO`;

    // Update meta tags
    const metaTags = [
      { name: "description", content: description },
      { property: "og:title", content: `${title} | NRRO` },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: getOgLocale() },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${title} | NRRO` },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ];

    if (keywords) {
      metaTags.push({ name: "keywords", content: keywords });
    }

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement("meta");
        if (name) element.setAttribute("name", name);
        if (property) element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    });

    // Remove existing hreflang tags (not needed for single language)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Update canonical
    const fullCanonicalUrl = canonicalUrl 
      ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_DOMAIN}${canonicalUrl}`)
      : `${BASE_DOMAIN}${window.location.pathname}`;
      
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = fullCanonicalUrl;
  }, [title, description, keywords, ogImage, canonicalUrl, language]);

  return null;
};
