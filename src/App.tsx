import { lazy, Suspense } from "react";
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

// Public pages - static imports (critical path)
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuditHub from "./pages/AuditHub";
import SubsidyAuditHub from "./pages/SubsidyAuditHub";
import ServiceDetail from "./pages/ServiceDetail";
import Methodology from "./pages/Methodology";
import Team from "./pages/Team";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Legal from "./pages/Legal";
import Cookies from "./pages/Cookies";
import Terms from "./pages/Terms";
import Strategy from "./pages/Strategy";
import Sectors from "./pages/Sectors";
import Resources from "./pages/Resources";
import { DynamicLandingPage } from "./pages/DynamicLandingPage";
import SitemapXML from "./pages/SitemapXML";
import CookiePolicyEN from "./pages/CookiePolicyEN";
import LeaveReview from "./pages/LeaveReview";
import Testimonials from "./pages/Testimonials";
import ThankYou from "./pages/ThankYou";

// Admin pages - lazy loaded (only downloaded when admin navigates)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const AdminCaseStudies = lazy(() => import("./pages/admin/AdminCaseStudies").then(m => ({ default: m.AdminCaseStudies })));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog").then(m => ({ default: m.AdminBlog })));
const AdminTeam = lazy(() => import("./pages/admin/AdminTeam").then(m => ({ default: m.AdminTeam })));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers").then(m => ({ default: m.AdminUsers })));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings").then(m => ({ default: m.AdminSettings })));
const AdminCandidatos = lazy(() => import("./pages/admin/AdminCandidatos"));
const AdminJobPositions = lazy(() => import("./pages/admin/AdminJobPositions"));
const AdminContactLeads = lazy(() => import("./pages/admin/AdminContactLeads"));
const AdminLandings = lazy(() => import("./pages/admin/AdminLandings"));
const LandingDetailPage = lazy(() => import("./pages/admin/LandingDetailPage"));
const LandingDashboard = lazy(() => import("./pages/admin/LandingDashboard"));
const AdminAnalyticsDashboard = lazy(() => import("./pages/admin/AdminAnalyticsDashboard").then(m => ({ default: m.AdminAnalyticsDashboard })));
const DeckStudioList = lazy(() => import("./pages/admin/deck-studio/DeckStudioList"));
const DeckStudioContent = lazy(() => import("./pages/admin/deck-studio/DeckStudioContent"));
const DeckStudioBrand = lazy(() => import("./pages/admin/deck-studio/DeckStudioBrand"));
const AdminTechnology = lazy(() => import("./pages/admin/AdminTechnology"));
const AdminSitemap = lazy(() => import("./pages/admin/AdminSitemap"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminAwards = lazy(() => import("./pages/admin/AdminAwards"));
const AdminProposalGenerator = lazy(() => import("./pages/admin/AdminProposalGenerator"));
const AdminCorporatePresentation = lazy(() => import("./pages/admin/AdminCorporatePresentation"));
const AdminABTests = lazy(() => import("./pages/admin/AdminABTests"));
const AdminTopBar = lazy(() => import("./pages/admin/AdminTopBar"));
const AdminCRM = lazy(() => import("./pages/admin/AdminCRM"));
const AdminCRMClientDetail = lazy(() => import("./pages/admin/AdminCRMClientDetail"));

const AdminSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

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

                {/* Admin routes - lazy loaded with Suspense */}
                <Route path="/admin/login" element={<Suspense fallback={<AdminSpinner />}><AdminLogin /></Suspense>} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<AdminSpinner />}>
                        <AdminLayout />
                      </Suspense>
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Suspense fallback={<AdminSpinner />}><AdminDashboard /></Suspense>} />
                  <Route path="crm" element={<Suspense fallback={<AdminSpinner />}><AdminCRM /></Suspense>} />
                  <Route path="crm/clients/:clientId" element={<Suspense fallback={<AdminSpinner />}><AdminCRMClientDetail /></Suspense>} />
                  <Route path="settings" element={<Suspense fallback={<AdminSpinner />}><AdminSettings /></Suspense>} />
                  <Route path="topbar" element={<Suspense fallback={<AdminSpinner />}><AdminTopBar /></Suspense>} />
                  <Route path="content" element={<Suspense fallback={<AdminSpinner />}><AdminContent /></Suspense>} />
                  <Route path="landing-dashboard" element={<Suspense fallback={<AdminSpinner />}><LandingDashboard /></Suspense>} />
                  <Route path="landings" element={<Suspense fallback={<AdminSpinner />}><AdminLandings /></Suspense>} />
                  <Route path="landings/:id" element={<Suspense fallback={<AdminSpinner />}><LandingDetailPage /></Suspense>} />
                  <Route path="case-studies" element={<Suspense fallback={<AdminSpinner />}><AdminCaseStudies /></Suspense>} />
                  <Route path="services" element={<Suspense fallback={<AdminSpinner />}><AdminServices /></Suspense>} />
                  <Route path="blog" element={<Suspense fallback={<AdminSpinner />}><AdminBlog /></Suspense>} />
                  <Route path="testimonials" element={<Suspense fallback={<AdminSpinner />}><AdminTestimonials /></Suspense>} />
                  <Route path="awards" element={<Suspense fallback={<AdminSpinner />}><AdminAwards /></Suspense>} />
                  <Route path="team" element={<Suspense fallback={<AdminSpinner />}><AdminTeam /></Suspense>} />
                  <Route path="job-positions" element={<Suspense fallback={<AdminSpinner />}><AdminJobPositions /></Suspense>} />
                  <Route path="candidatos" element={<Suspense fallback={<AdminSpinner />}><AdminCandidatos /></Suspense>} />
                  <Route path="contact-leads" element={<Suspense fallback={<AdminSpinner />}><AdminContactLeads /></Suspense>} />
                  <Route path="proposal-generator" element={<Suspense fallback={<AdminSpinner />}><AdminProposalGenerator /></Suspense>} />
                  <Route path="corporate-presentation" element={<Suspense fallback={<AdminSpinner />}><AdminCorporatePresentation /></Suspense>} />
                  <Route path="deck-studio" element={<Suspense fallback={<AdminSpinner />}><DeckStudioList /></Suspense>} />
                  <Route path="deck-studio/content" element={<Suspense fallback={<AdminSpinner />}><DeckStudioContent /></Suspense>} />
                  <Route path="deck-studio/brand" element={<Suspense fallback={<AdminSpinner />}><DeckStudioBrand /></Suspense>} />
                  <Route path="technology" element={<Suspense fallback={<AdminSpinner />}><AdminTechnology /></Suspense>} />
                  <Route path="sitemap" element={<Suspense fallback={<AdminSpinner />}><AdminSitemap /></Suspense>} />
                  <Route path="ab-tests" element={<Suspense fallback={<AdminSpinner />}><AdminABTests /></Suspense>} />
                  <Route path="analytics" element={<Suspense fallback={<AdminSpinner />}><AdminAnalyticsDashboard /></Suspense>} />
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute requiredRole="admin">
                        <Suspense fallback={<AdminSpinner />}><AdminUsers /></Suspense>
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