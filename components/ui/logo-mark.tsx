import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  compact?: boolean;
};

export function LogoMark({ className, compact = false }: LogoMarkProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <img
        alt="Kamkimat logo"
        className={cn(
          "w-auto object-contain drop-shadow-[0_10px_24px_rgba(47,128,237,0.16)]",
          compact ? "h-9 max-w-[190px]" : "h-12 max-w-[420px] sm:h-14"
        )}
        src="/kamkimat-logo.png"
      />
    </div>
  );
}
