import type { Metadata } from "next";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { GlowCard } from "@/components/ui/glow-card";
import { PageHero } from "@/components/ui/page-hero";
import { SectionShell } from "@/components/ui/section-shell";

export const metadata: Metadata = {
  title: "Admin Login"
};

export default function AdminLoginPage() {
  return (
    <>
      <PageHero
        description="Secure admin access for editing homepage, services, about content, and contact details."
        eyebrow="Admin Access"
        title="Sign in to the Kamkimat admin panel"
      />

      <SectionShell className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-xl">
          <GlowCard>
            <AdminLoginForm />
          </GlowCard>
        </div>
      </SectionShell>
    </>
  );
}

