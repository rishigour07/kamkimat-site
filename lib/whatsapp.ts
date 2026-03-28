export const whatsappFollowUpMessage =
  "Hi, I came from Kamkimat website. I want to discuss my project.";

function normalizeWhatsappNumber(phone: string) {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length === 10) {
    return `91${digitsOnly}`;
  }

  return digitsOnly;
}

export function getKamkimatWhatsappLink(
  message = whatsappFollowUpMessage,
  phone = "9111256684"
) {
  const query = new URLSearchParams({
    text: message
  });

  return `https://wa.me/${normalizeWhatsappNumber(phone)}?${query.toString()}`;
}
