import { Button } from "@/components/ui/button";
import { BadgeHero } from "@/components/ui/badge-hero";
import { ArrowRight, TrendingDown } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const HeroSection = () => {
  const { trackCTAClick } = useAnalytics();

  const handleCTAClick = () => {
    trackCTAClick("solicitar-consulta-hero", "ley-beckham-hero");
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <BadgeHero>Régimen Especial de Impatriados 2025</BadgeHero>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Ley Beckham:<br />
                <span className="text-primary">Reduce tu IRPF</span>
                <br />
                hasta un 76%
              </h1>
              
              <p className="text-xl text-foreground/80 max-w-2xl">
                Tributa al <strong className="text-primary">24% fijo</strong> durante 6 años en España. 
                Especialistas en fiscalidad internacional con más de 25 años de experiencia.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleCTAClick}
                className="text-base group"
              >
                Solicitar Consulta Gratuita
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  trackCTAClick("ver-requisitos", "ley-beckham-hero");
                  document.getElementById("requisitos")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver Requisitos
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">98% Tasa de Éxito</div>
                  <div className="text-sm text-muted-foreground">Solicitudes aprobadas</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  25+
                </div>
                <div>
                  <div className="font-semibold">Años de Experiencia</div>
                  <div className="text-sm text-muted-foreground">Fiscalidad internacional</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm">
              <div className="aspect-[4/3] flex items-center justify-center p-8">
                <img
                  src="/hero-investment.jpg"
                  alt="Profesionales internacionales en España - Ley Beckham"
                  className="w-full h-full object-cover rounded-lg"
                  loading="eager"
                />
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl shadow-lg p-4 max-w-[200px]">
              <div className="text-3xl font-bold text-primary mb-1">24%</div>
              <div className="text-sm text-muted-foreground">Tipo fijo vs 47% IRPF</div>
            </div>

            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl shadow-lg p-4 max-w-[200px]">
              <div className="text-3xl font-bold text-primary mb-1">6 años</div>
              <div className="text-sm text-muted-foreground">Duración del régimen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
