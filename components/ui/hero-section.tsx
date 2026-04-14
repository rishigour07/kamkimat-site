"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";

import { GlowButton } from "@/components/ui/glow-button";
import { GlowCard } from "@/components/ui/glow-card";
import { HeroCanvas } from "@/components/ui/hero-canvas";
import { TextReveal } from "@/components/ui/text-reveal";

type HeroSectionProps = {
  content: {
    home: {
      eyebrow: string;
      headline: string;
      description: string;
      highlights: string[];
    };
  };
  siteConfig: {
    email: string;
  };
};

/* ─────────── Clean gradient divider ─────────── */
function GradientDivider() {
  return (
    <motion.div
      className="mx-auto mt-6 h-[1px] w-20 rounded-full"
      style={{
        background:
          "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, transparent)",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ─────────── Canvas fallback loader ─────────── */
function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-12 w-12 animate-pulse rounded-full bg-blue-500/20 blur-lg" />
    </div>
  );
}

export function HeroSection({ content, siteConfig }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── 3D Canvas Background ── */}
      <Suspense fallback={<CanvasLoader />}>
        <HeroCanvas />
      </Suspense>

      {/* ── Subtle gradient overlays ── */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }}>
        {/* Top-left blue glow */}
        <div
          className="absolute -left-20 -top-20 h-[500px] w-[600px] rounded-full opacity-40 blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          }}
        />
        {/* Right blue glow */}
        <div
          className="absolute -right-10 top-1/4 h-[400px] w-[500px] rounded-full opacity-30 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Foreground Content ── */}
      <div
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
        style={{ zIndex: 2, paddingTop: "clamp(7rem, 12vh, 10rem)" }}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="eyebrow">{content.home.eyebrow}</div>
              </motion.div>

              <TextReveal
                tag="h1"
                className="hero-heading mt-7"
                delay={0.25}
                stagger={0.04}
              >
                {content.home.headline}
              </TextReveal>

              <GradientDivider />

              <motion.p
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                {content.home.description}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9 }}
              >
                <GlowButton href="/contact">
                  Get Started
                </GlowButton>
                <GlowButton
                  href={`mailto:${siteConfig.email}`}
                  variant="secondary"
                >
                  Book a Call
                </GlowButton>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.1 }}
              >
                {content.home.highlights.map((highlight) => (
                  <div className="hero-metric-chip" key={highlight}>
                    {highlight}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Info card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
            style={{ perspective: "900px" }}
          >
            <GlowCard className="hero-info-card">
              <div className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                Why teams choose Kamkimat
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-100">
                Built for practical growth
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Clear project scoping and realistic timelines",
                  "Business-first product and automation decisions",
                  "Maintainable systems your team can actually run",
                ].map((item) => (
                  <div className="flex items-start gap-3" key={item}>
                    <CircleCheck className="mt-0.5 h-5 w-5 text-blue-400" />
                    <p className="text-sm leading-7 text-slate-400">{item}</p>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom gradient fade ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          zIndex: 3,
          background:
            "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
