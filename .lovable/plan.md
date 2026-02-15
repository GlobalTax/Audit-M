

# Plan: Enriquecer datos de empresas con Firecrawl

## Objetivo

Añadir un boton "Enriquecer datos" en la ficha de cada empresa que use Firecrawl para scrappear su web y rellenar automaticamente campos como sector, direccion, telefono, email, y notas con la informacion extraida.

---

## 1. Edge Function `firecrawl-enrich-company`

Crear `supabase/functions/firecrawl-enrich-company/index.ts`:

- Recibe `{ url, clientId }` por POST
- Usa la API de Firecrawl con `FIRECRAWL_API_KEY` para scrappear la URL con formato `json` y un schema estructurado que extraiga:
  - Descripcion de la empresa
  - Sector / industria
  - Telefono de contacto
  - Email de contacto
  - Direccion fisica
  - Ciudad
  - Codigo postal
  - Pais
- Devuelve los datos estructurados al frontend
- Registrar en `supabase/config.toml` con `verify_jwt = false`

## 2. API client en frontend

Crear `src/lib/api/firecrawl.ts` con una funcion `enrichCompany(url, clientId)` que invoque la edge function via `supabase.functions.invoke`.

## 3. Boton "Enriquecer con web" en la ficha de empresa

En `src/pages/admin/AdminCRMClientDetail.tsx`:

- Añadir un boton con icono Globe junto al dropdown de acciones
- Solo visible si el cliente tiene campo `website` rellenado
- Al hacer clic: llama a la edge function, muestra loading, y presenta un dialogo de confirmacion con los datos encontrados antes de guardar
- Al confirmar: actualiza los campos del cliente via `useUpdateCRMClient` (solo los campos vacios o que el usuario seleccione)

## 4. Dialogo de revision de datos

Crear `src/components/admin/crm/CRMEnrichDialog.tsx`:

- Muestra los datos extraidos junto a los datos actuales
- Checkboxes para seleccionar que campos sobreescribir
- Los campos vacios se preseleccionan automaticamente
- Boton "Aplicar cambios" que ejecuta el update

---

## Archivos a crear/modificar

| Archivo | Accion |
|---------|--------|
| `supabase/functions/firecrawl-enrich-company/index.ts` | Crear - edge function de scraping |
| `supabase/config.toml` | Editar - registrar nueva funcion |
| `src/lib/api/firecrawl.ts` | Crear - client API |
| `src/components/admin/crm/CRMEnrichDialog.tsx` | Crear - dialogo de revision |
| `src/pages/admin/AdminCRMClientDetail.tsx` | Editar - boton enriquecer |

## Flujo del usuario

1. Abre la ficha de una empresa que tiene web
2. Pulsa "Enriquecer con web"
3. Se scrappea la pagina y se muestran los datos encontrados
4. Selecciona que campos quiere actualizar
5. Confirma y se guardan los datos en el CRM

