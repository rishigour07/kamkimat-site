import { NextResponse } from "next/server";

import { EmailDeliveryError, sendContactEmail } from "@/lib/mailer";
import { validateContactPayload } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateContactPayload(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    await sendContactEmail(result.data);

    return NextResponse.json({
      ok: true
    });
  } catch (error) {
    console.error("Contact submission failed", error);

    if (error instanceof EmailDeliveryError) {
      return NextResponse.json({ error: error.exposeMessage }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Unable to submit your inquiry right now." },
      { status: 500 }
    );
  }
}
