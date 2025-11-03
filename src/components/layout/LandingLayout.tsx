import { ReactNode } from "react";
import { LandingNavbar } from "./LandingNavbar";
import { LandingFooter } from "./LandingFooter";
import { LanguageSync } from "./LanguageSync";

interface LandingLayoutProps {
  children: ReactNode;
}

export const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <LanguageSync />
      <LandingNavbar />
      <main className="flex-1 pt-20">{children}</main>
      <LandingFooter />
    </div>
  );
};
