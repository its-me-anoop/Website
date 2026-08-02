import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { CMS_SESSION_COOKIE, getCmsAuthConfig } from "./config";
import { productionAuthAdapter } from "./production-adapter";
import type { CmsRole, CmsSession } from "./types";

type SessionEnvelope = {
  session: CmsSession;
  expiresAt: number;
};

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function verifyToken(token: string, secret: string): SessionEnvelope | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload, secret);
  const received = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (received.length !== expectedBuffer.length || !timingSafeEqual(received, expectedBuffer)) {
    return null;
  }
  try {
    const envelope = JSON.parse(decode(payload)) as SessionEnvelope;
    return envelope.expiresAt > Date.now() ? envelope : null;
  } catch {
    return null;
  }
}

function createToken(session: CmsSession, secret: string) {
  const envelope: SessionEnvelope = {
    session,
    expiresAt: new Date(session.expiresAt).getTime(),
  };
  const payload = encode(JSON.stringify(envelope));
  return `${payload}.${sign(payload, secret)}`;
}

export async function getCmsSession(): Promise<CmsSession | null> {
  const config = getCmsAuthConfig();
  if (!config.isConfigured || !config.secret) return null;
  const token = (await cookies()).get(CMS_SESSION_COOKIE)?.value;
  if (!token) return null;
  const envelope = verifyToken(token, config.secret);
  if (!envelope) return null;

  if (envelope.session.mode === "demo") {
    return config.mode === "demo" ? envelope.session : null;
  }

  if (config.mode !== "production" || !productionAuthAdapter) return null;
  return productionAuthAdapter.getSession(envelope.session.id);
}

export function createDemoSession(input: {
  workspaceId: string;
  role: CmsRole;
}): CmsSession {
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
  return {
    id: randomUUID(),
    actor: {
      id: `local-demo-${randomUUID()}`,
      name: "Local demo user",
      email: "local-demo@example.invalid",
    },
    role: input.role,
    memberships:
      input.role === "platform_admin"
        ? []
        : [{ workspaceId: input.workspaceId, role: input.role }],
    expiresAt,
    mode: "demo",
  };
}

export function sessionCookieOptions(expiresAt: string) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  };
}

export function issueSessionCookie(session: CmsSession) {
  const config = getCmsAuthConfig();
  if (!config.secret) throw new Error("CMS auth signing secret is not configured.");
  return createToken(session, config.secret);
}
