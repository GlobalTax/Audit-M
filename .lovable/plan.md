

# Herramienta de Seguimiento de Proyectos en la Intranet

## Que se construira

Una nueva seccion en la intranet (`/admin/projects`) con un listado de proyectos y tareas completamente inline (editable directamente en la tabla sin dialogos modales), pensada para gestionar planes como "M Audit" de forma agil.

## Funcionalidad principal

### Vista de proyectos
- Listado de proyectos con nombre, descripcion corta, progreso (barra %) y fecha limite
- Click en un proyecto para ver sus tareas

### Vista de tareas (inline)
- Tabla editable donde cada campo se modifica con un click directo sobre la celda:
  - **Tarea** (texto inline editable)
  - **Responsable** (dropdown inline con miembros del equipo)
  - **Estado** (badge clickable: Pendiente / En progreso / Completada / Bloqueada)
  - **Prioridad** (badge clickable: Baja / Media / Alta / Urgente)
  - **Fecha limite** (date picker inline)
  - **Notas** (texto expandible inline)
- Arrastrar filas para reordenar tareas (drag & drop nativo como en el CRM pipeline)
- Boton "+" al final de la tabla para crear tarea nueva directamente en la fila
- Checkbox para marcar como completada rapidamente
- Filtros rapidos por estado y responsable

### Barra de progreso del proyecto
- Progreso automatico calculado: tareas completadas / total tareas
- KPIs: total tareas, completadas, en progreso, bloqueadas

## Seccion tecnica

### Base de datos (2 tablas nuevas)

**`project_boards`**
| Columna | Tipo | Descripcion |
|---------|------|-------------|
| id | uuid PK | |
| name | text NOT NULL | Nombre del proyecto |
| description | text | Descripcion corta |
| deadline | date | Fecha limite global |
| status | text | active / archived |
| created_by | text | Usuario creador |
| created_at | timestamptz | |
| updated_at | timestamptz | |

**`project_tasks`**
| Columna | Tipo | Descripcion |
|---------|------|-------------|
| id | uuid PK | |
| board_id | uuid FK -> project_boards | |
| title | text NOT NULL | Titulo de la tarea |
| description | text | Notas / detalles |
| status | text | pendiente / en_progreso / completada / bloqueada |
| priority | text | baja / media / alta / urgente |
| assignee | text | Nombre del responsable |
| due_date | date | Fecha limite |
| sort_order | integer | Orden en la lista |
| completed_at | timestamptz | Fecha de completado |
| created_at | timestamptz | |
| updated_at | timestamptz | |

RLS: politicas restringidas a usuarios con rol admin (mismo patron que las tablas CRM).

### Archivos nuevos

| Archivo | Descripcion |
|---------|-------------|
| `src/pages/admin/AdminProjects.tsx` | Pagina principal con listado de proyectos y vista de tareas |
| `src/components/admin/projects/ProjectBoardList.tsx` | Grid de tarjetas de proyecto |
| `src/components/admin/projects/ProjectTaskTable.tsx` | Tabla inline editable de tareas |
| `src/components/admin/projects/InlineEditCell.tsx` | Componente reutilizable para celdas editables (texto, dropdown, fecha) |
| `src/components/admin/projects/TaskStatusBadge.tsx` | Badge clickable de estado |
| `src/components/admin/projects/TaskPriorityBadge.tsx` | Badge clickable de prioridad |
| `src/components/admin/projects/ProjectProgressBar.tsx` | Barra de progreso con KPIs |
| `src/hooks/useProjectBoards.ts` | Hook CRUD para project_boards |
| `src/hooks/useProjectTasks.ts` | Hook CRUD para project_tasks |

### Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/components/admin/AdminSidebar.tsx` | Anadir enlace "Proyectos" en la seccion Herramientas |
| `src/App.tsx` | Anadir ruta `/admin/projects` con lazy loading |

### Patron de edicion inline

Cada celda de la tabla funcionara asi:
1. Estado normal: muestra el valor como texto/badge
2. Click: la celda se transforma en un input/select/datepicker
3. Blur o Enter: guarda automaticamente via mutation (debounced)
4. Escape: cancela la edicion

Se usara el mismo patron de `useMutation` + `invalidateQueries` que ya usan los hooks del CRM para actualizaciones optimistas.

