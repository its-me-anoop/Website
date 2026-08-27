import { NextResponse } from "next/server";
import { CMS_SESSION_COOKIE, getCmsAuthConfig } from "@/features/gp-cms/auth/config";
import { productionAuthAdapter } from "@/features/gp-cms/auth/production-adapter";
import { issueSessionCookie, sessionCookieOptions } from "@/features/gp-cms/auth/session";

export async function GET(request: Request) {
  const config = getCmsAuthConfig();
  if (config.mode !== "production" || !productionAuthAdapter) {
    return NextResponse.json({ error: "Organisation sign-in is not configured." }, { status: 503 });
  }
  try {
    const session = await productionAuthAdapter.completeSignIn(request);
    const response = NextResponse.redirect(new URL("/cms", request.url));
    response.cookies.set(
      CMS_SESSION_COOKIE,
      issueSessionCookie({ ...session, mode: "production" }),
      sessionCookieOptions(session.expiresAt)
    );
    return response;
  } catch {
    return NextResponse.redirect(new URL("/cms/sign-in?error=provider", request.url));
  }
}
