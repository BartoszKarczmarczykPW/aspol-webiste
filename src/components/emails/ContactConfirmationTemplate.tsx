import * as React from "react";

export function ContactConfirmationTemplate({ name }: { name: string }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
      <h2>Thanks for contacting ASPOL</h2>
      <p>Hi {name},</p>
      <p>We received your message and will get back to you soon.</p>
      <p>Best regards,<br />ASPOL Team</p>
    </div>
  );
}
