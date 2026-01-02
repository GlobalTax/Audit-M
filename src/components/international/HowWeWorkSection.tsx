const steps = [
  {
    number: 1,
    title: "Initial Consultation & Assessment",
    description: "We begin by understanding your business objectives, current structure, and cross-border challenges. Our team conducts a comprehensive analysis of your operational, legal, tax, and compliance landscape to identify risks and opportunities."
  },
  {
    number: 2,
    title: "Strategy Development",
    description: "Based on our findings, we design a tailored advisory strategy aligned with your goals. This includes defining optimal corporate structures, tax positions, payroll frameworks, and governance models to support your international expansion."
  },
  {
    number: 3,
    title: "Implementation & Compliance Setup",
    description: "We execute the agreed strategy with precision — from entity formation and contract drafting to payroll systems and regulatory filings. Every step is managed to ensure seamless integration with your existing operations."
  },
  {
    number: 4,
    title: "Ongoing Monitoring & Reporting",
    description: "With your infrastructure in place, we provide continuous oversight of compliance obligations, reporting deadlines, and regulatory changes. You receive real-time dashboards and periodic reviews to maintain visibility across jurisdictions."
  },
  {
    number: 5,
    title: "Continuous Support & Optimization",
    description: "As your business evolves, so do our recommendations. We proactively identify opportunities to optimize costs, streamline processes, and adapt to new regulatory requirements — ensuring long-term success in every market you operate."
  }
];

export const HowWeWorkSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="font-mono text-xs md:text-sm tracking-wide uppercase text-muted-foreground mb-3 block">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
              Our Proven Approach to International Advisory
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured, five-step methodology that delivers clarity, compliance, and confidence at every stage of your international operations.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="flex gap-6 group"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-medium">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-px h-full bg-border/70 my-2" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 ${index < steps.length - 1 ? 'pb-10' : 'pb-0'}`}>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
