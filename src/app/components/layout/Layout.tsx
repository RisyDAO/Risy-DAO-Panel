import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Navigation } from "./Navigation";
import { type LayoutProps } from "../../types/shared";

function LayoutContent({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary title="Failed to load application layout">
      <LayoutContent>
        {children}
      </LayoutContent>
    </ErrorBoundary>
  );
} 