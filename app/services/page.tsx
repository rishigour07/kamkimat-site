import type { Metadata } from "next";
import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { CinematicSection } from "@/components/ui/cinematic-section";
import { FadeIn } from "@/components/ui/fade-in";
import { GlowButton } from "@/components/ui/glow-button";
import { GlowCard } from "@/components/ui/glow-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionIntro } from "@/components/ui/section-intro";
import { TiltCard } from "@/components/ui/tilt-card";
import { processSteps } from "@/lib/site";
import { getSiteContentData } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "IT Services | Custom Software, SaaS, AI Automation and Chatbot Development",
  description:
    "Explore Kamkimat IT services: custom SaaS development, AI automation, chatbot development, workflow integration, web apps, and software consulting.",
  keywords: [
    "IT services company",
    "custom software services",
    "AI automation services",
    "chatbot development services",
    "workflow integration services"
  ],
  alternates: {
    canonical: "/services"
  }
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

      <CinematicSection>
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
                <TiltCard className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-slate-100">{service.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
                  <div className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <div className="flex items-center gap-3 text-sm text-slate-400" key={point}>
                        <Check className="h-4 w-4 text-blue-400" />
                        {point}
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </CinematicSection>

      <CinematicSection>
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
                <TiltCard className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-slate-600">0{index + 1}</div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-100">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{step.description}</p>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </CinematicSection>

      <CinematicSection className="pb-24 sm:pb-28">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 shadow-glow backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/[0.06] via-transparent to-blue-400/[0.04]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="eyebrow">Next Step</div>
                <h2 className="mt-5 text-3xl font-semibold text-slate-100 sm:text-4xl">
                  Need a system that fits your business instead of forcing your business to fit the tool?
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-400">
                  We can help scope the right engagement, whether you&apos;re launching a product, modernizing workflows, or adding AI to existing operations.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <GlowButton href="/contact">Book a Strategy Call</GlowButton>
                <GlowButton href={`mailto:${siteConfig.email}`} variant="secondary">
                  Email Kamkimat
                </GlowButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </CinematicSection>
    </>
  );
}
