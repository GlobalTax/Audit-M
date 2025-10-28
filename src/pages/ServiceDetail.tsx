import { useParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Meta } from "@/components/seo/Meta";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { services as mockServices } from "@/data/mockData";

const ServiceDetail = () => {
  const { slug } = useParams();

  // Fetch from database
  const { data: dbService, isLoading } = useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      if (!slug) return null;
      const supabaseAny = supabase as any;
      const response = await supabaseAny
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
      
      if (response.error) throw response.error;
      return response.data;
    },
    enabled: !!slug,
  });

  // Fallback to mock data
  const mockService = mockServices.find(s => s.slug === slug);
  const service: any = dbService || mockService;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="mb-4 text-4xl">Servicio no encontrado</h1>
          <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            <Link to="/servicios">Volver a Servicios</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Meta 
        title={service.name}
        description={service.description}
        canonicalUrl={`${window.location.origin}/servicios/${service.slug}`}
      />

      {/* Hero Section - Black background, centered text */}
      <section 
        className="relative w-full flex items-center justify-center"
        style={{
          backgroundColor: '#000000',
          minHeight: '759px',
          height: 'auto'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Overline */}
          <div className="service-hero-overline mb-6">
            SERVICIOS
          </div>
          
          {/* Title */}
          <h1 className="service-hero-title mb-8 max-w-5xl mx-auto">
            {service.name}
          </h1>
          
          {/* Subtitle */}
          <p className="service-hero-subtitle max-w-3xl mx-auto">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content Section - White background */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          {/* Features Section */}
          {service.features && Array.isArray(service.features) && service.features.length > 0 && (
            <div className="mb-16">
              <h2 className="text-4xl font-normal mb-8">¿Qué Incluye?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                    <span className="service-body">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {service.benefits && (
            <div className="mb-16 py-12 px-8 bg-gray-50 rounded-lg">
              <h2 className="text-4xl font-normal mb-6">Beneficios</h2>
              <p className="service-body text-lg">{service.benefits}</p>
            </div>
          )}

          {/* Typical Clients Section */}
          {service.typical_clients && Array.isArray(service.typical_clients) && service.typical_clients.length > 0 && (
            <div className="mb-16">
              <h2 className="text-4xl font-normal mb-8">Ideal Para</h2>
              <div className="flex flex-wrap gap-3">
                {service.typical_clients.map((client: string, idx: number) => (
                  <div 
                    key={idx} 
                    className="px-6 py-3 bg-black text-white rounded-full text-sm"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center py-16 px-8 bg-black text-white rounded-lg">
            <h2 className="text-3xl font-normal mb-4">¿Necesitas este servicio?</h2>
            <p className="service-hero-subtitle mb-8 max-w-2xl mx-auto">
              Contáctanos y te asesoraremos de forma personalizada
            </p>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Link to="/contacto">Solicitar Información</Link>
            </Button>
          </div>

        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
