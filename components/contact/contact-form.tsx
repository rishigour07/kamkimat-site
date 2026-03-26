"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { contactServices, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: ""
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.service) {
    errors.service = "Please choose a service.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Please share a bit more detail so we can help meaningfully.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    const nextErrors = validate(values);
    setTouched({
      name: true,
      email: true,
      company: true,
      service: true,
      message: true
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);

    const subject = encodeURIComponent(`New Kamkimat Inquiry: ${values.service}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "Not provided"}\nService: ${values.service}\n\nMessage:\n${values.message}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
    setIsSuccess(true);
    setValues(initialValues);
    setTouched({});
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
            {contactServices.map((service) => (
              <option className="bg-[#10111a]" key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {touched.service && errors.service ? (
            <p className="mt-2 text-sm text-rose-300">{errors.service}</p>
          ) : null}
        </div>
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
          Submitting opens your email app with the completed inquiry so you can send it instantly.
        </div>
        <button
          className="button-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-glow transition duration-300 hover:translate-y-[-1px] hover:shadow-glow-accent disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Preparing..." : "Send Inquiry"}
        </button>
      </div>

      {isSuccess ? (
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Your inquiry is ready to send to {siteConfig.email}.
        </div>
      ) : null}
    </form>
  );
}

