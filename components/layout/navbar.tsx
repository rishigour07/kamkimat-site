"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { LogoMark } from "@/components/ui/logo-mark";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-full border border-white/10 bg-black/[0.35] px-4 py-3 shadow-glow backdrop-blur-2xl sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <Link aria-label={siteConfig.name} href="/">
              <LogoMark compact />
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium text-white/[0.65] transition duration-300 hover:bg-white/[0.05] hover:text-white",
                    pathname === link.href ? "bg-white/[0.08] text-white" : ""
                  )}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <ButtonLink href="/contact">Get Started</ButtonLink>
            </div>

            <button
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition duration-300 hover:bg-white/[0.08] md:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <MobileMenu onClose={() => setOpen(false)} open={open} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}


