import { Check, Users, Clock, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Users,
    text: "One point of contact in English—across legal, tax, accounting and payroll.",
  },
  {
    icon: Shield,
    text: "Clear scope, clear fees. No surprises.",
  },
  {
    icon: Clock,
    text: "We coordinate filings and deadlines so your Spain operations don't stall.",
  },
  {
    icon: Zap,
    text: "Built for international decision-makers: fast response, practical guidance.",
  },
  {
    icon: Check,
    text: "Senior advice, boutique speed—without Big4 bureaucracy.",
  },
];

export function WhyNRROSection() {
  return (
    <section className="bg-white py-20 md:py-28 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Title */}
          <div>
            <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-6">
              Why NRRO for International Clients
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight text-foreground">
              Barcelona-based execution.<br />
              International standards.
            </h3>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              NRRO Global is the international advisory practice of NRRO (Spain), 
              serving foreign companies and cross-border matters since 2017. 
              Backed by 25+ years of domestic expertise.
            </p>
          </div>

          {/* Right column - Bullets */}
          <div className="space-y-5">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <p className="text-foreground pt-2 leading-relaxed">
                    {reason.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
