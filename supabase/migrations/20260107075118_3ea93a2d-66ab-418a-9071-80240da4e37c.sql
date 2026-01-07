UPDATE services 
SET 
  name_en = 'Private Equity & Venture Capital',
  slug_en = 'private-equity-venture-capital',
  description_en = 'Strategic legal, tax, and corporate advisory for international investors deploying capital into Spanish startups and growth-stage companies. From seed rounds to Series C and beyond, we structure deals that protect investor interests while enabling portfolio company success.',
  features = ARRAY[
    'Investment round structuring (Seed, Series A/B/C, growth equity)',
    'Term sheet negotiation and shareholders'' agreement drafting',
    'Legal, tax, and labour due diligence for target companies',
    'Corporate governance design and equity vesting structures',
    'Exit strategy advisory (M&A, IPO, secondary sales)',
    'Minority investor protections and anti-dilution mechanisms',
    'Cross-border fund structuring for Spain market entry'
  ],
  benefits = 'Private equity and venture capital transactions require sophisticated legal structures that balance founder and investor interests across jurisdictions. Our specialized team ensures documentation protects your rights under Spanish law while facilitating future growth rounds or exit events. We work with leading international funds to navigate Spain''s regulatory landscape efficiently.',
  typical_clients = ARRAY[
    'International VC funds investing in Spanish startups',
    'Private equity firms acquiring or growing Spanish companies',
    'Family offices deploying capital into Iberian markets',
    'Corporate venture capital arms expanding into Spain',
    'Fund-of-funds with Spanish portfolio exposure'
  ],
  meta_title = 'Private Equity & Venture Capital Advisory in Spain | NRRO',
  meta_description = 'Expert legal, tax, and corporate advisory for international investors in Spanish startups and companies. Due diligence, deal structuring, and exit strategies.',
  updated_at = now()
WHERE slug_en = 'venture-capital';