import { type ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`
      col-span-1 p-6 rounded-lg border border-[#374151] 
      bg-[#1F2937] bg-opacity-50 transition-all duration-200 
      hover:bg-opacity-70 hover:shadow-lg
      ${className}
    `}>
      {title && (
        <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
} 