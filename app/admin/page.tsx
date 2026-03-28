import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { ContentEditor } from "@/components/admin/content-editor";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionShell } from "@/components/ui/section-shell";
import { getAdminSession } from "@/lib/auth";
import { getEditableSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Admin"
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const content = await getEditableSiteContent();

  return (
    <SectionShell className="pt-32 sm:pt-36 pb-24 sm:pb-28">
      <div className="space-y-8">
        <AdminHeader
          description="Edit the main website copy and contact details from a single JSON-backed dashboard."
          sessionEmail={session.email}
          title="Website content"
        />

        <GlowCard>
          <ContentEditor initialContent={content} />
        </GlowCard>
      </div>
    </SectionShell>
  );
}
