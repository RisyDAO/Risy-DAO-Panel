import { ErrorBoundary } from "./ErrorBoundary";
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
    <ErrorBoundary title="Failed to load card">
      <CardContent {...props} />
    </ErrorBoundary>
  );
} 