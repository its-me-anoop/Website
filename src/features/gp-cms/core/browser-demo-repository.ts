"use client";

import type {
  PracticeWorkspace,
  WorkspaceRepository,
  WorkspaceSaveReason,
} from "./types";
import type { CmsActor } from "../auth/types";

const STORAGE_PREFIX = "flutterly.gp-cms.demo.v1";

function storageKey(workspaceId: string) {
  return `${STORAGE_PREFIX}.${workspaceId}`;
}

function cloneWorkspace(workspace: PracticeWorkspace): PracticeWorkspace {
  return structuredClone(workspace);
}

/**
 * Demonstration persistence only. It is deliberately browser-local so this
 * prototype remains stateless and Vercel-safe. It is not an authentication,
 * tenant-isolation, backup, or production data-storage mechanism.
 */
export const browserDemoRepository: WorkspaceRepository = {
  load(seed) {
    if (typeof window === "undefined") return cloneWorkspace(seed);

    try {
      const raw = window.localStorage.getItem(storageKey(seed.id));
      if (!raw) return cloneWorkspace(seed);
      const parsed = JSON.parse(raw) as PracticeWorkspace;
      if (parsed.id !== seed.id || parsed.schemaVersion !== seed.schemaVersion) {
        return cloneWorkspace(seed);
      }
      return parsed;
    } catch {
      return cloneWorkspace(seed);
    }
  },
  save(workspace) {
    window.localStorage.setItem(storageKey(workspace.id), JSON.stringify(workspace));
    window.dispatchEvent(
      new CustomEvent("flutterly:gp-cms-workspace-changed", {
        detail: { workspaceId: workspace.id },
      })
    );
  },
  reset(workspaceId) {
    window.localStorage.removeItem(storageKey(workspaceId));
    window.dispatchEvent(
      new CustomEvent("flutterly:gp-cms-workspace-changed", {
        detail: { workspaceId },
      })
    );
  },
};

export function withAuditEvent(
  workspace: PracticeWorkspace,
  reason: WorkspaceSaveReason,
  actor: CmsActor
): PracticeWorkspace {
  const occurredAt = new Date().toISOString();
  return {
    ...workspace,
    updatedAt: occurredAt,
    audit: [
      {
        id: `event-${Date.now()}`,
        occurredAt,
        actor: actor.name,
        action: reason.action,
        detail: reason.detail,
      },
      ...workspace.audit,
    ].slice(0, 30),
  };
}
