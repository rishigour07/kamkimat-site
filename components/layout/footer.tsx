import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { LogoMark } from "@/components/ui/logo-mark";
import { footerLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="max-w-xl">
          <LogoMark />
          <p className="mt-5 text-base leading-8 text-white/[0.65]">{siteConfig.footerTagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Start a Project</ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
              Email Us
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/[0.45]">Explore</div>
            <div className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <Link
                  className="flex items-center gap-2 text-sm text-white/[0.65] transition duration-300 hover:text-white"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/[0.45]">Contact</div>
            <a
              className="mt-4 flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75 transition duration-300 hover:border-white/[0.15] hover:text-white"
              href={`mailto:${siteConfig.email}`}
            >
              <Mail className="h-4 w-4 text-accent" />
              {siteConfig.email}
            </a>
            <p className="mt-5 text-sm leading-7 text-white/[0.45]">
              Premium software systems for teams that want better leverage, cleaner workflows, and stronger growth foundations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


