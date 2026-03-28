import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  adminSessionCookieOptions,
  createAdminSession
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      email?: string;
      password?: string;
    };

    const username = body.username?.trim() || body.email?.trim() || "";
    const password = body.password ?? "";
    const expectedUsername = process.env.ADMIN_USERNAME?.trim();
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured." },
        { status: 503 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const sessionToken = await createAdminSession({
      sub: "admin",
      email: expectedUsername
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, adminSessionCookieOptions);

    return response;
  } catch (error) {
    console.error("Admin login failed", error);

    return NextResponse.json(
      { error: "Unable to sign in right now." },
      { status: 500 }
    );
  }
}
