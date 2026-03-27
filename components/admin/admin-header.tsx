"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  activeView: "founders" | "submissions";
  sessionEmail: string;
  title: string;
  description: string;
  primaryAction?: {
    href: string;
    label: string;
  };
};

const adminViews = [
  { href: "/admin", label: "Founders", value: "founders" },
  { href: "/admin/submissions", label: "Leads", value: "submissions" }
] as const;

export function AdminHeader({
  activeView,
  sessionEmail,
  title,
  description,
  primaryAction
}: AdminHeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST"
    });

    startTransition(() => {
      router.push("/admin/login");
      router.refresh();
    });
  };

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="eyebrow">Admin</div>
          <h1 className="mt-4 text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/[0.62]">
            Signed in as {sessionEmail}. {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {adminViews.map((view) => (
              <Link
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                  activeView === view.value
                    ? "bg-white text-background shadow-lg shadow-white/10"
                    : "text-white/[0.62] hover:text-white"
                )}
                href={view.href}
                key={view.value}
              >
                {view.label}
              </Link>
            ))}
          </div>

          {primaryAction ? (
            <Link
              className="button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-glow transition duration-300 hover:translate-y-[-1px] hover:shadow-glow-accent"
              href={primaryAction.href}
            >
              {primaryAction.label}
            </Link>
          ) : null}

          <button
            className="button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
            onClick={handleLogout}
            type="button"
          >
            {isPending ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
