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
          success: "#16A34A",
          error: "#EF4444",
        },
        bg: {
          light: "#FFF8F2",
          dark: "#0A0F1E",
        },
        surface: {
          light: "#FFF5EB",
          dark: "#161B2B",
        },
        border: {
          light: "#E5E7EB",
          dark: "#252B3B",
        },
        text: {
          primaryLight: "#1F2937",
          secondaryLight: "#4B5563",
          primaryDark: "#F9FAFB",
          secondaryDark: "#9CA3AF",
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      spacing: {
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '96': '96px',
      },
      boxShadow: {
        'card-hover': '0 8px 30px rgba(37,99,235,0.08)',
        'modal': '0 30px 60px rgba(0,0,0,0.15)',
        'btn': '0 2px 10px rgba(37,99,235,0.2)',
      },
      borderRadius: {
        'card': '12px',
        'modal': '16px',
        'btn': '8px',
        'input': '6px',
        'pill': '999px',
      }
    },
  },
  plugins: [],
}
