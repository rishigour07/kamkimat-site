import type { Metadata } from "next";
import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section-shell";
import { processSteps } from "@/lib/site";
import { getSiteContentData } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kamkimat services across custom SaaS development, AI automation, chatbots, web apps, workflow integration, and consulting."
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const { content, services, siteConfig } = await getSiteContentData();

  return (
    <>
      <PageHero
        description={content.services.pageDescription}
        eyebrow="Services"
        primaryCta={{ href: "/contact", label: "Discuss Your Project" }}
        secondaryCta={{ href: "/portfolio", label: "See Solution Examples" }}
        title={content.services.pageTitle}
      />

      <SectionShell>
        <SectionIntro
          eyebrow="Service Stack"
          title="From consulting to custom delivery, each service is built for execution"
          description="We help teams define what matters, build what creates leverage, and connect the systems that keep the business moving."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <FadeIn delay={index * 0.06} key={service.title}>
                <GlowCard className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-white">{service.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/[0.62]">{service.description}</p>
                  <div className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <div className="flex items-center gap-3 text-sm text-white/[0.66]" key={point}>
                        <Check className="h-4 w-4 text-accent" />
                        {point}
                      </div>
                    ))}
                  </div>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          align="center"
          eyebrow="How We Work"
          title="A delivery process that keeps strategy, product, and engineering aligned"
          description="Strong outcomes come from good sequencing. Our process is designed to keep scope sharp, build quality high, and momentum steady."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <FadeIn delay={index * 0.07} key={step.title}>
                <GlowCard className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-white/[0.35]">0{index + 1}</div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/[0.62]">{step.description}</p>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell className="pb-24 sm:pb-28">
        <FadeIn>
          <GlowCard className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">Next Step</div>
              <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                Need a system that fits your business instead of forcing your business to fit the tool?
              </h2>
              <p className="mt-4 text-base leading-8 text-white/[0.65]">
                We can help scope the right engagement, whether you&apos;re launching a product, modernizing workflows, or adding AI to existing operations.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/contact">Book a Strategy Call</ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
                Email Kamkimat
              </ButtonLink>
            </div>
          </GlowCard>
        </FadeIn>
      </SectionShell>
    </>
  );
}

