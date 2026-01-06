import { useTestimonials } from "@/hooks/useTestimonials";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useAnalytics } from "@/hooks/useAnalytics";

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const TestimonialsCarousel = () => {
  const { data: testimonials, isLoading } = useTestimonials('int');
  const { trackEvent } = useAnalytics();

  const handleCarouselScroll = () => {
    trackEvent('testimonials_carousel_scroll_global_nrro', {
      page_location: '/testimonials'
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-4 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
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
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
            Client Voices
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground">
            What Our Clients Say
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border border-border/50 bg-card hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    
                    <blockquote className="text-foreground/80 leading-relaxed flex-grow mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex items-start gap-4 pt-4 border-t border-border/50">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar_url || ''} alt={testimonial.author_name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(testimonial.author_name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {testimonial.author_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.author_role}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {testimonial.company_name}
                          </span>
                          {testimonial.flag_emoji && (
                            <span>{testimonial.flag_emoji}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {testimonial.company_type_label && (
                      <Badge variant="secondary" className="mt-4 w-fit">
                        {testimonial.company_type_label}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};
