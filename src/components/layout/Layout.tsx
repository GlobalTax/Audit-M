import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LanguageSync } from "./LanguageSync";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <LanguageSync />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
