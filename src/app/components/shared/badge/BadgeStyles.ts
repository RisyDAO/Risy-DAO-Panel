import { type StatusBadgeVariant } from "../../../types/shared";

export function getBadgeStyles(variant: StatusBadgeVariant): string {
  switch (variant) {
    case 'success':
      return `
        bg-green-900 bg-opacity-20 
        border-green-500 
        text-green-400
      `;
    case 'warning':
      return `
        bg-yellow-900 bg-opacity-20 
        border-yellow-500 
        text-yellow-400
      `;
    case 'error':
      return `
        bg-red-900 bg-opacity-20 
        border-red-500 
        text-red-400
      `;
    case 'info':
    default:
      return `
        bg-blue-900 bg-opacity-20 
        border-blue-500 
        text-blue-400
      `;
  }
} 