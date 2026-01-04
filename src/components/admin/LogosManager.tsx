import { useState } from "react";
import { Plus, ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogoFormDialog } from "./LogoFormDialog";
import { usePageContent, useUpdatePageContent } from "@/hooks/usePageContent";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Logo {
  name: string;
  logo_url: string;
  website_url?: string;
}

interface LogosManagerProps {
  sectionKey: "clientes" | "tecnologia";
  title: string;
  description: string;
}

export const LogosManager = ({ sectionKey, title, description }: LogosManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const { data: contentData, isLoading } = usePageContent("home", sectionKey);
  const updateContent = useUpdatePageContent();

  const content = contentData?.[0];
  const logos: Logo[] = content?.content?.logos || [];

  const handleSave = async (logo: Logo) => {
    if (!content) return;

    const updatedLogos = editingIndex !== null
      ? logos.map((l, i) => (i === editingIndex ? logo : l))
      : [...logos, logo];

    try {
      await updateContent.mutateAsync({
        id: content.id,
        content: {
          content: {
            ...content.content,
            logos: updatedLogos,
          },
        },
      });

      toast.success(
        editingIndex !== null 
          ? "Logo updated successfully" 
          : "Logo added successfully"
      );
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving logo:", error);
      toast.error("Error saving logo");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (!content) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= logos.length) return;

    const updatedLogos = [...logos];
    [updatedLogos[index], updatedLogos[newIndex]] = [updatedLogos[newIndex], updatedLogos[index]];

    try {
      await updateContent.mutateAsync({
        id: content.id,
        content: {
          content: {
            ...content.content,
            logos: updatedLogos,
          },
        },
      });
      toast.success("Order updated");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error updating order");
    }
  };

  const handleDelete = async () => {
    if (!content || deletingIndex === null) return;

    const updatedLogos = logos.filter((_, i) => i !== deletingIndex);

    try {
      await updateContent.mutateAsync({
        id: content.id,
        content: {
          content: {
            ...content.content,
            logos: updatedLogos,
          },
        },
      });
      toast.success("Logo deleted successfully");
      setDeletingIndex(null);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting logo:", error);
      toast.error("Error deleting logo");
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingIndex(null);
    setDialogOpen(true);
  };

  const confirmDelete = (index: number) => {
    setDeletingIndex(index);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading logos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Logo
        </Button>
      </div>

      {logos.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">
            No logos configured. Click "Add Logo" to get started.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {logos.map((logo, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 flex items-center justify-center bg-muted rounded-lg border border-border overflow-hidden">
                  <img 
                    src={logo.logo_url} 
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{logo.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Order: {index + 1} | Active
                  </p>
                  {logo.website_url && (
                    <a 
                      href={logo.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      {logo.website_url}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMove(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMove(index, "down")}
                    disabled={index === logos.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => confirmDelete(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <LogoFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        initialData={editingIndex !== null ? logos[editingIndex] : undefined}
        mode={editingIndex !== null ? "edit" : "create"}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete logo?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The logo will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
