"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type FounderFormValues = {
  name: string;
  role: string;
  description: string;
  photoData: string;
  isVisible: boolean;
};

type FounderFormProps = {
  founderId?: string;
  initialValues?: FounderFormValues;
  mode: "create" | "edit";
};

const defaultValues: FounderFormValues = {
  name: "",
  role: "",
  description: "",
  photoData: "",
  isVisible: true
};

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read image file."));
    };

    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
}

export function FounderForm({
  founderId,
  initialValues = defaultValues,
  mode
}: FounderFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<FounderFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    setValues((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value
    }));
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Founder photo must be 2MB or smaller.");
      return;
    }

    setError(null);

    try {
      const photoData = await readFileAsDataUrl(file);
      setValues((current) => ({
        ...current,
        photoData
      }));
    } catch (imageError) {
      setError(
        imageError instanceof Error ? imageError.message : "Unable to upload founder photo."
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const endpoint = mode === "create" ? "/api/admin/founders" : `/api/admin/founders/${founderId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "Unable to save founder.");
      return;
    }

    startTransition(() => {
      router.push("/admin");
      router.refresh();
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="founder-name">
            Founder name
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.28] focus:border-accent/40"
            id="founder-name"
            name="name"
            onChange={handleChange}
            placeholder="Founder name"
            value={values.name}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="founder-role">
            Founder role
          </label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.28] focus:border-accent/40"
            id="founder-role"
            name="role"
            onChange={handleChange}
            placeholder="Founder role"
            value={values.role}
          />
        </div>
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-white/75"
          htmlFor="founder-description"
        >
          Founder description
        </label>
        <textarea
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.28] focus:border-accent/40"
          id="founder-description"
          name="description"
          onChange={handleChange}
          placeholder="Share the founder bio and what they lead."
          rows={6}
          value={values.description}
        />
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <div className="text-base font-semibold text-white">Founder photo</div>
            <p className="text-sm leading-6 text-white/[0.62]">
              Upload a JPG, PNG, or WebP image up to 2MB.
            </p>
            <input
              accept="image/*"
              className="block text-sm text-white/75 file:mr-4 file:rounded-full file:border-0 file:bg-white/[0.08] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-white/[0.12]"
              onChange={handleImageChange}
              type="file"
            />
            {values.photoData ? (
              <button
                className="rounded-full border border-white/10 bg-transparent px-4 py-2 text-sm text-white/75 transition duration-300 hover:border-white/20 hover:text-white"
                onClick={() =>
                  setValues((current) => ({
                    ...current,
                    photoData: ""
                  }))
                }
                type="button"
              >
                Remove photo
              </button>
            ) : null}
          </div>

          {values.photoData ? (
            <img
              alt={values.name || "Founder preview"}
              className="h-32 w-32 rounded-3xl border border-white/10 object-cover"
              src={values.photoData}
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03] text-sm text-white/[0.45]">
              No photo
            </div>
          )}
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/75">
        <input
          checked={values.isVisible}
          className="h-4 w-4 rounded border-white/10 bg-transparent text-accent focus:ring-accent/30"
          name="isVisible"
          onChange={handleChange}
          type="checkbox"
        />
        Show this founder on the public site
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        <button
          className="button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-glow transition duration-300 hover:translate-y-[-1px] hover:shadow-glow-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Saving..." : mode === "create" ? "Create Founder" : "Save Changes"}
        </button>
        <button
          className="button-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
          onClick={() => router.push("/admin")}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

