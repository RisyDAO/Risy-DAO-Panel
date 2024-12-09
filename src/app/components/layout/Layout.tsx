import { ErrorBoundary } from "../shared/ErrorBoundary";
import { StatusBadge } from "../shared/StatusBadge";
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
    <ErrorBoundary
      fallback={
        <div className="min-h-screen bg-[#111827] text-white p-4">
          <StatusBadge
            variant="error"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            }
          >
            <div>
              <h3 className="font-semibold text-inherit">Failed to load application</h3>
              <p className="text-sm opacity-90">
                Please try refreshing the page
              </p>
            </div>
          </StatusBadge>
        </div>
      }
    >
      <LayoutContent>
        {children}
      </LayoutContent>
    </ErrorBoundary>
  );
} 