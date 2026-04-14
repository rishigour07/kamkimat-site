import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CircleCheck,
  MessageSquareQuote,
  type LucideIcon
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { CinematicSection } from "@/components/ui/cinematic-section";
import { FadeIn } from "@/components/ui/fade-in";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { GlowButton } from "@/components/ui/glow-button";
import { GlowCard } from "@/components/ui/glow-card";
import { HeroSection } from "@/components/ui/hero-section";
import { SectionIntro } from "@/components/ui/section-intro";
import { TiltCard } from "@/components/ui/tilt-card";
import { TextReveal } from "@/components/ui/text-reveal";
import { getSiteContentData } from "@/lib/site-content";
import {
  aiSolutions,
  faqs,
  insightPoints,
  processSteps,
  stats,
  testimonialThemes,
  whyKamkimat
} from "@/lib/site";

export const metadata: Metadata = {
  title: "IT Service Company for Custom Software, SaaS and AI Automation",
  description:
    "Kamkimat Technologies is an IT service company helping startups and businesses with custom software development, AI automation, chatbot systems, and SaaS products.",
  keywords: [
    "IT service company",
    "custom software development company",
    "AI automation company",
    "SaaS development services",
    "chatbot development company",
    "web application development"
  ],
  alternates: {
    canonical: "/"
  }
};

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function IconCard({ icon: Icon, title, description }: IconCardProps) {
  return (
    <TiltCard className="h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-100">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </TiltCard>
  );
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { content, services, siteConfig } = await getSiteContentData();

  return (
    <>
      {/* Hero Section with particles */}
      <HeroSection content={content} siteConfig={siteConfig} />

      {/* Stats Section */}
      <CinematicSection>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn delay={index * 0.06} key={stat.label}>
              <TiltCard className="h-full">
                <div className="text-4xl font-semibold text-gradient">{stat.value}</div>
                <div className="mt-2 text-lg font-medium text-slate-200">{stat.label}</div>
                <p className="mt-2 text-sm leading-7 text-slate-400">{stat.detail}</p>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </CinematicSection>

      {/* Services Section */}
      <CinematicSection id="services">
        <SectionIntro
          eyebrow="Core Services"
          title="High-value product, AI, and automation capabilities in one delivery partner"
          description="Kamkimat brings strategy, design, engineering, and automation thinking together so your business gets systems that actually move the needle."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <FadeIn delay={index * 0.05} key={service.title}>
                <TiltCard className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-100">{service.title}</h3>
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

      {/* Why Kamkimat */}
      <CinematicSection fadeDirection="left">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeIn>
            <SectionIntro
              eyebrow="Why Kamkimat"
              title="Built for businesses that want better leverage, not more busywork"
              description="The strongest software systems do more than launch. They remove drag, create compounding value, and make your next growth move easier."
            />
          </FadeIn>
          <div className="grid gap-5">
            {whyKamkimat.map((item, index) => (
              <FadeIn delay={index * 0.07} key={item.title}>
                <IconCard description={item.description} icon={item.icon} title={item.title} />
              </FadeIn>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Process Steps */}
      <CinematicSection>
        <SectionIntro
          align="center"
          eyebrow="Delivery Process"
          title="A clean four-step system to go from idea to scalable software"
          description="We keep the process focused, strategic, and execution-driven so you can make progress without losing momentum."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <FadeIn delay={index * 0.08} key={step.title}>
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

      {/* AI Solutions */}
      <CinematicSection fadeDirection="right">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <FadeIn>
            <SectionIntro
              eyebrow="AI Solutions"
              title="Practical AI layers that improve how your business runs"
              description="Not AI for show. AI for smoother handoffs, faster decisions, stronger customer experiences, and scalable operations."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <GlowCard className="h-full">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                What premium teams want
              </div>
              <div className="mt-4 space-y-4">
                {insightPoints.map((point) => (
                  <div className="rounded-xl border border-white/[0.06] bg-slate-800/40 p-4" key={point.title}>
                    <div className="text-base font-medium text-slate-200">{point.title}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{point.description}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </FadeIn>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {aiSolutions.map((solution, index) => (
            <FadeIn delay={index * 0.05} key={solution.title}>
              <IconCard
                description={solution.description}
                icon={solution.icon}
                title={solution.title}
              />
            </FadeIn>
          ))}
        </div>
      </CinematicSection>

      {/* Testimonials */}
      <CinematicSection>
        <SectionIntro
          align="center"
          eyebrow="What Serious Teams Look For"
          title="The priorities ambitious clients bring to Kamkimat"
          description="These are the recurring expectations we hear from founders, operators, and agencies that care about quality, speed, and leverage."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonialThemes.map((item, index) => (
            <FadeIn delay={index * 0.08} key={item.person}>
              <TiltCard className="h-full">
                <MessageSquareQuote className="h-8 w-8 text-blue-400" />
                <p className="mt-6 text-lg leading-8 text-slate-300">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-8">
                  <div className="text-base font-semibold text-slate-200">{item.person}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </CinematicSection>

      {/* FAQ */}
      <CinematicSection id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn>
            <SectionIntro
              eyebrow="FAQ"
              title="Questions teams ask before they build, automate, or scale"
              description="A quick look at how Kamkimat approaches strategy, execution, and AI-enabled software delivery."
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <FaqAccordion items={faqs} />
          </FadeIn>
        </div>
      </CinematicSection>

      {/* CTA Banner */}
      <CinematicSection className="pb-24 sm:pb-28">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-900/60 px-6 py-10 shadow-glow backdrop-blur-xl sm:px-10 sm:py-12 lg:px-12">
            {/* Gradient glow background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/[0.08] via-transparent to-blue-400/[0.06]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="eyebrow">Ready To Build</div>
                <TextReveal
                  tag="h2"
                  className="mt-5 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl"
                >
                  {content.home.ctaTitle}
                </TextReveal>
                <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">
                  {content.home.ctaDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <GlowButton href="/contact">Get Started</GlowButton>
                <GlowButton href="/portfolio" variant="secondary">
                  View Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </GlowButton>
              </div>
            </div>
          </div>
        </FadeIn>
      </CinematicSection>
    </>
  );
}
