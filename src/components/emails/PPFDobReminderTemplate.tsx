import * as React from "react";

interface PPFDobReminderTemplateProps {
  firstName: string;
  lastName: string;
  ticketId: string;
  formUrl: string;
}

export function PPFDobReminderTemplate({
  firstName,
  lastName,
  ticketId,
  formUrl,
}: PPFDobReminderTemplateProps) {
  const preheader = `PPF 2026 required security details missing - ${ticketId}`;

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#f2f5f9",
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

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 12px" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 14,
          border: "1px solid #d7e0ea",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
          overflow: "hidden",
        }}
      >
        <div style={{ backgroundColor: "#143d73", padding: "26px 28px 20px" }}>
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
              fontSize: 30,
              lineHeight: 1.14,
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
            April 18, 2026 - Paris, France
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
            Required participant update
          </p>
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
              fontSize: 34,
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: -0.6,
              lineHeight: 1.08,
            }}
          >
            {firstName} {lastName}
          </p>

          <div
            style={{
              marginTop: 18,
              backgroundColor: "#fff1f2",
              border: "1px solid #fecdd3",
              borderRadius: 12,
              padding: "14px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#9f1239",
                fontWeight: 700,
                lineHeight: 1.55,
                textTransform: "uppercase",
                letterSpacing: 0.4,
              }}
            >
              Action required before event entry
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#881337", lineHeight: 1.6 }}>
              Please complete your date of birth and country of birth for security reasons.
              This is mandatory for Embassy access.
            </p>

            <div
              style={{
                marginTop: 10,
                backgroundColor: "#7f1d1d",
                border: "1px solid #991b1b",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.3,
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Deadline: Tomorrow 12:00 (Paris time)
              </p>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "#fee2e2", lineHeight: 1.5 }}>
                PL: Termin: jutro o 12:00 (czas paryski) | FR: Date limite: demain a 12:00 (heure de Paris)
              </p>
            </div>

            <table style={{ width: "100%", marginTop: 12, borderCollapse: "separate" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#d71921",
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    <a
                      href={formUrl}
                      style={{
                        display: "block",
                        padding: "14px 18px",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontSize: 16,
                        fontWeight: 800,
                        lineHeight: 1.25,
                        letterSpacing: 0.2,
                      }}
                    >
                      Complete Required Details Now
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p style={{ margin: "10px 0 0", fontSize: 12, color: "#881337", lineHeight: 1.6 }}>
              If the button does not work, use this direct link: {" "}
              <a href={formUrl} style={{ color: "#0b5cab", textDecoration: "underline", fontWeight: 700 }}>
                {formUrl}
              </a>
            </p>
          </div>

          <p style={{ margin: "18px 0 0", color: "#334155", lineHeight: 1.65, fontSize: 13 }}>
            We need your date of birth and country of birth to finalize your access list for the event at the Polish Embassy in Paris.
            For security reasons, both fields are mandatory.
          </p>

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
            <p
              style={{
                margin: 0,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.1,
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
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

          <div style={{ borderTop: "1px solid #e2e8f0", margin: "22px 0 0" }} />

          <p style={{ margin: "18px 0 0", fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
            <span style={{ fontWeight: 700 }}>EN:</span>{" "}
            Please provide your date of birth and country of birth for security reasons.
            Deadline: tomorrow at 12:00 (Paris time).
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
            <span style={{ fontWeight: 700 }}>PL:</span>{" "}
            Potrzebujemy daty urodzenia i kraju urodzenia ze wzgledow bezpieczenstwa.
            Deadline: jutro o 12:00 (czas paryski).
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
            <span style={{ fontWeight: 700 }}>FR:</span>{" "}
            Nous avons besoin de votre date de naissance et de votre pays de naissance pour des raisons de securite.
            Date limite: demain a 12:00 (heure de Paris).
          </p>

          <div
            style={{
              marginTop: 20,
              backgroundColor: "#f6f9fd",
              border: "1px solid #d8e4f0",
              borderRadius: 10,
              padding: "12px 14px",
            }}
          >
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
              Need help?
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "#334155", lineHeight: 1.6 }}>
              Contact us at {" "}
              <a href="mailto:office@aspol.fr" style={{ color: "#0b5cab", textDecoration: "underline", fontWeight: 700 }}>
                office@aspol.fr
              </a>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
