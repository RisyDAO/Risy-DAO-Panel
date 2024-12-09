import { ErrorBoundary } from "./ErrorBoundary";
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
    <ErrorBoundary title="Failed to load input">
      <InputComponent {...props} />
    </ErrorBoundary>
  );
} 