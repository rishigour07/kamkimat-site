export type LeadType = "hot" | "warm" | "cold";

const PRICING_KEYWORDS = ["price", "pricing", "cost", "budget", "quote", "estimate"] as const;

function matchesKeyword(message: string, keywords: readonly string[]) {
  return keywords.some((keyword) =>
    new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(message)
  );
}

export function inferUserMessageCount(context: string | null | undefined) {
  if (!context) {
    return 0;
  }

  return context
    .split("\n")
    .map((line) => line.trim().toLowerCase())
    .filter((line) => line.startsWith("user:")).length;
}

export function inferLeadType(input: {
  messageCount?: number | null;
  texts?: Array<string | null | undefined>;
}) {
  const messageCount = Math.max(0, input.messageCount ?? 0);
  const combinedText = input.texts
    ?.filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .join("\n")
    .toLowerCase() ?? "";

  if (matchesKeyword(combinedText, PRICING_KEYWORDS)) {
    return "hot" as const;
  }

  if (messageCount >= 2) {
    return "warm" as const;
  }

  return "cold" as const;
}

export function formatLeadTypeLabel(leadType: LeadType) {
  if (leadType === "hot") {
    return "Hot";
  }

  if (leadType === "warm") {
    return "Warm";
  }

  return "Cold";
}

export function leadTypeBadgeClassName(leadType: LeadType) {
  if (leadType === "hot") {
    return "border-rose-400/30 bg-rose-400/10 text-rose-200";
  }

  if (leadType === "warm") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-200";
  }

  return "border-white/10 bg-white/[0.03] text-white/[0.55]";
}
