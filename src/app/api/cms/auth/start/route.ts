import { NextResponse } from "next/server";
import { getCmsAuthConfig } from "@/features/gp-cms/auth/config";
import { productionAuthAdapter } from "@/features/gp-cms/auth/production-adapter";

export async function GET(request: Request) {
  const config = getCmsAuthConfig();
  if (config.mode !== "production" || !productionAuthAdapter) {
    return NextResponse.json({ error: "Organisation sign-in is not configured." }, { status: 503 });
  }
  const next = new URL(request.url).searchParams.get("next");
  const returnTo = next?.startsWith("/cms") ? next : "/cms";
  return productionAuthAdapter.beginSignIn({ request, returnTo });
}
