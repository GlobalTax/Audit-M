

# Plan: Corregir errores de build + Actualizar README

## 1. Corregir errores en AuthContext.tsx

Hay dos errores de tipos TypeScript:

### Error 1: `super_admin` no existe en el enum de BD
El enum `app_role` en la BD tiene: `admin`, `editor`, `user`, `hr_viewer`, `marketing`. Pero `AuthContext.tsx` define `AdminRole` con `super_admin` que no existe.

**Fix (linea 5):** Cambiar el tipo `AdminRole` para que coincida con el enum real:
```typescript
type AdminRole = 'admin' | 'editor' | 'user' | 'hr_viewer' | 'marketing';
```

**Fix (linea 57):** Actualizar la jerarquia de roles:
```typescript
const roleHierarchy: AdminRole[] = ['admin', 'editor', 'hr_viewer', 'marketing', 'user'];
```

### Error 2: `full_name` no existe en la tabla `profiles`
La tabla `profiles` solo tiene columnas: `id`, `email`, `created_at`. No tiene `full_name`.

**Fix (linea 64):** Usar solo `email`:
```typescript
full_name: profile.email || '',
```

### Impacto en useAdminAuth.ts
Tambien se necesita actualizar `useAdminAuth.ts` para eliminar referencias a `super_admin` y usar los roles reales del enum. Los metodos `requireSuperAdmin` y `canManageUsers` pasaran a verificar el rol `admin` directamente.

---

## 2. Actualizar README.md

Reemplazar el contenido actual del README con el texto proporcionado por el usuario. Es una actualizacion directa del contenido del archivo.

---

## Resumen de cambios

| Archivo | Cambio |
|---------|--------|
| `src/contexts/AuthContext.tsx` | Corregir tipo AdminRole y eliminar referencia a full_name |
| `src/hooks/useAdminAuth.ts` | Actualizar roles para coincidir con enum real |
| `README.md` | Reemplazar con el contenido proporcionado |

