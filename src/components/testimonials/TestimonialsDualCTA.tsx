import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Calendar, ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const TestimonialsDualCTA = () => {
  const { trackEvent } = useAnalytics();

  const handleLeaveReviewClick = () => {
    trackEvent('testimonials_leave_review_cta_global_nrro', {
      cta_position: 'bottom_section'
    });
  };

  const handleConsultationClick = () => {
    trackEvent('testimonials_consultation_cta_global_nrro', {
      cta_position: 'bottom_section'
    });
  };

  return (
    <section className="py-20 md:py-28 bg-black text-white" data-dark="true">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Leave a Review CTA */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                <MessageSquarePlus className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-normal text-white mb-4">
              Share Your Experience
            </h3>
            
            <p className="text-white/70 mb-8 leading-relaxed">
              Worked with us? We'd love to hear your feedback. Your review helps other 
              international businesses find trusted advisors.
            </p>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 group"
              onClick={handleLeaveReviewClick}
            >
              <Link to="/leave-review">
                Leave a Review
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Book Consultation CTA */}
          <div className="bg-primary border border-primary rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-normal text-white mb-4">
              Ready to Get Started?
            </h3>
            
            <p className="text-white/80 mb-8 leading-relaxed">
              Join 500+ international businesses that trust NRRO for their legal, 
              tax, and accounting needs across 50+ countries.
            </p>
            
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-all duration-300 group"
              onClick={handleConsultationClick}
            >
              <Link to="/contact">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
