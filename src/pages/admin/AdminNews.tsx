import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { TranslateNewsToCatalan } from '@/components/admin/news/TranslateNewsToCatalan';
import { TranslateNewsToEnglish } from '@/components/admin/news/TranslateNewsToEnglish';

export const AdminNews = () => {
  const { toast } = useToast();

  const { data: articles, isLoading, refetch } = useQuery({
    queryKey: ['admin-news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .update({ is_published: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Estado actualizado',
        description: `Artículo ${!currentStatus ? 'publicado' : 'despublicado'} correctamente`,
      });
      
      refetch();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-normal">Artículos de Noticias</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TranslateNewsToCatalan />
        <TranslateNewsToEnglish />
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Fecha de Publicación</TableHead>
              <TableHead>Publicado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles?.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title_es || article.title_ca || article.title_en}</TableCell>
                <TableCell>
                  <Badge variant="outline">{article.category}</Badge>
                </TableCell>
                <TableCell>
                  {article.published_at 
                    ? format(new Date(article.published_at), 'dd/MM/yyyy')
                    : 'Sin definir'}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={article.is_published}
                    onCheckedChange={() => togglePublished(article.id, article.is_published)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
