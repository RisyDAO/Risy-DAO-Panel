import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { StatusBadge } from "../../shared/StatusBadge";
import Image from "next/image";

interface LogoProps {
  src: string;
  alt: string;
}

function LogoContent({ src, alt }: LogoProps) {
  return (
    <div className="relative w-8 h-8">
      <Image
        src={src}
        alt={alt}
        width={32}
        height={32}
        className="rounded-full"
        priority
      />
    </div>
  );
}

export function Logo(props: LogoProps) {
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
            <h3 className="font-semibold text-inherit">Failed to load logo</h3>
            <p className="text-sm opacity-90">
              Please try refreshing the page
            </p>
          </div>
        </StatusBadge>
      }
    >
      <LogoContent {...props} />
    </ErrorBoundary>
  );
} 