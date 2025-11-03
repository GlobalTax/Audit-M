import { Meta } from "@/components/seo/Meta";
import { HeroSection } from "@/components/orquest/HeroSection";
import { ComparisonSection } from "@/components/orquest/ComparisonSection";
import { SynergyTable } from "@/components/orquest/SynergyTable";
import { BenefitsGrid } from "@/components/orquest/BenefitsGrid";
import { DemoSection } from "@/components/orquest/DemoSection";
import { DemoFormModal } from "@/components/orquest/DemoFormModal";
import { OrquestFooter } from "@/components/orquest/OrquestFooter";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useState } from "react";

const OrquestKairosHR = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleViewDemo = () => {
    trackEvent("view_demo_combined", { source: "hero_cta" });
    const demoElement = document.getElementById("demo-iframe");
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleRequestDemo = () => {
    trackEvent("demo_modal_opened", { source: "demo_section" });
    setIsModalOpen(true);
  };

  return (
    <>
      <Meta
        title="Orquest + KairosHR - Solución Integral de Gestión Laboral"
        description="La combinación perfecta de Orquest para optimización de turnos y KairosHR para gestión de recursos humanos"
        keywords="orquest, kairoshr, gestión laboral, optimización turnos, recursos humanos, software restaurantes"
      />
      
      <div className="min-h-screen flex flex-col">
        <HeroSection onViewDemo={handleViewDemo} />
        <ComparisonSection />
        <SynergyTable />
        <BenefitsGrid />
        <DemoSection onRequestDemo={handleRequestDemo} />
        <OrquestFooter />
        
        <DemoFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </>
  );
};

export default OrquestKairosHR;