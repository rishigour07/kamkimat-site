import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        primary: "#6C63FF",
        accent: "#00D4FF",
        card: "rgba(255,255,255,0.05)",
        border: "rgba(255,255,255,0.1)",
        muted: "#A1A1AA"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(108,99,255,0.2)",
        "glow-accent": "0 0 0 1px rgba(255,255,255,0.08), 0 18px 64px rgba(0,212,255,0.16)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;

