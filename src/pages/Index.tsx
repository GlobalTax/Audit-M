import { Link } from 'react-router-dom';
import { ArrowRight, Building2, FileText, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Meta } from '@/components/seo/Meta';
import officeHero from '@/assets/office-hero.jpg';

export default function Index() {
  const services = [
    {
      icon: FileText,
      title: 'Tax Advisory',
      description: 'Tax optimization and regulatory compliance for individuals and businesses.',
      link: '/services',
    },
    {
      icon: TrendingUp,
      title: 'Accounting Services',
      description: 'Comprehensive accounting management with the highest quality standards.',
      link: '/services',
    },
    {
      icon: Shield,
      title: 'Legal Consulting',
      description: 'Specialized legal advice in tax and corporate law.',
      link: '/services',
    },
    {
      icon: Building2,
      title: 'Strategic Planning',
      description: 'Integrated solutions for business management and growth.',
      link: '/services',
    },
  ];

  const values = [
    {
      number: '25+',
      label: 'Years of experience',
    },
    {
      number: '500+',
      label: 'Satisfied clients',
    },
    {
      number: '100%',
      label: 'Commitment',
    },
  ];

  return (
    <>
      <Meta
        title="Global Legal, Tax & Accounting Advisory | NRRO International"
        description="Expert advisory services for international businesses in Spain. Tax, legal, accounting, and payroll solutions for multinational companies."
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary via-primary-hover to-accent overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={officeHero}
            alt="NRRO offices in Barcelona"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight">
              Your trusted partner in audit services
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              At <span className="font-display font-normal">Audit</span>, we provide rigorous, independent audit services that help stakeholders make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground shadow-strong">
                <Link to="/contact">
                  Contact us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/services">
                  Our services
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for individuals and businesses with the highest rigor and professionalism
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="group hover-lift border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-strong"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-normal text-foreground mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <Link
                      to={service.link}
                      className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                    >
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-hover to-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {values.map((value, index) => (
              <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="text-5xl md:text-6xl font-serif font-bold text-accent-foreground mb-3">
                  {value.number}
                </div>
                <p className="text-lg text-accent-foreground/90 font-display font-normal">
                  {value.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary to-primary-hover border-none shadow-strong">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
                Ready to optimize your tax management?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Schedule a free consultation with our team of experts
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground shadow-glow">
                <Link to="/contact">
                  Contact now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Our Offices in Barcelona
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We are located in an iconic space in the heart of Barcelona's Eixample district, 
                designed to offer the best service to our clients.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <Building2 className="h-5 w-5 text-accent mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-display font-normal text-foreground">Address</p>
                    <p className="text-muted-foreground">Carrer Ausias March 36, 08010 Barcelona</p>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <a
                  href="https://maps.app.goo.gl/JjwmToznoU9Vx7zu9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="animate-slide-up">
              <img
                src={officeHero}
                alt="NRRO offices in Barcelona"
                className="rounded-lg shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
