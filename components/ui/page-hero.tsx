import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: React.ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
  className
}: PageHeroProps) {
  return (
    <SectionShell className={cn("pt-32 sm:pt-36", className)}>
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-12 shadow-glow backdrop-blur-2xl sm:px-10 sm:py-16 lg:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(108,99,255,0.24),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,212,255,0.18),_transparent_38%)]" />
        <div className="relative max-w-4xl">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/[0.68]">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta ? <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink> : null}
              {secondaryCta ? (
                <ButtonLink href={secondaryCta.href} variant="secondary">
                  {secondaryCta.label}
                </ButtonLink>
              ) : null}
            </div>
          )}
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </div>
    </SectionShell>
  );
}


