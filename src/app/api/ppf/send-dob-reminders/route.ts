import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createElement } from "react";
import { getAcceptedRegistrationsMissingDob } from "@/lib/google-sheets";
import { PPFDobReminderTemplate } from "@/components/emails/PPFDobReminderTemplate";

interface RequestBody {
  secret?: unknown;
  dryRun?: unknown;
  limit?: unknown;
}

export async function POST(req: NextRequest) {
  try {
    let body: RequestBody = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const expectedSecret = process.env.PPF_SEND_DOB_REMINDERS_SECRET;
    if (!expectedSecret) {
      console.error("PPF_SEND_DOB_REMINDERS_SECRET is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (typeof body.secret !== "string" || body.secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dryRun = Boolean(body.dryRun);
    const rawLimit = Number(body.limit);
    const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 1000) : undefined;

    const candidates = await getAcceptedRegistrationsMissingDob();
    const selected = typeof limit === "number" ? candidates.slice(0, limit) : candidates;

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        totalCandidates: candidates.length,
        selected: selected.length,
        preview: selected.slice(0, 10),
      });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
      return NextResponse.json({ error: "Email configuration error" }, { status: 500 });
    }

    const baseFormUrl = (process.env.PPF_DOB_UPDATE_FORM_URL || "https://aspol.fr/ppf/dob-update").trim();
    const resend = new Resend(process.env.RESEND_API_KEY);

    let sent = 0;
    const failed: Array<{ ticketId: string; email: string; reason: string }> = [];

    for (const row of selected) {
      const formUrl = `${baseFormUrl}?ticketId=${encodeURIComponent(row.ticketId)}`;

      const { error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: [row.email],
        subject: `PPF 2026 - Required security details by tomorrow 12:00 - ${row.ticketId}`,
        react: createElement(PPFDobReminderTemplate, {
          firstName: row.firstName,
          lastName: row.lastName,
          ticketId: row.ticketId,
          formUrl,
        }),
      });

      if (error) {
        failed.push({
          ticketId: row.ticketId,
          email: row.email,
          reason: typeof error.message === "string" ? error.message : "Email send failed",
        });
        continue;
      }

      sent += 1;
    }

    return NextResponse.json({
      success: true,
      totalCandidates: candidates.length,
      attempted: selected.length,
      sent,
      failedCount: failed.length,
      failed,
    });
  } catch (error) {
    console.error("send-dob-reminders route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
