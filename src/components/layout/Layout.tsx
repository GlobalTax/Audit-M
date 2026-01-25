import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { TopBar, TopBarProvider, createSupabaseAdapter } from "@/modules/topbar";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { getSourceFilter } from "@/config/site";

const topbarAdapter = createSupabaseAdapter(supabase, {
  sourceSiteFilter: getSourceFilter(),
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <TopBarProvider adapter={topbarAdapter}>
      <OrganizationSchema />
      <div className="flex min-h-screen flex-col">
        <TopBar LanguageSwitcher={LanguageSwitcher} />
        <Navbar />
        <main className="flex-1 pt-20 md:pt-[120px]">{children}</main>
        <Footer />
      </div>
      <WhatsAppFloatingButton />
    </TopBarProvider>
  );
};
