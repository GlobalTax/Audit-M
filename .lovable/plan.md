

# Generar tareas con IA en proyectos

## Que se hara

Anadir un boton "Generar con IA" en la vista de tareas de un proyecto. Al pulsarlo se abre un textarea donde el usuario pega o escribe una descripcion (por ejemplo: "Plan de marketing digital: SEO, Google Ads, contenidos...") y la IA devuelve un listado estructurado de tareas con titulo, prioridad y orden. Las tareas se insertan automaticamente en el tablero.

## Flujo de uso

1. El usuario entra en un proyecto y pulsa el boton "Generar con IA" (icono Sparkles)
2. Se abre un dialogo con un textarea grande
3. El usuario pega texto libre (un plan, unas notas, un briefing...)
4. Pulsa "Generar tareas"
5. La IA devuelve un JSON estructurado con las tareas
6. Se muestra una preview de las tareas generadas con opcion de editar/eliminar antes de confirmar
7. Al confirmar, se insertan todas las tareas de golpe en el tablero

## Seccion tecnica

### 1. Nueva edge function: `generate-project-tasks`

**Archivo**: `supabase/functions/generate-project-tasks/index.ts`

- Recibe: `{ prompt: string }` (el texto libre del usuario)
- Usa Lovable AI Gateway con tool calling para extraer tareas estructuradas
- Tool schema devuelve un array de objetos: `{ title, priority, description }`
- No usa streaming (respuesta completa, no necesita tokens en tiempo real)
- Maneja errores 429/402 con mensajes claros

**Prompt del sistema**: Instruir al modelo para que analice el texto y genere entre 5-30 tareas accionables, asignando prioridad (urgente/alta/media/baja) segun el contexto.

### 2. Nuevo componente: `AITaskGenerator.tsx`

**Archivo**: `src/components/admin/projects/AITaskGenerator.tsx`

- Dialog con textarea para el input
- Estado de carga con spinner mientras la IA responde
- Vista previa de tareas generadas con checkboxes para seleccionar cuales insertar
- Boton de confirmar que llama a `useCreateProjectTask` en bucle (o un batch insert)

### 3. Modificaciones existentes

| Archivo | Cambio |
|---------|--------|
| `ProjectTaskTable.tsx` | Anadir boton "Generar con IA" junto al boton "Anadir tarea" |
| `supabase/config.toml` | Registrar la nueva edge function con `verify_jwt = false` |

### 4. Modelo y tool calling

Se usa `google/gemini-3-flash-preview` (modelo por defecto) con tool calling para obtener respuesta estructurada:

```
Tool: generate_tasks
Parameters:
  tasks: array of {
    title: string (titulo corto y accionable)
    priority: enum [baja, media, alta, urgente]
    description: string (nota opcional breve)
  }
```

Esto garantiza que la respuesta siempre viene como JSON valido sin necesidad de parsear texto libre.

### 5. Insercion batch

Las tareas generadas se insertan con `sort_order` secuencial empezando desde el maximo actual del tablero + 1, para que se anadan al final sin conflictos.

