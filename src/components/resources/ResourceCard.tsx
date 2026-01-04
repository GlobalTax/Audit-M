import { Resource, ResourceType, ResourceCategory } from "@/hooks/useResources";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Globe, FileSpreadsheet, Video, Download, ExternalLink } from "lucide-react";

const typeIcons: Record<ResourceType, React.ReactNode> = {
  white_paper: <FileText className="h-4 w-4" />,
  country_guide: <Globe className="h-4 w-4" />,
  template: <FileSpreadsheet className="h-4 w-4" />,
  webinar: <Video className="h-4 w-4" />,
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

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const handleDownload = () => {
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_download_global_nrro', {
        resource_id: resource.id,
        resource_title: resource.title,
        resource_type: resource.type,
        resource_category: resource.category,
      });
    }

    if (resource.file_url) {
      window.open(resource.file_url, '_blank');
    }
  };

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover-lift transition-all duration-300 hover:shadow-lg">
      {/* Thumbnail */}
      <div className="aspect-[16/10] bg-muted relative overflow-hidden">
        {resource.thumbnail_url ? (
          <img
            src={resource.thumbnail_url}
            alt={resource.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="text-primary/40">{typeIcons[resource.type]}</div>
          </div>
        )}
        
        {/* Type badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground flex items-center gap-1.5">
            {typeIcons[resource.type]}
            {typeLabels[resource.type]}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <Badge variant="outline" className="mb-3 text-xs">
          {categoryLabels[resource.category]}
        </Badge>

        {/* Title */}
        <h3 className="text-lg font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>

        {/* Description */}
        {resource.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {resource.description}
          </p>
        )}

        {/* CTA */}
        <Button
          onClick={handleDownload}
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          {resource.type === 'webinar' ? (
            <>
              <ExternalLink className="h-4 w-4 mr-2" />
              Watch Now
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
