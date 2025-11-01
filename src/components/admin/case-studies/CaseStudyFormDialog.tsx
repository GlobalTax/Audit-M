import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CaseStudy, CaseStudyFormData } from '@/types/caseStudy';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Plus, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { uploadCompanyLogo } from '@/lib/uploadCompanyLogo';

const caseStudySchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'El slug debe ser minúsculas con guiones'),
  client_name: z.string().min(1, 'El nombre del cliente es requerido'),
  client_logo_url: z.string().nullable().optional(),
  client_industry: z.string().min(1, 'La industria es requerida'),
  client_size: z.string().optional(),
  project_duration: z.string().optional(),
  
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  
  hero_image_url: z.string().nullable().optional(),
  hero_title: z.string().min(3, 'El título del hero es requerido'),
  hero_subtitle: z.string().optional(),
  
  challenge: z.string().min(10, 'El desafío debe tener al menos 10 caracteres'),
  solution: z.string().min(10, 'La solución debe tener al menos 10 caracteres'),
  results_summary: z.string().min(10, 'El resumen de resultados debe tener al menos 10 caracteres'),
  
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
  })),
  detailed_content: z.string().optional(),
  timeline: z.array(z.object({
    date: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  
  testimonial_text: z.string().optional(),
  testimonial_author: z.string().optional(),
  testimonial_position: z.string().optional(),
  testimonial_avatar_url: z.string().nullable().optional(),
  
  related_services: z.array(z.string()),
  gallery: z.array(z.object({
    url: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })),
  
  tags: z.array(z.string()),
  primary_service: z.string().optional(),
  
  status: z.enum(['draft', 'review', 'published', 'archived']),
  is_featured: z.boolean(),
  display_order: z.coerce.number().int().min(0),
});

interface CaseStudyFormDialogProps {
  open: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export const CaseStudyFormDialog = ({ open, onClose, caseStudy }: CaseStudyFormDialogProps) => {
  const queryClient = useQueryClient();
  const isEditing = !!caseStudy;
  
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [clientLogoFile, setClientLogoFile] = useState<File | null>(null);
  const [testimonialAvatarFile, setTestimonialAvatarFile] = useState<File | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const form = useForm<CaseStudyFormData>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: '',
      slug: '',
      client_name: '',
      client_logo_url: null,
      client_industry: '',
      client_size: '',
      project_duration: '',
      meta_title: '',
      meta_description: '',
      hero_image_url: null,
      hero_title: '',
      hero_subtitle: '',
      challenge: '',
      solution: '',
      results_summary: '',
      metrics: [],
      detailed_content: '',
      timeline: [],
      testimonial_text: '',
      testimonial_author: '',
      testimonial_position: '',
      testimonial_avatar_url: null,
      related_services: [],
      gallery: [],
      tags: [],
      primary_service: '',
      status: 'draft',
      is_featured: false,
      display_order: 0,
    },
  });

  const { fields: metricsFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control: form.control,
    name: 'metrics',
  });

  const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({
    control: form.control,
    name: 'timeline',
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({
    control: form.control,
    name: 'gallery',
  });

  useEffect(() => {
    if (caseStudy && open) {
      form.reset({
        title: caseStudy.title,
        slug: caseStudy.slug,
        client_name: caseStudy.client_name,
        client_logo_url: caseStudy.client_logo_url,
        client_industry: caseStudy.client_industry,
        client_size: caseStudy.client_size || '',
        project_duration: caseStudy.project_duration || '',
        meta_title: caseStudy.meta_title || '',
        meta_description: caseStudy.meta_description || '',
        hero_image_url: caseStudy.hero_image_url,
        hero_title: caseStudy.hero_title,
        hero_subtitle: caseStudy.hero_subtitle || '',
        challenge: caseStudy.challenge,
        solution: caseStudy.solution,
        results_summary: caseStudy.results_summary,
        metrics: caseStudy.metrics,
        detailed_content: caseStudy.detailed_content || '',
        timeline: caseStudy.timeline,
        testimonial_text: caseStudy.testimonial_text || '',
        testimonial_author: caseStudy.testimonial_author || '',
        testimonial_position: caseStudy.testimonial_position || '',
        testimonial_avatar_url: caseStudy.testimonial_avatar_url,
        related_services: caseStudy.related_services,
        gallery: caseStudy.gallery,
        tags: caseStudy.tags,
        primary_service: caseStudy.primary_service || '',
        status: caseStudy.status,
        is_featured: caseStudy.is_featured,
        display_order: caseStudy.display_order,
      });
    } else if (!open) {
      form.reset();
      setHeroImageFile(null);
      setClientLogoFile(null);
      setTestimonialAvatarFile(null);
    }
  }, [caseStudy, open, form]);

  const mutation = useMutation({
    mutationFn: async (data: CaseStudyFormData) => {
      setUploadingImages(true);
      
      try {
        let heroImageUrl = data.hero_image_url;
        let clientLogoUrl = data.client_logo_url;
        let testimonialAvatarUrl = data.testimonial_avatar_url;

        if (heroImageFile) {
          heroImageUrl = await uploadCompanyLogo(heroImageFile, 'client-logos');
        }
        if (clientLogoFile) {
          clientLogoUrl = await uploadCompanyLogo(clientLogoFile, 'client-logos');
        }
        if (testimonialAvatarFile) {
          testimonialAvatarUrl = await uploadCompanyLogo(testimonialAvatarFile, 'client-logos');
        }

        const dbData = {
          ...data,
          hero_image_url: heroImageUrl,
          client_logo_url: clientLogoUrl,
          testimonial_avatar_url: testimonialAvatarUrl,
          metrics: data.metrics as any,
          timeline: data.timeline as any,
          gallery: data.gallery as any,
          published_at: data.status === 'published' && !isEditing ? new Date().toISOString() : caseStudy?.published_at || null,
        };

        if (isEditing) {
          const { error } = await supabase
            .from('case_studies')
            .update({ ...dbData, updated_at: new Date().toISOString() })
            .eq('id', caseStudy.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('case_studies').insert([dbData]);
          if (error) throw error;
        }
      } finally {
        setUploadingImages(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-case-studies'] });
      toast.success(isEditing ? 'Caso de éxito actualizado' : 'Caso de éxito creado');
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: CaseStudyFormData) => {
    mutation.mutate(data);
  };

  const generateSlug = () => {
    const title = form.getValues('title');
    if (title) {
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      form.setValue('slug', slug);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Caso de Éxito' : 'Crear Caso de Éxito'}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pr-4">
              <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="content">Contenido</TabsTrigger>
                  <TabsTrigger value="metrics">Métricas</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="testimonial">Testimonio</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título *</FormLabel>
                        <FormControl>
                          <Input {...field} onBlur={generateSlug} />
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
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="client_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del Cliente *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="client_industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Industria *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Tecnología, Retail, etc." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="client_size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tamaño del Cliente</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="50-100 empleados" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="project_duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duración del Proyecto</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="6 meses" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="primary_service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servicio Principal</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Asesoría Fiscal" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label>Logo del Cliente</Label>
                    <ImageUpload
                      value={form.watch('client_logo_url')}
                      onChange={(url, file) => {
                        if (file) setClientLogoFile(file);
                        form.setValue('client_logo_url', url);
                      }}
                    />
                  </div>

                  <div>
                    <Label>Imagen Hero</Label>
                    <ImageUpload
                      value={form.watch('hero_image_url')}
                      onChange={(url, file) => {
                        if (file) setHeroImageFile(file);
                        form.setValue('hero_image_url', url);
                      }}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="hero_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título Hero *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hero_subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtítulo Hero</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
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
                              <SelectItem value="review">Revisión</SelectItem>
                              <SelectItem value="published">Publicado</SelectItem>
                              <SelectItem value="archived">Archivado</SelectItem>
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
                        <FormItem className="flex items-center gap-2 pt-7">
                          <FormLabel>Destacado</FormLabel>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (separados por comas)</FormLabel>
                        <FormControl>
                          <Input 
                            value={field.value.join(', ')}
                            onChange={(e) => {
                              const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                              field.onChange(tags);
                            }}
                            placeholder="fiscal, inversión, startup"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="challenge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desafío *</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} placeholder="Describe el desafío del cliente..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="solution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solución *</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} placeholder="Describe la solución implementada..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="results_summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resumen de Resultados *</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} placeholder="Resume los resultados obtenidos..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="detailed_content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contenido Detallado (Markdown)</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={8} placeholder="Contenido adicional en formato Markdown..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4">
                  <div>
                    <Label>Métricas</Label>
                    <div className="space-y-3 mt-2">
                      {metricsFields.map((field, index) => (
                        <div key={field.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Métrica {index + 1}</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMetric(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              {...form.register(`metrics.${index}.label`)}
                              placeholder="Etiqueta (ej: ROI)"
                            />
                            <Input
                              {...form.register(`metrics.${index}.value`)}
                              placeholder="Valor (ej: +45%)"
                            />
                          </div>
                          <Input
                            {...form.register(`metrics.${index}.description`)}
                            placeholder="Descripción (opcional)"
                          />
                          <Input
                            {...form.register(`metrics.${index}.icon`)}
                            placeholder="Icono Lucide (opcional)"
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendMetric({ label: '', value: '', description: '', icon: '' })}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Añadir Métrica
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4">
                  <div>
                    <Label>Timeline</Label>
                    <div className="space-y-3 mt-2">
                      {timelineFields.map((field, index) => (
                        <div key={field.id} className="border rounded-lg p-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Evento {index + 1}</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimeline(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <Input
                            {...form.register(`timeline.${index}.date`)}
                            placeholder="Fecha (ej: Enero 2024)"
                          />
                          <Input
                            {...form.register(`timeline.${index}.title`)}
                            placeholder="Título del evento"
                          />
                          <Textarea
                            {...form.register(`timeline.${index}.description`)}
                            placeholder="Descripción"
                            rows={2}
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendTimeline({ date: '', title: '', description: '' })}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Añadir Evento
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="testimonial" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="testimonial_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Testimonio</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} placeholder="Cita del cliente..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="testimonial_author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Autor</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nombre del autor" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="testimonial_position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="CEO, Director, etc." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Label>Avatar del Testimonial</Label>
                    <ImageUpload
                      value={form.watch('testimonial_avatar_url')}
                      onChange={(url, file) => {
                        if (file) setTestimonialAvatarFile(file);
                        form.setValue('testimonial_avatar_url', url);
                      }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="meta_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Título</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Título SEO (60 caracteres máx)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Descripción</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} placeholder="Descripción SEO (160 caracteres máx)" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={mutation.isPending || uploadingImages}>
                  {(mutation.isPending || uploadingImages) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? 'Actualizar' : 'Crear'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
