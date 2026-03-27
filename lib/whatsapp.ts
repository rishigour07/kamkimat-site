import { businessInfo } from "@/lib/constants/business";

export const whatsappFollowUpMessage =
  "Hi, I came from Kamkimat website. I want to discuss my project.";

function normalizeWhatsappNumber(phone: string) {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length === 10) {
    return `91${digitsOnly}`;
  }

  return digitsOnly;
}

export const kamkimatWhatsappNumber = normalizeWhatsappNumber(businessInfo.phone);

export function getKamkimatWhatsappLink(message = whatsappFollowUpMessage) {
  const query = new URLSearchParams({
    text: message
  });

  return `https://wa.me/${kamkimatWhatsappNumber}?${query.toString()}`;
}
