
# Cargar el plan M AUDIT como proyecto con tareas

## Que se hara

Insertar via migracion SQL (que bypassa RLS) un tablero de proyecto y todas las tareas del plan de marketing digital, organizadas en 3 fases con sus tareas desglosadas.

## Estructura del proyecto

**Tablero**: "M AUDIT - Estrategia Marketing Digital"
- Descripcion: SEO, Google Ads, Contenidos, LinkedIn, SEO Local
- Fecha limite: 31 agosto 2026
- Estado: active

## Tareas a cargar (organizadas por fases)

### FASE 1: Fundamentos (Meses 1-2) — 12 tareas

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 1 | Diagnosticar y arreglar accesibilidad web (SSR/indexacion) | urgente | en_progreso |
| 2 | Implementar server-side rendering o pre-rendering | alta | pendiente |
| 3 | Instalar certificado SSL y configurar HTTPS | alta | pendiente |
| 4 | Configurar Google Analytics 4 y tracking de conversiones | alta | pendiente |
| 5 | Enviar XML sitemap a Google Search Console | alta | pendiente |
| 6 | Implementar schema markup (LocalBusiness, FAQ, Breadcrumb) | media | pendiente |
| 7 | Construir las 12 paginas esenciales de servicio | urgente | pendiente |
| 8 | Crear y optimizar Google Business Profile | alta | pendiente |
| 9 | Registrarse en directorios clave (ROAC, ICJCE, Col-legi) | media | pendiente |
| 10 | Crear pagina de empresa en LinkedIn | alta | pendiente |
| 11 | Lanzar Campana 1 Google Ads - Busqueda Principal (1.600eur/mes) | urgente | pendiente |
| 12 | Configurar lista de keywords negativas en Google Ads | alta | pendiente |

### FASE 2: Lanzamiento de contenidos (Meses 3-4) — 10 tareas

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 13 | Crear landing page Auditoria Fondos Europeos / PRTR (blue-ocean) | urgente | pendiente |
| 14 | Crear pagina de precios transparente "Cuanto cuesta una auditoria" | alta | pendiente |
| 15 | Publicar guia umbrales auditoria obligatoria 2026 + checklist interactiva | alta | pendiente |
| 16 | Crear landing Auditoria de Subvenciones Barcelona | alta | pendiente |
| 17 | Publicar primeros 6-8 posts de blog (keywords Tier 1) | alta | pendiente |
| 18 | Lanzar primer lead magnet: "Tu empresa esta obligada a auditarse en 2026?" | media | pendiente |
| 19 | Lanzar newsletter por email | media | pendiente |
| 20 | Anadir campana de remarketing Google Ads (400eur/mes) | media | pendiente |
| 21 | Iniciar publicaciones personales de socios en LinkedIn (2-3/semana) | alta | pendiente |
| 22 | Crear share kits semanales para employee advocacy | media | pendiente |

### FASE 3: Optimizacion y escalado (Meses 5-6) — 8 tareas

| # | Tarea | Prioridad | Estado |
|---|-------|-----------|--------|
| 23 | Transicionar Google Ads a pujas automatizadas (CPA objetivo 50-70eur) | alta | pendiente |
| 24 | Escalar produccion blog a 4 posts/mes | media | pendiente |
| 25 | Lanzar contenido co-branded con Capittal Transacciones (due diligence) | alta | pendiente |
| 26 | Primer webinar co-branded con Capittal | media | pendiente |
| 27 | Construir backlinks: directorios profesionales y guest posts | media | pendiente |
| 28 | Solicitar resenas a clientes satisfechos en Google | media | pendiente |
| 29 | Crear landing Due Diligence Financiera (diferenciador Capittal) | alta | pendiente |
| 30 | Revision trimestral: metricas SEO, leads, CPA, ROI | alta | pendiente |

## Seccion tecnica

### Archivo a crear
- `supabase/migrations/[timestamp]_seed_maudit_project.sql`: Migracion que inserta el board y las 30 tareas con `sort_order` secuencial, prioridades y estados asignados

### Metodo
- Se usa una migracion SQL que ejecuta los INSERTs directamente, bypassando RLS (las migraciones corren con permisos de superusuario)
- Se genera un UUID para el board y se referencia en todas las tareas
- Todas las tareas empiezan como "pendiente" excepto la primera (diagnostico web) que estara "en_progreso" dado que ya se esta trabajando en ello
