import { useState } from 'react';
import { useContentBlocks, useCreateContentBlock, useUpdateContentBlock, useDeleteContentBlock, ContentSection, ContentBlock } from '@/hooks/useContentBlocks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, FileText, ExternalLink, Tag, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const SECTIONS: { value: ContentSection; label: string }[] = [
  { value: 'home', label: 'Home' },
  { value: 'about', label: 'About' },
  { value: 'services', label: 'Services' },
  { value: 'team', label: 'Team' },
  { value: 'resources', label: 'Resources' },
  { value: 'contact', label: 'Contact' },
  { value: 'other', label: 'Other' },
];

const sectionColors: Record<ContentSection, string> = {
  home: 'bg-blue-100 text-blue-800',
  about: 'bg-purple-100 text-purple-800',
  services: 'bg-green-100 text-green-800',
  team: 'bg-orange-100 text-orange-800',
  resources: 'bg-pink-100 text-pink-800',
  contact: 'bg-cyan-100 text-cyan-800',
  other: 'bg-gray-100 text-gray-800',
};

interface BlockFormData {
  title: string;
  section: ContentSection;
  markdown: string;
  source_url: string;
  tags: string;
}

const emptyFormData: BlockFormData = {
  title: '',
  section: 'home',
  markdown: '',
  source_url: '',
  tags: '',
};

export default function DeckStudioContent() {
  const [filterSection, setFilterSection] = useState<ContentSection | 'all'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [formData, setFormData] = useState<BlockFormData>(emptyFormData);

  const { data: blocks, isLoading } = useContentBlocks(filterSection === 'all' ? undefined : filterSection);
  const createBlock = useCreateContentBlock();
  const updateBlock = useUpdateContentBlock();
  const deleteBlock = useDeleteContentBlock();

  const handleOpenCreate = () => {
    setEditingBlock(null);
    setFormData(emptyFormData);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (block: ContentBlock) => {
    setEditingBlock(block);
    setFormData({
      title: block.title || '',
      section: block.section,
      markdown: block.markdown,
      source_url: block.source_url || '',
      tags: block.tags?.join(', ') || '',
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.markdown.trim()) {
      toast.error('Content is required');
      return;
    }

    const payload = {
      title: formData.title || null,
      section: formData.section,
      markdown: formData.markdown,
      source_url: formData.source_url || null,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
      language: 'en',
    };

    try {
      if (editingBlock) {
        await updateBlock.mutateAsync({ id: editingBlock.id, ...payload });
        toast.success('Content block updated');
      } else {
        await createBlock.mutateAsync(payload);
        toast.success('Content block created');
      }
      setIsDialogOpen(false);
      setFormData(emptyFormData);
      setEditingBlock(null);
    } catch (error) {
      toast.error('Failed to save content block');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBlock.mutateAsync(id);
      toast.success('Content block deleted');
    } catch (error) {
      toast.error('Failed to delete content block');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal text-slate-900">Content Library</h1>
          <p className="text-slate-500 mt-1">
            Manage content blocks for your presentations
          </p>
        </div>
        <Button onClick={handleOpenCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <Select value={filterSection} onValueChange={(v) => setFilterSection(v as ContentSection | 'all')}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sections</SelectItem>
              {SECTIONS.map(s => (
                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Badge variant="secondary" className="font-normal">
          {blocks?.length || 0} blocks
        </Badge>
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-slate-100 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : blocks?.length === 0 ? (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <FileText className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No content blocks yet</h3>
            <p className="text-slate-500 mb-4">
              Start adding content from your website to build presentations
            </p>
            <Button onClick={handleOpenCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Add your first block
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blocks?.map(block => (
            <Card key={block.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge className={sectionColors[block.section]}>
                    {block.section}
                  </Badge>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(block)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete content block?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this content block.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(block.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <CardTitle className="text-base font-medium line-clamp-1">
                  {block.title || 'Untitled'}
                </CardTitle>
                {block.source_url && (
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <ExternalLink className="h-3 w-3" />
                    <span className="truncate">{block.source_url}</span>
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 line-clamp-4 whitespace-pre-wrap">
                  {block.markdown}
                </p>
                {block.tags && block.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {block.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {block.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs font-normal">
                        +{block.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingBlock ? 'Edit Content Block' : 'Add Content Block'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Block title"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <Select value={formData.section} onValueChange={(v) => setFormData(prev => ({ ...prev, section: v as ContentSection }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTIONS.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Source URL (optional)</Label>
              <Input
                placeholder="https://global.nrro.es/..."
                value={formData.source_url}
                onChange={e => setFormData(prev => ({ ...prev, source_url: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Content (Markdown)</Label>
              <Textarea
                placeholder="Enter content..."
                className="min-h-[200px] font-mono text-sm"
                value={formData.markdown}
                onChange={e => setFormData(prev => ({ ...prev, markdown: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Tags (comma-separated)</Label>
              <Input
                placeholder="spain, tax, services"
                value={formData.tags}
                onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={createBlock.isPending || updateBlock.isPending}>
              {editingBlock ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
