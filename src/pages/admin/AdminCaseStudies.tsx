import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy } from '@/types/caseStudy';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2, Plus, Search, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { CaseStudyFormDialog } from '@/components/admin/case-studies/CaseStudyFormDialog';
import { CaseStudyPreviewModal } from '@/components/admin/case-studies/CaseStudyPreviewModal';
import { TranslateCaseStudiesToCatalan } from '@/components/admin/case-studies/TranslateCaseStudiesToCatalan';
import { TranslateCaseStudiesToEnglish } from '@/components/admin/case-studies/TranslateCaseStudiesToEnglish';

export function AdminCaseStudies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [caseStudyToDelete, setCaseStudyToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['admin-case-studies', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,client_name.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map(item => ({
        ...item,
        metrics: Array.isArray(item.metrics) ? item.metrics : [],
        timeline: Array.isArray(item.timeline) ? item.timeline : [],
        gallery: Array.isArray(item.gallery) ? item.gallery : [],
        related_services: Array.isArray(item.related_services) ? item.related_services : [],
        tags: Array.isArray(item.tags) ? item.tags : [],
      })) as unknown as CaseStudy[];
    },
  });

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success('Status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-case-studies'] });
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Case study deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-case-studies'] });
      setCaseStudyToDelete(null);
    } catch (error) {
      toast.error('Error deleting case study');
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsFormOpen(true);
  };

  const handlePreview = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setIsPreviewOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCaseStudy(null);
    setIsFormOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
      published: 'default',
      draft: 'secondary',
      review: 'outline',
      archived: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal">Case Studies</h1>
          <p className="text-foreground/70 mt-2">
            Manage client success stories
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Case Study
        </Button>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TranslateCaseStudiesToCatalan />
          <TranslateCaseStudiesToEnglish />
        </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
          <Input
            placeholder="Search case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caseStudies && caseStudies.length > 0 ? (
              caseStudies.map((caseStudy) => (
                <TableRow key={caseStudy.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {caseStudy.client_logo_url && (
                        <img
                          src={caseStudy.client_logo_url}
                          alt={caseStudy.client_name}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                      <span className="font-medium">{caseStudy.client_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{caseStudy.hero_title}</TableCell>
                  <TableCell>{caseStudy.client_industry}</TableCell>
                  <TableCell>{caseStudy.primary_service || '-'}</TableCell>
                  <TableCell>{getStatusBadge(caseStudy.status)}</TableCell>
                  <TableCell>
                    <Switch
                      checked={caseStudy.is_featured}
                      onCheckedChange={() => toggleFeatured(caseStudy.id, caseStudy.is_featured)}
                    />
                  </TableCell>
                  <TableCell>{caseStudy.view_count}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(caseStudy)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(caseStudy)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCaseStudyToDelete(caseStudy.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-foreground/60">
                  No case studies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CaseStudyFormDialog
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCaseStudy(null);
        }}
        caseStudy={selectedCaseStudy}
      />

      <CaseStudyPreviewModal
        open={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedCaseStudy(null);
        }}
        caseStudy={selectedCaseStudy}
      />

      <AlertDialog open={!!caseStudyToDelete} onOpenChange={() => setCaseStudyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the case study.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => caseStudyToDelete && handleDelete(caseStudyToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
