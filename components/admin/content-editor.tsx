"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import type { EditableFounderItem, EditableSiteContent } from "@/lib/content";

type ContentEditorProps = {
  initialContent: EditableSiteContent;
};

function linesToArray(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createFounderDraft(): EditableFounderItem {
  return {
    id:
      typeof globalThis.crypto?.randomUUID === "function"
        ? globalThis.crypto.randomUUID()
        : `founder-${Date.now()}`,
    name: "",
    role: "",
    description: "",
    photoData: null,
    isVisible: true
  };
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

  const updateFounderField = (
    index: number,
    field: keyof EditableFounderItem,
    value: string | boolean | null
  ) => {
    setContent((current) => ({
      ...current,
      founders: current.founders.map((founder, founderIndex) =>
        founderIndex === index ? { ...founder, [field]: value } : founder
      )
    }));
  };

  const addFounder = () => {
    setContent((current) => ({
      ...current,
      founders: [...current.founders, createFounderDraft()]
    }));
  };

  const removeFounder = (index: number) => {
    setContent((current) => ({
      ...current,
      founders: current.founders.filter((_, founderIndex) => founderIndex !== index)
    }));
  };

  const handleFounderPhotoChange = (index: number, file: File | null) => {
    if (!file) {
      updateFounderField(index, "photoData", null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateFounderField(index, "photoData", typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
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
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-primary";

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
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={`value-${index}`}>
              <div className="text-sm font-semibold text-slate-800">Value {index + 1}</div>
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
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={`service-${index}`}>
              <div className="text-sm font-semibold text-slate-800">Service {index + 1}</div>
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

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="eyebrow">Founders</div>
          <button
            className="button-secondary inline-flex items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold"
            onClick={addFounder}
            type="button"
          >
            Add Founder
          </button>
        </div>

        {content.founders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm text-slate-500">
            No founders added yet. Click `Add Founder` to show the founder section on the About page.
          </div>
        ) : (
          <div className="grid gap-4">
            {content.founders.map((founder, index) => (
              <div
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                key={founder.id}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="text-sm font-semibold text-slate-800">Founder {index + 1}</div>
                    <input
                      className={inputClassName}
                      onChange={(event) => updateFounderField(index, "name", event.target.value)}
                      placeholder="Founder name"
                      value={founder.name}
                    />
                    <input
                      className={inputClassName}
                      onChange={(event) => updateFounderField(index, "role", event.target.value)}
                      placeholder="Founder role"
                      value={founder.role}
                    />
                    <textarea
                      className={inputClassName}
                      onChange={(event) =>
                        updateFounderField(index, "description", event.target.value)
                      }
                      placeholder="Founder description"
                      rows={4}
                      value={founder.description}
                    />
                    <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
                      <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                        <input
                          checked={founder.isVisible}
                          className="h-4 w-4 rounded border-slate-300 bg-white"
                          onChange={(event) =>
                            updateFounderField(index, "isVisible", event.target.checked)
                          }
                          type="checkbox"
                        />
                        Visible on About page
                      </label>
                      <input
                        accept="image/*"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                        onChange={(event) =>
                          handleFounderPhotoChange(index, event.target.files?.[0] ?? null)
                        }
                        type="file"
                      />
                    </div>
                  </div>

                  <div className="lg:w-40">
                    {founder.photoData ? (
                      <img
                        alt={founder.name || `Founder ${index + 1}`}
                        className="h-32 w-32 rounded-3xl border border-slate-200 object-cover"
                        src={founder.photoData}
                      />
                    ) : (
                      <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500">
                        No photo
                      </div>
                    )}

                    <button
                      className="mt-4 inline-flex items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition duration-200 hover:bg-rose-100"
                      onClick={() => removeFounder(index)}
                      type="button"
                    >
                      Remove Founder
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {feedback ? (
        <div className="fixed right-6 top-24 z-50 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-lg">
          {feedback}
        </div>
      ) : null}

      {error ? (
        <div className="fixed right-6 top-24 z-50 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-lg">
          {error}
        </div>
      ) : null}

      <div className="flex justify-end">
        <button
          className="button-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 hover:bg-[#1f6fd6] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? "Saving..." : "Save Content"}
        </button>
      </div>
    </form>
  );
}
