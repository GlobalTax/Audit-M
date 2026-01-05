import { useState } from "react";
import { Meta } from "@/components/seo/Meta";
import { useResources, useFeaturedResources, ResourceFilters as Filters } from "@/hooks/useResources";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { FeaturedResources } from "@/components/resources/FeaturedResources";
import { NewsletterSignup } from "@/components/resources/NewsletterSignup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeHero } from "@/components/ui/badge-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Globe, 
  Video, 
  Download, 
  ClipboardCheck, 
  BarChart3, 
  Calculator 
} from "lucide-react";

// Spain Setup Resources - Static featured items
const spainSetupResources = [
  {
    id: "playbook",
    title: "Spain Company Setup Playbook",
    description: "Complete 12-step guide with timelines, checklists, and compliance requirements for establishing your business in Spain.",
    type: "Guide",
    icon: BookOpen,
    href: "/spain-company-setup-playbook",
    badge: "Most Popular",
  },
  {
    id: "checklist",
    title: "Document Checklist Template",
    description: "40+ document checklist with NIE instructions, apostille requirements, and entity-specific guidance.",
    type: "Template",
    icon: ClipboardCheck,
    href: "/spain-document-checklist",
    badge: "Free Download",
  },
  {
    id: "quiz",
    title: "Business Setup Readiness Score",
    description: "10-question assessment to evaluate your readiness and get personalized recommendations.",
    type: "Assessment",
    icon: BarChart3,
    href: "/spain-readiness-quiz",
    badge: "Interactive",
  },
  {
    id: "calculator",
    title: "Cost & Timeline Calculator",
    description: "Estimate setup costs and timeline based on your entity type, residency, and staffing plans.",
    type: "Tool",
    icon: Calculator,
    href: "/spain-setup-calculator",
    badge: "New",
  },
];

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
      <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <BadgeHero>Knowledge Hub</BadgeHero>
            
            <h1 className="hero-title mt-6 mb-6">
              Resources for Global Business Success
            </h1>
            
            <p className="text-lead text-white/70 max-w-2xl">
              Expert insights, practical templates, and strategic guides to navigate international tax, accounting, payroll, and legal compliance.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">White Papers</div>
                <div className="text-sm text-white/60">In-depth analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">Country Guides</div>
                <div className="text-sm text-white/60">Local expertise</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">Templates</div>
                <div className="text-sm text-white/60">Ready to use</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-semibold">Webinars</div>
                <div className="text-sm text-white/60">Expert sessions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spain Setup Resources Section */}
      <section className="py-20 md:py-28 bg-neutral-50 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Spain Expansion
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Spain Company Setup Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to establish your business presence in Spain — from initial planning to full incorporation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spainSetupResources.map((resource) => {
              const IconComponent = resource.icon;
              const isComingSoon = resource.badge === "Coming Soon";
              
              return (
                <Card 
                  key={resource.id} 
                  className={`group hover:shadow-lg transition-all duration-300 ${isComingSoon ? 'opacity-75' : 'hover:border-primary/50'}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isComingSoon ? 'bg-muted' : 'bg-primary/10'}`}>
                        <IconComponent className={`w-6 h-6 ${isComingSoon ? 'text-muted-foreground' : 'text-primary'}`} />
                      </div>
                      <Badge variant={isComingSoon ? "outline" : "secondary"} className="text-xs">
                        {resource.badge}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {resource.type}
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-2">
                      {resource.description}
                    </CardDescription>
                    {isComingSoon ? (
                      <Button variant="outline" disabled className="w-full">
                        Coming Soon
                      </Button>
                    ) : (
                      <Button variant="outline" asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                        <Link to={resource.href}>
                          {resource.type === "Assessment" ? "Start Assessment" : "Access Resource"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
