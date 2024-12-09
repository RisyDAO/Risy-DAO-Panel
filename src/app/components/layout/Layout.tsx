import { type ReactNode } from "react";
import { Navigation } from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-[#111827] text-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </main>
  );
} 