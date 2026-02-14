

# Plan: Sidebar principal del admin en blanco estilo Apollo

## Cambio

Aplicar el mismo tema blanco/claro al sidebar principal (`AdminSidebar.tsx`) para que sea consistente con el sidebar del CRM y el estilo Apollo.io.

## Detalle tecnico

### Archivo: `src/components/admin/AdminSidebar.tsx`

| Elemento | Actual (oscuro) | Nuevo (Apollo blanco) |
|----------|-----------------|----------------------|
| `aside` contenedor | `bg-[#1B1F3D] text-white` | `bg-white text-slate-700 border-r border-slate-200` |
| Brand icon bg | `bg-indigo-500/20` | `bg-blue-50` |
| Brand icon color | `text-indigo-400` | `text-blue-600` |
| Brand text | `text-white` + `text-indigo-400` (dot) | `text-slate-900` + `text-blue-600` (dot) |
| Collapse button | `text-[#6B7194] hover:text-white hover:bg-white/[0.06]` | `text-slate-400 hover:text-slate-700 hover:bg-slate-100` |
| Borders | `border-white/[0.06]` | `border-slate-200` |
| Search bar | `bg-white/[0.04] border-white/[0.06] text-[#6B7194]` | `bg-slate-50 border-slate-200 text-slate-400` |
| Search kbd | `bg-white/[0.06] text-[#6B7194]` | `bg-slate-100 text-slate-400` |
| Section labels | `text-[#6B7194]` | `text-slate-400` |
| Section chevrons | `text-[#6B7194]` | `text-slate-400` |
| Collapsed dividers | `border-white/[0.06]` | `border-slate-200` |
| Item activo bg | `bg-indigo-500/15 text-white border-indigo-400` | `bg-blue-50 text-blue-600 border-blue-500` |
| Item activo icono | `text-indigo-400` | `text-blue-600` |
| Item normal | `text-[#8B92B0] hover:text-white hover:bg-white/[0.06]` | `text-slate-600 hover:text-slate-900 hover:bg-slate-50` |
| Item muted | `text-[#6B7194] hover:text-[#B0B5CC] hover:bg-white/[0.04]` | `text-slate-400 hover:text-slate-600 hover:bg-slate-50` |
| Badge leads | `bg-indigo-500 text-white` | `bg-blue-500 text-white` |
| User avatar bg | `bg-indigo-500/20` | `bg-blue-50` |
| User avatar text | `text-indigo-400` | `text-blue-600` |
| User name | `text-slate-200` | `text-slate-900` |
| User email | `text-[#6B7194]` | `text-slate-400` |
| Tooltip badge | `bg-indigo-500` | `bg-blue-500` |

Solo cambios de clases Tailwind en `AdminSidebar.tsx`. Sin cambios de estructura, logica ni otros archivos.

