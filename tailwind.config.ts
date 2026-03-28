import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        inter: ["var(--font-inter)"],
        bebas: ["var(--font-bebas)"],
      },
      colors: {
        chapter1: "#0A0E1A",
        chapter2: "#0D1117",
        chapter3: "#1A0F00",
        ctaBg: "#2C1500",
      },
    },
  },
  plugins: [],
};
export default config;
