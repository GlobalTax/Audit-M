import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/typography";
import { TrendingDown, Calendar, Globe, ShieldCheck } from "lucide-react";

export const BenefitsGrid = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Tributación del 24%",
      description: "Tipo fijo sobre rendimientos del trabajo hasta 600.000€/año, frente al IRPF progresivo que puede llegar hasta el 47%",
      highlight: "Ahorra hasta un 76%"
    },
    {
      icon: Calendar,
      title: "Hasta 6 Años",
      description: "El régimen especial se aplica durante el año de llegada más los 5 ejercicios fiscales siguientes",
      highlight: "Máxima duración"
    },
    {
      icon: Globe,
      title: "Trabajo Internacional",
      description: "Compatible con teletrabajo y proyectos internacionales, ideal para profesionales digitales y ejecutivos globales",
      highlight: "Total flexibilidad"
    },
    {
      icon: ShieldCheck,
      title: "Exenciones Adicionales",
      description: "Dividendos, intereses y ganancias patrimoniales del extranjero exentos hasta ciertos límites. Optimización fiscal integral",
      highlight: "Más beneficios"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          overline="Ventajas Fiscales"
          title="Beneficios Clave de la Ley Beckham"
          description="Un régimen fiscal diseñado para atraer talento internacional a España"
          className="text-center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index} 
                className="hover-lift border-primary/20 bg-gradient-to-br from-card to-muted/20"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {benefit.highlight}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
