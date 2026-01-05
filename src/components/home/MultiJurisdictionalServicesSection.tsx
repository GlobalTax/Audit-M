import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Plane, Shield, User, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tabs = [
  { id: "in-spain", label: "In Spain", icon: MapPin },
  { id: "from-spain", label: "From Spain", icon: Plane },
  { id: "global", label: "Global via Networks", icon: Globe },
];

const servicesData = {
  "in-spain": [
    {
      title: "Company Setup",
      services: ["SL Formation", "SA Formation", "Branch Registration", "Subsidiary Setup"],
      link: "/set-up-company-spain",
    },
    {
      title: "Tax & Accounting",
      services: ["Corporate Tax", "VAT Compliance", "Payroll Management", "Annual Accounts"],
      link: "/services/international-accounting-management",
    },
    {
      title: "Investor Services",
      services: ["Golden Visa", "NIE & Work Permits", "Property Acquisition", "Tax Residency"],
      link: "/ley-beckham",
    },
  ],
  "from-spain": [
    {
      title: "International Expansion",
      services: ["Subsidiary Setup Abroad", "Holding Structures", "Transfer Pricing", "Corporate Restructuring"],
      link: "/international-services",
    },
    {
      title: "Cross-Border Tax",
      services: ["Double Tax Treaties", "International Tax Planning", "Repatriation Strategies", "PE Analysis"],
      link: "/international-services",
    },
    {
      title: "Global Workforce",
      services: ["Expatriate Tax", "Social Security Coordination", "International Payroll", "Assignment Planning"],
      link: "/international-services",
    },
  ],
  "global": [
    {
      title: "Multi-Jurisdictional Support",
      services: ["Coordinated Services in 50+ Countries", "Single Point of Contact", "Unified Reporting", "Cross-Border Compliance"],
      link: "/international-services",
    },
    {
      title: "Network Partners",
      services: ["Integra International", "XLNC", "SBC Global Alliance", "Vetted Local Experts"],
      link: "/international-services",
    },
    {
      title: "Seamless Coordination",
      services: ["Project Management", "Multi-Country Rollouts", "Consolidated Advisory", "Quality Assurance"],
      link: "/international-services",
    },
  ],
};

const trustItems = [
  {
    icon: Shield,
    title: "Fixed-Fee Transparency",
    description: "Clear pricing with no hidden costs. Know your investment upfront.",
  },
  {
    icon: User,
    title: "Dedicated Advisor",
    description: "One point of contact who knows your business. Responses within 24 hours.",
  },
  {
    icon: Globe,
    title: "50+ Jurisdictions",
    description: "Local expertise in Spain. Global reach through trusted network partners.",
  },
];

export function MultiJurisdictionalServicesSection() {
  const [activeTab, setActiveTab] = useState("in-spain");

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 block">
            Multi-Jurisdictional Advisory
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-4">
            Choose Your Path
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Whether you're entering Spain, expanding from Spain, or need global coordination, 
            we provide seamless advisory services tailored to your situation.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-muted rounded-full p-1 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                    ${activeTab === tab.id 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-foreground/60 hover:text-foreground hover:bg-muted-foreground/10"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {servicesData[activeTab as keyof typeof servicesData].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-primary text-primary-foreground rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  
                  <h3 className="text-xl font-medium mb-4">{category.title}</h3>
                  
                  <ul className="space-y-2 mb-6">
                    {category.services.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={category.link}>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="group/btn bg-white/10 hover:bg-white/20 text-primary-foreground border-0"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Trust Bar */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-foreground/60">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
