import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SubmissionList } from "@/components/admin/submission-list";
import { SectionShell } from "@/components/ui/section-shell";
import { getAdminSession } from "@/lib/auth";
import { getAllContactSubmissions } from "@/lib/database";

export const metadata: Metadata = {
  title: "Admin Leads"
};

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const submissions = await getAllContactSubmissions();

  return (
    <SectionShell className="pt-32 sm:pt-36">
      <SubmissionList initialSubmissions={submissions} sessionEmail={session.email} />
    </SectionShell>
  );
}
