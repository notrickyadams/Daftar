import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1D2B3A", soft: "#2A3B4E" },
        paper: "#F8F3E6",
        card: "#FFFDF7",
        ember: { DEFAULT: "#B5541A", dark: "#94420F" },
        apricot: "#F2A65A",
        beige: "#E3D9C2",
        muted: "#4A5160",
        wa: "#DCF2D8",
      },
      fontFamily: {
        heading: ["var(--font-rubik)", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        paper: "0 1px 0 #E3D9C2, 0 10px 30px -12px rgba(29, 43, 58, 0.25)",
        lift: "0 18px 40px -18px rgba(29, 43, 58, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
