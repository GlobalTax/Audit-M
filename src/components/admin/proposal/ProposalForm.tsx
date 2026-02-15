import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProposalData, ProposalService, AVAILABLE_SERVICES } from '@/types/proposal';
import { getCurrentSiteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const proposalSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  clientEmail: z.string().email('Valid email required'),
  clientPhone: z.string().optional(),
  industry: z.string().optional(),
  proposalDate: z.date(),
  validUntil: z.date(),
  additionalNotes: z.string().optional(),
  paymentTerms: z.string().optional(),
  language: z.enum(['en', 'es', 'ca']),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  onGenerate: (data: ProposalData) => void;
}

export const ProposalForm = ({ onGenerate }: ProposalFormProps) => {
  const [selectedServices, setSelectedServices] = useState<ProposalService[]>([]);
  
  const siteConfig = getCurrentSiteConfig();

  const generateProposalNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    const prefix = siteConfig.name.toUpperCase().substring(0, 3);
    return `${prefix}-${year}-${random}`;
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      proposalDate: new Date(),
      validUntil: addDays(new Date(), 30),
      language: siteConfig.defaultLanguage === 'en' ? 'en' : 'es',
    },
  });

  const proposalDate = watch('proposalDate');
  const validUntil = watch('validUntil');
  const language = watch('language');

  const handleServiceToggle = (serviceId: string) => {
    const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === serviceId);
      if (exists) {
        return prev.filter(s => s.id !== serviceId);
      }
      return [...prev, {
        id: service.id,
        name: service.name,
        nameEs: service.nameEs,
        nameCa: service.nameCa,
        description: service.description,
        descriptionEs: service.descriptionEs,
        descriptionCa: service.descriptionCa,
        monthlyFee: 0,
      }];
    });
  };

  const updateServiceFee = (serviceId: string, fee: number, isAnnual?: boolean) => {
    setSelectedServices(prev => 
      prev.map(s => {
        if (s.id === serviceId) {
          if (isAnnual) {
            return { ...s, annualFee: fee };
          }
          return { ...s, monthlyFee: fee };
        }
        return s;
      })
    );
  };

  const toggleOneTime = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.map(s => {
        if (s.id === serviceId) {
          return { ...s, isOneTime: !s.isOneTime };
        }
        return s;
      })
    );
  };

  const onSubmit = (data: ProposalFormData) => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }

    if (selectedServices.some(s => s.monthlyFee <= 0)) {
      alert('Please set fees for all selected services');
      return;
    }

    const proposalData: ProposalData = {
      clientName: data.clientName,
      companyName: data.companyName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      industry: data.industry,
      additionalNotes: data.additionalNotes,
      paymentTerms: data.paymentTerms,
      language: data.language,
      proposalDate: format(data.proposalDate, 'yyyy-MM-dd'),
      validUntil: format(data.validUntil, 'yyyy-MM-dd'),
      proposalNumber: generateProposalNumber(),
      selectedServices,
    };

    onGenerate(proposalData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="Acme Corporation"
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName">Contact Name *</Label>
              <Input
                id="clientName"
                {...register('clientName')}
                placeholder="John Smith"
              />
              {errors.clientName && (
                <p className="text-sm text-destructive">{errors.clientName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email *</Label>
              <Input
                id="clientEmail"
                type="email"
                {...register('clientEmail')}
                placeholder="john@acme.com"
              />
              {errors.clientEmail && (
                <p className="text-sm text-destructive">{errors.clientEmail.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone</Label>
              <Input
                id="clientPhone"
                {...register('clientPhone')}
                placeholder="+34 600 000 000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                {...register('industry')}
                placeholder="Technology, Finance, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={language}
                onValueChange={(value: 'en' | 'es' | 'ca') => setValue('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="ca">Català</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposal Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Proposal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Proposal Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !proposalDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {proposalDate ? format(proposalDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={proposalDate}
                    onSelect={(date) => date && setValue('proposalDate', date)}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Valid Until</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !validUntil && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {validUntil ? format(validUntil, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={validUntil}
                    onSelect={(date) => date && setValue('validUntil', date)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {AVAILABLE_SERVICES.map((service) => {
              const isSelected = selectedServices.some(s => s.id === service.id);
              return (
                <div
                  key={service.id}
                  className={cn(
                    'border rounded-lg p-3 cursor-pointer transition-all',
                    isSelected
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-border hover:border-amber-500/50'
                  )}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox checked={isSelected} />
                    <div>
                      <p className="font-medium text-sm">{language === 'en' ? service.name : language === 'ca' ? service.nameCa : service.nameEs}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {language === 'en' ? service.description : language === 'ca' ? service.descriptionCa : service.descriptionEs}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedServices.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Set Fees for Selected Services</h4>
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {language === 'en' ? service.name : language === 'ca' ? service.nameCa : service.nameEs}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={service.isOneTime}
                        onCheckedChange={() => toggleOneTime(service.id)}
                      />
                      <Label className="text-xs">One-time</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs whitespace-nowrap">
                        {service.isOneTime ? 'Fee €' : 'Monthly €'}
                      </Label>
                      <Input
                        type="number"
                        className="w-28"
                        value={service.monthlyFee || ''}
                        onChange={(e) => updateServiceFee(service.id, Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    {!service.isOneTime && (
                      <div className="flex items-center gap-2">
                        <Label className="text-xs whitespace-nowrap">Annual €</Label>
                        <Input
                          type="number"
                          className="w-28"
                          value={service.annualFee || service.monthlyFee * 12 || ''}
                          onChange={(e) => updateServiceFee(service.id, Number(e.target.value), true)}
                          placeholder={String(service.monthlyFee * 12 || 0)}
                        />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentTerms">Payment Terms (optional)</Label>
            <Textarea
              id="paymentTerms"
              {...register('paymentTerms')}
              placeholder="Custom payment terms (leave empty for defaults)"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes (optional)</Label>
            <Textarea
              id="additionalNotes"
              {...register('additionalNotes')}
              placeholder="Any additional notes to include in the proposal..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black">
          Generate PDF Proposal
        </Button>
      </div>
    </form>
  );
};
