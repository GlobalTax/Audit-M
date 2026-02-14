# Revisión del Proyecto Audit-M

**Fecha:** 2026-02-13
**Proyecto:** Audit-M (Navarro Global Advisory Division)
**Stack:** React 18 + TypeScript + Tailwind CSS + Supabase + Vite

---

## Resumen Ejecutivo

Audit-M es una plataforma web empresarial de conversión para Grupo Navarro, con un panel de administración completo que incluye CRM, gestión de contenido, landing pages dinámicas y generación AI. El proyecto es **funcional y bien estructurado**, pero presenta **hallazgos de seguridad que requieren atención inmediata**.

### Evaluación General

| Categoría | Puntuación | Notas |
|-----------|-----------|-------|
| **Arquitectura** | 8/10 | Buena separación de concerns, hooks reutilizables |
| **Calidad de Código** | 7/10 | TypeScript bien tipado, algunos patrones mejorables |
| **Seguridad** | 5/10 | Vulnerabilidades significativas en edge functions y emails |
| **Rendimiento** | 7/10 | React Query bien usado, falta memoización en algunos sitios |
| **Accesibilidad** | 5/10 | Falta ARIA en formularios, navegación por teclado limitada |
| **SEO** | 8/10 | Buen manejo de meta tags, sitemap, schema markup |
| **i18n** | 8/10 | Soporte completo ES/EN/CA con detección automática |

---

## 1. HALLAZGOS CRÍTICOS DE SEGURIDAD

### 1.1 `.env` no está en `.gitignore`

**Severidad: CRÍTICA**

El archivo `.env` contiene credenciales de Supabase y está comiteado en el repositorio:
```
VITE_SUPABASE_PROJECT_ID="zntotcpagkunvkwpubqu"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIs..."
VITE_SUPABASE_URL="https://zntotcpagkunvkwpubqu.supabase.co"
```

Además, las mismas credenciales están **hardcodeadas** en `src/integrations/supabase/client.ts:5-6`.

**Nota:** La clave `anon` de Supabase es técnicamente pública en aplicaciones SPA, pero las mejores prácticas indican:
- Añadir `.env` a `.gitignore`
- No hardcodear credenciales en el código fuente
- Usar `import.meta.env.VITE_SUPABASE_URL` en vez de strings literales

### 1.2 Inyección HTML en Templates de Email

**Severidad: ALTA**
**Archivos afectados:**
- `supabase/functions/submit-contact/index.ts`
- `supabase/functions/send-lead-notification/index.ts`

Los datos del usuario (nombre, email, empresa, mensaje) se interpolan directamente en HTML de email **sin escapar**:

```typescript
// submit-contact/index.ts
<h1>Gracias por contactarnos, ${name}</h1>
<p style="white-space: pre-wrap;">${contactData.message}</p>
```

Un atacante podría inyectar HTML/JavaScript que se renderizaría en clientes de email.

**Recomendación:** Crear una función helper de escape HTML:
```typescript
function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
```

### 1.3 Generación de Contraseñas Insegura

**Severidad: ALTA**
**Archivo:** `supabase/functions/create-admin-user/index.ts`

La función `generateSecurePassword()` usa `Math.random()` que **no es criptográficamente seguro**:

```typescript
password += uppercase[Math.floor(Math.random() * uppercase.length)];
```

Además, la contraseña temporal se devuelve en el body de la respuesta HTTP.

**Recomendación:** Usar `crypto.getRandomValues()` y nunca devolver contraseñas en respuestas HTTP.

### 1.4 Vulnerabilidad de Prompt Injection en Chat AI

**Severidad: ALTA**
**Archivo:** `supabase/functions/chat-assistant/index.ts`

El array `messages` del usuario se pasa directamente a la API de AI sin validación:

```typescript
const { messages } = await req.json();
// Sin validación de schema, longitud o contenido
body: JSON.stringify({
  messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
})
```

**Problemas:**
- Sin validación de esquema del array de mensajes
- Sin límite de cantidad de mensajes (riesgo DoS por consumo de tokens)
- Sin filtrado de contenido malicioso

### 1.5 CORS Permisivo en Todas las Edge Functions

**Severidad: MEDIA**

Todas las edge functions usan `'Access-Control-Allow-Origin': '*'`, permitiendo que cualquier dominio haga requests.

**Recomendación:** Restringir a dominios específicos:
```typescript
const ALLOWED_ORIGINS = ['https://audit.es', 'https://global.nrro.es'];
```

### 1.6 Falta de Autorización en send-lead-notification

**Severidad: MEDIA**
**Archivo:** `supabase/functions/send-lead-notification/index.ts`

La función no verifica autorización: cualquier persona que conozca un `leadId` puede disparar notificaciones por email.

### 1.7 Validación de Email Insuficiente

**Severidad: MEDIA**
**Archivo:** `supabase/functions/send-lead-notification/index.ts:216`

```typescript
if (sendConfirmation && lead.email && !lead.email.includes('pending.com'))
```

La validación `!lead.email.includes('pending.com')` es un placeholder que no protege adecuadamente.

---

## 2. HALLAZGOS DE CALIDAD DE CÓDIGO

### 2.1 Dependencias de useEffect Incompletas

**Severidad: MEDIA**
**Archivos afectados:** `Home.tsx`, `Contact.tsx`, `Blog.tsx`, `ServiceDetail.tsx`

```typescript
// Patrón repetido en múltiples páginas:
useEffect(() => {
  trackPageView("home");
}, []);  // Falta trackPageView como dependencia
```

Esto viola la regla `react-hooks/exhaustive-deps`. Aunque `trackPageView` probablemente sea estable, puede causar problemas si la implementación del hook cambia.

### 2.2 ESLint Configurado de Forma Permisiva

**Archivo:** `eslint.config.js:23`

```javascript
"@typescript-eslint/no-unused-vars": "off"
```

Desactivar la regla de variables no usadas oculta código muerto y posibles errores. Se recomienda al menos configurar como `warn`.

### 2.3 Tipos `@types/*` en Dependencies (no en DevDependencies)

**Archivo:** `package.json:46-48`

```json
"dependencies": {
  "@types/dompurify": "^3.2.0",
  "@types/leaflet": "^1.9.21",
  "@types/papaparse": "^5.3.16",
}
```

Los paquetes `@types/*` deberían estar en `devDependencies` ya que solo se necesitan en tiempo de compilación.

### 2.4 Nombre Genérico de Paquete

**Archivo:** `package.json:2`

```json
"name": "vite_react_shadcn_ts"
```

El nombre del paquete no refleja el proyecto. Debería ser `audit-m` o `navarro-global-advisory`.

### 2.5 Componentes Grandes sin Descomponer

| Archivo | Líneas | Recomendación |
|---------|--------|---------------|
| `Home.tsx` | 454 | Extraer secciones a subcomponentes |
| `ServiceDetail.tsx` | 357 | Extraer lógica de query a hook dedicado |

### 2.6 Rol de Admin Simplificado

**Archivo:** `src/contexts/AuthContext.tsx:61`

```typescript
role: roles.includes('admin') ? 'admin' : 'editor',
```

La lógica de asignación de roles ignora los roles `marketing`, `hr_viewer`, `super_admin` y `viewer` definidos en el tipo `AdminRole`. El rol devuelto será siempre `admin` o `editor`, perdiendo granularidad.

---

## 3. HALLAZGOS DE ARQUITECTURA

### 3.1 Puntos Fuertes

- **Multi-site bien implementado:** `src/config/site.ts` permite operar 3 sitios (es/int/audit) desde un solo codebase
- **React Query consistente:** Los hooks de datos siguen un patrón uniforme con `useQuery` y `useMutation`
- **Separación clara:** Hooks, componentes, páginas y utilidades bien organizados
- **Edge Functions modulares:** Cada función tiene responsabilidad única
- **Autenticación robusta:** `ProtectedRoute` con verificación server-side periódica, timeout por inactividad y subscripción realtime a cambios de roles

### 3.2 Puntos de Mejora

- **67+ imports en App.tsx:** Todas las rutas se importan de forma estática. Usar `React.lazy()` para rutas admin reduciría significativamente el bundle inicial
- **Sin tests:** No hay framework de testing configurado (jest, vitest, etc.) ni archivos de test
- **Sin CI/CD propio:** El proyecto depende exclusivamente de Lovable para deploys. No hay GitHub Actions ni validaciones de PR
- **Duplicación de CSP:** Content-Security-Policy está definida en 3 lugares (`index.html`, `vite.config.ts` headers). Cambios deben sincronizarse manualmente
- **QueryClient sin configuración:** `new QueryClient()` sin opciones de staleTime, cacheTime o retry. En producción conviene configurar defaults globales

---

## 4. HALLAZGOS DE RENDIMIENTO

### 4.1 Carga Duplicada de Google Fonts

**Archivo:** `index.html:104` + `src/index.css:5`

Plus Jakarta Sans se importa tanto en `index.html` (vía `<link>`) como en `index.css` (vía `@import`), causando doble descarga.

### 4.2 Sin Code Splitting para Admin

Todas las rutas de admin se incluyen en el bundle principal. Usuarios públicos descargan código que nunca usarán. Esto puede representar cientos de KB innecesarios.

### 4.3 Race Condition en useBlogSearch

**Archivo:** `src/hooks/useBlogSearch.ts`

Se ejecuta una query separada de `team_members` en cada búsqueda de blog. Si los datos cambian entre la query de blog y la de team, pueden desincronizarse.

---

## 5. HALLAZGOS DE ACCESIBILIDAD

- **Formularios sin ARIA:** Los inputs en `Contact.tsx` carecen de `aria-label` y `aria-describedby`
- **Iconos sin texto alternativo:** Lucide icons en la página de contacto (Phone, Mail, MapPin) no tienen texto para screen readers
- **Focus management:** No se observa gestión de focus en navegación de rutas SPA

---

## 6. EXPORTACIÓN DE DATOS Y PRIVACIDAD

**Archivo:** `src/lib/exportContactLeads.ts`

- Las IPs de usuarios se incluyen en exports CSV/Excel sin log de auditoría
- No hay control de quién exporta ni cuándo
- Bajo RGPD, la exportación de datos personales (email, IP, nombre) requiere registro de actividad

---

## 7. PLAN DE ACCIÓN RECOMENDADO

### Prioridad 1 - Inmediata (Seguridad)
1. Escapar HTML en todos los templates de email de edge functions
2. Reemplazar `Math.random()` por `crypto.getRandomValues()` en generación de contraseñas
3. Añadir `.env` a `.gitignore` y rotar las credenciales de Supabase
4. Añadir validación de schema para mensajes del chat-assistant
5. Restringir CORS a dominios específicos en edge functions
6. Añadir autorización en `send-lead-notification`

### Prioridad 2 - Corto Plazo (Calidad)
7. Implementar `React.lazy()` para rutas de admin (code splitting)
8. Configurar framework de testing (Vitest recomendado por compatibilidad con Vite)
9. Corregir dependencias de useEffect (`trackPageView`)
10. Mover `@types/*` a devDependencies
11. Arreglar la lógica de asignación de roles en AuthContext

### Prioridad 3 - Medio Plazo (Mantenibilidad)
12. Eliminar duplicación de CSP (mantener solo en un sitio)
13. Eliminar importación duplicada de Google Fonts
14. Configurar QueryClient con defaults de producción
15. Activar `no-unused-vars` como warning en ESLint
16. Añadir logging de auditoría en exportación de datos

---

*Revisión generada automáticamente. Los números de línea son aproximados y pueden variar con cambios recientes.*
