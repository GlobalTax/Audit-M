import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Shield, Calendar, MapPin, Building2, Home, Users, Banknote, FileCheck } from 'lucide-react';
import { ResidencyInputs } from '@/lib/residencyRiskLogic';

interface ResidencyRiskFormProps {
  onAssess: (inputs: ResidencyInputs) => void;
  isAssessing: boolean;
}

export function ResidencyRiskForm({ onAssess, isAssessing }: ResidencyRiskFormProps) {
  const [formData, setFormData] = useState<ResidencyInputs>({
    daysInSpain: 90,
    primaryIncomeLocation: 'abroad',
    permanentHomeSpain: 'no',
    spouseLocation: 'na',
    childrenLocation: 'na',
    employerLocation: 'abroad',
    primaryBankAccounts: 'no',
    registeredPadron: 'no',
    spanishSocialSecurity: 'no',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssess(formData);
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-normal">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          Answer These Questions
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Your answers help us assess your risk based on official Spanish tax residency criteria.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Days in Spain */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <Label className="font-medium">Days spent in Spain this year</Label>
            </div>
            <div className="space-y-3">
              <Slider
                value={[formData.daysInSpain]}
                onValueChange={([value]) => setFormData(prev => ({ ...prev, daysInSpain: value }))}
                min={0}
                max={365}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{formData.daysInSpain} days</span>
                {formData.daysInSpain > 183 && (
                  <span className="text-sm text-red-600 font-medium">Exceeds 183-day threshold</span>
                )}
                {formData.daysInSpain <= 183 && formData.daysInSpain > 150 && (
                  <span className="text-sm text-amber-600 font-medium">Approaching threshold</span>
                )}
              </div>
            </div>
          </div>

          {/* Primary Income Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-primary" />
              <Label className="font-medium">Where is your primary income source?</Label>
            </div>
            <RadioGroup
              value={formData.primaryIncomeLocation}
              onValueChange={(value: 'spain' | 'abroad' | 'mixed') => 
                setFormData(prev => ({ ...prev, primaryIncomeLocation: value }))
              }
              className="grid grid-cols-3 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="spain" />
                <span>Spain</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="abroad" />
                <span>Abroad</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="mixed" />
                <span>Mixed</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Permanent Home */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-primary" />
              <Label className="font-medium">Do you have a permanent home in Spain?</Label>
            </div>
            <RadioGroup
              value={formData.permanentHomeSpain}
              onValueChange={(value: 'yes' | 'no' | 'rented') => 
                setFormData(prev => ({ ...prev, permanentHomeSpain: value }))
              }
              className="grid grid-cols-3 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="yes" />
                <span>Yes (owned)</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="rented" />
                <span>Rented</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="no" />
                <span>No</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Spouse Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <Label className="font-medium">Where does your spouse/partner live?</Label>
            </div>
            <RadioGroup
              value={formData.spouseLocation}
              onValueChange={(value: 'spain' | 'abroad' | 'na') => 
                setFormData(prev => ({ ...prev, spouseLocation: value }))
              }
              className="grid grid-cols-3 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="spain" />
                <span>Spain</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="abroad" />
                <span>Abroad</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="na" />
                <span>N/A</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Children Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <Label className="font-medium">Where do your dependent children live?</Label>
            </div>
            <RadioGroup
              value={formData.childrenLocation}
              onValueChange={(value: 'spain' | 'abroad' | 'na') => 
                setFormData(prev => ({ ...prev, childrenLocation: value }))
              }
              className="grid grid-cols-3 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="spain" />
                <span>Spain</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="abroad" />
                <span>Abroad</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="na" />
                <span>N/A</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Employer Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <Label className="font-medium">Where is your employer registered?</Label>
            </div>
            <RadioGroup
              value={formData.employerLocation}
              onValueChange={(value: 'spain' | 'abroad') => 
                setFormData(prev => ({ ...prev, employerLocation: value }))
              }
              className="grid grid-cols-2 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="spain" />
                <span>Spain</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="abroad" />
                <span>Abroad</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Bank Accounts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-primary" />
              <Label className="font-medium">Are your primary bank accounts in Spain?</Label>
            </div>
            <RadioGroup
              value={formData.primaryBankAccounts}
              onValueChange={(value: 'yes' | 'no') => 
                setFormData(prev => ({ ...prev, primaryBankAccounts: value }))
              }
              className="grid grid-cols-2 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="yes" />
                <span>Yes</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="no" />
                <span>No</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Padrón Registration */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-primary" />
              <Label className="font-medium">Are you registered in the Padrón (municipal census)?</Label>
            </div>
            <RadioGroup
              value={formData.registeredPadron}
              onValueChange={(value: 'yes' | 'no') => 
                setFormData(prev => ({ ...prev, registeredPadron: value }))
              }
              className="grid grid-cols-2 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="yes" />
                <span>Yes</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="no" />
                <span>No</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Social Security */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <Label className="font-medium">Do you contribute to Spanish Social Security?</Label>
            </div>
            <RadioGroup
              value={formData.spanishSocialSecurity}
              onValueChange={(value: 'yes' | 'no') => 
                setFormData(prev => ({ ...prev, spanishSocialSecurity: value }))
              }
              className="grid grid-cols-2 gap-2"
            >
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="yes" />
                <span>Yes</span>
              </Label>
              <Label className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                <RadioGroupItem value="no" />
                <span>No</span>
              </Label>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isAssessing}
          >
            {isAssessing ? 'Analyzing...' : 'Assess My Risk Level'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
