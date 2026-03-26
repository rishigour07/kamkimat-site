"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileMenu({ open, pathname, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 top-full mt-3 rounded-[28px] border border-white/10 bg-[#0c0d14]/95 p-5 shadow-glow backdrop-blur-2xl md:hidden"
          exit={{ opacity: 0, y: -12 }}
          initial={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                className={cn(
                  "block rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-white/70 transition duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
                  pathname === link.href ? "border-white/10 bg-white/[0.06] text-white" : ""
                )}
                href={link.href}
                key={link.href}
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="text-xs uppercase tracking-[0.22em] text-white/40">Start a project</div>
            <p className="mt-2 text-sm leading-6 text-white/[0.65]">
              Tell us what you want to automate, build, or scale, and we&apos;ll help shape the right next step.
            </p>
            <div className="mt-4 flex gap-3">
              <ButtonLink className="flex-1" href="/contact">
                Get Started
              </ButtonLink>
              <ButtonLink className="flex-1" href={`mailto:${siteConfig.email}`} variant="secondary">
                Book a Call
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


