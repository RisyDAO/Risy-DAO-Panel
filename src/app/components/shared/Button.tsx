import { ErrorBoundary } from "./ErrorBoundary";
import { StatusBadge } from "./StatusBadge";
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
            <h3 className="font-semibold text-inherit">Failed to load button</h3>
            <p className="text-sm opacity-90">
              Please try refreshing the page
            </p>
          </div>
        </StatusBadge>
      }
    >
      <ButtonComponent {...props} />
    </ErrorBoundary>
  );
} 