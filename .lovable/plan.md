

# Corregir error de build en PresentationForm.tsx

## Problema

El archivo `src/components/admin/presentation/PresentationForm.tsx` tiene un error TypeScript en la linea 20. La propiedad `siteConfig.defaultLanguage` esta tipada como el literal `'es'` (porque la configuracion activa de Audit la define asi), lo que hace que TypeScript rechace las comparaciones con `'ca'` y `'en'` ya que nunca pueden ser verdaderas.

Esto causa un error de build que impide que la aplicacion cargue, provocando el "Maximum update depth exceeded" como efecto secundario del fallo de compilacion.

## Solucion

Castear `siteConfig.defaultLanguage` a `string` antes de las comparaciones, igual que ya se hizo en `ProposalForm.tsx`.

## Cambio tecnico

**Archivo**: `src/components/admin/presentation/PresentationForm.tsx`, linea 20

Cambiar:
```ts
const defaultLang = (siteConfig.defaultLanguage === 'ca' ? 'ca' : siteConfig.defaultLanguage === 'en' ? 'en' : 'es') as 'en' | 'es' | 'ca';
```

Por:
```ts
const lang = siteConfig.defaultLanguage as string;
const defaultLang = (lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es') as 'en' | 'es' | 'ca';
```

Un solo archivo, una sola linea. Corrige el error de build y la app volvera a funcionar.

