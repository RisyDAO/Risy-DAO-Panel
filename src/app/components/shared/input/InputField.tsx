import { ErrorBoundary } from "../ErrorBoundary";
import { type InputFieldProps } from "../../../types/shared";

function InputFieldContent({
  error,
  className = '',
  ...props
}: InputFieldProps) {
  return (
    <input
      className={`
        w-full bg-[#1F2937] text-white placeholder-[#6B7280]
        px-4 py-3 text-base
        rounded-md border border-[#374151] 
        focus:ring-2 focus:ring-[#6366F1] focus:border-transparent
        disabled:bg-[#374151] disabled:cursor-not-allowed
        transition-all duration-200
        ${error ? 'border-red-500 focus:ring-red-500' : ''}
        ${className}
      `}
      {...props}
    />
  );
}

export function InputField(props: InputFieldProps) {
  return (
    <ErrorBoundary title="Failed to load input field">
      <InputFieldContent {...props} />
    </ErrorBoundary>
  );
} 