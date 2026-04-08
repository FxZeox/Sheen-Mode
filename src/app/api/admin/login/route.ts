import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { ADMIN_SESSION_COOKIE, createAdminSessionToken, getAdminCredentials, getAdminSessionMaxAge } from "@/lib/admin-auth";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const payload = loginSchema.parse(await request.json());
    const credentials = getAdminCredentials();
    const submittedUsername = payload.username.trim();
    const configuredUsername = credentials.username.trim();

    if (submittedUsername !== configuredUsername || payload.password !== credentials.password) {
      return NextResponse.json({ success: false, message: "Invalid username or password." }, { status: 401 });
    }

    const token = createAdminSessionToken(submittedUsername);
    const cookieStore = await cookies();

    cookieStore.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: getAdminSessionMaxAge(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? error.issues[0]?.message ?? "Invalid input."
        : error instanceof Error
          ? error.message
          : "Unable to login.";

    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
