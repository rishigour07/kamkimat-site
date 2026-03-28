import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireAdminSessionFromRequest } from "@/lib/auth";
import { getEditableSiteContent, sanitizeEditableSiteContent } from "@/lib/content";
import { updateContentOnGitHub } from "@/lib/github-content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await requireAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const content = await getEditableSiteContent();

  return NextResponse.json({ ok: true, content });
}

export async function PUT(request: NextRequest) {
  const session = await requireAdminSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const content = sanitizeEditableSiteContent(body);
    const persistedContent = await updateContentOnGitHub(content);

    return NextResponse.json({ ok: true, content: persistedContent });
  } catch (error) {
    console.error("Failed to persist content to GitHub", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message
            ? error.message
            : "Unable to save content right now."
      },
      { status: 500 }
    );
  }
}
