import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  compact?: boolean;
};

export function LogoMark({ className, compact = false }: LogoMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.15] bg-white/5 shadow-glow">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(0,212,255,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(108,99,255,0.45),_transparent_60%)]" />
        <div className="relative text-lg font-black text-white">K</div>
      </div>
      {!compact ? (
        <div>
          <div className="text-base font-semibold tracking-[0.24em] text-white/90">KAMKIMAT</div>
          <div className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">AI Systems Studio</div>
        </div>
      ) : null}
    </div>
  );
}


