import { cn } from "@/lib/utils";

type GlowCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlowCard({ className, children }: GlowCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl transition duration-300 hover:border-white/[0.15] hover:bg-white/[0.06]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-60" />
      <div className="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-primary/20 blur-3xl transition duration-300 group-hover:bg-accent/20" />
      <div className="relative">{children}</div>
    </div>
  );
}

