import { CheckCircle2 } from "lucide-react";

interface TimelineStep {
  title: string;
  description: string;
  duration?: string;
}

const selectionSteps: TimelineStep[] = [
  {
    title: "Recepción de candidatura",
    description: "Revisamos tu CV y perfil para validar que se ajuste a nuestras necesidades actuales.",
    duration: "1-2 días",
  },
  {
    title: "Primera entrevista",
    description: "Conversación inicial para conocer tus motivaciones, experiencia y expectativas profesionales.",
    duration: "30-45 min",
  },
  {
    title: "Evaluación técnica",
    description: "Según el área, realizarás una prueba práctica o resolución de caso para evaluar tus conocimientos.",
    duration: "1-2 horas",
  },
  {
    title: "Entrevista final",
    description: "Reunión con el equipo directivo para validar el fit cultural y profesional con NRRO.",
    duration: "45-60 min",
  },
  {
    title: "Oferta y bienvenida",
    description: "Si todo ha ido bien, te presentamos una oferta y te damos la bienvenida al equipo.",
    duration: "1-3 días",
  },
];

export const SelectionTimeline = () => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30" />

      {/* Steps */}
      <ol className="relative space-y-8">
        {selectionSteps.map((step, index) => (
          <li key={index} className="relative flex gap-6 group">
            {/* Step number */}
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-primary-foreground font-semibold text-sm shadow-lg group-hover:scale-110 transition-transform">
              {index + 1}
            </div>

            {/* Step content */}
            <div className="flex-1 pb-8">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  {step.duration && (
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded whitespace-nowrap">
                      {step.duration}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Success indicator */}
      <div className="mt-8 flex items-center justify-center">
        <div className="flex items-center gap-3 text-accent">
          <CheckCircle2 className="h-6 w-6" />
          <span className="font-semibold">¡Bienvenido a NRRO!</span>
        </div>
      </div>
    </div>
  );
};
