

# Traducir toda la intranet a castellano

## Resumen

La intranet tiene muchas paginas con texto en ingles que deben traducirse a castellano. El dashboard, sidebar y header ya estan mayormente en espanol, pero hay muchas paginas individuales que mantienen etiquetas, botones, toasts y mensajes en ingles.

## Paginas a traducir

### 1. `AdminLogin.tsx` — Login
- "Administration Portal" -> "Portal de Administracion"
- "Access granted" / "Welcome to the administration portal" -> "Acceso concedido" / "Bienvenido al portal de administracion"
- "Invalid email" -> "Email no valido"
- "Password must be at least 6 characters" -> "La contrasena debe tener al menos 6 caracteres"
- "Too many failed attempts..." -> "Demasiados intentos fallidos..."
- "Access denied..." -> "Acceso denegado..."
- "Account disabled..." -> "Tu cuenta ha sido desactivada..."
- "Authentication error" -> "Error de autenticacion"
- "Email" / "Password" -> "Email" / "Contrasena"
- "Signing in..." / "Sign In" -> "Accediendo..." / "Iniciar Sesion"
- "You have X attempts remaining..." -> "Te quedan X intentos..."

### 2. `AdminNews.tsx` — Noticias
- "News Articles" -> "Articulos de Noticias"
- "Title" / "Category" / "Published Date" / "Published" -> "Titulo" / "Categoria" / "Fecha de Publicacion" / "Publicado"
- "Status updated" / "Article published/unpublished successfully" -> "Estado actualizado" / "Articulo publicado/despublicado correctamente"
- "Not set" -> "Sin definir"

### 3. `AdminTeam.tsx` — Equipo
- "Team Members" -> "Equipo"
- "Add Team Member" -> "Anadir Miembro"
- "Avatar" / "Name" / "Position" / "Email" / "Order" / "Active" / "Actions" -> "Avatar" / "Nombre" / "Cargo" / "Email" / "Orden" / "Activo" / "Acciones"
- "Status updated" / "Team member activated/deactivated successfully" -> "Estado actualizado" / "Miembro activado/desactivado"
- "Team member deleted" / "Member removed successfully" -> "Miembro eliminado"
- "Are you sure?" / "This will permanently delete..." / "Cancel" / "Delete" -> "¿Estas seguro?" / "Se eliminara permanentemente..." / "Cancelar" / "Eliminar"
- "N/A" -> "N/D"

### 4. `AdminCaseStudies.tsx` — Casos de exito
- "Case Studies" -> "Casos de Exito"
- "Manage client success stories" -> "Gestiona los casos de exito de clientes"
- "Add Case Study" -> "Anadir Caso de Exito"
- "Search case studies..." -> "Buscar casos de exito..."
- "Client" / "Title" / "Industry" / "Service" / "Status" / "Featured" / "Views" / "Actions" -> "Cliente" / "Titulo" / "Sector" / "Servicio" / "Estado" / "Destacado" / "Visitas" / "Acciones"
- "Status updated successfully" -> "Estado actualizado"
- "Case study deleted successfully" -> "Caso de exito eliminado"
- "No case studies found" -> "No se encontraron casos de exito"
- "Loading..." -> "Cargando..."
- Dialogo de eliminacion: todo a castellano

### 5. `AdminTestimonials.tsx` — Testimonios
- "Testimonials" -> "Testimonios"
- "Manage client testimonials for the homepage" -> "Gestiona los testimonios de clientes para la pagina principal"
- "Add Testimonial" -> "Anadir Testimonio"
- "Author" / "Quote" / "Company" / "Location" / "Active" / "Actions" -> "Autor" / "Cita" / "Empresa" / "Ubicacion" / "Activo" / "Acciones"
- "Testimonial activated/deactivated" -> "Testimonio activado/desactivado"
- "Failed to update/delete testimonial" -> "Error al actualizar/eliminar testimonio"
- "Testimonial deleted" -> "Testimonio eliminado"
- "No testimonials yet. Add your first one!" -> "Aun no hay testimonios. Anade el primero."
- Dialogo de eliminacion: todo a castellano

### 6. `AdminAwards.tsx` — Premios
- "Awards & Accolades" -> "Premios y Reconocimientos"
- "Anadir Award" -> "Anadir Premio" (ya mezcla idiomas)
- "Total Awards" -> "Total Premios"

### 7. `AdminServices.tsx` — Servicios
- "Services" -> "Servicios"
- "Manage your services and their content" -> "Gestiona tus servicios y su contenido"
- "Add Service" -> "Anadir Servicio"
- "Search by name or description..." -> "Buscar por nombre o descripcion..."
- "All Areas" -> "Todas las Areas"
- "Icon" / "Name" / "Area" / "Slug" / "Active" / "Order" / "Actions" -> "Icono" / "Nombre" / "Area" / "Slug" / "Activo" / "Orden" / "Acciones"
- "Service deleted successfully" -> "Servicio eliminado"
- "Loading services..." -> "Cargando servicios..."
- "No services found..." -> "No se encontraron servicios..."
- Dialogo de eliminacion: todo a castellano

### 8. `AdminContent.tsx` — Contenido Web
- "Content Management" -> "Gestion de Contenido"
- "Edit the content of all website pages" -> "Edita el contenido de todas las paginas"
- "New Section" -> "Nueva Seccion"
- Pestanas: "Home" / "About" / "Methodology" / "Strategy" -> "Inicio" / "Sobre Nosotros" / "Metodologia" / "Estrategia"
- "Clients" / "Technology" / "Networks" -> "Clientes" / "Tecnologia" / "Redes"
- "Client Logos" / "Technology Logos" / "International Networks" -> titulos en castellano
- "Active" / "Inactive" -> "Activo" / "Inactivo"
- "No sections created" / "Create First Section" -> en castellano
- "Loading content..." / "No title" -> en castellano
- "Are you sure you want to delete..." -> en castellano
- Labels de badges: "3 languages" / "ES only" / "No ES" -> en castellano

### 9. `AdminABTests.tsx` — Tests A/B
- "A/B Test Results" -> "Resultados Tests A/B"
- "Monitor and analyze conversion experiments" -> "Monitoriza y analiza experimentos de conversion"
- "Last 7/30/90 days" -> "Ultimos 7/30/90 dias"
- "Total Impressions" / "Total Conversions" / "Lift" / "Current Winner" -> "Impresiones Totales" / "Conversiones Totales" / "Mejora" / "Ganador Actual"
- "Variant A (Control)" / "Variant B (Treatment)" -> "Variante A (Control)" / "Variante B (Tratamiento)"
- "Conversion Rate by Variant" / "Impressions vs Conversions" -> en castellano
- "Variant Performance Details" / tabla de detalle -> en castellano
- Nombres de tests y descripciones -> en castellano
- "Winner" / "Control" / "Inconclusive" -> "Ganador" / "Control" / "No concluyente"

### 10. `AdminUsers.tsx` — Usuarios
- "Viewer (Solo lectura)" -> ya esta bien
- "Feature not implemented" -> "Funcionalidad no implementada"
- "User deactivation requires..." -> "La desactivacion de usuarios requiere..."
- roleLabels: "Super Admin" / "Admin" / "Editor" / "Viewer" -> mantener (son roles tecnicos)

### 11. `LandingDashboard.tsx` — Dashboard Landings
- "Landing Dashboard" -> "Panel de Landings"
- "Total Landings" -> "Total Landings" (ya esta bien, es el termino usado)
- Status labels en charts: "Active" / "Draft" / "Needs Review" / "Archived" -> "Activas" / "Borrador" / "En Revision" / "Archivadas"

### 12. Deck Studio (`DeckStudioBrand.tsx` + `DeckStudioContent.tsx`)
- "Brand Kit" -> "Kit de Marca"
- "Customize design tokens..." -> "Personaliza los tokens de diseno..."
- "Reset to Default" / "Save Changes" -> "Restablecer" / "Guardar Cambios"
- "Colors" / "Typography" / "Layout" -> "Colores" / "Tipografia" / "Diseno"
- Labels de colores/fuentes (Background, Surface, Text, etc.) -> en castellano
- "Content Library" -> "Biblioteca de Contenido"
- "Manage content blocks..." -> "Gestiona bloques de contenido..."
- "Add Content" -> "Anadir Contenido"
- "All sections" -> "Todas las secciones"
- "No content blocks yet" -> "Aun no hay bloques de contenido"
- Dialog: "Edit/Add Content Block" / "Title" / "Section" / "Source URL" / "Content" / "Tags" / "Cancel" / "Create" / "Update" -> todo en castellano

### 13. Toast messages sueltos en varios archivos
- Todos los `toast.success('Status updated successfully')` y similares en ingles -> traducir

## Seccion tecnica

### Archivos a modificar (17 archivos)

| Archivo | Tipo de cambio |
|---------|---------------|
| `src/pages/admin/AdminLogin.tsx` | Textos UI, validacion, toasts, mensajes error |
| `src/pages/admin/AdminNews.tsx` | Titulo, cabeceras tabla, toasts |
| `src/pages/admin/AdminTeam.tsx` | Titulo, boton, cabeceras tabla, toasts, dialogo |
| `src/pages/admin/AdminCaseStudies.tsx` | Titulo, subtitulo, boton, cabeceras, toasts, dialogo, placeholder, loading |
| `src/pages/admin/AdminTestimonials.tsx` | Titulo, subtitulo, boton, cabeceras, toasts, dialogo, empty state |
| `src/pages/admin/AdminAwards.tsx` | Titulo, estadisticas, boton |
| `src/pages/admin/AdminServices.tsx` | Titulo, subtitulo, boton, cabeceras, filtros, toasts, dialogo, loading, empty |
| `src/pages/admin/AdminContent.tsx` | Titulo, subtitulo, boton, pestanas, subtabs logos, badges, empty states, confirm |
| `src/pages/admin/AdminABTests.tsx` | Titulo, subtitulo, selectores, KPIs, nombres tests, tablas, graficos |
| `src/pages/admin/AdminUsers.tsx` | Toast "Feature not implemented" |
| `src/pages/admin/LandingDashboard.tsx` | Titulo, labels status en charts |
| `src/pages/admin/deck-studio/DeckStudioBrand.tsx` | Titulo, subtitulo, botones, pestanas, labels |
| `src/pages/admin/deck-studio/DeckStudioContent.tsx` | Titulo, subtitulo, boton, filtros, empty state, dialogo |

### Metodo
- Reemplazo directo de strings hardcoded en cada archivo
- No se usa i18n para la intranet (es solo para la web publica), asi que se cambian los strings directamente
- Se mantienen terminos tecnicos universales donde aplique (e.g. "Blog", "CRM", "Pipeline", "Slug", "SEO")

