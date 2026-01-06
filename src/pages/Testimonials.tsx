import { useEffect } from "react";
import { Meta } from "@/components/seo/Meta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BadgeHero } from "@/components/ui/badge-hero";
import { HomeThirdPartyReviewsSection } from "@/components/home/HomeThirdPartyReviewsSection";
import { TestimonialsCarousel } from "@/components/testimonials/TestimonialsCarousel";
import { VideoTestimonials } from "@/components/testimonials/VideoTestimonials";
import { TestimonialsByCategory } from "@/components/testimonials/TestimonialsByCategory";
import { HomeCaseStudiesSection } from "@/components/home/HomeCaseStudiesSection";
import { ClientLogosCarouselSection } from "@/components/landing-sections/ClientLogosCarouselSection";
import { TestimonialsDualCTA } from "@/components/testimonials/TestimonialsDualCTA";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Users, Globe, TrendingUp } from "lucide-react";

const trustStats = [
  { value: "500+", label: "International Clients", icon: Users },
  { value: "50+", label: "Countries Served", icon: Globe },
  { value: "98%", label: "Client Retention", icon: TrendingUp },
];

const Testimonials = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('testimonials_page_view_global_nrro', {
      page_location: '/testimonials'
    });
  }, [trackEvent]);

  return (
    <>
      <Meta
        title="Client Testimonials & Reviews - NRRO International Advisory"
        description="Read verified testimonials from multinational companies, investors, and business leaders who trust NRRO for international legal, tax, and accounting services."
        canonicalUrl="/testimonials"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Testimonials", url: "/testimonials" },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-20 md:pt-48 md:pb-28" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeHero>Client Success</BadgeHero>
            
            <h1 className="hero-title mt-6 mb-6">
              Trusted by Global Business Leaders
            </h1>
            
            <p className="text-lead text-white/70 max-w-2xl mx-auto mb-12">
              Discover why multinational companies, investors, and executives across 
              50+ countries choose NRRO for their international legal, tax, and accounting needs.
            </p>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
              {trustStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-white/50" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Reviews */}
      <HomeThirdPartyReviewsSection />

      {/* Featured Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Testimonials by Category */}
      <TestimonialsByCategory />

      {/* Case Studies Highlight */}
      <HomeCaseStudiesSection />

      {/* Client Logos */}
      <ClientLogosCarouselSection />

      {/* Dual CTA Section */}
      <TestimonialsDualCTA />
    </>
  );
};

export default Testimonials;
