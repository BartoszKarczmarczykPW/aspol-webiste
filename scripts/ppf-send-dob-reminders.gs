/**
 * Manual Google Apps Script action for DOB reminder campaign.
 *
 * Usage:
 * 1) Open the target sheet -> Extensions -> Apps Script
 * 2) Paste this file
 * 3) Set URL + SECRET
 * 4) Run sendDobReminders() manually whenever you want
 */

const PPF_DOB_REMINDERS_URL = "https://aspol.fr/api/ppf/send-dob-reminders";
const PPF_DOB_REMINDERS_SECRET = "REPLACE_WITH_PPF_SEND_DOB_REMINDERS_SECRET";

function sendDobRemindersDryRun() {
  return callDobRemindersEndpoint(true, 25);
}

function sendDobReminders() {
  return callDobRemindersEndpoint(false);
}

function callDobRemindersEndpoint(dryRun, limit) {
  const payload = {
    secret: PPF_DOB_REMINDERS_SECRET,
    dryRun: Boolean(dryRun),
  };

  if (typeof limit === "number" && limit > 0) {
    payload.limit = limit;
  }

  const response = UrlFetchApp.fetch(PPF_DOB_REMINDERS_URL, {
    method: "post",
    contentType: "application/json",
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  });

  const code = response.getResponseCode();
  const body = response.getContentText();

  Logger.log("DOB reminders response code: " + code);
  Logger.log("DOB reminders response body: " + body);

  if (code < 200 || code >= 300) {
    throw new Error("DOB reminders failed: " + code + " " + body);
  }

  return JSON.parse(body);
}
