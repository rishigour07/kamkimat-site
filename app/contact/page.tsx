import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/ui/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section-shell";
import { businessContactItems } from "@/lib/constants/business";
import { contactReasons, faqs, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Kamkimat for custom SaaS development, AI automation, chatbot projects, workflow integration, and software consulting."
};

export default function ContactPage() {
  const getContactIcon = (label: string) => {
    if (label === "Mobile") {
      return Phone;
    }

    if (label === "Office") {
      return MapPin;
    }

    return Mail;
  };

  return (
    <>
      <PageHero
        description="Tell us what you want to build, automate, or improve. Kamkimat works with startups, SMEs, founders, and agencies that want premium software execution with real business value behind it."
        eyebrow="Contact"
        primaryCta={{ href: `mailto:${siteConfig.email}`, label: "Email Kamkimat" }}
        secondaryCta={{ href: "/services", label: "Review Services" }}
        title="Start a project conversation with Kamkimat"
      />

      <SectionShell>
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <GlowCard className="h-full">
              <SectionIntro
                eyebrow="Project Inquiry"
                title="Share the brief"
                description="A few details are enough to start. We&apos;ll use them to understand the problem, the service fit, and the best next step."
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </GlowCard>
          </FadeIn>

          <div className="grid gap-6">
            <FadeIn delay={0.06}>
              <GlowCard>
                <div className="eyebrow">Direct Contact</div>
                <div className="mt-6 space-y-3">
                  {businessContactItems.map((item) => {
                    const Icon = getContactIcon(item.label);

                    return item.href ? (
                      <a
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75 transition duration-300 hover:border-white/[0.15] hover:text-white"
                        href={item.href}
                        key={item.label}
                      >
                        <Icon className="h-4 w-4 text-accent" />
                        <span className="font-medium text-white">{item.label}:</span>
                        {item.value}
                      </a>
                    ) : (
                      <div
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75"
                        key={item.label}
                      >
                        <Icon className="h-4 w-4 text-accent" />
                        <span className="font-medium text-white">{item.label}:</span>
                        {item.value}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  Ideal for project scopes, AI automation opportunities, web app builds, and consulting requests.
                </p>
              </GlowCard>
            </FadeIn>

            {contactReasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <FadeIn delay={0.12 + index * 0.06} key={reason.title}>
                  <GlowCard>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">{reason.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/[0.62]">{reason.description}</p>
                  </GlowCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="pb-24 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeIn>
            <SectionIntro
              eyebrow="Quick Answers"
              title="A few things teams usually want to know before reaching out"
              description="If you&apos;re still sizing up the fit, these answers can help clarify how Kamkimat approaches projects and collaboration."
            />
          </FadeIn>
          <div className="grid gap-4">
            {faqs.slice(0, 3).map((item, index) => (
              <FadeIn delay={index * 0.05} key={item.question}>
                <GlowCard>
                  <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/[0.62]">{item.answer}</p>
                </GlowCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  );
}

