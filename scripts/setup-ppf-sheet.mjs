/**
 * PPF 2026 Registration — Google Sheet Setup Script
 *
 * Run once to initialize the spreadsheet with:
 *   - Proper headers & column widths
 *   - Frozen header row with bold formatting & background colour
 *   - Summary / stats formulas in a second sheet
 *
 * Usage:
 *   node scripts/setup-ppf-sheet.mjs
 *
 * Requires .env.local with GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID
 */

import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { readFileSync } from "fs";
import { resolve } from "path";

// ── Load .env.local manually (no dotenv dependency) ──────────────
const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
let currentKey = null;
let currentValue = "";

for (const line of envContent.split("\n")) {
  if (currentKey) {
    currentValue += "\n" + line;
    if (line.includes('"') || !line.trim()) {
      env[currentKey] = currentValue.replace(/^"|"$/g, "");
      currentKey = null;
      currentValue = "";
    }
    continue;
  }

  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;

  const eqIndex = trimmed.indexOf("=");
  if (eqIndex === -1) continue;

  const key = trimmed.slice(0, eqIndex).trim();
  let value = trimmed.slice(eqIndex + 1).trim();

  if (value.startsWith('"') && !value.endsWith('"')) {
    currentKey = key;
    currentValue = value;
    continue;
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
  }

  env[key] = value;
}

const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const rawKey = env.GOOGLE_PRIVATE_KEY;
const sheetId = env.GOOGLE_SHEET_ID;

if (!email || !rawKey || !sheetId) {
  console.error("❌ Missing credentials in .env.local");
  process.exit(1);
}

const key = rawKey.replace(/\\n/g, "\n");

// ── Google Sheets connection ─────────────────────────────────────
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const jwt = new JWT({ email, key, scopes: SCOPES });
const doc = new GoogleSpreadsheet(sheetId, jwt);

// Helper: batch update via REST API (google-spreadsheet v4 doesn't expose sheetsApi)
async function batchUpdate(requests) {
  await jwt.authorize();
  const token = jwt.credentials.access_token;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Batch update failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function main() {
  console.log("📊 Connecting to Google Sheets…");
  await doc.loadInfo();
  console.log(`   Spreadsheet: "${doc.title}"`);

  // ── 1. Registration sheet ───────────────────────────────────────
  await setupRegistrationSheet();

  // ── 2. Stats / dashboard sheet ──────────────────────────────────
  await setupStatsSheet();

  console.log("\n✅ Done! Sheet is ready for PPF 2026 registrations.");
}

// ── Registration sheet ───────────────────────────────────────────
const REG_TITLE = "PPF 2026 Registrations";
const REG_HEADERS = [
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
  "Status przypomnienia DOB",
  "Data urodzenia / Date of Birth",
];

const STATUS_HEADER = "Status wysyłki";
const STATUS_OPTIONS = ["Waiting", "Accepted", "Rejected"];
const DOB_REMINDER_STATUS_OPTIONS = ["", "Waiting", "Send", "Sent"];

const COLUMN_WIDTHS = [160, 160, 200, 180, 180, 260, 150, 220, 220, 220, 180, 180, 180, 150, 170, 170, 220];
const HEADER_ROW_HEIGHT = 42;
const DATA_ROW_HEIGHT = 34;

async function getConditionalFormatRuleCount(targetSheetId) {
  await jwt.authorize();
  const token = jwt.credentials.access_token;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets(properties(sheetId),conditionalFormats)`;
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unable to read conditional formats (${res.status}): ${text}`);
  }
  const data = await res.json();
  const targetSheet = data.sheets?.find((s) => s.properties?.sheetId === targetSheetId);
  return (targetSheet?.conditionalFormats || []).length;
}

async function resetAndApplyStatusConditionalFormatting(targetSheetId) {
  const count = await getConditionalFormatRuleCount(targetSheetId);
  if (count > 0) {
    const deleteRequests = [];
    for (let i = count - 1; i >= 0; i--) {
      deleteRequests.push({
        deleteConditionalFormatRule: {
          sheetId: targetSheetId,
          index: i,
        },
      });
    }
    await batchUpdate(deleteRequests);
  }

  const statusRange = {
    sheetId: targetSheetId,
    startRowIndex: 1,
    startColumnIndex: 0,
    endColumnIndex: 1,
  };

  await batchUpdate([
    {
      addConditionalFormatRule: {
        rule: {
          ranges: [statusRange],
          booleanRule: {
            condition: {
              type: "CUSTOM_FORMULA",
              values: [{ userEnteredValue: '=$A2="Waiting"' }],
            },
            format: {
              backgroundColor: { red: 1, green: 0.97, blue: 0.9 },
              textFormat: { foregroundColor: { red: 0.53, green: 0.38, blue: 0.12 }, bold: true },
            },
          },
        },
        index: 0,
      },
    },
    {
      addConditionalFormatRule: {
        rule: {
          ranges: [statusRange],
          booleanRule: {
            condition: {
              type: "CUSTOM_FORMULA",
              values: [{ userEnteredValue: '=$A2="Accepted"' }],
            },
            format: {
              backgroundColor: { red: 0.91, green: 0.97, blue: 0.92 },
              textFormat: { foregroundColor: { red: 0.1, green: 0.42, blue: 0.17 }, bold: true },
            },
          },
        },
        index: 1,
      },
    },
    {
      addConditionalFormatRule: {
        rule: {
          ranges: [statusRange],
          booleanRule: {
            condition: {
              type: "CUSTOM_FORMULA",
              values: [{ userEnteredValue: '=$A2="Rejected"' }],
            },
            format: {
              backgroundColor: { red: 0.98, green: 0.9, blue: 0.9 },
              textFormat: { foregroundColor: { red: 0.57, green: 0.15, blue: 0.15 }, bold: true },
            },
          },
        },
        index: 2,
      },
    },
  ]);
}

async function setupRegistrationSheet() {
  console.log("\n📝 Setting up registration sheet…");

  let sheet = doc.sheetsByTitle[REG_TITLE];

  if (sheet) {
    console.log("   Sheet already exists — reformatting…");
  } else {
    sheet = await doc.addSheet({
      title: REG_TITLE,
      headerValues: REG_HEADERS,
    });
    console.log("   Created sheet with headers.");
  }

  // Resize to exactly the number of columns we need
  await sheet.resize({ rowCount: sheet.rowCount, columnCount: REG_HEADERS.length });

  // Load header cells (row 1)
  const lastColLetter = String.fromCharCode(64 + REG_HEADERS.length);
  await sheet.loadCells(`A1:${lastColLetter}1`);

  // Set headers & format them
  for (let col = 0; col < REG_HEADERS.length; col++) {
    const cell = sheet.getCell(0, col);
    cell.value = REG_HEADERS[col];
    cell.textFormat = { bold: true, fontSize: 11 };
    cell.backgroundColor = { red: 0.12, green: 0.16, blue: 0.22, alpha: 1 }; // professional slate
    cell.textFormat = { bold: true, fontSize: 11, foregroundColorStyle: undefined };
    // White text on red bg
    cell.textFormat = {
      bold: true,
      fontSize: 11,
      foregroundColor: { red: 0.98, green: 0.99, blue: 1, alpha: 1 },
    };
    cell.horizontalAlignment = "CENTER";
    cell.wrapStrategy = "WRAP";
  }

  await sheet.saveUpdatedCells();

  // Set column widths via batch update
  const requests = COLUMN_WIDTHS.map((width, i) => ({
    updateDimensionProperties: {
      range: {
        sheetId: sheet.sheetId,
        dimension: "COLUMNS",
        startIndex: i,
        endIndex: i + 1,
      },
      properties: { pixelSize: width },
      fields: "pixelSize",
    },
  }));

  // Header and data row heights for better readability
  requests.push(
    {
      updateDimensionProperties: {
        range: {
          sheetId: sheet.sheetId,
          dimension: "ROWS",
          startIndex: 0,
          endIndex: 1,
        },
        properties: { pixelSize: HEADER_ROW_HEIGHT },
        fields: "pixelSize",
      },
    },
    {
      updateDimensionProperties: {
        range: {
          sheetId: sheet.sheetId,
          dimension: "ROWS",
          startIndex: 1,
          endIndex: sheet.rowCount,
        },
        properties: { pixelSize: DATA_ROW_HEIGHT },
        fields: "pixelSize",
      },
    }
  );

  // Freeze header row
  requests.push({
    updateSheetProperties: {
      properties: {
        sheetId: sheet.sheetId,
        gridProperties: { frozenRowCount: 1 },
      },
      fields: "gridProperties.frozenRowCount",
    },
  });

  // Add filter view on the header
  requests.push({
    setBasicFilter: {
      filter: {
        range: {
          sheetId: sheet.sheetId,
          startRowIndex: 0,
          startColumnIndex: 0,
          endColumnIndex: REG_HEADERS.length,
        },
      },
    },
  });

  // Clear old data validations from all columns (prevents stale dropdowns on moved columns)
  requests.push({
    repeatCell: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 1,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 0,
        endColumnIndex: REG_HEADERS.length,
      },
      cell: { dataValidation: null },
      fields: "dataValidation",
    },
  });

  // Consistent data typography and vertical alignment
  requests.push({
    repeatCell: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 1,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 0,
        endColumnIndex: REG_HEADERS.length,
      },
      cell: {
        userEnteredFormat: {
          textFormat: {
            fontFamily: "Calibri",
            fontSize: 10,
            foregroundColor: { red: 0.13, green: 0.16, blue: 0.2 },
          },
          verticalAlignment: "MIDDLE",
          horizontalAlignment: "LEFT",
          wrapStrategy: "CLIP",
        },
      },
      fields: "userEnteredFormat(textFormat,verticalAlignment,horizontalAlignment,wrapStrategy)",
    },
  });

  // Center key columns for cleaner scanning (status, ticket type, date)
  requests.push({
    repeatCell: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 1,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 0,
        endColumnIndex: 1,
      },
      cell: { userEnteredFormat: { horizontalAlignment: "CENTER" } },
      fields: "userEnteredFormat.horizontalAlignment",
    },
  });
  requests.push({
    repeatCell: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 1,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 2,
        endColumnIndex: 3,
      },
      cell: { userEnteredFormat: { horizontalAlignment: "CENTER" } },
      fields: "userEnteredFormat.horizontalAlignment",
    },
  });
  requests.push({
    repeatCell: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 1,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 14,
        endColumnIndex: 17,
      },
      cell: { userEnteredFormat: { horizontalAlignment: "CENTER" } },
      fields: "userEnteredFormat.horizontalAlignment",
    },
  });

  // Subtle table borders for improved visual structure
  requests.push({
    updateBorders: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 0,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 0,
        endColumnIndex: REG_HEADERS.length,
      },
      top: { style: "SOLID", width: 1, color: { red: 0.84, green: 0.87, blue: 0.91 } },
      bottom: { style: "SOLID", width: 1, color: { red: 0.84, green: 0.87, blue: 0.91 } },
      left: { style: "SOLID", width: 1, color: { red: 0.84, green: 0.87, blue: 0.91 } },
      right: { style: "SOLID", width: 1, color: { red: 0.84, green: 0.87, blue: 0.91 } },
      innerHorizontal: { style: "SOLID", width: 1, color: { red: 0.93, green: 0.95, blue: 0.97 } },
      innerVertical: { style: "SOLID", width: 1, color: { red: 0.93, green: 0.95, blue: 0.97 } },
    },
  });

  // Status dropdown in column A (index 0): Waiting / Accepted / Rejected
  requests.push({
    setDataValidation: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 1,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 0,
        endColumnIndex: 1,
      },
      rule: {
        condition: {
          type: "ONE_OF_LIST",
          values: STATUS_OPTIONS.map((option) => ({ userEnteredValue: option })),
        },
        strict: true,
        showCustomUi: true,
      },
    },
  });

  // DOB reminder status dropdown in column P (index 15): Waiting / Send / Sent
  requests.push({
    setDataValidation: {
      range: {
        sheetId: sheet.sheetId,
        startRowIndex: 1,
        endRowIndex: sheet.rowCount,
        startColumnIndex: 15,
        endColumnIndex: 16,
      },
      rule: {
        condition: {
          type: "ONE_OF_LIST",
          values: DOB_REMINDER_STATUS_OPTIONS.map((option) => ({ userEnteredValue: option })),
        },
        strict: true,
        showCustomUi: true,
      },
    },
  });

  await batchUpdate(requests);

  // Add alternating row colours (banding) — separate step to handle "already exists" gracefully
  try {
    await batchUpdate([{
      addBanding: {
        bandedRange: {
          range: {
            sheetId: sheet.sheetId,
            startRowIndex: 1,
            startColumnIndex: 0,
            endColumnIndex: REG_HEADERS.length,
          },
          rowProperties: {
            firstBandColorStyle: { rgbColor: { red: 1, green: 1, blue: 1 } },
            secondBandColorStyle: { rgbColor: { red: 0.97, green: 0.98, blue: 0.99 } },
          },
        },
      },
    }]);
  } catch {
    // Banding already exists — that's fine
  }

  // Backfill empty statuses so all existing rows have a valid default.
  const rows = await sheet.getRows();
  const rowsToUpdate = rows.filter((row) => !(row.get(STATUS_HEADER) || "").trim());
  for (const row of rowsToUpdate) {
    row.set(STATUS_HEADER, "Waiting");
    await row.save();
  }

  await resetAndApplyStatusConditionalFormatting(sheet.sheetId);

  console.log("   ✓ Headers, formatting, column widths, frozen row, banding & filter set.");
}

// ── Stats / Dashboard sheet ──────────────────────────────────────
const STATS_TITLE = "Dashboard";

async function setupStatsSheet() {
  console.log("\n📈 Setting up dashboard sheet…");

  let sheet = doc.sheetsByTitle[STATS_TITLE];

  if (sheet) {
    console.log("   Dashboard already exists — recreating…");
    await doc.deleteSheet(sheet.sheetId);
  }

  sheet = await doc.addSheet({ title: STATS_TITLE });
  await sheet.resize({ rowCount: 28, columnCount: 5 });

  const sid = sheet.sheetId;
  const reg = `'PPF 2026 Registrations'`;
  const cecSheetTitle = env.PPF_CEC_SHEET_TITLE || "CEC Workshop";
  const cec = `'${cecSheetTitle.replace(/'/g, "''")}'`;
  const SAT = "Sobota / Saturday only";
  const BOTH = "Oba dni / Both days";

  // ── Write values & formulas via values.update (USER_ENTERED) ──
  // NOTE: Use semicolons as argument separators (European locale spreadsheet)
  const gridData = [
    /* 0  */ ["PPF 2026 — Registration Dashboard", ""],
    /* 1  */ ["", ""],
    /* 2  */ ["Registration Overview", ""],
    /* 3  */ ["Total registrations:", `=COUNTA(${reg}!B:B)-1`],
    /* 4  */ ["Saturday only:", `=COUNTIF(${reg}!C:C;"${SAT}")`],
    /* 5  */ ["Both days (Fri + Sat):", `=COUNTIF(${reg}!C:C;"${BOTH}")`],
    /* 6  */ ["", ""],
    /* 7  */ ["Status Overview", ""],
    /* 8  */ ["Accepted:", `=COUNTIF(${reg}!A:A;"Accepted")`],
    /* 9  */ ["Waiting:", `=COUNTIF(${reg}!A:A;"Waiting")`],
    /* 10 */ ["Rejected:", `=COUNTIF(${reg}!A:A;"Rejected")`],
    /* 11 */ ["", ""],
    /* 12 */ ["Accepted by Ticket Type", ""],
    /* 13 */ ["Accepted (Both days):", `=COUNTIFS(${reg}!A:A;"Accepted";${reg}!C:C;"${BOTH}")`],
    /* 14 */ ["Accepted (Saturday only):", `=COUNTIFS(${reg}!A:A;"Accepted";${reg}!C:C;"${SAT}")`],
    /* 15 */ ["", ""],
    /* 16 */ ["Capacity", ""],
    /* 17 */ ["Friday limit:", 150],
    /* 18 */ ["Friday registered:", `=COUNTIF(${reg}!C:C;"${BOTH}")`],
    /* 19 */ ["Friday spots left:", `=B18-B19`],
    /* 20 */ ["Saturday limit:", 300],
    /* 21 */ ["Saturday registered:", `=COUNTA(${reg}!B:B)-1`],
    /* 22 */ ["Saturday spots left:", `=B21-B22`],
    /* 23 */ ["", ""],
    /* 24 */ ["CEC Workshop registrations:", `=IFERROR(MAX(COUNTA(${cec}!A:A)-1;0);0)`],
  ];

  // Write via values.update with USER_ENTERED (formulas parsed like user typing)
  await jwt.authorize();
  const token = jwt.credentials.access_token;
  const range = encodeURIComponent(`'${STATS_TITLE}'!A1:B25`);
  const valuesUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?valueInputOption=USER_ENTERED`;

  const valRes = await fetch(valuesUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: gridData }),
  });
  if (!valRes.ok) {
    const text = await valRes.text();
    throw new Error(`Values update failed (${valRes.status}): ${text}`);
  }
  console.log("   ✓ Values & formulas written.");

  // ── Formatting only via batchUpdate ──
  const requests = [];

  // Column widths
  requests.push(dimReq(sid, 0, 1, 280), dimReq(sid, 1, 2, 130));

  // Freeze header & hide gridlines
  requests.push({
    updateSheetProperties: {
      properties: {
        sheetId: sid,
        gridProperties: { frozenRowCount: 1, hideGridlines: true },
      },
      fields: "gridProperties.frozenRowCount,gridProperties.hideGridlines",
    },
  });

  // Title formatting (row 0)
  requests.push({
    repeatCell: {
      range: { sheetId: sid, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 2 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true, fontSize: 16, foregroundColor: { red: 0.14, green: 0.2, blue: 0.31 } },
        },
      },
      fields: "userEnteredFormat.textFormat",
    },
  });

  // Section headers bold (rows 2, 7, 12, 16)
  for (const row of [2, 7, 12, 16]) {
    requests.push({
      repeatCell: {
        range: { sheetId: sid, startRowIndex: row, endRowIndex: row + 1, startColumnIndex: 0, endColumnIndex: 1 },
        cell: {
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 12, foregroundColor: { red: 0.2, green: 0.24, blue: 0.31 } },
            backgroundColor: { red: 0.95, green: 0.97, blue: 1 },
          },
        },
        fields: "userEnteredFormat(textFormat,backgroundColor)",
      },
    });
  }

  // Bold + centre the value column B
  requests.push({
    repeatCell: {
      range: { sheetId: sid, startRowIndex: 3, endRowIndex: 25, startColumnIndex: 1, endColumnIndex: 2 },
      cell: {
        userEnteredFormat: {
          textFormat: { bold: true },
          horizontalAlignment: "CENTER",
        },
      },
      fields: "userEnteredFormat.textFormat,userEnteredFormat.horizontalAlignment",
    },
  });

  await batchUpdate(requests);

  console.log("   ✓ Dashboard with live formulas created.");
}

// ── Helpers ──────────────────────────────────────────────────────
function dimReq(sheetId, start, end, px) {
  return {
    updateDimensionProperties: {
      range: { sheetId, dimension: "COLUMNS", startIndex: start, endIndex: end },
      properties: { pixelSize: px },
      fields: "pixelSize",
    },
  };
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
