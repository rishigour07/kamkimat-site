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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl">
        <div className="px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link aria-label={siteConfig.name} href="/">
              <LogoMark compact />
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-slate-900",
                    pathname === link.href ? "bg-slate-100 text-slate-900" : ""
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
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition duration-200 hover:bg-slate-100 md:hidden"
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

