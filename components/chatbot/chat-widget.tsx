"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  CheckCircle2,
  MessageCircleMore,
  SendHorizonal,
  Sparkles,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  chatbotQuickActions,
  chatbotWelcomeMessage,
  shouldTriggerLeadForm,
  type ChatbotUiMessage
} from "@/lib/chatbot";
import type { LeadType } from "@/lib/lead-scoring";
import { cn } from "@/lib/utils";
import { getKamkimatWhatsappLink } from "@/lib/whatsapp";

type LeadValues = {
  name: string;
  email: string;
  phone: string;
  projectRequirement: string;
};

type StoredChatbotState = {
  messages?: ChatbotUiMessage[];
  leadSubmitted?: boolean;
  submittedLeadType?: LeadType | null;
  leadValues?: LeadValues;
};

type ChatWidgetProps = {
  contactPhone: string;
};

const STORAGE_KEY = "kamkimat-chatbot-session";
const BOT_REPLY_DELAY_MS = 1000;

const initialLeadValues: LeadValues = {
  name: "",
  email: "",
  phone: "",
  projectRequirement: ""
};

function createMessage(role: ChatbotUiMessage["role"], content: string): ChatbotUiMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content
  };
}

const initialMessage = createMessage("assistant", chatbotWelcomeMessage);

function isValidMessage(message: unknown): message is ChatbotUiMessage {
  return Boolean(
    message &&
      typeof message === "object" &&
      "id" in message &&
      "role" in message &&
      "content" in message &&
      typeof message.id === "string" &&
      (message.role === "assistant" || message.role === "user") &&
      typeof message.content === "string" &&
      message.content.trim()
  );
}

function normalizeMessages(messages: unknown) {
  if (!Array.isArray(messages)) {
    return [initialMessage];
  }

  const normalized = messages.filter(isValidMessage);

  return normalized.length > 0 ? normalized : [initialMessage];
}

export function ChatWidget({ contactPhone }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotUiMessage[]>([initialMessage]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadValues, setLeadValues] = useState<LeadValues>(initialLeadValues);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [submittedLeadType, setSubmittedLeadType] = useState<LeadType | null>(null);
  const [isSavingLead, setIsSavingLead] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);
  const userMessageCount = messages.filter((message) => message.role === "user").length;
  const whatsappLink = getKamkimatWhatsappLink(undefined, contactPhone);

  useEffect(() => {
    try {
      const rawValue = window.sessionStorage.getItem(STORAGE_KEY);

      if (!rawValue) {
        return;
      }

      const parsed = JSON.parse(rawValue) as StoredChatbotState;

      setMessages(normalizeMessages(parsed.messages));
      setLeadSubmitted(Boolean(parsed.leadSubmitted));
      setSubmittedLeadType(parsed.submittedLeadType ?? null);
      setLeadValues({
        ...initialLeadValues,
        ...(parsed.leadValues ?? {})
      });
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        messages,
        leadSubmitted,
        submittedLeadType,
        leadValues
      } satisfies StoredChatbotState)
    );
  }, [leadSubmitted, leadValues, messages, submittedLeadType]);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [isLoading, isOpen, leadOpen, messages]);

  const handleSend = async (messageText: string) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage = createMessage("user", trimmedMessage);
    const nextMessages = [...messages, userMessage];
    const nextUserCount = nextMessages.filter((message) => message.role === "user").length;

    setMessages(nextMessages);
    setDraft("");
    setError(null);
    setIsLoading(true);

    if (shouldTriggerLeadForm(trimmedMessage, nextUserCount) && !leadSubmitted) {
      setLeadOpen(true);
    }

    try {
      const replyDelay = new Promise((resolve) => window.setTimeout(resolve, BOT_REPLY_DELAY_MS));
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmedMessage,
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });
      await replyDelay;

      const payload = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok || !payload.message) {
        setError(payload.error ?? "The assistant is temporarily unavailable.");
        return;
      }

      const assistantMessage = payload.message;

      setMessages((current) => [...current, createMessage("assistant", assistantMessage)]);
    } catch {
      setError("The assistant is temporarily unavailable. You can still share your project details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadChange = (field: keyof LeadValues, value: string) => {
    setLeadValues((current) => ({
      ...current,
      [field]: value
    }));
    setLeadError(null);
  };

  const handleLeadSubmit = async () => {
    setLeadError(null);
    setIsSavingLead(true);

    try {
      const response = await fetch("/api/chatbot/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...leadValues,
          userMessageCount,
          context: messages
            .slice(-6)
            .map((message) => `${message.role}: ${message.content}`)
            .join("\n")
        })
      });

      const payload = (await response.json()) as {
        error?: string;
        leadType?: LeadType;
      };

      if (!response.ok) {
        setLeadError(payload.error ?? "Unable to save your project details right now.");
        return;
      }

      setLeadSubmitted(true);
      setSubmittedLeadType(payload.leadType ?? null);
      setLeadOpen(false);
      setLeadValues(initialLeadValues);
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Thanks. Your project details are now with Kamkimat. The team can follow up with the right next step."
        )
      ]);
    } catch {
      setLeadError("Unable to save your project details right now.");
    } finally {
      setIsSavingLead(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[420px] origin-bottom-right sm:right-6"
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0c1020]/95 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="relative border-b border-white/10 px-5 py-4">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(108,99,255,0.22),_transparent_48%),radial-gradient(circle_at_top_right,_rgba(0,212,255,0.18),_transparent_42%)]" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent shadow-glow">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-accent/90">
                        AI Sales Assistant
                      </div>
                      <h2 className="mt-1 text-lg font-semibold text-white">Kamkimat AI Assistant</h2>
                      <p className="mt-1 text-sm leading-6 text-white/[0.58]">
                        Ask about AI systems, SaaS builds, or share a project brief.
                      </p>
                    </div>
                  </div>
                  <button
                    aria-label="Close chatbot"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/[0.72] transition duration-300 hover:bg-white/[0.08] hover:text-white"
                    onClick={() => setIsOpen(false)}
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex h-[min(76vh,640px)] flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  {messages.map((message) => (
                    <div
                      className={cn(
                        "flex",
                        message.role === "assistant" ? "justify-start" : "justify-end"
                      )}
                      key={message.id}
                    >
                      <div
                        className={cn(
                          "max-w-[88%] rounded-[24px] px-4 py-3 text-sm leading-7 shadow-lg",
                          message.role === "assistant"
                            ? "border border-white/10 bg-white/[0.05] text-white/[0.78]"
                            : "bg-[linear-gradient(135deg,rgba(108,99,255,0.95),rgba(0,212,255,0.82))] text-white"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {userMessageCount <= 1 ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.38]">
                        <Sparkles className="h-4 w-4 text-accent" />
                        Quick actions
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {chatbotQuickActions.map((action) => (
                          <button
                            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-left text-sm text-white/[0.72] transition duration-300 hover:border-accent/35 hover:bg-accent/10 hover:text-white"
                            key={action.label}
                            onClick={() => void handleSend(action.message)}
                            type="button"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {isLoading ? (
                    <div className="flex justify-start">
                      <div className="inline-flex items-center gap-2 rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/[0.7]">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:120ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:240ms]" />
                      </div>
                    </div>
                  ) : null}

                  <div ref={scrollAnchorRef} />
                </div>

                <div className="border-t border-white/10 bg-black/20 px-5 py-4">
                  {!leadSubmitted ? (
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-white">
                            Want Kamkimat to follow up?
                          </div>
                          <p className="mt-1 text-sm leading-6 text-white/[0.56]">
                            Share your details and project requirement. Phone is optional.
                          </p>
                        </div>
                        <button
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.72] transition duration-300 hover:border-accent/35 hover:text-white"
                          onClick={() => setLeadOpen((current) => !current)}
                          type="button"
                        >
                          {leadOpen ? "Hide" : "Share"}
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {leadOpen ? (
                          <motion.div
                            animate={{ opacity: 1, height: "auto" }}
                            className="overflow-hidden"
                            exit={{ opacity: 0, height: 0 }}
                            initial={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <div className="mt-4 grid gap-3">
                              <div className="grid gap-3 sm:grid-cols-2">
                                <input
                                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.3] focus:border-accent/35"
                                  onChange={(event) => handleLeadChange("name", event.target.value)}
                                  placeholder="Your name"
                                  value={leadValues.name}
                                />
                                <input
                                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.3] focus:border-accent/35"
                                  onChange={(event) => handleLeadChange("email", event.target.value)}
                                  placeholder="you@company.com"
                                  type="email"
                                  value={leadValues.email}
                                />
                              </div>
                              <input
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.3] focus:border-accent/35"
                                onChange={(event) => handleLeadChange("phone", event.target.value)}
                                placeholder="Phone (optional)"
                                type="tel"
                                value={leadValues.phone}
                              />
                              <textarea
                                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.3] focus:border-accent/35"
                                onChange={(event) =>
                                  handleLeadChange("projectRequirement", event.target.value)
                                }
                                placeholder="Project requirement"
                                rows={4}
                                value={leadValues.projectRequirement}
                              />
                              {leadError ? (
                                <div className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                                  {leadError}
                                </div>
                              ) : null}
                              <button
                                className="button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-glow transition duration-300 hover:translate-y-[-1px] hover:shadow-glow-accent disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={isSavingLead}
                                onClick={() => void handleLeadSubmit()}
                                type="button"
                              >
                                {isSavingLead ? "Saving..." : "Save Project Lead"}
                              </button>
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                      <div className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        Project lead captured
                      </div>
                      <p className="mt-1 leading-6 text-emerald-100/85">
                        Kamkimat has your details and can follow up from here.
                      </p>
                      {submittedLeadType === "hot" ? (
                        <a
                          className="mt-4 inline-flex items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition duration-300 hover:bg-emerald-400/15"
                          href={whatsappLink}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <MessageCircleMore className="mr-2 h-4 w-4" />
                          Continue on WhatsApp
                        </a>
                      ) : null}
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="flex items-end gap-3">
                      <textarea
                        className="min-h-[52px] flex-1 resize-none rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition duration-300 placeholder:text-white/[0.3] focus:border-accent/35"
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            void handleSend(draft);
                          }
                        }}
                        placeholder="Ask about AI automation, SaaS, chatbots, or your project..."
                        rows={1}
                        value={draft}
                      />
                      <button
                        aria-label="Send message"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(108,99,255,1),rgba(0,212,255,0.92))] text-white shadow-glow transition duration-300 hover:translate-y-[-1px] hover:shadow-glow-accent disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isLoading || !draft.trim()}
                        onClick={() => void handleSend(draft)}
                        type="button"
                      >
                        <SendHorizonal className="h-4 w-4" />
                      </button>
                    </div>
                    {error ? (
                      <div className="mt-3 rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        animate={{ scale: isOpen ? 0.96 : 1 }}
        aria-label={isOpen ? "Close chatbot" : "Open Kamkimat AI Assistant"}
        className="fixed bottom-4 right-4 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(108,99,255,0.98),rgba(0,212,255,0.9))] text-white shadow-[0_18px_42px_rgba(0,0,0,0.35)] transition duration-300 hover:translate-y-[-2px] sm:bottom-6 sm:right-6"
        onClick={() => setIsOpen((current) => !current)}
        transition={{ duration: 0.2 }}
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full border border-white/20" />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_52%)]" />
        {isOpen ? <X className="relative h-6 w-6" /> : <MessageCircleMore className="relative h-6 w-6" />}
      </motion.button>
    </>
  );
}
