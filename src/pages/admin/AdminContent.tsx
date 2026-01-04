import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAllPageContent, useDeletePageContent } from '@/hooks/usePageContent';
import { FileText, Plus, Edit, Trash2, Building2, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ContentEditorDialog } from '@/components/admin/content/ContentEditorDialog';
import { PageContent } from '@/types/pageContent';
import { LogosManager } from '@/components/admin/LogosManager';
import { NetworksManager } from '@/components/admin/NetworksManager';
import { toast } from 'sonner';

const pages = [
  { key: 'home', label: 'Home', icon: '🏠', description: 'Includes KPIs, Hero, About Us' },
  { key: 'about', label: 'About', icon: '👥' },
  { key: 'methodology', label: 'Methodology', icon: '📋' },
  { key: 'strategy', label: 'Strategy', icon: '🎯' },
  { key: 'logos', label: 'Logos', icon: '🏢', description: 'Manage client and technology logos' },
];

export default function AdminContent() {
  const { data: allContent, isLoading } = useAllPageContent();
  const deleteMutation = useDeletePageContent();
  const [selectedPage, setSelectedPage] = useState('home');
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const getPageContent = (pageKey: string) => {
    const content = allContent?.filter(c => c.page_key === pageKey) || [];
    
    // Group by section_key to avoid showing duplicates (one per language)
    const groupedSections = content.reduce((acc, item) => {
      const key = item.section_key;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, PageContent[]>);

    // Return one representative per section with language info
    return Object.entries(groupedSections).map(([sectionKey, versions]) => {
      const esVersion = versions.find(v => (v as any).language === 'es') || versions[0];
      return {
        ...esVersion,
        languageVersions: versions,
      };
    });
  };

  const hasLanguage = (versions: PageContent[], lang: string) => {
    return versions.some(v => (v as any).language === lang);
  };

  const getLanguagesBadge = (versions: PageContent[]) => {
    const languages = ['es', 'ca', 'en'];
    const hasAll = languages.every(lang => hasLanguage(versions, lang));
    const hasEs = hasLanguage(versions, 'es');

    if (hasAll) return { variant: 'default' as const, text: '✅ 3 languages', color: 'success' };
    if (hasEs) return { variant: 'secondary' as const, text: '⚠️ ES only', color: 'warning' };
    return { variant: 'destructive' as const, text: '❌ No ES', color: 'error' };
  };

  const handleEdit = (content: PageContent & { languageVersions?: PageContent[] }) => {
    setEditingContent(content);
    setIsEditorOpen(true);
  };

  const handleCreate = (pageKey: string) => {
    setEditingContent({
      id: '',
      page_key: pageKey,
      section_key: '',
      content: {},
      is_active: true,
      display_order: 0,
      created_at: '',
      updated_at: '',
    } as any);
    setIsEditorOpen(true);
  };

  const handleDelete = async (versions: PageContent[]) => {
    if (!confirm('Are you sure you want to delete this section in ALL languages?')) return;
    
    try {
      for (const version of versions) {
        await deleteMutation.mutateAsync(version.id);
      }
      toast.success('Section deleted in all languages');
    } catch (error) {
      toast.error('Error deleting section');
      console.error(error);
    }
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-muted-foreground mt-2">
              Edit the content of all website pages
            </p>
          </div>
          <Button onClick={() => handleCreate(selectedPage)}>
            <Plus className="w-4 h-4 mr-2" />
            New Section
          </Button>
        </div>

        <Tabs value={selectedPage} onValueChange={setSelectedPage}>
          <TabsList className="grid w-full grid-cols-5">
            {pages.map((page) => (
              <TabsTrigger key={page.key} value={page.key}>
                <span className="mr-2">{page.icon}</span>
                {page.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {pages.map((page) => {
            // Special handling for logos page
            if (page.key === 'logos') {
              return (
                <TabsContent key={page.key} value={page.key} className="space-y-4">
                  <Tabs defaultValue="clientes" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="clientes">
                        <Building2 className="w-4 h-4 mr-2" />
                        Clients
                      </TabsTrigger>
                      <TabsTrigger value="tecnologia">
                        <Building2 className="w-4 h-4 mr-2" />
                        Technology
                      </TabsTrigger>
                      <TabsTrigger value="redes">
                        <Globe className="w-4 h-4 mr-2" />
                        Networks
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="clientes" className="mt-6">
                      <LogosManager
                        sectionKey="clientes"
                        title="Client Logos"
                        description="Manage logos that appear in the client carousel"
                      />
                    </TabsContent>

                    <TabsContent value="tecnologia" className="mt-6">
                      <LogosManager
                        sectionKey="tecnologia"
                        title="Technology Logos"
                        description="Manage logos that appear in the technology grid"
                      />
                    </TabsContent>

                    <TabsContent value="redes" className="mt-6">
                      <NetworksManager
                        title="International Networks"
                        description="Manage international network logos and data (Home)"
                      />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              );
            }

            // Normal page content handling
            return (
              <TabsContent key={page.key} value={page.key} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{page.label} Sections</CardTitle>
                    <CardDescription>
                      Manage the different sections of the {page.label} page
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="text-center py-8 text-muted-foreground">
                        Loading content...
                      </div>
                    ) : getPageContent(page.key).length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          No sections created for this page
                        </p>
                        <Button 
                          onClick={() => handleCreate(page.key)} 
                          className="mt-4"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create First Section
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {getPageContent(page.key)
                          .sort((a, b) => a.display_order - b.display_order)
                          .map((content: any) => (
                            <Card key={content.id}>
                              <CardContent className="flex items-center justify-between p-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">
                                      {content.section_key}
                                    </h3>
                                    <Badge variant={content.is_active ? 'default' : 'secondary'}>
                                      {content.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                    <Badge variant="outline">
                                      Order: {content.display_order}
                                    </Badge>
                                    <Badge variant={getLanguagesBadge(content.languageVersions).variant}>
                                      {getLanguagesBadge(content.languageVersions).text}
                                    </Badge>
                                    <div className="flex gap-1">
                                      {hasLanguage(content.languageVersions, 'es') && <Badge variant="outline" className="text-xs">ES</Badge>}
                                      {hasLanguage(content.languageVersions, 'ca') && <Badge variant="outline" className="text-xs">CA</Badge>}
                                      {hasLanguage(content.languageVersions, 'en') && <Badge variant="outline" className="text-xs">EN</Badge>}
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {content.content.title || content.content.overline || 'No title'}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(content)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(content.languageVersions)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>

        <ContentEditorDialog
          open={isEditorOpen}
          onOpenChange={setIsEditorOpen}
          content={editingContent}
          onSave={() => {
            setIsEditorOpen(false);
            setEditingContent(null);
          }}
        />
      </div>
  );
}
