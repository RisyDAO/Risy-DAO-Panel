import { type ButtonVariant } from "../../../types/shared";

export function getButtonStyles(variant: ButtonVariant, disabled: boolean): string {
  const baseStyles = `
    w-full px-4 py-2 rounded-md font-medium
    flex items-center justify-center space-x-2
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111827]
  `;

  if (disabled) {
    return `
      ${baseStyles}
      bg-[#374151] text-[#9CA3AF] cursor-not-allowed
      hover:bg-[#374151] focus:ring-[#374151]
    `;
  }

  switch (variant) {
    case 'primary':
      return `
        ${baseStyles}
        bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#2DD4BF]
        hover:from-[#4F46E5] hover:via-[#2563EB] hover:to-[#0D9488]
        text-white
        focus:ring-[#6366F1]
      `;
    case 'secondary':
      return `
        ${baseStyles}
        bg-[#374151] text-white
        hover:bg-[#4B5563]
        focus:ring-[#374151]
      `;
    default:
      return baseStyles;
  }
} 