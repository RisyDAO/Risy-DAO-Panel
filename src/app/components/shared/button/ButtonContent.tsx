import { type ButtonContentProps } from "../../../types/shared";

export function ButtonContent({ isLoading, icon, children }: ButtonContentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </div>
  );
} 