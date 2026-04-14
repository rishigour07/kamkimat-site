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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-white/[0.06] bg-slate-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "border-transparent bg-transparent"
      )}
    >
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
                    "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                    pathname === link.href
                      ? "bg-white/[0.08] text-white"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
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
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-900/60 text-slate-400 transition duration-200 hover:bg-slate-800 hover:text-white md:hidden"
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
