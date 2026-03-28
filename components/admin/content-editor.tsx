"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import type { EditableSiteContent } from "@/lib/content";

type ContentEditorProps = {
  initialContent: EditableSiteContent;
};

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ContentEditor({ initialContent }: ContentEditorProps) {
  const [content, setContent] = useState<EditableSiteContent>(initialContent);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!feedback && !error) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
      setError(null);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [error, feedback]);

  const updateHome = (field: keyof EditableSiteContent["home"], value: string | string[]) => {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        [field]: value
      }
    }));
  };

  const updateContact = (field: keyof EditableSiteContent["contact"], value: string) => {
    setContent((current) => ({
      ...current,
      contact: {
        ...current.contact,
        [field]: value
      }
    }));
  };

  const updateAbout = (
    field: keyof EditableSiteContent["about"],
    value: string | string[] | EditableSiteContent["about"]["values"]
  ) => {
    setContent((current) => ({
      ...current,
      about: {
        ...current.about,
        [field]: value
      }
    }));
  };

  const updateServiceField = (
    index: number,
    field: "title" | "description" | "points",
    value: string | string[]
  ) => {
    setContent((current) => ({
      ...current,
      services: {
        ...current.services,
        items: current.services.items.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const updateValueField = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setContent((current) => ({
      ...current,
      about: {
        ...current.about,
        values: current.about.values.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        content?: EditableSiteContent;
      };

      if (!response.ok || !payload.content) {
        setError(payload.error ?? "Unable to save content right now.");
        return;
      }

      setContent(payload.content);
      setFeedback("Content saved successfully.");
    } catch {
      setError("Unable to save content right now.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClassName =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.28] focus:border-accent/40";

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <section className="space-y-4">
        <div className="eyebrow">Contact Details</div>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            className={inputClassName}
            onChange={(event) => updateContact("email", event.target.value)}
            placeholder="Email"
            value={content.contact.email}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateContact("phone", event.target.value)}
            placeholder="Phone"
            value={content.contact.phone}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateContact("address", event.target.value)}
            placeholder="Address"
            value={content.contact.address}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="eyebrow">Homepage Text</div>
        <div className="grid gap-4">
          <input
            className={inputClassName}
            onChange={(event) => updateHome("eyebrow", event.target.value)}
            placeholder="Homepage eyebrow"
            value={content.home.eyebrow}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateHome("headline", event.target.value)}
            placeholder="Homepage headline"
            value={content.home.headline}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateHome("description", event.target.value)}
            placeholder="Homepage description"
            rows={3}
            value={content.home.description}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateHome("highlights", linesToArray(event.target.value))}
            placeholder="Homepage highlights, one per line"
            rows={4}
            value={content.home.highlights.join("\n")}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateHome("footerTagline", event.target.value)}
            placeholder="Footer tagline"
            value={content.home.footerTagline}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateHome("ctaTitle", event.target.value)}
            placeholder="Homepage CTA title"
            value={content.home.ctaTitle}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateHome("ctaDescription", event.target.value)}
            placeholder="Homepage CTA description"
            rows={3}
            value={content.home.ctaDescription}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="eyebrow">About Content</div>
        <div className="grid gap-4">
          <input
            className={inputClassName}
            onChange={(event) => updateAbout("heroTitle", event.target.value)}
            placeholder="About hero title"
            value={content.about.heroTitle}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateAbout("heroDescription", event.target.value)}
            placeholder="About hero description"
            rows={3}
            value={content.about.heroDescription}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateAbout("missionTitle", event.target.value)}
            placeholder="Mission title"
            value={content.about.missionTitle}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateAbout("missionDescription", event.target.value)}
            placeholder="Mission description"
            rows={3}
            value={content.about.missionDescription}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateAbout("visionTitle", event.target.value)}
            placeholder="Vision title"
            value={content.about.visionTitle}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateAbout("visionDescription", event.target.value)}
            placeholder="Vision description"
            rows={3}
            value={content.about.visionDescription}
          />
          <input
            className={inputClassName}
            onChange={(event) => updateAbout("storyTitle", event.target.value)}
            placeholder="Story title"
            value={content.about.storyTitle}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateAbout("storyDescription", event.target.value)}
            placeholder="Story intro"
            rows={3}
            value={content.about.storyDescription}
          />
          <textarea
            className={inputClassName}
            onChange={(event) => updateAbout("storyParagraphs", linesToArray(event.target.value))}
            placeholder="Story paragraphs, one per line"
            rows={6}
            value={content.about.storyParagraphs.join("\n")}
          />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {content.about.values.map((value, index) => (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4" key={`value-${index}`}>
              <div className="text-sm font-semibold text-white">Value {index + 1}</div>
              <div className="mt-4 space-y-3">
                <input
                  className={inputClassName}
                  onChange={(event) => updateValueField(index, "title", event.target.value)}
                  placeholder="Value title"
                  value={value.title}
                />
                <textarea
                  className={inputClassName}
                  onChange={(event) =>
                    updateValueField(index, "description", event.target.value)
                  }
                  placeholder="Value description"
                  rows={3}
                  value={value.description}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="eyebrow">Services</div>
        <input
          className={inputClassName}
          onChange={(event) =>
            setContent((current) => ({
              ...current,
              services: {
                ...current.services,
                pageTitle: event.target.value
              }
            }))
          }
          placeholder="Services page title"
          value={content.services.pageTitle}
        />
        <textarea
          className={inputClassName}
          onChange={(event) =>
            setContent((current) => ({
              ...current,
              services: {
                ...current.services,
                pageDescription: event.target.value
              }
            }))
          }
          placeholder="Services page description"
          rows={3}
          value={content.services.pageDescription}
        />
        <div className="grid gap-4">
          {content.services.items.map((service, index) => (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4" key={`service-${index}`}>
              <div className="text-sm font-semibold text-white">Service {index + 1}</div>
              <div className="mt-4 grid gap-3">
                <input
                  className={inputClassName}
                  onChange={(event) => updateServiceField(index, "title", event.target.value)}
                  placeholder="Service title"
                  value={service.title}
                />
                <textarea
                  className={inputClassName}
                  onChange={(event) =>
                    updateServiceField(index, "description", event.target.value)
                  }
                  placeholder="Service description"
                  rows={3}
                  value={service.description}
                />
                <textarea
                  className={inputClassName}
                  onChange={(event) =>
                    updateServiceField(index, "points", linesToArray(event.target.value))
                  }
                  placeholder="Service points, one per line"
                  rows={4}
                  value={service.points.join("\n")}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {feedback ? (
        <div className="fixed right-6 top-24 z-50 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200 shadow-xl backdrop-blur-xl">
          {feedback}
        </div>
      ) : null}

      {error ? (
        <div className="fixed right-6 top-24 z-50 rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200 shadow-xl backdrop-blur-xl">
          {error}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          className="button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-glow transition duration-300 hover:translate-y-[-1px] hover:shadow-glow-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? "Saving..." : "Save Content"}
        </button>
      </div>
    </form>
  );
}
