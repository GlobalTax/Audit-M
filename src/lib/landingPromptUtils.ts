export interface PromptInputs {
  title: string;
  targetAudience: string;
  category: string;
  keywords: string[];
  requiredCTAs: string[];
  notes: string;
}

export const generateLandingPrompt = (inputs: PromptInputs): string => {
  const keywordsFormatted = inputs.keywords.length > 0 
    ? inputs.keywords.map(kw => `- ${kw}`).join('\n')
    : '- (No keywords specified)';

  const ctasFormatted = inputs.requiredCTAs.length > 0
    ? inputs.requiredCTAs.map(cta => `- ${cta}`).join('\n')
    : '- Free Consultation\n- Contact Us';

  return `# CONTEXT

You are creating a landing page for **Navarro**, a premium legal, tax, and corporate advisory firm based in Barcelona, Spain.

- **Tone**: High-end, expert, international, trustworthy
- **Target**: ${inputs.targetAudience || 'General business and legal clients'}
- **Category**: ${inputs.category || 'General'}
- **Restrictions**: Must NOT resemble government or official institution pages

---

# TASK

Create a **complete landing page** for:
**"${inputs.title}"**

Include the following sections:
1. **Hero** – Powerful headline + value proposition + primary CTA
2. **Problem Statement** – Pain points the audience faces
3. **Services Overview** – Key services relevant to this landing
4. **Why Choose Navarro** – Unique differentiators (premium service, multilingual, experience)
5. **Process** – Step-by-step explanation of working with Navarro
6. **Social Proof** – Testimonials, client logos, or stats
7. **FAQ** – 5-7 relevant questions and answers
8. **Final CTA** – Strong conversion section
9. **Footer** – Contact info, links, legal

---

# BRANDING GUIDELINES

- **Primary Color**: Corporate Blue (#0D3B66)
- **Secondary**: White, light grays, subtle accents
- **Typography**: Clean, modern sans-serif with strong hierarchy
- **Layout**: Accessible, generous whitespace, premium feel
- **CTAs**: Strong, clear call-to-action buttons

Required CTAs for this page:
${ctasFormatted}

---

# SEO REQUIREMENTS

Use the following keywords naturally throughout the content:
${keywordsFormatted}

Also generate:
- **Meta Title** (max 60 chars)
- **Meta Description** (max 160 chars)

---

# GOOGLE ADS COMPLIANCE

- Avoid references to official government institutions
- Use simple, trustworthy language
- Focus on professional advisory services
- Include clear pricing transparency (or "free consultation" offer)

---

# ADDITIONAL NOTES

${inputs.notes || 'None specified.'}

---

# OUTPUT FORMAT

Provide the full landing page content in **Markdown format**, with:
- Clear section headers
- Placeholder text for images [Image: description]
- All microcopy for buttons and CTAs
- SEO meta tags at the end
`;
};
