import { useEffect } from "react";
import { useSiteSettingsMap } from '@/hooks/useSiteSettings';

export const OrganizationSchema = () => {
  const { settings } = useSiteSettingsMap();

  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Audit",
      "alternateName": "Audit Global",
      "url": "https://audit.es",
      "logo": "https://audit.es/logo.svg",
      "image": "https://audit.es/logo.svg",
      "description": "Firma de auditoría especializada en auditoría de cuentas anuales, due diligence, auditoría interna y auditoría ESG/Sostenibilidad.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Diagonal 640, 2º 1ª",
        "addressLocality": "Barcelona",
        "addressRegion": "Cataluña",
        "postalCode": "08017",
        "addressCountry": "ES"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": settings.contact_phone || "+34934593600",
        "contactType": "customer service",
        "email": settings.contact_email || "info@audit.es",
        "areaServed": "ES",
        "availableLanguage": ["Spanish", "Catalan", "English"]
      },
      "sameAs": [
        settings.social_linkedin,
        settings.social_instagram,
        settings.social_twitter,
        settings.social_facebook
      ].filter(Boolean),
      "foundingDate": "2010",
      "slogan": "Transparencia y confianza en cada auditoría."
    };

    // Crear o actualizar el script tag
    const scriptId = "organization-schema";
    let script = document.querySelector(`script#${scriptId}`);
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      (script as HTMLScriptElement).type = "application/ld+json";
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(organizationSchema);

    // Cleanup: remover el script cuando el componente se desmonte
    return () => {
      const scriptToRemove = document.querySelector(`script#${scriptId}`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [settings]);

  return null;
};
