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
    "button-primary shadow-glow hover:translate-y-[-1px] hover:shadow-glow-accent",
  secondary:
    "button-secondary hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]",
  ghost: "button-ghost hover:bg-white/[0.06] hover:text-white"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300",
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

