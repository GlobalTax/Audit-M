-- Insert 8 Company Setup in Spain blog articles for the international site
-- Using existing author_id from users table, with author_name/specialization for display
INSERT INTO blog_posts (
  title_es, title_en, slug_es, slug_en, excerpt_es, excerpt_en, content_es, content_en,
  seo_title_es, seo_title_en, seo_description_es, seo_description_en,
  category, tags, source_site, status, author_id, author_name, author_specialization,
  read_time, published_at, created_at, updated_at
) VALUES
-- Article 1: Legal Structure (Clara Bellonch)
(
  'Qué forma jurídica elegir para tu empresa en España',
  'What Legal Form Should Your Spain Company Take?',
  'forma-juridica-empresa-espana',
  'legal-form-spain-company',
  'Descubre las diferencias entre SL, SA y sucursal para elegir la estructura legal óptima para tu empresa en España.',
  'Discover the key differences between SL, SA, and branch offices to choose the optimal legal structure for your Spain company.',
  '',
  '<p>Choosing the right legal structure is one of the most consequential decisions when establishing your business presence in Spain. The entity type you select will impact everything from your initial capital requirements to ongoing governance obligations, tax treatment, and liability exposure.</p>

<p>This comprehensive guide breaks down the three most common options for foreign investors: the Sociedad Limitada (SL), Sociedad Anónima (SA), and branch office (Sucursal). By the end, you will have a clear framework for determining which structure aligns best with your business objectives.</p>

<h2>Understanding the Sociedad Limitada (SL)</h2>

<p>The Sociedad Limitada, or SL, is Spain''s equivalent of a limited liability company and represents the most popular choice for foreign investors entering the Spanish market. Approximately 90% of newly incorporated companies in Spain adopt this structure.</p>

<p><strong>Key characteristics of the SL include:</strong></p>
<ul>
<li><strong>Minimum share capital:</strong> €3,000, which must be fully paid at incorporation</li>
<li><strong>Liability protection:</strong> Shareholders'' liability is limited to their capital contribution</li>
<li><strong>Governance flexibility:</strong> Can be managed by a sole administrator, joint administrators, or a board of directors</li>
<li><strong>Share transfer restrictions:</strong> Existing shareholders typically have preferential acquisition rights</li>
<li><strong>Accounting obligations:</strong> Must file annual accounts with the Commercial Registry</li>
</ul>

<p>The SL is particularly well-suited for small to medium-sized enterprises, subsidiaries of foreign parent companies, and businesses where ownership will remain relatively stable. The lower capital requirement and simplified governance make it an efficient vehicle for market entry.</p>

<h2>When to Consider a Sociedad Anónima (SA)</h2>

<p>The Sociedad Anónima is Spain''s public limited company equivalent. While less common for initial market entry, certain situations make the SA the preferred or mandatory choice.</p>

<p><strong>SA requirements and features:</strong></p>
<ul>
<li><strong>Minimum share capital:</strong> €60,000, with at least 25% paid at incorporation</li>
<li><strong>Share transferability:</strong> Shares can be freely transferred unless restricted by bylaws</li>
<li><strong>Governance structure:</strong> More formal requirements, including mandatory board of directors for larger companies</li>
<li><strong>Regulatory requirements:</strong> Certain regulated activities (banking, insurance) require SA status</li>
<li><strong>Audit obligations:</strong> Mandatory audit when exceeding size thresholds</li>
</ul>

<p>Consider the SA structure if you plan to raise external capital, seek stock exchange listing in the future, operate in regulated sectors, or prefer greater flexibility in share transfers.</p>

<h2>Branch Office (Sucursal): Extension Without Separate Entity</h2>

<p>A branch office represents an extension of the foreign parent company rather than a separate legal entity. This structure offers certain advantages but comes with significant considerations.</p>

<p><strong>Branch office characteristics:</strong></p>
<ul>
<li><strong>No separate legal personality:</strong> The parent company is directly liable for branch obligations</li>
<li><strong>No minimum capital requirement:</strong> Though adequate funding is expected</li>
<li><strong>Simplified formation:</strong> No share capital deposit or Spanish incorporation deed required</li>
<li><strong>Tax treatment:</strong> Taxed as a permanent establishment in Spain</li>
<li><strong>Parent company disclosure:</strong> Must file parent company accounts with Spanish registry</li>
</ul>

<p>Branches work well for companies testing the Spanish market, service-based businesses without significant asset exposure, or operations that will integrate closely with the parent company''s activities.</p>

<h2>Comparative Decision Framework</h2>

<p>When evaluating these options, consider these key factors:</p>

<table>
<thead>
<tr><th>Factor</th><th>SL</th><th>SA</th><th>Branch</th></tr>
</thead>
<tbody>
<tr><td>Initial Capital</td><td>€3,000</td><td>€60,000</td><td>None required</td></tr>
<tr><td>Liability Protection</td><td>Limited</td><td>Limited</td><td>Parent liable</td></tr>
<tr><td>Formation Time</td><td>2-4 weeks</td><td>3-5 weeks</td><td>2-3 weeks</td></tr>
<tr><td>Governance Complexity</td><td>Low</td><td>High</td><td>Low</td></tr>
<tr><td>Share Transferability</td><td>Restricted</td><td>Flexible</td><td>N/A</td></tr>
</tbody>
</table>

<h2>Making Your Decision</h2>

<p>For most foreign investors, the SL offers the optimal balance of liability protection, operational flexibility, and cost efficiency. The SA becomes relevant when capital raising, regulatory requirements, or exit strategies favour a more formal corporate structure. The branch suits businesses prioritising operational integration over legal separation.</p>

<p>Before finalizing your decision, consult with qualified advisors who can assess your specific circumstances, including tax implications, industry regulations, and long-term business strategy.</p>

<p><strong>Ready to determine the right structure for your Spain company?</strong> <a href="/spain-setup-calculator">Use our Setup Calculator</a> to estimate costs and timelines, or <a href="/contact">schedule a consultation</a> with our team.</p>',
  'Forma jurídica para empresas en España | NRRO',
  'Legal Form for Spain Company | NRRO',
  'Guía completa sobre SL, SA y sucursal para elegir la estructura legal óptima para tu empresa en España.',
  'Complete guide to SL, SA, and branch structures. Choose the right legal form for your Spain company with expert analysis.',
  'Company Setup',
  ARRAY['spain company formation', 'SL vs SA', 'spanish legal structure', 'branch office spain', 'foreign investment spain'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Clara Bellonch',
  'Mercantil',
  5,
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days',
  NOW()
),

-- Article 2: Bank Account Opening (Clara Bellonch)
(
  'Cómo abrir una cuenta bancaria en España como inversor extranjero',
  'How to Open a Bank Account in Spain as a Foreign Investor',
  'abrir-cuenta-bancaria-espana-inversor',
  'open-bank-account-spain-foreign-investor',
  'Guía paso a paso para abrir una cuenta bancaria corporativa en España: documentación, plazos y requisitos KYC.',
  'Step-by-step guide to opening a corporate bank account in Spain: documentation, timelines, and KYC requirements explained.',
  '',
  '<p>Opening a corporate bank account is a critical milestone in establishing your Spanish company. Without a functioning bank account, you cannot deposit share capital, pay suppliers, receive customer payments, or meet payroll obligations. Yet many foreign investors underestimate the complexity and documentation requirements involved.</p>

<p>This guide provides a comprehensive roadmap for navigating the Spanish banking system, from initial bank selection through successful account activation.</p>

<h2>Understanding the Two-Stage Process</h2>

<p>Corporate bank account opening in Spain typically involves two distinct stages:</p>

<p><strong>Stage 1: Capital Deposit Account</strong><br>
Before incorporation, you need a temporary account to deposit your minimum share capital (€3,000 for SL, €60,000 for SA). This account is opened in the company''s name "en constitución" (in formation). The bank issues a certificate confirming the deposit, which is required for the notarial incorporation deed.</p>

<p><strong>Stage 2: Operational Account</strong><br>
After the company is registered and you receive your permanent NIF (tax ID), the capital deposit account converts to a full operational account. This typically requires submitting additional documentation and completing enhanced due diligence.</p>

<h2>Required Documentation</h2>

<p>Spanish banks must comply with stringent anti-money laundering regulations. Expect to provide comprehensive documentation:</p>

<p><strong>For the company:</strong></p>
<ul>
<li>Registered incorporation deed (Escritura de Constitución)</li>
<li>Permanent NIF card</li>
<li>Commercial Registry certificate (Nota Simple)</li>
<li>Company bylaws</li>
<li>Ultimate Beneficial Owner (UBO) declaration</li>
<li>Description of business activities and expected transaction volumes</li>
</ul>

<p><strong>For all signatories and UBOs:</strong></p>
<ul>
<li>Valid passport (certified copy)</li>
<li>NIE (Foreigner Identification Number)</li>
<li>Proof of residential address (utility bill or bank statement, typically within 3 months)</li>
<li>Proof of source of funds</li>
<li>Professional or business background information</li>
</ul>

<h2>KYC and Due Diligence Considerations</h2>

<p>Know Your Customer (KYC) procedures are particularly thorough for foreign-owned companies. Banks will investigate:</p>

<ul>
<li><strong>Beneficial ownership:</strong> Identification of all individuals with 25%+ ownership or control</li>
<li><strong>Source of funds:</strong> Documentation proving the legitimate origin of capital</li>
<li><strong>Business purpose:</strong> Detailed explanation of planned activities in Spain</li>
<li><strong>Expected account activity:</strong> Projected transaction volumes and patterns</li>
<li><strong>Risk factors:</strong> Enhanced scrutiny for certain jurisdictions, industries, or PEP connections</li>
</ul>

<h2>Choosing the Right Bank</h2>

<p>Consider these factors when selecting your Spanish banking partner:</p>

<ul>
<li><strong>International experience:</strong> Banks with dedicated international desks understand foreign investor needs</li>
<li><strong>Language capabilities:</strong> English-speaking relationship managers simplify communication</li>
<li><strong>Online banking:</strong> Robust digital platforms for remote account management</li>
<li><strong>Multi-currency options:</strong> Useful for companies with international transactions</li>
<li><strong>Fee structure:</strong> Compare account maintenance, transaction, and foreign exchange fees</li>
</ul>

<h2>Timeline Expectations</h2>

<p>Realistic timelines for corporate account opening:</p>

<ul>
<li><strong>Capital deposit account:</strong> 1-2 weeks from document submission</li>
<li><strong>Full operational account:</strong> 2-4 weeks after company registration</li>
<li><strong>Total from initiation to activation:</strong> 4-8 weeks depending on documentation readiness</li>
</ul>

<h2>Common Challenges and Solutions</h2>

<p><strong>Challenge:</strong> Bank requests documents not readily available<br>
<strong>Solution:</strong> Work with your legal advisor to prepare equivalents or explanatory letters</p>

<p><strong>Challenge:</strong> Non-EU directors face additional scrutiny<br>
<strong>Solution:</strong> Provide comprehensive background information and consider appointing an EU-resident co-signatory</p>

<p><a href="/spain-document-checklist">Download our Document Checklist</a> to ensure you have all required documentation ready, or <a href="/contact">contact our team</a> for personalized guidance.</p>',
  'Abrir cuenta bancaria en España | NRRO',
  'Open Bank Account in Spain | NRRO',
  'Guía completa para abrir una cuenta bancaria corporativa en España como inversor extranjero.',
  'Complete guide to opening a corporate bank account in Spain. Documentation, KYC requirements, and timelines for foreign investors.',
  'Company Setup',
  ARRAY['spain bank account', 'corporate banking spain', 'KYC spain', 'foreign investor banking', 'capital deposit spain'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Clara Bellonch',
  'Mercantil',
  5,
  NOW() - INTERVAL '6 days',
  NOW() - INTERVAL '6 days',
  NOW()
),

-- Article 3: Registration Timeline (Júlia Estellè)
(
  'El cronograma paso a paso del registro de empresas en España',
  'The Step-by-Step Spanish Company Registration Timeline',
  'cronograma-registro-empresas-espana',
  'spain-company-registration-timeline',
  'Cronograma detallado de 6-10 semanas para constituir una empresa en España: cada fase, duración y dependencias.',
  'Detailed 6-10 week timeline for incorporating a company in Spain: every phase, duration, and dependencies explained.',
  '',
  '<p>Understanding the company registration timeline is essential for planning your Spain market entry. While the process can be completed in as little as 4-6 weeks under optimal conditions, realistic planning should account for 8-12 weeks from initiation to full operational status.</p>

<h2>Phase 1: Pre-Incorporation Preparation (Weeks 1-2)</h2>

<p>Before formal registration begins, several preparatory steps must be completed:</p>

<p><strong>NIE Application (if required)</strong><br>
Non-EU shareholders and directors need a Número de Identificación de Extranjero (NIE). This can be obtained:</p>
<ul>
<li>In Spain: 1-2 weeks at the National Police (Extranjería)</li>
<li>From abroad: 2-6 weeks via Spanish Consulate</li>
<li>Through a representative: 2-3 weeks with proper power of attorney</li>
</ul>

<p><strong>Negative Name Certificate</strong><br>
You must verify your proposed company name is available through the Central Commercial Registry. This process takes 1-3 business days.</p>

<h2>Phase 2: Capital Deposit (Week 2-3)</h2>

<p>Once you have your NIE and name certificate, you can open a capital deposit account. The bank will issue a certificate confirming the capital deposit, which is required for the incorporation deed.</p>

<h2>Phase 3: Notarization (Week 3-4)</h2>

<p>The incorporation deed (Escritura de Constitución) must be executed before a Spanish notary. All shareholders must attend or grant powers of attorney.</p>

<h2>Phase 4: Tax Registration (Week 4)</h2>

<p>Immediately after notarization, apply for tax registration using Form 036 to obtain your provisional NIF.</p>

<h2>Phase 5: Commercial Registry (Weeks 4-7)</h2>

<p>The incorporation deed must be registered with the Provincial Commercial Registry. Processing takes 10-20 business days.</p>

<h2>Phase 6: Post-Registration Setup (Weeks 7-10)</h2>

<p>After Commercial Registry inscription, complete remaining steps: permanent NIF, operational bank account, and Social Security registration if hiring employees.</p>

<h2>Complete Timeline Overview</h2>

<table>
<thead>
<tr><th>Phase</th><th>Duration</th><th>Cumulative</th></tr>
</thead>
<tbody>
<tr><td>Pre-Incorporation</td><td>1-3 weeks</td><td>Week 1-3</td></tr>
<tr><td>Capital Deposit</td><td>1-2 weeks</td><td>Week 2-4</td></tr>
<tr><td>Notarization</td><td>3-5 days</td><td>Week 3-5</td></tr>
<tr><td>Tax Registration</td><td>1-2 days</td><td>Week 4-5</td></tr>
<tr><td>Commercial Registry</td><td>2-4 weeks</td><td>Week 5-9</td></tr>
<tr><td>Post-Registration</td><td>2-3 weeks</td><td>Week 7-12</td></tr>
</tbody>
</table>

<p><a href="/spain-setup-calculator">Use our Setup Calculator</a> to get a personalized timeline estimate, or <a href="/contact">consult with our team</a> to optimize your registration process.</p>',
  'Cronograma registro empresa España | NRRO',
  'Spain Company Registration Timeline | NRRO',
  'Cronograma detallado paso a paso para constituir una empresa en España en 6-10 semanas.',
  'Detailed step-by-step timeline for Spain company registration. From NIE to full operations in 6-10 weeks.',
  'Company Setup',
  ARRAY['spain incorporation timeline', 'company registration spain', 'how long to register company spain', 'spanish business setup', 'commercial registry spain'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Júlia Estellè',
  'Mercantil',
  5,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '5 days',
  NOW()
),

-- Article 4: NIE & Tax ID Requirements (Jordi Mayoral)
(
  'NIE y requisitos de identificación fiscal para administradores extranjeros',
  'NIE & Tax ID Requirements for Foreign Directors',
  'nie-requisitos-fiscales-administradores',
  'nie-tax-id-requirements-foreign-directors',
  'Guía completa sobre NIE, NIF y obligaciones fiscales para directores extranjeros de empresas españolas.',
  'Complete guide to NIE, NIF, and tax obligations for foreign directors of Spanish companies.',
  '',
  '<p>Foreign nationals participating in Spanish companies—whether as shareholders, directors, or employees—must obtain proper identification numbers. Understanding these requirements is essential for smooth company formation.</p>

<h2>Understanding the NIE (Número de Identificación de Extranjero)</h2>

<p>The NIE is the fundamental identification number for foreigners in Spain, required for virtually all legal and financial transactions.</p>

<h2>How to Obtain Your NIE</h2>

<h3>Option 1: In Spain</h3>
<p>Apply at the National Police station (Oficina de Extranjería). NIE often issued same day or within 1-2 weeks.</p>

<h3>Option 2: From Abroad</h3>
<p>Apply at the Spanish Consulate in your country. Timeline: 2-6 weeks.</p>

<h3>Option 3: Through a Representative</h3>
<p>Grant power of attorney to a representative in Spain. Timeline: 2-3 weeks.</p>

<h2>Company Tax Identification: The NIF</h2>

<p>The NIF (Número de Identificación Fiscal) is the tax identification number for legal entities. Every Spanish company must have a NIF.</p>

<h2>Tax Obligations for Foreign Directors</h2>

<h3>Non-Resident Directors</h3>
<ul>
<li><strong>Withholding tax:</strong> 24% withheld on director fees (19% for EU/EEA residents)</li>
<li><strong>Treaty relief:</strong> Check applicable tax treaty for potential exemptions</li>
</ul>

<h3>Resident Directors</h3>
<ul>
<li><strong>Worldwide taxation:</strong> All income subject to Spanish tax</li>
<li><strong>Beckham Law:</strong> Eligible individuals may opt for flat 24% rate</li>
</ul>

<p><a href="/spain-company-setup-playbook">Download our Spain Playbook</a> for comprehensive guidance, or <a href="/contact">schedule a consultation</a>.</p>',
  'NIE y NIF para directores extranjeros | NRRO',
  'NIE & Tax ID for Foreign Directors | NRRO',
  'Guía completa sobre NIE, NIF y obligaciones fiscales para directores extranjeros en España.',
  'Complete guide to NIE and NIF requirements for foreign directors in Spain. Application procedures and tax obligations.',
  'Company Setup',
  ARRAY['NIE spain', 'NIF spain', 'foreign director spain', 'tax id spain', 'non-resident director tax'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Jordi Mayoral',
  'Fiscal',
  4,
  NOW() - INTERVAL '4 days',
  NOW() - INTERVAL '4 days',
  NOW()
),

-- Article 5: Payroll Obligations (Raquel Chica)
(
  'Obligaciones de nómina para nuevas empresas españolas',
  'Payroll Obligations for New Spanish Companies',
  'obligaciones-nomina-nuevas-empresas',
  'payroll-obligations-new-spanish-companies',
  'Todo lo que debes saber sobre nóminas en España: contratos, Seguridad Social y obligaciones mensuales.',
  'Everything you need to know about payroll in Spain: contracts, Social Security, and monthly obligations.',
  '',
  '<p>Hiring employees in Spain triggers a comprehensive set of payroll and employment obligations. Spanish labour law is highly protective of workers, and compliance requirements are strictly enforced.</p>

<h2>Employer Registration with Social Security</h2>

<p>Before hiring any employee, you must register as an employer with the Spanish Social Security system using Model TA.6.</p>

<h2>Employment Contracts</h2>

<p>All employment relationships must be documented in a written contract. Spanish law recognizes various contract types including indefinite and temporary contracts.</p>

<h2>Social Security Contributions</h2>

<p>Both employers and employees contribute to Social Security. Total employer cost is approximately 30-35% on top of gross salary.</p>

<h2>Income Tax Withholding (IRPF)</h2>

<p>Employers must withhold personal income tax from employee salaries and remit it to the Tax Agency.</p>

<h2>Monthly and Periodic Obligations</h2>

<ul>
<li><strong>Monthly:</strong> Social Security contributions due by last day of following month</li>
<li><strong>Quarterly:</strong> Form 111 for IRPF withholdings</li>
<li><strong>Annual:</strong> Form 190 summary of withholdings</li>
</ul>

<p>Ready to hire in Spain? <a href="/contact">Contact our labour team</a> to discuss payroll setup.</p>',
  'Obligaciones de nómina en España | NRRO',
  'Payroll Obligations in Spain | NRRO',
  'Guía completa sobre obligaciones de nómina para empresas en España.',
  'Complete guide to payroll obligations for Spanish companies. Social Security and compliance requirements.',
  'Company Setup',
  ARRAY['spain payroll', 'social security spain', 'employer obligations spain', 'IRPF withholding', 'spanish employment law'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Raquel Chica',
  'Laboral',
  4,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '3 days',
  NOW()
),

-- Article 6: Common Mistakes (Clara Bellonch)
(
  'Errores comunes al constituir empresa en España y cómo evitarlos',
  'Common Mistakes When Setting Up in Spain and How to Avoid Them',
  'errores-comunes-constituir-empresa-espana',
  'common-mistakes-setting-up-spain',
  'Aprende de los errores más frecuentes de los inversores extranjeros al constituir empresa en España.',
  'Learn from the most frequent mistakes foreign investors make when setting up in Spain and how to avoid them.',
  '',
  '<p>After helping hundreds of foreign companies establish operations in Spain, we have identified consistent patterns in mistakes that cause delays, unexpected costs, and compliance issues.</p>

<h2>Mistake 1: Underestimating Timeline Requirements</h2>

<p>Many investors assume company formation will take 2-3 weeks. Reality: A typical Spain incorporation takes 6-10 weeks.</p>

<h2>Mistake 2: Incomplete Documentation</h2>

<p>Foreign documents often arrive without proper apostilles or with expired certificates. Use our <a href="/spain-document-checklist">Document Checklist</a> to verify requirements.</p>

<h2>Mistake 3: Choosing the Wrong Legal Structure</h2>

<p>Investors sometimes choose entity types based on familiarity rather than Spanish requirements.</p>

<h2>Mistake 4: Ignoring Ongoing Compliance</h2>

<p>Companies focus on formation and neglect ongoing obligations like annual accounts filing.</p>

<h2>Mistake 5: DIY Banking Without Preparation</h2>

<p>Approaching banks without proper preparation results in extended due diligence or rejection.</p>

<h2>Mistake 6: Misunderstanding Employment Obligations</h2>

<p>Foreign companies apply home-country employment practices to Spanish hires, leading to problems.</p>

<p><a href="/spain-readiness-quiz">Take our Readiness Quiz</a> to assess your preparation level.</p>',
  'Errores al constituir empresa en España | NRRO',
  'Mistakes Setting Up in Spain | NRRO',
  'Los errores más comunes de inversores extranjeros al constituir empresa en España.',
  'Common mistakes foreign investors make when setting up in Spain and strategies to avoid them.',
  'Company Setup',
  ARRAY['spain company mistakes', 'foreign investor errors spain', 'company formation problems', 'spain business setup tips'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Clara Bellonch',
  'Mercantil',
  4,
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days',
  NOW()
),

-- Article 7: Tax Considerations (Jordi Mayoral)
(
  'Consideraciones fiscales al lanzar tu negocio en España',
  'Tax Considerations When Launching in Spain',
  'consideraciones-fiscales-lanzar-negocio',
  'tax-considerations-launching-spain',
  'Guía completa sobre impuestos al establecer empresa en España: IS, IVA y planificación fiscal.',
  'Complete tax guide for establishing a business in Spain: Corporate tax, VAT, and tax planning strategies.',
  '',
  '<p>Tax planning should be integral to your Spain market entry strategy. The Spanish tax system offers both challenges and opportunities for foreign investors.</p>

<h2>Corporate Income Tax</h2>

<ul>
<li><strong>General rate:</strong> 25%</li>
<li><strong>New companies:</strong> 15% for first two profitable years</li>
<li><strong>Small entities:</strong> 23% (turnover below €1 million)</li>
</ul>

<h2>Value Added Tax (IVA)</h2>

<ul>
<li><strong>Standard:</strong> 21%</li>
<li><strong>Reduced:</strong> 10% (food, transport, hospitality)</li>
<li><strong>Super-reduced:</strong> 4% (bread, milk, books)</li>
</ul>

<h2>Withholding Taxes</h2>

<p>Spanish companies must withhold tax on various payments including dividends (19%), interest (19%), and royalties (24%).</p>

<h2>Transfer Pricing</h2>

<p>Transactions between related parties must be at arm''s length. Documentation requirements are extensive for larger groups.</p>

<h2>Beckham Law Benefits</h2>

<p>Individuals relocating to Spain may opt for the special expatriate tax regime with a flat 24% rate on Spanish-source employment income.</p>

<p>Need personalized tax advice? <a href="/contact">Contact our fiscal team</a>.</p>',
  'Impuestos al crear empresa en España | NRRO',
  'Tax Considerations Spain Business | NRRO',
  'Guía completa sobre impuestos al establecer empresa en España.',
  'Complete tax guide for setting up in Spain. Corporate tax, VAT, and planning strategies.',
  'Company Setup',
  ARRAY['spain corporate tax', 'spanish VAT', 'tax planning spain', 'foreign investment tax spain', 'beckham law'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Jordi Mayoral',
  'Fiscal',
  4,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day',
  NOW()
),

-- Article 8: Mercantile Registry (Júlia Estellè)
(
  'Registro Mercantil: todo lo que debes saber',
  'Mercantile Registry: What You Must Know',
  'registro-mercantil-espana-guia',
  'mercantile-registry-spain-guide',
  'Guía completa sobre el Registro Mercantil español: inscripción y plazos de presentación.',
  'Complete guide to the Spanish Commercial Registry: registration, filings, and deadlines you need to know.',
  '',
  '<p>The Mercantile Registry (Registro Mercantil) is the backbone of Spanish corporate life, maintaining records of all commercial entities.</p>

<h2>What is the Mercantile Registry?</h2>

<p>The Mercantile Registry is a network of provincial registries under the supervision of the General Directorate of Registries and Notaries.</p>

<h2>Initial Company Registration</h2>

<p>Newly formed companies must be registered within two months from the date of the public deed. Processing takes 10-20 business days.</p>

<h2>Ongoing Registration Obligations</h2>

<ul>
<li>Director appointments and removals</li>
<li>Bylaws amendments</li>
<li>Capital increases or reductions</li>
<li>Registered office changes</li>
</ul>

<h2>Annual Accounts Filing</h2>

<p>One of the most important obligations is annual accounts filing within 1 month of shareholder approval (typically by July 30).</p>

<h3>Consequences of Non-Filing</h3>

<ul>
<li>Registry closure</li>
<li>Administrative fines €1,200 to €60,000</li>
<li>Director liability</li>
</ul>

<h2>Accessing Registry Information</h2>

<p>The Nota Simple provides an informative extract showing current company data, commonly used for bank account opening and due diligence.</p>

<p>Need help with Mercantile Registry filings? <a href="/contact">Contact our corporate team</a>.</p>',
  'Registro Mercantil España | NRRO',
  'Mercantile Registry Spain Guide | NRRO',
  'Guía completa sobre el Registro Mercantil español.',
  'Complete guide to Spain''s Mercantile Registry. Company registration and compliance requirements.',
  'Company Setup',
  ARRAY['mercantile registry spain', 'commercial registry spain', 'annual accounts spain', 'company registration spain', 'nota simple'],
  'int',
  'published',
  '0aa9233e-5fe3-4901-80ca-b623b4ff01c7',
  'Júlia Estellè',
  'Mercantil',
  4,
  NOW(),
  NOW(),
  NOW()
);