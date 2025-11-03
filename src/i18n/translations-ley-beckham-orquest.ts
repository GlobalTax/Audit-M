// Traducciones completas para Ley Beckham y Orquest
// Este archivo extiende translations-fase5.ts

export const leyBeckhamOrquestTranslations = {
  es: {
    leyBeckham: {
      hero: {
        badge: 'RÉGIMEN ESPECIAL DE IMPATRIADOS 2025',
        title: 'Ley Beckham:\nReduce tu IRPF\nhasta un 76%',
        description: 'Tributa al 24% fijo durante 6 años en España. Especialistas en fiscalidad internacional con más de 25 años de experiencia.',
        ctaButton: 'Solicitar Consulta Gratuita',
        viewRequirements: 'Ver Requisitos',
        successRate: '98%',
        successRateLabel: 'Tasa de éxito',
        experience: '25+',
        experienceLabel: 'Años de experiencia',
        taxRate: '24%',
        taxRateLabel: 'Tipo fijo vs 47% IRPF',
      },
      benefits: {
        overline: 'Ventajas Fiscales',
        title: 'Beneficios Clave de la Ley Beckham',
        description: 'Un régimen fiscal diseñado para atraer talento internacional a España',
        items: {
          0: {
            title: 'Tributación del 24%',
            description: 'Tipo fijo sobre rendimientos del trabajo hasta 600.000€/año, frente al IRPF progresivo que puede llegar hasta el 47%',
          },
          1: {
            title: 'Hasta 6 Años',
            description: 'El régimen especial se aplica durante el año de llegada más los 5 ejercicios fiscales siguientes',
          },
          2: {
            title: 'Trabajo Internacional',
            description: 'Compatible con teletrabajo y proyectos internacionales, ideal para profesionales digitales y ejecutivos globales',
          },
          3: {
            title: 'Exenciones Adicionales',
            description: 'Dividendos, intereses y ganancias patrimoniales del extranjero exentos hasta ciertos límites. Optimización fiscal integral',
          },
        },
      },
      requirements: {
        overline: 'Eligibilidad',
        title: 'Requisitos para Acogerse a la Ley Beckham',
        description: 'Verifica si cumples con los criterios para beneficiarte de este régimen fiscal especial',
        keyRequirement: 'Requisito clave',
        items: {
          0: {
            title: 'No haber sido residente fiscal en España',
            description: 'En los 10 años anteriores al desplazamiento (ampliado de 5 a 10 años en 2023)',
            isKey: 'true',
          },
          1: {
            title: 'Desplazamiento por motivos laborales',
            description: 'Contrato de trabajo, nombramiento como administrador, o realización de actividades económicas en España',
            isKey: 'true',
          },
          2: {
            title: 'Trabajos realizados en territorio español',
            description: 'La actividad laboral debe realizarse efectivamente en España, aunque admite flexibilidad para trabajo internacional',
            isKey: 'false',
          },
          3: {
            title: 'Solicitud en plazo',
            description: 'Debe presentarse el Modelo 149 en los 6 meses siguientes al inicio de la actividad laboral en España',
            isKey: 'true',
          },
          4: {
            title: 'No tributar por este régimen anteriormente',
            description: 'No haber disfrutado de este régimen especial en periodos anteriores',
            isKey: 'false',
          },
        },
        uncertain: {
          title: '¿No estás seguro si cumples los requisitos?',
          description: 'Cada caso es único y existen múltiples excepciones y casuísticas. Solicita una consulta gratuita para evaluar tu situación específica.',
          button: 'Solicitar Evaluación Gratuita',
        },
      },
      fiscalComparison: {
        overline: 'Ahorro Fiscal',
        title: 'Comparativa: IRPF General vs. Ley Beckham',
        description: 'Descubre cuánto puedes ahorrar según tu nivel de ingresos',
        tableHeaders: {
          income: 'Ingresos Anuales',
          irpfGeneral: 'IRPF General',
          beckham: 'Ley Beckham',
          savings: 'Ahorro Anual',
        },
        irpfCard: {
          title: 'IRPF General (Régimen Ordinario)',
          items: {
            0: 'Tipos progresivos del 19% al 47%',
            1: 'Tributación sobre renta mundial',
            2: 'Obligaciones declarativas complejas',
            3: 'Impuesto sobre el Patrimonio aplicable',
          },
        },
        beckhamCard: {
          title: 'Ley Beckham (Régimen Especial)',
          items: {
            0: 'Tipo fijo del 24% hasta 600.000€',
            1: 'Solo rentas de fuente española',
            2: 'Simplificación administrativa',
            3: 'Exención de Impuesto sobre el Patrimonio',
          },
        },
        disclaimer: '* Cálculos aproximados para rentas del trabajo en 2024. No incluyen deducciones autonómicas ni otras variables individuales. Consulta tu caso específico con nuestros expertos.',
      },
      processTimeline: {
        overline: 'Proceso Simple y Transparente',
        title: 'Cómo Solicitamos la Ley Beckham por Ti',
        description: 'Te acompañamos en cada paso del proceso, desde el análisis inicial hasta la aprobación',
        stepLabel: 'Paso',
        steps: {
          0: {
            title: 'Análisis de Elegibilidad',
            description: 'Evaluamos tu situación personal y profesional para confirmar que cumples todos los requisitos del régimen especial',
            duration: '1-2 días',
            details: {
              0: 'Revisión de historial fiscal',
              1: 'Análisis contractual',
              2: 'Evaluación de residencia',
            },
          },
          1: {
            title: 'Preparación de Documentación',
            description: 'Recopilamos y preparamos toda la documentación necesaria para la solicitud ante la Agencia Tributaria',
            duration: '3-5 días',
            details: {
              0: 'Contrato de trabajo',
              1: 'Certificados fiscales',
              2: 'Modelo 149',
            },
          },
          2: {
            title: 'Presentación Modelo 149',
            description: 'Presentamos telemáticamente tu solicitud ante la AEAT con toda la documentación justificativa',
            duration: '1 día',
            details: {
              0: 'Presentación telemática',
              1: 'Acuse de recibo',
              2: 'Seguimiento del expediente',
            },
          },
          3: {
            title: 'Seguimiento y Resolución',
            description: 'Realizamos el seguimiento del expediente y gestionamos cualquier requerimiento de la Agencia Tributaria',
            duration: '1-3 meses',
            details: {
              0: 'Seguimiento continuo',
              1: 'Atención a requerimientos',
              2: 'Comunicación con AEAT',
            },
          },
          4: {
            title: 'Aprobación y Optimización',
            description: 'Una vez aprobado, te asesoramos en la optimización fiscal continua durante los 6 años del régimen',
            duration: 'Continuo',
            details: {
              0: 'Planificación fiscal',
              1: 'Declaraciones anuales',
              2: 'Asesoramiento continuo',
            },
          },
        },
        ctaCard: {
          title: 'Solicita tu Consulta Gratuita Hoy',
          description: 'Nuestro equipo de expertos analizará tu caso sin compromiso y te indicará exactamente los pasos a seguir para beneficiarte de la Ley Beckham.',
          button: 'Comenzar Mi Solicitud',
        },
      },
      faqs: {
        overline: 'Resolvemos tus Dudas',
        title: 'Preguntas Frecuentes sobre la Ley Beckham',
        description: 'Todo lo que necesitas saber sobre el régimen especial de impatriados',
        items: {
          0: {
            question: '¿Cuánto tiempo tarda la aprobación de la Ley Beckham?',
            answer: 'El plazo habitual de resolución por parte de la Agencia Tributaria es de 1 a 3 meses desde la presentación del Modelo 149. Sin embargo, es importante presentar la solicitud dentro de los 6 meses siguientes al inicio de la actividad laboral en España. En NRRO, agilizamos el proceso asegurándonos de que toda la documentación esté perfecta desde el primer momento, lo que aumenta significativamente las probabilidades de una aprobación rápida.',
          },
          1: {
            question: '¿Puedo solicitar la Ley Beckham si ya estoy trabajando en España?',
            answer: 'Sí, pero solo si no han transcurrido más de 6 meses desde que iniciaste tu actividad laboral en España. Este plazo es improrrogable, por lo que es crucial actuar con rapidez. Si ya superaste este plazo, lamentablemente no podrás acogerte al régimen para tu situación actual, aunque podrías solicitarlo si en el futuro te trasladas nuevamente a España cumpliendo los requisitos.',
          },
          2: {
            question: '¿Qué ocurre después de los 6 años del régimen especial?',
            answer: 'Tras los 6 años (año de llegada + 5 ejercicios fiscales completos), pasarás automáticamente al régimen general del IRPF español, tributando como residente fiscal ordinario. Es importante planificar esta transición con antelación para optimizar tu situación fiscal. En NRRO te acompañamos durante todo el proceso y te ayudamos a preparar la transición al régimen general, explorando otras opciones de optimización fiscal disponibles.',
          },
          3: {
            question: '¿Es compatible con el régimen de autónomos?',
            answer: 'Sí, la Ley Beckham es compatible con trabajadores autónomos o por cuenta propia, siempre que cumplan el resto de requisitos (principalmente, el desplazamiento a España por motivos de trabajo y no haber sido residente fiscal en los 10 años anteriores). Los autónomos pueden beneficiarse del tipo fijo del 24% sobre sus rendimientos de actividades económicas generados en España.',
          },
          4: {
            question: '¿Mi familia también se beneficia de la Ley Beckham?',
            answer: 'La Ley Beckham es de aplicación individual, por lo que tu cónyuge e hijos no se acogen automáticamente al régimen especial. Sin embargo, existen opciones fiscales para optimizar la tributación familiar. Tu cónyuge podría solicitar el régimen si cumple individualmente los requisitos (por ejemplo, si también viene a trabajar a España). En cuanto a los hijos, existen deducciones y beneficios fiscales en el IRPF ordinario que podemos analizar en tu caso concreto.',
          },
          5: {
            question: '¿Tengo que tributar en España por mis rentas mundiales?',
            answer: 'No, esta es una de las grandes ventajas de la Ley Beckham. Bajo este régimen, tributas como no residente fiscal, lo que significa que solo pagas impuestos en España por tus rentas de fuente española (principalmente, tu salario por trabajo en España). Tus dividendos, intereses, ganancias patrimoniales y otras rentas obtenidas fuera de España están exentas hasta ciertos límites, aunque debes declararlas informativamente. Esto supone un ahorro fiscal muy significativo para profesionales con ingresos internacionales.',
          },
          6: {
            question: '¿Qué sucede si me deniegan la solicitud?',
            answer: 'Aunque nuestra tasa de éxito es del 98%, en caso de denegación, podemos recurrir la decisión mediante alegaciones ante la Agencia Tributaria o, si es necesario, por vía judicial. Las causas más comunes de denegación suelen ser documentación incompleta o no cumplir estrictamente con los requisitos. Por eso, en NRRO realizamos un análisis exhaustivo previo y nos aseguramos de que tu solicitud esté perfectamente fundamentada antes de presentarla.',
          },
          7: {
            question: '¿Cuál es el coste de solicitar la Ley Beckham?',
            answer: 'Nuestros honorarios varían según la complejidad del caso, pero ofrecemos presupuestos transparentes sin sorpresas. Considera que el ahorro fiscal que obtendrás durante los 6 años del régimen (que puede superar los 200.000€ en muchos casos) hace que la inversión en asesoramiento profesional sea altamente rentable. Además, ofrecemos una primera consulta gratuita para evaluar tu caso y darte un presupuesto exacto sin compromiso.',
          },
        },
        footer: {
          question: '¿Tienes más preguntas? Estamos aquí para ayudarte.',
          button: 'Contactar con un Experto',
        },
      },
      contactForm: {
        overline: 'Consulta Gratuita',
        title: 'Solicita tu Análisis de Elegibilidad',
        description: 'Completa el formulario y te contactaremos en menos de 24 horas para evaluar tu caso sin compromiso',
        fields: {
          name: 'Nombre completo *',
          namePlaceholder: 'Tu nombre',
          email: 'Email *',
          emailPlaceholder: 'tu@email.com',
          phone: 'Teléfono *',
          phonePlaceholder: '+34 600 000 000',
          country: 'País de origen *',
          countryPlaceholder: 'Ej: Reino Unido, Francia...',
          jobSituation: 'Situación laboral *',
          jobSituationPlaceholder: 'Selecciona...',
          jobSituationOptions: {
            contract: 'Contrato de trabajo en España',
            manager: 'Directivo/Administrador',
            selfEmployed: 'Autónomo',
            entrepreneur: 'Emprendedor/Fundador',
            internalTransfer: 'Traslado interno empresa',
            other: 'Otro',
          },
          transferDate: 'Fecha estimada de traslado *',
          transferDatePlaceholder: 'Selecciona...',
          transferDateOptions: {
            already: 'Ya estoy en España (menos de 6 meses)',
            oneToThree: 'En 1-3 meses',
            threeToSix: 'En 3-6 meses',
            sixToTwelve: 'En 6-12 meses',
            moreThanTwelve: 'Más de 12 meses',
          },
          message: 'Mensaje o consulta (opcional)',
          messagePlaceholder: 'Cuéntanos más sobre tu situación...',
          privacyPrefix: 'Acepto la',
          privacySuffix: 'y el tratamiento de mis datos personales *',
        },
        validation: {
          nameMin: 'El nombre debe tener al menos 2 caracteres',
          emailInvalid: 'Email inválido',
          phoneMin: 'Teléfono inválido',
          countryMin: 'Selecciona tu país de origen',
          jobSituation: 'Selecciona tu situación laboral',
          transferDate: 'Indica tu fecha estimada de traslado',
          privacy: 'Debes aceptar la política de privacidad',
        },
        submitting: 'Enviando...',
        submit: 'Solicitar Consulta Gratuita sobre Ley Beckham',
        indicators: {
          confidential: '100% Confidencial',
          response: 'Respuesta en 24h',
          noCommitment: 'Sin compromiso',
        },
        footer: 'Este formulario es específico para consultas sobre la Ley Beckham. Para otros servicios,',
        toast: {
          success: '¡Solicitud enviada con éxito!',
          successDescription: 'Nos pondremos en contacto contigo en menos de 24 horas para analizar tu caso.',
          error: 'Error al enviar',
          errorDescription: 'Ha ocurrido un error. Por favor, inténtalo de nuevo o contacta por teléfono.',
        },
      },
    },
    orquest: {
      hero: {
        title: 'Orquest + KairosHR: La combinación ganadora',
        subtitle: 'para franquiciados McDonald\'s',
        description: 'Planifica con inteligencia. Gestiona con seguridad. Todo bajo control.',
        viewDemo: 'Ver demo integrada ↓',
      },
      comparison: {
        title: 'Qué hace cada solución',
        orquest: {
          title: 'Orquest',
          subtitle: 'Planificación y optimización de plantilla',
          features: {
            0: { title: 'Forecasting inteligente de demanda' },
            1: { title: 'Scheduling automatizado' },
            2: { title: 'Optimización de costes laborales' },
            3: { title: 'Análisis predictivo' },
          },
        },
        kairoshr: {
          title: 'KairosHR',
          subtitle: 'Gestión laboral y cumplimiento normativo',
          features: {
            0: { title: 'Control de presencia biométrico' },
            1: { title: 'Firma digital certificada' },
            2: { title: 'Documentación laboral completa' },
            3: { title: 'Integración con asesoría' },
          },
        },
      },
      synergy: {
        title: 'Cómo se complementan',
        tableHeaders: {
          process: 'Fase',
          orquest: 'Orquest',
          kairoshr: 'KairosHR',
          result: 'Resultado',
        },
        rows: {
          0: {
            process: 'Planificación',
            orquest: '✅',
            kairoshr: '–',
            result: 'Turnos óptimos basados en IA',
          },
          1: {
            process: 'Control de presencia',
            orquest: '⚠️ Básico',
            kairoshr: '✅ Legal',
            result: 'Cumplimiento garantizado',
          },
          2: {
            process: 'Firma digital',
            orquest: '⚠️ Simple',
            kairoshr: '✅ Certificada',
            result: 'Seguridad jurídica total',
          },
          3: {
            process: 'Nóminas y asesoría',
            orquest: '–',
            kairoshr: '✅',
            result: 'Cierre laboral automatizado',
          },
          4: {
            process: 'Análisis de datos',
            orquest: '✅',
            kairoshr: '✅',
            result: 'Decisiones basadas en datos reales',
          },
        },
      },
      benefits: {
        title: 'Beneficios de la integración',
        items: {
          0: {
            title: 'Reduce tiempo administrativo',
            description: 'Automatiza procesos repetitivos y dedica más tiempo a tu negocio.',
          },
          1: {
            title: 'Cumple con la normativa',
            description: 'Registro de jornada legal, firma certificada y trazabilidad completa.',
          },
          2: {
            title: 'Evita sanciones laborales',
            description: 'Sistema homologado que minimiza riesgos legales y multas.',
          },
          3: {
            title: 'Integración total',
            description: 'Planificación y documentación en un mismo flujo de trabajo.',
          },
        },
      },
      demo: {
        title: 'Solicita una demo combinada',
        description: 'Descubre cómo Orquest y KairosHR se integran para optimizar la gestión del personal en tu restaurante.',
        requestButton: 'Solicitar demo →',
      },
      footer: {
        copyright: '© 2025 Navarro Tax Legal. Todos los derechos reservados.',
      },
      demoModal: {
        title: 'Solicita tu demo personalizada',
        description: 'Completa el formulario y te contactaremos para mostrarte cómo Orquest y KairosHR pueden transformar la gestión de tu restaurante.',
        fields: {
          name: 'Nombre completo *',
          namePlaceholder: 'Tu nombre',
          email: 'Email *',
          emailPlaceholder: 'tu@email.com',
          restaurantName: 'Nombre del restaurante',
          restaurantNamePlaceholder: 'McDonald\'s...',
          message: '¿Qué te gustaría ver en la demo?',
          messagePlaceholder: 'Cuéntanos tus necesidades...',
        },
        validation: {
          nameMin: 'El nombre debe tener al menos 2 caracteres',
          emailInvalid: 'Email inválido',
        },
        submitting: 'Enviando...',
        submit: 'Solicitar demo',
        toast: {
          success: '¡Solicitud enviada!',
          successDescription: 'Nos pondremos en contacto contigo pronto.',
          error: 'Error',
          errorDescription: 'No se pudo enviar la solicitud. Por favor, intenta de nuevo.',
        },
      },
    },
  },
};
