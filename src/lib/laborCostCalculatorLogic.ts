// Spain Labor Cost Calculator Logic (2025 rates)

export interface LaborCostInputs {
  grossSalary: number;
  salaryInputMode: 'monthly' | 'annual';
  numberOfPayments: 12 | 14;
  contractType: 'permanent' | 'fixed-term';
  numberOfEmployees: number;
  industryRisk: 'low' | 'medium' | 'high';
}

export interface LaborCostResults {
  // Input reference
  monthlyGross: number;
  annualGross: number;
  paymentsPerYear: number;
  
  // Employer contributions
  employerSocialSecurity: number;      // 23.6%
  employerUnemployment: number;        // 5.5%
  employerTrainingFund: number;        // 0.6%
  employerFOGASA: number;              // 0.2%
  workAccidentInsurance: number;       // Varies by industry
  totalEmployerContributions: number;
  
  // Employee deductions
  employeeSocialSecurity: number;      // 4.7%
  employeeUnemployment: number;        // 1.55%
  employeeTrainingFund: number;        // 0.1%
  irpfWithholding: number;             // Progressive tax
  totalEmployeeDeductions: number;
  
  // Summary
  netSalary: number;
  totalMonthlyEmployerCost: number;
  totalAnnualEmployerCost: number;
  
  // Rates for display
  employerContributionRate: number;
  employeeDeductionRate: number;
  effectiveIrpfRate: number;
}

export interface Scenario {
  id: string;
  label: string;
  inputs: LaborCostInputs;
  results: LaborCostResults;
  savedAt: Date;
}

// IRPF brackets (simplified 2025 state + regional average)
const IRPF_BRACKETS = [
  { min: 0, max: 12450, rate: 0.19 },
  { min: 12450, max: 20200, rate: 0.24 },
  { min: 20200, max: 35200, rate: 0.30 },
  { min: 35200, max: 60000, rate: 0.37 },
  { min: 60000, max: 300000, rate: 0.45 },
  { min: 300000, max: Infinity, rate: 0.47 },
];

// Work accident insurance rates by risk level
const ACCIDENT_RATES: Record<string, number> = {
  low: 0.0067,     // 0.67% - office work
  medium: 0.015,   // 1.5% - retail, hospitality
  high: 0.035,     // 3.5% - construction, manufacturing
};

// Employer contribution rates (fixed 2025)
const EMPLOYER_RATES = {
  socialSecurity: 0.236,   // 23.6%
  unemployment: 0.055,     // 5.5%
  trainingFund: 0.006,     // 0.6%
  fogasa: 0.002,           // 0.2%
};

// Employee contribution rates (fixed 2025)
const EMPLOYEE_RATES = {
  socialSecurity: 0.047,   // 4.7%
  unemployment: 0.0155,    // 1.55%
  trainingFund: 0.001,     // 0.1%
};

function calculateProgressiveIRPF(annualGross: number): number {
  let tax = 0;
  let remainingIncome = annualGross;

  for (const bracket of IRPF_BRACKETS) {
    if (remainingIncome <= 0) break;
    
    const taxableInBracket = Math.min(
      remainingIncome,
      bracket.max - bracket.min
    );
    
    if (taxableInBracket > 0) {
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }
  }

  return tax;
}

export function calculateLaborCosts(inputs: LaborCostInputs): LaborCostResults {
  const { grossSalary, salaryInputMode, numberOfPayments, industryRisk, numberOfEmployees } = inputs;
  
  // Calculate monthly gross based on input mode
  let monthlyGross: number;
  let annualGross: number;
  
  if (salaryInputMode === 'annual') {
    annualGross = grossSalary;
    monthlyGross = grossSalary / numberOfPayments;
  } else {
    monthlyGross = grossSalary;
    annualGross = grossSalary * numberOfPayments;
  }
  
  // Calculate employer contributions (based on monthly gross)
  const employerSocialSecurity = monthlyGross * EMPLOYER_RATES.socialSecurity;
  const employerUnemployment = monthlyGross * EMPLOYER_RATES.unemployment;
  const employerTrainingFund = monthlyGross * EMPLOYER_RATES.trainingFund;
  const employerFOGASA = monthlyGross * EMPLOYER_RATES.fogasa;
  const workAccidentInsurance = monthlyGross * ACCIDENT_RATES[industryRisk];
  
  const totalEmployerContributions = 
    employerSocialSecurity + 
    employerUnemployment + 
    employerTrainingFund + 
    employerFOGASA + 
    workAccidentInsurance;

  // Calculate employee deductions
  const employeeSocialSecurity = monthlyGross * EMPLOYEE_RATES.socialSecurity;
  const employeeUnemployment = monthlyGross * EMPLOYEE_RATES.unemployment;
  const employeeTrainingFund = monthlyGross * EMPLOYEE_RATES.trainingFund;
  
  // Calculate IRPF (annual basis, then monthly)
  const annualSocialSecurityDeductions = (employeeSocialSecurity + employeeUnemployment + employeeTrainingFund) * numberOfPayments;
  const taxableBase = annualGross - annualSocialSecurityDeductions;
  const annualIRPF = calculateProgressiveIRPF(taxableBase);
  const monthlyIRPF = annualIRPF / 12; // IRPF is always withheld over 12 months
  
  const irpfWithholding = monthlyIRPF;
  const effectiveIrpfRate = (annualIRPF / annualGross) * 100;

  const totalEmployeeDeductions = 
    employeeSocialSecurity + 
    employeeUnemployment + 
    employeeTrainingFund + 
    irpfWithholding;

  // Calculate totals
  const netSalary = monthlyGross - totalEmployeeDeductions;
  const totalMonthlyEmployerCost = monthlyGross + totalEmployerContributions;
  const totalAnnualEmployerCost = (monthlyGross + totalEmployerContributions) * numberOfPayments;

  // Calculate rates for display
  const employerContributionRate = (totalEmployerContributions / monthlyGross) * 100;
  const employeeDeductionRate = (totalEmployeeDeductions / monthlyGross) * 100;

  // Multiply by number of employees for totals
  const multiplier = numberOfEmployees || 1;

  return {
    monthlyGross: monthlyGross * multiplier,
    annualGross: annualGross * multiplier,
    paymentsPerYear: numberOfPayments,
    employerSocialSecurity: employerSocialSecurity * multiplier,
    employerUnemployment: employerUnemployment * multiplier,
    employerTrainingFund: employerTrainingFund * multiplier,
    employerFOGASA: employerFOGASA * multiplier,
    workAccidentInsurance: workAccidentInsurance * multiplier,
    totalEmployerContributions: totalEmployerContributions * multiplier,
    employeeSocialSecurity: employeeSocialSecurity * multiplier,
    employeeUnemployment: employeeUnemployment * multiplier,
    employeeTrainingFund: employeeTrainingFund * multiplier,
    irpfWithholding: irpfWithholding * multiplier,
    totalEmployeeDeductions: totalEmployeeDeductions * multiplier,
    netSalary: netSalary * multiplier,
    totalMonthlyEmployerCost: totalMonthlyEmployerCost * multiplier,
    totalAnnualEmployerCost: totalAnnualEmployerCost * multiplier,
    employerContributionRate,
    employeeDeductionRate,
    effectiveIrpfRate,
  };
}

export const SPAIN_MINIMUM_WAGE_2025 = 1184; // €/month (14 payments)
export const SPAIN_MINIMUM_WAGE_ANNUAL_14 = 16576; // €/year (14 payments)
export const SPAIN_MINIMUM_WAGE_ANNUAL_12 = 14208; // €/year (12 payments)
