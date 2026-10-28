import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#070709",
          900: "#0d0d11",
          850: "#131318",
          800: "#1a1a21",
          700: "#272732",
          600: "#383847",
        },
        ivory: {
          50: "#ffffff",
          100: "#fbfaf7",
          200: "#f4f1ea",
          300: "#e6e1d5",
          400: "#c7c0b0",
          500: "#9e9684",
        },
        amberGold: {
          300: "#f9d784",
          400: "#f4bf53",
          500: "#e5a93c",
          600: "#cc8b23",
          700: "#a26a17",
          glow: "rgba(229, 169, 60, 0.2)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        serif: [
          '"Cinzel"',
          '"Playfair Display"',
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
      boxShadow: {
        "glow-amber": "0 0 35px -5px rgba(229, 169, 60, 0.25)",
        "glow-soft": "0 0 50px -10px rgba(244, 191, 83, 0.15)",
        "glass-inset": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
