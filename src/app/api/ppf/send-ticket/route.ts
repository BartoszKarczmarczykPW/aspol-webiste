import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createElement } from "react";
import {
  getCECWorkshopRegistrationsCount,
  getPPFRegistrationByTicketId,
  markTicketAsSent,
} from "@/lib/google-sheets";
import { PPFConfirmationTemplate } from "@/components/emails/PPFConfirmationTemplate";

/**
 * POST /api/ppf/send-ticket
 *
 * Called by the Google Apps Script trigger when "Status wysyłki" is set
 * to "Accepted" in the Google Sheets spreadsheet. Sends the confirmation
 * email ticket to the registrant, then keeps status as "Accepted".
 *
 * Body: { ticketId: string, secret: string }
 */
export async function POST(req: NextRequest) {
  try {
    let body: { ticketId?: unknown; secret?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { ticketId, secret } = body;

    // Validate secret
    const expectedSecret = process.env.PPF_SEND_TICKET_SECRET;
    if (!expectedSecret) {
      console.error("PPF_SEND_TICKET_SECRET is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (typeof secret !== "string" || secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (typeof ticketId !== "string" || !ticketId.trim()) {
      return NextResponse.json({ error: "ticketId is required" }, { status: 400 });
    }

    const cleanTicketId = ticketId.trim();

    // Look up the registration
    const registration = await getPPFRegistrationByTicketId(cleanTicketId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const { firstName, lastName, email, ticketType, status } = registration;
    const cecWorkshopMax = Number(process.env.PPF_CEC_WORKSHOP_MAX || 40);
    const cecRegistrationsCount = await getCECWorkshopRegistrationsCount();
    const showCECWorkshopLink =
      ticketType === "both-days" && cecRegistrationsCount < cecWorkshopMax;

    if (status !== "Accepted") {
      return NextResponse.json(
        { error: "Ticket can be sent only for Accepted registrations" },
        { status: 409 }
      );
    }

    // Send the confirmation email with ticket
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
      return NextResponse.json({ error: "Email configuration error" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [email],
      subject: `✅ PPF 2026 — Potwierdzenie / Confirmation — ${cleanTicketId}`,
      react: createElement(PPFConfirmationTemplate, {
        firstName,
        lastName,
        ticketId: cleanTicketId,
        ticketType,
        showCECWorkshopLink,
      }),
    });

    if (emailError) {
      console.error("Failed to send PPF ticket email:", emailError);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    // Mark as sent in Google Sheets
    await markTicketAsSent(cleanTicketId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-ticket route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
