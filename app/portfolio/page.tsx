import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section-shell";
import { caseStudies, insightPoints } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore representative Kamkimat case studies across AI automation, SaaS systems, workflow integration, and premium web software."
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        description="A look at the kinds of problems Kamkimat is built to solve. These representative case studies show how we approach bottlenecks, design systems, and unlock better operating leverage."
        eyebrow="Portfolio"
        primaryCta={{ href: "/contact", label: "Discuss Your Use Case" }}
        secondaryCta={{ href: "/services", label: "See Services" }}
        title="Representative case studies for teams building smarter systems"
      />

      <SectionShell>
        <SectionIntro
          eyebrow="Case Studies"
          title="Problem, solution, and impact focused execution"
          description="Whether the bottleneck is lead handling, support load, or disconnected operations, the pattern is the same: identify the drag, design a stronger system, and implement it cleanly."
        />
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {caseStudies.map((study, index) => (
            <FadeIn delay={index * 0.07} key={study.title}>
              <GlowCard className="flex h-full flex-col">
                <div className="eyebrow">{study.sector}</div>
                <h2 className="mt-6 text-2xl font-semibold text-slate-800">{study.title}</h2>
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Problem</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{study.problem}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Solution</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{study.solution}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Impact</div>
                    <div className="mt-3 space-y-3">
                      {study.impact.map((item) => (
                        <div className="flex items-center gap-3 text-sm text-slate-600" key={item}>
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <SectionIntro
          align="center"
          eyebrow="What This Creates"
          title="The outcomes Kamkimat is built to unlock"
          description="Premium software is not just about what gets shipped. It is about what gets easier, faster, and stronger after it ships."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {insightPoints.map((point, index) => (
            <FadeIn delay={index * 0.06} key={point.title}>
              <GlowCard className="h-full">
                <h3 className="text-xl font-semibold text-slate-800">{point.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{point.description}</p>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="pb-24 sm:pb-28">
        <FadeIn>
          <GlowCard className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">Bring Your Use Case</div>
              <h2 className="mt-5 text-3xl font-semibold text-slate-800 sm:text-4xl">
                If you have a workflow bottleneck or product idea, let&apos;s shape the right system for it
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Kamkimat can help turn scattered processes, repetitive tasks, or underpowered product flows into a cleaner growth engine.
              </p>
            </div>
            <ButtonLink href="/contact">
              Start the Conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </GlowCard>
        </FadeIn>
      </SectionShell>
    </>
  );
}

