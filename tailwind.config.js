/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "oklch(0.95 0.05 285)",
          100: "oklch(0.9 0.1 285)",
          200: "oklch(0.8 0.15 285)",
          300: "oklch(0.7 0.18 285)",
          400: "oklch(0.6 0.19 285)",
          500: "oklch(0.58 0.2 285)",
          600: "oklch(0.5 0.18 285)",
          700: "oklch(0.4 0.15 285)",
          800: "oklch(0.3 0.12 285)",
          900: "oklch(0.2 0.1 285)",
          950: "oklch(0.1 0.08 285)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "oklch(0.55 0.15 142)",
          foreground: "oklch(0.98 0 0)",
          50: "oklch(0.95 0.05 142)",
          100: "oklch(0.9 0.1 142)",
          500: "oklch(0.55 0.15 142)",
          600: "oklch(0.5 0.18 142)",
          700: "oklch(0.45 0.2 142)",
        },
        warning: {
          DEFAULT: "oklch(0.65 0.18 38)",
          foreground: "oklch(0.98 0 0)",
          50: "oklch(0.95 0.05 38)",
          100: "oklch(0.9 0.1 38)",
          500: "oklch(0.65 0.18 38)",
          600: "oklch(0.6 0.2 38)",
          700: "oklch(0.55 0.22 38)",
        },
        info: {
          DEFAULT: "oklch(0.6 0.15 199)",
          foreground: "oklch(0.98 0 0)",
          50: "oklch(0.95 0.05 199)",
          100: "oklch(0.9 0.1 199)",
          500: "oklch(0.6 0.15 199)",
          600: "oklch(0.55 0.18 199)",
          700: "oklch(0.5 0.2 199)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
