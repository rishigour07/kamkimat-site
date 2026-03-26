import {
  Bot,
  BrainCircuit,
  Cable,
  Code2,
  Compass,
  Cpu,
  Gauge,
  Layers3,
  LayoutDashboard,
  Lightbulb,
  LineChart,
  MessageSquareQuote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
};

export type Service = {
  title: string;
  description: string;
  points: string[];
  icon: LucideIcon;
};

export type WhyItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type CaseStudy = {
  title: string;
  sector: string;
  problem: string;
  solution: string;
  impact: string[];
};

export type ValueItem = {
  title: string;
  description: string;
};

export const siteConfig = {
  name: "Kamkimat",
  email: "kamkimat@gmail.com",
  headline: "We Build AI Systems That Scale Your Business",
  description:
    "Kamkimat helps startups, founders, SMEs, and agencies automate, scale, and grow with AI-powered software solutions.",
  footerTagline: "Building the future with AI-powered software"
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const stats = [
  {
    value: "6",
    label: "Core service lines",
    detail: "From custom SaaS builds to AI automation and advisory."
  },
  {
    value: "4",
    label: "Step delivery model",
    detail: "Discover, design, build, and scale without the chaos."
  },
  {
    value: "24/7",
    label: "Automation mindset",
    detail: "Systems designed to keep working long after launch."
  },
  {
    value: "100%",
    label: "Custom execution",
    detail: "No templates, no off-the-shelf shortcuts, no generic builds."
  }
];

export const services: Service[] = [
  {
    title: "Custom SaaS Development",
    description:
      "Launch product-grade SaaS platforms with secure architecture, premium UX, and scalable foundations.",
    points: ["Multi-tenant platforms", "Admin dashboards", "Billing-ready product flows"],
    icon: LayoutDashboard
  },
  {
    title: "AI Automation",
    description:
      "Replace repetitive manual work with AI-driven automations that reduce friction across your business.",
    points: ["Lead routing", "Ops automations", "Internal AI assistants"],
    icon: BrainCircuit
  },
  {
    title: "AI Chatbots",
    description:
      "Deploy branded AI chatbots for support, qualification, onboarding, and knowledge access.",
    points: ["Website assistants", "Sales qualification", "Support deflection"],
    icon: Bot
  },
  {
    title: "Web App Development",
    description:
      "Build fast, conversion-focused web applications that feel premium and stay maintainable.",
    points: ["Customer portals", "Internal tools", "Modern frontend systems"],
    icon: Code2
  },
  {
    title: "Workflow Integration",
    description:
      "Connect the tools your team already uses so data, decisions, and tasks flow without manual handoffs.",
    points: ["CRM integration", "API orchestration", "Cross-tool syncing"],
    icon: Workflow
  },
  {
    title: "Software Consulting",
    description:
      "Get strategic clarity on what to build, how to prioritize it, and how to make AI create actual business value.",
    points: ["Technical roadmaps", "Product scoping", "Architecture guidance"],
    icon: Lightbulb
  }
];

export const whyKamkimat: WhyItem[] = [
  {
    title: "Product thinking, not feature factories",
    description:
      "We shape systems around business outcomes, user behavior, and long-term leverage, not busywork.",
    icon: Compass
  },
  {
    title: "AI that fits your workflow",
    description:
      "Every automation, chatbot, and integration is designed around how your team actually operates today.",
    icon: Cable
  },
  {
    title: "Execution built for trust",
    description:
      "Clear architecture, premium UI, thoughtful consulting, and systems your team can confidently grow with.",
    icon: ShieldCheck
  }
];

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "We map business goals, workflow bottlenecks, and technical constraints to define the right path.",
    icon: Sparkles
  },
  {
    title: "Design",
    description:
      "We turn strategy into product flows, automation logic, and premium interface systems.",
    icon: Layers3
  },
  {
    title: "Build",
    description:
      "We implement the product, AI workflows, and integrations with a sharp focus on speed and quality.",
    icon: Cpu
  },
  {
    title: "Scale",
    description:
      "We help teams evolve what ships into reliable systems that support growth, team velocity, and new use cases.",
    icon: Rocket
  }
];

export const aiSolutions = [
  {
    title: "Lead Qualification Engines",
    description:
      "Use AI to qualify inbound leads, collect context, and push the right conversations into your pipeline.",
    icon: Gauge
  },
  {
    title: "Operations Copilots",
    description:
      "Give your team AI-assisted workflows for repetitive decisions, follow-ups, summaries, and coordination.",
    icon: Zap
  },
  {
    title: "Knowledge Assistants",
    description:
      "Turn internal documentation into searchable AI chat experiences for staff, customers, or partners.",
    icon: BrainCircuit
  },
  {
    title: "Connected Workflow Layers",
    description:
      "Bridge SaaS tools, forms, inboxes, CRMs, and dashboards into one orchestrated system of action.",
    icon: LineChart
  }
];

export const testimonialThemes = [
  {
    quote:
      "We need a partner who can think like a product team, move like an agency, and still build like engineers.",
    person: "Founder priority",
    role: "Growth-stage SaaS teams"
  },
  {
    quote:
      "We want automation that removes operational drag without creating a messy stack our team has to babysit.",
    person: "Operations priority",
    role: "SMEs and service businesses"
  },
  {
    quote:
      "We need white-label capable execution, premium interfaces, and clean delivery when client expectations are high.",
    person: "Agency priority",
    role: "Studios and implementation partners"
  }
];

export const faqs: FAQItem[] = [
  {
    question: "What kinds of companies does Kamkimat work with?",
    answer:
      "Kamkimat is built for startups, founders, SMEs, and agencies that want sharper systems, better product execution, and meaningful AI adoption."
  },
  {
    question: "Do you handle both strategy and implementation?",
    answer:
      "Yes. We support discovery, product scoping, UX direction, engineering, AI workflow design, and post-launch scaling."
  },
  {
    question: "Can you integrate AI into our current tools?",
    answer:
      "Absolutely. We can plug AI into existing CRMs, operations workflows, support systems, internal tools, and customer-facing experiences."
  },
  {
    question: "Do you only build AI products?",
    answer:
      "No. We also build custom SaaS platforms, web applications, internal dashboards, and workflow systems even when the main goal is speed or scale rather than AI."
  },
  {
    question: "How do we get started?",
    answer:
      "The fastest path is a contact request. We can then align on goals, current bottlenecks, scope, and the best engagement approach."
  }
];

export const aboutValues: ValueItem[] = [
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

export const caseStudies: CaseStudy[] = [
  {
    title: "AI Lead Intake System",
    sector: "Startup Sales Pipeline",
    problem:
      "Inbound leads were inconsistent, manually triaged, and missing the context needed for fast follow-up.",
    solution:
      "Designed an AI-assisted intake layer that captured intent, enriched requests, scored urgency, and routed leads into a cleaner qualification flow.",
    impact: [
      "Sharper lead context for sales conversations",
      "Less manual routing and inbox triage",
      "Faster movement from inquiry to qualified pipeline"
    ]
  },
  {
    title: "Agency Operations Command Center",
    sector: "Multi-Client Delivery",
    problem:
      "Project status, approvals, updates, and internal follow-ups were spread across disconnected tools and threads.",
    solution:
      "Built a centralized operations dashboard with workflow automations, client visibility layers, and smarter coordination across delivery steps.",
    impact: [
      "Cleaner execution across teams and clients",
      "Improved visibility for delivery leadership",
      "Reduced friction in recurring project operations"
    ]
  },
  {
    title: "Customer Support AI Assistant",
    sector: "SME Service Experience",
    problem:
      "Support questions were repetitive, response time was uneven, and valuable internal knowledge was hard to access quickly.",
    solution:
      "Created a branded AI chatbot connected to service FAQs and internal knowledge so customers and staff could get answers faster.",
    impact: [
      "More consistent front-line support responses",
      "Lower repetitive workload for the team",
      "Better access to operational knowledge"
    ]
  }
];

export const contactServices = services.map((service) => service.title);

export const contactHighlights = [
  "Premium SaaS product builds",
  "AI automation and chatbot strategy",
  "Workflow integration and consulting"
];

export const footerLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" }
];

export const insightPoints = [
  {
    title: "AI-first software systems",
    description:
      "Build customer-facing products and internal platforms that use AI where it creates actual leverage."
  },
  {
    title: "Premium delivery experience",
    description:
      "Thoughtful interfaces, smooth interactions, and clear execution that elevate how your brand is perceived."
  },
  {
    title: "Scalable growth foundations",
    description:
      "Ship systems that can support process maturity, new revenue paths, and future automation opportunities."
  }
];

export const contactReasons = [
  {
    title: "For founders",
    description: "Validate ideas, scope products, and launch systems that create operating leverage.",
    icon: MessageSquareQuote
  },
  {
    title: "For SMEs",
    description: "Modernize workflows, connect tools, and reduce manual effort with AI-powered software.",
    icon: Workflow
  },
  {
    title: "For agencies",
    description: "Add technical delivery power for premium client work, internal ops, or white-label execution.",
    icon: Code2
  }
];

