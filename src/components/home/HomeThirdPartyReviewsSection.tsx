import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating = ({ rating, maxStars = 5 }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "text-amber-400 fill-amber-400"
              : i === fullStars && hasPartial
              ? "text-amber-400 fill-amber-400/50"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
};

const platformReviews = [
  {
    platform: "Trustpilot",
    rating: 4.8,
    totalReviews: 47,
    excerpt:
      "NRRO handled our Spanish subsidiary setup with remarkable efficiency. Their international team understood our UK-based requirements perfectly.",
    author: "Director, UK Technology Company",
    url: "https://www.trustpilot.com/review/nrro.es",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#00b67a]" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
  },
  {
    platform: "Google Reviews",
    rating: 4.9,
    totalReviews: 82,
    excerpt:
      "Outstanding cross-border tax advisory. They simplified our European expansion and saved us significant costs through proper structuring.",
    author: "CFO, German Manufacturing Group",
    url: "https://g.page/r/nrro-barcelona/review",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    platform: "Clutch",
    rating: 5.0,
    totalReviews: 23,
    excerpt:
      "Professional, responsive, and truly international in their approach. Our PE fund relies on their Spanish market expertise.",
    author: "Partner, International Investment Fund",
    url: "https://clutch.co/profile/nrro",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#ff3d2e]" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" fill="white" />
      </svg>
    ),
  },
];

export const HomeThirdPartyReviewsSection = () => {
  const { trackEvent } = useAnalytics();

  const handlePlatformClick = (platform: string, url: string) => {
    trackEvent("third_party_review_platform_click_global_nrro", {
      platform_name: platform,
      destination_url: url,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleLeaveReviewClick = () => {
    trackEvent("third_party_review_leave_click_global_nrro", {
      cta_text: "Leave a Review",
    });
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            Independent Verification
          </span>
          <h2 className="text-3xl md:text-4xl font-normal mt-4 mb-4">
            Verified Reviews from Trusted Platforms
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what clients say about us on independent review platforms
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {platformReviews.map((review, index) => (
            <motion.div
              key={review.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handlePlatformClick(review.platform, review.url)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Platform Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {review.icon}
                      <span className="font-medium text-lg">{review.platform}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} />
                    <span className="font-medium">{review.rating}/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {review.totalReviews} verified reviews
                  </p>

                  {/* Review Excerpt */}
                  <blockquote className="flex-1 italic text-foreground/80 border-l-2 border-primary/20 pl-4 mb-4">
                    "{review.excerpt}"
                  </blockquote>

                  {/* Author */}
                  <p className="text-sm text-muted-foreground">
                    — {review.author}
                  </p>

                  {/* Link */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-primary group-hover:underline flex items-center gap-1">
                      View all on {review.platform}
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Leave a Review CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            size="lg"
            variant="outline"
            onClick={handleLeaveReviewClick}
            asChild
          >
            <a
              href="https://g.page/r/nrro-barcelona/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a Review
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
