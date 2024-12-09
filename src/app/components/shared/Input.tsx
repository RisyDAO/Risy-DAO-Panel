import { type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  rightElement?: ReactNode;
  helperText?: string;
}

export function Input({
  label,
  error,
  rightElement,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
      {label && (
        <label className="block text-sm text-[#9CA3AF] font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            w-full bg-[#1F2937] border rounded-md px-4 py-2.5 text-white 
            placeholder-[#4B5563] transition-all duration-200
            ${error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[#374151] focus:ring-[#6366F1]'
            } 
            focus:border-transparent focus:ring-2
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <p className={`mt-2 text-xs ${error ? 'text-red-500' : 'text-[#9CA3AF]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
} 