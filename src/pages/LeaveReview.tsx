import { useEffect } from "react";
import { motion } from "framer-motion";
import { Meta } from "@/components/seo/Meta";
import { BadgeHero } from "@/components/ui/badge-hero";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { useAnalytics } from "@/hooks/useAnalytics";
import { MessageSquare, Shield, Users } from "lucide-react";

const LeaveReview = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent("review_form_view_global_nrro", {});
  }, [trackEvent]);

  const benefits = [
    {
      icon: Users,
      title: "Help Others Decide",
      description:
        "Your experience guides other business leaders making important decisions about their international operations.",
    },
    {
      icon: MessageSquare,
      title: "Honest Feedback",
      description:
        "We value authentic reviews that reflect your genuine experience — positive or constructive.",
    },
    {
      icon: Shield,
      title: "Verified & Trusted",
      description:
        "All reviews are verified to ensure authenticity and build trust within our community.",
    },
  ];

  return (
    <>
      <Meta
        title="Leave a Review | Share Your Experience | NRRO International"
        description="Share your experience working with NRRO International. Your feedback helps other businesses find trusted legal, tax, and accounting advisory services."
        canonicalUrl="/leave-review"
      />

      {/* Hero Section */}
      <section
        className="bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40"
        data-dark="true"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <BadgeHero>Client Feedback</BadgeHero>
            <h1 className="hero-title mt-6 mb-6">Share Your Experience with Us</h1>
            <p className="text-lead text-white/70">
              Your feedback helps international businesses find trusted advisors. Every review makes a difference in helping others make informed decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Your Review Matters */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
              Why It Matters
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4 mb-6">
              Why Your Review Matters
            </h2>
            <p className="text-muted-foreground text-lg">
              Authentic client reviews build trust and transparency. By sharing your experience, you help fellow business leaders evaluate our services and make confident decisions about their international operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
                Submit Your Review
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mt-4">
                Tell Us About Your Experience
              </h2>
            </div>

            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaveReview;
