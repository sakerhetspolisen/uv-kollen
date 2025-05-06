import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["'Source Serif 4'", "serif"],
      sans: ["'PT Sans'", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#e6c050",
        minecraft: "#60A060",
        "soft-red": "#da7756",
        orange: "#da7756",
        love: "#a94c4c",
        neutral: {
          light: "#F5F2ED",
          DEFAULT: "#e0dcd7",
          dark: "#2a2725",
          100: "#F5F2ED",
          200: "#ECE8E2",
          300: "#E4DFD9",
          400: "#DDD8D2",
          500: "#E0DCD7",
          600: "#C2BFB9",
          700: "#A6A39F",
          800: "#6F6C6A",
          900: "#403D3B",
          950: "#2A2725",
        },
        earth: {
          100: "#c2b7a2",
          200: "#b0a794",
          300: "#816e63",
          400: "#585654",
          500: "#8e827c",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
