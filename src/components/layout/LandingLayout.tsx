import { ReactNode } from "react";
import { LandingNavbar } from "./LandingNavbar";
import { LandingFooter } from "./LandingFooter";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

interface LandingLayoutProps {
  children: ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <OrganizationSchema />
      <div className="flex min-h-screen flex-col">
        <LandingNavbar />
        <main className="flex-1 pt-20">{children}</main>
        <LandingFooter />
      </div>
      <WhatsAppFloatingButton />
    </>
  );
};
