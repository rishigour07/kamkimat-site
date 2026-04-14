import Link from "next/link";

import { cn } from "@/lib/utils";

type GlowButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function GlowButton({
  href,
  children,
  className,
  variant = "primary"
}: GlowButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-300";

  const variantClasses = {
    primary:
      "glow-cta bg-primary text-white hover:bg-blue-500 shadow-glow hover:shadow-glow-strong",
    secondary:
      "border border-slate-700 bg-slate-800/60 text-slate-300 backdrop-blur hover:border-slate-600 hover:bg-slate-700/60 hover:text-white"
  };

  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        className={classes}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
