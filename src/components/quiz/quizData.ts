export interface QuizOption {
  id: string;
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "entity_type",
    question: "What type of legal entity are you planning to establish in Spain?",
    description: "Different structures have different requirements and timelines.",
    options: [
      { id: "sl", label: "SL (Sociedad Limitada) - Limited Liability Company", score: 3 },
      { id: "sa", label: "SA (Sociedad Anónima) - Public Limited Company", score: 2 },
      { id: "branch", label: "Branch Office of existing foreign company", score: 2 },
      { id: "subsidiary", label: "Subsidiary of foreign parent company", score: 3 },
      { id: "unsure", label: "Not sure yet", score: 1 },
    ],
  },
  {
    id: "directors_nationality",
    question: "Will any of the directors or shareholders be non-EU residents?",
    description: "Non-EU residents require additional documentation and NIE numbers.",
    options: [
      { id: "all_eu", label: "All directors/shareholders are EU residents", score: 3 },
      { id: "some_non_eu", label: "Some are non-EU residents", score: 2 },
      { id: "all_non_eu", label: "All are non-EU residents", score: 1 },
      { id: "unsure", label: "Not determined yet", score: 0 },
    ],
  },
  {
    id: "nie_status",
    question: "Do you or your directors already have Spanish NIE numbers?",
    description: "NIE (Número de Identificación de Extranjero) is required for all foreign directors.",
    options: [
      { id: "have_all", label: "Yes, all directors have NIE numbers", score: 3 },
      { id: "have_some", label: "Some directors have NIE numbers", score: 2 },
      { id: "in_progress", label: "NIE applications are in progress", score: 2 },
      { id: "none", label: "No, we haven't started the NIE process", score: 1 },
      { id: "not_applicable", label: "Not applicable (EU nationals only)", score: 3 },
    ],
  },
  {
    id: "capital_requirement",
    question: "Are you aware of the minimum share capital requirements?",
    description: "SL requires €3,000 minimum; SA requires €60,000 minimum.",
    options: [
      { id: "fully_aware", label: "Yes, and we have capital ready to deposit", score: 3 },
      { id: "aware_planning", label: "Yes, we're planning the capital structure", score: 2 },
      { id: "partially_aware", label: "I know there are requirements but need details", score: 1 },
      { id: "not_aware", label: "No, I need to learn about this", score: 0 },
    ],
  },
  {
    id: "employees_planned",
    question: "How many employees do you plan to hire in Spain initially?",
    description: "Employee count affects payroll setup, social security, and compliance requirements.",
    options: [
      { id: "none", label: "No employees initially (directors only)", score: 3 },
      { id: "1_5", label: "1-5 employees", score: 3 },
      { id: "6_20", label: "6-20 employees", score: 2 },
      { id: "21_plus", label: "More than 20 employees", score: 2 },
      { id: "unsure", label: "Not determined yet", score: 1 },
    ],
  },
  {
    id: "tax_residency",
    question: "Where will the company's effective management be located?",
    description: "This determines tax residency and reporting obligations.",
    options: [
      { id: "spain", label: "Primarily in Spain", score: 3 },
      { id: "mixed", label: "Split between Spain and another country", score: 2 },
      { id: "abroad_managed", label: "Abroad, with Spanish operations only", score: 2 },
      { id: "not_determined", label: "Not determined yet", score: 1 },
    ],
  },
  {
    id: "timeline",
    question: "When do you need the company to be operational?",
    description: "Standard setup takes 8-12 weeks; expedited options are available.",
    options: [
      { id: "urgent", label: "Within 1 month (urgent)", score: 1 },
      { id: "1_3_months", label: "1-3 months", score: 3 },
      { id: "3_6_months", label: "3-6 months", score: 3 },
      { id: "6_plus", label: "6+ months (long-term planning)", score: 3 },
      { id: "flexible", label: "No specific deadline", score: 2 },
    ],
  },
  {
    id: "spain_experience",
    question: "What is your level of experience with Spanish business regulations?",
    options: [
      { id: "extensive", label: "Extensive - We've operated in Spain before", score: 3 },
      { id: "some", label: "Some - Basic familiarity with requirements", score: 2 },
      { id: "limited", label: "Limited - We've done initial research", score: 1 },
      { id: "none", label: "None - This is completely new to us", score: 0 },
    ],
  },
  {
    id: "parent_company",
    question: "Do you have an established legal entity in your home country?",
    description: "Parent company structure affects documentation and setup approach.",
    options: [
      { id: "established", label: "Yes, well-established company (5+ years)", score: 3 },
      { id: "recent", label: "Yes, recently established company", score: 2 },
      { id: "startup", label: "Startup or newly incorporated", score: 2 },
      { id: "individual", label: "Individual/personal venture", score: 1 },
    ],
  },
  {
    id: "compliance_awareness",
    question: "How familiar are you with Spanish tax and compliance obligations?",
    description: "Including VAT, Corporate Tax, Annual Accounts, and labor regulations.",
    options: [
      { id: "very_familiar", label: "Very familiar - We understand the obligations", score: 3 },
      { id: "somewhat", label: "Somewhat familiar - Need clarification on details", score: 2 },
      { id: "basic", label: "Basic awareness - Know there are requirements", score: 1 },
      { id: "not_familiar", label: "Not familiar - Need comprehensive guidance", score: 0 },
    ],
  },
];

export interface ResultTier {
  id: "low" | "medium" | "high";
  title: string;
  scoreRange: { min: number; max: number };
  description: string;
  keyFindings: string[];
  recommendations: string[];
  ctaText: string;
  ctaDescription: string;
}

export const resultTiers: ResultTier[] = [
  {
    id: "low",
    title: "Foundation Building Required",
    scoreRange: { min: 0, max: 12 },
    description: "Your Spain setup journey is in the early planning stages. Several key decisions and preparations are needed before you can proceed efficiently with company formation.",
    keyFindings: [
      "Critical decisions about entity type and structure are still pending",
      "NIE numbers and documentation will require attention",
      "Timeline expectations may need adjustment for realistic planning",
      "Regulatory and compliance frameworks need exploration",
    ],
    recommendations: [
      "Schedule a discovery call to clarify entity structure options",
      "Begin NIE application process for all non-EU directors immediately",
      "Review our Spain Company Setup Playbook for comprehensive guidance",
      "Consider engaging professional support from the outset to avoid costly mistakes",
    ],
    ctaText: "Book a Discovery Call",
    ctaDescription: "Let's discuss your situation and create a realistic roadmap for your Spain expansion.",
  },
  {
    id: "medium",
    title: "Well Positioned for Success",
    scoreRange: { min: 13, max: 20 },
    description: "You've made good progress in your Spain setup planning. With some focused preparation in specific areas, you'll be ready to proceed with company formation.",
    keyFindings: [
      "Core decisions about structure and approach are largely defined",
      "Some documentation or procedural items need attention",
      "Timeline is generally realistic with proper planning",
      "Basic understanding of compliance requirements exists",
    ],
    recommendations: [
      "Address any pending NIE applications to avoid delays",
      "Finalize capital structure and funding arrangements",
      "Review detailed compliance calendar for your entity type",
      "Engage professional support to streamline the final steps",
    ],
    ctaText: "Schedule a Strategy Session",
    ctaDescription: "Let's finalize your setup plan and address any remaining gaps.",
  },
  {
    id: "high",
    title: "Ready to Launch",
    scoreRange: { min: 21, max: 30 },
    description: "Excellent! You're well-prepared for establishing your business presence in Spain. Your planning and preparation put you in a strong position to proceed efficiently.",
    keyFindings: [
      "Entity structure and key decisions are clearly defined",
      "Required documentation and NIE status are in order",
      "Timeline expectations align with typical setup processes",
      "Good awareness of compliance and regulatory requirements",
    ],
    recommendations: [
      "Move forward with notary appointment and incorporation",
      "Finalize banking relationships and capital deposit",
      "Establish accounting and payroll infrastructure",
      "Consider ongoing compliance support for seamless operations",
    ],
    ctaText: "Start Your Setup",
    ctaDescription: "You're ready. Let's begin the formal incorporation process.",
  },
];

export function calculateResult(answers: Record<string, string>): ResultTier {
  let totalScore = 0;
  
  for (const questionId in answers) {
    const question = quizQuestions.find(q => q.id === questionId);
    if (question) {
      const selectedOption = question.options.find(o => o.id === answers[questionId]);
      if (selectedOption) {
        totalScore += selectedOption.score;
      }
    }
  }
  
  for (const tier of resultTiers) {
    if (totalScore >= tier.scoreRange.min && totalScore <= tier.scoreRange.max) {
      return tier;
    }
  }
  
  // Default to medium if somehow out of range
  return resultTiers[1];
}

export function getScorePercentage(answers: Record<string, string>): number {
  const maxScore = 30; // Maximum possible score
  let totalScore = 0;
  
  for (const questionId in answers) {
    const question = quizQuestions.find(q => q.id === questionId);
    if (question) {
      const selectedOption = question.options.find(o => o.id === answers[questionId]);
      if (selectedOption) {
        totalScore += selectedOption.score;
      }
    }
  }
  
  return Math.round((totalScore / maxScore) * 100);
}
