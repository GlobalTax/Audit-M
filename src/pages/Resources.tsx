import { useState } from "react";
import { Meta } from "@/components/seo/Meta";
import { useResources, useFeaturedResources, ResourceFilters as Filters } from "@/hooks/useResources";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { FeaturedResources } from "@/components/resources/FeaturedResources";
import { NewsletterSignup } from "@/components/resources/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, Globe, Video } from "lucide-react";

const Resources = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    type: 'all',
    category: 'all',
    country: 'all',
    persona: 'all',
  });

  const { data: resources, isLoading } = useResources(filters);
  const { data: featuredResources } = useFeaturedResources();

  return (
    <>
      <Meta
        title="Global Business Resources | NRRO International"
        description="Expert white papers, country guides, templates, and webinars for multinational tax, accounting, payroll, and legal compliance. Free resources for global business leaders."
        keywords="international business resources, global tax guides, multinational payroll templates, cross-border compliance, transfer pricing documentation"
        canonicalUrl="/resources"
      />

      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="badge-hero mb-6 inline-block">Knowledge Hub</span>
            
            <h1 className="hero-title mb-6">
              Resources for Global Business Success
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl">
              Expert insights, practical templates, and strategic guides to navigate international tax, accounting, payroll, and legal compliance.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-primary-foreground/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">White Papers</div>
                <div className="text-sm text-primary-foreground/70">In-depth analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">Country Guides</div>
                <div className="text-sm text-primary-foreground/70">Local expertise</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">Templates</div>
                <div className="text-sm text-primary-foreground/70">Ready to use</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">Webinars</div>
                <div className="text-sm text-primary-foreground/70">Expert sessions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-12">
            <ResourceFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Featured Resources */}
          {featuredResources && featuredResources.length > 0 && !filters.search && filters.type === 'all' && (
            <FeaturedResources resources={featuredResources} />
          )}

          {/* Resources Grid */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-8">
              {filters.search || filters.type !== 'all' || filters.category !== 'all' 
                ? 'Search Results' 
                : 'All Resources'}
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[16/10] rounded-xl" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : resources && resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/50 rounded-2xl">
                <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">
                  No resources found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={() => setFilters({
                  search: '',
                  type: 'all',
                  category: 'all',
                  country: 'all',
                  persona: 'all',
                })}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Mid-page CTA */}
          <div className="bg-muted rounded-2xl p-8 md:p-12 text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
              Need Custom Guidance?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Our experts can provide tailored solutions for your specific international business challenges. Schedule a consultation to discuss your needs.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                Schedule a Consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-16">
            <NewsletterSignup sourcePage="/resources" />
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
              Ready to Discuss Your International Needs?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Connect with our global team of experts in tax, legal, accounting, and payroll compliance.
            </p>
            <Button asChild size="lg" variant="default">
              <Link to="/international-services">
                Start Your Global Consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;
