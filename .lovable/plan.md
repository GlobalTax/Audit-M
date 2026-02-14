

# Plan: Redisenar CRM al estilo Apollo

## Resumen

Transformar el CRM actual (basado en tabs simples) a un layout de 3 paneles al estilo Apollo.io, con navegacion lateral dedicada, vista de lista/detalle integrada, y panel de informacion de empresa en la parte derecha.

## Layout Principal

```text
+------------------+-----------------------------+-------------------------------+
| Sidebar CRM      | Panel Central               | Panel Derecho                 |
| (Nav + Filtros)   | (Lista o Detalle cliente)   | (Info Empresa + Datos)        |
| 220px            |                             |                               |
|                  | Breadcrumb: Personas > Name |  Perspectivas de la empresa   |
| [Personas]       |                             |  Tabs: Puntuacion, Resumen... |
|   - Empresas     | Alfonso Lopez               |                               |
|   - Listas       | Executive President en...   |  Score: 27/100 [Bueno]        |
|                  |                             |                               |
| [Comprometer]    | Detalles del registro       |  Empresa: Albali Centros...   |
|   - Secuencias   |   ETAPA: [Cold]             |  Tabs: Acerca de, Prospectos  |
|   - Emails       |   DUENO: Samuel navarro     |                               |
|   - Llamadas     |   FECHA ULTIMA ACTIVIDAD    |  PALABRAS CLAVE: [tags]       |
|                  |                             |  ANO FUNDACION: 1985          |
| [Ganar Tratos]   | Cuenta                      |  INDUSTRIAS: [tags]            |
|   - Reuniones    |   Albali Centros...         |  NUM EMPLEADOS: 59            |
|   - Tratos       |   http://www...             |  PROPIETARIO: SN              |
|                  |                             |  ETAPA: [Cold]                |
| [Herramientas]   | Tratos                      |  UBICACION: 7A Avenida...     |
|   - Analitica    |   + Agregar oferta          |                               |
|                  |                             |                               |
| [Registros]      | Notas                       |                               |
|   - Personas     |                             |                               |
|   - Empresas     |                             |                               |
+------------------+-----------------------------+-------------------------------+
```

## Cambios por Archivo

### 1. AdminCRM.tsx - Layout principal de 3 paneles

Reescribir completamente. En lugar de tabs, usar un layout con:
- Sidebar izquierdo del CRM (nav interna con secciones: Personas, Empresas, Pipeline, Tratos, Analitica)
- Area central que cambia segun la vista seleccionada (lista de personas, lista de empresas, pipeline kanban, dashboard)
- Panel derecho de detalle que aparece al seleccionar un cliente (info de empresa, datos fiscales, interacciones recientes)
- Estado interno para: vista activa (`personas` | `empresas` | `pipeline` | `tratos` | `analitica`), cliente seleccionado

### 2. Nuevo: CRMSidebar.tsx - Sidebar izquierdo del CRM

Sidebar oscuro interno (similar al AdminSidebar pero dentro del area de contenido del CRM) con:
- Barra de busqueda global en la parte superior
- Secciones colapsables:
  - **Prospectar**: Personas, Empresas, Listas
  - **Comprometer**: Secuencias (futuro), Emails, Llamadas
  - **Ganar Tratos**: Pipeline, Tratos/Contratos
  - **Herramientas**: Dashboard/Analitica
  - **Registros**: Personas guardadas, Empresas guardadas
- Indicadores de conteo en cada item
- Icono por seccion, estilo monospace para labels de seccion

### 3. Nuevo: CRMContactView.tsx - Vista detalle de contacto (panel central)

Layout de 2 columnas (centro + derecha) cuando un cliente esta seleccionado:
- **Panel izquierdo** (centro):
  - Breadcrumb: `Personas > Nombre del cliente`
  - Header: Iniciales + Nombre + Cargo/Sector + Ubicacion
  - Barra de acciones: Iconos de telefono, email, tarea, agregar a lista
  - Seccion "Detalles del registro" con campos clave-valor en formato Apollo:
    - ETAPA con badge de color
    - LISTA (a que lista pertenece)
    - DUENO / Responsable
    - FECHA ULTIMA ACTIVIDAD
  - Seccion "Cuenta" con info de la empresa asociada
  - Seccion "Tratos" con contratos activos + boton "Agregar oferta"
  - Seccion "Notas" con timeline de notas recientes

- **Panel derecho**:
  - Card "Perspectivas de la empresa" con tabs:
    - Puntuacion (score basado en valor estimado y actividad)
    - Resumen general
    - Todos los campos
  - Datos de empresa: palabras clave/sector, ano, industria, numero de empleados (si se tiene), propietario, etapa, ubicacion
  - Grafico de interaccion (barras simples mostrando actividad por semana)

### 4. CRMClientList.tsx - Vista de lista estilo Apollo

Redisenar la tabla para que se parezca mas a Apollo:
- Checkboxes en cada fila para seleccion multiple
- Columnas reorganizadas: Nombre (con initials avatar), Empresa/Sector, Email, Telefono, Etapa (badge de color), Propietario, Ultima actividad
- Header con filtros en linea
- Al hacer clic en una fila, se abre la vista de detalle en el panel central (no un Sheet/Modal)
- Barra de acciones masivas cuando hay seleccion (eliminar, cambiar etapa, asignar)

### 5. CRMClientDetail.tsx - Convertir de Sheet a panel inline

Dejar de usar `Sheet` (panel lateral). El detalle se mostrara directamente en el panel central de `AdminCRM.tsx`. Mantener la logica interna pero adaptar el layout a 2 columnas como Apollo:
- Columna izquierda: detalles del registro, cuenta, tratos, notas
- Columna derecha: perspectivas de empresa, datos completos

### 6. CRMDashboard.tsx - Renombrar a "Analitica"

Ajustar estilos para que sea consistente con el nuevo diseno Apollo. Sin cambios mayores de funcionalidad.

### 7. CRMPipeline.tsx - Mantener con ajustes visuales

Mantener el kanban pero ajustar para que aparezca dentro del layout de 3 paneles (sin sidebar derecho cuando se muestra el pipeline). Al hacer clic en una tarjeta, navegar a la vista de detalle del contacto.

### 8. lib/crm.ts - Ampliar con constantes Apollo

Agregar:
- Etiquetas para las secciones del sidebar
- Scoring helpers (calcular score de 0-100 basado en valor estimado, numero de interacciones, dias en pipeline)
- Constantes de la nueva navegacion

## Flujo de Uso

1. Admin entra a `/admin/crm`
2. Ve un sidebar izquierdo con navegacion CRM y la lista de personas en el centro
3. Hace clic en "Personas" para ver la tabla de clientes
4. Hace clic en un cliente -> el centro cambia a vista de detalle con panel derecho de empresa
5. Desde el detalle puede registrar interacciones, ver contratos, agregar notas
6. Navega a "Pipeline" en el sidebar para ver el kanban
7. Navega a "Analitica" para ver metricas/dashboard
8. "Tratos" muestra la vista de contratos

## Consideraciones Tecnicas

- No se necesitan cambios de base de datos, solo UI
- Se reutilizan todos los hooks existentes (useCRMClients, useCRMInteractions, etc.)
- El sidebar del CRM es un componente interno, separado del AdminSidebar
- Se usa `react-resizable-panels` (ya instalado) para los paneles ajustables
- Se mantiene el patron de font-weight 400 segun la politica de tipografia del proyecto
- Los colores del sidebar CRM siguen el patron del AdminSidebar (slate-900)

