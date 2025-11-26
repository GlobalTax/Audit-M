import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Building2 } from "lucide-react";

interface ClientLogosCarouselSectionProps {
  overline?: string;
  title?: string;
}

export const ClientLogosCarouselSection = ({
  overline = "Trusted by Leading Companies",
  title = "International Clients We Support"
}: ClientLogosCarouselSectionProps) => {
  const clientLogos = [
    { name: "Tech Ventures UK", country: "United Kingdom" },
    { name: "InvestCorp France", country: "France" },
    { name: "Global Assets Germany", country: "Germany" },
    { name: "Nordic Capital Sweden", country: "Sweden" },
    { name: "Swiss Holdings SA", country: "Switzerland" },
    { name: "Benelux Ventures", country: "Netherlands" },
    { name: "Italian Growth Partners", country: "Italy" },
    { name: "Austrian Business Group", country: "Austria" },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          {overline && (
            <div className="text-overline mb-3 text-primary">
              {overline}
            </div>
          )}
          {title && (
            <h2 className="text-3xl font-bold">{title}</h2>
          )}
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {clientLogos.map((client, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="flex flex-col items-center justify-center p-6 h-32 bg-background rounded-lg border border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-md group">
                  <Building2 
                    className="h-10 w-10 mb-2 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" 
                  />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground/60 group-hover:text-foreground transition-colors duration-300">
                      {client.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {client.country}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Supporting entrepreneurs and investors from across Europe and beyond
          </p>
        </div>
      </div>
    </section>
  );
};
