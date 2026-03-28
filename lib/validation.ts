export type ContactPayload = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message: string;
};

export type ChatbotLeadPayload = {
  name: string;
  email: string;
  phone?: string | null;
  projectRequirement: string;
  context?: string | null;
  userMessageCount?: number | null;
};

const PHONE_PATTERN = /^[0-9+().\-\s]{7,20}$/;

export function validateContactPayload(payload: ContactPayload) {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const phone = payload.phone?.trim() || null;
  const company = payload.company?.trim() || null;
  const service = payload.service.trim();
  const message = payload.message.trim();

  if (name.length < 2) {
    return { ok: false as const, message: "Please enter your name." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, message: "Please enter a valid email address." };
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    return { ok: false as const, message: "Please enter a valid phone number." };
  }

  if (service.length < 2) {
    return { ok: false as const, message: "Please choose a service." };
  }

  if (message.length < 20) {
    return {
      ok: false as const,
      message: "Please share a bit more detail so we can help meaningfully."
    };
  }

  return {
    ok: true as const,
    data: {
      name,
      email,
      phone,
      company,
      service,
      message
    }
  };
}

export function validateChatbotLeadPayload(payload: ChatbotLeadPayload) {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const phone = payload.phone?.trim() || null;
  const projectRequirement = payload.projectRequirement.trim();
  const context = payload.context?.trim() || null;
  const userMessageCount =
    typeof payload.userMessageCount === "number" && Number.isFinite(payload.userMessageCount)
      ? Math.max(0, Math.floor(payload.userMessageCount))
      : null;

  if (name.length < 2) {
    return { ok: false as const, message: "Please enter your name." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, message: "Please enter a valid email address." };
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    return { ok: false as const, message: "Please enter a valid phone number." };
  }

  if (projectRequirement.length < 20) {
    return {
      ok: false as const,
      message: "Please share a bit more about the project requirement."
    };
  }

  return {
    ok: true as const,
    data: {
      name,
      email,
      phone,
      projectRequirement,
      context,
      userMessageCount
    }
  };
}
