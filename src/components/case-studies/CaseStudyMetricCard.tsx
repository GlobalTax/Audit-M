import { CaseStudyMetric } from '@/types/caseStudy';
import { TrendingUp } from 'lucide-react';

interface CaseStudyMetricCardProps {
  metric: CaseStudyMetric;
}

export const CaseStudyMetricCard = ({ metric }: CaseStudyMetricCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 border border-border hover:border-accent transition-colors">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-accent/10 rounded-lg">
          <TrendingUp className="h-6 w-6 text-accent" />
        </div>
        <div className="flex-1">
          <div className="text-3xl lg:text-4xl font-normal text-accent mb-2">
            {metric.value}
          </div>
          <div className="text-base font-normal text-foreground mb-1">
            {metric.label}
          </div>
          {metric.description && (
            <p className="text-sm text-foreground/60 leading-relaxed">
              {metric.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
