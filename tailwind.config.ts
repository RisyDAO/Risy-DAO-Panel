import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          light: "#818CF8"
        },
        secondary: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
          light: "#60A5FA"
        },
        accent: {
          DEFAULT: "#2DD4BF",
          dark: "#0D9488",
          light: "#5EEAD4"
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#111827",
        },
        surface: {
          DEFAULT: "#F9FAFB",
          dark: "#1F2937",
        },
        text: {
          DEFAULT: "#111827",
          dark: "#FFFFFF",
          muted: "#6B7280",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#374151",
        },
        success: {
          DEFAULT: "#34D399",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#FBBF24",
          dark: "#D97706",
        },
        error: {
          DEFAULT: "#F87171",
          dark: "#DC2626",
        }
      },
      fontFamily: {
        sans: ["Poppins Bold", ...fontFamily.sans],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #6366F1, #3B82F6, #2DD4BF)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
