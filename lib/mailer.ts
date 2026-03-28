import nodemailer from "nodemailer";

const CONTACT_DESTINATION = "kamkimat67@gmail.com";

function getRequiredEnv(name: "SMTP_USER" | "SMTP_PASS") {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT?.trim() || 465),
    secure: (process.env.SMTP_SECURE?.trim() || "true").toLowerCase() !== "false",
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS")
    }
  });
}

function getFromAddress() {
  return process.env.SMTP_FROM?.trim() || getRequiredEnv("SMTP_USER");
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service: string;
  message: string;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: getFromAddress(),
    to: CONTACT_DESTINATION,
    replyTo: input.email,
    subject: `Kamkimat Website Inquiry: ${input.service}`,
    text: [
      "New contact form submission from Kamkimat website.",
      "",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || "Not provided"}`,
      `Company: ${input.company || "Not provided"}`,
      `Service: ${input.service}`,
      "",
      "Message:",
      input.message
    ].join("\n"),
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Phone:</strong> ${input.phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${input.company || "Not provided"}</p>
      <p><strong>Service:</strong> ${input.service}</p>
      <p><strong>Message:</strong></p>
      <p>${input.message.replace(/\n/g, "<br />")}</p>
    `
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
  const transporter = getTransporter();

  await transporter.sendMail({
    from: getFromAddress(),
    to: CONTACT_DESTINATION,
    replyTo: input.email,
    subject: `Kamkimat Chatbot Lead: ${input.leadType.toUpperCase()} - ${input.service}`,
    text: [
      "New chatbot lead from Kamkimat website.",
      "",
      `Lead type: ${input.leadType}`,
      `Service: ${input.service}`,
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || "Not provided"}`,
      "",
      "Project requirement:",
      input.projectRequirement,
      "",
      "Conversation context:",
      input.context || "Not provided"
    ].join("\n"),
    html: `
      <h2>New chatbot lead</h2>
      <p><strong>Lead type:</strong> ${input.leadType}</p>
      <p><strong>Service:</strong> ${input.service}</p>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Phone:</strong> ${input.phone || "Not provided"}</p>
      <p><strong>Project requirement:</strong></p>
      <p>${input.projectRequirement.replace(/\n/g, "<br />")}</p>
      <p><strong>Conversation context:</strong></p>
      <p>${(input.context || "Not provided").replace(/\n/g, "<br />")}</p>
    `
  });
}
