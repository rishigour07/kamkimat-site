export type ChatbotUiMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export const BOT_REPLIES = {
  welcome:
    "Hi, I'm Kamkimat AI Assistant. I can help you explore custom SaaS, AI automation, chatbots, and software strategy for your business.",
  saas:
    "Kamkimat builds premium SaaS products, web applications, and business websites with modern UX, scalable architecture, and growth-ready foundations. If you already have a product idea, I can help point you toward the right next step.",
  aiAutomation:
    "Kamkimat helps teams automate operations with AI workflows, chatbots, internal assistants, and smart integrations. The focus is simple: reduce manual work, move faster, and create systems that scale cleanly.",
  pricing:
    "Pricing depends on the scope, integrations, and delivery complexity. The best next step is a focused consultation so Kamkimat can recommend the right solution and outline a clear project path.",
  fallback:
    "Kamkimat works with startups, founders, SMEs, and agencies on custom SaaS, AI automation, AI chatbots, workflow integration, and software consulting. Tell me what you want to build and I will guide you.",
  followUp:
    "This sounds like a strong fit for Kamkimat. Share a few project details and the team can recommend the right solution, scope, and next move."
} as const;

export const chatbotWelcomeMessage = BOT_REPLIES.welcome;

export const chatbotQuickActions = [
  {
    label: "Build SaaS",
    message: "Build a SaaS product for my company"
  },
  {
    label: "AI Automation",
    message: "I need AI automation for my business"
  },
  {
    label: "Pricing",
    message: "What does a Kamkimat project cost?"
  },
  {
    label: "Talk to Expert",
    message: "I want to contact Kamkimat and talk to an expert"
  }
] as const;

function matchesKeyword(message: string, keywords: readonly string[]) {
  return keywords.some((keyword) =>
    new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(message)
  );
}

export function getRuleBasedReply(message: string, messageCount: number) {
  const normalizedMessage = message.toLowerCase();

  if (matchesKeyword(normalizedMessage, ["saas", "app", "website"])) {
    return BOT_REPLIES.saas;
  }

  if (matchesKeyword(normalizedMessage, ["ai", "automation", "chatbot"])) {
    return BOT_REPLIES.aiAutomation;
  }

  if (matchesKeyword(normalizedMessage, ["price", "cost"])) {
    return BOT_REPLIES.pricing;
  }

  if (messageCount >= 2) {
    return BOT_REPLIES.followUp;
  }

  return BOT_REPLIES.fallback;
}

export function shouldTriggerLeadForm(message: string, messageCount: number) {
  const normalizedMessage = message.toLowerCase();

  return (
    messageCount >= 2 ||
    matchesKeyword(normalizedMessage, ["price", "cost", "pricing", "contact", "call", "expert"])
  );
}

const kamkimatServiceContext = [
  "Custom SaaS Development: product-grade SaaS platforms, admin dashboards, scalable foundations, multi-tenant products.",
  "AI Automation: automate repetitive work, lead routing, ops automations, internal AI assistants.",
  "AI Chatbots: branded website assistants, sales qualification bots, support deflection.",
  "Web App Development: premium customer portals, internal tools, modern frontend systems.",
  "Workflow Integration: CRM integrations, API orchestration, cross-tool syncing, operational handoffs.",
  "Software Consulting: technical roadmaps, product scoping, AI strategy, architecture guidance."
].join("\n");

export function getChatbotSystemPrompt() {
  return `You are Kamkimat AI Assistant, the premium sales and discovery assistant for Kamkimat, an AI software services company.

Goals:
- Help visitors understand Kamkimat's AI and SaaS services.
- Keep replies concise, clear, smart, and business-focused.
- Guide serious prospects toward starting a project conversation.
- When the visitor shows purchase or project intent, politely invite them to share their name, email, optional phone, and project requirement so the team can follow up.

Rules:
- Never claim a capability Kamkimat does not offer.
- Do not invent exact pricing, timelines, or guarantees. Give directional guidance instead.
- Prefer 2-4 short paragraphs or a tight bullet list when it helps.
- Sound premium, confident, and consultative.
- If the question is vague, ask one focused follow-up question.

Kamkimat service context:
${kamkimatServiceContext}`;
}

export function isOpenAIEnabled() {
  return process.env.USE_OPENAI?.trim().toLowerCase() === "true";
}

export function inferLeadService(text: string) {
  const normalized = text.toLowerCase();

  if (
    normalized.includes("workflow") ||
    normalized.includes("integration") ||
    normalized.includes("crm") ||
    normalized.includes("api")
  ) {
    return "Workflow Integration";
  }

  if (
    normalized.includes("chatbot") ||
    normalized.includes("assistant") ||
    normalized.includes("support bot")
  ) {
    return "AI Chatbots";
  }

  if (
    normalized.includes("automation") ||
    normalized.includes("automate") ||
    normalized.includes("agent") ||
    normalized.includes("ops")
  ) {
    return "AI Automation";
  }

  if (
    normalized.includes("saas") ||
    normalized.includes("platform") ||
    normalized.includes("product")
  ) {
    return "Custom SaaS Development";
  }

  if (
    normalized.includes("web app") ||
    normalized.includes("dashboard") ||
    normalized.includes("portal") ||
    normalized.includes("frontend")
  ) {
    return "Web App Development";
  }

  return "Software Consulting";
}
