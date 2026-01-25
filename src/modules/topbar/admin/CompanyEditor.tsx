import { useState } from 'react';
import { Plus, Trash2, GripVertical, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Switch } from '../ui/Switch';
import { TopBarCompany } from '../types';

interface CompanyEditorProps {
  companies: TopBarCompany[];
  onChange: (companies: TopBarCompany[]) => void;
  onSave: (id: string, data: Partial<TopBarCompany>) => Promise<void>;
  onCreate: (data: Omit<TopBarCompany, 'id'>) => Promise<TopBarCompany>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (orderedIds: string[]) => Promise<void>;
}

export function CompanyEditor({
  companies,
  onChange,
  onSave,
  onCreate,
  onDelete,
}: CompanyEditorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    url: '',
    logoUrl: '',
    isCurrent: false,
  });

  const handleAdd = async () => {
    if (!newCompany.name || !newCompany.url) return;

    try {
      await onCreate({
        name: newCompany.name,
        url: newCompany.url,
        logoUrl: newCompany.logoUrl || null,
        isCurrent: newCompany.isCurrent,
        isActive: true,
        position: companies.length,
      });
      setNewCompany({ name: '', url: '', logoUrl: '', isCurrent: false });
      setIsAdding(false);
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  const handleFieldBlur = async (id: string, field: keyof TopBarCompany, value: unknown) => {
    const company = companies.find(c => c.id === id);
    if (!company || company[field] === value) return;

    try {
      await onSave(id, { [field]: value });
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleLocalChange = (id: string, field: keyof TopBarCompany, value: unknown) => {
    const updated = companies.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    );
    onChange(updated);
  };

  const handleSetCurrent = async (id: string) => {
    // First, unset all others
    for (const company of companies) {
      if (company.isCurrent && company.id !== id) {
        await onSave(company.id, { isCurrent: false });
      }
    }
    // Then set the new one
    await onSave(id, { isCurrent: true });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Group Companies</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Company
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new company form */}
        {isAdding && (
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Name</Label>
                <Input
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={newCompany.url}
                  onChange={(e) => setNewCompany({ ...newCompany, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div>
              <Label>Logo URL (optional)</Label>
              <Input
                value={newCompany.logoUrl}
                onChange={(e) => setNewCompany({ ...newCompany, logoUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={newCompany.isCurrent}
                onCheckedChange={(checked) => setNewCompany({ ...newCompany, isCurrent: checked })}
              />
              <Label>This is the current site</Label>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAdd}>Save</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Company list */}
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center gap-3 p-3 border rounded-lg bg-white dark:bg-gray-900"
          >
            <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
            
            <div className="flex-1 grid grid-cols-3 gap-3">
              <Input
                value={company.name}
                onChange={(e) => handleLocalChange(company.id, 'name', e.target.value)}
                onBlur={(e) => handleFieldBlur(company.id, 'name', e.target.value)}
                placeholder="Name"
              />
              <Input
                value={company.url}
                onChange={(e) => handleLocalChange(company.id, 'url', e.target.value)}
                onBlur={(e) => handleFieldBlur(company.id, 'url', e.target.value)}
                placeholder="URL"
              />
              <Input
                value={company.logoUrl || ''}
                onChange={(e) => handleLocalChange(company.id, 'logoUrl', e.target.value)}
                onBlur={(e) => handleFieldBlur(company.id, 'logoUrl', e.target.value || null)}
                placeholder="Logo URL"
              />
            </div>

            <Button
              variant={company.isCurrent ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => handleSetCurrent(company.id)}
              title={company.isCurrent ? 'Current site' : 'Set as current site'}
            >
              <Star className={`w-4 h-4 ${company.isCurrent ? 'fill-current' : ''}`} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:text-red-700"
              onClick={() => onDelete(company.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {companies.length === 0 && !isAdding && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No companies added yet. Click "Add Company" to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
