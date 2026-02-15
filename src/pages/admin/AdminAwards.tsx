import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Trophy, ArrowUp, ArrowDown } from "lucide-react";
import { AwardFormDialog } from "@/components/admin/awards/AwardFormDialog";
import {
  useAdminAwards,
  useCreateAward,
  useUpdateAward,
  useDeleteAward,
  type Award,
  type AwardInsert,
} from "@/hooks/useAwards";

export default function AdminAwards() {
  const { data: awards, isLoading } = useAdminAwards();
  const createAward = useCreateAward();
  const updateAward = useUpdateAward();
  const deleteAward = useDeleteAward();

  const [formOpen, setFormOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingAward(null);
    setFormOpen(true);
  };

  const handleEdit = (award: Award) => {
    setEditingAward(award);
    setFormOpen(true);
  };

  const handleSubmit = (data: AwardInsert) => {
    if (editingAward) {
      updateAward.mutate(
        { id: editingAward.id, ...data },
        { onSuccess: () => setFormOpen(false) }
      );
    } else {
      createAward.mutate(data, { onSuccess: () => setFormOpen(false) });
    }
  };

  const handleToggleActive = (award: Award) => {
    updateAward.mutate({ id: award.id, is_active: !award.is_active });
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteAward.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
    }
  };

  const handleReorder = (award: Award, direction: "up" | "down") => {
    if (!awards) return;
    
    const currentIndex = awards.findIndex((a) => a.id === award.id);
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= awards.length) return;
    
    const targetAward = awards[targetIndex];
    
    // Swap display orders
    updateAward.mutate({ id: award.id, display_order: targetAward.display_order });
    updateAward.mutate({ id: targetAward.id, display_order: award.display_order });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-[#C9A227]" />
            <div>
              <h1 className="text-2xl font-normal">Premios y Reconocimientos</h1>
              <p className="text-sm text-muted-foreground">
                Gestiona los premios y reconocimientos mostrados en la web
              </p>
            </div>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Añadir Premio
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="bg-muted/50 rounded-lg px-4 py-3">
            <p className="text-2xl font-medium">{awards?.length || 0}</p>
            <p className="text-sm text-muted-foreground">Total Premios</p>
          </div>
          <div className="bg-muted/50 rounded-lg px-4 py-3">
            <p className="text-2xl font-medium">
              {awards?.filter((a) => a.is_active).length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Activos</p>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Orden</TableHead>
                <TableHead className="w-[100px]">Categoría</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="w-[80px]">Año</TableHead>
                <TableHead>Organización</TableHead>
                <TableHead className="w-[80px]">Activo</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {awards?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No hay premios configurados
                  </TableCell>
                </TableRow>
              ) : (
                awards?.map((award, index) => (
                  <TableRow key={award.id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleReorder(award, "up")}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleReorder(award, "down")}
                          disabled={index === (awards?.length || 0) - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-[#C9A227]/30 text-[#C9A227]">
                        {award.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{award.short_name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {award.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{award.year}</TableCell>
                    <TableCell>{award.organization}</TableCell>
                    <TableCell>
                      <Switch
                        checked={award.is_active}
                        onCheckedChange={() => handleToggleActive(award)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(award)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(award.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Form Dialog */}
      <AwardFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        award={editingAward}
        onSubmit={handleSubmit}
        isLoading={createAward.isPending || updateAward.isPending}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este premio?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El premio será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
