"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type AdminHeaderProps = {
  sessionEmail: string;
  title: string;
  description: string;
};

export function AdminHeader({ sessionEmail, title, description }: AdminHeaderProps) {
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

        <button
          className="button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
          onClick={handleLogout}
          type="button"
        >
          {isPending ? "Signing out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
