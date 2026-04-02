import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CircleCheck,
  MessageSquareQuote,
  type LucideIcon
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { FadeIn } from "@/components/ui/fade-in";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section-shell";
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
  title: "Premium AI Software Systems",
  description:
    "From custom SaaS to AI automation, Kamkimat helps businesses move faster, reduce costs, and grow smarter."
};

type IconCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

function IconCard({ icon: Icon, title, description }: IconCardProps) {
  return (
    <GlowCard className="h-full">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-800">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </GlowCard>
  );
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { content, services, siteConfig } = await getSiteContentData();

  return (
    <>
      <SectionShell className="pt-28 sm:pt-32 lg:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="eyebrow">{content.home.eyebrow}</div>
              <h1 className="mt-7 text-4xl font-semibold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
                {content.home.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                {content.home.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/contact">Get Started</ButtonLink>
                <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
                  Book a Call
                </ButtonLink>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {content.home.highlights.map((highlight) => (
                  <div className="metric-chip" key={highlight}>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <GlowCard>
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                Why teams choose Kamkimat
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-800">Built for practical growth</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Clear project scoping and realistic timelines",
                  "Business-first product and automation decisions",
                  "Maintainable systems your team can actually run"
                ].map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <CircleCheck className="mt-0.5 h-5 w-5 text-primary" />
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </FadeIn>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeIn delay={index * 0.06} key={stat.label}>
              <GlowCard className="h-full">
                <div className="text-4xl font-semibold text-slate-800">{stat.value}</div>
                <div className="mt-2 text-lg font-medium text-slate-800">{stat.label}</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{stat.detail}</p>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="services">
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
                <GlowCard className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-800">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                  <div className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <div className="flex items-center gap-3 text-sm text-slate-600" key={point}>
                        <Check className="h-4 w-4 text-primary" />
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
      </SectionShell>

      <SectionShell>
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
                <GlowCard className="h-full">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold text-slate-400">0{index + 1}</div>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-800">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell>
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
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
                What premium teams want
              </div>
              <div className="mt-4 space-y-4">
                {insightPoints.map((point) => (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={point.title}>
                    <div className="text-base font-medium text-slate-800">{point.title}</div>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{point.description}</p>
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
      </SectionShell>

      <SectionShell>
        <SectionIntro
          align="center"
          eyebrow="What Serious Teams Look For"
          title="The priorities ambitious clients bring to Kamkimat"
          description="These are the recurring expectations we hear from founders, operators, and agencies that care about quality, speed, and leverage."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonialThemes.map((item, index) => (
            <FadeIn delay={index * 0.08} key={item.person}>
              <GlowCard className="h-full">
                <MessageSquareQuote className="h-8 w-8 text-primary" />
                <p className="mt-6 text-lg leading-8 text-slate-700">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-8">
                  <div className="text-base font-semibold text-slate-800">{item.person}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </div>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="faq">
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
      </SectionShell>

      <SectionShell className="pb-24 sm:pb-28">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:px-10 sm:py-12 lg:px-12">
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="eyebrow">Ready To Build</div>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
                  {content.home.ctaTitle}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                  {content.home.ctaDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/contact">Get Started</ButtonLink>
                <ButtonLink href="/portfolio" variant="secondary">
                  View Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionShell>
    </>
  );
}
