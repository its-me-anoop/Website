import type { CmsMutationRequest, CmsSession } from "./types";
import type { PracticeWorkspace } from "../core/types";

/**
 * Implement this contract in the extracted private CMS project using the
 * chosen database and identity provider. It deliberately has no default
 * implementation here: a missing adapter fails closed instead of permitting a
 * pretend production session.
 */
export interface ProductionAuthAdapter {
  /** Redirect the browser to the configured OIDC/SAML provider. */
  beginSignIn(input: { request: Request; returnTo: string }): Promise<Response>;
  /** Verify the provider callback and return the database-backed CMS session. */
  completeSignIn(request: Request): Promise<CmsSession>;
  getSession(sessionId: string): Promise<CmsSession | null>;
  revokeSession(sessionId: string): Promise<void>;
  applyWorkspaceMutation(input: {
    session: CmsSession;
    workspaceSlug: string;
    workspace: PracticeWorkspace;
    mutation: CmsMutationRequest;
  }): Promise<void>;
}

export const productionAuthAdapter: ProductionAuthAdapter | null = null;
