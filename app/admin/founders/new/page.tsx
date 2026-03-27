import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FounderForm } from "@/components/admin/founder-form";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionShell } from "@/components/ui/section-shell";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Add Founder"
};

export const dynamic = "force-dynamic";

export default async function NewFounderPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <SectionShell className="pt-32 sm:pt-36 pb-24 sm:pb-28">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link className="text-sm text-accent transition duration-300 hover:text-white" href="/admin">
            Back to admin
          </Link>
          <h1 className="mt-4 text-4xl font-semibold text-white">Add Founder</h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-white/[0.62]">
            Create a founder profile that can be shown dynamically on the public About page.
          </p>
        </div>
        <GlowCard>
          <FounderForm mode="create" />
        </GlowCard>
      </div>
    </SectionShell>
  );
}

