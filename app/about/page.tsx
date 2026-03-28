import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section-shell";
import { getVisibleFounders } from "@/lib/founders";
import { getSiteContentData } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Kamkimat helps businesses automate, scale, and grow with premium AI-powered software systems."
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { aboutValues, content } = await getSiteContentData();
  const founders = await getVisibleFounders();

  return (
    <>
      <PageHero
        description={content.about.heroDescription}
        eyebrow="About Kamkimat"
        primaryCta={{ href: "/contact", label: "Start a Conversation" }}
        secondaryCta={{ href: "/services", label: "Explore Services" }}
        title={content.about.heroTitle}
      />

      <SectionShell>
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <GlowCard className="h-full">
              <div className="eyebrow">Mission</div>
              <h2 className="mt-6 text-3xl font-semibold text-white">{content.about.missionTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/[0.65]">
                {content.about.missionDescription}
              </p>
            </GlowCard>
          </FadeIn>
          <FadeIn delay={0.08}>
            <GlowCard className="h-full">
              <div className="eyebrow">Vision</div>
              <h2 className="mt-6 text-3xl font-semibold text-white">{content.about.visionTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/[0.65]">
                {content.about.visionDescription}
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
              title={content.about.storyTitle}
              description={content.about.storyDescription}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <GlowCard>
              <div className="space-y-5 text-base leading-8 text-white/[0.65]">
                {content.about.storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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

      {founders.length > 0 ? (
        <SectionShell>
          <SectionIntro
            align="center"
            eyebrow="Founders"
            title="Meet the leadership behind Kamkimat"
            description="Founder details are managed from the Kamkimat admin panel."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {founders.map((founder, index) => (
              <FadeIn delay={index * 0.06} key={founder.id}>
                <GlowCard className="h-full">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    {founder.photoData ? (
                      <img
                        alt={founder.name}
                        className="h-32 w-32 rounded-3xl border border-white/10 object-cover"
                        src={founder.photoData}
                      />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03] text-sm text-white/[0.45]">
                        No photo
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                        {founder.role}
                      </div>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{founder.name}</h3>
                      <p className="mt-4 text-sm leading-7 text-white/[0.62]">
                        {founder.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            ))}
          </div>
        </SectionShell>
      ) : null}

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


