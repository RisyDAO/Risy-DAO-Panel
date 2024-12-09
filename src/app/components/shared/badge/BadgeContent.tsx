import { type BadgeContentProps } from "../../../types/shared";

export function BadgeContent({ icon, children }: BadgeContentProps) {
  return (
    <div className="flex items-start space-x-3">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <div className="flex-grow min-w-0">
        {children}
      </div>
    </div>
  );
} 