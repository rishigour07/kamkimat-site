const CONTACT_DESTINATION = "contact@kamkimattechnologies.in";
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

export class EmailDeliveryError extends Error {
  status: number;
  exposeMessage: string;

  constructor(exposeMessage: string, status = 500) {
    super(exposeMessage);
    this.name = "EmailDeliveryError";
    this.status = status;
    this.exposeMessage = exposeMessage;
  }
}

function getRequiredEnv(
  name:
    | "EMAILJS_SERVICE_ID"
    | "EMAILJS_TEMPLATE_ID"
    | "EMAILJS_PUBLIC_KEY"
    | "EMAILJS_PRIVATE_KEY"
) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new EmailDeliveryError(`${name} is missing in server environment.`, 500);
  }

  return value;
}

function getEmailJsConfig() {
  return {
    serviceId: getRequiredEnv("EMAILJS_SERVICE_ID"),
    templateId: getRequiredEnv("EMAILJS_TEMPLATE_ID"),
    publicKey: getRequiredEnv("EMAILJS_PUBLIC_KEY"),
    privateKey: getRequiredEnv("EMAILJS_PRIVATE_KEY"),
    toEmail: process.env.EMAILJS_TO_EMAIL?.trim() || CONTACT_DESTINATION
  };
}

async function sendEmailJs(templateId: string, templateParams: Record<string, string>) {
  const config = getEmailJsConfig();

  let response: Response;

  try {
    response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: config.serviceId,
        template_id: templateId,
        user_id: config.publicKey,
        accessToken: config.privateKey,
        template_params: {
          to_email: config.toEmail,
          ...templateParams
        }
      })
    });
  } catch {
    throw new EmailDeliveryError("Could not reach EmailJS service.", 502);
  }

  if (!response.ok) {
    const body = (await response.text()).trim();
    const reason = body ? ` ${body}` : "";
    throw new EmailDeliveryError(`EmailJS rejected the request.${reason}`.slice(0, 500), 502);
  }

}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message: string;
}) {
  const config = getEmailJsConfig();

  await sendEmailJs(config.templateId, {
    name: input.name,
    email: input.email,
    phone: input.phone || "Not provided",
    company: input.company || "Not provided",
    service: input.service,
    message: input.message,
    submitted_at: new Date().toISOString()
  });
}

export async function sendChatbotLeadEmail(input: {
  name: string;
  email: string;
  phone?: string | null;
  projectRequirement: string;
  service: string;
  leadType: string;
  context?: string | null;
}) {
  const config = getEmailJsConfig();
  const chatbotTemplateId =
    process.env.EMAILJS_CHATBOT_TEMPLATE_ID?.trim() || config.templateId;

  await sendEmailJs(chatbotTemplateId, {
    lead_type: input.leadType,
    service: input.service,
    name: input.name,
    email: input.email,
    phone: input.phone || "Not provided",
    project_requirement: input.projectRequirement,
    context: input.context || "Not provided",
    submitted_at: new Date().toISOString()
  });
}
