"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

export function CmsSignOutButton() {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/cms/auth/sign-out", { method: "POST" });
        window.location.assign("/cms/sign-in");
      }}
      className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" aria-hidden /> {busy ? "Signing out" : "Sign out"}
    </button>
  );
}
