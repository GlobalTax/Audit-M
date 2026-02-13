import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import AuditHub from "./pages/AuditHub";
import SubsidyAuditHub from "./pages/SubsidyAuditHub";
import ServiceDetail from "./pages/ServiceDetail";
import Methodology from "./pages/Methodology";
import Team from "./pages/Team";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Legal from "./pages/Legal";
import Cookies from "./pages/Cookies";
import Terms from "./pages/Terms";
import Strategy from "./pages/Strategy";
import Sectors from "./pages/Sectors";
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
import { AdminAnalyticsDashboard } from "./pages/admin/AdminAnalyticsDashboard";
import DeckStudioList from "./pages/admin/deck-studio/DeckStudioList";
import DeckStudioContent from "./pages/admin/deck-studio/DeckStudioContent";
import DeckStudioBrand from "./pages/admin/deck-studio/DeckStudioBrand";
import AdminTechnology from "./pages/admin/AdminTechnology";
import AdminSitemap from "./pages/admin/AdminSitemap";
import { DynamicLandingPage } from "./pages/DynamicLandingPage";
import SitemapXML from "./pages/SitemapXML";
import CookiePolicyEN from "./pages/CookiePolicyEN";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminAwards from "./pages/admin/AdminAwards";
import AdminProposalGenerator from "./pages/admin/AdminProposalGenerator";
import AdminCorporatePresentation from "./pages/admin/AdminCorporatePresentation";
import LeaveReview from "./pages/LeaveReview";
import Testimonials from "./pages/Testimonials";
import ThankYou from "./pages/ThankYou";
import AdminABTests from "./pages/admin/AdminABTests";
import AdminTopBar from "./pages/admin/AdminTopBar";
import AdminCRM from "./pages/admin/AdminCRM";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <Routes>
                {/* Main routes */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/servicios" element={<Layout><AuditHub /></Layout>} />
                <Route path="/services" element={<Layout><AuditHub /></Layout>} />
                <Route path="/serveis" element={<Layout><AuditHub /></Layout>} />
                <Route path="/servicios/subvenciones" element={<Layout><SubsidyAuditHub /></Layout>} />
                <Route path="/services/subsidies" element={<Layout><SubsidyAuditHub /></Layout>} />
                <Route path="/serveis/subvencions" element={<Layout><SubsidyAuditHub /></Layout>} />
                <Route path="/services/:slug" element={<Layout><ServiceDetail /></Layout>} />
                <Route path="/servicios/:slug" element={<Layout><ServiceDetail /></Layout>} />
                <Route path="/serveis/:slug" element={<Layout><ServiceDetail /></Layout>} />
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
                <Route path="/resources" element={<Layout><Resources /></Layout>} />
                <Route path="/leave-review" element={<Layout><LeaveReview /></Layout>} />
                <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
                <Route path="/thank-you/:variant" element={<Layout><ThankYou /></Layout>} />

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
                  <Route path="crm" element={<AdminCRM />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="topbar" element={<AdminTopBar />} />
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
                  <Route path="proposal-generator" element={<AdminProposalGenerator />} />
                  <Route path="corporate-presentation" element={<AdminCorporatePresentation />} />
                  <Route path="deck-studio" element={<DeckStudioList />} />
                  <Route path="deck-studio/content" element={<DeckStudioContent />} />
                  <Route path="deck-studio/brand" element={<DeckStudioBrand />} />
                  <Route path="technology" element={<AdminTechnology />} />
                  <Route path="sitemap" element={<AdminSitemap />} />
                  <Route path="ab-tests" element={<AdminABTests />} />
                  <Route path="analytics" element={<AdminAnalyticsDashboard />} />
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