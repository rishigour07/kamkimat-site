"use client";

import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import type { FounderRecord } from "@/lib/database";

type FounderListProps = {
  initialFounders: FounderRecord[];
  sessionEmail: string;
};

export function FounderList({ initialFounders, sessionEmail }: FounderListProps) {
  const router = useRouter();
  const [founders, setFounders] = useState(initialFounders);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleToggleVisibility = async (founder: FounderRecord) => {
    setError(null);

    const response = await fetch(`/api/admin/founders/${founder.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: founder.name,
        role: founder.role,
        description: founder.description,
        photoData: founder.photoData,
        isVisible: !founder.isVisible
      })
    });

    const payload = (await response.json()) as {
      error?: string;
      founder?: FounderRecord;
    };

    if (!response.ok || !payload.founder) {
      setError(payload.error ?? "Unable to update founder visibility.");
      return;
    }

    setFounders((current) =>
      current.map((item) => (item.id === founder.id ? payload.founder! : item))
    );
    startTransition(() => router.refresh());
  };

  const handleDelete = async (founderId: string) => {
    const confirmed = window.confirm("Delete this founder? This cannot be undone.");

    if (!confirmed) {
      return;
    }

    setError(null);

    const response = await fetch(`/api/admin/founders/${founderId}`, {
      method: "DELETE"
    });

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "Unable to delete founder.");
      return;
    }

    setFounders((current) => current.filter((item) => item.id !== founderId));
    startTransition(() => router.refresh());
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        activeView="founders"
        description="Create, edit, hide, or delete founders without touching code."
        primaryAction={{ href: "/admin/founders/new", label: "Add Founder" }}
        sessionEmail={sessionEmail}
        title="Founder Management"
      />

      {error ? (
        <div className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      {founders.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-white/[0.55]">
          No founders added yet. Create your first founder to power the public About page.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {founders.map((founder) => (
            <div
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-glow backdrop-blur-xl"
              key={founder.id}
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                {founder.photoData ? (
                  <img
                    alt={founder.name}
                    className="h-28 w-28 rounded-3xl border border-white/10 object-cover"
                    src={founder.photoData}
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03] text-sm text-white/[0.45]">
                    No photo
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-semibold text-white">{founder.name}</h2>
                      <p className="mt-1 text-sm text-accent">{founder.role}</p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] ${
                        founder.isVisible
                          ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                          : "border-white/10 bg-white/[0.04] text-white/[0.52]"
                      }`}
                    >
                      {founder.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/[0.62]">{founder.description}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  className="button-secondary inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold"
                  href={`/admin/founders/${founder.id}/edit`}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
                <button
                  className="button-secondary inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold"
                  onClick={() => handleToggleVisibility(founder)}
                  type="button"
                >
                  {founder.isVisible ? (
                    <EyeOff className="mr-2 h-4 w-4" />
                  ) : (
                    <Eye className="mr-2 h-4 w-4" />
                  )}
                  {founder.isVisible ? "Hide" : "Show"}
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition duration-300 hover:bg-rose-400/15"
                  onClick={() => handleDelete(founder.id)}
                  type="button"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
