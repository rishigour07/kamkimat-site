import { NextResponse } from "next/server";

import { createContactSubmission } from "@/lib/database";
import { inferLeadType } from "@/lib/lead-scoring";
import { validateContactPayload } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateContactPayload(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    const submission = await createContactSubmission({
      ...result.data,
      source: "contact_form",
      leadType: inferLeadType({
        messageCount: 1,
        texts: [result.data.service, result.data.message]
      })
    });

    return NextResponse.json({
      ok: true,
      submissionId: submission.id
    });
  } catch (error) {
    console.error("Contact submission failed", error);

    return NextResponse.json(
      { error: "Unable to submit your inquiry right now." },
      { status: 500 }
    );
  }
}
