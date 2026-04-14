import { cn } from "@/lib/utils";

type GlowCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlowCard({ className, children }: GlowCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 shadow-glass backdrop-blur-xl transition-all duration-300 hover:border-blue-500/20 hover:shadow-glow",
        className
      )}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">{children}</div>
    </div>
  );
}
