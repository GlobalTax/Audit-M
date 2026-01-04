import { Resource, ResourceType, ResourceCategory } from "@/hooks/useResources";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Globe, FileSpreadsheet, Video, Download, ExternalLink, ArrowRight } from "lucide-react";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  white_paper: <FileText className="h-5 w-5" />,
  country_guide: <Globe className="h-5 w-5" />,
  template: <FileSpreadsheet className="h-5 w-5" />,
  webinar: <Video className="h-5 w-5" />,
};

const typeLabels: Record<ResourceType, string> = {
  white_paper: 'White Paper',
  country_guide: 'Country Guide',
  template: 'Template',
  webinar: 'Webinar',
};

const categoryLabels: Record<ResourceCategory, string> = {
  accounting: 'Accounting',
  tax: 'Tax',
  payroll: 'Payroll',
  corporate_legal: 'Corporate Legal',
  treasury: 'Treasury',
  transfer_pricing: 'Transfer Pricing',
  governance: 'Governance',
};

interface FeaturedResourcesProps {
  resources: Resource[];
}

export const FeaturedResources = ({ resources }: FeaturedResourcesProps) => {
  if (resources.length === 0) return null;

  const handleDownload = (resource: Resource) => {
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_download_global_nrro', {
        resource_id: resource.id,
        resource_title: resource.title,
        resource_type: resource.type,
        resource_category: resource.category,
        featured: true,
      });
    }

    if (resource.file_url) {
      window.open(resource.file_url, '_blank');
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          Featured Resources
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div
            key={resource.id}
            className={`group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
              index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            }`}
          >
            {/* Background image/gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10" />
            
            {resource.thumbnail_url && (
              <div className="absolute inset-0">
                <img
                  src={resource.thumbnail_url}
                  alt={resource.title}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                />
              </div>
            )}

            {/* Content */}
            <div className={`relative p-6 ${index === 0 ? 'lg:p-10' : ''} h-full flex flex-col`}>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1.5">
                  {typeIcons[resource.type]}
                  {typeLabels[resource.type]}
                </Badge>
                <Badge variant="outline">
                  {categoryLabels[resource.category]}
                </Badge>
              </div>

              {/* Title */}
              <h3 className={`font-medium text-foreground mb-3 group-hover:text-primary transition-colors ${
                index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
              }`}>
                {resource.title}
              </h3>

              {/* Description */}
              {resource.description && (
                <p className={`text-muted-foreground mb-6 flex-grow ${
                  index === 0 ? 'text-base lg:text-lg line-clamp-4' : 'text-sm line-clamp-2'
                }`}>
                  {resource.description}
                </p>
              )}

              {/* CTA */}
              <Button
                onClick={() => handleDownload(resource)}
                variant={index === 0 ? "default" : "outline"}
                size={index === 0 ? "lg" : "default"}
                className="w-fit"
              >
                {resource.type === 'webinar' ? (
                  <>
                    Watch Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Download
                    <Download className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
