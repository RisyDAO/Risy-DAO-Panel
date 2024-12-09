import { type ReactNode } from "react";
import { StatusBadge } from "./StatusBadge";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
}

export function ErrorFallback({ 
  title = "Something went wrong",
  message = "Please try refreshing the page",
  icon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
  )
}: ErrorFallbackProps) {
  return (
    <StatusBadge variant="error" icon={icon}>
      <div>
        <h3 className="font-semibold text-inherit">{title}</h3>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </StatusBadge>
  );
} 