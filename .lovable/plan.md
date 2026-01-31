
# Plan: Implementar Drag-and-Drop para Reordenar Empresas y Links

## Resumen

Implementar funcionalidad de arrastrar y soltar (drag-and-drop) nativa en los editores de empresas y links del panel de administración del TopBar, manteniendo la independencia del módulo sin añadir librerías externas.

## Estrategia

Usar la **API nativa de HTML5 Drag and Drop** que está disponible en todos los navegadores modernos. Esto mantiene el módulo 100% independiente sin necesidad de añadir librerías como `react-beautiful-dnd` o `@dnd-kit`.

## Archivos a Crear

### 1. Hook reutilizable de Drag-and-Drop

**Archivo:** `src/modules/topbar/hooks/useDragAndDrop.ts`

```typescript
// Hook genérico para manejar drag-and-drop en listas
interface UseDragAndDropOptions<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  getId: (item: T) => string;
}

export function useDragAndDrop<T>({ items, onReorder, getId }: UseDragAndDropOptions<T>) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  
  // Handlers para: onDragStart, onDragEnd, onDragOver, onDragEnter, onDrop
  // Retorna: handlers para cada item + estados visuales
}
```

## Archivos a Modificar

### 2. CompanyEditor.tsx

- Importar el nuevo hook `useDragAndDrop`
- Aplicar handlers de drag a cada fila de empresa
- Añadir estilos visuales durante el drag:
  - Elemento arrastrado: opacidad reducida
  - Zona de destino: borde resaltado
- Llamar a `onReorder` cuando se suelta el elemento

### 3. LinkEditor.tsx

- Mismos cambios que CompanyEditor
- Reutilizar el hook `useDragAndDrop`

## Flujo de Funcionamiento

```text
Usuario agarra (GripVertical)
        |
        v
  onDragStart
  - Guarda ID del elemento
  - Aplica estilo "dragging"
        |
        v
  Usuario arrastra sobre otros elementos
        |
        v
  onDragOver / onDragEnter
  - Previene default (permite drop)
  - Muestra indicador visual
        |
        v
  onDrop
  - Calcula nueva posición
  - Reordena array localmente
  - Llama onReorder(orderedIds)
        |
        v
  onDragEnd
  - Limpia estilos y estados
```

## Detalles Técnicos

### Hook useDragAndDrop

El hook manejará:

1. **Estado interno:**
   - `draggedId`: ID del elemento siendo arrastrado
   - `dragOverId`: ID del elemento sobre el que se está arrastrando

2. **Handlers retornados:**
   - `getDragProps(id)`: Retorna props para aplicar al contenedor draggable
   - `getHandleProps(id)`: Retorna props para el handle (GripVertical)
   - `isDragging(id)`: Si este elemento está siendo arrastrado
   - `isDragOver(id)`: Si se está arrastrando sobre este elemento

3. **Lógica de reordenamiento:**
   - Al soltar, calcula la nueva posición
   - Crea un nuevo array ordenado
   - Llama al callback con los IDs ordenados

### Estilos visuales

```text
Elemento normal:     bg-white border
Arrastrando:         opacity-50 border-dashed
Destino (dragover):  border-blue-500 bg-blue-50
```

### Accesibilidad

- El `GripVertical` mantiene `cursor-grab` / `cursor-grabbing`
- Los elementos tienen `draggable="true"` solo en el handle
- Se puede mejorar con keyboard navigation en el futuro

## Resumen de Cambios

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `hooks/useDragAndDrop.ts` | Crear | Hook reutilizable para DnD |
| `admin/CompanyEditor.tsx` | Modificar | Integrar DnD en lista de empresas |
| `admin/LinkEditor.tsx` | Modificar | Integrar DnD en lista de links |

## Dependencias

Ninguna nueva. Se usa la API nativa de HTML5 Drag and Drop.
