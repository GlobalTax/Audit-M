import { useState } from "react";
import { Plus, ChevronUp, ChevronDown, Edit, Trash2, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NetworkFormDialog } from "./NetworkFormDialog";
import { usePageContent, useUpdatePageContent } from "@/hooks/usePageContent";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Network {
  name: string;
  shortName: string;
  description: string;
  website_url: string;
  logo_url: string;
}

interface NetworksManagerProps {
  title: string;
  description: string;
}

export const NetworksManager = ({ title, description }: NetworksManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const { data: contentData, isLoading } = usePageContent("home", "redes_internacionales", "en");
  const updateContent = useUpdatePageContent();

  const content = contentData?.[0];
  const networks: Network[] = content?.content?.logos || [];

  const handleSave = async (network: Network) => {
    if (!content) return;

    const updatedNetworks = editingIndex !== null
      ? networks.map((n, i) => (i === editingIndex ? network : n))
      : [...networks, network];

    try {
      await updateContent.mutateAsync({
        id: content.id,
        content: {
          content: {
            ...content.content,
            logos: updatedNetworks,
          },
        },
      });

      toast.success(
        editingIndex !== null 
          ? "Red actualizada exitosamente" 
          : "Red añadida exitosamente"
      );
      setEditingIndex(null);
    } catch (error) {
      console.error("Error saving network:", error);
      toast.error("Error al guardar la red");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (!content) return;

    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= networks.length) return;

    const updatedNetworks = [...networks];
    [updatedNetworks[index], updatedNetworks[newIndex]] = [updatedNetworks[newIndex], updatedNetworks[index]];

    try {
      await updateContent.mutateAsync({
        id: content.id,
        content: {
          content: {
            ...content.content,
            logos: updatedNetworks,
          },
        },
      });
      toast.success("Orden actualizado");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error al actualizar el orden");
    }
  };

  const handleDelete = async () => {
    if (!content || deletingIndex === null) return;

    const updatedNetworks = networks.filter((_, i) => i !== deletingIndex);

    try {
      await updateContent.mutateAsync({
        id: content.id,
        content: {
          content: {
            ...content.content,
            logos: updatedNetworks,
          },
        },
      });
      toast.success("Red eliminada exitosamente");
      setDeletingIndex(null);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting network:", error);
      toast.error("Error al eliminar la red");
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
        <div className="text-muted-foreground">Cargando redes...</div>
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
          Añadir Red
        </Button>
      </div>

      {networks.length === 0 ? (
        <Card className="p-8 text-center">
          <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No hay redes configuradas. Haz clic en "Añadir Red" para comenzar.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {networks.map((network, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 flex items-center justify-center bg-muted rounded-lg border border-border overflow-hidden shrink-0">
                  {network.logo_url ? (
                    <img 
                      src={network.logo_url} 
                      alt={network.name}
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  ) : (
                    <span className="font-mono text-sm font-medium text-muted-foreground">
                      {network.shortName}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{network.name}</h4>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {network.shortName}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                    {network.description}
                  </p>
                  {network.website_url && (
                    <a 
                      href={network.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {network.website_url}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
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
                    disabled={index === networks.length - 1}
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

      <NetworkFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        initialData={editingIndex !== null ? networks[editingIndex] : undefined}
        mode={editingIndex !== null ? "edit" : "create"}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar red?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La red será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
