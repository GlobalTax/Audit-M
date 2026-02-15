

# Corregir dominio de `audit.es` a `audit.nrro.es`

## Problema

Todas las referencias al dominio usan `audit.es` cuando el dominio real es `audit.nrro.es`. Esto afecta a canonical URLs, sitemap, robots.txt, OpenGraph tags y schema.org.

## Cambios

### 1. Fuente principal: `src/config/site.ts`

Cambiar `domain: 'audit.es'` a `domain: 'audit.nrro.es'` en la config del site `audit`. Como `seoUtils.ts` y `sitemapConfig.ts` ya usan `getCurrentSiteConfig().domain`, esto propagara automaticamente a canonical URLs, OG tags y sitemap config.

### 2. Archivos estaticos (no se generan dinamicamente)

| Archivo | Cambio |
|---------|--------|
| `public/sitemap.xml` | Reemplazar todas las URLs `audit.es` por `audit.nrro.es` |
| `public/robots.txt` | Cambiar sitemap URL a `https://audit.nrro.es/sitemap.xml` |
| `index.html` | Cambiar og:image, og:url y twitter:image a `audit.nrro.es` |

### 3. Archivos con dominio hardcodeado

| Archivo | Cambio |
|---------|--------|
| `src/lib/urlUtils.ts` | Cambiar `BASE_DOMAIN` hardcodeado a `audit.nrro.es` |
| `src/components/seo/OrganizationSchema.tsx` | Cambiar URLs y email de `audit.es` a `audit.nrro.es` |
| `src/pages/admin/AdminLogin.tsx` | Placeholder del email (cosmetico) |

## Resultado

Todos los canonical URLs, OG tags, sitemap y robots.txt apuntaran consistentemente a `https://audit.nrro.es`.

