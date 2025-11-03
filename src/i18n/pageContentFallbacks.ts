import { Language } from '@/contexts/LanguageContext';

interface PageContentFallbacks {
  [language: string]: {
    [pageKey: string]: {
      [sectionKey: string]: any;
    };
  };
}

export const pageContentFallbacks: PageContentFallbacks = {
  es: {
    home: {
      hero: {
        overline: "ASESORAMIENTO INTEGRAL",
        title: "Planifica el futuro<br />Con decisiones hoy.",
        subtitle: "Asesoramos a grupos de empresas y empresas familiares en sus decisiones clave: fiscalidad, sucesión, estructura societaria y compraventa de empresas.",
        cta_primary: {
          text: "Nuestros Servicios",
          link: "/servicios"
        },
        cta_secondary: {
          text: "Contactar",
          link: "/contacto"
        }
      },
      about: {
        overline: "Nosotros navarro",
        title: "Asesoramiento estratégico y legal para empresas y grupos.",
        paragraphs: [
          "En navarro ofrecemos asesoramiento legal, fiscal y estratégico especializado en empresas familiares y estructuras empresariales consolidadas.",
          "Nuestra visión parte de la comprensión profunda de los retos de continuidad, gobernanza y crecimiento que enfrentan las compañías familiares."
        ],
        cta: {
          text: "Conoce más sobre nosotros",
          link: "/nosotros"
        }
      },
      servicios_destacados: {
        overline: "Servicios relevantes",
        services: [
          {
            title: "Asesoramiento Fiscal",
            description: "Optimización tributaria y planificación fiscal estratégica",
            category: "Fiscal",
            features: ["Impuesto de Sociedades", "IRPF", "Planificación fiscal internacional"],
            slug: "asesoramiento-fiscal"
          },
          {
            title: "Derecho Mercantil",
            description: "Gestión integral de operaciones societarias",
            category: "Legal",
            features: ["M&A", "Due Diligence", "Reestructuraciones"],
            slug: "derecho-mercantil"
          }
        ]
      },
      tecnologia: {
        overline: "Tecnología que usamos"
      },
      clientes: {
        overline: "Confían en nosotros"
      },
      datos: {
        items: [
          {
            categoria: "Clientes",
            valor: "300+",
            descripcion: "Más de 300 empresas familiares y grupos confían en navarro."
          },
          {
            categoria: "Proyectos",
            valor: "500+",
            descripcion: "Operaciones de reestructuración, sucesión y M&A completadas con éxito."
          },
          {
            categoria: "Años de experiencia",
            valor: "25+",
            descripcion: "Trayectoria sólida acompañando a empresas familiares en su crecimiento."
          },
          {
            categoria: "Equipo",
            valor: "70+",
            descripcion: "Abogados y profesionales especializados en fiscal, mercantil, laboral y M&A."
          },
          {
            categoria: "Compromiso",
            valor: "100%",
            descripcion: "Dedicación total a cada mandato, con rigor técnico y confidencialidad."
          },
          {
            categoria: "Operaciones M&A",
            valor: "100+",
            descripcion: "Mandatos de compra y venta asesorados con un enfoque integral."
          }
        ]
      }
    },
    about: {
      hero: {
        overline: "NOSOTROS",
        title: "25 años de experiencia. Un proyecto personal.",
        subtitle: "De Garrigues a obn.es, y ahora navarro. Experiencia consolidada, servicio personalizado, máxima ilusión."
      },
      story: {
        overline: "Mi trayectoria",
        titulo: "25 años construyendo relaciones de confianza",
        parrafos: [
          "Mi carrera profesional comenzó en Garrigues, donde durante más de una década desarrollé mi especialización en derecho fiscal y mercantil, trabajando con los equipos más prestigiosos del país.",
          "Posteriormente, cofundé obn.es, una boutique especializada en asesoramiento fiscal y mercantil para empresas familiares y grupos empresariales, donde consolidé mi enfoque personalizado y cercano.",
          "Hoy, navarro representa la culminación de toda esa experiencia: un despacho que combina el rigor técnico de las grandes firmas con la atención personal y el compromiso que solo puede ofrecer un proyecto propio."
        ],
        destacado: "Más de 25 años ayudando a empresas y familias a tomar las mejores decisiones."
      },
      timeline: {
        overline: "Trayectoria",
        hitos: [
          {
            periodo: "1998-2010",
            titulo: "Garrigues",
            descripcion: "Formación en una de las firmas más prestigiosas de España, especializándome en derecho fiscal y mercantil.",
            icon: "Building"
          },
          {
            periodo: "2010-2023",
            titulo: "obn.es",
            descripcion: "Cofundador y socio director, consolidando mi práctica en asesoramiento a empresas familiares.",
            icon: "Rocket"
          },
          {
            periodo: "2023-Presente",
            titulo: "navarro",
            descripcion: "Fundación de navarro, un proyecto personal que integra toda mi experiencia y visión del asesoramiento legal y fiscal.",
            icon: "Sparkles"
          }
        ]
      },
      values: {
        overline: "Nuestros Valores",
        valores: [
          {
            icon: "Target",
            titulo: "Excelencia Técnica",
            descripcion: "Rigor jurídico y fiscal en cada asesoramiento, con soluciones innovadoras y fundamentadas."
          },
          {
            icon: "Users",
            titulo: "Cercanía",
            descripcion: "Relación directa y personal con cada cliente, entendiendo sus necesidades y objetivos específicos."
          },
          {
            icon: "CheckCircle",
            titulo: "Compromiso",
            descripcion: "Dedicación total a los intereses de nuestros clientes, con transparencia y comunicación constante."
          },
          {
            icon: "Zap",
            titulo: "Innovación",
            descripcion: "Incorporación de tecnología y metodologías modernas para ofrecer servicios más eficientes."
          }
        ]
      },
      diferenciacion: {
        overline: "Diferenciación",
        cards: [
          {
            icon: "Award",
            titulo: "Experiencia Big Law",
            descripcion: "Formación y experiencia en las mejores firmas del país, con el rigor técnico que esto conlleva."
          },
          {
            icon: "Handshake",
            titulo: "Servicio Boutique",
            descripcion: "Atención personalizada y compromiso directo que solo puede ofrecer un despacho especializado."
          },
          {
            icon: "TrendingUp",
            titulo: "Visión Estratégica",
            descripcion: "Asesoramiento que va más allá de lo legal y fiscal, ayudando en decisiones estratégicas de negocio."
          }
        ]
      },
      stats: {
        overline: "Navarro en cifras",
        stats: [
          { valor: "25+", descripcion: "Años de experiencia profesional" },
          { valor: "300+", descripcion: "Empresas familiares asesoradas" },
          { valor: "100+", descripcion: "Operaciones M&A completadas" },
          { valor: "70+", descripcion: "Profesionales en el equipo" }
        ]
      },
      founder: {
        overline: "Fundador",
        nombre: "Samuel L. Navarro",
        parrafos: [
          "Abogado especializado en derecho fiscal y mercantil con más de 25 años de experiencia.",
          "Formado en Garrigues y cofundador de obn.es, he dedicado mi carrera al asesoramiento de empresas familiares y grupos empresariales.",
          "navarro representa mi visión de cómo debe ser el asesoramiento legal y fiscal: cercano, estratégico y comprometido con el éxito de cada cliente."
        ],
        cta_texto: "Conoce al equipo completo",
        cta_url: "/equipo"
      }
    },
    services: {
      introduccion: {
        overline: "NUESTRO ENFOQUE",
        titulo: "Soluciones integrales adaptadas a tus necesidades",
        descripcion: "En Navarro ofrecemos un servicio personalizado que combina expertise legal, fiscal y corporativo para dar respuesta a los desafíos más complejos de nuestros clientes.",
        puntos: [
          "Asesoramiento especializado en cada área",
          "Soluciones tecnológicas integradas",
          "Equipo multidisciplinar altamente cualificado",
          "Compromiso con la excelencia y resultados"
        ]
      },
      areas_destacadas: {
        overline: "ÁREAS DE PRÁCTICA",
        titulo: "Especialización en múltiples disciplinas",
        areas: [
          {
            nombre: "Legal",
            icono: "Scale",
            descripcion: "Asesoramiento jurídico integral en todas las áreas del derecho empresarial y civil.",
            servicios_ejemplo: ["Derecho Mercantil", "Derecho Civil", "Procesal", "Laboral"]
          },
          {
            nombre: "Fiscal",
            icono: "Calculator",
            descripcion: "Planificación y optimización fiscal para empresas y particulares.",
            servicios_ejemplo: ["Impuesto Sociedades", "IRPF", "IVA", "Planificación Fiscal"]
          },
          {
            nombre: "Corporativo",
            icono: "Building2",
            descripcion: "Gestión integral de operaciones societarias y transacciones corporativas.",
            servicios_ejemplo: ["M&A", "Due Diligence", "Reestructuraciones", "Corporate Governance"]
          },
          {
            nombre: "Compliance",
            icono: "Shield",
            descripcion: "Programas de cumplimiento normativo y prevención de riesgos legales.",
            servicios_ejemplo: ["RGPD", "Compliance Penal", "Auditorías", "Prevención Blanqueo"]
          }
        ]
      },
      metodologia: {
        overline: "NUESTRA METODOLOGÍA",
        titulo: "Un proceso estructurado para garantizar resultados",
        descripcion: "Trabajamos siguiendo una metodología probada que asegura la máxima eficiencia y transparencia en cada fase del proyecto.",
        pasos: [
          {
            numero: "01",
            titulo: "Análisis",
            descripcion: "Evaluación detallada de la situación y necesidades del cliente para identificar objetivos."
          },
          {
            numero: "02",
            titulo: "Estrategia",
            descripcion: "Diseño de una estrategia personalizada con un plan de acción claro y medible."
          },
          {
            numero: "03",
            titulo: "Ejecución",
            descripcion: "Implementación del plan con seguimiento continuo y comunicación constante."
          },
          {
            numero: "04",
            titulo: "Optimización",
            descripcion: "Revisión de resultados y ajustes para garantizar la mejora continua."
          }
        ]
      },
      cta_consulta: {
        titulo: "¿Necesitas asesoramiento especializado?",
        descripcion: "Nuestro equipo está preparado para analizar tu caso y ofrecerte soluciones efectivas adaptadas a tus necesidades específicas.",
        cta_texto: "Solicitar consulta",
        cta_url: "/contacto"
      },
      faqs: {
        overline: "PREGUNTAS FRECUENTES",
        titulo: "Resolvemos tus dudas",
        preguntas: [
          {
            pregunta: "¿Qué servicios ofrece Navarro Tax & Legal?",
            respuesta: "Ofrecemos asesoramiento integral en áreas legal, fiscal, corporativa y compliance. Nuestros servicios incluyen desde consultas puntuales hasta gestión completa de operaciones corporativas complejas."
          },
          {
            pregunta: "¿Cómo funciona el proceso de consulta inicial?",
            respuesta: "El proceso comienza con una reunión donde analizamos tu situación, objetivos y necesidades. Posteriormente, diseñamos una propuesta personalizada con el alcance, timeline y presupuesto del proyecto."
          },
          {
            pregunta: "¿Trabajan con empresas de todos los tamaños?",
            respuesta: "Sí, trabajamos tanto con startups y pymes como con grandes corporaciones. Adaptamos nuestros servicios y metodología a las necesidades específicas de cada cliente, independientemente de su tamaño."
          },
          {
            pregunta: "¿Qué tecnologías utilizan en sus servicios?",
            respuesta: "Utilizamos las mejores soluciones tecnológicas del mercado, incluyendo A3 Software, DocuSign, Microsoft 365, Sage y Wolters Kluwer, para ofrecer servicios más eficientes y seguros."
          },
          {
            pregunta: "¿Ofrecen servicios de urgencia?",
            respuesta: "Sí, disponemos de servicios de consulta urgente para situaciones que requieren atención inmediata. Contáctanos y evaluaremos tu caso con la máxima prioridad."
          }
        ]
      },
      cta_final: {
        titulo: "Impulsa tu negocio con asesoramiento experto",
        descripcion: "Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales con soluciones legales y fiscales de primer nivel.",
        cta_primario_texto: "Hablar con un experto",
        cta_primario_url: "/contacto",
        cta_secundario_texto: "Ver casos de éxito",
        cta_secundario_url: "/portfolio"
      }
    }
  },
  ca: {
    home: {
      hero: {
        overline: "ASSESSORAMENT INTEGRAL",
        title: "Planifica el futur<br />Amb decisions avui.",
        subtitle: "Assessorem grups d'empreses i empreses familiars en les seves decisions clau: fiscalitat, successió, estructura societària i compravenda d'empreses.",
        cta_primary: {
          text: "Els nostres Serveis",
          link: "/servicios"
        },
        cta_secondary: {
          text: "Contactar",
          link: "/contacto"
        }
      },
      about: {
        overline: "Nosaltres navarro",
        title: "Assessorament estratègic i legal per a empreses i grups.",
        paragraphs: [
          "A navarro oferim assessorament legal, fiscal i estratègic especialitzat en empreses familiars i estructures empresarials consolidades.",
          "La nostra visió parteix de la comprensió profunda dels reptes de continuïtat, governança i creixement que enfronten les companyies familiars."
        ],
        cta: {
          text: "Coneix més sobre nosaltres",
          link: "/nosotros"
        }
      },
      servicios_destacados: {
        overline: "Serveis rellevants",
        services: [
          {
            title: "Assessorament Fiscal",
            description: "Optimització tributària i planificació fiscal estratègica",
            category: "Fiscal",
            features: ["Impost de Societats", "IRPF", "Planificació fiscal internacional"],
            slug: "asesoramiento-fiscal"
          },
          {
            title: "Dret Mercantil",
            description: "Gestió integral d'operacions societàries",
            category: "Legal",
            features: ["M&A", "Due Diligence", "Reestructuracions"],
            slug: "derecho-mercantil"
          }
        ]
      },
      tecnologia: {
        overline: "Tecnologia que fem servir"
      },
      clientes: {
        overline: "Confien en nosaltres"
      },
      datos: {
        items: [
          {
            categoria: "Clients",
            valor: "300+",
            descripcion: "Més de 300 empreses familiars i grups confien en navarro."
          },
          {
            categoria: "Projectes",
            valor: "500+",
            descripcion: "Operacions de reestructuració, successió i M&A completades amb èxit."
          },
          {
            categoria: "Anys d'experiència",
            valor: "25+",
            descripcion: "Trajectòria sòlida acompanyant empreses familiars en el seu creixement."
          },
          {
            categoria: "Equip",
            valor: "70+",
            descripcion: "Advocats i professionals especialitzats en fiscal, mercantil, laboral i M&A."
          },
          {
            categoria: "Compromís",
            valor: "100%",
            descripcion: "Dedicació total a cada mandat, amb rigor tècnic i confidencialitat."
          },
          {
            categoria: "Operacions M&A",
            valor: "100+",
            descripcion: "Mandats de compra i venda assessorats amb un enfocament integral."
          }
        ]
      }
    },
    about: {
      hero: {
        overline: "NOSALTRES",
        title: "25 anys d'experiència. Un projecte personal.",
        subtitle: "De Garrigues a obn.es, i ara navarro. Experiència consolidada, servei personalitzat, màxima il·lusió."
      },
      story: {
        overline: "La meva trajectòria",
        titulo: "25 anys construint relacions de confiança",
        parrafos: [
          "La meva carrera professional va començar a Garrigues, on durant més d'una dècada vaig desenvolupar la meva especialització en dret fiscal i mercantil, treballant amb els equips més prestigiosos del país.",
          "Posteriorment, vaig cofundar obn.es, una boutique especialitzada en assessorament fiscal i mercantil per a empreses familiars i grups empresarials, on vaig consolidar el meu enfocament personalitzat i proper.",
          "Avui, navarro representa la culminació de tota aquesta experiència: un despatx que combina el rigor tècnic dels grans gabinets amb l'atenció personal i el compromís que només pot oferir un projecte propi."
        ],
        destacado: "Més de 25 anys ajudant empreses i famílies a prendre les millors decisions."
      },
      timeline: {
        overline: "Trajectòria",
        hitos: [
          {
            periodo: "1998-2010",
            titulo: "Garrigues",
            descripcion: "Formació en un dels gabinets més prestigiosos d'Espanya, especialitzant-me en dret fiscal i mercantil.",
            icon: "Building"
          },
          {
            periodo: "2010-2023",
            titulo: "obn.es",
            descripcion: "Cofundador i soci director, consolidant la meva pràctica en assessorament a empreses familiars.",
            icon: "Rocket"
          },
          {
            periodo: "2023-Present",
            titulo: "navarro",
            descripcion: "Fundació de navarro, un projecte personal que integra tota la meva experiència i visió de l'assessorament legal i fiscal.",
            icon: "Sparkles"
          }
        ]
      },
      values: {
        overline: "Els nostres Valors",
        valores: [
          {
            icon: "Target",
            titulo: "Excel·lència Tècnica",
            descripcion: "Rigor jurídic i fiscal en cada assessorament, amb solucions innovadores i fonamentades."
          },
          {
            icon: "Users",
            titulo: "Proximitat",
            descripcion: "Relació directa i personal amb cada client, entenent les seves necessitats i objectius específics."
          },
          {
            icon: "CheckCircle",
            titulo: "Compromís",
            descripcion: "Dedicació total als interessos dels nostres clients, amb transparència i comunicació constant."
          },
          {
            icon: "Zap",
            titulo: "Innovació",
            descripcion: "Incorporació de tecnologia i metodologies modernes per oferir serveis més eficients."
          }
        ]
      },
      diferenciacion: {
        overline: "Diferenciació",
        cards: [
          {
            icon: "Award",
            titulo: "Experiència Big Law",
            descripcion: "Formació i experiència en els millors gabinets del país, amb el rigor tècnic que això comporta."
          },
          {
            icon: "Handshake",
            titulo: "Servei Boutique",
            descripcion: "Atenció personalitzada i compromís directe que només pot oferir un despatx especialitzat."
          },
          {
            icon: "TrendingUp",
            titulo: "Visió Estratègica",
            descripcion: "Assessorament que va més enllà del legal i fiscal, ajudant en decisions estratègiques de negoci."
          }
        ]
      },
      stats: {
        overline: "Navarro en xifres",
        stats: [
          { valor: "25+", descripcion: "Anys d'experiència professional" },
          { valor: "300+", descripcion: "Empreses familiars assessorades" },
          { valor: "100+", descripcion: "Operacions M&A completades" },
          { valor: "70+", descripcion: "Professionals en l'equip" }
        ]
      },
      founder: {
        overline: "Fundador",
        nombre: "Samuel L. Navarro",
        parrafos: [
          "Advocat especialitzat en dret fiscal i mercantil amb més de 25 anys d'experiència.",
          "Format a Garrigues i cofundador d'obn.es, he dedicat la meva carrera a l'assessorament d'empreses familiars i grups empresarials.",
          "navarro representa la meva visió de com ha de ser l'assessorament legal i fiscal: proper, estratègic i compromès amb l'èxit de cada client."
        ],
        cta_texto: "Coneix l'equip complet",
        cta_url: "/equipo"
      }
    },
    services: {
      introduccion: {
        overline: "EL NOSTRE ENFOCAMENT",
        titulo: "Solucions integrals adaptades a les teves necessitats",
        descripcion: "A Navarro oferim un servei personalitzat que combina expertise legal, fiscal i corporatiu per donar resposta als reptes més complexos dels nostres clients.",
        puntos: [
          "Assessorament especialitzat en cada àrea",
          "Solucions tecnològiques integrades",
          "Equip multidisciplinari altament qualificat",
          "Compromís amb l'excel·lència i resultats"
        ]
      },
      areas_destacadas: {
        overline: "ÀREES DE PRÀCTICA",
        titulo: "Especialització en múltiples disciplines",
        areas: [
          {
            nombre: "Legal",
            icono: "Scale",
            descripcion: "Assessorament jurídic integral en totes les àrees del dret empresarial i civil.",
            servicios_ejemplo: ["Dret Mercantil", "Dret Civil", "Processal", "Laboral"]
          },
          {
            nombre: "Fiscal",
            icono: "Calculator",
            descripcion: "Planificació i optimització fiscal per a empreses i particulars.",
            servicios_ejemplo: ["Impost Societats", "IRPF", "IVA", "Planificació Fiscal"]
          },
          {
            nombre: "Corporatiu",
            icono: "Building2",
            descripcion: "Gestió integral d'operacions societàries i transaccions corporatives.",
            servicios_ejemplo: ["M&A", "Due Diligence", "Reestructuracions", "Corporate Governance"]
          },
          {
            nombre: "Compliance",
            icono: "Shield",
            descripcion: "Programes de compliment normatiu i prevenció de riscos legals.",
            servicios_ejemplo: ["RGPD", "Compliance Penal", "Auditories", "Prevenció Blanqueig"]
          }
        ]
      },
      metodologia: {
        overline: "LA NOSTRA METODOLOGIA",
        titulo: "Un procés estructurat per garantir resultats",
        descripcion: "Treballem seguint una metodologia provada que assegura la màxima eficiència i transparència en cada fase del projecte.",
        pasos: [
          {
            numero: "01",
            titulo: "Anàlisi",
            descripcion: "Avaluació detallada de la situació i necessitats del client per identificar objectius."
          },
          {
            numero: "02",
            titulo: "Estratègia",
            descripcion: "Disseny d'una estratègia personalitzada amb un pla d'acció clar i mesurable."
          },
          {
            numero: "03",
            titulo: "Execució",
            descripcion: "Implementació del pla amb seguiment continu i comunicació constant."
          },
          {
            numero: "04",
            titulo: "Optimització",
            descripcion: "Revisió de resultats i ajustos per garantir la millora contínua."
          }
        ]
      },
      cta_consulta: {
        titulo: "Necessites assessorament especialitzat?",
        descripcion: "El nostre equip està preparat per analitzar el teu cas i oferir-te solucions efectives adaptades a les teves necessitats específiques.",
        cta_texto: "Sol·licitar consulta",
        cta_url: "/contacto"
      },
      faqs: {
        overline: "PREGUNTES FREQÜENTS",
        titulo: "Resolem els teus dubtes",
        preguntas: [
          {
            pregunta: "Quins serveis ofereix Navarro Tax & Legal?",
            respuesta: "Oferim assessorament integral en àrees legal, fiscal, corporativa i compliance. Els nostres serveis inclouen des de consultes puntuals fins a gestió completa d'operacions corporatives complexes."
          },
          {
            pregunta: "Com funciona el procés de consulta inicial?",
            respuesta: "El procés comença amb una reunió on analitzem la teva situació, objectius i necessitats. Posteriorment, dissenyem una proposta personalitzada amb l'abast, timeline i pressupost del projecte."
          },
          {
            pregunta: "Treballeu amb empreses de totes les mides?",
            respuesta: "Sí, treballem tant amb startups i pimes com amb grans corporacions. Adaptem els nostres serveis i metodologia a les necessitats específiques de cada client, independentment de la seva mida."
          },
          {
            pregunta: "Quines tecnologies utilitzeu en els vostres serveis?",
            respuesta: "Utilitzem les millors solucions tecnològiques del mercat, incloent A3 Software, DocuSign, Microsoft 365, Sage i Wolters Kluwer, per oferir serveis més eficients i segurs."
          },
          {
            pregunta: "Oferiu serveis d'urgència?",
            respuesta: "Sí, disposem de serveis de consulta urgent per a situacions que requereixen atenció immediata. Contacta'ns i avaluarem el teu cas amb la màxima prioritat."
          }
        ]
      },
      cta_final: {
        titulo: "Impulsa el teu negoci amb assessorament expert",
        descripcion: "Contacta'ns avui i descobreix com podem ajudar-te a assolir els teus objectius empresarials amb solucions legals i fiscals de primer nivell.",
        cta_primario_texto: "Parlar amb un expert",
        cta_primario_url: "/contacto",
        cta_secundario_texto: "Veure casos d'èxit",
        cta_secundario_url: "/portfolio"
      }
    }
  },
  en: {
    home: {
      hero: {
        overline: "INTEGRATED ADVISORY",
        title: "Plan the future<br />With decisions today.",
        subtitle: "We advise corporate groups and family businesses on their key decisions: taxation, succession, corporate structure, and business acquisitions.",
        cta_primary: {
          text: "Our Services",
          link: "/servicios"
        },
        cta_secondary: {
          text: "Contact",
          link: "/contacto"
        }
      },
      about: {
        overline: "About navarro",
        title: "Strategic and legal advisory for businesses and groups.",
        paragraphs: [
          "At navarro, we offer specialized legal, tax, and strategic advisory services for family businesses and established corporate structures.",
          "Our vision stems from a deep understanding of the continuity, governance, and growth challenges faced by family companies."
        ],
        cta: {
          text: "Learn more about us",
          link: "/nosotros"
        }
      },
      servicios_destacados: {
        overline: "Featured services",
        services: [
          {
            title: "Tax Advisory",
            description: "Tax optimization and strategic tax planning",
            category: "Tax",
            features: ["Corporate Tax", "Income Tax", "International Tax Planning"],
            slug: "asesoramiento-fiscal"
          },
          {
            title: "Commercial Law",
            description: "Comprehensive management of corporate operations",
            category: "Legal",
            features: ["M&A", "Due Diligence", "Restructuring"],
            slug: "derecho-mercantil"
          }
        ]
      },
      tecnologia: {
        overline: "Technology we use"
      },
      clientes: {
        overline: "They trust us"
      },
      datos: {
        items: [
          {
            categoria: "Clients",
            valor: "300+",
            descripcion: "Over 300 family businesses and corporate groups trust navarro."
          },
          {
            categoria: "Projects",
            valor: "500+",
            descripcion: "Restructuring, succession, and M&A operations successfully completed."
          },
          {
            categoria: "Years of experience",
            valor: "25+",
            descripcion: "Solid track record accompanying family businesses in their growth."
          },
          {
            categoria: "Team",
            valor: "70+",
            descripcion: "Lawyers and professionals specialized in tax, commercial, labor, and M&A."
          },
          {
            categoria: "Commitment",
            valor: "100%",
            descripcion: "Total dedication to each mandate, with technical rigor and confidentiality."
          },
          {
            categoria: "M&A Operations",
            valor: "100+",
            descripcion: "Purchase and sale mandates advised with a comprehensive approach."
          }
        ]
      }
    },
    about: {
      hero: {
        overline: "ABOUT US",
        title: "25 years of experience. A personal project.",
        subtitle: "From Garrigues to obn.es, and now navarro. Consolidated experience, personalized service, maximum commitment."
      },
      story: {
        overline: "My journey",
        titulo: "25 years building relationships of trust",
        parrafos: [
          "My professional career began at Garrigues, where for over a decade I developed my specialization in tax and commercial law, working with the most prestigious teams in the country.",
          "Subsequently, I co-founded obn.es, a boutique firm specialized in tax and commercial advisory for family businesses and corporate groups, where I consolidated my personalized and close approach.",
          "Today, navarro represents the culmination of all that experience: a firm that combines the technical rigor of large firms with the personal attention and commitment that only a personal project can offer."
        ],
        destacado: "More than 25 years helping businesses and families make the best decisions."
      },
      timeline: {
        overline: "Journey",
        hitos: [
          {
            periodo: "1998-2010",
            titulo: "Garrigues",
            descripcion: "Training at one of Spain's most prestigious firms, specializing in tax and commercial law.",
            icon: "Building"
          },
          {
            periodo: "2010-2023",
            titulo: "obn.es",
            descripcion: "Co-founder and managing partner, consolidating my practice in advisory for family businesses.",
            icon: "Rocket"
          },
          {
            periodo: "2023-Present",
            titulo: "navarro",
            descripcion: "Foundation of navarro, a personal project that integrates all my experience and vision of legal and tax advisory.",
            icon: "Sparkles"
          }
        ]
      },
      values: {
        overline: "Our Values",
        valores: [
          {
            icon: "Target",
            titulo: "Technical Excellence",
            descripcion: "Legal and tax rigor in every advisory service, with innovative and well-founded solutions."
          },
          {
            icon: "Users",
            titulo: "Closeness",
            descripcion: "Direct and personal relationship with each client, understanding their specific needs and objectives."
          },
          {
            icon: "CheckCircle",
            titulo: "Commitment",
            descripcion: "Total dedication to our clients' interests, with transparency and constant communication."
          },
          {
            icon: "Zap",
            titulo: "Innovation",
            descripcion: "Incorporation of technology and modern methodologies to offer more efficient services."
          }
        ]
      },
      diferenciacion: {
        overline: "Differentiation",
        cards: [
          {
            icon: "Award",
            titulo: "Big Law Experience",
            descripcion: "Training and experience in the country's best firms, with the technical rigor that this entails."
          },
          {
            icon: "Handshake",
            titulo: "Boutique Service",
            descripcion: "Personalized attention and direct commitment that only a specialized firm can offer."
          },
          {
            icon: "TrendingUp",
            titulo: "Strategic Vision",
            descripcion: "Advisory that goes beyond legal and tax matters, helping with strategic business decisions."
          }
        ]
      },
      stats: {
        overline: "Navarro in numbers",
        stats: [
          { valor: "25+", descripcion: "Years of professional experience" },
          { valor: "300+", descripcion: "Family businesses advised" },
          { valor: "100+", descripcion: "M&A operations completed" },
          { valor: "70+", descripcion: "Professionals on the team" }
        ]
      },
      founder: {
        overline: "Founder",
        nombre: "Samuel L. Navarro",
        parrafos: [
          "Lawyer specialized in tax and commercial law with over 25 years of experience.",
          "Trained at Garrigues and co-founder of obn.es, I have dedicated my career to advising family businesses and corporate groups.",
          "navarro represents my vision of what legal and tax advisory should be: close, strategic, and committed to each client's success."
        ],
        cta_texto: "Meet the full team",
        cta_url: "/equipo"
      }
    },
    services: {
      introduccion: {
        overline: "OUR APPROACH",
        titulo: "Comprehensive solutions tailored to your needs",
        descripcion: "At Navarro, we offer personalized service combining legal, tax, and corporate expertise to address our clients' most complex challenges.",
        puntos: [
          "Specialized advice in every area",
          "Integrated technology solutions",
          "Highly qualified multidisciplinary team",
          "Commitment to excellence and results"
        ]
      },
      areas_destacadas: {
        overline: "PRACTICE AREAS",
        titulo: "Specialization across multiple disciplines",
        areas: [
          {
            nombre: "Legal",
            icono: "Scale",
            descripcion: "Comprehensive legal advice across all areas of business and civil law.",
            servicios_ejemplo: ["Commercial Law", "Civil Law", "Litigation", "Labor Law"]
          },
          {
            nombre: "Tax",
            icono: "Calculator",
            descripcion: "Tax planning and optimization for businesses and individuals.",
            servicios_ejemplo: ["Corporate Tax", "Income Tax", "VAT", "Tax Planning"]
          },
          {
            nombre: "Corporate",
            icono: "Building2",
            descripcion: "Comprehensive management of corporate operations and transactions.",
            servicios_ejemplo: ["M&A", "Due Diligence", "Restructuring", "Corporate Governance"]
          },
          {
            nombre: "Compliance",
            icono: "Shield",
            descripcion: "Regulatory compliance programs and legal risk prevention.",
            servicios_ejemplo: ["GDPR", "Criminal Compliance", "Audits", "AML Prevention"]
          }
        ]
      },
      metodologia: {
        overline: "OUR METHODOLOGY",
        titulo: "A structured process to guarantee results",
        descripcion: "We work following a proven methodology that ensures maximum efficiency and transparency at every stage of the project.",
        pasos: [
          {
            numero: "01",
            titulo: "Analysis",
            descripcion: "Detailed assessment of the client's situation and needs to identify objectives."
          },
          {
            numero: "02",
            titulo: "Strategy",
            descripcion: "Design of a customized strategy with a clear and measurable action plan."
          },
          {
            numero: "03",
            titulo: "Execution",
            descripcion: "Implementation of the plan with continuous monitoring and constant communication."
          },
          {
            numero: "04",
            titulo: "Optimization",
            descripcion: "Review of results and adjustments to ensure continuous improvement."
          }
        ]
      },
      cta_consulta: {
        titulo: "Need specialized advice?",
        descripcion: "Our team is ready to analyze your case and offer effective solutions tailored to your specific needs.",
        cta_texto: "Request consultation",
        cta_url: "/contacto"
      },
      faqs: {
        overline: "FREQUENTLY ASKED QUESTIONS",
        titulo: "We answer your questions",
        preguntas: [
          {
            pregunta: "What services does Navarro Tax & Legal offer?",
            respuesta: "We offer comprehensive advice in legal, tax, corporate, and compliance areas. Our services range from one-off consultations to complete management of complex corporate operations."
          },
          {
            pregunta: "How does the initial consultation process work?",
            respuesta: "The process begins with a meeting where we analyze your situation, objectives, and needs. Subsequently, we design a customized proposal with the scope, timeline, and budget of the project."
          },
          {
            pregunta: "Do you work with companies of all sizes?",
            respuesta: "Yes, we work with both startups and SMEs as well as large corporations. We adapt our services and methodology to the specific needs of each client, regardless of their size."
          },
          {
            pregunta: "What technologies do you use in your services?",
            respuesta: "We use the best technology solutions on the market, including A3 Software, DocuSign, Microsoft 365, Sage, and Wolters Kluwer, to provide more efficient and secure services."
          },
          {
            pregunta: "Do you offer emergency services?",
            respuesta: "Yes, we have urgent consultation services for situations requiring immediate attention. Contact us and we will evaluate your case with the highest priority."
          }
        ]
      },
      cta_final: {
        titulo: "Boost your business with expert advice",
        descripcion: "Contact us today and discover how we can help you achieve your business goals with world-class legal and tax solutions.",
        cta_primario_texto: "Speak with an expert",
        cta_primario_url: "/contacto",
        cta_secundario_texto: "View success stories",
        cta_secundario_url: "/portfolio"
      }
    }
  }
};
