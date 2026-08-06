import { NextResponse } from "next/server";
import { adminConfigured, isAuthorisedAdmin } from "@/features/booking/server/admin-auth";
import {
  parseAvailabilityRules,
  resolveAvailability,
  saveAvailability,
} from "@/features/booking/server/availability-store";

function guard(request: Request): NextResponse | null {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  }
  if (!isAuthorisedAdmin(request)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }
  return null;
}

/** GET — the owner's current availability rules and where they came from. */
export async function GET(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  const { rules, source } = await resolveAvailability();
  return NextResponse.json(
    {
      rules,
      source,
      bookingOpen: rules.weeklyWindows.length > 0,
      // Paste this into hosting env as BOOKING_AVAILABILITY_JSON to make
      // the rules durable on serverless filesystems.
      envJson: JSON.stringify(rules),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/** PUT — replace the availability rules (an empty window list closes booking). */
export async function PUT(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  const body = await request.json().catch(() => null);
  const rules = parseAvailabilityRules(body);
  if (!rules) {
    return NextResponse.json(
      {
        error:
          "Rules were not valid: each window needs a day (1–7, Monday first) and HH:MM start/end with start before end.",
      },
      { status: 400 }
    );
  }
  await saveAvailability(rules);
  const resolved = await resolveAvailability();
  return NextResponse.json({
    rules: resolved.rules,
    source: resolved.source,
    bookingOpen: resolved.rules.weeklyWindows.length > 0,
    envJson: JSON.stringify(resolved.rules),
  });
}
