import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section-shell";
import { aboutValues } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Kamkimat helps businesses automate, scale, and grow with premium AI-powered software systems."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        description="Kamkimat exists to turn AI and software into practical leverage for ambitious teams. We combine product thinking, premium design, and sharp execution to build systems that create real operating value."
        eyebrow="About Kamkimat"
        primaryCta={{ href: "/contact", label: "Start a Conversation" }}
        secondaryCta={{ href: "/services", label: "Explore Services" }}
        title="A premium software partner for businesses that want systems, not noise"
      />

      <SectionShell>
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <GlowCard className="h-full">
              <div className="eyebrow">Mission</div>
              <h2 className="mt-6 text-3xl font-semibold text-white">Build software that creates leverage</h2>
              <p className="mt-4 text-base leading-8 text-white/[0.65]">
                Our mission is to help businesses move faster and operate smarter with high-value software systems, premium interfaces, and AI workflows that create measurable momentum.
              </p>
            </GlowCard>
          </FadeIn>
          <FadeIn delay={0.08}>
            <GlowCard className="h-full">
              <div className="eyebrow">Vision</div>
              <h2 className="mt-6 text-3xl font-semibold text-white">Make advanced technology feel usable and powerful</h2>
              <p className="mt-4 text-base leading-8 text-white/[0.65]">
                We believe the future belongs to businesses that combine strong product foundations with intelligent automation, clean workflows, and digital experiences customers trust.
              </p>
            </GlowCard>
          </FadeIn>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn>
            <SectionIntro
              eyebrow="Story"
              title="Kamkimat was built to bridge strategy, product quality, and AI execution"
              description="Too many teams get forced to choose between smart consulting, clean design, and solid engineering. Kamkimat brings those disciplines together so businesses can build faster with more confidence."
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <GlowCard>
              <div className="space-y-5 text-base leading-8 text-white/[0.65]">
                <p>
                  We started from a simple idea: AI and software should do more than look modern. They should reduce friction, improve decisions, and create systems that support real growth.
                </p>
                <p>
                  That means approaching every project through a product lens, caring deeply about interface quality, and designing workflow logic that actually fits the team using it.
                </p>
                <p>
                  Whether we&apos;re building custom SaaS, AI automations, web applications, or strategic roadmaps, the goal stays the same: create premium software that compounds value over time.
                </p>
              </div>
            </GlowCard>
          </FadeIn>
        </div>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          align="center"
          eyebrow="Values"
          title="The principles behind how Kamkimat ships"
          description="We care about clear thinking, premium execution, and building systems people can actually rely on."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {aboutValues.map((value, index) => (
            <FadeIn delay={index * 0.06} key={value.title}>
              <GlowCard className="h-full">
                <h3 className="text-xl font-semibold text-white">{value.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.62]">{value.description}</p>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="pb-24 sm:pb-28">
        <FadeIn>
          <GlowCard className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">Let&apos;s Build</div>
              <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
                If the goal is better leverage, better systems are the next step
              </h2>
              <p className="mt-4 text-base leading-8 text-white/[0.65]">
                Kamkimat partners with ambitious teams that want premium product execution and practical AI systems, not surface-level hype.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/contact">Get Started</ButtonLink>
              <ButtonLink href="/portfolio" variant="secondary">
                View Portfolio
              </ButtonLink>
            </div>
          </GlowCard>
        </FadeIn>
      </SectionShell>
    </>
  );
}


