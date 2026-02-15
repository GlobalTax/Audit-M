
# Plan: Crear edge function `create-admin-user`

## Problema

La pagina de usuarios (`/admin/users`) llama a `supabase.functions.invoke('create-admin-user')` pero esa edge function no existe, lo que provoca un error al intentar crear usuarios.

## Solucion

Crear la edge function `create-admin-user` que use el `SUPABASE_SERVICE_ROLE_KEY` para crear usuarios en `auth.users` y asignarles un rol.

---

## 1. Crear `supabase/functions/create-admin-user/index.ts`

La funcion:

- Valida que el usuario que llama sea admin (extrae token del header Authorization, verifica rol en `user_roles`)
- Recibe `{ email, full_name, role, send_invite }` por POST
- Usa `supabase.auth.admin.createUser()` con el service role key para crear el usuario en `auth.users` con una contrasena temporal
- Inserta el rol correspondiente en `user_roles` (valores validos del enum: `admin`, `editor`, `viewer`, `marketing`, `hr_manager`, `hr_viewer`)
- Devuelve los datos del usuario creado

## 2. Registrar en `supabase/config.toml`

Añadir:

```text
[functions.create-admin-user]
verify_jwt = false
```

## 3. Tambien registrar funciones existentes sin config

Las funciones `admin-auth` y `verify-admin-session` existen pero no estan en config.toml. Se añadiran tambien para consistencia.

---

## Archivos a crear/modificar

| Archivo | Accion |
|---------|--------|
| `supabase/functions/create-admin-user/index.ts` | Crear |
| `supabase/config.toml` | Editar - registrar la nueva funcion y las existentes |
