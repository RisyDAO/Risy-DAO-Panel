import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  isLoading = false, 
  icon,
  children,
  disabled,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "w-full py-3 px-4 rounded-md font-medium transition-all duration-200";
  
  const variants = {
    primary: `${!disabled 
      ? 'bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#2DD4BF] text-white hover:shadow-lg hover:opacity-90'
      : 'bg-[#374151] text-[#9CA3AF] cursor-not-allowed'
    }`,
    secondary: `${!disabled
      ? 'bg-[#1F2937] text-white hover:bg-[#374151]'
      : 'bg-[#1F2937] text-[#9CA3AF] cursor-not-allowed'
    }`
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center space-x-2">
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : icon}
        <span>{children}</span>
      </div>
    </button>
  );
} 