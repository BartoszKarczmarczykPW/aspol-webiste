import PathwayView from "@/components/pathway/PathwayView";

// Regenerated daily so "next deadline" on the cards stays current.
export const revalidate = 86400;

export default function PathwayPage() {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date());
  return <PathwayView today={today} />;
}
