import { PPFConfirmationTemplate } from "@/components/emails/PPFConfirmationTemplate";

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
          This page renders the participant confirmation email template locally. No email is sent.
        </p>

        <PPFConfirmationTemplate
          firstName="Jan"
          lastName="Kowalski"
          ticketId="PPF26-EXAMPLE01"
          ticketType="both-days"
        />
      </div>
    </main>
  );
}
