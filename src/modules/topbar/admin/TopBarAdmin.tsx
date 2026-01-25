import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTopBar } from '../hooks/useTopBar';
import { TopBar } from '../components/TopBar';
import { CompanyEditor } from './CompanyEditor';
import { LinkEditor } from './LinkEditor';
import { ConfigEditor } from './ConfigEditor';
import { TopBarConfig, TopBarCompany, TopBarLink } from '../types';

export function TopBarAdmin() {
  const {
    data,
    isLoading,
    updateConfig,
    createCompany,
    updateCompany,
    deleteCompany,
    reorderCompanies,
    createLink,
    updateLink,
    deleteLink,
    reorderLinks,
  } = useTopBar();

  // Local editing state for live preview
  const [editingConfig, setEditingConfig] = useState<TopBarConfig>(data.config);
  const [editingCompanies, setEditingCompanies] = useState<TopBarCompany[]>(data.companies);
  const [editingLinks, setEditingLinks] = useState<TopBarLink[]>(data.links);
  const [isSaving, setIsSaving] = useState(false);

  // Sync local state when data changes from DB
  useEffect(() => {
    setEditingConfig(data.config);
    setEditingCompanies(data.companies);
    setEditingLinks(data.links);
  }, [data]);

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      await updateConfig(editingConfig);
    } catch (error) {
      console.error('Error saving config:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">TopBar Configuration</h1>
        <p className="text-muted-foreground mt-1">
          Manage the top navigation bar across all sites
        </p>
      </div>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative border rounded-lg overflow-hidden">
            <div className="relative h-10">
              <TopBar 
                data={{
                  config: editingConfig,
                  companies: editingCompanies,
                  links: editingLinks.filter(l => l.isActive),
                }}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This preview shows how the TopBar will appear on desktop. It's hidden on mobile.
          </p>
        </CardContent>
      </Card>

      {/* Company Editor */}
      <CompanyEditor
        companies={editingCompanies}
        onChange={setEditingCompanies}
        onSave={updateCompany}
        onCreate={createCompany}
        onDelete={deleteCompany}
        onReorder={reorderCompanies}
      />

      {/* Link Editor */}
      <LinkEditor
        links={editingLinks}
        onChange={setEditingLinks}
        onSave={updateLink}
        onCreate={createLink}
        onDelete={deleteLink}
        onReorder={reorderLinks}
      />

      {/* Config Editor */}
      <ConfigEditor
        config={editingConfig}
        onChange={setEditingConfig}
        onSave={handleSaveConfig}
        isSaving={isSaving}
      />
    </div>
  );
}
