

# Corregir error de loop infinito en @radix-ui/react-select

## Problema

La version `2.1.2` de `@radix-ui/react-select` (pinned sin `^`) tiene un bug conocido que causa un loop infinito (`Maximum update depth exceeded`) en su funcion interna `setRef`. El stack trace lo confirma: el error se origina directamente en `@radix-ui_react-select.js` linea 128.

## Solucion

Actualizar la dependencia en `package.json` de `"2.1.2"` (version exacta, pinned) a `"^2.1.6"` que incluye los parches de estabilidad.

## Cambio tecnico

**Archivo**: `package.json`

Cambiar:
```json
"@radix-ui/react-select": "2.1.2",
```

Por:
```json
"@radix-ui/react-select": "^2.1.6",
```

Un solo cambio en una linea. Resuelve el loop infinito.

