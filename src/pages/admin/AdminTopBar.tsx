import { TopBarAdmin, TopBarProvider, createSupabaseAdapter } from '@/modules/topbar';
import { supabase } from '@/integrations/supabase/client';
import { getSourceFilter } from '@/config/site';

const topbarAdapter = createSupabaseAdapter(supabase, {
  sourceSiteFilter: getSourceFilter(),
});

export default function AdminTopBarPage() {
  return (
    <TopBarProvider adapter={topbarAdapter}>
      <TopBarAdmin />
    </TopBarProvider>
  );
}
