export type FounderPayload = {
  name: string;
  role: string;
  description: string;
  photoData?: string | null;
  isVisible?: boolean;
};

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

const MAX_FOUNDER_PHOTO_BYTES = 2 * 1024 * 1024;
const PHONE_PATTERN = /^[0-9+().\-\s]{7,20}$/;

function getBase64ByteLength(value: string) {
  const normalized = value.replace(/=+$/, "");
  return Math.floor((normalized.length * 3) / 4);
}

export function validateFounderPayload(payload: FounderPayload) {
  const name = payload.name.trim();
  const role = payload.role.trim();
  const description = payload.description.trim();

  if (name.length < 2) {
    return { ok: false as const, message: "Founder name must be at least 2 characters." };
  }

  if (role.length < 2) {
    return { ok: false as const, message: "Founder role must be at least 2 characters." };
  }

  if (description.length < 20) {
    return {
      ok: false as const,
      message: "Founder description must be at least 20 characters."
    };
  }

  const photoData = payload.photoData?.trim() || null;

  if (photoData) {
    if (!photoData.startsWith("data:image/")) {
      return { ok: false as const, message: "Founder photo must be a valid image upload." };
    }

    const [, base64Payload = ""] = photoData.split(",");

    if (!base64Payload) {
      return { ok: false as const, message: "Founder photo is invalid." };
    }

    if (getBase64ByteLength(base64Payload) > MAX_FOUNDER_PHOTO_BYTES) {
      return {
        ok: false as const,
        message: "Founder photo must be 2MB or smaller."
      };
    }
  }

  return {
    ok: true as const,
    data: {
      name,
      role,
      description,
      photoData,
      isVisible: payload.isVisible ?? true
    }
  };
}

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
