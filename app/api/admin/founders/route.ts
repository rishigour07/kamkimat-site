import { NextRequest, NextResponse } from "next/server";

import { requireAdminSessionFromRequest } from "@/lib/auth";
import { createFounder, getAllFounders } from "@/lib/database";
import { validateFounderPayload } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const session = await requireAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ founders: await getAllFounders() });
}

export async function POST(request: NextRequest) {
  const session = await requireAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = validateFounderPayload(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ founder: await createFounder(result.data) }, { status: 201 });
  } catch (error) {
    console.error("Founder creation failed", error);

    return NextResponse.json(
      { error: "Unable to create founder right now." },
      { status: 500 }
    );
  }
}
