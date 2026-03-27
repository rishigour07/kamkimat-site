import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { FounderForm } from "@/components/admin/founder-form";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionShell } from "@/components/ui/section-shell";
import { getAdminSession } from "@/lib/auth";
import { getFounderById } from "@/lib/founders";

export const metadata: Metadata = {
  title: "Edit Founder"
};

export const dynamic = "force-dynamic";

type EditFounderPageProps = {
  params: {
    id: string;
  };
};

export default async function EditFounderPage({ params }: EditFounderPageProps) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  const founder = await getFounderById(params.id);

  if (!founder) {
    notFound();
  }

  return (
    <SectionShell className="pt-32 sm:pt-36 pb-24 sm:pb-28">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link className="text-sm text-accent transition duration-300 hover:text-white" href="/admin">
            Back to admin
          </Link>
          <h1 className="mt-4 text-4xl font-semibold text-white">Edit Founder</h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-white/[0.62]">
            Update founder details, photo, and public visibility without touching code.
          </p>
        </div>
        <GlowCard>
          <FounderForm
            founderId={founder.id}
            initialValues={{
              name: founder.name,
              role: founder.role,
              description: founder.description,
              photoData: founder.photoData ?? "",
              isVisible: founder.isVisible
            }}
            mode="edit"
          />
        </GlowCard>
      </div>
    </SectionShell>
  );
}
