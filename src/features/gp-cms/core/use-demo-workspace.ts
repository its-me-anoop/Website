"use client";

import { useCallback, useEffect, useState } from "react";
import { browserDemoRepository, withAuditEvent } from "./browser-demo-repository";
import type { PracticeWorkspace, WorkspaceSaveReason } from "./types";
import type { CmsActor } from "../auth/types";

export type SaveState = "ready" | "saving" | "saved" | "error";

export function useDemoWorkspace(seed: PracticeWorkspace, actor?: CmsActor) {
  const [workspace, setWorkspace] = useState<PracticeWorkspace>(seed);
  const [saveState, setSaveState] = useState<SaveState>("ready");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWorkspace(browserDemoRepository.load(seed));
    });

    const sync = (event: Event) => {
      const workspaceId = (event as CustomEvent<{ workspaceId?: string }>).detail
        ?.workspaceId;
      if (!workspaceId || workspaceId === seed.id) {
        setWorkspace(browserDemoRepository.load(seed));
      }
    };

    window.addEventListener("storage", sync);
    window.addEventListener("flutterly:gp-cms-workspace-changed", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", sync);
      window.removeEventListener("flutterly:gp-cms-workspace-changed", sync);
    };
  }, [seed]);

  const save = useCallback(
    async (next: PracticeWorkspace, reason: WorkspaceSaveReason) => {
      setSaveState("saving");
      try {
        const response = await fetch(`/api/cms/workspaces/${seed.slug}/mutations`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ mutation: reason, workspace: next }),
        });
        if (!response.ok) throw new Error("Mutation was not authorised.");
        const audited = withAuditEvent(next, reason, actor ?? {
          id: "local-public-preview",
          name: "Local browser preview",
          email: "local-preview@example.invalid",
        });
        browserDemoRepository.save(audited);
        setWorkspace(audited);
        setSaveState("saved");
        window.setTimeout(() => setSaveState("ready"), 2400);
      } catch {
        setSaveState("error");
      }
    },
    [actor, seed.slug]
  );

  const reset = useCallback(async () => {
    const response = await fetch(`/api/cms/workspaces/${seed.slug}/mutations`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mutation: {
          intent: "reset_demo",
          action: "Reset local demo data",
          detail: "Restored the fictional workspace to its seeded content.",
        },
        workspace: seed,
      }),
    });
    if (!response.ok) {
      setSaveState("error");
      return;
    }
    browserDemoRepository.reset(seed.id);
    setWorkspace(structuredClone(seed));
    setSaveState("ready");
  }, [seed]);

  return { workspace, save, reset, saveState };
}
