import { SectionHeader } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "¿Cuánto tiempo tarda la aprobación de la Ley Beckham?",
      answer: "El plazo habitual de resolución por parte de la Agencia Tributaria es de 1 a 3 meses desde la presentación del Modelo 149. Sin embargo, es importante presentar la solicitud dentro de los 6 meses siguientes al inicio de la actividad laboral en España. En NRRO, agilizamos el proceso asegurándonos de que toda la documentación esté perfecta desde el primer momento, lo que aumenta significativamente las probabilidades de una aprobación rápida."
    },
    {
      question: "¿Puedo solicitar la Ley Beckham si ya estoy trabajando en España?",
      answer: "Sí, pero solo si no han transcurrido más de 6 meses desde que iniciaste tu actividad laboral en España. Este plazo es improrrogable, por lo que es crucial actuar con rapidez. Si ya superaste este plazo, lamentablemente no podrás acogerte al régimen para tu situación actual, aunque podrías solicitarlo si en el futuro te trasladas nuevamente a España cumpliendo los requisitos."
    },
    {
      question: "¿Qué ocurre después de los 6 años del régimen especial?",
      answer: "Tras los 6 años (año de llegada + 5 ejercicios fiscales completos), pasarás automáticamente al régimen general del IRPF español, tributando como residente fiscal ordinario. Es importante planificar esta transición con antelación para optimizar tu situación fiscal. En NRRO te acompañamos durante todo el proceso y te ayudamos a preparar la transición al régimen general, explorando otras opciones de optimización fiscal disponibles."
    },
    {
      question: "¿Es compatible con el régimen de autónomos?",
      answer: "Sí, la Ley Beckham es compatible con trabajadores autónomos o por cuenta propia, siempre que cumplan el resto de requisitos (principalmente, el desplazamiento a España por motivos de trabajo y no haber sido residente fiscal en los 10 años anteriores). Los autónomos pueden beneficiarse del tipo fijo del 24% sobre sus rendimientos de actividades económicas generados en España."
    },
    {
      question: "¿Mi familia también se beneficia de la Ley Beckham?",
      answer: "La Ley Beckham es de aplicación individual, por lo que tu cónyuge e hijos no se acogen automáticamente al régimen especial. Sin embargo, existen opciones fiscales para optimizar la tributación familiar. Tu cónyuge podría solicitar el régimen si cumple individualmente los requisitos (por ejemplo, si también viene a trabajar a España). En cuanto a los hijos, existen deducciones y beneficios fiscales en el IRPF ordinario que podemos analizar en tu caso concreto."
    },
    {
      question: "¿Tengo que tributar en España por mis rentas mundiales?",
      answer: "No, esta es una de las grandes ventajas de la Ley Beckham. Bajo este régimen, tributas como no residente fiscal, lo que significa que solo pagas impuestos en España por tus rentas de fuente española (principalmente, tu salario por trabajo en España). Tus dividendos, intereses, ganancias patrimoniales y otras rentas obtenidas fuera de España están exentas hasta ciertos límites, aunque debes declararlas informativamente. Esto supone un ahorro fiscal muy significativo para profesionales con ingresos internacionales."
    },
    {
      question: "¿Qué sucede si me deniegan la solicitud?",
      answer: "Aunque nuestra tasa de éxito es del 98%, en caso de denegación, podemos recurrir la decisión mediante alegaciones ante la Agencia Tributaria o, si es necesario, por vía judicial. Las causas más comunes de denegación suelen ser documentación incompleta o no cumplir estrictamente con los requisitos. Por eso, en NRRO realizamos un análisis exhaustivo previo y nos aseguramos de que tu solicitud esté perfectamente fundamentada antes de presentarla."
    },
    {
      question: "¿Cuál es el coste de solicitar la Ley Beckham?",
      answer: "Nuestros honorarios varían según la complejidad del caso, pero ofrecemos presupuestos transparentes sin sorpresas. Considera que el ahorro fiscal que obtendrás durante los 6 años del régimen (que puede superar los 200.000€ en muchos casos) hace que la inversión en asesoramiento profesional sea altamente rentable. Además, ofrecemos una primera consulta gratuita para evaluar tu caso y darte un presupuesto exacto sin compromiso."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          overline="Resolvemos tus Dudas"
          title="Preguntas Frecuentes sobre la Ley Beckham"
          description="Todo lo que necesitas saber sobre el régimen especial de impatriados"
          className="text-center"
        />

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              ¿Tienes más preguntas? Estamos aquí para ayudarte.
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent border border-border bg-transparent text-foreground hover:bg-muted hover:text-accent h-10 px-6"
            >
              Contactar con un Experto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
