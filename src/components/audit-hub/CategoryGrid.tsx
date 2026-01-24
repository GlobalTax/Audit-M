import { useLanguage } from "@/contexts/LanguageContext";
import { CategoryCard } from "./CategoryCard";
import { FileCheck, CheckCircle, Leaf, Search, Shield, FileText } from "lucide-react";
import { Overline } from "@/components/ui/typography";

interface CategoryGridProps {
  servicesByCategory: Record<string, any[]>;
  activeCategory: string | null;
  onCategoryClick: (categoryKey: string) => void;
}

export const CategoryGrid = ({ 
  servicesByCategory, 
  activeCategory, 
  onCategoryClick 
}: CategoryGridProps) => {
  const { t, language } = useLanguage();

  const categories = [
    { 
      key: { es: "Auditoría Financiera", en: "Financial Audit", ca: "Auditoria Financera" },
      label: { es: "Auditoría Financiera", en: "Financial Audit", ca: "Auditoria Financera" },
      description: { 
        es: "Auditoría de cuentas anuales e informes financieros según normativa ICAC",
        en: "Annual accounts audit and financial reports per ICAC standards",
        ca: "Auditoria de comptes anuals i informes financers segons normativa ICAC"
      },
      icon: FileCheck, 
      color: "blue" 
    },
    { 
      key: { es: "Auditoría de Cumplimiento", en: "Compliance Audit", ca: "Auditoria de Compliment" },
      label: { es: "Cumplimiento Normativo", en: "Regulatory Compliance", ca: "Compliment Normatiu" },
      description: { 
        es: "Verificación de cumplimiento legal, fiscal y regulatorio",
        en: "Legal, tax and regulatory compliance verification",
        ca: "Verificació de compliment legal, fiscal i regulatori"
      },
      icon: CheckCircle, 
      color: "green" 
    },
    { 
      key: { es: "Auditoría ESG", en: "ESG Audit", ca: "Auditoria ESG" },
      label: { es: "ESG y Sostenibilidad", en: "ESG & Sustainability", ca: "ESG i Sostenibilitat" },
      description: { 
        es: "Verificación de informes de sostenibilidad, EINF y huella de carbono",
        en: "Sustainability reports, NFIS and carbon footprint verification",
        ca: "Verificació d'informes de sostenibilitat, EINF i petjada de carboni"
      },
      icon: Leaf, 
      color: "emerald" 
    },
    { 
      key: { es: "Auditoría Transaccional", en: "Transaction Audit", ca: "Auditoria Transaccional" },
      label: { es: "Due Diligence", en: "Due Diligence", ca: "Due Diligence" },
      description: { 
        es: "Revisiones para operaciones de M&A, inversión y reestructuración",
        en: "Reviews for M&A, investment and restructuring operations",
        ca: "Revisions per a operacions de M&A, inversió i reestructuració"
      },
      icon: Search, 
      color: "purple" 
    },
    { 
      key: { es: "Auditoría Interna", en: "Internal Audit", ca: "Auditoria Interna" },
      label: { es: "Auditoría Interna", en: "Internal Audit", ca: "Auditoria Interna" },
      description: { 
        es: "Control interno, gestión de riesgos y mejora de procesos",
        en: "Internal control, risk management and process improvement",
        ca: "Control intern, gestió de riscos i millora de processos"
      },
      icon: Shield, 
      color: "orange" 
    },
    { 
      key: { es: "Informes Especiales", en: "Special Reports", ca: "Informes Especials" },
      label: { es: "Informes Especiales", en: "Special Reports", ca: "Informes Especials" },
      description: { 
        es: "Procedimientos acordados, certificaciones y opiniones especiales",
        en: "Agreed-upon procedures, certifications and special opinions",
        ca: "Procediments acordats, certificacions i opinions especials"
      },
      icon: FileText, 
      color: "slate" 
    },
  ];

  const getCategoryKey = (cat: typeof categories[0]) => {
    return cat.key[language as keyof typeof cat.key] || cat.key.es;
  };

  const getCategoryLabel = (cat: typeof categories[0]) => {
    return cat.label[language as keyof typeof cat.label] || cat.label.es;
  };

  const getCategoryDescription = (cat: typeof categories[0]) => {
    return cat.description[language as keyof typeof cat.description] || cat.description.es;
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Overline className="mb-3">{t('auditHub.categories.overline')}</Overline>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            {t('auditHub.categories.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('auditHub.categories.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => {
            const categoryKey = getCategoryKey(cat);
            const services = servicesByCategory[categoryKey] || [];
            
            return (
              <CategoryCard
                key={categoryKey}
                icon={cat.icon}
                label={getCategoryLabel(cat)}
                description={getCategoryDescription(cat)}
                serviceCount={services.length}
                color={cat.color}
                onClick={() => onCategoryClick(categoryKey)}
                isActive={activeCategory === categoryKey}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
