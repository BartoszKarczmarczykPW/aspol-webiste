import * as React from "react";
import type { TicketType } from "@/types/ppf";
import type { CSSProperties } from "react";

interface PPFConfirmationTemplateProps {
  firstName: string;
  lastName: string;
  ticketId: string;
  ticketType: TicketType;
}

export function PPFConfirmationTemplate({
  firstName,
  lastName,
  ticketId,
  ticketType,
}: PPFConfirmationTemplateProps) {
  const isBothDays = ticketType === "both-days";

  const ticketLabelPL = isBothDays ? "Piatek + Sobota" : "Sobota";
  const ticketLabelFR = isBothDays ? "Vendredi + Samedi" : "Samedi";
  const ticketLabelEN = isBothDays ? "Friday + Saturday" : "Saturday";
  const dates = isBothDays ? "April 17-18, 2026" : "April 18, 2026";
  const preheader = `PPF 2026 confirmation for ${firstName} ${lastName} - ${ticketId}`;

  const infoCardCell: CSSProperties = {
    verticalAlign: "top",
    border: "1px solid #d4dee9",
    borderRadius: 12,
    backgroundColor: "#f7fafe",
    padding: "16px 16px 14px",
    height: 124,
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#eef3f9",
        color: "#111827",
      }}
    >
      <div
        style={{
          display: "none",
          fontSize: 1,
          color: "#eef3f9",
          lineHeight: 1,
          maxHeight: 0,
          maxWidth: 0,
          opacity: 0,
          overflow: "hidden",
        }}
      >
        {preheader}
      </div>

      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #d7e0ea",
            boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              backgroundColor: "#143d73",
              padding: "26px 28px 20px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top" }}>
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: 1.8,
                        color: "rgba(255,255,255,0.72)",
                        fontWeight: 700,
                      }}
                    >
                      ASPOL
                    </p>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: 34,
                        lineHeight: 1.12,
                        color: "#ffffff",
                        fontWeight: 800,
                        letterSpacing: -0.2,
                      }}
                    >
                      Paris Polish Forum 2026
                    </h1>
                    <p
                      style={{
                        margin: "10px 0 0",
                        color: "rgba(255,255,255,0.84)",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {dates} - Paris, France
                    </p>
                    <p
                      style={{
                        margin: "8px 0 0",
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: 0.8,
                        textTransform: "uppercase",
                      }}
                    >
                      Registration confirmation
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ height: 4, backgroundColor: "#d71921" }} />

          <div style={{ padding: "28px" }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              Attendee
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 36,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: -0.6,
                lineHeight: 1.06,
              }}
            >
              {firstName} {lastName}
            </p>

            <div style={{ marginTop: 24 }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
                <tbody>
                  <tr>
                    <td style={{ width: "50%", paddingRight: 6, verticalAlign: "top" }}>
                      <div style={infoCardCell}>
                        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.9, color: "#64748b" }}>
                          Ticket type
                        </p>
                        <p style={{ margin: "9px 0 0", fontSize: 20, fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: -0.2 }}>
                          {ticketLabelEN}
                        </p>
                        <p style={{ margin: "8px 0 0", fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
                          PL: {ticketLabelPL}
                          <br />
                          FR: {ticketLabelFR}
                        </p>
                      </div>
                    </td>
                    <td style={{ width: "50%", paddingLeft: 6, verticalAlign: "top" }}>
                      <div style={infoCardCell}>
                        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.9, color: "#64748b" }}>
                          Date
                        </p>
                        <p style={{ margin: "9px 0 0", fontSize: 20, fontWeight: 700, color: "#0f172a", lineHeight: 1.2, letterSpacing: -0.2 }}>{dates}</p>
                        <p style={{ margin: "8px 0 0", fontSize: 12, color: "#475569", lineHeight: 1.5 }}>
                          Paris, France
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              style={{
                marginTop: 20,
                backgroundColor: "#ffffff",
                border: "1px solid #cfd9e4",
                borderRadius: 12,
                padding: "18px 20px 17px",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "#64748b" }}>
                Ticket ID
              </p>
              <p
                style={{
                  margin: "7px 0 0",
                  fontSize: 30,
                  fontWeight: 800,
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: 0.6,
                  color: "#d71921",
                }}
              >
                {ticketId}
              </p>
            </div>

            <div style={{ marginTop: 18, textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#e8f8ef",
                  border: "1px solid #bee9ce",
                  borderRadius: 100,
                  padding: "7px 16px",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: "#137c3c",
                    display: "inline-block",
                  }}
                />
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#137c3c", letterSpacing: 0.6, textTransform: "uppercase" }}>
                  Registration confirmed
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #e2e8f0", margin: "0 28px" }} />

          <div style={{ padding: "24px 28px 28px" }}>
            <p
              style={{
                margin: 0,
                fontSize: 15,
                color: "#0f172a",
                lineHeight: 1.65,
                fontWeight: 700,
              }}
            >
              Hello {firstName},
            </p>
            <p
              style={{
                margin: "12px 0 0",
                fontSize: 13,
                color: "#334155",
                lineHeight: 1.68,
              }}
            >
              <span style={{ fontWeight: 700 }}>EN:</span>{" "}
              Your registration for Paris Polish Forum 2026 is confirmed.
              Please show this email at the event entrance.
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13,
                color: "#334155",
                lineHeight: 1.68,
              }}
            >
              <span style={{ fontWeight: 700 }}>PL:</span>{" "}
              Twoja rejestracja na Paris Polish Forum 2026 zostala potwierdzona.
              Pokaz ten email przy wejsciu na wydarzenie.
            </p>
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 13,
                color: "#334155",
                lineHeight: 1.68,
              }}
            >
              <span style={{ fontWeight: 700 }}>FR:</span>{" "}
              Votre inscription au Paris Polish Forum 2026 a ete confirmee.
              Presentez cet email a l'entree de l'evenement.
            </p>

            <div
              style={{
                marginTop: 20,
                backgroundColor: "#fff6f6",
                border: "1px solid #f3cccc",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#b91c1c",
                  fontWeight: 700,
                  lineHeight: 1.55,
                }}
              >
                Save this email - it is your entry ticket
              </p>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 12,
                  color: "#475569",
                  lineHeight: 1.6,
                }}
              >
                PL: Zapisz ten email - jest Twoim biletem wstepu
                <br />
                FR: Sauvegardez cet email - c'est votre billet d'entree
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "18px 0 0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0 0 6px",
              fontSize: 13,
              fontWeight: 700,
              color: "#334155",
              letterSpacing: 1.1,
            }}
          >
            ASPOL
          </p>
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 11,
              color: "#64748b",
            }}
          >
            Association des Etudiants Polonais en France
          </p>
          <p style={{ margin: 0, fontSize: 12 }}>
            <a
              href="https://aspol.fr"
              style={{
                color: "#d71921",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              aspol.fr
            </a>
            <span style={{ color: "#94a3b8", margin: "0 10px" }}>&bull;</span>
            <a
              href="https://instagram.com/aspolska"
              style={{
                color: "#475569",
                textDecoration: "none",
              }}
            >
              @aspolska
            </a>
            <span style={{ color: "#94a3b8", margin: "0 10px" }}>&bull;</span>
            <a
              href="https://facebook.com/aspologne"
              style={{
                color: "#475569",
                textDecoration: "none",
              }}
            >
              @aspologne
            </a>
            <span style={{ color: "#94a3b8", margin: "0 10px" }}>&bull;</span>
            <a
              href="https://linkedin.com/company/aspol-association-des-%C3%A9tudiants-polonais-en-france"
              style={{
                color: "#475569",
                textDecoration: "none",
              }}
            >
              LinkedIn
            </a>
          </p>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 10,
              color: "#94a3b8",
            }}
          >
            &copy; 2026 ASPOL. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
