/**
 * Google Apps Script trigger for single DOB reminder sending.
 *
 * Behavior:
 * - Runs on edit in sheet "PPF 2026 Registrations"
 * - If column P (Status przypomnienia DOB) is set to "Send"
 *   then calls Next.js endpoint POST /api/ppf/send-dob-reminder
 * - On success sets the same cell to "Sent"
 *
 * Setup:
 * 1) Open Google Sheet -> Extensions -> Apps Script
 * 2) Paste this file content
 * 3) Set constants below
 * 4) Add installable trigger for function "onEditPPFDobReminderStatus"
 */

const PPF_DOB_SHEET_NAME = "PPF 2026 Registrations";
const PPF_DOB_REMINDER_STATUS_COLUMN = 16; // P
const PPF_DOB_TICKET_ID_COLUMN = 2; // B
const PPF_DOB_SEND_VALUE = "Send";
const PPF_DOB_SENT_VALUE = "Sent";
const PPF_DOB_WAITING_VALUE = "Waiting";

// Update these before using.
const PPF_SINGLE_DOB_REMINDER_URL = "https://aspol.fr/api/ppf/send-dob-reminder";
const PPF_SINGLE_DOB_REMINDER_SECRET = "REPLACE_WITH_PPF_SEND_DOB_REMINDERS_SECRET";

function onEditPPFDobReminderStatus(e) {
  try {
    if (!e || !e.range) return;

    const range = e.range;
    const sheet = range.getSheet();

    if (sheet.getName() !== PPF_DOB_SHEET_NAME) return;
    if (range.getColumn() !== PPF_DOB_REMINDER_STATUS_COLUMN) return;
    if (range.getRow() <= 1) return;

    const newValue = String(e.value || "").trim();
    const oldValue = String(e.oldValue || "").trim();

    if (newValue !== PPF_DOB_SEND_VALUE) return;
    if (oldValue === PPF_DOB_SEND_VALUE) return;

    const ticketId = String(sheet.getRange(range.getRow(), PPF_DOB_TICKET_ID_COLUMN).getValue() || "").trim();
    if (!ticketId) {
      range.setNote("No ticket ID in column B - reminder skipped.");
      range.setValue(PPF_DOB_WAITING_VALUE);
      return;
    }

    const response = UrlFetchApp.fetch(PPF_SINGLE_DOB_REMINDER_URL, {
      method: "post",
      contentType: "application/json",
      muteHttpExceptions: true,
      payload: JSON.stringify({
        ticketId,
        secret: PPF_SINGLE_DOB_REMINDER_SECRET,
      }),
    });

    const statusCode = response.getResponseCode();
    const body = response.getContentText();

    if (statusCode >= 200 && statusCode < 300) {
      range.setValue(PPF_DOB_SENT_VALUE);
      range.setNote("DOB reminder sent at " + new Date().toISOString());
      return;
    }

    range.setValue(PPF_DOB_WAITING_VALUE);
    range.setNote("Reminder failed (" + statusCode + "): " + body);
  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    try {
      e.range.setValue(PPF_DOB_WAITING_VALUE);
      e.range.setNote("Trigger error: " + message);
    } catch (_ignored) {
      // no-op
    }
    Logger.log("onEditPPFDobReminderStatus error: " + message);
  }
}
