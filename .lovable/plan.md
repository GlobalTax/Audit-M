

# Plan: Diferenciar Personas y Empresas en el CRM

## Problema

Todos los registros importados (ACCESFLUID, ARMAKIT S.L., BIGAS GRUP, etc.) son empresas, pero aparecen tanto en la vista "Personas" como en "Empresas" porque no existe ningún campo que los distinga.

## Solución

Añadir un campo `client_type` a la tabla `crm_clients` para clasificar cada registro como **persona** o **empresa**, y filtrar las vistas correspondientes.

---

## 1. Base de datos

- Añadir columna `client_type` (text, default `'empresa'`) a `crm_clients`
- Actualizar todos los registros existentes a `client_type = 'empresa'` (ya que todos son empresas)

## 2. Hook `useCRMClients.ts`

- Añadir `client_type` al tipo `CRMClient`
- Añadir filtro opcional `client_type` en el query

## 3. Vista `AdminCRM.tsx`

- La ruta `personas` pasa `clientType="persona"` a `CRMClientList`
- La ruta `empresas` pasa `clientType="empresa"` a `CRMClientList`

## 4. Componente `CRMClientList.tsx`

- Aceptar prop `clientType` y filtrar automáticamente por ese tipo
- Cambiar el texto del botón: "Nueva Persona" o "Nueva Empresa" segun la vista
- Pasar `clientType` al formulario para preseleccionar el tipo

## 5. Formulario `CRMClientForm.tsx`

- Añadir selector de tipo: Persona / Empresa
- Preseleccionar segun la vista desde la que se abre

## 6. Tipos Supabase

- Actualizar `types.ts` para incluir `client_type`

---

## Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| Migración SQL | Añadir columna `client_type`, actualizar registros existentes |
| `src/integrations/supabase/types.ts` | Añadir campo |
| `src/hooks/useCRMClients.ts` | Filtro por `client_type` |
| `src/pages/admin/AdminCRM.tsx` | Pasar prop `clientType` a cada vista |
| `src/components/admin/crm/CRMClientList.tsx` | Recibir y aplicar filtro `clientType` |
| `src/components/admin/crm/CRMClientForm.tsx` | Campo tipo persona/empresa |

