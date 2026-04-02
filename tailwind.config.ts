import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        primary: "#2F80ED",
        accent: "#56A6FF",
        card: "#ffffff",
        border: "#e2e8f0",
        muted: "#64748b"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 1px 3px rgba(15, 23, 42, 0.06), 0 14px 34px rgba(47, 128, 237, 0.08)",
        "glow-accent": "0 2px 8px rgba(47, 128, 237, 0.18)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
