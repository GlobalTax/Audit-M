import { Phone, FileText, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Discovery Call",
    description: "Tell us about your business goals and timeline. We'll identify the right structure and next steps.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Clear Proposal",
    description: "Receive a fixed-fee proposal with scope, timeline, and deliverables. No surprises.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Seamless Execution",
    description: "We handle the paperwork, filings, and coordination. You focus on your business.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-neutral-50 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-12 text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Step number */}
                  <span className="font-mono text-xs text-foreground/40 mb-4">
                    {step.number}
                  </span>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-white border border-border flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-medium text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[72px] left-[calc(50%+48px)] right-[-48px] h-[1px] bg-border" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
