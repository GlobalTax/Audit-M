import { Link } from "react-router-dom";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAnalytics } from "@/hooks/useAnalytics";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  companyType: 'multinational' | 'family_business' | 'investor' | 'startup' | 'sme';
  companyTypeLabel: string;
  location: string;
  flag: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Setting up our European headquarters in Barcelona was seamless. Navarro's team handled every step — from legal structuring to tax registration — in under four weeks.",
    author: "James Mitchell",
    role: "CEO",
    company: "TechBridge Ventures",
    companyType: "startup",
    companyTypeLabel: "Tech Startup",
    location: "United Kingdom",
    flag: "🇬🇧"
  },
  {
    id: "2",
    quote: "Their transfer pricing expertise saved us significant tax exposure across three jurisdictions. Proactive advice that goes beyond compliance.",
    author: "Dr. Elena Fischer",
    role: "Group Tax Director",
    company: "Hartmann Industries AG",
    companyType: "multinational",
    companyTypeLabel: "Multinational",
    location: "Germany",
    flag: "🇩🇪"
  },
  {
    id: "3",
    quote: "As a US investor entering Spain, I needed advisors who understood both legal systems. Their bilingual team and responsive communication exceeded all expectations.",
    author: "Rachel Morrison",
    role: "Investment Director",
    company: "Atlantic Capital Partners",
    companyType: "investor",
    companyTypeLabel: "Investor",
    location: "United States",
    flag: "🇺🇸"
  },
  {
    id: "4",
    quote: "Managing payroll across Spain, Portugal, and France was a constant headache. Since partnering with Navarro, our multi-country operations run like clockwork.",
    author: "Pierre Dubois",
    role: "VP of Global HR",
    company: "LogiTrans Europe SA",
    companyType: "multinational",
    companyTypeLabel: "Multinational",
    location: "France",
    flag: "🇫🇷"
  },
  {
    id: "5",
    quote: "Our family business needed succession planning that preserved our legacy while optimizing tax efficiency. They delivered a solution that satisfied all stakeholders.",
    author: "Carlos Mendoza III",
    role: "Managing Director",
    company: "Grupo Mendoza",
    companyType: "family_business",
    companyTypeLabel: "Family Business",
    location: "Mexico",
    flag: "🇲🇽"
  },
  {
    id: "6",
    quote: "From subsidiary incorporation to ongoing compliance, they've been our trusted partner for five years. Their integrated approach eliminates the silos we had with previous advisors.",
    author: "Isabelle van der Berg",
    role: "CFO",
    company: "Nordica Consumer Goods",
    companyType: "multinational",
    companyTypeLabel: "Multinational",
    location: "Netherlands",
    flag: "🇳🇱"
  }
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export function HomeTestimonialsSection() {
  const { trackEvent, trackCTAClick } = useAnalytics();

  const handleTestimonialClick = (testimonial: Testimonial, index: number) => {
    trackEvent('testimonial_click_homepage_global_nrro', {
      author: testimonial.author,
      company_type: testimonial.companyType,
      position: index + 1
    });
  };

  const handleCTAClick = () => {
    trackCTAClick('See More Success Stories', 'homepage_testimonials');
    trackEvent('testimonials_cta_click_global_nrro', {});
  };

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            Client Success Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by multinational leaders, investors, and family businesses worldwide
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
              <p className="text-foreground/90 italic leading-relaxed mb-6 text-sm md:text-base">
                "{testimonial.quote}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {getInitials(testimonial.author)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {testimonial.role}, {testimonial.company}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {testimonial.flag} {testimonial.location}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.companyTypeLabel}
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
            <Link to="/case-studies">
              See More Success Stories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
