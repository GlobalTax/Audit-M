
# Columnas configurables en la tabla de Empresas/Personas

## Que se hara

Se anadira un selector de columnas a la tabla del CRM para que puedas elegir que columnas ver. Aparecera un boton "Columnas" junto a los filtros que abrira un menu desplegable con checkboxes para mostrar/ocultar cada columna. La seleccion se guardara en localStorage para que persista entre sesiones.

## Columnas disponibles

Ademas de las actuales (Cliente, NIF/CIF, Sector, Estado, Etapa, Valor, Auditoria, Alta), se anadiran estas columnas opcionales:

- **Telefono** (phone)
- **Direccion fiscal** (fiscal_address)
- **Ciudad** (city)
- **Codigo postal** (postal_code)
- **Pais** (country)
- **Web** (website)
- **Origen** (source)
- **Asignado a** (assigned_to)
- **Facturacion** (total_facturacion) - formateado como moneda
- **Empleados** (num_empleados)
- **Total activo** (total_activo) - formateado como moneda
- **Ultima actualizacion** (updated_at)

## Como funcionara

1. Un boton con icono de columnas (SlidersHorizontal) junto al filtro de estado
2. Al pulsarlo se despliega un Popover con checkboxes para cada columna
3. Las columnas por defecto (Cliente, NIF/CIF, Sector, Estado, Etapa, Valor, Auditoria, Alta) estaran activadas inicialmente
4. La preferencia se guarda en `localStorage` con clave separada para personas y empresas

## Detalle tecnico

**Archivo**: `src/components/admin/crm/CRMClientList.tsx`

- Definir un array de configuracion de columnas con `key`, `label`, `defaultVisible`, y una funcion `render`
- Anadir estado `visibleColumns` (Set de keys) inicializado desde localStorage
- Anadir un componente Popover con Checkboxes para toglear columnas
- Generar `TableHead` y `TableCell` dinamicamente basandose en `visibleColumns`
- Guardar en localStorage al cambiar la seleccion
