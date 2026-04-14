"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, BrainCircuit, Sparkles, Workflow } from "lucide-react";

const particles = [
  { left: "12%", top: "18%", size: 10, duration: 12, delay: 0 },
  { left: "78%", top: "16%", size: 8, duration: 14, delay: 1.4 },
  { left: "86%", top: "40%", size: 6, duration: 11, delay: 0.8 },
  { left: "18%", top: "76%", size: 7, duration: 13, delay: 2.2 },
  { left: "70%", top: "76%", size: 9, duration: 15, delay: 1.2 },
  { left: "46%", top: "12%", size: 5, duration: 10, delay: 2.8 }
];

const pipelineItems = [
  { label: "Lead Intake", value: "AI scored", icon: BrainCircuit },
  { label: "Workflow Sync", value: "Live routing", icon: Workflow },
  { label: "Support Layer", value: "Always on", icon: Bot }
];

export function HeroVisual() {
  return (
    <motion.div
      className="relative isolate mx-auto w-full max-w-[560px]"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.25),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(96,165,250,0.2),_transparent_42%)] blur-3xl" />

      {particles.map((particle) => (
        <motion.span
          animate={{ opacity: [0.25, 0.8, 0.3], y: [0, -18, 0] }}
          className="absolute rounded-full bg-blue-400/60 shadow-[0_0_24px_rgba(96,165,250,0.4)]"
          key={`${particle.left}-${particle.top}`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      <motion.div
        animate={{ y: [0, -8, 0] }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 p-6 shadow-glow backdrop-blur-2xl"
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(96,165,250,0.2),_transparent_40%)]" />
        <div className="relative">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-white/[0.45]">Kamkimat Engine</div>
              <div className="mt-1 text-lg font-semibold text-white">AI Operating Layer</div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-400">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {pipelineItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
                  key={item.label}
                  transition={{
                    duration: 6 + index,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.4
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{item.label}</div>
                        <div className="text-sm text-white/[0.55]">{item.value}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                      Active
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-white/40">Automation flow</div>
              <div className="mt-3 text-3xl font-semibold text-white">Discover to deploy</div>
              <div className="mt-2 text-sm leading-6 text-white/60">
                Product, workflow, and AI execution inside one aligned delivery layer.
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-white/40">Signal quality</div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-semibold text-white">Premium</span>
                <span className="pb-1 text-sm text-blue-400">UX + systems</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <motion.div
                  animate={{ width: ["38%", "82%", "64%"] }}
                  className="h-2 rounded-full bg-[linear-gradient(90deg,#3b82f6_0%,#60a5fa_100%)]"
                  transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -4, 0] }}
        className="absolute -left-6 bottom-10 hidden rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-glow backdrop-blur-xl sm:block"
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="text-xs uppercase tracking-[0.24em] text-white/40">Live workflows</div>
        <div className="mt-1 text-sm font-semibold text-white">Automate ops without losing control</div>
      </motion.div>
    </motion.div>
  );
}
