import { NextResponse } from "next/server";

import { inferLeadService } from "@/lib/chatbot";
import { inferLeadType, inferUserMessageCount } from "@/lib/lead-scoring";
import { EmailDeliveryError, sendChatbotLeadEmail } from "@/lib/mailer";
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

    await sendChatbotLeadEmail({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      projectRequirement: result.data.projectRequirement,
      context: result.data.context,
      service,
      leadType
    });

    return NextResponse.json({
      ok: true,
      leadType
    });
  } catch (error) {
    console.error("Chatbot lead capture failed", error);

    if (error instanceof EmailDeliveryError) {
      return NextResponse.json({ error: error.exposeMessage }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Unable to save the chatbot lead right now." },
      { status: 500 }
    );
  }
}
