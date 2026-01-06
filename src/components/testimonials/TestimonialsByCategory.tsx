import { useState } from "react";
import { useTestimonials } from "@/hooks/useTestimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalytics } from "@/hooks/useAnalytics";

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const categories = [
  { id: "all", label: "All" },
  { id: "company-setup", label: "Company Setup" },
  { id: "international-tax", label: "International Tax" },
  { id: "accounting", label: "Accounting & Payroll" },
  { id: "legal", label: "Legal Advisory" },
];

// Map company types to categories for filtering
const categoryMapping: Record<string, string[]> = {
  "all": [],
  "company-setup": ["Tech Startup", "E-commerce", "Startup"],
  "international-tax": ["Multinational", "Investment Fund", "PE Fund"],
  "accounting": ["SME", "Manufacturing", "Logistics"],
  "legal": ["Family Business", "Corporation", "Holding Company"],
};

export const TestimonialsByCategory = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: testimonials, isLoading } = useTestimonials('int');
  const { trackEvent } = useAnalytics();

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    trackEvent('testimonials_category_filter_global_nrro', {
      category: category
    });
  };

  const filteredTestimonials = testimonials?.filter(t => {
    if (activeCategory === "all") return true;
    const mappedTypes = categoryMapping[activeCategory] || [];
    return mappedTypes.some(type => 
      t.company_type?.toLowerCase().includes(type.toLowerCase()) ||
      t.company_type_label?.toLowerCase().includes(type.toLowerCase())
    );
  }) || [];

  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-4 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-80 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
            By Service
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground">
            Success Stories Across Our Practice Areas
          </h2>
        </div>

        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-12 bg-transparent h-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-6 py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border data-[state=active]:border-primary"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              {(activeCategory === "all" ? testimonials : filteredTestimonials)?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No testimonials available for this category yet.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(activeCategory === "all" ? testimonials : filteredTestimonials)?.map((testimonial) => (
                    <Card 
                      key={testimonial.id} 
                      className="border border-border/50 hover:shadow-md transition-shadow duration-300"
                    >
                      <CardContent className="p-6">
                        <Quote className="h-6 w-6 text-primary/20 mb-3" />
                        
                        <blockquote className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-4">
                          "{testimonial.quote}"
                        </blockquote>

                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={testimonial.avatar_url || ''} alt={testimonial.author_name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                              {getInitials(testimonial.author_name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground">
                              {testimonial.author_name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {testimonial.author_role}, {testimonial.company_name}
                            </p>
                          </div>
                          
                          {testimonial.flag_emoji && (
                            <span className="text-lg">{testimonial.flag_emoji}</span>
                          )}
                        </div>

                        {testimonial.company_type_label && (
                          <Badge variant="outline" className="mt-3 text-xs">
                            {testimonial.company_type_label}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
