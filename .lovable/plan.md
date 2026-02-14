

# Plan: Integrar las vistas CRM en el sidebar principal

## Objetivo

Cuando el usuario navega a `/admin/crm`, en vez de mostrar un segundo sidebar interno con las secciones del CRM (Prospectar, Comprometer, Ganar Tratos, Herramientas), esas secciones deben aparecer directamente en el sidebar principal (`AdminSidebar`), reemplazando o complementando las secciones normales.

## Enfoque

El sidebar principal detectara que estamos en una ruta `/admin/crm` y mostrara las sub-vistas del CRM como items de navegacion expandidos dentro del sidebar global. El CRM dejara de tener su propio sidebar y panel resizable.

## Cambios

### 1. `src/components/admin/AdminSidebar.tsx`

- Detectar cuando `location.pathname` empieza con `/admin/crm`
- Cuando estamos en CRM, expandir automaticamente la seccion "Gestion" y mostrar debajo del item "CRM" las sub-secciones del CRM como items anidados:
  - **Prospectar**: Personas, Empresas
  - **Comprometer**: Emails, Llamadas, Reuniones (deshabilitados)
  - **Ganar Tratos**: Pipeline, Contratos
  - **Herramientas**: Analitica
- Estos sub-items usaran rutas como `/admin/crm/personas`, `/admin/crm/pipeline`, etc.
- Mantener el item "CRM" como enlace padre que lleva a `/admin/crm` (vista por defecto: personas)

### 2. `src/pages/admin/AdminCRM.tsx`

- Eliminar el `ResizablePanelGroup` y el `CRMSidebar` interno
- Leer la sub-vista activa desde la URL (usando un parametro de ruta o query) en lugar de estado local
- Renderizar solo el contenido correspondiente a pantalla completa dentro del area de contenido

### 3. Rutas (archivo de rutas)

- Agregar sub-rutas para el CRM: `/admin/crm/personas`, `/admin/crm/pipeline`, `/admin/crm/tratos`, `/admin/crm/analitica`
- La ruta `/admin/crm` redirige a `/admin/crm/personas` por defecto

### 4. `src/components/admin/crm/CRMSidebar.tsx`

- Este componente ya no se usara directamente. Se puede conservar como referencia o eliminar.

## Detalle tecnico

### AdminSidebar.tsx - Items CRM anidados

```text
Gestion
  CRM (activo si estamos en /admin/crm/*)
    Prospectar
      > Personas (232)
      > Empresas
    Ganar Tratos
      > Pipeline
      > Contratos (12)
    Herramientas
      > Analitica
  Leads
  Equipo
```

Los sub-items del CRM se renderizaran con indentacion adicional (`pl-8`) y un estilo ligeramente mas pequeno (`text-[12px]`), similar a como Apollo muestra sub-navegacion dentro del sidebar.

### AdminCRM.tsx - Simplificado

El componente leera la sub-ruta desde `useParams()` o `useLocation()` para determinar que vista mostrar, eliminando el estado local `activeView` y el sidebar duplicado. El contenido ocupara todo el ancho disponible.

### Archivos afectados

| Archivo | Accion |
|---------|--------|
| `src/components/admin/AdminSidebar.tsx` | Agregar sub-items CRM condicionales |
| `src/pages/admin/AdminCRM.tsx` | Eliminar sidebar interno, leer vista de URL |
| Archivo de rutas | Agregar sub-rutas CRM |
| `src/components/admin/crm/CRMSidebar.tsx` | Dejar de usar (opcional eliminar) |

