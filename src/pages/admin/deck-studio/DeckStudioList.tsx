import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDecks, useCreateDeck, useDeleteDeck, DeckGoal, Deck } from '@/hooks/useDecks';
import { useDefaultBrandKit } from '@/hooks/useBrandKits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Presentation, MoreHorizontal, Pencil, Trash2, Download, Eye, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { format } from 'date-fns';

const GOALS: { value: DeckGoal; label: string }[] = [
  { value: 'corporate', label: 'Corporate Overview' },
  { value: 'sales', label: 'Sales Pitch' },
  { value: 'investor', label: 'Investor Deck' },
  { value: 'sector', label: 'Sector Specific' },
  { value: 'custom', label: 'Custom' },
];

const statusColors: Record<string, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  ready: 'bg-green-100 text-green-800',
  exported: 'bg-blue-100 text-blue-800',
};

export default function DeckStudioList() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckGoal, setNewDeckGoal] = useState<DeckGoal>('corporate');
  const [newDeckAudience, setNewDeckAudience] = useState('');

  const { data: decks, isLoading } = useDecks();
  const { data: defaultBrandKit } = useDefaultBrandKit();
  const createDeck = useCreateDeck();
  const deleteDeck = useDeleteDeck();

  const handleCreateDeck = async () => {
    if (!newDeckName.trim()) {
      toast.error('Please enter a deck name');
      return;
    }

    try {
      const result = await createDeck.mutateAsync({
        name: newDeckName,
        goal: newDeckGoal,
        audience: newDeckAudience || null,
        language: 'en',
        status: 'draft',
        brand_kit_id: defaultBrandKit?.id || null,
      });
      toast.success('Deck created');
      setIsDialogOpen(false);
      setNewDeckName('');
      setNewDeckAudience('');
      navigate(`/admin/deck-studio/decks/${result.id}`);
    } catch (error) {
      toast.error('Failed to create deck');
    }
  };

  const handleDeleteDeck = async (id: string) => {
    try {
      await deleteDeck.mutateAsync(id);
      toast.success('Deck deleted');
    } catch (error) {
      toast.error('Failed to delete deck');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal text-slate-900">Presentations</h1>
          <p className="text-slate-500 mt-1">
            Create and manage your corporate decks
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Deck
        </Button>
      </div>

      {/* Decks Grid */}
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
      ) : decks?.length === 0 ? (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <Presentation className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No presentations yet</h3>
            <p className="text-slate-500 mb-4">
              Create your first corporate deck
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create your first deck
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decks?.map(deck => (
            <Card key={deck.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge className={statusColors[deck.status]}>
                    {deck.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/deck-studio/decks/${deck.id}`}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/admin/deck-studio/decks/${deck.id}/print`} target="_blank">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Link>
                      </DropdownMenuItem>
                      {deck.pdf_url && (
                        <DropdownMenuItem asChild>
                          <a href={deck.pdf_url} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </a>
                        </DropdownMenuItem>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={e => e.preventDefault()} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete deck?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this presentation and all its slides.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteDeck(deck.id)} className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-base font-medium">
                  <Link to={`/admin/deck-studio/decks/${deck.id}`} className="hover:underline">
                    {deck.name}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {GOALS.find(g => g.value === deck.goal)?.label || deck.goal}
                  {deck.audience && ` • ${deck.audience}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  Updated {format(new Date(deck.updated_at), 'MMM d, yyyy')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Deck Name</Label>
              <Input
                placeholder="Q1 2026 Corporate Overview"
                value={newDeckName}
                onChange={e => setNewDeckName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Goal</Label>
              <Select value={newDeckGoal} onValueChange={(v) => setNewDeckGoal(v as DeckGoal)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GOALS.map(g => (
                    <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Audience (optional)</Label>
              <Input
                placeholder="Client name or company"
                value={newDeckAudience}
                onChange={e => setNewDeckAudience(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateDeck} disabled={createDeck.isPending}>
              Create Deck
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
