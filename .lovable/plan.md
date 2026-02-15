
# Corregir indexacion de paginas

## Problemas detectados

1. **`BASE_DOMAIN` apunta a `nrro.es`** en lugar de `audit.es` - todos los canonical URLs estan mal
2. **Sitemap estatico (`public/sitemap.xml`)** con URLs de `nrro.es` - Google no encuentra las paginas reales
3. **`sitemapConfig.ts`** usa `global.audit.es` como dominio
4. **`robots.txt`** referencia `global.audit.es/sitemap.xml`
5. **No se inyecta `<meta name="robots" content="index, follow">`** en las paginas
6. **Meta tags se inyectan via JavaScript** (useEffect) - los crawlers basicos no los ven

## Cambios propuestos

### 1. Corregir `BASE_DOMAIN` en `src/lib/seoUtils.ts`

Cambiar para que use el dominio del site activo en lugar de hardcodear `nrro.es`:

```
import { getCurrentSiteConfig } from '@/config/site';
export const BASE_DOMAIN = `https://${getCurrentSiteConfig().domain}`;
```

Resultado: todos los canonical URLs y og:urls apuntaran a `https://audit.es` automaticamente.

### 2. Actualizar `sitemapConfig.ts`

Cambiar `SITEMAP_DOMAIN` para que tambien use el dominio dinamico del site activo, y actualizar las rutas a las que realmente existen en el router (ej: `/services` en vez de `/auditoria-cuentas-anuales` si no existe esa ruta).

### 3. Regenerar `public/sitemap.xml`

Actualizar con las URLs correctas de `audit.es` y las rutas reales del router:
- `https://audit.es/`
- `https://audit.es/services`
- `https://audit.es/case-studies`
- `https://audit.es/blog`
- `https://audit.es/about`
- `https://audit.es/team`
- `https://audit.es/contact`
- etc.

### 4. Corregir `robots.txt`

Cambiar la referencia del sitemap a `https://audit.es/sitemap.xml`.

### 5. Añadir meta `robots` en `Meta.tsx`

Inyectar `<meta name="robots" content="index, follow">` junto con los demas meta tags para indicar explicitamente a los buscadores que indexen las paginas.

### 6. Corregir `index.html`

Actualizar los meta tags estaticos (og:url, og:image, twitter:image) para que apunten a `audit.es` consistentemente.

## Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/lib/seoUtils.ts` | BASE_DOMAIN dinamico desde site config |
| `src/config/sitemapConfig.ts` | SITEMAP_DOMAIN dinamico + rutas corregidas |
| `public/sitemap.xml` | URLs de audit.es con rutas reales |
| `public/robots.txt` | Sitemap URL corregida |
| `src/components/seo/Meta.tsx` | Añadir meta robots index,follow |
| `index.html` | Corregir og:url y dominios estaticos |

## Resultado esperado

- Google vera canonical URLs consistentes apuntando a `audit.es`
- El sitemap tendra URLs correctas y accesibles
- `robots.txt` dirigira a los crawlers al sitemap correcto
- Cada pagina tendra la directiva `index, follow` explicita
