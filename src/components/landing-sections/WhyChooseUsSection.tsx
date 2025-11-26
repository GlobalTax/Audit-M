import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface Credential {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
}

interface WhyChooseUsSectionProps {
  title: string;
  subtitle?: string;
  credentials: Credential[];
}

export const WhyChooseUsSection = ({ title, subtitle, credentials }: WhyChooseUsSectionProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-normal mb-4 text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {credentials.map((credential, index) => {
            const Icon = credential.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-semibold text-foreground mb-2">
                    {credential.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">
                    {credential.label}
                  </div>
                  {credential.description && (
                    <p className="text-sm text-muted-foreground">
                      {credential.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
