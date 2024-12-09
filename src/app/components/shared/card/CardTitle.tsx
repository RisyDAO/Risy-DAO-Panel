import { ErrorBoundary } from "../ErrorBoundary";
import { type CardTitleProps } from "../../../types/shared";

function CardTitleContent({ title }: CardTitleProps) {
  if (!title) return null;

  return (
    <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#2DD4BF] bg-clip-text text-transparent">
      {title}
    </h2>
  );
}

export function CardTitle(props: CardTitleProps) {
  return (
    <ErrorBoundary title="Failed to load card title">
      <CardTitleContent {...props} />
    </ErrorBoundary>
  );
} 