-- =============================================
-- AUDITORÍA FINANCIERA (2 servicios)
-- =============================================

-- 1. Auditoría de Cuentas Anuales
UPDATE services SET
  features_es = ARRAY[
    'Opinión independiente sobre estados financieros',
    'Revisión del control interno y procesos contables',
    'Carta de recomendaciones a la dirección',
    'Verificación del cumplimiento normativo (PGC/NIIF)',
    'Análisis de riesgos de fraude y errores materiales',
    'Confirmaciones bancarias y de terceros'
  ],
  typical_clients_es = ARRAY[
    'Sociedades mercantiles obligadas por ley',
    'Empresas con financiación bancaria',
    'Grupos empresariales nacionales',
    'Directores financieros y consejos de administración',
    'Empresas en procesos de expansión'
  ],
  benefits_es = 'La auditoría de cuentas anuales proporciona credibilidad ante inversores, entidades financieras y terceros. Detecta debilidades en los procesos de control interno y ofrece recomendaciones para mejorar la gestión financiera. Es requisito legal para muchas sociedades y garantía de transparencia corporativa.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Auditoría Rigurosa", "Resultados de Confianza"],
    "introduccion": "Aplicamos un enfoque de auditoría basado en riesgos, combinando procedimientos sustantivos con pruebas de control. Nuestro equipo multidisciplinar garantiza una revisión exhaustiva adaptada a las particularidades de cada sector.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Planificación",
        "puntos": [
          "Evaluación del entorno de control y riesgos inherentes",
          "Determinación de la materialidad",
          "Diseño del plan de auditoría personalizado",
          "Identificación de áreas críticas y ciclos significativos"
        ]
      },
      {
        "numero": 2,
        "titulo": "Ejecución",
        "puntos": [
          "Pruebas sustantivas sobre saldos y transacciones",
          "Revisión analítica de tendencias y ratios",
          "Confirmaciones externas (bancos, clientes, proveedores)",
          "Verificación de estimaciones contables"
        ]
      },
      {
        "numero": 3,
        "titulo": "Conclusión",
        "puntos": [
          "Informe de auditoría con opinión independiente",
          "Carta de recomendaciones a la dirección",
          "Presentación de resultados al consejo",
          "Seguimiento de observaciones del ejercicio anterior"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Auditorías anuales", "value": "200+", "description": "Informes emitidos cada ejercicio"},
    {"label": "Experiencia", "value": "30 años", "description": "Equipo especializado en auditoría"},
    {"label": "Sectores", "value": "25+", "description": "Cobertura multisectorial"}
  ]'::jsonb
WHERE id = 'f30517aa-e901-4ce8-895d-f19385f4035f';

-- 2. Auditoría de Cuentas Consolidadas
UPDATE services SET
  features_es = ARRAY[
    'Auditoría de estados financieros consolidados del grupo',
    'Coordinación con auditores de filiales (nacionales e internacionales)',
    'Revisión de ajustes de consolidación y eliminaciones',
    'Verificación del perímetro de consolidación',
    'Análisis de transacciones intragrupo',
    'Aplicación de NIIFs y normativa local'
  ],
  typical_clients_es = ARRAY[
    'Grupos empresariales con filiales',
    'Holdings y sociedades matrices',
    'Grupos cotizados y pre-cotizados',
    'Multinacionales con presencia en España',
    'Family offices con estructuras complejas'
  ],
  benefits_es = 'La auditoría consolidada ofrece una visión integral del grupo empresarial, asegurando la correcta agregación de todas las entidades. Facilita el cumplimiento regulatorio, mejora la toma de decisiones estratégicas y refuerza la confianza de stakeholders en la información financiera global.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Visión Global", "Control Integral"],
    "introduccion": "Nuestro enfoque de consolidación combina la coordinación con auditores locales y el conocimiento profundo de la normativa internacional. Garantizamos consistencia en los criterios aplicados en todo el grupo.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Alcance del Grupo",
        "puntos": [
          "Definición del perímetro de consolidación",
          "Identificación de participadas y asociadas",
          "Coordinación con auditores de componentes",
          "Establecimiento de umbrales de materialidad por entidad"
        ]
      },
      {
        "numero": 2,
        "titulo": "Proceso de Consolidación",
        "puntos": [
          "Revisión de ajustes de homogeneización",
          "Verificación de eliminaciones intragrupo",
          "Análisis del fondo de comercio y deterioros",
          "Conversión de moneda extranjera"
        ]
      },
      {
        "numero": 3,
        "titulo": "Informe Consolidado",
        "puntos": [
          "Opinión sobre estados consolidados",
          "Carta de recomendaciones al grupo",
          "Informe de gestión consolidado",
          "Comunicación con el comité de auditoría"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Grupos auditados", "value": "50+", "description": "Consolidaciones anuales"},
    {"label": "Países", "value": "15+", "description": "Coordinación internacional"},
    {"label": "Filiales", "value": "300+", "description": "Componentes gestionados"}
  ]'::jsonb
WHERE id = '55fc3b74-8004-4edf-aac0-5d9cdc950913';

-- =============================================
-- AUDITORÍA DE CUMPLIMIENTO (4 servicios)
-- =============================================

-- 3. Auditoría de Subvenciones Públicas
UPDATE services SET
  features_es = ARRAY[
    'Verificación del cumplimiento de bases reguladoras',
    'Revisión de la justificación económica del gasto',
    'Auditoría de aplicación de fondos europeos (FEDER, FSE)',
    'Certificación para organismos concedentes',
    'Control de elegibilidad de costes',
    'Seguimiento de indicadores y objetivos'
  ],
  typical_clients_es = ARRAY[
    'Empresas beneficiarias de subvenciones públicas',
    'Entidades con proyectos de I+D+i subvencionados',
    'Beneficiarios de fondos europeos',
    'Administraciones públicas',
    'Universidades y centros de investigación'
  ],
  benefits_es = 'Garantiza el cumplimiento de los requisitos de justificación ante organismos concedentes, minimizando el riesgo de reintegro. Proporciona seguridad jurídica y facilita la obtención de futuras subvenciones al demostrar un historial de cumplimiento.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Cumplimiento Garantizado", "Justificación Segura"],
    "introduccion": "Especializados en la normativa de subvenciones públicas y fondos europeos, verificamos que cada euro esté correctamente justificado según las bases reguladoras aplicables.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Análisis Normativo",
        "puntos": [
          "Estudio de bases reguladoras y convocatoria",
          "Identificación de requisitos de elegibilidad",
          "Verificación del período subvencionable",
          "Análisis de límites y porcentajes aplicables"
        ]
      },
      {
        "numero": 2,
        "titulo": "Verificación Documental",
        "puntos": [
          "Revisión de facturas y justificantes de pago",
          "Comprobación de la trazabilidad del gasto",
          "Verificación de publicidad y difusión",
          "Control de contratación y concurrencia"
        ]
      },
      {
        "numero": 3,
        "titulo": "Certificación",
        "puntos": [
          "Emisión de informe de auditor independiente",
          "Cuenta justificativa según modelo oficial",
          "Soporte ante requerimientos del organismo",
          "Archivo y custodia de documentación"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Subvenciones auditadas", "value": "100+", "description": "Proyectos certificados anualmente"},
    {"label": "Fondos verificados", "value": "50M€+", "description": "Volumen anual justificado"},
    {"label": "Tasa de aprobación", "value": "99%", "description": "Sin requerimientos de reintegro"}
  ]'::jsonb
WHERE id = 'f95e58ef-0c8b-44b2-808d-f45e5be61e80';

-- 4. Auditoría para Contratos Públicos
UPDATE services SET
  features_es = ARRAY[
    'Clasificación y registro de contratistas',
    'Verificación de solvencia económica y técnica',
    'Auditoría de ejecución de contratos públicos',
    'Revisión de modificados y complementarios',
    'Certificación de cuentas para licitaciones',
    'Informes para clasificación empresarial'
  ],
  typical_clients_es = ARRAY[
    'Contratistas del sector público',
    'Empresas en proceso de clasificación',
    'Constructoras y empresas de servicios',
    'UTE y consorcios licitadores',
    'Concesionarios de servicios públicos'
  ],
  benefits_es = 'Facilita el acceso a la contratación pública mediante la acreditación de solvencia. Asegura el cumplimiento durante la ejecución del contrato y minimiza riesgos de penalizaciones o exclusiones en futuros procedimientos.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Acceso al Sector Público", "Cumplimiento Contractual"],
    "introduccion": "Conocemos en profundidad la Ley de Contratos del Sector Público y los requisitos específicos de cada tipo de contrato, garantizando el cumplimiento en todas las fases.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Pre-Licitación",
        "puntos": [
          "Análisis de requisitos de solvencia",
          "Preparación de documentación acreditativa",
          "Auditoría de cuentas para clasificación",
          "Verificación de prohibiciones de contratar"
        ]
      },
      {
        "numero": 2,
        "titulo": "Ejecución Contractual",
        "puntos": [
          "Seguimiento del cumplimiento de plazos",
          "Control de certificaciones de obra/servicio",
          "Revisión de modificados contractuales",
          "Gestión de incidencias y reclamaciones"
        ]
      },
      {
        "numero": 3,
        "titulo": "Liquidación",
        "puntos": [
          "Auditoría de cuenta final",
          "Certificación de cumplimiento",
          "Liberación de garantías",
          "Archivo de expediente"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Contratos auditados", "value": "150+", "description": "En el último ejercicio"},
    {"label": "Volumen", "value": "200M€+", "description": "En contratos verificados"},
    {"label": "Clasificaciones", "value": "50+", "description": "Empresas asesoradas"}
  ]'::jsonb
WHERE id = 'cdd7d719-4b52-4a4f-ac93-9d0ae5f1824a';

-- 5. Auditoría de Fundaciones y Entidades No Lucrativas
UPDATE services SET
  features_es = ARRAY[
    'Auditoría de cuentas anuales según Plan Contable de ENL',
    'Verificación del cumplimiento de fines fundacionales',
    'Revisión de la memoria de actividades',
    'Auditoría de subvenciones y donaciones recibidas',
    'Verificación del destino de rentas e ingresos',
    'Informe para Protectorado y órganos de supervisión'
  ],
  typical_clients_es = ARRAY[
    'Fundaciones privadas y públicas',
    'Asociaciones declaradas de utilidad pública',
    'ONGs y entidades del tercer sector',
    'Patronatos y órganos de gobierno',
    'Donantes institucionales'
  ],
  benefits_es = 'Garantiza la transparencia ante donantes, beneficiarios y organismos supervisores. Demuestra el cumplimiento de fines fundacionales y el uso adecuado de los recursos. Refuerza la credibilidad institucional y facilita el acceso a nuevas fuentes de financiación.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Transparencia del Tercer Sector", "Confianza Institucional"],
    "introduccion": "Especializados en el marco normativo de fundaciones y ENL, combinamos rigor técnico con sensibilidad hacia la misión social de cada entidad.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Marco Normativo",
        "puntos": [
          "Análisis de estatutos y fines fundacionales",
          "Verificación del cumplimiento de la Ley de Fundaciones",
          "Revisión de obligaciones con Protectorado",
          "Aplicación del Plan Contable de ENL"
        ]
      },
      {
        "numero": 2,
        "titulo": "Verificación de Actividades",
        "puntos": [
          "Auditoría de programas y proyectos",
          "Revisión del destino de fondos recibidos",
          "Verificación de indicadores de impacto",
          "Control de gastos de estructura vs. actividad"
        ]
      },
      {
        "numero": 3,
        "titulo": "Reporting",
        "puntos": [
          "Informe de auditoría para Protectorado",
          "Memoria de actividades verificada",
          "Cuenta de resultados por actividad",
          "Certificaciones para donantes"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "ENL auditadas", "value": "80+", "description": "Fundaciones y asociaciones"},
    {"label": "Fondos verificados", "value": "100M€+", "description": "Anualmente"},
    {"label": "Satisfacción", "value": "98%", "description": "De patronatos y juntas directivas"}
  ]'::jsonb
WHERE id = 'e89df3f7-2953-4687-9667-abdc72261ece';

-- 6. Auditoría de Cooperativas
UPDATE services SET
  features_es = ARRAY[
    'Auditoría según normativa cooperativa aplicable',
    'Verificación del cumplimiento de principios cooperativos',
    'Revisión del Fondo de Educación y Promoción',
    'Auditoría de retornos cooperativos',
    'Verificación de operaciones con socios',
    'Informe para Asamblea General'
  ],
  typical_clients_es = ARRAY[
    'Cooperativas de trabajo asociado',
    'Cooperativas agrarias',
    'Cooperativas de consumo y servicios',
    'Cooperativas de viviendas',
    'Consejos rectores y socios'
  ],
  benefits_es = 'Garantiza el cumplimiento de la normativa cooperativa específica y los principios del movimiento cooperativo. Aporta transparencia ante los socios y facilita la toma de decisiones en Asamblea con información financiera fiable.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Especialistas en Cooperativismo", "Transparencia para Socios"],
    "introduccion": "Conocemos las particularidades del régimen jurídico y contable cooperativo, adaptando nuestra auditoría a las necesidades específicas de cada tipo de cooperativa.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Marco Cooperativo",
        "puntos": [
          "Análisis de estatutos y normativa aplicable",
          "Verificación de principios cooperativos",
          "Revisión del régimen económico",
          "Control del cumplimiento societario"
        ]
      },
      {
        "numero": 2,
        "titulo": "Fondos Obligatorios",
        "puntos": [
          "Auditoría del Fondo de Reserva Obligatorio",
          "Verificación del Fondo de Educación y Promoción",
          "Control de dotaciones y aplicaciones",
          "Revisión de retornos cooperativos"
        ]
      },
      {
        "numero": 3,
        "titulo": "Asamblea y Reporting",
        "puntos": [
          "Informe de auditoría para Asamblea General",
          "Verificación de operaciones con socios",
          "Certificaciones requeridas",
          "Asesoramiento al Consejo Rector"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Cooperativas auditadas", "value": "40+", "description": "De diversos sectores"},
    {"label": "Socios", "value": "5.000+", "description": "Representados"},
    {"label": "Experiencia", "value": "20 años", "description": "En el sector cooperativo"}
  ]'::jsonb
WHERE id = '15ce8c6b-78d3-4592-9649-d945bb68b3a0';

-- =============================================
-- AUDITORÍA ESG (4 servicios)
-- =============================================

-- 7. Verificación CSRD/ESRS
UPDATE services SET
  features_es = ARRAY[
    'Verificación de informes de sostenibilidad según CSRD',
    'Aseguramiento limitado/razonable de indicadores ESRS',
    'Revisión de doble materialidad',
    'Verificación de métricas ESG y KPIs',
    'Análisis de gaps respecto a estándares ESRS',
    'Preparación para futura verificación obligatoria'
  ],
  typical_clients_es = ARRAY[
    'Grandes empresas sujetas a CSRD',
    'Empresas cotizadas',
    'Filiales de grupos europeos',
    'Empresas preparándose para CSRD',
    'Directores de sostenibilidad y RSC'
  ],
  benefits_es = 'Anticipa el cumplimiento de la nueva normativa europea de reporting de sostenibilidad. Proporciona credibilidad a la información ESG ante inversores y stakeholders. Identifica gaps y áreas de mejora antes de la obligatoriedad.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Sostenibilidad Verificada", "Cumplimiento CSRD"],
    "introduccion": "Combinamos conocimiento profundo de los estándares ESRS con experiencia en verificación de información no financiera, garantizando un aseguramiento robusto y útil.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "esg@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Análisis de Materialidad",
        "puntos": [
          "Evaluación de doble materialidad (impacto y financiera)",
          "Identificación de temas materiales ESRS",
          "Análisis de stakeholders relevantes",
          "Mapeo de riesgos y oportunidades ESG"
        ]
      },
      {
        "numero": 2,
        "titulo": "Verificación de Datos",
        "puntos": [
          "Aseguramiento de métricas ambientales (E)",
          "Verificación de indicadores sociales (S)",
          "Revisión de gobernanza (G)",
          "Trazabilidad de datos y controles"
        ]
      },
      {
        "numero": 3,
        "titulo": "Informe de Aseguramiento",
        "puntos": [
          "Informe de verificación independiente",
          "Conclusiones y recomendaciones",
          "Carta de mejoras al proceso de reporting",
          "Preparación para auditoría obligatoria"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Verificaciones CSRD", "value": "25+", "description": "Empresas en transición"},
    {"label": "Indicadores ESRS", "value": "500+", "description": "Verificados anualmente"},
    {"label": "Sectores", "value": "15+", "description": "Con experiencia ESG"}
  ]'::jsonb
WHERE id = 'e8ae2b82-807f-40e9-bf50-0127994473a2';

-- 8. Auditoría de Huella de Carbono
UPDATE services SET
  features_es = ARRAY[
    'Verificación de inventario de emisiones GEI (Alcance 1, 2 y 3)',
    'Auditoría según ISO 14064 y GHG Protocol',
    'Verificación para registro MITECO',
    'Validación de objetivos Science Based Targets',
    'Revisión de planes de reducción y compensación',
    'Verificación de neutralidad de carbono'
  ],
  typical_clients_es = ARRAY[
    'Empresas con compromisos Net Zero',
    'Organizaciones que reportan huella de carbono',
    'Empresas sujetas a ETS o CBAM',
    'Compañías con objetivos SBTi',
    'Responsables de medio ambiente'
  ],
  benefits_es = 'Proporciona credibilidad a los datos de emisiones ante reguladores, inversores y clientes. Valida los progresos hacia objetivos climáticos. Requisito para inscripción en el registro MITECO y para certificaciones de neutralidad.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Emisiones Verificadas", "Credibilidad Climática"],
    "introduccion": "Auditores acreditados en verificación de GEI aplicamos estándares internacionales para garantizar la fiabilidad de la información climática reportada.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "esg@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Límites y Alcance",
        "puntos": [
          "Definición del límite organizacional",
          "Identificación de fuentes de emisión",
          "Categorización por alcances (1, 2 y 3)",
          "Selección de factores de emisión"
        ]
      },
      {
        "numero": 2,
        "titulo": "Verificación de Datos",
        "puntos": [
          "Revisión de datos de actividad",
          "Verificación de cálculos de emisiones",
          "Comprobación de exclusiones justificadas",
          "Análisis de incertidumbre"
        ]
      },
      {
        "numero": 3,
        "titulo": "Certificación",
        "puntos": [
          "Informe de verificación ISO 14064",
          "Declaración para registro MITECO",
          "Validación de objetivos SBTi",
          "Certificación de compensaciones"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Huellas verificadas", "value": "60+", "description": "Organizaciones anuales"},
    {"label": "Emisiones", "value": "2Mt CO2e", "description": "Verificadas anualmente"},
    {"label": "Registro MITECO", "value": "100%", "description": "Tasa de inscripción exitosa"}
  ]'::jsonb
WHERE id = '1746eaa2-ea29-47cb-b1b8-4bae665bd18c';

-- 9. Verificación Taxonomía UE
UPDATE services SET
  features_es = ARRAY[
    'Evaluación de elegibilidad y alineamiento con Taxonomía UE',
    'Análisis de actividades económicas por objetivo ambiental',
    'Verificación de criterios técnicos de selección (TSC)',
    'Revisión del principio DNSH (Do No Significant Harm)',
    'Verificación de salvaguardas sociales mínimas',
    'Cálculo de KPIs de Taxonomía (CapEx, OpEx, Revenue)'
  ],
  typical_clients_es = ARRAY[
    'Empresas sujetas a reporting de Taxonomía',
    'Entidades financieras y gestoras de activos',
    'Empresas cotizadas',
    'Emisores de bonos verdes',
    'Directores financieros y de sostenibilidad'
  ],
  benefits_es = 'Garantiza el cumplimiento del Reglamento de Taxonomía UE. Facilita el acceso a financiación sostenible y bonos verdes. Mejora la transparencia ante inversores ESG y evita riesgos de greenwashing.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Taxonomía UE", "Finanzas Sostenibles"],
    "introduccion": "Expertos en el Reglamento de Taxonomía y sus actos delegados, verificamos la correcta aplicación de los criterios técnicos para cada actividad económica.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "esg@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Elegibilidad",
        "puntos": [
          "Identificación de actividades elegibles",
          "Mapeo con códigos NACE",
          "Análisis por objetivo ambiental",
          "Determinación del denominador de KPIs"
        ]
      },
      {
        "numero": 2,
        "titulo": "Alineamiento",
        "puntos": [
          "Verificación de contribución sustancial",
          "Evaluación del principio DNSH",
          "Revisión de salvaguardas sociales",
          "Documentación de evidencias"
        ]
      },
      {
        "numero": 3,
        "titulo": "Reporting",
        "puntos": [
          "Cálculo de KPIs (Revenue, CapEx, OpEx)",
          "Informe de verificación independiente",
          "Integración en estados financieros",
          "Disclosure según SFDR/NFRD/CSRD"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Verificaciones", "value": "30+", "description": "Empresas analizadas"},
    {"label": "Actividades", "value": "100+", "description": "Evaluadas por Taxonomía"},
    {"label": "Objetivos", "value": "6", "description": "Ambientales cubiertos"}
  ]'::jsonb
WHERE id = '920a6c63-248b-40dc-89b6-5c5dfad5eac3';

-- 10. Auditoría de Información No Financiera (EINF)
UPDATE services SET
  features_es = ARRAY[
    'Verificación del Estado de Información No Financiera',
    'Revisión de contenidos según Ley 11/2018',
    'Auditoría de indicadores ESG y GRI',
    'Verificación de políticas de diversidad e igualdad',
    'Revisión de información sobre derechos humanos',
    'Transición a verificación CSRD'
  ],
  typical_clients_es = ARRAY[
    'Empresas obligadas por Ley 11/2018',
    'Sociedades de interés público',
    'Empresas con más de 250 empleados',
    'Grupos consolidados',
    'Empresas en transición a CSRD'
  ],
  benefits_es = 'Cumple con las obligaciones legales de reporting no financiero en España. Proporciona credibilidad ante stakeholders sobre el desempeño ESG. Prepara a la organización para los requisitos más exigentes de CSRD.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Transparencia No Financiera", "Cumplimiento Legal"],
    "introduccion": "Verificamos el cumplimiento de la normativa española de información no financiera, preparando a las empresas para la transición hacia CSRD.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "esg@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Contenidos EINF",
        "puntos": [
          "Revisión de información ambiental",
          "Verificación de aspectos sociales y laborales",
          "Análisis de derechos humanos",
          "Revisión de lucha contra corrupción"
        ]
      },
      {
        "numero": 2,
        "titulo": "Indicadores y Métricas",
        "puntos": [
          "Verificación de KPIs reportados",
          "Revisión de marcos de referencia (GRI, ODS)",
          "Trazabilidad de datos",
          "Consistencia con memoria de actividades"
        ]
      },
      {
        "numero": 3,
        "titulo": "Informe de Verificación",
        "puntos": [
          "Informe de auditor independiente",
          "Conclusiones sobre cumplimiento",
          "Recomendaciones de mejora",
          "Roadmap hacia CSRD"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "EINF verificados", "value": "70+", "description": "Informes anuales"},
    {"label": "Indicadores", "value": "200+", "description": "Revisados por informe"},
    {"label": "Sectores", "value": "20+", "description": "Con experiencia"}
  ]'::jsonb
WHERE id = 'd8b4f6f7-4624-4836-940c-e2513c8221ff';

-- =============================================
-- AUDITORÍA TRANSACCIONAL (4 servicios)
-- =============================================

-- 11. Due Diligence Financiera
UPDATE services SET
  features_es = ARRAY[
    'Análisis de calidad de beneficios (Quality of Earnings)',
    'Revisión de deuda neta y capital circulante',
    'Identificación de ajustes normalizados',
    'Análisis de tendencias históricas',
    'Evaluación de proyecciones y planes de negocio',
    'Red flags y deal breakers'
  ],
  typical_clients_es = ARRAY[
    'Fondos de private equity',
    'Compradores corporativos (M&A)',
    'Family offices',
    'Bancos de inversión',
    'Asesores de transacciones'
  ],
  benefits_es = 'Proporciona una visión independiente de la situación financiera real de la target. Identifica riesgos ocultos y ajustes al precio. Facilita la negociación y la estructuración de garantías en el SPA.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Due Diligence M&A", "Decisiones Informadas"],
    "introduccion": "Equipo especializado en transacciones con experiencia en múltiples sectores y tamaños de operación. Informes claros y orientados a la toma de decisiones.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "transacciones@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Alcance y Planificación",
        "puntos": [
          "Definición de alcance con el cliente",
          "Acceso a data room y management",
          "Lista de información requerida",
          "Cronograma de trabajo"
        ]
      },
      {
        "numero": 2,
        "titulo": "Análisis Financiero",
        "puntos": [
          "Quality of Earnings (QoE)",
          "Análisis de deuda neta",
          "Revisión de capital circulante",
          "Evaluación de Capex y activos"
        ]
      },
      {
        "numero": 3,
        "titulo": "Reporting",
        "puntos": [
          "Informe de Due Diligence",
          "Executive Summary para comité",
          "Sesiones con compradores/vendedores",
          "Soporte en negociación de SPA"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Transacciones", "value": "80+", "description": "Due diligences completadas"},
    {"label": "Deal value", "value": "2.000M€+", "description": "Valor acumulado de operaciones"},
    {"label": "Sectores", "value": "25+", "description": "Experiencia multisectorial"}
  ]'::jsonb
WHERE id = 'bebb857a-1a1f-49c8-8cad-8d243e1ecd7a';

-- 12. Due Diligence Fiscal
UPDATE services SET
  features_es = ARRAY[
    'Revisión de contingencias fiscales',
    'Análisis de posiciones fiscales agresivas',
    'Verificación de bases imponibles negativas',
    'Revisión de precios de transferencia',
    'Evaluación de incentivos fiscales aplicados',
    'Análisis de estructura fiscal del grupo'
  ],
  typical_clients_es = ARRAY[
    'Fondos de private equity',
    'Compradores corporativos',
    'Vendedores preparando la transacción',
    'Asesores fiscales de deals',
    'Comités de inversión'
  ],
  benefits_es = 'Identifica contingencias fiscales que pueden afectar al precio o requerir garantías específicas. Evalúa la sostenibilidad de la estructura fiscal post-transacción. Detecta oportunidades de optimización fiscal.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Riesgos Fiscales", "Transacciones Seguras"],
    "introduccion": "Combinamos conocimiento fiscal profundo con experiencia transaccional para identificar riesgos y oportunidades fiscales en operaciones de M&A.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "transacciones@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Análisis de Contingencias",
        "puntos": [
          "Revisión de ejercicios abiertos a inspección",
          "Evaluación de actas e inspecciones previas",
          "Análisis de posiciones fiscales inciertas",
          "Cuantificación de exposiciones"
        ]
      },
      {
        "numero": 2,
        "titulo": "Estructura Fiscal",
        "puntos": [
          "Revisión de precios de transferencia",
          "Análisis de operaciones vinculadas",
          "Evaluación de incentivos y deducciones",
          "Sostenibilidad post-deal"
        ]
      },
      {
        "numero": 3,
        "titulo": "Reporting y Negociación",
        "puntos": [
          "Informe de Tax Due Diligence",
          "Recomendaciones para SPA",
          "Diseño de cláusulas de garantía fiscal",
          "Soporte en closing"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Tax DD", "value": "60+", "description": "Realizadas anualmente"},
    {"label": "Contingencias", "value": "150M€+", "description": "Identificadas en deals"},
    {"label": "Recuperación", "value": "85%", "description": "En negociaciones de precio"}
  ]'::jsonb
WHERE id = 'c090f52b-3c53-4119-8789-2e8d79270b8b';

-- 13. Vendor Due Diligence
UPDATE services SET
  features_es = ARRAY[
    'Informe de Due Diligence desde perspectiva del vendedor',
    'Quality of Earnings y normalización de EBITDA',
    'Fact Book financiero para potenciales compradores',
    'Identificación proactiva de issues',
    'Preparación del data room',
    'Soporte durante el proceso de venta'
  ],
  typical_clients_es = ARRAY[
    'Propietarios preparando la venta',
    'Private equity en desinversión',
    'Family offices vendiendo participaciones',
    'Asesores de sell-side',
    'Management en MBO/MBI'
  ],
  benefits_es = 'Anticipa las preguntas de los compradores y acelera el proceso de venta. Permite al vendedor controlar la narrativa financiera. Reduce la incertidumbre y facilita mejores valoraciones.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Venta Preparada", "Valor Maximizado"],
    "introduccion": "Preparamos a las empresas para el escrutinio de los compradores, identificando y documentando los aspectos clave que maximizan el valor de la transacción.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "transacciones@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Diagnóstico Inicial",
        "puntos": [
          "Revisión de información financiera histórica",
          "Identificación de áreas sensibles",
          "Análisis de equity story financiera",
          "Preparación de materiales"
        ]
      },
      {
        "numero": 2,
        "titulo": "Vendor DD Report",
        "puntos": [
          "Quality of Earnings detallado",
          "Análisis de deuda neta y NWC",
          "Documentación de ajustes",
          "Fact Book para compradores"
        ]
      },
      {
        "numero": 3,
        "titulo": "Soporte al Proceso",
        "puntos": [
          "Preparación del data room financiero",
          "Sesiones con potenciales compradores",
          "Respuesta a Q&A de compradores",
          "Soporte hasta signing/closing"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Vendor DD", "value": "40+", "description": "Procesos de venta asistidos"},
    {"label": "Mejora valoración", "value": "15%", "description": "Media en negociaciones"},
    {"label": "Tiempo proceso", "value": "-30%", "description": "Reducción media"}
  ]'::jsonb
WHERE id = 'e193726a-4e7f-4a08-9c65-9c65f3e150f8';

-- 14. Due Diligence Operativa
UPDATE services SET
  features_es = ARRAY[
    'Análisis de procesos operativos clave',
    'Evaluación de cadena de suministro',
    'Revisión de sistemas IT y tecnología',
    'Análisis de recursos humanos y organización',
    'Identificación de sinergias operativas',
    'Evaluación de plan de integración (PMI)'
  ],
  typical_clients_es = ARRAY[
    'Compradores estratégicos',
    'Private equity con enfoque operativo',
    'Empresas en procesos de integración',
    'Comités de inversión',
    'Directores de operaciones'
  ],
  benefits_es = 'Complementa la due diligence financiera con una visión operativa profunda. Identifica riesgos operativos y oportunidades de mejora. Cuantifica sinergias para la valoración y planifica la integración post-deal.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Visión Operativa", "Sinergias Reales"],
    "introduccion": "Analizamos las operaciones de la target desde la perspectiva de un futuro propietario, identificando riesgos, oportunidades y sinergias realizables.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "transacciones@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Procesos Core",
        "puntos": [
          "Mapeo de procesos críticos",
          "Análisis de capacidad y eficiencia",
          "Revisión de supply chain",
          "Evaluación de clientes clave"
        ]
      },
      {
        "numero": 2,
        "titulo": "Organización y Sistemas",
        "puntos": [
          "Análisis de estructura organizativa",
          "Revisión de sistemas IT",
          "Evaluación de talento clave",
          "Dependencias de personas"
        ]
      },
      {
        "numero": 3,
        "titulo": "Sinergias e Integración",
        "puntos": [
          "Cuantificación de sinergias de costes",
          "Identificación de sinergias de ingresos",
          "Plan de integración preliminar",
          "Quick wins post-cierre"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Ops DD", "value": "35+", "description": "Realizadas"},
    {"label": "Sinergias", "value": "50M€+", "description": "Identificadas en total"},
    {"label": "PMI", "value": "20+", "description": "Planes de integración"}
  ]'::jsonb
WHERE id = 'df5e465b-8fca-4044-9ce7-4e371f49ce62';

-- =============================================
-- AUDITORÍA INTERNA (4 servicios)
-- =============================================

-- 15. Outsourcing de Auditoría Interna
UPDATE services SET
  features_es = ARRAY[
    'Externalización total o parcial de auditoría interna',
    'Plan anual de auditoría basado en riesgos',
    'Ejecución de auditorías operativas y financieras',
    'Seguimiento de recomendaciones',
    'Reporting al Comité de Auditoría',
    'Cosourcing con equipos internos'
  ],
  typical_clients_es = ARRAY[
    'Empresas sin departamento de auditoría interna',
    'Organizaciones con recursos limitados',
    'Comités de auditoría',
    'Directores financieros',
    'Empresas en crecimiento'
  ],
  benefits_es = 'Acceso a expertise especializado sin costes fijos de estructura. Flexibilidad para adaptar recursos según necesidades. Visión independiente y objetiva. Cumplimiento de requisitos de gobierno corporativo.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Auditoría Interna", "Expertise Externo"],
    "introduccion": "Proporcionamos servicios de auditoría interna con la independencia de un externo y el conocimiento profundo de un equipo interno dedicado.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria-interna@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Planificación Anual",
        "puntos": [
          "Evaluación del universo auditable",
          "Análisis de riesgos y priorización",
          "Plan anual de auditoría",
          "Aprobación por Comité de Auditoría"
        ]
      },
      {
        "numero": 2,
        "titulo": "Ejecución",
        "puntos": [
          "Auditorías según plan aprobado",
          "Informes con hallazgos y recomendaciones",
          "Reuniones con responsables de área",
          "Auditorías ad-hoc según necesidad"
        ]
      },
      {
        "numero": 3,
        "titulo": "Seguimiento",
        "puntos": [
          "Tracking de planes de acción",
          "Reporting trimestral al Comité",
          "Evaluación de efectividad",
          "Mejora continua del plan"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Clientes outsourcing", "value": "30+", "description": "Con servicio recurrente"},
    {"label": "Auditorías anuales", "value": "150+", "description": "Ejecutadas"},
    {"label": "Recomendaciones", "value": "85%", "description": "Implementadas en plazo"}
  ]'::jsonb
WHERE id = '6349aa0c-8f01-4458-bc32-a739a629e218';

-- 16. Evaluación de Control Interno (COSO)
UPDATE services SET
  features_es = ARRAY[
    'Evaluación según marco COSO 2013/2017',
    'Análisis de los 5 componentes de control',
    'Evaluación de 17 principios COSO',
    'Identificación de deficiencias significativas',
    'Diseño de controles y matrices de riesgo',
    'Preparación para SOX/certificaciones'
  ],
  typical_clients_es = ARRAY[
    'Empresas cotizadas o pre-cotización',
    'Filiales de multinacionales con requisitos SOX',
    'Empresas en procesos de mejora de gobierno',
    'Directores financieros y de control',
    'Comités de auditoría'
  ],
  benefits_es = 'Proporciona una evaluación estructurada del sistema de control interno. Identifica gaps y debilidades antes de que se materialicen en errores. Facilita el cumplimiento de requisitos regulatorios y de gobierno corporativo.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Marco COSO", "Control Efectivo"],
    "introduccion": "Aplicamos el marco COSO de manera práctica y adaptada a la realidad de cada organización, priorizando los controles que realmente mitigan riesgos.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria-interna@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Entorno de Control",
        "puntos": [
          "Evaluación del tone at the top",
          "Análisis de estructura organizativa",
          "Revisión de políticas y procedimientos",
          "Cultura de control y ética"
        ]
      },
      {
        "numero": 2,
        "titulo": "Evaluación de Riesgos",
        "puntos": [
          "Identificación de riesgos clave",
          "Análisis de probabilidad e impacto",
          "Mapeo de controles existentes",
          "Gaps de control identificados"
        ]
      },
      {
        "numero": 3,
        "titulo": "Actividades de Control",
        "puntos": [
          "Testing de controles clave",
          "Evaluación de diseño y efectividad",
          "Matriz de controles SOX-ready",
          "Plan de remediación"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Evaluaciones COSO", "value": "50+", "description": "Realizadas"},
    {"label": "Controles", "value": "2.000+", "description": "Testeados anualmente"},
    {"label": "Certificaciones SOX", "value": "15+", "description": "Clientes preparados"}
  ]'::jsonb
WHERE id = 'f3b299ef-a630-49ce-b2d8-8c66520034ec';

-- 17. Auditoría de Cumplimiento Normativo
UPDATE services SET
  features_es = ARRAY[
    'Evaluación del programa de compliance',
    'Auditoría del canal de denuncias',
    'Revisión de políticas anticorrupción',
    'Verificación de cumplimiento RGPD/LOPDGDD',
    'Auditoría de prevención de blanqueo (PBC)',
    'Evaluación de riesgos penales (compliance penal)'
  ],
  typical_clients_es = ARRAY[
    'Empresas con programas de compliance',
    'Directores de cumplimiento normativo',
    'Comités de ética y cumplimiento',
    'Empresas sujetas a regulación sectorial',
    'Organizaciones con riesgo reputacional'
  ],
  benefits_es = 'Verifica la efectividad del programa de compliance. Identifica gaps normativos antes de que se conviertan en sanciones. Demuestra diligencia debida ante reguladores. Reduce riesgos penales corporativos.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Compliance Verificado", "Riesgos Mitigados"],
    "introduccion": "Evaluamos programas de compliance desde una perspectiva práctica, verificando que los controles diseñados funcionan efectivamente en la realidad operativa.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria-interna@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Marco de Compliance",
        "puntos": [
          "Revisión de políticas y códigos",
          "Evaluación de estructura de compliance",
          "Análisis de tone at the top",
          "Revisión de formación y comunicación"
        ]
      },
      {
        "numero": 2,
        "titulo": "Controles Específicos",
        "puntos": [
          "Auditoría del canal de denuncias",
          "Testing de controles anticorrupción",
          "Verificación de due diligence de terceros",
          "Revisión de registros y documentación"
        ]
      },
      {
        "numero": 3,
        "titulo": "Reporting",
        "puntos": [
          "Informe de auditoría de compliance",
          "Gaps y recomendaciones priorizadas",
          "Benchmarking con mejores prácticas",
          "Plan de mejora y seguimiento"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Auditorías compliance", "value": "45+", "description": "Anuales"},
    {"label": "Programas evaluados", "value": "100+", "description": "En distintos sectores"},
    {"label": "Reducción sanciones", "value": "90%", "description": "En clientes recurrentes"}
  ]'::jsonb
WHERE id = '522d7f7d-bdbd-4595-b769-f870bb01e94d';

-- 18. Auditoría de Sistemas IT (COBIT)
UPDATE services SET
  features_es = ARRAY[
    'Evaluación según marco COBIT 2019',
    'Auditoría de controles generales IT (ITGC)',
    'Revisión de seguridad de la información',
    'Evaluación de continuidad de negocio IT',
    'Auditoría de aplicaciones críticas',
    'Cumplimiento de normativas IT (ENS, ISO 27001)'
  ],
  typical_clients_es = ARRAY[
    'Empresas con dependencia tecnológica',
    'Directores de sistemas y CIOs',
    'Empresas cotizadas con requisitos SOX IT',
    'Organizaciones con datos sensibles',
    'Entidades sujetas a regulación sectorial'
  ],
  benefits_es = 'Identifica vulnerabilidades y riesgos tecnológicos. Verifica la efectividad de controles IT. Asegura la integridad de los sistemas que soportan la información financiera. Facilita certificaciones y cumplimiento normativo.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Auditoría IT", "Seguridad y Control"],
    "introduccion": "Aplicamos marcos reconocidos internacionalmente (COBIT, ITIL, ISO 27001) para evaluar el gobierno y gestión de la tecnología de la información.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria-interna@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Gobierno IT",
        "puntos": [
          "Evaluación de estrategia IT",
          "Análisis de estructura y organización",
          "Revisión de políticas y estándares",
          "Alineamiento IT-negocio"
        ]
      },
      {
        "numero": 2,
        "titulo": "Controles Generales",
        "puntos": [
          "Gestión de accesos y segregación",
          "Gestión de cambios y desarrollo",
          "Operaciones y monitorización",
          "Backup y recuperación"
        ]
      },
      {
        "numero": 3,
        "titulo": "Seguridad y Continuidad",
        "puntos": [
          "Evaluación de ciberseguridad",
          "Plan de continuidad de negocio",
          "Gestión de incidentes",
          "Cumplimiento normativo (ENS, RGPD)"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Auditorías IT", "value": "40+", "description": "Anuales"},
    {"label": "Aplicaciones", "value": "100+", "description": "Revisadas"},
    {"label": "Certificaciones", "value": "25+", "description": "Clientes certificados ISO 27001"}
  ]'::jsonb
WHERE id = 'a9e74663-42e0-4536-a563-24e6b8345746';

-- =============================================
-- INFORMES ESPECIALES (3 servicios)
-- =============================================

-- 19. Informes Especiales de Auditor
UPDATE services SET
  features_es = ARRAY[
    'Informes para ampliaciones de capital',
    'Certificaciones para operaciones societarias',
    'Informes sobre aportaciones no dinerarias',
    'Valoraciones para fusiones y escisiones',
    'Informes para exclusión de derecho de suscripción',
    'Certificaciones para Registro Mercantil'
  ],
  typical_clients_es = ARRAY[
    'Empresas en procesos de reestructuración',
    'Sociedades realizando ampliaciones de capital',
    'Notarías y registros mercantiles',
    'Asesores legales corporativos',
    'Consejos de administración'
  ],
  benefits_es = 'Cumple requisitos legales para operaciones societarias. Proporciona seguridad jurídica a las transacciones. Facilita la inscripción en el Registro Mercantil. Protege a administradores y socios.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Informes Legales", "Seguridad Jurídica"],
    "introduccion": "Emitimos informes especiales requeridos por la legislación mercantil con rigor técnico y cumpliendo los plazos de las operaciones societarias.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Análisis del Encargo",
        "puntos": [
          "Identificación de requisitos legales",
          "Definición del alcance del informe",
          "Coordinación con asesores legales",
          "Cronograma adaptado a la operación"
        ]
      },
      {
        "numero": 2,
        "titulo": "Trabajo de Campo",
        "puntos": [
          "Verificación de la información base",
          "Análisis de valoraciones cuando aplique",
          "Revisión de documentación societaria",
          "Comprobaciones específicas requeridas"
        ]
      },
      {
        "numero": 3,
        "titulo": "Emisión del Informe",
        "puntos": [
          "Informe según formato legal requerido",
          "Conclusión y opinión del auditor",
          "Entrega para Notaría/Registro",
          "Archivo y custodia"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Informes especiales", "value": "100+", "description": "Emitidos anualmente"},
    {"label": "Operaciones", "value": "500M€+", "description": "Documentadas"},
    {"label": "Registro Mercantil", "value": "100%", "description": "Tasa de inscripción"}
  ]'::jsonb
WHERE id = 'adc0c0a2-fa20-4aca-af1d-090a396e17b8';

-- 20. Procedimientos Acordados (AUP)
UPDATE services SET
  features_es = ARRAY[
    'Procedimientos específicos según necesidad del cliente',
    'Informe de hallazgos factuales',
    'Verificaciones para cláusulas contractuales',
    'Comprobaciones para earn-outs y ajustes de precio',
    'Revisiones de royalties y licencias',
    'Verificaciones para financiadores'
  ],
  typical_clients_es = ARRAY[
    'Empresas con obligaciones contractuales de verificación',
    'Fondos de inversión en seguimiento de participadas',
    'Licenciantes y franquiciadores',
    'Entidades financieras',
    'Partes en contratos con cláusulas de auditoría'
  ],
  benefits_es = 'Flexibilidad para diseñar procedimientos a medida. Cumple obligaciones contractuales de verificación. Coste-eficiente al enfocarse solo en áreas específicas. Informe factual sin opinión de auditoría.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Procedimientos a Medida", "Hallazgos Factuales"],
    "introduccion": "Diseñamos y ejecutamos procedimientos específicos acordados con el cliente, reportando hallazgos factuales sin emitir opinión sobre los estados financieros.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Diseño de Procedimientos",
        "puntos": [
          "Reunión con cliente y partes interesadas",
          "Definición de procedimientos específicos",
          "Carta de encargo con alcance detallado",
          "Acuerdo sobre formato de reporting"
        ]
      },
      {
        "numero": 2,
        "titulo": "Ejecución",
        "puntos": [
          "Aplicación de procedimientos acordados",
          "Documentación de evidencia obtenida",
          "Verificaciones específicas",
          "Reuniones de seguimiento"
        ]
      },
      {
        "numero": 3,
        "titulo": "Informe de Hallazgos",
        "puntos": [
          "Informe factual según ISRS 4400",
          "Descripción de procedimientos aplicados",
          "Hallazgos sin expresar opinión",
          "Restricción de uso según acordado"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "AUP realizados", "value": "80+", "description": "Anualmente"},
    {"label": "Tipos de encargo", "value": "50+", "description": "Diferentes procedimientos"},
    {"label": "Clientes", "value": "95%", "description": "Satisfacción con alcance"}
  ]'::jsonb
WHERE id = 'bdc25e80-4bf7-4fc2-8c70-d7407a1a6f36';

-- 21. Revisión Limitada de Estados Financieros
UPDATE services SET
  features_es = ARRAY[
    'Aseguramiento limitado sobre estados financieros',
    'Procedimientos analíticos y de indagación',
    'Conclusión negativa (nada ha llegado a nuestra atención)',
    'Revisiones trimestrales/semestrales',
    'Informes para inversores y financiadores',
    'Coste inferior a auditoría completa'
  ],
  typical_clients_es = ARRAY[
    'Empresas con requisitos de reporting trimestral',
    'Startups y empresas en fase de crecimiento',
    'Empresas con inversores que requieren verificación',
    'Organizaciones sin obligación de auditoría',
    'Directores financieros'
  ],
  benefits_es = 'Proporciona un nivel de aseguramiento a menor coste que la auditoría completa. Ideal para información financiera intermedia. Satisface requisitos de inversores y financiadores. Proceso más rápido y menos intrusivo.',
  metodologia_es = '{
    "overline": "NUESTRA METODOLOGÍA",
    "titulos": ["Aseguramiento Limitado", "Eficiencia y Confianza"],
    "introduccion": "La revisión limitada proporciona un nivel de aseguramiento adecuado mediante procedimientos analíticos e indagaciones, sin el alcance completo de una auditoría.",
    "contacto": {
      "telefono": "+34 93 459 32 28",
      "email": "auditoria@nrro.es"
    },
    "pilares": [
      {
        "numero": 1,
        "titulo": "Alcance Limitado",
        "puntos": [
          "Definición del alcance con el cliente",
          "Identificación de áreas de enfoque",
          "Comprensión del negocio y entorno",
          "Planificación de procedimientos"
        ]
      },
      {
        "numero": 2,
        "titulo": "Procedimientos",
        "puntos": [
          "Análisis de tendencias y ratios",
          "Indagaciones a la dirección",
          "Revisión analítica de partidas clave",
          "Lectura crítica de información"
        ]
      },
      {
        "numero": 3,
        "titulo": "Conclusión",
        "puntos": [
          "Informe de revisión limitada (ISRE 2410)",
          "Conclusión de aseguramiento negativo",
          "Comunicación de hallazgos relevantes",
          "Entrega en plazos reducidos"
        ]
      }
    ]
  }'::jsonb,
  stats_es = '[
    {"label": "Revisiones limitadas", "value": "60+", "description": "Anuales"},
    {"label": "Tiempo medio", "value": "2 semanas", "description": "Desde inicio a informe"},
    {"label": "Ahorro vs auditoría", "value": "40%", "description": "En costes típicamente"}
  ]'::jsonb
WHERE id = 'ca1ce64e-8244-43eb-96ec-46bfe3fb865c';