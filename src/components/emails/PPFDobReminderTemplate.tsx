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
  return (
    <div style={{ fontFamily: "Segoe UI, Arial, sans-serif", backgroundColor: "#f3f4f6", padding: "24px" }}>
      <div
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <div style={{ backgroundColor: "#143d73", color: "#ffffff", padding: "20px 24px" }}>
          <h1 style={{ margin: 0, fontSize: "22px", lineHeight: 1.25 }}>PPF 2026 - Missing Date of Birth</h1>
        </div>

        <div style={{ padding: "24px" }}>
          <p style={{ marginTop: 0, color: "#111827" }}>Hi {firstName} {lastName},</p>
          <p style={{ color: "#374151", lineHeight: 1.6 }}>
            We need your date of birth to finalize your access list for the event at the Polish Embassy in Paris.
            Please complete this short form. This is mandatory to be allowed entry to the Embassy.
          </p>

          <p style={{ color: "#111827", fontWeight: 700, marginBottom: 8 }}>Your Ticket ID: {ticketId}</p>

          <p style={{ margin: "16px 0" }}>
            <a
              href={formUrl}
              style={{
                display: "inline-block",
                backgroundColor: "#d71921",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 700,
                padding: "12px 18px",
                borderRadius: "8px",
              }}
            >
              Complete Date of Birth
            </a>
          </p>

          <hr style={{ border: 0, borderTop: "1px solid #e5e7eb", margin: "20px 0" }} />

          <p style={{ color: "#111827", marginBottom: 6 }}><strong>PL:</strong> Potrzebujemy Twojej daty urodzenia, aby domknac liste uczestnikow do Ambasady RP. Uzupelnij krotki formularz powyzej. To jest obowiazkowe, aby moc wejsc do Ambasady.</p>
          <p style={{ color: "#111827", marginBottom: 0 }}><strong>FR:</strong> Nous avons besoin de votre date de naissance pour finaliser la liste d&apos;acces a l&apos;Ambassade de Pologne. Merci de completer le court formulaire ci-dessus. Cette information est obligatoire pour pouvoir entrer a l&apos;Ambassade.</p>
        </div>
      </div>
    </div>
  );
}
