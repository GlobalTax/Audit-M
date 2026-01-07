import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
import { CaseStudy } from '@/types/caseStudy';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CaseStudyMetricCard } from '@/components/case-studies/CaseStudyMetricCard';
import { CaseStudyTestimonial } from '@/components/case-studies/CaseStudyTestimonial';
import { CaseStudyTimeline } from '@/components/case-studies/CaseStudyTimeline';
import { CaseStudyGallery } from '@/components/case-studies/CaseStudyGallery';
import { RelatedServices } from '@/components/case-studies/RelatedServices';
import { ArrowLeft, Calendar, Building2, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import DOMPurify from 'dompurify';
import { useLanguage } from '@/contexts/LanguageContext';
import { mainBreadcrumbs, createDynamicBreadcrumb } from '@/lib/seoUtils';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const { data: caseStudy, isLoading } = useQuery({
    queryKey: ['case-study', slug, language],
    queryFn: async () => {
      // Try to find in database first
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .or(`slug.eq.${slug},slug_es.eq.${slug},slug_ca.eq.${slug},slug_en.eq.${slug}`)
        .eq('status', 'published')
        .single();

      if (error || !data) {
        // Fallback to sample data for the international site
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
            challenge: '<p>TechFlow Solutions, a rapidly growing UK-based SaaS company, needed to establish a physical presence in the EU post-Brexit to better serve their European clients. They faced complex decisions around entity structure, tax optimization, and employment compliance.</p>',
            solution: '<p>We provided a comprehensive solution including: Spanish SL formation, tax-efficient structuring, employment contracts for their 25-person team, and ongoing compliance support. Our team coordinated with their UK advisors to ensure seamless integration.</p>',
            results_summary: 'Successfully established Spanish subsidiary in 4 weeks with €120K annual tax savings.',
            metrics: [
              { label: 'Setup Time', value: '4 weeks' },
              { label: 'Tax Savings', value: '€120K/yr' },
              { label: 'Team Size', value: '25 employees' },
            ],
            testimonial_text: "NRRO made our Spain expansion seamless. Their expertise in both legal and tax matters saved us months of work.",
            testimonial_author: "James Mitchell",
            testimonial_position: "CEO, TechFlow Solutions",
            tags: ['Tech', 'Subsidiary', 'UK'],
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
            challenge: '<p>Deutsche Industrie GmbH identified a strategic acquisition target in Spain but lacked local expertise to navigate the due diligence process and ensure regulatory compliance.</p>',
            solution: '<p>Our M&A team conducted comprehensive legal, tax, and financial due diligence. We identified 12 potential issues, negotiated solutions, and managed the entire transaction through to closing.</p>',
            results_summary: 'Completed €15M acquisition with full due diligence in 8 weeks, resolving 12 potential issues.',
            metrics: [
              { label: 'Deal Value', value: '€15M' },
              { label: 'DD Duration', value: '8 weeks' },
              { label: 'Issues Found', value: '12 resolved' },
            ],
            tags: ['M&A', 'Manufacturing', 'Germany'],
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
            challenge: '<p>Atlantic Capital Partners needed a flexible yet tax-efficient structure to execute a multi-asset acquisition strategy across Spain and Portugal.</p>',
            solution: '<p>We designed and implemented a holding structure that optimized for both US and Spanish tax considerations while providing operational flexibility for future acquisitions and exits.</p>',
            results_summary: 'Structured €85M platform with 35% improved tax efficiency across 5 acquired companies.',
            metrics: [
              { label: 'Assets Acquired', value: '5 companies' },
              { label: 'Total Value', value: '€85M' },
              { label: 'Tax Efficiency', value: '35% improved' },
            ],
            tags: ['PE', 'Structuring', 'USA'],
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
            challenge: '<p>Maison Élégance wanted to relocate three key executives to Spain to oversee their Iberian expansion but needed to optimize the personal tax situation for each.</p>',
            solution: '<p>We secured Ley Beckham status for all three executives, providing them with a 24% flat tax rate instead of the standard progressive rates up to 47%.</p>',
            results_summary: 'Secured Ley Beckham status for 3 executives with 24% flat tax rate in 6 weeks.',
            metrics: [
              { label: 'Executives Relocated', value: '3' },
              { label: 'Tax Rate', value: '24% flat' },
              { label: 'Processing Time', value: '6 weeks' },
            ],
            tags: ['Ley Beckham', 'Retail', 'France'],
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
            challenge: '<p>NordicShop AB needed to rapidly establish Spanish operations to fulfill growing demand from Southern European customers.</p>',
            solution: '<p>We delivered a complete subsidiary setup in 6 weeks, including company formation, employment contracts for 45 staff, payroll setup, and regulatory compliance for warehouse operations.</p>',
            results_summary: 'Launched full Spanish operations in 6 weeks, hiring 45 employees and achieving €8M Year 1 revenue.',
            metrics: [
              { label: 'Launch Time', value: '6 weeks' },
              { label: 'Employees', value: '45 hired' },
              { label: 'Revenue Y1', value: '€8M' },
            ],
            tags: ['E-commerce', 'Subsidiary', 'Sweden'],
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
            challenge: '<p>Geneva Wealth Partners sought to invest in Spanish real estate but needed a structure that minimized withholding taxes and provided flexibility for future exits.</p>',
            solution: '<p>We implemented a holding structure leveraging the Spain-Switzerland tax treaty, optimizing for both acquisition and future disposition of the 8-asset portfolio.</p>',
            results_summary: 'Structured €25M real estate portfolio across 8 properties with 6.2% net yield.',
            metrics: [
              { label: 'Portfolio Value', value: '€25M' },
              { label: 'Properties', value: '8 assets' },
              { label: 'Net Yield', value: '6.2%' },
            ],
            tags: ['Real Estate', 'Family Office', 'Switzerland'],
          },
        ];
        
        const sampleCase = SAMPLE_CASE_STUDIES.find(c => c.slug === slug);
        if (!sampleCase) return null;
        
        return {
          ...sampleCase,
          slug_en: sampleCase.slug,
          timeline: [],
          gallery: [],
          related_services: [],
        } as any;
      }
      
      // Increment view count for DB entries
      await supabase.rpc('increment_case_study_view_count', {
        case_study_id: data.id
      });

      return {
        ...data,
        title: data.title_en || data.title || data.title_es,
        slug: data.slug_en || data.slug || data.slug_es,
        hero_title: data.hero_title_en || data.hero_title || data.hero_title_es,
        hero_subtitle: data.hero_subtitle_en || data.hero_subtitle || data.hero_subtitle_es,
        challenge: data.challenge_en || data.challenge || data.challenge_es,
        solution: data.solution_en || data.solution || data.solution_es,
        results_summary: data.results_summary_en || data.results_summary || data.results_summary_es,
        detailed_content: data.detailed_content_en || data.detailed_content || data.detailed_content_es,
        testimonial_text: data.testimonial_text_en || data.testimonial_text || data.testimonial_text_es,
        meta_title: data.meta_title_en || data.meta_title || data.meta_title_es,
        meta_description: data.meta_description_en || data.meta_description || data.meta_description_es,
        slug_es: data.slug_es,
        slug_ca: data.slug_ca,
        slug_en: data.slug_en || data.slug,
        metrics: (data.metrics as any) || [],
        timeline: (data.timeline as any) || [],
        gallery: (data.gallery as any) || [],
        related_services: (data.related_services as any) || [],
        tags: (data.tags as any) || [],
      } as any;
    },
    enabled: !!slug,
  });
  
  // Breadcrumb items
  const breadcrumbItems = caseStudy 
    ? createDynamicBreadcrumb(mainBreadcrumbs.caseStudies, caseStudy.hero_title || caseStudy.title)
    : mainBreadcrumbs.caseStudies;


  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="w-full h-96" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-normal mb-4">Case Study Not Found</h1>
          <Link to="/case-studies">
            <Button variant="outline">Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasMetrics = caseStudy.metrics && caseStudy.metrics.length > 0;
  const hasTestimonial = caseStudy.testimonial_text && caseStudy.testimonial_author;
  const hasGallery = caseStudy.gallery && caseStudy.gallery.length > 0;
  const hasTimeline = caseStudy.timeline && caseStudy.timeline.length > 0;

  // Generate dynamic OG image URL
  const ogImageUrl = caseStudy 
    ? `https://zntotcpagkunvkwpubqu.supabase.co/functions/v1/generate-og-image?type=case-study&title=${encodeURIComponent(caseStudy.hero_title)}&description=${encodeURIComponent((caseStudy.hero_subtitle || '').substring(0, 150))}`
    : "https://nrro.es/og-image.png";

  return (
    <>
      <Meta
        title={caseStudy.meta_title || `${caseStudy.hero_title} | Case Studies | NRRO`}
        description={caseStudy.meta_description || caseStudy.hero_subtitle || caseStudy.results_summary}
        ogImage={ogImageUrl}
        canonicalUrl={`${window.location.origin}/case-studies/${caseStudy.slug_en || caseStudy.slug}`}
        slugs={{
          es: caseStudy.slug_es,
          ca: caseStudy.slug_ca || caseStudy.slug_es,
          en: caseStudy.slug_en || caseStudy.slug,
        }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-black text-white">
        {caseStudy.hero_image_url && (
          <div className="absolute inset-0 opacity-30">
            <img
              src={caseStudy.hero_image_url}
              alt={caseStudy.hero_title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="max-w-4xl">
            <Link to="/case-studies">
              <Button variant="ghost" size="sm" className="mb-8 text-white hover:text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Button>
            </Link>

            {caseStudy.client_logo_url && (
              <img
                src={caseStudy.client_logo_url}
                alt={caseStudy.client_name || 'Cliente'}
                className="h-12 mb-8 brightness-0 invert"
              />
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {caseStudy.client_industry && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                  {caseStudy.client_industry}
                </Badge>
              )}
              {caseStudy.primary_service && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                  {caseStudy.primary_service}
                </Badge>
              )}
              {caseStudy.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline" className="border-white/20 text-white">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight">
              {caseStudy.hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              {caseStudy.hero_subtitle}
            </p>

            <div className="flex flex-wrap gap-6 mt-8 text-sm">
              {caseStudy.client_name && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-white/60" />
                  <span>{caseStudy.client_name}</span>
                </div>
              )}
              {caseStudy.project_duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-white/60" />
                  <span>{caseStudy.project_duration}</span>
                </div>
              )}
              {caseStudy.client_size && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-white/60" />
                  <span>{caseStudy.client_size}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
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
                <BreadcrumbLink asChild>
                  <Link to="/case-studies">Case Studies</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{caseStudy?.hero_title || caseStudy?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Challenge Section */}
      {caseStudy.challenge && (
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-normal text-center mb-4">
              {t('caseStudies.challenge')}
            </h2>
            <div 
              className="prose prose-lg max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(caseStudy.challenge) }}
            />
          </div>
        </section>
      )}

      {/* Solution Section */}
      {caseStudy.solution && (
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-normal text-center mb-4">
              {t('caseStudies.solution')}
            </h2>
            <div 
              className="prose prose-lg max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(caseStudy.solution) }}
            />
          </div>
        </section>
      )}

      {/* Metrics Section */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <section className="bg-neutral-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-normal text-center mb-12">
              {t('caseStudies.results')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.metrics.map((metric: any, index: number) => (
                <CaseStudyMetricCard key={index} metric={metric} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {caseStudy.testimonial_text && (
        <section className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-normal text-center mb-4">
              {t('caseStudies.testimonial')}
            </h2>
            <p className="text-body text-center mb-12 max-w-2xl mx-auto">
              {t('caseStudies.testimonialSubtitle')}
            </p>
          <CaseStudyTestimonial
            text={caseStudy.testimonial_text}
            author={caseStudy.testimonial_author || ''}
            position={caseStudy.testimonial_position || ''}
            avatarUrl={caseStudy.testimonial_avatar_url}
          />
          </div>
        </section>
      )}

      {/* Detailed Content */}
      {caseStudy.detailed_content && (
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(caseStudy.detailed_content) }}
            />
          </div>
        </section>
      )}

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="bg-neutral-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CaseStudyGallery gallery={caseStudy.gallery} />
          </div>
        </section>
      )}

      {/* Timeline */}
      {caseStudy.timeline && caseStudy.timeline.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-normal text-center mb-12">
              {t('caseStudies.timeline')}
            </h2>
            <CaseStudyTimeline timeline={caseStudy.timeline} />
          </div>
        </section>
      )}

      {/* Related Services */}
      {caseStudy.related_services && caseStudy.related_services.length > 0 && (
        <section className="bg-neutral-50 py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-normal mb-4">
              {t('caseStudies.relatedServices')}
            </h2>
            <RelatedServices serviceIds={caseStudy.related_services} />
          </div>
        </section>
      )}

      {/* Related Cases */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            {t('caseStudies.otherCases')}
          </h2>
          {/* TODO: Add related cases carousel */}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-normal mb-4">
              {t('caseStudies.similarProject')}
            </h2>
            <p className="text-body mb-8">
              {t('caseStudies.contactSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
              <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">
                  View Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
