import { Card } from "@/components/ui/card";
import { Meta } from "@/components/seo/Meta";
import { Target, Users, Zap, TrendingUp } from "lucide-react";

const Methodology = () => {
  const steps = [
    {
      icon: Target,
      title: "Initial Analysis",
      description:
        "We study your current situation to understand your specific needs and business objectives.",
    },
    {
      icon: Users,
      title: "Tailored Proposal",
      description:
        "We design a strategy tailored to your business with clear services, timelines, and fees.",
    },
    {
      icon: Zap,
      title: "Implementation",
      description:
        "We execute the plan efficiently, keeping you informed at every step of the process.",
    },
    {
      icon: TrendingUp,
      title: "Ongoing Support",
      description:
        "Continuous guidance and periodic reviews to ensure your objectives are met.",
    },
  ];

  return (
    <>
      <Meta
        title="Our Methodology"
        description="Discover how we work at NRRO: analysis, tailored proposals, implementation, and ongoing support for your business"
        canonicalUrl={`${window.location.origin}/methodology`}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="bg-black py-32 md:py-48 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="service-hero-overline mb-6">Our Approach</div>
              <h1 className="service-hero-title mb-8">
                Working Methodology
              </h1>
              <p className="service-hero-subtitle max-w-3xl mx-auto">
                We work with a proven method that combines professional experience, 
                personalized attention, and technology to deliver the best service to our clients.
              </p>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="section-overline mb-4">Our Philosophy</div>
              <h2 className="text-3xl md:text-4xl font-normal mb-8">
                Tailored Solutions for Every Client
              </h2>
              <div className="space-y-4 service-body">
                <p>
                  At NRRO, we believe every business is unique and requires tailored solutions.
                  We don't apply standard formulas; instead, we adapt our services to the
                  real needs of each client.
                </p>
                <p>
                  We combine over 25 years of advisory experience with the latest
                  technological tools to deliver an efficient, transparent,
                  and high-quality service.
                </p>
                <p>
                  Our commitment is to be your strategic partner, not just your advisor. We want
                  your business to grow, and we want to grow with you, maintaining a long-term
                  relationship of trust based on tangible results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Process */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="section-overline mb-4">Process</div>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                How We Work With You
              </h2>
              <p className="service-body max-w-2xl mx-auto">
                A clear and structured process in 4 phases
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Card key={step.title} className="border-border bg-white">
                    <div className="p-8 relative">
                      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black flex items-center justify-center">
                        <span className="text-white font-medium text-lg">{idx + 1}</span>
                      </div>
                      <Icon className="h-10 w-10 text-foreground/40 mb-6" strokeWidth={1.5} />
                      <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                      <p className="service-body">{step.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Differentiating Values */}
        <section className="py-16 md:py-24 bg-white border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="section-overline mb-4">Values</div>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                What Sets Us Apart
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="border-border bg-white">
                <div className="p-8 text-center">
                  <h3 className="text-xl font-medium mb-3">Proximity</h3>
                  <p className="service-body">
                    Personalized and approachable service. Your advisor knows you and your business.
                  </p>
                </div>
              </Card>
              <Card className="border-border bg-white">
                <div className="p-8 text-center">
                  <h3 className="text-xl font-medium mb-3">Multidisciplinary</h3>
                  <p className="service-body">
                    Expert team across all areas: tax, accounting, legal, and labor.
                  </p>
                </div>
              </Card>
              <Card className="border-border bg-white">
                <div className="p-8 text-center">
                  <h3 className="text-xl font-medium mb-3">Technology</h3>
                  <p className="service-body">
                    Digital platforms for efficient management and 24/7 access to your information.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Methodology;
