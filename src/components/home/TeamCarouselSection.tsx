import { Link } from "react-router-dom";
import { Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useAnalytics } from "@/hooks/useAnalytics";

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const TeamCarouselSection = () => {
  const { data: teamMembers, isLoading } = useTeamMembers("en");
  const { trackCTAClick } = useAnalytics();

  if (isLoading) {
    return (
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
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
            The People Behind Your Success
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground max-w-2xl mx-auto">
            Meet Our Global Team
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
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="text-center p-6 group">
                  <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-border transition-transform group-hover:scale-105">
                    <AvatarImage
                      src={member.avatar_url || undefined}
                      alt={member.name}
                    />
                    <AvatarFallback className="text-lg bg-muted">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.position}
                  </p>
                  {member.specialization && (
                    <p className="text-xs text-muted-foreground/70 mt-1">
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
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            onClick={() => trackCTAClick("View Full Team", "team_carousel")}
          >
            <Link to="/about#team">
              View Full Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
