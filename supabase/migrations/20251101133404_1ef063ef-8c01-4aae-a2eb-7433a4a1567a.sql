-- Insert content sections for Services page

-- Sección: Introducción
INSERT INTO public.page_content (page_key, section_key, content, is_active, display_order) VALUES (
  'services',
  'introduccion',
  '{
    "overline": "NUESTRO ENFOQUE",
    "titulo": "Soluciones integrales adaptadas a tu negocio",
    "descripcion": "En Navarro ofrecemos un servicio de asesoría fiscal, contable, legal y laboral con más de 25 años de experiencia. Nuestro enfoque multidisciplinar nos permite ofrecer soluciones completas y personalizadas para empresas familiares, PYMES y autónomos en Barcelona.",
    "puntos": [
      "Equipo multidisciplinar de expertos",
      "Atención personalizada y cercana",
      "Tecnología al servicio de la eficiencia",
      "Compromiso con la excelencia"
    ]
  }'::jsonb,
  true,
  1
) ON CONFLICT (page_key, section_key) DO UPDATE SET content = EXCLUDED.content;

-- Sección: Áreas destacadas
INSERT INTO public.page_content (page_key, section_key, content, is_active, display_order) VALUES (
  'services',
  'areas_destacadas',
  '{
    "overline": "NUESTRAS ÁREAS",
    "titulo": "Cuatro pilares de excelencia",
    "areas": [
      {
        "nombre": "Fiscal",
        "icono": "Receipt",
        "descripcion": "Optimización fiscal, planificación tributaria y defensa ante la Administración.",
        "servicios_ejemplo": ["Impuesto de Sociedades", "IVA", "IRPF", "Inspecciones"]
      },
      {
        "nombre": "Contable",
        "icono": "Calculator",
        "descripcion": "Gestión contable integral, auditorías y reporting financiero para la toma de decisiones.",
        "servicios_ejemplo": ["Contabilidad", "Auditorías", "Cierres", "Reporting"]
      },
      {
        "nombre": "Legal",
        "icono": "Scale",
        "descripcion": "Asesoramiento mercantil, M&A, contratos y resolución de conflictos societarios.",
        "servicios_ejemplo": ["M&A", "Contratos", "Societario", "Compliance"]
      },
      {
        "nombre": "Laboral",
        "icono": "Users",
        "descripcion": "Gestión de nóminas, contratación, despidos y optimización de costes laborales.",
        "servicios_ejemplo": ["Nóminas", "Contratos", "Despidos", "Inspecciones"]
      }
    ]
  }'::jsonb,
  true,
  2
) ON CONFLICT (page_key, section_key) DO UPDATE SET content = EXCLUDED.content;

-- Sección: Metodología
INSERT INTO public.page_content (page_key, section_key, content, is_active, display_order) VALUES (
  'services',
  'metodologia',
  '{
    "overline": "CÓMO TRABAJAMOS",
    "titulo": "Nuestro proceso",
    "descripcion": "Un método probado que garantiza resultados",
    "pasos": [
      {
        "numero": "01",
        "titulo": "Análisis",
        "descripcion": "Estudiamos tu situación actual y necesidades específicas"
      },
      {
        "numero": "02",
        "titulo": "Estrategia",
        "descripcion": "Diseñamos un plan de acción personalizado y eficiente"
      },
      {
        "numero": "03",
        "titulo": "Ejecución",
        "descripcion": "Implementamos las soluciones con rigor y agilidad"
      },
      {
        "numero": "04",
        "titulo": "Seguimiento",
        "descripcion": "Monitorizamos resultados y optimizamos continuamente"
      }
    ]
  }'::jsonb,
  true,
  3
) ON CONFLICT (page_key, section_key) DO UPDATE SET content = EXCLUDED.content;

-- Sección: CTA Consulta
INSERT INTO public.page_content (page_key, section_key, content, is_active, display_order) VALUES (
  'services',
  'cta_consulta',
  '{
    "titulo": "¿Tienes dudas sobre qué servicio necesitas?",
    "descripcion": "Agenda una consulta gratuita de 30 minutos con uno de nuestros expertos",
    "cta_texto": "Agendar Consulta Gratuita",
    "cta_url": "/contacto"
  }'::jsonb,
  true,
  4
) ON CONFLICT (page_key, section_key) DO UPDATE SET content = EXCLUDED.content;

-- Sección: FAQs
INSERT INTO public.page_content (page_key, section_key, content, is_active, display_order) VALUES (
  'services',
  'faqs',
  '{
    "overline": "PREGUNTAS FRECUENTES",
    "titulo": "Resolvemos tus dudas",
    "preguntas": [
      {
        "pregunta": "¿Qué servicios incluye la asesoría integral?",
        "respuesta": "Nuestra asesoría integral incluye gestión fiscal, contable, laboral y legal. Desde la presentación de impuestos hasta la gestión de nóminas, contratos mercantiles y defensa ante inspecciones. Trabajamos de forma coordinada para ofrecer una visión 360° de tu negocio."
      },
      {
        "pregunta": "¿Cuál es el coste de vuestros servicios?",
        "respuesta": "Ofrecemos presupuestos personalizados según las necesidades de cada cliente. Trabajamos con tarifas mensuales fijas para servicios recurrentes y presupuestos cerrados para proyectos específicos. Solicita un presupuesto sin compromiso."
      },
      {
        "pregunta": "¿Trabajáis con empresas de toda España?",
        "respuesta": "Sí, aunque tenemos oficinas en Barcelona, asesoramos a clientes de toda España gracias a nuestras herramientas digitales y plataformas de comunicación. Nos adaptamos a tu disponibilidad para reuniones presenciales o virtuales."
      },
      {
        "pregunta": "¿Cuánto tiempo tardaréis en responder?",
        "respuesta": "Nuestro compromiso es responder a consultas urgentes en menos de 24 horas laborables. Para proyectos complejos, agendamos reuniones en un plazo máximo de 48 horas."
      },
      {
        "pregunta": "¿Ofrecéis servicios a particulares?",
        "respuesta": "Sí, ofrecemos servicios fiscales y legales especializados para particulares, especialmente en planificación fiscal, declaración de IRPF, herencias y donaciones."
      }
    ]
  }'::jsonb,
  true,
  5
) ON CONFLICT (page_key, section_key) DO UPDATE SET content = EXCLUDED.content;

-- Sección: CTA Final
INSERT INTO public.page_content (page_key, section_key, content, is_active, display_order) VALUES (
  'services',
  'cta_final',
  '{
    "titulo": "¿Listo para optimizar tu negocio?",
    "descripcion": "Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales",
    "cta_primario_texto": "Solicitar Consulta",
    "cta_primario_url": "/contacto",
    "cta_secundario_texto": "Ver Portfolio",
    "cta_secundario_url": "/portfolio"
  }'::jsonb,
  true,
  6
) ON CONFLICT (page_key, section_key) DO UPDATE SET content = EXCLUDED.content;