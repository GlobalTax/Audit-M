import { useCRMInteractions } from '@/hooks/useCRMInteractions';
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

  if (isLoading) return <p className="text-sm text-gray-400">Cargando...</p>;

  if (interactions.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-4">Sin interacciones registradas</p>;
  }

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gray-200" />

      <div className="space-y-1">
        {interactions.map((interaction) => {
          const Icon = ICONS[interaction.type] || StickyNote;
          return (
            <div key={interaction.id} className="flex gap-3 py-2.5 pl-1 relative">
              <div className="p-1.5 rounded-lg bg-indigo-50 z-10 flex-shrink-0">
                <Icon className="h-3.5 w-3.5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-sm text-gray-800">{interaction.subject}</span>
                  <Badge variant="outline" className="text-[10px]">{TYPE_LABELS[interaction.type]}</Badge>
                </div>
                {interaction.description && (
                  <p className="text-sm text-gray-500 whitespace-pre-wrap">{interaction.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {format(new Date(interaction.date), "d MMM yyyy, HH:mm", { locale: es })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
