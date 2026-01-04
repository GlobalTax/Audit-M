import { useState } from "react";
import { Quote, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAnalytics } from "@/hooks/useAnalytics";

interface InternationalTestimonial {
  id: string;
  quote: string;
  fullQuote?: string;
  author: string;
  role: string;
  companyType: 'multinational' | 'family_business' | 'foreign_investor' | 'startup' | 'sme';
  companyTypeLabel: string;
  location?: string;
}

const testimonials: InternationalTestimonial[] = [
  {
    id: "1",
    quote: "Their multi-jurisdictional expertise transformed our European expansion. We reduced compliance risk by 40% in the first year.",
    author: "Michael Hartmann",
    role: "CFO",
    companyType: "multinational",
    companyTypeLabel: "Multinational Corporation",
    location: "Germany",
  },
  {
    id: "2",
    quote: "Managing payroll across five countries was a nightmare until we partnered with Navarro. Now it runs seamlessly.",
    author: "Sarah Chen",
    role: "VP of Global HR",
    companyType: "multinational",
    companyTypeLabel: "Technology Multinational",
    location: "Singapore",
  },
  {
    id: "3",
    quote: "As a family business expanding internationally, we needed advisors who understood both governance and succession. They delivered.",
    author: "Carlos Mendoza",
    role: "Managing Director",
    companyType: "family_business",
    companyTypeLabel: "Family Business",
    location: "Mexico",
  },
  {
    id: "4",
    quote: "Their transfer pricing documentation saved us from a significant audit exposure. Proactive and thorough.",
    author: "Elena Kowalski",
    role: "Group Tax Director",
    companyType: "multinational",
    companyTypeLabel: "Industrial Multinational",
    location: "Poland",
  },
  {
    id: "5",
    quote: "Setting up our Spanish subsidiary took half the time we expected. Their legal team handled everything flawlessly.",
    author: "James Richardson",
    role: "CEO",
    companyType: "startup",
    companyTypeLabel: "Tech Startup",
    location: "United Kingdom",
  },
  {
    id: "6",
    quote: "The integrated approach to tax, legal, and accounting eliminated the silos we had with previous advisors.",
    author: "Isabelle Dubois",
    role: "Group Controller",
    companyType: "multinational",
    companyTypeLabel: "Multinational Corporation",
    location: "France",
  },
  {
    id: "7",
    quote: "Our treasury management improved dramatically. Cash flow forecasting across entities is now reliable and actionable.",
    author: "Henrik Larsson",
    role: "Treasury Manager",
    companyType: "multinational",
    companyTypeLabel: "Nordic Multinational",
    location: "Sweden",
  },
  {
    id: "8",
    quote: "They helped us navigate complex cross-border M&A due diligence with precision and speed.",
    author: "Takeshi Yamamoto",
    role: "M&A Director",
    companyType: "multinational",
    companyTypeLabel: "Japanese Multinational",
    location: "Japan",
  },
  {
    id: "9",
    quote: "As foreign investors in Spain, we needed local expertise with an international mindset. Navarro was the perfect fit.",
    author: "Rachel Morrison",
    role: "Investment Director",
    companyType: "foreign_investor",
    companyTypeLabel: "Private Equity Fund",
    location: "United States",
  },
  {
    id: "10",
    quote: "Their expatriate tax planning saved our executives significant personal tax exposure during relocation.",
    author: "Alessandro Rossi",
    role: "HR Director",
    companyType: "multinational",
    companyTypeLabel: "Italian Multinational",
    location: "Italy",
  },
];

const companyTypeBadgeStyles: Record<string, string> = {
  multinational: "bg-primary/10 text-primary border-primary/20",
  family_business: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  foreign_investor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  startup: "bg-violet-500/10 text-violet-700 border-violet-500/20",
  sme: "bg-slate-500/10 text-slate-700 border-slate-500/20",
};

export const InternationalTestimonials = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { trackTestimonialInteraction } = useAnalytics();

  const handleCardClick = (testimonial: InternationalTestimonial, index: number) => {
    trackTestimonialInteraction({
      eventName: 'testimonial_click_global_nrro',
      testimonialAuthor: testimonial.author,
      testimonialIndex: index,
      companyType: testimonial.companyType,
      interactionType: 'click',
    });
  };

  const handleExpandToggle = (testimonial: InternationalTestimonial, index: number, isExpanding: boolean) => {
    setExpandedId(isExpanding ? testimonial.id : null);
    trackTestimonialInteraction({
      eventName: isExpanding ? 'testimonial_expand_global_nrro' : 'testimonial_collapse_global_nrro',
      testimonialAuthor: testimonial.author,
      testimonialIndex: index,
      companyType: testimonial.companyType,
      interactionType: isExpanding ? 'expand' : 'collapse',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Client Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Global Business Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from multinational corporations, family businesses, and foreign investors 
            who have transformed their international operations with our advisory services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleCardClick(testimonial, index)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                {/* Quote Text */}
                <blockquote className="text-foreground/90 mb-6 flex-grow">
                  <p className="italic leading-relaxed">
                    "{expandedId === testimonial.id && testimonial.fullQuote
                      ? testimonial.fullQuote
                      : testimonial.quote}"
                  </p>
                </blockquote>

                {/* Expand/Collapse Button (if fullQuote exists) */}
                {testimonial.fullQuote && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-fit mb-4 text-primary hover:text-primary/80"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpandToggle(testimonial, index, expandedId !== testimonial.id);
                    }}
                  >
                    {expandedId === testimonial.id ? (
                      <>
                        Read less <ChevronUp className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}

                {/* Author Info */}
                <div className="flex items-start gap-4 pt-4 border-t border-border/50">
                  <Avatar className="w-12 h-12 bg-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(testimonial.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${companyTypeBadgeStyles[testimonial.companyType]}`}
                      >
                        {testimonial.companyTypeLabel}
                      </Badge>
                      {testimonial.location && (
                        <span className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {testimonial.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Join over 200+ international companies who trust us with their global operations.
          </p>
        </div>
      </div>
    </section>
  );
};
