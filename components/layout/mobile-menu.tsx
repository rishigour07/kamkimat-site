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
          className="absolute inset-x-4 top-full mt-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.10)] md:hidden"
          exit={{ opacity: 0, y: -12 }}
          initial={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                className={cn(
                  "block rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-slate-600 transition duration-200 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900",
                  pathname === link.href ? "border-slate-200 bg-slate-50 text-slate-900" : ""
                )}
                href={link.href}
                key={link.href}
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Start a project</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
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

