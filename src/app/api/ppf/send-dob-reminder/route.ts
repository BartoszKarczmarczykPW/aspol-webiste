import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createElement } from "react";
import {
  getPPFDobReminderRegistrationBySheetRow,
  getPPFDobReminderRegistrationByTicketId,
  markDobReminderAsSentBySheetRow,
  markDobReminderAsSent,
} from "@/lib/google-sheets";
import { PPFDobReminderTemplate } from "@/components/emails/PPFDobReminderTemplate";

interface RequestBody {
  ticketId?: unknown;
  sheetRow?: unknown;
  secret?: unknown;
}

export async function POST(req: NextRequest) {
  try {
    let body: RequestBody = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const allowedSecrets = [
      process.env.PPF_SEND_DOB_REMINDERS_SECRET,
      process.env.PPF_SEND_TICKET_SECRET,
    ].filter((value): value is string => typeof value === "string" && value.length > 0);

    if (allowedSecrets.length === 0) {
      console.error("Neither PPF_SEND_DOB_REMINDERS_SECRET nor PPF_SEND_TICKET_SECRET is set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (typeof body.secret !== "string" || !allowedSecrets.includes(body.secret)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof body.ticketId !== "string" || !body.ticketId.trim()) {
      return NextResponse.json({ error: "ticketId is required" }, { status: 400 });
    }

    const cleanTicketId = body.ticketId.trim();
    const parsedSheetRow =
      typeof body.sheetRow === "number" && Number.isInteger(body.sheetRow) && body.sheetRow >= 2
        ? body.sheetRow
        : null;

    const registration = parsedSheetRow
      ? await getPPFDobReminderRegistrationBySheetRow(parsedSheetRow)
      : await getPPFDobReminderRegistrationByTicketId(cleanTicketId);

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    if (registration.ticketId !== cleanTicketId) {
      return NextResponse.json(
        { error: "Ticket ID does not match selected sheet row" },
        { status: 409 }
      );
    }

    if (registration.status !== "Accepted") {
      return NextResponse.json(
        { error: "Reminder can be sent only for Accepted registrations" },
        { status: 409 }
      );
    }

    if (!registration.email) {
      return NextResponse.json({ error: "Recipient email is missing" }, { status: 409 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
      return NextResponse.json({ error: "Email configuration error" }, { status: 500 });
    }

    const baseFormUrl = (process.env.PPF_DOB_UPDATE_FORM_URL || "https://aspol.fr/ppf/dob-update").trim();
    const formUrl = `${baseFormUrl}?ticketId=${encodeURIComponent(cleanTicketId)}`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [registration.email],
      subject: `Your PPF registration requires immediate action - ${cleanTicketId}`,
      react: createElement(PPFDobReminderTemplate, {
        firstName: registration.firstName,
        lastName: registration.lastName,
        ticketId: cleanTicketId,
        formUrl,
      }),
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    if (parsedSheetRow) {
      await markDobReminderAsSentBySheetRow(parsedSheetRow);
    } else {
      await markDobReminderAsSent(cleanTicketId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-dob-reminder route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
