/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          amber: "#F59E0B",
          success: "#10B981",
          error: "#EF4444",
        },
        bg: {
          light: "#F8FAFC",
          dark: "#0F172A",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
        border: {
          light: "#E2E8F0",
          dark: "#334155",
        },
        text: {
          primaryLight: "#0F172A",
          secondaryLight: "#64748B",
          primaryDark: "#F1F5F9",
          secondaryDark: "#94A3B8",
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '96': '96px',
      },
      boxShadow: {
        'card-hover': '0 4px 24px rgba(37,99,235,0.10)',
        'modal': '0 25px 50px rgba(0,0,0,0.25)',
        'btn': '0 2px 8px rgba(37,99,235,0.25)',
      },
      borderRadius: {
        'card': '8px',
        'modal': '12px',
        'btn': '6px',
        'input': '4px',
        'pill': '999px',
      }
    },
  },
  plugins: [],
}
