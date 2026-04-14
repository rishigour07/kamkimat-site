"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { SectionShell } from "@/components/ui/section-shell";
import { ParticleField } from "@/components/ui/particle-field";
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
    <SectionShell className={cn("pt-28 sm:pt-32", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 px-6 py-12 shadow-glass backdrop-blur-xl sm:px-10 sm:py-16 lg:px-14">
        {/* Particle background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <ParticleField particleCount={40} connectDistance={80} />
        </div>
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/[0.06] via-transparent to-transparent" />
        <div className="relative max-w-4xl">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">{description}</p>
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
