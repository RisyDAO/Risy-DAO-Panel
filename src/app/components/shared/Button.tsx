import { ErrorBoundary } from "./ErrorBoundary";
import { ButtonContent } from "./button/ButtonContent";
import { getButtonStyles } from "./button/ButtonStyles";
import { type ButtonBaseProps } from "../../types/shared";

function ButtonComponent({ 
  variant = 'primary', 
  isLoading = false, 
  icon,
  children,
  disabled,
  className = '',
  ...props 
}: ButtonBaseProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`${getButtonStyles(variant, disabled || isLoading)} ${className}`}
      {...props}
    >
      <ButtonContent isLoading={isLoading} icon={icon}>
        {children}
      </ButtonContent>
    </button>
  );
}

export function Button(props: ButtonBaseProps) {
  return (
    <ErrorBoundary title="Failed to load button">
      <ButtonComponent {...props} />
    </ErrorBoundary>
  );
} 