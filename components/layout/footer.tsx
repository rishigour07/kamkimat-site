import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { LogoMark } from "@/components/ui/logo-mark";
import { footerLinks } from "@/lib/site";
import { getSiteContentData } from "@/lib/site-content";

export async function Footer() {
  const { siteConfig } = await getSiteContentData();

  return (
    <footer className="mt-12 border-t border-white/[0.06] bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="max-w-xl">
          <LogoMark />
          <p className="mt-5 text-base leading-8 text-slate-400">{siteConfig.footerTagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Start a Project</ButtonLink>
            <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">
              Email Us
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Explore</div>
            <div className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <Link
                  className="flex items-center gap-2 text-sm text-slate-400 transition duration-200 hover:text-white"
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
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Contact</div>
            <div className="mt-4 space-y-3">
              <a
                className="flex w-fit items-center gap-3 rounded-xl border border-white/[0.08] bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition duration-200 hover:border-blue-500/20 hover:text-white"
                href={`mailto:${siteConfig.email}`}
              >
                <Mail className="h-4 w-4 text-blue-400" />
                {siteConfig.email}
              </a>
              <a
                className="flex w-fit items-center gap-3 rounded-xl border border-white/[0.08] bg-slate-900/60 px-4 py-3 text-sm text-slate-300 transition duration-200 hover:border-blue-500/20 hover:text-white"
                href={`tel:${siteConfig.phone}`}
              >
                <Phone className="h-4 w-4 text-blue-400" />
                {siteConfig.phone}
              </a>
              <div className="flex w-fit items-center gap-3 rounded-xl border border-white/[0.08] bg-slate-900/60 px-4 py-3 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-blue-400" />
                {siteConfig.address}
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              Premium software systems for teams that want better leverage, cleaner workflows, and stronger growth foundations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
