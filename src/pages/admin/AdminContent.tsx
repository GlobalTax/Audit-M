import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAllPageContent } from '@/hooks/usePageContent';
import { FileText, Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ContentEditorDialog } from '@/components/admin/content/ContentEditorDialog';
import { PageContent } from '@/types/pageContent';
import { LogosManager } from '@/components/admin/LogosManager';

const pages = [
  { key: 'home', label: 'Home', icon: '🏠', description: 'Incluye KPIs, Hero, Sobre Nosotros' },
  { key: 'about', label: 'About', icon: '👥' },
  { key: 'methodology', label: 'Methodology', icon: '📋' },
  { key: 'strategy', label: 'Strategy', icon: '🎯' },
  { key: 'logos', label: 'Logos', icon: '🏢', description: 'Gestiona los logos de clientes y tecnología' },
];

export default function AdminContent() {
  const { data: allContent, isLoading } = useAllPageContent();
  const [selectedPage, setSelectedPage] = useState('home');
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const getPageContent = (pageKey: string) => {
    return allContent?.filter(c => c.page_key === pageKey) || [];
  };

  const handleEdit = (content: PageContent) => {
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
    });
    setIsEditorOpen(true);
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Contenido</h1>
            <p className="text-muted-foreground mt-2">
              Edita el contenido de todas las páginas del sitio web
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
            // Special handling for logos page
            if (page.key === 'logos') {
              return (
                <TabsContent key={page.key} value={page.key} className="space-y-4">
                  <Tabs defaultValue="clientes" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="clientes">
                        <Building2 className="w-4 h-4 mr-2" />
                        Clientes (Carrusel)
                      </TabsTrigger>
                      <TabsTrigger value="tecnologia">
                        <Building2 className="w-4 h-4 mr-2" />
                        Tecnología (Grid)
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
                        description="Gestiona los logos que aparecen en la grid de tecnologías"
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
                        <Button 
                          onClick={() => handleCreate(page.key)} 
                          className="mt-4"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Crear Primera Sección
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {getPageContent(page.key)
                          .sort((a, b) => a.display_order - b.display_order)
                          .map((content) => (
                            <Card key={content.id}>
                              <CardContent className="flex items-center justify-between p-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">
                                      {content.section_key}
                                    </h3>
                                    <Badge variant={content.is_active ? 'default' : 'secondary'}>
                                      {content.is_active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                    <Badge variant="outline">
                                      Orden: {content.display_order}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {content.content.title || content.content.overline || 'Sin título'}
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
                                    onClick={() => {
                                      if (confirm('¿Seguro que quieres eliminar esta sección?')) {
                                        // TODO: implement delete
                                      }
                                    }}
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
