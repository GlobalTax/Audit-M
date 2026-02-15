

# Adaptar el Generador de Propuestas para Audit

## Problemas detectados

El generador de propuestas actual esta construido para "NRRO International" (Navarro Global, asesoria fiscal/legal). No encaja con este proyecto (Audit / M AUDIT, S.L.P.) en ningun aspecto:

### Marca
- PDF muestra "NRRO INTERNATIONAL" en la cabecera
- Textos "About NRRO", "Why NRRO", contacto global.nrro.es
- Nombre de archivo PDF: "NRRO_Proposal_..."
- Numero de propuesta: "NRRO-2026-XXXX"

### Servicios
- Los servicios disponibles son de asesoria general: Fiscal, Contabilidad, Laboral, Legal Corporativo, Fiscalidad Internacional, Movilidad Global
- Deberian ser los 21 servicios de auditoria que ya existen en la base de datos (Auditoria de Cuentas Anuales, Due Diligence Financiera, Auditoria de Subvenciones, etc.)

### Idioma
- La interfaz del formulario esta en ingles (labels, placeholders, botones)
- El idioma por defecto es ingles
- Deberia estar todo en espanol (el idioma principal de Audit)
- El selector de idioma incluye ingles, que no es necesario para Audit

### Contenido del PDF
- La seccion "Sobre" habla de asesoria multidisciplinar, 50 paises, redes internacionales
- Las credenciales son genericas (500 clientes, equipo multilingue)
- Deberian reflejar la identidad de M AUDIT: inscripcion ROAC/ICAC, +30 anos de experiencia en auditoria, independencia
- El contacto muestra Via Augusta (oficina NRRO Global), deberia ser Ausias March (oficina Audit)

### Error TypeScript
- Hay un error de tipos en ProposalForm.tsx linea 73: comparacion de tipos incompatible por el selector de idioma

## Cambios a realizar

### 1. `src/types/proposal.ts`
- Eliminar los 6 servicios hardcodeados de asesoria (fiscal, accounting, labor, etc.)
- Cargar los servicios dinamicamente desde la tabla `services` de Supabase (filtrando por `source_site = 'audit'`)
- Simplificar la interfaz: eliminar campo `language` (siempre sera 'es'), eliminar campo `industry`
- Renombrar numero de propuesta: "AUDIT-2026-XXXX"

### 2. `src/lib/proposalTemplates.ts`
- Reescribir completamente para Audit:
  - Titulo: "Propuesta de Servicios de Auditoria"
  - Sobre Audit: firma de auditoria inscrita en el ROAC, miembro del ICAC, independencia, +30 anos
  - Credenciales: Inscripcion ROAC, Registro ICAC, Independencia, NIA-ES
  - Why Audit: Independencia, Rigor tecnico, Experiencia sectorial, Trato personalizado
  - Contacto: Ausias March 36, audit.nrro.es, email de auditoria
  - Eliminar version en ingles (solo espanol)
- Cabecera del PDF: "AUDIT" en lugar de "NRRO INTERNATIONAL"

### 3. `src/lib/proposalPdfGenerator.ts`
- Cabecera: cambiar "NRRO" + "INTERNATIONAL" por "AUDIT"
- Nombre de archivo: "AUDIT_Propuesta_..."
- Eliminar logica bilingue (todo en espanol)
- Ajustar contacto y footer

### 4. `src/components/admin/proposal/ProposalForm.tsx`
- Poner toda la interfaz en espanol (labels, placeholders, mensajes de error)
- Eliminar selector de idioma (siempre ES)
- Cargar servicios desde Supabase en vez de la constante AVAILABLE_SERVICES
- Eliminar campo "Industry"
- Corregir el error TypeScript de la linea 73
- Cambiar placeholder de empresa: "Acme Corporation" -> ejemplo espanol
- Boton: "Generar Propuesta PDF" en vez de "Generate PDF Proposal"

### 5. `src/pages/admin/AdminProposalGenerator.tsx`
- Textos ya estan en espanol (OK), pero referencian `siteConfig.name` que devuelve "Audit" (correcto)
- Ajustar si hay alguna referencia a NRRO

### Archivos modificados (resumen)

| Archivo | Cambio principal |
|---------|-----------------|
| `src/types/proposal.ts` | Eliminar servicios hardcodeados, simplificar interfaz (sin language/industry) |
| `src/lib/proposalTemplates.ts` | Reescribir contenido completo para marca Audit con datos ROAC/ICAC |
| `src/lib/proposalPdfGenerator.ts` | Cabecera "AUDIT", archivo "AUDIT_Propuesta_", sin logica bilingue |
| `src/components/admin/proposal/ProposalForm.tsx` | UI en espanol, servicios desde DB, sin selector idioma, fix TS error |

### Servicios que se cargaran desde la DB (21 servicios de auditoria)

Los servicios se obtendran dinamicamente con una query a Supabase (`services WHERE source_site = 'audit' AND is_active = true`), incluyendo:
- Auditoria de Cuentas Anuales
- Auditoria de Cuentas Consolidadas
- Auditoria de Subvenciones Publicas
- Due Diligence Financiera / Fiscal / Operativa / Vendor
- Verificacion CSRD/ESRS
- Auditoria de Huella de Carbono
- Y los demas servicios activos en la base de datos

Esto garantiza que si se anaden nuevos servicios a la web, aparecen automaticamente en el generador de propuestas.

