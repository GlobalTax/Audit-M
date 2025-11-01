-- Migrar todas las secciones hardcodeadas del Home a page_content

-- 1. Hero Section
INSERT INTO page_content (page_key, section_key, content, display_order, is_active)
VALUES (
  'home',
  'hero',
  '{
    "title": "Planifica el futuro<br />Con decisiones hoy.",
    "subtitle": "Asesoramos a grupos de empresas y empresas familiares en sus decisiones clave: fiscalidad, sucesión, estructura societaria y compraventa de empresas.",
    "cta_primary": {
      "text": "Nuestros Servicios",
      "link": "/servicios"
    },
    "cta_secondary": {
      "text": "Contactar",
      "link": "/contacto"
    }
  }'::jsonb,
  0,
  true
);

-- 2. About Section
INSERT INTO page_content (page_key, section_key, content, display_order, is_active)
VALUES (
  'home',
  'about',
  '{
    "overline": "Nosotros navarro",
    "title": "Asesoramiento estratégico y legal para empresas y grupos.",
    "paragraphs": [
      "En navarro ofrecemos asesoramiento legal, fiscal y estratégico especializado en empresas familiares y estructuras empresariales consolidadas.",
      "Nuestra visión parte de la comprensión profunda de los retos de continuidad, gobernanza y crecimiento que enfrentan las compañías familiares. Aportamos soluciones concretas para planificar el relevo generacional, proteger el patrimonio y estructurar la actividad con seguridad jurídica.",
      "Nuestro equipo trabaja con rigor técnico, experiencia transversal y compromiso absoluto con cada cliente.",
      "Ya sea en la gestión diaria, la toma de decisiones clave o en procesos de compraventa, acompañamos a nuestros clientes con total confidencialidad y enfoque a largo plazo."
    ],
    "cta": {
      "text": "Conoce nuestro equipo",
      "link": "/equipo"
    }
  }'::jsonb,
  1,
  true
);

-- 3. Servicios Destacados (4 cards grandes)
INSERT INTO page_content (page_key, section_key, content, display_order, is_active)
VALUES (
  'home',
  'servicios_destacados',
  '{
    "overline": "Nuestros Servicios Relevantes",
    "services": [
      {
        "title": "Asesoramiento Fiscal",
        "description": "Asesoramos a empresas y socios en todas sus obligaciones fiscales, con visión estratégica y anticipación",
        "category": "Servicios Fiscales",
        "features": [
          "Planificación y optimización fiscal",
          "Procedimiento Tributario e Inspecciones ante la diferentes Administraciones",
          "Asesoramiento fiscal recurrente a sociedades y sus socios"
        ]
      },
      {
        "title": "Mercantil",
        "description": "Asesoramiento jurídico-societario para estructuras empresariales con visión de estabilidad y seguridad en la gestión",
        "category": "Servicios Mercantiles",
        "features": [
          "Recurrencia legal y mercantil",
          "Pactos de socios y reorganizaciones societarias",
          "Protocolos familiares y gobierno corporativo"
        ]
      },
      {
        "title": "Laboral & Contabilidad",
        "description": "Externalización revisión contable y servicios de asesoramiento laboral, con enfoque de cumplimiento normativo",
        "category": "Sercios de Externalización",
        "features": [
          "Consolidación de grupos y reporting financiero",
          "Revisión de la contabilidad adaptada a normativata",
          "Externalización de los servicios de confección de nóminas y laboral"
        ]
      },
      {
        "title": "Operaciones M&A",
        "description": "Acompañamos a empresarios que quieren vender o comprar una empresa. Nuestro enfoque se basa en el servicios completo",
        "category": "Monitoring Services",
        "features": [
          "Valoración de empresas y asesoramiento previo",
          "Búsqueda de comprador o inversor con la máxima confidencialidad",
          "Asesoramiento en Due Diligence y negociación del contrato de compraventa"
        ]
      }
    ]
  }'::jsonb,
  2,
  true
);

-- 4. Tecnología que usamos (logos)
INSERT INTO page_content (page_key, section_key, content, display_order, is_active)
VALUES (
  'home',
  'tecnologia',
  '{
    "overline": "Tecnología que usamos",
    "logos": [
      {"name": "Sage"},
      {"name": "A3 Software"},
      {"name": "Wolters Kluwer"},
      {"name": "Microsoft 365"},
      {"name": "DocuSign"},
      {"name": "Dropbox Business"},
      {"name": "Lexnet"},
      {"name": "Sede Electrónica AEAT"}
    ]
  }'::jsonb,
  3,
  true
);

-- 5. Empresas que confían en nosotros (carrusel de logos)
INSERT INTO page_content (page_key, section_key, content, display_order, is_active)
VALUES (
  'home',
  'clientes',
  '{
    "overline": "Empresas que confían en nosotros",
    "logos": [
      {"name": "Empresa 1", "logo_url": "https://via.placeholder.com/150x60?text=Logo+1"},
      {"name": "Empresa 2", "logo_url": "https://via.placeholder.com/150x60?text=Logo+2"},
      {"name": "Empresa 3", "logo_url": "https://via.placeholder.com/150x60?text=Logo+3"},
      {"name": "Empresa 4", "logo_url": "https://via.placeholder.com/150x60?text=Logo+4"},
      {"name": "Empresa 5", "logo_url": "https://via.placeholder.com/150x60?text=Logo+5"},
      {"name": "Empresa 6", "logo_url": "https://via.placeholder.com/150x60?text=Logo+6"},
      {"name": "Empresa 7", "logo_url": "https://via.placeholder.com/150x60?text=Logo+7"},
      {"name": "Empresa 8", "logo_url": "https://via.placeholder.com/150x60?text=Logo+8"},
      {"name": "Empresa 9", "logo_url": "https://via.placeholder.com/150x60?text=Logo+9"},
      {"name": "Empresa 10", "logo_url": "https://via.placeholder.com/150x60?text=Logo+10"}
    ]
  }'::jsonb,
  4,
  true
);