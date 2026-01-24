import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCheck, 
  Shield, 
  Leaf, 
  Search, 
  Building2, 
  FileText,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const auditCategories = [
  {
    id: "financial",
    icon: FileCheck,
    labelKey: "serviceAreas.financialAudit",
    descriptionKey: "home.auditServices.financial.description",
    services: ["auditServices.annualAccounts.title", "home.auditServices.financial.consolidation", "home.auditServices.financial.statutory"]
  },
  {
    id: "compliance",
    icon: Shield,
    labelKey: "serviceAreas.complianceAudit",
    descriptionKey: "home.auditServices.compliance.description",
    services: ["home.auditServices.compliance.regulatory", "home.auditServices.compliance.internal", "home.auditServices.compliance.aml"]
  },
  {
    id: "esg",
    icon: Leaf,
    labelKey: "serviceAreas.esgAudit",
    descriptionKey: "home.auditServices.esg.description",
    services: ["home.auditServices.esg.einf", "home.auditServices.esg.carbon", "home.auditServices.esg.csrd"]
  },
  {
    id: "transactional",
    icon: Search,
    labelKey: "serviceAreas.transactionalAudit",
    descriptionKey: "home.auditServices.transactional.description",
    services: ["auditServices.dueDiligence.title", "home.auditServices.transactional.qoe", "home.auditServices.transactional.spaReview"]
  },
  {
    id: "internal",
    icon: Building2,
    labelKey: "serviceAreas.internalAudit",
    descriptionKey: "home.auditServices.internal.description",
    services: ["home.auditServices.internal.controls", "home.auditServices.internal.risk", "home.auditServices.internal.outsourcing"]
  },
  {
    id: "special",
    icon: FileText,
    labelKey: "serviceAreas.specialReports",
    descriptionKey: "home.auditServices.special.description",
    services: ["home.auditServices.special.capitalIncrease", "home.auditServices.special.expertReports", "home.auditServices.special.agreedProcedures"]
  },
];

export function AuditServicesHighlightSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("financial");

  const selectedCategory = auditCategories.find(c => c.id === activeCategory) || auditCategories[0];
  const Icon = selectedCategory.icon;

  return (
    <section className="bg-neutral-900 text-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-white/60 mb-4">
            {t("home.auditServicesSection.overline")}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-4">
            {t("home.auditServicesSection.title")}
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t("home.auditServicesSection.subtitle")}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {auditCategories.map((category) => {
            const TabIcon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-neutral-900"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(category.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left: Category Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-medium">
                    {t(selectedCategory.labelKey)}
                  </h4>
                </div>
                <p className="text-white/70 leading-relaxed mb-6">
                  {t(selectedCategory.descriptionKey)}
                </p>
                <Link to="/servicios">
                  <Button variant="secondary" size="sm" className="group">
                    {t("home.auditServicesSection.cta")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Right: Services List */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wider text-white/50 mb-4">
                  {t("home.auditServicesSection.servicesIncluded")}
                </p>
                {selectedCategory.services.map((serviceKey, index) => (
                  <motion.div
                    key={serviceKey}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <span>{t(serviceKey)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/servicios">
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-neutral-900">
              {t("home.auditServicesSection.viewAll")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
