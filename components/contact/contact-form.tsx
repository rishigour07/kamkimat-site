"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: ""
};

const phonePattern = /^[0-9+().\-\s]{7,20}$/;

type ContactFormProps = {
  contactEmail: string;
  serviceOptions: string[];
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.service) {
    errors.service = "Please choose a service.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Please share a bit more detail so we can help meaningfully.";
  }

  return errors;
}

export function ContactForm({ contactEmail, serviceOptions }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleBlur = (name: keyof FormValues) => {
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const nextErrors = validate(values);
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      service: true,
      message: true
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    void (async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        });

        const payload = (await response.json()) as {
          error?: string;
          ok?: boolean;
        };

        if (!response.ok) {
          setFeedback({
            type: "error",
            message: payload.error ?? "Unable to submit your inquiry right now."
          });
          return;
        }

        setFeedback({
          type: "success",
          message: `Your inquiry has been submitted successfully. We will get back to you at ${values.email}.`
        });
        setValues(initialValues);
        setTouched({});
      } catch {
        setFeedback({
          type: "error",
          message: `Something went wrong while submitting. You can still reach us at ${contactEmail}.`
        });
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const inputClassName = (field: keyof FormValues) =>
    cn(
      "w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.28]",
      touched[field] && errors[field]
        ? "border-rose-400/60 focus:border-rose-300"
        : "border-white/10 focus:border-accent/40"
    );

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="name">
            Name
          </label>
          <input
            className={inputClassName("name")}
            id="name"
            name="name"
            onBlur={() => handleBlur("name")}
            onChange={handleChange}
            placeholder="Your name"
            value={values.name}
          />
          {touched.name && errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="email">
            Email
          </label>
          <input
            className={inputClassName("email")}
            id="email"
            name="email"
            onBlur={() => handleBlur("email")}
            onChange={handleChange}
            placeholder="you@company.com"
            type="email"
            value={values.email}
          />
          {touched.email && errors.email ? (
            <p className="mt-2 text-sm text-rose-300">{errors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="company">
            Company
          </label>
          <input
            className={inputClassName("company")}
            id="company"
            name="company"
            onBlur={() => handleBlur("company")}
            onChange={handleChange}
            placeholder="Company name"
            value={values.company}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="phone">
            Phone
          </label>
          <input
            className={inputClassName("phone")}
            id="phone"
            name="phone"
            onBlur={() => handleBlur("phone")}
            onChange={handleChange}
            placeholder="+91 91112 56684"
            type="tel"
            value={values.phone}
          />
          {touched.phone && errors.phone ? (
            <p className="mt-2 text-sm text-rose-300">{errors.phone}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="service">
          Service
        </label>
        <select
          className={inputClassName("service")}
          id="service"
          name="service"
          onBlur={() => handleBlur("service")}
          onChange={handleChange}
          value={values.service}
        >
          <option className="bg-[#10111a]" value="">
            Select a service
          </option>
          {serviceOptions.map((service) => (
            <option className="bg-[#10111a]" key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {touched.service && errors.service ? (
          <p className="mt-2 text-sm text-rose-300">{errors.service}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-white/75" htmlFor="message">
          Message
        </label>
        <textarea
          className={inputClassName("message")}
          id="message"
          name="message"
          onBlur={() => handleBlur("message")}
          onChange={handleChange}
          placeholder="Tell us what you want to build, automate, or improve."
          rows={6}
          value={values.message}
        />
        {touched.message && errors.message ? (
          <p className="mt-2 text-sm text-rose-300">{errors.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm leading-6 text-white/[0.48]">
          Your inquiry is sent directly to the Kamkimat inbox through secure server-side email delivery.
        </div>
        <button
          className="button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-glow transition duration-300 hover:translate-y-[-1px] hover:shadow-glow-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
      </div>

      {feedback?.type === "success" ? (
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {feedback.message}
        </div>
      ) : null}

      {feedback?.type === "error" ? (
        <div className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {feedback.message}
        </div>
      ) : null}
    </form>
  );
}

