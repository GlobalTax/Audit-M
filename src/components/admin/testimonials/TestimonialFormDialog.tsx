import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateTestimonial, useUpdateTestimonial, Testimonial, TestimonialInsert } from "@/hooks/useTestimonials";
import { toast } from "sonner";

interface TestimonialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: Testimonial | null;
}

const COMPANY_TYPES = [
  { value: 'multinational', label: 'Multinational' },
  { value: 'family_business', label: 'Family Business' },
  { value: 'investor', label: 'Investor' },
  { value: 'startup', label: 'Startup' },
  { value: 'sme', label: 'SME' },
];

const FLAG_OPTIONS = [
  { value: '🇬🇧', label: '🇬🇧 United Kingdom' },
  { value: '🇺🇸', label: '🇺🇸 United States' },
  { value: '🇩🇪', label: '🇩🇪 Germany' },
  { value: '🇫🇷', label: '🇫🇷 France' },
  { value: '🇪🇸', label: '🇪🇸 Spain' },
  { value: '🇮🇹', label: '🇮🇹 Italy' },
  { value: '🇳🇱', label: '🇳🇱 Netherlands' },
  { value: '🇧🇪', label: '🇧🇪 Belgium' },
  { value: '🇨🇭', label: '🇨🇭 Switzerland' },
  { value: '🇦🇹', label: '🇦🇹 Austria' },
  { value: '🇵🇹', label: '🇵🇹 Portugal' },
  { value: '🇮🇪', label: '🇮🇪 Ireland' },
  { value: '🇸🇪', label: '🇸🇪 Sweden' },
  { value: '🇩🇰', label: '🇩🇰 Denmark' },
  { value: '🇳🇴', label: '🇳🇴 Norway' },
  { value: '🇫🇮', label: '🇫🇮 Finland' },
  { value: '🇵🇱', label: '🇵🇱 Poland' },
  { value: '🇨🇿', label: '🇨🇿 Czech Republic' },
  { value: '🇲🇽', label: '🇲🇽 Mexico' },
  { value: '🇧🇷', label: '🇧🇷 Brazil' },
  { value: '🇦🇷', label: '🇦🇷 Argentina' },
  { value: '🇨🇴', label: '🇨🇴 Colombia' },
  { value: '🇨🇱', label: '🇨🇱 Chile' },
  { value: '🇨🇦', label: '🇨🇦 Canada' },
  { value: '🇦🇺', label: '🇦🇺 Australia' },
  { value: '🇯🇵', label: '🇯🇵 Japan' },
  { value: '🇨🇳', label: '🇨🇳 China' },
  { value: '🇮🇳', label: '🇮🇳 India' },
  { value: '🇦🇪', label: '🇦🇪 UAE' },
  { value: '🇸🇦', label: '🇸🇦 Saudi Arabia' },
  { value: '🇿🇦', label: '🇿🇦 South Africa' },
  { value: '🌍', label: '🌍 Global' },
];

export function TestimonialFormDialog({ open, onOpenChange, testimonial }: TestimonialFormDialogProps) {
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const isEditing = !!testimonial;

  const [formData, setFormData] = useState<TestimonialInsert>({
    quote: '',
    author_name: '',
    author_role: '',
    company_name: '',
    company_type: 'multinational',
    company_type_label: 'Multinational',
    location: '',
    flag_emoji: '🌍',
    avatar_url: '',
    company_logo_url: '',
    display_order: 0,
    is_active: true,
    source_site: 'int',
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        quote: testimonial.quote,
        author_name: testimonial.author_name,
        author_role: testimonial.author_role,
        company_name: testimonial.company_name,
        company_type: testimonial.company_type,
        company_type_label: testimonial.company_type_label,
        location: testimonial.location,
        flag_emoji: testimonial.flag_emoji,
        avatar_url: testimonial.avatar_url || '',
        company_logo_url: testimonial.company_logo_url || '',
        display_order: testimonial.display_order,
        is_active: testimonial.is_active,
        source_site: testimonial.source_site,
      });
    } else {
      setFormData({
        quote: '',
        author_name: '',
        author_role: '',
        company_name: '',
        company_type: 'multinational',
        company_type_label: 'Multinational',
        location: '',
        flag_emoji: '🌍',
        avatar_url: '',
        company_logo_url: '',
        display_order: 0,
        is_active: true,
        source_site: 'int',
      });
    }
  }, [testimonial, open]);

  const handleCompanyTypeChange = (value: string) => {
    const type = COMPANY_TYPES.find(t => t.value === value);
    setFormData(prev => ({
      ...prev,
      company_type: value,
      company_type_label: type?.label || value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && testimonial) {
        await updateMutation.mutateAsync({ id: testimonial.id, ...formData });
        toast.success('Testimonial updated successfully');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Testimonial created successfully');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error(isEditing ? 'Failed to update testimonial' : 'Failed to create testimonial');
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="quote">Quote *</Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
              placeholder="Enter the testimonial quote..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author_name">Author Name *</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                placeholder="e.g., John Smith"
                required
              />
            </div>
            <div>
              <Label htmlFor="author_role">Role/Title *</Label>
              <Input
                id="author_role"
                value={formData.author_role}
                onChange={(e) => setFormData(prev => ({ ...prev, author_role: e.target.value }))}
                placeholder="e.g., CEO, CFO"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder="e.g., Acme Corp"
                required
              />
            </div>
            <div>
              <Label htmlFor="company_type">Company Type *</Label>
              <Select value={formData.company_type} onValueChange={handleCompanyTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., United Kingdom"
                required
              />
            </div>
            <div>
              <Label htmlFor="flag_emoji">Flag</Label>
              <Select value={formData.flag_emoji} onValueChange={(v) => setFormData(prev => ({ ...prev, flag_emoji: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select flag" />
                </SelectTrigger>
                <SelectContent>
                  {FLAG_OPTIONS.map(flag => (
                    <SelectItem key={flag.value} value={flag.value}>
                      {flag.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
              min={0}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Active (visible on website)</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
