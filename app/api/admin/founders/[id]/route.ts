import { NextRequest, NextResponse } from "next/server";

import { requireAdminSessionFromRequest } from "@/lib/auth";
import { deleteFounder, getFounderById, updateFounder } from "@/lib/database";
import { validateFounderPayload } from "@/lib/validation";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, context: RouteContext) {
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

    const founder = await updateFounder(context.params.id, result.data);

    if (!founder) {
      return NextResponse.json({ error: "Founder not found." }, { status: 404 });
    }

    return NextResponse.json({ founder });
  } catch (error) {
    console.error("Founder update failed", error);

    return NextResponse.json(
      { error: "Unable to update founder right now." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const session = await requireAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const founder = await getFounderById(context.params.id);

    if (!founder) {
      return NextResponse.json({ error: "Founder not found." }, { status: 404 });
    }

    await deleteFounder(context.params.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Founder deletion failed", error);

    return NextResponse.json(
      { error: "Unable to delete founder right now." },
      { status: 500 }
    );
  }
}
