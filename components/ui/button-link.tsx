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
    "button-primary hover:bg-[#1f6fd6]",
  secondary:
    "button-secondary hover:border-slate-300 hover:bg-slate-50",
  ghost: "button-ghost hover:bg-slate-100 hover:text-slate-700"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-200",
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
