import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Methodology from "./pages/Methodology";
import Team from "./pages/Team";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import LeyBeckham from "./pages/LeyBeckham";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Legal from "./pages/Legal";
import Cookies from "./pages/Cookies";
import Terms from "./pages/Terms";
import Strategy from "./pages/Strategy";
import Sectors from "./pages/Sectors";
import InternationalServices from "./pages/InternationalServices";
import Resources from "./pages/Resources";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminCaseStudies } from "./pages/admin/AdminCaseStudies";
import AdminServices from "./pages/admin/AdminServices";
import { AdminBlog } from "./pages/admin/AdminBlog";
import BlogDetail from "./pages/BlogDetail";
import { AdminTeam } from "./pages/admin/AdminTeam";
import { AdminUsers } from "./pages/admin/AdminUsers";
import AdminContent from "./pages/admin/AdminContent";
import { AdminSettings } from "./pages/admin/AdminSettings";
import AdminCandidatos from "./pages/admin/AdminCandidatos";
import AdminJobPositions from "./pages/admin/AdminJobPositions";
import AdminContactLeads from "./pages/admin/AdminContactLeads";
import AdminLandings from "./pages/admin/AdminLandings";
import LandingDetailPage from "./pages/admin/LandingDetailPage";
import LandingDashboard from "./pages/admin/LandingDashboard";
import AdminLeyBeckhamLeads from "./pages/admin/AdminLeyBeckhamLeads";
import AdminDemoRequests from "./pages/admin/AdminDemoRequests";
import { AdminCompanySetupLeads } from "./pages/admin/AdminCompanySetupLeads";
import AdminTechnology from "./pages/admin/AdminTechnology";
import AdminSitemap from "./pages/admin/AdminSitemap";
import AdminCalculatorSettings from "./pages/admin/AdminCalculatorSettings";
import { CompanySetupCalculator } from "./pages/CompanySetupCalculator";
import { NIEServiceSpain } from "./pages/NIEServiceSpain";
import { TechStartupSetup } from "./pages/TechStartupSetup";
import { ExpressCompanySetup } from "./pages/ExpressCompanySetup";
import { SetupCompanySpain } from "./pages/SetupCompanySpain";
import SetUpInSpain from "./pages/SetUpInSpain";
import LegalStructuresSpain from "./pages/LegalStructuresSpain";
import SpainCompanySetupPlaybook from "./pages/SpainCompanySetupPlaybook";
import SpainDocumentChecklist from "./pages/SpainDocumentChecklist";
import SpainReadinessQuiz from "./pages/SpainReadinessQuiz";
import SpainSetupCalculator from "./pages/SpainSetupCalculator";
import SpainLaborCostCalculator from "./pages/SpainLaborCostCalculator";
import BeckhamLawCalculator from "./pages/BeckhamLawCalculator";
import SpainTaxResidencyRisk from "./pages/SpainTaxResidencyRisk";
import SpainSetupUSA from "./pages/SpainSetupUSA";
import SpainSetupUK from "./pages/SpainSetupUK";
import SpainSetupUAE from "./pages/SpainSetupUAE";
import SpainBusinessBankAccount from "./pages/SpainBusinessBankAccount";
import { DynamicLandingPage } from "./pages/DynamicLandingPage";
import SitemapXML from "./pages/SitemapXML";
import CookiePolicyEN from "./pages/CookiePolicyEN";
import AdminPlaybookLeads from "./pages/admin/AdminPlaybookLeads";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminAwards from "./pages/admin/AdminAwards";
import LeaveReview from "./pages/LeaveReview";
import Testimonials from "./pages/Testimonials";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Main routes - English (no prefix) */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
                <Route path="/case-studies" element={<Layout><CaseStudies /></Layout>} />
                <Route path="/case-studies/:slug" element={<Layout><CaseStudyDetail /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/blog/:slug" element={<Layout><BlogDetail /></Layout>} />
                <Route path="/team" element={<Layout><Team /></Layout>} />
                <Route path="/methodology" element={<Layout><Methodology /></Layout>} />
                <Route path="/strategy" element={<Layout><Strategy /></Layout>} />
                <Route path="/sectors" element={<Layout><Sectors /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                <Route path="/legal-notice" element={<Layout><Legal /></Layout>} />
                <Route path="/cookies" element={<Layout><Cookies /></Layout>} />
                <Route path="/cookie-policy" element={<Layout><CookiePolicyEN /></Layout>} />
                <Route path="/terms" element={<Layout><Terms /></Layout>} />
                <Route path="/careers" element={<Layout><Careers /></Layout>} />
                <Route path="/international-services" element={<Layout><InternationalServices /></Layout>} />
                <Route path="/resources" element={<Layout><Resources /></Layout>} />
                <Route path="/leave-review" element={<Layout><LeaveReview /></Layout>} />
                <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />

                {/* Special landings for internationals */}
                <Route path="/beckham-law" element={<LandingLayout><LeyBeckham /></LandingLayout>} />
                
                {/* Company Setup Landings */}
                <Route path="/company-setup-calculator" element={<CompanySetupCalculator />} />
                <Route path="/nie-spain-foreigners" element={<NIEServiceSpain />} />
                <Route path="/startup-company-setup-spain" element={<TechStartupSetup />} />
                <Route path="/fast-company-registration-spain" element={<ExpressCompanySetup />} />
                <Route path="/set-up-company-spain" element={<SetupCompanySpain />} />
                <Route path="/set-up-in-spain" element={<SetUpInSpain />} />
                <Route path="/legal-structures-spain" element={<Layout><LegalStructuresSpain /></Layout>} />
                <Route path="/spain-company-setup-playbook" element={<Layout><SpainCompanySetupPlaybook /></Layout>} />
                <Route path="/spain-document-checklist" element={<Layout><SpainDocumentChecklist /></Layout>} />
                <Route path="/spain-readiness-quiz" element={<Layout><SpainReadinessQuiz /></Layout>} />
                <Route path="/spain-setup-calculator" element={<Layout><SpainSetupCalculator /></Layout>} />
                <Route path="/spain-company-setup-usa" element={<Layout><SpainSetupUSA /></Layout>} />
                <Route path="/spain-company-setup-uk" element={<Layout><SpainSetupUK /></Layout>} />
                <Route path="/spain-company-setup-uae" element={<Layout><SpainSetupUAE /></Layout>} />
                <Route path="/spain-business-bank-account" element={<Layout><SpainBusinessBankAccount /></Layout>} />
                <Route path="/spain-labor-cost-calculator" element={<Layout><SpainLaborCostCalculator /></Layout>} />
                <Route path="/beckham-law-calculator" element={<Layout><BeckhamLawCalculator /></Layout>} />
                <Route path="/spain-tax-residency-risk" element={<Layout><SpainTaxResidencyRisk /></Layout>} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="landing-dashboard" element={<LandingDashboard />} />
                  <Route path="landings" element={<AdminLandings />} />
                  <Route path="landings/:id" element={<LandingDetailPage />} />
                  <Route path="case-studies" element={<AdminCaseStudies />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="awards" element={<AdminAwards />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="job-positions" element={<AdminJobPositions />} />
                  <Route path="candidatos" element={<AdminCandidatos />} />
                  <Route path="contact-leads" element={<AdminContactLeads />} />
                  <Route path="ley-beckham-leads" element={<AdminLeyBeckhamLeads />} />
                  <Route path="demo-requests" element={<AdminDemoRequests />} />
                  <Route path="company-setup-leads" element={<AdminCompanySetupLeads />} />
                  <Route path="playbook-leads" element={<AdminPlaybookLeads />} />
                  <Route path="calculator-settings" element={<AdminCalculatorSettings />} />
                  <Route path="technology" element={<AdminTechnology />} />
                  <Route path="sitemap" element={<AdminSitemap />} />
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute requiredRole="super_admin">
                        <AdminUsers />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Sitemap XML */}
                <Route path="/sitemap.xml" element={<SitemapXML />} />

                {/* Dynamic Landing Pages - Must be before 404 */}
                <Route path="/:slug" element={<DynamicLandingPage />} />

                {/* 404 - Must be last */}
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
