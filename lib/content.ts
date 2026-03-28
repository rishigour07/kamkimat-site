import { readFile } from "node:fs/promises";
import path from "node:path";

import { unstable_noStore as noStore } from "next/cache";

import { getContentFromGitHub } from "@/lib/github-content";

export type EditableServiceItem = {
  title: string;
  description: string;
  points: string[];
};

export type EditableValueItem = {
  title: string;
  description: string;
};

export type EditableSiteContent = {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  home: {
    eyebrow: string;
    headline: string;
    description: string;
    footerTagline: string;
    highlights: string[];
    ctaTitle: string;
    ctaDescription: string;
  };
  about: {
    heroTitle: string;
    heroDescription: string;
    missionTitle: string;
    missionDescription: string;
    visionTitle: string;
    visionDescription: string;
    storyTitle: string;
    storyDescription: string;
    storyParagraphs: string[];
    values: EditableValueItem[];
  };
  services: {
    pageTitle: string;
    pageDescription: string;
    items: EditableServiceItem[];
  };
};

const DEFAULT_VALUES: EditableValueItem[] = [
  {
    title: "Clarity over noise",
    description:
      "We cut through AI hype and focus on systems that solve real operational and growth problems."
  },
  {
    title: "Speed with rigor",
    description:
      "Fast delivery matters, but not at the expense of architecture, UX quality, or future maintainability."
  },
  {
    title: "Automation with intent",
    description:
      "We automate the work that slows teams down and design around the decisions that still need humans."
  },
  {
    title: "Partnership mindset",
    description:
      "We work best as a high-context partner that helps teams make better product and technology decisions."
  }
];

const DEFAULT_SERVICES: EditableServiceItem[] = [
  {
    title: "Custom SaaS Development",
    description:
      "Launch product-grade SaaS platforms with secure architecture, premium UX, and scalable foundations.",
    points: ["Multi-tenant platforms", "Admin dashboards", "Billing-ready product flows"]
  },
  {
    title: "AI Automation",
    description:
      "Replace repetitive manual work with AI-driven automations that reduce friction across your business.",
    points: ["Lead routing", "Ops automations", "Internal AI assistants"]
  },
  {
    title: "AI Chatbots",
    description:
      "Deploy branded AI chatbots for support, qualification, onboarding, and knowledge access.",
    points: ["Website assistants", "Sales qualification", "Support deflection"]
  },
  {
    title: "Web App Development",
    description:
      "Build fast, conversion-focused web applications that feel premium and stay maintainable.",
    points: ["Customer portals", "Internal tools", "Modern frontend systems"]
  },
  {
    title: "Workflow Integration",
    description:
      "Connect the tools your team already uses so data, decisions, and tasks flow without manual handoffs.",
    points: ["CRM integration", "API orchestration", "Cross-tool syncing"]
  },
  {
    title: "Software Consulting",
    description:
      "Get strategic clarity on what to build, how to prioritize it, and how to make AI create actual business value.",
    points: ["Technical roadmaps", "Product scoping", "Architecture guidance"]
  }
];

export const DEFAULT_CONTENT: EditableSiteContent = {
  contact: {
    email: "kamkimat67@gmail.com",
    phone: "9111256684",
    address: "78 Vijay Nagar, Indore"
  },
  home: {
    eyebrow: "Premium AI Systems For Modern Teams",
    headline: "We Build AI Systems That Scale Your Business",
    description:
      "From custom SaaS to AI automation, Kamkimat helps you move faster, reduce costs, and grow smarter.",
    footerTagline: "Building the future with AI-powered software",
    highlights: [
      "Premium SaaS product builds",
      "AI automation and chatbot strategy",
      "Workflow integration and consulting"
    ],
    ctaTitle: "Build a sharper system for growth, automation, and product execution",
    ctaDescription:
      "If your business needs software that looks premium, works hard, and scales with confidence, let's map the next move."
  },
  about: {
    heroTitle: "A premium software partner for businesses that want systems, not noise",
    heroDescription:
      "Kamkimat exists to turn AI and software into practical leverage for ambitious teams. We combine product thinking, premium design, and sharp execution to build systems that create real operating value.",
    missionTitle: "Build software that creates leverage",
    missionDescription:
      "Our mission is to help businesses move faster and operate smarter with high-value software systems, premium interfaces, and AI workflows that create measurable momentum.",
    visionTitle: "Make advanced technology feel usable and powerful",
    visionDescription:
      "We believe the future belongs to businesses that combine strong product foundations with intelligent automation, clean workflows, and digital experiences customers trust.",
    storyTitle: "Kamkimat was built to bridge strategy, product quality, and AI execution",
    storyDescription:
      "Too many teams get forced to choose between smart consulting, clean design, and solid engineering. Kamkimat brings those disciplines together so businesses can build faster with more confidence.",
    storyParagraphs: [
      "We started from a simple idea: AI and software should do more than look modern. They should reduce friction, improve decisions, and create systems that support real growth.",
      "That means approaching every project through a product lens, caring deeply about interface quality, and designing workflow logic that actually fits the team using it.",
      "Whether we're building custom SaaS, AI automations, web applications, or strategic roadmaps, the goal stays the same: create premium software that compounds value over time."
    ],
    values: DEFAULT_VALUES
  },
  services: {
    pageTitle: "Services designed to turn AI and software into real operating leverage",
    pageDescription:
      "Kamkimat helps founders, SMEs, and agencies build software systems that look premium, automate intelligently, and stay aligned with business growth.",
    items: DEFAULT_SERVICES
  }
};

export const LOCAL_CONTENT_FILE_PATH = path.join(process.cwd(), "data", "content.json");

function normalizeString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const normalized = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  return normalized.length > 0 ? normalized : fallback;
}

function normalizeValueItem(value: unknown, fallback: EditableValueItem) {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const input = value as Record<string, unknown>;

  return {
    title: normalizeString(input.title, fallback.title),
    description: normalizeString(input.description, fallback.description)
  };
}

function normalizeServiceItem(value: unknown, fallback: EditableServiceItem) {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const input = value as Record<string, unknown>;

  return {
    title: normalizeString(input.title, fallback.title),
    description: normalizeString(input.description, fallback.description),
    points: normalizeStringArray(input.points, fallback.points)
  };
}

function normalizeContent(value: unknown): EditableSiteContent {
  const input = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const contact =
    input.contact && typeof input.contact === "object"
      ? (input.contact as Record<string, unknown>)
      : {};
  const home =
    input.home && typeof input.home === "object"
      ? (input.home as Record<string, unknown>)
      : {};
  const about =
    input.about && typeof input.about === "object"
      ? (input.about as Record<string, unknown>)
      : {};
  const services =
    input.services && typeof input.services === "object"
      ? (input.services as Record<string, unknown>)
      : {};

  return {
    contact: {
      email: normalizeString(contact.email, DEFAULT_CONTENT.contact.email),
      phone: normalizeString(contact.phone, DEFAULT_CONTENT.contact.phone),
      address: normalizeString(contact.address, DEFAULT_CONTENT.contact.address)
    },
    home: {
      eyebrow: normalizeString(home.eyebrow, DEFAULT_CONTENT.home.eyebrow),
      headline: normalizeString(home.headline, DEFAULT_CONTENT.home.headline),
      description: normalizeString(home.description, DEFAULT_CONTENT.home.description),
      footerTagline: normalizeString(home.footerTagline, DEFAULT_CONTENT.home.footerTagline),
      highlights: normalizeStringArray(home.highlights, DEFAULT_CONTENT.home.highlights),
      ctaTitle: normalizeString(home.ctaTitle, DEFAULT_CONTENT.home.ctaTitle),
      ctaDescription: normalizeString(home.ctaDescription, DEFAULT_CONTENT.home.ctaDescription)
    },
    about: {
      heroTitle: normalizeString(about.heroTitle, DEFAULT_CONTENT.about.heroTitle),
      heroDescription: normalizeString(about.heroDescription, DEFAULT_CONTENT.about.heroDescription),
      missionTitle: normalizeString(about.missionTitle, DEFAULT_CONTENT.about.missionTitle),
      missionDescription: normalizeString(
        about.missionDescription,
        DEFAULT_CONTENT.about.missionDescription
      ),
      visionTitle: normalizeString(about.visionTitle, DEFAULT_CONTENT.about.visionTitle),
      visionDescription: normalizeString(
        about.visionDescription,
        DEFAULT_CONTENT.about.visionDescription
      ),
      storyTitle: normalizeString(about.storyTitle, DEFAULT_CONTENT.about.storyTitle),
      storyDescription: normalizeString(
        about.storyDescription,
        DEFAULT_CONTENT.about.storyDescription
      ),
      storyParagraphs: normalizeStringArray(about.storyParagraphs, DEFAULT_CONTENT.about.storyParagraphs),
      values: Array.isArray(about.values)
        ? about.values.map((item, index) =>
            normalizeValueItem(item, DEFAULT_CONTENT.about.values[index] ?? DEFAULT_CONTENT.about.values[0])
          )
        : DEFAULT_CONTENT.about.values
    },
    services: {
      pageTitle: normalizeString(services.pageTitle, DEFAULT_CONTENT.services.pageTitle),
      pageDescription: normalizeString(
        services.pageDescription,
        DEFAULT_CONTENT.services.pageDescription
      ),
      items: Array.isArray(services.items)
        ? services.items.map((item, index) =>
            normalizeServiceItem(
              item,
              DEFAULT_CONTENT.services.items[index] ?? DEFAULT_CONTENT.services.items[0]
            )
          )
        : DEFAULT_CONTENT.services.items
    }
  };
}

export async function getEditableSiteContent() {
  noStore();

  try {
    const githubContent = await getContentFromGitHub();

    if (githubContent?.content) {
      return normalizeContent(JSON.parse(githubContent.content));
    }
  } catch (error) {
    console.error("Failed to read editable content from GitHub.", error);
  }

  try {
    const raw = await readFile(LOCAL_CONTENT_FILE_PATH, "utf8");
    return normalizeContent(JSON.parse(raw));
  } catch (error) {
    console.error("Failed to read local content fallback. Falling back to defaults.", error);
    return DEFAULT_CONTENT;
  }
}

export function sanitizeEditableSiteContent(value: unknown) {
  return normalizeContent(value);
}

export function buildBusinessContactItems(content: EditableSiteContent) {
  return [
    { label: "Email", value: content.contact.email, href: `mailto:${content.contact.email}` },
    { label: "Mobile", value: content.contact.phone, href: `tel:${content.contact.phone}` },
    { label: "Office", value: content.contact.address, href: undefined }
  ] as const;
}

export function buildSiteConfig(content: EditableSiteContent) {
  return {
    name: "Kamkimat",
    email: content.contact.email,
    phone: content.contact.phone,
    address: content.contact.address,
    domain: "www.kamkimat.com",
    headline: content.home.headline,
    description:
      "Kamkimat helps startups, founders, SMEs, and agencies automate, scale, and grow with AI-powered software solutions.",
    footerTagline: content.home.footerTagline
  };
}
