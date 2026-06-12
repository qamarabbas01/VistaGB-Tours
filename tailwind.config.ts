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
        night: "#0B0F14",
        slate: "#16202B",
        glacier: "#E8ECEF",
        ice: "#9FB3C2",
        apricot: "#D98E4A",
        teal: "#5C7A8A",
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
