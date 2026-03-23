import * as React from "react";
import type { TicketType } from "@/types/ppf";

interface PPFAdminNotificationTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  ticketId: string;
  ticketType: TicketType;
  phone?: string;
  university?: string;
  fieldOfStudy?: string;
  howDidYouHear?: string;
  fridaySpots: number;
  saturdaySpots: number;
}

export function PPFAdminNotificationTemplate({
  firstName,
  lastName,
  email,
  ticketId,
  ticketType,
  phone,
  university,
  fieldOfStudy,
  howDidYouHear,
  fridaySpots,
  saturdaySpots,
}: PPFAdminNotificationTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      <h2 style={{ color: "#DC2626" }}>🎟️ Nowa rejestracja na PPF 2026</h2>

      <table style={{ borderCollapse: "collapse" as const, width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Ticket ID:</td>
            <td style={{ padding: "6px 12px" }}>{ticketId}</td>
          </tr>
          <tr>
            <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Typ biletu:</td>
            <td style={{ padding: "6px 12px" }}>
              {ticketType === "saturday-only" ? "Sobota (Saturday only)" : "Oba dni (Both days)"}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Imię i nazwisko:</td>
            <td style={{ padding: "6px 12px" }}>{firstName} {lastName}</td>
          </tr>
          <tr>
            <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Email:</td>
            <td style={{ padding: "6px 12px" }}><a href={`mailto:${email}`}>{email}</a></td>
          </tr>
          {phone && (
            <tr>
              <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Telefon:</td>
              <td style={{ padding: "6px 12px" }}>{phone}</td>
            </tr>
          )}
          {university && (
            <tr>
              <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Uczelnia:</td>
              <td style={{ padding: "6px 12px" }}>{university}</td>
            </tr>
          )}
          {fieldOfStudy && (
            <tr>
              <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Kierunek:</td>
              <td style={{ padding: "6px 12px" }}>{fieldOfStudy}</td>
            </tr>
          )}
          {howDidYouHear && (
            <tr>
              <td style={{ padding: "6px 12px", fontWeight: "bold", color: "#555" }}>Źródło:</td>
              <td style={{ padding: "6px 12px" }}>{howDidYouHear}</td>
            </tr>
          )}
        </tbody>
      </table>

      <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #eee" }} />

      <p style={{ color: "#666", fontSize: 14 }}>
        <strong>Pozostałe miejsca:</strong><br />
        Piątek: {fridaySpots}/150 | Sobota: {saturdaySpots}/300
      </p>
    </div>
  );
}
