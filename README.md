# global.nrro.es — Navarro Global Advisory

## Sobre el Proyecto

**global.nrro.es** es la plataforma digital de la división internacional del **Grupo Navarro**, un grupo de firmas de asesoría legal, fiscal y contable con sede en España.

### Grupo Navarro

El grupo está compuesto por tres entidades:

| Entidad | Enfoque | Dominio |
|---------|---------|---------|
| **Navarro Legal & Tax** | Asesoría doméstica España | nrro.es |
| **Navarro Global** | Clientes internacionales | global.nrro.es |
| **Capittal** | Servicios especializados | capittal.es |

---

## Propósito

Plataforma premium de conversión para ejecutivos y empresas internacionales que buscan asesoramiento legal, fiscal y contable en España.

### Audiencia Objetivo

- Multinacionales entrando en España
- Empresas españolas expandiéndose internacionalmente
- Inversores extranjeros
- Expatriados y ejecutivos en movilidad global
- Family offices con operaciones transfronterizas
- Fondos de PE/VC estructurando en España

---

## Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Frontend | React 18 + Vite |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS + shadcn/ui |
| Backend | Supabase (Auth, DB, Edge Functions, Storage) |
| Animaciones | Framer Motion |
| Mapas | react-simple-maps |
| Data Fetching | TanStack Query |
| Analytics | Google Analytics 4 |

---

## Arquitectura Multi-Sitio

El proyecto comparte base de datos con `nrro.es` usando separación por `source_site`:

- `SITE_SOURCE = 'int'` en `src/config/site.ts`
- Columna `source_site` en tablas: blog_posts, services, demo_requests, etc.
- Edge Functions respetan el filtrado por sitio

---

## Redes Internacionales

Navarro Global proyecta presencia global a través de alianzas con:

- **Integra International** — Red global de firmas contables
- **XLNC** — Alianza de firmas legales y fiscales
- **SBC Global Alliance** — Red de advisory boutique

El **Global Coverage Map** muestra 54+ ciudades de estas redes.

---

## Características Principales

### Conversión

- Homepage con Global Reach Bar y mapa interactivo
- Lead magnets descargables (Playbooks, Checklists)
- Herramientas interactivas (Calculators, Quizzes)
- CTAs estratégicos con tracking GA4

### SEO

- Topic Hubs: Spain Company Setup, Beckham Law, M&A Gateway
- Pillar pages con contenido de autoridad
- Schema markup (Organization, FAQ, Breadcrumb)

### Admin

- Blog CMS con AI-assisted content
- Services Manager
- Deck Studio (presentaciones)
- Proposal Generator
- Lead Management

---

## Sistema de Diseño

| Elemento | Especificación |
|----------|----------------|
| Hero | `bg-black text-white`, clase `.hero-title` |
| H1/H2 | `font-normal` (peso 400) |
| H3 Cards | `font-medium` (peso 500) |
| Overlines | `font-mono font-light uppercase` |
| Secciones | `py-20 md:py-28` |
| Container | `container mx-auto px-4 sm:px-6 lg:px-8` |

---

## Configuración

El sitio se configura en `src/config/site.ts`:

```typescript
export const SITE_SOURCE: SiteSource = 'int';
```

---

## Desarrollo

```bash
npm install
npm run dev
```

---

## Despliegue

El frontend se despliega via Lovable. Las Edge Functions se despliegan automáticamente.

---

## 📅 Sistema de Versionado de Páginas Legales

Este proyecto incluye un sistema automático de versionado para las páginas legales (Privacidad, Aviso Legal, Cookies y Términos de Contratación).

### Arquitectura del Sistema

El sistema está compuesto por tres componentes principales:

1. **Fuente única de verdad**: `src/lib/seoUtils.ts`
   - Define `legalVersions` con las fechas de actualización
   - Formato legible: `lastUpdate: "12 de noviembre de 2025"`
   - Formato ISO para sitemap: `lastUpdateISO: "2025-11-12"`

2. **Páginas legales**: 
   - `src/pages/Privacy.tsx`
   - `src/pages/Legal.tsx`
   - `src/pages/Cookies.tsx`
   - `src/pages/Terms.tsx`
   - Todas importan y usan `{legalVersions.lastUpdate}` automáticamente

3. **Script de sincronización**: `src/scripts/syncSitemapDates.ts`
   - Sincroniza `public/sitemap.xml` con las fechas de `seoUtils.ts`
   - Actualiza automáticamente los tags `<lastmod>` de las 4 páginas legales

### 🔄 Cómo Actualizar las Fechas Legales

**Paso 1:** Editar `src/lib/seoUtils.ts`

```typescript
export const legalVersions = {
  lastUpdate: "15 de diciembre de 2025",      // ← Formato para UI
  lastUpdateISO: "2025-12-15",                // ← Formato ISO para sitemap
};
```

**Paso 2:** Ejecutar el script de sincronización

```bash
npm run sync-sitemap
```

**Paso 3:** Verificar los cambios

- ✅ Las 4 páginas legales muestran la nueva fecha en su UI
- ✅ El `sitemap.xml` tiene las fechas actualizadas
- ✅ Las fechas son consistentes en todo el sitio

### 📋 Scripts Disponibles

```bash
npm run sync-sitemap
```

---

## Lovable Project

**URL**: https://lovable.dev/projects/632c2fc0-5729-4c68-81a2-361783c0e7cd

## Custom Domain

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.
