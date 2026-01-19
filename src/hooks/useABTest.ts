import { useMemo, useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

type Variant = 'A' | 'B';

interface ABTestConfig {
  testName: string;
  defaultVariant?: Variant;
}

const getStoredVariant = (testName: string): Variant | null => {
  if (typeof window === 'undefined') return null;
  const stored = sessionStorage.getItem(`ab_test_${testName}`);
  return stored === 'A' || stored === 'B' ? stored : null;
};

const assignVariant = (testName: string): Variant => {
  const variant: Variant = Math.random() < 0.5 ? 'A' : 'B';
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`ab_test_${testName}`, variant);
  }
  return variant;
};

export const useABTest = ({ testName, defaultVariant = 'A' }: ABTestConfig) => {
  const { trackEvent } = useAnalytics();

  const variant = useMemo(() => {
    const stored = getStoredVariant(testName);
    if (stored) return stored;
    return assignVariant(testName);
  }, [testName]);

  useEffect(() => {
    trackEvent('ab_test_impression_global_nrro', {
      test_name: testName,
      variant,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    });
  }, [testName, variant, trackEvent]);

  const trackConversion = (conversionType: string) => {
    trackEvent('ab_test_conversion_global_nrro', {
      test_name: testName,
      variant,
      conversion_type: conversionType,
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    });
  };

  return {
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B',
    trackConversion,
  };
};

// Pre-defined tests
export const AB_TESTS = {
  HERO_CTA: 'hero_cta_text',
  CONTACT_FORM_LAYOUT: 'contact_form_layout',
  PLAYBOOK_CTA_POSITION: 'playbook_cta_position',
  CALCULATOR_RESULTS_STYLE: 'calculator_results_style',
} as const;
