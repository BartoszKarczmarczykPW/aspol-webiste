import { config } from "dotenv";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

config({ path: ".env.local" });

const SHEET_TITLE = "PPF 2026 Registrations";
const COUNTRY_OF_BIRTH_HEADER = "Kraj urodzenia / Country of Birth";

async function main() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !sheetId) {
    throw new Error(
      "Missing Google Sheets credentials. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID."
    );
  }

  const jwt = new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(sheetId, jwt);
  await doc.loadInfo();

  const sheet = doc.sheetsByTitle[SHEET_TITLE];
  if (!sheet) {
    throw new Error(`Sheet not found: ${SHEET_TITLE}`);
  }

  await sheet.loadHeaderRow();

  const existingHeaders = (sheet.headerValues || [])
    .map((header) => header.trim())
    .filter(Boolean);

  if (existingHeaders.includes(COUNTRY_OF_BIRTH_HEADER)) {
    console.log(`Header already exists: ${COUNTRY_OF_BIRTH_HEADER}`);
    return;
  }

  const nextHeaders = [...existingHeaders, COUNTRY_OF_BIRTH_HEADER];

  if (sheet.columnCount < nextHeaders.length) {
    await sheet.resize({
      rowCount: sheet.rowCount,
      columnCount: nextHeaders.length,
    });
  }

  await sheet.setHeaderRow(nextHeaders);
  console.log(`Added header: ${COUNTRY_OF_BIRTH_HEADER}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
