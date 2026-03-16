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
  "Data rejestracji / Registration Date",
];

export async function addPPFRegistration(data: PPFRegistration): Promise<void> {
  const doc = await getDoc();
  const sheet = await getOrCreateSheet(doc, SHEET_TITLE, HEADERS);

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
