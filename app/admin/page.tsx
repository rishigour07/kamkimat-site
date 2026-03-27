import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { FounderList } from "@/components/admin/founder-list";
import { getAdminSession } from "@/lib/auth";
import { getAllFounders } from "@/lib/founders";
import { SectionShell } from "@/components/ui/section-shell";

export const metadata: Metadata = {
  title: "Admin"
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const founders = await getAllFounders();

  return (
    <SectionShell className="pt-32 sm:pt-36">
      <FounderList initialFounders={founders} sessionEmail={session.email} />
    </SectionShell>
  );
}

