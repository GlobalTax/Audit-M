export const getBaseUrl = () => "https://nrro.es";

export const getBreadcrumbUrl = (path: string) => {
  const base = getBaseUrl();
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
};

// Versiones y fechas de actualización centralizadas para páginas legales
export const legalVersions = {
  lastUpdate: "12 de noviembre de 2025",
  lastUpdateISO: "2025-11-12",
};

// Breadcrumbs predefinidos para páginas legales
export const legalBreadcrumbs = {
  legal: [
    { name: "Inicio", url: getBreadcrumbUrl("/") },
    { name: "Aviso Legal", url: getBreadcrumbUrl("/aviso-legal") }
  ],
  privacy: [
    { name: "Inicio", url: getBreadcrumbUrl("/") },
    { name: "Legal", url: getBreadcrumbUrl("/aviso-legal") },
    { name: "Política de Privacidad", url: getBreadcrumbUrl("/privacy") }
  ],
  cookies: [
    { name: "Inicio", url: getBreadcrumbUrl("/") },
    { name: "Legal", url: getBreadcrumbUrl("/aviso-legal") },
    { name: "Política de Cookies", url: getBreadcrumbUrl("/cookies") }
  ],
  terms: [
    { name: "Inicio", url: getBreadcrumbUrl("/") },
    { name: "Legal", url: getBreadcrumbUrl("/aviso-legal") },
    { name: "Condiciones de Contratación", url: getBreadcrumbUrl("/condiciones-contratacion") }
  ]
};
