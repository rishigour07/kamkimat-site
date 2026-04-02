"use client";

import type { FormEvent } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "Unable to sign in.");
      return;
    }

    startTransition(() => {
      router.push("/admin");
      router.refresh();
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="admin-username">
          Admin username
        </label>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-primary"
          id="admin-username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="kamkimat-admin"
          value={username}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="admin-password">
          Password
        </label>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-primary"
          id="admin-password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          type="password"
          value={password}
        />
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        className="button-primary inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 hover:bg-[#1f6fd6] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
