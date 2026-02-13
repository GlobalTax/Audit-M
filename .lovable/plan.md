

# Plan: CRM Completo para Admin

## Resumen

Crear un modulo CRM independiente dentro del panel de administracion con gestion de clientes, pipeline visual Kanban, historial de interacciones, datos fiscales/contratos y reportes.

## Base de Datos

### Nuevas Tablas

**1. `crm_clients`** - Tabla principal de clientes

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| id | uuid PK | Identificador |
| name | text | Nombre o razon social |
| email | text | Email principal |
| phone | text | Telefono |
| nif_cif | text | NIF/CIF fiscal |
| fiscal_address | text | Direccion fiscal |
| city | text | Ciudad |
| postal_code | text | Codigo postal |
| country | text | Pais |
| website | text | Sitio web |
| sector | text | Sector/industria |
| status | enum | prospecto, activo, inactivo, perdido |
| pipeline_stage | enum | nuevo, contactado, propuesta, negociacion, cerrado_ganado, cerrado_perdido |
| assigned_to | text | Responsable asignado |
| notes | text | Notas generales |
| source | text | Origen (web, referido, evento, etc.) |
| source_site | site_source | Filtro multi-sitio |
| created_at | timestamptz | Fecha creacion |
| updated_at | timestamptz | Fecha actualizacion |

**2. `crm_interactions`** - Historial de interacciones

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| id | uuid PK | Identificador |
| client_id | uuid FK | Referencia al cliente |
| type | enum | llamada, email, reunion, nota, tarea |
| subject | text | Asunto |
| description | text | Detalle |
| date | timestamptz | Fecha de la interaccion |
| created_by | text | Quien registro |
| created_at | timestamptz | Fecha registro |

**3. `crm_contracts`** - Contratos y servicios

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| id | uuid PK | Identificador |
| client_id | uuid FK | Referencia al cliente |
| service_name | text | Servicio contratado |
| status | enum | activo, pausado, finalizado, renovacion_pendiente |
| start_date | date | Inicio |
| end_date | date | Fin/renovacion |
| amount | numeric | Importe |
| billing_frequency | text | mensual, trimestral, anual |
| notes | text | Notas |
| created_at | timestamptz | Fecha creacion |

### RLS Policies

- Lectura y escritura restringida a usuarios autenticados
- Uso de `has_role(auth.uid(), 'admin')` para todas las operaciones

## Estructura de Archivos

```text
src/
  pages/admin/
    AdminCRM.tsx                    -- Pagina principal con tabs
  components/admin/crm/
    CRMDashboard.tsx                -- Dashboard con metricas y KPIs
    CRMPipeline.tsx                 -- Vista Kanban del pipeline
    CRMPipelineColumn.tsx           -- Columna individual del Kanban
    CRMPipelineCard.tsx             -- Tarjeta de cliente en Kanban
    CRMClientList.tsx               -- Vista de tabla de clientes
    CRMClientForm.tsx               -- Formulario crear/editar cliente
    CRMClientDetail.tsx             -- Modal detalle del cliente
    CRMInteractionForm.tsx          -- Formulario nueva interaccion
    CRMInteractionTimeline.tsx      -- Timeline de interacciones
    CRMContractList.tsx             -- Lista de contratos del cliente
    CRMContractForm.tsx             -- Formulario crear/editar contrato
    CRMFilters.tsx                  -- Filtros de busqueda
  hooks/
    useCRMClients.ts                -- CRUD de clientes
    useCRMInteractions.ts           -- CRUD de interacciones
    useCRMContracts.ts              -- CRUD de contratos
    useCRMStats.ts                  -- Estadisticas y metricas
```

## Componentes Principales

### 1. AdminCRM.tsx - Pagina principal

Pagina con sistema de tabs:
- **Dashboard**: KPIs, graficos de conversion, facturacion
- **Pipeline**: Vista Kanban arrastrando clientes entre etapas
- **Clientes**: Tabla completa con filtros y busqueda
- **Contratos**: Vista de contratos con alertas de renovacion

### 2. CRMPipeline.tsx - Vista Kanban

```text
+-------------+-------------+--------------+---------------+------------------+
|   Nuevo     | Contactado  |  Propuesta   |  Negociacion  |  Cerrado Ganado  |
+-------------+-------------+--------------+---------------+------------------+
| [Card]      | [Card]      | [Card]       | [Card]        | [Card]           |
| [Card]      | [Card]      |              |               |                  |
|             |             |              |               |                  |
+-------------+-------------+--------------+---------------+------------------+
```

- Drag-and-drop nativo (reutilizando patron del TopBar)
- Al mover una tarjeta se actualiza `pipeline_stage` en la BD
- Cada tarjeta muestra: nombre, sector, valor estimado, dias en etapa

### 3. CRMClientDetail.tsx - Detalle de cliente

Modal/pagina con:
- Datos generales y fiscales
- Timeline de interacciones (llamadas, emails, reuniones)
- Lista de contratos activos
- Boton para registrar nueva interaccion
- Historial de cambios de pipeline

### 4. CRMDashboard.tsx - Metricas

- Total clientes por estado (activo, prospecto, perdido)
- Funnel de conversion del pipeline
- Facturacion mensual por contratos
- Contratos proximos a vencer (30 dias)
- Actividad reciente (ultimas interacciones)

## Integracion con Admin

### Sidebar

Anadir entrada nueva en `AdminSidebar.tsx`:
```text
{ path: '/admin/crm', icon: Briefcase, label: 'CRM' }
```

### Rutas

Anadir ruta en el router principal:
```text
/admin/crm -> AdminCRM.tsx
```

## Flujo de Uso

1. El admin accede a `/admin/crm`
2. Ve el dashboard con KPIs generales
3. Cambia a la vista Pipeline para ver el Kanban
4. Arrastra un cliente de "Nuevo" a "Contactado"
5. Hace clic en la tarjeta para ver el detalle
6. Registra una interaccion (llamada, email, reunion)
7. Crea un contrato cuando se cierra la venta
8. En la tab Contratos ve alertas de renovacion

## Consideraciones

- Se reutiliza el patron de `source_site` para compatibilidad multi-sitio
- El drag-and-drop usa la API nativa HTML5, reutilizando el hook creado para el TopBar
- Los datos fiscales (NIF/CIF) se almacenan como texto plano, sin validacion de formato ya que pueden ser de distintos paises
- Exportacion a CSV/Excel reutilizando las utilidades existentes en `src/lib/exportContactLeads.ts`

