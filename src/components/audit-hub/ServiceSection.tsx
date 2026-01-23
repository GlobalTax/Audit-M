import { useLanguage } from "@/contexts/LanguageContext";
import { ServiceCard } from "@/components/services/ServiceCard";
import { FileCheck, CheckCircle, Leaf, Search, Shield, FileText, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceSectionProps {
  servicesByCategory: Record<string, any[]>;
  highlightedCategory: string | null;
}

interface CategoryConfig {
  key: { es: string; en: string; ca: string };
  label: { es: string; en: string; ca: string };
  icon: LucideIcon;
  color: string;
}

const categories: CategoryConfig[] = [
  { 
    key: { es: "Auditoría Financiera", en: "Financial Audit", ca: "Auditoria Financera" },
    label: { es: "Auditoría Financiera", en: "Financial Audit", ca: "Auditoria Financera" },
    icon: FileCheck, 
    color: "blue" 
  },
  { 
    key: { es: "Auditoría de Cumplimiento", en: "Compliance Audit", ca: "Auditoria de Compliment" },
    label: { es: "Cumplimiento Normativo", en: "Regulatory Compliance", ca: "Compliment Normatiu" },
    icon: CheckCircle, 
    color: "green" 
  },
  { 
    key: { es: "Auditoría ESG", en: "ESG Audit", ca: "Auditoria ESG" },
    label: { es: "ESG y Sostenibilidad", en: "ESG & Sustainability", ca: "ESG i Sostenibilitat" },
    icon: Leaf, 
    color: "emerald" 
  },
  { 
    key: { es: "Auditoría Transaccional", en: "Transaction Audit", ca: "Auditoria Transaccional" },
    label: { es: "Due Diligence", en: "Due Diligence", ca: "Due Diligence" },
    icon: Search, 
    color: "purple" 
  },
  { 
    key: { es: "Auditoría Interna", en: "Internal Audit", ca: "Auditoria Interna" },
    label: { es: "Auditoría Interna", en: "Internal Audit", ca: "Auditoria Interna" },
    icon: Shield, 
    color: "orange" 
  },
  { 
    key: { es: "Informes Especiales", en: "Special Reports", ca: "Informes Especials" },
    label: { es: "Informes Especiales", en: "Special Reports", ca: "Informes Especials" },
    icon: FileText, 
    color: "slate" 
  },
];

const colorBorders: Record<string, string> = {
  blue: "border-l-blue-500",
  green: "border-l-green-500",
  emerald: "border-l-emerald-500",
  purple: "border-l-purple-500",
  orange: "border-l-orange-500",
  slate: "border-l-slate-500"
};

export const ServiceSection = ({ 
  servicesByCategory, 
  highlightedCategory 
}: ServiceSectionProps) => {
  const { language } = useLanguage();

  const getCategoryKey = (cat: CategoryConfig) => {
    return cat.key[language as keyof typeof cat.key] || cat.key.es;
  };

  const getCategoryLabel = (cat: CategoryConfig) => {
    return cat.label[language as keyof typeof cat.label] || cat.label.es;
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {categories.map((cat, index) => {
            const categoryKey = getCategoryKey(cat);
            const services = servicesByCategory[categoryKey] || [];
            const Icon = cat.icon;
            const isHighlighted = highlightedCategory === categoryKey;

            if (services.length === 0) return null;

            return (
              <motion.div
                key={categoryKey}
                id={`category-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "border-l-4 pl-6 md:pl-8",
                  colorBorders[cat.color] || "border-l-primary",
                  isHighlighted && "ring-2 ring-primary/20 rounded-r-lg bg-primary/5 p-6"
                )}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={cn(
                    "h-6 w-6",
                    cat.color === "blue" && "text-blue-600",
                    cat.color === "green" && "text-green-600",
                    cat.color === "emerald" && "text-emerald-600",
                    cat.color === "purple" && "text-purple-600",
                    cat.color === "orange" && "text-orange-600",
                    cat.color === "slate" && "text-slate-600"
                  )} />
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                    {getCategoryLabel(cat)}
                  </h2>
                  <span className="px-2.5 py-1 text-sm font-medium rounded-full bg-muted text-muted-foreground">
                    {services.length}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      variant="grid"
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
