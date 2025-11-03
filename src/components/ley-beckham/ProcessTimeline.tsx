import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText, Send, Clock, ThumbsUp } from "lucide-react";

export const ProcessTimeline = () => {
  const steps = [
    {
      icon: CheckCircle,
      title: "Análisis de Elegibilidad",
      description: "Evaluamos tu situación personal y profesional para confirmar que cumples todos los requisitos del régimen especial",
      duration: "1-2 días",
      details: ["Revisión de historial fiscal", "Análisis contractual", "Evaluación de residencia"]
    },
    {
      icon: FileText,
      title: "Preparación de Documentación",
      description: "Recopilamos y preparamos toda la documentación necesaria para la solicitud ante la Agencia Tributaria",
      duration: "3-5 días",
      details: ["Contrato de trabajo", "Certificados fiscales", "Modelo 149", "Documentación complementaria"]
    },
    {
      icon: Send,
      title: "Presentación Modelo 149",
      description: "Presentamos telemáticamente tu solicitud ante la AEAT con toda la documentación justificativa",
      duration: "1 día",
      details: ["Presentación telemática", "Acuse de recibo", "Seguimiento del expediente"]
    },
    {
      icon: Clock,
      title: "Seguimiento y Resolución",
      description: "Realizamos el seguimiento del expediente y gestionamos cualquier requerimiento de la Agencia Tributaria",
      duration: "1-3 meses",
      details: ["Seguimiento continuo", "Atención a requerimientos", "Comunicación con AEAT"]
    },
    {
      icon: ThumbsUp,
      title: "Aprobación y Optimización",
      description: "Una vez aprobado, te asesoramos en la optimización fiscal continua durante los 6 años del régimen",
      duration: "Continuo",
      details: ["Planificación fiscal", "Declaraciones anuales", "Asesoramiento continuo"]
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            Proceso Simple y Transparente
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mb-4">
            Cómo Solicitamos la Ley Beckham por Ti
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            Te acompañamos en cada paso del proceso, desde el análisis inicial hasta la aprobación
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line - simplificada */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={index}
                    className={`relative flex items-center gap-8 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                      <Card className="bg-card border border-border/50">
                        <CardContent className="p-6">
                          <div className={`flex items-start gap-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="lg:hidden w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                                  Paso {index + 1}
                                </span>
                                <span className="text-xs text-muted-foreground">⏱️ {step.duration}</span>
                              </div>
                              
                              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                              <p className="text-muted-foreground mb-4">{step.description}</p>
                              
                              <ul className={`space-y-1 text-sm ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                                {step.details.map((detail, idx) => (
                                  <li key={idx} className="text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-primary inline mr-2" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Center Icon (desktop only) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center border-4 border-background z-10">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-card border border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">
                  Solicita tu Consulta Gratuita Hoy
                </h3>
                <p className="text-muted-foreground mb-6">
                  Nuestro equipo de expertos analizará tu caso sin compromiso y te indicará exactamente los pasos a seguir para beneficiarte de la Ley Beckham.
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft h-10 px-6"
                >
                  Comenzar Mi Solicitud
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
