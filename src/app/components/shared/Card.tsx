import { ErrorBoundary } from "./ErrorBoundary";
import { StatusBadge } from "./StatusBadge";
import { CardTitle } from "./card/CardTitle";
import { type CardProps } from "../../types/shared";

function CardContent({ title, children, className = '' }: CardProps) {
  return (
    <div className={`
      col-span-1 p-6 rounded-lg border border-[#374151] 
      bg-[#1F2937] bg-opacity-50 transition-all duration-200 
      hover:bg-opacity-70 hover:shadow-lg
      ${className}
    `}>
      <CardTitle title={title} />
      {children}
    </div>
  );
}

export function Card(props: CardProps) {
  return (
    <ErrorBoundary
      fallback={
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
            <h3 className="font-semibold text-inherit">Failed to load card</h3>
            <p className="text-sm opacity-90">
              Please try refreshing the page
            </p>
          </div>
        </StatusBadge>
      }
    >
      <CardContent {...props} />
    </ErrorBoundary>
  );
} 