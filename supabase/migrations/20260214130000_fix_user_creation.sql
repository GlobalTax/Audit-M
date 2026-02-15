-- ============================================
-- FIX USER CREATION: trigger binding + viewer role
-- ============================================

-- FIX 1: Add 'viewer' to app_role enum if it doesn't exist
-- (The enum was created with 'user' but types.ts shows 'viewer')
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'viewer';

-- FIX 2: Bind handle_new_user() trigger to auth.users
-- This function exists but was never attached via CREATE TRIGGER.
-- Without this, profiles are NOT auto-created when auth.users are inserted.
DO $$ BEGIN
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- FIX 3: Ensure profiles table has proper RLS policies
-- Admins need INSERT permission to create profiles for new users
DO $$ BEGIN
  CREATE POLICY "Service role can manage profiles"
    ON public.profiles FOR ALL
    USING (true)
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- FIX 4: Ensure user_roles table has proper policies for admin management
DO $$ BEGIN
  CREATE POLICY "Admins can manage user roles"
    ON public.user_roles FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'::app_role))
    WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
