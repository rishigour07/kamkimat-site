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
            className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] shadow-glow backdrop-blur-xl"
            key={item.question}
          >
            <button
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span className="text-base font-medium text-white sm:text-lg">{item.question}</span>
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition duration-300",
                  isOpen ? "rotate-180 border-accent/30 text-accent" : ""
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
                  <div className="px-6 pb-6 text-sm leading-7 text-white/[0.68] sm:text-base">{item.answer}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}


