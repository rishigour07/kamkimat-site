"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import type { FAQItem } from "@/lib/site";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: FAQItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 shadow-glass backdrop-blur-xl"
            key={item.question}
          >
            <button
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span className="text-base font-medium text-slate-200 sm:text-lg">{item.question}</span>
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-slate-800/60 text-slate-400 transition duration-200",
                  isOpen ? "rotate-180 border-blue-500/30 text-blue-400" : ""
                )}
              >
                <ChevronDown className="h-5 w-5" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="px-6 pb-6 text-sm leading-7 text-slate-400 sm:text-base">{item.answer}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
