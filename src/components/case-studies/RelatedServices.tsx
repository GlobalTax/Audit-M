import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface RelatedServicesProps {
  serviceIds: string[];
}

export const RelatedServices = ({ serviceIds }: RelatedServicesProps) => {
  const { language, t } = useLanguage();
  
  const { data: services } = useQuery({
    queryKey: ['related-services', serviceIds],
    queryFn: async () => {
      if (!serviceIds || serviceIds.length === 0) return [];
      
      const { data, error } = await supabase
        .from('services')
        .select('id, name_es, name_ca, name_en, slug_es, slug_ca, slug_en, description_es, description_ca, description_en, icon_name')
        .in('id', serviceIds)
        .eq('is_active', true);
      
      if (error) throw error;
      
      return data?.map(service => ({
        id: service.id,
        name: service.name_en || service.name_es,
        slug: service.slug_en || service.slug_es,
        description: service.description_en || service.description_es,
        icon_name: service.icon_name,
      })) || [];
    },
    enabled: serviceIds && serviceIds.length > 0,
  });

  if (!services || services.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card key={service.id} className="p-6 hover:shadow-lg transition-all duration-300 group">
          <Link to={`/services/${service.slug}`}>
            <h4 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
              {service.name}
            </h4>
            <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-3">
              {service.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-accent">
              <span>{t('services.card.viewService') || 'View service'}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};
