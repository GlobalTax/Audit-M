import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MarkdownEditor } from "@/components/admin/services/MarkdownEditor";
import { useCreateJobPosition, useUpdateJobPosition } from "@/hooks/useJobPositions";
import { JobPosition } from "@/types/jobPosition";
import { X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  department: z.string().min(1, "El departamento es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  contract_type: z.string().min(1, "El tipo de contrato es requerido"),
  working_hours: z.string().min(1, "La jornada es requerida"),
  salary_range: z.string().optional(),
  description: z.string().min(1, "La descripción es requerida"),
  requirements: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "closed"]),
  is_featured: z.boolean().default(false),
  display_order: z.number().default(0),
});

type FormData = z.infer<typeof formSchema>;

interface JobPositionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: JobPosition | null;
}

export const JobPositionFormDialog = ({
  open,
  onOpenChange,
  position,
}: JobPositionFormDialogProps) => {
  const createPosition = useCreateJobPosition();
  const updatePosition = useUpdateJobPosition();
  const [requirementInput, setRequirementInput] = useState("");
  const [responsibilityInput, setResponsibilityInput] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      department: "",
      location: "",
      contract_type: "",
      working_hours: "",
      salary_range: "",
      description: "",
      requirements: [],
      responsibilities: [],
      status: "draft",
      is_featured: false,
      display_order: 0,
    },
  });

  useEffect(() => {
    if (position) {
      form.reset({
        title: position.title,
        slug: position.slug,
        department: position.department,
        location: position.location,
        contract_type: position.contract_type,
        working_hours: position.working_hours,
        salary_range: position.salary_range || "",
        description: position.description,
        requirements: position.requirements || [],
        responsibilities: position.responsibilities || [],
        status: position.status,
        is_featured: position.is_featured,
        display_order: position.display_order,
      });
    } else {
      form.reset({
        title: "",
        slug: "",
        department: "",
        location: "",
        contract_type: "",
        working_hours: "",
        salary_range: "",
        description: "",
        requirements: [],
        responsibilities: [],
        status: "draft",
        is_featured: false,
        display_order: 0,
      });
    }
  }, [position, form]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit = async (data: FormData) => {
    const positionData = {
      ...data,
      published_at: data.status === "published" ? new Date().toISOString() : null,
    };

    if (position) {
      await updatePosition.mutateAsync({
        id: position.id,
        updates: positionData,
      });
    } else {
      await createPosition.mutateAsync(positionData);
    }
    onOpenChange(false);
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      const current = form.getValues("requirements");
      form.setValue("requirements", [...current, requirementInput.trim()]);
      setRequirementInput("");
    }
  };

  const removeRequirement = (index: number) => {
    const current = form.getValues("requirements");
    form.setValue(
      "requirements",
      current.filter((_, i) => i !== index)
    );
  };

  const addResponsibility = () => {
    if (responsibilityInput.trim()) {
      const current = form.getValues("responsibilities");
      form.setValue("responsibilities", [...current, responsibilityInput.trim()]);
      setResponsibilityInput("");
    }
  };

  const removeResponsibility = (index: number) => {
    const current = form.getValues("responsibilities");
    form.setValue(
      "responsibilities",
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {position ? "Editar Vacante" : "Nueva Vacante"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Puesto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ej: Senior Tax Advisor"
                        onChange={(e) => {
                          field.onChange(e);
                          if (!position) {
                            form.setValue("slug", generateSlug(e.target.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (URL)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="senior-tax-advisor" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Asesoría Fiscal">Asesoría Fiscal</SelectItem>
                        <SelectItem value="Asesoría Laboral">Asesoría Laboral</SelectItem>
                        <SelectItem value="Contabilidad">Contabilidad</SelectItem>
                        <SelectItem value="Legal">Legal</SelectItem>
                        <SelectItem value="Administración">Administración</SelectItem>
                        <SelectItem value="Tecnología">Tecnología</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar ubicación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Barcelona">Barcelona</SelectItem>
                        <SelectItem value="Madrid">Madrid</SelectItem>
                        <SelectItem value="Remoto">Remoto</SelectItem>
                        <SelectItem value="Híbrido">Híbrido</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contract_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Contrato</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Indefinido">Indefinido</SelectItem>
                        <SelectItem value="Temporal">Temporal</SelectItem>
                        <SelectItem value="Prácticas">Prácticas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="working_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jornada</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar jornada" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Completa">Completa</SelectItem>
                        <SelectItem value="Parcial">Parcial</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="salary_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rango Salarial (Opcional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ej: 30.000€ - 40.000€" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del Puesto</FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Describe el puesto en detalle (soporta Markdown)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requisitos</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={requirementInput}
                        onChange={(e) => setRequirementInput(e.target.value)}
                        placeholder="Añadir requisito"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addRequirement();
                          }
                        }}
                      />
                      <Button type="button" onClick={addRequirement}>
                        Añadir
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {field.value.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-muted rounded"
                        >
                          <span className="flex-1 text-sm">{req}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeRequirement(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsabilidades</FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={responsibilityInput}
                        onChange={(e) => setResponsibilityInput(e.target.value)}
                        placeholder="Añadir responsabilidad"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addResponsibility();
                          }
                        }}
                      />
                      <Button type="button" onClick={addResponsibility}>
                        Añadir
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {field.value.map((resp, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-muted rounded"
                        >
                          <span className="flex-1 text-sm">{resp}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeResponsibility(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Borrador</SelectItem>
                        <SelectItem value="published">Publicado</SelectItem>
                        <SelectItem value="closed">Cerrado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Destacado</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orden</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createPosition.isPending || updatePosition.isPending}>
                {position ? "Actualizar" : "Crear"} Vacante
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
