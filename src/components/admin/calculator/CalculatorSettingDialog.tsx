import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateCalculatorSetting, useCreateCalculatorSetting, CalculatorSetting, CalculatorSettingInput } from "@/hooks/useCalculatorSettings";
import { AlertCircle } from "lucide-react";

interface CalculatorSettingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setting?: CalculatorSetting | null;
  mode: 'edit' | 'create';
  defaultCategory?: 'timeline' | 'cost' | 'general';
  defaultEntityType?: string;
}

const ENTITY_TYPES = [
  { value: 'sl', label: 'SL (Sociedad Limitada)' },
  { value: 'sa', label: 'SA (Sociedad Anónima)' },
  { value: 'branch', label: 'Branch Office' },
  { value: 'subsidiary', label: 'Subsidiary' },
  { value: 'global', label: 'Global (applies to all)' },
];

const CATEGORIES = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'cost', label: 'Cost' },
  { value: 'general', label: 'General' },
];

export function CalculatorSettingDialog({
  open,
  onOpenChange,
  setting,
  mode,
  defaultCategory = 'cost',
  defaultEntityType = 'sl',
}: CalculatorSettingDialogProps) {
  const updateMutation = useUpdateCalculatorSetting();
  const createMutation = useCreateCalculatorSetting();
  
  const [formData, setFormData] = useState({
    category: defaultCategory as 'timeline' | 'cost' | 'general',
    entity_type: defaultEntityType as 'sl' | 'sa' | 'branch' | 'subsidiary' | 'global',
    item_key: '',
    item_label: '',
    item_notes: '',
    min_value: 0,
    max_value: 0,
    display_order: 0,
    is_active: true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (setting && mode === 'edit') {
      setFormData({
        category: setting.category,
        entity_type: (setting.entity_type || 'global') as 'sl' | 'sa' | 'branch' | 'subsidiary' | 'global',
        item_key: setting.item_key,
        item_label: setting.item_label,
        item_notes: setting.item_notes || '',
        min_value: Number(setting.min_value),
        max_value: Number(setting.max_value),
        display_order: setting.display_order,
        is_active: setting.is_active,
      });
    } else if (mode === 'create') {
      setFormData({
        category: defaultCategory,
        entity_type: defaultEntityType as 'sl' | 'sa' | 'branch' | 'subsidiary' | 'global',
        item_key: '',
        item_label: '',
        item_notes: '',
        min_value: 0,
        max_value: 0,
        display_order: 0,
        is_active: true,
      });
    }
    setErrors({});
  }, [setting, mode, defaultCategory, defaultEntityType, open]);
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.item_key.trim()) {
      newErrors.item_key = 'Key is required';
    }
    
    if (!formData.item_label.trim()) {
      newErrors.item_label = 'Label is required';
    }
    
    if (formData.min_value < 0) {
      newErrors.min_value = 'Min value must be >= 0';
    }
    
    if (formData.max_value < 0) {
      newErrors.max_value = 'Max value must be >= 0';
    }
    
    if (formData.min_value > formData.max_value) {
      newErrors.max_value = 'Max must be >= Min';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validate()) return;
    
    const payload: CalculatorSettingInput = {
      category: formData.category,
      entity_type: formData.entity_type === 'global' ? null : formData.entity_type,
      item_key: formData.item_key.trim(),
      item_label: formData.item_label.trim(),
      item_notes: formData.item_notes.trim() || null,
      min_value: formData.min_value,
      max_value: formData.max_value,
      display_order: formData.display_order,
      is_active: formData.is_active,
      conditions: null,
    };
    
    if (mode === 'edit' && setting) {
      await updateMutation.mutateAsync({ id: setting.id, ...payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    
    onOpenChange(false);
  };
  
  const formatPreview = () => {
    if (formData.category === 'cost') {
      return `€${formData.min_value.toLocaleString()} – €${formData.max_value.toLocaleString()}`;
    }
    return `${formData.min_value} – ${formData.max_value} weeks`;
  };
  
  const isPending = updateMutation.isPending || createMutation.isPending;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Setting' : 'Create Setting'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {mode === 'create' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, category: v as 'timeline' | 'cost' | 'general' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Entity Type</Label>
                  <Select
                    value={formData.entity_type}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, entity_type: v as 'sl' | 'sa' | 'branch' | 'subsidiary' | 'global' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ENTITY_TYPES.map(e => (
                        <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Key (unique identifier)</Label>
                <Input
                  value={formData.item_key}
                  onChange={(e) => setFormData(prev => ({ ...prev, item_key: e.target.value }))}
                  placeholder="e.g., notary_fees"
                />
                {errors.item_key && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.item_key}
                  </p>
                )}
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label>Label (visible name)</Label>
            <Input
              value={formData.item_label}
              onChange={(e) => setFormData(prev => ({ ...prev, item_label: e.target.value }))}
              placeholder="e.g., Notary fees"
            />
            {errors.item_label && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.item_label}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Notes / Description</Label>
            <Textarea
              value={formData.item_notes}
              onChange={(e) => setFormData(prev => ({ ...prev, item_notes: e.target.value }))}
              placeholder="Additional details shown to users..."
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Value</Label>
              <Input
                type="number"
                value={formData.min_value}
                onChange={(e) => setFormData(prev => ({ ...prev, min_value: Number(e.target.value) }))}
                min={0}
              />
              {errors.min_value && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.min_value}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Max Value</Label>
              <Input
                type="number"
                value={formData.max_value}
                onChange={(e) => setFormData(prev => ({ ...prev, max_value: Number(e.target.value) }))}
                min={0}
              />
              {errors.max_value && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.max_value}
                </p>
              )}
            </div>
          </div>
          
          {/* Preview */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">Preview</p>
            <p className="font-medium">{formData.item_label || 'Label'}</p>
            <p className="text-lg font-bold text-primary">{formatPreview()}</p>
            {formData.item_notes && (
              <p className="text-sm text-muted-foreground mt-1">{formData.item_notes}</p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: Number(e.target.value) }))}
                className="w-20"
              />
            </div>
            
            <div className="flex items-center gap-2 pt-6">
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label>Active</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
