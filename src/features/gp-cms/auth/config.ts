export type CmsAuthMode = "production" | "demo" | "unconfigured";

export type CmsAuthConfig = {
  mode: CmsAuthMode;
  secret?: string;
  isConfigured: boolean;
  issue?: string;
};

export function getCmsAuthConfig(): CmsAuthConfig {
  const requested = process.env.GP_CMS_AUTH_MODE;
  const secret = process.env.GP_CMS_AUTH_SECRET;

  if (requested === "demo") {
    if (process.env.NODE_ENV === "production") {
      return {
        mode: "unconfigured",
        isConfigured: false,
        issue: "Local demo authentication is disabled in production.",
      };
    }
    if (!secret || secret.length < 32) {
      return {
        mode: "unconfigured",
        isConfigured: false,
        issue: "Set a local GP_CMS_AUTH_SECRET of at least 32 characters to enable demo sign-in.",
      };
    }
    return { mode: "demo", secret, isConfigured: true };
  }

  if (requested === "production") {
    if (!secret || secret.length < 32) {
      return {
        mode: "unconfigured",
        isConfigured: false,
        issue: "GP_CMS_AUTH_SECRET is missing or too short.",
      };
    }
    return { mode: "production", secret, isConfigured: true };
  }

  return {
    mode: "unconfigured",
    isConfigured: false,
    issue: "Choose GP_CMS_AUTH_MODE=production after connecting an identity and session adapter, or enable local demo mode outside production.",
  };
}

export const CMS_SESSION_COOKIE = "flutterly_gp_cms_session";
