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
