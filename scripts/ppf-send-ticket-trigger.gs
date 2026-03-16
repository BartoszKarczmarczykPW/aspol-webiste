/**
 * Google Apps Script trigger for PPF ticket sending.
 *
 * Behavior:
 * - Runs when a cell is edited in sheet "PPF 2026 Registrations"
 * - If column A (Status wysylki) changes from anything to "Accepted"
 *   then calls Next.js endpoint POST /api/ppf/send-ticket
 * - Endpoint sends ticket email and confirms status in your backend logic
 *
 * Setup:
 * 1) Open Google Sheet -> Extensions -> Apps Script
 * 2) Paste this file content
 * 3) Set constants below
 * 4) Add installable trigger for function "onEditPPFStatus"
 */

const PPF_SHEET_NAME = "PPF 2026 Registrations";
const PPF_STATUS_COLUMN = 1; // A
const PPF_TICKET_ID_COLUMN = 2; // B
const PPF_ACCEPTED_VALUE = "Accepted";

// Update these two values before using.
const PPF_SEND_TICKET_URL = "https://aspol.fr/api/ppf/send-ticket";
const PPF_SEND_TICKET_SECRET = "2d44d0951ca64208a0401b6a8c83abdec17dfa6a53da46d1b06ba2e12b6c2345";

function onEditPPFStatus(e) {
  try {
    if (!e || !e.range) return;

    const range = e.range;
    const sheet = range.getSheet();

    if (sheet.getName() !== PPF_SHEET_NAME) return;
    if (range.getColumn() !== PPF_STATUS_COLUMN) return;
    if (range.getRow() <= 1) return; // skip header row

    const newValue = String(e.value || "").trim();
    const oldValue = String(e.oldValue || "").trim();

    // Send only on transition TO Accepted.
    if (newValue !== PPF_ACCEPTED_VALUE) return;
    if (oldValue === PPF_ACCEPTED_VALUE) return;

    const ticketId = String(sheet.getRange(range.getRow(), PPF_TICKET_ID_COLUMN).getValue() || "").trim();
    if (!ticketId) {
      range.setNote("No ticket ID in column B - send skipped.");
      return;
    }

    const response = UrlFetchApp.fetch(PPF_SEND_TICKET_URL, {
      method: "post",
      contentType: "application/json",
      muteHttpExceptions: true,
      payload: JSON.stringify({
        ticketId,
        secret: PPF_SEND_TICKET_SECRET,
      }),
    });

    const statusCode = response.getResponseCode();
    if (statusCode >= 200 && statusCode < 300) {
      range.setNote("Ticket sent successfully at " + new Date().toISOString());
    } else {
      const body = response.getContentText();
      range.setNote("Send failed (" + statusCode + "): " + body);
      // Optional rollback on failure:
      // range.setValue("Waiting");
    }
  } catch (err) {
    const message = err && err.message ? err.message : String(err);
    try {
      e.range.setNote("Trigger error: " + message);
    } catch (_ignored) {
      // no-op
    }
    Logger.log("onEditPPFStatus error: " + message);
  }
}
