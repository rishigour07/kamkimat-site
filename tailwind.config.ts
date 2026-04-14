import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0f1c",
        "background-alt": "#0f1629",
        surface: "#111827",
        "surface-light": "#1e293b",
        primary: "#3b82f6",
        accent: "#60a5fa",
        "accent-glow": "#93c5fd",
        card: "rgba(17, 24, 39, 0.7)",
        border: "rgba(148, 163, 184, 0.12)",
        muted: "#94a3b8"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.15), 0 0 60px rgba(59, 130, 246, 0.08)",
        "glow-accent": "0 0 30px rgba(96, 165, 250, 0.25)",
        "glow-strong": "0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15)",
        "card-hover": "0 0 30px rgba(59, 130, 246, 0.12), 0 20px 40px rgba(0, 0, 0, 0.3)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.3)"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" }
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(59, 130, 246, 0.5), 0 0 80px rgba(59, 130, 246, 0.2)" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(59, 130, 246, 0.2)" },
          "50%": { borderColor: "rgba(96, 165, 250, 0.5)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
