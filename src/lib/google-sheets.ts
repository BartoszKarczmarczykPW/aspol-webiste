import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import type { PPFRegistration } from "@/types/ppf";
import type { TicketType } from "@/types/ppf";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function asSheetText(value: string): string {
  // Prevent formula injection/parsing in Google Sheets (e.g. "+48 ..." -> formula).
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function normalizeProfessionalStatus(value: string): string {
  switch ((value || "").trim().toLowerCase()) {
    case "student":
      return "Student";
    case "working":
      return "Working";
    case "other":
      return "Other";
    default:
      return value;
  }
}

function normalizeReturnPlans(value: string): string {
  switch ((value || "").trim().toLowerCase()) {
    case "yes":
      return "Yes";
    case "no":
      return "No";
    case "maybe":
      return "Maybe";
    default:
      return value;
  }
}

function normalizeTicketTypeFromSheet(value: string): TicketType {
  const normalized = (value || "").trim().toLowerCase();
  if (normalized.includes("both") || normalized.includes("oba")) {
    return "both-days";
  }
  return "saturday-only";
}

async function getDoc() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !sheetId) {
    throw new Error(
      "Missing Google Sheets credentials. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID."
    );
  }

  const jwt = new JWT({ email, key, scopes: SCOPES });
  const doc = new GoogleSpreadsheet(sheetId, jwt);
  await doc.loadInfo();
  return doc;
}

async function getOrCreateSheet(doc: GoogleSpreadsheet, title: string, headers: string[]) {
  let sheet = doc.sheetsByTitle[title];
  if (!sheet) {
    sheet = await doc.addSheet({ title, headerValues: headers });
  }
  return sheet;
}

async function ensureSheetHeaders(sheet: Awaited<ReturnType<typeof getOrCreateSheet>>, requiredHeaders: string[]) {
  await sheet.loadHeaderRow();
  const existingHeaders = (sheet.headerValues || []).map((header) => header.trim()).filter(Boolean);
  const missingHeaders = requiredHeaders.filter((header) => !existingHeaders.includes(header));

  if (missingHeaders.length > 0) {
    const nextHeaders = [...existingHeaders, ...missingHeaders];

    // `setHeaderRow` cannot write more headers than current sheet width.
    // Ensure enough columns exist before updating the header row.
    if (sheet.columnCount < nextHeaders.length) {
      await sheet.resize({
        rowCount: sheet.rowCount,
        columnCount: nextHeaders.length,
      });
    }

    await sheet.setHeaderRow(nextHeaders);
  }
}

const SHEET_TITLE = "PPF 2026 Registrations";
const HEADERS = [
  "Status wysyłki",
  "Ticket ID",
  "Ticket Type",
  "Imię / First Name",
  "Nazwisko / Last Name",
  "Email",
  "Telefon / Phone",
  "Uczelnia / University",
  "Kierunek / Field of Study",
  "Skąd o nas / How did you hear",
  "Obywatelstwo / Citizenship",
  "Status zawodowy / Professional Status",
  "Plany powrotu / Return Plans",
  "Zgoda RODO / GDPR Consent",
  "Data urodzenia / Date of Birth",
  "Status przypomnienia DOB",
  "Data rejestracji / Registration Date",
];

function normalizeForMatch(value: string): string {
  return (value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function toCellString(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function normalizeDobCellValue(value: unknown): string {
  const cleaned = toCellString(value)
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/^'+/, "")
    .trim();

  if (!cleaned) return "";

  const lowered = cleaned.toLowerCase();
  if (["-", "--", "—", "n/a", "na", "none", "null", "undefined", "brak"].includes(lowered)) {
    return "";
  }

  return cleaned;
}

export type PPFDobBackfillResult =
  | { ok: true }
  | {
      ok: false;
      reason: "NOT_FOUND" | "NOT_ACCEPTED" | "IDENTITY_MISMATCH";
    };

export interface PPFDobReminderCandidate {
  ticketId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface PPFDobReminderRegistration {
  ticketId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dateOfBirth: string;
  reminderStatus: string;
}

export async function addPPFRegistration(data: PPFRegistration): Promise<void> {
  const doc = await getDoc();
  const sheet = await getOrCreateSheet(doc, SHEET_TITLE, HEADERS);
  await ensureSheetHeaders(sheet, HEADERS);

  await sheet.addRow({
    "Ticket ID": data.ticketId,
    "Ticket Type": data.ticketType === "saturday-only" ? "Sobota / Saturday only" : "Oba dni / Both days",
    "Imię / First Name": data.firstName,
    "Nazwisko / Last Name": data.lastName,
    "Email": data.email,
    "Telefon / Phone": data.phone ? asSheetText(data.phone) : "",
    "Uczelnia / University": data.university || "",
    "Kierunek / Field of Study": data.fieldOfStudy || "",
    "Skąd o nas / How did you hear": data.howDidYouHear || "",
    "Obywatelstwo / Citizenship": data.citizenship,
    "Status zawodowy / Professional Status": normalizeProfessionalStatus(data.professionalStatus),
    "Plany powrotu / Return Plans": normalizeReturnPlans(data.returnPlans),
    "Zgoda RODO / GDPR Consent": data.gdprConsent ? "Tak / Yes" : "Nie / No",
    "Data urodzenia / Date of Birth": data.dateOfBirth,
    "Status przypomnienia DOB": "",
    "Data rejestracji / Registration Date": data.registrationDate,
    "Status wysyłki": "Waiting",
  });
}

export async function getPPFRegistrationByTicketId(ticketId: string): Promise<{
  firstName: string;
  lastName: string;
  email: string;
  ticketType: TicketType;
  status: string;
} | null> {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) return null;

  const rows = await sheet.getRows();
  const row = rows.find((r) => (r.get("Ticket ID") || "") === ticketId);
  if (!row) return null;

  return {
    firstName: row.get("Imię / First Name") || "",
    lastName: row.get("Nazwisko / Last Name") || "",
    email: row.get("Email") || "",
    ticketType: normalizeTicketTypeFromSheet(row.get("Ticket Type") || ""),
    status: row.get("Status wysyłki") || "",
  };
}

export async function markTicketAsSent(ticketId: string): Promise<void> {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) throw new Error("Registration sheet not found");

  const rows = await sheet.getRows();
  const row = rows.find((r) => (r.get("Ticket ID") || "") === ticketId);
  if (!row) throw new Error(`Ticket ${ticketId} not found`);

  row.set("Status wysyłki", "Accepted");
  await row.save();
}

export async function getPPFRegistrationCounts(): Promise<{
  saturdayOnly: number;
  bothDays: number;
  totalFriday: number;
  totalSaturday: number;
}> {
  const doc = await getDoc();

  let sheet;
  try {
    sheet = doc.sheetsByTitle[SHEET_TITLE];
  } catch {
    // Sheet doesn't exist yet
  }

  if (!sheet) {
    return { saturdayOnly: 0, bothDays: 0, totalFriday: 0, totalSaturday: 0 };
  }

  const rows = await sheet.getRows();

  let saturdayOnly = 0;
  let bothDays = 0;

  for (const row of rows) {
    const ticketType = row.get("Ticket Type") || "";
    if (ticketType.includes("Sobota") || ticketType.includes("Saturday only")) {
      saturdayOnly++;
    } else {
      bothDays++;
    }
  }

  return {
    saturdayOnly,
    bothDays,
    totalFriday: bothDays,
    totalSaturday: saturdayOnly + bothDays,
  };
}

export async function isPPFEmailRegistered(email: string): Promise<boolean> {
  const doc = await getDoc();

  let sheet;
  try {
    sheet = doc.sheetsByTitle[SHEET_TITLE];
  } catch {
    return false;
  }

  if (!sheet) return false;

  const rows = await sheet.getRows();
  return rows.some(
    (row) => (row.get("Email") || "").toLowerCase() === email.toLowerCase()
  );
}

export async function getCECWorkshopRegistrationsCount(): Promise<number> {
  const doc = await getDoc();
  const cecSheetTitle = process.env.PPF_CEC_SHEET_TITLE || "CEC Workshop";

  let sheet;
  try {
    sheet = doc.sheetsByTitle[cecSheetTitle];
  } catch {
    return 0;
  }

  if (!sheet) return 0;

  const rows = await sheet.getRows();
  return rows.length;
}

export async function backfillPPFDateOfBirthForAcceptedRegistration(input: {
  ticketId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}): Promise<PPFDobBackfillResult> {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) {
    return { ok: false, reason: "NOT_FOUND" };
  }

  const rows = await sheet.getRows();
  const row = rows.find((r) => (r.get("Ticket ID") || "").trim() === input.ticketId.trim());
  if (!row) {
    return { ok: false, reason: "NOT_FOUND" };
  }

  const status = (row.get("Status wysyłki") || "").trim();
  if (status !== "Accepted") {
    return { ok: false, reason: "NOT_ACCEPTED" };
  }

  const firstNameMatches =
    normalizeForMatch(row.get("Imię / First Name") || "") === normalizeForMatch(input.firstName);
  const lastNameMatches =
    normalizeForMatch(row.get("Nazwisko / Last Name") || "") === normalizeForMatch(input.lastName);
  const emailMatches =
    normalizeForMatch(row.get("Email") || "") === normalizeForMatch(input.email);

  if (!firstNameMatches || !lastNameMatches || !emailMatches) {
    return { ok: false, reason: "IDENTITY_MISMATCH" };
  }

  row.set("Data urodzenia / Date of Birth", input.dateOfBirth.trim());
  await row.save();

  return { ok: true };
}

export async function getAcceptedRegistrationsMissingDob(): Promise<PPFDobReminderCandidate[]> {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) return [];

  const rows = await sheet.getRows();

  return rows
    .filter((row) => {
      const status = (row.get("Status wysyłki") || "").trim();
      const dob = normalizeDobCellValue(row.get("Data urodzenia / Date of Birth"));
      const reminderStatus = (row.get("Status przypomnienia DOB") || "").trim();
      const email = (row.get("Email") || "").trim();
      const ticketId = (row.get("Ticket ID") || "").trim();
      return (
        status === "Accepted" &&
        !dob &&
        reminderStatus !== "Sent" &&
        !!email &&
        !!ticketId
      );
    })
    .map((row) => ({
      ticketId: (row.get("Ticket ID") || "").trim(),
      firstName: (row.get("Imię / First Name") || "").trim(),
      lastName: (row.get("Nazwisko / Last Name") || "").trim(),
      email: (row.get("Email") || "").trim(),
    }));
}

export async function getPPFDobReminderRegistrationByTicketId(
  ticketId: string
): Promise<PPFDobReminderRegistration | null> {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) return null;

  const rows = await sheet.getRows();
  const cleanTicketId = ticketId.trim();
  const matchingRows = rows.filter((r) => (r.get("Ticket ID") || "").trim() === cleanTicketId);
  if (matchingRows.length === 0) return null;

  // Prefer the newest row that still needs DOB reminder.
  const row =
    [...matchingRows]
      .reverse()
      .find((r) => {
        const status = (r.get("Status wysyłki") || "").trim();
        const dob = normalizeDobCellValue(r.get("Data urodzenia / Date of Birth"));
        return status === "Accepted" && !dob;
      }) ||
    [...matchingRows]
      .reverse()
      .find((r) => !normalizeDobCellValue(r.get("Data urodzenia / Date of Birth"))) ||
    matchingRows[matchingRows.length - 1];

  if (!row) return null;

  return {
    ticketId: (row.get("Ticket ID") || "").trim(),
    firstName: (row.get("Imię / First Name") || "").trim(),
    lastName: (row.get("Nazwisko / Last Name") || "").trim(),
    email: (row.get("Email") || "").trim(),
    status: (row.get("Status wysyłki") || "").trim(),
    dateOfBirth: normalizeDobCellValue(row.get("Data urodzenia / Date of Birth")),
    reminderStatus: (row.get("Status przypomnienia DOB") || "").trim(),
  };
}

export async function getPPFDobReminderRegistrationBySheetRow(
  sheetRow: number
): Promise<PPFDobReminderRegistration | null> {
  if (!Number.isInteger(sheetRow) || sheetRow < 2) return null;

  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) return null;

  const rows = await sheet.getRows();
  const row = rows.find((r) => r.rowNumber === sheetRow);
  if (!row) return null;

  return {
    ticketId: (row.get("Ticket ID") || "").trim(),
    firstName: (row.get("Imię / First Name") || "").trim(),
    lastName: (row.get("Nazwisko / Last Name") || "").trim(),
    email: (row.get("Email") || "").trim(),
    status: (row.get("Status wysyłki") || "").trim(),
    dateOfBirth: normalizeDobCellValue(row.get("Data urodzenia / Date of Birth")),
    reminderStatus: (row.get("Status przypomnienia DOB") || "").trim(),
  };
}

export async function markDobReminderAsSent(ticketId: string): Promise<void> {
  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) throw new Error("Registration sheet not found");

  const rows = await sheet.getRows();
  const cleanTicketId = ticketId.trim();
  const matchingRows = rows.filter((r) => (r.get("Ticket ID") || "").trim() === cleanTicketId);
  const row =
    [...matchingRows]
      .reverse()
      .find((r) => {
        const status = (r.get("Status wysyłki") || "").trim();
        const dob = normalizeDobCellValue(r.get("Data urodzenia / Date of Birth"));
        return status === "Accepted" && !dob;
      }) ||
    matchingRows[matchingRows.length - 1];

  if (!row) throw new Error(`Ticket ${ticketId} not found`);

  row.set("Status przypomnienia DOB", "Sent");
  await row.save();
}

export async function markDobReminderAsSentBySheetRow(sheetRow: number): Promise<void> {
  if (!Number.isInteger(sheetRow) || sheetRow < 2) {
    throw new Error(`Invalid sheet row: ${sheetRow}`);
  }

  const doc = await getDoc();
  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) throw new Error("Registration sheet not found");

  const rows = await sheet.getRows();
  const row = rows.find((r) => r.rowNumber === sheetRow);
  if (!row) throw new Error(`Sheet row ${sheetRow} not found`);

  row.set("Status przypomnienia DOB", "Sent");
  await row.save();
}
