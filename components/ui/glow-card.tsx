import { cn } from "@/lib/utils";

type GlowCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlowCard({ className, children }: GlowCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.05)] transition duration-200 hover:border-slate-300",
        className
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
