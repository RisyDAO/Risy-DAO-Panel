import { type CardTitleProps } from "../../../types/shared";

export function CardTitle({ title }: CardTitleProps) {
  if (!title) return null;

  return (
    <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#2DD4BF] bg-clip-text text-transparent">
      {title}
    </h2>
  );
} 