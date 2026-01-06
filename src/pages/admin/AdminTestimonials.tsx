import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Quote } from "lucide-react";
import { useAdminTestimonials, useUpdateTestimonial, useDeleteTestimonial, Testimonial } from "@/hooks/useTestimonials";
import { TestimonialFormDialog } from "@/components/admin/testimonials/TestimonialFormDialog";
import { toast } from "sonner";

export default function AdminTestimonials() {
  const { data: testimonials, isLoading } = useAdminTestimonials('int');
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditingTestimonial(null);
    setFormOpen(true);
  };

  const handleToggleActive = async (testimonial: Testimonial) => {
    try {
      await updateMutation.mutateAsync({
        id: testimonial.id,
        is_active: !testimonial.is_active,
      });
      toast.success(`Testimonial ${testimonial.is_active ? 'deactivated' : 'activated'}`);
    } catch {
      toast.error('Failed to update testimonial');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Testimonial deleted');
      setDeleteId(null);
    } catch {
      toast.error('Failed to delete testimonial');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials for the homepage</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Quote</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-[80px]">Active</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials?.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-mono text-muted-foreground">
                  {testimonial.display_order}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={testimonial.avatar_url || undefined} />
                      <AvatarFallback className="text-xs">
                        {getInitials(testimonial.author_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author_name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.author_role}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2 max-w-md">
                    <Quote className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm line-clamp-2">{testimonial.quote}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{testimonial.company_name}</div>
                    <Badge variant="secondary" className="mt-1">
                      {testimonial.company_type_label}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5">
                    <span>{testimonial.flag_emoji}</span>
                    <span className="text-sm">{testimonial.location}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={testimonial.is_active}
                    onCheckedChange={() => handleToggleActive(testimonial)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(testimonial)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {testimonials?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No testimonials yet. Add your first one!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TestimonialFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        testimonial={editingTestimonial}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
