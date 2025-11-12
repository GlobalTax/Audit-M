# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/632c2fc0-5729-4c68-81a2-361783c0e7cd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/632c2fc0-5729-4c68-81a2-361783c0e7cd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

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

**Resultado esperado:**

```
🔄 Iniciando sincronización de fechas en sitemap.xml...

📅 Fecha de actualización: 2025-12-15
📄 Leyendo: /path/to/public/sitemap.xml
  ✓ /privacidad: 2025-11-12 → 2025-12-15
  ✓ /aviso-legal: 2025-11-12 → 2025-12-15
  ✓ /cookies: 2025-11-12 → 2025-12-15
  ✓ /condiciones-contratacion: 2025-11-12 → 2025-12-15

✅ Sitemap actualizado correctamente (4 cambios)
```

**Paso 3:** Verificar los cambios

- ✅ Las 4 páginas legales muestran la nueva fecha en su UI
- ✅ El `sitemap.xml` tiene las fechas actualizadas
- ✅ Las fechas son consistentes en todo el sitio

### 📋 Scripts Disponibles

```bash
# Sincronizar fechas del sitemap con seoUtils.ts
npm run sync-sitemap

# (Opcional) Puedes agregar esto al pre-build para automatización
npm run build  # Si configuras prebuild, sync-sitemap se ejecuta automáticamente
```

### ✅ Beneficios del Sistema

- **Centralizado**: Un solo lugar para actualizar fechas (`seoUtils.ts`)
- **Automático**: Las páginas se actualizan sin tocar código
- **Sincronizado**: Script garantiza consistencia con `sitemap.xml`
- **SEO-friendly**: Fechas correctas para indexación de Google
- **Sin errores**: Elimina actualizaciones manuales propensas a errores

### 🔍 Archivos Involucrados

| Archivo | Propósito |
|---------|-----------|
| `src/lib/seoUtils.ts` | Fuente única de verdad para fechas legales |
| `src/pages/Privacy.tsx` | Página de Política de Privacidad |
| `src/pages/Legal.tsx` | Página de Aviso Legal |
| `src/pages/Cookies.tsx` | Página de Política de Cookies |
| `src/pages/Terms.tsx` | Página de Términos de Contratación |
| `src/scripts/syncSitemapDates.ts` | Script de sincronización de sitemap |
| `public/sitemap.xml` | Sitemap para motores de búsqueda |

### 🚨 Importante

Después de actualizar las fechas:
1. ✅ Ejecuta `npm run sync-sitemap`
2. ✅ Verifica que el script muestre actualización exitosa
3. ✅ Haz commit de los cambios en `seoUtils.ts` y `sitemap.xml`
4. ✅ Despliega a producción

### 🛠️ Troubleshooting

**Error: "No se encontró lastUpdateISO en seoUtils.ts"**
- Verifica que `seoUtils.ts` tenga la propiedad `lastUpdateISO` con formato `"YYYY-MM-DD"`

**El script no actualiza las fechas**
- Verifica que las URLs en `LEGAL_URLS` coincidan con las del `sitemap.xml`
- Las URLs deben ser: `/privacidad`, `/aviso-legal`, `/cookies`, `/condiciones-contratacion`

**Fechas desincronizadas**
- Siempre ejecuta `npm run sync-sitemap` después de editar `seoUtils.ts`
- Considera agregar el script como prebuild si haces muchas actualizaciones

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/632c2fc0-5729-4c68-81a2-361783c0e7cd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
