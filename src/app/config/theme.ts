import { type Theme } from "thirdweb/react";

export const risyDaoTheme: Theme = {
  colors: {
    // Primary colors
    primaryText: "#FFFFFF",
    secondaryText: "#9CA3AF",
    accentText: "#818CF8",
    
    // Button colors
    primaryButtonBg: "linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)",
    primaryButtonText: "#FFFFFF",
    secondaryButtonBg: "#1F2937",
    secondaryButtonText: "#FFFFFF",
    secondaryButtonHoverBg: "linear-gradient(135deg, #374151, #1F2937)",
    accentButtonBg: "linear-gradient(135deg, #3730A3, #4F46E5, #2BB3A0)",
    accentButtonText: "#FFFFFF",
    
    // Modal & Background colors
    modalBg: "#111827",
    modalOverlayBg: "rgba(17, 24, 39, 0.8)",
    tertiaryBg: "#1F2937",
    
    // Border & Separator colors
    borderColor: "#374151",
    separatorLine: "#374151",
    
    // Icon colors
    secondaryIconColor: "#9CA3AF",
    secondaryIconHoverColor: "#A5B4FC",
    secondaryIconHoverBg: "rgba(31, 41, 55, 0.5)",
    
    // Status colors
    success: "#34D399",
    danger: "#F87171",
    
    // Selection colors
    selectedTextColor: "#FFFFFF",
    selectedTextBg: "#374151",
    
    // Connected wallet button
    connectedButtonBg: "#1F2937",
    connectedButtonBgHover: "linear-gradient(135deg, #374151, #1F2937)",
    
    // Misc UI elements
    skeletonBg: "#1F2937",
    tooltipBg: "#1F2937",
    tooltipText: "#FFFFFF",
    scrollbarBg: "#1F2937",
    inputAutofillBg: "#111827",
  },
  fontFamily: "'Poppins Bold', sans-serif",
  type: "dark"
}; 