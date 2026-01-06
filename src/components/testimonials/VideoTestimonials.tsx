import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Building2, MapPin } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface VideoTestimonial {
  id: string;
  title: string;
  description: string;
  company: string;
  role: string;
  location: string;
  thumbnailUrl: string;
  videoUrl: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: "1",
    title: "European Tech Expansion",
    description: "How NRRO helped us establish our Spanish headquarters in just 3 weeks, enabling rapid EU market entry.",
    company: "UK SaaS Company",
    role: "CEO & Co-Founder",
    location: "London, UK",
    thumbnailUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    videoUrl: ""
  },
  {
    id: "2",
    title: "Family Business Succession",
    description: "Strategic restructuring of our European operations for the next generation of leadership.",
    company: "German Manufacturing Group",
    role: "CFO",
    location: "Munich, Germany",
    thumbnailUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
    videoUrl: ""
  },
  {
    id: "3",
    title: "Private Equity Entry to Spain",
    description: "Finding the optimal tax structure for our portfolio company's Spanish acquisition.",
    company: "International Investment Fund",
    role: "Managing Partner",
    location: "New York, USA",
    thumbnailUrl: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=600&h=400&fit=crop",
    videoUrl: ""
  }
];

export const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
  const { trackEvent } = useAnalytics();

  const handleVideoPlay = (video: VideoTestimonial) => {
    trackEvent('testimonials_video_play_global_nrro', {
      video_title: video.title,
      company: video.company
    });
    setSelectedVideo(video);
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
            Video Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            Hear Directly from Our Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how we've helped international businesses succeed in Spain and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videoTestimonials.map((video) => (
            <Card 
              key={video.id} 
              className="overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full h-16 w-16 p-0 bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300"
                    onClick={() => handleVideoPlay(video)}
                  >
                    <Play className="h-6 w-6 text-primary ml-1" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-foreground mb-2">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{video.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{video.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>{selectedVideo?.title}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-muted flex items-center justify-center p-6">
              <div className="text-center text-muted-foreground">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Video Coming Soon</p>
                <p className="text-sm mt-2">
                  {selectedVideo?.description}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
