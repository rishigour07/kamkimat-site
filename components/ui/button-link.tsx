import Link from "next/link";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "button-primary hover:bg-blue-500 hover:shadow-glow-strong",
  secondary:
    "button-secondary hover:border-slate-600 hover:bg-slate-700/60 hover:text-white",
  ghost: "button-ghost hover:bg-slate-800 hover:text-slate-200"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300",
    variants[variant],
    className
  );

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a className={classes} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
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
