import { NextRequest, NextResponse } from "next/server";

import { requireAdminSessionFromRequest } from "@/lib/auth";
import { deleteContactSubmission } from "@/lib/database";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, context: RouteContext) {
  const session = await requireAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const deleted = await deleteContactSubmission(context.params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submission deletion failed", error);

    return NextResponse.json(
      { error: "Unable to delete submission right now." },
      { status: 500 }
    );
  }
}
