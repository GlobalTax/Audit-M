import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Meta } from '@/components/seo/Meta';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { BadgeHero } from '@/components/ui/badge-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ViewToggle } from '@/components/ui/view-toggle';
import { 
  Search, 
  ArrowRight, 
  Building2, 
  Factory, 
  Briefcase, 
  ShoppingBag,
  Landmark,
  Heart,
  TrendingUp,
  Users,
  Globe,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

// Sample case studies data (hardcoded since table is empty)
const SAMPLE_CASE_STUDIES = [
  {
    id: '1',
    slug: 'uk-saas-expansion-spain',
    hero_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    client_name: 'TechFlow Solutions',
    client_industry: 'Technology',
    primary_service: 'Company Formation',
    hero_title: 'UK SaaS Company Establishes European Hub in Barcelona',
    hero_subtitle: 'How we helped a fast-growing UK tech company set up their Spanish subsidiary in just 4 weeks',
    metrics: [
      { label: 'Setup Time', value: '4 weeks' },
      { label: 'Tax Savings', value: '€120K/yr' },
      { label: 'Team Size', value: '25 employees' },
    ],
    is_featured: true,
    testimonial: {
      text: "NRRO made our Spain expansion seamless. Their expertise in both legal and tax matters saved us months of work.",
      author: "James Mitchell",
      position: "CEO, TechFlow Solutions"
    }
  },
  {
    id: '2',
    slug: 'german-manufacturing-acquisition',
    hero_image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    client_name: 'Deutsche Industrie GmbH',
    client_industry: 'Manufacturing',
    primary_service: 'M&A Advisory',
    hero_title: 'German Industrial Group Acquires Spanish Manufacturer',
    hero_subtitle: 'Complete M&A advisory for a €15M acquisition including due diligence and post-merger integration',
    metrics: [
      { label: 'Deal Value', value: '€15M' },
      { label: 'DD Duration', value: '8 weeks' },
      { label: 'Issues Found', value: '12 resolved' },
    ],
    is_featured: false,
  },
  {
    id: '3',
    slug: 'us-pe-fund-entry',
    hero_image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
    client_name: 'Atlantic Capital Partners',
    client_industry: 'Financial Services',
    primary_service: 'Corporate Structuring',
    hero_title: 'US Private Equity Fund Structures Spanish Platform',
    hero_subtitle: 'Tax-efficient holding structure for multi-asset acquisition strategy in Iberian market',
    metrics: [
      { label: 'Assets Acquired', value: '5 companies' },
      { label: 'Total Value', value: '€85M' },
      { label: 'Tax Efficiency', value: '35% improved' },
    ],
    is_featured: false,
  },
  {
    id: '4',
    slug: 'french-retail-ley-beckham',
    hero_image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    client_name: 'Maison Élégance',
    client_industry: 'Retail',
    primary_service: 'Ley Beckham',
    hero_title: 'French Luxury Brand Relocates Leadership to Spain',
    hero_subtitle: 'Ley Beckham application and executive relocation for French retail group expanding into Spain',
    metrics: [
      { label: 'Executives Relocated', value: '3' },
      { label: 'Tax Rate', value: '24% flat' },
      { label: 'Processing Time', value: '6 weeks' },
    ],
    is_featured: false,
  },
  {
    id: '5',
    slug: 'nordic-ecommerce-subsidiary',
    hero_image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    client_name: 'NordicShop AB',
    client_industry: 'E-commerce',
    primary_service: 'Subsidiary Setup',
    hero_title: 'Swedish E-commerce Giant Launches Spanish Operations',
    hero_subtitle: 'Full subsidiary setup including payroll, compliance, and warehouse operations',
    metrics: [
      { label: 'Launch Time', value: '6 weeks' },
      { label: 'Employees', value: '45 hired' },
      { label: 'Revenue Y1', value: '€8M' },
    ],
    is_featured: false,
  },
  {
    id: '6',
    slug: 'swiss-family-office-real-estate',
    hero_image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    client_name: 'Geneva Wealth Partners',
    client_industry: 'Real Estate',
    primary_service: 'Investment Structuring',
    hero_title: 'Swiss Family Office Invests in Spanish Real Estate Portfolio',
    hero_subtitle: 'Tax-optimized structure for €25M real estate investment across Barcelona and Madrid',
    metrics: [
      { label: 'Portfolio Value', value: '€25M' },
      { label: 'Properties', value: '8 assets' },
      { label: 'Net Yield', value: '6.2%' },
    ],
    is_featured: false,
  },
];

const INDUSTRIES = [
  { key: 'all', label: 'All Industries', icon: Globe },
  { key: 'Technology', label: 'Technology', icon: Building2 },
  { key: 'Manufacturing', label: 'Manufacturing', icon: Factory },
  { key: 'Financial Services', label: 'Financial Services', icon: Landmark },
  { key: 'Retail', label: 'Retail', icon: ShoppingBag },
  { key: 'E-commerce', label: 'E-commerce', icon: Briefcase },
  { key: 'Real Estate', label: 'Real Estate', icon: Heart },
];

export default function CaseStudies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { trackEvent } = useAnalytics();

  const featuredCase = SAMPLE_CASE_STUDIES.find(c => c.is_featured);
  
  const filteredCases = SAMPLE_CASE_STUDIES.filter(c => {
    const matchesIndustry = activeIndustry === 'all' || c.client_industry === activeIndustry;
    const matchesSearch = !searchTerm || 
      c.hero_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.client_industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  const handleCTAClick = (ctaType: string) => {
    trackEvent('case_study_cta_click_global_nrro', { cta_type: ctaType });
  };

  const handleFilterChange = (industry: string) => {
    setActiveIndustry(industry);
    trackEvent('case_study_filter_change_global_nrro', { filter_industry: industry });
  };

  return (
    <>
      <Meta
        title="Client Success Stories & Case Studies | NRRO International"
        description="Discover how NRRO helps multinational companies, PE funds, and investors establish and grow their operations in Spain. 500+ successful client projects."
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://global.nrro.es' },
        { name: 'Case Studies', url: 'https://global.nrro.es/case-studies' }
      ]} />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <BadgeHero>Client Success Stories</BadgeHero>
            </div>
            <h1 className="hero-title mb-6">
              How We Help Global Businesses Succeed in Spain
            </h1>
            <p className="text-lead text-white/70 max-w-2xl mx-auto mb-10">
              From company formation to M&A transactions, discover how we've helped 500+ international 
              companies establish and grow their operations in Spain.
            </p>
            
            {/* Inline Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-white/60">Clients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-white/60">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">€500M+</div>
                <div className="text-sm text-white/60">Transactions Advised</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-white/60">Client Retention</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Case Studies</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Featured Case Study */}
      {featuredCase && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                Featured Success Story
              </span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    <img
                      src={featuredCase.hero_image_url}
                      alt={featuredCase.hero_title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white text-black">Featured</Badge>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{featuredCase.client_industry}</Badge>
                      <Badge variant="outline">{featuredCase.primary_service}</Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-normal mb-4 leading-tight">
                      {featuredCase.hero_title}
                    </h2>
                    <p className="text-foreground/70 mb-6 leading-relaxed">
                      {featuredCase.hero_subtitle}
                    </p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-border">
                      {featuredCase.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xl md:text-2xl font-bold text-accent">{metric.value}</div>
                          <div className="text-xs text-foreground/60">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    {featuredCase.testimonial && (
                      <blockquote className="mb-6">
                        <p className="text-sm italic text-foreground/80 mb-2">
                          "{featuredCase.testimonial.text}"
                        </p>
                        <footer className="text-sm">
                          <span className="font-medium">{featuredCase.testimonial.author}</span>
                          <span className="text-foreground/60"> — {featuredCase.testimonial.position}</span>
                        </footer>
                      </blockquote>
                    )}

                    <Link 
                      to={`/case-studies/${featuredCase.slug}`}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                      onClick={() => trackEvent('case_study_card_click_global_nrro', { case_id: featuredCase.id })}
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter & Search Section */}
      <section className="py-8 bg-neutral-50 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Industry Tabs */}
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((industry) => {
                const Icon = industry.icon;
                return (
                  <Button
                    key={industry.key}
                    variant={activeIndustry === industry.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterChange(industry.key)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{industry.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Search & View Toggle */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              {filteredCases.length} Case Studies
            </span>
          </div>

          {filteredCases.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-foreground/60 mb-4">No case studies found matching your criteria.</p>
              <Button variant="outline" onClick={() => { setActiveIndustry('all'); setSearchTerm(''); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
            }>
              {filteredCases.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CaseStudyCardComponent 
                    caseStudy={caseStudy} 
                    variant={viewMode}
                    onCardClick={() => trackEvent('case_study_card_click_global_nrro', { case_id: caseStudy.id })}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Results Metrics Strip */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-white/60" />
              <div className="text-3xl md:text-4xl font-bold mb-1">€500M+</div>
              <div className="text-sm text-white/60">Transactions Advised</div>
            </div>
            <div>
              <Building2 className="h-8 w-8 mx-auto mb-3 text-white/60" />
              <div className="text-3xl md:text-4xl font-bold mb-1">200+</div>
              <div className="text-sm text-white/60">Companies Formed</div>
            </div>
            <div>
              <Users className="h-8 w-8 mx-auto mb-3 text-white/60" />
              <div className="text-3xl md:text-4xl font-bold mb-1">50+</div>
              <div className="text-sm text-white/60">M&A Deals Completed</div>
            </div>
            <div>
              <Award className="h-8 w-8 mx-auto mb-3 text-white/60" />
              <div className="text-3xl md:text-4xl font-bold mb-1">98%</div>
              <div className="text-sm text-white/60">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
              Your Success Story Starts Here
            </span>
            <h2 className="text-3xl md:text-4xl font-normal mb-6">
              Ready to Become Our Next Success Story?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
              Whether you're setting up a company, acquiring a business, or relocating executives, 
              our team is ready to help you succeed in Spain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild onClick={() => handleCTAClick('discuss_project')}>
                <Link to="/contact">Discuss Your Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild onClick={() => handleCTAClick('schedule_call')}>
                <Link to="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Inline Card Component for this page
interface CaseStudyCardComponentProps {
  caseStudy: typeof SAMPLE_CASE_STUDIES[0];
  variant: 'grid' | 'list';
  onCardClick: () => void;
}

function CaseStudyCardComponent({ caseStudy, variant, onCardClick }: CaseStudyCardComponentProps) {
  const cardPath = `/case-studies/${caseStudy.slug}`;

  if (variant === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <Link to={cardPath} onClick={onCardClick} className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
            <img
              src={caseStudy.hero_image_url}
              alt={caseStudy.hero_title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">{caseStudy.client_industry}</Badge>
                <Badge variant="outline">{caseStudy.primary_service}</Badge>
              </div>
              <h3 className="text-2xl font-normal mb-3 leading-tight">
                {caseStudy.hero_title}
              </h3>
              <p className="text-base text-foreground/70 leading-relaxed mb-4">
                {caseStudy.hero_subtitle}
              </p>
              <div className="flex flex-wrap gap-6 mb-4">
                {caseStudy.metrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="font-bold text-accent">{metric.value}</div>
                    <div className="text-sm text-foreground/60">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors">
              <span>Read Case Study</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
      <Link to={cardPath} onClick={onCardClick} className="flex flex-col h-full">
        <div className="aspect-[16/9] relative overflow-hidden bg-muted">
          <img
            src={caseStudy.hero_image_url}
            alt={caseStudy.hero_title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{caseStudy.client_industry}</Badge>
            <Badge variant="outline" className="text-xs">{caseStudy.primary_service}</Badge>
          </div>
          <h3 className="text-xl font-medium mb-2 leading-tight line-clamp-2">
            {caseStudy.hero_title}
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-2 flex-1">
            {caseStudy.hero_subtitle}
          </p>
          <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-border">
            {caseStudy.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="font-bold text-accent text-sm">{metric.value}</div>
                <div className="text-xs text-foreground/60 line-clamp-1">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-accent group-hover:text-accent/80 transition-colors mt-auto">
            <span>Read More</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </Card>
  );
}
