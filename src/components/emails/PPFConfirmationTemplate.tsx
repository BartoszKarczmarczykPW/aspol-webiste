import * as React from "react";
import type { TicketType } from "@/types/ppf";
import type { CSSProperties } from "react";

interface PPFConfirmationTemplateProps {
  firstName: string;
  lastName: string;
  ticketId: string;
  ticketType: TicketType;
  showCECWorkshopLink?: boolean;
}

export function PPFConfirmationTemplate({
  firstName,
  lastName,
  ticketId,
  ticketType,
  showCECWorkshopLink,
}: PPFConfirmationTemplateProps) {
  const isBothDays = ticketType === "both-days";
  const cecWorkshopFormUrl =
    process.env.PPF_CEC_WORKSHOP_FORM_URL?.trim() ||
    "https://forms.gle/XCjeG1SXpUDSQN5d7";
  const shouldShowCECWorkshopLink =
    typeof showCECWorkshopLink === "boolean"
      ? showCECWorkshopLink
      : isBothDays;

  const ticketLabelPL = isBothDays ? "Piatek + Sobota" : "Sobota";
  const ticketLabelFR = isBothDays ? "Vendredi + Samedi" : "Samedi";
  const ticketLabelEN = isBothDays ? "Friday + Saturday" : "Saturday";
  const dates = isBothDays ? "April 17-18, 2026" : "April 18, 2026";
  const preheader = `PPF 2026 confirmation for ${firstName} ${lastName} - ${ticketId}`;
  const embassyMapUrl = "https://www.google.com/maps/search/?api=1&query=Ambassade+de+Pologne+Paris+Rue+Saint-Dominique";
  const panMapUrl = "https://www.google.com/maps/search/?api=1&query=Stacja+Naukowa+PAN+Paris";

  const fridayAgenda = [
    "17:00-17:20 Registration (only for participants registered for workshops)",
    "17:20-18:30 Workshop by CEC group (Claudie-Marie Smolen, Aleksandra Kielan)",
    "18:40-19:10 Registration and refreshments (hot drinks: tea/coffee)",
    "19:15-19:40 Official Opening Ceremony",
    "19:40-20:40 Green Intelligence: Can AI Save the Climate? (Michał Szczepański, Maxime Moisson; Moderator: Zofia Gostkowska)",
    "20:40-22:00 Networking Session (wine served)",
  ];

  const saturdayAfternoonAgenda = [
    "14:00-14:30 Reception",
    "14:30-14:45 Official Opening of Day Two (embassy representative + ASPOL presidents)",
    "14:45-16:00 The War of Words: Disinformation, Propaganda, and Information Security (Maja Czarnecka, Philippe Moreau-Chevrolet, Michał Piękoś, Aleksandra Kielan)",
    "16:00-16:30 Refreshments (hot drinks: tea/coffee)",
    "16:35-17:00 Fireside Chat with Wiesław Tarka",
    "17:00-18:00 Keynote Speaker by Arancha González: Can Europe be a geopolitical actor? (followed by interactive Q&A)",
  ];

  const saturdayEveningAgenda = [
    "18:00-18:30 Concert by Tempo Chopin",
    "18:30-19:30 United Europe of Innovation (Rafał Kierzenkowski, Bartosz Mierzwa; Moderator: Weronika Nitecka)",
    "19:30-19:45 Official Closing (Acknowledgements)",
    "19:45-22:00 Networking (aperitifs and full dinner)",
  ];

  const infoCardCell: CSSProperties = {
    verticalAlign: "top",
    border: "1px solid #d4dee9",
    borderRadius: 12,
    backgroundColor: "#f7fafe",
    padding: "16px 16px 14px",
    height: 128,
  };

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

      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "24px 12px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #d7e0ea",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
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
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.9 }}>
                Ticket details
              </p>
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

            <div style={{ marginTop: 18 }}>
              <table style={{ margin: "0 auto", borderCollapse: "separate" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#e8f8ef",
                        border: "1px solid #bee9ce",
                        borderRadius: 100,
                        padding: "7px 14px",
                        color: "#137c3c",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      Registration confirmed
                    </td>
                  </tr>
                </tbody>
              </table>
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
              Presentez cet email a l&apos;entree de l&apos;evenement.
            </p>

            {shouldShowCECWorkshopLink && cecWorkshopFormUrl ? (
              <div
                style={{
                  marginTop: 16,
                  backgroundColor: "#eef4ff",
                  border: "1px solid #9ec5fe",
                  borderRadius: 12,
                  padding: "14px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.9,
                    textTransform: "uppercase",
                    color: "#1d4ed8",
                  }}
                >
                  Additional registration
                </p>

                <p style={{ margin: "5px 0 0", fontSize: 16, fontWeight: 800, color: "#0f172a", lineHeight: 1.35 }}>
                  Register for the CEC Group workshop
                </p>

                <p style={{ margin: "8px 0 0", fontSize: 12, color: "#334155", lineHeight: 1.65 }}>
                  This workshop is available for <span style={{ fontWeight: 700 }}>Both Days ticket holders</span> and places are limited.
                  Complete the form now to secure your spot.
                </p>

                <table style={{ marginTop: 12, borderCollapse: "separate" }}>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          backgroundColor: "#1d4ed8",
                          borderRadius: 8,
                          textAlign: "center",
                        }}
                      >
                        <a
                          href={cecWorkshopFormUrl}
                          style={{
                            display: "inline-block",
                            padding: "10px 16px",
                            color: "#ffffff",
                            textDecoration: "none",
                            fontSize: 13,
                            fontWeight: 700,
                            lineHeight: 1.2,
                          }}
                        >
                          Register now for CEC workshop
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p style={{ margin: "8px 0 0", fontSize: 11, color: "#475569", lineHeight: 1.55 }}>
                  If the button does not work, use this link: {" "}
                  <a href={cecWorkshopFormUrl} style={{ color: "#0b5cab", textDecoration: "underline", fontWeight: 700 }}>
                    {cecWorkshopFormUrl}
                  </a>
                </p>
              </div>
            ) : null}

            <div
              style={{
                marginTop: 18,
                backgroundColor: "#f6f9fd",
                border: "1px solid #d8e4f0",
                borderRadius: 10,
                padding: "14px",
              }}
            >
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.6 }}>
                Practical information
              </p>

              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
                <tbody>
                  <tr>
                    <td style={{ width: "34%", verticalAlign: "top", fontSize: 12, fontWeight: 700, color: "#334155", padding: "0 0 6px" }}>
                      Locations
                    </td>
                    <td style={{ verticalAlign: "top", fontSize: 12, color: "#334155", lineHeight: 1.6, padding: "0 0 6px" }}>
                      <a href={embassyMapUrl} style={{ color: "#0b5cab", textDecoration: "underline", fontWeight: 700 }}>
                        Saturday location: Embassy (entrance from Rue Saint-Dominique)
                      </a>
                      <br />
                      <a href={panMapUrl} style={{ color: "#0b5cab", textDecoration: "underline", fontWeight: 700 }}>
                        Friday location: Polish Academy of Sciences Scientific Centre (PAN)
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "34%", verticalAlign: "top", fontSize: 12, fontWeight: 700, color: "#334155", padding: "4px 0 6px" }}>
                      ID document
                    </td>
                    <td style={{ verticalAlign: "top", fontSize: 12, color: "#334155", lineHeight: 1.6, padding: "4px 0 6px" }}>
                      Please bring a valid identity document.
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "34%", verticalAlign: "top", fontSize: 12, fontWeight: 700, color: "#334155", padding: "4px 0 2px" }}>
                      Dress code
                    </td>
                    <td style={{ verticalAlign: "top", fontSize: 12, color: "#334155", lineHeight: 1.6, padding: "4px 0 2px" }}>
                      Formal
                    </td>
                  </tr>
                </tbody>
              </table>

              <p style={{ margin: "10px 0 0", fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                Hours & agenda
              </p>

              {isBothDays ? (
                <>
                  <p style={{ margin: "6px 0 0", fontSize: 12, color: "#334155", fontWeight: 700 }}>Friday, April 17 (Polish Academy of Sciences Scientific Centre in Paris)</p>
                  <ul style={{ margin: "4px 0 0 18px", padding: 0, color: "#334155", fontSize: 12, lineHeight: 1.55 }}>
                    {fridayAgenda.map((item) => (
                      <li key={item} style={{ marginBottom: 2 }}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              <p style={{ margin: isBothDays ? "8px 0 0" : "6px 0 0", fontSize: 12, color: "#334155", fontWeight: 700 }}>
                Saturday, April 18 - Afternoon (Embassy of Poland in Paris)
              </p>
              <ul style={{ margin: "4px 0 0 18px", padding: 0, color: "#334155", fontSize: 12, lineHeight: 1.55 }}>
                {saturdayAfternoonAgenda.map((item) => (
                  <li key={item} style={{ marginBottom: 2 }}>{item}</li>
                ))}
              </ul>

              <p style={{ margin: "8px 0 0", fontSize: 12, color: "#334155", fontWeight: 700 }}>
                Saturday, April 18 - Evening (Embassy of Poland in Paris)
              </p>
              <ul style={{ margin: "4px 0 0 18px", padding: 0, color: "#334155", fontSize: 12, lineHeight: 1.55 }}>
                {saturdayEveningAgenda.map((item) => (
                  <li key={item} style={{ marginBottom: 2 }}>{item}</li>
                ))}
              </ul>

              <p style={{ margin: "10px 0 0", fontSize: 11, color: "#475569", lineHeight: 1.6 }}>
                By participating in the event, you consent to photography/audio/video recording and to the use of these materials by ASPOL for communication and promotional purposes.
              </p>
            </div>

            <div
              style={{
                marginTop: 20,
                backgroundColor: "#fffaf2",
                border: "1px solid #f2dfbd",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#92400e",
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
                FR: Sauvegardez cet email - c&apos;est votre billet d&apos;entree
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
                textDecoration: "underline",
                fontWeight: 700,
              }}
            >
              aspol.fr
            </a>
            <span style={{ color: "#94a3b8", margin: "0 10px" }}>&bull;</span>
            <span style={{ color: "#475569" }}>Paris Polish Forum 2026</span>
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
