import { Meta } from "@/components/seo/Meta";
import { HeroSection } from "@/components/ley-beckham/HeroSection";
import { BenefitsGrid } from "@/components/ley-beckham/BenefitsGrid";
import { RequirementsChecklist } from "@/components/ley-beckham/RequirementsChecklist";
import { FiscalComparison } from "@/components/ley-beckham/FiscalComparison";
import { ProcessTimeline } from "@/components/ley-beckham/ProcessTimeline";
import { FAQSection } from "@/components/ley-beckham/FAQSection";
import { LeyBeckhamContactForm } from "@/components/ley-beckham/LeyBeckhamContactForm";
import { SectionHeader } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Shield } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const LeyBeckham = () => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView("ley-beckham-landing");
  }, [trackPageView]);

  return (
    <>
      <Meta
        title="Ley Beckham 2025 | Régimen Impatriados España"
        description="Reduce tu IRPF hasta un 76% con la Ley Beckham. Especialistas en régimen especial de impatriados. Consulta gratuita. +25 años de experiencia."
        keywords="ley beckham, régimen impatriados españa, fiscal impatriados, artículo 93 irpf, tributación impatriados, beckham law spain"
        canonicalUrl="https://nrro.es/ley-beckham"
      />

      <div className="min-h-screen">
        <HeroSection />
        <BenefitsGrid />

        {/* ¿Qué es la Ley Beckham? */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                overline="Régimen Especial"
                title="¿Qué es la Ley Beckham?"
                className="text-center"
              />
              
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <p className="text-lead">
                    La <strong>Ley Beckham</strong> es el nombre popular del régimen especial de tributación para trabajadores desplazados a España, regulado en el artículo 93 de la Ley del IRPF.
                  </p>
                  <p className="text-foreground/80">
                    Este régimen permite a profesionales extranjeros que se trasladan a España tributar como <strong>no residentes fiscales</strong>, con un tipo fijo del 24% sobre sus rendimientos del trabajo, en lugar del IRPF progresivo que puede llegar hasta el 47%.
                  </p>
                  <p className="text-foreground/80">
                    Establecido en 2005 tras la llegada del futbolista David Beckham al Real Madrid, este régimen busca atraer talento internacional a España ofreciendo importantes ventajas fiscales durante un periodo de hasta 6 años.
                  </p>
                </div>

                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Actualizaciones 2024-2025</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Ampliación a profesionales de alto valor añadido</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Compatibilidad con trabajo remoto internacional</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Nuevas exenciones sobre rentas del exterior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Simplificación en requisitos documentales</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <RequirementsChecklist />

        {/* Perfiles Beneficiarios */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              overline="¿Para quién?"
              title="Perfiles que se Benefician de la Ley Beckham"
              description="Este régimen fiscal especial está diseñado para diversos profesionales internacionales"
              className="text-center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Ejecutivos y Directivos",
                  description: "C-level, directores generales, altos cargos en empresas multinacionales",
                  badge: "Alta Demanda"
                },
                {
                  title: "Profesionales Tech",
                  description: "Ingenieros, developers, CTOs, product managers, data scientists",
                  badge: "Sector Tech"
                },
                {
                  title: "Sector Financiero",
                  description: "Banqueros, traders, analistas financieros, consultores de inversión",
                  badge: "Finanzas"
                },
                {
                  title: "Consultores",
                  description: "Consultores estratégicos, auditores, expertos en transformación digital",
                  badge: "Consulting"
                },
                {
                  title: "Emprendedores",
                  description: "Fundadores de startups, inversores, business angels relocalizándose",
                  badge: "Startups"
                },
                {
                  title: "Investigadores",
                  description: "Profesores universitarios, investigadores científicos, expertos académicos",
                  badge: "Academia"
                }
              ].map((profile, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Users className="w-8 h-8 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {profile.badge}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{profile.title}</h3>
                    <p className="text-sm text-muted-foreground">{profile.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FiscalComparison />
        <ProcessTimeline />

        {/* Por Qué Elegirnos */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              overline="Expertos en Fiscalidad Internacional"
              title="Por Qué Confiar en NRRO"
              description="Más de 25 años de experiencia ayudando a profesionales internacionales"
              className="text-center"
            />

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <h3 className="font-semibold mb-2">Años de Experiencia</h3>
                  <p className="text-sm text-muted-foreground">
                    Liderando la fiscalidad internacional en España
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <h3 className="font-semibold mb-2">Tasa de Éxito</h3>
                  <p className="text-sm text-muted-foreground">
                    Solicitudes aprobadas por la Agencia Tributaria
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <h3 className="font-semibold mb-2">Clientes Asesorados</h3>
                  <p className="text-sm text-muted-foreground">
                    Profesionales de más de 40 países
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <h3 className="font-semibold mb-2">Confidencialidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Garantía total de privacidad y seguridad
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <FAQSection />
        <LeyBeckhamContactForm />

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                No Pierdas la Oportunidad de Optimizar tu Fiscalidad
              </h2>
              <p className="text-lead mb-8">
                Los plazos para acogerse a la Ley Beckham son limitados. Solicita tu consulta gratuita hoy y descubre cuánto puedes ahorrar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary-hover shadow-soft h-12 px-8"
                  onClick={() => {
                    const { trackCTAClick } = useAnalytics();
                    trackCTAClick("solicitar-consulta-final", "ley-beckham-cta-final");
                  }}
                >
                  Solicitar Consulta Gratuita
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                ⏱️ Respuesta en menos de 24 horas | 🔒 100% Confidencial | ✅ Sin compromiso
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LeyBeckham;
