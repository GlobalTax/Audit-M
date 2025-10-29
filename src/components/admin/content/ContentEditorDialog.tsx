import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { PageContent } from '@/types/pageContent';
import { useCreatePageContent, useUpdatePageContent } from '@/hooks/usePageContent';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContentEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: PageContent | null;
  onSave: () => void;
}

const sectionTypes = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'stats', label: 'Statistics/KPIs' },
  { value: 'about', label: 'About Section' },
  { value: 'logos', label: 'Logos Grid' },
  { value: 'values', label: 'Values/Benefits' },
  { value: 'process', label: 'Process Steps' },
  { value: 'featured_services', label: 'Featured Services' },
  { value: 'custom', label: 'Custom Section' },
];

export function ContentEditorDialog({ open, onOpenChange, content, onSave }: ContentEditorDialogProps) {
  const [sectionKey, setSectionKey] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [jsonContent, setJsonContent] = useState('{}');
  const [jsonError, setJsonError] = useState('');

  const createMutation = useCreatePageContent();
  const updateMutation = useUpdatePageContent();

  useEffect(() => {
    if (content) {
      setSectionKey(content.section_key);
      setDisplayOrder(content.display_order);
      setIsActive(content.is_active);
      setJsonContent(JSON.stringify(content.content, null, 2));
    } else {
      setSectionKey('');
      setDisplayOrder(0);
      setIsActive(true);
      setJsonContent('{}');
    }
    setJsonError('');
  }, [content]);

  const validateJson = (text: string) => {
    try {
      JSON.parse(text);
      setJsonError('');
      return true;
    } catch (e) {
      setJsonError('JSON inválido: ' + (e as Error).message);
      return false;
    }
  };

  const handleSave = async () => {
    if (!content) return;
    if (!validateJson(jsonContent)) return;

    const parsedContent = JSON.parse(jsonContent);

    try {
      if (content.id) {
        // Update existing
        await updateMutation.mutateAsync({
          id: content.id,
          content: {
            section_key: sectionKey,
            content: parsedContent,
            is_active: isActive,
            display_order: displayOrder,
          },
        });
        toast.success('Contenido actualizado correctamente');
      } else {
        // Create new
        await createMutation.mutateAsync({
          page_key: content.page_key,
          section_key: sectionKey,
          content: parsedContent,
          is_active: isActive,
          display_order: displayOrder,
        });
        toast.success('Contenido creado correctamente');
      }
      onSave();
    } catch (error) {
      toast.error('Error al guardar: ' + (error as Error).message);
    }
  };

  const getTemplateForSection = (type: string) => {
    const templates: Record<string, any> = {
      hero: {
        overline: 'Overline text',
        title: 'Main Title',
        subtitle: 'Subtitle text',
        cta_primary: { text: 'Primary Button', link: '/link' },
        cta_secondary: { text: 'Secondary Button', link: '/link' },
      },
      stats: {
        stats: [
          { label: 'Label 1', value: '100+' },
          { label: 'Label 2', value: '200+' },
        ],
      },
      about: {
        overline: 'About',
        title: 'Title',
        paragraphs: ['Paragraph 1', 'Paragraph 2'],
        cta: { text: 'Learn More', link: '/link' },
      },
      logos: {
        overline: 'Partners',
        title: 'Our Partners',
        logos: [
          { name: 'Company 1', logo_url: 'https://...', website_url: 'https://...' },
        ],
      },
      values: {
        overline: 'Values',
        title: 'Our Values',
        values: [
          { icon: 'Users', title: 'Value 1', description: 'Description' },
        ],
      },
      process: {
        overline: 'Process',
        title: 'How We Work',
        steps: [
          { icon: 'Target', title: 'Step 1', description: 'Description' },
        ],
      },
    };
    return templates[type] || {};
  };

  const handleTemplateLoad = (type: string) => {
    const template = getTemplateForSection(type);
    setJsonContent(JSON.stringify(template, null, 2));
    setSectionKey(type);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {content?.id ? 'Editar Sección' : 'Nueva Sección'}
          </DialogTitle>
          <DialogDescription>
            {content?.page_key && `Página: ${content.page_key}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="section-type">Tipo de Sección</Label>
              <Select onValueChange={handleTemplateLoad} value={sectionKey}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  {sectionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="section-key">Clave de Sección</Label>
              <Input
                id="section-key"
                value={sectionKey}
                onChange={(e) => setSectionKey(e.target.value)}
                placeholder="ej: hero, about, stats"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="display-order">Orden de Visualización</Label>
              <Input
                id="display-order"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="is-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="is-active">Sección Activa</Label>
            </div>
          </div>

          <div>
            <Label htmlFor="content-json">Contenido (JSON)</Label>
            <Textarea
              id="content-json"
              value={jsonContent}
              onChange={(e) => {
                setJsonContent(e.target.value);
                validateJson(e.target.value);
              }}
              rows={20}
              className="font-mono text-sm"
              placeholder='{"title": "Example", "description": "..."}'
            />
            {jsonError && (
              <p className="text-sm text-destructive mt-2">{jsonError}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!!jsonError}>
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
