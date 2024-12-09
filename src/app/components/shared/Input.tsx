import { ErrorBoundary } from "./ErrorBoundary";
import { StatusBadge } from "./StatusBadge";
import { InputLabel } from "./input/InputLabel";
import { InputField } from "./input/InputField";
import { InputMessage } from "./input/InputMessage";
import { type InputProps } from "../../types/shared";

function InputComponent({
  label,
  error,
  rightElement,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
      <InputLabel label={label} />
      <div className="relative">
        <InputField error={error} className={className} {...props} />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
      <InputMessage error={error} helperText={helperText} />
    </div>
  );
}

export function Input(props: InputProps) {
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
            <h3 className="font-semibold text-inherit">Failed to load input</h3>
            <p className="text-sm opacity-90">
              Please try refreshing the page
            </p>
          </div>
        </StatusBadge>
      }
    >
      <InputComponent {...props} />
    </ErrorBoundary>
  );
} 