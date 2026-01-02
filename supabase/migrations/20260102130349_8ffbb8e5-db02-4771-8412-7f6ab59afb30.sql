-- Insert international hero content for English
INSERT INTO page_content (page_key, section_key, language, content, is_active)
VALUES (
  'home',
  'hero',
  'en',
  '{
    "title": "Your Strategic Partner for<br/>International Business in Spain",
    "subtitle": "Comprehensive legal, tax, accounting and labour advisory for multinational companies, foreign investors, and businesses expanding across borders.",
    "cta_primary": {
      "text": "Request International Consultation",
      "link": "/contact"
    },
    "cta_secondary": {
      "text": "Explore Global Services",
      "link": "/services"
    }
  }'::jsonb,
  true
)
ON CONFLICT (page_key, section_key, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  updated_at = now();

-- Insert international about content for English
INSERT INTO page_content (page_key, section_key, language, content, is_active)
VALUES (
  'home',
  'about',
  'en',
  '{
    "overline": "About Navarro International",
    "title": "Strategic advisory for global business operations.",
    "paragraphs": [
      "At Navarro, we provide integrated legal, tax, accounting and labour advisory services for international companies operating in Spain and Spanish businesses expanding globally.",
      "With over 25 years of cross-border experience, we understand the complexities of multi-jurisdictional compliance, international tax planning, and global workforce management.",
      "Our team delivers strategic solutions that minimize risk and maximize business outcomes for clients across every continent.",
      "Whether entering Spain, restructuring international operations, or navigating cross-border compliance, we accompany our clients with total confidentiality and a long-term approach."
    ],
    "cta": {
      "text": "Meet our team",
      "link": "/team"
    }
  }'::jsonb,
  true
)
ON CONFLICT (page_key, section_key, language) 
DO UPDATE SET 
  content = EXCLUDED.content,
  updated_at = now();