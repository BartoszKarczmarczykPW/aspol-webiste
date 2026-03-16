"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// ─── Types ────────────────────────────────────────────────────
interface PPFTicketPDFProps {
  ticketId: string;
  firstName: string;
  lastName: string;
  ticketType: "saturday-only" | "both-days";
  lang: "en" | "fr" | "pl";
}

// ─── Translations ─────────────────────────────────────────────
const labels = {
  en: {
    org: "ASPOL",
    event: "Paris Polish Forum 2026",
    attendee: "ATTENDEE",
    ticketLabel: "TICKET TYPE",
    dateLabel: "DATE",
    locationLabel: "LOCATION",
    location: "Paris, France",
    satOnly: "Saturday Only",
    satDate: "April 18, 2026",
    bothDays: "Both Days (Fri + Sat)",
    bothDate: "April 17–18, 2026",
    ticketIdLabel: "TICKET ID",
    confirmed: "REGISTRATION CONFIRMED",
    note: "Present this ticket at the entrance (printed or on screen).",
    generated: "Generated",
  },
  fr: {
    org: "ASPOL",
    event: "Paris Polish Forum 2026",
    attendee: "PARTICIPANT",
    ticketLabel: "TYPE DE BILLET",
    dateLabel: "DATE",
    locationLabel: "LIEU",
    location: "Paris, France",
    satOnly: "Samedi uniquement",
    satDate: "18 avril 2026",
    bothDays: "Deux jours (Ven + Sam)",
    bothDate: "17–18 avril 2026",
    ticketIdLabel: "N° DE BILLET",
    confirmed: "INSCRIPTION CONFIRMÉE",
    note: "Présentez ce billet à l'entrée (imprimé ou sur écran).",
    generated: "Généré le",
  },
  pl: {
    org: "ASPOL",
    event: "Paris Polish Forum 2026",
    attendee: "UCZESTNIK",
    ticketLabel: "TYP BILETU",
    dateLabel: "DATA",
    locationLabel: "MIEJSCE",
    location: "Paryż, Francja",
    satOnly: "Tylko sobota",
    satDate: "18 kwietnia 2026",
    bothDays: "Oba dni (Pt + Sob)",
    bothDate: "17–18 kwietnia 2026",
    ticketIdLabel: "NR BILETU",
    confirmed: "REJESTRACJA POTWIERDZONA",
    note: "Okaż ten bilet przy wejściu (wydrukowany lub na ekranie).",
    generated: "Wygenerowano",
  },
};

// ─── Styles ───────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    padding: 0,
  },

  // Red top banner
  banner: {
    backgroundColor: "#900c15",
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 48,
    textAlign: "center",
  },
  orgName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 6,
    color: "#FFFFFF",
    opacity: 0.7,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  // Divider strip
  dividerStrip: {
    height: 4,
    backgroundColor: "#143D73",
  },

  // Main content
  content: {
    padding: 48,
    paddingTop: 36,
    paddingBottom: 28,
  },

  // Attendee name (largest element)
  nameBlock: {
    marginBottom: 28,
  },
  label: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 3,
    color: "#9ca3af",
    marginBottom: 6,
  },
  name: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#0f1628",
  },

  // Details row
  detailsRow: {
    flexDirection: "row",
    marginBottom: 32,
  },
  detailCol: {
    width: "33%",
  },
  detailValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
    marginTop: 2,
  },

  // Ticket ID box
  ticketIdBlock: {
    borderTop: "2 solid #e5e7eb",
    borderBottom: "2 solid #e5e7eb",
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  ticketIdLeft: {},
  ticketIdCode: {
    fontSize: 20,
    fontFamily: "Courier-Bold",
    color: "#900c15",
    letterSpacing: 2,
  },

  // Confirmed badge
  confirmedBadge: {
    backgroundColor: "#f0fdf4",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  confirmedText: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    color: "#16a34a",
  },

  // Footer note
  note: {
    fontSize: 9,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 1.5,
    marginBottom: 16,
  },
  footerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: "#d1d5db",
    letterSpacing: 1,
  },
});

// ─── Component ────────────────────────────────────────────────
export default function PPFTicketPDF({
  ticketId,
  firstName,
  lastName,
  ticketType,
  lang,
}: PPFTicketPDFProps) {
  const l = labels[lang] || labels.en;
  const isBoth = ticketType === "both-days";
  const now = new Date().toLocaleDateString(
    lang === "pl" ? "pl-PL" : lang === "fr" ? "fr-FR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <Document>
      <Page size="A5" orientation="landscape" style={s.page}>
        {/* Red banner */}
        <View style={s.banner}>
          <Text style={s.orgName}>{l.org}</Text>
          <Text style={s.eventName}>{l.event}</Text>
        </View>

        {/* Navy accent line */}
        <View style={s.dividerStrip} />

        {/* Content */}
        <View style={s.content}>
          {/* Name */}
          <View style={s.nameBlock}>
            <Text style={s.label}>{l.attendee}</Text>
            <Text style={s.name}>{firstName} {lastName}</Text>
          </View>

          {/* Details: ticket type, date, location */}
          <View style={s.detailsRow}>
            <View style={s.detailCol}>
              <Text style={s.label}>{l.ticketLabel}</Text>
              <Text style={s.detailValue}>{isBoth ? l.bothDays : l.satOnly}</Text>
            </View>
            <View style={s.detailCol}>
              <Text style={s.label}>{l.dateLabel}</Text>
              <Text style={s.detailValue}>{isBoth ? l.bothDate : l.satDate}</Text>
            </View>
            <View style={s.detailCol}>
              <Text style={s.label}>{l.locationLabel}</Text>
              <Text style={s.detailValue}>{l.location}</Text>
            </View>
          </View>

          {/* Ticket ID row */}
          <View style={s.ticketIdBlock}>
            <View style={s.ticketIdLeft}>
              <Text style={s.label}>{l.ticketIdLabel}</Text>
              <Text style={s.ticketIdCode}>{ticketId}</Text>
            </View>
            <View style={s.confirmedBadge}>
              <Text style={s.confirmedText}>{l.confirmed}</Text>
            </View>
          </View>

          {/* Note */}
          <Text style={s.note}>{l.note}</Text>

          {/* Footer */}
          <View style={s.footerLine}>
            <Text style={s.footerText}>aspol.fr</Text>
            <Text style={s.footerText}>{l.generated} {now}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
