import { TrustBar } from '@/components/company-setup/shared/TrustBar';

interface TrustBarSectionProps {
  heading?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export const TrustBarSection = ({ heading, subtitle, stats }: TrustBarSectionProps) => {
  return <TrustBar heading={heading} subtitle={subtitle} stats={stats} />;
};
