import { NextResponse } from "next/server";
import { CMS_SESSION_COOKIE, getCmsAuthConfig } from "@/features/gp-cms/auth/config";
import { productionAuthAdapter } from "@/features/gp-cms/auth/production-adapter";
import { getCmsSession } from "@/features/gp-cms/auth/session";

export async function POST() {
  const session = await getCmsSession();
  const config = getCmsAuthConfig();
  if (session?.mode === "production" && config.mode === "production" && productionAuthAdapter) {
    await productionAuthAdapter.revokeSession(session.id);
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CMS_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
