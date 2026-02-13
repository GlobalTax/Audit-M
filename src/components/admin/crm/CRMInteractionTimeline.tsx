import { useCRMInteractions, type CRMInteraction } from '@/hooks/useCRMInteractions';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Calendar, StickyNote, ListTodo } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ICONS: Record<string, any> = {
  llamada: Phone,
  email: Mail,
  reunion: Calendar,
  nota: StickyNote,
  tarea: ListTodo,
};

const TYPE_LABELS: Record<string, string> = {
  llamada: 'Llamada',
  email: 'Email',
  reunion: 'Reunión',
  nota: 'Nota',
  tarea: 'Tarea',
};

interface Props {
  clientId: string;
}

export const CRMInteractionTimeline = ({ clientId }: Props) => {
  const { data: interactions = [], isLoading } = useCRMInteractions(clientId);

  if (isLoading) return <p className="text-sm text-muted-foreground">Cargando...</p>;

  if (interactions.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">Sin interacciones registradas</p>;
  }

  return (
    <div className="space-y-3">
      {interactions.map((interaction) => {
        const Icon = ICONS[interaction.type] || StickyNote;
        return (
          <div key={interaction.id} className="flex gap-3 p-3 rounded-lg bg-muted/30">
            <div className="p-2 rounded-full bg-primary/10 h-fit">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{interaction.subject}</span>
                <Badge variant="outline" className="text-[10px]">{TYPE_LABELS[interaction.type]}</Badge>
              </div>
              {interaction.description && (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{interaction.description}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(interaction.date), "d MMM yyyy, HH:mm", { locale: es })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
