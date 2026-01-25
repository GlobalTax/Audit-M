import { useState } from 'react';
import { Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Switch } from '../ui/Switch';
import { TopBarLink } from '../types';

interface LinkEditorProps {
  links: TopBarLink[];
  onChange: (links: TopBarLink[]) => void;
  onSave: (id: string, data: Partial<TopBarLink>) => Promise<void>;
  onCreate: (data: Omit<TopBarLink, 'id'>) => Promise<TopBarLink>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (orderedIds: string[]) => Promise<void>;
}

export function LinkEditor({
  links,
  onChange,
  onSave,
  onCreate,
  onDelete,
}: LinkEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({
    label: '',
    href: '',
    isExternal: false,
  });

  const handleAdd = async () => {
    if (!newLink.label || !newLink.href) return;

    try {
      await onCreate({
        label: newLink.label,
        href: newLink.href,
        isExternal: newLink.isExternal,
        isActive: true,
        position: links.length,
      });
      setNewLink({ label: '', href: '', isExternal: false });
      setIsAdding(false);
    } catch (error) {
      console.error('Error creating link:', error);
    }
  };

  const handleFieldBlur = async (id: string, field: keyof TopBarLink, value: unknown) => {
    const link = links.find(l => l.id === id);
    if (!link || link[field] === value) return;

    try {
      await onSave(id, { [field]: value });
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };

  const handleLocalChange = (id: string, field: keyof TopBarLink, value: unknown) => {
    const updated = links.map(l => 
      l.id === id ? { ...l, [field]: value } : l
    );
    onChange(updated);
  };

  const handleToggleExternal = async (id: string, isExternal: boolean) => {
    handleLocalChange(id, 'isExternal', isExternal);
    await onSave(id, { isExternal });
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    handleLocalChange(id, 'isActive', isActive);
    await onSave(id, { isActive });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Secondary Links</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Link
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new link form */}
        {isAdding && (
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Label</Label>
                <Input
                  value={newLink.label}
                  onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                  placeholder="Link text"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={newLink.href}
                  onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
                  placeholder="/page or https://..."
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={newLink.isExternal}
                onCheckedChange={(checked) => setNewLink({ ...newLink, isExternal: checked })}
              />
              <Label>Opens in new tab (external)</Label>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Links list */}
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center gap-3 p-3 border rounded-lg bg-white dark:bg-gray-900"
          >
            <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
            
            <div className="flex-1 grid grid-cols-2 gap-3">
              <Input
                value={link.label}
                onChange={(e) => handleLocalChange(link.id, 'label', e.target.value)}
                onBlur={(e) => handleFieldBlur(link.id, 'label', e.target.value)}
                placeholder="Label"
              />
              <Input
                value={link.href}
                onChange={(e) => handleLocalChange(link.id, 'href', e.target.value)}
                onBlur={(e) => handleFieldBlur(link.id, 'href', e.target.value)}
                placeholder="URL"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={link.isExternal}
                onCheckedChange={(checked) => handleToggleExternal(link.id, checked)}
              />
              <ExternalLink className={`w-4 h-4 ${link.isExternal ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={link.isActive}
                onCheckedChange={(checked) => handleToggleActive(link.id, checked)}
              />
              <span className="text-xs text-gray-500">Active</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:text-red-700"
              onClick={() => onDelete(link.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {links.length === 0 && !isAdding && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No links added yet. Click "Add Link" to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
