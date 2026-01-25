import { Link } from "react-router-dom";
import { Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const TeamCarouselSection = () => {
  const { t, language } = useLanguage();
  const { data: teamMembers, isLoading } = useTeamMembers(language);
  const { trackCTAClick } = useAnalytics();

  if (isLoading) {
    return (
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="aspect-square w-full mb-4" />
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
            {t("home.team.overline")}
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground max-w-2xl mx-auto">
            {t("home.team.title")}
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {teamMembers.map((member) => (
              <CarouselItem
                key={member.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <Card className="overflow-hidden hover-lift group">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {member.avatar_url ? (
                      <img
                        src={member.avatar_url}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-5xl font-light text-muted-foreground/50">
                          {getInitials(member.name)}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground text-base">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {member.position}
                    </p>
                    {member.specialization && (
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        {member.specialization}
                      </p>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex mt-3"
                        onClick={() =>
                          trackCTAClick(`Team LinkedIn - ${member.name}`, "team_carousel")
                        }
                      >
                        <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            onClick={() => trackCTAClick(t("home.team.cta"), "team_carousel")}
          >
            <Link to="/team">
              {t("home.team.cta")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
