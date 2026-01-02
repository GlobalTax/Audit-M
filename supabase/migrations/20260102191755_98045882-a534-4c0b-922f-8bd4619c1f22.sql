-- Update International Accounting Management service with comprehensive English content
UPDATE services SET
  -- SEO Metadata
  meta_title_en = 'International Accounting Management | Global Advisory | NRRO',
  meta_description_en = 'Streamline multinational accounting with IFRS-compliant consolidation, real-time reporting, and end-to-end audit support across jurisdictions.',
  
  -- Hero description
  description_en = 'International Accounting Management delivers seamless financial consolidation, compliance with global accounting standards, and real-time reporting for multinational operations. From IFRS alignment to local GAAP requirements, we ensure your global financial data is accurate, timely, and audit-ready across all jurisdictions.',
  
  -- Features list
  features_en = ARRAY[
    'Multi-entity financial consolidation under IFRS and local GAAP',
    'Real-time management reporting and performance dashboards',
    'Currency translation and intercompany elimination management',
    'Technical accounting advisory for complex transactions',
    'Statutory audit preparation and year-end support',
    'Regulatory filing coordination across jurisdictions'
  ],
  
  -- Benefits (Markdown)
  benefits_en = '## Business Outcomes You Can Expect

### Reduced Complexity
Eliminate manual consolidation processes and spreadsheet-based reporting. Our integrated approach gives you a single source of truth for your global financial data.

### Improved Decision-Making
Access real-time financial insights across all your entities. Make strategic decisions based on accurate, timely data rather than month-old reports.

### Audit Confidence
Walk into every audit fully prepared. Our documentation standards and proactive approach reduce audit fees and eliminate last-minute surprises.

### Regulatory Peace of Mind
Meet filing deadlines in every jurisdiction without stress. Our compliance calendars and local expertise ensure nothing falls through the cracks.

### Scalable Infrastructure
Expand into new markets without rebuilding your accounting processes. Our methodology scales with your business growth.',
  
  -- Typical clients
  typical_clients_en = ARRAY[
    'Multinational corporations with subsidiaries in multiple jurisdictions',
    'Private equity portfolio companies requiring consolidated reporting',
    'Foreign investors establishing presence in Spain and Europe',
    'Technology companies scaling internationally',
    'Family businesses with cross-border operations'
  ],
  
  -- Methodology section (JSONB)
  metodologia_en = '{
    "overline": "Our Approach",
    "titulos": ["How We Deliver", "International Accounting Excellence"],
    "introduccion": "We combine deep technical expertise with advanced technology to provide **end-to-end accounting management** for multinational operations. Our structured methodology ensures consistency, compliance, and visibility across all your entities.",
    "pilares": [
      {
        "numero": 1,
        "titulo": "Assessment & Alignment",
        "puntos": [
          "Comprehensive review of your current accounting processes and reporting structures",
          "Gap analysis between local GAAP requirements and group IFRS policies",
          "Definition of consolidation scope, intercompany eliminations, and reporting timelines"
        ]
      },
      {
        "numero": 2,
        "titulo": "Implementation & Integration",
        "puntos": [
          "Configuration of multi-entity chart of accounts aligned with group standards",
          "Implementation of consolidation workflows and currency translation protocols",
          "Integration with your ERP and reporting systems for real-time data flows"
        ]
      },
      {
        "numero": 3,
        "titulo": "Ongoing Management & Reporting",
        "puntos": [
          "Monthly close support and consolidated financial statement preparation",
          "Management dashboards with KPIs and variance analysis",
          "Full audit trail maintenance and regulatory filing support"
        ]
      }
    ],
    "contacto": {
      "telefono": "+34 93 487 50 50",
      "email": "international@nrro.es"
    }
  }'::jsonb,
  
  -- Cross-cutting services (JSONB array)
  servicios_transversales_en = '[
    {
      "titulo": "Financial Consolidation",
      "contenido": "Multi-entity consolidation under **IFRS, US GAAP, and local standards**. We manage intercompany eliminations, currency translation, and minority interest calculations to produce group-level financial statements that meet both internal reporting and external audit requirements."
    },
    {
      "titulo": "Global Reporting & Dashboards",
      "contenido": "Real-time visibility into your international financial performance through **custom management dashboards**. Track revenue by entity, monitor cost allocations, and analyze profitability across regions with drill-down capabilities and automated variance reporting."
    },
    {
      "titulo": "IFRS Compliance & Technical Accounting",
      "contenido": "Navigate complex accounting standards with confidence. Our team provides guidance on **revenue recognition (IFRS 15)**, lease accounting (IFRS 16), financial instruments (IFRS 9), and other technical accounting matters that impact multinational groups."
    },
    {
      "titulo": "Audit Preparation & Support",
      "contenido": "Streamline your audit process with **comprehensive documentation**, organized working papers, and proactive coordination with external auditors. We prepare schedules, respond to audit queries, and ensure a smooth year-end close across all jurisdictions."
    },
    {
      "titulo": "Regulatory Filing & Compliance",
      "contenido": "Ensure timely submission of statutory accounts, tax filings, and regulatory reports in each jurisdiction. We manage **local compliance calendars** and coordinate with tax and legal teams to meet all deadlines without disruption to your operations."
    }
  ]'::jsonb,
  
  -- Stats section (JSONB array)
  stats_en = '[
    {
      "label": "Jurisdictions Covered",
      "value": "50+",
      "description": "Countries where we provide accounting consolidation and reporting services"
    },
    {
      "label": "Client Retention",
      "value": "98%",
      "description": "Long-term partnerships built on reliability and quality"
    },
    {
      "label": "Monthly Closes",
      "value": "500+",
      "description": "Entity-level closes managed annually across our client portfolio"
    },
    {
      "label": "Average Response Time",
      "value": "24h",
      "description": "Turnaround for management reporting queries and ad-hoc requests"
    }
  ]'::jsonb,
  
  updated_at = now()
WHERE id = '0fb7ea1a-c844-42ca-a6f2-81ec64e41588';