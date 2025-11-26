import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface ProblemStatementSectionProps {
  title: string;
  description: string;
  challenges?: string[];
}

export const ProblemStatementSection = ({ 
  title, 
  description,
  challenges = []
}: ProblemStatementSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 border-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-normal mb-4 text-foreground">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          
          {challenges.length > 0 && (
            <ul className="mt-6 space-y-3 pl-16">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </section>
  );
};
