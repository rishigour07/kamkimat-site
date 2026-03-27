"use client";

import { Building2, Mail, MessageCircleMore, Phone, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import type { ContactSubmissionRecord, ContactSubmissionSource } from "@/lib/database";
import { formatLeadTypeLabel, leadTypeBadgeClassName } from "@/lib/lead-scoring";
import { getKamkimatWhatsappLink } from "@/lib/whatsapp";

type SubmissionListProps = {
  initialSubmissions: ContactSubmissionRecord[];
  sessionEmail: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short"
});

function formatSourceLabel(source: ContactSubmissionSource) {
  if (source === "chatbot") {
    return "Chatbot";
  }

  return "Contact Form";
}

function sourceBadgeClassName(source: ContactSubmissionSource) {
  if (source === "chatbot") {
    return "border-accent/20 bg-accent/10 text-accent";
  }

  return "border-white/10 bg-white/[0.03] text-white/[0.55]";
}

export function SubmissionList({
  initialSubmissions,
  sessionEmail
}: SubmissionListProps) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const whatsappLink = getKamkimatWhatsappLink();

  const handleDelete = async (submissionId: string) => {
    const confirmed = window.confirm("Delete this lead submission? This cannot be undone.");

    if (!confirmed) {
      return;
    }

    setError(null);

    const response = await fetch(`/api/admin/submissions/${submissionId}`, {
      method: "DELETE"
    });

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "Unable to delete submission.");
      return;
    }

    setSubmissions((current) => current.filter((item) => item.id !== submissionId));
    startTransition(() => router.refresh());
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        activeView="submissions"
        description="Review new inquiries, confirm contact details, and keep the pipeline clean."
        sessionEmail={sessionEmail}
        title="Lead Inbox"
      />

      {error ? (
        <div className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      {submissions.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.03] p-10 text-center text-white/[0.55]">
          No submissions yet. New contact form and chatbot leads will appear here as soon as they are saved.
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:hidden">
            {submissions.map((submission) => (
              <div
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl"
                key={submission.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{submission.name}</h2>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${leadTypeBadgeClassName(
                          submission.leadType
                        )}`}
                      >
                        {formatLeadTypeLabel(submission.leadType)}
                      </span>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${sourceBadgeClassName(
                          submission.source
                        )}`}
                      >
                        {formatSourceLabel(submission.source)}
                      </span>
                      <p className="text-xs uppercase tracking-[0.18em] text-white/[0.4]">
                        {dateFormatter.format(new Date(submission.createdAt))}
                      </p>
                    </div>
                  </div>
                  <button
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm font-semibold text-rose-200 transition duration-300 hover:bg-rose-400/15 disabled:opacity-60"
                    disabled={isPending}
                    onClick={() => handleDelete(submission.id)}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 space-y-3 text-sm text-white/[0.68]">
                  <a className="flex items-center gap-3 hover:text-white" href={`mailto:${submission.email}`}>
                    <Mail className="h-4 w-4 text-accent" />
                    {submission.email}
                  </a>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-accent" />
                    {submission.phone || "Not provided"}
                  </div>
                  {submission.company ? (
                    <div className="flex items-center gap-3">
                      <Building2 className="h-4 w-4 text-accent" />
                      {submission.company}
                    </div>
                  ) : null}
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap gap-2">
                    <div className="text-xs uppercase tracking-[0.18em] text-accent">
                      {submission.service}
                    </div>
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.16em] text-white/[0.42]">
                    Lead score: {formatLeadTypeLabel(submission.leadType)}
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/[0.68]">
                    {submission.message}
                  </p>
                  {submission.leadType === "hot" ? (
                    <a
                      className="mt-4 inline-flex items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition duration-300 hover:bg-emerald-400/15"
                      href={whatsappLink}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <MessageCircleMore className="mr-2 h-4 w-4" />
                      WhatsApp Follow-up
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-glow backdrop-blur-xl lg:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/[0.02]">
                  <tr className="text-left text-xs uppercase tracking-[0.18em] text-white/[0.4]">
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Phone</th>
                    <th className="px-6 py-4 font-medium">Lead Type</th>
                    <th className="px-6 py-4 font-medium">Source</th>
                    <th className="px-6 py-4 font-medium">Message</th>
                    <th className="px-6 py-4 font-medium">Created</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {submissions.map((submission) => (
                    <tr className="align-top" key={submission.id}>
                      <td className="px-6 py-5">
                        <div className="text-sm font-semibold text-white">{submission.name}</div>
                        {submission.company ? (
                          <div className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/[0.55]">
                            {submission.company}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-6 py-5 text-sm text-white/[0.72]">
                        <a className="transition duration-300 hover:text-white" href={`mailto:${submission.email}`}>
                          {submission.email}
                        </a>
                      </td>
                      <td className="px-6 py-5 text-sm text-white/[0.72]">
                        {submission.phone ? (
                          <a className="transition duration-300 hover:text-white" href={`tel:${submission.phone}`}>
                            {submission.phone}
                          </a>
                        ) : (
                          <span className="text-white/[0.36]">Not provided</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${leadTypeBadgeClassName(
                            submission.leadType
                          )}`}
                        >
                          {formatLeadTypeLabel(submission.leadType)}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${sourceBadgeClassName(
                            submission.source
                          )}`}
                        >
                          {formatSourceLabel(submission.source)}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="max-w-xl">
                          <div className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-accent">
                            {submission.service}
                          </div>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/[0.72]">
                            {submission.message}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-white/[0.58]">
                        {dateFormatter.format(new Date(submission.createdAt))}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {submission.leadType === "hot" ? (
                            <a
                              className="inline-flex items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition duration-300 hover:bg-emerald-400/15"
                              href={whatsappLink}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <MessageCircleMore className="mr-2 h-4 w-4" />
                              WhatsApp
                            </a>
                          ) : null}
                          <button
                            className="inline-flex items-center justify-center rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-200 transition duration-300 hover:bg-rose-400/15 disabled:opacity-60"
                            disabled={isPending}
                            onClick={() => handleDelete(submission.id)}
                            type="button"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
