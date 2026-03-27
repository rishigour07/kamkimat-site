import OpenAI from "openai";
import { NextResponse } from "next/server";

import {
  getChatbotSystemPrompt,
  getRuleBasedReply,
  isOpenAIEnabled
} from "@/lib/chatbot";

type ChatRequestMessage = {
  role: "assistant" | "user";
  content: string;
};

type OpenAIResponsePayload = {
  output_text?: string | null;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 1200;

function extractResponseText(payload: OpenAIResponsePayload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const parts: string[] = [];

  for (const item of payload.output ?? []) {
    for (const content of item.content ?? []) {
      if (
        content.type === "output_text" &&
        typeof content.text === "string" &&
        content.text.trim()
      ) {
        parts.push(content.text.trim());
      }
    }
  }

  return parts.join("\n\n").trim();
}

function validateMessages(messages: unknown): ChatRequestMessage[] | null {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  const normalized = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => {
      if (
        !message ||
        typeof message !== "object" ||
        !("role" in message) ||
        !("content" in message)
      ) {
        return null;
      }

      const role = message.role;
      const content = message.content;

      if (
        (role !== "assistant" && role !== "user") ||
        typeof content !== "string" ||
        !content.trim()
      ) {
        return null;
      }

      return {
        role,
        content: content.trim().slice(0, MAX_MESSAGE_LENGTH)
      } satisfies ChatRequestMessage;
    })
    .filter(Boolean) as ChatRequestMessage[];

  return normalized.length > 0 ? normalized : null;
}

function validateSingleMessage(message: unknown): ChatRequestMessage[] | null {
  if (typeof message !== "string" || !message.trim()) {
    return null;
  }

  return [
    {
      role: "user",
      content: message.trim().slice(0, MAX_MESSAGE_LENGTH)
    }
  ];
}

function getLatestUserMessage(messages: ChatRequestMessage[]) {
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  return latestUserMessage?.content ?? null;
}

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: unknown;
      messages?: unknown;
    };

    const conversation = validateMessages(body.messages) ?? validateSingleMessage(body.message);
    const latestUserMessage =
      (typeof body.message === "string" && body.message.trim()
        ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH)
        : null) ?? (conversation ? getLatestUserMessage(conversation) : null);

    if (!conversation || !latestUserMessage) {
      return NextResponse.json(
        { error: "Please send a non-empty message." },
        { status: 400 }
      );
    }

    const userMessageCount = conversation.filter((message) => message.role === "user").length;

    if (!isOpenAIEnabled()) {
      return NextResponse.json({
        message: getRuleBasedReply(latestUserMessage, userMessageCount),
        mode: "rule_based"
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI mode is enabled, but OPENAI_API_KEY is missing." },
        { status: 503 }
      );
    }

    const client = new OpenAI({
      apiKey
    });

    const payload = (await client.responses.create({
      model: process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-5.4-mini",
      max_output_tokens: 260,
      input: [
        {
          role: "system",
          content: getChatbotSystemPrompt()
        },
        ...conversation.map((message) => ({
          role: message.role,
          content: message.content
        }))
      ]
    })) as OpenAIResponsePayload;

    const message = extractResponseText(payload);

    if (!message) {
      return NextResponse.json(
        { error: "The assistant could not produce a reply right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message,
      mode: "openai"
    });
  } catch (error) {
    console.error("Chatbot request failed", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: error.message || "OpenAI could not generate a reply right now." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Unable to reach the AI assistant right now." },
      { status: 500 }
    );
  }
}
