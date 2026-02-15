
# Mejorar la seccion de Premios y Reconocimientos

## Problemas detectados

1. **No filtra por site**: El hook `useAwards` no filtra por `source_site`, asi que muestra premios de todos los sitios (audit + int) mezclados
2. **Grid de 7 columnas para pocos premios**: Con solo 2-4 premios el layout queda muy vacio y desproporcionado

## Cambios

### 1. Filtrar premios por `source_site` en `useAwards`

**Archivo**: `src/hooks/useAwards.ts`

- Importar `getSourceFilter` desde `src/config/site.ts`
- Añadir `.eq('source_site', sourceFilter)` a la query de `useAwards()` (la del frontend)
- La query de admin (`useAdminAwards`) se deja sin filtro para ver todos

### 2. Grid adaptativo en `AwardsRecognitionStrip`

**Archivo**: `src/components/home/AwardsRecognitionStrip.tsx`

- Cambiar el grid de `lg:grid-cols-7` a un layout que se adapte al numero de premios:
  - 1-2 premios: centrados en una fila con `max-w-md` por tarjeta
  - 3-4 premios: `grid-cols-2 md:grid-cols-4` centrado con `max-w-4xl`
  - 5+: mantener grid responsivo pero sin forzar 7 columnas (`lg:grid-cols-5` como maximo)
- Tambien ajustar el skeleton loader para que coincida

### Resultado esperado

Con `SITE_SOURCE = 'audit'`, solo se mostraran los 2 premios de audit, centrados y bien distribuidos en la seccion, sin espacios vacios.
