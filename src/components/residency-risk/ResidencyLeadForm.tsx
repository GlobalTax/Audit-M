import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, CheckCircle, Mail, Building2, User, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ResidencyRiskResults } from '@/lib/residencyRiskLogic';

interface ResidencyLeadFormProps {
  results?: ResidencyRiskResults;
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Netherlands',
  'Italy', 'Canada', 'Australia', 'Switzerland', 'Ireland',
  'Belgium', 'Sweden', 'Denmark', 'Norway', 'Finland',
  'Austria', 'Portugal', 'Poland', 'Other'
];

export function ResidencyLeadForm({ results }: ResidencyLeadFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    country: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.country) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-playbook-lead', {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          country: formData.country,
          playbookName: 'residency-risk',
          sourceSite: 'international',
          timeline: results ? JSON.stringify({
            riskLevel: results.riskLevel,
            score: results.score,
            keyFindings: results.keyFindings,
          }) : null,
        },
      });

      if (error) throw error;

      trackEvent('residency_risk_lead_submit_global_nrro', {
        country: formData.country,
        risk_level: results?.riskLevel,
      });

      setIsSuccess(true);
      toast.success('Your personalized report is on its way!');
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-green-800">Report Sent!</h3>
              <p className="text-green-700 mt-2">
                Check your email for your personalized tax residency risk assessment.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setIsSuccess(false)}
            >
              Request Another Report
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-normal">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          Get Your Full Assessment Report
        </CardTitle>
        <p className="text-muted-foreground text-sm mt-2">
          Receive a detailed PDF with your risk analysis, documentation checklist, and expert recommendations.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="font-medium">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="pl-10"
                placeholder="e.g., John Smith"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Business Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                placeholder="e.g., john@company.com"
                required
              />
            </div>
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="font-medium">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className="pl-10"
                placeholder="e.g., Acme Inc."
              />
            </div>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="font-medium">Country of Origin *</Label>
            <Select 
              value={formData.country} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
            >
              <SelectTrigger>
                <Globe className="h-4 w-4 text-muted-foreground mr-2" />
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Get My Full Report'}
          </Button>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground text-center">
            By requesting your report, you agree to receive occasional updates. 
            Unsubscribe anytime. We respect your privacy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
