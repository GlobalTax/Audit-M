

# Rediseno visual de la landing page de Audit

## Diagnostico actual

La pagina tiene una estructura de contenido correcta pero carece de elementos visuales que generen confianza y diferencien la firma:

- Hero: fondo oscuro solido sin imagen
- Secciones con mucho espacio vacio y sin fotografias
- Alternancia monotona negro/blanco sin variacion
- Sin acentos de color significativos (el verde teal apenas aparece)
- Sin imagenes de equipo, oficinas o elementos que humanicen la marca

## Cambios propuestos

### 1. Hero con imagen de fondo

Usar `office-hero.jpg` (ya existe en assets) como fondo del hero con overlay oscuro semitransparente. Esto anade profundidad visual manteniendo la legibilidad del texto.

- Imagen a pantalla completa con `object-cover`
- Overlay con gradiente oscuro (de izquierda a derecha) para que el texto quede legible
- Mantener el texto y CTAs actuales

### 2. Seccion "Sobre Audit" con imagen

Convertir la seccion "Sobre Audit" en un layout de 2 columnas:
- Columna izquierda: texto actual + valores
- Columna derecha: imagen de oficina o equipo (usar `services-hero.jpg`)
- Esto rompe la monotonia de bloques de texto centrado

### 3. Seccion de metodologia con acentos de color

- Anadir linea de progreso verde teal conectando los 4 pasos (Planificacion, Trabajo de Campo, Emision, Seguimiento)
- Los iconos pasan de gris a tener fondo con el color accent
- Anadir numeros grandes (01, 02, 03, 04) con color accent como elemento grafico

### 4. Seccion "Por que elegirnos" con fondo suave

- Cambiar el fondo blanco puro por un fondo con gradiente muy suave (muted/cream)
- Iconos con fondo circular accent en lugar de solo borde
- Anadir una imagen lateral (edificio/oficina) para romper la monotonia

### 5. Barra de contacto con mas presencia

- Hacer la barra de contacto pre-footer mas prominente con gradiente accent
- Boton CTA mas visible

### 6. Seccion de estadisticas con color

- La barra "21 servicios / ROAC / 25+ anos" actualmente es oscura con texto gris
- Cambiar los numeros a color accent (verde teal) para que destaquen
- Anadir un sutil borde superior/inferior con gradiente

## Seccion tecnica

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| Componente hero del landing audit | Anadir imagen de fondo con overlay gradient |
| Componente "Sobre Audit" | Layout 2 columnas con imagen |
| Componente metodologia | Numeros con color accent, linea de progreso |
| Componente "Por que elegirnos" | Fondo suave, iconos con color |
| Componente stats bar | Numeros en color accent |
| Componente contacto pre-footer | Gradiente accent mas prominente |

Para identificar los archivos exactos necesitare explorar la estructura de componentes del landing audit durante la implementacion, ya que la home usa componentes modulares importados dinamicamente.

### Consideraciones

- No se anaden dependencias nuevas, solo se modifican clases CSS y estructura JSX
- Las imagenes existentes (`office-hero.jpg`, `services-hero.jpg`) se reutilizan
- Se podrian buscar 1-2 imagenes stock de alta calidad adicionales si las existentes no son suficientes
- Se mantiene la paleta de colores actual (dark primary + teal accent) pero se usa el accent de forma mas visible
- Los cambios son puramente visuales, no afectan funcionalidad ni SEO

