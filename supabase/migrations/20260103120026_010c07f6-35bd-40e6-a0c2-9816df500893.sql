-- Update existing English featured services content with international-focused services
UPDATE public.page_content 
SET 
  source_site = 'int',
  content = '{
    "overline": "Our Core Services",
    "services": [
      {
        "title": "Company Setup in Spain",
        "slug": "company-setup-spain",
        "category": "Corporate Services",
        "description": "End-to-end company incorporation for foreign investors. From entity selection to full regulatory compliance.",
        "features": [
          "SL, SA, and Branch establishment",
          "NIE/NIF procurement for directors",
          "Bank account opening assistance"
        ]
      },
      {
        "title": "International Tax Planning",
        "slug": "tax-advice",
        "category": "Tax Services",
        "description": "Strategic tax planning for multinational operations, including double taxation treaties and transfer pricing.",
        "features": [
          "Cross-border tax optimization",
          "Beckham Law advisory",
          "Non-resident tax compliance"
        ]
      },
      {
        "title": "Commercial & Corporate Law",
        "slug": "commercial-and-corporate-law",
        "category": "Legal Services",
        "description": "Comprehensive legal support for corporate governance, contracts, and cross-border transactions.",
        "features": [
          "Shareholder agreements",
          "M&A advisory",
          "Corporate restructuring"
        ]
      },
      {
        "title": "Global Payroll & Compliance",
        "slug": "family-business",
        "category": "HR Services",
        "description": "International workforce compliance, payroll management, and labor law advisory for multinational teams.",
        "features": [
          "Multi-jurisdiction payroll",
          "Work permit processing",
          "Employment contracts"
        ]
      }
    ]
  }'::jsonb
WHERE id = '48ab21de-4680-4060-bce1-2fa16f4fd547';