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
  { key: 'home', label: 'Inicio', icon: '🏠', description: 'Incluye KPIs, Hero, Sobre Nosotros' },
  { key: 'about', label: 'Sobre Nosotros', icon: '👥' },
  { key: 'methodology', label: 'Metodología', icon: '📋' },
  { key: 'strategy', label: 'Estrategia', icon: '🎯' },
  { key: 'logos', label: 'Logos', icon: '🏢', description: 'Gestiona logos de clientes y tecnología' },
];

export default function AdminContent() {
  const { data: allContent, isLoading } = useAllPageContent();
  const deleteMutation = useDeletePageContent();
  const [selectedPage, setSelectedPage] = useState('home');
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const getPageContent = (pageKey: string) => {
    const content = allContent?.filter(c => c.page_key === pageKey) || [];
    
    const groupedSections = content.reduce((acc, item) => {
      const key = item.section_key;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, PageContent[]>);

    return Object.entries(groupedSections).map(([sectionKey, versions]) => {
      const esVersion = versions.find(v => (v as any).language === 'es') || versions[0];
      return { ...esVersion, languageVersions: versions };
    });
  };

  const hasLanguage = (versions: PageContent[], lang: string) => {
    return versions.some(v => (v as any).language === lang);
  };

  const getLanguagesBadge = (versions: PageContent[]) => {
    const languages = ['es', 'ca', 'en'];
    const hasAll = languages.every(lang => hasLanguage(versions, lang));
    const hasEs = hasLanguage(versions, 'es');

    if (hasAll) return { variant: 'default' as const, text: '✅ 3 idiomas' };
    if (hasEs) return { variant: 'secondary' as const, text: '⚠️ Solo ES' };
    return { variant: 'destructive' as const, text: '❌ Sin ES' };
  };

  const handleEdit = (content: PageContent & { languageVersions?: PageContent[] }) => {
    setEditingContent(content);
    setIsEditorOpen(true);
  };

  const handleCreate = (pageKey: string) => {
    setEditingContent({
      id: '', page_key: pageKey, section_key: '', content: {},
      is_active: true, display_order: 0, created_at: '', updated_at: '',
    } as any);
    setIsEditorOpen(true);
  };

  const handleDelete = async (versions: PageContent[]) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta sección en TODOS los idiomas?')) return;
    
    try {
      for (const version of versions) {
        await deleteMutation.mutateAsync(version.id);
      }
      toast.success('Sección eliminada en todos los idiomas');
    } catch (error) {
      toast.error('Error al eliminar la sección');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal">Gestión de Contenido</h1>
          <p className="text-muted-foreground mt-2">
            Edita el contenido de todas las páginas de la web
          </p>
        </div>
        <Button onClick={() => handleCreate(selectedPage)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Sección
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
          if (page.key === 'logos') {
            return (
              <TabsContent key={page.key} value={page.key} className="space-y-4">
                <Tabs defaultValue="clientes" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="clientes">
                      <Building2 className="w-4 h-4 mr-2" />
                      Clientes
                    </TabsTrigger>
                    <TabsTrigger value="tecnologia">
                      <Building2 className="w-4 h-4 mr-2" />
                      Tecnología
                    </TabsTrigger>
                    <TabsTrigger value="redes">
                      <Globe className="w-4 h-4 mr-2" />
                      Redes
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="clientes" className="mt-6">
                    <LogosManager
                      sectionKey="clientes"
                      title="Logos de Clientes"
                      description="Gestiona los logos que aparecen en el carrusel de clientes"
                    />
                  </TabsContent>
                  <TabsContent value="tecnologia" className="mt-6">
                    <LogosManager
                      sectionKey="tecnologia"
                      title="Logos de Tecnología"
                      description="Gestiona los logos que aparecen en la cuadrícula de tecnología"
                    />
                  </TabsContent>
                  <TabsContent value="redes" className="mt-6">
                    <NetworksManager
                      title="Redes Internacionales"
                      description="Gestiona los logos y datos de redes internacionales (Inicio)"
                    />
                  </TabsContent>
                </Tabs>
              </TabsContent>
            );
          }

          return (
            <TabsContent key={page.key} value={page.key} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Secciones de {page.label}</CardTitle>
                  <CardDescription>
                    Gestiona las diferentes secciones de la página {page.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Cargando contenido...
                    </div>
                  ) : getPageContent(page.key).length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No hay secciones creadas para esta página
                      </p>
                      <Button onClick={() => handleCreate(page.key)} className="mt-4" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Primera Sección
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
                                  <h3 className="font-medium">{content.section_key}</h3>
                                  <Badge variant={content.is_active ? 'default' : 'secondary'}>
                                    {content.is_active ? 'Activo' : 'Inactivo'}
                                  </Badge>
                                  <Badge variant="outline">Orden: {content.display_order}</Badge>
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
                                  {content.content.title || content.content.overline || 'Sin título'}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(content)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(content.languageVersions)}>
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
        onSave={() => { setIsEditorOpen(false); setEditingContent(null); }}
      />
    </div>
  );
}
