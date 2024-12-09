import { type ReactNode } from "react";

interface StatusBadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  icon?: ReactNode;
  children: ReactNode;
}

export function StatusBadge({ 
  variant = 'info',
  icon,
  children 
}: StatusBadgeProps) {
  const variants = {
    success: 'bg-[#34D399] bg-opacity-10 border-[#34D399] text-[#34D399]',
    warning: 'bg-[#F59E0B] bg-opacity-10 border-[#F59E0B] text-[#F59E0B]',
    error: 'bg-red-500 bg-opacity-10 border-red-500 text-red-500',
    info: 'bg-[#818CF8] bg-opacity-10 border-[#818CF8] text-[#818CF8]'
  };

  return (
    <div className={`p-3 rounded-md border border-opacity-50 ${variants[variant]}`}>
      <div className="flex items-start space-x-2">
        {icon && <span className="mt-0.5">{icon}</span>}
        <p className="text-sm">{children}</p>
      </div>
    </div>
  );
} 