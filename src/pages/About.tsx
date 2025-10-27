import { Meta } from '@/components/seo/Meta';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, TrendingUp, Award } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Users,
      title: 'Compromiso con el cliente',
      description: 'Construimos relaciones duraderas basadas en la confianza y el servicio excepcional.',
    },
    {
      icon: Target,
      title: 'Precisión y rigor',
      description: 'Aplicamos los más altos estándares de calidad en cada proyecto que desarrollamos.',
    },
    {
      icon: TrendingUp,
      title: 'Orientación a resultados',
      description: 'Nos enfocamos en soluciones que generen valor real y tangible para nuestros clientes.',
    },
    {
      icon: Award,
      title: 'Excelencia profesional',
      description: 'Nuestro equipo se mantiene constantemente actualizado en las últimas normativas.',
    },
  ];

  return (
    <>
      <Meta
        title="Nosotros"
        description="Conoce a Navarro Tax Legal - NRRO. Más de 25 años de experiencia en asesoría fiscal, contable y legal en Barcelona."
        keywords="sobre navarro tax legal, quienes somos nrro, asesoría fiscal Barcelona historia"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-hover to-accent py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-6">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Más de 25 años transformando la gestión fiscal y contable en un verdadero impulso para empresas y profesionales.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-slide-up space-y-6">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-8">
                Nuestra Historia
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fundada con la visión de ofrecer servicios de asesoría fiscal y contable de máxima calidad, 
                <span className="font-display font-semibold text-foreground"> navarro</span> se ha consolidado como un referente en Barcelona 
                gracias a nuestro compromiso inquebrantable con la excelencia y el servicio personalizado.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A lo largo de más de 25 años, hemos acompañado a cientos de empresas y profesionales en su crecimiento, 
                adaptándonos constantemente a los cambios normativos y las necesidades del mercado. Nuestra filosofía se 
                basa en convertir la gestión fiscal y contable en una ventaja competitiva para nuestros clientes.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                En 2025, dimos un paso más en nuestra evolución trasladándonos a nuestras nuevas oficinas en el corazón del 
                Eixample barcelonés, un espacio diseñado para ofrecer el mejor servicio en un entorno profesional de primer nivel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y definen nuestra relación con los clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="hover-lift border-border/50 hover:border-accent/50 transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-hover to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="animate-scale-in">
              <div className="text-5xl md:text-6xl font-serif font-bold text-accent-foreground mb-3">
                25+
              </div>
              <p className="text-lg text-accent-foreground/90 font-display font-medium">
                Años de experiencia
              </p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '150ms' }}>
              <div className="text-5xl md:text-6xl font-serif font-bold text-accent-foreground mb-3">
                500+
              </div>
              <p className="text-lg text-accent-foreground/90 font-display font-medium">
                Clientes satisfechos
              </p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '300ms' }}>
              <div className="text-5xl md:text-6xl font-serif font-bold text-accent-foreground mb-3">
                100%
              </div>
              <p className="text-lg text-accent-foreground/90 font-display font-medium">
                Compromiso con la calidad
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
