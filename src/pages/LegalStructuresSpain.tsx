import { useState, useEffect } from 'react';
import { Meta } from '@/components/seo/Meta';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Scale, 
  Globe, 
  FileText, 
  Users, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Download,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  Building,
  Briefcase,
  TrendingUp,
  Home,
  Search
} from 'lucide-react';
import { SpainSetupSidebar } from '@/components/spain-setup/SpainSetupSidebar';

const tableOfContents = [
  { id: "introduction", label: "Why Structure Matters" },
  { id: "sl-details", label: "Sociedad Limitada (SL)" },
  { id: "sa-details", label: "Sociedad Anónima (SA)" },
  { id: "branch-details", label: "Branch Office" },
  { id: "subsidiary-details", label: "Subsidiary" },
  { id: "representative-details", label: "Representative Office" },
  { id: "comparison", label: "Comparison Table" },
  { id: "use-cases", label: "Use Cases" },
  { id: "requirements", label: "Legal Requirements" },
  { id: "pitfalls", label: "Pitfalls & Best Practices" },
  { id: "faq", label: "FAQ" },
];

const LegalStructuresSpain = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'International Services', url: '/international-services' },
    { name: 'Legal Structures in Spain', url: '/legal-structures-spain' },
  ];

  const faqItems = [
    {
      question: 'What is the most common legal structure for foreign investors in Spain?',
      answer: 'The Sociedad Limitada (SL) accounts for approximately 90% of company formations due to its low capital requirement, limited liability, and governance flexibility.',
    },
    {
      question: 'Can a single shareholder form a company in Spain?',
      answer: 'Yes, both SL and SA can be formed with a single shareholder (unipersonal). The sole shareholder assumes no additional liability beyond their capital contribution.',
    },
    {
      question: 'What is the difference between a branch and a subsidiary?',
      answer: 'A branch is an extension of the parent company with no separate legal personality; the parent is fully liable. A subsidiary is an independent Spanish entity with limited liability separated from the parent.',
    },
    {
      question: 'Are there residency requirements for directors?',
      answer: 'No. Directors and shareholders can be non-residents of Spain. However, they must obtain a NIE (tax identification number) and may act through powers of attorney.',
    },
    {
      question: 'What tax incentives are available for Spanish subsidiaries?',
      answer: 'Subsidiaries can access the ETVE holding regime, R&D tax credits, patent box deductions, and reinvestment exemptions. Double taxation treaties may reduce withholding on dividends.',
    },
    {
      question: 'How long does it take to register a company in Spain?',
      answer: 'The complete process takes 6-10 weeks on average, including NIE acquisition, notarial deed, and Commercial Registry registration. Express procedures can reduce this to 4-6 weeks.',
    },
  ];

  const structures = [
    {
      name: 'Sociedad Limitada (SL)',
      icon: Building2,
      description: 'Limited Liability Company',
      minCapital: '€3,000',
      liability: 'Limited',
      complexity: 'Low',
      taxEfficiency: 'Good',
      flexibility: 'High',
      bestFor: 'SMEs, startups, JVs',
    },
    {
      name: 'Sociedad Anónima (SA)',
      icon: Building,
      description: 'Public Limited Company',
      minCapital: '€60,000',
      liability: 'Limited',
      complexity: 'High',
      taxEfficiency: 'Good',
      flexibility: 'Medium',
      bestFor: 'Large corps, IPO candidates',
    },
    {
      name: 'Branch Office',
      icon: Globe,
      description: 'Sucursal',
      minCapital: 'None',
      liability: 'Unlimited (parent)',
      complexity: 'Medium',
      taxEfficiency: 'Moderate',
      flexibility: 'Medium',
      bestFor: 'Market testing, projects',
    },
    {
      name: 'Subsidiary',
      icon: Users,
      description: 'Filial',
      minCapital: 'Per entity type',
      liability: 'Limited',
      complexity: 'Medium-High',
      taxEfficiency: 'Excellent',
      flexibility: 'High',
      bestFor: 'Long-term investment',
    },
    {
      name: 'Representative Office',
      icon: Search,
      description: 'Oficina de Representación',
      minCapital: 'None',
      liability: 'Unlimited (parent)',
      complexity: 'Low',
      taxEfficiency: 'N/A',
      flexibility: 'Very Low',
      bestFor: 'Research, liaison only',
    },
  ];

  const useCases = [
    {
      title: 'Startups & Entrepreneurs',
      icon: Lightbulb,
      recommended: 'SL',
      description: 'The SL offers the lowest capital requirement, maximum flexibility, and simplified governance. Perfect for founders launching tech ventures, consulting practices, or e-commerce businesses.',
    },
    {
      title: 'SMEs Expanding into Spain',
      icon: TrendingUp,
      recommended: 'SL or Subsidiary (SL form)',
      description: 'Established SMEs benefit from limited liability and full operational control. An SL subsidiary creates clean liability separation from the parent while maintaining simple governance.',
    },
    {
      title: 'Large Multinationals',
      icon: Building,
      recommended: 'Subsidiary (SA form) or Branch',
      description: 'Large groups typically prefer the credibility and structure of an SA subsidiary. Branches work well for initial market testing before committing to a full subsidiary.',
    },
    {
      title: 'Private Equity & Holding Structures',
      icon: Briefcase,
      recommended: 'SA Subsidiary with ETVE status',
      description: 'The Spanish ETVE regime provides participation exemption on dividends and capital gains from qualifying foreign subsidiaries, making Spain attractive for European and Latin American holding structures.',
    },
    {
      title: 'Family Offices',
      icon: Home,
      recommended: 'SL or SA depending on scale',
      description: 'Family offices investing in Spanish real estate or operating businesses typically choose SL for simplicity. SA may be preferred for larger portfolios requiring institutional governance.',
    },
    {
      title: 'Companies Testing the Market',
      icon: Search,
      recommended: 'Branch or Representative Office',
      description: 'For short-term projects or market research, a branch or representative office minimizes commitment while establishing local presence. Convert to subsidiary once market viability is confirmed.',
    },
  ];

  const pitfalls = [
    'Choosing SA when SL suffices — Unnecessary capital lockup and governance complexity',
    'Ignoring transfer pricing — Intercompany transactions with parent require arm\'s-length pricing',
    'Underestimating registration timelines — Commercial Registry processing takes 2-4 weeks',
    'Forgetting labour law compliance — Employment contracts must comply with Spanish labour code',
    'Using branch for long-term operations — Unlimited parent liability becomes a risk as operations grow',
    'Representative office engaging in sales — Risk of reclassification and back taxes',
  ];

  const bestPractices = [
    'Align structure with strategic objectives — Short-term vs. long-term presence',
    'Engage local legal counsel early — Avoid costly restructuring later',
    'Plan for growth — Choose a structure that scales without major changes',
    'Optimize tax position from day one — Structure intercompany financing appropriately',
    'Build compliance infrastructure — Accounting, payroll, and governance from incorporation',
    'Document everything — Board minutes, contracts, and transfer pricing policies',
  ];

  return (
    <>
      <Meta
        title="Legal Structures in Spain: SL, SA, Branch & Subsidiary Guide"
        description="Compare Spanish legal structures for foreign investors. Learn pros, cons, capital requirements, and governance for SL, SA, branch, and subsidiary options."
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted/30 py-20 lg:py-28">
        <div className="container">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-6 text-primary border-primary/30">
              Corporate Structuring
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Choosing the Right Legal Structure in Spain
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl">
              A strategic guide for international investors, multinational groups, and global entrepreneurs navigating Spain's corporate framework. Select the structure that aligns with your liability protection, tax objectives, and growth plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Download Comparison PDF
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link to="/contact">
                  <MessageSquare className="h-5 w-5" />
                  Request Legal Advisory
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sidebar for Desktop */}
      <div className="hidden lg:block fixed right-8 top-24 w-72 z-40">
        <SpainSetupSidebar 
          tableOfContents={tableOfContents}
          activeSection={activeSection}
          showTableOfContents={true}
        />
      </div>

      {/* Introduction Section */}
      <section id="introduction" className="py-16 lg:py-20 bg-background scroll-mt-24">
        <div className="container">
          <div className="max-w-4xl">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
              Why Structure Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-6">
              The Foundation of Your Spanish Operations
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p>
                Selecting the right legal structure is one of the most consequential decisions when entering the Spanish market. Your choice impacts liability exposure, tax treatment, governance flexibility, capital requirements, and the perception of your business among Spanish partners, banks, and regulators.
              </p>
              <p>
                Spain offers several corporate vehicles, each designed for different business contexts. Whether you are a startup founder, a multinational expanding European operations, or a family office making a strategic investment, understanding these options is essential to building a compliant, tax-efficient, and operationally sound presence.
              </p>
              <p>
                This guide provides an in-depth comparison of the five primary legal structures available to foreign investors in Spain:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Sociedad Limitada (SL)</strong> — Limited Liability Company</li>
                <li><strong>Sociedad Anónima (SA)</strong> — Public Limited Company</li>
                <li><strong>Branch Office (Sucursal)</strong> — Extension of a foreign entity</li>
                <li><strong>Subsidiary (Filial)</strong> — Independent legal entity under parent control</li>
                <li><strong>Representative Office</strong> — Non-trading presence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Details - SL */}
      <section id="sl-details" className="py-16 lg:py-20 bg-muted/30 scroll-mt-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Sociedad Limitada (SL)
                </h2>
                <p className="text-muted-foreground">Limited Liability Company</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg">
              The Sociedad Limitada is Spain's most popular legal structure for small and medium enterprises, startups, and foreign investors seeking flexibility and limited liability. Approximately 90% of newly registered companies in Spain choose the SL format.
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Minimum Capital</TableCell>
                      <TableCell>€3,000 (must be fully paid at incorporation)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shareholders</TableCell>
                      <TableCell>Minimum 1 (can be individual or corporate)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liability</TableCell>
                      <TableCell>Limited to capital contribution</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Governance</TableCell>
                      <TableCell>Sole administrator or board of directors</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Share Transferability</TableCell>
                      <TableCell>Restricted (consent of other partners required)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Audit Requirement</TableCell>
                      <TableCell>Only if thresholds exceeded (assets &gt;€2.85M, revenue &gt;€5.7M, or &gt;50 employees)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Best For</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {['SMEs and startups', 'Single-member companies', 'Foreign investors seeking simplicity', 'Joint ventures with defined partner groups', 'Businesses prioritizing operational flexibility'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Governance Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Partners can manage directly or appoint an administrator</li>
                    <li>• Board meetings not mandatory for small SLs</li>
                    <li>• Annual general meetings can be held by written resolution</li>
                    <li>• Bylaws can restrict transfer of participation units</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Details - SA */}
      <section id="sa-details" className="py-16 lg:py-20 bg-background scroll-mt-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Sociedad Anónima (SA)
                </h2>
                <p className="text-muted-foreground">Public Limited Company</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg">
              The Sociedad Anónima is Spain's equivalent of a public limited company and is required for businesses seeking stock market listings, large capital raises, or higher institutional credibility. It offers transferable shares and more formal governance.
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Minimum Capital</TableCell>
                      <TableCell>€60,000 (25% at incorporation, balance within defined period)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shareholders</TableCell>
                      <TableCell>Minimum 1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liability</TableCell>
                      <TableCell>Limited to capital contribution</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Governance</TableCell>
                      <TableCell>Board of directors mandatory above certain thresholds</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Share Transferability</TableCell>
                      <TableCell>Freely transferable unless restricted by bylaws</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Audit Requirement</TableCell>
                      <TableCell>Mandatory if thresholds exceeded or always for listed companies</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Best For</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {['Large corporations and holding structures', 'Companies planning IPOs or significant capital raises', 'Businesses requiring freely transferable shares', 'Operations needing high institutional credibility', 'Joint ventures with external investors'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Governance Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Board required when capital exceeds €3M or more than 3 shareholders</li>
                    <li>• Formal annual general meetings with notarial documentation</li>
                    <li>• Share register maintained by the company</li>
                    <li>• Complex governance suitable for institutional investors</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Details - Branch */}
      <section id="branch-details" className="py-16 lg:py-20 bg-muted/30 scroll-mt-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Branch Office (Sucursal)
                </h2>
                <p className="text-muted-foreground">Extension of a foreign entity</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg">
              A branch office is an extension of a foreign company operating in Spain. It is not a separate legal entity but operates under the parent company's legal personality. Branches are common for multinational corporations testing the Spanish market before committing to a full subsidiary.
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Minimum Capital</TableCell>
                      <TableCell>None (operates under parent company's capital)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Legal Personality</TableCell>
                      <TableCell>None (parent company is the legal entity)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liability</TableCell>
                      <TableCell>Unlimited (parent company fully liable)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Governance</TableCell>
                      <TableCell>Local representative appointed by parent</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tax Treatment</TableCell>
                      <TableCell>Permanent establishment; taxed on Spanish-source income</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Accounting</TableCell>
                      <TableCell>Separate accounts required for Spanish operations</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Best For</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {['Foreign companies testing Spanish market', 'Short-to-medium term projects', 'Operations with limited local liability exposure', 'Companies wanting simpler administrative setup'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Legal Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Public deed of establishment executed before Spanish notary</li>
                    <li>• Certified copy of parent company's incorporation documents</li>
                    <li>• Board resolution authorizing Spanish branch</li>
                    <li>• Apostille or legalization of foreign documents</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Details - Subsidiary */}
      <section id="subsidiary-details" className="py-16 lg:py-20 bg-background scroll-mt-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Subsidiary (Filial)
                </h2>
                <p className="text-muted-foreground">Independent legal entity under parent control</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg">
              A subsidiary is a fully independent Spanish legal entity owned by a foreign parent company. Unlike a branch, a subsidiary provides complete liability separation between parent and Spanish operations. Subsidiaries are ideal for long-term strategic investments.
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Minimum Capital</TableCell>
                      <TableCell>Depends on chosen form (€3,000 for SL, €60,000 for SA)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Legal Personality</TableCell>
                      <TableCell>Separate legal entity</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liability</TableCell>
                      <TableCell>Limited (parent not liable for subsidiary's debts)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Governance</TableCell>
                      <TableCell>Full Spanish corporate governance</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tax Treatment</TableCell>
                      <TableCell>Separate Spanish tax resident; may benefit from holding regimes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Autonomy</TableCell>
                      <TableCell>Full operational independence</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Best For</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {['Long-term strategic investments', 'International holding structures', 'Operations requiring liability firewall', 'Businesses seeking local financing or incentives', 'Groups needing separate audited financials'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tax Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Access to ETVE (Spanish holding company) regime</li>
                    <li>• Ability to apply double taxation treaties</li>
                    <li>• Local tax incentives for R&D, patent box, reinvestment</li>
                    <li>• Group consolidation possible with other Spanish entities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Details - Representative Office */}
      <section id="representative-details" className="py-16 lg:py-20 bg-muted/30 scroll-mt-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Representative Office
                </h2>
                <p className="text-muted-foreground">Oficina de Representación</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 text-lg">
              A representative office is the lightest form of presence in Spain. It is strictly prohibited from conducting commercial activities, making sales, or entering into contracts. It serves exclusively for market research, liaison, and promotional purposes.
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Key Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Commercial Activity</TableCell>
                      <TableCell>Not permitted</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Legal Personality</TableCell>
                      <TableCell>None</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liability</TableCell>
                      <TableCell>Parent company fully liable</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tax Treatment</TableCell>
                      <TableCell>Generally not a permanent establishment</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Typical Use</TableCell>
                      <TableCell>Market research, client liaison, promotion</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Governance</TableCell>
                      <TableCell>Minimal; local contact appointed</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Best For</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {['Pre-investment market analysis', 'Liaison with Spanish clients or partners', 'Brand promotion without sales activity', 'Companies evaluating Spanish market entry'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Limitations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Cannot invoice, sell, or sign commercial contracts</li>
                    <li>• If commercial activity occurs, authorities may reclassify as branch/PE</li>
                    <li>• Limited to preparatory and auxiliary activities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-16 lg:py-20 bg-background scroll-mt-24">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center">
              Pros & Cons Comparison
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Compare all five Spanish legal structures at a glance to identify the best fit for your business objectives.
            </p>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[140px]">Structure</TableHead>
                    <TableHead>Liability</TableHead>
                    <TableHead>Setup Complexity</TableHead>
                    <TableHead>Capital Required</TableHead>
                    <TableHead>Tax Efficiency</TableHead>
                    <TableHead>Flexibility</TableHead>
                    <TableHead>Best Use Case</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {structures.map((structure) => (
                    <TableRow key={structure.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <structure.icon className="h-4 w-4 text-primary" />
                          {structure.name.split(' ')[0]}
                        </div>
                      </TableCell>
                      <TableCell>{structure.liability}</TableCell>
                      <TableCell>{structure.complexity}</TableCell>
                      <TableCell>{structure.minCapital}</TableCell>
                      <TableCell>{structure.taxEfficiency}</TableCell>
                      <TableCell>{structure.flexibility}</TableCell>
                      <TableCell className="text-muted-foreground">{structure.bestFor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-16 lg:py-20 bg-muted/30 scroll-mt-24">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center">
              Typical Use Cases by Company Type
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Find the recommended legal structure based on your company profile and strategic objectives.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <useCase.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      Recommended: {useCase.recommended}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {useCase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Requirements Section */}
      <section id="requirements" className="py-16 lg:py-20 bg-background scroll-mt-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center">
              Legal & Compliance Requirements
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Essential documentation, registration steps, and ongoing compliance obligations for Spanish entities.
            </p>

            <div className="grid lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Documentation Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Valid passport or national ID for all shareholders/directors</li>
                    <li>• Proof of registered address (for individuals)</li>
                    <li>• Certificate of incorporation and good standing (for corporate shareholders)</li>
                    <li>• Board resolution authorizing Spanish entity</li>
                    <li>• Power of attorney (if representatives act on behalf)</li>
                    <li>• Apostille or legalization for all foreign documents</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Registration Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-muted-foreground text-sm list-decimal pl-4">
                    <li>Obtain NIE/NIF — Tax identification for all parties</li>
                    <li>Deposit Capital — Bank certificate for SL/SA</li>
                    <li>Execute Public Deed — Before Spanish notary</li>
                    <li>Commercial Registry Filing — Legal personality obtained</li>
                    <li>Tax Authority Registration — VAT, corporate tax, payroll</li>
                    <li>Social Security Registration — If hiring employees</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Ongoing Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Annual accounts filing with Commercial Registry</li>
                    <li>• Corporate tax return (Modelo 200)</li>
                    <li>• Quarterly VAT returns (Modelo 303)</li>
                    <li>• Payroll withholding and Social Security contributions</li>
                    <li>• Beneficial ownership declarations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pitfalls & Best Practices */}
      <section id="pitfalls" className="py-16 lg:py-20 bg-muted/30 scroll-mt-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
              Common Pitfalls & Best Practices
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-5 w-5" />
                    Common Pitfalls to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pitfalls.map((pitfall, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{pitfall}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Lightbulb className="h-5 w-5" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {bestPractices.map((practice, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                        <span className="text-muted-foreground text-sm">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Download Our Legal Structure Comparison Guide
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Get our comprehensive PDF comparing all five Spanish legal structures. Includes decision flowchart, capital requirements, governance checklists, and tax optimization tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2">
                <Download className="h-5 w-5" />
                Download Comparison PDF
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">
                  <MessageSquare className="h-5 w-5" />
                  Request Legal Advisory
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-20 bg-background scroll-mt-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Common questions about Spanish legal structures for foreign investors.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
              Related Resources
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Set Up in Spain Guide', url: '/set-up-in-spain', description: '10-step roadmap from strategy to operations' },
                { title: 'Company Setup in Spain', url: '/setup-company-spain', description: 'Quick incorporation with legal and tax support' },
                { title: 'NIE & Tax Registration', url: '/nie-service-spain', description: 'Obtain your tax identification number' },
                { title: 'Beckham Law Advisory', url: '/ley-beckham', description: 'Tax optimization for expatriate executives' },
                { title: 'International Services', url: '/international-services', description: 'Full global advisory capabilities' },
                { title: 'Contact Us', url: '/contact', description: 'Speak with our corporate advisory team' },
              ].map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="group p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalStructuresSpain;