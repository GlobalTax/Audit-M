import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { SocialProofToast } from "@/components/ui/SocialProofToast";
import { NewsletterPopup } from "@/components/newsletter/NewsletterPopup";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <OrganizationSchema />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <WhatsAppFloatingButton />
      <SocialProofToast />
      <ExitIntentPopup />
      <NewsletterPopup />
    </>
  );
};
