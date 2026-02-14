

# Plan: Sidebar CRM en blanco estilo Apollo

## Cambio

Actualizar `CRMSidebar.tsx` para que use un fondo blanco con bordes sutiles, texto gris oscuro e item activo en azul — exactamente como Apollo.io.

## Detalle tecnico

### Archivo: `src/components/admin/crm/CRMSidebar.tsx`

Cambios de clases CSS:

| Elemento | Actual (oscuro) | Nuevo (Apollo) |
|----------|-----------------|----------------|
| Contenedor principal | `bg-slate-900 text-slate-300` | `bg-white text-slate-700 border-r border-slate-200` |
| Input busqueda | `bg-slate-800 border-slate-700 text-slate-200 placeholder:text-slate-500` | `bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400` |
| Icono busqueda | `text-slate-500` | `text-slate-400` |
| Labels de seccion | `text-slate-500 hover:text-slate-300` | `text-slate-400 hover:text-slate-600` |
| Item activo | `bg-indigo-600/20 text-indigo-300` | `bg-blue-50 text-blue-600 font-medium` |
| Item normal | `text-slate-400 hover:bg-slate-800 hover:text-slate-200` | `text-slate-600 hover:bg-slate-50 hover:text-slate-900` |
| Item deshabilitado | `text-slate-600` | `text-slate-300` |
| Badge "Pronto" | `text-slate-600` | `text-slate-400` |
| Contadores | `text-slate-500` | `text-slate-400` |
| Focus ring | `ring-indigo-500/40` | `ring-blue-500/40` |

Solo cambios de clases Tailwind, sin cambios de estructura ni logica.

