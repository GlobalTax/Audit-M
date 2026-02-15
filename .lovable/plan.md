
# Mejora integral del Blog, BlogDetail e Intranet (Admin)

## Problemas criticos detectados

### 1. BUG BLOQUEANTE: Los posts del blog NO se muestran en el site audit

**Causa raiz**: En `useBlogSearch.ts` (y 10+ hooks mas), el tipo se castea como `'es' | 'int'`, excluyendo `'audit'`:
```typescript
const sourceFilter = getSourceFilter() as 'es' | 'int'; // ignora 'audit'
```
Esto hace que la query `.eq("source_site", sourceFilter)` falle silenciosamente ya que TypeScript no lo bloquea pero Supabase no encuentra coincidencias con el tipo incorrecto.

**Solucion**: Cambiar todos los casts a `'es' | 'int' | 'audit'` en los 10 archivos afectados:
- `useBlogSearch.ts` (3 ocurrencias)
- `useContactLeads.ts` (3)
- `useJobPositions.ts` (3)
- `usePageContent.ts` (2)
- `useSitePages.ts` (2)
- `useCandidatos.ts` (2)
- `useNewsSearch.ts` (1)
- `useTechnology.ts` (2)
- `useSiteSettings.ts` (1)
- `useLandingPages.ts` (2)

### 2. BlogDetail: idioma incorrecto en site audit

En `BlogDetail.tsx` linea 75, los campos se resuelven asi:
```typescript
title: post.title_en || post.title_es,
```
Esto prioriza ingles sobre espanol, pero el site audit es `defaultLanguage: 'es'`. Deberia usar el idioma activo del contexto.

**Solucion**: Usar `language` del `useLanguage()` para resolver los campos dinamicamente:
```typescript
title: post[`title_${language}`] || post.title_es,
```

### 3. BlogPostCard: slug prioriza ingles incorrectamente

Linea 37 de `BlogPostCard.tsx`:
```typescript
const blogPath = `/blog/${slug_en || slug_es || slug}`;
```
En el site audit (espanol), deberia priorizar `slug_es`.

**Solucion**: Usar el idioma del contexto para determinar el slug prioritario.

### 4. PopularArticles: hardcodeado a `source_site = 'int'`

El hook `usePopularArticles.ts` tiene hardcodeado:
```typescript
.eq('source_site', 'int')
.not('title_en', 'is', null)
```
Solo muestra articulos del site internacional, nunca del audit.

**Solucion**: Usar `getSourceFilter()` y seleccionar campos segun el idioma del site.

### 5. useRelatedBlogPosts: no filtra por source_site

El hook `useRelatedBlogPosts.ts` busca posts relacionados sin filtrar por `source_site`, mostrando potencialmente articulos de otros sites.

**Solucion**: Anadir `.eq('source_site', sourceFilter)` a las queries.

### 6. Blog: sin filtros por categoria/tags

La pagina `/blog` solo tiene busqueda de texto. No tiene filtros por categoria ni tags, aunque los datos existen y hay un hook `useBlogFilterOptions` disponible.

**Solucion**: Anadir filtros de categoria como chips/badges clickables encima del grid de posts.

### 7. BlogPostCard: sin imagen destacada

Las tarjetas no muestran `featured_image` aunque el campo existe en la BD. Esto hace que todas las tarjetas se vean iguales (solo texto).

**Solucion**: Anadir la imagen destacada en la parte superior de la tarjeta cuando exista.

### 8. Textos hardcodeados en ingles

- `PopularArticles.tsx`: "Most Popular" hardcodeado
- `BlogDetail.tsx`: fecha formateada con locale "en-US" en lugar del idioma activo
- `ReadingProgressBar`: posicion `top-20` que puede solaparse con la barra de navegacion

---

## Plan de implementacion

### Fase 1: Correccion critica - Mostrar posts (prioridad maxima)

**Archivos**: Todos los hooks con `as 'es' | 'int'`

Cambiar el cast en los 10 archivos a:
```typescript
const sourceFilter = getSourceFilter() as 'es' | 'int' | 'audit';
```

### Fase 2: Correccion de idioma en BlogDetail y BlogPostCard

**Archivo**: `src/pages/BlogDetail.tsx`
- Usar `language` del contexto para resolver titulo, excerpt, content, slug, seo_title, seo_description
- Cambiar locale de fecha de "en-US" al idioma activo
- Corregir la URL de og:image que aun referencia `nrro.es`

**Archivo**: `src/components/blog/BlogPostCard.tsx`
- Usar `useLanguage()` para determinar que slug priorizar (`slug_es` en site audit, `slug_en` en site int)

### Fase 3: Correccion de PopularArticles y RelatedPosts

**Archivo**: `src/hooks/usePopularArticles.ts`
- Usar `getSourceFilter()` en lugar de hardcodear `'int'`
- Seleccionar campos de titulo/slug segun el idioma del site

**Archivo**: `src/hooks/useRelatedBlogPosts.ts`
- Anadir filtro `.eq('source_site', sourceFilter)` a las 3 queries (categoryPosts, tagPosts, recentPosts)

**Archivo**: `src/components/blog/PopularArticles.tsx`
- Internacionalizar "Most Popular" usando `t()`

### Fase 4: Filtros de categoria en el Blog

**Archivo**: `src/pages/Blog.tsx`
- Importar `useBlogFilterOptions` 
- Mostrar categorias como badges/chips clickables debajo del buscador
- Al hacer click en una categoria, filtrar los posts
- Anadir un chip "Todos" para resetear el filtro

### Fase 5: Imagen destacada en BlogPostCard

**Archivo**: `src/components/blog/BlogPostCard.tsx`
- Anadir prop `featuredImage?: string`
- Mostrar la imagen en la parte superior de la tarjeta con aspect ratio 16:9
- Si no hay imagen, mantener el diseno actual (solo texto)

**Archivo**: `src/pages/Blog.tsx` y `src/components/blog/RelatedBlogPosts.tsx`
- Pasar `featuredImage` al componente `BlogPostCard`

### Fase 6: Mejoras menores en la Intranet (Admin Blog)

**Archivo**: `src/pages/admin/AdminBlog.tsx`
- El formulario de creacion (`BlogFormDialog`) no asigna `source_site` al crear un post nuevo. Anadir `source_site: getSourceFilter()` al objeto `postData` para que los nuevos posts se creen con el site correcto.

---

## Seccion tecnica - Resumen de archivos

| Archivo | Cambio |
|---------|--------|
| `src/hooks/useBlogSearch.ts` | Corregir cast de sourceFilter |
| `src/hooks/useContactLeads.ts` | Corregir cast |
| `src/hooks/useJobPositions.ts` | Corregir cast |
| `src/hooks/usePageContent.ts` | Corregir cast |
| `src/hooks/useSitePages.ts` | Corregir cast |
| `src/hooks/useCandidatos.ts` | Corregir cast |
| `src/hooks/useNewsSearch.ts` | Corregir cast |
| `src/hooks/useTechnology.ts` | Corregir cast |
| `src/hooks/useSiteSettings.ts` | Corregir cast |
| `src/hooks/useLandingPages.ts` | Corregir cast |
| `src/pages/BlogDetail.tsx` | Idioma dinamico, og:image URL, fecha locale |
| `src/components/blog/BlogPostCard.tsx` | Slug por idioma, imagen destacada |
| `src/hooks/usePopularArticles.ts` | sourceFilter dinamico |
| `src/hooks/useRelatedBlogPosts.ts` | Filtro por source_site |
| `src/components/blog/PopularArticles.tsx` | Internacionalizar textos |
| `src/pages/Blog.tsx` | Filtros de categoria, pasar featuredImage |
| `src/components/blog/RelatedBlogPosts.tsx` | Pasar featuredImage |
| `src/components/admin/blog/BlogFormDialog.tsx` | Anadir source_site al crear post |
