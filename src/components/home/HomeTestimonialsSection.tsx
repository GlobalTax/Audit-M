import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useLanguage } from "@/contexts/LanguageContext";

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export function HomeTestimonialsSection() {
  const { trackEvent, trackCTAClick } = useAnalytics();
  const { data: testimonials, isLoading } = useTestimonials('int');
  const { t } = useLanguage();

  const handleTestimonialClick = (testimonial: { author_name: string; company_type: string }, index: number) => {
    trackEvent('testimonial_click_homepage', {
      author: testimonial.author_name,
      company_type: testimonial.company_type,
      position: index + 1
    });
  };

  const handleCTAClick = () => {
    trackCTAClick(t("home.testimonials.cta"), 'homepage_testimonials');
    trackEvent('testimonials_cta_click', {});
  };

  if (isLoading) {
    return (
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Skeleton className="h-4 w-40 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border rounded-lg p-6">
                <Skeleton className="h-8 w-8 mb-4" />
                <Skeleton className="h-20 w-full mb-6" />
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            {t("home.testimonials.overline")}
          </p>
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            {t("home.testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home.testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => handleTestimonialClick(testimonial, index)}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              
              {/* Quote Text */}
              <p className="text-foreground/90 italic leading-relaxed mb-6 text-sm md:text-base line-clamp-4">
                "{testimonial.quote}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={testimonial.avatar_url || undefined} alt={testimonial.author_name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {getInitials(testimonial.author_name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {testimonial.author_name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {testimonial.author_role}, {testimonial.company_name}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {testimonial.flag_emoji} {testimonial.location}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.company_type_label}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            onClick={handleCTAClick}
          >
            <Link to="/testimonials">
              {t("home.testimonials.cta")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
