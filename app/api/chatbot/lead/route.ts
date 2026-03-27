import { NextResponse } from "next/server";

import { createContactSubmission } from "@/lib/database";
import { inferLeadService } from "@/lib/chatbot";
import { inferLeadType, inferUserMessageCount } from "@/lib/lead-scoring";
import { validateChatbotLeadPayload } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateChatbotLeadPayload(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    const service = inferLeadService(
      [result.data.projectRequirement, result.data.context].filter(Boolean).join("\n")
    );
    const userMessageCount =
      result.data.userMessageCount ?? inferUserMessageCount(result.data.context);
    const leadType = inferLeadType({
      messageCount: userMessageCount,
      texts: [result.data.projectRequirement, result.data.context]
    });

    const submission = await createContactSubmission({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      company: null,
      service,
      message: result.data.projectRequirement,
      source: "chatbot",
      leadType
    });

    return NextResponse.json({
      ok: true,
      submissionId: submission.id,
      leadType
    });
  } catch (error) {
    console.error("Chatbot lead capture failed", error);

    return NextResponse.json(
      { error: "Unable to save the chatbot lead right now." },
      { status: 500 }
    );
  }
}
