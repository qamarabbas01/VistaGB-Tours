import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "rgb(var(--c-night) / <alpha-value>)",
        slate: "rgb(var(--c-slate) / <alpha-value>)",
        glacier: "rgb(var(--c-glacier) / <alpha-value>)",
        ice: "rgb(var(--c-ice) / <alpha-value>)",
        apricot: "rgb(var(--c-apricot) / <alpha-value>)",
        teal: "rgb(var(--c-teal) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        scrim: "rgb(var(--c-scrim) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains)"],
      },
    },
  },
  plugins: [],
};
export default config;
