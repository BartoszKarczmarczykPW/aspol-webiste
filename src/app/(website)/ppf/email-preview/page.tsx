import { PPFConfirmationTemplate } from "@/components/emails/PPFConfirmationTemplate";
import { PPFDobReminderTemplate } from "@/components/emails/PPFDobReminderTemplate";

export const metadata = {
  title: "PPF Email Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PPFEmailPreviewPage() {
  return (
    <main style={{ background: "#f3f4f6", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
            fontFamily: "Arial, sans-serif",
          }}
        >
          PPF 2026 - Email Preview
        </h1>
        <p
          style={{
            margin: "0 0 20px",
            color: "#4b5563",
            fontFamily: "Arial, sans-serif",
          }}
        >
          This page renders PPF email templates locally. No email is sent.
        </p>

        <h2
          style={{
            margin: "0 0 14px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#111827",
            fontFamily: "Arial, sans-serif",
          }}
        >
          1) Confirmation Email
        </h2>

        <PPFConfirmationTemplate
          firstName="Jan"
          lastName="Kowalski"
          ticketId="PPF26-EXAMPLE01"
          ticketType="both-days"
        />

        <h2
          style={{
            margin: "36px 0 14px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#111827",
            fontFamily: "Arial, sans-serif",
          }}
        >
          2) Date of Birth Reminder Email
        </h2>

        <PPFDobReminderTemplate
          firstName="Jan"
          lastName="Kowalski"
          ticketId="PPF26-EXAMPLE01"
          formUrl="https://aspol.fr/ppf/dob-update?ticketId=PPF26-EXAMPLE01"
        />
      </div>
    </main>
  );
}
